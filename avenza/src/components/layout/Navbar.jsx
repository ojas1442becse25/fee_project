import { useState, useEffect, useCallback, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  LogIn,
  Bookmark,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCareerContext } from '../../context/CareerContext'
import './Navbar.css'

/* Distinctive compass-rose SVG icon for the AVENZA brand. */
function AvenzaIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Compass needle — forward-progress symbol */}
      <path
        d="M12 2L16 10L12 22L8 10L12 2Z"
        fill="url(#avenza-icon-g)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.5"
      />
      <path
        d="M2 12L10 8L22 12L10 16L2 12Z"
        fill="url(#avenza-icon-g2)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <circle cx="12" cy="12" r="2.5" fill="#fff" opacity="0.95" />
      <defs>
        <linearGradient id="avenza-icon-g" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="avenza-icon-g2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { user, logout } = useAuth()
  const { savedCount } = useCareerContext()
  const navigate = useNavigate()
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  const isHome = location.pathname === '/'

  // Scroll listener for navbar state change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      const frameId = requestAnimationFrame(() => {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
      })
      return () => cancelAnimationFrame(frameId)
    }
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    {
      name: 'Discover',
      path: '/career-discovery',
      children: [
        { name: 'Career Assessment', path: '/career-discovery' },
        { name: 'Recommendations', path: '/career-recommendations' },
      ]
    },
    { name: 'FAQ', path: '/faq' },
  ]

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    closeMobileMenu()
    navigate('/')
  }, [logout, closeMobileMenu, navigate])

  const handleDropdownToggle = useCallback((name) => {
    setActiveDropdown(prev => (prev === name ? null : name))
  }, [])

  return (
    <>
      <motion.nav
        className={`navbar${isScrolled || !isHome ? ' navbar-scrolled' : ''}${isHome ? ' navbar-home' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo" aria-label="Avenza Home">
            <div className="logo-icon-wrap">
              <AvenzaIcon size={18} />
            </div>
            <span className="logo-text">AVENZA</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="navbar-links" aria-label="Site navigation">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className="nav-dropdown-wrapper"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`nav-link nav-dropdown-trigger${
                      link.children.some(c => c.path === location.pathname) ? ' nav-link-active' : ''
                    }`}
                    aria-expanded={activeDropdown === link.name}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`dropdown-chevron${activeDropdown === link.name ? ' open' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        className="nav-dropdown-panel"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `dropdown-item${isActive ? ' dropdown-item-active' : ''}`
                            }
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {user ? (
              <>
                <NavLink
                  to="/dashboard/saved-careers"
                  className={({ isActive }) =>
                    isActive ? 'btn-ghost nav-link-active' : 'btn-ghost'
                  }
                  title="Saved careers"
                >
                  <Bookmark size={17} />
                  <span>Saved</span>
                  {savedCount > 0 && (
                    <span className="saved-badge">{savedCount}</span>
                  )}
                </NavLink>
                <NavLink to="/dashboard" className="btn-ghost">
                  <LayoutDashboard size={17} />
                  <span>Dashboard</span>
                </NavLink>
                <button className="btn-nav-cta" onClick={handleLogout}>
                  <LogOut size={17} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn-ghost">
                  <LogIn size={17} />
                  <span>Sign In</span>
                </NavLink>
                <NavLink to="/career-discovery" className="btn-nav-cta">
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu-panel"
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250, mass: 0.8 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="mobile-menu-content">
                {/* Mobile Logo */}
                <div className="mobile-menu-logo">
                  <div className="logo-icon-wrap">
                    <AvenzaIcon size={16} />
                  </div>
                  <span className="logo-text">AVENZA</span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="mobile-nav-links" aria-label="Mobile navigation">
                  {navLinks.map((link, index) =>
                    link.children ? (
                      <div key={link.path} className="mobile-dropdown-section">
                        <button
                          className="mobile-nav-link mobile-nav-section-label"
                          onClick={() => handleDropdownToggle(link.name)}
                          aria-expanded={activeDropdown === link.name}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={16}
                            className={`dropdown-chevron${activeDropdown === link.name ? ' open' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mobile-dropdown-children"
                            >
                              {link.children.map((child) => (
                                <NavLink
                                  key={child.path}
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `mobile-nav-link mobile-child-link${isActive ? ' mobile-nav-link-active' : ''}`
                                  }
                                  onClick={closeMobileMenu}
                                >
                                  {child.name}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.07, duration: 0.3 }}
                      >
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            isActive ? 'mobile-nav-link mobile-nav-link-active' : 'mobile-nav-link'
                          }
                          end={link.path === '/'}
                          onClick={closeMobileMenu}
                        >
                          {link.name}
                        </NavLink>
                      </motion.div>
                    )
                  )}
                </nav>

                {/* Mobile Actions */}
                <div className="mobile-actions">
                  {user ? (
                    <>
                      <NavLink to="/dashboard/saved-careers" className="btn-mobile-ghost" onClick={closeMobileMenu}>
                        <Bookmark size={18} />
                        <span>Saved Careers {savedCount > 0 ? `(${savedCount})` : ''}</span>
                      </NavLink>
                      <NavLink to="/dashboard" className="btn-mobile-ghost" onClick={closeMobileMenu}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </NavLink>
                      <button className="btn-mobile-cta" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink to="/login" className="btn-mobile-ghost" onClick={closeMobileMenu}>
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </NavLink>
                      <NavLink to="/career-discovery" className="btn-mobile-cta" onClick={closeMobileMenu}>
                        <span>Get Started</span>
                        <ArrowRight size={18} />
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar