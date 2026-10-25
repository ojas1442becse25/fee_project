import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Compass,
  Sparkles,
  Target,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BrainCircuit,
  Sliders,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import './About.css'

function About() {
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

  const workflowSteps = [
    {
      stage: 'STAGE 01',
      title: 'Academic Foundations',
      desc: 'Capture education stage, current academic focus (Science, CS, Commerce, Arts), and performance benchmarks.',
      icon: Layers,
    },
    {
      stage: 'STAGE 02',
      title: 'Passion & Strengths Profiling',
      desc: 'Identify core cognitive strengths—analytical reasoning, creative design, problem-solving, and leadership.',
      icon: BrainCircuit,
    },
    {
      stage: 'STAGE 03',
      title: 'Weighted Match Scoring',
      desc: 'Profile vectors cross-reference against 12+ real-world career prerequisites to calculate honest match percentages.',
      icon: Sliders,
    },
    {
      stage: 'STAGE 04',
      title: 'Milestone Roadmaps',
      desc: 'Access curated technical competencies, expected salary compensation curves, and track bookmarked pathways.',
      icon: TrendingUp,
    },
  ]

  const comparisons = [
    {
      criterion: 'Guidance Approach',
      traditional: 'Static, one-size-fits-all questionnaires with generic labels.',
      avenza: 'Dynamic multi-factor alignment weighting academic stream, skills, and goals.',
    },
    {
      criterion: 'Scoring Transparency',
      traditional: 'Mysterious black-box results with no explanation of "why".',
      avenza: 'Transparent breakdown showing interest overlap and skill alignment.',
    },
    {
      criterion: 'Actionable Clarity',
      traditional: 'Vague career definitions with outdated textbook syllabi.',
      avenza: 'Realistic industry skills, salary insights, and step-by-step roadmaps.',
    },
    {
      criterion: 'Student Privacy & Speed',
      traditional: 'Aggressive marketing funnels and forced sales calls.',
      avenza: '100% private, instant client-side computation with zero spam.',
    },
  ]

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Editorial Hero */}
        <motion.section
          className="about-hero"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="about-pill">
            <Compass size={15} />
            <span>Platform Manifesto • Student-First Discovery</span>
          </div>

          <h1 className="about-hero-title">
            Democratizing <span className="gradient-text">Career Clarity</span> for Every Student.
          </h1>

          <p className="about-hero-sub">
            AVENZA was engineered to solve one fundamental dilemma: students making life-defining
            decisions in the dark. We replace peer pressure and scattered opinions with an explainable,
            data-driven guidance engine.
          </p>

          {/* Fact Sheet Spec Bar */}
          <div className="about-fact-bar">
            <div className="about-fact-item">
              <span className="about-fact-value">12+</span>
              <span className="about-fact-label">Curated Roles</span>
              <span className="about-fact-desc">Tech, design, science & law</span>
            </div>
            <div className="about-fact-item">
              <span className="about-fact-value">4</span>
              <span className="about-fact-label">Evaluation Vectors</span>
              <span className="about-fact-desc">Stream, skills, goals & interests</span>
            </div>
            <div className="about-fact-item">
              <span className="about-fact-value">100%</span>
              <span className="about-fact-label">Explainable Scoring</span>
              <span className="about-fact-desc">Zero black-box mystery</span>
            </div>
            <div className="about-fact-item">
              <span className="about-fact-value">Client-Side</span>
              <span className="about-fact-label">Fast & Private</span>
              <span className="about-fact-desc">Instant offline-resilient SPA</span>
            </div>
          </div>
        </motion.section>

        {/* Narrative / Problem Section */}
        <section className="about-narrative-section">
          <div className="about-narrative-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="about-section-tag">
                <Target size={14} /> The Problem We Address
              </span>
              <h2 className="about-section-heading">
                The Crisis of Uninformed Choices
              </h2>
              <p className="about-body-text">
                Every year, millions of students choose academic streams and career paths based on
                fragmented internet rumors, rigid social expectations, or high-pressure entrance exams.
                The consequence is widespread burnout, career regret, and students discovering too late
                that their day-to-day work does not align with their actual strengths.
              </p>
              <p className="about-body-text">
                Traditional career counseling is often either prohibitively expensive or consists of
                superficial personality quizzes that fail to connect academic realities with current
                industry demands.
              </p>

              <div className="about-quote-box">
                "A student’s career path shouldn’t be chosen by default; it should be anchored in
                intellectual curiosity, demonstrable strengths, and realistic market roadmaps."
              </div>
            </motion.div>

            {/* Comparison Matrix */}
            <motion.div
              className="about-comparison-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="comparison-header">The Paradigm Shift</div>
              {comparisons.map((item, idx) => (
                <div key={idx} className="comparison-item">
                  <span className="comparison-row-title">{item.criterion}</span>
                  <div className="comparison-bad">
                    <XCircle size={16} className="shrink-0" style={{ marginTop: '2px' }} />
                    <span>{item.traditional}</span>
                  </div>
                  <div className="comparison-good">
                    <CheckCircle2 size={16} className="shrink-0" style={{ marginTop: '2px' }} />
                    <span>{item.avenza}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bento Philosophy Grid */}
        <section className="about-bento-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}
          >
            <span className="about-section-tag">
              <Sparkles size={14} /> Our Core Philosophy
            </span>
            <h2 className="about-section-heading">Principles Behind the Platform</h2>
            <p className="about-body-text">
              Built on empathy, algorithmic rigor, and student empowerment.
            </p>
          </motion.div>

          <div className="about-bento-grid">
            {/* Bento Card 1 - Large */}
            <motion.div
              className="bento-card bento-card--large"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="bento-icon-box">
                <Cpu size={24} />
              </div>
              <h3 className="bento-card-title">Transparent, Explainable Alignment</h3>
              <p className="bento-card-body">
                We believe that black-box guidance algorithms alienate students. Instead of a single
                arbitrary percentage, AVENZA breaks down the overlap between a user's stated academic
                stream, selected strengths, and genuine curiosity. If software engineering ranks high,
                the student sees exactly which interests—like problem solving and logic—drove that result.
              </p>
              <div className="bento-tags">
                <span className="bento-tag">Academic Stream Weighting</span>
                <span className="bento-tag">Cross-Disciplinary Aliasing</span>
                <span className="bento-tag">Real-Time Scoring</span>
                <span className="bento-tag">0% Data Tracking</span>
              </div>
            </motion.div>

            {/* Bento Card 2 */}
            <motion.div
              className="bento-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="bento-icon-box purple">
                <TrendingUp size={24} />
              </div>
              <h3 className="bento-card-title">Market Realism Over Hype</h3>
              <p className="bento-card-body">
                We pair every career recommendation with real data: compensation ranges, difficulty
                curves, and current market demand. Students prepare for real industries, not abstract theories.
              </p>
              <div className="bento-tags">
                <span className="bento-tag">Verified Skill Sets</span>
                <span className="bento-tag">Salary Expectations</span>
              </div>
            </motion.div>

            {/* Bento Card 3 */}
            <motion.div
              className="bento-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              variants={fadeUp}
            >
              <div className="bento-icon-box emerald">
                <ShieldCheck size={24} />
              </div>
              <h3 className="bento-card-title">Agency & The "Plan B"</h3>
              <p className="bento-card-body">
                Career journeys are rarely linear. AVENZA encourages bookmarking alternative options
                and comparing adjacent paths so students always have confident backup strategies.
              </p>
              <div className="bento-tags">
                <span className="bento-tag">Saved Careers Tracker</span>
                <span className="bento-tag">Multi-Path Comparison</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workflow / Architecture Section */}
        <section className="about-workflow-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
          >
            <span className="about-section-tag">
              <Layers size={14} /> The Guidance Engine
            </span>
            <h2 className="about-section-heading">How Career Discovery Works</h2>
            <p className="about-body-text">
              Four structured phases from initial intake to personalized career roadmaps.
            </p>
          </motion.div>

          <div className="workflow-track">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={idx}
                  className="workflow-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                >
                  <div className="workflow-header">
                    <span className="workflow-stage-pill">{step.stage}</span>
                    <Icon size={20} className="workflow-icon" />
                  </div>
                  <h3 className="workflow-title">{step.title}</h3>
                  <p className="workflow-desc">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Polished Closing Section with CTA */}
        <motion.section
          className="about-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="about-cta-title">Find Where Your Strengths Meet the Future</h2>
          <p className="about-cta-desc">
            Take our guided career discovery assessment to explore matched professions, review
            detailed skills roadmaps, and save your favorite paths.
          </p>
          <div className="about-cta-buttons">
            <Link to="/career-discovery" className="btn btn-primary">
              <span>Begin Career Discovery</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/career-recommendations" className="btn btn-secondary">
              <span>Explore All Careers</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
