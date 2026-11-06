import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AcademicProvider } from './contexts/AcademicContext';
import { ToastProvider } from './contexts/ToastContext';
import { router } from './router';

export const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <AcademicProvider>
          <RouterProvider router={router} />
        </AcademicProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
