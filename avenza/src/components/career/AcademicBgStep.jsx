import { useState } from 'react';
import OptionCard from '../ui/OptionCard';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { AlertCircle, Plus, Minus } from 'lucide-react';

const PRESET_MARKS = [65, 75, 85, 95];

const AcademicBgStep = ({ formData, updateForm, selectOption }) => {
  const streams = assessmentQuestions.find((q) => q.id === 'academic').streams;

  const currentMarks = formData.marks !== undefined && formData.marks !== '' ? String(formData.marks) : '75';
  const [marksError, setMarksError] = useState('');

  const validateMarks = (val) => {
    if (val === '' || val === null || val === undefined) {
      return 'Please enter your marks percentage.';
    }
    const num = Number(val);
    if (isNaN(num)) {
      return 'Marks must be a valid number.';
    }
    if (num < 0 || num > 100) {
      return 'Marks must be between 0% and 100%.';
    }
    return '';
  };

  const applyMarks = (val) => {
    const err = validateMarks(val);
    setMarksError(err);
    if (!err) {
      updateForm({ marks: String(val) });
    } else {
      updateForm({ marks: '' });
    }
  };

  const handleSliderChange = (e) => {
    applyMarks(e.target.value);
  };

  const handleInputChange = (e) => {
    applyMarks(e.target.value);
  };

  const handleStepMarks = (delta) => {
    const currentNum = Number(currentMarks) || 75;
    const nextVal = Math.max(0, Math.min(100, currentNum + delta));
    applyMarks(nextVal);
  };

  return (
    <div className="question-section">
      <h2 className="question-heading">Tell us about your academic background</h2>

      <div className="question-group">
        <label className="question-label">
          Which stream best describes you? <span style={{ color: '#f87171' }}>*</span>
        </label>
        <div className="selection-cards" role="radiogroup" aria-label="Academic stream">
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
        {!formData.stream && (
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
            Please select an academic stream to match recommended prerequisite paths.
          </p>
        )}
      </div>

      <div className="question-group" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label htmlFor="academic-marks-input" className="question-label" style={{ margin: 0 }}>
            How were your recent academics? (0–100%) <span style={{ color: '#f87171' }}>*</span>
          </label>
          {/* Quick preset percentage pills */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {PRESET_MARKS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`preset-pill ${Number(currentMarks) === preset ? 'active' : ''}`}
                onClick={() => applyMarks(preset)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  background: Number(currentMarks) === preset ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: Number(currentMarks) === preset ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        <div className="slider-container" style={{ marginTop: '1rem' }}>
          <input
            id="academic-marks-slider"
            type="range"
            min="0"
            max="100"
            value={Number(currentMarks) || 0}
            onChange={handleSliderChange}
            className="marks-slider"
            aria-label="Academic marks percentage slider"
          />
          <div className="slider-value-display">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStepMarks(-5)}
              aria-label="Decrease marks by 5%"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Minus size={14} />
            </button>
            <input
              id="academic-marks-input"
              type="number"
              value={currentMarks}
              onChange={handleInputChange}
              className={`marks-input ${marksError ? 'has-error' : ''}`}
              min="0"
              max="100"
              aria-label="Academic marks percentage input"
              aria-invalid={Boolean(marksError)}
              aria-describedby={marksError ? 'marks-error-msg' : undefined}
            />
            <span className="percentage-symbol">%</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStepMarks(5)}
              aria-label="Increase marks by 5%"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {marksError ? (
          <p id="marks-error-msg" style={{ marginTop: '0.5rem', color: '#f87171', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '4px' }} role="alert">
            <AlertCircle size={14} />
            <span>{marksError}</span>
          </p>
        ) : (
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
            Used to assess eligibility against career benchmarks (e.g., Engineering & Medicine prerequisites).
          </p>
        )}
      </div>
    </div>
  );
};

export default AcademicBgStep;