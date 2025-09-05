'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EmailView = ({ email }) => {
  const router = useRouter();

  const handleTrash = async () => {
    try {
      await axios.put(`/api/emails/${email._id}/trash`);
      router.back();
    } catch (err) {
      alert('Error moving to trash');
    }
  };

  if (!email) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold">{email.subject || '(No subject)'}</h2>
      <div className="text-sm text-gray-600">
        From: {email.from?.email} | To: {email.to?.email} | {new Date(email.date).toLocaleString()}
      </div>
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
        {email.body}
      </div>
      <button onClick={handleTrash} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Move to Trash
      </button>
    </div>
  );
};

export default EmailView;