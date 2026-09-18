import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Halftone dot cluster — positioned absolutely inside a `position: relative` parent.
 *
 * Props:
 *  position  — 'tr' | 'tl' | 'br' | 'bl' | 'tr-out' | 'bl-out'
 *  size      — 'sm' | 'md' | 'lg' | 'xl'
 *  density   — 'sm' | 'md' | 'lg' | 'xl'  (dot size / grid spacing)
 *  opacity   — 'faint' | 'light' | 'normal' | 'strong'
 *  speed     — parallax multiplier (default 0.25, 0 = no parallax)
 *  rotate    — CSS rotate string e.g. '15deg'
 */
export default function HalftoneDots({
  position = 'tr',
  size = 'lg',
  density = 'md',
  opacity = 'light',
  speed = 0.25,
  rotate = '0deg',
  style = {},
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || speed === 0) return

    const el = ref.current
    const direction = position.startsWith('b') ? 1 : -1

    const tl = gsap.to(el, {
      y: () => window.innerHeight * speed * direction,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, [speed, position])

  return (
    <div
      ref={ref}
      className={[
        'dots-cluster',
        `dots-${density}`,
        `dots-${opacity}`,
        `cluster-${size}`,
        `pos-${position}`,
      ].join(' ')}
      aria-hidden="true"
      style={{ transform: `rotate(${rotate})`, ...style }}
    />
  )
}
