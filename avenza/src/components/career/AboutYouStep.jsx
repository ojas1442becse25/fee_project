import { useEffect, useRef } from 'react';
import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';

// Step 1 - "About You"
// Demonstrates: useRef (auto-focus), useEffect, controlled inputs,
// rendering a list from a data file, and receiving handlers as props.
const AboutYouStep = ({ formData, updateForm, selectOption }) => {
  const nameInputRef = useRef(null);
  const educationLevels = assessmentQuestions.find((q) => q.id === 'about-you').educationLevels;

  // Automatically focus the name input when the assessment starts.
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <div className="question-section">
      <h2 className="question-heading">Let's start with you</h2>

      <div className="question-group">
        <label className="question-label">What should we call you?</label>
        {/* Controlled input: value comes from formData, onChange updates it */}
        <input
          ref={nameInputRef}
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
            <OptionCard
              key={level}
              label={level}
              variant="selection"
              selected={formData.class === level}
              onSelect={() => selectOption('class', level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutYouStep;