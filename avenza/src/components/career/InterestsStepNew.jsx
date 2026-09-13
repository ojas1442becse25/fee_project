import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';

// Step 3 - Interests (multi-select)
// Demonstrates: list rendering from a data file, reusable OptionCard,
// and a toggle handler received as a prop.
const InterestsStepNew = ({ formData, toggleOption }) => {
  const { options } = assessmentQuestions.find((q) => q.id === 'interests');

  return (
    <div className="question-section">
      <h2 className="question-heading">What interests you?</h2>
      <p className="question-subtext">Select all areas that genuinely excite you. Choose at least one.</p>

      <div className="interest-grid-pro">
        {options.map(({ label, description, icon }) => {
          const isSelected = formData.interests?.includes(label);
          return (
            <OptionCard
              key={label}
              label={label}
              description={description}
              icon={icon}
              variant="interest"
              selected={isSelected}
              onSelect={() => toggleOption('interests', label)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InterestsStepNew;