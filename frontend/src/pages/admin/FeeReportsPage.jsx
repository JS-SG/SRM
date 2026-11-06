import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const FeeReportsPage = () => {
  const { academicYears, currentYear } = useAcademic();
  const { toastError } = useToast();

  const [selectedYearId, setSelectedYearId] = useState(currentYear?.id || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentYear && !selectedYearId) {
      setSelectedYearId(currentYear.id);
    }
  }, [currentYear, selectedYearId]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await reportService.getFeeSummary({ academicYearId: selectedYearId });
      setData(res.data);
    } catch (err) {
      toastError(err.message || 'Failed to load fee report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedYearId]);

  return (
    <div>
      <PageHeader
        title="Fee Collection & Outstanding Summary"
        subtitle="Financial breakdown by academic session and class"
        breadcrumbs={[
          { label: 'Finance', path: '/admin/fees' },
          { label: 'Fee Reports', path: '/admin/fee-reports' },
        ]}
        actions={
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => window.print()}>
            <i className="bi bi-printer"></i> Print Summary
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="card-custom p-3 mb-4 bg-white">
        <div className="row align-items-center">
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-muted mb-1">Academic Session</label>
            <select
              className="form-select form-select-sm"
              value={selectedYearId}
              onChange={(e) => setSelectedYearId(e.target.value)}
            >
              <option value="">All Academic Years</option>
              {academicYears.map((ay) => (
                <option key={ay.id} value={ay.id}>
                  {ay.name} {ay.is_current ? '(Current)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Calculating financial metrics..." />
      ) : data ? (
        <div>
          {/* Top Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white border rounded-3 text-center shadow-sm">
                <div className="text-muted small">Total Assigned Billed</div>
                <div className="fs-4 fw-bold text-dark">₹{data.total_assigned.toLocaleString()}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-success-subtle border border-success-subtle rounded-3 text-center shadow-sm">
                <div className="text-success small fw-semibold">Total Collected</div>
                <div className="fs-4 fw-bold text-success">₹{data.total_collected.toLocaleString()}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-danger-subtle border border-danger-subtle rounded-3 text-center shadow-sm">
                <div className="text-danger small fw-semibold">Outstanding Balance</div>
                <div className="fs-4 fw-bold text-danger">₹{data.total_outstanding.toLocaleString()}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-primary-subtle border border-primary-subtle rounded-3 text-center shadow-sm">
                <div className="text-primary small fw-semibold">Collection Rate</div>
                <div className="fs-4 fw-bold text-primary">{data.collection_rate}%</div>
              </div>
            </div>
          </div>

          {/* Class Breakdown Table */}
          <div className="card-custom overflow-hidden">
            <div className="p-3 border-bottom bg-light">
              <h6 className="fw-bold text-dark mb-0">Class-wise Revenue Breakdown</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-custom table-hover mb-0">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Assigned Amount</th>
                    <th>Collected Amount</th>
                    <th>Pending Balance</th>
                    <th>Collection Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {data.class_breakdown.map((cb, idx) => {
                    const rate = cb.assigned > 0 ? ((cb.collected / cb.assigned) * 100).toFixed(1) : 0;
                    return (
                      <tr key={idx}>
                        <td className="fw-bold text-primary">Class {cb.class_name}</td>
                        <td>₹{cb.assigned.toLocaleString()}</td>
                        <td className="text-success fw-semibold">₹{cb.collected.toLocaleString()}</td>
                        <td className={`fw-bold ${cb.pending > 0 ? 'text-danger' : 'text-muted'}`}>
                          ₹{cb.pending.toLocaleString()}
                        </td>
                        <td style={{ width: '220px' }}>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${rate}%` }}
                              ></div>
                            </div>
                            <span className="small fw-semibold">{rate}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FeeReportsPage;
