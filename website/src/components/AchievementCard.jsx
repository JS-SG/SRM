import React from 'react';
import { FiAward, FiCalendar, FiArrowRight, FiUser } from 'react-icons/fi';

const AchievementCard = ({ achievement, onSelect }) => {
  return (
    <div
      className="card achievement-card h-100 border-0 rounded-4 shadow-hover transition-all bg-white overflow-hidden cursor-pointer position-relative"
      onClick={() => onSelect && onSelect(achievement)}
    >
      {/* Top Image with Badge */}
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={achievement.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'}
          alt={achievement.title}
          className="w-100 h-100 object-fit-cover transition-transform"
          loading="lazy"
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill shadow-sm small">
            {achievement.badge || '🏆 Excellence'}
          </span>
        </div>
      </div>

      <div className="card-body p-4 d-flex flex-column">
        {/* Category & Date */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary-soft text-primary px-2.5 py-0.5 rounded-pill small fw-semibold">
            {achievement.category}
          </span>
          <span className="text-muted small d-flex align-items-center gap-1">
            <FiCalendar size={12} className="text-gold" />
            {achievement.date}
          </span>
        </div>

        {/* Title */}
        <h5 className="card-title fw-bold text-navy mb-2 line-clamp-2">
          {achievement.title}
        </h5>

        {/* Student Name */}
        <div className="d-flex align-items-center gap-1.5 text-primary fw-semibold small mb-3">
          <FiUser size={14} />
          <span className="text-truncate">{achievement.studentName}</span>
        </div>

        {/* Description snippet */}
        <p className="card-text text-muted small line-clamp-2 mb-4 flex-grow-1" style={{ lineHeight: 1.6 }}>
          {achievement.description}
        </p>

        {/* Bottom Action */}
        <div className="pt-3 border-top border-light mt-auto d-flex justify-content-between align-items-center">
          <span className="text-muted small">Certificate & Details</span>
          <span className="text-primary fw-bold small d-flex align-items-center gap-1 group-hover-arrow">
            <span>Read More</span>
            <FiArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
