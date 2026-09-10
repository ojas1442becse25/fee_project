import { motion } from 'framer-motion'
import { UserCircle, Search, Rocket } from 'lucide-react'
import SectionHeader from './SectionHeader'
import './HowItWorks.css'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: UserCircle,
      title: 'Tell Us About You',
      description: 'Share your interests, skills, and aspirations so we can understand you better.',
    },
    {
      number: '02',
      icon: Search,
      title: 'Explore Your Options',
      description: 'Discover personalized career paths, colleges, and opportunities tailored for you.',
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Build Your Future',
      description: 'Get a personalized roadmap and start taking action towards your dream career.',
    },
  ]

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps to discover your perfect career path"
        />

        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon-wrapper">
                <step.icon className="step-icon" size={32} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="step-connector" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
