import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormStep from '../../components/career/FormStep';
import AboutYouStep from '../../components/career/AboutYouStep';
import AcademicBgStep from '../../components/career/AcademicBgStep';
import InterestsStepNew from '../../components/career/InterestsStepNew';
import StrengthsStep from '../../components/career/StrengthsStep';
import GoalsStepNew from '../../components/career/GoalsStepNew';
import ProfileSummary from '../../components/career/ProfileSummary';
import CareerResults from '../../components/career/CareerResults';
import { calculateMatches } from '../../utils/careerMatcher';
import './CareerRecommendation.css';
import './CareerRecommendationEnhanced.css';

const CareerRecommendation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    stream: '',
    marks: '75',
    entranceExam: '',
    interests: [],
    skills: [],
    budget: 'Medium',
    workStyle: '',
    careerGoal: '',
    priorities: [],
    preferredState: '',
    preferredCity: ''
  });

  const updateForm = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const totalSteps = 6;

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.class;
      case 2:
        return formData.stream && formData.marks;
      case 3:
        return formData.interests && formData.interests.length > 0;
      case 4:
        return formData.skills && formData.skills.length > 0;
      case 5:
        return formData.careerGoal && formData.entranceExam;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const matchedCareers = calculateMatches(formData);
      setResults(matchedCareers);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResults(null);
    setFormData({
      name: '',
      class: '',
      stream: '',
      marks: '75',
      entranceExam: '',
      interests: [],
      skills: [],
      budget: 'Medium',
      workStyle: '',
      careerGoal: '',
      priorities: [],
      preferredState: '',
      preferredCity: ''
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AboutYouStep formData={formData} updateForm={updateForm} />;
      case 2:
        return <AcademicBgStep formData={formData} updateForm={updateForm} />;
      case 3:
        return <InterestsStepNew formData={formData} updateForm={updateForm} />;
      case 4:
        return <StrengthsStep formData={formData} updateForm={updateForm} />;
      case 5:
        return <GoalsStepNew formData={formData} updateForm={updateForm} />;
      case 6:
        return <ProfileSummary formData={formData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="career-rec-page">
      <div className="container-narrow">
        {!results && !isAnalyzing && (
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
              onNext={handleNext}
              onBack={handleBack}
              canGoBack={currentStep > 1}
              canContinue={canContinue()}
            >
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </FormStep>
          </>
        )}

        {isAnalyzing && (
          <motion.div
            className="analyzing-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="analyzing-spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.div
              className="analyzing-messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.h3
                key="analyzing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                Analyzing your strengths and interests...
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
              >
                Matching you with career paths
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {results && (
          <CareerResults results={results} resetForm={handleReset} />
        )}
      </div>
    </div>
  );
};

export default CareerRecommendation;