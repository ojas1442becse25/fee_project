import { motion } from 'framer-motion';
import { useState } from 'react';

const AcademicStep = ({ formData, updateForm }) => {
  const streams = ['PCM', 'PCB', 'Commerce', 'Arts', 'Other'];
  const [sliderValue, setSliderValue] = useState(formData.marks || 75);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    updateForm({ marks: value });
  };

  const handleInputChange = (e) => {
    const value = Math.min(100, Math.max(0, e.target.value));
    setSliderValue(value);
    updateForm({ marks: value });
  };

  return (
    <div className="question-section">
      <h2 className="question-heading">Tell us about your academic background</h2>

      <div className="question-group">
        <label className="question-label">Which stream best describes you?</label>
        <div className="selection-cards">
          {streams.map((stream) => (
            <motion.button
              key={stream}
              className={`selection-card ${formData.stream === stream ? 'selected' : ''}`}
              onClick={() => updateForm({ stream })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {stream}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">How were your recent academics?</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="marks-slider"
          />
          <div className="slider-value-display">
            <input
              type="number"
              value={sliderValue}
              onChange={handleInputChange}
              className="marks-input"
              min="0"
              max="100"
            />
            <span className="percentage-symbol">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;