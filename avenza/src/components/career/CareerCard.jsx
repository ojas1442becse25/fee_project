import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CareerCard = ({ career, rank }) => {
  const isTopMatch = rank === 1;
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate matched criteria
  const matchedCriteria = [];
  if (career.matchDetails?.interests > 20) matchedCriteria.push('Strong interest alignment');
  if (career.matchDetails?.skills > 12) matchedCriteria.push('Your skills match well');
  if (career.matchDetails?.stream === 15) matchedCriteria.push('Perfect academic fit');
  if (career.matchDetails?.marks === 10) matchedCriteria.push('Academic requirements met');

  return (
    <motion.div
      className={`career-card-pro ${isTopMatch ? 'top-match-pro' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1, duration: 0.5 }}
      layout
    >
      {/* Rank Label */}
      {isTopMatch && <div className="top-label">TOP MATCH</div>}
      {!isTopMatch && <div className="rank-label">#{rank} RECOMMENDATION</div>}

      {/* Header with Title and Match Score */}
      <div className="card-header-pro">
        <div className="title-section">
          <h3 className="career-title-pro">{career.name}</h3>
          <span className="category-label-pro">{career.category}</span>
        </div>
        <div className="match-section">
          <motion.div
            className="match-circle-pro"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: rank * 0.1 + 0.3 }}
          >
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-circle-bg"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
              />
              <motion.circle
                className="progress-ring-circle"
                stroke={isTopMatch ? 'url(#gradient)' : 'var(--accent)'}
                strokeWidth="6"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: career.matchScore / 100 }}
                transition={{ duration: 1, delay: rank * 0.1 + 0.4, ease: "easeOut" }}
                style={{
                  strokeDasharray: "213.628 213.628",
                  strokeDashoffset: 0,
                  transformOrigin: "50% 50%",
                  transform: "rotate(-90deg)"
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="match-percentage-circle">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rank * 0.1 + 0.5 }}
              >
                {career.matchScore}%
              </motion.span>
            </div>
          </motion.div>
          <div className="match-label-pro">Match Score</div>
        </div>
      </div>

      {/* Why This Match */}
      <div className="why-match-section-new">
        <h4 className="section-heading-new">Why this is a match</h4>
        {matchedCriteria.length > 0 && (
          <div className="match-criteria">
            {matchedCriteria.map((criteria, idx) => (
              <div key={idx} className="criteria-item">
                <Check size={16} className="criteria-check" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
        )}
        <p className="match-reason-text">{career.reason}</p>
      </div>

      {/* Required Skills */}
      <div className="info-section">
        <h4 className="section-heading">REQUIRED SKILLS</h4>
        <div className="skills-list-pro">
          {career.skills.join(' · ')}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-row-pro">
        <div className="metric-col">
          <span className="metric-heading">AVERAGE SALARY</span>
          <span className="metric-data">{career.averageSalary}</span>
        </div>
        <div className="metric-col">
          <span className="metric-heading">GROWTH</span>
          <span className="metric-data">{career.growth}</span>
        </div>
        <div className="metric-col">
          <span className="metric-heading">DIFFICULTY</span>
          <span className="metric-data">{career.difficulty}</span>
        </div>
      </div>

      {/* Expandable Section */}
      <button
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{isExpanded ? 'Show Less' : 'View Career Details'}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="info-section">
              <h4 className="section-heading">FUTURE OUTLOOK</h4>
              <p className="outlook-text">{career.futureScope}</p>
            </div>

            <div className="info-section">
              <h4 className="section-heading">RECOMMENDED STREAM</h4>
              <div className="stream-tags">
                {career.recommendedStreams.map((stream, idx) => (
                  <span key={idx} className="stream-tag">{stream}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CareerCard;
