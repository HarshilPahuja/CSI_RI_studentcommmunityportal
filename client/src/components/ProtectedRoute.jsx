import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  // Not logged in at all
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not admin (when admin is required)
  if (requireAdmin && userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // All checks passed, render the protected page
  return children;
}

export default ProtectedRoute;