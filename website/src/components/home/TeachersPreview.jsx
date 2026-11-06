import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { teachersData } from "../../data/teachers";
import TeacherCard from "../teachers/TeacherCard";
import TeacherDrawer from "../teachers/TeacherDrawer";

const TeachersPreview = ({ limit = 3, showViewAll = true }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const displayedTeachers = limit ? teachersData.slice(0, limit) : teachersData;

  return (
    <section className="py-5" style={{ background: "#ffffff" }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-eyebrow">
            <GraduationCap size={16} />
            Dedicated Educators
          </span>
          <h2 className="section-heading">Meet Our Teachers</h2>
          <p className="section-description">
            Caring, qualified primary educators dedicated to creating an engaging, supportive, and disciplined learning environment.
          </p>
        </div>

        {/* Note on demo records */}
        <div className="alert alert-light border d-flex align-items-center gap-2 mb-4 max-w-2xl mx-auto small text-muted">
          <AlertCircle size={18} className="text-warning flex-shrink-0" />
          <span>
            <strong>Faculty Directory Notice:</strong> Teacher profiles displayed are demo/placeholder structures formatted for straightforward replacement with official staff records.
          </span>
        </div>

        {/* Teachers Grid */}
        <div className="row g-4 justify-content-center">
          {displayedTeachers.map((teacher) => (
            <div key={teacher.id} className="col-lg-4 col-md-6">
              <TeacherCard
                teacher={teacher}
                onSelect={(t) => setSelectedTeacher(t)}
              />
            </div>
          ))}
        </div>

        {/* View Full Faculty Directory */}
        {showViewAll && (
          <div className="text-center mt-5">
            <Link to="/teachers" className="btn-primary-school">
              <span>View All Faculty Members &amp; Profiles</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Side-Sliding Teacher Drawer */}
      <TeacherDrawer
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </section>
  );
};

export default TeachersPreview;
