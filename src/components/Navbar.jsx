import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Services',   to: '/services' },
  { label: 'Verticals',  to: '/verticals' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'About Us',   to: '/about-us' },
  { label: 'Contact',    to: '/contact' },
]

// ── Animated hamburger ────────────────────────────────────────────────────────
function HamburgerIcon({ onClick, isOpen }) {
  return (
    <button
      className={`nav-hamburger${isOpen ? ' is-open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <svg viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
        <line className="ham-line ham-line-top" x1="20" y1="35" x2="80" y2="35" />
        <line className="ham-line ham-line-mid" x1="20" y1="50" x2="80" y2="50" />
        <line className="ham-line ham-line-bot" x1="20" y1="65" x2="80" y2="65" />
      </svg>
    </button>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [hidden,   setHidden]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Hide on scroll down past 150px, show on any scroll up. Lenis drives real
  // scroll events, so a plain window listener sees every step.
  useEffect(() => {
    let prev = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      setHidden(current > prev && current > 150 && !menuOpen)
      setScrolled(current > 60)
      prev = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Fixed bar ── */}
      <nav className={`navbar solid${scrolled ? ' scrolled' : ''}${hidden ? ' is-hidden' : ''}`}>
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="InsuranceLogic home" onClick={close}>
            <Logo variant="dark" />
          </Link>

          <HamburgerIcon
            onClick={() => setMenuOpen((o) => !o)}
            isOpen={menuOpen}
          />
        </div>
      </nav>

      {/* ── Overlay ──
          Always mounted (not {menuOpen && ...}) so every nav link inside
          is real DOM content on every page load, not just once a visitor
          clicks the hamburger open. No crawler clicks buttons. See
          docs/crawlability-prerendering-fix.md. */}
      <div
        className={`nav-overlay-backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`nav-overlay-panel${menuOpen ? ' is-open' : ''}`}
        aria-label="Site navigation"
        inert={!menuOpen}
      >
        <button className="overlay-close-btn" onClick={close} aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="nav-overlay-inner">
          <p className="overlay-menu-label">Menu</p>

          <nav className="nav-overlay-links">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="overlay-nav-link" onClick={close}>{l.label}</Link>
            ))}
          </nav>

          <div className="nav-overlay-footer">
            <a href="tel:8776746366" className="overlay-phone">(877) 674-6366</a>
          </div>
        </div>
      </aside>
    </>
  )
}
