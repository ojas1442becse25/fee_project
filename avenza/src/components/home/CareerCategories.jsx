import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Code,
  Brain,
  Database,
  Shield,
  Palette,
  HeartPulse,
  Scale,
  Building2,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import './CareerCategories.css'

const CATEGORIES = [
  {
    icon: Code,
    label: 'Software Engineering',
    slug: 'software-engineer',
    group: 'tech',
    salary: '₹8 – 25 LPA',
    demand: 'High Demand',
    color: '#38bdf8',
  },
  {
    icon: Brain,
    label: 'Artificial Intelligence',
    slug: 'ai-engineer',
    group: 'ai',
    salary: '₹12 – 35 LPA',
    demand: 'Exponential',
    color: '#c084fc',
  },
  {
    icon: Database,
    label: 'Data Science & Analytics',
    slug: 'data-scientist',
    group: 'ai',
    salary: '₹10 – 28 LPA',
    demand: 'High Growth',
    color: '#34d399',
  },
  {
    icon: Shield,
    label: 'Cyber Security & Defense',
    slug: 'cyber-security-analyst',
    group: 'tech',
    salary: '₹9 – 24 LPA',
    demand: 'Critical Need',
    color: '#60a5fa',
  },
  {
    icon: Palette,
    label: 'UI/UX & Product Design',
    slug: 'ui-ux-designer',
    group: 'creative',
    salary: '₹7 – 20 LPA',
    demand: 'High Growth',
    color: '#f472b6',
  },
  {
    icon: HeartPulse,
    label: 'Medicine & Healthcare',
    slug: 'doctor',
    group: 'core',
    salary: '₹10 – 30+ LPA',
    demand: 'Vital / Prestige',
    color: '#f87171',
  },
  {
    icon: Scale,
    label: 'Corporate & Tech Law',
    slug: 'lawyer',
    group: 'core',
    salary: '₹8 – 22 LPA',
    demand: 'High Stability',
    color: '#fbbf24',
  },
  {
    icon: Building2,
    label: 'Civil & Public Services',
    slug: 'ias-officer',
    group: 'core',
    salary: 'Govt Scale',
    demand: 'Leadership',
    color: '#4ade80',
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'tech', label: 'Tech & Engineering' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'creative', label: 'Creative & Design' },
  { id: 'core', label: 'Professional & Core' },
]

function CareerCategories() {
  const shouldReduceMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredCategories = CATEGORIES.filter(
    (c) => activeFilter === 'all' || c.group === activeFilter
  )

  return (
    <section className="career-categories-section" aria-label="Explore Career Paths">
      <div className="container">
        <SectionHeader
          badge="EXPANSIVE DIRECTORY"
          title="Explore High-Conviction Career Disciplines"
          subtitle="Discover vetted pathways across engineering, AI, design, and healthcare with real compensation benchmarks."
        />

        {/* Filter Pills */}
        <div className="category-filter-bar" role="tablist" aria-label="Filter careers by field">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-tab-pill ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="categories-grid">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.slug}
                  layout
                  className="category-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Link
                    to={`/career/${category.slug}`}
                    className="category-card-link"
                    aria-label={`Explore ${category.label} career path`}
                  >
                    <div className="category-card-top">
                      <div
                        className="category-icon-wrapper"
                        style={{
                          backgroundColor: `${category.color}20`,
                          borderColor: `${category.color}45`,
                          color: category.color
                        }}
                      >
                        <Icon size={26} />
                      </div>
                      <span className="category-demand-badge" style={{ color: category.color, borderColor: `${category.color}40`, backgroundColor: `${category.color}15` }}>
                        <TrendingUp size={11} />
                        {category.demand}
                      </span>
                    </div>

                    <h3 className="category-label">{category.label}</h3>

                    <div className="category-salary-row">
                      <span className="salary-label">Typical Package:</span>
                      <span className="salary-val">{category.salary}</span>
                    </div>

                    <div className="category-card-footer">
                      <span className="view-details-text">Explore Career Graph</span>
                      <ArrowRight size={15} className="category-arrow" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default CareerCategories
