import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Halftone dot field with a cursor-follow magnifying lens — dots near the
 * cursor bulge up in size/opacity with a smooth radial falloff, like a loupe
 * passing over a halftone print. Reference: the hero on sandeep.design.
 *
 * Canvas-based (not DOM dots) so a dense field redraws cheaply every frame.
 * The canvas itself is pointer-events:none — the wrapper tracks the real
 * pointer so the lens still works even if something else sits on top.
 */
export default function DotLens({
  color = '#9B1B30',
  dotCount = 260,
  baseRadius = 1.6,
  lensRadius = 130,
  magnify = 3.2,
  className = '',
  style = {},
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let dots = []

    // Pointer state — actual position + a lerped position so the lens
    // trails slightly rather than snapping frame to frame.
    const pointer = { x: -9999, y: -9999, active: false }
    const lens = { x: -9999, y: -9999 }

    function buildDots() {
      const cx = width / 2
      const cy = height / 2
      const r = Math.min(width, height) / 2
      dots = []
      for (let i = 0; i < dotCount; i++) {
        // Jittered radial placement (not a plain grid) so the cluster reads
        // as an organic cloud, denser toward the center.
        const angle = Math.random() * Math.PI * 2
        const dist = Math.sqrt(Math.random()) * r
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist * 0.85 // slight vertical squash
        const edgeFade = 1 - dist / r
        const alpha = Math.max(0.08, edgeFade * (0.35 + Math.random() * 0.5))
        const rad = baseRadius * (0.6 + Math.random() * 0.8)
        dots.push({ x, y, alpha, rad })
      }
    }

    function resize() {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildDots()
      draw()
    }

    function draw() {
      // No `pointer.active` gate here on purpose: `lens.x/y` sits at
      // -9999 at rest and eases there on exit, so distance-based falloff
      // naturally produces zero effect once it's off-field — no branch
      // needed, and the exit tween's eased retreat actually shows up.
      ctx.clearRect(0, 0, width, height)
      for (const d of dots) {
        let scale = 1
        let alpha = d.alpha
        const dx = d.x - lens.x
        const dy = d.y - lens.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < lensRadius) {
          const t = 1 - dist / lensRadius
          const falloff = t * t // eased falloff, peak at cursor
          scale = 1 + magnify * falloff
          alpha = Math.min(1, d.alpha + falloff * 0.6)
        }
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = alpha
        ctx.arc(d.x, d.y, d.rad * scale, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Static field for reduced-motion / no pointer support — build once, no loop.
    resize()
    if (reduce) {
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }

    let ticking = false
    let exitTween = null
    function tick() {
      lens.x += (pointer.x - lens.x) * 0.22
      lens.y += (pointer.y - lens.y) * 0.22
      draw()
    }

    function startTicker() {
      exitTween?.kill()
      if (ticking) return
      ticking = true
      gsap.ticker.add(tick)
    }
    function stopTicker() {
      if (!ticking) return
      ticking = false
      gsap.ticker.remove(tick)
      // Ease the lens back out of frame, then settle to the static base draw.
      exitTween = gsap.to(lens, {
        x: -9999, y: -9999, duration: 0.5, ease: 'power2.out',
        onUpdate: draw,
        onComplete: () => { exitTween = null; draw() },
      })
    }

    // Tracked at window level (not on `wrap`) because this field sits behind
    // sibling content — text, the stats card, buttons — that would otherwise
    // swallow the mousemove before it ever reaches this element. Whether the
    // lens is "active" is just a bounds check against the wrapper's own rect,
    // so it still only reacts while the cursor is actually over its area.
    function onMove(e) {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && x <= width && y >= 0 && y <= height
      pointer.x = x
      pointer.y = y
      if (inside && !pointer.active) startTicker()
      if (!inside && pointer.active) stopTicker()
      pointer.active = inside
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      exitTween?.kill()
    }
  }, [color, dotCount, baseRadius, lensRadius, magnify])

  return (
    <div ref={wrapRef} className={`dot-lens ${className}`} style={{ pointerEvents: 'none', ...style }} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
