import React from "react";
import { Link } from "react-router-dom";
import {
  School,
  BookOpen,
  Laptop,
  Activity,
  Droplets,
  Users,
  Zap,
  UserCheck,
  Archive,
  Navigation,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { schoolData } from "../../data/schoolData";

const facilityIconMap = {
  School: School,
  BookOpen: BookOpen,
  Laptop: Laptop,
  Activity: Activity,
  Droplets: Droplets,
  Users: Users,
  Zap: Zap,
  UserCheck: UserCheck,
  Archive: Archive,
  Navigation: Navigation
};

const FacilitiesOverview = ({ limit = 6, showViewAll = true }) => {
  const displayedFacilities = limit ? schoolData.facilities.slice(0, limit) : schoolData.facilities;

  return (
    <section className="py-5" style={{ background: "#f8fafc" }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-eyebrow">
            <Sparkles size={16} />
            Campus &amp; Learning Environment
          </span>
          <h2 className="section-heading">Our School Facilities</h2>
          <p className="section-description">
            Dedicated infrastructure ensuring a healthy, secure, and encouraging educational setting for our primary and pre-primary students.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="row g-4">
          {displayedFacilities.map((facility) => {
            const IconComp = facilityIconMap[facility.icon] || School;
            return (
              <div key={facility.id} className="col-lg-4 col-md-6">
                <div className="facility-card">
                  <div className="facility-header">
                    <div className="facility-icon-circle">
                      <IconComp size={24} />
                    </div>
                    <span className="badge-custom badge-primary-soft">
                      {facility.badge}
                    </span>
                  </div>

                  <h3 className="facility-title">{facility.title}</h3>
                  <p className="facility-desc">{facility.description}</p>

                  <div className="facility-footer">
                    <span className="facility-status-pill">
                      <span className="dot"></span>
                      <span>{facility.status}</span>
                    </span>
                    <span className="text-muted small fw-semibold">
                      {facility.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Facilities Button */}
        {showViewAll && (
          <div className="text-center mt-5">
            <Link to="/facilities" className="btn-primary-school">
              <span>View All Campus Facilities &amp; Specifications</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacilitiesOverview;
