import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar
} from "lucide-react";

const TeacherDrawer = ({ teacher, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (teacher) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [teacher, onClose]);

  if (!teacher) return null;

  return (
    <AnimatePresence>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-drawer-title"
      >
        <motion.div
          className="drawer-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
        >
          {/* Drawer Header */}
          <div className="drawer-header">
            <h3 id="teacher-drawer-title" className="drawer-title">
              <GraduationCap className="text-primary" size={22} />
              <span>Faculty Profile</span>
            </h3>
            <button
              type="button"
              className="btn-drawer-close"
              onClick={onClose}
              aria-label="Close Profile Window"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Scroll Body */}
          <div className="drawer-scroll-body">
            {/* Teacher Hero Banner */}
            <div className="drawer-profile-hero">
              <div className="drawer-avatar-wrap">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="drawer-avatar-img"
                />
              </div>
              <h2 className="drawer-profile-name">{teacher.name}</h2>
              <div className="drawer-profile-designation">{teacher.designation}</div>
              <div className="badge-custom badge-primary-soft">
                {teacher.gradeLevel}
              </div>
            </div>

            {/* Replacement Notice Banner */}
            <div className="drawer-demo-alert">
              <div className="d-flex align-items-center gap-2 fw-bold mb-1">
                <AlertCircle size={16} />
                <span>Demo Profile Placeholder</span>
              </div>
              <div>
                Official individual faculty identities are withheld until published. This card is structured for seamless administrative record updates.
              </div>
            </div>

            {/* Key Info Grid */}
            <div>
              <h4 className="drawer-section-title">
                <Award size={16} className="text-primary" />
                <span>Academic Credentials</span>
              </h4>
              <div className="drawer-info-grid">
                <div className="drawer-info-box">
                  <div className="drawer-info-label">Qualification</div>
                  <div className="drawer-info-val">{teacher.education}</div>
                </div>
                <div className="drawer-info-box">
                  <div className="drawer-info-label">Experience</div>
                  <div className="drawer-info-val">{teacher.experience}</div>
                </div>
                <div className="drawer-info-box">
                  <div className="drawer-info-label">Department</div>
                  <div className="drawer-info-val">{teacher.department}</div>
                </div>
                <div className="drawer-info-box">
                  <div className="drawer-info-label">Working Hours</div>
                  <div className="drawer-info-val">{teacher.schedule}</div>
                </div>
              </div>
            </div>

            {/* Subjects Taught */}
            <div>
              <h4 className="drawer-section-title">
                <BookOpen size={16} className="text-primary" />
                <span>Instructional Areas</span>
              </h4>
              <div className="drawer-tags-wrap">
                {teacher.subjectsTaught?.map((sub, idx) => (
                  <span key={idx} className="drawer-tag">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Biography */}
            <div>
              <h4 className="drawer-section-title">
                <HeartHandshake size={16} className="text-primary" />
                <span>Professional Background</span>
              </h4>
              <p className="text-muted small leading-relaxed mb-0">
                {teacher.biography}
              </p>
            </div>

            {/* Teaching Philosophy */}
            <div>
              <h4 className="drawer-section-title">
                <span>Teaching Philosophy</span>
              </h4>
              <div className="drawer-quote-box">
                "{teacher.philosophy}"
              </div>
            </div>

            {/* Key Contributions / Highlights */}
            {teacher.achievements && teacher.achievements.length > 0 && (
              <div>
                <h4 className="drawer-section-title">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Key Initiatives &amp; Roles</span>
                </h4>
                <ul className="list-unstyled mb-0 d-flex flex-direction-column flex-column gap-2">
                  {teacher.achievements.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2 small text-muted">
                      <span className="text-primary fw-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Parent-Teacher Communication Note */}
            <div className="p-3 bg-light rounded-3 border">
              <div className="fw-bold text-dark small mb-1">
                Parent-Teacher Interactions:
              </div>
              <p className="small text-muted mb-0">
                Parent-Teacher meetings are conducted regularly at K K Kumaran N&amp;PS premises to review student progress and reading skills development.
              </p>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-3 border-top bg-light d-flex justify-content-end">
            <button
              type="button"
              className="btn-primary-school py-2 px-4 small"
              onClick={onClose}
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeacherDrawer;
