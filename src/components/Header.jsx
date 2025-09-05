'use client';

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header = ({ onSearch, toggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-white via-white to-white text-black p-4 flex items-center justify-between shadow-lg">
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
        <svg
          className="w-5 h-5 text-gray-300 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search mail"
          className="w-full bg-transparent text-white placeholder-gray-300 outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium bg-blue-800/50 px-3 py-1 rounded-full">
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