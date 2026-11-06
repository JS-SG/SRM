import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { feeService } from '../../services/feeService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';
import StudentProfileTabs from '../../components/students/StudentProfileTabs';
import StudentFormModal from '../../components/students/StudentFormModal';
import { StudentEnrollModal, ParentFormModal } from '../../components/students/StudentEnrollModal';
import FeeCollectionModal from '../../components/fees/FeeCollectionModal';

export const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToast();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddParentModal, setShowAddParentModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [collectingFeeRecord, setCollectingFeeRecord] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStudent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await studentService.getById(id);
      setStudent(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load student profile');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleUpdateStudent = async (formData) => {
    setActionLoading(true);
    try {
      await studentService.update(id, formData);
      toastSuccess('Student profile updated successfully!');
      setShowEditModal(false);
      fetchStudent();
    } catch (err) {
      toastError(err.message || 'Failed to update student');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddParent = async (payload) => {
    setActionLoading(true);
    try {
      await studentService.addParent(id, payload);
      toastSuccess('Parent/Guardian added successfully!');
      setShowAddParentModal(false);
      fetchStudent();
    } catch (err) {
      toastError(err.message || 'Failed to add parent');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEnroll = async (payload) => {
    setActionLoading(true);
    try {
      await studentService.enroll(id, payload);
      toastSuccess('Student enrollment / promotion completed successfully!');
      setShowEnrollModal(false);
      fetchStudent();
    } catch (err) {
      toastError(err.message || 'Failed to enroll student');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCollectFee = async (payload) => {
    setActionLoading(true);
    try {
      await feeService.recordPayment(payload);
      toastSuccess('Payment recorded and receipt generated!');
      setCollectingFeeRecord(null);
      fetchStudent();
    } catch (err) {
      toastError(err.message || 'Failed to collect payment');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading comprehensive student profile..." />;
  if (error) return <ErrorState message={error} onRetry={fetchStudent} />;
  if (!student) return null;

  const currentEnrollment = student.enrollments?.find((e) => e.status === 'ACTIVE') || student.enrollments?.[0];
  const primaryParent = student.parents?.find((p) => p.is_primary)?.parent || student.parents?.[0]?.parent;

  return (
    <div>
      <PageHeader
        title={`${student.first_name} ${student.last_name}`}
        subtitle={`Admission ID: ${student.admission_number}`}
        breadcrumbs={[
          { label: 'Students', path: '/admin/students' },
          { label: `${student.first_name} ${student.last_name}`, path: `/admin/students/${id}` },
        ]}
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowEditModal(true)}>
              <i className="bi bi-pencil-square me-1"></i> Edit Profile
            </button>
            <button className="btn btn-outline-success btn-sm" onClick={() => setShowAddParentModal(true)}>
              <i className="bi bi-person-plus me-1"></i> Add Parent
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowEnrollModal(true)}>
              <i className="bi bi-arrow-up-right me-1"></i> Promote / Change Class
            </button>
          </div>
        }
      />

      {/* Top Profile Summary Card */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle bg-primary-subtle text-primary border border-primary-subtle d-flex align-items-center justify-content-center fw-bold fs-3 shadow-sm"
              style={{ width: '72px', height: '72px' }}
            >
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h4 className="fw-bold text-dark mb-0">{student.first_name} {student.last_name}</h4>
                <StatusBadge status={student.status} />
              </div>
              <div className="text-muted small">
                <span className="me-3">
                  <i className="bi bi-upc-scan me-1"></i> Adm: <strong>{student.admission_number}</strong>
                </span>
                <span className="me-3">
                  <i className="bi bi-gender-ambiguous me-1"></i> {student.gender}
                </span>
                <span>
                  <i className="bi bi-droplet-half text-danger me-1"></i> Blood: <strong>{student.blood_group || 'N/A'}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4 border-start-md ps-md-4">
            <div>
              <div className="text-muted small">Current Class</div>
              <div className="fs-5 fw-bold text-primary">
                {currentEnrollment?.class?.class_name || 'Unassigned'}
              </div>
              <div className="small text-muted">Roll No: {currentEnrollment?.roll_number || 'N/A'}</div>
            </div>
            <div className="vr"></div>
            <div>
              <div className="text-muted small">Primary Guardian</div>
              <div className="fw-bold text-dark">{primaryParent ? `${primaryParent.first_name} ${primaryParent.last_name}` : 'None'}</div>
              <div className="small text-muted">
                <i className="bi bi-whatsapp text-success me-1"></i>
                {primaryParent?.whatsapp_number || primaryParent?.phone || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Tab Interface */}
      <StudentProfileTabs
        student={student}
        onAddParent={() => setShowAddParentModal(true)}
        onEnroll={() => setShowEnrollModal(true)}
        onCollectFee={() => {
          const firstPendingFee = currentEnrollment?.fees?.find((f) => f.status !== 'PAID');
          if (firstPendingFee) {
            setCollectingFeeRecord({ ...firstPendingFee, student: { name: `${student.first_name} ${student.last_name}` } });
          } else {
            toastError('No pending fees found for this student in current enrollment.');
          }
        }}
      />

      {/* Modals */}
      <StudentFormModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateStudent}
        loading={actionLoading}
        initialData={student}
      />

      <ParentFormModal
        show={showAddParentModal}
        onClose={() => setShowAddParentModal(false)}
        onSave={handleAddParent}
        loading={actionLoading}
      />

      <StudentEnrollModal
        show={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        onEnroll={handleEnroll}
        loading={actionLoading}
        studentName={`${student.first_name} ${student.last_name}`}
      />

      <FeeCollectionModal
        show={!!collectingFeeRecord}
        onClose={() => setCollectingFeeRecord(null)}
        onCollect={handleCollectFee}
        feeRecord={collectingFeeRecord}
        loading={actionLoading}
      />
    </div>
  );
};

export default StudentDetailPage;
