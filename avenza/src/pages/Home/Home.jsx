import { useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react'
import CareerGalaxy3D from '../../components/home/CareerGalaxy3D'
import StatsSection from '../../components/home/StatsSection'
import FeaturesSection from '../../components/home/FeaturesSection'
import HowItWorks from '../../components/home/HowItWorks'
import CareerCategories from '../../components/home/CareerCategories'
import WhyAvenza from '../../components/home/WhyAvenza'
import CTASection from '../../components/home/CTASection'
import Footer from '../../components/home/Footer'
import './Home.css'
import './HeroSection.css'

const TRUST_BADGES = [
  { icon: Sparkles, text: 'AI Fit Engine 2.0' },
  { icon: TrendingUp, text: '50+ Career Roadmaps' },
  { icon: ShieldCheck, text: '100% Free For Students' },
  { icon: CheckCircle, text: 'No Sign-Up Needed' },
]

function Home() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef(null)

  const scrollToHowItWorks = useCallback(() => {
    const el = document.getElementById('how-it-works')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Staggered hero text entrance
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const heroItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <div className="home-page">
      {/* ──────────────────────────────────────────────────────────
          Atmospheric Background Layer
      ────────────────────────────────────────────────────────── */}
      <div className="home-background" aria-hidden="true">
        <div className="home-bg-grid" />
        <div className="home-bg-vignette" />

        {/* Ambient luminous glow nodes */}
        <div className="ambient-glow glow-hero-top" />
        <div className="ambient-glow glow-features-mid" />
        <div className="ambient-glow glow-cta-bottom" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          Hero Section
      ────────────────────────────────────────────────────────── */}
      <section className="home-hero" ref={heroRef} aria-label="Hero">
        <div className="hero-container">
          {/* ── Left: Copy + CTAs ── */}
          <motion.div
            className="hero-content"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pill Badge */}
            <motion.div className="hero-badge" variants={heroItemVariants}>
              <div className="hero-badge-pill">
                <Sparkles size={13} className="hero-badge-sparkle" />
                <span className="hero-badge-label">AI CAREER DISCOVERY</span>
              </div>
              <span className="badge-tagline-text">Explore. Compare. Decide. Adapt.</span>
            </motion.div>

            {/* Authoritative Headline — High Contrast & Vibrant */}
            <motion.h1 className="hero-title" variants={heroItemVariants}>
              Discover Your Future. <br />
              <span className="hero-title-gradient">Driven by Intelligence.</span>
            </motion.h1>

            {/* Description */}
            <motion.p className="hero-description" variants={heroItemVariants}>
              Stop guessing your career path. AVENZA matches your unique strengths to
              high-growth industries, compares salary trajectories across 50+ fields, and
              builds your step-by-step roadmap with data-backed certainty.
            </motion.p>

            {/* Action Buttons */}
            <motion.div className="hero-buttons" variants={heroItemVariants}>
              <motion.button
                className="btn btn-primary hero-btn-main"
                onClick={() => navigate('/career-discovery')}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>Start Free Discovery</span>
                <ArrowRight size={18} className="hero-btn-arrow" />
              </motion.button>

              <motion.button
                className="btn btn-secondary hero-btn-sub"
                onClick={scrollToHowItWorks}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>How It Works</span>
                <ChevronDown size={17} className="hero-btn-chevron" />
              </motion.button>
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div className="hero-trust-row" variants={heroItemVariants}>
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="trust-badge">
                  <Icon size={14} className="trust-icon" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Career Galaxy Visual ── */}
          <div className="hero-visual-wrapper">
            <CareerGalaxy3D />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          Stats Band
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="Statistics">
        <StatsSection />
      </section>

      <div className="section-divider" />

      {/* ──────────────────────────────────────────────────────────
          Features Section (Bento Grid)
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="Platform Features">
        <FeaturesSection />
      </section>

      <div className="section-divider" />

      {/* ──────────────────────────────────────────────────────────
          How It Works Section
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="Methodology">
        <HowItWorks />
      </section>

      <div className="section-divider" />

      {/* ──────────────────────────────────────────────────────────
          Career Categories Section
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="Career Disciplines">
        <CareerCategories />
      </section>

      <div className="section-divider" />

      {/* ──────────────────────────────────────────────────────────
          Why Avenza Section
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="The Avenza Advantage">
        <WhyAvenza />
      </section>

      {/* ──────────────────────────────────────────────────────────
          Final High-Impact CTA
      ────────────────────────────────────────────────────────── */}
      <section className="home-section-wrap" aria-label="Get Started">
        <CTASection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
