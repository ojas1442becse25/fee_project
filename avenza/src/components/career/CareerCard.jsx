import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ChevronDown,
  Check,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Banknote,
  Gauge,
  Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MatchScore from '../ui/MatchScore';
import SkillTag from '../ui/SkillTag';

const CareerCard = ({ career, rank, isSaved = false, onToggleSave }) => {
  const isTopMatch = rank === 1;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`career-card-pro ${isTopMatch ? 'top-match-pro' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.08, duration: 0.45 }}
      layout
    >
      {/* Visual Rank Pill */}
      <div className="card-top-bar">
        {isTopMatch ? (
          <div className="top-match-badge">
            <Sparkles size={13} />
            <span>#1 Highest Match</span>
          </div>
        ) : (
          <div className="rank-badge">
            <span>#{rank} Ranked Fit</span>
          </div>
        )}
        <span className="career-id-tag">{career.category}</span>
      </div>

      {/* Header with Title and Match Score */}
      <div className="card-header-pro">
        <div className="title-section">
          <h3 className="career-title-pro">{career.title}</h3>
          {career.description && (
            <p className="career-card-desc">{career.description}</p>
          )}
        </div>
        <div className="match-section">
          <MatchScore score={career.matchScore} delay={rank * 0.08 + 0.3} />
          <div className="match-label-pro">Match Score</div>
        </div>
      </div>

      {/* Why This Match */}
      <div className="why-match-section-new">
        <h4 className="section-heading-new">
          <Compass size={15} style={{ color: '#38bdf8' }} />
          <span>Why this is a strong match for your profile</span>
        </h4>

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
        <h4 className="section-heading">CORE COMPETENCIES & REQUIRED SKILLS</h4>
        <div className="skills-tag-list">
          {career.requiredSkills.map((skill) => (
            <SkillTag key={skill}>{skill}</SkillTag>
          ))}
        </div>
      </div>

      {/* Metrics Grid with Icons */}
      <div className="metrics-row-pro">
        <div className="metric-col">
          <div className="metric-header-with-icon">
            <Banknote size={14} className="metric-icon" />
            <span className="metric-heading">AVG COMPENSATION</span>
          </div>
          <span className="metric-data">{career.salary}</span>
        </div>
        <div className="metric-col">
          <div className="metric-header-with-icon">
            <TrendingUp size={14} className="metric-icon" />
            <span className="metric-heading">MARKET GROWTH</span>
          </div>
          <span className="metric-data">{career.growth}</span>
        </div>
        <div className="metric-col">
          <div className="metric-header-with-icon">
            <Gauge size={14} className="metric-icon" />
            <span className="metric-heading">DIFFICULTY CURVE</span>
          </div>
          <span className="metric-data">{career.difficulty}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <Link to={`/career/${career.slug}`} className="btn btn-primary">
          <span>View Career Details & Roadmap</span>
          <ArrowRight size={18} />
        </Link>
        {onToggleSave && (
          <button
            type="button"
            className={`btn btn-secondary ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(career)}
            aria-pressed={isSaved}
            title={isSaved ? 'Remove from saved' : 'Save career to dashboard'}
          >
            {isSaved ? <BookmarkCheck size={18} style={{ color: '#34d399' }} /> : <Bookmark size={18} />}
            <span>{isSaved ? 'Saved to Dashboard' : 'Save Career'}</span>
          </button>
        )}
      </div>

      {/* Expandable Section (quick look inside the card) */}
      <button
        type="button"
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Hide Extra Details' : 'View Future Outlook & Stream Fit'}</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
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
              <h4 className="section-heading">RECOMMENDED ACADEMIC STREAMS</h4>
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