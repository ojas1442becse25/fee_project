import { motion } from 'framer-motion';
import { DollarSign, Scale, Lock, Sparkles, TrendingUp, Heart, Target, Globe } from 'lucide-react';

const GoalsStepNew = ({ formData, updateForm }) => {
  const priorities = [
    { icon: DollarSign, label: 'High Salary', desc: 'Financial success' },
    { icon: Scale, label: 'Work-Life Balance', desc: 'Time for personal life' },
    { icon: Lock, label: 'Job Security', desc: 'Stable employment' },
    { icon: Sparkles, label: 'Creativity', desc: 'Express yourself' },
    { icon: TrendingUp, label: 'Growth Opportunities', desc: 'Career advancement' },
    { icon: Heart, label: 'Helping People', desc: 'Make a difference' },
    { icon: Target, label: 'Innovation', desc: 'Work on cutting edge' },
    { icon: Globe, label: 'Global Opportunities', desc: 'International exposure' }
  ];

  const exams = ['JEE', 'NEET', 'CUET', 'No Specific Exam', 'Other'];
  const careerGoals = ['Technology', 'Medical', 'Government', 'Business', 'Creative', 'Research', 'Not Sure'];

  const togglePriority = (priority) => {
    const current = formData.priorities || [];
    const updated = current.includes(priority)
      ? current.filter(p => p !== priority)
      : [...current, priority];
    updateForm({ priorities: updated });
  };

  return (
    <div className="question-section">
      <h2 className="question-heading">What matters most to you?</h2>
      <p className="question-subtext">Select your career priorities. Choose at least one.</p>

      <div className="priority-grid-pro">
        {priorities.map(({ icon: Icon, label, desc }) => {
          const isSelected = formData.priorities?.includes(label);
          return (
            <motion.button
              key={label}
              className={`priority-card-pro ${isSelected ? 'selected' : ''}`}
              onClick={() => togglePriority(label)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="priority-icon-pro">
                <Icon size={22} />
              </div>
              <div className="priority-content">
                <span className="priority-label-pro">{label}</span>
                <span className="priority-desc">{desc}</span>
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
        <label className="question-label">Which career field interests you most?</label>
        <div className="goal-options-compact">
          {careerGoals.map((goal) => (
            <motion.button
              key={goal}
              className={`goal-card-compact ${formData.careerGoal === goal ? 'selected' : ''}`}
              onClick={() => updateForm({ careerGoal: goal })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {goal}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="question-group" style={{ marginTop: '2rem' }}>
        <label className="question-label">Are you preparing for any entrance exam?</label>
        <div className="exam-options-compact">
          {exams.map((exam) => (
            <motion.button
              key={exam}
              className={`exam-card-compact ${formData.entranceExam === exam ? 'selected' : ''}`}
              onClick={() => updateForm({ entranceExam: exam })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {exam}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsStepNew;
