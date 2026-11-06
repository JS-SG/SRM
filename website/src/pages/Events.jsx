import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import { FiCalendar, FiSearch, FiFilter, FiTag, FiClock } from 'react-icons/fi';

const Events = () => {
  const { activeEvents } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('upcoming'); // 'all', 'upcoming', 'past'
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['All', 'Sports', 'Cultural', 'Academic', 'Celebration', 'Workshop'];

  const filteredEvents = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return activeEvents.filter((ev) => {
      const matchesSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.location && ev.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || ev.category?.toLowerCase() === selectedCategory.toLowerCase();

      let matchesTime = true;
      if (timeFilter === 'upcoming') {
        matchesTime = ev.date >= todayStr;
      } else if (timeFilter === 'past') {
        matchesTime = ev.date < todayStr;
      }

      return matchesSearch && matchesCat && matchesTime;
    });
  }, [activeEvents, searchQuery, selectedCategory, timeFilter]);

  return (
    <div className="events-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiCalendar /> EVENTS & HAPPENINGS
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            School Calendar & Festivities
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            Explore athletic championships, cultural pageants, robotics workshops, and family days planned throughout the academic year.
          </p>
        </div>
      </section>

      {/* Main Events Section with Filter Controls */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          {/* Filter Bar */}
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-5">
            <div className="row g-3 align-items-center">
              {/* Search */}
              <div className="col-lg-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FiSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search event by name or venue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="col-lg-5">
                <div className="d-flex flex-wrap gap-1.5">
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

              {/* Time Filter (Upcoming / Past / All) */}
              <div className="col-lg-3 text-lg-end">
                <div className="btn-group rounded-pill overflow-hidden border">
                  <button
                    className={`btn btn-sm ${timeFilter === 'upcoming' ? 'btn-gold fw-bold' : 'btn-light'}`}
                    onClick={() => setTimeFilter('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`btn btn-sm ${timeFilter === 'all' ? 'btn-gold fw-bold' : 'btn-light'}`}
                    onClick={() => setTimeFilter('all')}
                  >
                    All Events
                  </button>
                  <button
                    className={`btn btn-sm ${timeFilter === 'past' ? 'btn-gold fw-bold' : 'btn-light'}`}
                    onClick={() => setTimeFilter('past')}
                  >
                    Past
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="row g-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <EventCard event={event} onSelect={(ev) => setSelectedEvent(ev)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
              <FiCalendar size={48} className="text-muted opacity-40 mb-3" />
              <h5 className="fw-bold text-navy mb-2">No Events Found</h5>
              <p className="text-muted small mb-4">
                No events matched your current filters. Try changing your search keywords or category.
              </p>
              <button
                className="btn btn-outline-navy rounded-pill px-4 py-2 small fw-semibold"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setTimeFilter('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default Events;
