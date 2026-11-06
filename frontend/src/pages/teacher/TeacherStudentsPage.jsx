import React, { useState, useEffect, useCallback } from 'react';
import { studentService } from '../../services/studentService';
import { dashboardService } from '../../services/dashboardService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';

export const TeacherStudentsPage = () => {
  const { toastError } = useToast();

  const [assignedClasses, setAssignedClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  // Load teacher assigned classes
  useEffect(() => {
    dashboardService.getMetrics().then((res) => {
      const assigns = res.data?.assigned_classes || [];
      setAssignedClasses(assigns);
      if (assigns.length > 0 && !selectedClassId) {
        setSelectedClassId(assigns[0].class_id);
      }
    }).catch(() => {});
  }, [selectedClassId]);

  const fetchStudents = useCallback(async () => {
    if (!selectedClassId) return;
    setLoading(true);
    try {
      const res = await studentService.getAll({
        classId: selectedClassId,
        search,
        page,
        limit: 20,
      });
      setStudents(res.data || []);
      setPagination(res.meta || null);
    } catch (err) {
      toastError(err.message || 'Failed to load assigned class roster');
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, search, page, toastError]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const columns = [
    {
      header: 'Roll No',
      render: (row) => {
        const enr = row.enrollments?.find((e) => e.class_id === parseInt(selectedClassId));
        return <span className="fw-bold text-dark font-monospace">{enr?.roll_number || '-'}</span>;
      },
    },
    {
      header: 'Admission No',
      accessor: 'admission_number',
      render: (row) => <span className="font-monospace text-primary">{row.admission_number}</span>,
    },
    {
      header: 'Student Name',
      render: (row) => (
        <div>
          <div className="fw-bold text-dark">{row.first_name} {row.last_name}</div>
          <div className="text-muted small">{row.gender} • Blood: {row.blood_group || 'N/A'}</div>
        </div>
      ),
    },
    {
      header: 'Parent Contact',
      render: (row) => {
        const p = row.parents?.[0]?.parent;
        return p ? (
          <div>
            <div className="small fw-semibold">{p.first_name} {p.last_name}</div>
            <div className="small text-muted">
              <i className="bi bi-whatsapp text-success me-1"></i>
              {p.whatsapp_number || p.phone}
            </div>
          </div>
        ) : (
          <span className="text-muted small">N/A</span>
        );
      },
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Assigned Students Roster"
        subtitle="View students enrolled in classes assigned to your instruction"
        breadcrumbs={[
          { label: 'Teacher Space', path: '/teacher/dashboard' },
          { label: 'Students', path: '/teacher/students' },
        ]}
      />

      {/* Class Selector Bar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <label className="form-label small fw-semibold text-muted mb-1">Select Teaching Section</label>
            <select
              className="form-select form-select-sm"
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setPage(1);
              }}
            >
              {assignedClasses.map((ac) => (
                <option key={ac.id} value={ac.class_id}>
                  Class {ac.class?.class_name} ({ac.subject ? ac.subject.name : 'Class Incharge'})
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-7 mt-md-4">
            <SearchBar
              placeholder="Search student by name or admission no..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        emptyTitle="No Students in this Section"
      />
    </div>
  );
};

export default TeacherStudentsPage;
