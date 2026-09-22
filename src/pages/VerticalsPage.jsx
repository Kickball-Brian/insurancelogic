import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'
import { VERTICALS } from '../data/verticals'

gsap.registerPlugin(ScrollTrigger)

export default function VerticalsPage() {
  usePageMeta(
    'Insurance Verticals | InsuranceLogic',
    'InsuranceLogic covers nine verticals — Final Expense, Medicare, Life, Annuity, Home, Mortgage Protection, Auto, GAP, and Umbrella — under one marketing platform.'
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
      <PageHero>
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
                <div className="service-icon" style={{ fontSize: 26 }}>{v.icon}</div>
                <h3>
                  {v.name}
                  {v.comingSoon && <span className="vertical-badge">Launching Soon</span>}
                </h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
