import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './NotFound.css';

// NotFound
// --------
// The 404 page. Rendered for any unknown route (*) and also used as the
// fallback when a /career/:careerSlug URL does not match any career.
const NotFound = ({ message }) => {
  useDocumentTitle('Page not found | Avenza');

  return (
    <div className="notfound-page">
      <motion.div
        className="notfound-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="notfound-icon">
          <Compass size={56} />
        </div>

        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">
          {message || "Oops! The page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <Link to="/career-discovery" className="btn btn-secondary">
            <ArrowLeft size={18} />
            <span>Career Discovery</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;