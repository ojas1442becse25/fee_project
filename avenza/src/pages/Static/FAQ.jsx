import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is Avenza?',
    a: 'Avenza is a career discovery platform that helps students explore career paths based on their interests, strengths, and academic background. It provides personalized career recommendations to guide students toward paths that suit their profile.',
  },
  {
    q: 'How does Career Discovery work?',
    a: 'You answer a few questions about your education level, academic stream, interests, strengths, and goals. Based on this information, Avenza analyzes your profile and suggests career paths that align with who you are.',
  },
  {
    q: 'Are the career recommendations final?',
    a: 'No. The recommendations are meant to help students explore possible career paths and should be used as guidance — not as definitive decisions. Career planning is personal, and Avenza is a starting point to help you think through your options.',
  },
  {
    q: 'Can students from different academic streams use Avenza?',
    a: 'Yes. The platform supports students from different education levels and academic streams, including Science, Commerce, Arts, and others. The assessment takes your specific background into account when generating recommendations.',
  },
  {
    q: 'What information is used for recommendations?',
    a: 'Recommendations are based on several factors including your education level, academic stream, academic performance, selected interests, personal strengths, and career goals. The more accurately you fill in the assessment, the better your recommendations will be.',
  },
  {
    q: 'Is Avenza free to use?',
    a: 'The current version of the platform is available for students to explore career discovery features at no cost. You can complete the assessment and view your career recommendations without any sign-up requirement.',
  },
  {
    q: 'Can I explore multiple career options?',
    a: 'Yes. Avenza shows you multiple career recommendations ranked by match score, so you can review and compare different paths. You can also save careers to your profile and revisit them later.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`faq-item ${open ? 'faq-item--open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-q-text">{item.q}</span>
        <motion.span
          className="faq-chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <p className="faq-answer-text">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
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
          <HelpCircle size={14} />
          <span>FAQ</span>
        </div>
        <h1 className="static-hero-title">Frequently Asked Questions</h1>
        <p className="static-hero-sub">
          Find answers to the most common questions about Avenza and how the platform works.
        </p>
      </motion.div>

      {/* FAQ List */}
      <div className="static-content">
        <div className="faq-list">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ

