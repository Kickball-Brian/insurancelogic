import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'

// Home ships in the entry bundle (most landings); every other route is its
// own chunk. Each prerendered HTML file gets a modulepreload for its chunk
// (Vite injects it at runtime, and scripts/prerender.mjs captures the DOM),
// so the chunk downloads in parallel with the entry instead of after it.
import HomePage from './pages/HomePage'
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const VerticalsPage = lazy(() => import('./pages/VerticalsPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const CompliancePage = lazy(() => import('./pages/CompliancePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

gsap.registerPlugin(ScrollTrigger)

// Lenis singleton — lives for the duration of the app session
let lenisInstance = null

function initLenis() {
  if (lenisInstance) return lenisInstance
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenisInstance = lenis
  return lenis
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const t = setTimeout(() => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
      ScrollTrigger.refresh()
    }, 200)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = initLenis()
  }, [])

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      {/* Keyed so each route change remounts <main> and replays the CSS fade-in */}
      <main key={location.pathname} className="page-fade">
          <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/verticals" element={<VerticalsPage />} />
            <Route path="/about-us" element={<TeamPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}
