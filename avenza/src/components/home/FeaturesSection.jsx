import { Sparkles, Map, Lightbulb, GraduationCap, Award, Shield } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FeatureCard from './FeatureCard'
import './FeaturesSection.css'

function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Career Recommendation',
      description: 'Get personalized career suggestions based on your interests, skills, and aspirations.',
    },
    {
      icon: Map,
      title: 'Personalized Roadmap',
      description: 'Receive a step-by-step guide tailored to your chosen career path.',
    },
    {
      icon: Lightbulb,
      title: 'Future Simulator',
      description: 'Visualize different career outcomes and make informed decisions about your future.',
    },
    {
      icon: GraduationCap,
      title: 'College Finder',
      description: 'Discover colleges and programs that align with your career goals.',
    },
    {
      icon: Award,
      title: 'Scholarship Finder',
      description: 'Find scholarships and financial aid opportunities to support your education.',
    },
    {
      icon: Shield,
      title: 'Plan B Generator',
      description: 'Always have backup options with alternative career paths and strategies.',
    },
  ]

  return (
    <section className="features-section">
      <div className="container">
        <SectionHeader
          title="Your Career Journey, Simplified"
          subtitle="Explore careers, compare options, and make informed decisions with powerful AI-driven tools designed for your success."
        />

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
