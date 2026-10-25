import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Brain, Layers, Users, Sparkles } from 'lucide-react'
import './StatsSection.css'

function StatsSection() {
  const shouldReduceMotion = useReducedMotion()

  const stats = [
    {
      icon: Compass,
      value: '50+',
      label: 'Curated Career Roadmaps',
      subtext: 'Engineering, AI, Design, Science & Core',
      tag: 'Verified',
      glowClass: 'glow-cyan',
    },
    {
      icon: Brain,
      value: '98.4%',
      label: 'AI Recommendation Fit',
      subtext: 'Multi-dimensional skill & psychometric matrix',
      tag: 'Precision',
      glowClass: 'glow-purple',
    },
    {
      icon: Layers,
      value: '10,000+',
      label: 'Data Points Tracked',
      subtext: 'Real salaries, hiring trends & required skills',
      tag: 'Live Trends',
      glowClass: 'glow-blue',
    },
    {
      icon: Users,
      value: '100%',
      label: 'Open & Free for Students',
      subtext: 'Zero paywalls, instant actionable guidance',
      tag: 'Universal',
      glowClass: 'glow-emerald',
    },
  ]

  return (
    <section className="stats-section" aria-label="Key Platform Metrics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="stat-card-top">
                  <div className={`stat-icon-wrap ${stat.glowClass}`}>
                    <Icon size={22} />
                  </div>
                  <span className="stat-pill-tag">
                    <Sparkles size={11} />
                    {stat.tag}
                  </span>
                </div>

                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
