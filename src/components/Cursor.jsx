import { useEffect, useRef } from 'react'

// Sections, panels, buttons, and cards with a dark (crimson or near-black)
// background — the plain red mark loses contrast there, so the cursor
// swaps to a white circle with a white mark instead. .btn-primary is dark
// at rest; .service-card is only dark on hover (via its own :hover rule),
// which is exactly when this fires for it — no need for a :hover selector.
const DARK_BG_SELECTOR = '.section-dark, .footer, .nav-overlay-panel, .btn-primary, .service-card'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse, not touch)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const img  = imgRef.current
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(lerp)
    }
    raf = requestAnimationFrame(lerp)

    // Event delegation for hover state — catches dynamically added elements too
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .service-card, label')) {
        document.body.classList.add('cursor-hover')
      }
      if (e.target.closest(DARK_BG_SELECTOR)) {
        document.body.classList.add('cursor-on-dark')
        img.src = '/images/cursor-mark-white.svg'
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a, button, [role="button"], .service-card, label')) {
        document.body.classList.remove('cursor-hover')
      }
      if (!e.relatedTarget?.closest(DARK_BG_SELECTOR)) {
        document.body.classList.remove('cursor-on-dark')
        img.src = '/favicon.svg'
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('cursor-hover', 'cursor-on-dark')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot-bg" />
        <img ref={imgRef} src="/favicon.svg" alt="" draggable="false" />
      </div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
