import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffService } from '../../services/staffService';
import { academicService } from '../../services/academicService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';
import { ConfirmModal } from '../../components/common/DataTable';

export const StaffPage = () => {
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToast();

  const [staffList, setStaffList] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deactivatingStaff, setDeactivatingStaff] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: 'Teacher@123',
    employee_code: '',
    first_name: '',
    last_name: '',
    gender: 'Female',
    date_of_birth: '1990-01-01',
    phone: '',
    designation: 'Teacher',
    department: 'Science',
    degree: '',
    qualification: '',
    subject_ids: [],
  });

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const res = await staffService.getAll({
        page,
        limit: 15,
        search,
        department: departmentFilter,
      });
      setStaffList(res.data || []);
      setPagination(res.meta || null);
    } catch (err) {
      toastError(err.message || 'Failed to load staff directory');
    } finally {
      setLoading(false);
    }
  }, [page, search, departmentFilter, toastError]);

  useEffect(() => {
    fetchStaff();
    academicService.getSubjects().then((res) => setAllSubjects(res.data || [])).catch(() => {});
  }, [fetchStaff]);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await staffService.create(formData);
      toastSuccess('Staff member and user account registered successfully!');
      setShowAddModal(false);
      fetchStaff();
    } catch (err) {
      toastError(err.message || 'Failed to create staff member');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!deactivatingStaff) return;
    setActionLoading(true);
    try {
      await staffService.delete(deactivatingStaff.id);
      toastSuccess('Staff member account deactivated');
      setDeactivatingStaff(null);
      fetchStaff();
    } catch (err) {
      toastError(err.message || 'Failed to deactivate staff member');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Emp Code',
      accessor: 'employee_code',
      render: (row) => <span className="fw-bold font-monospace text-primary">{row.employee_code}</span>,
    },
    {
      header: 'Staff Name',
      render: (row) => (
        <div>
          <div className="fw-bold text-dark">{row.first_name} {row.last_name}</div>
          <div className="text-muted small">{row.designation} • {row.department}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      render: (row) => (
        <div>
          <div className="small fw-semibold">{row.phone}</div>
          <div className="small text-muted">{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Teaching Subjects',
      render: (row) => (
        <div className="d-flex flex-wrap gap-1">
          {(!row.teaching_subjects || row.teaching_subjects.length === 0) ? (
            <span className="text-muted small">None mapped</span>
          ) : (
            row.teaching_subjects.map((ts) => (
              <span key={ts.id} className="badge bg-light text-dark border">
                {ts.subject?.name}
              </span>
            ))
          )}
        </div>
      ),
    },
    {
      header: 'Assigned Classes',
      render: (row) => (
        <div className="d-flex flex-wrap gap-1">
          {(!row.class_assignments || row.class_assignments.length === 0) ? (
            <span className="text-muted small">None</span>
          ) : (
            row.class_assignments.map((ca) => (
              <span
                key={ca.id}
                className={`badge ${ca.role === 'CLASS_TEACHER' ? 'bg-primary' : 'bg-primary-subtle text-primary border'}`}
              >
                {ca.class?.class_name} {ca.role === 'CLASS_TEACHER' ? '(CT)' : ''}
              </span>
            ))
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.is_active ? 'ACTIVE' : 'INACTIVE'} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="d-flex align-items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate(`/admin/staff/${row.id}`)}
            title="View Details & Permissions"
          >
            <i className="bi bi-person-gear"></i>
          </button>
          {row.is_active && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setDeactivatingStaff(row)}
              title="Deactivate Staff"
            >
              <i className="bi bi-person-x"></i>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Staff & Faculty Management"
        subtitle="Manage teachers, subject qualifications, and class assignments"
        breadcrumbs={[{ label: 'Staff', path: '/admin/staff' }]}
        actions={
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-1.5 shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-person-plus-fill"></i> Add Staff Member
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar
              placeholder="Search by name, emp code, email, phone..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select form-select-sm"
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Departments</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Languages">Languages</option>
              <option value="Humanities">Humanities</option>
              <option value="Commerce">Commerce</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={staffList}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onRowClick={(row) => navigate(`/admin/staff/${row.id}`)}
        emptyTitle="No Staff Members Found"
      />

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', overflowY: 'auto', padding: '1rem'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg "style={{
            minHeight: 'calc(100vh - 2rem)',
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto'
          }}>
            <div className="modal-content border-0 shadow-lg rounded-3"style={{
              maxHeight: 'calc(100vh - 2rem)'
            }}>
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="bi bi-person-plus-fill text-primary me-2"></i>
                  Register New Staff Member
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} disabled={actionLoading}></button>
              </div>

              <form onSubmit={handleCreateStaff}>
                <div className="modal-body p-4" style={{
                  overflowY: 'auto',
                  minHeight: 0
                }}>
                  <h6 className="fw-bold text-primary mb-3 pb-1 border-bottom">1. Login & Identity Credentials</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Employee Code *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. EMP-106"
                        value={formData.employee_code}
                        onChange={(e) => setFormData({ ...formData, employee_code: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Portal Username *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. kavya.teacher"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Portal Password *</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <h6 className="fw-bold text-primary mb-3 pb-1 border-bottom">2. Profile & Teaching Profile</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">First Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Last Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Gender *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Email *</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Qualification *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        required
                      >
                        <option value="B.Ed">B.Ed</option>
                        <option value="M.Ed">M.Ed</option>
                        <option value="M.Phil">M.Phil</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Degree *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        required
                      >
                        <option value="BA">BA</option>
                        <option value="MA">MA</option>
                        <option value="Bsc">Bsc</option>
                        <option value="Msc">Msc</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BE">BE</option>
                        <option value="ME">ME</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Designation *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        required
                      >
                        <option value="Teacher">Teacher</option>
                        <option value="Senior Teacher">Senior Teacher</option>
                        <option value="Clerk">Clerk</option>
                        <option value="Principal">Principal</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Department *</label>
                      <select
                        className="form-select form-select-sm"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                      >
                       <option value="Mathematics">Mathematics</option>
                       <option value="Science">Science</option>
                       <option value="Languages">Languages</option>
                       <option value="Commerce">commerce</option>
                       <option value="Humanities">Humanities</option>
                       <option value="Computer Science">Computer Science</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Teaching Subject Qualifications</label>
                      <div className="d-flex flex-wrap gap-2 p-2 border rounded-2 bg-light">
                        {allSubjects.map((sub) => {
                          const isSelected = formData.subject_ids.includes(sub.id);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline-secondary'}`}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  subject_ids: isSelected
                                    ? prev.subject_ids.filter((id) => id !== sub.id)
                                    : [...prev.subject_ids, sub.id],
                                }));
                              }}
                            >
                              {sub.name} ({sub.code})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                    Complete Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirm */}
      <ConfirmModal
        show={!!deactivatingStaff}
        title="Deactivate Staff Account"
        message={`Are you sure you want to deactivate ${deactivatingStaff?.first_name} ${deactivatingStaff?.last_name}? They will lose portal login access.`}
        confirmText="Deactivate"
        confirmVariant="danger"
        loading={actionLoading}
        onConfirm={handleDeactivate}
        onClose={() => setDeactivatingStaff(null)}
      />
    </div>
  );
};

export default StaffPage;
