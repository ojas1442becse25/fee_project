import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  animate
} from 'framer-motion'
import {
  Brain,
  Code2,
  Palette,
  Database,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Activity,
  Rotate3d
} from 'lucide-react'
import './HeroVisual.css'

// Career node data for galaxy visualization
const CAREER_NODES = [
  { id: 'ai', label: 'AI', color: '#38bdf8', angle: 0 },
  { id: 'dev', label: 'DEV', color: '#818cf8', angle: 90 },
  { id: 'data', label: 'DATA', color: '#34d399', angle: 180 },
  { id: 'design', label: 'DESIGN', color: '#c084fc', angle: 270 },
]

// Generate particle positions once (stable across renders)
const generateParticles = () =>
  Array.from({ length: 12 }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 2,
  }))

const PARTICLES = generateParticles()

const DOMAINS = [
  {
    id: 'ai',
    title: 'AI Systems Engineer',
    category: 'Artificial Intelligence',
    icon: Brain,
    match: 98.4,
    salary: '₹14 – 38 LPA',
    growth: '+42% YoY',
    demand: 'Critical Demand',
    skills: ['PyTorch', 'LLMs', 'Vector DBs', 'RAG'],
    badgeColor: '#38BDF8',
    roadmap: 'Foundations → Deep Learning → Agentic AI',
  },
  {
    id: 'dev',
    title: 'Cloud Systems Architect',
    category: 'Engineering & Cloud',
    icon: Code2,
    match: 95.2,
    salary: '₹12 – 32 LPA',
    growth: '+29% YoY',
    demand: 'Very High',
    skills: ['Distributed Systems', 'Kubernetes', 'Go', 'AWS'],
    badgeColor: '#818CF8',
    roadmap: 'Core CS → Microservices → Scale Architecture',
  },
  {
    id: 'data',
    title: 'Data & Decision Scientist',
    category: 'Data Science',
    icon: Database,
    match: 96.8,
    salary: '₹13 – 35 LPA',
    growth: '+35% YoY',
    demand: 'High Demand',
    skills: ['Statistical Modeling', 'MLOps', 'Python', 'SQL'],
    badgeColor: '#34D399',
    roadmap: 'Math & Stats → ML Pipelines → Executive Insights',
  },
  {
    id: 'design',
    title: 'Lead Product Designer',
    category: 'Design & UX',
    icon: Palette,
    match: 93.5,
    salary: '₹10 – 26 LPA',
    growth: '+22% YoY',
    demand: 'High Demand',
    skills: ['Design Systems', 'UX Research', 'Figma', 'Interaction'],
    badgeColor: '#C084FC',
    roadmap: 'Visual Craft → Behavioral Psychology → Strategy',
  },
]

// Career node component to handle orbit animation
function CareerNodeComponent({ node, shouldReduceMotion }) {
  const nodeRotation = useMotionValue(node.angle)
  const orbitRadius = 140

  useEffect(() => {
    if (shouldReduceMotion) return

    animate(nodeRotation, node.angle + 360, {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
    })
  }, [nodeRotation, node.angle, shouldReduceMotion])

  const xPos = useTransform(nodeRotation, (angle) => Math.cos((angle * Math.PI) / 180) * orbitRadius)
  const yPos = useTransform(nodeRotation, (angle) => Math.sin((angle * Math.PI) / 180) * orbitRadius)

  return (
    <motion.div
      key={node.id}
      className="career-node"
      style={{
        x: xPos,
        y: yPos,
        transformStyle: 'preserve-3d',
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.3,
              zIndex: 10,
              transition: { duration: 0.2 },
            }
      }
    >
      <div className="node-sphere" style={{ background: node.color }}>
        <div className="node-glow" style={{ boxShadow: `0 0 24px ${node.color}` }} />
        <span className="node-label">{node.label}</span>
      </div>
    </motion.div>
  )
}

