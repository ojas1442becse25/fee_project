import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';

// Step 4 - Strengths + work preferences (multi-select)
// Demonstrates: list rendering from a data file, reusable OptionCard
// with two different variants, and toggle handlers as props.
const StrengthsStep = ({ formData, toggleOption }) => {
  const question = assessmentQuestions.find((q) => q.id === 'strengths');

  return (
    <div className="question-section">
      <h2 className="question-heading">What are you good at?</h2>
      <p className="question-subtext">Select your key strengths. Choose at least one.</p>

      <div className="strength-grid-pro">
        {question.strengths.map(({ label, description, icon }) => {
          const isSelected = formData.skills?.includes(label);
          return (
            <OptionCard
              key={label}
              label={label}
              description={description}
              icon={icon}
              variant="strength"
              selected={isSelected}
              onSelect={() => toggleOption('skills', label)}
            />
          );
        })}
      </div>

      <div className="question-group" style={{ marginTop: '2.5rem' }}>
        <label className="question-label">What kind of work do you prefer?</label>
        <p className="question-subtext" style={{ marginBottom: '1rem' }}>Select all that apply.</p>
        <div className="work-pref-grid">
          {question.workPreferences.map(({ label, description }) => {
            const isSelected = formData.workPreferences?.includes(label);
            return (
              <OptionCard
                key={label}
                label={label}
                description={description}
                variant="workPref"
                selected={isSelected}
                onSelect={() => toggleOption('workPreferences', label)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StrengthsStep;