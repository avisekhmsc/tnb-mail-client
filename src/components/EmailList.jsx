'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const EmailList = ({ emails, type }) => {
  const router = useRouter();

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {emails.map((email) => (
        <div
          key={email._id}
          className={`flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${!email.isRead ? 'font-bold' : ''}`}
          onClick={() => router.push(`/email/${email._id}`)}
        >
          <input type="checkbox" className="mr-2" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <span>{type === 'inbox' ? (email.from?.email || 'Unknown') : (email.to?.email || 'Unknown')}</span>
              <span className="text-sm text-gray-500">{new Date(email.date).toLocaleString()}</span>
            </div>
            <div>{email.subject || '(No subject)'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;