'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmailList from '../../components/EmailList';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Search,
  RefreshCw,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    fetchEmails();
  }, [user, router]);

  const fetchEmails = async () => {
    try {
      const res = await axios.get('/api/emails/inbox');
      setEmails(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const res = await axios.get(`/api/emails/search?q=${query}`);
        setEmails(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      fetchEmails();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5 text-gray-600" />
            </button> */}
            <h1 className="text-xl font-medium text-gray-800">Inbox</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchEmails}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mail"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Email List */}
      <EmailList emails={emails} type="inbox" />
    </div>
  );
};

export default Inbox;