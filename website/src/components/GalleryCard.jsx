import React from 'react';
import { FiMaximize2, FiTag } from 'react-icons/fi';

const GalleryCard = ({ item, onSelect }) => {
  return (
    <div
      className="gallery-card-item rounded-4 overflow-hidden position-relative shadow-sm cursor-pointer group"
      onClick={() => onSelect && onSelect(item)}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-100 h-100 object-fit-cover gallery-img transition-all"
        style={{ minHeight: '260px' }}
        loading="lazy"
      />

      {/* Modern Gradient & Info Hover Overlay */}
      <div className="gallery-card-overlay position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-between text-white">
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small">
            {item.category}
          </span>
          <span className="zoom-icon-circle bg-white text-dark rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center">
            <FiMaximize2 size={16} />
          </span>
        </div>

        <div className="gallery-overlay-bottom">
          <h6 className="fw-bold mb-1 text-white text-truncate">{item.title}</h6>
          {item.description && (
            <p className="text-white-80 small mb-0 line-clamp-2">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
