'use client';

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import MailAppSidebar from '../components/Sidebar';

const Layout = ({ children, onSearch }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/'];

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Render only children for public paths
  if (publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  // Render full layout for authenticated users
  if (!user) {
    // This should be handled by middleware or page-level redirects, but as a fallback, return null
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <MailAppSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onSearch={onSearch} toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;