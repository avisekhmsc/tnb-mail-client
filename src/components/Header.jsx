'use client';

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header = ({ isCollapsed, onSearch, toggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={`bg-gradient-to-r w-auto from-white via-white to-white text-black p-4 flex items-center justify-between shadow-lg top-0 ${isCollapsed ? 'ml-16' : 'ml-72'}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
          aria-label={isSidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
        >
          {isSidebarCollapsed ? (
            <Menu className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex-grow mx-6 bg-white/10 backdrop-blur-md rounded-full flex items-center px-3 py-1.5 border border-white/20">
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium bg-white text-black border border-black px-3 py-1 rounded-full"
        onClick={() => router.push('/profile')}
        >
          {user?.email}
        </span>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-blue-300 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;