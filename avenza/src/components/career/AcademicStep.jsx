import { motion } from 'framer-motion';

const AcademicStep = ({ formData, updateForm }) => {
  const classes = ['10th', '11th', '12th', 'College'];
  const streams = ['PCM', 'PCB', 'Commerce', 'Arts', 'Other'];
  const exams = ['JEE', 'NEET', 'CUET', 'None', 'Other'];

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
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name || ''}
          onChange={(e) => updateForm({ name: e.target.value })}
          className="premium-input"
        />
      </div>

      <div className="form-group">
        <label>Current Class / Education Level</label>
        <div className="chips-container">
          {classes.map(cls => (
            <button
              key={cls}
              className={`chip ${formData.class === cls ? 'active' : ''}`}
              onClick={() => handleChipSelect('class', cls)}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Academic Stream</label>
        <div className="chips-container">
          {streams.map(str => (
            <button
              key={str}
              className={`chip ${formData.stream === str ? 'active' : ''}`}
              onClick={() => handleChipSelect('stream', str)}
            >
              {str}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Recent Marks Percentage (0-100)</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="E.g. 85"
          value={formData.marks || ''}
          onChange={(e) => updateForm({ marks: e.target.value })}
          className="premium-input"
        />
      </div>

      <div className="form-group">
        <label>Entrance Exam Preparation</label>
        <div className="chips-container">
          {exams.map(exam => (
            <button
              key={exam}
              className={`chip ${formData.entranceExam === exam ? 'active' : ''}`}
              onClick={() => handleChipSelect('entranceExam', exam)}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AcademicStep;