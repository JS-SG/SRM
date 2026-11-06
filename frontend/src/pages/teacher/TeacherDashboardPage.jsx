import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

export const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeacherDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getMetrics();
      setData(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load teacher workspace');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherDashboard();
  }, []);

  if (loading) return <LoadingSpinner message="Loading your teaching workspace..." />;
  if (error) return <ErrorState message={error} onRetry={fetchTeacherDashboard} />;

  const { assigned_classes = [], metrics = {}, active_exams = [] } = data || {};

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.staff?.first_name || user?.username}!`}
        subtitle="Faculty Teaching Workspace & Scoped Academic Center"
        actions={
          <div className="d-flex gap-2">
            <Link to="/teacher/marks" className="btn btn-primary btn-sm d-flex align-items-center gap-1.5">
              <i className="bi bi-input-cursor-text"></i> Grade Marks
            </Link>
            <Link to="/teacher/students" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1.5">
              <i className="bi bi-people"></i> My Class Rosters
            </Link>
          </div>
        }
      />

      {/* Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-4">
          <div className="stat-card">
            <div>
              <div className="stat-label">Assigned Classes</div>
              <div className="stat-value text-primary">{metrics?.total_classes || 0}</div>
              <div className="small text-muted mt-1">Teaching Sections</div>
            </div>
            <div className="stat-icon bg-primary-subtle text-primary">
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="stat-card">
            <div>
              <div className="stat-label">Total Enrolled Students</div>
              <div className="stat-value text-teal" style={{ color: '#0f766e' }}>
                {metrics?.total_students || 0}
              </div>
              <div className="small text-muted mt-1">Under Your Instruction</div>
            </div>
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-people-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-lg-4">
          <div className="stat-card">
            <div>
              <div className="stat-label">Pending Mark Entries</div>
              <div className="stat-value text-warning">{metrics?.pending_marks_entry || 0}</div>
              <div className="small text-muted mt-1">For Ongoing Assessments</div>
            </div>
            <div className="stat-icon bg-warning-subtle text-warning">
              <i className="bi bi-hourglass-split"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Classes Grid */}
      <div className="card-custom p-4 mb-4">
        <h5 className="fw-bold text-dark mb-3">
          <i className="bi bi-mortarboard-fill text-primary me-2"></i>
          Your Assigned Classes & Subjects
        </h5>

        {assigned_classes.length === 0 ? (
          <p className="text-muted small mb-0">No classes are assigned to your profile currently.</p>
        ) : (
          <div className="row g-3">
            {assigned_classes.map((item) => (
              <div key={item.id} className="col-md-6 col-xl-4">
                <div className="p-3.5 bg-white border rounded-3 h-100 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-primary fs-6 px-2.5 py-1">
                      Class {item.class?.class_name}
                    </span>
                    <span
                      className={`badge ${
                        item.role === 'CLASS_TEACHER' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'
                      }`}
                    >
                      {item.role === 'CLASS_TEACHER' ? 'Class Teacher' : 'Subject Faculty'}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="text-muted small">Assigned Subject:</div>
                    <strong className="text-dark fs-6">
                      {item.subject ? `${item.subject.name} (${item.subject.code})` : 'Class Head'}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
                    <span>
                      <i className="bi bi-people me-1"></i>
                      {item.class?._count?.enrollments || 0} Students
                    </span>
                    <Link
                      to={`/teacher/marks?class_id=${item.class_id}&subject_id=${item.subject_id || ''}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Open Marks <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ongoing Exams */}
      <div className="card-custom p-4">
        <h5 className="fw-bold text-dark mb-3">
          <i className="bi bi-journal-check text-indigo me-2"></i>
          Active Examination Schedules
        </h5>

        {active_exams.length === 0 ? (
          <p className="text-muted small mb-0">No active examinations at this time.</p>
        ) : (
          <div className="row g-3">
            {active_exams.map((ex) => (
              <div key={ex.id} className="col-md-4">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="badge bg-secondary mb-2">{ex.exam_type}</span>
                  <h6 className="fw-bold text-dark mb-1">{ex.name}</h6>
                  <div className="text-muted small">
                    {new Date(ex.start_date).toLocaleDateString()} - {new Date(ex.end_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
