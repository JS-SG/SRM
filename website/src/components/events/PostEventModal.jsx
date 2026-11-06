import React, { useState } from "react";
import { X, CalendarPlus, Image, Sparkles, AlertCircle } from "lucide-react";
import { eventCategories } from "../../data/events";
import { useEvents } from "../../context/EventsContext";
import confetti from "canvas-confetti";

const sampleImagePresets = [
  { label: "Classroom / Science", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" },
  { label: "Sports & Athletics", url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800" },
  { label: "Cultural / Celebration", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" },
  { label: "Library / Reading", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800" }
];

const PostEventModal = () => {
  const { isPostModalOpen, setIsPostModalOpen, addEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "9:00 AM – 1:00 PM",
    category: "School Celebration",
    shortDesc: "",
    fullDescription: "",
    location: "School Campus, Subbulapuram",
    image: sampleImagePresets[0].url
  });

  if (!isPostModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent({
      ...formData,
      isSample: true,
      featured: false,
      audience: "All Students, Faculty & Parents",
      coordinator: "School Event Committee"
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }

    setIsPostModalOpen(false);
  };

  return (
    <div
      className="modal-center-backdrop"
      onClick={() => setIsPostModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-event-modal-title"
    >
      <div
        className="modal-center-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 600 }}
      >
        {/* Header */}
        <div className="modal-center-header">
          <div className="d-flex align-items-center gap-2">
            <CalendarPlus className="text-primary" size={22} />
            <h5 id="post-event-modal-title" className="mb-0 fw-bold">
              Post New School Event (Frontend Demo)
            </h5>
          </div>
          <button
            type="button"
            className="btn-drawer-close"
            onClick={() => setIsPostModalOpen(false)}
            aria-label="Close Event Posting Dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="modal-center-body">
          {/* Demo Notice Banner */}
          <div className="p-2 px-3 rounded-2 mb-3 small d-flex align-items-center gap-2" style={{ background: "#fffbeb", borderLeft: "3px solid #f59e0b", color: "#92400e" }}>
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>
              <strong>Local Demo State:</strong> This event will be dynamically rendered on your current session without requiring a backend database.
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Event Title */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">Event Title *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Grand Science &amp; Art Exhibition 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Category */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">Category *</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {eventCategories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">Event Date *</label>
                <input
                  type="date"
                  required
                  className="form-control"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              {/* Timing */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">Timing *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. 9:00 AM – 1:30 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              {/* Location */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">Location / Venue</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {/* Short Description */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">Short Description *</label>
                <textarea
                  required
                  rows="2"
                  className="form-control"
                  placeholder="Brief overview summarizing the purpose and activities of the event..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                ></textarea>
              </div>

              {/* Image Preset Picker */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark d-flex align-items-center gap-1">
                  <Image size={15} className="text-primary" />
                  <span>Choose Cover Image Theme</span>
                </label>
                <div className="row g-2">
                  {sampleImagePresets.map((preset, idx) => (
                    <div key={idx} className="col-6 col-sm-3">
                      <div
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`p-1 rounded-2 border text-center cursor-pointer ${formData.image === preset.url ? "border-primary bg-primary bg-opacity-10 shadow-sm" : "bg-light"}`}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-100 rounded-1 object-fit-cover mb-1"
                          style={{ height: 45 }}
                        />
                        <div className="small fw-semibold text-truncate" style={{ fontSize: "0.72rem" }}>
                          {preset.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-end gap-2">
              <button
                type="button"
                className="btn-outline-school py-2 px-3 small"
                onClick={() => setIsPostModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-school py-2 px-4 small"
              >
                <Sparkles size={15} />
                Publish Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostEventModal;
