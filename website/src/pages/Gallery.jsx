import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import { FiImage, FiFilter, FiTag, FiSearch } from 'react-icons/fi';

const Gallery = () => {
  const { activeGallery } = useSite();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Academics',
    'Sports',
    'Events',
    'Arts',
    'Campus',
    'Celebrations',
    'Students'
  ];

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'All') return activeGallery;
    return activeGallery.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [activeGallery, selectedCategory]);

  return (
    <div className="gallery-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiImage /> PHOTO ARCHIVES
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Campus Life & Memories
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            A curated photographic collection showcasing active classrooms, athletic achievements, science explorations, and festive celebrations.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn rounded-pill px-4 py-2 fw-semibold transition-all ${
                  selectedCategory === cat
                    ? 'btn-navy shadow-md'
                    : 'btn-white bg-white border text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Masonry/Grid */}
          {filteredGallery.length > 0 ? (
            <div className="row g-4">
              {filteredGallery.map((item, idx) => (
                <div key={item.id} className="col-sm-6 col-lg-4">
                  <GalleryCard item={item} onSelect={() => setLightboxIndex(idx)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
              <FiImage size={48} className="text-muted opacity-40 mb-3" />
              <h5 className="fw-bold text-navy mb-2">No Images in this Category</h5>
              <p className="text-muted small mb-4">
                Check back soon or select another album category above.
              </p>
              <button
                className="btn btn-outline-navy rounded-pill px-4 py-2 small fw-semibold"
                onClick={() => setSelectedCategory('All')}
              >
                Show All Photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Full-screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0))
          }
        />
      )}
    </div>
  );
};

export default Gallery;
