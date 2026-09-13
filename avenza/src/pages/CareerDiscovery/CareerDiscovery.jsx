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
import './CareerDiscovery.css';
import './CareerDiscoveryEnhanced.css';

// CareerDiscovery
// ---------------
// Host page for the multi-step career assessment. All form state lives
// in the useCareerAssessment custom hook (lifting state up) and is passed
// to the step components through props.
//
// On the final step the user clicks "Find My Career Matches":
//   1. validates the completed profile
//   2. saves it to localStorage (key: avenza_profile, the single source
//      of truth shared with My Profile / Results / Details / Dashboard)
//   3. shows a short analyzing transition
//   4. navigates to the /career/results route
const CareerDiscovery = () => {
  useDocumentTitle('Career Discovery | Avenza');
  const navigate = useNavigate();

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

  // useRef to scroll the step container into view when the step changes.
  const stepTopRef = useRef(null);

  // useEffect: smooth-scroll to the top of the new step.
  useEffect(() => {
    stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  // useCallback: stable handler so ProfileSummary is not re-rendered
  // unnecessarily. Submits the profile, shows the analyzing state, then
  // moves on to the results page.
  const handleSubmit = useCallback(() => {
    // 1. Validate the completed profile. Every step gates on canContinue,
    //    so this is a safety net - it guarantees the summary is complete
    //    before we ever navigate away.
    const hasInterests = (formData.interests || []).length > 0;
    const hasSkills = (formData.skills || []).length > 0;
    const requiredFields = ['name', 'class', 'stream', 'careerGoal', 'entranceExam'];
    const isComplete =
      requiredFields.every((field) => Boolean(formData[field])) &&
      hasInterests &&
      hasSkills;

    if (!isComplete) return; // never submit an incomplete profile

    // 2. Persist the completed profile to a single shared store so the
    //    results page, career details, dashboard and a page refresh can all
    //    read it. We merge with any existing profile to preserve data the
    //    user already entered elsewhere (e.g. their email in My Profile).
    try {
      const existingRaw = localStorage.getItem('avenza_profile');
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const merged = {
        ...existing,
        ...formData,
        // name from the assessment wins, email is kept from the stored profile
        // when the assessment form did not collect one
        email: existing.email || formData.email
      };
      localStorage.setItem('avenza_profile', JSON.stringify(merged));
    } catch {
      // localStorage unavailable - the in-memory state still works.
    }

    // 3. Short professional analyzing transition.
    setIsAnalyzing(true);

    // 4. Navigate to the dedicated results route once the analysis is done.
    setTimeout(() => {
      navigate('/career/results');
    }, 2000);
  }, [formData, navigate]);

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
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </FormStep>
          </>
        )}

        {isAnalyzing && <LoadingScreen />}
      </div>
    </div>
  );
};

export default CareerDiscovery;