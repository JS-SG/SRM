import React, { useState } from 'react';
import { useAcademic } from '../../contexts/AcademicContext';

export const WhatsAppComposerModal = ({ show, onClose, onSend, loading, defaultStudentId = null }) => {
  const { classes } = useAcademic();

  const [recipientType, setRecipientType] = useState(defaultStudentId ? 'INDIVIDUAL' : 'CLASS');
  const [targetClassId, setTargetClassId] = useState(classes[0]?.id || '');
  const [studentId, setStudentId] = useState(defaultStudentId || '');
  const [notificationType, setNotificationType] = useState('GENERAL');
  const [title, setTitle] = useState('Important School Notice');
  const [template, setTemplate] = useState(
    'Dear {parent_name},\nThis is an official communication regarding your ward {student_name} (Class {class_name}, Roll No: {roll_number}).\nPlease take note of the upcoming school schedule.\n\nWarm regards,\nSRM School Administration'
  );

  if (!show) return null;

  const handleTemplatePreset = (type) => {
    setNotificationType(type);
    if (type === 'FEE_PENDING') {
      setTitle('Pending Fee Payment Notice');
      setTemplate(
        'Dear {parent_name},\nThis is a gentle reminder that the term fee for your ward {student_name} (Class {class_name}) is currently pending.\nPlease arrange for the payment at the school office or via online portal at your earliest convenience.\n\nThank you,\nSRM Accounts Department'
      );
    } else if (type === 'MARKS_PUBLISHED') {
      setTitle('Examination Results Published');
      setTemplate(
        'Dear {parent_name},\nThe examination marks for {student_name} (Class {class_name}) have been published on the SRM portal.\nYou can review the detailed performance breakdown online.\n\nBest wishes,\nSRM Academic Faculty'
      );
    } else if (type === 'FEE_PAID') {
      setTitle('Fee Payment Receipt Acknowledgement');
      setTemplate(
        'Dear {parent_name},\nWe have successfully received the fee payment for {student_name} (Class {class_name}).\nOfficial receipt has been generated on the portal.\n\nThank you,\nSRM Finance Office'
      );
    } else {
      setTitle('Important School Circular');
      setTemplate(
        'Dear {parent_name},\nThis is an official communication regarding your ward {student_name} (Class {class_name}, Roll No: {roll_number}).\nPlease take note of the upcoming school circular.\n\nWarm regards,\nSRM Administration'
      );
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (recipientType === 'CLASS') {
      onSend({
        class_id: parseInt(targetClassId),
        type: notificationType,
        title,
        message_template: template,
      });
    } else {
      onSend({
        student_id: parseInt(studentId),
        type: notificationType,
        title,
        message_template: template,
      });
    }
  };

  // Live preview with sample replacement
  const previewText = template
    .replace('{parent_name}', 'Mr. David Kumar')
    .replace('{student_name}', 'Rahul Kumar')
    .replace('{class_name}', '10-A')
    .replace('{roll_number}', '10A-05');

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', overflowY: 'auto', padding: '1rem'}}tabIndex="-1">
      <div className="modal-dialog modal-lg "style={{
      minHeight: 'calc(100vh - 2rem)',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto'
    }}>
        <div className="modal-content border-0 shadow-lg rounded-3" style={{
        maxHeight: 'calc(100vh - 2rem)'
      }}>
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className="bi bi-whatsapp text-success fs-4"></i>
              Compose WhatsApp Notification
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>

          <form onSubmit={handleSend}>
            <div className="modal-body p-4"  style={{
    overflowY: 'auto',
    minHeight: 0
  }}>
              {/* Preset buttons */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Choose Message Preset</label>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={`btn btn-sm ${notificationType === 'GENERAL' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleTemplatePreset('GENERAL')}
                  >
                    <i className="bi bi-megaphone me-1"></i> General Circular
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${notificationType === 'FEE_PENDING' ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                    onClick={() => handleTemplatePreset('FEE_PENDING')}
                  >
                    <i className="bi bi-exclamation-circle me-1"></i> Fee Pending Reminder
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${notificationType === 'MARKS_PUBLISHED' ? 'btn-info text-dark' : 'btn-outline-secondary'}`}
                    onClick={() => handleTemplatePreset('MARKS_PUBLISHED')}
                  >
                    <i className="bi bi-award me-1"></i> Marks Published
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${notificationType === 'FEE_PAID' ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => handleTemplatePreset('FEE_PAID')}
                  >
                    <i className="bi bi-check-circle me-1"></i> Payment Receipt
                  </button>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Recipient Target *</label>
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn btn-sm ${recipientType === 'CLASS' ? 'btn-dark' : 'btn-outline-secondary'}`}
                      onClick={() => setRecipientType('CLASS')}
                    >
                      Entire Class
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${recipientType === 'INDIVIDUAL' ? 'btn-dark' : 'btn-outline-secondary'}`}
                      onClick={() => setRecipientType('INDIVIDUAL')}
                    >
                      Individual Student
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  {recipientType === 'CLASS' ? (
                    <>
                      <label className="form-label small fw-semibold">Target Class & Division *</label>
                      <select
                        className="form-select form-select-sm"
                        value={targetClassId}
                        onChange={(e) => setTargetClassId(e.target.value)}
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.class_name} ({c.standard?.name} - {c.division?.name})
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="form-label small fw-semibold">Student ID *</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Enter Student ID (e.g. 1)"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                      />
                    </>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Notification Title *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-7">
                  <label className="form-label small fw-semibold">Message Template *</label>
                  <textarea
                    className="form-control"
                    rows="7"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    required
                  ></textarea>
                  <div className="form-text small">
                    Available tags: <code>{'{parent_name}'}</code>, <code>{'{student_name}'}</code>,{' '}
                    <code>{'{class_name}'}</code>, <code>{'{roll_number}'}</code>
                  </div>
                </div>

                {/* Live WhatsApp Bubble Preview */}
                <div className="col-md-5">
                  <label className="form-label small fw-semibold text-success">
                    <i className="bi bi-eye me-1"></i> WhatsApp Message Preview
                  </label>
                  <div className="whatsapp-chat-box shadow-sm">
                    <div className="whatsapp-bubble outbound">
                      <div className="fw-bold text-dark mb-1 small">{title}</div>
                      <div style={{ whiteSpace: 'pre-line' }}>{previewText}</div>
                      <div className="whatsapp-bubble-time">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                        <i className="bi bi-check2-all text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light flex-shrink-0">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success btn-sm d-inline-flex align-items-center gap-1.5 px-3" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <i className="bi bi-send-fill"></i>
                )}
                Send WhatsApp Dispatch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppComposerModal;
