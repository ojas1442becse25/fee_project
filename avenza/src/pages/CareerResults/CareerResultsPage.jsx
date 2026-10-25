import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import CareerResults from '../../components/career/CareerResults';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { calculateMatches } from '../../utils/careerMatcher';
import { useCareerContext } from '../../context/CareerContext';
import Button from '../../components/ui/Button';
import '../CareerDiscovery/CareerDiscovery.css';
import '../CareerDiscovery/CareerDiscoveryEnhanced.css';
import './CareerResults.css';

// Demo sample profile for live evaluation and direct URL testing
const SAMPLE_DEMO_PROFILE = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  education: '12th',
  stream: 'PCM',
  marks: 88,
  interests: ['Technology', 'Artificial Intelligence', 'Data Analysis', 'Mathematics'],
  skills: ['Programming', 'Problem Solving', 'Analytical Thinking', 'Mathematics'],
  priorities: ['High Salary', 'Innovation', 'Growth Opportunities'],
  careerGoal: 'Technology',
  entranceExam: 'JEE'
};

// CareerResultsPage
// -----------------
// The dedicated recommendations route (/career-recommendations & /career/results).
// Reads the shared career profile from CareerContext (survives browser refresh).
//
// If accessed directly without an existing assessment:
// Displays an informative empty state with option to start assessment or
// load a demo profile (ideal for testing direct URL access).
//
// useMemo: recommendation calculation only re-runs when profile changes.
const CareerResultsPage = () => {
  useDocumentTitle('Career Recommendations | Avenza');
  const navigate = useNavigate();
  const { profile, saveProfile } = useCareerContext();

  // Recommendation engine runs memoized on the saved profile
  const results = useMemo(
    () => (profile ? calculateMatches(profile, 6) : []),
    [profile]
  );

  const handleRestart = () => {
    try {
      localStorage.removeItem('avenza_assessment_progress');
    } catch {
      // ignore storage errors
    }
    navigate('/career-discovery');
  };

  const handleLoadDemo = () => {
    saveProfile(SAMPLE_DEMO_PROFILE);
  };

  // If no profile exists yet, show an empty state with action options
  if (!profile) {
    return (
      <div className="career-results-page">
        <div className="career-results-inner">
          <motion.div
            className="empty-recommendations-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '3rem auto'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.12)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <Compass size={32} />
            </div>

            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text)' }}>
              No Career Matches Yet
            </h1>

            <p style={{ color: 'var(--text)', opacity: 0.75, lineHeight: 1.6, marginBottom: '2rem' }}>
              Complete our guided 2-minute Career Discovery assessment to analyze your academic stream,
              interests, and skills to generate personalized career recommendations.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/career-discovery" className="btn btn-primary">
                <Sparkles size={18} />
                <span>Take Career Assessment</span>
              </Link>
              <Button variant="secondary" onClick={handleLoadDemo} icon={ArrowRight}>
                Load Demo Profile (Evaluation Mode)
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-results-page">
      <div className="career-results-inner">
        <motion.div
          className="results-top-banner"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="results-top-name" style={{ margin: 0 }}>
              Hi {profile.name || 'there'} — here are your personalized career recommendations.
            </p>
            <Button variant="secondary" onClick={handleRestart} icon={RotateCcw}>
              Retake Assessment
            </Button>
          </div>
        </motion.div>

        <CareerResults results={results} onRestart={handleRestart} />
      </div>
    </div>
  );
};

export default CareerResultsPage;