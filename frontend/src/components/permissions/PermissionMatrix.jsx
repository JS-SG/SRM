import React, { useState, useEffect } from 'react';

export const PermissionMatrix = ({
  groupedPermissions,
  userPermissions = [],
  onSave,
  loading = false,
  selectedStaffName = 'Staff Member',
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    if (userPermissions) {
      setSelectedIds(new Set(userPermissions.map((p) => p.id)));
    }
  }, [userPermissions]);

  const handleToggle = (permId) => {
    const next = new Set(selectedIds);
    if (next.has(permId)) {
      next.delete(permId);
    } else {
      next.add(permId);
    }
    setSelectedIds(next);
  };

  const handleSelectModule = (perms, checkAll) => {
    const next = new Set(selectedIds);
    perms.forEach((p) => {
      if (checkAll) next.add(p.id);
      else next.delete(p.id);
    });
    setSelectedIds(next);
  };

  const handleSave = () => {
    onSave(Array.from(selectedIds));
  };

  if (!groupedPermissions || Object.keys(groupedPermissions).length === 0) return null;

  return (
    <div className="card-custom">
      <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h6 className="fw-bold text-dark mb-0">
            Permission Matrix for: <span className="text-primary">{selectedStaffName}</span>
          </h6>
          <span className="text-muted small">
            {selectedIds.size} permission(s) currently granted
          </span>
        </div>
        <button
          className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1.5 px-3"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <i className="bi bi-shield-check"></i>
          )}
          Save Permissions
        </button>
      </div>

      <div className="p-3">
        <div className="row g-3">
          {Object.entries(groupedPermissions).map(([moduleName, perms]) => {
            const allChecked = perms.every((p) => selectedIds.has(p.id));
            const someChecked = perms.some((p) => selectedIds.has(p.id));

            return (
              <div key={moduleName} className="col-md-6 col-xl-4">
                <div className="permission-module-card h-100 bg-white">
                  <div className="permission-module-header">
                    <span className="text-uppercase tracking-wider">{moduleName}</span>
                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 text-decoration-none small text-muted"
                      onClick={() => handleSelectModule(perms, !allChecked)}
                    >
                      {allChecked ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="p-3">
                    {perms.map((p) => {
                      const isChecked = selectedIds.has(p.id);
                      return (
                        <div key={p.id} className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`perm_${p.id}`}
                            checked={isChecked}
                            onChange={() => handleToggle(p.id)}
                          />
                          <label className="form-check-label small" htmlFor={`perm_${p.id}`}>
                            <div className="fw-semibold text-dark">{p.name}</div>
                            <div className="text-muted" style={{ fontSize: '0.725rem' }}>
                              {p.description}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;
