import React, { useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiCalendar, FiTag } from 'react-icons/fi';

const LightboxModal = ({
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentImage) return null;

  return (
    <div className="lightbox-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" onClick={onClose}>
      <div className="lightbox-content position-relative p-2 p-md-4" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="d-flex justify-content-between align-items-center text-white mb-2 px-2">
          <span className="small text-white-75">
            {currentIndex + 1} of {images.length}
          </span>
          <button
            className="btn btn-outline-light btn-sm rounded-circle p-2 border-0"
            onClick={onClose}
            aria-label="Close Lightbox"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Main Image Frame */}
        <div className="lightbox-image-wrapper position-relative text-center rounded-4 overflow-hidden shadow-2xl bg-black">
          <img
            src={currentImage.imageUrl}
            alt={currentImage.title}
            className="lightbox-main-img img-fluid"
            style={{ maxHeight: '75vh', width: 'auto', objectFit: 'contain' }}
          />

          {/* Nav buttons */}
          {images.length > 1 && (
            <>
              <button
                className="lightbox-nav-btn prev-btn position-absolute top-50 start-0 translate-middle-y btn btn-dark bg-opacity-75 rounded-circle m-3 p-2 text-white border-0"
                onClick={onPrev}
                aria-label="Previous Image"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                className="lightbox-nav-btn next-btn position-absolute top-50 end-0 translate-middle-y btn btn-dark bg-opacity-75 rounded-circle m-3 p-2 text-white border-0"
                onClick={onNext}
                aria-label="Next Image"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Caption bar */}
        <div className="lightbox-caption text-white mt-3 p-3 bg-dark bg-opacity-90 rounded-3 shadow-sm">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <span className="badge bg-gold text-dark fw-bold small px-2.5 py-0.5 rounded-pill">
              <FiTag size={11} className="me-1" /> {currentImage.category}
            </span>
            {currentImage.date && (
              <span className="text-white-50 small d-flex align-items-center gap-1 ms-auto">
                <FiCalendar size={12} /> {currentImage.date}
              </span>
            )}
          </div>
          <h5 className="fw-bold mb-1 text-white">{currentImage.title}</h5>
          {currentImage.description && (
            <p className="text-white-75 small mb-0">{currentImage.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
