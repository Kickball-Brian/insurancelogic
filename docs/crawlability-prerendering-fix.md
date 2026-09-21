# Crawlability fix: build-time prerendering + always-mounted nav

This project has the exact same problem the `ea-rework` (Email Agency)
project had, and it's worth fixing here before this site ever goes live:
it's a pure client-rendered React SPA with no SSR/prerendering, deployed as
static files behind Apache (same `.htaccess` pattern, same deploy model).
The raw HTML for every route is just an empty `<div id="root">` + a script
tag — all real content only exists after React (and this app's
GSAP/ScrollTrigger/Lenis animation setup) renders client-side.

That's invisible to anything that doesn't execute JavaScript: Screaming Frog
by default, most other SEO audit tools, social/chat link-preview bots, most
AI/LLM crawlers — and it costs Google's own crawler extra render-queue time
per page even though it *does* execute JS. Confirmed directly on ea-rework:
a Screaming Frog crawl with JS rendering off found exactly one page.

This doc is the exact fix that was built and verified on ea-rework, adapted
to this project's actual routes and files. It was **not** applied here
automatically — do it deliberately, and re-verify each step against this
project's own build (don't assume ea-rework's numbers/output apply here).

## Why not real SSR

Production here is a static Apache host with no Node runtime (confirm this
is still true before starting — if it's changed, a real framework-level SSR
migration might be worth reconsidering). That rules out actual
Node-server-side rendering. It also means a full SSG framework migration
(vite-react-ssg, Next.js, etc.) would require every component to be
hydration-safe — no direct `window`/`document` access during a Node-based
render pass — which this app's animation code does not respect anywhere
(GSAP contexts, `ScrollTrigger`, Lenis, `window.matchMedia`, etc. are used
freely inside effects throughout). Restructuring all of that to be SSR-safe
would be a large, regression-prone change to an already-tuned animation
setup, for no benefit this deploy model can actually use.

**The fix instead:** a build-time prerender script that runs a real headless
browser against the built app, lets it render completely normally (same
code path a real visitor's browser runs — zero app-code changes, zero
hydration risk), and saves the resulting DOM as static HTML per route. A
real page load then paints that static HTML immediately (crawlable, real
content, no JS required to see it) and the same JS bundle loads right after
and does a totally normal full client-side render on top of it — no
`hydrateRoot`, so no hydration-mismatch risk at all.

## Step 1 — install Puppeteer

```bash
npm install --save-dev puppeteer
```

This downloads a real Chromium build the first time — let it run to
completion uninterrupted. **If you kill/interrupt this mid-download**, it
can leave a corrupted browser binary that segfaults on literally
`--version` (this happened once on ea-rework — looked like a sandbox issue
at first, was actually a truncated Mach-O from an interrupted `unzip`).
Fix if it happens: `rm -rf ~/.cache/puppeteer && npx puppeteer browsers
install chrome`, then retry.

## Step 2 — write scripts/prerender.mjs

Create `scripts/prerender.mjs`. This project's real routes (from
`src/App.jsx`) are all static, no `:param` routes, and this is a simpler,
flatter route list than LawLogic's — no nested sub-pages:

```
/
/services
/verticals
/team
/compliance
/contact
```

(Re-check `src/App.jsx` before writing this — the list above is a snapshot,
routes may have changed since.)

```js
// Build-time prerendering for a pure client-rendered SPA on a static Apache
// host (no Node runtime in production, so real SSR isn't an option there).
// See docs/crawlability-prerendering-fix.md for the full explanation.

import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')
const port = 4321
const baseUrl = `http://localhost:${port}`

// Every real route from App.jsx except / (special-cased — overwrites
// dist/index.html directly) and the catch-all (no static file needed once
// .htaccess's fallback is scoped to real routes with ErrorDocument 404 for
// everything else — see step 4).
const routes = [
  '/',
  '/services',
  '/verticals',
  '/team',
  '/compliance',
  '/contact',
]

// This project has no GTM/PostHog wired in yet (checked src/main.jsx and
// index.html at the time this doc was written) — so there's currently
// nothing to block during the prerender crawl. If analytics gets added
// later, add its domain here before running a build, the same way
// ea-rework and LawLogic do — otherwise every `npm run build` also fires
// real tracking events for a headless crawl of your own site.
const BLOCKED_DOMAINS = ['googletagmanager.com', 'google-analytics.com', 'posthog.com']

