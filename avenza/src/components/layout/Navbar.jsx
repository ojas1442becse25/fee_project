import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Career Discovery', path: '/career-discovery' },
    { name: 'FAQ', path: '/faq' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
    navigate('/')
  }

  // The "Actions" column is auth-aware:
  //   - logged out: Login button + Get Started CTA
  //   - logged in: Dashboard link + Log Out button
  const desktopActions = user ? (
    <div className="navbar-actions">
      <NavLink to="/dashboard" className="btn-login">
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>
      <button className="btn-cta" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    </div>
  ) : (
    <div className="navbar-actions">
      <NavLink to="/login" className="btn-login">
        <LogIn size={18} />
        <span>Login</span>
      </NavLink>
      <NavLink to="/career-discovery" className="btn-cta">
        <span>Get Started</span>
        <ArrowRight size={18} />
      </NavLink>
    </div>
  )

  const mobileActions = user ? (
    <div className="mobile-actions">
      <NavLink to="/dashboard" className="btn-cta-mobile" onClick={closeMobileMenu}>
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>
      <button className="btn-login-mobile" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    </div>
  ) : (
    <div className="mobile-actions">
      <NavLink to="/login" className="btn-login-mobile" onClick={closeMobileMenu}>
        <LogIn size={18} />
        <span>Login</span>
      </NavLink>
      <NavLink
        to="/career-discovery"
        className="btn-cta-mobile"
        onClick={closeMobileMenu}
      >
        <span>Get Started</span>
        <ArrowRight size={18} />
      </NavLink>
    </div>
  )

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            <Sparkles size={24} className="logo-icon" />
            <span className="logo-text">avenza</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          {desktopActions}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-content">
                {/* Mobile Navigation Links */}
                <div className="mobile-nav-links">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          isActive
                            ? 'mobile-nav-link mobile-nav-link-active'
                            : 'mobile-nav-link'
                        }
                        onClick={closeMobileMenu}
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Actions */}
                {mobileActions}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar