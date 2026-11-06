import React from 'react';
import { FiCalendar, FiArrowRight, FiFileText, FiTag } from 'react-icons/fi';

const AnnouncementCard = ({ announcement, onSelect }) => {
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className="card announcement-card h-100 border-0 rounded-4 shadow-hover transition-all bg-white overflow-hidden cursor-pointer"
      onClick={() => onSelect && onSelect(announcement)}
    >
      <div className="card-body p-4 d-flex flex-column">
        {/* Category & Date Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-primary-soft text-primary px-3 py-1 rounded-pill small fw-semibold">
            {announcement.category}
          </span>
          <span className="text-muted small d-flex align-items-center gap-1">
            <FiCalendar size={13} className="text-gold" />
            {formattedDate}
          </span>
        </div>

        {/* Announcement Title */}
        <h5 className="card-title fw-bold text-navy mb-2 line-clamp-2">
          {announcement.title}
        </h5>

        {/* Announcement Description */}
        <p className="card-text text-muted small line-clamp-3 mb-4 flex-grow-1" style={{ lineHeight: 1.6 }}>
          {announcement.description}
        </p>

        {/* Card Footer Action */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-light mt-auto">
          {announcement.attachmentUrl ? (
            <span className="badge bg-light text-muted border px-2 py-1 rounded small d-flex align-items-center gap-1">
              <FiFileText size={12} /> PDF Attached
            </span>
          ) : (
            <span className="text-muted small">Official Circular</span>
          )}

          <span className="text-primary fw-bold small d-flex align-items-center gap-1 group-hover-arrow">
            <span>View Details</span>
            <FiArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
