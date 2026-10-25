import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { Sparkles, AlertCircle } from 'lucide-react';

// Step 3 - Interests (multi-select)
// Demonstrates: list rendering from a data file, reusable OptionCard,
// multi-selection state, and validation counter.
const InterestsStepNew = ({ formData, toggleOption }) => {
  const { options } = assessmentQuestions.find((q) => q.id === 'interests');
  const selectedCount = formData.interests?.length || 0;

  return (
    <div className="question-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="question-heading" style={{ margin: 0 }}>What interests you?</h2>
        <span
          style={{
            fontSize: '0.8125rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: selectedCount > 0 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(239, 68, 68, 0.12)',
            color: selectedCount > 0 ? 'var(--accent)' : '#f87171',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {selectedCount > 0 ? (
            <>
              <Sparkles size={13} />
              {selectedCount} selected
            </>
          ) : (
            <>
              <AlertCircle size={13} />
              Choose at least 1
            </>
          )}
        </span>
      </div>
      <p className="question-subtext">Select all areas that genuinely excite you. Choose at least one to continue.</p>

      <div className="interest-grid-pro" role="group" aria-label="Interests selection">
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