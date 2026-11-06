import React from 'react';
import { FiX, FiAward, FiCalendar, FiUser, FiFileText, FiDownload, FiExternalLink } from 'react-icons/fi';

const CertificateModal = ({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div
        className="custom-modal-dialog animated-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
          {/* Top Banner / Image */}
          {achievement.image && (
            <div className="position-relative">
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-100 object-fit-cover"
                style={{ height: '240px' }}
              />
              <div className="announcement-modal-gradient" />
              <button
                className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 p-2 bg-dark bg-opacity-75 border-0 text-white"
                onClick={onClose}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
              <div className="position-absolute bottom-0 start-0 m-4">
                <span className="badge bg-gold text-dark fw-bold px-3 py-1.5 rounded-pill shadow-sm">
                  {achievement.badge || '🏆 Excellence Honor'}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 p-md-5">
            {!achievement.image && (
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                />
              </div>
            )}

            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <span className="badge bg-primary-soft text-primary px-3 py-1 rounded-pill fw-semibold small">
                {achievement.category}
              </span>
              <span className="text-muted small ms-auto d-flex align-items-center gap-1">
                <FiCalendar size={13} className="text-gold" />
                {achievement.date}
              </span>
            </div>

            <h3 className="fw-bold text-navy mb-2">{achievement.title}</h3>

            <div className="d-flex align-items-center gap-2 text-primary fw-semibold mb-4 p-2.5 rounded-3 bg-primary-soft">
              <FiUser size={18} />
              <span>Honoree: {achievement.studentName}</span>
            </div>

            <h6 className="fw-bold text-navy mb-2">Achievement Overview</h6>
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              {achievement.description}
            </p>

            {achievement.certificateUrl && (
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <a
                  href={achievement.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  <FiFileText size={16} />
                  <span>View Official Certificate (PDF)</span>
                  <FiExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
