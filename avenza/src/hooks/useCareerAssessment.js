import { useCallback, useEffect, useState } from 'react';
import { assessmentQuestions } from '../data/assessmentQuestions';
import { useLocalStorage } from './useLocalStorage';

const initialFormData = {
  name: '',
  class: '',
  stream: '',
  marks: '75',
  entranceExam: '',
  interests: [],
  skills: [],
  budget: 'Medium',
  workStyle: '',
  workPreferences: [],
  careerGoal: '',
  priorities: [],
  preferredState: '',
  preferredCity: ''
};

// useCareerAssessment
// -------------------
// Custom hook that owns ALL the state of the multi-step Career
// Discovery form. The step components only receive values + handlers
// through props (lifting state up to this hook).
//
// It manages:
//  - currentStep         - which question step the user is on
//  - formData (answers)  - every answer collected so far
//  - selecting/multi-select options (toggleOption / selectOption)
//  - validation          - canContinue()
//  - next / previous step
//  - reset the assessment
//  - persistence         - restores unfinished progress from localStorage
export function useCareerAssessment() {
  const totalSteps = assessmentQuestions.length;

  // Restore any unfinished assessment from localStorage (page refresh).
  const [savedProgress, setSavedProgress] = useLocalStorage('avenza_assessment_progress', null);

  const [currentStep, setCurrentStep] = useState(savedProgress?.step || 1);
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...(savedProgress?.form || {})
  });

  // Auto-save progress whenever the step or an answer changes.
  useEffect(() => {
    setSavedProgress({ step: currentStep, form: formData });
  }, [currentStep, formData, setSavedProgress]);

  // ---- Updater utilities ------------------------------------------

  // Merge partial updates (used by controlled text inputs + sliders).
  const updateForm = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Toggle a multi-select array field (interests, skills, priorities...).
  const toggleOption = useCallback((field, value) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  }, []);

  // Set a single-choice field (stream, careerGoal, entranceExam...).
  const selectOption = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ---- Validation --------------------------------------------------

  // Whether the current step has the required answer(s) to continue.
  const canContinue = (() => {
    switch (currentStep) {
      case 1: return Boolean(formData.name && formData.class);
      case 2: return Boolean(formData.stream && formData.marks);
      case 3: return (formData.interests || []).length > 0;
      case 4: return (formData.skills || []).length > 0;
      case 5: return Boolean(formData.careerGoal && formData.entranceExam);
      case 6: return true; // summary step
      default: return false;
    }
  })();

  // ---- Navigation --------------------------------------------------

  const goNext = useCallback(() => {
    if (canContinue && currentStep < totalSteps) {
      setCurrentStep((step) => step + 1);
    }
  }, [canContinue, currentStep, totalSteps]);

  const goBack = useCallback(() => {
    setCurrentStep((step) => Math.max(1, step - 1));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setFormData(initialFormData);
  }, []);

  return {
    currentStep,
    formData,
    totalSteps,
    updateForm,
    toggleOption,
    selectOption,
    canContinue,
    goNext,
    goBack,
    reset
  };
}

export default useCareerAssessment;