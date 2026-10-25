import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react'
import './CTASection.css'

function CTASection() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="cta-section" aria-label="Get Started with Avenza">
      {/* Background Volumetric Glows */}
      <div className="cta-background" aria-hidden="true">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
      </div>

      <div className="container">
        <motion.div
          className="cta-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-eyebrow-pill">
            <Sparkles size={13} className="cta-sparkle" />
            <span>INSTANT DISCOVERY • ZERO PAYWALLS</span>
          </div>

          <h2 className="cta-title">
            Your Future Deserves Conviction, <br />
            <span className="cta-title-gradient">Not Ambiguity.</span>
          </h2>

          <p className="cta-text">
            Join thousands of ambitious students discovering their optimal career trajectory
            with AVENZA. Take our fast 3-minute assessment and receive data-backed clarity today.
          </p>

          <div className="cta-action-row">
            <motion.button
              className="btn btn-primary cta-btn-primary"
              onClick={() => navigate('/career-discovery')}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <span>Start Free Career Discovery</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              className="btn btn-secondary cta-btn-secondary"
              onClick={() => navigate('/features')}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Compass size={17} />
              <span>Explore Platform Features</span>
            </motion.button>
          </div>

          {/* Trust Guarantees */}
          <div className="cta-guarantees">
            <div className="guarantee-item">
              <CheckCircle2 size={15} className="guarantee-check" />
              <span>No Sign-Up Required for Assessment</span>
            </div>
            <div className="guarantee-item">
              <CheckCircle2 size={15} className="guarantee-check" />
              <span>Instant Personalized Report</span>
            </div>
            <div className="guarantee-item">
              <CheckCircle2 size={15} className="guarantee-check" />
              <span>100% Free For Students</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
