import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';

// Layouts
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import StudentsPage from './pages/admin/StudentsPage';
import StudentDetailPage from './pages/admin/StudentDetailPage';
import StaffPage from './pages/admin/StaffPage';
import StaffDetailPage from './pages/admin/StaffDetailPage';
import AcademicPage from './pages/admin/AcademicPage';
import ClassesPage from './pages/admin/ClassesPage';
import ClassAssignmentsPage from './pages/admin/ClassAssignmentsPage';
import SubjectsPage from './pages/admin/SubjectsPage';
import ExamsPage from './pages/admin/ExamsPage';
import MarksEntryPage from './pages/admin/MarksEntryPage';
import MarksReportsPage from './pages/admin/MarksReportsPage';
import FeesPage from './pages/admin/FeesPage';
import FeeReportsPage from './pages/admin/FeeReportsPage';
import WhatsAppPage from './pages/admin/WhatsAppPage';
import NotificationHistoryPage from './pages/admin/NotificationHistoryPage';
import PermissionsPage from './pages/admin/PermissionsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';

// Teacher Pages
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherStudentsPage from './pages/teacher/TeacherStudentsPage';
import TeacherMarksPage from './pages/teacher/TeacherMarksPage';

/**
 * Protected Route wrapper for authenticated users
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <LoadingSpinner message="Authenticating session..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Role Route wrapper for Admin-only or Teacher-only screens
 */
const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/teacher/dashboard'} replace />;
  }

  return children;
};

/**
 * Root Index Redirect based on role
 */
const IndexRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <LoadingSpinner message="Starting SRM Portal..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/teacher/dashboard'} replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexRedirect />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // ================= ADMIN ROUTES =================
      {
        path: '/admin/dashboard',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <AdminDashboardPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/students',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <StudentsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/students/:id',
        element: (
          <RoleRoute allowedRoles={['ADMIN', 'TEACHER']}>
            <StudentDetailPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/staff',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <StaffPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/staff/:id',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <StaffDetailPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/academic',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <AcademicPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/classes',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <ClassesPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/class-assignments',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <ClassAssignmentsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/subjects',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <SubjectsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/exams',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <ExamsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/marks',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <MarksEntryPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/marks-reports',
        element: (
          <RoleRoute allowedRoles={['ADMIN', 'TEACHER']}>
            <MarksReportsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/fees',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <FeesPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/fee-reports',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <FeeReportsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/whatsapp',
        element: (
          <RoleRoute allowedRoles={['ADMIN', 'TEACHER']}>
            <WhatsAppPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/notification-history',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <NotificationHistoryPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/permissions',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <PermissionsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/admin/audit-logs',
        element: (
          <RoleRoute allowedRoles={['ADMIN']}>
            <AuditLogsPage />
          </RoleRoute>
        ),
      },

      // ================= TEACHER ROUTES =================
      {
        path: '/teacher/dashboard',
        element: (
          <RoleRoute allowedRoles={['TEACHER']}>
            <TeacherDashboardPage />
          </RoleRoute>
        ),
      },
      {
        path: '/teacher/students',
        element: (
          <RoleRoute allowedRoles={['TEACHER']}>
            <TeacherStudentsPage />
          </RoleRoute>
        ),
      },
      {
        path: '/teacher/marks',
        element: (
          <RoleRoute allowedRoles={['TEACHER']}>
            <TeacherMarksPage />
          </RoleRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
