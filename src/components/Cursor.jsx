import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse, not touch)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot    = dotRef.current
    const dotImg = dot.querySelector('img')
    const ring   = ringRef.current
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf
    let onDark = false

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }

    // Walk up from the element under the cursor to find the nearest ancestor
    // with a non-transparent background, so the mark/ring can flip to white
    // when they're over a dark/crimson section instead of blending into it.
    // Same technique as ea-rework's Cursor.jsx — reads the real rendered
    // background rather than maintaining a selector list of "dark" classes,
    // so it keeps working automatically as new dark sections/cards get added.
    const bgColorAt = (el) => {
      while (el && el !== document.documentElement) {
        const { backgroundColor } = getComputedStyle(el)
        const m = backgroundColor.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/)
        if (m && (m[4] === undefined || parseFloat(m[4]) > 0.5)) {
          return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]
        }
        el = el.parentElement
      }
      return [255, 255, 255]
    }

    let lastBgCheck = 0
    const lerp = (ts) => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`

      if (ts - lastBgCheck > 120) {
        lastBgCheck = ts
        const [r, g, b] = bgColorAt(document.elementFromPoint(mx, my))
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
        const nowOnDark = luminance < 0.5
        if (nowOnDark !== onDark) {
          onDark = nowOnDark
          dot.classList.toggle('cursor-dot--on-dark', onDark)
          ring.classList.toggle('cursor-ring--on-dark', onDark)
          // The red mark reads fine on light sections but disappears into a
          // dark/crimson one, so swap in the white version of the same mark
          // instead of just recoloring a backdrop behind it.
          dotImg.src = onDark ? '/images/cursor-mark-white.svg' : '/favicon.svg'
        }
      }

      raf = requestAnimationFrame(lerp)
    }
    raf = requestAnimationFrame(lerp)

    // Event delegation for hover state — catches dynamically added elements too
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .service-card, label')) {
        document.body.classList.add('cursor-hover')
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a, button, [role="button"], .service-card, label')) {
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
