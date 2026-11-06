import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles, PlusCircle } from "lucide-react";
import { useEvents } from "../../context/EventsContext";
import EventCard from "../events/EventCard";
import EventDrawer from "../events/EventDrawer";
import PostEventModal from "../events/PostEventModal";

const HomeEventsPreview = ({ limit = 3 }) => {
  const { events, selectedEvent, setSelectedEvent, setIsPostModalOpen } = useEvents();

  const displayedEvents = events.slice(0, limit);

  return (
    <section className="py-5" style={{ background: "#f8fafc" }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <span className="section-eyebrow">
              <Calendar size={16} />
              School Life &amp; Activities
            </span>
            <h2 className="section-heading mb-0">Upcoming &amp; Featured Events</h2>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn-outline-school py-2 px-3 small"
              onClick={() => setIsPostModalOpen(true)}
            >
              <PlusCircle size={16} className="text-primary" />
              <span>+ Post Event (Demo)</span>
            </button>
            <Link to="/events" className="btn-primary-school py-2 px-3 small">
              <span>View All Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="row g-4">
          {displayedEvents.map((event) => (
            <div key={event.id} className="col-lg-4 col-md-6">
              <EventCard
                event={event}
                onSelect={(ev) => setSelectedEvent(ev)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Drawer */}
      <EventDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Post Event Modal */}
      <PostEventModal />
    </section>
  );
};

export default HomeEventsPreview;
