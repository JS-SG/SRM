import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  School,
  BookOpen,
  Laptop,
  Activity,
  Droplets,
  Users,
  Zap,
  UserCheck,
  Archive,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { schoolData } from "../data/schoolData";
import FacilitiesOverview from "../components/home/FacilitiesOverview";
import SchoolStats from "../components/home/SchoolStats";

const facilityCategories = ["All", "Academic", "Technology", "Hygiene", "Administration", "Recreation", "Infrastructure", "Accessibility"];

const Facilities = ({ onOpenAdmissions }) => {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredFacilities = selectedCat === "All"
    ? schoolData.facilities
    : schoolData.facilities.filter((f) => f.category === selectedCat);

  return (
    <div className="facilities-page-wrapper">
      {/* Hero Header */}
      <section className="py-5" style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)" }}>
        <div className="container py-3">
          <div className="row align-items-center gy-4">
            <div className="col-lg-8">
              <span className="section-eyebrow">
                <School size={16} />
                Campus Infrastructure
              </span>
              <h1 className="display-5 fw-bold text-navy mb-3">
                School Facilities &amp; Campus Resources
              </h1>
              <p className="lead fs-6 text-muted mb-0">
                Discover the academic, recreational, and hygiene amenities provided at {schoolData.name} designed to support joyful primary learning.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                type="button"
                onClick={onOpenAdmissions}
                className="btn-primary-school"
              >
                <span>Admissions 2026–27</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid with Category Filter */}
      <section className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="filter-tabs-wrapper mb-4">
            {facilityCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-tab-btn ${selectedCat === cat ? "active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Render All Filtered Facility Cards */}
          <div className="row g-4">
            {filteredFacilities.map((facility) => (
              <div key={facility.id} className="col-lg-4 col-md-6">
                <div className="facility-card">
                  <div className="facility-header">
                    <span className="badge-custom badge-primary-soft">
                      {facility.badge}
                    </span>
                    <span className="facility-status-pill">
                      <span className="dot"></span>
                      <span>{facility.status}</span>
                    </span>
                  </div>

                  <h3 className="facility-title">{facility.title}</h3>
                  <p className="facility-desc">{facility.description}</p>

                  <div className="facility-footer">
                    <span className="text-muted small fw-semibold">
                      Count / Capacity: <strong>{facility.count}</strong>
                    </span>
                    <span className="badge bg-light text-dark small border">
                      {facility.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counters */}
      <SchoolStats />

      {/* Comprehensive Official Infrastructure Audit Table */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="section-title-wrap text-start max-w-full mb-4">
            <span className="section-eyebrow">
              <ShieldCheck size={16} />
              Verified Audit Data
            </span>
            <h2 className="section-heading">Detailed Infrastructure Audit Table</h2>
            <p className="section-description">
              Strict factual status of all campus utilities, accessibility, and administrative provisions.
            </p>
          </div>

          <div className="table-responsive shadow-sm rounded-4 border">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary text-navy">
                <tr>
                  <th scope="col" className="py-3 px-4">Infrastructure Element</th>
                  <th scope="col" className="py-3">Official Record / Count</th>
                  <th scope="col" className="py-3">Operational Status</th>
                  <th scope="col" className="py-3 px-4">Verification Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 fw-bold">Instructional Classrooms</td>
                  <td>8 Classrooms</td>
                  <td><span className="badge bg-success">Good Condition</span></td>
                  <td className="px-4 text-muted small">All 8 rooms used for active teaching</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">School Library</td>
                  <td>125 Books</td>
                  <td><span className="badge bg-success">Available &amp; Active</span></td>
                  <td className="px-4 text-muted small">Promoting foundational English &amp; Tamil reading</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Computers for Learning</td>
                  <td>1 Computer</td>
                  <td><span className="badge bg-success">Functional</span></td>
                  <td className="px-4 text-muted small">Utilized for teacher demonstrations &amp; basic awareness</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Non-Teaching Rooms</td>
                  <td>2 Rooms</td>
                  <td><span className="badge bg-success">Available</span></td>
                  <td className="px-4 text-muted small">Activity and administration workspace</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Head Master / Teacher Office</td>
                  <td>1 Separate Room</td>
                  <td><span className="badge bg-success">Available</span></td>
                  <td className="px-4 text-muted small">Dedicated room for leadership and parent consultation</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Drinking Water Supply</td>
                  <td>Tap Water</td>
                  <td><span className="badge bg-success">Functional</span></td>
                  <td className="px-4 text-muted small">Safe and continuous water access for students</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Boys Sanitation / Toilet</td>
                  <td>1 Toilet Unit</td>
                  <td><span className="badge bg-success">Functional</span></td>
                  <td className="px-4 text-muted small">Maintained with regular sanitation</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Girls Sanitation / Toilet</td>
                  <td>1 Toilet Unit</td>
                  <td><span className="badge bg-success">Functional</span></td>
                  <td className="px-4 text-muted small">Separate, dedicated girl student unit</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Electricity Connection</td>
                  <td>Grid Power</td>
                  <td><span className="badge bg-success">Available &amp; Functional</span></td>
                  <td className="px-4 text-muted small">Classroom lighting and fan circulation</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Playground &amp; Sports Area</td>
                  <td>Open Playground</td>
                  <td><span className="badge bg-success">Available</span></td>
                  <td className="px-4 text-muted small">Outdoor activities, morning physical training &amp; games</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Campus Access Road</td>
                  <td>All-Weather Road</td>
                  <td><span className="badge bg-success">Accessible</span></td>
                  <td className="px-4 text-muted small">Direct vehicular access in all seasons</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Boundary Wall</td>
                  <td>No Boundary Wall</td>
                  <td><span className="badge bg-secondary">Not Available</span></td>
                  <td className="px-4 text-muted small">Campus situated in open rural environment</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Computer Aided Learning Lab</td>
                  <td>CAL Lab</td>
                  <td><span className="badge bg-secondary">Not Available</span></td>
                  <td className="px-4 text-muted small">Instructional computer utilized in classroom setting</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Mid-Day Meal Scheme</td>
                  <td>Meal Scheme</td>
                  <td><span className="badge bg-secondary">Not Provided</span></td>
                  <td className="px-4 text-muted small">Students bring meals from home</td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Disability Access Ramp</td>
                  <td>Ramp</td>
                  <td><span className="badge bg-info text-dark">Not Needed</span></td>
                  <td className="px-4 text-muted small">School does not require ramp for classroom entry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
