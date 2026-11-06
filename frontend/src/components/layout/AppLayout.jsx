import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-wrapper">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
