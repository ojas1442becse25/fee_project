import { motion } from 'framer-motion'
import { User, Sparkles, GitCompare, MapPin, ArrowRight } from 'lucide-react'
import './WhyAvenza.css'

function WhyAvenza() {
  const steps = [
    { icon: User, label: 'Profile' },
    { icon: Sparkles, label: 'AI Insights' },
    { icon: GitCompare, label: 'Compare Paths' },
    { icon: MapPin, label: 'Personal Roadmap' },
  ]

  return (
    <section className="why-avenza-section">
      <div className="container">
        <div className="why-avenza-grid">
          {/* Left Side */}
          <motion.div
            className="why-avenza-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="why-avenza-title">
              Career decisions should be based on data and personal preferences, not confusion.
            </h2>
            <p className="why-avenza-text">
              We believe every student deserves clarity, confidence, and control over their future.
              avenza combines AI-powered insights with your unique profile to help you make informed
              decisions that align with who you are and where you want to go.
            </p>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="why-avenza-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="process-card">
              <h3 className="process-card-title">Your Journey with avenza</h3>

              <div className="process-steps">
                {steps.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="process-step-icon">
                      <step.icon size={20} />
                    </div>
                    <span className="process-step-label">{step.label}</span>

                    {index < steps.length - 1 && (
                      <ArrowRight className="process-arrow" size={16} />
                    )}
                  </div>
                ))}
              </div>

              <div className="process-badge">
                <Sparkles size={16} />
                <span>Powered by AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyAvenza
