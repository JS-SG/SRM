import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, BookOpen, ShieldCheck, Heart } from "lucide-react";
import { schoolData } from "../../data/schoolData";

const Footer = ({ onOpenAdmissions }) => {
  return (
    <footer className="mt-auto" style={{ background: "#0c2340", color: "#f8fafc", borderTop: "4px solid #f59e0b" }}>
      {/* Upper Footer */}
      <div className="container py-5">
        <div className="row gy-4">
          {/* Col 1: School Identity & Summary */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="brand-emblem-wrap" style={{ width: 44, height: 44 }}>
                <img src="/favicon.svg" alt="Emblem" className="brand-emblem-img" />
              </div>
              <div>
                <h5 className="mb-0 text-white fw-bold">{schoolData.name}</h5>
                <span className="text-warning small fw-semibold">Estd. {schoolData.establishedYear} • {schoolData.management}</span>
              </div>
            </div>
            <p className="text-white-50 small mb-3 leading-relaxed">
              "{schoolData.name} — nurturing young minds through learning, values and opportunity."
            </p>
            <div className="d-flex flex-column gap-2 text-white-50 small">
              <div className="d-flex align-items-start gap-2">
                <MapPin size={15} className="text-warning flex-shrink-0 mt-1" />
                <span>{schoolData.location.addressSummary}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Clock size={15} className="text-info flex-shrink-0" />
                <span>Monday – Friday: 8:30 AM – 3:30 PM</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Calendar size={15} className="text-success flex-shrink-0" />
                <span>Academic Session Starts in April</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small tracking-wider">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-white-50 text-decoration-none hover-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white-50 text-decoration-none hover-link">About School</Link>
              </li>
              <li>
                <Link to="/teachers" className="text-white-50 text-decoration-none hover-link">Our Teachers</Link>
              </li>
              <li>
                <Link to="/facilities" className="text-white-50 text-decoration-none hover-link">Campus Facilities</Link>
              </li>
              <li>
                <Link to="/events" className="text-white-50 text-decoration-none hover-link">School Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white-50 text-decoration-none hover-link">Photo Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white-50 text-decoration-none hover-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Information */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small tracking-wider">School Profile</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-white-50">
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> Grades: 1 to 5 + Pre-Primary
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> Medium: English
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> Co-Educational School
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> 8 Instructional Classrooms
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> 125 Books School Library
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-warning">✔</span> Functional Computer &amp; Water
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Notice */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small tracking-wider">Admissions 2026–27</h6>
            <p className="text-white-50 small mb-3">
              Enrolling students for Pre-Primary and Grades 1 through 5. Nurturing foundational excellence in a supportive setting.
            </p>
            <button
              type="button"
              onClick={onOpenAdmissions}
              className="btn-gold-school w-100 py-2 small fw-bold"
            >
              Admissions Inquiry Form
            </button>
            <p className="text-white-50 small mt-2" style={{ fontSize: "0.75rem" }}>
              * Approachable by all-weather motorable road in Subbulapuram.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div style={{ background: "#081728", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem 0" }}>
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-white-50 small">
          <div>
            &copy; 2026 {schoolData.name}. All Rights Reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Primary &amp; Pre-Primary Education</span>
            <span>•</span>
            <span>Sankarankovil Block, Tirunelveli</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
