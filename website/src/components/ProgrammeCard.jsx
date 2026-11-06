import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiUsers } from 'react-icons/fi';

const ProgrammeCard = ({ programme }) => {
  return (
    <div className="card programme-card h-100 border-0 rounded-4 shadow-hover transition-all bg-white overflow-hidden d-flex flex-column">
      {/* Top Image */}
      <div className="position-relative overflow-hidden programme-img-wrap" style={{ height: '210px' }}>
        <img
          src={programme.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'}
          alt={programme.title}
          className="w-100 h-100 object-fit-cover transition-transform"
          loading="lazy"
        />
        <div className="programme-badge-tag position-absolute top-0 start-0 m-3">
          <span className="badge bg-navy text-gold fw-bold px-3 py-1.5 rounded-pill shadow-sm small">
            {programme.badge || 'Academic Level'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="card-body p-4 d-flex flex-column flex-grow-1">
        <div className="d-flex align-items-center gap-2 text-muted small mb-2">
          <FiUsers className="text-gold" size={14} />
          <span>{programme.ageGroup}</span>
        </div>

        <h4 className="card-title fw-bold text-navy mb-2">
          {programme.title}
        </h4>

        <p className="card-text text-muted small mb-4" style={{ lineHeight: 1.65 }}>
          {programme.description}
        </p>

        {/* Highlights Checklist */}
        {programme.highlights && programme.highlights.length > 0 && (
          <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
            {programme.highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="d-flex align-items-start gap-2 small text-muted">
                <FiCheckCircle className="text-success mt-0.5 flex-shrink-0" size={15} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Learn More link */}
        <div className="pt-3 border-top border-light mt-auto">
          <Link
            to="/academics"
            className="btn btn-outline-primary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
          >
            <span>Learn More</span>
            <FiArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeCard;
