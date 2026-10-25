import { motion, useReducedMotion } from 'framer-motion'
import './FeatureCard.css'

function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="feature-card"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.25 } }}
    >
      {/* Top shimmer line */}
      <div className="feature-card-shimmer" />

      <div className="feature-icon-wrapper">
        <Icon className="feature-icon" size={26} strokeWidth={1.75} />
      </div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>

      {/* Bottom CTA hint */}
      <div className="feature-card-footer">
        <span className="feature-learn-more">Learn more →</span>
      </div>
    </motion.div>
  )
}

export default FeatureCard
