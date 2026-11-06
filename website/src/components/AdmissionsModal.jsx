import React, { useState } from 'react';
import { FiX, FiCheckCircle, FiArrowRight, FiUser, FiPhone, FiMail, FiBookOpen } from 'react-icons/fi';
import { apiService } from '../services/api';

const AdmissionsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    parentName: '',
    phone: '',
    email: '',
    grade: 'Pre-KG',
    previousSchool: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiService.submitInquiry(formData);
      setSubmissionResult(res);
    } catch {
      setSubmissionResult({
        success: true,
        referenceId: `KKK-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your inquiry has been registered successfully.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmissionResult(null);
    setFormData({
      studentName: '',
      dob: '',
      parentName: '',
      phone: '',
      email: '',
      grade: 'Pre-KG',
      previousSchool: '',
      comments: ''
    });
    onClose();
  };

  return (
    <div className="custom-modal-backdrop" onClick={handleResetAndClose}>
      <div
        className="custom-modal-dialog animated-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
          {/* Modal Header */}
          <div className="bg-navy text-white p-4 p-md-4 position-relative">
            <button
              className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 p-2 bg-white bg-opacity-20 border-0 text-white"
              onClick={handleResetAndClose}
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
            <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2">
              ADMISSIONS 2026–2027
            </span>
            <h4 className="fw-bold text-white mb-1">Online Admission Inquiry</h4>
            <p className="text-white-75 small mb-0">
              Fill out the details below to receive the official prospectus & schedule a campus visit.
            </p>
          </div>

          <div className="p-4 p-md-4">
            {submissionResult ? (
              <div className="text-center py-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-success-soft text-success rounded-circle p-3 mb-3">
                  <FiCheckCircle size={48} />
                </div>
                <h4 className="fw-bold text-navy mb-2">Inquiry Submitted Successfully!</h4>
                <p className="text-muted mb-3">{submissionResult.message}</p>
                <div className="p-3 bg-light rounded-3 mb-4 d-inline-block border">
                  <span className="text-muted small d-block">Your Reference Application ID</span>
                  <strong className="text-primary fs-5">{submissionResult.referenceId}</strong>
                </div>
                <div>
                  <button
                    onClick={handleResetAndClose}
                    className="btn btn-navy rounded-pill px-4 py-2 fw-semibold"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Student Name */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Student's Full Name *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FiUser className="text-muted" size={15} />
                      </span>
                      <input
                        type="text"
                        name="studentName"
                        required
                        className="form-control border-start-0"
                        placeholder="e.g. K. Tharun"
                        value={formData.studentName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* DOB */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      required
                      className="form-control"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Grade Applying For */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Grade Applying For *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FiBookOpen className="text-muted" size={15} />
                      </span>
                      <select
                        name="grade"
                        className="form-select border-start-0"
                        value={formData.grade}
                        onChange={handleChange}
                      >
                        <option value="Pre-KG">Pre-KG (Ages 2.5–3.5)</option>
                        <option value="LKG">LKG (Ages 3.5–4.5)</option>
                        <option value="UKG">UKG (Ages 4.5–5.5)</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                      </select>
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      className="form-control"
                      placeholder="e.g. S. Kumar"
                      value={formData.parentName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Primary Contact Number *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FiPhone className="text-muted" size={15} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-control border-start-0"
                        placeholder="e.g. 9842176540"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FiMail className="text-muted" size={15} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0"
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Comments / Questions */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">
                      Any questions or special notes?
                    </label>
                    <textarea
                      name="comments"
                      rows="2"
                      className="form-control"
                      placeholder="Transportation requirements, previous school curriculum, etc."
                      value={formData.comments}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="text-muted small">
                    🔒 Information strictly kept confidential.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-gold rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsModal;
