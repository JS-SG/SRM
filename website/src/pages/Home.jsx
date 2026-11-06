import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import Hero from '../components/Hero';
import AnnouncementTicker from '../components/AnnouncementTicker';
import SectionTitle from '../components/SectionTitle';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementModal from '../components/AnnouncementModal';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import AchievementCard from '../components/AchievementCard';
import CertificateModal from '../components/CertificateModal';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import ProgrammeCard from '../components/ProgrammeCard';
import FacilityCard from '../components/FacilityCard';
import TestimonialCard from '../components/TestimonialCard';

import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiUsers,
  FiBookOpen,
  FiShield,
  FiMapPin,
  FiCalendar,
  FiHeart,
  FiTarget,
  FiCompass,
  FiPhone,
  FiMail
} from 'react-icons/fi';

const Home = ({ onOpenAdmissions }) => {
  const {
    sectionVisibility,
    activeAnnouncements,
    activeEvents,
    featuredEvents,
    activeAchievements,
    featuredAchievements,
    activeGallery,
    activeProgrammes,
    activeFacilities,
    activeTestimonials,
    leadership,
    stats,
    siteSettings
  } = useSite();

  // Modals state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showPrincipalModal, setShowPrincipalModal] = useState(false);

  // Gallery items for preview (first 6 items)
  const previewGallery = activeGallery.slice(0, 6);

  return (
    <div className="homepage-wrapper">
      {/* 1. HERO VIDEO SECTION */}
      {sectionVisibility.hero && <Hero onOpenAdmissions={onOpenAdmissions} />}

      {/* 2. ANNOUNCEMENT TICKER */}
      {sectionVisibility.announcementTicker && (
        <AnnouncementTicker onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)} />
      )}

      {/* 3. WELCOME & ABOUT INTRODUCTION */}
      {sectionVisibility.welcome && (
        <section className="py-5 bg-white position-relative">
          <div className="container py-lg-4">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="position-relative welcome-image-cluster pe-lg-4">
                  <div className="main-welcome-img rounded-4 overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
                      alt="KKK School Campus Life"
                      className="w-100 object-fit-cover"
                      style={{ height: '420px' }}
                    />
                  </div>
                  {/* Floating Estd. Badge */}
                  <div className="floating-estd-card position-absolute bottom-0 start-0 m-4 p-3 bg-navy text-white rounded-4 shadow-2xl d-flex align-items-center gap-3">
                    <div className="estd-icon bg-gold text-dark rounded-circle p-2.5 fw-bold">
                      <FiAward size={24} />
                    </div>
                    <div>
                      <span className="d-block text-gold small fw-bold text-uppercase">Established 2007</span>
                      <strong className="fs-5 fw-extrabold">19+ Years of Trust</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <SectionTitle
                  badge="Welcome to KKK N&P School"
                  title="A Legacy of Quality Education in Subbulapuram"
                  subtitle="Instilling values, fostering creativity, and igniting academic brilliance from the earliest years."
                  align="left"
                />

                <p className="text-muted mb-4" style={{ lineHeight: 1.8, fontSize: '1.025rem' }}>
                  At <strong>KKK N&P School</strong>, we believe every child is born with boundless curiosity. Since 2007, our institution has remained dedicated to providing exemplary English-medium education blending Montessori-inspired foundational principles with rigorous primary school curricula.
                </p>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-start gap-2.5">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <div>
                        <strong className="d-block text-navy">Child-Centric Pedagogy</strong>
                        <span className="text-muted small">Individualized attention with 1:15 classroom ratio</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-start gap-2.5">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <div>
                        <strong className="d-block text-navy">Trilingual Fluency</strong>
                        <span className="text-muted small">Comprehensive English, Tamil & Hindi language mastery</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-start gap-2.5">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <div>
                        <strong className="d-block text-navy">Digital Classrooms</strong>
                        <span className="text-muted small">Smart interactive screens & STEM experiential labs</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-start gap-2.5">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <div>
                        <strong className="d-block text-navy">Safe & Caring Habitat</strong>
                        <span className="text-muted small">Full CCTV security and dedicated support mentors</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <Link to="/about" className="btn btn-navy rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm">
                    <span>Discover Our Story</span>
                    <FiArrowRight size={16} />
                  </Link>
                  <button
                    onClick={onOpenAdmissions}
                    className="btn btn-outline-gold rounded-pill px-4 py-2.5 fw-semibold"
                  >
                    Admissions Process
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. ANIMATED STATISTICS STRIP */}
      {sectionVisibility.stats && (
        <section className="py-4 bg-navy text-white position-relative stats-counter-strip">
          <div className="container">
            <div className="row g-4 text-center">
              {stats.map((st, i) => (
                <div key={i} className="col-6 col-md-4 col-lg stats-col">
                  <div className="p-3">
                    <div className="display-5 fw-extrabold text-gold mb-1">
                      {st.value}{st.suffix}
                    </div>
                    <div className="fw-bold text-white small text-uppercase tracking-wider mb-1">
                      {st.label}
                    </div>
                    <div className="text-white-50 small d-none d-md-block">
                      {st.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WHY CHOOSE US / VALUE PROPOSITION */}
      {sectionVisibility.whyChooseUs && (
        <section className="py-5 bg-light-gradient">
          <div className="container py-lg-4">
            <SectionTitle
              badge="The KKK Advantage"
              title="Why Parents Choose KKK N&P School"
              subtitle="We nurture each learner into an empathetic, articulate, and academically brilliant leader of tomorrow."
            />

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card feature-pill-card h-100 border-0 rounded-4 p-4 shadow-hover bg-white text-center">
                  <div className="feature-icon-wrapper bg-primary-soft text-primary mx-auto mb-3">
                    <FiBookOpen size={28} />
                  </div>
                  <h5 className="fw-bold text-navy mb-2">Holistic Academics</h5>
                  <p className="text-muted small mb-0">
                    Integration of phonics, conceptual mathematics, experiential science, and communicative arts.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card feature-pill-card h-100 border-0 rounded-4 p-4 shadow-hover bg-white text-center">
                  <div className="feature-icon-wrapper bg-warning-soft text-warning mx-auto mb-3">
                    <FiCompass size={28} />
                  </div>
                  <h5 className="fw-bold text-navy mb-2">STEM & Innovation</h5>
                  <p className="text-muted small mb-0">
                    Robotics workshops, computer coding, and hands-on science lab sessions starting in primary school.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card feature-pill-card h-100 border-0 rounded-4 p-4 shadow-hover bg-white text-center">
                  <div className="feature-icon-wrapper bg-success-soft text-success mx-auto mb-3">
                    <FiHeart size={28} />
                  </div>
                  <h5 className="fw-bold text-navy mb-2">Character & Values</h5>
                  <p className="text-muted small mb-0">
                    Value education, moral assemblies, ecological mindfulness, and community service projects.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card feature-pill-card h-100 border-0 rounded-4 p-4 shadow-hover bg-white text-center">
                  <div className="feature-icon-wrapper bg-danger-soft text-danger mx-auto mb-3">
                    <FiShield size={28} />
                  </div>
                  <h5 className="fw-bold text-navy mb-2">360° Safe Campus</h5>
                  <p className="text-muted small mb-0">
                    CCTV surveillance, GPS-equipped buses, infirmary care, and child-safe play environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ACADEMIC PROGRAMMES */}
      {sectionVisibility.programmes && (
        <section className="py-5 bg-white">
          <div className="container py-lg-4">
            <SectionTitle
              badge="Educational Pathways"
              title="Our Academic Programmes"
              subtitle="Tailored pedagogical programs designed to guide children through each pivotal developmental stage."
            />

            <div className="row g-4">
              {activeProgrammes.map((prog) => (
                <div key={prog.id} className="col-md-6 col-lg-3">
                  <ProgrammeCard programme={prog} />
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link
                to="/academics"
                className="btn btn-outline-primary rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2"
              >
                <span>Explore Full Curriculum & Assessment Details</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. CAMPUS & FACILITIES */}
      {sectionVisibility.facilities && (
        <section className="py-5 bg-light-gradient">
          <div className="container py-lg-4">
            <SectionTitle
              badge="World-Class Infrastructure"
              title="Campus & Learning Spaces"
              subtitle="Purpose-built spaces designed to stimulate intellectual curiosity, physical fitness, and artistic joy."
            />

            <div className="row g-4">
              {activeFacilities.slice(0, 6).map((fac) => (
                <div key={fac.id} className="col-md-6 col-lg-4">
                  <FacilityCard facility={fac} />
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link
                to="/about"
                className="btn btn-navy rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
              >
                <span>Take a Virtual Campus Tour</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 8. LATEST EVENTS */}
      {sectionVisibility.events && (
        <section className="py-5 bg-white">
          <div className="container py-lg-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
              <div>
                <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2">
                  CAMPUS HAPPENINGS
                </span>
                <h2 className="fw-bold text-navy mb-1">Upcoming Events & Festivals</h2>
                <p className="text-muted mb-0">Join us in celebrating learning, sportsmanship, and student talents.</p>
              </div>
              <div className="mt-3 mt-md-0">
                <Link to="/events" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                  <span>View All Events</span>
                  <FiArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="row g-4">
              {(featuredEvents.length > 0 ? featuredEvents : activeEvents).slice(0, 3).map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <EventCard event={event} onSelect={(e) => setSelectedEvent(e)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. ANNOUNCEMENTS SECTION */}
      {sectionVisibility.announcements && (
        <section className="py-5 bg-light-gradient">
          <div className="container py-lg-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
              <div>
                <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1 rounded-pill small mb-2">
                  CIRCULARS & NOTICES
                </span>
                <h2 className="fw-bold text-navy mb-1">Official School Announcements</h2>
                <p className="text-muted mb-0">Stay informed with real-time circulars, timetables, and academic notices.</p>
              </div>
              <div className="mt-3 mt-md-0">
                <Link to="/announcements" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                  <span>All Announcements</span>
                  <FiArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="row g-4">
              {activeAnnouncements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="col-md-6 col-lg-4">
                  <AnnouncementCard announcement={ann} onSelect={(a) => setSelectedAnnouncement(a)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. ACHIEVEMENTS & HALL OF FAME */}
      {sectionVisibility.achievements && (
        <section className="py-5 bg-white">
          <div className="container py-lg-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
              <div>
                <span className="badge bg-warning-soft text-warning fw-bold px-3 py-1 rounded-pill small mb-2">
                  STUDENT GLORY
                </span>
                <h2 className="fw-bold text-navy mb-1">Celebrating Student Achievements</h2>
                <p className="text-muted mb-0">Honoring state rankers, sports champions, young scientists, and artistic prodigies.</p>
              </div>
              <div className="mt-3 mt-md-0">
                <Link to="/achievements" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                  <span>Full Hall of Fame</span>
                  <FiArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="row g-4">
              {(featuredAchievements.length > 0 ? featuredAchievements : activeAchievements).slice(0, 3).map((ach) => (
                <div key={ach.id} className="col-md-6 col-lg-4">
                  <AchievementCard achievement={ach} onSelect={(a) => setSelectedAchievement(a)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. GALLERY PREVIEW */}
      {sectionVisibility.gallery && (
        <section className="py-5 bg-navy text-white">
          <div className="container py-lg-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
              <div>
                <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2">
                  MOMENTS AT KKK
                </span>
                <h2 className="fw-bold text-white mb-1">Life Inside Our Campus</h2>
                <p className="text-white-75 mb-0">A visual glimpse into joyful classrooms, sports fields, and celebrations.</p>
              </div>
              <div className="mt-3 mt-md-0">
                <Link to="/gallery" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                  <span>Explore Full Gallery</span>
                  <FiArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="row g-3">
              {previewGallery.map((item, index) => (
                <div key={item.id} className="col-6 col-md-4">
                  <GalleryCard item={item} onSelect={() => setLightboxIndex(index)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. PRINCIPAL / LEADERSHIP MESSAGE */}
      {sectionVisibility.principal && leadership && (
        <section className="py-5 bg-white">
          <div className="container py-lg-4">
            <div className="row align-items-center g-5">
              <div className="col-lg-5 text-center text-lg-start">
                <div className="position-relative d-inline-block">
                  <img
                    src={leadership.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                    alt={leadership.name}
                    className="rounded-4 object-fit-cover shadow-2xl w-100"
                    style={{ maxHeight: '460px', maxWidth: '380px' }}
                  />
                  <div className="position-absolute bottom-0 start-0 m-3 p-3 bg-navy text-white rounded-3 shadow-lg">
                    <strong className="d-block text-gold small">{leadership.title}</strong>
                    <span className="small text-white-75">{siteSettings.schoolName}</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1.5 rounded-pill small mb-2">
                  LEADERSHIP PHILOSOPHY
                </span>
                <h2 className="fw-bold text-navy mb-3">Message from the Principal</h2>

                <div className="p-4 rounded-4 bg-light border-start border-4 border-gold mb-4">
                  <p className="fs-5 text-navy fw-medium fst-italic mb-0" style={{ lineHeight: 1.6 }}>
                    "{leadership.shortQuote}"
                  </p>
                </div>

                <p className="text-muted mb-4 line-clamp-4" style={{ lineHeight: 1.8 }}>
                  {leadership.fullMessage}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div>
                    <h5 className="fw-bold text-navy mb-0">{leadership.name}</h5>
                    <span className="text-muted small">{leadership.qualifications}</span>
                  </div>

                  <button
                    onClick={() => setShowPrincipalModal(true)}
                    className="btn btn-outline-navy rounded-pill px-4 py-2 fw-semibold ms-auto"
                  >
                    Read Full Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 13. TESTIMONIALS */}
      {sectionVisibility.testimonials && activeTestimonials.length > 0 && (
        <section className="py-5 bg-light-gradient">
          <div className="container py-lg-4">
            <SectionTitle
              badge="Voices of Our Community"
              title="What Parents & Alumni Say"
              subtitle="Real stories of trust, growth, and academic accomplishment from the families of KKK N&P School."
            />

            <div className="row g-4">
              {activeTestimonials.slice(0, 3).map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4">
                  <TestimonialCard testimonial={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 14. ADMISSIONS CALL TO ACTION */}
      {sectionVisibility.admissionsCta && (
        <section className="py-5 bg-navy text-white text-center position-relative overflow-hidden">
          <div className="hero-gradient-overlay opacity-60" />
          <div className="container py-lg-4 position-relative z-2">
            <span className="badge bg-gold text-dark fw-bold px-3 py-1.5 rounded-pill small mb-3">
              ENROLLMENT FOR 2026–2027
            </span>
            <h2 className="display-5 fw-extrabold text-white mb-3">
              Begin Your Child's Journey of Excellence
            </h2>
            <p className="text-white-80 fs-5 mx-auto mb-4" style={{ maxWidth: '680px', lineHeight: 1.65 }}>
              Admissions are currently open for Nursery (Pre-KG, LKG, UKG) and Primary Grades 1 to 8. Limited seats available per class to ensure personalized attention.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button
                onClick={onOpenAdmissions}
                className="btn btn-gold-lg rounded-pill px-5 py-3 fw-bold shadow-2xl d-inline-flex align-items-center gap-2"
              >
                <span>Apply for Admission</span>
                <FiArrowRight size={18} />
              </button>

              <Link
                to="/contact"
                className="btn btn-outline-glass rounded-pill px-4 py-3 fw-bold"
              >
                Contact Admissions Desk
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 15. CONTACT PREVIEW SNIPPET */}
      {sectionVisibility.contactSnippet && (
        <section className="py-5 bg-white">
          <div className="container py-lg-4">
            <div className="p-4 p-md-5 rounded-4 bg-light border shadow-sm">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="badge bg-primary-soft text-primary fw-semibold px-3 py-1 rounded-pill small mb-2">
                    VISIT OUR CAMPUS
                  </span>
                  <h3 className="fw-bold text-navy mb-2">We Would Love to Meet You</h3>
                  <p className="text-muted mb-4">
                    Located on the main thoroughfare of Subbulapuram, our peaceful campus offers ample parking and guided tour slots every weekday.
                  </p>
                  <div className="d-flex flex-column gap-2 small text-muted">
                    <div className="d-flex align-items-center gap-2">
                      <FiMapPin className="text-danger flex-shrink-0" size={17} />
                      <span>{siteSettings.address}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FiPhone className="text-success flex-shrink-0" size={17} />
                      <span>{siteSettings.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 text-lg-end">
                  <Link
                    to="/contact"
                    className="btn btn-navy rounded-pill px-4 py-3 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                  >
                    <span>Get Driving Directions & Contact Info</span>
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODALS */}
      {selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {selectedAchievement && (
        <CertificateModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      {lightboxIndex !== null && (
        <LightboxModal
          images={previewGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev > 0 ? prev - 1 : previewGallery.length - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev < previewGallery.length - 1 ? prev + 1 : 0))
          }
        />
      )}

      {/* Principal Full Message Modal */}
      {showPrincipalModal && leadership && (
        <div className="custom-modal-backdrop" onClick={() => setShowPrincipalModal(false)}>
          <div
            className="custom-modal-dialog animated-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px' }}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white position-relative">
              <button
                className="btn-close position-absolute top-0 end-0 m-4"
                onClick={() => setShowPrincipalModal(false)}
              />
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src={leadership.photo}
                  alt={leadership.name}
                  className="rounded-circle object-fit-cover shadow-sm"
                  style={{ width: '64px', height: '64px' }}
                />
                <div>
                  <h4 className="fw-bold text-navy mb-0">{leadership.name}</h4>
                  <span className="text-muted small">{leadership.title}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-muted" style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {leadership.fullMessage}
                </p>
              </div>

              <div className="pt-3 border-top d-flex justify-content-end">
                <button
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold"
                  onClick={() => setShowPrincipalModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
