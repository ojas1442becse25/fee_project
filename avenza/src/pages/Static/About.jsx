import { motion } from 'framer-motion'
import { Sparkles, Target, Compass, BookOpen } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

function About() {
  const steps = [
    { number: '01', text: 'Share your academic background and education level.' },
    { number: '02', text: 'Select your interests, strengths, and career goals.' },
    { number: '03', text: 'Avenza analyzes your profile against career requirements.' },
    { number: '04', text: 'Receive a list of career paths that match your profile.' },
  ]

  return (
    <div className="static-page">
      {/* Hero */}
      <motion.div
        className="static-hero"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="static-badge">
          <Sparkles size={14} />
          <span>About Avenza</span>
        </div>
        <h1 className="static-hero-title">Helping Students Find Their Path</h1>
        <p className="static-hero-sub">
          Avenza is a career discovery and guidance platform designed to help students explore
          career paths based on their interests, strengths, academic background, and goals.
        </p>
      </motion.div>

      <div className="static-content">
        {/* What is Avenza */}
        <motion.div
          className="static-card"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="static-card-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="static-card-title">What is Avenza?</h2>
            <p className="static-card-body">
              Avenza helps students understand different career paths and discover options that
              align with their individual profile. Rather than leaving students to figure out
              their future on their own, Avenza provides structured guidance by matching academic
              backgrounds, interests, and strengths with relevant career opportunities.
            </p>
            <p className="static-card-body static-card-body--top">
              The platform covers a wide range of career categories — from technology and science
              to arts, commerce, and beyond — so every student can find a direction that feels right.
            </p>
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          className="static-card"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="static-card-icon static-card-icon--accent">
            <Target size={22} />
          </div>
          <div>
            <h2 className="static-card-title">Our Mission</h2>
            <p className="static-card-body">
              To make career exploration simpler, more accessible, and less confusing for students
              at every stage of their academic journey. We believe that every student deserves
              clear, unbiased guidance when choosing their career — without the overwhelm of
              navigating hundreds of options alone.
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="static-card static-card--wide"
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="static-card-icon static-card-icon--green">
            <Compass size={22} />
          </div>
          <div style={{ width: '100%' }}>
            <h2 className="static-card-title">How Career Discovery Works</h2>
            <p className="static-card-body">
              The Career Discovery process is simple and straightforward:
            </p>
            <div className="static-steps">
              {steps.map((step) => (
                <div key={step.number} className="static-step">
                  <span className="static-step-num">{step.number}</span>
                  <p className="static-step-text">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Avenza */}
        <motion.div
          className="static-card"
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="static-card-icon static-card-icon--purple">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="static-card-title">Why Choosing the Right Career Matters</h2>
            <p className="static-card-body">
              Students often feel confused by the large number of career options available today.
              Without proper guidance, it is easy to make choices based on pressure rather than
              personal fit. Avenza helps organize those possibilities and makes career exploration
              easier, more structured, and more aligned with who the student actually is.
            </p>
            <p className="static-card-body static-card-body--top">
              The right career choice leads to greater satisfaction, better performance, and a
              stronger sense of purpose — and Avenza is here to help students take that first step
              with confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

