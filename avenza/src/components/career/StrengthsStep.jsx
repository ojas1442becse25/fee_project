import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { Sparkles, AlertCircle } from 'lucide-react';

// Step 4 - Strengths + work preferences (multi-select)
// Demonstrates: list rendering from a data file, reusable OptionCard
// with two variants, and selection counter feedback.
const StrengthsStep = ({ formData, toggleOption }) => {
  const question = assessmentQuestions.find((q) => q.id === 'strengths');
  const selectedSkillsCount = formData.skills?.length || 0;

  return (
    <div className="question-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="question-heading" style={{ margin: 0 }}>What are you good at?</h2>
        <span
          style={{
            fontSize: '0.8125rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: selectedSkillsCount > 0 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(239, 68, 68, 0.12)',
            color: selectedSkillsCount > 0 ? 'var(--accent)' : '#f87171',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {selectedSkillsCount > 0 ? (
            <>
              <Sparkles size={13} />
              {selectedSkillsCount} strengths chosen
            </>
          ) : (
            <>
              <AlertCircle size={13} />
              Choose at least 1
            </>
          )}
        </span>
      </div>
      <p className="question-subtext">Select your key strengths. Choose at least one to continue.</p>

      <div className="strength-grid-pro" role="group" aria-label="Key strengths">
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
        <p className="question-subtext" style={{ marginBottom: '1rem' }}>Select any work environment traits that describe you.</p>
        <div className="work-pref-grid" role="group" aria-label="Work preferences">
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