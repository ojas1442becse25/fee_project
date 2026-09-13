import { useCallback, useMemo } from 'react';
import { careers } from '../data/careers';
import { useLocalStorage } from './useLocalStorage';

// useSavedCareers
// ---------------
// Manages the careers the user bookmarked, persisted in localStorage.
//
// Each saved entry stores the career id together with the match metadata
// captured at save time ({ id, matchScore, personalReason }). That way the
// Saved Careers page can show a real match percentage and reason, not just
// the career itself - without re-running the engine.
//
// Demonstrates a custom hook combining useLocalStorage, useCallback and
// useMemo. Duplicates are prevented by checking the id before adding.
export function useSavedCareers() {
  const [savedEntries, setSavedEntries] = useLocalStorage('avenza_saved_careers', []);

  // Full career objects (from the data file) merged with the stored match
  // metadata, so consumers get everything in one place.
  const savedCareers = useMemo(
    () =>
      careers
        .filter((career) => savedEntries.some((entry) => entry.id === career.id))
        .map((career) => {
          const entry = savedEntries.find((e) => e.id === career.id) || {};
          return { ...career, ...entry };
        }),
    [savedEntries]
  );

  const isSaved = useCallback(
    (id) => savedEntries.some((entry) => entry.id === id),
    [savedEntries]
  );

  // Accepts either a bare id or a full career object. When an object is
  // passed (e.g. from the results page) its matchScore/personalReason are
  // stored alongside the id.
  const toggleSave = useCallback(
    (careerOrId) => {
      const isObject = careerOrId && typeof careerOrId === 'object';
      const id = isObject ? careerOrId.id : careerOrId;

      setSavedEntries((prev) => {
        if (prev.some((entry) => entry.id === id)) {
          // Already saved -> remove it (no duplicates possible).
          return prev.filter((entry) => entry.id !== id);
        }
        // Save id + the match snapshot we happen to have right now.
        return [
          ...prev,
          {
            id,
            matchScore: isObject ? careerOrId.matchScore : undefined,
            personalReason: isObject ? careerOrId.personalReason : undefined
          }
        ];
      });
    },
    [setSavedEntries]
  );

  const clearSaved = useCallback(() => setSavedEntries([]), [setSavedEntries]);

  return {
    savedCareers,
    savedIds: savedEntries.map((entry) => entry.id),
    savedCount: savedEntries.length,
    isSaved,
    toggleSave,
    clearSaved
  };
}

export default useSavedCareers;