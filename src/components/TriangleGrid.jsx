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
 *
 * `markHoverTarget` + `markGlowColor`: same hit-test, but instead swaps the
 * lens's own color while the cursor sits over that element — used together
 * with `maskTarget`/`maskShape` below, so the mark's own "shine" glows a
 * different color on hover too.
 *
 * `maskTarget` + `maskShape`: renders a SECOND copy of the exact same mesh
 * (identical coordinate space, so every line lines up with the main grid
 * underneath) on a separate canvas stacked above the page content, then
 * CSS-masks it down to just `maskTarget`'s silhouette (sized/positioned via
 * its live `getBoundingClientRect()`, re-measured on resize). `maskShape` is
 * `{ viewBox, paths }` — the same path data the target element itself
 * renders with, as a plain white-fill/transparent SVG used as the mask
 * image. Net effect: the mesh appears to shine through that shape (e.g. the
 * white logo mark) instead of being hidden behind its opaque fill.
 */
export default function TriangleGrid({
  color = '#9B1B30',
  glowColor = '#ffffff',
  triangleBase = 60,
  glowRadius = 240,
  textHoverTarget = null,
  textHoverClass = 'is-hot',
  markHoverTarget = null,
  markGlowColor = null,
  maskTarget = null,
  maskShape = null,
  className = '',
  style = {},
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const shineWrapRef = useRef(null)
  const shineCanvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const shineWrap = maskTarget && maskShape ? shineWrapRef.current : null
    const shineCanvas = shineWrap ? shineCanvasRef.current : null

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const shineCtx = shineCanvas?.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Mask image built once — a transparent SVG with the same shape(s) in
    // white (mask luminance: white = visible, transparent = hidden).
    if (shineWrap && maskShape) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${maskShape.viewBox}">${maskShape.paths.map((d) => `<path fill="#fff" d="${d}"/>`).join('')}</svg>`
      const maskDataUrl = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
      shineWrap.style.maskImage = maskDataUrl
      shineWrap.style.webkitMaskImage = maskDataUrl
      shineWrap.style.maskRepeat = 'no-repeat'
      shineWrap.style.webkitMaskRepeat = 'no-repeat'
    }

    let width = 0
    let height = 0
    let meshPath = null

    const pointer = { x: -9999, y: -9999, active: false }
    const lens = { x: -9999, y: -9999 }
    let hotEl = null
    let overMark = false

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

    function positionShineMask() {
      if (!shineWrap) return
      const markEl = document.querySelector(maskTarget)
      if (!markEl) return
      const heroRect = wrap.getBoundingClientRect()
      const markRect = markEl.getBoundingClientRect()
      shineWrap.style.maskSize = `${markRect.width}px ${markRect.height}px`
      shineWrap.style.webkitMaskSize = `${markRect.width}px ${markRect.height}px`
      const pos = `${markRect.left - heroRect.left}px ${markRect.top - heroRect.top}px`
      shineWrap.style.maskPosition = pos
      shineWrap.style.webkitMaskPosition = pos
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
      if (shineCanvas) {
        shineCanvas.width = width * dpr
        shineCanvas.height = height * dpr
        shineCanvas.style.width = `${width}px`
        shineCanvas.style.height = `${height}px`
        shineCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      buildMesh()
      positionShineMask()
      draw()
    }

    function drawOn(c) {
      c.clearRect(0, 0, width, height)

      c.lineWidth = 1
      c.strokeStyle = color
      c.globalAlpha = 0.55
      c.stroke(meshPath)
      c.globalAlpha = 1

      // Lens pass — same mesh, redrawn through a radial-gradient stroke
      // centered on the (lerped) cursor so it fades to nothing at the edge
      // instead of cutting off hard.
      if (lens.x > -9000) {
        const activeGlow = (overMark && markGlowColor) ? markGlowColor : glowColor
        const grad = c.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, glowRadius)
        grad.addColorStop(0, activeGlow)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        c.lineWidth = 1.4
        c.strokeStyle = grad
        c.stroke(meshPath)
      }
    }

    function draw() {
      drawOn(ctx)
      if (shineCtx) drawOn(shineCtx)
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

      if (textHoverTarget || markHoverTarget) {
        const atPoint = document.elementFromPoint(e.clientX, e.clientY)

        if (textHoverTarget) {
          const match = atPoint?.closest(textHoverTarget) ?? null
          if (match !== hotEl) {
            hotEl?.classList.remove(textHoverClass)
            match?.classList.add(textHoverClass)
            hotEl = match
          }
        }

        if (markHoverTarget) {
          overMark = !!atPoint?.closest(markHoverTarget)
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
  }, [color, glowColor, triangleBase, glowRadius, textHoverTarget, textHoverClass, markHoverTarget, markGlowColor, maskTarget, maskShape])

  return (
    <>
      <div ref={wrapRef} className={`triangle-grid ${className}`} style={{ pointerEvents: 'none', ...style }} aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      {maskTarget && maskShape && (
        <div ref={shineWrapRef} className="hero-triangle-shine" aria-hidden="true">
          <canvas ref={shineCanvasRef} />
        </div>
      )}
    </>
  )
}
