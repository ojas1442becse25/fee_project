import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { Sparkles, AlertCircle } from 'lucide-react';

// Step 5 - Goals & priorities
// Demonstrates: list rendering from data file, reusable OptionCard
// (multi-select priorities + single-select goals/exams), handler props and validation hints.
const GoalsStepNew = ({ formData, toggleOption, selectOption }) => {
  const question = assessmentQuestions.find((q) => q.id === 'goals');
  const selectedPrioritiesCount = formData.priorities?.length || 0;

  return (
    <div className="question-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="question-heading" style={{ margin: 0 }}>What matters most to you?</h2>
        <span
          style={{
            fontSize: '0.8125rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: selectedPrioritiesCount > 0 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.06)',
            color: selectedPrioritiesCount > 0 ? 'var(--accent)' : 'var(--text)',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={13} />
          {selectedPrioritiesCount} priorities marked
        </span>
      </div>
      <p className="question-subtext">Select what motivates your career choices (salary, balance, growth...).</p>

      <div className="priority-grid-pro" role="group" aria-label="Career priorities">
        {question.priorities.map(({ label, description, icon }) => {
          const isSelected = formData.priorities?.includes(label);
          return (
            <OptionCard
              key={label}
              label={label}
              description={description}
              icon={icon}
              variant="priority"
              selected={isSelected}
              onSelect={() => toggleOption('priorities', label)}
            />
          );
        })}
      </div>

      <div className="question-group" style={{ marginTop: '2.5rem' }}>
        <label className="question-label">
          Which career field interests you most? <span style={{ color: '#f87171' }}>*</span>
        </label>
        <div className="goal-options-compact" role="radiogroup" aria-label="Target career field">
          {question.careerGoals.map((goal) => (
            <OptionCard
              key={goal}
              label={goal}
              variant="compact"
              selected={formData.careerGoal === goal}
              onSelect={() => selectOption('careerGoal', goal)}
            />
          ))}
        </div>
        {!formData.careerGoal && (
          <p style={{ marginTop: '0.5rem', color: '#f87171', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} />
            Please select a target career field (select &ldquo;Not Sure&rdquo; if undecided).
          </p>
        )}
      </div>

      <div className="question-group" style={{ marginTop: '2rem' }}>
        <label className="question-label">
          Are you preparing for any entrance exam? <span style={{ color: '#f87171' }}>*</span>
        </label>
        <div className="exam-options-compact" role="radiogroup" aria-label="Entrance exams">
          {question.exams.map((exam) => (
            <OptionCard
              key={exam}
              label={exam}
              variant="compact"
              selected={formData.entranceExam === exam}
              onSelect={() => selectOption('entranceExam', exam)}
            />
          ))}
        </div>
        {!formData.entranceExam && (
          <p style={{ marginTop: '0.5rem', color: '#f87171', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} />
            Please select an entrance exam (choose &ldquo;No Specific Exam&rdquo; if none).
          </p>
        )}
      </div>
    </div>
  );
};

export default GoalsStepNew;