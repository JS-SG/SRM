import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { FiVolume2, FiArrowRight, FiBell, FiChevronRight } from 'react-icons/fi';

const AnnouncementTicker = ({ onSelectAnnouncement }) => {
  const { sectionVisibility, activeAnnouncements } = useSite();
  const [isPaused, setIsPaused] = useState(false);

  if (!sectionVisibility.announcementTicker || activeAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="announcement-ticker-bar bg-navy text-white py-2 px-3 border-bottom border-white-10">
      <div className="container-fluid px-lg-5">
        <div className="d-flex align-items-center gap-3">
          {/* Ticker Badge */}
          <div className="ticker-badge d-flex align-items-center gap-1.5 px-2.5 py-1 rounded bg-gold text-dark fw-bold small flex-shrink-0">
            <FiBell size={14} className="ticker-bell-icon" />
            <span className="text-uppercase tracking-wider">Updates</span>
          </div>

          {/* Marquee Content Container */}
          <div
            className="ticker-scroller-track overflow-hidden flex-grow-1 position-relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`ticker-track-inner d-flex align-items-center gap-5 ${isPaused ? 'ticker-paused' : ''}`}>
              {activeAnnouncements.concat(activeAnnouncements).map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="ticker-item d-flex align-items-center gap-2 cursor-pointer"
                  onClick={() => onSelectAnnouncement && onSelectAnnouncement(item)}
                >
                  <span className="ticker-bullet text-gold">●</span>
                  <span className="ticker-text fw-medium small text-truncate" style={{ maxWidth: '420px' }}>
                    {item.title}
                  </span>
                  <span className="ticker-view-link text-gold small d-flex align-items-center gap-1 fw-semibold">
                    View <FiChevronRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* All Notices CTA */}
          <Link
            to="/announcements"
            className="btn btn-outline-light btn-sm rounded-pill px-3 py-1 text-nowrap d-none d-md-inline-flex align-items-center gap-1 small fw-semibold"
          >
            <span>All Notices</span>
            <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
