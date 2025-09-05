'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Send,
  FileText,
  Star,
  Archive,
  Trash2,
  AlertCircle,
  Users,
  Settings,
  Plus,
  Search,
  Folder,
  Tag,
  Shield,
  HelpCircle,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function MailAppSidebar({ isCollapsed, toggleSidebar }) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({
    folders: true,
    labels: false
  });
  const [activeItem, setActiveItem] = useState('inbox');

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const mainMenuItems = [
    { id: 'inbox', label: 'Inbox', icon: Mail, count: 42, route: '/inbox' },
    { id: 'starred', label: 'Starred', icon: Star, count: 7, route: '/starred' },
    { id: 'sent', label: 'Sent', icon: Send, route: '/sent' },
    { id: 'drafts', label: 'Drafts', icon: FileText, count: 3, route: '/drafts' },
    { id: 'archive', label: 'Archive', icon: Archive, route: '/archive' },
    { id: 'spam', label: 'Spam', icon: AlertCircle, count: 12, route: '/spam' },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 5, route: '/trash' },
    { id: 'all', label: 'All Mail', icon: Mail, route: '/all' }
  ];

  const folders = [
    { id: 'work', label: 'Work', count: 15, route: '/folders/work' },
    { id: 'personal', label: 'Personal', count: 8, route: '/folders/personal' },
    { id: 'finance', label: 'Finance', count: 3, route: '/folders/finance' },
    { id: 'travel', label: 'Travel', count: 0, route: '/folders/travel' }
  ];

  const labels = [
    { id: 'important', label: 'Important', color: 'bg-red-500', route: '/labels/important' },
    { id: 'urgent', label: 'Urgent', color: 'bg-orange-500', route: '/labels/urgent' },
    { id: 'project', label: 'Project A', color: 'bg-blue-500', route: '/labels/project' },
    { id: 'client', label: 'Client Work', color: 'bg-green-500', route: '/labels/client' },
    { id: 'review', label: 'Review', color: 'bg-purple-500', route: '/labels/review' }
  ];

  const bottomMenuItems = [
    { id: 'contacts', label: 'Contacts', icon: Users, route: '/contacts' },
    { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, route: '/help' }
  ];

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-72'
      } h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">TNB Mail App</span>
          </div>
        ) : (
          <div className="p-0">
            <button
              className="w-full bg-gradient-to-r from-white to-white text-black rounded-lg flex items-center justify-center hover:from-gray-300 hover:to-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Mail className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>

      {/* Compose Button */}
      {!isCollapsed && (
        <div className="p-4">
          <button
            onClick={() => router.push('/compose')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Compose</span>
          </button>
        </div>
      )}

      {/* Collapsed Compose Button */}
      {isCollapsed && (
        <div className="p-2">
          <button
            onClick={() => router.push('/compose')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2">
          {/* Primary Items */}
          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    router.push(item.route);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.count > 0 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Folders Section */}
          {!isCollapsed && (
            <div className="mt-8">
              <button
                onClick={() => toggleSection('folders')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Folder className="w-4 h-4" />
                  <span>Folders</span>
                </div>
                {expandedSections.folders ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedSections.folders && (
                <div className="ml-4 space-y-1">
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => {
                        setActiveItem(folder.id);
                        router.push(folder.route);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        activeItem === folder.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <span>{folder.label}</span>
                      {folder.count > 0 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {folder.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Labels Section */}
          {!isCollapsed && (
            <div className="mt-6">
              <button
                onClick={() => toggleSection('labels')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Labels</span>
                </div>
                {expandedSections.labels ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedSections.labels && (
                <div className="ml-4 space-y-1">
                  {labels.map((label) => (
                    <button
                      key={label.id}
                      onClick={() => {
                        setActiveItem(label.id);
                        router.push(label.route);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        activeItem === label.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                      <span>{label.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 p-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                router.push(item.route);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Storage Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Shield className="w-4 h-4" />
            <span>Storage</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              style={{ width: '68%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">6.8 GB of 10 GB used</p>
        </div>
      )}
    </div>
  );
}