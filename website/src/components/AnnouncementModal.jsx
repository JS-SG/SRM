import React from 'react';
import { FiX, FiCalendar, FiFileText, FiTag, FiDownload, FiExternalLink } from 'react-icons/fi';

const AnnouncementModal = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div
        className="custom-modal-dialog animated-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px' }}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
          {/* Header Image if available */}
          {announcement.image && (
            <div className="position-relative announcement-modal-header-img">
              <img
                src={announcement.image}
                alt={announcement.title}
                className="w-100 object-fit-cover"
                style={{ height: '220px' }}
              />
              <div className="announcement-modal-gradient" />
              <button
                className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 p-2 bg-dark bg-opacity-75 border-0 text-white"
                onClick={onClose}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>
          )}

          <div className="p-4 p-md-5">
            {!announcement.image && (
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                />
              </div>
            )}

            {/* Badges & Meta */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <span className="badge bg-primary-soft text-primary px-3 py-1.5 rounded-pill fw-semibold small d-inline-flex align-items-center gap-1">
                <FiTag size={13} /> {announcement.category}
              </span>

              {announcement.featured && (
                <span className="badge bg-warning-soft text-warning-dark px-3 py-1.5 rounded-pill fw-semibold small">
                  ★ Featured Notice
                </span>
              )}

              <span className="text-muted small ms-auto d-flex align-items-center gap-1">
                <FiCalendar size={14} className="text-gold" />
                {new Date(announcement.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h3 className="fw-bold text-navy mb-3">{announcement.title}</h3>

            {/* Content Body */}
            <p className="text-muted mb-4" style={{ lineHeight: 1.7, fontSize: '1.025rem' }}>
              {announcement.content || announcement.description}
            </p>

            {/* Date Active Range if available */}
            {(announcement.startDate || announcement.expiryDate) && (
              <div className="p-3 rounded-3 bg-light border mb-4 small text-muted">
                <div className="fw-semibold text-dark mb-1">Validity Timeline:</div>
                <div className="d-flex flex-wrap gap-3">
                  {announcement.startDate && <span>Starts: {announcement.startDate}</span>}
                  {announcement.expiryDate && <span>Valid Until: {announcement.expiryDate}</span>}
                </div>
              </div>
            )}

            {/* Attachment Button */}
            {announcement.attachmentUrl && (
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <a
                  href={announcement.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
                >
                  <FiFileText size={16} />
                  <span>Download Official Circular (PDF)</span>
                  <FiDownload size={15} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
