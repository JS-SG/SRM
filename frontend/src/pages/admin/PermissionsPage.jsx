import React, { useState, useEffect } from 'react';
import { permissionService } from '../../services/permissionService';
import { staffService } from '../../services/staffService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import PermissionMatrix from '../../components/permissions/PermissionMatrix';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const PermissionsPage = () => {
  const { toastSuccess, toastError } = useToast();

  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [staffRes, permRes] = await Promise.all([
          staffService.getAll({ limit: 100 }),
          permissionService.getAllPermissions(),
        ]);
        const staff = staffRes.data || [];
        setStaffList(staff);
        setGroupedPermissions(permRes.data?.grouped || {});

        if (staff.length > 0) {
          setSelectedStaffId(staff[0].id);
        }
      } catch (err) {
        toastError(err.message || 'Failed to load permissions configuration');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [toastError]);

  const fetchStaffPermissions = async (staffId) => {
    const targetStaff = staffList.find((s) => s.id === parseInt(staffId));
    if (!targetStaff?.user?.id) return;
    try {
      const res = await permissionService.getUserPermissions(targetStaff.user.id);
      setUserPermissions(res.data || []);
    } catch (err) {
      toastError('Failed to load user permissions');
    }
  };

  useEffect(() => {
    if (selectedStaffId && staffList.length > 0) {
      fetchStaffPermissions(selectedStaffId);
    }
  }, [selectedStaffId, staffList]);

  const handleSave = async (permissionIds) => {
    const targetStaff = staffList.find((s) => s.id === parseInt(selectedStaffId));
    if (!targetStaff?.user?.id) return;
    setSaving(true);
    try {
      await permissionService.updateUserPermissions(targetStaff.user.id, permissionIds);
      toastSuccess(`Permissions updated for ${targetStaff.first_name} ${targetStaff.last_name}`);
      fetchStaffPermissions(selectedStaffId);
    } catch (err) {
      toastError(err.message || 'Failed to update permissions');
    } finally {
      setSaving(false);
    }
  };

  const selectedStaff = staffList.find((s) => s.id === parseInt(selectedStaffId));

  return (
    <div>
      <PageHeader
        title="Granular Role & Permissions Matrix"
        subtitle="Configure module-level access rules for individual faculty members"
        breadcrumbs={[
          { label: 'Administration', path: '/admin/permissions' },
          { label: 'Permissions', path: '/admin/permissions' },
        ]}
      />

      {/* Staff Selector */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="row align-items-center">
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-muted mb-1">
              Select Faculty Member to Configure
            </label>
            <select
              className="form-select"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >
              {staffList.map((st) => (
                <option key={st.id} value={st.id}>
                  👨‍🏫 {st.first_name} {st.last_name} ({st.employee_code}) - {st.department}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            {selectedStaff && (
              <div className="small text-muted">
                Username: <strong className="text-primary font-monospace">{selectedStaff.user?.username}</strong> •{' '}
                Designation: <strong className="text-dark">{selectedStaff.designation}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading permission matrix..." />
      ) : (
        <PermissionMatrix
          groupedPermissions={groupedPermissions}
          userPermissions={userPermissions}
          onSave={handleSave}
          loading={saving}
          selectedStaffName={selectedStaff ? `${selectedStaff.first_name} ${selectedStaff.last_name}` : 'Staff Member'}
        />
      )}
    </div>
  );
};

export default PermissionsPage;
