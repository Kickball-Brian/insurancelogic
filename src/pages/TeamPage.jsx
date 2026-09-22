import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

// Shared leadership across Email Agency Inc. and its subsidiaries (Law Logic,
// InsuranceLogic). Mark and Joey are the primary day-to-day contacts for
// InsuranceLogic specifically.
// NOTE: Joey is intentionally left off pending his confirmation and headshot.
const team = [
  { name: 'Amie Lawson',       title: 'Chief Executive Officer',              initials: 'AL', email: 'amie@emailagency.com',    photo: '/images/team/amie-lawson.webp' },
  { name: 'Michelle Pocius',   title: 'Chief Operations Officer',             initials: 'MP', email: 'michelle@emailagency.com', photo: '/images/team/michelle-pocius.webp' },
  { name: 'Nick Thompson',     title: 'Chief Revenue Officer',                initials: 'NT', email: 'nick@emailagency.com',    photo: '/images/team/nick-thompson.webp' },
  { name: 'Marc Loreti',       title: 'Chief Sales Officer',                  initials: 'ML', email: 'marc@emailagency.com',    photo: '/images/team/marc-loreti.webp' },
  { name: 'Harry Russell',     title: 'Chief Financial Officer',              initials: 'HR', email: 'harry@emailagency.com',   photo: '/images/team/harry-russell.webp' },
  { name: 'Max Ray',           title: 'Chief Growth Officer',                 initials: 'MR', email: 'max@emailagency.com',     photo: '/images/team/max-ray.webp' },
  { name: 'Mark Muzzini',      title: 'Business Development — Insurance',     initials: 'MM', email: 'markm@emailagency.com',   photo: '/images/team/mark-muzzini.webp' },
  { name: 'Dan Robinson',      title: 'VP of Sales',                          initials: 'DR', email: 'dan@emailagency.com',     photo: '/images/team/dan-robinson.webp' },
  { name: 'Shane Bader',       title: 'VP of Operations',                     initials: 'SB', email: 'shane@emailagency.com',   photo: '/images/team/shane-bader.webp' },
  { name: 'Josh Starks',       title: 'Sr. Business Development Manager',     initials: 'JS', email: 'josh@emailagency.com',    photo: '/images/team/josh-starks.webp' },
  { name: 'Adam Thayer',       title: 'VP — Media Analytics & Client Services', initials: 'AT', email: 'adam@emailagency.com', photo: '/images/team/adam-thayer.webp' },
  { name: 'Josh Mathews',      title: 'SVP of TV Marketing',                  initials: 'JM', email: 'joshua@emailagency.com',  photo: '/images/team/josh-mathews.webp' },
  { name: 'Jared Cassavechia', title: 'SVP, Media',                           initials: 'JC', email: 'jared@emailagency.com',   photo: '/images/team/jared-cassavechia.webp' },
  { name: 'Brian Remavich',    title: 'Chief Marketing Officer',              initials: 'BR', email: 'brian@emailagency.com',   photo: '/images/team/brian-remavich.webp' },
  { name: 'Patrick Sjoholm',   title: 'Chief Technology Officer',             initials: 'PS', email: 'patrick@emailagency.com', photo: '/images/team/patrick-sjoholm.webp' },
  { name: 'Anthony Loveland',  title: 'Chief Compliance Officer',             initials: 'AL', email: 'anthony@emailagency.com', photo: '/images/team/anthony-loveland.webp' },
  { name: 'Amanda Farris',     title: 'Chief Partnership Officer',            initials: 'AF', email: 'amanda@emailagency.com',  photo: '/images/team/amanda-farris.webp' },
]

const capabilities = [
  { icon: '🎯', label: 'Paid Acquisition', desc: 'Media buying and affiliate sourcing built around your criteria, not a one-size-fits-all funnel.' },
  { icon: '📋', label: 'Compliant Intake', desc: 'TCPA- and DNC-compliant consent capture and screening on every lead and call.' },
  { icon: '🔀', label: 'Real-Time Routing', desc: 'The same routing infrastructure behind Law Logic, now unified for insurance.' },
  { icon: '☎️', label: 'Multi-Product Monetization', desc: 'One call can qualify for two or three verticals. We route and price accordingly.' },
  { icon: '📊', label: 'Reporting & Optimization', desc: 'Ongoing tuning of sourcing and routing as your book of business changes.' },
  { icon: '🛡️', label: 'Compliance Oversight', desc: 'In-house compliance leadership shared across every Email Agency subsidiary.' },
]

