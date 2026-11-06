import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementModal from '../components/AnnouncementModal';
import { FiBell, FiSearch, FiTag, FiFilter, FiFileText } from 'react-icons/fi';

const Announcements = () => {
  const { activeAnnouncements } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const categories = ['All', 'Admissions', 'Academic', 'Event', 'Holiday', 'Notice'];

  const filteredAnnouncements = useMemo(() => {
    return activeAnnouncements.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [activeAnnouncements, searchQuery, selectedCategory]);

  const featuredList = activeAnnouncements.filter((a) => a.featured);

  return (
    <div className="announcements-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiBell /> CIRCULARS & NOTICES
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Official School Announcements
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            Official notices, examination timetables, holiday schedules, and parent communication circulars from the KKK N&P School administration.
          </p>
        </div>
      </section>

      {/* Featured Notices Callout */}
      {featuredList.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-5 bg-white border-bottom">
          <div className="container">
            <div className="d-flex align-items-center gap-2 mb-4">
              <span className="badge bg-warning-soft text-warning fw-bold px-3 py-1.5 rounded-pill small">
                ★ PRIORITY NOTICES
              </span>
              <h3 className="fw-bold text-navy mb-0">Featured Circulars</h3>
            </div>

            <div className="row g-4">
              {featuredList.map((ann) => (
                <div key={ann.id} className="col-md-6">
                  <AnnouncementCard announcement={ann} onSelect={(a) => setSelectedAnnouncement(a)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Announcements List */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          {/* Filter Bar */}
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-5">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-lg-5">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FiSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search circulars by title or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="d-flex flex-wrap gap-1.5 justify-content-lg-end">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold transition-all ${
                        selectedCategory === cat
                          ? 'btn-navy shadow-sm'
                          : 'btn-outline-secondary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Announcements */}
          {filteredAnnouncements.length > 0 ? (
            <div className="row g-4">
              {filteredAnnouncements.map((ann) => (
                <div key={ann.id} className="col-md-6 col-lg-4">
                  <AnnouncementCard announcement={ann} onSelect={(a) => setSelectedAnnouncement(a)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
              <FiBell size={48} className="text-muted opacity-40 mb-3" />
              <h5 className="fw-bold text-navy mb-2">No Announcements Found</h5>
              <p className="text-muted small mb-4">
                No circulars matched your search parameters.
              </p>
              <button
                className="btn btn-outline-navy rounded-pill px-4 py-2 small fw-semibold"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </div>
  );
};

export default Announcements;
