import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { FiShield, FiLock, FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kkknpschool.edu.in');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await apiService.loginAdmin(email, password);
      navigate('/admin/controller');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@kkknpschool.edu.in');
    setPassword('admin123');
  };

  return (
    <div className="admin-login-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-navy-dark py-5 px-3">
      <div className="card admin-login-card border-0 rounded-4 shadow-2xl bg-white overflow-hidden" style={{ maxWidth: '440px', width: '100%' }}>
        {/* Top Branding Banner */}
        <div className="bg-navy text-white p-4 text-center position-relative">
          <div className="school-emblem-badge mx-auto mb-3 bg-gold text-dark">
            <span className="fw-bold fs-4">KKK</span>
          </div>
          <h4 className="fw-bold text-white mb-1">Central Controller CMS</h4>
          <p className="text-white-75 small mb-0">KKK N&P School Administration Portal</p>
        </div>

        <div className="p-4 p-md-5">
          {errorMessage && (
            <div className="alert alert-danger rounded-3 small py-2 mb-4 d-flex align-items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">Administrator Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FiMail className="text-muted" />
                </span>
                <input
                  type="text"
                  required
                  className="form-control border-start-0"
                  placeholder="admin@kkknpschool.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold text-dark mb-0">Password</label>
                <span className="text-muted small">Default: admin123</span>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FiLock className="text-muted" />
                </span>
                <input
                  type="password"
                  required
                  className="form-control border-start-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-navy w-100 py-2.5 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm mb-3"
            >
              <span>{isLoading ? 'Signing In...' : 'Login to Controller'}</span>
              <FiArrowRight size={16} />
            </button>

            {/* Demo Quick Fill Helper */}
            <div className="p-3 bg-light rounded-3 text-center mb-3 border">
              <span className="d-block small text-muted mb-2">Demo Administrator Access</span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-semibold small"
              >
                Auto-Fill Demo Credentials
              </button>
            </div>

            <div className="text-center">
              <Link to="/" className="text-muted small text-decoration-none hover-underline">
                ← Back to Public School Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
