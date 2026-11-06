import React from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import FacilityCard from '../components/FacilityCard';
import {
  FiTarget,
  FiEye,
  FiAward,
  FiCheckCircle,
  FiHeart
} from 'react-icons/fi';

const About = ({ onOpenAdmissions }) => {
  const { leadership, activeFacilities } = useSite();

  const milestones = [
    { year: '2007', title: 'Founding Year', desc: 'Inaugurated with 45 students in Subbulapuram to offer quality English-medium education.' },
    { year: '2012', title: 'Primary Wing Expansion', desc: 'Expanded infrastructure with dedicated science laboratories and sports activity grounds.' },
    { year: '2018', title: 'Smart Digital Classrooms', desc: 'Introduced 100% interactive digital smart boards and computerized literacy programs.' },
    { year: '2022', title: 'STEM & Robotics Hub', desc: 'Established innovation makerspace, solar power setup, and regional Olympiad excellence center.' },
    { year: '2026', title: 'Modern International Standard', desc: 'Continuous academic excellence with over 1,250+ students and 100% board success.' }
  ];

  return (
    <div className="about-page-wrapper">
      {/* Page Hero Header */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiAward /> ABOUT OUR SCHOOL
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Nurturing Tomorrow's Leaders Since 2007
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            K K Kumaran Nursery & Primary School delivers a blend of progressive child-centered learning, cultural grounding, and holistic personal growth in Subbulapuram.
          </p>
        </div>
      </section>

      {/* Legacy & History Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1.5 rounded-pill small mb-2">
                FOUNDER'S VISION & HERITAGE
              </span>
              <h2 className="fw-bold text-navy mb-3">Where Foundational Education Meets True Empathy</h2>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                Established in 2007 under government recognition (Code: 04-P-022), KKK N&P School was founded with a singular conviction: that rural and semi-urban children in the Sankarankovil taluk deserve foundational education on par with the premier international schools of metropolitan cities.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                Over the past nineteen years, our serene green campus in Subbulapuram has become a beacon of educational excellence, producing Olympiad rank holders, athletic champions, and compassionate young citizens.
              </p>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <strong className="text-navy d-block mb-1">Affiliation Code</strong>
                    <span className="text-muted small">04-P-022 (Govt. of Tamil Nadu)</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <strong className="text-navy d-block mb-1">Medium of Instruction</strong>
                    <span className="text-muted small">English Medium with Tamil & Hindi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                  alt="KKK School Campus Building"
                  className="rounded-4 shadow-xl w-100 object-fit-cover"
                  style={{ height: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values Tabs */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Guiding Principles"
            title="Our Vision, Mission & Core Values"
            subtitle="The foundational philosophies that inspire our educators and shape our everyday curriculum."
          />

          <div className="row g-4">
            {/* Vision Card */}
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
                <div className="feature-icon-wrapper bg-primary-soft text-primary mb-3">
                  <FiEye size={28} />
                </div>
                <h4 className="fw-bold text-navy mb-3">Our Vision</h4>
                <p className="text-muted" style={{ lineHeight: 1.7 }}>
                  To be an internationally recognized center of foundational primary education that inspires intellectual curiosity, moral fortitude, creative thinking, and a lifelong thirst for learning in every student.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
                <div className="feature-icon-wrapper bg-warning-soft text-warning mb-3">
                  <FiTarget size={28} />
                </div>
                <h4 className="fw-bold text-navy mb-3">Our Mission</h4>
                <p className="text-muted" style={{ lineHeight: 1.7 }}>
                  To provide a nurturing, safe, and technologically enriched environment where dedicated mentors deliver child-centric pedagogy, encouraging independent inquiry, communicative fluency, and ethical responsibility.
                </p>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
                <div className="feature-icon-wrapper bg-success-soft text-success mb-3">
                  <FiHeart size={28} />
                </div>
                <h4 className="fw-bold text-navy mb-3">Our 5 Core Values</h4>
                <ul className="list-unstyled d-flex flex-column gap-2 text-muted small mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> <strong>Integrity & Honesty</strong>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> <strong>Empathy & Compassion</strong>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> <strong>Excellence in Academics</strong>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> <strong>Respect for Cultural Heritage</strong>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> <strong>Continuous Curiosity & Innovation</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <SectionTitle
            badge="The Journey of Growth"
            title="School Milestones Timeline"
            subtitle="Tracing nineteen memorable years of academic distinction, infrastructure milestones, and community trust."
          />

          <div className="timeline-container position-relative mx-auto" style={{ maxWidth: '800px' }}>
            {milestones.map((m, idx) => (
              <div key={idx} className="timeline-item d-flex gap-4 mb-4">
                <div className="timeline-year-badge bg-navy text-gold fw-bold px-3 py-2 rounded-3 text-center flex-shrink-0" style={{ width: '90px' }}>
                  {m.year}
                </div>
                <div className="timeline-card p-4 rounded-4 bg-light border flex-grow-1">
                  <h5 className="fw-bold text-navy mb-1">{m.title}</h5>
                  <p className="text-muted small mb-0">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Principal Section */}
      {leadership && (
        <section id="leadership" className="py-5 bg-light-gradient">
          <div className="container py-lg-4">
            <div className="row align-items-center g-5">
              <div className="col-lg-5 text-center text-lg-start">
                <img
                  src={leadership.photo}
                  alt={leadership.name}
                  className="rounded-4 shadow-2xl object-fit-cover w-100"
                  style={{ maxHeight: '440px', maxWidth: '380px' }}
                />
              </div>
              <div className="col-lg-7">
                <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1.5 rounded-pill small mb-2">
                  ACADEMIC LEADERSHIP
                </span>
                <h2 className="fw-bold text-navy mb-3">Message from the Principal</h2>
                <div className="p-3.5 rounded-3 bg-white border-start border-4 border-gold shadow-sm mb-4">
                  <p className="fw-medium text-navy fst-italic mb-0">
                    "{leadership.shortQuote}"
                  </p>
                </div>
                <p className="text-muted mb-4" style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {leadership.fullMessage}
                </p>
                <div>
                  <h5 className="fw-bold text-navy mb-0">{leadership.name}</h5>
                  <span className="text-muted small">{leadership.qualifications}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Campus Facilities Showcase */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Campus Environment"
            title="Infrastructure Built for Excellence"
            subtitle="Explore our laboratories, libraries, smart learning theaters, and sports spaces."
          />

          <div className="row g-4">
            {activeFacilities.map((fac) => (
              <div key={fac.id} className="col-md-6 col-lg-4">
                <FacilityCard facility={fac} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Callout Banner */}
      <section className="py-5 bg-navy text-white text-center">
        <div className="container py-3">
          <h3 className="fw-bold text-white mb-2">Ready to Join the KKK School Family?</h3>
          <p className="text-white-75 mb-4">
            Our admissions counseling team is available to assist you with curriculum details, fee structure, and campus visits.
          </p>
          <button
            onClick={onOpenAdmissions}
            className="btn btn-gold rounded-pill px-5 py-2.5 fw-bold shadow-lg"
          >
            Apply for Admission 2026–2027
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
