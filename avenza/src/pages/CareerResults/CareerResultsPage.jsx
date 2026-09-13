import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CareerResults from '../../components/career/CareerResults';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { calculateMatches } from '../../utils/careerMatcher';
import '../CareerDiscovery/CareerDiscovery.css';
import '../CareerDiscovery/CareerDiscoveryEnhanced.css';
import './CareerResults.css';

// CareerResultsPage
// -----------------
// The dedicated /career/results route. Reads the profile that was saved
// when the user clicked "Find My Career Matches", so it survives a page
// refresh. If there is no saved profile it redirects back to the
// assessment.
//
// useMemo: the recommendation calculation only re-runs when the profile
// actually changes - never on every render.
const CareerResultsPage = () => {
  useDocumentTitle('Your Career Matches | Avenza');
  const navigate = useNavigate();

  // Restore the profile saved at the end of the assessment. It is read
  // from the single shared store (avenza_profile), so the results page and
  // the dashboard always show the same latest completed assessment.
  const [profile] = useState(() => {
    try {
      const raw = localStorage.getItem('avenza_profile');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Recommendation engine runs memoized on the saved profile.
  // (Computed before the early return so the hook order never changes.)
  const results = useMemo(
    () => (profile ? calculateMatches(profile) : []),
    [profile]
  );

  // No completed profile yet - send the user back to take the assessment.
  if (!profile) {
    return <Navigate to="/career-discovery" replace />;
  }

  // Start over: clear the multi-step form draft and go back to the first
  // step. The last completed profile is kept so the dashboard's "Your
  // Career Journey" still reflects the most recent assessment until a new
  // one is submitted (which then overwrites avenza_profile).
  const handleRestart = () => {
    try {
      localStorage.removeItem('avenza_assessment_progress');
    } catch {
      // ignore localStorage errors
    }
    navigate('/career-discovery');
  };

  return (
    <div className="career-results-page">
      <div className="career-results-inner">
        <motion.div
          className="results-top-banner"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="results-top-name">
            Hi {profile.name || 'there'} — here are your matches.
          </p>
        </motion.div>

        <CareerResults results={results} onRestart={handleRestart} />
      </div>
    </div>
  );
};

export default CareerResultsPage;