import React from 'react';
import { FiCalendar, FiMapPin, FiArrowRight, FiClock } from 'react-icons/fi';

const EventCard = ({ event, onSelect }) => {
  const eventDate = new Date(event.date);
  const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNumber = eventDate.getDate();
  const fullDateString = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className="card event-card h-100 border-0 rounded-4 shadow-hover transition-all bg-white overflow-hidden cursor-pointer"
      onClick={() => onSelect && onSelect(event)}
    >
      {/* Cover Image with Date Ribbon */}
      <div className="position-relative overflow-hidden event-card-img-wrap">
        <img
          src={event.coverImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="card-img-top event-img object-fit-cover transition-transform"
          style={{ height: '220px' }}
          loading="lazy"
        />

        {/* Date Ribbon Badge */}
        <div className="event-date-ribbon position-absolute top-0 start-0 m-3 text-center rounded-3 bg-white shadow-md overflow-hidden">
          <div className="event-ribbon-month bg-navy text-gold fw-bold px-2.5 py-0.5 text-uppercase" style={{ fontSize: '0.72rem' }}>
            {monthName}
          </div>
          <div className="event-ribbon-day fw-extrabold text-navy px-2 py-1 fs-5 lh-1">
            {dayNumber}
          </div>
        </div>

        {/* Category Pill */}
        <div className="position-absolute bottom-0 end-0 m-3">
          <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill shadow-sm small">
            {event.category || 'Event'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-center gap-3 text-muted small mb-2">
          <span className="d-flex align-items-center gap-1">
            <FiCalendar size={13} className="text-gold" />
            {fullDateString}
          </span>
          {event.time && (
            <span className="d-flex align-items-center gap-1">
              <FiClock size={13} className="text-gold" />
              {event.time}
            </span>
          )}
        </div>

        {/* Event Title */}
        <h5 className="card-title fw-bold text-navy mb-2 line-clamp-2">
          {event.title}
        </h5>

        {/* Short Event Description */}
        <p className="card-text text-muted small line-clamp-2 mb-3 flex-grow-1" style={{ lineHeight: 1.6 }}>
          {event.description}
        </p>

        {/* Location snippet */}
        {event.location && (
          <div className="d-flex align-items-center gap-1.5 text-muted small mb-4">
            <FiMapPin size={14} className="text-danger flex-shrink-0" />
            <span className="text-truncate">{event.location}</span>
          </div>
        )}

        {/* Footer Link */}
        <div className="pt-3 border-top border-light mt-auto d-flex justify-content-between align-items-center">
          <span className="text-navy fw-semibold small">View Event Details</span>
          <span className="text-primary fw-bold small d-flex align-items-center gap-1 group-hover-arrow">
            <span>View Event</span>
            <FiArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
