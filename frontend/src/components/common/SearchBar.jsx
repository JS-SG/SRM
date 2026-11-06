import React, { useState, useEffect } from 'react';

export const SearchBar = ({
  placeholder = 'Search records...',
  value = '',
  onChange,
  debounceMs = 300,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange && searchTerm !== value) {
        onChange(searchTerm);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [searchTerm, debounceMs, onChange, value]);

  return (
    <div className={`input-group ${className}`} style={{ maxWidth: '320px' }}>
      <span className="input-group-text bg-white border-end-0 text-muted">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0 ps-0 shadow-none"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          className="btn btn-outline-secondary border-start-0 border"
          type="button"
          onClick={() => {
            setSearchTerm('');
            if (onChange) onChange('');
          }}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
};

export const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total, limit } = pagination;
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
      <div className="text-muted small">
        Showing <span className="fw-semibold text-dark">{startItem}</span> to{' '}
        <span className="fw-semibold text-dark">{endItem}</span> of{' '}
        <span className="fw-semibold text-dark">{total}</span> records
      </div>
      <nav aria-label="Table pagination">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          {getPageNumbers().map((num) => (
            <li key={num} className={`page-item ${num === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(num)}>
                {num}
              </button>
            </li>
          ))}
          <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
