import { Link } from 'react-router-dom'
import MagneticBtn from '../components/MagneticBtn'

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px' }}>
      <div>
        <span className="section-label">404</span>
        <h1 className="page-title" style={{ maxWidth: 480, margin: '0 auto 16px' }}>
          Page Not Found
        </h1>
        <p className="page-lead" style={{ margin: '0 auto 36px' }}>
          The page you're looking for doesn't exist or has moved.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticBtn><Link to="/" className="btn btn-primary">Back to Home</Link></MagneticBtn>
          <MagneticBtn><Link to="/contact" className="btn btn-ghost">Contact Us</Link></MagneticBtn>
        </div>
      </div>
    </div>
  )
}
