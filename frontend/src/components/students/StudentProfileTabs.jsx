import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

export const StudentProfileTabs = ({ student, onAddParent, onEnroll, onCollectFee }) => {
  const [activeTab, setActiveTab] = useState('personal');

  if (!student) return null;

  const currentEnrollment = student.enrollments?.find((e) => e.status === 'ACTIVE') || student.enrollments?.[0];

  return (
    <div className="card-custom">
      {/* Tab Navigation Header */}
      <div className="border-bottom px-3 pt-2 bg-light rounded-top">
        <ul className="nav profile-nav-tabs flex-nowrap overflow-auto" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <i className="bi bi-person me-1"></i> Personal Info
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'parents' ? 'active' : ''}`}
              onClick={() => setActiveTab('parents')}
            >
              <i className="bi bi-people me-1"></i> Parents ({student.parents?.length || 0})
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'current_enrollment' ? 'active' : ''}`}
              onClick={() => setActiveTab('current_enrollment')}
            >
              <i className="bi bi-mortarboard me-1"></i> Current Class
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="bi bi-clock-history me-1"></i> Academic History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'marks' ? 'active' : ''}`}
              onClick={() => setActiveTab('marks')}
            >
              <i className="bi bi-award me-1"></i> Marks & Grades
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'fees' ? 'active' : ''}`}
              onClick={() => setActiveTab('fees')}
            >
              <i className="bi bi-cash-stack me-1"></i> Fees & Payments
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="bi bi-whatsapp text-success me-1"></i> WhatsApp Logs
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Body */}
      <div className="p-4">
        {/* ================= 1. PERSONAL INFO TAB ================= */}
        {activeTab === 'personal' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">Student Permanent Profile</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-muted small">Admission Number</div>
                <div className="fw-bold text-dark">{student.admission_number}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Full Legal Name</div>
                <div className="fw-bold text-dark">{`${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Status</div>
                <div><StatusBadge status={student.status} /></div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Gender</div>
                <div className="fw-semibold text-dark">{student.gender}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Date of Birth</div>
                <div className="fw-semibold text-dark">
                  {student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Blood Group</div>
                <div className="fw-semibold text-dark">{student.blood_group || 'N/A'}</div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Admission Date</div>
                <div className="fw-semibold text-dark">
                  {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="col-md-8">
                <div className="text-muted small">Residential Address</div>
                <div className="fw-semibold text-dark">
                  {student.address ? `${student.address}, ${student.city || ''}, ${student.state || ''} - ${student.pincode || ''}` : 'Not Provided'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PARENTS / GUARDIANS TAB ================= */}
        {activeTab === 'parents' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark mb-0">Parents & Guardians</h6>
              {onAddParent && (
                <button className="btn btn-sm btn-outline-primary" onClick={onAddParent}>
                  <i className="bi bi-plus-lg me-1"></i> Add Guardian
                </button>
              )}
            </div>

            {(!student.parents || student.parents.length === 0) ? (
              <EmptyState title="No Parents Registered" description="Add parent details to enable WhatsApp communications." />
            ) : (
              <div className="row g-3">
                {student.parents.map((rel) => (
                  <div key={rel.id} className="col-md-6">
                    <div className={`border rounded-3 p-3 h-100 ${rel.is_primary ? 'border-primary bg-primary-subtle' : 'bg-light'}`}>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="badge bg-secondary">{rel.parent.relationship}</span>
                        {rel.is_primary && (
                          <span className="badge bg-primary">Primary Contact</span>
                        )}
                      </div>
                      <h6 className="fw-bold text-dark mb-1">
                        {rel.parent.first_name} {rel.parent.last_name}
                      </h6>
                      <div className="small text-muted mb-2">
                        <i className="bi bi-briefcase me-1"></i> {rel.parent.occupation || 'Occupation not specified'}
                      </div>
                      <div className="small mb-1">
                        <i className="bi bi-telephone text-primary me-2"></i>
                        <strong>Phone:</strong> {rel.parent.phone}
                      </div>
                      <div className="small mb-1">
                        <i className="bi bi-whatsapp text-success me-2"></i>
                        <strong>WhatsApp:</strong> {rel.parent.whatsapp_number || 'Same as Phone'}
                      </div>
                      {rel.parent.email && (
                        <div className="small">
                          <i className="bi bi-envelope text-info me-2"></i>
                          <strong>Email:</strong> {rel.parent.email}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= 3. CURRENT ENROLLMENT TAB ================= */}
        {activeTab === 'current_enrollment' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark mb-0">Active Academic Enrollment</h6>
              {onEnroll && (
                <button className="btn btn-sm btn-primary" onClick={onEnroll}>
                  <i className="bi bi-arrow-up-right me-1"></i> Promote / Change Class
                </button>
              )}
            </div>

            {!currentEnrollment ? (
              <EmptyState title="No Active Enrollment" description="This student is not currently enrolled in an active class." />
            ) : (
              <div className="card bg-light border-0 p-4 rounded-3">
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="text-muted small">Current Class</div>
                    <div className="fs-4 fw-bold text-primary">{currentEnrollment.class?.class_name}</div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-muted small">Standard & Division</div>
                    <div className="fw-bold text-dark">
                      Std: {currentEnrollment.class?.standard?.name} | Div: {currentEnrollment.class?.division?.name}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-muted small">Roll Number</div>
                    <div className="fw-bold text-dark">{currentEnrollment.roll_number || 'Not Assigned'}</div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-muted small">Enrollment Status</div>
                    <div><StatusBadge status={currentEnrollment.status} /></div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-muted small">Class Teacher</div>
                    <div className="fw-bold text-dark">
                      {currentEnrollment.class?.class_teacher
                        ? `${currentEnrollment.class.class_teacher.first_name} ${currentEnrollment.class.class_teacher.last_name}`
                        : 'Unassigned'}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-muted small">Classroom / Room Number</div>
                    <div className="fw-bold text-dark">{currentEnrollment.class?.room_number || 'N/A'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. ACADEMIC HISTORY TAB ================= */}
        {activeTab === 'history' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">Progression & Class History</h6>
            {(!student.enrollments || student.enrollments.length === 0) ? (
              <EmptyState title="No History Records" description="No previous academic years on record." />
            ) : (
              <div className="table-responsive">
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Academic Year</th>
                      <th>Class</th>
                      <th>Standard</th>
                      <th>Division</th>
                      <th>Roll Number</th>
                      <th>Enrolled On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.enrollments.map((enr) => (
                      <tr key={enr.id}>
                        <td className="fw-bold">{enr.academic_year?.name}</td>
                        <td><span className="badge bg-primary-subtle text-primary">{enr.class?.class_name}</span></td>
                        <td>Standard {enr.class?.standard?.name}</td>
                        <td>Division {enr.class?.division?.name}</td>
                        <td>{enr.roll_number || 'N/A'}</td>
                        <td>{new Date(enr.enrollment_date).toLocaleDateString()}</td>
                        <td><StatusBadge status={enr.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= 5. MARKS TAB ================= */}
        {activeTab === 'marks' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">Examination Performance</h6>
            {(!student.enrollments || student.enrollments.every((e) => !e.marks || e.marks.length === 0)) ? (
              <EmptyState title="No Marks Recorded" description="Examination marks have not been published for this student yet." />
            ) : (
              student.enrollments.map((enr) => (
                <div key={enr.id} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between bg-light p-2.5 px-3 rounded-top border">
                    <span className="fw-bold text-dark">
                      Class {enr.class?.class_name} ({enr.academic_year?.name})
                    </span>
                    <span className="small text-muted">Roll No: {enr.roll_number}</span>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-custom border border-top-0">
                      <thead>
                        <tr>
                          <th>Exam</th>
                          <th>Subject</th>
                          <th>Marks Scored</th>
                          <th>Max Marks</th>
                          <th>Grade</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enr.marks.map((m) => (
                          <tr key={m.id}>
                            <td className="fw-semibold">{m.exam?.name}</td>
                            <td>{m.subject?.name} ({m.subject?.code})</td>
                            <td className="fw-bold text-primary">{Number(m.marks_obtained)}</td>
                            <td>{Number(m.max_marks)}</td>
                            <td>
                              <span className={`badge ${m.grade === 'F' ? 'bg-danger' : 'bg-success'} rounded-pill`}>
                                {m.grade || 'N/A'}
                              </span>
                            </td>
                            <td className="text-muted small">{m.remarks || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= 6. FEES TAB ================= */}
        {activeTab === 'fees' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark mb-0">Fee Invoices & Payments</h6>
              {onCollectFee && (
                <button className="btn btn-sm btn-success" onClick={onCollectFee}>
                  <i className="bi bi-cash me-1"></i> Collect Fee Payment
                </button>
              )}
            </div>

            {(!student.enrollments || student.enrollments.every((e) => !e.fees || e.fees.length === 0)) ? (
              <EmptyState title="No Fees Assigned" description="No fee invoices currently assigned to this student." />
            ) : (
              student.enrollments.map((enr) => (
                <div key={enr.id} className="mb-4">
                  <div className="table-responsive">
                    <table className="table table-custom">
                      <thead>
                        <tr>
                          <th>Fee Structure</th>
                          <th>Total Due</th>
                          <th>Total Paid</th>
                          <th>Remaining Balance</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Transactions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enr.fees.map((fee) => {
                          const total = Number(fee.amount);
                          const paid = fee.payments.reduce((acc, p) => acc + Number(p.amount_paid), 0);
                          const bal = Math.max(0, total - paid);

                          return (
                            <tr key={fee.id}>
                              <td className="fw-bold">{fee.fee_type?.name}</td>
                              <td>₹{total.toLocaleString()}</td>
                              <td className="text-success fw-semibold">₹{paid.toLocaleString()}</td>
                              <td className={`fw-bold ${bal > 0 ? 'text-danger' : 'text-muted'}`}>
                                ₹{bal.toLocaleString()}
                              </td>
                              <td className="small">{new Date(fee.due_date).toLocaleDateString()}</td>
                              <td><StatusBadge status={fee.status} /></td>
                              <td>
                                {fee.payments.length === 0 ? (
                                  <span className="text-muted small">None</span>
                                ) : (
                                  <div className="small">
                                    {fee.payments.map((p) => (
                                      <div key={p.id} className="mb-1">
                                        <span className="badge bg-light text-dark border me-1">{p.payment_method}</span>
                                        <span className="fw-semibold">₹{Number(p.amount_paid).toLocaleString()}</span>
                                        <span className="text-muted ms-1">({p.transaction_reference})</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= 7. NOTIFICATIONS TAB ================= */}
        {activeTab === 'notifications' && (
          <div>
            <h6 className="fw-bold text-dark mb-3">WhatsApp Notification Dispatch Log</h6>
            {(!student.notifications || student.notifications.length === 0) ? (
              <EmptyState title="No Notification Logs" description="No messages have been dispatched for this student yet." />
            ) : (
              <div className="table-responsive">
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Message Preview</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.notifications.map((n) => (
                      <tr key={n.id}>
                        <td className="small text-muted">{new Date(n.created_at).toLocaleString()}</td>
                        <td><span className="badge bg-info-subtle text-info">{n.type}</span></td>
                        <td className="fw-semibold">{n.title}</td>
                        <td className="small text-muted" style={{ maxWidth: '300px' }}>
                          <div className="text-truncate">{n.message}</div>
                        </td>
                        <td><StatusBadge status={n.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileTabs;
