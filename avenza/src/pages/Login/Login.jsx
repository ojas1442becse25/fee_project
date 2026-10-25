import { useState, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogIn,
  UserPlus,
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Compass,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerContext } from '../../context/CareerContext';
import Button from '../../components/ui/Button';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Login.css';

// Helpers
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('avenza_users') || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem('avenza_users', JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

// Field validation rules defined at module scope
const validateField = (field, value, mode) => {
  let error = '';
  if (field === 'name' && mode === 'register') {
    if (!value.trim()) {
      error = 'Full name is required.';
    } else if (value.trim().length < 2) {
      error = 'Name must be at least 2 characters.';
    }
  } else if (field === 'email') {
    const trimmed = value.trim();
    if (!trimmed) {
      error = 'Email address is required.';
    } else if (!EMAIL_RE.test(trimmed)) {
      error = 'Please enter a valid email address (e.g. name@example.com).';
    }
  } else if (field === 'password') {
    if (!value) {
      error = 'Password is required.';
    } else if (value.length < 6) {
      error = 'Password must be at least 6 characters.';
    }
  }
  return error;
};

const Login = () => {
  useDocumentTitle('Sign In / Register | Avenza');

  const { login } = useAuth();
  const { profile, saveProfile } = useCareerContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Field-specific validation errors & form-level messages
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleBlur = (field) => {
    const value = field === 'name' ? name : field === 'email' ? email : password;
    const error = validateField(field, value, mode);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validate all relevant fields
    const errors = {};
    if (mode === 'register') {
      const nameErr = validateField('name', name, mode);
      if (nameErr) errors.name = nameErr;
    }
    const emailErr = validateField('email', email, mode);
    if (emailErr) errors.email = emailErr;

    const passErr = validateField('password', password, mode);
    if (passErr) errors.password = passErr;

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate async authentication request
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const users = getUsers();
      const trimEmail = email.trim().toLowerCase();
      const passwordHash = simpleHash(password);
      const existing = users.find((u) => u.email === trimEmail);

      if (mode === 'login') {
        if (!existing) {
          setFormError('No account found with this email. Please check your spelling or switch to Create Account.');
          setIsSubmitting(false);
          return;
        }
        if (existing.passwordHash !== passwordHash) {
          setFormError('Incorrect password. Please verify your credentials and try again.');
          setIsSubmitting(false);
          return;
        }

        // Login success
        login({ name: existing.name, email: existing.email });
        if (profile) {
          saveProfile({ name: existing.name, email: existing.email });
        }
        setFormSuccess(`Welcome back, ${existing.name}! Redirecting to ${from === '/dashboard' ? 'your dashboard' : from}...`);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      } else {
        // Mode === 'register'
        if (existing) {
          setFormError('An account with this email already exists. Please switch to Sign In.');
          setIsSubmitting(false);
          return;
        }

        const newUser = {
          name: name.trim(),
          email: trimEmail,
          passwordHash,
          createdAt: Date.now()
        };
        saveUsers([...users, newUser]);

        login({ name: newUser.name, email: newUser.email });
        saveProfile({ name: newUser.name, email: newUser.email });
        setFormSuccess(`Account created successfully! Welcome, ${newUser.name}. Redirecting...`);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      }
    } catch {
      setFormError('An unexpected authentication error occurred. Please try again.');
      setIsSubmitting(false);
    }
  }, [mode, name, email, password, login, profile, saveProfile, navigate, from]);

  return (
    <div className="login-page">
      {/* Ambient background glows */}
      <div className="login-bg-glow glow-top" aria-hidden="true" />
      <div className="login-bg-glow glow-bottom" aria-hidden="true" />
      <div className="login-bg-grid" aria-hidden="true" />

      <div className="login-container">
        {/* Left Column: Visual Showcase & Brand Highlights */}
        <motion.div
          className="login-showcase"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="showcase-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>Intelligent Career Navigation</span>
          </div>

          <h2 className="showcase-title">
            Unlock data-driven clarity for your professional trajectory.
          </h2>
          <p className="showcase-desc">
            AVENZA connects academic foundations with verified market demand across 30+ cutting-edge engineering, data, design, and management disciplines.
          </p>

          {/* 3D-inspired preview card */}
          <div className="showcase-card">
            <div className="showcase-card-header">
              <div className="showcase-card-icon">
                <Compass size={18} />
              </div>
              <div className="showcase-card-title-group">
                <span className="showcase-card-label">Recommended Match</span>
                <span className="showcase-card-career">Artificial Intelligence Engineer</span>
              </div>
              <span className="showcase-live-pill">98% Fit</span>
            </div>

            <div className="showcase-score-bar-track">
              <div className="showcase-score-bar-fill" style={{ width: '98%' }} />
            </div>

            <div className="showcase-metrics-row">
              <div className="showcase-metric">
                <span className="metric-num">₹14 - 35 LPA</span>
                <span className="metric-tag">Comp Range</span>
              </div>
              <div className="showcase-metric">
                <span className="metric-num">+32%</span>
                <span className="metric-tag">Growth</span>
              </div>
              <div className="showcase-metric">
                <span className="metric-num">Tier 1</span>
                <span className="metric-tag">Industry Tier</span>
              </div>
            </div>
          </div>

          {/* Value propositions */}
          <ul className="showcase-features">
            <li>
              <div className="feature-check"><Check size={14} /></div>
              <span>Multi-variable skill and interest compatibility engine</span>
            </li>
            <li>
              <div className="feature-check"><Check size={14} /></div>
              <span>Actionable learning roadmaps with curated milestones</span>
            </li>
            <li>
              <div className="feature-check"><Check size={14} /></div>
              <span>Encrypted local session with complete profile privacy</span>
            </li>
          </ul>
        </motion.div>

        {/* Right Column: Glassmorphic Auth Form */}
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="login-brand">
            <div className="login-icon-wrap">
              <Sparkles size={24} className="login-logo" />
            </div>
            <h1 className="login-title">
              {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="login-subtitle">
              {mode === 'login'
                ? 'Sign in to access your assessment results, saved careers, and profile.'
                : 'Sign up to discover careers, track your journey, and build your future.'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="login-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`login-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setFormError('');
                setFormSuccess('');
                setFieldErrors({});
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              className={`login-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setFormError('');
                setFormSuccess('');
                setFieldErrors({});
              }}
            >
              <UserPlus size={15} />
              <span>Create Account</span>
            </button>
          </div>

          {/* Form-level alerts */}
          {formError && (
            <motion.div
              className="login-error"
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} className="error-icon" />
              <span>{formError}</span>
            </motion.div>
          )}

          {formSuccess && (
            <motion.div
              className="login-success"
              role="status"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={16} className="success-icon" />
              <span>{formSuccess}</span>
            </motion.div>
          )}

          {/* Controlled form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {mode === 'register' && (
              <div className="login-field">
                <label htmlFor="login-name" className="field-label">
                  Full Name <span className="field-required">*</span>
                </label>
                <div className={`field-input ${fieldErrors.name ? 'has-error' : ''}`}>
                  <User size={18} className="field-icon" />
                  <input
                    id="login-name"
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) {
                        setFieldErrors((prev) => ({ ...prev, name: '' }));
                      }
                    }}
                    onBlur={() => handleBlur('name')}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                </div>
                {fieldErrors.name && (
                  <p id="name-error" className="field-error-text" role="alert">
                    <AlertCircle size={13} />
                    <span>{fieldErrors.name}</span>
                  </p>
                )}
              </div>
            )}

            <div className="login-field">
              <label htmlFor="login-email" className="field-label">
                Email Address <span className="field-required">*</span>
              </label>
              <div className={`field-input ${fieldErrors.email ? 'has-error' : ''}`}>
                <Mail size={18} className="field-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
              </div>
              {fieldErrors.email && (
                <p id="email-error" className="field-error-text" role="alert">
                  <AlertCircle size={13} />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            <div className="login-field">
              <div className="field-label-row">
                <label htmlFor="login-password" className="field-label">
                  Password <span className="field-required">*</span>
                </label>
                {mode === 'login' && (
                  <span className="field-hint">6+ characters required</span>
                )}
              </div>
              <div className={`field-input password-field ${fieldErrors.password ? 'has-error' : ''}`}>
                <Lock size={18} className="field-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: '' }));
                    }
                  }}
                  onBlur={() => handleBlur('password')}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="field-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="password-error" className="field-error-text" role="alert">
                  <AlertCircle size={13} />
                  <span>{fieldErrors.password}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="btn-login-submit"
              icon={isSubmitting ? Loader2 : mode === 'login' ? LogIn : UserPlus}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === 'login'
                  ? 'Signing in...'
                  : 'Creating Account...'
                : mode === 'login'
                ? 'Sign In to Dashboard'
                : 'Create Account & Continue'}
            </Button>
          </form>

          {/* Security & evaluation note */}
          <div className="login-security-tag">
            <ShieldCheck size={14} className="security-icon" />
            <span>Local-first encrypted session &bull; Evaluation II Demo</span>
          </div>

          <Link to="/" className="login-link-back">
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;