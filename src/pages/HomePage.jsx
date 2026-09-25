import usePageMeta from '../hooks/usePageMeta'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Results from '../components/Results'
import Process from '../components/Process'
import Contact from '../components/Contact'
import { VERTICALS } from '../data/verticals'

function VerticalTicker() {
  const items = VERTICALS.map((v) => v.name)
  return (
    <div className="tort-ticker-wrap" aria-label="Insurance verticals we cover">
      <div className="tort-ticker-label">Verticals covered</div>
      <div className="tort-ticker-track" aria-hidden="true">
        <div className="tort-ticker-inner">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="tort-ticker-item">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyIntro() {
  return (
    <section className="section">
      <div className="container">
        <div className="company-intro-grid">
          <div className="company-intro-text">
            <span className="section-label">About InsuranceLogic</span>
            <p>
              InsuranceLogic is a full-service marketing platform built for
              independent insurance agents and the larger agencies that serve
              them. Send us budget and we handle the rest, from paid
              acquisition through compliant intake to real-time delivery.
            </p>
            <p>
              We run on the same routing technology that powers LawLogic,
              a sister company with over 20 years in performance marketing,
              now consolidated into a single platform built for insurance.
              That means proven infrastructure from day one, not a startup
              stack still being battle-tested.
            </p>
            <p>
              Every campaign is built around your criteria and volume, not
              the other way around. And because a single call can qualify
              for two or three product lines at once, we route and monetize
              accordingly, so every conversation carries more value.
            </p>
          </div>

          <div className="company-intro-brand">
            <div className="company-intro-brand-card">
              <svg viewBox="40 110 640 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill="#ad2228" d="M389.5,226.44c-89.04,18.71-186.88,20.23-275.86,5.88-11.97-1.93-22.86-4.15-34.73-6.78-13.11-20.48-25.52-40.92-32.23-64.58-4.44-17.69-3.26-37.21,16.99-43.4,12.58-3.85,25.33-2.71,38.13.45,93.5,23.07,237.33,20.45,334.76,15.49,66.51-3.48,131.95-9.16,199.18-16.68-73.35,55.08-156.82,90.82-246.25,109.61Z"/>
                <path fill="#ad2228" d="M142.83,330.11c53.42-.05,105.11-3.66,157.02-13.03,56.78-10.07,112.15-26.4,165.05-49.45,46.97-20.57,91.4-46.03,132.04-77.07,22.08-16.28,41.3-34.81,61.34-54.16-59.33,94.79-140.56,173.17-236.02,230.24-45.83,27.3-94.2,49.46-144.79,65.93-19.87,6.31-39.43,11.73-60.1,15.65l-74.53-118.12Z"/>
                <path fill="#ad2228" d="M407.2,574.56c-18.92,25.99-52.22,54.48-85.67,36.16l-56.07-89.32c27.77-12.18,54.22-26.09,80.32-42.08,27.32-16.8,53.56-34.91,78.91-54.58,49.35-37.24,93.1-78.62,137.71-123.16l-140.9,248.64-14.31,24.34Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  usePageMeta(
    'InsuranceLogic — Full-Service Marketing for Independent Agents',
    'InsuranceLogic turns marketing budget into compliant, verified leads and calls across every insurance vertical we cover — real-time routing, flexible criteria, and multi-product monetization on one platform.'
  )
  return (
    <>
      <Hero />
      <CompanyIntro />
      <VerticalTicker />
      <Services />
      <Results />
      <Process />
      <Contact />
    </>
  )
}
