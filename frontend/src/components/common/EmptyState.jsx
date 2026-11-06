import React from 'react';

const EmptyState = ({
  icon = 'bi-inbox',
  title = 'No records found',
  description = 'There are no items matching your criteria at this moment.',
  action = null,
}) => {
  return (
    <div className="text-center py-5 px-3">
      <div
        className="d-inline-flex align-items-center justify-content-center bg-light text-muted rounded-circle mb-3"
        style={{ width: '64px', height: '64px', fontSize: '1.75rem' }}
      >
        <i className={`bi ${icon}`}></i>
      </div>
      <h6 className="fw-bold text-dark mb-1">{title}</h6>
      <p className="text-muted small mb-3 mx-auto" style={{ maxWidth: '360px' }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
