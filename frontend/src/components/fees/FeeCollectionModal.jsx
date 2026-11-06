import React, { useState } from 'react';

export const FeeCollectionModal = ({ show, onClose, onCollect, feeRecord, loading }) => {
  const [formData, setFormData] = useState({
    amount_paid: feeRecord ? (feeRecord.balance || feeRecord.amount) : '',
    payment_method: 'CASH',
    transaction_reference: '',
    payment_date: new Date().toISOString().split('T')[0],
  });

  if (!show || !feeRecord) return null;

  const currentBalance = feeRecord.balance !== undefined ? feeRecord.balance : (feeRecord.amount - (feeRecord.total_paid || 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    onCollect({
      student_fee_id: feeRecord.id,
      amount_paid: parseFloat(formData.amount_paid),
      payment_method: formData.payment_method,
      transaction_reference: formData.transaction_reference,
      payment_date: formData.payment_date,
    });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark">
              <i className="bi bi-cash-coin text-success me-2"></i>
              Collect Fee Payment
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {/* Fee summary banner */}
              <div className="bg-light p-3 rounded-3 border mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Student:</span>
                  <strong className="text-dark">{feeRecord.student?.name || 'Student'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Fee Structure:</span>
                  <span className="fw-semibold">{feeRecord.fee_type?.name}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Total Fee:</span>
                  <span className="fw-bold">₹{Number(feeRecord.amount).toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between pt-1 border-top">
                  <span className="text-danger small fw-semibold">Remaining Balance:</span>
                  <strong className="text-danger fs-5">₹{currentBalance.toLocaleString()}</strong>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Amount Paying Now (₹) *</label>
                <input
                  type="number"
                  min="1"
                  max={currentBalance}
                  step="0.01"
                  className="form-control"
                  value={formData.amount_paid}
                  onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                  required
                />
                <div className="form-text small">
                  You can enter a partial amount. Max payable: ₹{currentBalance.toLocaleString()}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Payment Mode *</label>
                <select
                  className="form-select form-select-sm"
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                  required
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="BANK_TRANSFER">Bank NEFT / RTGS</option>
                  <option value="CHEQUE">Cheque / Demand Draft</option>
                  <option value="CARD">Credit / Debit Card</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Transaction / Receipt Reference</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. UPI-984019284 or CHQ-10294"
                  value={formData.transaction_reference}
                  onChange={(e) => setFormData({ ...formData, transaction_reference: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Payment Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={formData.payment_date}
                  onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success btn-sm d-inline-flex align-items-center gap-1" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                Confirm & Issue Receipt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeeCollectionModal;
