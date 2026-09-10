import { motion } from 'framer-motion';
import { Lightbulb, Code, MessageSquare, Palette, Users2, Calculator, FlaskConical, Target, HandshakeIcon } from 'lucide-react';

const StrengthsStep = ({ formData, updateForm }) => {
  const strengths = [
    { icon: Lightbulb, label: 'Problem Solving', desc: 'Finding creative solutions' },
    { icon: Code, label: 'Programming', desc: 'Writing and understanding code' },
    { icon: MessageSquare, label: 'Communication', desc: 'Expressing ideas clearly' },
    { icon: Palette, label: 'Creativity', desc: 'Thinking outside the box' },
    { icon: Users2, label: 'Leadership', desc: 'Guiding and inspiring others' },
    { icon: Calculator, label: 'Mathematics', desc: 'Working with numbers' },
    { icon: FlaskConical, label: 'Research', desc: 'Investigating and learning' },
    { icon: Target, label: 'Analytical Thinking', desc: 'Breaking down complex problems' },
    { icon: HandshakeIcon, label: 'Teamwork', desc: 'Collaborating effectively' }
  ];

  const workPreferences = [
    { label: 'Building Things', desc: 'Creating tangible products' },
    { label: 'Solving Complex Problems', desc: 'Tackling difficult challenges' },
    { label: 'Helping People', desc: 'Making a positive impact' },
    { label: 'Creating Content', desc: 'Producing media and materials' },
    { label: 'Working With Technology', desc: 'Using digital tools' },
    { label: 'Leading Teams', desc: 'Managing and directing groups' },
    { label: 'Researching & Discovering', desc: 'Exploring new knowledge' },
    { label: 'Working With Data', desc: 'Analyzing information' }
  ];

  const toggleStrength = (strength) => {
    const current = formData.skills || [];
    const updated = current.includes(strength)
      ? current.filter(s => s !== strength)
      : [...current, strength];
    updateForm({ skills: updated });
  };

  const togglePreference = (pref) => {
    const current = formData.workPreferences || [];
    const updated = current.includes(pref)
      ? current.filter(p => p !== pref)
      : [...current, pref];
    updateForm({ workPreferences: updated });
  };

  return (
    <div className="question-section">
      <h2 className="question-heading">What are you good at?</h2>
      <p className="question-subtext">Select your key strengths. Choose at least one.</p>

      <div className="strength-grid-pro">
        {strengths.map(({ icon: Icon, label, desc }) => {
          const isSelected = formData.skills?.includes(label);
          return (
            <motion.button
              key={label}
              className={`strength-card-pro ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleStrength(label)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="strength-icon-pro">
                <Icon size={20} />
              </div>
              <div className="strength-content">
                <span className="strength-label-pro">{label}</span>
                <span className="strength-desc">{desc}</span>
              </div>
              {isSelected && (
                <motion.div
                  className="selected-indicator-small"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="question-group" style={{ marginTop: '2.5rem' }}>
        <label className="question-label">What kind of work do you prefer?</label>
        <p className="question-subtext" style={{ marginBottom: '1rem' }}>Select all that apply.</p>
        <div className="work-pref-grid">
          {workPreferences.map(({ label, desc }) => {
            const isSelected = formData.workPreferences?.includes(label);
            return (
              <motion.button
                key={label}
                className={`work-pref-card ${isSelected ? 'selected' : ''}`}
                onClick={() => togglePreference(label)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="work-pref-label">{label}</span>
                <span className="work-pref-desc">{desc}</span>
                {isSelected && <span className="check-mark">✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StrengthsStep;
