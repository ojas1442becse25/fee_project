import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FormStep = ({
  step,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  canContinue,
  children
}) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="form-step-container">
      <div className="step-header">
        <div className="step-info">Step {step} of {totalSteps}</div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <motion.div
        className="step-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <div className="step-actions">
        {canGoBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        )}
        <button
          className={`btn btn-primary ${!canGoBack ? 'ml-auto' : ''}`}
          onClick={onNext}
          disabled={!canContinue}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default FormStep;
