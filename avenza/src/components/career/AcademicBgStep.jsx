import { useState } from 'react';
import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';

// Step 2 - Academic background
// Demonstrates: controlled components (slider + number input),
// list rendering from a data file, handler props.
const AcademicBgStep = ({ formData, updateForm, selectOption }) => {
  const streams = assessmentQuestions.find((q) => q.id === 'academic').streams;

  const [sliderValue, setSliderValue] = useState(formData.marks || 75);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    updateForm({ marks: value });
  };

  const handleInputChange = (e) => {
    const value = Math.min(100, Math.max(0, e.target.value || 0));
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
            <OptionCard
              key={stream}
              label={stream}
              variant="selection"
              selected={formData.stream === stream}
              onSelect={() => selectOption('stream', stream)}
            />
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

export default AcademicBgStep;