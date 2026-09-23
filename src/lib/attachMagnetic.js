import { gsap } from 'gsap'

/**
 * Wires the magnetic-pull-toward-cursor effect onto a DOM element directly.
 * Shared by <MagneticBtn> and by anything that has to reach into
 * vendor-injected markup (e.g. the LeadLogic form's submit button) instead
 * of wrapping JSX children. Returns a cleanup function.
 */
export function attachMagnetic(el, { radius = 90, strength = 0.28 } = {}) {
  if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}

  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < radius) {
      const pull = (1 - dist / radius) * strength
      gsap.to(el, { x: dx * pull, y: dy * pull, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' })
    }
  }

  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
  }

  document.addEventListener('mousemove', onMove, { passive: true })
  el.addEventListener('mouseleave', onLeave)

  return () => {
    document.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    gsap.killTweensOf(el)
  }
}
