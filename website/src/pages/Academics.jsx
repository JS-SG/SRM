import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import ProgrammeCard from '../components/ProgrammeCard';
import {
  FiBookOpen,
  FiCompass,
  FiCheckCircle,
  FiAward,
  FiActivity,
  FiLayers,
  FiCpu,
  FiGlobe,
  FiArrowRight
} from 'react-icons/fi';

const Academics = ({ onOpenAdmissions }) => {
  const { activeProgrammes } = useSite();
  const [selectedWing, setSelectedWing] = useState('all');

  const subjects = [
    { name: 'English Language & Phonics', desc: 'Jolly Phonics foundation, grammar mastery, creative essay writing, and public elocution.' },
    { name: 'Mathematics & Vedic Math', desc: 'Conceptual number sense, spatial geometry, logical reasoning, and rapid mental calculation techniques.' },
    { name: 'General & Experiential Science', desc: 'Hands-on biology specimens, physics experiments, eco-sustainability, and scientific reasoning.' },
    { name: 'Social Studies & World History', desc: 'Civic awareness, geography, Indian heritage, and global cultural appreciation.' },
    { name: 'Tamil & Hindi Languages', desc: 'Classical literature, grammatical fluency, poetry recitation, and bilingual composition.' },
    { name: 'Computer Coding & Robotics', desc: 'Scratch block coding, Python fundamentals, logic gates, and hardware robotics interfacing.' }
  ];

  const filteredProgrammes =
    selectedWing === 'all'
      ? activeProgrammes
      : activeProgrammes.filter((p) => p.id.includes(selectedWing));

  return (
    <div className="academics-page-wrapper">
      {/* Page Header */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiBookOpen /> ACADEMIC EXCELLENCE
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Curriculum, Pedagogy & Learning Wings
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            Empowering students with strong conceptual foundations, critical inquiry, digital literacy, and trilingual fluency from Nursery through Grade 8.
          </p>
        </div>
      </section>

      {/* Academic Programmes Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Academic Framework"
            title="Our Learning Pathways"
            subtitle="Explore our age-appropriate academic wings tailored for foundational discovery and secondary mastery."
          />

          <div className="row g-4 mb-5">
            {filteredProgrammes.map((prog) => (
              <div key={prog.id} className="col-md-6 col-lg-3">
                <ProgrammeCard programme={prog} />
              </div>
            ))}
          </div>

          {/* Curriculum Structure Highlight Grid */}
          <div className="p-4 p-md-5 rounded-4 bg-light-gradient border">
            <h3 className="fw-bold text-navy mb-4 text-center">Core Academic Disciplines</h3>
            <div className="row g-4">
              {subjects.map((sub, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="p-3 bg-white rounded-3 border h-100 shadow-sm">
                    <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-2">
                      <FiCheckCircle className="text-gold" />
                      <span>{sub.name}</span>
                    </div>
                    <p className="text-muted small mb-0">{sub.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pedagogical Approach 4 Pillars */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Teaching Methodology"
            title="The KKK Pedagogical Philosophy"
            subtitle="How we make learning vibrant, engaging, and memorable every day."
          />

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white text-center">
                <div className="feature-icon-wrapper bg-primary-soft text-primary mx-auto mb-3">
                  <FiCompass size={28} />
                </div>
                <h5 className="fw-bold text-navy mb-2">Inquiry-Led Discovery</h5>
                <p className="text-muted small mb-0">
                  Encouraging children to ask "why" and "how" through experiential classroom questions and lab experiments.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white text-center">
                <div className="feature-icon-wrapper bg-warning-soft text-warning mx-auto mb-3">
                  <FiCpu size={28} />
                </div>
                <h5 className="fw-bold text-navy mb-2">Smart Digital Integration</h5>
                <p className="text-muted small mb-0">
                  Interactive digital panels, 3D educational visualizations, and early coding modules.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white text-center">
                <div className="feature-icon-wrapper bg-success-soft text-success mx-auto mb-3">
                  <FiGlobe size={28} />
                </div>
                <h5 className="fw-bold text-navy mb-2">Trilingual Mastery</h5>
                <p className="text-muted small mb-0">
                  Immersive English fluency balanced with native Tamil literary pride and Hindi national literacy.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white text-center">
                <div className="feature-icon-wrapper bg-danger-soft text-danger mx-auto mb-3">
                  <FiActivity size={28} />
                </div>
                <h5 className="fw-bold text-navy mb-2">Continuous Assessment</h5>
                <p className="text-muted small mb-0">
                  Formative diagnostics, weekly milestone reviews, and non-stressful diagnostic evaluations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment System & Continuous Evaluation */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2">
                ASSESSMENT FRAMEWORK
              </span>
              <h2 className="fw-bold text-navy mb-3">Continuous & Comprehensive Evaluation (CCE)</h2>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                Our evaluation system is designed to identify every child’s strengths rather than simply assign letter grades. We assess scholastic progress alongside co-scholastic growth including public speaking, team spirit, sportsmanship, and creative arts.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-2.5 text-muted small">
                <li className="d-flex align-items-center gap-2">
                  <FiCheckCircle className="text-success" size={17} />
                  <span><strong>Formative Diagnostic Checks:</strong> Regular oral and written classroom reflections.</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <FiCheckCircle className="text-success" size={17} />
                  <span><strong>Periodic Term Assessments:</strong> Summative examinations with structured remedial support.</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <FiCheckCircle className="text-success" size={17} />
                  <span><strong>Student Portfolio Tracking:</strong> Maintained records of science projects, art collections, and sports.</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="p-4 p-md-5 rounded-4 bg-navy text-white shadow-xl">
                <h4 className="fw-bold text-gold mb-3">Academic Calendar Overview 2026–27</h4>
                <div className="d-flex flex-column gap-3 text-white-80 small">
                  <div className="d-flex justify-content-between pb-2 border-bottom border-white-15">
                    <span>Term 1 Session Commences</span>
                    <strong className="text-white">June 2026</strong>
                  </div>
                  <div className="d-flex justify-content-between pb-2 border-bottom border-white-15">
                    <span>Mid-Term Diagnostic Exams</span>
                    <strong className="text-white">September 2026</strong>
                  </div>
                  <div className="d-flex justify-content-between pb-2 border-bottom border-white-15">
                    <span>Annual Science & Tech Fair</span>
                    <strong className="text-white">November 2026</strong>
                  </div>
                  <div className="d-flex justify-content-between pb-2 border-bottom border-white-15">
                    <span>Annual Sports & Arts Meet</span>
                    <strong className="text-white">December 2026 / January 2027</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Annual Board & Final Evaluations</span>
                    <strong className="text-white">March / April 2027</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="py-5 bg-navy text-white text-center">
        <div className="container py-3">
          <h3 className="fw-bold text-white mb-2">Enroll Your Child in KKK N&P School Today</h3>
          <p className="text-white-75 mb-4">Limited seats available for Pre-KG, LKG, UKG, and primary grades.</p>
          <button
            onClick={onOpenAdmissions}
            className="btn btn-gold rounded-pill px-5 py-2.5 fw-bold shadow-lg"
          >
            Submit Admission Inquiry
          </button>
        </div>
      </section>
    </div>
  );
};

export default Academics;
