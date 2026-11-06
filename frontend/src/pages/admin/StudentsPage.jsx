import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';
import StudentFormModal from '../../components/students/StudentFormModal';
import { ConfirmModal } from '../../components/common/DataTable';

export const StudentsPage = () => {
  const navigate = useNavigate();
  const { classes, standards, divisions } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [standardFilter, setStandardFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedStudentForStatus, setSelectedStudentForStatus] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await studentService.getAll({
        page,
        limit: 15,
        search,
        classId: classFilter,
        standardId: standardFilter,
        status: statusFilter,
      });
      setStudents(res.data || []);
      setPagination(res.meta || null);
    } catch (err) {
      toastError(err.message || 'Failed to fetch student directory');
    } finally {
      setLoading(false);
    }
  }, [page, search, classFilter, standardFilter, statusFilter, toastError]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleCreateStudent = async (formData) => {
    setActionLoading(true);
    try {
      await studentService.create(formData);
      toastSuccess('Student enrolled and admitted successfully!');
      setShowAddModal(false);
      fetchStudents();
    } catch (err) {
      toastError(err.message || 'Failed to admit student');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!selectedStudentForStatus) return;
    setActionLoading(true);
    try {
      const nextStatus = selectedStudentForStatus.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await studentService.toggleStatus(selectedStudentForStatus.id, nextStatus);
      toastSuccess(`Student status updated to ${nextStatus}`);
      setSelectedStudentForStatus(null);
      fetchStudents();
    } catch (err) {
      toastError(err.message || 'Failed to update student status');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Admission No',
      accessor: 'admission_number',
      render: (row) => (
        <span className="fw-bold text-primary font-monospace">{row.admission_number}</span>
      ),
    },
    {
      header: 'Student Name',
      render: (row) => {
        const currentEnrollment = row.enrollments?.find((e) => e.status === 'ACTIVE') || row.enrollments?.[0];
        return (
          <div>
            <div className="fw-bold text-dark">{`${row.first_name} ${row.last_name}`}</div>
            <div className="text-muted small">
              {row.gender} • DOB: {row.date_of_birth ? new Date(row.date_of_birth).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Current Class',
      render: (row) => {
        const currentEnrollment = row.enrollments?.find((e) => e.status === 'ACTIVE') || row.enrollments?.[0];
        return currentEnrollment ? (
          <div>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
              {currentEnrollment.class?.class_name}
            </span>
            <div className="small text-muted">Roll: {currentEnrollment.roll_number || 'N/A'}</div>
          </div>
        ) : (
          <span className="badge bg-light text-muted border">Unassigned</span>
        );
      },
    },
    {
      header: 'Primary Parent & Contact',
      render: (row) => {
        const parentRel = row.parents?.find((p) => p.is_primary) || row.parents?.[0];
        const p = parentRel?.parent;
        return p ? (
          <div>
            <div className="small fw-semibold text-dark">{p.first_name} {p.last_name} ({p.relationship})</div>
            <div className="small text-muted">
              <i className="bi bi-whatsapp text-success me-1"></i>
              {p.whatsapp_number || p.phone}
            </div>
          </div>
        ) : (
          <span className="text-muted small">No parent listed</span>
        );
      },
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="d-flex align-items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate(`/admin/students/${row.id}`)}
            title="View Full Profile"
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className={`btn btn-sm ${row.status === 'ACTIVE' ? 'btn-outline-danger' : 'btn-outline-success'}`}
            onClick={() => setSelectedStudentForStatus(row)}
            title={row.status === 'ACTIVE' ? 'Deactivate Student' : 'Activate Student'}
          >
            <i className={`bi ${row.status === 'ACTIVE' ? 'bi-person-x' : 'bi-person-check'}`}></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Student Management"
        subtitle="Manage permanent student profiles, parent details, and class enrollments"
        breadcrumbs={[{ label: 'Students', path: '/admin/students' }]}
        actions={
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-1.5 shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-person-plus-fill"></i> Admit New Student
          </button>
        }
      />

      {/* Search & Filter Toolbar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-4">
            <SearchBar
              placeholder="Search by name, adm no, parent, phone..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.class_name} ({c.standard?.name}-{c.division?.name})
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={standardFilter}
              onChange={(e) => {
                setStandardFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Standards</option>
              {standards.map((s) => (
                <option key={s.id} value={s.id}>
                  Standard {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="ALUMNI">ALUMNI</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onRowClick={(row) => navigate(`/admin/students/${row.id}`)}
        emptyTitle="No Students Found"
        emptyDescription="Try adjusting your search criteria or admit a new student."
      />

      {/* Add Student Modal */}
      <StudentFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleCreateStudent}
        loading={actionLoading}
      />

      {/* Deactivate/Activate Confirm Modal */}
      <ConfirmModal
        show={!!selectedStudentForStatus}
        title={selectedStudentForStatus?.status === 'ACTIVE' ? 'Deactivate Student Account' : 'Reactivate Student Account'}
        message={`Are you sure you want to ${
          selectedStudentForStatus?.status === 'ACTIVE' ? 'deactivate' : 'reactivate'
        } student "${selectedStudentForStatus?.first_name} ${selectedStudentForStatus?.last_name}" (Adm: ${
          selectedStudentForStatus?.admission_number
        })?`}
        confirmText={selectedStudentForStatus?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
        confirmVariant={selectedStudentForStatus?.status === 'ACTIVE' ? 'danger' : 'success'}
        loading={actionLoading}
        onConfirm={handleToggleStatus}
        onClose={() => setSelectedStudentForStatus(null)}
      />
    </div>
  );
};

export default StudentsPage;
