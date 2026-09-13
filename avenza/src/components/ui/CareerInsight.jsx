import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * CareerInsight Component
 * -----------------------
 * Demonstrates key JavaScript syllabus requirements:
 * 1. Fetch API - standard web API for making HTTP requests
 * 2. Promises & async/await - handling asynchronous operations cleanly
 * 3. useEffect hook - executing side-effects on component mount
 * 4. Loading state - tracking request progress
 * 5. Error handling - try/catch block for network or parsing errors
 * 6. Conditional rendering - showing loading spinner, error message with retry, or successful data
 */
export default function CareerInsight() {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Async function demonstrating Fetch API, Promises, and try/catch error handling
  const fetchInsight = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using a public quotes API (dummyjson) that returns inspiring quotes
      const response = await fetch('https://dummyjson.com/quotes/random');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parsing JSON response (returns a Promise resolved by await)
      const data = await response.json();
      setInsight({
        quote: data.quote,
        author: data.author
      });
    } catch (err) {
      // Catch network failure or JSON parse errors
      console.error('Failed to fetch daily insight:', err);
      setError(err.message || 'Unable to load daily insight at this moment.');
    } finally {
      // Set loading to false once the Promise settles (either resolved or rejected)
      setLoading(false);
    }
  };

  // useEffect runs the async fetch function when component mounts
  useEffect(() => {
    fetchInsight();
  }, []);

  return (
    <div className="career-insight-card">
      <div className="career-insight-header">
        <div className="career-insight-title-group">
          <Sparkles size={18} className="career-insight-icon" />
          <h3 className="career-insight-title">Daily Career Inspiration</h3>
        </div>
        <button
          className="career-insight-refresh"
          onClick={fetchInsight}
          disabled={loading}
          title="Get new insight"
          aria-label="Refresh insight"
        >
          <RefreshCw size={15} className={loading ? 'spinning' : ''} />
          <span>New Quote</span>
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
          <div className="career-insight-error">
            <AlertCircle size={18} className="error-icon" />
            <span>{error}</span>
            <button className="insight-retry-btn" onClick={fetchInsight}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && insight && (
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
