import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { apiService } from '../services/api';
import {
  FiGrid,
  FiSliders,
  FiBell,
  FiCalendar,
  FiAward,
  FiImage,
  FiBookOpen,
  FiLayers,
  FiMessageSquare,
  FiVideo,
  FiSettings,
  FiEye,
  FiLogOut,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiStar,
  FiExternalLink,
  FiRotateCcw,
  FiSave,
  FiUpload,
  FiMenu
} from 'react-icons/fi';

const Controller = () => {
  const navigate = useNavigate();
  const {
    siteSettings,
    heroSettings,
    sectionVisibility,
    announcements,
    events,
    achievements,
    gallery,
    programmes,
    facilities,
    testimonials,
    leadership,
    toggleSection,
    updateHeroSettings,
    updateSiteSettings,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleAnnouncementVisibility,
    toggleAnnouncementFeatured,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleEventVisibility,
    toggleEventFeatured,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    toggleAchievementVisibility,
    toggleAchievementFeatured,
    addGalleryItem,
    deleteGalleryItem,
    toggleGalleryVisibility,
    addProgramme,
    updateProgramme,
    deleteProgramme,
    addFacility,
    updateFacility,
    deleteFacility,
    updateLeadership,
    addTestimonial,
    deleteTestimonial,
    resetToDefaults
  } = useSite();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form States for CRUD
  const [editingItem, setEditingItem] = useState(null); // { type: 'announcement' | 'event' | 'achievement' | 'programme' | 'facility' | 'testimonial', data: {} }
  const [showAddModal, setShowAddModal] = useState(null); // 'announcement' | 'event' | 'achievement' | 'gallery' | 'programme' | 'facility' | 'testimonial'

  // Hero Video Form State
  const [heroForm, setHeroForm] = useState(heroSettings);

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // Leadership Form State
  const [leadForm, setLeadForm] = useState(leadership);

  const handleLogout = () => {
    apiService.logoutAdmin();
    navigate('/admin/login');
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <FiGrid /> },
    { id: 'sections', label: 'Website Sections', icon: <FiSliders />, badge: 'Switchboard' },
    { id: 'announcements', label: 'Announcements', icon: <FiBell />, count: announcements.length },
    { id: 'events', label: 'Events & Calendar', icon: <FiCalendar />, count: events.length },
    { id: 'gallery', label: 'Photo Gallery', icon: <FiImage />, count: gallery.length },
    { id: 'achievements', label: 'Student Achievements', icon: <FiAward />, count: achievements.length },
    { id: 'academics', label: 'Academic Programmes', icon: <FiBookOpen />, count: programmes.length },
    { id: 'facilities', label: 'Campus Facilities', icon: <FiLayers />, count: facilities.length },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare />, count: testimonials.length },
    { id: 'hero', label: 'Hero Video & Branding', icon: <FiVideo /> },
    { id: 'leadership', label: "Principal's Message", icon: <FiAward /> },
    { id: 'settings', label: 'School Site Settings', icon: <FiSettings /> }
  ];

  return (
    <div className="controller-app-shell d-flex min-vh-100 bg-light">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="mobile-nav-overlay d-lg-none"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Controller Sidebar */}
      <aside className={`controller-sidebar bg-navy text-white d-flex flex-column ${mobileSidebarOpen ? 'show' : ''}`}>
        {/* Top Brand Header */}
        <div className="p-3 border-bottom border-white-10 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="school-emblem-badge small-badge bg-gold text-dark">
              <span className="fw-bold">KKK</span>
            </div>
            <div>
              <h6 className="fw-bold text-white mb-0">Controller CMS</h6>
              <span className="text-gold small" style={{ fontSize: '0.72rem' }}>Central Control Room</span>
            </div>
          </div>
          <button
            className="btn btn-sm text-white-50 d-lg-none"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="p-3 bg-navy-dark border-bottom border-white-10">
          <div className="d-flex align-items-center justify-content-between small">
            <span className="text-white-75">Website Status:</span>
            <span className="badge bg-success-soft text-success fw-bold d-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill">
              <span className="live-pulse-dot" style={{ width: 6, height: 6 }}></span> LIVE
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="controller-sidebar-nav flex-grow-1 overflow-auto py-2">
          <ul className="list-unstyled d-flex flex-column gap-1 px-2 mb-0">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`sidebar-nav-btn w-100 text-start d-flex align-items-center justify-content-between p-2.5 rounded-3 fw-medium transition-all ${
                      isActive ? 'active bg-gold text-dark fw-bold shadow-sm' : 'text-white-75 hover-white'
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2.5">
                      <span className="tab-icon">{tab.icon}</span>
                      <span className="small">{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className={`badge rounded-pill small ${isActive ? 'bg-navy text-white' : 'bg-white-10 text-white-75'}`}>
                        {tab.count}
                      </span>
                    )}
                    {tab.badge && (
                      <span className="badge bg-primary text-white rounded-pill small">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-top border-white-10 bg-navy-dark d-flex flex-column gap-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-outline-light rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 small fw-semibold"
          >
            <FiExternalLink size={13} />
            <span>Open Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-sm btn-danger bg-opacity-20 text-danger border-0 rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 small fw-semibold"
          >
            <FiLogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Controller Content Area */}
      <div className="controller-main-content flex-grow-1 d-flex flex-column min-vh-100 overflow-auto">
        {/* Top Control Bar */}
        <header className="controller-topbar bg-white border-bottom px-4 py-3 sticky-top shadow-xs">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-light d-lg-none p-2 border"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <FiMenu size={18} />
              </button>
              <h5 className="fw-bold text-navy mb-0">
                {navTabs.find((t) => t.id === activeTab)?.label || 'Controller'}
              </h5>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="btn btn-outline-navy rounded-pill px-3 py-1.5 small fw-semibold d-flex align-items-center gap-1.5"
              >
                <FiEye size={14} />
                <span>Live Preview Mode</span>
              </button>

              <Link
                to="/"
                target="_blank"
                className="btn btn-gold rounded-pill px-3.5 py-1.5 small fw-bold d-flex align-items-center gap-1.5 shadow-xs"
              >
                <span>View Public Site</span>
                <FiExternalLink size={13} />
              </Link>
            </div>
          </div>
        </header>

        {/* Content Pane Switcher */}
        <main className="p-4 p-lg-5 flex-grow-1">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview-pane">
              {/* Quick Metrics Grid */}
              <div className="row g-4 mb-5">
                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-4 border-primary">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small fw-semibold d-block">Active Announcements</span>
                        <h3 className="fw-extrabold text-navy mt-1 mb-0">{announcements.filter((a) => a.visible).length}</h3>
                        <span className="small text-muted">{announcements.length} Total</span>
                      </div>
                      <div className="metric-icon-box bg-primary-soft text-primary rounded-circle p-3">
                        <FiBell size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-4 border-warning">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small fw-semibold d-block">Calendar Events</span>
                        <h3 className="fw-extrabold text-navy mt-1 mb-0">{events.filter((e) => e.visible).length}</h3>
                        <span className="small text-muted">{events.length} Total</span>
                      </div>
                      <div className="metric-icon-box bg-warning-soft text-warning rounded-circle p-3">
                        <FiCalendar size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-4 border-success">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small fw-semibold d-block">Gallery Photos</span>
                        <h3 className="fw-extrabold text-navy mt-1 mb-0">{gallery.filter((g) => g.visible).length}</h3>
                        <span className="small text-muted">{gallery.length} Uploaded</span>
                      </div>
                      <div className="metric-icon-box bg-success-soft text-success rounded-circle p-3">
                        <FiImage size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-4 border-danger">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small fw-semibold d-block">Honors & Awards</span>
                        <h3 className="fw-extrabold text-navy mt-1 mb-0">{achievements.filter((a) => a.visible).length}</h3>
                        <span className="small text-muted">{achievements.length} Recorded</span>
                      </div>
                      <div className="metric-icon-box bg-danger-soft text-danger rounded-circle p-3">
                        <FiAward size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Section Switchboard Preview */}
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold text-navy mb-0">Quick CMS Publishing Actions</h5>
                      <span className="badge bg-gold text-dark small fw-bold">Live Synced</span>
                    </div>

                    <div className="row g-3">
                      <div className="col-sm-6">
                        <button
                          onClick={() => {
                            setActiveTab('announcements');
                            setShowAddModal('announcement');
                          }}
                          className="btn btn-outline-primary w-100 p-3 rounded-4 text-start d-flex align-items-center gap-3 shadow-xs"
                        >
                          <div className="p-2.5 rounded-3 bg-primary text-white">
                            <FiPlus size={20} />
                          </div>
                          <div>
                            <strong className="d-block text-navy small">Post Circular</strong>
                            <span className="text-muted small">New notice or timetable</span>
                          </div>
                        </button>
                      </div>

                      <div className="col-sm-6">
                        <button
                          onClick={() => {
                            setActiveTab('events');
                            setShowAddModal('event');
                          }}
                          className="btn btn-outline-warning w-100 p-3 rounded-4 text-start d-flex align-items-center gap-3 shadow-xs"
                        >
                          <div className="p-2.5 rounded-3 bg-warning text-dark">
                            <FiPlus size={20} />
                          </div>
                          <div>
                            <strong className="d-block text-navy small">Add School Event</strong>
                            <span className="text-muted small">Sports, arts or fest</span>
                          </div>
                        </button>
                      </div>

                      <div className="col-sm-6">
                        <button
                          onClick={() => {
                            setActiveTab('gallery');
                            setShowAddModal('gallery');
                          }}
                          className="btn btn-outline-success w-100 p-3 rounded-4 text-start d-flex align-items-center gap-3 shadow-xs"
                        >
                          <div className="p-2.5 rounded-3 bg-success text-white">
                            <FiUpload size={20} />
                          </div>
                          <div>
                            <strong className="d-block text-navy small">Upload Photos</strong>
                            <span className="text-muted small">Add campus album shots</span>
                          </div>
                        </button>
                      </div>

                      <div className="col-sm-6">
                        <button
                          onClick={() => {
                            setActiveTab('achievements');
                            setShowAddModal('achievement');
                          }}
                          className="btn btn-outline-danger w-100 p-3 rounded-4 text-start d-flex align-items-center gap-3 shadow-xs"
                        >
                          <div className="p-2.5 rounded-3 bg-danger text-white">
                            <FiAward size={20} />
                          </div>
                          <div>
                            <strong className="d-block text-navy small">Record Award</strong>
                            <span className="text-muted small">Student hall of fame</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Visibility Switchboard Widget */}
                <div className="col-lg-5">
                  <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold text-navy mb-0">Homepage Sections</h5>
                      <button
                        onClick={() => setActiveTab('sections')}
                        className="btn btn-link text-primary p-0 small fw-bold text-decoration-none"
                      >
                        Manage All →
                      </button>
                    </div>

                    <p className="text-muted small mb-3">
                      Instant toggles. Changes reflect live on the homepage without code reload.
                    </p>

                    <div className="d-flex flex-column gap-2.5">
                      {Object.entries(sectionVisibility).slice(0, 6).map(([key, val]) => (
                        <div key={key} className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light border">
                          <span className="small fw-semibold text-dark text-capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <div className="form-check form-switch mb-0">
                            <input
                              className="form-check-input cursor-pointer"
                              type="checkbox"
                              checked={val}
                              onChange={() => toggleSection(key)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE SECTIONS SWITCHBOARD */}
          {activeTab === 'sections' && (
            <div className="sections-switchboard-pane">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
                  <div>
                    <h4 className="fw-bold text-navy mb-1">Homepage Section Visibility Switchboard</h4>
                    <p className="text-muted small mb-0">
                      Toggle sections ON or OFF. Disabled sections disappear immediately from the public website.
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => {
                        Object.keys(sectionVisibility).forEach((k) => toggleSection(k, true));
                      }}
                      className="btn btn-sm btn-outline-success rounded-pill px-3 py-1.5 fw-semibold"
                    >
                      Turn All ON
                    </button>
                  </div>
                </div>

                <div className="row g-4">
                  {Object.entries(sectionVisibility).map(([key, isVisible]) => (
                    <div key={key} className="col-md-6 col-xl-4">
                      <div className={`p-3.5 rounded-4 border transition-all ${isVisible ? 'bg-white border-primary shadow-xs' : 'bg-light border-light opacity-60'}`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="d-block text-navy text-capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </strong>
                            <span className="small text-muted">
                              Status: {isVisible ? <span className="text-success fw-bold">● Visible</span> : <span className="text-muted">○ Hidden</span>}
                            </span>
                          </div>
                          <div className="form-check form-switch fs-5 mb-0">
                            <input
                              className="form-check-input cursor-pointer"
                              type="checkbox"
                              role="switch"
                              checked={isVisible}
                              onChange={() => toggleSection(key)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ANNOUNCEMENTS MANAGER */}
          {activeTab === 'announcements' && (
            <div className="announcements-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Circulars & Announcements</h4>
                  <p className="text-muted small mb-0">Create, edit, or toggle visibility of school circulars and PDF attachments.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('announcement');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>New Announcement</span>
                </button>
              </div>

              {/* Table / Cards */}
              <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="py-3 px-4">Title & Details</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Featured</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-4 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {announcements.map((ann) => (
                        <tr key={ann.id}>
                          <td className="py-3 px-4">
                            <strong className="text-navy d-block">{ann.title}</strong>
                            <span className="text-muted small line-clamp-1">{ann.description}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-primary-soft text-primary rounded-pill small">
                              {ann.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 small text-muted">{ann.date}</td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleAnnouncementFeatured(ann.id)}
                              className={`btn btn-sm border-0 ${ann.featured ? 'text-warning' : 'text-muted opacity-40'}`}
                              title="Toggle Featured"
                            >
                              ★
                            </button>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleAnnouncementVisibility(ann.id)}
                              className={`btn btn-sm rounded-pill px-2.5 py-0.5 small fw-semibold ${
                                ann.visible ? 'btn-success bg-opacity-15 text-success border-0' : 'btn-secondary bg-opacity-20 text-muted border-0'
                              }`}
                            >
                              {ann.visible ? '● Visible' : '○ Hidden'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem({ type: 'announcement', data: ann });
                                  setShowAddModal('announcement');
                                }}
                                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Delete this announcement?')) {
                                    deleteAnnouncement(ann.id);
                                  }
                                }}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EVENTS MANAGER */}
          {activeTab === 'events' && (
            <div className="events-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage School Events</h4>
                  <p className="text-muted small mb-0">Publish athletic meets, cultural festivals, workshops, and exhibitions.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('event');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>Create Event</span>
                </button>
              </div>

              <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="py-3 px-4">Event</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Date & Time</th>
                        <th className="py-3 px-3">Venue</th>
                        <th className="py-3 px-3">Featured</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-4 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((ev) => (
                        <tr key={ev.id}>
                          <td className="py-3 px-4">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={ev.coverImage}
                                alt={ev.title}
                                className="rounded-3 object-fit-cover flex-shrink-0"
                                style={{ width: '48px', height: '48px' }}
                              />
                              <div>
                                <strong className="text-navy d-block">{ev.title}</strong>
                                <span className="text-muted small line-clamp-1">{ev.description}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-gold text-dark rounded-pill small">{ev.category}</span>
                          </td>
                          <td className="py-3 px-3 small text-muted">
                            <div>{ev.date}</div>
                            <div>{ev.time}</div>
                          </td>
                          <td className="py-3 px-3 small text-muted">{ev.location}</td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleEventFeatured(ev.id)}
                              className={`btn btn-sm border-0 ${ev.featured ? 'text-warning' : 'text-muted opacity-40'}`}
                            >
                              ★
                            </button>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleEventVisibility(ev.id)}
                              className={`btn btn-sm rounded-pill px-2.5 py-0.5 small fw-semibold ${
                                ev.visible ? 'btn-success bg-opacity-15 text-success border-0' : 'btn-secondary bg-opacity-20 text-muted border-0'
                              }`}
                            >
                              {ev.visible ? '● Published' : '○ Draft'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem({ type: 'event', data: ev });
                                  setShowAddModal('event');
                                }}
                                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Remove this event?')) {
                                    deleteEvent(ev.id);
                                  }
                                }}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="gallery-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Photo Gallery</h4>
                  <p className="text-muted small mb-0">Upload photos, assign categories, and organize campus albums.</p>
                </div>
                <button
                  onClick={() => setShowAddModal('gallery')}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiUpload size={16} />
                  <span>Upload Image</span>
                </button>
              </div>

              <div className="row g-3">
                {gallery.map((item) => (
                  <div key={item.id} className="col-sm-6 col-md-4 col-xl-3">
                    <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100">
                      <div className="position-relative" style={{ height: '160px' }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <span className="badge bg-gold text-dark position-absolute top-0 start-0 m-2 small">
                          {item.category}
                        </span>
                      </div>
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        <strong className="d-block text-navy small text-truncate mb-2">{item.title}</strong>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                          <button
                            onClick={() => toggleGalleryVisibility(item.id)}
                            className={`btn btn-xs rounded-pill px-2 py-0.5 small ${
                              item.visible ? 'btn-success bg-opacity-15 text-success border-0' : 'btn-secondary bg-opacity-20 text-muted border-0'
                            }`}
                          >
                            {item.visible ? 'Visible' : 'Hidden'}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this gallery photo?')) {
                                deleteGalleryItem(item.id);
                              }
                            }}
                            className="btn btn-sm text-danger border-0 p-1"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ACHIEVEMENTS MANAGER */}
          {activeTab === 'achievements' && (
            <div className="achievements-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Student Achievements</h4>
                  <p className="text-muted small mb-0">Record olympiad triumphs, sports medals, science fair laureates, and art awards.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('achievement');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>Add Achievement</span>
                </button>
              </div>

              <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="py-3 px-4">Award Title & Honoree</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Badge / Honor</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Featured</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-4 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {achievements.map((ach) => (
                        <tr key={ach.id}>
                          <td className="py-3 px-4">
                            <strong className="text-navy d-block">{ach.title}</strong>
                            <span className="text-primary small fw-semibold">Honoree: {ach.studentName}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-primary-soft text-primary rounded-pill small">{ach.category}</span>
                          </td>
                          <td className="py-3 px-3 small">{ach.badge}</td>
                          <td className="py-3 px-3 small text-muted">{ach.date}</td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleAchievementFeatured(ach.id)}
                              className={`btn btn-sm border-0 ${ach.featured ? 'text-warning' : 'text-muted opacity-40'}`}
                            >
                              ★
                            </button>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => toggleAchievementVisibility(ach.id)}
                              className={`btn btn-sm rounded-pill px-2.5 py-0.5 small fw-semibold ${
                                ach.visible ? 'btn-success bg-opacity-15 text-success border-0' : 'btn-secondary bg-opacity-20 text-muted border-0'
                              }`}
                            >
                              {ach.visible ? '● Visible' : '○ Hidden'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem({ type: 'achievement', data: ach });
                                  setShowAddModal('achievement');
                                }}
                                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Delete this achievement?')) {
                                    deleteAchievement(ach.id);
                                  }
                                }}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ACADEMIC PROGRAMMES */}
          {activeTab === 'academics' && (
            <div className="academics-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Academic Wings</h4>
                  <p className="text-muted small mb-0">Configure primary, middle, and early childhood learning levels.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('programme');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>Add Programme</span>
                </button>
              </div>

              <div className="row g-4">
                {programmes.map((prog) => (
                  <div key={prog.id} className="col-md-6">
                    <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge bg-gold text-dark fw-bold small">{prog.badge}</span>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem({ type: 'programme', data: prog });
                              setShowAddModal('programme');
                            }}
                            className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this academic level?')) {
                                deleteProgramme(prog.id);
                              }
                            }}
                            className="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <h5 className="fw-bold text-navy mb-1">{prog.title}</h5>
                      <span className="text-muted small d-block mb-3">{prog.ageGroup}</span>
                      <p className="text-muted small mb-0">{prog.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CAMPUS FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="facilities-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Campus Facilities</h4>
                  <p className="text-muted small mb-0">Update laboratories, libraries, smart classrooms, sports arena, and transport details.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('facility');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>Add Facility</span>
                </button>
              </div>

              <div className="row g-4">
                {facilities.map((fac) => (
                  <div key={fac.id} className="col-md-6 col-lg-4">
                    <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge bg-primary-soft text-primary small">{fac.category}</span>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem({ type: 'facility', data: fac });
                              setShowAddModal('facility');
                            }}
                            className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Remove this facility?')) {
                                deleteFacility(fac.id);
                              }
                            }}
                            className="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <h5 className="fw-bold text-navy mb-1">{fac.title}</h5>
                      <p className="text-muted small mb-0">{fac.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: TESTIMONIALS MANAGER */}
          {activeTab === 'testimonials' && (
            <div className="testimonials-manager-pane">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-navy mb-1">Manage Testimonials</h4>
                  <p className="text-muted small mb-0">Parent, student, and alumni reviews displayed on the website.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddModal('testimonial');
                  }}
                  className="btn btn-navy rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                >
                  <FiPlus size={16} />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="row g-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="col-md-6">
                    <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-1 text-gold">
                          {Array.from({ length: test.rating || 5 }).map((_, i) => (
                            <FiStar key={i} size={15} fill="#f59e0b" />
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this testimonial?')) {
                              deleteTestimonial(test.id);
                            }
                          }}
                          className="btn btn-sm text-danger border-0 p-1"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                      <p className="text-muted fst-italic small mb-3">"{test.quote}"</p>
                      <div className="pt-2 border-top mt-auto">
                        <strong className="text-navy d-block small">{test.name}</strong>
                        <span className="text-muted small">{test.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: HERO VIDEO & BRANDING */}
          {activeTab === 'hero' && (
            <div className="hero-settings-pane">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white" style={{ maxWidth: '880px' }}>
                <h4 className="fw-bold text-navy mb-1">Hero Video & Visual Settings</h4>
                <p className="text-muted small mb-4">
                  Configure the cinematic school background video, fallback poster, headline titles, and call-to-action buttons.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateHeroSettings(heroForm);
                  }}
                >
                  <div className="row g-4 mb-4">
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Hero Background Video URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.videoUrl}
                        onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                        placeholder="https://...mp4"
                      />
                      <span className="text-muted small">Direct MP4 video URL stream for the cinematic loop.</span>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Fallback Poster Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.fallbackPoster}
                        onChange={(e) => setHeroForm({ ...heroForm, fallbackPoster: e.target.value })}
                        placeholder="https://...jpg"
                      />
                      <span className="text-muted small">High-resolution poster loaded when video is buffering or disabled.</span>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Badge / Pill Text</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.badgeText}
                        onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Main Hero Headline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.title}
                        onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Hero Subtitle / Description</label>
                      <textarea
                        rows="2"
                        className="form-control"
                        value={heroForm.subtitle}
                        onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Primary CTA Button Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.primaryCtaText}
                        onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Secondary CTA Button Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.secondaryCtaText}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="p-3 bg-light rounded-3 border mb-4">
                    <h6 className="fw-bold text-navy mb-3">Playback Controls</h6>
                    <div className="d-flex flex-wrap gap-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="heroVideoEnabled"
                          checked={heroForm.videoEnabled}
                          onChange={(e) => setHeroForm({ ...heroForm, videoEnabled: e.target.checked })}
                        />
                        <label className="form-check-label small fw-semibold" htmlFor="heroVideoEnabled">
                          Enable Video Hero
                        </label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="heroAutoplay"
                          checked={heroForm.autoplay}
                          onChange={(e) => setHeroForm({ ...heroForm, autoplay: e.target.checked })}
                        />
                        <label className="form-check-label small fw-semibold" htmlFor="heroAutoplay">
                          Autoplay
                        </label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="heroLoop"
                          checked={heroForm.loop}
                          onChange={(e) => setHeroForm({ ...heroForm, loop: e.target.checked })}
                        />
                        <label className="form-check-label small fw-semibold" htmlFor="heroLoop">
                          Loop Playback
                        </label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="heroMuted"
                          checked={heroForm.muted}
                          onChange={(e) => setHeroForm({ ...heroForm, muted: e.target.checked })}
                        />
                        <label className="form-check-label small fw-semibold" htmlFor="heroMuted">
                          Muted Default
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-navy rounded-pill px-5 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                  >
                    <FiSave size={16} />
                    <span>Save Hero Changes</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 11: PRINCIPAL MESSAGE */}
          {activeTab === 'leadership' && (
            <div className="leadership-settings-pane">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white" style={{ maxWidth: '800px' }}>
                <h4 className="fw-bold text-navy mb-1">Principal's Address & Profile</h4>
                <p className="text-muted small mb-4">Edit the principal's official message, title, and qualifications.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateLeadership(leadForm);
                  }}
                >
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Principal Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Official Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={leadForm.title}
                        onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Profile Photo URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={leadForm.photo}
                        onChange={(e) => setLeadForm({ ...leadForm, photo: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Short Highlight Quote</label>
                      <input
                        type="text"
                        className="form-control"
                        value={leadForm.shortQuote}
                        onChange={(e) => setLeadForm({ ...leadForm, shortQuote: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Full Address Message</label>
                      <textarea
                        rows="6"
                        className="form-control"
                        value={leadForm.fullMessage}
                        onChange={(e) => setLeadForm({ ...leadForm, fullMessage: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Qualifications & Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        value={leadForm.qualifications}
                        onChange={(e) => setLeadForm({ ...leadForm, qualifications: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-navy rounded-pill px-5 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                  >
                    <FiSave size={16} />
                    <span>Update Principal Message</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 12: SITE SETTINGS & CONTACT */}
          {activeTab === 'settings' && (
            <div className="site-settings-pane">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white" style={{ maxWidth: '850px' }}>
                <h4 className="fw-bold text-navy mb-1">School Information & Site Settings</h4>
                <p className="text-muted small mb-4">Central branding, contact phone numbers, emails, and address.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSiteSettings(settingsForm);
                  }}
                >
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">School Short Brand Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.schoolName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, schoolName: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">School Full Official Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.schoolFullName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, schoolFullName: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">School Motto</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.motto}
                        onChange={(e) => setSettingsForm({ ...settingsForm, motto: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Govt. Recognition Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.affiliation}
                        onChange={(e) => setSettingsForm({ ...settingsForm, affiliation: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Campus Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Phone Numbers</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Official Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Office Visiting Hours</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settingsForm.officeHours}
                        onChange={(e) => setSettingsForm({ ...settingsForm, officeHours: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pt-3 border-top">
                    <button
                      type="submit"
                      className="btn btn-navy rounded-pill px-5 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                    >
                      <FiSave size={16} />
                      <span>Save Site Information</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset all CMS data and settings to original defaults?')) {
                          resetToDefaults();
                        }
                      }}
                      className="btn btn-outline-danger rounded-pill px-4 py-2 small fw-semibold d-inline-flex align-items-center gap-2"
                    >
                      <FiRotateCcw size={14} />
                      <span>Reset to Original Defaults</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- ADD / EDIT ANNOUNCEMENT MODAL --- */}
      {showAddModal === 'announcement' && (
        <AnnouncementFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            if (editingItem?.data?.id) {
              updateAnnouncement(editingItem.data.id, data);
            } else {
              addAnnouncement(data);
            }
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- ADD / EDIT EVENT MODAL --- */}
      {showAddModal === 'event' && (
        <EventFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            if (editingItem?.data?.id) {
              updateEvent(editingItem.data.id, data);
            } else {
              addEvent(data);
            }
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- ADD / EDIT ACHIEVEMENT MODAL --- */}
      {showAddModal === 'achievement' && (
        <AchievementFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            if (editingItem?.data?.id) {
              updateAchievement(editingItem.data.id, data);
            } else {
              addAchievement(data);
            }
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- ADD GALLERY IMAGE MODAL --- */}
      {showAddModal === 'gallery' && (
        <GalleryUploadModal
          onSave={(data) => {
            addGalleryItem(data);
            setShowAddModal(null);
          }}
          onClose={() => setShowAddModal(null)}
        />
      )}

      {/* --- ADD / EDIT PROGRAMME MODAL --- */}
      {showAddModal === 'programme' && (
        <ProgrammeFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            if (editingItem?.data?.id) {
              updateProgramme(editingItem.data.id, data);
            } else {
              addProgramme(data);
            }
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- ADD / EDIT FACILITY MODAL --- */}
      {showAddModal === 'facility' && (
        <FacilityFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            if (editingItem?.data?.id) {
              updateFacility(editingItem.data.id, data);
            } else {
              addFacility(data);
            }
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- ADD / EDIT TESTIMONIAL MODAL --- */}
      {showAddModal === 'testimonial' && (
        <TestimonialFormModal
          initialData={editingItem?.data}
          onSave={(data) => {
            addTestimonial(data);
            setShowAddModal(null);
            setEditingItem(null);
          }}
          onClose={() => {
            setShowAddModal(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* --- LIVE PREVIEW MODAL --- */}
      {showPreviewModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowPreviewModal(false)}>
          <div
            className="custom-modal-dialog animated-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '95vw', width: '1200px', height: '85vh' }}
          >
            <div className="modal-content h-100 border-0 rounded-4 shadow-2xl overflow-hidden d-flex flex-column bg-dark text-white">
              <div className="p-3 bg-navy border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span className="live-pulse-dot"></span>
                  <strong className="text-white">Live Public Website Preview</strong>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link to="/" target="_blank" className="btn btn-xs btn-gold rounded-pill px-3 py-1 fw-bold small">
                    Open in New Tab ↗
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-light rounded-circle p-1 border-0"
                    onClick={() => setShowPreviewModal(false)}
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
              <iframe
                src="/"
                title="School Website Preview"
                className="w-100 flex-grow-1 border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SUB-FORM MODALS ---

const AnnouncementFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      description: '',
      content: '',
      category: 'Academic',
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      image: '',
      attachmentUrl: '',
      featured: false,
      visible: true
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Announcement' : 'New Announcement'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
          >
            <div className="mb-3">
              <label className="form-label small fw-semibold">Title *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Admissions">Admissions</option>
                  <option value="Academic">Academic</option>
                  <option value="Event">Event</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Notice">Notice</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date || form.startDate}
                  onChange={(e) => setForm({ ...form, date: e.target.value, startDate: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Brief Summary *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Notice Content</label>
              <textarea
                rows="3"
                className="form-control"
                value={form.content || ''}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">PDF Attachment URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://...circular.pdf"
                value={form.attachmentUrl || ''}
                onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Header Image URL (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={form.image || ''}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="d-flex gap-4 p-3 bg-light rounded-3 mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="annFeatured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="annFeatured">
                  Featured Notice
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="annVisible"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="annVisible">
                  Visible on Public Site
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">
                Save Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EventFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      description: '',
      content: '',
      category: 'Sports',
      date: new Date().toISOString().split('T')[0],
      time: '09:00 AM – 03:00 PM',
      location: 'School Main Ground',
      coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      registrationUrl: '',
      featured: false,
      visible: true
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Event' : 'Create School Event'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
          >
            <div className="mb-3">
              <label className="form-label small fw-semibold">Event Title *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Academic">Academic</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold">Date *</label>
                <input
                  type="date"
                  required
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold">Timing</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Location / Venue</label>
              <input
                type="text"
                className="form-control"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Cover Image URL</label>
              <input
                type="text"
                className="form-control"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Short Description *</label>
              <textarea
                rows="2"
                required
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Registration URL (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://forms.gle/..."
                value={form.registrationUrl || ''}
                onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
              />
            </div>

            <div className="d-flex gap-4 p-3 bg-light rounded-3 mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="eventFeatured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="eventFeatured">
                  Featured Event
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="eventVisible"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="eventVisible">
                  Published
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">
                Save Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AchievementFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      studentName: '',
      category: 'Academic',
      badge: '🏆 State Winner',
      date: new Date().toISOString().split('T')[0],
      description: '',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      certificateUrl: '',
      featured: true,
      visible: true
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Achievement' : 'Record Achievement'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
          >
            <div className="mb-3">
              <label className="form-label small fw-semibold">Achievement / Competition Title *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Student / Team Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={form.studentName}
                  onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Medal / Badge Tag</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Award Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                rows="2"
                required
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Certificate PDF / Image URL (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={form.certificateUrl || ''}
                onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
              />
            </div>

            <div className="d-flex gap-4 p-3 bg-light rounded-3 mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="achFeatured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="achFeatured">
                  Featured in Hall of Fame
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="achVisible"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="achVisible">
                  Visible
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">
                Save Achievement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const GalleryUploadModal = ({ onSave, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Academics',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
  });

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">Upload / Add Gallery Image</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
          >
            <div className="mb-3">
              <label className="form-label small fw-semibold">Photo Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Smart Classroom Interactive Session"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Album Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Academics">Academics</option>
                <option value="Sports">Sports</option>
                <option value="Events">Events</option>
                <option value="Arts">Arts</option>
                <option value="Campus">Campus</option>
                <option value="Celebrations">Celebrations</option>
                <option value="Students">Students</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Image URL *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Caption / Description</label>
              <textarea
                rows="2"
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            {/* Preview */}
            {form.imageUrl && (
              <div className="mb-4 text-center">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="rounded-3 shadow-sm object-fit-cover w-100"
                  style={{ maxHeight: '180px' }}
                />
              </div>
            )}

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">
                Upload Photo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProgrammeFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      ageGroup: 'Ages 6 to 10 Years',
      badge: 'Inquiry & Discovery',
      description: '',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      highlights: ['Interactive learning', 'Experiential labs', 'Holistic evaluation']
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Programme' : 'Add Programme'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Programme Title *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Age Group / Grades</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.ageGroup}
                  onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Badge Tag</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                rows="3"
                required
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Cover Image URL</label>
              <input
                type="text"
                className="form-control"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">Save Programme</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const FacilityFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      category: 'Academic',
      description: '',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      features: ['Modern equipment', 'Safe environment', 'Guided supervision']
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Facility' : 'Add Facility'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Facility Name *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Category</label>
              <input
                type="text"
                className="form-control"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                rows="3"
                required
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">Save Facility</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const TestimonialFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData || {
      name: '',
      role: 'Parent',
      type: 'Parent',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: ''
    }
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-content border-0 rounded-4 shadow-2xl p-4 p-md-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-navy mb-0">{initialData ? 'Edit Testimonial' : 'Add Testimonial'}</h4>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Author Name *</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Role / Grade</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Star Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="form-control"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value, 10) || 5 })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Testimonial Quote *</label>
              <textarea
                rows="4"
                required
                className="form-control"
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-navy rounded-pill px-4 fw-bold">Save Testimonial</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Controller;

