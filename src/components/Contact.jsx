import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticBtn from './MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-inner > *', {
        scrollTrigger: { trigger: '.contact-inner', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-inner">
          <h2 className="section-title">
            Ready to Put Your<br />
            <span className="gradient-text">Budget to Work?</span>
          </h2>
          <p className="section-subtitle">
            Tell us your verticals, criteria, and volume. Our team will walk
            through what a campaign looks like on our platform.
          </p>
          <div className="contact-ctas">
            <MagneticBtn>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                Get in Touch
              </Link>
            </MagneticBtn>
            <MagneticBtn>
              <a href="tel:8774983614" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>
                (877) 498-3614
              </a>
            </MagneticBtn>
          </div>
          <p className="contact-email">
            Or email us at{' '}
            <a href="mailto:info@emailagency.com">info@emailagency.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
