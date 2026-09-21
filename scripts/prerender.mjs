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
// everything else — see public/.htaccess).
const routes = [
  '/',
  '/services',
  '/verticals',
  '/team',
  '/compliance',
  '/contact',
]

// This project has no GTM/PostHog wired in yet. If analytics gets added
// later, add its domain here before running a build — otherwise every
// `npm run build` also fires real tracking events for a headless crawl of
// your own site.
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
      // Smartphone is the primary crawler).
      await page.setViewport({ width: 375, height: 812, isMobile: true })
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const url = req.url()
        if (BLOCKED_DOMAINS.some((d) => url.includes(d))) req.abort()
        else req.continue()
      })

      const capture = async (path) => {
        const url = `${baseUrl}${path}`
        // 'load' rather than 'networkidle0' — a page with any embed that
        // keeps a background connection open (video, iframe, analytics
        // beacon) would make networkidle0 hang until timeout. 'load' fires
        // once the page's own synchronous resources are done; the extra
        // wait below covers React's render + effects settling afterward.
        await page.goto(url, { waitUntil: 'load', timeout: 30000 })
        await new Promise((r) => setTimeout(r, 800))
        return page.content()
      }

      for (const route of routes) {
        const html = await capture(route)
        const outPath = outputPathFor(route)
        await mkdir(dirname(outPath), { recursive: true })
        await writeFile(outPath, html)
        console.log(`[prerender] ${route} -> ${outPath.replace(root + '/', '')} (${(html.length / 1024).toFixed(0)}KB)`)
      }

      // dist/index.html is now the prerendered HOMEPAGE (route '/' above
      // overwrote it), not a neutral shell — so it can't double as the
      // ErrorDocument 404 target the way the bare Vite output could.
      // Pointing ErrorDocument there would serve a 404 status with the
      // *homepage's* content as the body, which is worse than not
      // prerendering at all: a non-JS crawler hitting a broken URL would
      // see mismatched content instead of an honest "not found". Capture
      // React Router's actual catch-all/NotFound state (any path with no
      // matching route renders it) and ship that as its own file instead.
      const notFoundHtml = await capture('/__prerender_404_check__')
      const notFoundPath = join(distDir, '404.html')
      await writeFile(notFoundPath, notFoundHtml)
      console.log(`[prerender] 404 -> dist/404.html (${(notFoundHtml.length / 1024).toFixed(0)}KB)`)
    } finally {
      await browser.close()
    }
  } finally {
    preview.kill()
  }

  // Sanity check: a route that errors client-side shouldn't silently ship
  // an empty page as "prerendered".
  for (const outPath of [...routes.map(outputPathFor), join(distDir, '404.html')]) {
    const html = await readFile(outPath, 'utf-8')
    if (!html.includes('<h1')) {
      throw new Error(`[prerender] ${outPath.replace(root + '/', '')} has no <h1> in its captured HTML — likely failed to render. Output saved to ${outPath} for inspection.`)
    }
  }

  console.log(`[prerender] done — ${routes.length} routes + 404 prerendered`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
