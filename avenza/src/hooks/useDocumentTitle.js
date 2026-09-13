import { useEffect } from 'react';

// Keeps the browser tab title in sync with the current page.
// Uses useEffect as a side effect of the page changing.
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

export default useDocumentTitle;