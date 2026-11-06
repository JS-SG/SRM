import React from 'react';
import { FiCheck } from 'react-icons/fi';

const FacilityCard = ({ facility }) => {
  return (
    <div className="card facility-card h-100 border-0 rounded-4 shadow-hover transition-all bg-white overflow-hidden d-flex flex-column">
      {/* Visual Image */}
      <div className="position-relative overflow-hidden facility-img-wrap" style={{ height: '220px' }}>
        <img
          src={facility.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'}
          alt={facility.title}
          className="w-100 h-100 object-fit-cover transition-transform"
          loading="lazy"
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span className="badge bg-navy text-white px-3 py-1 rounded-pill small fw-semibold shadow-sm">
            {facility.category || 'Facility'}
          </span>
        </div>
      </div>

      <div className="card-body p-4 d-flex flex-column flex-grow-1">
        <h5 className="card-title fw-bold text-navy mb-2">
          {facility.title}
        </h5>

        <p className="card-text text-muted small mb-3 flex-grow-1" style={{ lineHeight: 1.6 }}>
          {facility.description}
        </p>

        {facility.features && facility.features.length > 0 && (
          <div className="pt-2 border-top border-light mt-auto">
            <div className="d-flex flex-wrap gap-1.5">
              {facility.features.map((feat, i) => (
                <span key={i} className="badge bg-light text-dark border px-2.5 py-1 rounded-pill small fw-normal d-inline-flex align-items-center gap-1">
                  <FiCheck size={11} className="text-success" /> {feat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityCard;
