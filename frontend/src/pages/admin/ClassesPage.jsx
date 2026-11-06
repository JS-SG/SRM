import React, { useState, useEffect } from 'react';
import { academicService } from '../../services/academicService';
import { staffService } from '../../services/staffService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export const ClassesPage = () => {
  const { classes, standards, divisions, academicYears, currentYear, refreshAcademicData } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  // Single class form
  const [formData, setFormData] = useState({
    academic_year_id: currentYear?.id || '',
    standard_id: '',
    division_id: '',
    class_teacher_id: '',
    room_number: '',
  });

  // Batch class form
  const [batchData, setBatchData] = useState({
    academic_year_id: currentYear?.id || '',
    standard_id: '',
    division_ids: [],
  });

  useEffect(() => {
    staffService.getAll({ limit: 100 }).then((res) => setStaffList(res.data || [])).catch(() => {});
  }, []);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await academicService.createClass(formData);
      toastSuccess('Class created successfully!');
      setShowAddModal(false);
      refreshAcademicData();
    } catch (err) {
      toastError(err.message || 'Failed to create class');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await academicService.batchCreateClasses(batchData);
      toastSuccess('Batch classes created successfully!');
      setShowBatchModal(false);
      refreshAcademicData();
    } catch (err) {
      toastError(err.message || 'Failed to batch create classes');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Class Name',
      accessor: 'class_name',
      render: (row) => <strong className="fs-6 text-primary">{row.class_name}</strong>,
    },
    {
      header: 'Standard',
      render: (row) => `Standard ${row.standard?.name}`,
    },
    {
      header: 'Division',
      render: (row) => `Division ${row.division?.name}`,
    },
    {
      header: 'Class Teacher',
      render: (row) =>
        row.class_teacher ? (
          <span className="fw-semibold text-dark">
            👨‍🏫 {row.class_teacher.first_name} {row.class_teacher.last_name}
          </span>
        ) : (
          <span className="text-muted small">Not Assigned</span>
        ),
    },
    {
      header: 'Room',
      render: (row) => row.room_number || 'N/A',
    },
    {
      header: 'Enrolled Students',
      render: (row) => (
        <span className="badge bg-primary-subtle text-primary font-monospace fs-7">
          {row._count?.enrollments || 0} Students
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.is_active ? 'ACTIVE' : 'INACTIVE'} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Classes & Divisions"
        subtitle="Manage Standard + Division combinations (e.g. 10-A, 10-B) and Class Teachers"
        breadcrumbs={[
          { label: 'Academic', path: '/admin/academic' },
          { label: 'Classes', path: '/admin/classes' },
        ]}
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowBatchModal(true)}>
              <i className="bi bi-stack me-1"></i> Batch Generate Classes
            </button>
            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1.5" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-lg"></i> Add Single Class
            </button>
          </div>
        }
      />

      <DataTable columns={columns} data={classes} loading={false} emptyTitle="No Classes Configured" />

      {/* Add Single Class Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Create New Class</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} disabled={loading}></button>
              </div>

              <form onSubmit={handleCreateClass}>
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

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Standard *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.standard_id}
                        onChange={(e) => setFormData({ ...formData, standard_id: e.target.value })}
                        required
                      >
                        <option value="">Select Standard</option>
                        {standards.map((s) => (
                          <option key={s.id} value={s.id}>
                            Standard {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Division *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.division_id}
                        onChange={(e) => setFormData({ ...formData, division_id: e.target.value })}
                        required
                      >
                        <option value="">Select Division</option>
                        {divisions.map((d) => (
                          <option key={d.id} value={d.id}>
                            Division {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Assigned Class Teacher</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.class_teacher_id}
                      onChange={(e) => setFormData({ ...formData, class_teacher_id: e.target.value })}
                    >
                      <option value="">No Class Teacher (Optional)</option>
                      {staffList.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.first_name} {st.last_name} ({st.employee_code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Classroom / Room Number</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Room-401"
                      value={formData.room_number}
                      onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Batch Create Classes Modal */}
      {showBatchModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="bi bi-stack text-primary me-2"></i>
                  Batch Generate Classes
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowBatchModal(false)} disabled={loading}></button>
              </div>

              <form onSubmit={handleBatchCreate}>
                <div className="modal-body p-4">
                  <p className="text-muted small">
                    Quickly generate all divisions for a standard in one click without repetitive entries.
                  </p>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Academic Year *</label>
                    <select
                      className="form-select form-select-sm"
                      value={batchData.academic_year_id}
                      onChange={(e) => setBatchData({ ...batchData, academic_year_id: e.target.value })}
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
                    <label className="form-label small fw-semibold">Standard *</label>
                    <select
                      className="form-select form-select-sm"
                      value={batchData.standard_id}
                      onChange={(e) => setBatchData({ ...batchData, standard_id: e.target.value })}
                      required
                    >
                      <option value="">Select Standard</option>
                      {standards.map((s) => (
                        <option key={s.id} value={s.id}>
                          Standard {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Select Divisions to Create *</label>
                    <div className="d-flex flex-wrap gap-2">
                      {divisions.map((d) => {
                        const isSelected = batchData.division_ids.includes(d.id);
                        return (
                          <button
                            key={d.id}
                            type="button"
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                              setBatchData((prev) => ({
                                ...prev,
                                division_ids: isSelected
                                  ? prev.division_ids.filter((id) => id !== d.id)
                                  : [...prev.division_ids, d.id],
                              }));
                            }}
                          >
                            Division {d.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowBatchModal(false)} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={loading || batchData.division_ids.length === 0}>
                    {loading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Generate Classes ({batchData.division_ids.length})
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

export default ClassesPage;
