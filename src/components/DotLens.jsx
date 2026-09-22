import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Halftone dot GRID with a cursor-follow magnifying lens — an evenly spaced
 * grid of dots, invisible at rest, that fade in and grow (1px → 5px) with a
 * smooth radial falloff as the cursor passes near them, like a loupe
 * revealing a halftone print. Reference: the hero on sandeep.design.
 *
 * Canvas-based (not DOM dots) so a dense grid redraws cheaply every frame.
 * The canvas itself is pointer-events:none — the wrapper tracks the real
 * pointer so the lens still works even if something else sits on top.
 */
export default function DotLens({
  color = '#9B1B30',
  spacing = 20,
  minRadius = 1,
  maxRadius = 5,
  lensRadius = 130,
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
      // Plain grid, `spacing`px apart in both directions, centered in
      // whatever leftover margin doesn't divide evenly — no jitter, no
      // per-dot randomness. Dots carry no base size/alpha of their own now;
      // both come entirely from lens distance at draw time.
      dots = []
      const cols = Math.floor(width / spacing)
      const rows = Math.floor(height / spacing)
      const offsetX = (width - (cols - 1) * spacing) / 2
      const offsetY = (height - (rows - 1) * spacing) / 2
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: offsetX + col * spacing, y: offsetY + row * spacing })
        }
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
        const dx = d.x - lens.x
        const dy = d.y - lens.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist >= lensRadius) continue // fully transparent — skip the draw call entirely

        const t = 1 - dist / lensRadius
        const falloff = t * t // eased, 0 at the lens edge, 1 dead-center
        const radius = minRadius + (maxRadius - minRadius) * falloff
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = falloff // transparent at the edge, fully opaque at the cursor
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Reduced-motion: build once, no cursor loop — with the lens parked off
    // at -9999, `draw()` naturally renders nothing (every dot is beyond
    // `lensRadius`), which is the correct at-rest state for this effect.
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
  }, [color, spacing, minRadius, maxRadius, lensRadius])

  return (
    <div ref={wrapRef} className={`dot-lens ${className}`} style={{ pointerEvents: 'none', ...style }} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
