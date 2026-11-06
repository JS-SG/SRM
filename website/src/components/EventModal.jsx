import React from 'react';
import {
  FiX,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiTag,
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div
        className="custom-modal-dialog animated-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px' }}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
          {/* Cover Image & Close button */}
          <div className="position-relative event-modal-cover">
            <img
              src={event.coverImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'}
              alt={event.title}
              className="w-100 object-fit-cover"
              style={{ height: '260px' }}
            />
            <div className="event-modal-gradient" />
            <button
              className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 p-2 bg-dark bg-opacity-75 border-0 text-white"
              onClick={onClose}
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
            <span className="badge bg-gold text-dark fw-bold position-absolute bottom-0 start-0 m-4 px-3 py-1.5 rounded-pill shadow-sm">
              {event.category || 'School Event'}
            </span>
          </div>

          <div className="p-4 p-md-5">
            {/* Title */}
            <h3 className="fw-bold text-navy mb-3">{event.title}</h3>

            {/* Key Event Logistics Grid */}
            <div className="row g-3 mb-4 p-3 bg-light rounded-3 border">
              <div className="col-sm-6 d-flex align-items-center gap-2">
                <FiCalendar className="text-primary flex-shrink-0" size={18} />
                <div>
                  <div className="text-muted small">Date</div>
                  <div className="fw-semibold text-dark small">{formattedDate}</div>
                </div>
              </div>

              <div className="col-sm-6 d-flex align-items-center gap-2">
                <FiClock className="text-primary flex-shrink-0" size={18} />
                <div>
                  <div className="text-muted small">Timing</div>
                  <div className="fw-semibold text-dark small">{event.time || 'Full Day'}</div>
                </div>
              </div>

              <div className="col-12 d-flex align-items-center gap-2 pt-2 border-top">
                <FiMapPin className="text-danger flex-shrink-0" size={18} />
                <div>
                  <div className="text-muted small">Venue / Location</div>
                  <div className="fw-semibold text-dark small">{event.location || 'KKK School Campus'}</div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <h6 className="fw-bold text-navy mb-2">About This Event</h6>
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              {event.content || event.description}
            </p>

            {/* Gallery Previews if multiple images */}
            {event.galleryImages && event.galleryImages.length > 1 && (
              <div className="mb-4">
                <h6 className="fw-bold text-navy mb-2">Event Highlights</h6>
                <div className="d-flex gap-2 overflow-auto pb-2">
                  {event.galleryImages.map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt="Event snapshot"
                      className="rounded-3 object-fit-cover shadow-sm"
                      style={{ width: '100px', height: '70px' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Registration Action CTA */}
            <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="text-muted small">
                Open to all students, parents, and invited guests.
              </div>

              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  <span>Register for Event</span>
                  <FiExternalLink size={16} />
                </a>
              ) : (
                <button
                  className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
                  onClick={onClose}
                >
                  Close Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
