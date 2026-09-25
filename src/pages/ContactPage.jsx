import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import usePageMeta from '../hooks/usePageMeta'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import LeadLogicForm from '../components/LeadLogicForm'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  usePageMeta(
    'Contact InsuranceLogic | Get in Touch',
    'Talk to the InsuranceLogic team about your verticals, criteria, and volume. Call (877) 498-3614 or email info@emailagency.com.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        scrollTrigger: { trigger: '.contact-info-list', start: 'top 82%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero minHeight="40vh" bgImage="/images/hero/contact.webp">
        <h1 className="page-title">Contact</h1>
        <h2 className="page-hero-h2">Let's Talk About <span className="gradient-text">Your Campaign</span></h2>
        <p className="page-lead">Tell us your verticals, qualifying criteria, and volume. Our team will walk through what a campaign looks like on our platform.</p>
      </PageHero>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="contact-page-grid">
            <LeadLogicForm />

            <div className="contact-info-list">
              {[
                { label: 'Call',   value: '(877) 498-3614',       href: 'tel:8774983614' },
                { label: 'Send',   value: 'info@emailagency.com', href: 'mailto:info@emailagency.com' },
                { label: 'Write',  value: '9141 Delemar Ct\nWellington, FL 33414', href: 'https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414' },
              ].map((item) => (
                <a href={item.href} key={item.label} className="contact-info-item"
                   target={item.label === 'Write' ? '_blank' : undefined} rel="noreferrer">
                  <span className="contact-info-label">{item.label}</span>
                  <span className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>{item.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
