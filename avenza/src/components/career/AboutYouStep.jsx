import { useEffect, useRef } from 'react';
import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Step 1 - "About You"
// Demonstrates: useRef (auto-focus), useEffect, controlled inputs,
// field-specific validation feedback, and receiving handlers as props.
const AboutYouStep = ({ formData, updateForm, selectOption }) => {
  const nameInputRef = useRef(null);
  const educationLevels = assessmentQuestions.find((q) => q.id === 'about-you').educationLevels;

  const isNameEmpty = !formData.name || formData.name.trim().length === 0;
  const isClassSelected = Boolean(formData.class);

  // Automatically focus the name input when the assessment starts.
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <div className="question-section">
      <h2 className="question-heading">Let's start with you</h2>

      <div className="question-group">
        <label htmlFor="student-name" className="question-label">
          What should we call you? <span style={{ color: '#f87171' }}>*</span>
        </label>
        {/* Controlled input: value comes from formData, onChange updates it */}
        <input
          id="student-name"
          ref={nameInputRef}
          type="text"
          placeholder="Enter your full name"
          value={formData.name || ''}
          onChange={(e) => updateForm({ name: e.target.value })}
          className={`text-input-large ${isNameEmpty && formData.name !== undefined ? 'input-pending' : ''}`}
          aria-required="true"
          aria-invalid={isNameEmpty}
          aria-describedby="name-helper"
        />
        <div id="name-helper" style={{ marginTop: '0.375rem', fontSize: '0.8125rem' }}>
          {isNameEmpty ? (
            <span style={{ color: '#f87171', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={13} />
              Please enter your name to personalize your career discovery.
            </span>
          ) : (
            <span style={{ color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} />
              Looks great!
            </span>
          )}
        </div>
      </div>

      <div className="question-group" style={{ marginTop: '2rem' }}>
        <label className="question-label">
          Where are you currently in your education? <span style={{ color: '#f87171' }}>*</span>
        </label>
        <div className="selection-cards" role="radiogroup" aria-label="Education level">
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
        {!isClassSelected && (
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
            Choose your current education level to help tailor academic roadmaps.
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutYouStep;