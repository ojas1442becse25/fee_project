import { useEffect, useState } from 'react';

// useLocalStorage
// ---------------
// A custom hook that syncs a piece of state with localStorage.
// - Lazy initial state: reads the stored value on first render.
// - useEffect: writes the value back to localStorage whenever it changes.
//
// This means data survives a page refresh (assessment progress,
// the logged-in user, saved careers, etc.).
export function useLocalStorage(key, initialValue) {
  // Lazy initializer only runs once - reads from localStorage.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Could not read "${key}" from localStorage`, error);
      return initialValue;
    }
  });

  // Persist the value whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not write "${key}" to localStorage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;