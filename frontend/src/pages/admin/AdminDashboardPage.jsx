import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getMetrics();
      setData(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner message="Loading school dashboard metrics..." />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboard} />;

  const { overview, financials, recent_activities, recent_notifications, upcoming_exams } = data || {};

  return (
    <div>
      <PageHeader
        title="Admin Management Dashboard"
        subtitle={`Real-time overview for Academic Session ${overview?.current_academic_year || '2026-27'}`}
        actions={
          <div className="d-flex gap-2">
            <Link to="/admin/students" className="btn btn-primary btn-sm d-flex align-items-center gap-1.5">
              <i className="bi bi-person-plus-fill"></i> Admit Student
            </Link>
            <Link to="/admin/whatsapp" className="btn btn-success btn-sm d-flex align-items-center gap-1.5">
              <i className="bi bi-whatsapp"></i> WhatsApp Notice
            </Link>
          </div>
        }
      />

      {/* 4 Stat Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div>
              <div className="stat-label">Total Active Students</div>
              <div className="stat-value text-primary">{overview?.total_students || 0}</div>
              <div className="small text-muted mt-1">
                <Link to="/admin/students" className="text-decoration-none small">
                  View Roster <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="stat-icon bg-primary-subtle text-primary">
              <i className="bi bi-people-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div>
              <div className="stat-label">Teaching Faculty</div>
              <div className="stat-value text-teal" style={{ color: '#0f766e' }}>
                {overview?.total_teachers || 0}
              </div>
              <div className="small text-muted mt-1">
                <Link to="/admin/staff" className="text-decoration-none small">
                  Staff Directory <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-person-badge-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div>
              <div className="stat-label">Total Classes & Sections</div>
              <div className="stat-value text-indigo" style={{ color: '#4f46e5' }}>
                {overview?.total_classes || 0}
              </div>
              <div className="small text-muted mt-1">
                <Link to="/admin/classes" className="text-decoration-none small">
                  All Divisions <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="stat-icon bg-info-subtle text-info">
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div>
              <div className="stat-label">Current Academic Year</div>
              <div className="stat-value fs-4 text-dark">{overview?.current_academic_year}</div>
              <div className="small text-muted mt-1">
                <span className="badge bg-success-subtle text-success">Session Active</span>
              </div>
            </div>
            <div className="stat-icon bg-warning-subtle text-warning">
              <i className="bi bi-calendar2-check-fill"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Summary Banner */}
      <div className="card-custom p-4 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
          <div>
            <h5 className="fw-bold text-dark mb-1">Fee Collection Summary</h5>
            <p className="text-muted small mb-0">Total billed vs collected amounts across all standards</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="text-muted small">Collection Rate</div>
              <div className="fw-bold text-success fs-5">{financials?.collection_percentage}%</div>
            </div>
            <Link to="/admin/fees" className="btn btn-outline-primary btn-sm">
              <i className="bi bi-cash-stack me-1"></i> Manage Fees
            </Link>
          </div>
        </div>

        <div className="progress mb-4" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${financials?.collection_percentage || 0}%` }}
            aria-valuenow={financials?.collection_percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div className="row g-3 text-center">
          <div className="col-6 col-md-3">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted small">Total Assigned</div>
              <div className="fw-bold text-dark fs-5">₹{(financials?.total_assigned || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-success-subtle rounded-3">
              <div className="text-success small fw-semibold">Total Collected</div>
              <div className="fw-bold text-success fs-5">₹{(financials?.total_collected || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-warning-subtle rounded-3">
              <div className="text-warning small fw-semibold">Pending Balance</div>
              <div className="fw-bold text-warning fs-5">₹{(financials?.pending_amount || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-danger-subtle rounded-3">
              <div className="text-danger small fw-semibold">Overdue Balance</div>
              <div className="fw-bold text-danger fs-5">₹{(financials?.overdue_amount || 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Activities & Notifications */}
      <div className="row g-4 mb-4">
        {/* Recent Audit Activities */}
        <div className="col-lg-7">
          <div className="card-custom h-100">
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <h6 className="fw-bold text-dark mb-0">
                <i className="bi bi-clock-history text-primary me-2"></i>
                Recent Administrative Activities
              </h6>
              <Link to="/admin/audit-logs" className="small text-decoration-none">
                View All Logs <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="p-0">
              {(!recent_activities || recent_activities.length === 0) ? (
                <div className="p-4 text-center text-muted small">No recent activity recorded.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-custom table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>User</th>
                        <th>Entity</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent_activities.map((act) => (
                        <tr key={act.id}>
                          <td>
                            <span className="badge bg-light text-dark border font-monospace">
                              {act.action}
                            </span>
                          </td>
                          <td className="small fw-semibold">{act.user?.username || 'System'}</td>
                          <td className="small text-muted">{act.entity_type}</td>
                          <td className="small text-muted">{new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Notification Log Preview */}
        <div className="col-lg-5">
          <div className="card-custom h-100">
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <h6 className="fw-bold text-dark mb-0">
                <i className="bi bi-whatsapp text-success me-2"></i>
                Recent WhatsApp Dispatches
              </h6>
              <Link to="/admin/notification-history" className="small text-decoration-none">
                Full Log <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="p-3">
              {(!recent_notifications || recent_notifications.length === 0) ? (
                <div className="text-center text-muted small py-4">No notifications dispatched recently.</div>
              ) : (
                <div className="d-flex flex-column gap-2.5">
                  {recent_notifications.map((n) => (
                    <div key={n.id} className="p-2.5 bg-light rounded-3 border d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success text-white p-1.5 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                          <i className="bi bi-whatsapp"></i>
                        </div>
                        <div>
                          <div className="fw-semibold text-dark small leading-tight">{n.title}</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                            To: {n.student?.first_name} {n.student?.last_name} ({n.parent?.first_name || 'Parent'})
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={n.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Upcoming Examinations */}
      <div className="card-custom p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold text-dark mb-0">
            <i className="bi bi-journal-check text-indigo me-2"></i>
            Scheduled Academic Examinations
          </h5>
          <Link to="/admin/exams" className="btn btn-sm btn-outline-primary">
            Manage Exams
          </Link>
        </div>

        {(!upcoming_exams || upcoming_exams.length === 0) ? (
          <p className="text-muted small mb-0">No active examinations configured.</p>
        ) : (
          <div className="row g-3">
            {upcoming_exams.map((ex) => (
              <div key={ex.id} className="col-md-6 col-lg-3">
                <div className="p-3 bg-light rounded-3 border h-100">
                  <span className="badge bg-primary-subtle text-primary mb-2">{ex.exam_type}</span>
                  <h6 className="fw-bold text-dark mb-1">{ex.name}</h6>
                  <div className="small text-muted mb-2">
                    {new Date(ex.start_date).toLocaleDateString()} - {new Date(ex.end_date).toLocaleDateString()}
                  </div>
                  <Link to="/admin/marks" className="btn btn-sm btn-light border w-100">
                    <i className="bi bi-pencil-square me-1"></i> Marks Entry
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
