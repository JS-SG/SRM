import React, { useState, useEffect, useCallback } from 'react';
import { feeService } from '../../services/feeService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';
import FeeCollectionModal from '../../components/fees/FeeCollectionModal';
import FeeAssignModal from '../../components/fees/FeeAssignModal';

export const FeesPage = () => {
  const { classes } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [fees, setFees] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modals
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNewTypeModal, setShowNewTypeModal] = useState(false);
  const [selectedFeeToPay, setSelectedFeeToPay] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [newTypeForm, setNewTypeForm] = useState({ name: '', description: '' });

  const fetchFees = useCallback(async () => {
    setLoading(true);
    try {
      const [feesRes, typesRes] = await Promise.all([
        feeService.getStudentFees({
          page,
          limit: 15,
          search,
          classId: classFilter,
          status: statusFilter,
        }),
        feeService.getTypes(),
      ]);
      setFees(feesRes.data || []);
      setPagination(feesRes.meta || null);
      setFeeTypes(typesRes.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to load student fees');
    } finally {
      setLoading(false);
    }
  }, [page, search, classFilter, statusFilter, toastError]);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  const handleAssignFee = async (payload) => {
    setActionLoading(true);
    try {
      const res = await feeService.assignFee(payload);
      toastSuccess(res.message || 'Fees assigned successfully!');
      setShowAssignModal(false);
      fetchFees();
    } catch (err) {
      toastError(err.message || 'Failed to assign fees');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateFeeType = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await feeService.createType(newTypeForm);
      toastSuccess('Fee structure created!');
      setShowNewTypeModal(false);
      fetchFees();
    } catch (err) {
      toastError(err.message || 'Failed to create fee structure');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCollectPayment = async (payload) => {
    setActionLoading(true);
    try {
      const res = await feeService.recordPayment(payload);
      toastSuccess(`Payment of ₹${payload.amount_paid} recorded! Receipt: ${res.receiptNumber}`);
      setSelectedFeeToPay(null);
      fetchFees();
    } catch (err) {
      toastError(err.message || 'Failed to record payment');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Student Name',
      render: (row) => (
        <div>
          <div className="fw-bold text-dark">{row.student?.name}</div>
          <div className="text-muted small font-monospace">
            Adm: {row.student?.admission_number} • Roll: {row.student?.roll_number || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      header: 'Class',
      render: (row) => (
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
          Class {row.student?.class_name}
        </span>
      ),
    },
    {
      header: 'Fee Structure',
      render: (row) => <span className="fw-semibold text-dark">{row.fee_type?.name}</span>,
    },
    {
      header: 'Billed Amount',
      render: (row) => <span className="fw-bold">₹{row.amount.toLocaleString()}</span>,
    },
    {
      header: 'Amount Paid',
      render: (row) => <span className="text-success fw-semibold">₹{row.total_paid.toLocaleString()}</span>,
    },
    {
      header: 'Remaining Balance',
      render: (row) => (
        <span className={`fw-bold ${row.balance > 0 ? 'text-danger' : 'text-muted'}`}>
          ₹{row.balance.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Due Date',
      render: (row) => <span className="small">{new Date(row.due_date).toLocaleDateString()}</span>,
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) =>
        row.balance > 0 ? (
          <button
            className="btn btn-sm btn-success d-inline-flex align-items-center gap-1"
            onClick={() => setSelectedFeeToPay(row)}
          >
            <i className="bi bi-cash"></i> Collect
          </button>
        ) : (
          <span className="badge bg-success-subtle text-success py-1.5 px-2">
            <i className="bi bi-check2"></i> Cleared
          </span>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Fee Management & Collection"
        subtitle="Manage fee categories, assign fees to classes, and record partial/full payments"
        breadcrumbs={[
          { label: 'Finance', path: '/admin/fees' },
          { label: 'Fee Management', path: '/admin/fees' },
        ]}
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowNewTypeModal(true)}>
              <i className="bi bi-plus-lg me-1"></i> New Fee Structure
            </button>
            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1.5" onClick={() => setShowAssignModal(true)}>
              <i className="bi bi-file-earmark-plus"></i> Assign Fee to Class
            </button>
          </div>
        }
      />

      {/* Toolbar */}
      <div className="card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar
              placeholder="Search by student name or admission no..."
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              className="w-100"
            />
          </div>
          <div className="col-6 col-md-4">
            <select
              className="form-select form-select-sm"
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  Class {c.class_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Payment Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="PARTIAL">PARTIAL</option>
              <option value="PAID">PAID</option>
              <option value="OVERDUE">OVERDUE</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={fees}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        emptyTitle="No Fee Records Found"
      />

      {/* Assign Fee Modal */}
      <FeeAssignModal
        show={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignFee}
        feeTypes={feeTypes}
        loading={actionLoading}
      />

      {/* Collect Fee Modal */}
      <FeeCollectionModal
        show={!!selectedFeeToPay}
        onClose={() => setSelectedFeeToPay(null)}
        onCollect={handleCollectPayment}
        feeRecord={selectedFeeToPay}
        loading={actionLoading}
      />

      {/* New Fee Type Modal */}
      {showNewTypeModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Define New Fee Structure</h5>
                <button type="button" className="btn-close" onClick={() => setShowNewTypeModal(false)} disabled={actionLoading}></button>
              </div>
              <form onSubmit={handleCreateFeeType}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Fee Type Name *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Science Lab & Robotics Fee"
                      value={newTypeForm.name}
                      onChange={(e) => setNewTypeForm({ ...newTypeForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="3"
                      placeholder="Optional description of this fee component..."
                      value={newTypeForm.description}
                      onChange={(e) => setNewTypeForm({ ...newTypeForm, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowNewTypeModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Create Fee Type
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesPage;
