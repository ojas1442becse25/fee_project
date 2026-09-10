import { motion } from 'framer-motion';

const AboutYouStep = ({ formData, updateForm }) => {
  const educationLevels = ['10th', '11th', '12th', 'College'];

  return (
    <div className="question-section">
      <h2 className="question-heading">Let's start with you</h2>

      <div className="question-group">
        <label className="question-label">What should we call you?</label>
        <input
          type="text"
          placeholder="Your name"
          value={formData.name || ''}
          onChange={(e) => updateForm({ name: e.target.value })}
          className="text-input-large"
        />
      </div>

      <div className="question-group">
        <label className="question-label">Where are you currently in your education?</label>
        <div className="selection-cards">
          {educationLevels.map((level) => (
            <motion.button
              key={level}
              className={`selection-card ${formData.class === level ? 'selected' : ''}`}
              onClick={() => updateForm({ class: level })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutYouStep;