import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Sparkles, User, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
  } catch { /* ignore */ }
}

const Login = () => {
  useDocumentTitle('Login | Avenza');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Name validation
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    // 2. Email format validation
    const trimEmail = email.trim().toLowerCase();
    if (!trimEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_RE.test(trimEmail)) {
      setError('Please enter a valid email address (e.g. you@example.com).');
      return;
    }

    // 3. Password validation
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // 4. Credential check
    const users = getUsers();
    const existing = users.find((u) => u.email === trimEmail);
    const passwordHash = simpleHash(password);

    if (existing) {
      // Known email — verify password
      if (existing.passwordHash !== passwordHash) {
        setError('Incorrect password. Please try again.');
        return;
      }
      login({ name: existing.name, email: existing.email });
    } else {
      // New email — register and log in
      const newUser = { name: name.trim(), email: trimEmail, passwordHash };
      saveUsers([...users, newUser]);
      login({ name: newUser.name, email: newUser.email });
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-brand">
          <Sparkles size={30} className="login-logo" />
          <h1 className="login-title">Welcome to Avenza</h1>
          <p className="login-subtitle">
            Log in to save careers and manage your dashboard.
          </p>
        </div>

        {/* Controlled form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span className="field-label">Name</span>
            <div className="field-input">
              <User size={18} className="field-icon" />
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          </label>

          <label className="login-field">
            <span className="field-label">Email</span>
            <div className="field-input">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </label>

          <label className="login-field">
            <span className="field-label">Password</span>
            <div className="field-input password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="field-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {/* Error message */}
          {error && <p className="login-error">{error}</p>}

          <Button type="submit" className="btn-login-submit" icon={LogIn}>
            Log In / Register
          </Button>
        </form>

        <p className="login-note">
          New here? Enter your details to create an account automatically.
          Password must be at least 6 characters and a valid email is required.
        </p>
        <Link to="/career-discovery" className="login-link-back">
          ← Back to Career Discovery
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;