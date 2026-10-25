import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  Bookmark,
  ArrowRight,
  LayoutDashboard,
  Sliders,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Check,
} from 'lucide-react'
import './Features.css'

function Features() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : custom * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <div className="features-page">
      <div className="features-container">
        {/* Hero Section */}
        <motion.section
          className="features-hero"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="features-pill">
            <Sparkles size={14} />
            <span>Platform Capabilities • Technical Architecture</span>
          </div>

          <h1 className="features-hero-title">
            Engineered for <span className="gradient-text">Intelligent Career Discovery</span>
          </h1>

          <p className="features-hero-sub">
            Explore the complete suite of tools built into AVENZA: interactive multi-dimensional
            intake, explainable match scoring, comprehensive career roadmaps, and student dashboard tracking.
          </p>

          <div className="features-jump-bar">
            <a href="#assessment" className="jump-tag">
              <BrainCircuit size={14} />
              <span>Assessment Engine</span>
            </a>
            <a href="#recommendations" className="jump-tag">
              <Sliders size={14} />
              <span>Match Scoring</span>
            </a>
            <a href="#roadmaps" className="jump-tag">
              <TrendingUp size={14} />
              <span>Career Roadmaps</span>
            </a>
            <a href="#dashboard" className="jump-tag">
              <LayoutDashboard size={14} />
              <span>Saved Careers</span>
            </a>
          </div>
        </motion.section>

        {/* Feature Showcases (Alternating Layout) */}
        <div className="features-showcases">
          {/* SHOWCASE 1: Text Left, UI Right */}
          <section id="assessment" className="showcase-row">
            <motion.div
              className="showcase-text-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="showcase-eyebrow">
                <BrainCircuit size={14} /> 01 / Intake Engine
              </span>
              <h2 className="showcase-title">Interactive Multi-Dimensional Assessment</h2>
              <p className="showcase-desc">
                Instead of rigid, outdated questionnaires, AVENZA guides you through a progressive
                intake flow capturing your education level, current academic stream, academic standing,
                and core strengths.
              </p>

              <ul className="showcase-checklist">
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Dynamic Strengths & Interest Tags:</strong> Select from real competencies
                    like Problem Solving, Creative Design, Machine Learning, and Analytical Logic.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Client-Side Confidentiality:</strong> Instant assessment execution in your
                    browser with zero third-party telemetry.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Progress Preservation:</strong> Step-by-step navigation allowing you to
                    revise selections before calculating matches.
                  </span>
                </li>
              </ul>

              <div className="showcase-cta-group">
                <Link to="/career-discovery" className="btn btn-primary">
                  <span>Start Assessment</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="showcase-ui-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="mock-window-card">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                  </div>
                  <span className="window-title">avenza-assessment.step-2</span>
                  <span className="window-badge">Interactive</span>
                </div>
                <div className="window-body">
                  <div className="mock-step-indicator">
                    <span>Step 2 of 4</span>
                    <span>50% Completed</span>
                  </div>
                  <div className="mock-progress-track">
                    <div className="mock-progress-fill" />
                  </div>
                  <h3 className="mock-question-title">What are your primary cognitive strengths?</h3>
                  <div className="mock-tag-grid">
                    <span className="mock-tag active">
                      <Check size={14} className="mock-tag-icon" /> Problem Solving
                    </span>
                    <span className="mock-tag active">
                      <Check size={14} className="mock-tag-icon" /> Analytical Thinking
                    </span>
                    <span className="mock-tag active">
                      <Check size={14} className="mock-tag-icon" /> Creative Design
                    </span>
                    <span className="mock-tag">Communication</span>
                    <span className="mock-tag">Research & Data</span>
                    <span className="mock-tag">Leadership</span>
                  </div>
                  <div className="mock-footer-bar">
                    <span>3 strengths selected</span>
                    <span style={{ color: '#38bdf8', fontWeight: 600 }}>Next: Specific Interests →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* SHOWCASE 2: UI Left, Text Right (Alternating Reverse) */}
          <section id="recommendations" className="showcase-row showcase-row--reverse">
            <motion.div
              className="showcase-ui-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="mock-window-card">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                  </div>
                  <span className="window-title">matching-engine.matrix</span>
                  <span className="window-badge">Top Result</span>
                </div>
                <div className="window-body">
                  <div className="mock-match-header">
                    <div className="mock-score-circle">
                      <span className="mock-score-num">96%</span>
                      <span className="mock-score-text">Match</span>
                    </div>
                    <div className="mock-career-info">
                      <h4>Artificial Intelligence Engineer</h4>
                      <div className="mock-meta-badges">
                        <span className="mock-mini-badge emerald">High Demand</span>
                        <span className="mock-mini-badge">Technology</span>
                        <span className="mock-mini-badge">$115k - $170k</span>
                      </div>
                    </div>
                  </div>

                  <div className="mock-bars-list">
                    <div className="mock-bar-item">
                      <div className="mock-bar-label">
                        <span>Interest Alignment (Coding, AI, Research)</span>
                        <strong>98%</strong>
                      </div>
                      <div className="mock-bar-bg">
                        <div className="mock-bar-val" style={{ width: '98%', background: '#34d399' }} />
                      </div>
                    </div>
                    <div className="mock-bar-item">
                      <div className="mock-bar-label">
                        <span>Academic Stream Fit (Computer Science)</span>
                        <strong>95%</strong>
                      </div>
                      <div className="mock-bar-bg">
                        <div className="mock-bar-val" style={{ width: '95%', background: '#38bdf8' }} />
                      </div>
                    </div>
                    <div className="mock-bar-item">
                      <div className="mock-bar-label">
                        <span>Cognitive Strengths Overlap</span>
                        <strong>94%</strong>
                      </div>
                      <div className="mock-bar-bg">
                        <div className="mock-bar-val" style={{ width: '94%', background: '#818cf8' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="showcase-text-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <span className="showcase-eyebrow">
                <Sliders size={14} /> 02 / Matching Intelligence
              </span>
              <h2 className="showcase-title">Explainable Match Scoring & Recommendations</h2>
              <p className="showcase-desc">
                No mystery scores. AVENZA cross-references your profile vectors against verified role
                specifications, calculating a weighted compatibility percentage and outlining the
                factors driving your top matches.
              </p>

              <ul className="showcase-checklist">
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Transparent Scoring Breakdown:</strong> See precisely how your academic
                    stream, interests, and skills compound into your match score.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Ranked Career Catalog:</strong> Browse suggestions ordered by compatibility,
                    with direct filtering across Technology, Design, Science, and Business.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Real-Time Refresh:</strong> Adjust assessment responses to immediately see
                    how new skills influence ranking.
                  </span>
                </li>
              </ul>

              <div className="showcase-cta-group">
                <Link to="/career-recommendations" className="btn btn-primary">
                  <span>View Recommendations</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </section>

          {/* SHOWCASE 3: Text Left, UI Right */}
          <section id="roadmaps" className="showcase-row">
            <motion.div
              className="showcase-text-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="showcase-eyebrow">
                <TrendingUp size={14} /> 03 / Career Roadmaps
              </span>
              <h2 className="showcase-title">In-Depth Career Profiles, Skills & Milestones</h2>
              <p className="showcase-desc">
                Every career in the AVENZA catalog includes an in-depth profile at
                <code>/career/:careerSlug</code>. Review real compensation benchmarks, market demand
                levels, prerequisite skills, and a sequential milestone roadmap.
              </p>

              <ul className="showcase-checklist">
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Milestone-Based Roadmaps:</strong> Step-by-step guidance from entry-level
                    foundations to senior specialization.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Curated Industry Skill Tags:</strong> Key languages, tools, and paradigms
                    demanded by modern hiring managers.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Salary & Growth Outlook:</strong> Transparent market compensation curves
                    and industry expansion metrics.
                  </span>
                </li>
              </ul>

              <div className="showcase-cta-group">
                <Link to="/career/software-engineer" className="btn btn-primary">
                  <span>Explore Software Engineer</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="showcase-ui-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="mock-window-card">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                  </div>
                  <span className="window-title">career-profile.software-engineer</span>
                  <span className="window-badge">Verified Data</span>
                </div>
                <div className="window-body mock-detail-card">
                  <div className="mock-detail-role">
                    <div>
                      <h4>Software Engineer</h4>
                      <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Engineering & Systems</span>
                    </div>
                    <span className="mock-salary-tag">$105,000 - $160,000 / yr</span>
                  </div>

                  <div className="mock-skills-chips">
                    <span className="mock-skill-chip">React / Web</span>
                    <span className="mock-skill-chip">System Design</span>
                    <span className="mock-skill-chip">Data Structures</span>
                    <span className="mock-skill-chip">Node.js</span>
                    <span className="mock-skill-chip">Cloud / APIs</span>
                  </div>

                  <div className="mock-roadmap-preview">
                    <div className="mock-milestone">
                      <span className="mock-milestone-dot" />
                      <span><strong>Stage 1: Core Foundations</strong> — CS fundamentals & algorithms</span>
                    </div>
                    <div className="mock-milestone">
                      <span className="mock-milestone-dot" />
                      <span><strong>Stage 2: Modern Stacks</strong> — Full-stack frameworks & databases</span>
                    </div>
                    <div className="mock-milestone">
                      <span className="mock-milestone-dot" />
                      <span><strong>Stage 3: Production Systems</strong> — Distributed systems & scalability</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* SHOWCASE 4: UI Left, Text Right (Alternating Reverse) */}
          <section id="dashboard" className="showcase-row showcase-row--reverse">
            <motion.div
              className="showcase-ui-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="mock-window-card">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                  </div>
                  <span className="window-title">dashboard.saved-careers</span>
                  <span className="window-badge">Context Sync</span>
                </div>
                <div className="window-body mock-dashboard-preview">
                  <div className="mock-dash-tabs">
                    <span className="mock-dash-tab active">Saved Careers (3)</span>
                    <span className="mock-dash-tab">Student Profile</span>
                  </div>

                  <div className="mock-saved-item">
                    <div>
                      <div className="mock-saved-title">Software Engineer</div>
                      <div className="mock-saved-meta">Saved Oct 2026 • Computer Science</div>
                    </div>
                    <span className="mock-saved-score">94% Match</span>
                  </div>

                  <div className="mock-saved-item">
                    <div>
                      <div className="mock-saved-title">Data Scientist</div>
                      <div className="mock-saved-meta">Saved Oct 2026 • AI & Analytics</div>
                    </div>
                    <span className="mock-saved-score">91% Match</span>
                  </div>

                  <div className="mock-saved-item">
                    <div>
                      <div className="mock-saved-title">UI / UX Designer</div>
                      <div className="mock-saved-meta">Saved Oct 2026 • Product Design</div>
                    </div>
                    <span className="mock-saved-score">88% Match</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="showcase-text-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <span className="showcase-eyebrow">
                <Bookmark size={14} /> 04 / Student Workspace
              </span>
              <h2 className="showcase-title">Saved Careers Library & Student Dashboard</h2>
              <p className="showcase-desc">
                Found careers that resonate? Bookmark any profession with a single click. Review your
                shortlisted options anytime in your private Dashboard, track your goals, and manage your
                profile.
              </p>

              <ul className="showcase-checklist">
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Global State Synchronization:</strong> React Context API ensures your
                    saved count immediately reflects in the Navbar and across pages.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Offline-Safe Storage:</strong> Bookmarks persist safely in localStorage so
                    your curated list is ready whenever you return.
                  </span>
                </li>
                <li className="showcase-checklist-item">
                  <CheckCircle2 size={18} className="showcase-check-icon" />
                  <span>
                    <strong>Student Profile Hub:</strong> View assessment history, academic stream, and
                    account information in one clean dashboard.
                  </span>
                </li>
              </ul>

              <div className="showcase-cta-group">
                <Link to="/dashboard/saved-careers" className="btn btn-primary">
                  <span>View Saved Careers</span>
                  <Bookmark size={17} />
                </Link>
                <Link to="/dashboard" className="btn btn-secondary">
                  <span>Open Dashboard</span>
                </Link>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Complementary Capabilities Bento */}
        <section className="features-grid-section">
          <motion.div
            className="features-grid-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="showcase-eyebrow">
              <Zap size={14} /> Core Architectural Pillars
            </span>
            <h2 className="showcase-title">Built for Performance, Clarity & Trust</h2>
            <p className="showcase-desc">
              Designed from the ground up for modern web standards and smooth user interactions.
            </p>
          </motion.div>

          <div className="complementary-grid">
            <motion.div
              className="comp-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="comp-icon-box">
                <Globe size={22} />
              </div>
              <h3 className="comp-title">Dynamic Route Architecture</h3>
              <p className="comp-desc">
                React Router v7 handles direct URL navigation, query persistence, parameterized routes
                (<code>/career/:careerSlug</code>), and nested protected layouts with graceful 404 fallbacks.
              </p>
            </motion.div>

            <motion.div
              className="comp-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="comp-icon-box">
                <ShieldCheck size={22} />
              </div>
              <h3 className="comp-title">Client-First Privacy & Speed</h3>
              <p className="comp-desc">
                Powered by React 19 and Vite. Assessment computations, filtering, and bookmark state
                run 100% in your browser for instant responsiveness with no latency.
              </p>
            </motion.div>

            <motion.div
              className="comp-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              variants={fadeUp}
            >
              <div className="comp-icon-box">
                <Star size={22} />
              </div>
              <h3 className="comp-title">Accessible & Motion-Aware</h3>
              <p className="comp-desc">
                Engineered with semantic HTML5 landmarks, high-contrast dark palette, keyboard
                navigability, and automated <code>prefers-reduced-motion</code> compliance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Polished Closing Section with CTA */}
        <motion.section
          className="features-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="features-cta-title">Ready to Map Your Ideal Career Path?</h2>
          <p className="features-cta-desc">
            Experience the complete AVENZA platform today. Discover career matches tailored to your
            unique strengths and explore in-depth skill roadmaps.
          </p>
          <div className="features-cta-buttons">
            <Link to="/career-discovery" className="btn btn-primary">
              <span>Start Career Assessment</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/career-recommendations" className="btn btn-secondary">
              <span>Browse All Careers</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Features
