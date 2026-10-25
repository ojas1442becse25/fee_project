import { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * Fallback quotes if external API is unreachable or offline
 */
const FALLBACK_QUOTES = [
  {
    quote: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    quote: "Choose a job you love, and you will never have to work a day in your life.",
    author: "Confucius"
  },
  {
    quote: "Opportunities don't happen. You create them.",
    author: "Chris Grosser"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];

/**
 * CareerInsight Component
 * -----------------------
 * Demonstrates key JavaScript & React syllabus requirements:
 * 1. Fetch API - standard web API for making HTTP requests
 * 2. Promises & async/await - handling asynchronous operations cleanly
 * 3. useEffect hook with cleanup - lifecycle management and AbortController
 * 4. Loading state - tracking request progress and preventing duplicate clicks
 * 5. Error handling - try/catch/finally block for network or parsing errors
 * 6. Conditional rendering - loading spinner, error message with retry, and quote data
 */
export default function CareerInsight() {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeControllerRef = useRef(null);

  // useEffect runs on mount: declares async data fetcher inside effect with AbortController
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    activeControllerRef.current = controller;

    async function loadInitialInsight() {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setInsight({
            quote: data.quote,
            author: data.author
          });
          setError(null);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;

        console.warn('Initial quote fetch failed, using fallback quote:', err);
        if (!ignore) {
          const randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
          setInsight(randomFallback);
          setError('Live quote network request failed, loaded offline inspiration.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialInsight();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // Safe manual refresh handler triggered by user action
  const handleRefresh = useCallback(async () => {
    if (loading) return; // Prevent duplicate concurrent requests

    setLoading(true);
    setError(null);

    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }
    const controller = new AbortController();
    activeControllerRef.current = controller;

    try {
      const response = await fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setInsight({
        quote: data.quote,
        author: data.author
      });
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;

      console.warn('Refresh quote fetch failed, using fallback quote:', err);
      const randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setInsight(randomFallback);
      setError('Live quote refresh failed, loaded offline inspiration.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="career-insight-card">
      <div className="career-insight-header">
        <div className="career-insight-title-group">
          <Sparkles size={18} className="career-insight-icon" />
          <h3 className="career-insight-title">Daily Career Inspiration</h3>
        </div>
        <button
          className="career-insight-refresh"
          onClick={handleRefresh}
          disabled={loading}
          title="Get new insight"
          aria-label="Refresh insight"
        >
          <RefreshCw size={15} className={loading ? 'spinning' : ''} />
          <span>{loading ? 'Fetching...' : 'New Quote'}</span>
        </button>
      </div>

      {/* Conditional Rendering based on state */}
      <div className="career-insight-content">
        {loading && (
          <div className="career-insight-loading">
            <div className="insight-spinner" />
            <span>Loading career inspiration...</span>
          </div>
        )}

        {!loading && error && (
          <div className="career-insight-error" style={{ marginBottom: '0.75rem' }}>
            <AlertCircle size={16} className="error-icon" />
            <span>{error}</span>
            <button className="insight-retry-btn" onClick={handleRefresh} disabled={loading}>
              Retry Live
            </button>
          </div>
        )}

        {!loading && insight && (
          <div className="career-insight-quote-box">
            <blockquote className="career-insight-quote">
              &ldquo;{insight.quote}&rdquo;
            </blockquote>
            <p className="career-insight-author">&mdash; {insight.author}</p>
          </div>
        )}
      </div>
    </div>
  );
}
