import React, { useState, useEffect } from 'react';
import { academicService } from '../../services/academicService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export const ExamsPage = () => {
  const { currentYear, academicYears } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [exams, setExams] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState(currentYear?.id || '');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState({
    academic_year_id: currentYear?.id || '',
    name: 'Mid Term Examination',
    exam_type: 'INTERNAL',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  useEffect(() => {
    if (currentYear && !selectedYearId) {
      setSelectedYearId(currentYear.id);
    }
  }, [currentYear, selectedYearId]);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await academicService.getExams(selectedYearId);
      setExams(res.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to load examinations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [selectedYearId]);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await academicService.createExam(formData);
      toastSuccess('Examination created successfully!');
      setShowAddModal(false);
      fetchExams();
    } catch (err) {
      toastError(err.message || 'Failed to create exam');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Exam Name',
      accessor: 'name',
      render: (row) => <strong className="fs-6 text-dark">{row.name}</strong>,
    },
    {
      header: 'Type',
      accessor: 'exam_type',
      render: (row) => <span className="badge bg-primary-subtle text-primary">{row.exam_type}</span>,
    },
    {
      header: 'Academic Session',
      render: (row) => row.academic_year?.name,
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
      header: 'Marks Entered',
      render: (row) => (
        <span className="badge bg-light text-dark border font-monospace">
          {row._count?.marks || 0} entries
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Examinations & Terms"
        subtitle="Configure school examination schedules, unit tests, and terminal assessments"
        breadcrumbs={[
          { label: 'Academic', path: '/admin/academic' },
          { label: 'Exams', path: '/admin/exams' },
        ]}
        actions={
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1.5" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-journal-plus"></i> Schedule New Exam
          </button>
        }
      />

      <div className="card-custom p-3 mb-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-muted mb-1">Filter by Academic Year</label>
            <select
              className="form-select form-select-sm"
              value={selectedYearId}
              onChange={(e) => setSelectedYearId(e.target.value)}
            >
              <option value="">All Academic Years</option>
              {academicYears.map((ay) => (
                <option key={ay.id} value={ay.id}>
                  {ay.name} {ay.is_current ? '(Current)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={exams} loading={loading} emptyTitle="No Examinations Found" />

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Schedule Examination</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} disabled={actionLoading}></button>
              </div>

              <form onSubmit={handleCreateExam}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Academic Year *</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.academic_year_id}
                      onChange={(e) => setFormData({ ...formData, academic_year_id: e.target.value })}
                      required
                    >
                      <option value="">Select Academic Year</option>
                      {academicYears.map((ay) => (
                        <option key={ay.id} value={ay.id}>
                          {ay.name} {ay.is_current ? '(Current)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Examination Name *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Unit Test 2 or Half Yearly Exam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Assessment Type *</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.exam_type}
                      onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                      required
                    >
                      <option value="INTERNAL">INTERNAL / UNIT TEST</option>
                      <option value="QUARTERLY">QUARTERLY</option>
                      <option value="HALF_YEARLY">HALF YEARLY</option>
                      <option value="ANNUAL">ANNUAL</option>
                    </select>
                  </div>

                  <div className="row g-3">
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
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Create Examination
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

export default ExamsPage;
