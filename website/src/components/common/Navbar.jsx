import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, Phone, MapPin, Sparkles, UserPlus } from "lucide-react";
import { schoolData } from "../../data/schoolData";

const Navbar = ({ onOpenAdmissions }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Teachers", path: "/teachers" },
    { name: "Facilities", path: "/facilities" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="school-top-bar d-none d-md-block">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span className="top-bar-item">
              <MapPin size={13} className="text-warning" />
              Subbulapuram, Sankarankovil Block, Tirunelveli Dist.
            </span>
            <span className="top-bar-item">
              <Sparkles size={13} className="text-info" />
              Academic Session Starts in April • English Medium
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="top-bar-item text-white-50">
              Estd. {schoolData.establishedYear} (Pvt. Unaided)
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`school-navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-2">
            {/* School Logo & Title */}
            <Link to="/" className="navbar-brand-school">
              <div className="brand-emblem-wrap">
                <img
                  src="/favicon.svg"
                  alt="School Emblem"
                  className="brand-emblem-img"
                />
              </div>
              <div className="brand-text-content">
                <span className="brand-title">K K KUMARAN N&amp;PS</span>
                <span className="brand-sub">Subbulapuram • Primary &amp; Pre-Primary</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="d-none d-lg-block">
              <ul className="school-nav-links">
                {navLinks.map((item) => (
                  <li key={item.path} className="school-nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link-custom ${isActive ? "active" : ""}`
                      }
                      end={item.path === "/"}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Action Button & Mobile Toggle */}
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn-nav-admissions"
                onClick={onOpenAdmissions}
                aria-label="Open Admissions Inquiry Form"
              >
                <UserPlus size={16} />
                <span>Admissions</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="mobile-nav-toggle d-lg-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer d-lg-none ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  end={item.path === "/"}
                >
                  <span>{item.name}</span>
                  <span className="text-muted small">→</span>
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="btn-primary-school w-100 py-2"
              >
                <UserPlus size={16} />
                Admissions 2026–27
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
