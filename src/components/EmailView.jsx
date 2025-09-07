'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';

const EmailView = ({ email }) => {
  const router = useRouter();

  // Safely parse attachments JSON string
  let attachments = [];
  try {
    attachments = email.attachments ? JSON.parse(JSON.stringify(email.attachments)) : [];
  // 1. remove { and }
    let clean = attachments.replace(/[{}]/g, "");

    // 2. split by "," but keep the file paths clean
    let arr = clean.split('","').map(s => s.replace(/"/g, ""));
    // Ensure attachments is an array
    if (!Array.isArray(attachments)) {
      attachments = [];
    }
    attachments = arr;
  } catch (error) {
    console.error('Error parsing attachments:', error);
    attachments = [];
  }

  const handleTrash = async () => {
    try {
      await axios.put(`/api/emails/${email.id}/trash`);
      router.back();
    } catch (err) {
      alert('Error moving to trash');
    }
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 my-8">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {email.subject || <span className="text-gray-400 italic">(No subject)</span>}
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mt-2">
          <div className="flex flex-col">
            <span><strong>From:</strong> {email.from_email}</span>
            <span><strong>To:</strong> {email.to_email}</span>
          </div>
          <span className="mt-2 sm:mt-0">{new Date(email.date).toLocaleString()}</span>
        </div>
      </div>

      {/* Email Body */}
      <div className="prose max-w-none p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{email.body}</p>
      </div>

      {/* Attachments Section */}
      {attachments.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <PaperAirplaneIcon className="h-5 w-5 mr-2 text-gray-500" />
            Attachments ({attachments.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative group">
                <img
                  src={`/public${attachment}`}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onError={(e) => {
                    e.target.src = '/fallback-image.png'; // Fallback image if attachment fails to load
                  }}
                />
                <a
                  href={attachment}
                  download
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg text-white text-sm font-medium"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 text-gray-500 italic">No attachments</div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end">
        {email.is_trash ? (
          <div className="text-red-600 font-semibold flex items-center">
            <TrashIcon className="h-5 w-5 mr-2" />
            This email is in Trash
          </div>
        ) : (
          <button
            onClick={handleTrash}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Move to Trash
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailView;