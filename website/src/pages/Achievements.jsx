import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import AchievementCard from '../components/AchievementCard';
import CertificateModal from '../components/CertificateModal';
import { FiAward, FiSearch, FiStar, FiFilter } from 'react-icons/fi';

const Achievements = () => {
  const { activeAchievements } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const categories = ['All', 'Academic', 'Sports', 'Science', 'Arts', 'Leadership'];

  const filteredAchievements = useMemo(() => {
    return activeAchievements.filter((ach) => {
      const matchesSearch =
        ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ach.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ach.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || ach.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [activeAchievements, searchQuery, selectedCategory]);

  return (
    <div className="achievements-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiAward /> HALL OF FAME
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Student Triumphs & Accolades
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            Celebrating the dedication, ingenuity, and athletic prowess of KKK N&P School students across state, regional, and national arenas.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
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
                    placeholder="Search by student name or award..."
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

          {/* Cards */}
          {filteredAchievements.length > 0 ? (
            <div className="row g-4">
              {filteredAchievements.map((ach) => (
                <div key={ach.id} className="col-md-6 col-lg-4">
                  <AchievementCard achievement={ach} onSelect={(a) => setSelectedAchievement(a)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
              <FiAward size={48} className="text-muted opacity-40 mb-3" />
              <h5 className="fw-bold text-navy mb-2">No Achievements Found</h5>
              <p className="text-muted small mb-4">
                Try selecting another category or clear the search field.
              </p>
              <button
                className="btn btn-outline-navy rounded-pill px-4 py-2 small fw-semibold"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedAchievement && (
        <CertificateModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
};

export default Achievements;
