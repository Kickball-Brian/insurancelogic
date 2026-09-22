import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ServiceIcons = {
  route: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>
      <path d="M9 6h6a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H9"/>
    </svg>
  ),
  phone: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  sliders: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  grid: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

const services = [
  {
    Icon: ServiceIcons.route,
    title: 'Real-Time Lead Routing',
    desc: 'The same routing infrastructure that powers LawLogic, now consolidated into one platform. Leads and calls reach the right agent the moment they qualify.',
    href: '/services',
  },
  {
    Icon: ServiceIcons.phone,
    title: 'Multi-Product Call Monetization',
    desc: 'A single call can qualify for two or three products at once. We route and bill accordingly, so every conversation carries more value.',
    href: '/services',
  },
  {
    Icon: ServiceIcons.sliders,
    title: 'Flexible Criteria & Volume',
    desc: 'Adjust qualifying criteria and lead volume as your book of business changes. No long-term lock-in on what you buy or how much.',
    href: '/services',
  },
  {
    Icon: ServiceIcons.grid,
    title: 'Nine Insurance Verticals',
    desc: 'Final Expense, Medicare, Life, Annuity, Home, Mortgage Protection, Auto, GAP, and Umbrella. Full coverage under one roof.',
    href: '/verticals',
  },
  {
    Icon: ServiceIcons.layers,
    title: 'Full-Service Marketing Platform',
    desc: 'Send us budget in, we send leads and calls out. Paid acquisition, compliance, intake, and delivery are handled end to end.',
    href: '/services',
  },
  {
    Icon: ServiceIcons.shield,
    title: 'Compliance Built In',
    desc: 'TCPA and DNC compliance built into consent capture and traffic vetting at every step, on the same infrastructure we run across the business.',
    href: '/compliance',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header .section-title',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 85%' } }
      )
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
          onComplete() {
            gsap.to('.service-card .bc-line', {
              strokeDashoffset: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: 'power2.out',
            })
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="services" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">
            A Full-Stack Marketing<br />
            <span className="gradient-text">Platform for Agents</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map(({ Icon, title, desc, href }) => (
            <Link to={href} key={title} className="service-card" style={{ display: 'block', textDecoration: 'none' }}>
              <svg className="bc-tl" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polyline className="bc-line" points="28,4 4,4 4,28" stroke="#9B1B30" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="52" strokeDashoffset="52" />
              </svg>
              <svg className="bc-br" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polyline className="bc-line" points="0,24 24,24 24,0" stroke="#9B1B30" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="52" strokeDashoffset="52" />
              </svg>
              <svg className="bc-tr" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polyline className="bc-hover-line" points="0,4 24,4 24,28" stroke="#9B1B30" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="52" strokeDashoffset="52" />
              </svg>
              <svg className="bc-bl" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polyline className="bc-hover-line" points="28,24 4,24 4,0" stroke="#9B1B30" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="52" strokeDashoffset="52" />
              </svg>

              <div className="service-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="service-link">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
