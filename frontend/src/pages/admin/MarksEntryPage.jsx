import React, { useState, useEffect } from 'react';
import { markService } from '../../services/markService';
import { academicService } from '../../services/academicService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import MarksEntryGrid from '../../components/marks/MarksEntryGrid';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const MarksEntryPage = () => {
  const { classes, currentYear } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedExamId, setSelectedExamId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  const [matrixData, setMatrixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  useEffect(() => {
    academicService.getExams(currentYear?.id).then((res) => {
      const examList = res.data || [];
      setExams(examList);
      if (examList.length > 0 && !selectedExamId) {
        setSelectedExamId(examList[0].id);
      }
    }).catch(() => {});

    academicService.getSubjects().then((res) => {
      const subList = res.data || [];
      setSubjects(subList);
      if (subList.length > 0 && !selectedSubjectId) {
        setSelectedSubjectId(subList[0].id);
      }
    }).catch(() => {});
  }, [currentYear, selectedExamId, selectedSubjectId]);

  const fetchMatrix = async () => {
    if (!selectedClassId || !selectedExamId || !selectedSubjectId) return;
    setLoading(true);
    try {
      const res = await markService.getMatrix(selectedClassId, selectedExamId, selectedSubjectId);
      setMatrixData(res.data);
    } catch (err) {
      toastError(err.message || 'Failed to load marks matrix');
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
      toastError(err.message || 'Failed to save marks');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Examination Marks Entry & Grading"
        subtitle="Enter, validate, and compute terminal assessment marks across standards"
        breadcrumbs={[
          { label: 'Evaluation', path: '/admin/exams' },
          { label: 'Marks Entry', path: '/admin/marks' },
        ]}
      />

      {/* Control Selector Bar */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label small fw-semibold">1. Select Class & Section</label>
            <select
              className="form-select form-select-sm"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  Class {c.class_name} ({c.standard?.name} - {c.division?.name})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-semibold">2. Select Examination</label>
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
            <label className="form-label small fw-semibold">3. Select Subject</label>
            <select
              className="form-select form-select-sm"
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading student roster and existing mark entries..." />
      ) : matrixData ? (
        <MarksEntryGrid matrixData={matrixData} onSave={handleSaveMarks} loading={saving} />
      ) : (
        <div className="card-custom p-5">
          <EmptyState
            icon="bi-table"
            title="Select Class, Exam, and Subject"
            description="Choose the target class, exam, and subject above to load the student grading matrix."
          />
        </div>
      )}
    </div>
  );
};

export default MarksEntryPage;
