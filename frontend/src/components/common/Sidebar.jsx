import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = ({ show, onClose }) => {
  const { user, isAdmin, isTeacher, hasPermission } = useAuth();

  return (
    <>
      {show && <div className="sidebar-backdrop d-lg-none" onClick={onClose}></div>}
      <aside className={`sidebar ${show ? 'show' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div
            className="rounded-3 bg-primary text-white d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '36px', height: '36px', fontSize: '1.2rem' }}
          >
            <i className="bi bi-building"></i>
          </div>
          <div>
            <div className="fw-extrabold text-white">SRM Portal</div>
            <div className="text-secondary" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              SCHOOL MANAGEMENT
            </div>
          </div>
        </div>

        {/* Menu */}
        <ul className="sidebar-menu">
          {/* ================= ADMIN NAVIGATION ================= */}
          {isAdmin && (
            <>
              <div className="sidebar-section-title">Overview</div>
              <li className="sidebar-item">
                <NavLink to="/admin/dashboard" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-speedometer2"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">People & Directory</div>
              <li className="sidebar-item">
                <NavLink to="/admin/students" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-people"></i>
                  <span>Students</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/staff" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-person-badge"></i>
                  <span>Staff & Faculty</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">Academic Structure</div>
              <li className="sidebar-item">
                <NavLink to="/admin/academic" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-calendar3"></i>
                  <span>Academic Years</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/classes" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-grid-3x3-gap"></i>
                  <span>Classes & Divisions</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/class-assignments" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-diagram-3"></i>
                  <span>Class Assignments</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/subjects" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-journal-bookmark"></i>
                  <span>Subjects & Mappings</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">Exams & Grading</div>
              <li className="sidebar-item">
                <NavLink to="/admin/exams" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-journal-check"></i>
                  <span>Examinations</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/marks" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-input-cursor-text"></i>
                  <span>Marks Entry</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/marks-reports" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-award"></i>
                  <span>Marks Reports</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">Fees & Finance</div>
              <li className="sidebar-item">
                <NavLink to="/admin/fees" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-cash-stack"></i>
                  <span>Fee Management</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/fee-reports" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-receipt-cutoff"></i>
                  <span>Fee Reports</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">Communication</div>
              <li className="sidebar-item">
                <NavLink to="/admin/whatsapp" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-whatsapp text-success"></i>
                  <span>WhatsApp Composer</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/notification-history" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-clock-history"></i>
                  <span>Notification Logs</span>
                </NavLink>
              </li>

              <div className="sidebar-section-title">Administration</div>
              <li className="sidebar-item">
                <NavLink to="/admin/permissions" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-shield-check"></i>
                  <span>Permissions Matrix</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/audit-logs" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-journal-text"></i>
                  <span>Audit Logs</span>
                </NavLink>
              </li>
            </>
          )}

          {/* ================= TEACHER NAVIGATION ================= */}
          {isTeacher && (
            <>
              <div className="sidebar-section-title">Teacher Space</div>
              <li className="sidebar-item">
                <NavLink to="/teacher/dashboard" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-speedometer2"></i>
                  <span>Teacher Dashboard</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink to="/teacher/students" className="sidebar-link" onClick={onClose}>
                  <i className="bi bi-people"></i>
                  <span>My Students</span>
                </NavLink>
              </li>

              {hasPermission(['MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE']) && (
                <li className="sidebar-item">
                  <NavLink to="/teacher/marks" className="sidebar-link" onClick={onClose}>
                    <i className="bi bi-input-cursor-text"></i>
                    <span>Marks Entry & Grading</span>
                  </NavLink>
                </li>
              )}

              {hasPermission('REPORT_VIEW') && (
                <li className="sidebar-item">
                  <NavLink to="/admin/marks-reports" className="sidebar-link" onClick={onClose}>
                    <i className="bi bi-award"></i>
                    <span>Performance Reports</span>
                  </NavLink>
                </li>
              )}

              {hasPermission('NOTIFICATION_SEND') && (
                <li className="sidebar-item">
                  <NavLink to="/admin/whatsapp" className="sidebar-link" onClick={onClose}>
                    <i className="bi bi-whatsapp text-success"></i>
                    <span>WhatsApp Notices</span>
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>

        {/* Footer info */}
        <div className="p-3 border-top border-dark-subtle text-muted small" style={{ fontSize: '0.7rem' }}>
          <div className="text-secondary">Connected Database</div>
          <div className="text-white-50 fw-semibold">MySQL 9.6 • Relational</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
