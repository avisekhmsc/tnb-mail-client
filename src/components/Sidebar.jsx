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
  Folder,
  Tag,
  Shield,
  HelpCircle,
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
      className={`bg-white shadow-xl transition-all duration-300 flex flex-col fixed left-0 top-0 h-screen ${
        isCollapsed ? 'w-16' : 'w-72'
      } h-screen border-r border-gray-100`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <img
              src="https://tastenbite.com/wp-content/uploads/2021/06/TB-PNG.png"
              alt="TNB Logo"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              <span className="text-blue-600">TNB</span> Mail
            </span>
          </div>
        ) : (
          <div className="p-0">
            <button
              onClick={toggleSidebar}
              className="w-full bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <img
                src="https://tastenbite.com/wp-content/uploads/2021/06/TB-PNG.png"
                alt="TNB Logo"
                className="h-10 w-auto"
              />
            </button>
          </div>
        )}
      </div>

      {/* Compose Button */}
      {!isCollapsed && (
        <div className="p-4">
          <button
            onClick={() => router.push('/compose')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Compose</span>
          </button>
        </div>
      )}

      {/* Collapsed Compose Button */}
      {isCollapsed && (
        <div className="p-2">
          <button
            onClick={() => router.push('/compose')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
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
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.count > 0 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}
                    >

                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Folders Section */}
          {/* {!isCollapsed && (
            <div className="mt-8">
              <button
                onClick={() => toggleSection('folders')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span>Folders</span>
                </div>
                {expandedSections.folders ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
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
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
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
          )} */}

          {/* Labels Section */}
          {!isCollapsed && (
            <div className="mt-6">
              <button
                onClick={() => toggleSection('labels')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span>Labels</span>
                </div>
                {expandedSections.labels ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
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
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
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
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500'}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Storage Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Shield className="w-4 h-4 text-gray-500" />
            <span>Storage</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: '2%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">0 GB of 10 GB used</p>
        </div>
      )}
    </div>
  );
}