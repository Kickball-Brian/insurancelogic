import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">

        {/* ── Desktop layout (hidden on mobile) ── */}
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Insurance Logic home">
              <Logo variant="light" />
            </Link>
            <p>
              A full-service marketing platform turning agent budget into
              compliant, verified leads and calls. A subsidiary of Email Agency Inc.
            </p>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/verticals">Verticals</Link></li>
              <li><Link to="/compliance">Compliance</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Verticals</h4>
            <ul>
              <li><Link to="/verticals">Final Expense</Link></li>
              <li><Link to="/verticals">Medicare</Link></li>
              <li><Link to="/verticals">Life Insurance</Link></li>
              <li><Link to="/verticals">Auto &amp; Home</Link></li>
              <li><Link to="/verticals">All Verticals →</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:8774983614">(877) 498-3614</a></li>
              <li><a href="mailto:info@emailagency.com">info@emailagency.com</a></li>
              <li><a href="https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414" target="_blank" rel="noreferrer">Wellington, FL 33414</a></li>
              <li><a href="https://emailagency.com" target="_blank" rel="noreferrer">Email Agency</a></li>
            </ul>
          </div>
        </div>

        {/* ── Mobile layout: centered + pills (hidden on desktop) ── */}
        <div className="footer-mobile">
          <Link to="/" aria-label="Insurance Logic home">
            <Logo variant="light" />
          </Link>
          <p className="footer-mobile-tagline">
            Full-service marketing for independent insurance agents and agencies.
          </p>
          <Link to="/contact" className="footer-mobile-cta">Get in Touch</Link>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Company</span>
            <div className="footer-pills">
              <Link to="/services" className="footer-pill">Services</Link>
              <Link to="/verticals" className="footer-pill">Verticals</Link>
              <Link to="/compliance" className="footer-pill">Compliance</Link>
              <Link to="/team" className="footer-pill">Our Team</Link>
              <Link to="/contact" className="footer-pill">Contact</Link>
            </div>
          </div>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Contact</span>
            <div className="footer-pills">
              <a href="tel:8774983614" className="footer-pill">(877) 498-3614</a>
              <a href="mailto:info@emailagency.com" className="footer-pill">info@emailagency.com</a>
            </div>
          </div>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Follow</span>
            <div className="footer-pills">
              <a href="https://www.linkedin.com/company/email-agency/" target="_blank" rel="noreferrer" className="footer-pill">LinkedIn</a>
              <a href="https://www.facebook.com/EmailAgencyInc" target="_blank" rel="noreferrer" className="footer-pill">Facebook</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Insurance Logic. A subsidiary of Email Agency Inc. All rights reserved.</p>
          <div className="footer-legal">
            <a href="https://www.linkedin.com/company/email-agency/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com/EmailAgencyInc" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
