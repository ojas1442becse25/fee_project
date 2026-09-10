import { motion } from 'framer-motion'
import {
  Code,
  Brain,
  Database,
  Shield,
  Palette,
  HeartPulse,
  Scale,
  Building2
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import './CareerCategories.css'

function CareerCategories() {
  const categories = [
    { icon: Code, label: 'Software Engineering', color: 'var(--primary)' },
    { icon: Brain, label: 'Artificial Intelligence', color: 'var(--secondary)' },
    { icon: Database, label: 'Data Science', color: 'var(--accent)' },
    { icon: Shield, label: 'Cyber Security', color: 'var(--primary)' },
    { icon: Palette, label: 'Design', color: 'var(--secondary)' },
    { icon: HeartPulse, label: 'Medicine', color: '#EF4444' },
    { icon: Scale, label: 'Law', color: '#F59E0B' },
    { icon: Building2, label: 'Government Services', color: 'var(--success)' },
  ]

  return (
    <section className="career-categories-section">
      <div className="container">
        <SectionHeader
          title="Explore Career Paths"
          subtitle="Discover opportunities across diverse fields and find what excites you"
        />

        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="category-icon-wrapper" style={{ backgroundColor: `${category.color}15` }}>
                <category.icon className="category-icon" size={28} style={{ color: category.color }} />
              </div>
              <span className="category-label">{category.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareerCategories
