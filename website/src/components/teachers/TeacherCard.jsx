import React from "react";
import { BookOpen, Award, GraduationCap, ChevronRight, User } from "lucide-react";

const TeacherCard = ({ teacher, onSelect }) => {
  return (
    <div className="teacher-card">
      <div className="teacher-img-wrap">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="teacher-img"
          loading="lazy"
        />
        {teacher.isPlaceholder && (
          <div className="teacher-placeholder-badge">
            Demo Faculty
          </div>
        )}
        <div className="teacher-grade-tag">
          {teacher.gradeLevel}
        </div>
      </div>

      <div className="teacher-body">
        <h4 className="teacher-name">{teacher.name}</h4>
        <div className="teacher-designation">{teacher.designation}</div>

        <div className="teacher-subject">
          <BookOpen size={15} className="text-primary" />
          <span>{teacher.subject}</span>
        </div>

        <p className="teacher-intro">
          "{teacher.shortIntro}"
        </p>

        <div className="teacher-footer">
          <span className="small text-muted d-flex align-items-center gap-1">
            <Award size={14} className="text-warning" />
            {teacher.experience}
          </span>

          <button
            type="button"
            className="btn-outline-school py-1 px-3 small"
            onClick={() => onSelect(teacher)}
            aria-label={`View full profile of ${teacher.name}`}
          >
            <span>View Profile</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
