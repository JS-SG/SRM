import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { toastSuccess, toastError } = useToast();

  const [identifier, setIdentifier] = useState('admin@srm.edu');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(identifier, password);
      toastSuccess(`Welcome back, ${user.username}!`);
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/teacher/dashboard');
      }
    } catch (err) {
      toastError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, pwd) => {
    setIdentifier(email);
    setPassword(pwd);
  };

  return (
    <div className="card-custom border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white">
      {/* Brand Header */}
      <div className="text-center mb-4">
        <div
          className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 mb-2 shadow-sm"
          style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
        >
          <i className="bi bi-building"></i>
        </div>
        <h4 className="fw-bold text-dark mb-1 letter-spacing-tight">School Record System</h4>
        <p className="text-muted small">Sign in to your administrative or teacher portal</p>
      </div>

      {searchParams.get('expired') && (
        <div className="alert alert-warning py-2 small mb-3 text-center">
          Your session has expired. Please sign in again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-semibold">Email or Username</label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="e.g. admin@srm.edu"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label small fw-semibold mb-0">Password</label>
          </div>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control border-start-0 ps-0"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2.5 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <i className="bi bi-box-arrow-in-right"></i>
          )}
          Sign In
        </button>
      </form>

      {/* Quick Demo Logins */}
      <div className="pt-3 border-top">
        <div className="text-center text-muted small fw-semibold mb-2" style={{ fontSize: '0.75rem' }}>
          DEVELOPMENT DEMO ACCOUNTS
        </div>
        <div className="d-flex flex-wrap gap-1.5 justify-content-center">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm rounded-pill py-1 px-2.5"
            style={{ fontSize: '0.75rem' }}
            onClick={() => handleQuickLogin('admin@srm.edu', 'Admin@123')}
          >
            <i className="bi bi-shield-lock-fill me-1"></i> Admin
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-pill py-1 px-2.5"
            style={{ fontSize: '0.75rem' }}
            onClick={() => handleQuickLogin('arun.teacher@srm.edu', 'Teacher@123')}
          >
            👨‍🏫 Arun (10-A Math)
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-pill py-1 px-2.5"
            style={{ fontSize: '0.75rem' }}
            onClick={() => handleQuickLogin('rajesh.teacher@srm.edu', 'Teacher@123')}
          >
            👨‍🏫 Rajesh (View Only)
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-sm rounded-pill py-1 px-2.5"
            style={{ fontSize: '0.75rem' }}
            onClick={() => handleQuickLogin('priya.teacher@srm.edu', 'Teacher@123')}
          >
            👩‍🏫 Priya (Science)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
