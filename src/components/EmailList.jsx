'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Star,
  StarOff,
  Archive,
  Trash2,
  MoreHorizontal,
  Circle,
  CheckCircle2,
  Paperclip,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const EmailList = ({ emails, type }) => {
  const router = useRouter();
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [starredEmails, setStarredEmails] = useState(new Set());

  const toggleEmailSelection = (emailId) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId);
    } else {
      newSelected.add(emailId);
    }
    setSelectedEmails(newSelected);
  };

  const selectAllEmails = () => {
    if (selectedEmails.size === emails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(emails.map((email) => email._id)));
    }
  };

  const toggleStar = (emailId, e) => {
    e.stopPropagation();
    const newStarred = new Set(starredEmails);
    if (newStarred.has(emailId)) {
      newStarred.delete(emailId);
    } else {
      newStarred.add(emailId);
    }
    setStarredEmails(newStarred);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={selectAllEmails}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {selectedEmails.size === emails.length ? (
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {selectedEmails.size > 0 && (
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg" title="Archive">
                  <Archive className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg" title="Delete">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg" title="More">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{emails.length > 0 ? `1-${emails.length} of ${emails.length}` : 'No emails'}</span>
            <button className="p-1 hover:bg-gray-200 rounded" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No emails found</div>
        ) : (
          emails.map((email) => (
            <div
              key={email._id}
              className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedEmails.has(email._id) ? 'bg-blue-50' : ''
              } ${!email.isRead ? 'bg-white' : 'bg-gray-25'}`}
              onClick={() => router.push(`/email/${email.id}`)}
            >
              {/* Selection Checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEmailSelection(email._id);
                }}
                className="mr-3 p-1"
              >
                {selectedEmails.has(email._id) ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                )}
              </button>

              {/* Star */}
              <button
                onClick={(e) => toggleStar(email._id, e)}
                className="mr-3 p-1"
              >
                {starredEmails.has(email._id) ? (
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                ) : (
                  <StarOff className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                )}
              </button>

              {/* Email Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        !email.isRead
                          ? 'font-semibold text-gray-900'
                          : 'font-normal text-gray-700'
                      }`}
                    >
                      {type === 'inbox'
                        ? email.from_email || 'Unknown'
                        : email.to_email || 'Unknown'}
                    </span>
                    {email.attachments && email.attachments.length > 0 && (
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-4">
                    {new Date(email.date).toLocaleString()}
                  </span>
                </div>
                <div
                  className={`text-sm ${
                    !email.isRead
                      ? 'font-semibold text-gray-900'
                      : 'font-normal text-gray-700'
                  }`}
                >
                  {email.subject || '(No subject)'}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {email.body?.substring(0, 100) || 'No preview available'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{selectedEmails.size} selected</span>
          <span>Last updated: just now</span>
        </div>
      </div>
    </div>
  );
};

export default EmailList;