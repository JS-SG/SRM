import React, { useState } from 'react';
import { useAcademic } from '../../contexts/AcademicContext';

export const StudentFormModal = ({ show, onClose, onSave, loading, initialData = null }) => {
  const { classes, academicYears } = useAcademic();

  const [formData, setFormData] = useState({
    admission_number: initialData?.admission_number || '',
    first_name: initialData?.first_name || '',
    middle_name: initialData?.middle_name || '',
    last_name: initialData?.last_name || '',
    gender: initialData?.gender || 'Male',
    date_of_birth: initialData?.date_of_birth ? initialData.date_of_birth.split('T')[0] : '2012-05-15',
    blood_group: initialData?.blood_group || 'O+',
    address: initialData?.address || '',
    city: initialData?.city || 'Chennai',
    state: initialData?.state || 'Tamil Nadu',
    pincode: initialData?.pincode || '600001',
    admission_date: initialData?.admission_date ? initialData.admission_date.split('T')[0] : new Date().toISOString().split('T')[0],
    status: initialData?.status || 'ACTIVE',
    // Parent info (for new admissions)
    parent_first_name: '',
    parent_last_name: '',
    parent_relationship: 'Father',
    parent_phone: '',
    parent_whatsapp: '',
    parent_occupation: '',
    // Initial class
    academic_year_id: academicYears[0]?.id || '',
    class_id: classes[0]?.id || '',
    roll_number: '',
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEdit = !!initialData;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark">
              <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-person-plus-fill'} me-2 text-primary`}></i>
              {isEdit ? 'Edit Student Details' : 'Student Admission & Registration'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {/* Section 1: Permanent Student Profile */}
              <h6 className="fw-bold text-primary mb-3 pb-1 border-bottom d-flex align-items-center gap-2">
                <i className="bi bi-person-vcard"></i> 1. Permanent Student Information
              </h6>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Admission Number *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="admission_number"
                    value={formData.admission_number}
                    onChange={handleChange}
                    placeholder="e.g. SRM-2026-1050"
                    required
                    disabled={isEdit}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">First Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Last Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Gender *</label>
                  <select
                    className="form-select form-select-sm"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Date of Birth *</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Blood Group</label>
                  <select
                    className="form-select form-select-sm"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Admission Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="admission_date"
                    value={formData.admission_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Residential Address</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, locality, area..."
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">PIN Code</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {!isEdit && (
                <>
                  {/* Section 2: Parent / Guardian Information */}
                  <h6 className="fw-bold text-primary mb-3 pb-1 border-bottom d-flex align-items-center gap-2">
                    <i className="bi bi-people-fill"></i> 2. Primary Parent / Guardian Details
                  </h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Parent First Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="parent_first_name"
                        value={formData.parent_first_name}
                        onChange={handleChange}
                        required={!isEdit}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Parent Last Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="parent_last_name"
                        value={formData.parent_last_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Relationship</label>
                      <select
                        className="form-select form-select-sm"
                        name="parent_relationship"
                        value={formData.parent_relationship}
                        onChange={handleChange}
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        name="parent_phone"
                        value={formData.parent_phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        required={!isEdit}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">WhatsApp Number</label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        name="parent_whatsapp"
                        value={formData.parent_whatsapp}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Occupation</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="parent_occupation"
                        value={formData.parent_occupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Section 3: Initial Academic Enrollment */}
                  <h6 className="fw-bold text-primary mb-3 pb-1 border-bottom d-flex align-items-center gap-2">
                    <i className="bi bi-mortarboard-fill"></i> 3. Initial Class Enrollment
                  </h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Academic Year *</label>
                      <select
                        className="form-select form-select-sm"
                        name="academic_year_id"
                        value={formData.academic_year_id}
                        onChange={handleChange}
                        required={!isEdit}
                      >
                        <option value="">Select Academic Year</option>
                        {academicYears.map((ay) => (
                          <option key={ay.id} value={ay.id}>
                            {ay.name} {ay.is_current ? '(Current)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Class & Division *</label>
                      <select
                        className="form-select form-select-sm"
                        name="class_id"
                        value={formData.class_id}
                        onChange={handleChange}
                        required={!isEdit}
                      >
                        <option value="">Select Class</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.class_name} ({c.standard?.name} - {c.division?.name})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Roll Number</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="roll_number"
                        value={formData.roll_number}
                        onChange={handleChange}
                        placeholder="e.g. 10A-15"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                {isEdit ? 'Save Changes' : 'Complete Admission'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentFormModal;
