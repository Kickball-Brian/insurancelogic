import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Criteria & Campaign Setup',
    desc: 'Tell us your verticals, qualifying criteria, and volume targets. We build the campaign around what you actually want to write, not what\'s easiest to generate.',
    img: '/images/home/process-1.png',
  },
  {
    num: '02',
    title: 'Compliant Acquisition',
    desc: 'Paid media and affiliate traffic are vetted before they enter the funnel, with TCPA- and DNC-compliant consent capture built into every intake flow.',
    img: '/images/home/process-2.png',
  },
  {
    num: '03',
    title: 'Real-Time Routing & Delivery',
    desc: 'Leads and live calls route the moment they qualify, on the same infrastructure that powers LawLogic, now unified into one platform across every vertical.',
    img: '/images/home/process-3.png',
    // Source has her head right at the top edge of the frame — a centered
    // crop clips into it on the shorter mobile banner. Anchoring top keeps
    // the head in frame and crops the empty desk space at the bottom instead.
    imgPosition: 'center top',
  },
  {
    num: '04',
    title: 'Reporting & Optimization',
    desc: 'Adjust criteria and volume as your book changes. We tune sourcing and routing continuously instead of locking you into a fixed campaign.',
    img: '/images/home/process-4.png',
    // Overhead shot — the laptop/hands (the actual subject) sit in the
    // bottom half; the top has a stray blurred object behind her shoulder.
    // Anchoring bottom keeps the laptop in frame and crops the top instead.
    imgPosition: 'center bottom',
  },
]

// Sticky top offset — same for every card so each one lands flush on top
// of the last as it scrolls in, instead of cascading down in a staircase.
const STICKY_TOP = 86

export default function Process() {
  const cardInnerRefs = useRef([])

  useEffect(() => {
    const cards = cardInnerRefs.current.filter(Boolean)

    const onScroll = () => {
      cards.forEach((inner) => {
        const wrap = inner.parentElement
        const rect = wrap.getBoundingClientRect()
        const idx = Number(wrap.dataset.idx)

        const buried = Math.max(0, STICKY_TOP - rect.top)
        const cardsAbove = cards.length - 1 - idx
        const maxBury = cardsAbove * 18
        const t = maxBury > 0 ? Math.min(buried / maxBury, 1) : 0

        const minScale = Math.max(0.88, 1 - 0.04 * cardsAbove)
        const scale = 1 - t * (1 - minScale)

        inner.style.transform = `scale(${scale.toFixed(4)})`
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
              style={{ top: STICKY_TOP, zIndex: 10 + i }}
            >
              <div
                ref={(el) => { cardInnerRefs.current[i] = el }}
                className="process-card"
                style={{ transformOrigin: 'center top', willChange: 'transform' }}
              >
                <div className="process-card-img-mobile">
                  <img src={step.img} alt={step.title} loading="lazy" style={{ objectPosition: step.imgPosition || 'center' }} />
                </div>

                <div className="process-card-body">
                  <div className="process-card-text">
                    <span className="process-card-num">{step.num}</span>
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-desc">{step.desc}</p>
                  </div>

                  <div className="process-card-img-desktop">
                    <img src={step.img} alt={step.title} loading="lazy" style={{ objectPosition: step.imgPosition || 'center' }} />
                    <div className="process-card-img-fade" aria-hidden="true" />
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