function outputPathFor(route) {
  if (route === '/') return join(distDir, 'index.html')
  return join(distDir, 'prerendered', `${route.replace(/^\/|\/$/g, '')}.html`)
}

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) return resolve()
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`${url} did not come up in time`))
      setTimeout(attempt, 300)
    }
    attempt()
  })
}

async function main() {
  console.log('[prerender] starting vite preview...')
  const preview = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: 'pipe',
  })
  preview.stdout.on('data', () => {})
  preview.stderr.on('data', () => {})

  try {
    await waitForServer(baseUrl)
    console.log('[prerender] preview server up')

    const browser = await puppeteer.launch({ headless: true })
    try {
      const page = await browser.newPage()
      // Mobile viewport to match Google's mobile-first indexing (Googlebot
      // Smartphone is the primary crawler). Verify this app's CSS doesn't
      // hide any real content at mobile widths before relying on this —
      // confirmed clean on ea-rework, re-check here.
      await page.setViewport({ width: 375, height: 812, isMobile: true })
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const url = req.url()
        if (BLOCKED_DOMAINS.some((d) => url.includes(d))) req.abort()
        else req.continue()
      })

      for (const route of routes) {
        const url = `${baseUrl}${route}`
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        await new Promise((r) => setTimeout(r, 400))
        const html = await page.content()

        const outPath = outputPathFor(route)
        await mkdir(dirname(outPath), { recursive: true })
        await writeFile(outPath, html)
        console.log(`[prerender] ${route} -> ${outPath.replace(root + '/', '')} (${(html.length / 1024).toFixed(0)}KB)`)
      }
    } finally {
      await browser.close()
    }
  } finally {
    preview.kill()
  }

  // Sanity check: a route that errors client-side shouldn't silently ship
  // an empty page as "prerendered".
  for (const route of routes) {
    const outPath = outputPathFor(route)
    const html = await readFile(outPath, 'utf-8')
    if (!html.includes('<h1')) {
      throw new Error(`[prerender] ${route} has no <h1> in its captured HTML — likely failed to render. Output saved to ${outPath} for inspection.`)
    }
  }

  console.log(`[prerender] done — ${routes.length} routes prerendered`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

## Step 3 — wire it into the build

In `package.json`:

```json
"build": "vite build && node scripts/prerender.mjs",
```

## Step 4 — update public/.htaccess

Current `.htaccess` here does a blanket "anything missing → index.html"
rewrite, which serves every broken/mistyped URL with an HTTP 200 (a "soft
404") — indistinguishable, to a non-JS-rendering crawler, from a real page.
Replace the rewrite block (keep the existing `Cache-Control`/`Expires`
blocks below it untouched) with an allowlist of the real routes, each
pointed at its own prerendered file, plus a real 404 for anything else:

```apache
Options -MultiViews
RewriteEngine On
RewriteBase /

# / needs no rule — dist/index.html IS the prerendered homepage after step 2,
# a real file Apache serves directly.
RewriteRule ^services/?$ /prerendered/services.html [L]
RewriteRule ^verticals/?$ /prerendered/verticals.html [L]
RewriteRule ^team/?$ /prerendered/team.html [L]
RewriteRule ^compliance/?$ /prerendered/compliance.html [L]
RewriteRule ^contact/?$ /prerendered/contact.html [L]

# Anything not matched above (typo, old link, bot probing) hits Apache's
# normal file-not-found handling. ErrorDocument swaps in the SPA shell as
# the response body (React Router's own catch-all still renders whatever
# 404 page this app has) but keeps the actual HTTP status as 404, not 200.
ErrorDocument 404 /index.html
```

**Verify this against a real local Apache instance before shipping it** —
don't just trust the syntax. On ea-rework this caught a real bug (a missing
route in the allowlist returned 404 for a page that should have been 200).
Quick way to spin one up on macOS:

```bash
# after `npm run build`, from the project root:
httpd -v   # confirm apache2/httpd is available (ships with macOS)
```

Write a minimal `httpd.conf` pointing `DocumentRoot` at `dist/` with
`AllowOverride All` so `.htaccess` is actually read, start it on a test
port, and `curl -I` every real route (expect 200), every route with a typo
(expect 404), and confirm the response body for a 404 still contains the
app's real 404 page (`curl <url> | grep <marker text from your 404 page>`).
**Note:** macOS's TCC/SIP can block `httpd` from reading files under
`/Users/...` — if that happens, copy `dist/` to somewhere under `/tmp`
first and point `DocumentRoot` there instead.

## Step 5 — mirror the redirect/fallback logic in netlify.toml

This project is currently noindexed on staging (`X-Robots-Tag: noindex,
nofollow` in `netlify.toml`) — **leave that header alone**, it's correct
for a pre-launch site. But `netlify.toml`'s SPA fallback (`/* -> /index.html
status = 200`) has the same soft-404 issue, and it's worth fixing now so it
doesn't need remembering again right before go-live. Whenever `.htaccess`
changes here, revisit `netlify.toml` in the same pass — they're separate
files that can silently drift apart (this happened on ea-rework: a
retirement redirect landed in `.htaccess` only, and staging had no
equivalent for weeks before anyone noticed).

## Step 6 — fix the nav overlay

`src/components/Navbar.jsx` has the exact bug ea-rework had: the whole
mobile menu overlay is wrapped in `{menuOpen && (...)}` inside
`AnimatePresence`, meaning every nav link inside it (Services, Verticals,
Team, Compliance, Contact) only exists in the DOM once a visitor clicks the
hamburger open. No crawler clicks buttons — Googlebot renders JS but
doesn't interact with the page — so none of that nav is discoverable
through primary navigation at all, JS-executing or not. (This project's nav
has no nested accordion the way LawLogic's does — just the one level to
fix here.)

**The fix:** stop conditionally rendering the content on mount/unmount;
keep it always in the DOM and animate visibility instead.

```jsx
// Before (conditional mount — invisible to any crawler that doesn't click):
<AnimatePresence>
  {menuOpen && (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.28 }}
    >
      {/* nav links */}
    </motion.aside>
  )}
