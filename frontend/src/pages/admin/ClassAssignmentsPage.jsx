import React, { useState, useEffect, useCallback } from 'react';
import { academicService } from '../../services/academicService';
import { staffService } from '../../services/staffService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';

export const ClassAssignmentsPage = () => {
  const { classes } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [assignments, setAssignments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState({
    staff_id: '',
    subject_id: '',
    role: 'SUBJECT_TEACHER',
  });

  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  const fetchAssignments = useCallback(async () => {
    if (!selectedClassId) return;
    setLoading(true);
    try {
      const res = await academicService.getClassAssignments(selectedClassId);
      setAssignments(res.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to fetch class assignments');
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, toastError]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  useEffect(() => {
    staffService.getAll({ limit: 100 }).then((res) => setStaffList(res.data || [])).catch(() => {});
    academicService.getSubjects().then((res) => setSubjects(res.data || [])).catch(() => {});
  }, []);

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await academicService.assignTeacher({
        class_id: parseInt(selectedClassId),
        staff_id: parseInt(formData.staff_id),
        subject_id: formData.subject_id ? parseInt(formData.subject_id) : null,
        role: formData.role,
      });
      toastSuccess('Faculty assigned to class successfully!');
      setShowAssignModal(false);
      fetchAssignments();
    } catch (err) {
      toastError(err.message || 'Failed to assign faculty');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveAssignment = async (assignmentId) => {
    try {
      await academicService.removeAssignment(assignmentId);
      toastSuccess('Assignment removed');
      fetchAssignments();
    } catch (err) {
      toastError(err.message || 'Failed to remove assignment');
    }
  };

  const selectedClass = classes.find((c) => c.id === parseInt(selectedClassId));

  const columns = [
    {
      header: 'Assigned Role',
      accessor: 'role',
      render: (row) => (
        <span className={`badge ${row.role === 'CLASS_TEACHER' ? 'bg-primary' : 'bg-secondary'}`}>
          {row.role === 'CLASS_TEACHER' ? 'CLASS TEACHER' : 'SUBJECT TEACHER'}
        </span>
      ),
    },
    {
      header: 'Subject',
      render: (row) =>
        row.subject ? (
          <div>
            <strong className="text-dark">{row.subject.name}</strong>
            <span className="badge bg-light text-muted border ms-2">{row.subject.code}</span>
          </div>
        ) : (
          <span className="text-muted small">General Class Incharge</span>
        ),
    },
    {
      header: 'Teacher Name',
      render: (row) => (
        <div>
          <div className="fw-bold text-dark">{row.staff?.first_name} {row.staff?.last_name}</div>
          <div className="text-muted small">Emp Code: {row.staff?.employee_code} • {row.staff?.phone}</div>
        </div>
      ),
    },
    {
      header: 'Assigned Date',
      render: (row) => new Date(row.assigned_from).toLocaleDateString(),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleRemoveAssignment(row.id)}
          title="Remove Assignment"
        >
          <i className="bi bi-trash"></i>
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Class Faculty Assignments"
        subtitle="Map teachers to subjects within each specific class for scope-based authorization"
        breadcrumbs={[
          { label: 'Academic', path: '/admin/academic' },
          { label: 'Assignments', path: '/admin/class-assignments' },
        ]}
        actions={
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1.5" onClick={() => setShowAssignModal(true)}>
            <i className="bi bi-person-plus-fill"></i> Assign Teacher to Class
          </button>
        }
      />

      {/* Class Selector Bar */}
      <div className="card-custom p-3 mb-4">
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-4">
            <label className="form-label small fw-semibold text-muted mb-1">Select Class to Manage</label>
            <select
              className="form-select"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  Class {c.class_name} ({c.standard?.name} - {c.division?.name})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-8 text-md-end mt-3 mt-md-0">
            {selectedClass && (
              <div className="small text-muted">
                Academic Session: <strong className="text-dark">{selectedClass.academic_year?.name}</strong> •{' '}
                Classroom: <strong className="text-dark">{selectedClass.room_number || 'N/A'}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={assignments}
        loading={loading}
        emptyTitle="No Teachers Assigned"
        emptyDescription={`No faculty members are currently assigned to Class ${selectedClass?.class_name || ''}.`}
      />

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">
                  Assign Teacher to Class {selectedClass?.class_name}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)} disabled={actionLoading}></button>
              </div>

              <form onSubmit={handleAssignTeacher}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Faculty Member *</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.staff_id}
                      onChange={(e) => setFormData({ ...formData, staff_id: e.target.value })}
                      required
                    >
                      <option value="">Select Teacher</option>
                      {staffList.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.first_name} {st.last_name} ({st.employee_code}) - {st.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Role *</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    >
                      <option value="SUBJECT_TEACHER">Subject Teacher</option>
                      <option value="CLASS_TEACHER">Class Teacher (Class Incharge)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Subject</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.subject_id}
                      onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                    >
                      <option value="">None / General (Class Teacher)</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} ({sub.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAssignModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Confirm Assignment
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

export default ClassAssignmentsPage;
