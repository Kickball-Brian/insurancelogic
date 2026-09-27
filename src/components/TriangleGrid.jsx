import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Full-bleed triangular wireframe mesh, always visible in `color`, with a
 * cursor-follow "lens" that redraws the same mesh in `glowColor` through a
 * soft radial falloff — same lerped-lens feel as DotLens, just tracing a
 * triangle grid instead of lighting up dots.
 *
 * `textHoverTarget`: a CSS selector (e.g. '.hero-word'). Whichever matching
 * element the cursor sits over — real hit-test via `elementFromPoint`, not
 * just its bounding box — gets `textHoverClass` toggled on it directly, so a
 * plain CSS transition can swap that element's own color (e.g. white → red)
 * independent of anything drawn on the canvas.
 */
export default function TriangleGrid({
  color = '#9B1B30',
  glowColor = '#ffffff',
  triangleBase = 60,
  glowRadius = 240,
  textHoverTarget = null,
  textHoverClass = 'is-hot',
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
    let meshPath = null

    const pointer = { x: -9999, y: -9999, active: false }
    const lens = { x: -9999, y: -9999 }
    let hotEl = null

    function buildMesh() {
      const triHeight = triangleBase * Math.sqrt(3) / 2
      const rows = Math.ceil(height / triHeight) + 1
      const cols = Math.ceil(width / (triangleBase / 2)) + 2

      const path = new Path2D()
      // Row boundary lines — the horizontal edge every triangle's base sits on.
      for (let r = 0; r <= rows; r++) {
        const y = r * triHeight
        path.moveTo(0, y)
        path.lineTo(width, y)
      }
      // Zigzag per row — the two slanted edges of every triangle in it.
      for (let r = 0; r < rows; r++) {
        const y0 = r * triHeight
        const y1 = (r + 1) * triHeight
        path.moveTo(0, y0)
        for (let i = 0; i <= cols; i++) {
          const x = i * (triangleBase / 2)
          path.lineTo(x, i % 2 === 0 ? y0 : y1)
        }
      }
      meshPath = path
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
      buildMesh()
      draw()
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      ctx.lineWidth = 1
      ctx.strokeStyle = color
      ctx.globalAlpha = 0.55
      ctx.stroke(meshPath)
      ctx.globalAlpha = 1

      // Lens pass — same mesh, redrawn through a radial-gradient stroke
      // centered on the (lerped) cursor so it fades to nothing at the edge
      // instead of cutting off hard.
      if (lens.x > -9000) {
        const grad = ctx.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, glowRadius)
        grad.addColorStop(0, glowColor)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.lineWidth = 1.4
        ctx.strokeStyle = grad
        ctx.stroke(meshPath)
      }
    }

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
      exitTween = gsap.to(lens, {
        x: -9999, y: -9999, duration: 0.5, ease: 'power2.out',
        onUpdate: draw,
        onComplete: () => { exitTween = null; draw() },
      })
    }

    // Window-level, same reasoning as DotLens: this field sits behind the
    // hero's real text/buttons, which would otherwise swallow the mousemove.
    function onMove(e) {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && x <= width && y >= 0 && y <= height
      pointer.x = x
      pointer.y = y

      if (textHoverTarget) {
        const match = document.elementFromPoint(e.clientX, e.clientY)?.closest(textHoverTarget) ?? null
        if (match !== hotEl) {
          hotEl?.classList.remove(textHoverClass)
          match?.classList.add(textHoverClass)
          hotEl = match
        }
      }

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
      hotEl?.classList.remove(textHoverClass)
    }
  }, [color, glowColor, triangleBase, glowRadius, textHoverTarget, textHoverClass])

  return (
    <div ref={wrapRef} className={`triangle-grid ${className}`} style={{ pointerEvents: 'none', ...style }} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
