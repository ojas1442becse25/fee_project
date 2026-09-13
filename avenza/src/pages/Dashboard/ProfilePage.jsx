import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { useAuth } from '../../context/AuthContext';

// ProfilePage
// -----------
// A controlled form for the user's career profile. Every field is backed
// by state and persists to the shared avenza_profile store through the
// useLocalStorage hook - the SAME store the assessment writes, so this
// form and the recommendation engine always agree on one source of truth.
//
// The assessment collects strength labels under the key "skills" (and
// "marks" for academics); the profile form honours those exact keys so
// editing here never leaves the matcher reading empty lists.
const ProfilePage = () => {
  const { user } = useAuth();

  // Start from a saved profile (or sensible defaults) so edits persist
  // across sessions and merge with whatever the assessment wrote.
  const [profile, setProfile] = useLocalStorage('avenza_profile', {
    name: user?.name || '',
    email: user?.email || '',
    education: '12th',
    stream: 'PCM',
    interests: [],
    skills: [],
    marks: 75,
    careerGoal: 'Technology',
  });
  const [saved, setSaved] = useState(false);

  // Data-driven lists for the checkbox options.
  const interestOptions = assessmentQuestions[2].options;
  const strengthOptions = assessmentQuestions[3].strengths;
  const streams = assessmentQuestions[1].streams;
  const careerGoalOptions = assessmentQuestions[4].careerGoals;

  // Generic handler updates a single field.
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Toggles an item in a multi-select array field.
  const toggleArrayItem = (field, value) => {
    setProfile((prev) => {
      const list = prev[field];
      const has = list.includes(value);
      return {
        ...prev,
        [field]: has ? list.filter((x) => x !== value) : [...list, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
            Update your career preferences. Changes are saved to this device.
          </p>
        </div>
      </div>

      {/* Controlled form */}
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Name + email */}
        <div className="profile-row">
          <label className="profile-field">
            <span className="field-label">Name</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </label>
          <label className="profile-field">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </label>
        </div>

        {/* Education + stream + goal */}
        <div className="profile-row">
          <label className="profile-field">
            <span className="field-label">Education Level</span>
            <select
              value={profile.education}
              onChange={(e) => handleChange('education', e.target.value)}
            >
              {['10th', '11th', '12th', 'College'].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
          <label className="profile-field">
            <span className="field-label">Stream</span>
            <select
              value={profile.stream}
              onChange={(e) => handleChange('stream', e.target.value)}
            >
              {streams.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="profile-field">
            <span className="field-label">Career Goal</span>
            <select
              value={profile.careerGoal}
              onChange={(e) => handleChange('careerGoal', e.target.value)}
            >
              {careerGoalOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
          <label className="profile-field">
            <span className="field-label">Academics Marks (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              value={profile.marks ?? 75}
              onChange={(e) => handleChange('marks', e.target.value)}
            />
          </label>
        </div>

        {/* Interests - rendered with .map() */}
        <fieldset className="profile-section">
          <legend className="profile-section-title">Interests</legend>
          <div className="profile-chip-grid">
            {interestOptions.map((opt) => {
              const selected = profile.interests.includes(opt.label);
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
          <div className="profile-chip-grid">
            {strengthOptions.map((opt) => {
              const selected = profile.skills.includes(opt.label);
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

        {/* Conditional rendering: saved confirmation */}
        {saved && <p className="profile-saved">Profile saved ✓</p>}

        <Button type="submit" icon={Save}>
          Save Profile
        </Button>
      </form>
    </motion.div>
  );
};

export default ProfilePage;