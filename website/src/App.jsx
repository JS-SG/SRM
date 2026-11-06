import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdmissionsModal from './components/AdmissionsModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Admin CMS Pages
import Controller from './pages/Controller';
import AdminLogin from './pages/AdminLogin';

// Auto Scroll-to-Top on Route Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// Main App Content Layout Router
const AppContent = () => {
  const location = useLocation();
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);

  const openAdmissions = () => setIsAdmissionsOpen(true);
  const closeAdmissions = () => setIsAdmissionsOpen(false);

  // Check if current route is an administrative CMS route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <ScrollToTop />

      {/* Render Public Navbar on all non-admin routes */}
      {!isAdminRoute && <Navbar onOpenAdmissions={openAdmissions} />}

      {/* Main Routed Page Content */}
      <main className="flex-grow-1">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home onOpenAdmissions={openAdmissions} />} />
          <Route path="/about" element={<About onOpenAdmissions={openAdmissions} />} />
          <Route path="/academics" element={<Academics onOpenAdmissions={openAdmissions} />} />
          <Route path="/admissions" element={<Admissions onOpenAdmissions={openAdmissions} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact onOpenAdmissions={openAdmissions} />} />

          {/* Central Controller CMS Routes */}
          <Route path="/admin/controller" element={<Controller />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Fallback */}
          <Route path="*" element={<Home onOpenAdmissions={openAdmissions} />} />
        </Routes>
      </main>

      {/* Render Public Footer on non-admin routes */}
      {!isAdminRoute && <Footer onOpenAdmissions={openAdmissions} />}

      {/* Global Admissions Inquiry Modal */}
      <AdmissionsModal isOpen={isAdmissionsOpen} onClose={closeAdmissions} />
    </div>
  );
};

const App = () => {
  return (
    <SiteProvider>
      <Router>
        <AppContent />
      </Router>
    </SiteProvider>
  );
};

export default App;