</AnimatePresence>

// After (always mounted — links are real DOM content on every load):
<motion.aside
  initial={false}
  animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 40 }}
  transition={{ duration: 0.28 }}
  style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
  inert={!menuOpen}
>
  {/* nav links — unchanged */}
</motion.aside>
```

`inert` (a real HTML attribute, React 19 passes it straight through) makes
the closed panel unfocusable, unclickable, and hidden from the
accessibility tree — all without removing it from the DOM, so it stays
readable to anything parsing raw HTML.

Remove the `AnimatePresence` import if nothing else in the file still needs
mount/unmount exit animations after this change. Also do the same for the
backdrop element (if there is one) right alongside the panel — both need to
switch together.

**Verify after:** visually confirm the menu still opens/closes with the
same look and nothing broke, then check the raw HTML
(`curl <url> | grep -o 'href="/[^"]*"'`) on the homepage and confirm every
nav link is present even though the menu starts closed.

## Step 7 — re-verify end to end

1. `npm run build` — confirm `[prerender] N routes prerendered` with no
   errors, and that file sizes in `dist/prerendered/*` look like real
   pages (tens of KB), not near-empty shells.
2. Spot-check a couple of files: `grep -o '<title>[^<]*</title>'` and
   `grep -o '<h1[^>]*>[^<]*'` on 2-3 prerendered files — confirm each has
   the *correct, page-specific* title/heading, not a generic fallback.
3. Re-run the local Apache check from step 4 against the new build.
4. If you have Screaming Frog: crawl with JS rendering **off** and confirm
   it now discovers every route, not just `/`.

## When this actually matters

This project's staging is currently noindexed and (as far as this doc's
author could tell) hasn't cut over to a real production domain yet — so
there's no live-site urgency today. Do this fix **before** that go-live,
not after: it's the exact trap ea-rework fell into (shipped live, then
found via a real Screaming Frog crawl that Google/most tools could only
see one page), and it's a lot easier to build in now than to retrofit
under time pressure once real traffic depends on it.