export default function TeamPage() {
  usePageMeta(
    'Our Team | InsuranceLogic',
    'Meet the InsuranceLogic team — the leadership and business development group behind our full-service marketing platform for independent agents.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-capability', {
        scrollTrigger: { trigger: '.about-capabilities', start: 'top 82%' },
        opacity: 0, y: 40, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.team-card', {
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <h1 className="page-title">Our Team</h1>
        <h2 className="page-hero-h2">The People Behind <span className="gradient-text">InsuranceLogic</span></h2>
        <p className="page-lead">InsuranceLogic runs on the same leadership and infrastructure team behind Law Logic and Email Agency Inc. — over 20 years of performance marketing experience, now focused on independent insurance agents.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                Proven Infrastructure,<br />
                <span className="gradient-text">New Focus</span>
              </h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17, marginBottom: 20 }}>
                InsuranceLogic is a full-service marketing platform for independent
                agents and the agencies that serve them. We're not a startup guessing
                at lead generation — we're built on infrastructure that has run
                Law Logic's claimant pipeline for years, adapted for insurance.
              </p>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17, marginBottom: 32 }}>
                Mark Muzzini leads day-to-day partner relationships for
                InsuranceLogic, backed by the same compliance, media, and
                technology leadership that runs the rest of the business.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                InsuranceLogic Inc. is a subsidiary of{' '}
                <a href="https://emailagency.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                  Email Agency Inc.
                </a>
              </p>
            </div>

            <div className="about-story-image-placeholder">
              <div className="company-intro-brand-card" style={{ width: '100%', height: '100%' }}>
                <svg viewBox="40 110 640 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: '55%' }}>
                  <path fill="#ad2228" d="M389.5,226.44c-89.04,18.71-186.88,20.23-275.86,5.88-11.97-1.93-22.86-4.15-34.73-6.78-13.11-20.48-25.52-40.92-32.23-64.58-4.44-17.69-3.26-37.21,16.99-43.4,12.58-3.85,25.33-2.71,38.13.45,93.5,23.07,237.33,20.45,334.76,15.49,66.51-3.48,131.95-9.16,199.18-16.68-73.35,55.08-156.82,90.82-246.25,109.61Z"/>
                  <path fill="#ad2228" d="M142.83,330.11c53.42-.05,105.11-3.66,157.02-13.03,56.78-10.07,112.15-26.4,165.05-49.45,46.97-20.57,91.4-46.03,132.04-77.07,22.08-16.28,41.3-34.81,61.34-54.16-59.33,94.79-140.56,173.17-236.02,230.24-45.83,27.3-94.2,49.46-144.79,65.93-19.87,6.31-39.43,11.73-60.1,15.65l-74.53-118.12Z"/>
                  <path fill="#ad2228" d="M407.2,574.56c-18.92,25.99-52.22,54.48-85.67,36.16l-56.07-89.32c27.77-12.18,54.22-26.09,80.32-42.08,27.32-16.8,53.56-34.91,78.91-54.58,49.35-37.24,93.1-78.62,137.71-123.16l-140.9,248.64-14.31,24.34Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">What We Run</span>
            <h2 className="section-title">One Platform,<br /><span className="gradient-text">Every Capability</span></h2>
          </div>
          <div className="about-capabilities">
            {capabilities.map((c) => (
              <div className="about-capability" key={c.label}>
                <div className="service-icon">{c.icon}</div>
                <h3>{c.label}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Meet the<br /><span className="gradient-text">InsuranceLogic Team</span></h2>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <div className="team-card" key={m.email}>
                <div className="team-linkedin-wrap">
                  {m.photo ? <img src={m.photo} alt={m.name} className="team-photo" /> : <div className="team-avatar">{m.initials}</div>}
                </div>
                <div className="team-card-info">
                  <a href={`mailto:${m.email}`} className="team-name-link">{m.name}</a>
                  <div className="team-title">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Ready to Work With Us?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Tell us about your agency and we'll walk through what a
              campaign looks like on our platform.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Get in Touch</Link></MagneticBtn>
              <MagneticBtn><Link to="/services" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>Our Services →</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
