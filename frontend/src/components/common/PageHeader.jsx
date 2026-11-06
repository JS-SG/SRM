import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="mb-2">
      <ol className="breadcrumb mb-0 small">
        <li className="breadcrumb-item">
          <Link to="/" className="text-decoration-none text-muted">
            <i className="bi bi-house-door"></i> Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return isLast ? (
            <li key={index} className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {item.label}
            </li>
          ) : (
            <li key={index} className="breadcrumb-item">
              <Link to={item.path} className="text-decoration-none text-muted">
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const PageHeader = ({ title, subtitle, breadcrumbs = [], actions = null }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
      <div>
        <Breadcrumb items={breadcrumbs} />
        <h3 className="fw-bold text-dark mb-1 letter-spacing-tight">{title}</h3>
        {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
      </div>
      {actions && <div className="d-flex align-items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
};

export default PageHeader;
