import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ProtectedRoute
// --------------
// Guards routes that require a logged-in user (the /dashboard section).
// If the user is not logged in it redirects to /login and remembers the
// page they wanted so login can send them back.
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;