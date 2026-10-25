import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Brain, Compass, Rocket, ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import './HowItWorks.css'

function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      number: '01',
      phase: 'Phase 01: Intake',
      icon: Brain,
      title: 'Map Your Innate Strengths',
      description: 'Take a fast psychometric & interest evaluation to uncover your cognitive traits, passion areas, and technical affinity.',
      badge: '3-Min Discovery',
      accentColor: '#38bdf8',
    },
    {
      number: '02',
      phase: 'Phase 02: Intelligence',
      icon: Compass,
      title: 'Analyze AI Recommendations',
      description: 'Our neural matching engine evaluates your profile against 50+ career verticals, live compensation data, and hiring projections.',
      badge: '50+ Career Vectors',
      accentColor: '#c084fc',
    },
    {
      number: '03',
      phase: 'Phase 03: Execution',
      icon: Rocket,
      title: 'Execute Your Adaptive Roadmap',
      description: 'Unlock milestone-by-milestone learning tracks, top colleges, scholarship options, and resilient fallback pathways.',
      badge: 'Actionable Roadmap',
      accentColor: '#34d399',
    },
  ]

  return (
    <section className="how-it-works-section" id="how-it-works" aria-label="How Avenza Works">
      <div className="container">
        <SectionHeader
          badge="SEAMLESS METHODOLOGY"
          title="From Confusion to Conviction in Three Steps"
          subtitle="A clear, data-driven journey designed to eliminate guesswork and empower you with actionable clarity."
        />

        <div className="steps-container">
          {/* Animated Connecting Track */}
          <div className="steps-connecting-track" aria-hidden="true" />

          <div className="steps-grid">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="step-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: index * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="step-card-top">
                    <span className="step-phase-tag">{step.phase}</span>
                    <span className="step-number" style={{ color: step.accentColor }}>{step.number}</span>
                  </div>

                  <div className="step-icon-wrapper" style={{ borderColor: `${step.accentColor}50`, backgroundColor: `${step.accentColor}18` }}>
                    <Icon size={26} style={{ color: step.accentColor }} />
                  </div>

                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>

                  <div className="step-footer">
                    <div className="step-badge" style={{ color: step.accentColor, borderColor: `${step.accentColor}40`, backgroundColor: `${step.accentColor}15` }}>
                      <Sparkles size={12} />
                      <span>{step.badge}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight size={16} className="step-arrow-cue" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
