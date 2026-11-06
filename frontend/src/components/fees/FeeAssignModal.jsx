import React, { useState } from 'react';
import { useAcademic } from '../../contexts/AcademicContext';

export const FeeAssignModal = ({ show, onClose, onAssign, feeTypes, loading }) => {
  const { classes } = useAcademic();
  const [formData, setFormData] = useState({
    fee_type_id: feeTypes[0]?.id || '',
    class_id: classes[0]?.id || '',
    amount: '25000',
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({
      fee_type_id: parseInt(formData.fee_type_id),
      class_id: parseInt(formData.class_id),
      amount: parseFloat(formData.amount),
      due_date: formData.due_date,
    });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark">
              <i className="bi bi-file-earmark-plus text-primary me-2"></i>
              Assign Fee to Class
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label small fw-semibold">Fee Structure / Type *</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.fee_type_id}
                  onChange={(e) => setFormData({ ...formData, fee_type_id: e.target.value })}
                  required
                >
                  <option value="">Select Fee Type</option>
                  {feeTypes.map((ft) => (
                    <option key={ft.id} value={ft.id}>
                      {ft.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Target Class & Division *</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.class_id}
                  onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.class_name} ({c.standard?.name} - {c.division?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Fee Amount (₹) *</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  className="form-control form-control-sm"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Payment Due Date *</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                Assign Fees
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeeAssignModal;
