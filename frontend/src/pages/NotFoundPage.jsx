import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const NotFoundPage = () => {
  const { user, isAdmin } = useAuth();
  const homePath = user ? (isAdmin ? '/admin/dashboard' : '/teacher/dashboard') : '/login';

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 text-center">
      <div className="card-custom p-5 shadow-lg max-w-md bg-white">
        <div className="display-1 fw-extrabold text-primary mb-2">404</div>
        <h4 className="fw-bold text-dark mb-2">Page Not Found</h4>
        <p className="text-muted small mb-4">
          The requested route does not exist or you do not have permission to view it.
        </p>
        <Link to={homePath} className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-house-door me-1"></i> Return to Portal Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
