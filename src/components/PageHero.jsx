import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HalftoneDots from './HalftoneDots'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable inner-page hero banner with halftone dot clusters and entrance animation.
 * Wrap page header content as children, or use the label/title/subtitle props shorthand.
 * CSS keyframe animations used (not GSAP) to avoid React 18 StrictMode opacity-0 bug.
 */
export default function PageHero({ label, title, subtitle, children, minHeight, bgImage, overlay, darkText }) {
  const ref = useRef(null)

  // Parallax on bg-image heroes: image scrolls at ~30% of page scroll speed
  useEffect(() => {
    if (!bgImage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { backgroundPositionY: '20%' },
        {
          backgroundPositionY: '80%',
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [bgImage])

  const hasBg = !!bgImage
  const defaultOverlay = 'linear-gradient(rgba(15,18,24,0.62) 0%, rgba(15,18,24,0.55) 100%)'
  const style = {
    ...(minHeight ? { minHeight } : {}),
    ...(hasBg ? {
      backgroundImage: `${overlay ?? defaultOverlay}, url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    } : {}),
  }

  return (
    <div className={`page-hero${hasBg ? ' page-hero--img' : ''}${darkText ? ' page-hero--dark-text' : ''}`} ref={ref} style={style}>
      {/* Halftone clusters — only shown without a photo bg */}
      {!hasBg && <HalftoneDots position="tr" size="xl" density="md" opacity="light" speed={0.2} rotate="-10deg" />}
      {!hasBg && <HalftoneDots position="bl" size="md" density="sm" opacity="faint" speed={0.1} rotate="5deg" />}

      <div className="container">
        <div className="page-hero-content page-hero-animate">
          {children ?? (
            <>
              {label && <span className="section-label">{label}</span>}
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-lead">{subtitle}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
