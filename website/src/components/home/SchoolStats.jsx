import React from "react";
import { DoorOpen, BookOpen, Monitor, LayoutGrid, Award, CheckCircle } from "lucide-react";
import AnimatedCounter from "../common/AnimatedCounter";
import { schoolData } from "../../data/schoolData";

const iconMap = {
  DoorOpen: DoorOpen,
  BookOpen: BookOpen,
  Monitor: Monitor,
  LayoutGrid: LayoutGrid,
  Award: Award
};

const SchoolStats = () => {
  return (
    <section className="stats-section-wrap">
      <div className="stats-pattern-overlay"></div>

      <div className="container position-relative">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom bg-warning bg-opacity-25 text-warning mb-2">
            Verified School Statistics
          </span>
          <h2 className="text-white fw-bold display-6">
            Our Infrastructure at a Glance
          </h2>
          <p className="text-white-50 mb-0">
            Factual infrastructure metrics and teaching resources strictly recorded for {schoolData.name}.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="row g-4 justify-content-center">
          {schoolData.statistics.map((stat) => {
            const IconComp = iconMap[stat.icon] || DoorOpen;
            return (
              <div key={stat.id} className="col-lg col-md-4 col-sm-6">
                <div className="stat-box-card">
                  <div className="stat-icon-wrapper">
                    <IconComp size={24} />
                  </div>

                  <div>
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1400}
                    />
                  </div>

                  <h4 className="stat-title">{stat.label}</h4>
                  <p className="stat-subtext">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Commitment Ribbon */}
        <div className="mt-5 text-center">
          <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-3 p-3 rounded-pill bg-white bg-opacity-10 text-white small border border-white border-opacity-10 px-4">
            <span className="d-flex align-items-center gap-1 text-warning">
              <CheckCircle size={16} /> All 8 Classrooms in Good Condition
            </span>
            <span className="text-white-50">•</span>
            <span className="d-flex align-items-center gap-1 text-info">
              <CheckCircle size={16} /> Functional Tap Drinking Water
            </span>
            <span className="text-white-50">•</span>
            <span className="d-flex align-items-center gap-1 text-success">
              <CheckCircle size={16} /> Separate Boys &amp; Girls Toilets
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolStats;
