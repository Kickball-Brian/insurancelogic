import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '🧭',
    title: 'Full-Service Marketing Platform',
    desc: 'Budget in, leads and calls out. We handle paid acquisition, compliant intake, and delivery end to end, so your team spends time selling, not managing vendors.',
  },
  {
    icon: '🔀',
    title: 'Real-Time Routing Technology',
    desc: 'The same infrastructure that powers LawLogic, now consolidated into one platform. Leads and live calls route to the right agent the moment they qualify, across every vertical you write.',
  },
  {
    icon: '🎚️',
    title: 'Flexible Criteria & Lead Volume',
    desc: 'Adjust qualifying criteria and volume as your book of business changes. Campaigns are built around what you need this month, not a fixed contract you\'re locked into.',
  },
  {
    icon: '☎️',
    title: 'Multi-Product Call Monetization',
    desc: 'A single call can qualify for two or three product lines at once, whether that\'s Final Expense and Medicare, or Auto and GAP. We route and monetize the full value of every conversation.',
  },
]

export default function ServicesPage() {
  usePageMeta(
    'Services | InsuranceLogic',
    'Full-service marketing, real-time routing, flexible criteria, and multi-product call monetization for independent insurance agents and agencies.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-full-card', {
        scrollTrigger: { trigger: '.services-full-list', start: 'top 80%' },
        opacity: 0, y: 60, duration: 0.8, stagger: 0.18, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <h1 className="page-title">Our Services</h1>
        <h2 className="page-hero-h2">A Full-Stack Marketing <span className="gradient-text">Platform for Agents</span></h2>
        <p className="page-lead">We built InsuranceLogic around one goal: turning marketing budget into leads and calls that are ready to work, without asking you to manage the machinery behind it.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="services-full-list">
            {services.map((s) => (
              <div className="service-full-card" key={s.title}>
                <div className="service-full-icon">{s.icon}</div>
                <div className="service-full-body">
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Not sure where to start?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Our team will walk through your verticals and recommend the
              right setup for your campaign.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Talk to Our Team</Link></MagneticBtn>
              <MagneticBtn><Link to="/verticals" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>See Our Verticals →</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
