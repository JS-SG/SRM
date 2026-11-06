import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { Pagination } from './SearchBar';

export const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = 'No data available',
  emptyDescription = 'No records found to display.',
  pagination = null,
  onPageChange = null,
  onRowClick = null,
  keyField = 'id',
}) => {
  if (loading) {
    return (
      <div className="card-custom p-4">
        <LoadingSpinner message="Fetching data..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="card-custom p-4">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="card-custom overflow-hidden">
      <div className="table-responsive">
        <table className="table table-custom table-hover align-middle">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={col.width ? { width: col.width } : {}}
                  className={col.className || ''}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={row[keyField] || rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                style={onRowClick ? { cursor: 'pointer' } : {}}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={col.cellClassName || ''}>
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && onPageChange && (
        <div className="p-3 bg-white">
          <Pagination pagination={pagination} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

export const ConfirmModal = ({
  show,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
          </div>
          <div className="modal-body py-3">
            <p className="text-muted mb-0">{message}</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-light" onClick={onClose} disabled={loading}>
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant} d-inline-flex align-items-center gap-1`}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
