import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  CheckCircle2,
  Users,
  AlertCircle,
  Share2
} from "lucide-react";

const EventDrawer = ({ event, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-drawer-title"
      >
        <motion.div
          className="drawer-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          style={{ width: 520 }}
        >
          {/* Drawer Header */}
          <div className="drawer-header">
            <h3 id="event-drawer-title" className="drawer-title">
              <Calendar className="text-primary" size={22} />
              <span>Event Details</span>
            </h3>
            <button
              type="button"
              className="btn-drawer-close"
              onClick={onClose}
              aria-label="Close Event Window"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="drawer-scroll-body">
            {/* Event Media Banner */}
            <div className="position-relative rounded-3 overflow-hidden" style={{ maxHeight: 220 }}>
              <img
                src={event.image}
                alt={event.title}
                className="w-100 h-100 object-fit-cover"
                style={{ minHeight: 180 }}
              />
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge-custom bg-dark text-white shadow-sm">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Title & Badge */}
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge-custom badge-primary-soft">
                  {event.type === "upcoming" ? "Upcoming Event" : "Past Event Record"}
                </span>
                {event.isSample && (
                  <span className="badge-custom badge-gold-soft">
                    Sample / Demo Content
                  </span>
                )}
              </div>
              <h2 className="fs-4 fw-bold text-navy mb-2">{event.title}</h2>
            </div>

            {/* Event Meta Grid */}
            <div className="drawer-info-grid">
              <div className="drawer-info-box">
                <div className="drawer-info-label d-flex align-items-center gap-1">
                  <Calendar size={13} className="text-primary" />
                  <span>Date</span>
                </div>
                <div className="drawer-info-val">{event.displayDate || event.date}</div>
              </div>

              <div className="drawer-info-box">
                <div className="drawer-info-label d-flex align-items-center gap-1">
                  <Clock size={13} className="text-primary" />
                  <span>Timing</span>
                </div>
                <div className="drawer-info-val">{event.time}</div>
              </div>

              <div className="drawer-info-box" style={{ gridColumn: "1 / -1" }}>
                <div className="drawer-info-label d-flex align-items-center gap-1">
                  <MapPin size={13} className="text-danger" />
                  <span>Venue / Location</span>
                </div>
                <div className="drawer-info-val">{event.location}</div>
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h4 className="drawer-section-title">Overview &amp; Objectives</h4>
              <p className="text-muted small leading-relaxed mb-0">
                {event.fullDescription || event.shortDesc}
              </p>
            </div>

            {/* Key Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div>
                <h4 className="drawer-section-title">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Program Highlights</span>
                </h4>
                <div className="d-flex flex-column gap-2">
                  {event.highlights.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-start gap-2 small text-muted">
                      <span className="text-primary fw-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audience & Coordinator */}
            <div className="p-3 bg-light rounded-3 border">
              <div className="row g-2 small">
                <div className="col-6">
                  <span className="text-muted d-block">Target Group:</span>
                  <strong className="text-dark">{event.audience || "All Students & Parents"}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted d-block">Coordinated By:</span>
                  <strong className="text-dark">{event.coordinator || "School Faculty Committee"}</strong>
                </div>
              </div>
            </div>

            {/* School Notice */}
            <div className="p-3 rounded-3 small" style={{ background: "#fffbeb", borderLeft: "4px solid #f59e0b", color: "#92400e" }}>
              <div className="d-flex align-items-center gap-1 fw-bold mb-1">
                <AlertCircle size={15} />
                <span>Event Notice:</span>
              </div>
              All school events are organized with priority on student safety and holistic character building at K K Kumaran N&amp;PS campus.
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-3 border-top bg-light d-flex justify-content-end">
            <button
              type="button"
              className="btn-primary-school py-2 px-4 small"
              onClick={onClose}
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventDrawer;
