import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

const ProfileSummary = ({ formData, onSubmit }) => {
  const selectedInterests = formData.interests?.length || 0;
  const selectedSkills = formData.skills?.length || 0;
  const selectedPriorities = formData.priorities?.length || 0;

  return (
    <div className="question-section">
      <motion.div
        className="summary-header-new"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="summary-icon-new">
          <Sparkles size={32} strokeWidth={2} />
        </div>
        <h2 className="question-heading">Your profile is ready</h2>
        <p className="question-subtext">We've gathered everything we need to find your perfect career matches.</p>
      </motion.div>

      <div className="summary-stats">
        <div className="summary-stat-item">
          <span className="stat-number">{selectedInterests}</span>
          <span className="stat-label">Interests Selected</span>
        </div>
        <div className="summary-stat-item">
          <span className="stat-number">{selectedSkills}</span>
          <span className="stat-label">Strengths Identified</span>
        </div>
        <div className="summary-stat-item">
          <span className="stat-number">{selectedPriorities}</span>
          <span className="stat-label">Priorities Set</span>
        </div>
      </div>

      <div className="summary-card-new">
        <div className="summary-row-new">
          <Check size={18} className="check-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Name</span>
            <span className="summary-value-new">{formData.name || 'Not provided'}</span>
          </div>
        </div>
        <div className="summary-row-new">
          <Check size={18} className="check-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Education</span>
            <span className="summary-value-new">{formData.class} • {formData.stream}</span>
          </div>
        </div>
        <div className="summary-row-new">
          <Check size={18} className="check-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Academic Performance</span>
            <span className="summary-value-new">{formData.marks}%</span>
          </div>
        </div>
        <div className="summary-row-new">
          <Check size={18} className="check-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Career Goal</span>
            <span className="summary-value-new">{formData.careerGoal || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <motion.button
        className="btn btn-primary btn-large btn-glow"
        onClick={onSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles size={20} />
        <span>Find My Career Matches</span>
      </motion.button>
    </div>
  );
};

export default ProfileSummary;
