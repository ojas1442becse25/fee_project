/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react';
import { careers } from '../data/careers';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * CareerContext
 * -------------
 * React Context API implementation for global career state management:
 * 1. Saved Careers: Bookmarked careers with match scores and metadata,
 *    synced with localStorage ('avenza_saved_careers').
 * 2. User Career Profile: Completed assessment/profile data,
 *    synced with localStorage ('avenza_profile').
 *
 * This provides reactive state across all components (CareerCard, Details,
 * Results, Dashboard, and Navbar) without duplicate state or desynchronization.
 */
const CareerContext = createContext(null);

export function CareerProvider({ children }) {
  const [savedEntries, setSavedEntries] = useLocalStorage('avenza_saved_careers', []);
  const [profile, setProfile] = useLocalStorage('avenza_profile', null);

  // Full career objects merged with saved match metadata
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

  const toggleSave = useCallback(
    (careerOrId) => {
      const isObject = careerOrId && typeof careerOrId === 'object';
      const id = isObject ? careerOrId.id : careerOrId;

      setSavedEntries((prev) => {
        if (prev.some((entry) => entry.id === id)) {
          return prev.filter((entry) => entry.id !== id);
        }
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

  const clearSaved = useCallback(() => {
    setSavedEntries([]);
  }, [setSavedEntries]);

  const saveProfile = useCallback((newProfileData) => {
    setProfile((prev) => ({
      ...(prev || {}),
      ...newProfileData
    }));
  }, [setProfile]);

  const clearProfile = useCallback(() => {
    setProfile(null);
  }, [setProfile]);

  const value = useMemo(
    () => ({
      savedEntries,
      savedCareers,
      savedCount: savedEntries.length,
      savedIds: savedEntries.map((e) => e.id),
      isSaved,
      toggleSave,
      clearSaved,
      profile,
      saveProfile,
      clearProfile
    }),
    [savedEntries, savedCareers, isSaved, toggleSave, clearSaved, profile, saveProfile, clearProfile]
  );

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
}

export function useCareerContext() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareerContext must be used within a <CareerProvider>');
  }
  return context;
}

export default CareerContext;
