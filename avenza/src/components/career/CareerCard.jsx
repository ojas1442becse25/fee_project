import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Check, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MatchScore from '../ui/MatchScore';
import SkillTag from '../ui/SkillTag';

// CareerCard
// ----------
// Displays one recommended career. Reuses MatchScore and SkillTag,
// renders lists with .map() + stable keys, and demonstrates props
// (career, rank), state (isExpanded) and event handling.
const CareerCard = ({ career, rank, isSaved = false, onToggleSave }) => {
  const isTopMatch = rank === 1;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`career-card-pro ${isTopMatch ? 'top-match-pro' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1, duration: 0.5 }}
      layout
    >
      {isTopMatch && <div className="top-label">TOP MATCH</div>}
      {!isTopMatch && <div className="rank-label">#{rank} RECOMMENDATION</div>}

      {/* Header with Title and Match Score */}
      <div className="card-header-pro">
        <div className="title-section">
          <h3 className="career-title-pro">{career.title}</h3>
          <span className="category-label-pro">{career.category}</span>
        </div>
        <div className="match-section">
          <MatchScore score={career.matchScore} delay={rank * 0.1 + 0.4} />
          <div className="match-label-pro">Match Score</div>
        </div>
      </div>

      {/* Why This Match */}
      <div className="why-match-section-new">
        <h4 className="section-heading-new">Why this is a match</h4>

        {/* Short personalized reason generated from the user's data */}
        {career.personalReason && (
          <p className="personal-reason">{career.personalReason}</p>
        )}

        <div className="match-criteria">
          {career.matchReasons.map((reason, idx) => (
            <div key={idx} className="criteria-item">
              <Check size={16} className="criteria-check" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Required Skills */}
      <div className="info-section">
        <h4 className="section-heading">REQUIRED SKILLS</h4>
        <div className="skills-tag-list">
          {career.requiredSkills.map((skill) => (
            <SkillTag key={skill}>{skill}</SkillTag>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-row-pro">
        <div className="metric-col">
          <span className="metric-heading">AVERAGE SALARY</span>
          <span className="metric-data">{career.salary}</span>
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

      {/* Actions */}
      <div className="card-actions">
        <Link to={`/career/${career.slug}`} className="btn btn-primary">
          <span>View Details</span>
          <ArrowRight size={18} />
        </Link>
        {onToggleSave && (
          <button
            className={`btn btn-secondary ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(career)}
            aria-pressed={isSaved}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            <span>{isSaved ? 'Saved' : 'Save Career'}</span>
          </button>
        )}
      </div>

      {/* Expandable Section (quick look inside the card) */}
      <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
        <span>{isExpanded ? 'Show Less' : 'More Details'}</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="info-section">
              <h4 className="section-heading">FUTURE OUTLOOK</h4>
              <p className="outlook-text">{career.futureOutlook}</p>
            </div>

            <div className="info-section">
              <h4 className="section-heading">RECOMMENDED STREAM</h4>
              <div className="stream-tags">
                {career.recommendedStreams.map((stream) => (
                  <SkillTag key={stream} variant="stream">{stream}</SkillTag>
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