import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import {
  FiPhone,
  FiMail,
  FiClock,
  FiMenu,
  FiX,
  FiChevronDown,
  FiShield,
  FiArrowRight,
  FiCalendar,
  FiAward,
  FiImage,
  FiBookOpen,
  FiInfo
} from 'react-icons/fi';

const Navbar = ({ onOpenAdmissions }) => {
  const { siteSettings } = useSite();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Detect scroll to style sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header className={`site-header sticky-top ${isScrolled ? 'header-scrolled shadow-sm' : ''}`}>
      {/* Top Utility Bar */}
      <div className="top-bar py-1 d-none d-lg-block text-white">
        <div className="container-fluid px-lg-5">
          <div className="d-flex justify-content-between align-items-center small">
            <div className="d-flex align-items-center gap-4">
              <span className="d-flex align-items-center gap-1 opacity-90">
                <FiPhone className="text-gold" size={13} />
                <span>+91 94431 82950</span>
              </span>
              <span className="d-flex align-items-center gap-1 opacity-90">
                <FiMail className="text-gold" size={13} />
                <span>admissions@kkknpschool.edu.in</span>
              </span>
              <span className="d-flex align-items-center gap-1 opacity-90">
                <FiClock className="text-gold" size={13} />
                <span>Mon – Sat: 8:30 AM – 4:30 PM</span>
              </span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="badge-govt-code px-2 py-0.5 rounded text-white-50 small">
                Govt. Code: 04-P-022
              </span>
              <Link
                to="/admin/controller"
                className="admin-quick-link d-flex align-items-center gap-1 text-white-50 hover-gold text-decoration-none px-2 py-1 rounded"
                title="Central Controller Admin Dashboard"
              >
                <FiShield size={13} className="text-gold" />
                <span>Controller CMS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar navbar-expand-xl main-navbar py-2 py-lg-3">
        <div className="container-fluid px-3 px-lg-5">
          {/* School Brand Identity */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-3 text-decoration-none">
            <div className="school-emblem-badge d-flex align-items-center justify-content-center">
              <span className="emblem-letters fw-bold">KKK</span>
            </div>
            <div className="brand-text d-flex flex-column">
              <span className="brand-name fw-bold lh-1">{siteSettings.schoolName}</span>
              <span className="brand-subline text-gold fw-medium mt-1">Subbulapuram • Estd. 2007</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="collapse navbar-collapse d-none d-xl-flex justify-content-center">
            <ul className="navbar-nav align-items-center gap-1">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>

              {/* About Dropdown */}
              <li
                className="nav-item dropdown custom-nav-dropdown"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
                >
                  About <FiChevronDown size={14} className="dropdown-arrow" />
                </NavLink>
                {activeDropdown === 'about' && (
                  <div className="dropdown-menu show shadow-lg border-0 py-2 animated fadeIn">
                    <Link to="/about" className="dropdown-item d-flex align-items-center gap-2">
                      <FiInfo className="text-primary" /> Vision & Mission
                    </Link>
                    <Link to="/about#leadership" className="dropdown-item d-flex align-items-center gap-2">
                      <FiShield className="text-primary" /> Principal's Message
                    </Link>
                    <Link to="/about#milestones" className="dropdown-item d-flex align-items-center gap-2">
                      <FiAward className="text-primary" /> School Milestones
                    </Link>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <NavLink to="/academics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Academics
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/admissions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Admissions
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Events
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/announcements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Announcements
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/achievements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Achievements
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Gallery
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={onOpenAdmissions}
              className="btn btn-gold rounded-pill px-3 px-lg-4 py-2 d-none d-sm-inline-flex align-items-center gap-2 shadow-sm fw-semibold"
            >
              <span>Apply Now</span>
              <FiArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="btn btn-outline-light border-0 d-xl-none p-2 mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay d-xl-none" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-nav-drawer p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-white-10">
              <div className="d-flex align-items-center gap-2">
                <div className="school-emblem-badge small-badge">
                  <span className="fw-bold">KKK</span>
                </div>
                <span className="fw-bold fs-6">{siteSettings.schoolName}</span>
              </div>
              <button
                className="btn text-white-50 p-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX size={22} />
              </button>
            </div>

            <ul className="list-unstyled mobile-nav-list d-flex flex-column gap-2 mb-4">
              <li>
                <NavLink to="/" className="mobile-nav-item">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="mobile-nav-item">About School</NavLink>
              </li>
              <li>
                <NavLink to="/academics" className="mobile-nav-item">Academics</NavLink>
              </li>
              <li>
                <NavLink to="/admissions" className="mobile-nav-item">Admissions</NavLink>
              </li>
              <li>
                <NavLink to="/events" className="mobile-nav-item">Events</NavLink>
              </li>
              <li>
                <NavLink to="/announcements" className="mobile-nav-item">Announcements</NavLink>
              </li>
              <li>
                <NavLink to="/achievements" className="mobile-nav-item">Achievements</NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className="mobile-nav-item">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="mobile-nav-item">Contact Us</NavLink>
              </li>
              <li className="pt-2 border-top border-white-10">
                <NavLink to="/admin/controller" className="mobile-nav-item text-gold d-flex align-items-center gap-2">
                  <FiShield /> Admin Controller CMS
                </NavLink>
              </li>
            </ul>

            <div className="d-flex flex-column gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="btn btn-gold w-100 py-2 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                <span>Apply for Admission</span>
                <FiArrowRight />
              </button>

              <div className="text-white-50 small mt-2 d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2">
                  <FiPhone className="text-gold" size={14} /> +91 94431 82950
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FiMail className="text-gold" size={14} /> info@kkknpschool.edu.in
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
