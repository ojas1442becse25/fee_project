import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

// FormStep
// --------
// Wraps one step of the assessment. Uses component composition (children)
// and the reusable Button + ProgressBar components.
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
        <ProgressBar value={progress} />
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
          <Button variant="secondary" onClick={onBack} icon={ArrowLeft}>
            Back
          </Button>
        )}
        {/* The final step has no Continue button - it uses the
            "Find My Career Matches" action on the summary step instead. */}
        {step < totalSteps && (
          <Button
            variant="primary"
            className={!canGoBack ? 'ml-auto' : ''}
            onClick={onNext}
            disabled={!canContinue}
            icon={ArrowRight}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStep;