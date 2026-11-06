import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiShield,
  FiHeart
} from 'react-icons/fi';

const Footer = ({ onOpenAdmissions }) => {
  const { siteSettings } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-navy-dark text-white pt-5 pb-3">
      {/* Top Footer Callout Banner */}
      <div className="container pb-5 mb-4 border-bottom border-white-10">
        <div className="row align-items-center justify-content-between g-4">
          <div className="col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small">
                ADMISSIONS 2026–2027
              </span>
              <span className="text-white-75 small">Pre-KG through Grade 8</span>
            </div>
            <h3 className="fw-bold text-white mb-1">
              Give Your Child the Foundation They Deserve
            </h3>
            <p className="text-white-60 mb-0">
              Schedule a personalized campus tour and experience the KKK excellence firsthand.
            </p>
          </div>
          <div className="col-lg-5 text-lg-end">
            <button
              onClick={onOpenAdmissions}
              className="btn btn-gold rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-lg"
            >
              <span>Apply Online Today</span>
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="container pb-5">
        <div className="row g-5">
          {/* Col 1: Identity & Motto */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="school-emblem-badge bg-gold text-dark">
                <span className="fw-bold fs-5">KKK</span>
              </div>
              <div>
                <h5 className="fw-bold text-white mb-0">{siteSettings.schoolName}</h5>
                <span className="text-gold small fw-medium">Subbulapuram • Estd. 2007</span>
              </div>
            </div>

            <p className="text-white-70 small mb-4" style={{ lineHeight: 1.7 }}>
              {siteSettings.schoolFullName} is committed to nurturing young learners through values-based education, modern pedagogical techniques, and world-class foundational care.
            </p>

            {/* Social Media Links */}
            <div className="d-flex align-items-center gap-2">
              <a
                href={siteSettings.socialLinks?.facebook || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn rounded-circle d-flex align-items-center justify-content-center text-white"
                aria-label="Facebook"
              >
                <FiFacebook size={17} />
              </a>
              <a
                href={siteSettings.socialLinks?.instagram || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn rounded-circle d-flex align-items-center justify-content-center text-white"
                aria-label="Instagram"
              >
                <FiInstagram size={17} />
              </a>
              <a
                href={siteSettings.socialLinks?.youtube || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn rounded-circle d-flex align-items-center justify-content-center text-white"
                aria-label="YouTube"
              >
                <FiYoutube size={17} />
              </a>
              <a
                href={siteSettings.socialLinks?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn rounded-circle d-flex align-items-center justify-content-center text-white"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-6">
            <h6 className="footer-title text-gold text-uppercase fw-bold small mb-3 tracking-wider">
              Quick Links
            </h6>
            <ul className="list-unstyled footer-nav-list d-flex flex-column gap-2 small">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/academics" className="footer-link">Academics</Link></li>
              <li><Link to="/admissions" className="footer-link">Admissions</Link></li>
              <li><Link to="/events" className="footer-link">Upcoming Events</Link></li>
              <li><Link to="/gallery" className="footer-link">Campus Gallery</Link></li>
              <li><Link to="/achievements" className="footer-link">Hall of Fame</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic Wings */}
          <div className="col-lg-2 col-6">
            <h6 className="footer-title text-gold text-uppercase fw-bold small mb-3 tracking-wider">
              Programmes
            </h6>
            <ul className="list-unstyled footer-nav-list d-flex flex-column gap-2 small">
              <li><Link to="/academics" className="footer-link">Pre-Kindergarten</Link></li>
              <li><Link to="/academics" className="footer-link">LKG & UKG</Link></li>
              <li><Link to="/academics" className="footer-link">Primary Grades 1–5</Link></li>
              <li><Link to="/academics" className="footer-link">Middle School 6–8</Link></li>
              <li><Link to="/academics" className="footer-link">STEM Robotics Hub</Link></li>
              <li><Link to="/announcements" className="footer-link">Circulars & Notices</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-title text-gold text-uppercase fw-bold small mb-3 tracking-wider">
              Campus Contact
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-3 small text-white-75">
              <li className="d-flex align-items-start gap-2.5">
                <FiMapPin className="text-gold mt-1 flex-shrink-0" size={17} />
                <span>{siteSettings.address}</span>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <FiPhone className="text-gold flex-shrink-0" size={17} />
                <span>{siteSettings.phone}</span>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <FiMail className="text-gold flex-shrink-0" size={17} />
                <span>{siteSettings.email}</span>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <FiClock className="text-gold flex-shrink-0" size={17} />
                <span>{siteSettings.officeHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright & Admin Link */}
      <div className="footer-bottom-bar border-top border-white-10 pt-3">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-white-50">
            <div>
              © {currentYear} <strong>{siteSettings.schoolFullName}</strong>. All Rights Reserved.
            </div>

            <div className="d-flex align-items-center gap-4">
              <span>Affiliation Code: 04-P-022</span>
              <span className="opacity-50">|</span>
              <Link to="/admin/controller" className="text-gold text-decoration-none d-flex align-items-center gap-1 hover-underline">
                <FiShield size={13} />
                <span>Admin CMS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
