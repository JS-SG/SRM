import React from 'react';
import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial }) => {
  const ratingStars = Array.from({ length: testimonial.rating || 5 });

  return (
    <div className="card testimonial-card h-100 border-0 rounded-4 shadow-hover p-4 bg-white position-relative d-flex flex-column">
      {/* Decorative Quote Icon Background */}
      <div className="quote-watermark position-absolute top-0 end-0 m-3 text-gold opacity-10">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Star Ratings */}
      <div className="d-flex align-items-center gap-1 mb-3 text-gold">
        {ratingStars.map((_, i) => (
          <FiStar key={i} size={16} fill="#f59e0b" />
        ))}
      </div>

      {/* Quote Body */}
      <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontStyle: 'italic', lineHeight: 1.7, fontSize: '0.975rem' }}>
        "{testimonial.quote}"
      </p>

      {/* Author Details */}
      <div className="d-flex align-items-center gap-3 pt-3 border-top border-light mt-auto">
        <img
          src={testimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
          alt={testimonial.name}
          className="rounded-circle object-fit-cover shadow-sm flex-shrink-0"
          style={{ width: '48px', height: '48px' }}
        />
        <div>
          <h6 className="fw-bold text-navy mb-0">{testimonial.name}</h6>
          <span className="text-muted small">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
