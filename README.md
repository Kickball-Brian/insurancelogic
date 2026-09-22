# InsuranceLogic Website

React + Vite marketing site for InsuranceLogic, built from the Law Logic
Website Rework template. Full-service marketing platform positioning for
independent insurance agents and agencies.

## Develop

```
npm install
npm run dev
```

## Pages

- `/` — Home
- `/services` — Full-service platform, routing, criteria, multi-product monetization
- `/verticals` — All nine insurance verticals (Final Expense, Medicare, Life, Annuity*, Home, Mortgage Protection, Auto & Commercial Auto, GAP, Umbrella) — *Annuity flagged "Launching Soon"
- `/team` — Leadership team
- `/compliance` — TCPA/DNC and carrier-compliance framework
- `/contact` — Contact info

## Known gaps / next steps

- **Logo**: No designed lockup exists yet. `src/components/Logo.jsx` draws a
  code-based wordmark (shared triangle mark + "InsuranceLogic" text) as a
  placeholder — swap in a real logo file when one's designed.
- **Joey**: Left off the team page pending his confirmation and headshot
  (he was at a wedding when this draft was built). Add him to the `team`
  array in `src/pages/TeamPage.jsx` once confirmed.
- **Mark Muzzini's photo**: Reused his existing headshot from the Email
  Agency site — notes say it "stands out poorly." Swap
  `public/images/team/mark-muzzini.webp` once a better one is taken.
- **Imagery**: No insurance-specific photography yet. Heroes and process
  steps use icon/gradient treatments instead of photos by design — replace
  with real photography as it becomes available.
- **Contact form**: No live campaign/affiliate code exists for this vertical
  yet, so `/contact` shows a mailto CTA instead of the embedded lead form
  used on lawlogic.law. Wire up the real form once a campaign code exists.
- **Domain & indexing**: `insurancelogic.com` is a placeholder in
  `index.html` / `usePageMeta.js` / `netlify.toml`. The whole site is
  currently `noindex, nofollow` (see `netlify.toml` and
  `public/robots.txt`) until it's ready to go live — update both when
  cutting over to production.
- **Analytics**: PostHog was intentionally left out (no InsuranceLogic
  project key yet). Add `posthog-js` back in `src/main.jsx` / `src/App.jsx`
  the same way `lawlogic-rework` does once a key exists.
