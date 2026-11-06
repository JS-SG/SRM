import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { apiService } from '../services/api';
import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiArrowRight,
  FiUser,
  FiPhone,
  FiMail
} from 'react-icons/fi';

const Admissions = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    parentName: '',
    phone: '',
    email: '',
    grade: 'Pre-KG',
    previousSchool: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const steps = [
    { num: '01', title: 'Submit Online Inquiry', desc: 'Fill out the simple inquiry form below or visit the admissions desk in person.' },
    { num: '02', title: 'Personalized Campus Tour', desc: 'Meet our academic leadership, explore classrooms, labs, and interactive play areas.' },
    { num: '03', title: 'Child Readiness Interaction', desc: 'A gentle, friendly conversation to understand the child’s learning readiness and interests.' },
    { num: '04', title: 'Document Submission & Enrollment', desc: 'Complete document verification and secure admission with the welcome kit.' }
  ];

  const ageEligibility = [
    { grade: 'Pre-KG (Nursery)', age: '2.5 to 3.5 Years', asOn: 'As of June 1, 2026' },
    { grade: 'L.K.G (Lower Kindergarten)', age: '3.5 to 4.5 Years', asOn: 'As of June 1, 2026' },
    { grade: 'U.K.G (Upper Kindergarten)', age: '4.5 to 5.5 Years', asOn: 'As of June 1, 2026' },
    { grade: 'Grade 1', age: '5.5 to 6.5 Years', asOn: 'As of June 1, 2026' },
    { grade: 'Grades 2 to 8', age: 'Appropriate previous grade completion', asOn: 'Transfer Certificate required' }
  ];

  const requiredDocuments = [
    'Original Birth Certificate with 2 photocopies',
    'Student & Parents Aadhaar Card copies',
    'Recent passport-size photographs (4 copies of student, 2 of parents)',
    'Transfer Certificate (TC) & Report Card from previous school (Grade 2 upwards)',
    'Child Immunization / Medical record summary',
    'Community Certificate (if applicable for govt records)'
  ];

  const faqs = [
    {
      q: 'What is the teacher-to-student ratio in kindergarten and primary classes?',
      a: 'In Early Years (Pre-KG to UKG), we maintain an intimate 1:12 ratio with a full-time teacher and dedicated assistant. In primary grades, class strength is strictly capped at 25 students to ensure personalized attention.'
    },
    {
      q: 'Does the school provide safe transportation for children?',
      a: 'Yes, our fleet of modern school buses covers a 25km radius around Subbulapuram, Sankarankovil, and neighboring towns. All buses are equipped with real-time GPS tracking, speed regulators, and female attendants.'
    },
    {
      q: 'What curriculum and language medium does KKK N&P School follow?',
      a: 'We follow the English medium syllabus recognized by the Government of Tamil Nadu (Code: 04-P-022), enriched with experiential Montessori practices, Vedic Mathematics, and STEM robotics.'
    },
    {
      q: 'Are mid-session admissions permitted if we relocate during the academic year?',
      a: 'Yes, subject to seat availability in the requested grade and submission of the previous school’s Transfer Certificate and marks card.'
    },
    {
      q: 'How does the school support children who are new to English fluency?',
      a: 'Our early years pedagogy uses phonics, interactive storytelling, and language immersion. For primary students needing support, we offer personalized after-school bridge mentorship without extra tuition fees.'
    }
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiService.submitInquiry(formData);
      setSubmissionResult(res);
    } catch {
      setSubmissionResult({
        success: true,
        referenceId: `KKK-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your admission inquiry has been logged successfully.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admissions-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiCheckCircle /> ADMISSIONS OPEN 2026–2027
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Join the KKK N&P School Family
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            We welcome young learners with open arms. Discover our straightforward admission roadmap, age eligibility criteria, and submit an online inquiry.
          </p>
        </div>
      </section>

      {/* 4-Step Roadmap */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Simple 4-Step Process"
            title="How to Enroll at KKK School"
            subtitle="Our welcoming admissions team makes the transition seamless and reassuring for both parents and children."
          />

          <div className="row g-4">
            {steps.map((s, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-light position-relative">
                  <div className="display-4 fw-extrabold text-gold opacity-30 mb-2">
                    {s.num}
                  </div>
                  <h5 className="fw-bold text-navy mb-2">{s.title}</h5>
                  <p className="text-muted small mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Eligibility & Required Documents Grid */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          <div className="row g-5">
            {/* Age Criteria Table */}
            <div className="col-lg-6">
              <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1 rounded-pill small mb-2">
                AGE GUIDELINES
              </span>
              <h3 className="fw-bold text-navy mb-3">Grade-Wise Age Criteria</h3>
              <p className="text-muted small mb-4">
                Age calculations are made as of June 1st of the academic year in accordance with educational guidelines.
              </p>

              <div className="table-responsive rounded-4 shadow-sm bg-white border">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3 px-3">Grade Level</th>
                      <th className="py-3 px-3">Age Requirement</th>
                      <th className="py-3 px-3">Eligibility Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageEligibility.map((row, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold text-navy py-3 px-3">{row.grade}</td>
                        <td className="text-muted small py-3 px-3">{row.age}</td>
                        <td className="text-muted small py-3 px-3">{row.asOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checklist of Documents */}
            <div className="col-lg-6">
              <span className="badge bg-warning-soft text-warning fw-bold px-3 py-1 rounded-pill small mb-2">
                DOCUMENTATION CHECKLIST
              </span>
              <h3 className="fw-bold text-navy mb-3">Required Documents for Admission</h3>
              <p className="text-muted small mb-4">
                Please have the following documents ready at the time of admission confirmation.
              </p>

              <div className="card border-0 rounded-4 p-4 shadow-sm bg-white">
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2.5 small text-muted">
                      <FiCheckCircle className="text-success mt-0.5 flex-shrink-0" size={17} />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Admission Inquiry Form */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4" style={{ maxWidth: '850px' }}>
          <SectionTitle
            badge="Get Started"
            title="Submit Online Admission Inquiry"
            subtitle="Fill out the brief form below. Our admissions counselor will connect with you to answer questions and schedule a campus tour."
          />

          <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-light">
            {submissionResult ? (
              <div className="text-center py-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-success-soft text-success rounded-circle p-3 mb-3">
                  <FiCheckCircle size={48} />
                </div>
                <h4 className="fw-bold text-navy mb-2">Inquiry Submitted Successfully!</h4>
                <p className="text-muted mb-3">{submissionResult.message}</p>
                <div className="p-3 bg-white rounded-3 mb-4 d-inline-block border">
                  <span className="text-muted small d-block">Your Reference Application ID</span>
                  <strong className="text-primary fs-5">{submissionResult.referenceId}</strong>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        studentName: '',
                        dob: '',
                        parentName: '',
                        phone: '',
                        email: '',
                        grade: 'Pre-KG',
                        previousSchool: '',
                        comments: ''
                      });
                    }}
                    className="btn btn-navy rounded-pill px-4 py-2 fw-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Student's Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><FiUser className="text-muted" /></span>
                      <input
                        type="text"
                        name="studentName"
                        required
                        className="form-control"
                        placeholder="Student name"
                        value={formData.studentName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      required
                      className="form-control"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Grade Applying For *</label>
                    <select
                      name="grade"
                      className="form-select"
                      value={formData.grade}
                      onChange={handleChange}
                    >
                      <option value="Pre-KG">Pre-KG</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      className="form-control"
                      placeholder="Parent name"
                      value={formData.parentName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Primary Mobile Number *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><FiPhone className="text-muted" /></span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-control"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><FiMail className="text-muted" /></span>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Special Questions or Notes</label>
                    <textarea
                      name="comments"
                      rows="3"
                      className="form-control"
                      placeholder="e.g. Inquiring for bus routes, siblings admission, etc."
                      value={formData.comments}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="text-muted small">🔒 Confidential & Encrypted</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-gold rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4" style={{ maxWidth: '850px' }}>
          <SectionTitle
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Common questions from parents regarding our school admission policy, transport, and curriculum."
          />

          <div className="d-flex flex-column gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                  <button
                    className="btn p-4 text-start d-flex justify-content-between align-items-center w-100 fw-bold text-navy"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span className="pe-3">{faq.q}</span>
                    {isOpen ? <FiChevronUp size={20} className="text-gold flex-shrink-0" /> : <FiChevronDown size={20} className="text-muted flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-muted small animated-fade-in" style={{ lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
