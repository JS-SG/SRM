import React, { useState, useEffect } from 'react';
import { academicService } from '../../services/academicService';
import { useToast } from '../../contexts/ToastContext';
import { useAcademic } from '../../contexts/AcademicContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export const AcademicPage = () => {
  const { academicYears, refreshAcademicData } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '2027-28',
    start_date: '2027-06-01',
    end_date: '2028-04-30',
    is_current: false,
  });

  const handleCreateYear = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await academicService.createYear(formData);
      toastSuccess('Academic Year created successfully!');
      setShowAddModal(false);
      refreshAcademicData();
    } catch (err) {
      toastError(err.message || 'Failed to create academic year');
    } finally {
      setLoading(false);
    }
  };

  const handleSetCurrent = async (yearId) => {
    try {
      await academicService.setCurrentYear(yearId);
      toastSuccess('Active Academic Session updated!');
      refreshAcademicData();
    } catch (err) {
      toastError(err.message || 'Failed to update active academic session');
    }
  };

  const columns = [
    {
      header: 'Academic Session',
      accessor: 'name',
      render: (row) => <strong className="fs-6 text-primary">{row.name}</strong>,
    },
    {
      header: 'Start Date',
      render: (row) => new Date(row.start_date).toLocaleDateString(),
    },
    {
      header: 'End Date',
      render: (row) => new Date(row.end_date).toLocaleDateString(),
    },
    {
      header: 'Total Classes',
      render: (row) => row._count?.classes || 0,
    },
    {
      header: 'Enrolled Students',
      render: (row) => row._count?.student_enrollments || 0,
    },
    {
      header: 'Status',
      render: (row) =>
        row.is_current ? (
          <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill">
            <i className="bi bi-check-circle-fill me-1"></i> Current Session
          </span>
        ) : (
          <span className="badge bg-light text-muted border">Inactive</span>
        ),
    },
    {
      header: 'Actions',
      render: (row) =>
        !row.is_current && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleSetCurrent(row.id)}
          >
            Set as Current Session
          </button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Academic Session Management"
        subtitle="Configure school academic years, active sessions, and terms"
        breadcrumbs={[{ label: 'Academic Years', path: '/admin/academic' }]}
        actions={
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1.5" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-calendar-plus"></i> Add Academic Session
          </button>
        }
      />

      <DataTable columns={columns} data={academicYears} loading={false} emptyTitle="No Academic Sessions Found" />

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="bi bi-calendar-plus text-primary me-2"></i>
                  Create Academic Year
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} disabled={loading}></button>
              </div>

              <form onSubmit={handleCreateYear}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Academic Session Name *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. 2027-28"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Start Date *</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">End Date *</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isCurrentCheck"
                      checked={formData.is_current}
                      onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="isCurrentCheck">
                      Set as the Current Active Academic Session
                    </label>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Create Year
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicPage;
