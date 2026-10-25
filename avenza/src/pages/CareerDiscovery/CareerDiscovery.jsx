import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FormStep from '../../components/career/FormStep';
import AboutYouStep from '../../components/career/AboutYouStep';
import AcademicBgStep from '../../components/career/AcademicBgStep';
import InterestsStepNew from '../../components/career/InterestsStepNew';
import StrengthsStep from '../../components/career/StrengthsStep';
import GoalsStepNew from '../../components/career/GoalsStepNew';
import ProfileSummary from '../../components/career/ProfileSummary';
import LoadingScreen from '../../components/ui/LoadingScreen';
import useCareerAssessment from '../../hooks/useCareerAssessment';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useCareerContext } from '../../context/CareerContext';
import './CareerDiscovery.css';
import './CareerDiscoveryEnhanced.css';

// CareerDiscovery
// ---------------
// Host page for the multi-step career assessment. All form state lives
// in the useCareerAssessment custom hook (demonstrating local vs global state)
// and is passed to the step components through props.
//
// On the final step the user clicks "Find My Career Matches":
//   1. validates the completed profile
//   2. saves it to CareerContext + localStorage (single source of truth)
//   3. shows a short analyzing transition (with cleanup)
//   4. navigates to /career/results
const CareerDiscovery = () => {
  useDocumentTitle('Career Discovery | Avenza');
  const navigate = useNavigate();
  const { saveProfile, profile: existingProfile } = useCareerContext();

  const {
    currentStep,
    formData,
    totalSteps,
    updateForm,
    toggleOption,
    selectOption,
    canContinue,
    goNext,
    goBack
  } = useCareerAssessment();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef(null);

  // Clean up any pending navigation timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // useRef to scroll the step container into view when the step changes.
  const stepTopRef = useRef(null);

  // useEffect: smooth-scroll to the top of the new step.
  useEffect(() => {
    stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  // useCallback: stable handler so ProfileSummary is not re-rendered unnecessarily
  const handleSubmit = useCallback(() => {
    if (isAnalyzing) return; // Prevent duplicate concurrent submissions

    // 1. Validate the completed profile
    const hasInterests = (formData.interests || []).length > 0;
    const hasSkills = (formData.skills || []).length > 0;
    const requiredFields = ['name', 'class', 'stream', 'careerGoal', 'entranceExam'];
    const isComplete =
      requiredFields.every((field) => Boolean(formData[field])) &&
      hasInterests &&
      hasSkills;

    if (!isComplete) return;

    // 2. Persist to global CareerContext (which syncs to localStorage 'avenza_profile')
    const merged = {
      ...(existingProfile || {}),
      ...formData,
      email: existingProfile?.email || formData.email || ''
    };
    saveProfile(merged);

    // 3. Short analyzing transition
    setIsAnalyzing(true);

    // 4. Navigate to dedicated recommendations route
    timerRef.current = setTimeout(() => {
      navigate('/career/results');
    }, 1800);
  }, [isAnalyzing, formData, existingProfile, saveProfile, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      // Each step receives the shared state + handlers as props.
      case 1:
        return <AboutYouStep formData={formData} updateForm={updateForm} selectOption={selectOption} />;
      case 2:
        return <AcademicBgStep formData={formData} updateForm={updateForm} selectOption={selectOption} />;
      case 3:
        return <InterestsStepNew formData={formData} toggleOption={toggleOption} />;
      case 4:
        return <StrengthsStep formData={formData} toggleOption={toggleOption} />;
      case 5:
        return <GoalsStepNew formData={formData} toggleOption={toggleOption} selectOption={selectOption} />;
      case 6:
        return <ProfileSummary formData={formData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="career-rec-page">
      <div className="container-narrow" ref={stepTopRef}>
        {/* Conditional rendering: form / loading states */}
        {!isAnalyzing && (
          <>
            <motion.div
              className="discovery-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Career Discovery</h1>
              <p>Let's understand you better and find the career paths that fit you.</p>
            </motion.div>

            <FormStep
              step={currentStep}
              totalSteps={totalSteps}
              onNext={goNext}
              onBack={goBack}
              canGoBack={currentStep > 1}
              canContinue={canContinue}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </FormStep>
          </>
        )}


        {isAnalyzing && <LoadingScreen />}
      </div>
    </div>
  );
};

export default CareerDiscovery;