import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import TriangleGrid from './TriangleGrid'
import MagneticBtn from './MagneticBtn'

const WORDS = ['Full-Service', 'Insurance', 'Marketing']

const MARK_VIEWBOX = '40 110 640 510'
const MARK_PATHS = [
  'M389.5,226.44c-89.04,18.71-186.88,20.23-275.86,5.88-11.97-1.93-22.86-4.15-34.73-6.78-13.11-20.48-25.52-40.92-32.23-64.58-4.44-17.69-3.26-37.21,16.99-43.4,12.58-3.85,25.33-2.71,38.13.45,93.5,23.07,237.33,20.45,334.76,15.49,66.51-3.48,131.95-9.16,199.18-16.68-73.35,55.08-156.82,90.82-246.25,109.61Z',
  'M142.83,330.11c53.42-.05,105.11-3.66,157.02-13.03,56.78-10.07,112.15-26.4,165.05-49.45,46.97-20.57,91.4-46.03,132.04-77.07,22.08-16.28,41.3-34.81,61.34-54.16-59.33,94.79-140.56,173.17-236.02,230.24-45.83,27.3-94.2,49.46-144.79,65.93-19.87,6.31-39.43,11.73-60.1,15.65l-74.53-118.12Z',
  'M407.2,574.56c-18.92,25.99-52.22,54.48-85.67,36.16l-56.07-89.32c27.77-12.18,54.22-26.09,80.32-42.08,27.32-16.8,53.56-34.91,78.91-54.58,49.35-37.24,93.1-78.62,137.71-123.16l-140.9,248.64-14.31,24.34Z',
]

export default function Hero() {
  let charCount = 0
  const heroRef = useRef(null)
  const ctasRef = useRef(null)
  const scrollLineRef = useRef(null)

  // Mobile only: stretch the scroll-line so it runs from 20px below the
  // CTAs down to where it always ended (36px above the hero's bottom edge —
  // .hero-scroll-hint's own offset), instead of the fixed 40px on desktop.
  // Growing the height (not moving the container) is enough since the line
  // sits in a bottom-anchored flex column, so it extends upward on its own.
  useEffect(() => {
    function updateLine() {
      const line = scrollLineRef.current
      if (!line) return
      if (window.innerWidth > 768) {
        line.style.height = ''
        return
      }
      const hero = heroRef.current
      const ctas = ctasRef.current
      if (!hero || !ctas) return
      const heroBottom = hero.getBoundingClientRect().bottom
      const ctasBottom = ctas.getBoundingClientRect().bottom
      const length = (heroBottom - 36) - (ctasBottom + 20)
      line.style.height = `${Math.max(length, 40)}px`
    }
    // Entrance animations are still settling right after mount — wait for
    // them so the CTAs aren't measured mid-transform.
    const t = setTimeout(updateLine, 2000)
    window.addEventListener('resize', updateLine)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', updateLine)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {/* Cursor-follow triangle-mesh lens — always-on red wireframe grid,
          redrawn in white through a soft radial falloff wherever the cursor
          sits (same lerped-lens feel as the old DotLens halftone). Spans the
          full hero so it reacts anywhere you hover, not just near the mark.
          Also flips whichever headline word is under the cursor to red via
          textHoverTarget — the canvas itself stays pointer-events:none. The
          logo mark sits above this mesh as a flat, solid-red opaque shape
          (see .hero-mark below) — the mesh never shows through it. */}
      <TriangleGrid
        className="hero-triangle-grid"
        color="#9B1B30"
        glowColor="#ffffff"
        textHoverTarget=".hero-word"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h1>
            {WORDS.map((word, wi) => (
              <span key={wi} className="hero-word" style={{ display: 'inline-block', marginRight: '0.28em', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, ci) => {
                  const delay = 0.32 + charCount * 0.035
                  charCount++
                  return (
                    <span
                      key={ci}
                      className="hero-char"
                      style={{ display: 'inline-block', animationDelay: `${delay}s` }}
                    >{ch}</span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p className="hero-sub" style={{ animationDelay: '0.85s' }}>
            InsuranceLogic is a full-service marketing platform for independent
            agents and agencies. Send us budget and criteria, we send back
            compliant, verified leads and calls, routed in real time across
            every insurance vertical we cover.
          </p>

          <div className="hero-ctas" style={{ animationDelay: '1.05s' }} ref={ctasRef}>
            <MagneticBtn>
              <Link to="/verticals" className="btn btn-primary">See Our Verticals</Link>
            </MagneticBtn>
            <MagneticBtn>
              <Link to="/contact" className="btn btn-ghost">Talk to Our Team →</Link>
            </MagneticBtn>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg className="hero-mark" viewBox={MARK_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
            {MARK_PATHS.map((d) => <path key={d} fill="#9B1B30" d={d} />)}
          </svg>
        </div>
      </div>

      <div className="hero-scroll-hint" style={{ animationDelay: '1.5s' }}>
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" ref={scrollLineRef} />
      </div>
    </section>
  )
}
