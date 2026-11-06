import React from 'react';

const ErrorState = ({ message = 'Failed to load data', onRetry = null }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 my-3 rounded-3 shadow-sm" role="alert">
      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-exclamation-triangle-fill fs-5"></i>
        <div>
          <strong className="d-block">Error Occurred</strong>
          <span className="small">{message}</span>
        </div>
      </div>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i> Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
