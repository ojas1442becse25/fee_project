import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './Footer.css'

function AvenzaIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2L16 10L12 22L8 10L12 2Z"
        fill="url(#avenza-footer-g1)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.5"
      />
      <path
        d="M2 12L10 8L22 12L10 16L2 12Z"
        fill="url(#avenza-footer-g2)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <circle cx="12" cy="12" r="2.5" fill="#fff" opacity="0.95" />
      <defs>
        <linearGradient id="avenza-footer-g1" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="avenza-footer-g2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Footer() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Career Discovery', path: '/career-discovery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Tagline */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Avenza Home">
              <div className="footer-logo-icon-wrap">
                <AvenzaIcon size={18} />
              </div>
              <span className="footer-logo-text">AVENZA</span>
            </Link>
            <p className="footer-tagline">
              Explore. Compare. Decide. Adapt.
            </p>
            <p className="footer-subtext">
              Empowering students and future leaders with AI-backed career navigation.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-nav-title">Platform</span>
            <div className="footer-links-grid">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="footer-link"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={12} className="footer-link-arrow" />
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} AVENZA Intelligence. Crafted with precision for career excellence.
          </p>
          <div className="footer-legal-links">
            <span className="footer-status-indicator">
              <span className="status-ping" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
