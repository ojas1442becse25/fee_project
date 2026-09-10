import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import './Footer.css'

function Footer() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Tagline */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={24} className="footer-logo-icon" />
              <span className="footer-logo-text">avenza</span>
            </div>
            <p className="footer-tagline">Explore. Compare. Decide. Adapt.</p>
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="footer-link"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 avenza. Built for smarter career decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
