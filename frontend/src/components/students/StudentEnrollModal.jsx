import React, { useState } from 'react';
import { useAcademic } from '../../contexts/AcademicContext';

export const StudentEnrollModal = ({ show, onClose, onEnroll, loading, studentName }) => {
  const { classes, academicYears } = useAcademic();
  const [formData, setFormData] = useState({
    academic_year_id: academicYears[0]?.id || '',
    class_id: classes[0]?.id || '',
    roll_number: '',
    status: 'ACTIVE',
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(formData);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark">
              <i className="bi bi-arrow-up-right-circle text-primary me-2"></i>
              Enroll / Promote Student
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="alert alert-info py-2 small mb-3">
                Student: <strong>{studentName}</strong>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Academic Year *</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.academic_year_id}
                  onChange={(e) => setFormData({ ...formData, academic_year_id: e.target.value })}
                  required
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.name} {y.is_current ? '(Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Target Class *</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.class_id}
                  onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                  required
                >
                  <option value="">Select Target Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.class_name} ({c.standard?.name} - {c.division?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Roll Number</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. 11B-05"
                  value={formData.roll_number}
                  onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Enrollment Status</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PROMOTED">PROMOTED</option>
                  <option value="TRANSFERRED">TRANSFERRED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                Confirm Enrollment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const ParentFormModal = ({ show, onClose, onSave, loading }) => {
  const [parentData, setParentData] = useState({
    first_name: '',
    last_name: '',
    relationship: 'Mother',
    phone: '',
    whatsapp_number: '',
    email: '',
    occupation: '',
    address: '',
    is_primary: false,
    receives_notifications: true,
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      parent_data: {
        first_name: parentData.first_name,
        last_name: parentData.last_name,
        relationship: parentData.relationship,
        phone: parentData.phone,
        whatsapp_number: parentData.whatsapp_number || parentData.phone,
        email: parentData.email,
        occupation: parentData.occupation,
        address: parentData.address,
      },
      is_primary: parentData.is_primary,
      receives_notifications: parentData.receives_notifications,
    });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark">
              <i className="bi bi-person-plus text-primary me-2"></i>
              Add Parent / Guardian
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">First Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={parentData.first_name}
                    onChange={(e) => setParentData({ ...parentData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={parentData.last_name}
                    onChange={(e) => setParentData({ ...parentData, last_name: e.target.value })}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">Relationship *</label>
                  <select
                    className="form-select form-select-sm"
                    value={parentData.relationship}
                    onChange={(e) => setParentData({ ...parentData, relationship: e.target.value })}
                    required
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Phone *</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm"
                    value={parentData.phone}
                    onChange={(e) => setParentData({ ...parentData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">WhatsApp Number</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm"
                    value={parentData.whatsapp_number}
                    onChange={(e) => setParentData({ ...parentData, whatsapp_number: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={parentData.email}
                    onChange={(e) => setParentData({ ...parentData, email: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <div className="form-check form-switch mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isPrimaryCheck"
                      checked={parentData.is_primary}
                      onChange={(e) => setParentData({ ...parentData, is_primary: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="isPrimaryCheck">
                      Set as Primary Contact
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="receivesNotifsCheck"
                      checked={parentData.receives_notifications}
                      onChange={(e) => setParentData({ ...parentData, receives_notifications: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="receivesNotifsCheck">
                      Receive WhatsApp Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                Save Parent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
