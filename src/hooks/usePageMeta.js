import { useEffect } from 'react'

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
    og('og:url', window.location.href)

    // Canonical — update per-page so Google doesn't treat all pages as homepage duplicates
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://insurancelogic.com${window.location.pathname}`
  }, [title, description])
}
