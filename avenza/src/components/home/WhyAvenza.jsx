import { motion, useReducedMotion } from 'framer-motion'
import {
  Sparkles,
  XCircle,
  CheckCircle2,
  Brain,
  TrendingUp,
  ShieldCheck,
  Compass
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import './WhyAvenza.css'

function WhyAvenza() {
  const shouldReduceMotion = useReducedMotion()

  const PILLARS = [
    {
      icon: Brain,
      title: 'Cognitive & Behavioral Alignment',
      desc: 'Matches your problem-solving style and natural strengths, not just your test scores.',
      color: '#38bdf8',
    },
    {
      icon: TrendingUp,
      title: 'Live Market Intelligence',
      desc: 'Ground truth data on salary growth, hiring velocity, and required skill obsolescence.',
      color: '#c084fc',
    },
    {
      icon: ShieldCheck,
      title: 'Adaptive Multi-Path Safety',
      desc: 'Pre-computed fallback options and transferable skill bridges so you never get trapped.',
      color: '#34d399',
    },
  ]

  const TRADITIONAL_ISSUES = [
    'Unverified advice from scattered online forums',
    'Outdated curriculum guidance disconnected from market needs',
    'Single-point career failure with zero fallback plan',
    'Unrealistic compensation expectations and blind spots',
  ]

  const AVENZA_ADVANTAGES = [
    'Multi-factor AI recommendations backed by live labor data',
    'Continuous roadmap adaptation with sequenced milestones',
    'Pre-mapped Plan B alternatives with 90%+ skill transferability',
    'Direct college, scholarship, and industry placement links',
  ]

  return (
    <section className="why-avenza-section" aria-label="Why Avenza">
      <div className="container">
        <SectionHeader
          badge="THE CLARITY ADVANTAGE"
          title="Why Modern Students Choose AVENZA"
          subtitle="Replacing anxiety and speculation with an empirical career discovery framework built for today's dynamic labor market."
        />

        <div className="why-avenza-grid">
          {/* ── Left Column: Value Prop & Pillars ── */}
          <motion.div
            className="why-left-content"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="why-main-heading">
              Career Decisions Should Be Driven by Empirical Data, Not Guesswork.
            </h3>
            <p className="why-main-paragraph">
              Most students waste years pursuing paths that don't match their intrinsic strengths
              or the market reality. AVENZA combines psychometric insights with verifiable industry
              benchmarks to give you absolute conviction in your next step.
            </p>

            <div className="why-pillars-list">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div key={pillar.title} className="pillar-item">
                    <div
                      className="pillar-icon-box"
                      style={{
                        backgroundColor: `${pillar.color}20`,
                        borderColor: `${pillar.color}45`,
                        color: pillar.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="pillar-text">
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* ── Right Column: The Contrast Matrix ── */}
          <motion.div
            className="why-right-visual"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="comparison-card">
              <div className="comparison-header">
                <div className="comparison-tag">
                  <Compass size={16} />
                  <span>The Strategic Transformation</span>
                </div>
              </div>

              {/* The Outdated Way */}
              <div className="comparison-block traditional-block">
                <div className="block-label-row">
                  <span className="block-badge old-badge">Traditional Way</span>
                  <span className="block-sub">High Anxiety • Fragmented</span>
                </div>
                <div className="block-points">
                  {TRADITIONAL_ISSUES.map((issue) => (
                    <div key={issue} className="contrast-point old-point">
                      <XCircle size={17} className="cross-icon" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="comparison-divider-line" />

              {/* The AVENZA Way */}
              <div className="comparison-block avenza-block">
                <div className="block-label-row">
                  <span className="block-badge avenza-badge">
                    <Sparkles size={12} />
                    The AVENZA Platform
                  </span>
                  <span className="block-sub highlight-sub">Total Clarity • Predictive</span>
                </div>
                <div className="block-points">
                  {AVENZA_ADVANTAGES.map((adv) => (
                    <div key={adv} className="contrast-point new-point">
                      <CheckCircle2 size={17} className="check-icon" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyAvenza
