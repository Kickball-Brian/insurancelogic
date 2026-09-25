// Designed lockup images — dark text for light backgrounds (navbar), white
// text for dark backgrounds (footer). Both live in public/images/brand/.

const LOCKUPS = {
  dark:  { src: '/images/brand/logo-lockup.webp',       alt: 'InsuranceLogic — Powered by Email Agency' },
  light: { src: '/images/brand/logo-lockup-white.webp',  alt: 'InsuranceLogic — Powered by Email Agency' },
}

/**
 * variant: 'dark' — dark-text lockup for light backgrounds (navbar)
 *          'light' — white-text lockup for dark backgrounds (footer)
 */
export default function Logo({ variant = 'dark', className = 'brand-logo-image' }) {
  const lockup = LOCKUPS[variant]
  return <img src={lockup.src} alt={lockup.alt} className={className} />
}
