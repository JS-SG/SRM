import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { markService } from '../../services/markService';
import { dashboardService } from '../../services/dashboardService';
import { academicService } from '../../services/academicService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import MarksEntryGrid from '../../components/marks/MarksEntryGrid';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const TeacherMarksPage = () => {
  const [searchParams] = useSearchParams();
  const { hasPermission } = useAuth();
  const { toastSuccess, toastError } = useToast();

  const canEditMarks = hasPermission(['MARKS_CREATE', 'MARKS_UPDATE']);

  const [assignedClasses, setAssignedClasses] = useState([]);
  const [exams, setExams] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState(searchParams.get('class_id') || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(searchParams.get('subject_id') || '');
  const [selectedExamId, setSelectedExamId] = useState('');

  const [matrixData, setMatrixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch teacher's authorized classes & subjects
    dashboardService.getMetrics().then((res) => {
      const assigns = res.data?.assigned_classes || [];
      setAssignedClasses(assigns);
      if (assigns.length > 0 && !selectedClassId) {
        setSelectedClassId(assigns[0].class_id);
        if (assigns[0].subject_id) {
          setSelectedSubjectId(assigns[0].subject_id);
        }
      }
    }).catch(() => {});

    academicService.getExams().then((res) => {
      const list = res.data || [];
      setExams(list);
      if (list.length > 0 && !selectedExamId) {
        setSelectedExamId(list[0].id);
      }
    }).catch(() => {});
  }, []);

  const fetchMatrix = async () => {
    if (!selectedClassId || !selectedExamId || !selectedSubjectId) return;
    setLoading(true);
    try {
      const res = await markService.getMatrix(selectedClassId, selectedExamId, selectedSubjectId);
      setMatrixData(res.data);
    } catch (err) {
      toastError(err.message || 'Scope Authorization Error: You cannot access this class/subject.');
      setMatrixData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId && selectedExamId && selectedSubjectId) {
      fetchMatrix();
    }
  }, [selectedClassId, selectedExamId, selectedSubjectId]);

  const handleSaveMarks = async (payload) => {
    setSaving(true);
    try {
      const res = await markService.saveMarks(payload);
      toastSuccess(res.message || 'Marks saved successfully!');
      fetchMatrix();
    } catch (err) {
      toastError(err.message || 'Scope Validation Error: Failed to save marks.');
    } finally {
      setSaving(false);
    }
  };

  // Distinct classes and subjects for this teacher
  const uniqueClasses = assignedClasses.reduce((acc, curr) => {
    if (!acc.some((c) => c.class_id === curr.class_id)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const eligibleSubjects = assignedClasses
    .filter((a) => a.class_id === parseInt(selectedClassId) && a.subject)
    .map((a) => a.subject);

  return (
    <div>
      <PageHeader
        title="Teacher Grading & Marks Entry"
        subtitle="Scoped examination marks entry restricted strictly to your assigned teaching sections"
        breadcrumbs={[
          { label: 'Teacher Space', path: '/teacher/dashboard' },
          { label: 'Marks Entry', path: '/teacher/marks' },
        ]}
      />

      {!canEditMarks && (
        <div className="alert alert-warning d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-eye-fill fs-5"></i>
          <div>
            <strong>View Only Mode:</strong> You have permission to view student marks, but you do not have permission to edit or submit marks changes.
          </div>
        </div>
      )}

      {/* Scoped Controls */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small fw-semibold">1. Your Assigned Class</label>
            <select
              className="form-select form-select-sm"
              value={selectedClassId}
              onChange={(e) => {
                const newCId = e.target.value;
                setSelectedClassId(newCId);
                const firstSub = assignedClasses.find((a) => a.class_id === parseInt(newCId) && a.subject);
                if (firstSub) setSelectedSubjectId(firstSub.subject_id);
              }}
            >
              {uniqueClasses.map((ac) => (
                <option key={ac.id} value={ac.class_id}>
                  Class {ac.class?.class_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-semibold">2. Examination</label>
            <select
              className="form-select form-select-sm"
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
            >
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} ({ex.exam_type})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-semibold">3. Authorized Subject</label>
            <select
              className="form-select form-select-sm"
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
            >
              {eligibleSubjects.length === 0 ? (
                <option value="">No subject assigned for this class</option>
              ) : (
                eligibleSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading marks matrix for your section..." />
      ) : matrixData ? (
        <MarksEntryGrid
          matrixData={matrixData}
          onSave={handleSaveMarks}
          loading={saving}
          readOnly={!canEditMarks}
        />
      ) : (
        <div className="card-custom p-5">
          <EmptyState
            icon="bi-journal-check"
            title="Ready to Enter Marks"
            description="Select class, exam, and subject to begin grading your students."
          />
        </div>
      )}
    </div>
  );
};

export default TeacherMarksPage;
