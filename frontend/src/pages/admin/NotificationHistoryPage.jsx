import React, { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../../services/notificationService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';

export const NotificationHistoryPage = () => {
  const { toastError } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Detail Modal
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationService.getHistory({
        page,
        limit: 15,
        search,
        type: typeFilter,
        status: statusFilter,
      });
      setNotifications(res.data || []);
      setPagination(res.meta || null);
    } catch (err) {
      toastError(err.message || 'Failed to load notification history');
    } finally {
      setLoading(false);
    }
  }, [page, search, typeFilter, statusFilter, toastError]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const columns = [
    {
      header: 'Timestamp',
      render: (row) => (
        <div className="small text-muted font-monospace">
          {new Date(row.created_at).toLocaleString()}
        </div>
      ),
    },
    {
      header: 'Type',
      render: (row) => <span className="badge bg-light text-dark border">{row.type}</span>,
    },
    {
      header: 'Student & Parent Recipient',
      render: (row) => (
        <div>
          <div className="fw-bold text-dark">
            {row.student ? `${row.student.first_name} ${row.student.last_name}` : 'General Broadcast'}
          </div>
          <div className="small text-muted">
            <i className="bi bi-whatsapp text-success me-1"></i>
            {row.parent ? `${row.parent.first_name} (${row.parent.whatsapp_number || row.parent.phone})` : 'N/A'}
          </div>
        </div>
      ),
    },
    {
      header: 'Notice Title',
      accessor: 'title',
      render: (row) => <span className="fw-semibold text-dark">{row.title}</span>,
    },
    {
      header: 'Message Content',
      render: (row) => (
        <div className="text-truncate text-muted small" style={{ maxWidth: '280px' }}>
          {row.message}
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedNotification(row)}>
          <i className="bi bi-chat-text"></i> View
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="WhatsApp Notification History & Delivery Logs"
        subtitle="Track delivery receipts, provider message IDs, and error logs"
        breadcrumbs={[
          { label: 'Communication', path: '/admin/whatsapp' },
          { label: 'Logs', path: '/admin/notification-history' },
        ]}
      />

      {/* Filter Bar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar
              placeholder="Search by title or message..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>
          <div className="col-6 col-md-4">
            <select
              className="form-select form-select-sm"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Notification Types</option>
              <option value="FEE_PENDING">Fee Pending Reminders</option>
              <option value="FEE_PAID">Fee Paid Receipts</option>
              <option value="MARKS_PUBLISHED">Marks Published</option>
              <option value="GENERAL">General Circulars</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Delivery Statuses</option>
              <option value="SENT">SENT / DELIVERED</option>
              <option value="QUEUED">QUEUED</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={notifications}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        emptyTitle="No Notification History Records"
      />

      {/* Detail Modal */}
      {selectedNotification && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <i className="bi bi-whatsapp text-success"></i> Message Log Details
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedNotification(null)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-light text-dark border">{selectedNotification.type}</span>
                  <StatusBadge status={selectedNotification.status} />
                </div>

                <h6 className="fw-bold text-dark">{selectedNotification.title}</h6>
                <div className="whatsapp-chat-box p-3 mb-3">
                  <div className="whatsapp-bubble outbound w-100">
                    <div style={{ whiteSpace: 'pre-line' }}>{selectedNotification.message}</div>
                    <div className="whatsapp-bubble-time">
                      {new Date(selectedNotification.created_at).toLocaleTimeString()}{' '}
                      <i className="bi bi-check2-all text-primary"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-light p-3 rounded-3 small">
                  <div className="text-muted mb-1">
                    Student: <strong>{selectedNotification.student?.first_name} {selectedNotification.student?.last_name}</strong>
                  </div>
                  <div className="text-muted mb-1">
                    Parent Contact: <strong>{selectedNotification.parent?.first_name} ({selectedNotification.parent?.phone})</strong>
                  </div>
                  {selectedNotification.logs?.[0] && (
                    <div className="text-muted">
                      Provider ID:{' '}
                      <span className="font-monospace">{selectedNotification.logs[0].provider_message_id}</span> •{' '}
                      Provider: <strong>{selectedNotification.logs[0].provider}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer border-top bg-light">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedNotification(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationHistoryPage;
