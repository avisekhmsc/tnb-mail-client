'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Compose = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSend = async () => {
    try {
      await axios.post('/api/emails/compose', { toEmail: to, subject, body, isDraft: false });
      router.push('/sent');
    } catch (err) {
      alert('Error sending email');
    }
  };

  const handleDraft = async () => {
    try {
      await axios.post('/api/emails/compose', { toEmail: to, subject, body, isDraft: true });
      router.push('/drafts');
    } catch (err) {
      alert('Error saving draft');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white border border-gray-300 rounded-md">
      <h2 className="text-lg font-bold mb-4">Compose Email</h2>
      <input
        type="text"
        placeholder="To (@tnbmail.com)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2 h-40"
      />
      <div className="flex space-x-2">
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
        <button onClick={handleDraft} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Save Draft
        </button>
        <button onClick={() => router.back()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Discard
        </button>
      </div>
    </div>
  );
};

export default Compose;