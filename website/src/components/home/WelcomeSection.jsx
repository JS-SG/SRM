import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Layers,
  Users,
  Languages,
  Baby,
  Building2,
  ArrowRight,
  ShieldCheck,
  MapPin
} from "lucide-react";
import { schoolData } from "../../data/schoolData";

const WelcomeSection = () => {
  const quickHighlights = [
    {
      label: "Established",
      value: "2007",
      desc: "Nurturing primary learners for over 19 years",
      icon: Calendar,
      color: "#0284c7",
      bg: "#e0f2fe"
    },
    {
      label: "Grades Offered",
      value: "1 – 5",
      desc: "Foundational primary standard curriculum",
      icon: Layers,
      color: "#f59e0b",
      bg: "#fef3c7"
    },
    {
      label: "School Type",
      value: "Co-educational",
      desc: "Equal learning opportunity for boys and girls",
      icon: Users,
      color: "#10b981",
      bg: "#d1fae5"
    },
    {
      label: "Medium",
      value: "English",
      desc: "English medium with Tamil language studies",
      icon: Languages,
      color: "#8b5cf6",
      bg: "#ede9fe"
    },
    {
      label: "Pre-primary",
      value: "Available",
      desc: "Attached kindergarten & foundational section",
      icon: Baby,
      color: "#ec4899",
      bg: "#fce7f3"
    },
    {
      label: "Management",
      value: "Pvt. Unaided",
      desc: "Dedicated private management & governance",
      icon: Building2,
      color: "#06b6d4",
      bg: "#cffafe"
    }
  ];

  return (
    <section className="py-5" style={{ background: "#ffffff" }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-eyebrow">
            <ShieldCheck size={16} />
            Institutional Overview
          </span>
          <h2 className="section-heading">
            Welcome to {schoolData.name}
          </h2>
          <p className="section-description">
            "{schoolData.name} was established in 2007 and is managed by the Pvt. Unaided. The school is located in a rural area of Sankarankovil block in Tirunelveli district of Tamil Nadu."
          </p>
        </div>

        {/* 6 Quick Highlight Cards Grid */}
        <div className="row g-4">
          {quickHighlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="welcome-card">
                  <div
                    className="welcome-icon-box"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <span className="welcome-card-label">{item.label}</span>
                  <h3 className="welcome-card-value">{item.value}</h3>
                  <p className="welcome-card-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Approachability & Session Banner */}
        <div className="mt-5 p-4 rounded-4 border" style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
          <div className="row align-items-center gy-3">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-1">
                <MapPin size={18} className="text-primary" />
                <h5 className="mb-0 fw-bold text-dark">Accessibility &amp; Academic Cycle</h5>
              </div>
              <p className="small text-muted mb-0">
                The school campus in Subbulapuram is approachable by an <strong>all-weather motorable road</strong>. In this school, the academic session starts in <strong>April</strong>, providing consistent foundational education in a disciplined, peaceful rural environment.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/about" className="btn-primary-school">
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
