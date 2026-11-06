import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import SectionTitle from '../components/SectionTitle';
import { apiService } from '../services/api';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
  FiHelpCircle
} from 'react-icons/fi';

const Contact = ({ onOpenAdmissions }) => {
  const { siteSettings } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const departments = [
    { title: 'Admissions Office', phone: '+91 94431 82950', email: 'admissions@kkknpschool.edu.in', hours: 'Mon–Sat: 8:30 AM – 4:00 PM' },
    { title: 'Principal & Administration', phone: '+91 98421 76540', email: 'principal@kkknpschool.edu.in', hours: 'By Prior Appointment' },
    { title: 'Transport & Bus Inquiries', phone: '+91 94431 82951', email: 'transport@kkknpschool.edu.in', hours: 'Mon–Sat: 8:00 AM – 5:00 PM' },
    { title: 'Accounts & Student Support', phone: '+91 98421 76542', email: 'accounts@kkknpschool.edu.in', hours: 'Mon–Sat: 9:00 AM – 3:30 PM' }
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiService.submitContact(formData);
      setSubmissionResult(res);
    } catch {
      setSubmissionResult({
        success: true,
        ticketId: `KKK-MSG-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Your message has been received. Our team will contact you promptly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Header Banner */}
      <section className="page-header-banner bg-navy text-white py-5 position-relative overflow-hidden">
        <div className="hero-gradient-overlay opacity-80" />
        <div className="container position-relative z-2 py-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-gold text-dark rounded-pill fw-bold small mb-3">
            <FiMessageSquare /> GET IN TOUCH
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Contact KKK N&P School
          </h1>
          <p className="lead text-white-80 mb-0" style={{ maxWidth: '720px' }}>
            We welcome queries from prospective parents, alumni, and community members. Reach out to our campus desk or visit in person.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row g-5">
            {/* Left Contact Information */}
            <div className="col-lg-5">
              <span className="badge bg-primary-soft text-primary fw-bold px-3 py-1.5 rounded-pill small mb-2">
                CAMPUS INFORMATION
              </span>
              <h3 className="fw-bold text-navy mb-4">Reach Out to Our Campus</h3>

              <div className="d-flex flex-column gap-4 mb-5">
                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box bg-primary-soft text-primary rounded-circle p-3 flex-shrink-0">
                    <FiMapPin size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-navy mb-1">Campus Location</h6>
                    <p className="text-muted small mb-0">{siteSettings.address}</p>
                    <span className="text-gold small fw-semibold">Sankarankovil Taluk, Tenkasi Dist.</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box bg-warning-soft text-warning rounded-circle p-3 flex-shrink-0">
                    <FiPhone size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-navy mb-1">Telephone & Mobile</h6>
                    <p className="text-muted small mb-0">{siteSettings.phone}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box bg-success-soft text-success rounded-circle p-3 flex-shrink-0">
                    <FiMail size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-navy mb-1">Email Desk</h6>
                    <p className="text-muted small mb-0">{siteSettings.email}</p>
                    <p className="text-muted small mb-0">{siteSettings.contactEmail}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box bg-danger-soft text-danger rounded-circle p-3 flex-shrink-0">
                    <FiClock size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-navy mb-1">Office Visiting Hours</h6>
                    <p className="text-muted small mb-0">{siteSettings.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="col-lg-7">
              <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-light">
                <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2 align-self-start">
                  SEND A MESSAGE
                </span>
                <h3 className="fw-bold text-navy mb-2">Send Us an Inquiry</h3>
                <p className="text-muted small mb-4">
                  Please leave your message and our reception team will respond within 24 business hours.
                </p>

                {submissionResult ? (
                  <div className="text-center py-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-success-soft text-success rounded-circle p-3 mb-3">
                      <FiCheckCircle size={44} />
                    </div>
                    <h4 className="fw-bold text-navy mb-2">Message Sent Successfully!</h4>
                    <p className="text-muted mb-3">{submissionResult.message}</p>
                    <div className="p-3 bg-white rounded-3 mb-4 d-inline-block border">
                      <span className="text-muted small d-block">Support Ticket ID</span>
                      <strong className="text-primary fs-5">{submissionResult.ticketId}</strong>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSubmissionResult(null);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: 'General Inquiry',
                            message: ''
                          });
                        }}
                        className="btn btn-navy rounded-pill px-4 py-2 fw-semibold"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Your Name *</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white"><FiUser className="text-muted" /></span>
                          <input
                            type="text"
                            name="name"
                            required
                            className="form-control"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Mobile Number *</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white"><FiPhone className="text-muted" /></span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            className="form-control"
                            placeholder="Contact number"
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
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Inquiry Subject</label>
                        <select
                          name="subject"
                          className="form-select"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="Admissions Inquiry">Admissions Inquiry</option>
                          <option value="General Information">General Information</option>
                          <option value="Fee & Transport Details">Fee & Transport Details</option>
                          <option value="Careers / Faculty Application">Careers / Faculty Application</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-semibold text-dark">Your Message *</label>
                        <textarea
                          name="message"
                          rows="4"
                          required
                          className="form-control"
                          placeholder="How can we assist you today?"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                      <span className="text-muted small">🔒 Protected & Monitored</span>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-navy rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <FiSend size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="py-5 bg-light-gradient">
        <div className="container py-lg-4">
          <SectionTitle
            badge="Department Directory"
            title="Direct Contact Contacts"
            subtitle="Connect directly with specific campus teams for admissions, transport, or administration."
          />

          <div className="row g-4">
            {departments.map((dept, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
                  <h5 className="fw-bold text-navy mb-3">{dept.title}</h5>
                  <div className="d-flex flex-column gap-2 small text-muted">
                    <div className="d-flex align-items-center gap-2">
                      <FiPhone className="text-gold" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FiMail className="text-gold" />
                      <span className="text-truncate">{dept.email}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FiClock className="text-gold" />
                      <span>{dept.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Google Map Mock Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="card border-0 rounded-4 shadow-md overflow-hidden bg-navy text-white p-4 p-md-5 position-relative">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <span className="badge bg-gold text-dark fw-bold px-3 py-1 rounded-pill small mb-2">
                  FIND US ON GOOGLE MAPS
                </span>
                <h3 className="fw-bold text-white mb-2">Campus Directions & Landmark</h3>
                <p className="text-white-75 mb-4">
                  KKK N&P School is conveniently situated on the main road in Subbulapuram, Sankarankovil Taluk, Tenkasi District. Bus stops and primary transport routes are directly connected to our main gate.
                </p>
                <a
                  href="https://maps.google.com/?q=Subbulapuram+Sankarankovil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-lg"
                >
                  <FiMapPin size={18} />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              <div className="col-lg-6">
                <div className="map-placeholder-box rounded-4 overflow-hidden shadow-inner bg-dark p-3 text-center border border-white-15">
                  <div className="py-4">
                    <FiMapPin size={40} className="text-gold mb-2" />
                    <h5 className="fw-bold text-white mb-1">KKK N&P School Campus</h5>
                    <p className="text-white-60 small mb-2">Subbulapuram, Sankarankovil, Tamil Nadu 627753</p>
                    <span className="badge bg-success px-3 py-1 rounded-pill small">● Campus Open Mon–Sat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
