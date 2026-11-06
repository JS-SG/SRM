import React from 'react';

const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  badgeIcon = null,
  className = ''
}) => {
  const isCenter = align === 'center';
  const isRight = align === 'right';

  return (
    <div
      className={`section-title-wrapper mb-5 ${
        isCenter ? 'text-center mx-auto' : isRight ? 'text-end ms-auto' : 'text-start me-auto'
      } ${className}`}
      style={{ maxWidth: isCenter ? '760px' : '100%' }}
    >
      {badge && (
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 section-badge">
          {badgeIcon && <span className="badge-icon">{badgeIcon}</span>}
          <span className="badge-text fw-semibold text-uppercase tracking-wider small">{badge}</span>
        </div>
      )}
      {title && (
        <h2 className={`section-heading fw-bold ${light ? 'text-white' : 'text-navy'} mt-1 mb-3`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`section-subtext ${light ? 'text-white-50' : 'text-muted'} mb-0`}>
          {subtitle}
        </p>
      )}
      <div className={`section-accent-line ${isCenter ? 'mx-auto' : isRight ? 'ms-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
