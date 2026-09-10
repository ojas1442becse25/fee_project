import { motion } from 'framer-motion';
import { Code, Palette, TrendingUp, Brain, Beaker, DollarSign, Scale, Gamepad2, Building, Shield, BarChart3, Sparkles, Calculator, Heart, Users } from 'lucide-react';

const InterestsStepNew = ({ formData, updateForm }) => {
  const interests = [
    { icon: Code, label: 'Technology', desc: 'Build software and digital products' },
    { icon: Palette, label: 'Design', desc: 'Create visual and user experiences' },
    { icon: TrendingUp, label: 'Business', desc: 'Drive growth and strategy' },
    { icon: Brain, label: 'Artificial Intelligence', desc: 'Work with intelligent systems' },
    { icon: Beaker, label: 'Biology', desc: 'Study living organisms' },
    { icon: DollarSign, label: 'Finance', desc: 'Manage money and investments' },
    { icon: Scale, label: 'Law', desc: 'Work with justice and legal systems' },
    { icon: Gamepad2, label: 'Gaming', desc: 'Create interactive entertainment' },
    { icon: Building, label: 'Government Services', desc: 'Serve the public sector' },
    { icon: Shield, label: 'Cyber Security', desc: 'Protect digital systems' },
    { icon: BarChart3, label: 'Data Analysis', desc: 'Extract insights from data' },
    { icon: Sparkles, label: 'Creative Arts', desc: 'Express through art and media' },
    { icon: Calculator, label: 'Mathematics', desc: 'Solve problems with numbers' },
    { icon: Heart, label: 'Medicine', desc: 'Help improve health and lives' },
    { icon: Users, label: 'Communication', desc: 'Connect and influence people' }
  ];

  const toggleInterest = (label) => {
    const current = formData.interests || [];
    const updated = current.includes(label)
      ? current.filter(i => i !== label)
      : [...current, label];
    updateForm({ interests: updated });
  };

  return (
    <div className="question-section">
      <h2 className="question-heading">What interests you?</h2>
      <p className="question-subtext">Select all areas that genuinely excite you. Choose at least one.</p>

      <div className="interest-grid-pro">
        {interests.map(({ icon: Icon, label, desc }) => {
          const isSelected = formData.interests?.includes(label);
          return (
            <motion.button
              key={label}
              className={`interest-card-pro ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleInterest(label)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="interest-icon-pro">
                <Icon size={24} />
              </div>
              <div className="interest-content">
                <span className="interest-label-pro">{label}</span>
                <span className="interest-desc">{desc}</span>
              </div>
              {isSelected && (
                <motion.div
                  className="selected-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default InterestsStepNew;
