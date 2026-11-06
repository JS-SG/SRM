import React, { useState } from "react";
import { Maximize2, Tag } from "lucide-react";
import { galleryItems, galleryCategories } from "../../data/galleryData";
import LightboxModal from "./LightboxModal";

const GalleryGrid = ({ limit, showFilters = true }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div>
      {/* Category Filter Tabs */}
      {showFilters && (
        <div className="filter-tabs-wrapper">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-tab-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="gallery-grid">
        {displayedItems.map((item, idx) => (
          <div
            key={item.id}
            className="gallery-item-card"
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View full image: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setLightboxIndex(idx);
              }
            }}
          >
            <img
              src={item.thumb || item.image}
              alt={item.title}
              className="gallery-item-img"
              loading="lazy"
            />
            <div className="gallery-item-overlay">
              <div className="d-flex justify-content-between align-items-center w-100 mb-1">
                <span className="gallery-item-tag">{item.tag || item.category}</span>
                <span className="text-white bg-dark bg-opacity-50 p-1 rounded-circle d-flex">
                  <Maximize2 size={14} />
                </span>
              </div>
              <h5 className="gallery-item-title">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Popup */}
      <LightboxModal
        items={displayedItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};

export default GalleryGrid;
