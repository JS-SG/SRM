import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const normalized = status.toUpperCase();

  switch (normalized) {
    case 'ACTIVE':
    case 'PAID':
    case 'SENT':
    case 'DELIVERED':
    case 'PASS':
      return (
        <span className="badge-pill-custom badge-active">
          <i className="bi bi-check-circle-fill"></i> {status}
        </span>
      );

    case 'PARTIAL':
    case 'PROMOTED':
      return (
        <span className="badge-pill-custom badge-partial">
          <i className="bi bi-clock-history"></i> {status}
        </span>
      );

    case 'PENDING':
    case 'QUEUED':
      return (
        <span className="badge-pill-custom badge-pending">
          <i className="bi bi-hourglass-split"></i> {status}
        </span>
      );

    case 'OVERDUE':
    case 'FAILED':
    case 'INACTIVE':
    case 'FAIL':
      return (
        <span className="badge-pill-custom badge-overdue">
          <i className="bi bi-exclamation-circle-fill"></i> {status}
        </span>
      );

    case 'TRANSFERRED':
    case 'ALUMNI':
    case 'COMPLETED':
      return (
        <span className="badge bg-secondary text-white rounded-pill px-2 py-1 small">
          {status}
        </span>
      );

    default:
      return (
        <span className="badge bg-light text-dark border rounded-pill px-2 py-1 small">
          {status}
        </span>
      );
  }
};

export default StatusBadge;
