import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';

// Step definitions for visual breadcrumbs
const STEP_META = [
  { step: 1, title: 'About You', short: 'Profile' },
  { step: 2, title: 'Academic Profile', short: 'Academics' },
  { step: 3, title: 'Interests', short: 'Interests' },
  { step: 4, title: 'Strengths', short: 'Strengths' },
  { step: 5, title: 'Goals & Exams', short: 'Goals' },
  { step: 6, title: 'Profile Review', short: 'Review' },
];

const FormStep = ({
  step,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  canContinue,
  children
}) => {
  const progress = Math.min(100, Math.round((step / totalSteps) * 100));
  const currentMeta = STEP_META.find((m) => m.step === step) || { title: `Step ${step}`, short: `Step ${step}` };

  return (
    <div className="form-step-container">
      {/* Header with Step Tracker Breadcrumbs */}
      <div className="step-header">
        {/* Step Indicator Pills */}
        <div className="step-breadcrumbs" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          {STEP_META.map((m) => {
            const isCompleted = step > m.step;
            const isCurrent = step === m.step;
            return (
              <div
                key={m.step}
                className={`breadcrumb-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                title={m.title}
              >
                <div className="breadcrumb-dot">
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : m.step}
                </div>
                <span className="breadcrumb-label">{m.short}</span>
              </div>
            );
          })}
        </div>

        {/* Live Progress Bar with Meta */}
        <div className="step-progress-wrapper">
          <div className="step-progress-meta">
            <span className="step-title-highlight">{currentMeta.title}</span>
            <span className="step-pct">{progress}% Completed</span>
          </div>
          <div className="step-progress-track">
            <motion.div
              className="step-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="step-content">
        {children}
      </div>

      {/* Action Navigation Bar */}
      <div className="step-actions">
        {canGoBack ? (
          <Button variant="secondary" onClick={onBack} icon={ArrowLeft}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {/* The final step has its own submission CTA */}
        {step < totalSteps && (
          <Button
            variant="primary"
            className="ml-auto"
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