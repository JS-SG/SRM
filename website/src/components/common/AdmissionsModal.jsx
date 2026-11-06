import React, { useState } from "react";
import { X, CheckCircle, GraduationCap, Calendar, BookOpen, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { schoolData } from "../../data/schoolData";

const AdmissionsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    applyingGrade: "Pre-Primary (LKG/UKG)",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      parentName: "",
      childName: "",
      applyingGrade: "Pre-Primary (LKG/UKG)",
      phone: "",
      message: ""
    });
    onClose();
  };

  return (
    <div
      className="modal-center-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admissions-modal-title"
    >
      <div
        className="modal-center-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 640 }}
      >
        <div className="modal-center-header">
          <div className="d-flex align-items-center gap-2">
            <GraduationCap className="text-primary" size={24} />
            <h5 id="admissions-modal-title" className="mb-0 fw-bold">
              Admissions 2026–2027
            </h5>
          </div>
          <button
            type="button"
            className="btn-drawer-close"
            onClick={onClose}
            aria-label="Close Admissions Dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-center-body">
          {submitted ? (
            <div className="text-center py-4">
              <div className="mb-3 d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 text-success">
                <CheckCircle size={48} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Inquiry Submitted Successfully!</h4>
              <p className="text-muted mb-4">
                Thank you for your interest in <strong>{schoolData.name}</strong>. We have received your inquiry for <strong>{formData.childName || "your child"}</strong> for <strong>{formData.applyingGrade}</strong>.
              </p>
              <div className="p-3 bg-light rounded-3 text-start small mb-4">
                <div className="fw-bold text-dark mb-1">Next Steps &amp; School Visits:</div>
                <div className="text-muted">
                  The new academic session begins in <strong>April</strong>. Parents are warmly invited to visit our school premises in Subbulapuram during school working hours (Monday to Friday, 8:30 AM – 3:30 PM) for document verification and classroom visits.
                </div>
              </div>
              <button
                type="button"
                className="btn-primary-school"
                onClick={handleReset}
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              {/* Info Banner */}
              <div className="p-3 rounded-3 mb-4" style={{ background: "linear-gradient(135deg, #e0f2fe, #fef3c7)" }}>
                <div className="d-flex align-items-center gap-2 fw-bold text-dark mb-1 small">
                  <Sparkles size={16} className="text-warning" />
                  <span>Academic Session Begins: April 2026</span>
                </div>
                <p className="mb-0 small text-muted">
                  Open for Pre-Primary Section and Grades 1 through 5. English medium instruction, co-educational learning, 8 instructional classrooms in good condition.
                </p>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-dark">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-dark">Child's Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Priya"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-dark">Grade Applying For *</label>
                    <select
                      className="form-select"
                      value={formData.applyingGrade}
                      onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
                    >
                      <option value="Pre-Primary (LKG/UKG)">Attached Pre-Primary (LKG / UKG)</option>
                      <option value="Grade 1">Grade 1 (Primary)</option>
                      <option value="Grade 2">Grade 2 (Primary)</option>
                      <option value="Grade 3">Grade 3 (Primary)</option>
                      <option value="Grade 4">Grade 4 (Primary)</option>
                      <option value="Grade 5">Grade 5 (Primary)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-dark">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold text-dark">Additional Notes / Inquiry</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Any specific questions regarding curriculum, school timings, or transport approach road..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 d-flex align-items-center justify-content-between pt-3 border-top">
                  <span className="small text-muted">
                    * Approachable by all-weather road
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn-outline-school py-2 px-3 small"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary-school py-2 px-4 small"
                    >
                      <Send size={15} />
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsModal;
