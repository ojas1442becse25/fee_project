import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import useSavedCareers from '../../hooks/useSavedCareers';
import SkillTag from '../../components/ui/SkillTag';
import Button from '../../components/ui/Button';

// SavedCareers
// ------------
// Lists the careers the user bookmarked during the assessment/results.
// Reads from the useSavedCareers hook (persisted to localStorage) and
// renders them with .map(). Each card shows the match percentage and
// reason captured when the career was saved. Shows an empty state when
// nothing is saved yet.
const SavedCareers = () => {
  const { savedCareers, savedCount, toggleSave, clearSaved } = useSavedCareers();

  return (
    <motion.div
      className="dash-home"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dash-welcome">
        <div>
          <h1 className="dash-welcome-title">Saved Careers</h1>
          <p className="dash-welcome-sub">
            Your bookmarked career paths — {savedCount} saved.
          </p>
        </div>
        {savedCareers.length > 0 && (
          <Button variant="secondary" onClick={clearSaved} icon={Trash2}>
            Clear All
          </Button>
        )}
      </div>

      {/* Conditional rendering: empty state vs. the list */}
      {savedCareers.length === 0 ? (
        <div className="saved-empty">
          <Bookmark size={40} className="saved-empty-icon" />
          <h3>No saved careers yet</h3>
          <p>
            Save careers from your recommendations to see them here.
          </p>
          <Link to="/career-discovery" className="btn btn-primary">
            Explore Careers
          </Link>
        </div>
      ) : (
        <div className="saved-grid">
          {savedCareers.map((career, index) => (
            <motion.div
              key={career.id}
              className="saved-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <div className="saved-card-head">
                <div>
                  <span className="detail-category">{career.category}</span>
                  <h3 className="saved-card-title">{career.title}</h3>
                </div>

                {/* Conditional: match % is only shown when it was stored */}
                {career.matchScore !== undefined && (
                  <div className="saved-match">
                    <span className="saved-match-num">{career.matchScore}%</span>
                    <span className="saved-match-label">match</span>
                  </div>
                )}
              </div>

              {/* Short reason captured at save time */}
              {career.personalReason && (
                <p className="saved-reason">{career.personalReason}</p>
              )}

              <p className="saved-card-desc">{career.description}</p>

              <div className="saved-card-meta">
                <span className="saved-card-salary">{career.salary}</span>
                <span className="saved-card-growth">{career.growth} growth</span>
              </div>

              <div className="skills-tag-list">
                {career.requiredSkills.slice(0, 4).map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>

              {/* Actions */}
              <div className="saved-card-actions">
                <Link to={`/career/${career.slug}`} className="btn btn-primary cmpr">
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  className="btn btn-remove"
                  onClick={() => toggleSave(career)}
                  aria-label={`Remove ${career.title} from saved`}
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SavedCareers;