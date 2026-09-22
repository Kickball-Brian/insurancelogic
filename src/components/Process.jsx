import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StepIcons = {
  target: () => (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>
    </svg>
  ),
  route: () => (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>
      <path d="M9 6h6a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H9"/>
    </svg>
  ),
  phone: () => (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  chart: () => (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
}

const steps = [
  {
    num: '01',
    title: 'Criteria & Campaign Setup',
    desc: 'Tell us your verticals, qualifying criteria, and volume targets. We build the campaign around what you actually want to write, not what\'s easiest to generate.',
    Icon: StepIcons.target,
  },
  {
    num: '02',
    title: 'Compliant Acquisition',
    desc: 'Paid media and affiliate traffic are vetted before they enter the funnel, with TCPA- and DNC-compliant consent capture built into every intake flow.',
    Icon: StepIcons.phone,
  },
  {
    num: '03',
    title: 'Real-Time Routing & Delivery',
    desc: 'Leads and live calls route the moment they qualify, on the same infrastructure that powers LawLogic, now unified into one platform across every vertical.',
    Icon: StepIcons.route,
  },
  {
    num: '04',
    title: 'Reporting & Optimization',
    desc: 'Adjust criteria and volume as your book changes. We tune sourcing and routing continuously instead of locking you into a fixed campaign.',
    Icon: StepIcons.chart,
  },
]

// Sticky top offsets — navbar ~68px, stack cards 18px apart
const TOPS = [86, 104, 122, 140]

export default function Process() {
  const cardInnerRefs = useRef([])

  useEffect(() => {
    const cards = cardInnerRefs.current.filter(Boolean)

    const onScroll = () => {
      cards.forEach((inner) => {
        const wrap = inner.parentElement
        const rect = wrap.getBoundingClientRect()
        const idx = Number(wrap.dataset.idx)
        const stickyTop = TOPS[idx]

        const buried = Math.max(0, stickyTop - rect.top)
        const cardsAbove = cards.length - 1 - idx
        const maxBury = cardsAbove * 18
        const t = maxBury > 0 ? Math.min(buried / maxBury, 1) : 0

        const minScale = Math.max(0.88, 1 - 0.04 * cardsAbove)
        const scale = 1 - t * (1 - minScale)
        const ty = t * cardsAbove * 6

        inner.style.transform = `scale(${scale.toFixed(4)}) translateY(${(-ty).toFixed(2)}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="section process-stack-section" id="process">
      <div className="container">
        <div className="process-header">
          <h2 className="section-title">
            From First Click to<br />
            <span className="gradient-text">Booked Business</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A multi-stage pipeline built for insurance, with one platform
            accountable at every step.
          </p>
        </div>

        <div className="process-stack" style={{ perspective: '1400px', perspectiveOrigin: '50% 0%' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-card-wrap"
              data-idx={i}
              style={{ top: TOPS[i], zIndex: 10 + i }}
            >
              <div
                ref={(el) => { cardInnerRefs.current[i] = el }}
                className="process-card"
                style={{ transformOrigin: 'center top', willChange: 'transform' }}
              >
                <div className="process-card-img-mobile process-card-icon-panel">
                  <step.Icon />
                </div>

                <div className="process-card-body">
                  <div className="process-card-text">
                    <span className="process-card-num">{step.num}</span>
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-desc">{step.desc}</p>
                  </div>

                  <div className="process-card-img-desktop process-card-icon-panel">
                    <step.Icon />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '2rem' }} />
      </div>
    </section>
  )
}
