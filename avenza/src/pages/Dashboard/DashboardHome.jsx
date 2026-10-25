import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bookmark, User, Rocket, TrendingUp, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerContext } from '../../context/CareerContext';
import useSavedCareers from '../../hooks/useSavedCareers';
import { calculateMatches } from '../../utils/careerMatcher';
import CareerInsight from '../../components/ui/CareerInsight';

// DashboardHome
// -------------
// The default view inside the dashboard (index route).
// Provides a welcome message, quick stats, shortcuts, and a
// "Your Career Journey" panel built from the user's real stored data.
const DashboardHome = () => {
  const { user } = useAuth();
  const { profile } = useCareerContext();
  const { savedCareers } = useSavedCareers();

  // useMemo: the top match only recomputes when the stored profile changes.
  const topMatch = useMemo(() => {
    if (!profile) return null;
    const results = calculateMatches(profile);
    return results.length ? results[0] : null;
  }, [profile]);

  const hasAssessment = Boolean(topMatch);

  return (
    <motion.div
      className="dash-home"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dash-welcome">
        <Sparkles size={28} className="dash-welcome-icon" />
        <div>
          <h1 className="dash-welcome-title">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="dash-welcome-sub">
            Manage your career journey from here.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="dash-stats">
        <div className="dash-stat-card">
          <Bookmark size={22} className="dash-stat-icon" />
          <div>
            <span className="dash-stat-number">{savedCareers.length}</span>
            <span className="dash-stat-label">Saved Careers</span>
          </div>
        </div>
        <div className="dash-stat-card">
          <User size={22} className="dash-stat-icon" />
          <span className="dash-stat-label">Signed in as</span>
          <span className="dash-stat-name">{user?.email || user?.name || 'User'}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="dash-actions">
        <Link to="/career-discovery" className="btn btn-primary">
          <Rocket size={18} />
          <span>Take Career Assessment</span>
        </Link>
        <Link to="/dashboard/saved-careers" className="btn btn-secondary">
          <Bookmark size={18} />
          <span>View Saved Careers</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Daily Career Inspiration — Demonstrates Fetch API, Promises, async/await, useEffect, and conditional rendering */}
      <CareerInsight />

      {/* Your Career Journey — data always comes from the stored assessment. */}
      <div className="journey">
        <div className="journey-head">
          <TrendingUp size={20} className="journey-icon" />
          <div>
            <h2 className="journey-title">Your Career Journey</h2>
            <p className="journey-sub">
              Based on your latest assessment and saved careers.
            </p>
          </div>
        </div>

        <div className="journey-body">
          {/* Top match — only when a completed assessment actually exists */}
          {hasAssessment ? (
            <div className="journey-match">
              <div className="journey-match-scores">
                <div className="journey-rank">
                  <span className="journey-rank-num">{topMatch.matchScore}%</span>
                  <span className="journey-rank-label">top match</span>
                </div>
                <div className="journey-star">
                  <Sparkles size={18} />
                  <span>{topMatch.title}</span>
                </div>
              </div>
              {/* Small progress bar driven by the real match score */}
              <div className="journey-bar">
                <motion.div
                  className="journey-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${topMatch.matchScore}%` }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <p className="journey-reason">{topMatch.personalReason}</p>
              <Link to="/career/results" className="btn btn-primary">
                <span>View My Results</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="journey-empty">
              <MapPin size={32} className="journey-empty-icon" />
              <h3>No assessment yet</h3>
              <p>
                Complete the Career Discovery to see your top matches here.
              </p>
              <Link to="/career-discovery" className="btn btn-primary">
                <Rocket size={18} />
                <span>Start the Assessment</span>
              </Link>
            </div>
          )}

          {/* Mini summary of what is stored — no fake numbers */}
          <div className="journey-stats">
            <div className="journey-stat">
              <span className="journey-stat-value">
                {hasAssessment ? 'Completed' : 'Pending'}
              </span>
              <span className="journey-stat-label">Assessment</span>
            </div>
            <div className="journey-stat">
              <span className="journey-stat-value">{savedCareers.length}</span>
              <span className="journey-stat-label">Saved Careers</span>
            </div>
            <div className="journey-stat">
              <span className="journey-stat-value">
                {profile?.stream || '—'}
              </span>
              <span className="journey-stat-label">Stream</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;