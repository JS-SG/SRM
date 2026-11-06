import React, { useState, useEffect } from 'react';
import { academicService } from '../../services/academicService';
import { useAcademic } from '../../contexts/AcademicContext';
import { useToast } from '../../contexts/ToastContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export const SubjectsPage = () => {
  const { standards } = useAcademic();
  const { toastSuccess, toastError } = useToast();

  const [subjects, setSubjects] = useState([]);
  const [standardMappings, setStandardMappings] = useState([]);
  const [selectedStandardId, setSelectedStandardId] = useState('');
  const [loading, setLoading] = useState(false);

  // Modals
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [subjectForm, setSubjectForm] = useState({ name: '', code: '', description: '' });
  const [mappingForm, setMappingForm] = useState({
    standard_id: standards[0]?.id || '',
    subject_id: '',
    max_marks: 100,
    pass_marks: 35,
    is_optional: false,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, mapRes] = await Promise.all([
        academicService.getSubjects(),
        academicService.getStandardSubjects(selectedStandardId),
      ]);
      setSubjects(subRes.data || []);
      setStandardMappings(mapRes.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStandardId]);

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await academicService.createSubject(subjectForm);
      toastSuccess('Subject added successfully!');
      setShowSubjectModal(false);
      fetchData();
    } catch (err) {
      toastError(err.message || 'Failed to create subject');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMapSubject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await academicService.mapSubjectToStandard(mappingForm);
      toastSuccess('Subject mapped to Standard successfully!');
      setShowMappingModal(false);
      fetchData();
    } catch (err) {
      toastError(err.message || 'Failed to map subject');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveMapping = async (stdId, subId) => {
    try {
      await academicService.removeSubjectFromStandard(stdId, subId);
      toastSuccess('Subject unmapped from standard');
      fetchData();
    } catch (err) {
      toastError(err.message || 'Failed to remove mapping');
    }
  };

  const subjectColumns = [
    { header: 'Subject Code', accessor: 'code', render: (row) => <strong className="font-monospace text-primary">{row.code}</strong> },
    { header: 'Subject Name', accessor: 'name', render: (row) => <span className="fw-bold text-dark">{row.name}</span> },
    { header: 'Description', accessor: 'description', render: (row) => row.description || 'N/A' },
  ];

  const mappingColumns = [
    { header: 'Standard', render: (row) => <strong className="text-dark">Standard {row.standard?.name}</strong> },
    { header: 'Subject', render: (row) => <span className="fw-semibold text-primary">{row.subject?.name} ({row.subject?.code})</span> },
    { header: 'Max Marks', render: (row) => Number(row.max_marks) },
    { header: 'Pass Marks', render: (row) => <span className="badge bg-danger-subtle text-danger">{Number(row.pass_marks)}</span> },
    {
      header: 'Optional',
      render: (row) => (
        <span className={`badge ${row.is_optional ? 'bg-info-subtle text-info' : 'bg-secondary-subtle text-secondary'}`}>
          {row.is_optional ? 'Optional' : 'Compulsory'}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleRemoveMapping(row.standard_id, row.subject_id)}
          title="Remove from Standard"
        >
          <i className="bi bi-trash"></i>
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Subjects & Curriculum Configuration"
        subtitle="Manage subject catalog and curriculum mappings across standards"
        breadcrumbs={[
          { label: 'Academic', path: '/admin/academic' },
          { label: 'Subjects', path: '/admin/subjects' },
        ]}
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowSubjectModal(true)}>
              <i className="bi bi-plus-lg me-1"></i> New Subject
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowMappingModal(true)}>
              <i className="bi bi-link-45deg me-1"></i> Map Subject to Standard
            </button>
          </div>
        }
      />

      <div className="row g-4">
        {/* All Subjects Master Catalog */}
        <div className="col-lg-5">
          <div className="card-custom h-100">
            <div className="p-3 border-bottom bg-light">
              <h6 className="fw-bold text-dark mb-0">
                <i className="bi bi-journal-text text-primary me-2"></i>
                Subject Master Catalog ({subjects.length})
              </h6>
            </div>
            <div className="p-0">
              <DataTable columns={subjectColumns} data={subjects} loading={loading} emptyTitle="No Subjects" />
            </div>
          </div>
        </div>

        {/* Standard Curriculum Mappings */}
        <div className="col-lg-7">
          <div className="card-custom h-100">
            <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h6 className="fw-bold text-dark mb-0">
                <i className="bi bi-mortarboard text-teal me-2"></i>
                Curriculum Mappings by Standard
              </h6>
              <select
                className="form-select form-select-sm"
                style={{ width: '180px' }}
                value={selectedStandardId}
                onChange={(e) => setSelectedStandardId(e.target.value)}
              >
                <option value="">All Standards</option>
                {standards.map((s) => (
                  <option key={s.id} value={s.id}>
                    Standard {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-0">
              <DataTable columns={mappingColumns} data={standardMappings} loading={loading} emptyTitle="No Mappings" />
            </div>
          </div>
        </div>
      </div>

      {/* New Subject Modal */}
      {showSubjectModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Add New Subject</h5>
                <button type="button" className="btn-close" onClick={() => setShowSubjectModal(false)} disabled={actionLoading}></button>
              </div>
              <form onSubmit={handleCreateSubject}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Subject Name *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Environmental Science"
                      value={subjectForm.name}
                      onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Subject Code *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. EVS"
                      value={subjectForm.code}
                      onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="3"
                      value={subjectForm.description}
                      onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowSubjectModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Create Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Map Subject Modal */}
      {showMappingModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Map Subject to Standard</h5>
                <button type="button" className="btn-close" onClick={() => setShowMappingModal(false)} disabled={actionLoading}></button>
              </div>
              <form onSubmit={handleMapSubject}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Standard *</label>
                    <select
                      className="form-select form-select-sm"
                      value={mappingForm.standard_id}
                      onChange={(e) => setMappingForm({ ...mappingForm, standard_id: e.target.value })}
                      required
                    >
                      <option value="">Select Standard</option>
                      {standards.map((s) => (
                        <option key={s.id} value={s.id}>
                          Standard {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Subject *</label>
                    <select
                      className="form-select form-select-sm"
                      value={mappingForm.subject_id}
                      onChange={(e) => setMappingForm({ ...mappingForm, subject_id: e.target.value })}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} ({sub.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Max Marks *</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={mappingForm.max_marks}
                        onChange={(e) => setMappingForm({ ...mappingForm, max_marks: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Pass Marks *</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={mappingForm.pass_marks}
                        onChange={(e) => setMappingForm({ ...mappingForm, pass_marks: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowMappingModal(false)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actionLoading}>
                    {actionLoading && <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                    Save Curriculum Mapping
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

export default SubjectsPage;
