import { motion } from 'framer-motion';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Academic Profile' },
    { num: 2, label: 'Interests & Skills' },
    { num: 3, label: 'Goals & Preferences' }
  ];

  return (
    <div className="progress-container">
      {steps.map((step, index) => {
        const isActive = currentStep === step.num;
        const isCompleted = currentStep > step.num;

        return (
          <div key={step.num} className="progress-step-wrapper">
            <div className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? '✓' : step.num}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${isCompleted ? 'completed' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;