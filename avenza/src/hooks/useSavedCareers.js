import { useCareerContext } from '../context/CareerContext';

// useSavedCareers
// ---------------
// Custom hook that provides access to the global saved careers state
// managed by CareerContext. Persisted to localStorage ('avenza_saved_careers').
//
// Returns:
//  - savedCareers: full career objects with match snapshot
//  - savedIds: array of saved career IDs
//  - savedCount: number of saved careers
//  - isSaved(id): boolean check
//  - toggleSave(careerOrId): toggle save status
//  - clearSaved(): remove all saved careers
export function useSavedCareers() {
  const {
    savedCareers,
    savedIds,
    savedCount,
    isSaved,
    toggleSave,
    clearSaved
  } = useCareerContext();

  return {
    savedCareers,
    savedIds,
    savedCount,
    isSaved,
    toggleSave,
    clearSaved
  };
}

export default useSavedCareers;