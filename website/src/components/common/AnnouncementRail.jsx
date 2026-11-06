import React, { useState } from "react";
import { Bell, Pause, Play, ChevronRight, Info } from "lucide-react";
import { announcementsData } from "../../data/announcements";

const AnnouncementRail = ({ onOpenAdmissions, onSelectAnnouncement }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalAnn, setActiveModalAnn] = useState(null);

  const handleAnnouncementClick = (ann) => {
    if (ann.type === "admissions" && onOpenAdmissions) {
      onOpenAdmissions();
    } else {
      setActiveModalAnn(ann);
    }
  };

  return (
    <>
      <div
        className="announcement-rail-container"
        role="region"
        aria-label="School Announcements Ticker"
      >
        <div className="announcement-rail-inner">
          {/* Left Fixed Badge */}
          <div className="announcement-badge-col">
            <Bell size={16} className="announcement-icon-pulse" />
            <span>Announcements</span>
          </div>

          {/* Right Horizontally Moving Ticker */}
          <div
            className="announcement-ticker-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="ticker-fade-left"></div>
            <div className="ticker-fade-right"></div>

            {/* Seamless scrolling marquee loop */}
            <div className={`announcement-track ${isPaused ? "paused" : ""}`}>
              {/* First Set */}
              {announcementsData.map((item) => (
                <div
                  key={`first-${item.id}`}
                  className="ticker-item"
                  onClick={() => handleAnnouncementClick(item)}
                  title="Click to view announcement details"
                >
                  <span className={`ticker-tag ${item.type}`}>
                    {item.tag}
                  </span>
                  <span>{item.text}</span>
                  <span className="ticker-separator">•</span>
                </div>
              ))}

              {/* Duplicate Set for smooth infinite marquee looping */}
              {announcementsData.map((item) => (
                <div
                  key={`dup-${item.id}`}
                  className="ticker-item"
                  onClick={() => handleAnnouncementClick(item)}
                  title="Click to view announcement details"
                >
                  <span className={`ticker-tag ${item.type}`}>
                    {item.tag}
                  </span>
                  <span>{item.text}</span>
                  <span className="ticker-separator">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="announcement-controls d-none d-md-flex">
            <button
              type="button"
              className="btn-announcement-ctrl"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume announcement ticker" : "Pause announcement ticker"}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Detail Modal Popup */}
      {activeModalAnn && (
        <div
          className="modal-center-backdrop"
          onClick={() => setActiveModalAnn(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-center-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-center-header">
              <div className="d-flex align-items-center gap-2">
                <Info size={20} className="text-primary" />
                <h5 className="mb-0 fw-bold">Official Announcement</h5>
              </div>
              <button
                type="button"
                className="btn-drawer-close"
                onClick={() => setActiveModalAnn(null)}
                aria-label="Close Announcement Dialog"
              >
                ✕
              </button>
            </div>
            <div className="modal-center-body">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className={`ticker-tag ${activeModalAnn.type}`}>
                  {activeModalAnn.tag}
                </span>
                <span className="text-muted small">Academic Year 2026–27</span>
              </div>
              <p className="lead fs-6 text-dark fw-medium mb-3">
                {activeModalAnn.text}
              </p>
              <div className="p-3 bg-light rounded-3 text-muted small">
                <strong>School Note:</strong> For any further clarifications regarding school updates, schedules, or admissions, parents and guardians are welcome to visit our school campus at Subbulapuram during school working hours (Monday to Friday, 8:30 AM to 3:30 PM).
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn-primary-school"
                  onClick={() => setActiveModalAnn(null)}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementRail;
