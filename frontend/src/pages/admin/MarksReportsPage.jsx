import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { academicService } from '../../services/academicService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const MarksReportsPage = () => {
  const { classes, currentYear } = useAcademic();
  const { toastError } = useToast();

  const [exams, setExams] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedExamId, setSelectedExamId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  useEffect(() => {
    academicService.getExams(currentYear?.id).then((res) => {
      const list = res.data || [];
      setExams(list);
      if (list.length > 0 && !selectedExamId) {
        setSelectedExamId(list[0].id);
      }
    }).catch(() => {});
  }, [currentYear, selectedExamId]);

  const fetchReport = async () => {
    if (!selectedClassId || !selectedExamId) return;
    setLoading(true);
    try {
      const res = await reportService.getClassExamReport(selectedClassId, selectedExamId);
      setReportData(res.data);
    } catch (err) {
      toastError(err.message || 'Failed to generate broadsheet report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId && selectedExamId) {
      fetchReport();
    }
  }, [selectedClassId, selectedExamId]);

  return (
    <div>
      <PageHeader
        title="Class Performance & Examination Reports"
        subtitle="Comprehensive examination broadsheet, student rankings, and pass/fail analysis"
        breadcrumbs={[
          { label: 'Evaluation', path: '/admin/exams' },
          { label: 'Performance Reports', path: '/admin/marks-reports' },
        ]}
        actions={
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => window.print()}>
            <i className="bi bi-printer"></i> Print Report
          </button>
        }
      />

      {/* Filter Selector */}
      <div className="card-custom p-4 mb-4 bg-white">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Select Class & Division</label>
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
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Select Examination</label>
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
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Aggregating broadsheet ranking data..." />
      ) : reportData ? (
        <div>
          {/* Summary Metric Cards */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white border rounded-3 text-center shadow-sm">
                <div className="text-muted small">Total Students</div>
                <div className="fs-4 fw-bold text-dark">{reportData.summary.total_students}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-success-subtle border border-success-subtle rounded-3 text-center shadow-sm">
                <div className="text-success small fw-semibold">Passed</div>
                <div className="fs-4 fw-bold text-success">{reportData.summary.passed_students}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-danger-subtle border border-danger-subtle rounded-3 text-center shadow-sm">
                <div className="text-danger small fw-semibold">Failed</div>
                <div className="fs-4 fw-bold text-danger">{reportData.summary.failed_students}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-primary-subtle border border-primary-subtle rounded-3 text-center shadow-sm">
                <div className="text-primary small fw-semibold">Pass Percentage</div>
                <div className="fs-4 fw-bold text-primary">{reportData.summary.pass_percentage}%</div>
              </div>
            </div>
          </div>

          {/* Broadsheet Table */}
          <div className="card-custom overflow-hidden">
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
              <h6 className="fw-bold text-dark mb-0">
                Broadsheet: Class {reportData.class?.class_name} • {reportData.exam?.name}
              </h6>
              <span className="badge bg-secondary">
                Class Avg: {reportData.summary.average_marks} Marks
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-custom table-hover table-bordered mb-0 align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ width: '60px' }}>Rank</th>
                    <th style={{ width: '90px' }}>Roll No</th>
                    <th className="text-start">Student Name</th>
                    {reportData.subjects.map((sub) => (
                      <th key={sub.id} style={{ minWidth: '85px' }}>
                        {sub.code}
                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>
                          Max {sub.max_marks}
                        </div>
                      </th>
                    ))}
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.students.map((st) => (
                    <tr key={st.enrollment_id} className={st.result === 'FAIL' ? 'table-danger-subtle' : ''}>
                      <td className="text-center fw-bold">
                        {st.rank === 1 ? (
                          <span className="badge bg-warning text-dark">🥇 1</span>
                        ) : st.rank === 2 ? (
                          <span className="badge bg-secondary text-white">🥈 2</span>
                        ) : st.rank === 3 ? (
                          <span className="badge bg-danger text-white">🥉 3</span>
                        ) : (
                          st.rank
                        )}
                      </td>
                      <td className="text-center font-monospace small">{st.roll_number || '-'}</td>
                      <td className="fw-semibold text-dark">{st.student_name}</td>
                      {reportData.subjects.map((sub) => {
                        const m = st.marks[sub.id];
                        const isFail = m && m.obtained < sub.pass_marks;
                        return (
                          <td
                            key={sub.id}
                            className={`text-center small ${isFail ? 'text-danger fw-bold' : ''}`}
                          >
                            {m ? m.obtained : '-'}
                          </td>
                        );
                      })}
                      <td className="text-center fw-bold text-primary">{st.total_obtained}</td>
                      <td className="text-center fw-bold">{st.percentage}%</td>
                      <td className="text-center">
                        <span className={`badge ${st.result === 'PASS' ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                          {st.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-custom p-5">
          <EmptyState
            icon="bi-bar-chart-line"
            title="Generate Performance Broadsheet"
            description="Select class and examination above to view student marks, ranks, and result summaries."
          />
        </div>
      )}
    </div>
  );
};

export default MarksReportsPage;
