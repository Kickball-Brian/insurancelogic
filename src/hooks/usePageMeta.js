import { useEffect } from 'react'

const ORIGIN = 'https://insurancelogic.org'
const CRUMB_NAMES = {
  '/services': 'Services',
  '/verticals': 'Verticals',
  '/about-us': 'About Us',
  '/compliance': 'Compliance',
  '/contact': 'Contact',
  '/privacy-policy': 'Privacy Policy',
  '/terms-conditions': 'Terms & Conditions',
}

export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title

    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description

    // Update OG tags too so social crawlers pick up page-level values
    const og = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', prop)
        document.head.appendChild(el)
      }
      el.content = val
    }
    og('og:title', title)
    og('og:description', description)
    // Built from the production origin, not window.location.href — the
    // latter is correct for a real visitor's browser, but this same code
    // runs during build-time prerendering too (see
    // scripts/prerender.mjs), where window.location.origin is the local
    // Vite preview server. That wrong origin would otherwise get frozen
    // into the static HTML (confirmed on the ea-rework sibling project:
    // shipped with a live og:url of http://localhost:4321/), breaking
    // every social share (Facebook/LinkedIn/Slack/X unfurls). Same
    // pattern the canonical link below already uses for the same reason.
    og('og:url', `https://insurancelogic.org${window.location.pathname}`)

    // Canonical — update per-page so Google doesn't treat all pages as homepage duplicates
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://insurancelogic.org${window.location.pathname}`
  
    // BreadcrumbList — inner pages only. Replaced (not appended) on each
    // navigation so a client-side route change never leaves a stale one, and
    // present at prerender time so it lands in the static HTML.
    const old = document.getElementById('ld-breadcrumb')
    if (old) old.remove()
    const name = CRUMB_NAMES[window.location.pathname]
    if (name) {
      const ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'ld-breadcrumb'
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name, item: `${ORIGIN}${window.location.pathname}` },
        ],
      })
      document.head.appendChild(ld)
    }
  }, [title, description])
}
