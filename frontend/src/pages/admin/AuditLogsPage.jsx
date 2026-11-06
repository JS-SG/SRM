import React, { useState, useEffect, useCallback } from 'react';
import { auditService } from '../../services/auditService';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';

export const AuditLogsPage = () => {
  const { toastError } = useToast();
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [page, setPage] = useState(1);

  // Detail Modal
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await auditService.getLogs({
        page,
        limit: 15,
        action: search,
        entityType: entityFilter,
      });
      setLogs(res.data || []);
      setPagination(res.meta || null);
    } catch (err) {
      toastError(err.message || 'Failed to load audit history');
    } finally {
      setLoading(false);
    }
  }, [page, search, entityFilter, toastError]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
      header: 'User',
      render: (row) => (
        <div>
          <div className="fw-semibold text-dark small">{row.user?.username || 'System Engine'}</div>
          <div className="text-muted" style={{ fontSize: '0.68rem' }}>
            {row.user?.role?.name || 'SYSTEM'}
          </div>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => (
        <span className="badge bg-light text-dark border font-monospace small">
          {row.action}
        </span>
      ),
    },
    {
      header: 'Entity Type',
      render: (row) => (
        <div>
          <span className="fw-semibold text-dark small">{row.entity_type}</span>
          {row.entity_id && (
            <span className="text-muted ms-1 small">#{row.entity_id}</span>
          )}
        </div>
      ),
    },
    {
      header: 'IP Address',
      accessor: 'ip_address',
      render: (row) => <span className="small text-muted font-monospace">{row.ip_address || '127.0.0.1'}</span>,
    },
    {
      header: 'Details',
      render: (row) => (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setSelectedLog(row)}
        >
          <i className="bi bi-code-square me-1"></i> Diff Log
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="System Security & Audit Logs"
        subtitle="Immutable chronological history of all sensitive modifications across SRM modules"
        breadcrumbs={[
          { label: 'Administration', path: '/admin/permissions' },
          { label: 'Audit Logs', path: '/admin/audit-logs' },
        ]}
      />

      {/* Filter Bar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar
              placeholder="Search by action (e.g. UPDATE_STUDENT, SAVE_MARKS)..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select form-select-sm"
              value={entityFilter}
              onChange={(e) => {
                setEntityFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Entities</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
              <option value="Mark">Mark</option>
              <option value="StudentFee">StudentFee</option>
              <option value="FeePayment">FeePayment</option>
              <option value="ClassStaff">ClassStaff</option>
              <option value="UserPermission">UserPermission</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        emptyTitle="No Audit Logs Found"
      />

      {/* JSON Diff Inspector Modal */}
      {selectedLog && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark font-monospace">
                  Audit Log #{selectedLog.id} • {selectedLog.action}
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedLog(null)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <div className="text-muted small">Executed By:</div>
                    <strong className="text-dark">{selectedLog.user?.username || 'System Engine'}</strong>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted small">Target Entity:</div>
                    <strong>{selectedLog.entity_type} {selectedLog.entity_id ? `(ID: ${selectedLog.entity_id})` : ''}</strong>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted small">Timestamp:</div>
                    <span className="font-monospace small">{new Date(selectedLog.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="row g-3">
                  {/* Previous State */}
                  <div className="col-md-6">
                    <h6 className="fw-bold text-danger mb-2 small text-uppercase">
                      <i className="bi bi-dash-circle me-1"></i> Previous State (Old Data)
                    </h6>
                    <pre
                      className="p-3 bg-light border rounded-3 font-monospace small"
                      style={{ maxHeight: '280px', overflowY: 'auto' }}
                    >
                      {selectedLog.old_data
                        ? JSON.stringify(selectedLog.old_data, null, 2)
                        : '// No prior record state'}
                    </pre>
                  </div>

                  {/* New State */}
                  <div className="col-md-6">
                    <h6 className="fw-bold text-success mb-2 small text-uppercase">
                      <i className="bi bi-plus-circle me-1"></i> Updated State (New Data)
                    </h6>
                    <pre
                      className="p-3 bg-light border rounded-3 font-monospace small"
                      style={{ maxHeight: '280px', overflowY: 'auto' }}
                    >
                      {selectedLog.new_data
                        ? JSON.stringify(selectedLog.new_data, null, 2)
                        : '// No new payload captured'}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-top bg-light">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedLog(null)}>
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

export default AuditLogsPage;
