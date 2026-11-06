import React, { useState } from 'react';
import { notificationService } from '../../services/notificationService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import WhatsAppComposerModal from '../../components/notifications/WhatsAppComposerModal';

export const WhatsAppPage = () => {
  const { toastSuccess, toastError } = useToast();
  const [showComposer, setShowComposer] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const handleSendNotification = async (payload) => {
    setActionLoading(true);
    setLastResult(null);
    try {
      let res;
      if (payload.class_id) {
        res = await notificationService.sendBulk(payload);
        toastSuccess(`Dispatched to ${res.data?.successful || 0} recipient(s) via WhatsApp!`);
      } else {
        res = await notificationService.sendSingle(payload);
        toastSuccess('WhatsApp notice sent successfully!');
      }
      setLastResult(res.data);
      setShowComposer(false);
    } catch (err) {
      toastError(err.message || 'Failed to dispatch WhatsApp messages');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="WhatsApp Communication Center"
        subtitle="Automate school notices, fee reminders, and marks alerts directly to parents on WhatsApp"
        breadcrumbs={[
          { label: 'Communication', path: '/admin/whatsapp' },
          { label: 'WhatsApp Composer', path: '/admin/whatsapp' },
        ]}
        actions={
          <button className="btn btn-success btn-sm d-flex align-items-center gap-1.5 shadow-sm" onClick={() => setShowComposer(true)}>
            <i className="bi bi-whatsapp"></i> Compose New Message
          </button>
        }
      />

      <div className="row g-4">
        {/* Quick Dispatch Card 1: Fee Reminders */}
        <div className="col-md-6 col-lg-4">
          <div className="card-custom p-4 h-100 bg-white">
            <div
              className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center mb-3"
              style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
            >
              <i className="bi bi-cash-stack"></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">Fee Pending Reminders</h5>
            <p className="text-muted small mb-3">
              Notify parents of students with pending or overdue fee balances for the current term with personalized amount tags.
            </p>
            <button className="btn btn-outline-warning text-dark btn-sm w-100" onClick={() => setShowComposer(true)}>
              Launch Fee Reminder
            </button>
          </div>
        </div>

        {/* Quick Dispatch Card 2: Examination Results */}
        <div className="col-md-6 col-lg-4">
          <div className="card-custom p-4 h-100 bg-white">
            <div
              className="rounded-3 bg-info-subtle text-info d-flex align-items-center justify-content-center mb-3"
              style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
            >
              <i className="bi bi-award-fill"></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">Marks & Results Alerts</h5>
            <p className="text-muted small mb-3">
              Notify entire classes or individual parents when unit test or term examination scores are published.
            </p>
            <button className="btn btn-outline-info text-dark btn-sm w-100" onClick={() => setShowComposer(true)}>
              Launch Results Notice
            </button>
          </div>
        </div>

        {/* Quick Dispatch Card 3: General Notices & Holidays */}
        <div className="col-md-6 col-lg-4">
          <div className="card-custom p-4 h-100 bg-white">
            <div
              className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center mb-3"
              style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
            >
              <i className="bi bi-megaphone-fill"></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">General Circulars & Alerts</h5>
            <p className="text-muted small mb-3">
              Emergency holiday announcements, parent-teacher meetings, sports days, and seasonal school circulars.
            </p>
            <button className="btn btn-outline-success btn-sm w-100" onClick={() => setShowComposer(true)}>
              Launch Circular
            </button>
          </div>
        </div>
      </div>

      {/* Last Result Summary if just dispatched */}
      {lastResult && (
        <div className="card-custom p-4 mt-4 bg-light border-success">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-check-circle-fill text-success fs-5"></i>
            <h6 className="fw-bold text-dark mb-0">Dispatch Result Summary</h6>
          </div>
          <p className="small text-muted mb-2">
            Total target recipients: <strong>{lastResult.total || 1}</strong> • Delivered:{' '}
            <strong className="text-success">{lastResult.successful || (lastResult.success ? 1 : 0)}</strong> • Failed:{' '}
            <strong className="text-danger">{lastResult.failed || (lastResult.success ? 0 : 1)}</strong>
          </p>
        </div>
      )}

      {/* Composer Modal */}
      <WhatsAppComposerModal
        show={showComposer}
        onClose={() => setShowComposer(false)}
        onSend={handleSendNotification}
        loading={actionLoading}
      />
    </div>
  );
};

export default WhatsAppPage;
