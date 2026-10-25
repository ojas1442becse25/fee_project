import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Map,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  GitBranch
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import './FeaturesSection.css'

function FeaturesSection() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="features-section" id="features" aria-label="Avenza Core Features">
      <div className="container">
        <SectionHeader
          badge="INTELLIGENT ARCHITECTURE"
          title="Engineered for Uncompromising Career Clarity"
          subtitle="Everything you need to discover high-growth pathways, validate decisions with real market metrics, and execute with confidence."
        />

        <div className="bento-grid">
          {/* ── BENTO 1: HERO FEATURE (Span 2 Columns) ── */}
          <motion.div
            className="bento-card bento-hero-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25 } }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-pill icon-cyan">
                <Sparkles size={20} />
              </div>
              <span className="bento-tag">FLAGSHIP ENGINE</span>
            </div>

            <div className="bento-hero-content-split">
              <div className="bento-text-column">
                <h3 className="bento-title">AI Multi-Factor Recommendation Engine</h3>
                <p className="bento-desc">
                  Beyond generic questionnaires. AVENZA evaluates your cognitive inclinations,
                  technical strengths, and risk appetite against real-time industry requirements
                  to surface your highest-conviction career choices.
                </p>
                <div className="bento-points">
                  <div className="bento-point-item">
                    <CheckCircle2 size={16} className="point-check" />
                    <span>Cross-references 50+ specialized disciplines</span>
                  </div>
                  <div className="bento-point-item">
                    <CheckCircle2 size={16} className="point-check" />
                    <span>Real-time salary range & market demand telemetry</span>
                  </div>
                </div>
                <button
                  className="bento-inline-btn"
                  onClick={() => navigate('/career-discovery')}
                >
                  <span>Explore Recommendation Flow</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Visual Interactive Preview */}
              <div className="bento-visual-preview preview-radar">
                <div className="preview-card-inner">
                  <div className="preview-header">
                    <span className="preview-label">NEURAL MATCH BREAKDOWN</span>
                    <span className="preview-badge-match">98.4% Match</span>
                  </div>

                  <div className="preview-bars-stack">
                    <div className="preview-bar-row">
                      <div className="bar-labels">
                        <span className="bar-name">Analytical & Systems Reasoning</span>
                        <span className="bar-percent">96%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill cyan-fill" style={{ width: '96%' }} />
                      </div>
                    </div>

                    <div className="preview-bar-row">
                      <div className="bar-labels">
                        <span className="bar-name">Technical Domain Mastery</span>
                        <span className="bar-percent">92%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill purple-fill" style={{ width: '92%' }} />
                      </div>
                    </div>

                    <div className="preview-bar-row">
                      <div className="bar-labels">
                        <span className="bar-name">Creative Strategy & Problem Solving</span>
                        <span className="bar-percent">89%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill emerald-fill" style={{ width: '89%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="preview-recommendation-chip">
                    <Sparkles size={14} />
                    <span>Top Match: AI & Machine Learning Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── BENTO 2: ACTIONABLE ROADMAP ── */}
          <motion.div
            className="bento-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25 } }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-pill icon-purple">
                <Map size={20} />
              </div>
              <span className="bento-tag">STEP-BY-STEP</span>
            </div>
            <h3 className="bento-title">Personalized Career Roadmaps</h3>
            <p className="bento-desc">
              Structured milestone progressions showing exactly what tools, concepts,
              and certifications to master at each stage of your education.
            </p>

            {/* Visual Roadmap Steps */}
            <div className="bento-roadmap-timeline">
              <div className="timeline-node active-node">
                <span className="node-number">01</span>
                <div className="node-content">
                  <span className="node-title">Foundations</span>
                  <span className="node-detail">Core CS, Algorithms, Git</span>
                </div>
              </div>
              <div className="timeline-connector" />
              <div className="timeline-node active-node">
                <span className="node-number">02</span>
                <div className="node-content">
                  <span className="node-title">Specialization</span>
                  <span className="node-detail">PyTorch, Transformers, RAG</span>
                </div>
              </div>
              <div className="timeline-connector" />
              <div className="timeline-node">
                <span className="node-number">03</span>
                <div className="node-content">
                  <span className="node-title">Industry Capstone</span>
                  <span className="node-detail">Production-grade deploy</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── BENTO 3: FUTURE SIMULATOR ── */}
          <motion.div
            className="bento-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25 } }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-pill icon-emerald">
                <TrendingUp size={20} />
              </div>
              <span className="bento-tag">PREDICTIVE</span>
            </div>
            <h3 className="bento-title">5-Year Trajectory Simulator</h3>
            <p className="bento-desc">
              Simulate your growth trajectory before committing. Contrast compensation
              escalations, market liquidity, and work-life balance over a 5-year timeline.
            </p>

            {/* Visual Trajectory Graph */}
            <div className="bento-trajectory-preview">
              <div className="trajectory-milestones">
                <div className="trajectory-step">
                  <span className="traj-year">Entry</span>
                  <span className="traj-salary">₹9 LPA</span>
                  <div className="traj-bar" style={{ height: '35%' }} />
                </div>
                <div className="trajectory-step">
                  <span className="traj-year">Year 3</span>
                  <span className="traj-salary">₹18 LPA</span>
                  <div className="traj-bar" style={{ height: '65%' }} />
                </div>
                <div className="trajectory-step highlight-step">
                  <span className="traj-year">Year 5</span>
                  <span className="traj-salary">₹34 LPA</span>
                  <div className="traj-bar traj-bar-highlight" style={{ height: '100%' }} />
                </div>
              </div>
              <div className="trajectory-caption">
                <TrendingUp size={13} className="text-emerald-400" />
                <span>3.7x Projected 5-Year Compensation Multiplier</span>
              </div>
            </div>
          </motion.div>

          {/* ── BENTO 4: COLLEGE & SCHOLARSHIP FINDER ── */}
          <motion.div
            className="bento-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25 } }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-pill icon-blue">
                <GraduationCap size={20} />
              </div>
              <span className="bento-tag">ACADEMIC ROI</span>
            </div>
            <h3 className="bento-title">College & Scholarship Navigator</h3>
            <p className="bento-desc">
              Connect target careers directly to accredited institutions, high-ROI
              programs, and verified scholarships that ease your academic journey.
            </p>

            <div className="bento-college-pills">
              <div className="college-pill-item">
                <span className="pill-dot" />
                <span>Top Tier Institutes & Universities</span>
              </div>
              <div className="college-pill-item">
                <span className="pill-dot" />
                <span>Merit-Based Scholarships</span>
              </div>
              <div className="college-pill-item">
                <span className="pill-dot" />
                <span>Direct Placement Data</span>
              </div>
            </div>
          </motion.div>

          {/* ── BENTO 5: PLAN B ADAPTIVE GENERATOR ── */}
          <motion.div
            className="bento-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25 } }}
          >
            <div className="bento-card-header">
              <div className="bento-icon-pill icon-violet">
                <ShieldCheck size={20} />
              </div>
              <span className="bento-tag">RESILIENCE</span>
            </div>
            <h3 className="bento-title">Adaptive Plan B Generator</h3>
            <p className="bento-desc">
              Career paths aren't linear. AVENZA maps adjacent domains sharing high skill
              overlap, ensuring you always hold a strategic, high-value alternative.
            </p>

            <div className="bento-planb-preview">
              <div className="planb-switch-row">
                <div className="planb-primary">
                  <span className="planb-tag">Primary</span>
                  <span className="planb-role">Software Engineer</span>
                </div>
                <div className="planb-icon-swap">
                  <GitBranch size={16} />
                </div>
                <div className="planb-fallback">
                  <span className="planb-tag fallback-tag">Plan B</span>
                  <span className="planb-role">DevOps Architect</span>
                </div>
              </div>
              <div className="planb-overlap-bar">
                <span>92% Skill Compatibility Transfer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
