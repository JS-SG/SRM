import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAcademic } from '../../contexts/AcademicContext';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, isAdmin } = useAuth();
  const { currentYear } = useAcademic();

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-link text-dark p-0 d-lg-none"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <div className="d-none d-md-flex align-items-center gap-2">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1.5 rounded-pill d-flex align-items-center gap-1.5 small fw-semibold">
            <i className="bi bi-calendar-check"></i>
            AY: {currentYear ? currentYear.name : '2026-27'}
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Role Badge */}
        <span
          className={`badge rounded-pill px-2.5 py-1.5 small fw-bold ${
            isAdmin ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-info-subtle text-info border border-info-subtle'
          }`}
        >
          <i className={`bi ${isAdmin ? 'bi-shield-lock-fill' : 'bi-mortarboard-fill'} me-1`}></i>
          {user?.role}
        </span>

        {/* User Info & Logout */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
            style={{ width: '36px', height: '36px', fontSize: '0.875rem' }}
          >
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="d-none d-sm-block text-start">
            <div className="fw-bold text-dark small leading-tight">{user?.username}</div>
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{user?.email}</div>
          </div>
        </div>

        <button
          className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
          onClick={logout}
          title="Sign out of SRM"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="d-none d-md-inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
