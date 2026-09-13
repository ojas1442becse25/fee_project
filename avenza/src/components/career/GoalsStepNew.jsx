import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';

// Step 5 - Goals & priorities
// Demonstrates: list rendering from a data file, reusable OptionCard
// (multi-select priorities + single-select goals/exams), handler props.
const GoalsStepNew = ({ formData, toggleOption, selectOption }) => {
  const question = assessmentQuestions.find((q) => q.id === 'goals');

  return (
    <div className="question-section">
      <h2 className="question-heading">What matters most to you?</h2>
      <p className="question-subtext">Select your career priorities. Choose at least one.</p>

      <div className="priority-grid-pro">
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
        <label className="question-label">Which career field interests you most?</label>
        <div className="goal-options-compact">
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
      </div>

      <div className="question-group" style={{ marginTop: '2rem' }}>
        <label className="question-label">Are you preparing for any entrance exam?</label>
        <div className="exam-options-compact">
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
      </div>
    </div>
  );
};

export default GoalsStepNew;