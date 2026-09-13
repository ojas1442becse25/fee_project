import { motion } from 'framer-motion'
import {
  Compass,
  Star,
  Lightbulb,
  BookOpen,
  Users,
  GraduationCap,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
}

const features = [
  {
    icon: Compass,
    title: 'Career Discovery',
    description:
      'Discover career paths based on your academic background, interests, and personal strengths. The platform guides you through a structured assessment to find directions that match who you are.',
    color: 'blue',
  },
  {
    icon: Star,
    title: 'Personalized Recommendations',
    description:
      'Receive career suggestions that are tailored to your specific profile. Each recommendation is ranked by how closely it matches your interests, strengths, and stated goals.',
    color: 'accent',
  },
  {
    icon: Lightbulb,
    title: 'Skill Insights',
    description:
      'Understand the important skills associated with different career paths. Each career includes a breakdown of required skills so you know what to focus on.',
    color: 'green',
  },
  {
    icon: BookOpen,
    title: 'Career Information',
    description:
      'Explore detailed career information including category, required skills, growth outlook, difficulty level, average salary range, and future prospects.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Profile-Based Matching',
    description:
      'Compare your interests and strengths directly with career requirements. The match score lets you quickly see how well each option aligns with your personal profile.',
    color: 'blue',
  },
  {
    icon: GraduationCap,
    title: 'Student Friendly',
    description:
      'A simple, guided experience designed for students at any stage. Avenza removes the confusion from career planning so you can explore options without feeling overwhelmed.',
    color: 'accent',
  },
]

function Features() {
  return (
    <div className="static-page">
      {/* Hero */}
      <motion.div
        className="static-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="static-badge">
          <Lightbulb size={14} />
          <span>Platform Features</span>
        </div>
        <h1 className="static-hero-title">Everything You Need to Explore Your Future</h1>
        <p className="static-hero-sub">
          Avenza brings together the tools students need to understand, explore, and choose
          the right career path — all in one place.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="static-content">
        <div className="static-features-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="static-feature-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={`static-card-icon static-card-icon--${feature.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="static-feature-title">{feature.title}</h3>
                <p className="static-feature-desc">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Features

