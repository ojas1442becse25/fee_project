import { motion } from 'framer-motion';
import { Sparkles, Check, User, GraduationCap, Compass, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const ProfileSummary = ({ formData, onSubmit }) => {
  const selectedInterests = formData.interests || [];
  const selectedSkills = formData.skills || [];
  const selectedPriorities = formData.priorities || [];

  return (
    <div className="question-section profile-summary-section">
      <motion.div
        className="summary-header-new"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="summary-icon-new">
          <Sparkles size={28} strokeWidth={2.2} />
        </div>
        <h2 className="question-heading">Your Profile is Ready for Matching</h2>
        <p className="question-subtext">
          Review your inputs below before our matching engine calculates your tailored career fit scores.
        </p>
      </motion.div>

      {/* Summary Highlight Counters */}
      <div className="summary-stats">
        <div className="summary-stat-item">
          <span className="stat-number">{selectedInterests.length}</span>
          <span className="stat-label">Interests</span>
        </div>
        <div className="summary-stat-item">
          <span className="stat-number">{selectedSkills.length}</span>
          <span className="stat-label">Key Strengths</span>
        </div>
        <div className="summary-stat-item">
          <span className="stat-number">{selectedPriorities.length}</span>
          <span className="stat-label">Priorities</span>
        </div>
        <div className="summary-stat-item">
          <span className="stat-number">{formData.marks || 75}%</span>
          <span className="stat-label">Academic Score</span>
        </div>
      </div>

      {/* Structured Details Card */}
      <div className="summary-card-new">
        <div className="summary-row-new">
          <User size={18} className="summary-row-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Candidate</span>
            <span className="summary-value-new">{formData.name || 'Student Candidate'}</span>
          </div>
        </div>

        <div className="summary-row-new">
          <GraduationCap size={18} className="summary-row-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Education Stage & Stream</span>
            <span className="summary-value-new">{formData.class || '12th'} • {formData.stream || 'Science'}</span>
          </div>
        </div>

        <div className="summary-row-new">
          <Compass size={18} className="summary-row-icon" />
          <div className="summary-item-content">
            <span className="summary-label-new">Career Goal & Target Exam</span>
            <span className="summary-value-new">{formData.careerGoal || 'Technology'} ({formData.entranceExam || 'Direct Entry'})</span>
          </div>
        </div>

        {/* Selected Interests Chips */}
        {selectedInterests.length > 0 && (
          <div className="summary-chips-row">
            <span className="summary-chips-label">Primary Interests:</span>
            <div className="summary-chips-container">
              {selectedInterests.map((interest) => (
                <span key={interest} className="summary-chip interest">
                  <Check size={12} /> {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Selected Strengths Chips */}
        {selectedSkills.length > 0 && (
          <div className="summary-chips-row">
            <span className="summary-chips-label">Core Strengths:</span>
            <div className="summary-chips-container">
              {selectedSkills.map((skill) => (
                <span key={skill} className="summary-chip strength">
                  <Check size={12} /> {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Button className="btn-large btn-glow" onClick={onSubmit} icon={Sparkles}>
          <span>Find My Career Matches</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileSummary;

