import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Logo from './Logo'

const LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Services',   to: '/services' },
  { label: 'Verticals',  to: '/verticals' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Our Team',   to: '/team' },
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
  const { scrollY } = useScroll()
  const [hidden,   setHidden]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const prev = scrollY.getPrevious() ?? 0
    if (current > prev && current > 150 && !menuOpen) setHidden(true)
    else setHidden(false)
    setScrolled(current > 60)
  })

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Fixed bar ── */}
      <motion.nav
        className={`navbar solid${scrolled ? ' scrolled' : ''}`}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.32, ease: 'easeInOut' }}
      >
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="Insurance Logic home" onClick={close}>
            <Logo variant="dark" />
          </Link>

          <HamburgerIcon
            onClick={() => setMenuOpen((o) => !o)}
            isOpen={menuOpen}
          />
        </div>
      </motion.nav>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav-overlay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            <motion.aside
              className="nav-overlay-panel"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              aria-label="Site navigation"
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
                  <a href="tel:8774983614" className="overlay-phone">(877) 498-3614</a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