function HeroVisual() {
  const shouldReduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const consoleRef = useRef(null)
  const [activeDomainIndex, setActiveDomainIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const currentDomain = DOMAINS[activeDomainIndex]

  // Normalized pointer coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced spring physics for more pronounced 3D tilt (15–22 degrees) with snappy response
  const springConfig = { damping: 16, stiffness: 160, mass: 0.6 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), springConfig)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springConfig)

  // 360-degree rotation value
  const spinY = useMotionValue(0)
  const combinedRotateY = useTransform([tiltY, spinY], ([tilt, spin]) => tilt + spin)

  // Enhanced floating satellites parallax with more pronounced movement
  const satSpringConfig = { damping: 14, stiffness: 100 }
  const parallaxX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-48, 48]), satSpringConfig)
  const parallaxY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-36, 36]), satSpringConfig)
  const parallaxX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [44, -44]), satSpringConfig)
  const parallaxY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [32, -32]), satSpringConfig)

  // Enhanced cursor-following glow with faster response
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const smoothGlowX = useSpring(glowX, { damping: 20, stiffness: 220 })
  const smoothGlowY = useSpring(glowY, { damping: 20, stiffness: 220 })

  const handlePointerMove = (e) => {
    if (window.innerWidth < 960 || isSpinning) return
    const el = consoleRef.current || stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(normX)
    mouseY.set(normY)

    const pctX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const pctY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    glowX.set(pctX)
    glowY.set(pctY)
  }

  const handlePointerEnter = () => setIsHovered(true)
  const handlePointerLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  // Trigger one full 360-degree inspection spin
  const handle360Spin = (e) => {
    e.stopPropagation()
    if (isSpinning) return
    setIsSpinning(true)
    animate(spinY, [0, 360], {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        spinY.set(0)
        setIsSpinning(false)
      }
    })
  }

  // Track global mouse when cursor is outside the stage
  useEffect(() => {
    if (shouldReduceMotion) return

    const handleGlobalMove = (e) => {
      if (isHovered || isSpinning || window.innerWidth < 960) return
      const normX = (e.clientX / window.innerWidth - 0.5) * 0.25
      const normY = (e.clientY / window.innerHeight - 0.5) * 0.25
      mouseX.set(normX)
      mouseY.set(normY)
    }

    window.addEventListener('mousemove', handleGlobalMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleGlobalMove)
  }, [mouseX, mouseY, shouldReduceMotion, isHovered, isSpinning])

  return (
    <div
      className={`hero-3d-stage ${isHovered ? 'stage-hovered' : ''}`}
      ref={stageRef}
      aria-label="Interactive Career Intelligence Engine"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-3d-canvas">
        {/* ── Particle Field Background ── */}
        <div className="hero-particle-field" aria-hidden="true">
          {PARTICLES.map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: [0.1, 0.4, 0.1],
                      scale: [0.8, 1.2, 0.8],
                    }
              }
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Deep Backdrop Matrix Ring in Z-space */}
        <div className="hero-matrix-backdrop" />

        {/* ── Orbital Rings (3D Depth Layers) ── */}
        <motion.div
          className="orbital-ring-outer"
          animate={shouldReduceMotion ? {} : { rotateZ: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="orbital-ring-mid"
          animate={shouldReduceMotion ? {} : { rotateZ: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="orbital-ring-inner"
          animate={shouldReduceMotion ? {} : { rotateZ: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* ── Central Energy Orb ── */}
        <motion.div
          className="central-energy-orb"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.8, 1, 0.8],
                }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}
        >
          <div className="orb-core" />
          <div className="orb-glow-1" />
          <div className="orb-glow-2" />
          <motion.div
            className="orb-pulse"
            animate={shouldReduceMotion ? {} : { scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.div>

        {/* ── Orbiting Career Nodes ── */}
        {CAREER_NODES.map((node) => (
          <CareerNodeComponent key={node.id} node={node} shouldReduceMotion={shouldReduceMotion} />
        ))}

        {/* ── Connecting Lines ── */}
        <svg className="connection-lines" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {CAREER_NODES.map((node, idx) => {
            const nextNode = CAREER_NODES[(idx + 1) % CAREER_NODES.length]
            const startAngle = (node.angle * Math.PI) / 180
            const endAngle = (nextNode.angle * Math.PI) / 180
            const radius = 70
            const x1 = 150 + Math.cos(startAngle) * radius
            const y1 = 150 + Math.sin(startAngle) * radius
            const x2 = 150 + Math.cos(endAngle) * radius
            const y2 = 150 + Math.sin(endAngle) * radius

            return (
              <motion.line
                key={`line-${node.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#line-gradient)"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                }}
              />
            )
          })}
        </svg>

        {/* ── FLOATING SATELLITE 1: Top Right (AI Trajectory Engine) ── */}
        <motion.div
          className="hero-floating-badge-wrapper badge-top-right"
          style={shouldReduceMotion ? {} : { x: parallaxX1, y: parallaxY1 }}
        >
          <motion.div
            className="hero-floating-badge"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -8, 0],
                    x: [0, 3, 0],
                    rotateZ: [0, 0.8, 0],
                  }
            }
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.08,
                    y: -6,
                    rotateZ: -2,
                    rotateX: 6,
                    translateZ: 70,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }
            }
          >
            <div className="floating-badge-icon cyan-glow">
              <Sparkles size={15} />
            </div>
            <div className="floating-badge-content">
              <div className="badge-highlight-row">
                <span className="badge-title">AI Trajectory Engine</span>
                <span className="badge-tag-live">Active</span>
              </div>
              <span className="badge-subtext">50+ Verified Career Graphs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── CENTRAL CONSOLE: Career Intelligence Core ── */}
        <motion.div
          ref={consoleRef}
          className="hero-core-console"
          style={
            shouldReduceMotion
              ? {}
              : {
                  rotateX: tiltX,
                  rotateY: combinedRotateY,
                  transformStyle: 'preserve-3d',
                }
          }
          animate={
            shouldReduceMotion || isHovered || isSpinning
              ? {}
              : {
                  y: [0, -7, 0],
                  rotateZ: [0, 0.3, -0.3, 0],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Dynamic Cursor-Following Glare Sheen Overlay */}
          <motion.div
            className="console-glare-overlay"
            style={{
              opacity: isHovered ? 1 : 0,
              background: useTransform(
                [smoothGlowX, smoothGlowY],
                ([x, y]) =>
                  `radial-gradient(520px circle at ${x}% ${y}%, rgba(56, 189, 248, 0.24) 0%, rgba(96, 165, 250, 0.12) 25%, rgba(255, 255, 255, 0.04) 50%, transparent 75%)`
              ),
            }}
          />

          {/* Top Status Header */}
          <div className="console-status-bar">
            <div className="console-status-indicator">
              <span className="pulse-dot" />
              <span className="console-status-text">AVENZA NEURAL CORE</span>
            </div>
            <div className="console-header-actions">
              <button
                type="button"
                className={`console-360-btn ${isSpinning ? 'spinning' : ''}`}
                onClick={handle360Spin}
                aria-label="Rotate dashboard 360 degrees in 3D"
                title="Inspect in 3D (360° spin)"
              >
                <Rotate3d size={13} className="spin-icon" />
                <span>360° 3D</span>
              </button>
              <div className="console-model-badge">
                <Activity size={12} />
                <span>Real-Time Fit</span>
              </div>
            </div>
          </div>

          {/* Interactive Domain Switcher Pill Tabs */}
          <div className="console-domain-tabs" role="tablist" aria-label="Select career discipline">
            {DOMAINS.map((domain, idx) => {
              const Icon = domain.icon
              const isActive = idx === activeDomainIndex
              return (
                <motion.button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`domain-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveDomainIndex(idx)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2, translateZ: 36 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <Icon size={13} />
                  <span>{domain.id.toUpperCase()}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Dynamic Career Intelligence Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDomain.id}
              className="console-main-body"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="console-role-header">
                <div>
                  <span className="console-category-label">{currentDomain.category}</span>
                  <h3 className="console-role-title">{currentDomain.title}</h3>
                </div>
                <div className="console-match-score">
                  <div className="match-score-number">{currentDomain.match}%</div>
                  <div className="match-score-label">Fit Index</div>
                </div>
              </div>

              {/* Match Progress Bar */}
              <div className="console-meter-container">
                <div className="console-meter-bar">
                  <motion.div
                    className="console-meter-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentDomain.match}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="console-meter-labels">
                  <span>Match Confidence</span>
                  <span className="text-cyan-accent">Optimal Match</span>
                </div>
              </div>

              {/* Data Grid: Salary & Growth */}
              <div className="console-metrics-row">
                <motion.div
                  className="metric-box"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -3, translateZ: 44 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="metric-box-label">Avg. Industry CTC</span>
                  <span className="metric-box-value">{currentDomain.salary}</span>
                </motion.div>
                <motion.div
                  className="metric-box"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -3, translateZ: 44 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="metric-box-label">Market Velocity</span>
                  <span className="metric-box-value highlight-growth">
                    <TrendingUp size={13} className="growth-icon" />
                    {currentDomain.growth}
                  </span>
                </motion.div>
              </div>

              {/* Skills In Demand */}
              <div className="console-skills-section">
                <span className="skills-section-label">High-Impact Competencies:</span>
                <div className="console-skill-chips">
                  {currentDomain.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-chip"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -3, translateZ: 38 }}
                      transition={{ duration: 0.18 }}
                    >
                      <CheckCircle2 size={12} className="chip-check" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Interactive Roadmap Step */}
              <motion.div
                className="console-roadmap-preview"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -3, translateZ: 40 }}
                transition={{ duration: 0.2 }}
              >
                <div className="roadmap-preview-header">
                  <Layers size={13} />
                  <span>Curated Roadmap:</span>
                </div>
                <div className="roadmap-preview-text">{currentDomain.roadmap}</div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── FLOATING SATELLITE 2: Bottom Left (Zero Guesswork) ── */}
        <motion.div
          className="hero-floating-badge-wrapper badge-bottom-left"
          style={shouldReduceMotion ? {} : { x: parallaxX2, y: parallaxY2 }}
        >
          <motion.div
            className="hero-floating-badge"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 8, 0],
                    x: [0, -3, 0],
                    rotateZ: [0, -0.8, 0],
                  }
            }
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.08,
                    y: -6,
                    rotateZ: 2,
                    rotateX: -6,
                    translateZ: 60,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }
            }
          >
            <div className="floating-badge-icon purple-glow">
              <ShieldCheck size={15} />
            </div>
            <div className="floating-badge-content">
              <span className="badge-title">Zero Guesswork</span>
              <span className="badge-subtext">Multi-factor psychometric alignment</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroVisual
