import { motion } from 'framer-motion'
import { TrendingUp, Target, Brain, Zap } from 'lucide-react'
import './StatsSection.css'

function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: '50+',
      label: 'Career Paths',
    },
    {
      icon: Target,
      value: '100+',
      label: 'Opportunities',
    },
    {
      icon: Brain,
      value: 'Personalized',
      label: 'AI Guidance',
    },
    {
      icon: Zap,
      value: 'Smart',
      label: 'Comparisons',
    },
  ]

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <stat.icon className="stat-icon" size={32} />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
