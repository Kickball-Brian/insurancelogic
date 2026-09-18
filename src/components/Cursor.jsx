import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse, not touch)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
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
      if (e.target.closest('a, button, [role="button"], .episode-card, .service-card, .project-card, .hcard, label')) {
        document.body.classList.add('cursor-hover')
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a, button, [role="button"], .episode-card, .service-card, .project-card, .hcard, label')) {
        document.body.classList.remove('cursor-hover')
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
      document.body.classList.remove('cursor-hover')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <img src="/favicon.svg" alt="" draggable="false" />
      </div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
