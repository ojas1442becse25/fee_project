import { motion } from 'framer-motion';

const GoalsStep = ({ formData, updateForm }) => {
  const budgets = ['Low', 'Medium', 'High'];
  const workStyles = ['Corporate', 'Startup', 'Government', 'Freelance', 'Research', 'Not Sure'];
  const careerGoals = ['Technology', 'Medical', 'Government', 'Business', 'Creative', 'Research', 'Not Sure'];

  const handleChipSelect = (field, value) => {
    updateForm({ [field]: value });
  };

  return (
    <motion.div
      className="form-step-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="form-group">
        <label>Expected Education Budget</label>
        <div className="chips-container">
          {budgets.map(b => (
            <button
              key={b}
              className={`chip ${formData.budget === b ? 'active' : ''}`}
              onClick={() => handleChipSelect('budget', b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Preferred Work Style</label>
        <div className="chips-container">
          {workStyles.map(ws => (
            <button
              key={ws}
              className={`chip ${formData.workStyle === ws ? 'active' : ''}`}
              onClick={() => handleChipSelect('workStyle', ws)}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Broad Career Goal</label>
        <div className="chips-container">
          {careerGoals.map(cg => (
            <button
              key={cg}
              className={`chip ${formData.careerGoal === cg ? 'active' : ''}`}
              onClick={() => handleChipSelect('careerGoal', cg)}
            >
              {cg}
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Preferred State</label>
          <input
            type="text"
            placeholder="E.g. Maharashtra"
            value={formData.preferredState || ''}
            onChange={(e) => updateForm({ preferredState: e.target.value })}
            className="premium-input"
          />
        </div>
        <div className="form-group">
          <label>Preferred City</label>
          <input
            type="text"
            placeholder="E.g. Pune"
            value={formData.preferredCity || ''}
            onChange={(e) => updateForm({ preferredCity: e.target.value })}
            className="premium-input"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GoalsStep;