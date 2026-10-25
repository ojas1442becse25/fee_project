import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { useAuth } from '../../context/AuthContext';
import { useCareerContext } from '../../context/CareerContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ProfilePage
// -----------
// A controlled form for the user's career profile.
// Connects with both AuthContext (for user name/email sync) and
// CareerContext (for global profile & match calculation sync).
//
// Demonstrates:
//  - Controlled inputs & multi-select arrays
//  - Field-specific validation (required name, email format, marks 0-100)
//  - Accessible field labels and error alerts
//  - Global state synchronization via React Context API
const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { profile: globalProfile, saveProfile } = useCareerContext();

  const [localProfile, setLocalProfile] = useState(() => ({
    name: globalProfile?.name || user?.name || '',
    email: globalProfile?.email || user?.email || '',
    education: globalProfile?.education || globalProfile?.class || '12th',
    stream: globalProfile?.stream || 'PCM',
    interests: globalProfile?.interests || [],
    skills: globalProfile?.skills || [],
    marks: globalProfile?.marks !== undefined ? globalProfile.marks : 75,
    careerGoal: globalProfile?.careerGoal || 'Technology',
  }));

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Data-driven lists from assessment questions
  const interestOptions = assessmentQuestions[2].options;
  const strengthOptions = assessmentQuestions[3].strengths;
  const streams = assessmentQuestions[1].streams;
  const careerGoalOptions = assessmentQuestions[4].careerGoals;

  const validate = () => {
    const errs = {};
    if (!localProfile.name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!localProfile.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!EMAIL_RE.test(localProfile.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    const marksNum = Number(localProfile.marks);
    if (localProfile.marks === '' || isNaN(marksNum)) {
      errs.marks = 'Marks must be a valid number.';
    } else if (marksNum < 0 || marksNum > 100) {
      errs.marks = 'Marks must be between 0 and 100%.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayItem = (field, value) => {
    setLocalProfile((prev) => {
      const list = prev[field] || [];
      const has = list.includes(value);
      return {
        ...prev,
        [field]: has ? list.filter((x) => x !== value) : [...list, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Synchronize to global CareerContext
    saveProfile({
      ...localProfile,
      name: localProfile.name.trim(),
      email: localProfile.email.trim()
    });

    // Synchronize to global AuthContext
    if (updateUser) {
      updateUser({
        name: localProfile.name.trim(),
        email: localProfile.email.trim()
      });
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      className="dash-home"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dash-welcome">
        <div>
          <h1 className="dash-welcome-title">My Profile</h1>
          <p className="dash-welcome-sub">
            Update your career preferences. Changes are synchronized across your dashboard and recommendations.
          </p>
        </div>
      </div>

      {/* Controlled form with field validation */}
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        {/* Name + email */}
        <div className="profile-row">
          <label className="profile-field" htmlFor="profile-name">
            <span className="field-label">
              Full Name <span style={{ color: '#f87171' }}>*</span>
            </span>
            <input
              id="profile-name"
              type="text"
              value={localProfile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'has-error' : ''}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'profile-name-err' : undefined}
            />
            {errors.name && (
              <span id="profile-name-err" style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }} role="alert">
                <AlertCircle size={13} />
                {errors.name}
              </span>
            )}
          </label>

          <label className="profile-field" htmlFor="profile-email">
            <span className="field-label">
              Email Address <span style={{ color: '#f87171' }}>*</span>
            </span>
            <input
              id="profile-email"
              type="email"
              value={localProfile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'has-error' : ''}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'profile-email-err' : undefined}
            />
            {errors.email && (
              <span id="profile-email-err" style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }} role="alert">
                <AlertCircle size={13} />
                {errors.email}
              </span>
            )}
          </label>
        </div>

        {/* Education + stream + goal + marks */}
        <div className="profile-row">
          <label className="profile-field" htmlFor="profile-edu">
            <span className="field-label">Education Level</span>
            <select
              id="profile-edu"
              value={localProfile.education}
              onChange={(e) => handleChange('education', e.target.value)}
            >
              {['10th', '11th', '12th', 'College'].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>

          <label className="profile-field" htmlFor="profile-stream">
            <span className="field-label">Stream</span>
            <select
              id="profile-stream"
              value={localProfile.stream}
              onChange={(e) => handleChange('stream', e.target.value)}
            >
              {streams.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="profile-field" htmlFor="profile-goal">
            <span className="field-label">Career Goal</span>
            <select
              id="profile-goal"
              value={localProfile.careerGoal}
              onChange={(e) => handleChange('careerGoal', e.target.value)}
            >
              {careerGoalOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          <label className="profile-field" htmlFor="profile-marks">
            <span className="field-label">
              Academics Marks (%) <span style={{ color: '#f87171' }}>*</span>
            </span>
            <input
              id="profile-marks"
              type="number"
              min="0"
              max="100"
              value={localProfile.marks}
              onChange={(e) => handleChange('marks', e.target.value)}
              className={errors.marks ? 'has-error' : ''}
              aria-invalid={Boolean(errors.marks)}
              aria-describedby={errors.marks ? 'profile-marks-err' : undefined}
            />
            {errors.marks && (
              <span id="profile-marks-err" style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }} role="alert">
                <AlertCircle size={13} />
                {errors.marks}
              </span>
            )}
          </label>
        </div>

        {/* Interests */}
        <fieldset className="profile-section">
          <legend className="profile-section-title">Interests</legend>
          <div className="profile-chip-grid" role="group" aria-label="Interests list">
            {interestOptions.map((opt) => {
              const selected = localProfile.interests.includes(opt.label);
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={selected ? 'profile-chip profile-chip-selected' : 'profile-chip'}
                  onClick={() => toggleArrayItem('interests', opt.label)}
                  aria-pressed={selected}
                >
                  {selected && <Check size={14} />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Strengths */}
        <fieldset className="profile-section">
          <legend className="profile-section-title">Strengths</legend>
          <div className="profile-chip-grid" role="group" aria-label="Strengths list">
            {strengthOptions.map((opt) => {
              const selected = localProfile.skills.includes(opt.label);
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={selected ? 'profile-chip profile-chip-selected' : 'profile-chip'}
                  onClick={() => toggleArrayItem('skills', opt.label)}
                  aria-pressed={selected}
                >
                  {selected && <Check size={14} />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Success feedback */}
        {saved && (
          <div className="login-success" style={{ margin: '1rem 0' }} role="status">
            <CheckCircle2 size={16} />
            <span>Profile and recommendations updated successfully!</span>
          </div>
        )}

        <Button type="submit" icon={Save}>
          Save Profile
        </Button>
      </form>
    </motion.div>
  );
};

export default ProfilePage;