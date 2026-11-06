import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { staffService } from '../../services/staffService';
import { permissionService } from '../../services/permissionService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';
import PermissionMatrix from '../../components/permissions/PermissionMatrix';

export const StaffDetailPage = () => {
  const { id } = useParams();
  const { toastSuccess, toastError } = useToast();

  const [staff, setStaff] = useState(null);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingPerms, setSavingPerms] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [staffRes, permRes] = await Promise.all([
        staffService.getById(id),
        permissionService.getAllPermissions(),
      ]);
      setStaff(staffRes.data);
      setGroupedPermissions(permRes.data?.grouped || {});
    } catch (err) {
      setError(err.message || 'Failed to load staff details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSavePermissions = async (permissionIds) => {
    if (!staff?.user?.id) return;
    setSavingPerms(true);
    try {
      await permissionService.updateUserPermissions(staff.user.id, permissionIds);
      toastSuccess('Granular permissions updated successfully for ' + staff.first_name);
      fetchData();
    } catch (err) {
      toastError(err.message || 'Failed to update permissions');
    } finally {
      setSavingPerms(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading staff profile and permissions..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;
  if (!staff) return null;

  const userPerms = staff.user?.user_permissions?.map((up) => up.permission) || [];

  return (
    <div>
      <PageHeader
        title={`${staff.first_name} ${staff.last_name}`}
        subtitle={`Employee Code: ${staff.employee_code} • ${staff.designation}`}
        breadcrumbs={[
          { label: 'Staff Directory', path: '/admin/staff' },
          { label: `${staff.first_name} ${staff.last_name}`, path: `/admin/staff/${id}` },
        ]}
      />

      {/* Staff Overview Banner */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="row g-4 align-items-center">
          <div className="col-md-7">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-teal-subtle text-teal border d-flex align-items-center justify-content-center fw-bold fs-3 shadow-sm"
                style={{ width: '68px', height: '68px', backgroundColor: '#ccfbf1', color: '#0f766e' }}
              >
                {staff.first_name.charAt(0)}{staff.last_name.charAt(0)}
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h4 className="fw-bold text-dark mb-0">{staff.first_name} {staff.last_name}</h4>
                  <StatusBadge status={staff.is_active ? 'ACTIVE' : 'INACTIVE'} />
                </div>
                <div className="text-muted small">
                  <span className="me-3"><i className="bi bi-briefcase me-1"></i> {staff.department}</span>
                  <span className="me-3"><i className="bi bi-telephone me-1"></i> {staff.phone}</span>
                  <span><i className="bi bi-envelope me-1"></i> {staff.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="d-flex flex-column gap-1 small">
              <div>
                <span className="text-muted">Username:</span>{' '}
                <strong className="text-primary font-monospace">{staff.user?.username}</strong>
              </div>
              <div>
                <span className="text-muted">Degree:</span>{' '}
                <strong className="text-primary font-monospace">{staff.degree}</strong>
              </div>
              <div>
                <span className="text-muted">Qualification:</span>{' '}
                <strong className="text-primary font-monospace">{staff.qualification}</strong>
              </div>
              <div>
                <span className="text-muted">System Role:</span>{' '}
                <span className="badge bg-secondary">{staff.user?.role?.name}</span>
              </div>
              <div>
                <span className="text-muted">Date of Joining:</span>{' '}
                <strong>{new Date(staff.joining_date).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Qualifications & Class Assignments */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card-custom p-4 h-100">
            <h6 className="fw-bold text-dark mb-3">
              <i className="bi bi-journal-bookmark-fill text-primary me-2"></i>
              Teaching Qualifications
            </h6>
            {(!staff.teaching_subjects || staff.teaching_subjects.length === 0) ? (
              <p className="text-muted small mb-0">No subject specializations mapped.</p>
            ) : (
              <div className="d-flex flex-wrap gap-2">
                {staff.teaching_subjects.map((ts) => (
                  <div key={ts.id} className="p-2 px-3 bg-light border rounded-3 small fw-semibold text-dark">
                    <i className="bi bi-check-circle-fill text-success me-1.5"></i>
                    {ts.subject?.name} ({ts.subject?.code})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-custom p-4 h-100">
            <h6 className="fw-bold text-dark mb-3">
              <i className="bi bi-grid-3x3-gap-fill text-indigo me-2"></i>
              Assigned Classes & Subjects
            </h6>
            {(!staff.class_assignments || staff.class_assignments.length === 0) ? (
              <p className="text-muted small mb-0">Not currently assigned to any classes.</p>
            ) : (
              <div className="d-flex flex-wrap gap-2">
                {staff.class_assignments.map((ca) => (
                  <div key={ca.id} className="p-2 px-3 bg-primary-subtle border border-primary-subtle rounded-3 small text-dark">
                    <strong>Class {ca.class?.class_name}</strong>
                    <div className="text-muted small">
                      {ca.role === 'CLASS_TEACHER' ? 'Class Teacher' : ca.subject ? `Subject: ${ca.subject.name}` : 'Faculty'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Granular Permission Matrix for this Staff */}
      <PermissionMatrix
        groupedPermissions={groupedPermissions}
        userPermissions={userPerms}
        onSave={handleSavePermissions}
        loading={savingPerms}
        selectedStaffName={`${staff.first_name} ${staff.last_name}`}
      />
    </div>
  );
};

export default StaffDetailPage;
