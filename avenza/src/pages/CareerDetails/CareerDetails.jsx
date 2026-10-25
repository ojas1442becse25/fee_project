import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck, GraduationCap, TrendingUp, Wallet, BarChart3, Sparkles, Check } from 'lucide-react';
import { getCareerBySlug } from '../../data/careers';
import { calculateMatches } from '../../utils/careerMatcher';
import { useCareerContext } from '../../context/CareerContext';
import useSavedCareers from '../../hooks/useSavedCareers';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import SkillTag from '../../components/ui/SkillTag';
import NotFound from '../NotFound/NotFound';
import './CareerDetails.css';

// CareerDetails
// -------------
// The dynamic route page rendered at /career/:careerSlug.
// useParams() gives us the slug from the URL, and we look the
// career up in the data file. If the slug does not match any
// career we render the NotFound component (fallback).
const CareerDetails = () => {
  const { careerSlug } = useParams();
  const career = getCareerBySlug(careerSlug);

  const { isSaved, toggleSave } = useSavedCareers();
  const { profile: submittedProfile } = useCareerContext();

  // Hook order is fixed: compute before the early return below.
  const matches = useMemo(
    () => (submittedProfile ? calculateMatches(submittedProfile) : null),
    [submittedProfile]
  );
  const personalMatch = useMemo(
    () => matches?.find((m) => m.id === career?.id) || null,
    [matches, career]
  );

  useDocumentTitle(
    career ? `${career.title} | Avenza` : 'Career not found | Avenza'
  );

  // No career matched this slug - render the 404 fallback.
  if (!career) {
    return <NotFound message={`No career found for "${careerSlug}".`} />;
  }

  const saved = isSaved(career.id);

  return (
    <motion.div
      className="career-detail-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-narrow">
        <Link to="/career-discovery" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Career Discovery</span>
        </Link>

        {/* Header card */}
        <div className="detail-header">
          <div className="detail-header-top">
            <div className="detail-title-block">
              <span className="detail-category">{career.category}</span>
              <h1 className="detail-title">{career.title}</h1>
            </div>
            <button
              className={`btn btn-secondary ${saved ? 'saved' : ''}`}
              onClick={() => toggleSave(personalMatch || career)}
              aria-pressed={saved}
            >
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              <span>{saved ? 'Saved' : 'Save Career'}</span>
            </button>
          </div>

          <p className="detail-description">{career.description}</p>

          {/* Personalized note - only shown when the user has completed
              the assessment and this career was among their matches */}
          {personalMatch && (
            <div className="detail-personal">
              <div className="personal-score">
                <span className="personal-score-num">{personalMatch.matchScore}%</span>
                <span className="personal-score-label">Your match</span>
              </div>
              <div className="personal-text">
                <p className="personal-reason-detail">{personalMatch.personalReason}</p>
                <ul className="personal-tags">
                  {personalMatch.matchReasons.map((reason) => (
                    <li key={reason}>
                      <Check size={14} />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Key metrics */}
          <div className="detail-metrics">
            <div className="detail-metric">
              <Wallet size={20} className="metric-icon" />
              <div>
                <span className="detail-metric-label">Average Salary</span>
                <span className="detail-metric-value">{career.salary}</span>
              </div>
            </div>
            <div className="detail-metric">
              <TrendingUp size={20} className="metric-icon" />
              <div>
                <span className="detail-metric-label">Growth</span>
                <span className="detail-metric-value">{career.growth}</span>
              </div>
            </div>
            <div className="detail-metric">
              <BarChart3 size={20} className="metric-icon" />
              <div>
                <span className="detail-metric-label">Difficulty</span>
                <span className="detail-metric-value">{career.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="detail-section">
          <h2 className="section-heading">Required Skills</h2>
          <div className="skills-tag-list">
            {career.requiredSkills.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </div>
        </div>

        {/* Streams */}
        <div className="detail-section">
          <h2 className="section-heading">Recommended Streams</h2>
          <div className="stream-tags">
            {career.recommendedStreams.map((stream) => (
              <SkillTag key={stream} variant="stream">{stream}</SkillTag>
            ))}
          </div>
        </div>

        {/* Future outlook */}
        <div className="detail-section">
          <h2 className="section-heading">Future Outlook</h2>
          <p className="detail-outlook">{career.futureOutlook}</p>
        </div>

        {/* Roadmap - rendered with .map() */}
        <div className="detail-section">
          <h2 className="section-heading">
            <GraduationCap size={22} className="heading-icon" />
            Career Roadmap
          </h2>
          <div className="roadmap">
            {career.roadmap.map((step, index) => (
              <motion.div
                key={step.stage}
                className="roadmap-step"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="roadmap-marker">
                  <span className="roadmap-index">{index + 1}</span>
                </div>
                <div className="roadmap-content">
                  <div className="roadmap-head">
                    <span className="roadmap-stage">{step.stage}</span>
                    <span className="roadmap-duration">{step.duration}</span>
                  </div>
                  <p className="roadmap-detail">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="detail-cta">
          <Sparkles size={22} />
          <p>Want to see if this fits your profile?</p>
          <Link to="/career-discovery" className="btn btn-primary">
            Take the Career Assessment
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerDetails;