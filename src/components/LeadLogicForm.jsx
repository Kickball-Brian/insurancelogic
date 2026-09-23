import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { attachMagnetic } from '../lib/attachMagnetic'
import '../styles/contact-form.css'

gsap.registerPlugin(ScrollTrigger)

const WIDGET_SRC = 'https://docs.emailagency.com/form/embed/js/form-embed/idom/docs.emailagency.com/akey/dd66202d-6b53-11ed-bdfa-fa163eff53f0/code/ILCONTACT'

// Loads form.min.js + the LlForm widget script once per session (they're
// global, not per-instance) and resolves once LlForm is ready to use.
let scriptsReady = null
function loadScriptsOnce() {
  if (!scriptsReady) {
    scriptsReady = new Promise((resolve) => {
      const loader = document.createElement('script')
      loader.src = '/form.min.js'
      loader.onload = () => {
        const widget = document.createElement('script')
        widget.src = WIDGET_SRC
        widget.onload = () => resolve()
        document.head.appendChild(widget)
      }
      document.body.appendChild(loader)
    })
  }
  return scriptsReady
}

/**
 * LeadLogic form embed (ILCONTACT campaign). Renders the #ll-form target
 * the vendor script populates, with a thick-border/grow-on-scroll
 * treatment on its fields.
 *
 * A JSX <script> tag doesn't execute (React inserts it as an inert DOM
 * node), so the vendor script has to be added the normal DOM way instead.
 * And form.min.js's own follow-up steps are gated behind DOMContentLoaded
 * (to inject the widget script) and window.onload (to instantiate and show
 * the form) — both of which fire once on the real page load, long before a
 * client-side route change could mount a second instance of this
 * component — so those steps are triggered manually here instead, once per
 * mount, rather than relying on events that won't fire again.
 */
export default function LeadLogicForm() {
  const containerRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadScriptsOnce().then(() => {
      if (cancelled) return
      setTimeout(() => {
        if (cancelled) return
        const init = document.createElement('script')
        init.textContent = 'window.Form = new LlForm(); window.Form.initiate();'
        document.head.appendChild(init)
      }, 400)
    })
    return () => { cancelled = true }
  }, [])

  // #ll-form's fields are injected by the vendor widget on its own timeline
  // (an AJAX call that can land well after this component mounts), so a
  // MutationObserver rather than a fixed timeout is what catches them.
  // Each .form-control starts as a 5x5px box (thick border via
  // contact-form.css) and grows to its natural size as it scrolls into
  // view — a one-shot reveal per field, not a reversible scrub, so a field
  // never shrinks back down under someone mid-typing in it.
  useEffect(() => {
    const seen = new WeakSet()

    const growIn = (field) => {
      if (seen.has(field)) return
      seen.add(field)
      const { width, height } = field.getBoundingClientRect()
      gsap.set(field, { width: 5, height: 5, overflow: 'hidden' })
      gsap.to(field, {
        width, height,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: field, start: 'top 90%' },
      })
    }

    const scan = () => {
      containerRef.current?.querySelectorAll('.form-control').forEach(growIn)
    }

    const observer = new MutationObserver(scan)
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true })
    }
    scan()

    return () => observer.disconnect()
  }, [])

  // Submit button matches index.css's own vendor-override selector
  // (#form-container .btn-primary / button[type="submit"] / input[type="submit"]),
  // found the same MutationObserver way since it arrives on the widget's own
  // timeline rather than at mount.
  useEffect(() => {
    const wired = new WeakSet()
    const cleanups = []

    const scan = () => {
      containerRef.current
        ?.querySelectorAll('#form-container .btn-primary, #form-container button[type="submit"], #form-container input[type="submit"]')
        .forEach((btn) => {
          if (wired.has(btn)) return
          wired.add(btn)
          cleanups.push(attachMagnetic(btn))
        })
    }

    const observer = new MutationObserver(scan)
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true })
    }
    scan()

    return () => {
      observer.disconnect()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div className="contact-form-wrap" ref={containerRef}>
      <div id="ll-form"></div>
    </div>
  )
}
