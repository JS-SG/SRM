import React, { useState, useEffect } from 'react';

export const MarksEntryGrid = ({
  matrixData,
  onSave,
  loading = false,
  readOnly = false,
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (matrixData?.students) {
      setRows(
        matrixData.students.map((st) => ({
          ...st,
          currentMarks: st.marks_obtained !== '' ? st.marks_obtained : '',
          currentRemarks: st.remarks || '',
          currentGrade: st.grade || '',
        }))
      );
    }
  }, [matrixData]);

  if (!matrixData || !matrixData.students) return null;

  const { subject, exam_id } = matrixData;
  const maxMarks = subject.max_marks || 100;
  const passMarks = subject.pass_marks || 35;

  const calculateGrade = (val) => {
    if (val === '' || isNaN(val)) return '';
    const num = parseFloat(val);
    const pct = (num / maxMarks) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 35) return 'D';
    return 'F';
  };

  const handleMarkChange = (idx, value) => {
    const newRows = [...rows];
    newRows[idx].currentMarks = value;
    newRows[idx].currentGrade = calculateGrade(value);
    setRows(newRows);
  };

  const handleRemarksChange = (idx, value) => {
    const newRows = [...rows];
    newRows[idx].currentRemarks = value;
    setRows(newRows);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    const payload = {
      class_id: matrixData.class.id,
      exam_id,
      subject_id: subject.id,
      marks_data: rows
        .filter((r) => r.currentMarks !== '')
        .map((r) => ({
          student_enrollment_id: r.student_enrollment_id,
          marks_obtained: parseFloat(r.currentMarks),
          max_marks: maxMarks,
          grade: r.currentGrade,
          remarks: r.currentRemarks,
        })),
    };
    onSave(payload);
  };

  return (
    <div className="card-custom">
      <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3">
          <div>
            <span className="text-muted small">Class:</span>{' '}
            <strong className="text-dark">{matrixData.class?.class_name}</strong>
          </div>
          <div className="vr"></div>
          <div>
            <span className="text-muted small">Subject:</span>{' '}
            <strong className="text-primary">{subject.name}</strong>
          </div>
          <div className="vr"></div>
          <div>
            <span className="text-muted small">Max Marks:</span>{' '}
            <span className="badge bg-secondary">{maxMarks}</span>
          </div>
          <div>
            <span className="text-muted small">Pass Marks:</span>{' '}
            <span className="badge bg-danger-subtle text-danger">{passMarks}</span>
          </div>
        </div>

        {!readOnly && (
          <button
            className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1.5 px-3"
            onClick={handleSaveAll}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status"></span>
            ) : (
              <i className="bi bi-floppy"></i>
            )}
            Save Marks Matrix
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-custom table-hover align-middle mb-0 marks-matrix-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Roll No</th>
              <th style={{ width: '130px' }}>Admission No</th>
              <th>Student Name</th>
              <th style={{ width: '120px' }} className="text-center">Marks ({maxMarks})</th>
              <th style={{ width: '100px' }} className="text-center">Grade</th>
              <th style={{ width: '100px' }} className="text-center">Status</th>
              <th>Teacher Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((st, idx) => {
              const numVal = parseFloat(st.currentMarks);
              const isEntered = !isNaN(numVal) && st.currentMarks !== '';
              const isPassed = isEntered && numVal >= passMarks;
              const isInvalid = isEntered && (numVal < 0 || numVal > maxMarks);

              return (
                <tr key={st.student_enrollment_id} className={isInvalid ? 'table-danger' : ''}>
                  <td className="fw-semibold">{st.roll_number || '-'}</td>
                  <td className="text-muted small">{st.admission_number}</td>
                  <td className="fw-bold text-dark">{st.student_name}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      step="0.5"
                      disabled={readOnly || loading}
                      className={`form-control form-control-sm text-center ${
                        isEntered ? (isPassed ? 'marks-pass' : 'marks-fail') : ''
                      }`}
                      value={st.currentMarks}
                      onChange={(e) => handleMarkChange(idx, e.target.value)}
                      placeholder="0 - 100"
                    />
                  </td>
                  <td className="text-center">
                    {st.currentGrade ? (
                      <span className={`badge ${st.currentGrade === 'F' ? 'bg-danger' : 'bg-success'} rounded-pill px-2 py-1`}>
                        {st.currentGrade}
                      </span>
                    ) : (
                      <span className="text-muted small">-</span>
                    )}
                  </td>
                  <td className="text-center">
                    {isEntered ? (
                      <span className={`badge ${isPassed ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} rounded-pill`}>
                        {isPassed ? 'PASS' : 'FAIL'}
                      </span>
                    ) : (
                      <span className="badge bg-light text-muted border">Unentered</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      disabled={readOnly || loading}
                      className="form-control form-control-sm"
                      placeholder="Optional feedback..."
                      value={st.currentRemarks}
                      onChange={(e) => handleRemarksChange(idx, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarksEntryGrid;
