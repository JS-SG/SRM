/**
 * SiteContext.jsx
 * The Central Brain of KKK N&P School Website.
 * Connects the Central Controller CMS with all public pages in real-time.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getPersistedState, savePersistedState, resetPersistedState } from '../services/api';

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [state, setState] = useState(() => getPersistedState());
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-save any state change to localStorage
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // --- 1. SECTION VISIBILITY TOGGLE ---
  const toggleSection = useCallback((sectionKey, explicitValue) => {
    setState((prev) => {
      const currentVal = prev.sectionVisibility[sectionKey];
      const newVal = explicitValue !== undefined ? explicitValue : !currentVal;
      return {
        ...prev,
        sectionVisibility: {
          ...prev.sectionVisibility,
          [sectionKey]: newVal
        }
      };
    });
    showToast(`✓ Section '${sectionKey}' visibility updated`);
  }, [showToast]);

  // --- 2. HERO SETTINGS ---
  const updateHeroSettings = useCallback((newSettings) => {
    setState((prev) => ({
      ...prev,
      heroSettings: {
        ...prev.heroSettings,
        ...newSettings
      }
    }));
    showToast('✓ Hero & Video settings saved successfully');
  }, [showToast]);

  // --- 3. SITE SETTINGS ---
  const updateSiteSettings = useCallback((newSettings) => {
    setState((prev) => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        ...newSettings
      }
    }));
    showToast('✓ School information and branding updated');
  }, [showToast]);

  // --- 4. ANNOUNCEMENTS CRUD ---
  const addAnnouncement = useCallback((item) => {
    const newItem = {
      id: Date.now(),
      visible: true,
      featured: false,
      date: new Date().toISOString().split('T')[0],
      ...item
    };
    setState((prev) => ({
      ...prev,
      announcements: [newItem, ...prev.announcements]
    }));
    showToast('✓ New announcement published');
    return newItem;
  }, [showToast]);

  const updateAnnouncement = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) =>
        a.id === id ? { ...a, ...updatedFields } : a
      )
    }));
    showToast('✓ Announcement updated');
  }, [showToast]);

  const deleteAnnouncement = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id)
    }));
    showToast('✓ Announcement deleted');
  }, [showToast]);

  const toggleAnnouncementVisibility = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) =>
        a.id === id ? { ...a, visible: !a.visible } : a
      )
    }));
    showToast('✓ Announcement status updated');
  }, [showToast]);

  const toggleAnnouncementFeatured = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) =>
        a.id === id ? { ...a, featured: !a.featured } : a
      )
    }));
    showToast('✓ Featured announcement status updated');
  }, [showToast]);

  // --- 5. EVENTS CRUD ---
  const addEvent = useCallback((item) => {
    const newEvent = {
      id: Date.now(),
      visible: true,
      featured: false,
      date: new Date().toISOString().split('T')[0],
      galleryImages: [],
      ...item
    };
    setState((prev) => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
    showToast('✓ New event added to school calendar');
    return newEvent;
  }, [showToast]);

  const updateEvent = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((e) =>
        e.id === id ? { ...e, ...updatedFields } : e
      )
    }));
    showToast('✓ Event details updated');
  }, [showToast]);

  const deleteEvent = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id)
    }));
    showToast('✓ Event removed');
  }, [showToast]);

  const toggleEventVisibility = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((e) =>
        e.id === id ? { ...e, visible: !e.visible } : e
      )
    }));
    showToast('✓ Event visibility toggled');
  }, [showToast]);

  const toggleEventFeatured = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((e) =>
        e.id === id ? { ...e, featured: !e.featured } : e
      )
    }));
    showToast('✓ Event spotlight status updated');
  }, [showToast]);

  // --- 6. ACHIEVEMENTS CRUD ---
  const addAchievement = useCallback((item) => {
    const newAch = {
      id: Date.now(),
      visible: true,
      featured: false,
      date: new Date().toISOString().split('T')[0],
      ...item
    };
    setState((prev) => ({
      ...prev,
      achievements: [newAch, ...prev.achievements]
    }));
    showToast('✓ Student achievement recorded');
    return newAch;
  }, [showToast]);

  const updateAchievement = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, ...updatedFields } : a
      )
    }));
    showToast('✓ Achievement updated');
  }, [showToast]);

  const deleteAchievement = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id)
    }));
    showToast('✓ Achievement deleted');
  }, [showToast]);

  const toggleAchievementVisibility = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, visible: !a.visible } : a
      )
    }));
    showToast('✓ Achievement visibility updated');
  }, [showToast]);

  const toggleAchievementFeatured = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, featured: !a.featured } : a
      )
    }));
    showToast('✓ Featured achievement updated');
  }, [showToast]);

  // --- 7. GALLERY CRUD ---
  const addGalleryItem = useCallback((item) => {
    const newItem = {
      id: Date.now(),
      visible: true,
      date: new Date().toISOString().split('T')[0],
      ...item
    };
    setState((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
    showToast('✓ Photo added to campus gallery');
    return newItem;
  }, [showToast]);

  const addMultipleGalleryItems = useCallback((items) => {
    const newItems = items.map((it, idx) => ({
      id: Date.now() + idx,
      visible: true,
      date: new Date().toISOString().split('T')[0],
      ...it
    }));
    setState((prev) => ({
      ...prev,
      gallery: [...newItems, ...prev.gallery]
    }));
    showToast(`✓ Uploaded ${items.length} images to gallery`);
  }, [showToast]);

  const updateGalleryItem = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) =>
        g.id === id ? { ...g, ...updatedFields } : g
      )
    }));
    showToast('✓ Gallery item updated');
  }, [showToast]);

  const deleteGalleryItem = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id)
    }));
    showToast('✓ Image deleted from gallery');
  }, [showToast]);

  const toggleGalleryVisibility = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) =>
        g.id === id ? { ...g, visible: !g.visible } : g
      )
    }));
    showToast('✓ Gallery photo visibility updated');
  }, [showToast]);

  // --- 8. PROGRAMMES CRUD ---
  const addProgramme = useCallback((item) => {
    const newProg = {
      id: `prog-${Date.now()}`,
      visible: true,
      highlights: [],
      ...item
    };
    setState((prev) => ({
      ...prev,
      programmes: [...prev.programmes, newProg]
    }));
    showToast('✓ Academic programme added');
  }, [showToast]);

  const updateProgramme = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      programmes: prev.programmes.map((p) =>
        p.id === id ? { ...p, ...updatedFields } : p
      )
    }));
    showToast('✓ Programme updated');
  }, [showToast]);

  const deleteProgramme = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      programmes: prev.programmes.filter((p) => p.id !== id)
    }));
    showToast('✓ Programme removed');
  }, [showToast]);

  // --- 9. FACILITIES CRUD ---
  const addFacility = useCallback((item) => {
    const newFac = {
      id: `fac-${Date.now()}`,
      visible: true,
      features: [],
      ...item
    };
    setState((prev) => ({
      ...prev,
      facilities: [...prev.facilities, newFac]
    }));
    showToast('✓ Campus facility added');
  }, [showToast]);

  const updateFacility = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      facilities: prev.facilities.map((f) =>
        f.id === id ? { ...f, ...updatedFields } : f
      )
    }));
    showToast('✓ Facility updated');
  }, [showToast]);

  const deleteFacility = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f.id !== id)
    }));
    showToast('✓ Facility removed');
  }, [showToast]);

  // --- 10. LEADERSHIP & TESTIMONIALS ---
  const updateLeadership = useCallback((newLead) => {
    setState((prev) => ({
      ...prev,
      leadership: {
        ...prev.leadership,
        ...newLead
      }
    }));
    showToast("✓ Principal's message updated");
  }, [showToast]);

  const addTestimonial = useCallback((item) => {
    const newTest = {
      id: Date.now(),
      visible: true,
      rating: 5,
      ...item
    };
    setState((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials]
    }));
    showToast('✓ Testimonial added');
  }, [showToast]);

  const updateTestimonial = useCallback((id, updatedFields) => {
    setState((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      )
    }));
    showToast('✓ Testimonial updated');
  }, [showToast]);

  const deleteTestimonial = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }));
    showToast('✓ Testimonial removed');
  }, [showToast]);

  // --- 11. RESET DEFAULTS ---
  const resetToDefaults = useCallback(() => {
    const defaults = resetPersistedState();
    setState(defaults);
    showToast('✓ All settings reset to original defaults');
  }, [showToast]);

  // --- COMPUTED MEMOIZED SELECTORS FOR PUBLIC WEBSITE ---
  const activeAnnouncements = useMemo(
    () => state.announcements.filter((a) => a.visible !== false),
    [state.announcements]
  );

  const featuredAnnouncements = useMemo(
    () => activeAnnouncements.filter((a) => a.featured),
    [activeAnnouncements]
  );

  const activeEvents = useMemo(
    () => state.events.filter((e) => e.visible !== false),
    [state.events]
  );

  const featuredEvents = useMemo(
    () => activeEvents.filter((e) => e.featured),
    [activeEvents]
  );

  const activeAchievements = useMemo(
    () => state.achievements.filter((a) => a.visible !== false),
    [state.achievements]
  );

  const featuredAchievements = useMemo(
    () => activeAchievements.filter((a) => a.featured),
    [activeAchievements]
  );

  const activeGallery = useMemo(
    () => state.gallery.filter((g) => g.visible !== false),
    [state.gallery]
  );

  const activeProgrammes = useMemo(
    () => state.programmes.filter((p) => p.visible !== false),
    [state.programmes]
  );

  const activeFacilities = useMemo(
    () => state.facilities.filter((f) => f.visible !== false),
    [state.facilities]
  );

  const activeTestimonials = useMemo(
    () => state.testimonials.filter((t) => t.visible !== false),
    [state.testimonials]
  );

  const value = {
    // Raw States
    siteSettings: state.siteSettings,
    heroSettings: state.heroSettings,
    sectionVisibility: state.sectionVisibility,
    announcements: state.announcements,
    events: state.events,
    achievements: state.achievements,
    gallery: state.gallery,
    programmes: state.programmes,
    facilities: state.facilities,
    leadership: state.leadership,
    testimonials: state.testimonials,
    stats: state.stats,
    toastMessage,

    // Filtered lists for public site
    activeAnnouncements,
    featuredAnnouncements,
    activeEvents,
    featuredEvents,
    activeAchievements,
    featuredAchievements,
    activeGallery,
    activeProgrammes,
    activeFacilities,
    activeTestimonials,

    // Dispatch Actions
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
    addMultipleGalleryItems,
    updateGalleryItem,
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
    updateTestimonial,
    deleteTestimonial,
    resetToDefaults,
    showToast
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
      {/* Central Notification Toast */}
      {toastMessage && (
        <div className="admin-toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-white bg-dark border-0 shadow-lg px-3 py-2 rounded-3">
            <div className="d-flex align-items-center gap-2">
              <span className="toast-dot bg-success rounded-circle d-inline-block" style={{ width: 8, height: 8 }}></span>
              <span className="fw-semibold small">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export default SiteContext;
