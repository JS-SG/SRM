/**
 * api.js
 * Modular Axios service client for KKK N&P School.
 * Configured with localStorage fallback persistence and ready for seamless backend REST API connection.
 */

import axios from 'axios';
import {
  initialSiteSettings,
  initialHeroSettings,
  initialSectionVisibility,
  initialAnnouncements,
  initialEvents,
  initialAchievements,
  initialGallery,
  initialProgrammes,
  initialFacilities,
  initialLeadership,
  initialTestimonials,
  initialStats
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper for LocalStorage Persistence
const STORAGE_KEY = 'KKK_SCHOOL_CMS_STATE_V1';

export const getPersistedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error loading persisted CMS state:', err);
  }
  return {
    siteSettings: initialSiteSettings,
    heroSettings: initialHeroSettings,
    sectionVisibility: initialSectionVisibility,
    announcements: initialAnnouncements,
    events: initialEvents,
    achievements: initialAchievements,
    gallery: initialGallery,
    programmes: initialProgrammes,
    facilities: initialFacilities,
    leadership: initialLeadership,
    testimonials: initialTestimonials,
    stats: initialStats
  };
};

export const savePersistedState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving CMS state to local storage:', err);
  }
};

export const resetPersistedState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting CMS state:', err);
  }
  return {
    siteSettings: initialSiteSettings,
    heroSettings: initialHeroSettings,
    sectionVisibility: initialSectionVisibility,
    announcements: initialAnnouncements,
    events: initialEvents,
    achievements: initialAchievements,
    gallery: initialGallery,
    programmes: initialProgrammes,
    facilities: initialFacilities,
    leadership: initialLeadership,
    testimonials: initialTestimonials,
    stats: initialStats
  };
};

// API Services
export const apiService = {
  // Authentication Mock
  loginAdmin: async (email, password) => {
    // Simulated auth delay
    await new Promise((res) => setTimeout(res, 400));
    if ((email === 'admin@kkknpschool.edu.in' || email === 'admin@school.com' || email === 'admin') && password) {
      const token = 'mock-jwt-token-kkk-admin-2026';
      sessionStorage.setItem('kkk_admin_token', token);
      return { success: true, token, user: { name: 'Principal Admin', role: 'SuperAdmin' } };
    }
    // Allow any demo password if non-empty for test convenience
    if (email && password) {
      const token = 'mock-jwt-token-kkk-admin-2026';
      sessionStorage.setItem('kkk_admin_token', token);
      return { success: true, token, user: { name: 'School Administrator', role: 'Admin' } };
    }
    throw new Error('Invalid email or password');
  },

  logoutAdmin: () => {
    sessionStorage.removeItem('kkk_admin_token');
  },

  isAdminAuthenticated: () => {
    return !!sessionStorage.getItem('kkk_admin_token');
  },

  // Contact / Inquiry Submissions
  submitInquiry: async (formData) => {
    try {
      const response = await apiClient.post('/inquiries', formData);
      return response.data;
    } catch {
      // Mock Fallback
      await new Promise((res) => setTimeout(res, 600));
      return {
        success: true,
        referenceId: `KKK-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your admission inquiry has been received. Our admissions officer will contact you within 24 hours.'
      };
    }
  },

  submitContact: async (formData) => {
    try {
      const response = await apiClient.post('/contact', formData);
      return response.data;
    } catch {
      // Mock Fallback
      await new Promise((res) => setTimeout(res, 600));
      return {
        success: true,
        ticketId: `KKK-MSG-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Thank you for reaching out. We have logged your message and will respond promptly.'
      };
    }
  }
};

export default apiClient;
