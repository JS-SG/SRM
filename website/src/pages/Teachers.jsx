import React, { useState } from "react";
import { GraduationCap, Search, Filter, AlertCircle, BookOpen } from "lucide-react";
import { teachersData } from "../data/teachers";
import TeacherCard from "../components/teachers/TeacherCard";
import TeacherDrawer from "../components/teachers/TeacherDrawer";
import { schoolData } from "../data/schoolData";

const departments = [
  "All",
  "Primary Section",
  "Pre-Primary Section",
  "Languages Section",
  "Technology & Activities",
  "Physical Education"
];

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesDept =
      activeDepartment === "All" || teacher.department === activeDepartment;
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="teachers-page-wrapper">
      {/* Hero Header */}
      <section className="py-5" style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)" }}>
        <div className="container py-3">
          <div className="max-w-3xl">
            <span className="section-eyebrow">
              <GraduationCap size={16} />
              Primary Educators &amp; Faculty
            </span>
            <h1 className="display-5 fw-bold text-navy mb-3">
              Meet Our Teaching Faculty
            </h1>
            <p className="lead fs-6 text-muted mb-0">
              Experienced, passionate educators dedicated to nurturing young minds across foundational primary grades and pre-primary sections at {schoolData.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container">
          {/* Demo Notice Banner */}
          <div className="p-3 mb-4 rounded-3 border d-flex align-items-center gap-2" style={{ background: "#fffbeb", borderColor: "#fef3c7" }}>
            <AlertCircle size={20} className="text-warning flex-shrink-0" />
            <div className="small text-muted">
              <strong>Demo Faculty Directory:</strong> Faculty profiles displayed below are representative templates structured for future administrative record updates. Click <em>"View Profile"</em> on any card to explore the full side-drawer profile view.
            </div>
          </div>

          {/* Search & Department Filters */}
          <div className="row g-3 align-items-center justify-content-between mb-4">
            <div className="col-lg-6">
              <div className="filter-tabs-wrapper justify-content-start mb-0">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    className={`filter-tab-btn ${activeDepartment === dept ? "active" : ""}`}
                    onClick={() => setActiveDepartment(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by subject, name or grade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Teachers Cards Grid */}
          {filteredTeachers.length > 0 ? (
            <div className="row g-4">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="col-lg-4 col-md-6">
                  <TeacherCard
                    teacher={teacher}
                    onSelect={(t) => setSelectedTeacher(t)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 border">
              <BookOpen size={40} className="text-muted mb-2" />
              <h5 className="text-dark fw-bold">No Faculty Found</h5>
              <p className="text-muted small mb-3">Try adjusting your search query or department filter.</p>
              <button
                type="button"
                className="btn-outline-school py-2 px-3 small"
                onClick={() => {
                  setSearchQuery("");
                  setActiveDepartment("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Side-Sliding Teacher Profile Drawer */}
      <TeacherDrawer
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </div>
  );
};

export default Teachers;
