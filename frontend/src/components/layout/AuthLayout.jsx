import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div className="w-100" style={{ maxWidth: '440px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
