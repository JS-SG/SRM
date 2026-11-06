import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Tag, AlertCircle } from "lucide-react";

const LightboxModal = ({ items, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % items.length);
    };

    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, items, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
    >
      {/* Top Bar */}
      <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex align-items-center gap-3">
          <span className="badge-custom bg-primary text-white">
            {currentItem.category}
          </span>
          <span className="small text-white-50">
            Image {currentIndex + 1} of {items.length}
          </span>
        </div>

        <button
          type="button"
          className="btn-drawer-close text-white bg-dark border-secondary"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Center Image Stage */}
      <div className="lightbox-center-stage" onClick={(e) => e.stopPropagation()}>
        {/* Previous Button */}
        <button
          type="button"
          className="lightbox-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous Image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Current Image */}
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="lightbox-main-img"
        />

        {/* Next Button */}
        <button
          type="button"
          className="lightbox-nav-btn next"
          onClick={handleNext}
          aria-label="Next Image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="lightbox-caption-bar" onClick={(e) => e.stopPropagation()}>
        <h4 id="lightbox-caption" className="lightbox-title mb-1">
          {currentItem.title}
        </h4>
        <p className="text-white-50 small mb-1 max-w-xl mx-auto">
          {currentItem.caption}
        </p>
        <span className="badge bg-dark bg-opacity-75 text-warning small px-2 py-1">
          * Illustrative / Representative Educational Stock Photography
        </span>
      </div>
    </div>
  );
};

export default LightboxModal;
