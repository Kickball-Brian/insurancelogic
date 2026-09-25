import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 20, suffix: '+', label: 'Years in Performance Marketing' },
  { num: 100, suffix: '%', label: 'TCPA & DNC Compliant Intake' },
  { num: 1,  suffix: '',  label: 'Unified Routing Platform' },
  { num: 2,  suffix: '-3x', label: 'Value Per Multi-Product Call' },
]

function runOdometer(el, finalNum, suffix) {
  let frame = 0
  const flashFrames = 18
  const id = setInterval(() => {
    frame++
    if (frame >= flashFrames) {
      clearInterval(id)
      const proxy = { val: 0 }
      gsap.to(proxy, {
        val: finalNum,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate() { el.textContent = Math.round(proxy.val) + suffix },
        onComplete() { el.textContent = finalNum + suffix },
      })
    } else {
      const rand = Math.floor(Math.random() * 99) + 1
      el.textContent = rand + suffix
    }
  }, 45)
}

export default function Results() {
  const sectionRef = useRef(null)
  const numRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.results-header .section-title',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.results-header', start: 'top 85%' } }
      )

      gsap.fromTo(
        '.result-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.results-grid', start: 'top 80%' },
          onComplete() {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            numRefs.current.forEach((el, i) => {
              if (!el) return
              const { num, suffix } = stats[i]
              if (prefersReduced) {
                el.textContent = num + suffix
              } else {
                runOdometer(el, num, suffix)
              }
            })
          },
        }
      )
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section className="section results" id="results" ref={sectionRef}>
      <div className="container">
        <div className="results-header" style={{ marginBottom: 56, textAlign: 'center' }}>
          <h2 className="section-title">
            One Platform, Built for<br />
            <span className="gradient-text">Every Product Line</span>
          </h2>
        </div>

        <div className="results-grid">
          {stats.map((s, i) => (
            <div className="result-item" key={s.label}>
              <span
                className="result-number"
                ref={(el) => { numRefs.current[i] = el }}
              >{s.num}{s.suffix}</span>
              <span className="result-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
