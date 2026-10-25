import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './SectionHeader.css'

function SectionHeader({ title, subtitle, align = 'center', badge }) {
  return (
    <motion.div
      className={`section-header section-header-${align}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {badge && (
        <div className="section-badge-pill">
          <Sparkles size={11} className="section-badge-icon" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  )
}

export default SectionHeader
