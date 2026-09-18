import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'
import MagneticBtn from '../components/MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

const compliancePartners = [
  { name: 'TrustedForm',        logo: '/logos/partners/trustedform.svg' },
  { name: 'Blacklist Alliance', logo: '/logos/partners/blacklist-alliance.svg' },
  { name: 'Jornaya',            logo: '/logos/partners/jornaya.svg' },
  { name: 'Anura',              logo: '/logos/partners/anura.svg' },
]

const frameworkItems = [
  { num: '01', title: 'TCPA & DNC screening', body: 'Every phone-based campaign is screened against Do Not Call registries and built around TCPA consent requirements before it goes live.' },
  { num: '02', title: 'Documented consent', body: 'Web submissions capture TCPA consent through TrustedForm. Phone intake retains a documented consent record as part of the call.' },
  { num: '03', title: 'Fraud & duplicate screening', body: 'Traffic and submissions are screened through Anura and Blacklist Alliance before they route to an agent.' },
  { num: '04', title: 'Carrier & state alignment', body: 'Campaigns are built around each carrier\'s appointment requirements and state-specific insurance regulations up front, not discovered after delivery.' },
  { num: '05', title: 'Licensed routing only', body: 'Leads and calls route only to properly licensed agents and agencies in the states where they\'re appointed to write.' },
  { num: '06', title: 'Ongoing oversight', body: 'Compliance leadership is shared across every Email Agency subsidiary, so policy updates get applied consistently as rules change.' },
]

export default function CompliancePage() {
  usePageMeta(
    'Compliance | Insurance Logic',
    'Insurance Logic builds TCPA, DNC, and carrier-compliant practices into every stage of lead and call generation for independent agents.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        gsap.fromTo('.cf-char',
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0,
            duration: 0.45, ease: 'power3.out', stagger: 0.025,
            scrollTrigger: { trigger: '.cf-intro', start: 'top 84%', once: true },
          }
        )
        gsap.from('.cf-lead', {
          scrollTrigger: { trigger: '.cf-intro', start: 'top 78%', once: true },
          opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
        })
        gsap.fromTo('.cf-card',
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)', opacity: 1,
            duration: 0.65, ease: 'power3.inOut',
            stagger: { amount: 0.55, from: 'start' },
            scrollTrigger: { trigger: '.cf-grid', start: 'top 82%', once: true },
          }
        )
        gsap.from('.cf-protect-inner > *', {
          scrollTrigger: { trigger: '.cf-protect', start: 'top 84%', once: true },
          opacity: 0, y: 28, duration: 0.65, stagger: 0.14, ease: 'power3.out',
        })
      }

      gsap.from('.compliance-partners-card', {
        scrollTrigger: { trigger: '.compliance-partners-card', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <h1 className="page-title">Compliance</h1>
        <h2 className="page-hero-h2">Built In From <span className="gradient-text">the First Call</span></h2>
        <p className="page-lead">
          Insurance lead generation sits under federal telemarketing law, state
          insurance regulation, and carrier-specific appointment rules, often
          in the same conversation. We built consent capture, fraud screening,
          and licensed routing into the platform itself, not bolted on after
          the fact.
        </p>
        <div style={{ marginTop: 32 }}>
          <p className="firms-block-label" style={{ marginBottom: 16, fontSize: 13, letterSpacing: '0.1em' }}>Our Compliance Partners</p>
          <div className="compliance-partner-logos">
            {compliancePartners.map((p) => (
              <div key={p.name} className="compliance-partner-logo-pill">
                <img src={p.logo} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="section compliance-framework">
        <div className="container">
          <div className="cf-intro">
            <span className="section-label">Compliance framework</span>
            <h2 className="section-title cf-headline">
              {['Built', 'in,', 'not', 'bolted', 'on.'].map((word, wi) => (
                <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}>
                  {word.split('').map((ch, ci) => (
                    <span key={ci} className="cf-char" style={{ display: 'inline-block' }}>{ch}</span>
                  ))}
                </span>
              ))}
            </h2>
            <p className="cf-lead">
              Independent agents and the agencies that support them can't
              afford leads that get an agent in front of a DNC complaint, or
              calls routed to someone who isn't licensed to write the policy.
              We treat compliance as part of the routing decision, not a
              filter applied after the fact.
            </p>
          </div>

          <div className="cf-grid">
            {frameworkItems.map((item) => (
              <div key={item.num} className="cf-card">
                <span className="cf-card-num">{item.num}</span>
                <h3 className="cf-card-title">{item.title}</h3>
                <p className="cf-card-body">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="cf-protect">
            <div className="cf-protect-inner">
              <h3 className="cf-protect-heading">One accountable operator</h3>
              <p className="cf-protect-body">
                Insurance Logic runs on the same compliance leadership and
                infrastructure as Law Logic and Email Agency Inc. Policy
                updates, carrier requirements, and consent standards are
                maintained centrally and applied the same way across every
                campaign.
              </p>
              <p className="cf-protect-close">
                In insurance marketing, leads that can't withstand scrutiny aren't leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Compliance Questions?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Talk to our team about how we handle consent capture, licensing
              checks, and carrier alignment for your specific campaign.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Contact Us</Link></MagneticBtn>
              <MagneticBtn><a href="tel:8774983614" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>(877) 498-3614</a></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
