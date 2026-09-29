import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'
import { VERTICALS } from '../data/verticals'

gsap.registerPlugin(ScrollTrigger)

// Deep-dive sections under the vertical cards, in display order. Copy sticks
// to what the platform actually does (see Services and Compliance pages) —
// no volume, price, or performance claims.
const DETAILS = [
  {
    slug: 'life-insurance',
    label: 'Life Insurance',
    title: 'Life Insurance Leads and Calls for Independent Agents',
    lead: "Term, whole life, and universal life buyers aren't the same conversation. We segment life insurance leads and calls by coverage type, so the person on the line is asking about the product you actually write.",
    body: "Criteria are set per campaign: states, coverage type, and volume. Every lead and call is screened for consent, fraud, and duplicates before it routes, and it goes in real time only to agents licensed and appointed in that state.",
    points: [
      'Term and permanent life, segmented by coverage type',
      'Leads and inbound calls, routed the moment they qualify',
      'Criteria and volume you control, adjustable as your book changes',
      'Licensed, state-matched routing only',
    ],
    cta: 'Talk to us about life insurance',
  },
  {
    slug: 'medicare',
    label: 'Medicare',
    title: 'Medicare Leads and Calls Timed to the Enrollment Calendar',
    lead: 'Medicare volume follows the calendar. We plan Medicare Advantage and Medicare Supplement leads and calls around the Annual Enrollment Period (October 15 to December 7), the Medicare Advantage Open Enrollment Period (January 1 to March 31), and Special Enrollment Periods.',
    body: 'Medicare marketing carries its own rules on top of TCPA, so consent capture and call handling are built into intake from the start, not added after the fact.',
    points: [
      'Medicare Advantage and Medicare Supplement',
      'Volume planned around AEP, OEP, and SEP timing',
      'State and plan-type criteria set per campaign',
      'Carrier-appointed, licensed agents only',
    ],
    cta: 'Talk to us about Medicare',
  },
  {
    slug: 'annuity',
    label: 'Annuity',
    title: 'Annuity Leads, Calls, and Scheduled Appointments',
    lead: 'Annuity conversations are longer and more considered than most. Alongside leads and calls, we can deliver scheduled appointments, so your time goes to prospects who have already agreed to talk.',
    body: 'We work with agents helping clients protect and grow retirement savings through fixed and indexed annuities. Criteria and volume are set with you per campaign, and every prospect is consent-verified before delivery.',
    points: [
      'Fixed and indexed annuity leads',
      'Inbound calls and scheduled appointments',
      'Criteria and volume set with you per campaign',
      'Consent capture and fraud screening on every submission',
    ],
    cta: 'Talk to us about annuities',
  },
  {
    slug: 'final-expense',
    label: 'Final Expense',
    title: 'Final Expense Leads and Calls for Burial and Whole-Life Agents',
    lead: 'Final expense rewards speed and consistency. We supply aged leads for cost-effective volume and live-transfer calls for agents who want the conversation happening right now.',
    body: 'Built for agents writing burial and small whole-life policies. Web submissions carry documented TCPA consent, and traffic is screened for fraud and duplicates before it reaches you.',
    points: [
      'Aged leads and live-transfer calls',
      'Burial and small whole-life coverage',
      'Documented consent on every web submission',
      'Real-time routing to licensed agents',
    ],
    cta: 'Talk to us about final expense',
  },
]

export default function VerticalsPage() {
  usePageMeta(
    'Insurance Verticals | InsuranceLogic',
    'InsuranceLogic covers Final Expense, Medicare, Life, Annuity, Home, Mortgage Protection, Auto, GAP, Umbrella, and more, all under one marketing platform.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vertical-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero bgImage="/images/hero/verticals.webp">
        <h1 className="page-title">Verticals</h1>
        <h2 className="page-hero-h2">Full Coverage, <span className="gradient-text">One Platform</span></h2>
        <p className="page-lead">
          Most agents work two or three product lines, not one. We built
          InsuranceLogic to cover the whole spectrum, so you can send us
          criteria across every vertical you write instead of shopping
          around for the ones we don't.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {VERTICALS.map((v) => (
              <div className="service-card vertical-card" key={v.slug}>
                {v.image && (
                  <div className="vertical-card-img">
                    <img src={v.image} alt={v.name} loading="lazy" />
                  </div>
                )}
                <div className="vertical-card-body">
                  <h3>
                    {v.name}
                    {v.comingSoon && <span className="vertical-badge">Launching Soon</span>}
                  </h3>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {DETAILS.map((d, i) => {
        const v = VERTICALS.find((x) => x.slug === d.slug)
        return (
          <section
            key={d.slug}
            id={d.slug}
            className={`section vertical-detail${i % 2 === 0 ? ' vertical-detail--alt' : ''}`}
          >
            <div className="container">
              <div className={`vertical-detail-grid${i % 2 === 1 ? ' vertical-detail-grid--reverse' : ''}`}>
                <div className="vertical-detail-text">
                  <span className="section-label">{d.label}</span>
                  <h2 className="section-title">{d.title}</h2>
                  <p className="vertical-detail-lead">{d.lead}</p>
                  <p>{d.body}</p>
                  <ul className="vertical-detail-points">
                    {d.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  <p className="vertical-detail-links">
                    <Link to="/contact" className="btn btn-primary">{d.cta}</Link>
                    <Link to="/compliance" className="vertical-detail-more">How we handle compliance →</Link>
                  </p>
                </div>
                <div className="vertical-detail-media">
                  <img src={v.image} alt={`${d.label} leads and calls`} width="800" height="450" loading="lazy" />
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Writing in a vertical we didn't list?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Tell us what you need. We're adding product lines as fast as
              demand and compliance allow.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Talk to Our Team</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
