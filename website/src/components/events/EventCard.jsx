import React from "react";
import { Calendar, Clock, MapPin, ChevronRight, Tag } from "lucide-react";

const EventCard = ({ event, onSelect }) => {
  // Parse date for month/day badge
  const eventDateObj = new Date(event.date);
  const monthName = isNaN(eventDateObj)
    ? "DATE"
    : eventDateObj.toLocaleString("en-US", { month: "short" });
  const dayNumber = isNaN(eventDateObj) ? "01" : eventDateObj.getDate();

  return (
    <div className="event-card">
      <div className="event-img-wrap">
        <img
          src={event.image}
          alt={event.title}
          className="event-img"
          loading="lazy"
        />

        {/* Date Month/Day Badge */}
        <div className="event-date-badge">
          <div className="event-date-month">{monthName}</div>
          <div className="event-date-day">{dayNumber}</div>
        </div>

        {/* Category Badge */}
        <div className="event-category-badge">
          {event.category}
        </div>
      </div>

      <div className="event-body">
        <h4 className="event-title">{event.title}</h4>

        <div className="event-meta-row">
          <span className="event-meta-item">
            <Clock size={14} className="text-primary" />
            <span>{event.time}</span>
          </span>
          <span className="event-meta-item">
            <MapPin size={14} className="text-danger" />
            <span>{event.location.split(",")[0]}</span>
          </span>
        </div>

        <p className="event-desc">
          {event.shortDesc}
        </p>

        <div className="event-footer">
          <span className="small text-muted">
            {event.isSample && <span className="badge-custom badge-gold-soft py-1 px-2">Sample Event</span>}
          </span>

          <button
            type="button"
            className="btn-outline-school py-1 px-3 small"
            onClick={() => onSelect(event)}
            aria-label={`View details for ${event.title}`}
          >
            <span>View Details</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
