import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react'
import HeroVisual from '../../components/home/HeroVisual'
import StatsSection from '../../components/home/StatsSection'
import FeaturesSection from '../../components/home/FeaturesSection'
import HowItWorks from '../../components/home/HowItWorks'
import CareerCategories from '../../components/home/CareerCategories'
import WhyAvenza from '../../components/home/WhyAvenza'
import CTASection from '../../components/home/CTASection'
import Footer from '../../components/home/Footer'
import './Home.css'
import './HeroSection.css'

function Home() {
  const navigate = useNavigate()

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="home-background">
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-container">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Your Career Journey Starts Here</span>
            </div>

            <h1 className="hero-title">avenza</h1>

            <p className="hero-tagline">
              Explore. Compare. Decide. Adapt.
            </p>

            <p className="hero-description">
              Discover your perfect career path with AI-powered insights, compare opportunities, and make informed decisions about your future.
            </p>

            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/career-recommendation')}
              >
                <span>Explore Your Future</span>
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={scrollToHowItWorks}
              >
                <PlayCircle size={18} />
                <span>How It Works</span>
              </button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="hero-visual-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Features Section */}
      <FeaturesSection />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Career Categories Section */}
      <CareerCategories />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Why Avenza Section */}
      <WhyAvenza />

      {/* Final CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
