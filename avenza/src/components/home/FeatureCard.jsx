import { motion } from 'framer-motion'
import './FeatureCard.css'

function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="feature-icon-wrapper">
        <Icon className="feature-icon" size={28} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  )
}

export default FeatureCard
