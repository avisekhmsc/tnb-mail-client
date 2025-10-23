'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Send, Paperclip, Image, Smile, Bold, Italic, Underline, Link, X, Minimize2, Maximize2 } from 'lucide-react';

const Compose = () => {
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    body: '',
    cc: '',
    bcc: '',
  });
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // Check token on mount to prevent unauthorized access
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('Please log in to compose an email');
      router.push('/login');
    }
  }, [router]);

  // Retrieve JWT token from localStorage
  const getToken = () => {
    try {
      return localStorage.getItem('authToken') || null;
    } catch (error) {
      console.error('Error accessing authToken:', error);
      return null;
    }
  };

  // Handle input changes for other fields
  const handleInputChange = (field, value) => {
    setEmail(prev => ({ ...prev, [field]: value }));
  };

  // Handle file attachments
  const handleFileAttach = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Get emails as an array from the "to" field
  const getEmailsArray = () => {
    return email.to.split(',').map(email => email.trim()).filter(email => email);
  };

  // Handle key down in the To field (e.g., pressing Enter)
  const handleToKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !email.to.includes(value)) {
        setEmail(prev => ({
          ...prev,
          to: prev.to ? `${prev.to}, ${value}` : value,
        }));
        e.target.value = ''; // Clear the input
      }
    }
  };

  // Handle clicking on an email chip to edit
  const handleEmailChipClick = (index) => {
    setEditingIndex(index);
    const emails = getEmailsArray();
    if (emails[index]) {
      setTimeout(() => {
        toInputRef.current.focus();
        toInputRef.current.value = emails[index];
      }, 0);
    }
  };

  // Handle editing an email
  const handleToInputChange = (e) => {
    if (editingIndex !== null) {
      const emails = getEmailsArray();
      emails[editingIndex] = e.target.value;
      setEmail(prev => ({
        ...prev,
        to: emails.join(', '),
      }));
    } else {
      setEmail(prev => ({
        ...prev,
        to: e.target.value,
      }));
    }
  };

  // Handle blur or enter to finish editing
  const handleToBlurOrEnter = (e) => {
    if (e.type === 'blur' || e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (editingIndex !== null && value) {
        const emails = getEmailsArray();
        emails[editingIndex] = value;
        setEmail(prev => ({
          ...prev,
          to: emails.join(', '),
        }));
      }
      setEditingIndex(null);
      e.target.value = ''; // Clear input after editing
    }
  };

  // Handle sending emails
  const handleSend = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        alert('Session expired. Please log in again.');
        router.push('/login');
        return;
      }

      const recipients = getEmailsArray();
      if (recipients.length === 0) {
        alert('Please enter at least one recipient email.');
        setIsLoading(false);
        return;
      }

      let urls = [];
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
        console.log('Uploading attachments:', attachments.map(f => f.name));
        const uploadResponse = await axios.post(
          '/api/emails/upload',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        urls = uploadResponse.data.urls || [];
        console.log('Upload response URLs:', urls);
      }

      const payload = { 
        to: email.to, 
        subject: email.subject, 
        body: email.body, 
        isDraft: false,
        attachments: JSON.stringify(urls),
      };
      console.log('Sending email with payload:', payload);

      const response = await axios.post(
        '/api/emails/compose',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Compose response:', response.data.msg);

      // Clear the form
      setEmail({
        to: '',
        subject: '',
        body: '',
        cc: '',
        bcc: '',
      });
      setAttachments([]);

      alert('Email sent successfully');
      router.push('/sent');
    } catch (err) {
      console.error('Error sending email:', err);
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        router.push('/login');
      } else {
        alert(err.response?.data?.msg || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving draft
  const handleDraft = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        alert('Session expired. Please log in again.');
        router.push('/login');
        return;
      }

      let urls = [];
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
        console.log('Uploading attachments for draft:', attachments.map(f => f.name));
        const uploadResponse = await axios.post(
          '/api/emails/upload',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        urls = uploadResponse.data.urls || [];
        console.log('Upload response URLs for draft:', urls);
      }

      const payload = { 
        to: email.to, 
        subject: email.subject, 
        body: email.body, 
        isDraft: true,
        attachments: JSON.stringify(urls),
      };
      console.log('Saving draft with payload:', payload);

      const response = await axios.post(
        '/api/emails/compose',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Draft response:', response.data.msg);

      alert('Draft saved successfully');
      router.push('/drafts');
    } catch (err) {
      console.error('Error saving draft:', err);
      const message = err.response?.data?.msg || 'Failed to save draft';
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        router.push('/login');
      } else {
        alert(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white px-4 flex justify-center">
      <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl ${isMinimized ? 'w-80 h-16' : 'w-full max-w-4xl'} overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Compose Email
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-8">
            {/* Recipients */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold min-w-16 text-sm">To</label>
                <div className="flex-1 flex flex-wrap items-center gap-2 p-3 border-2 border-gray-200 rounded-xl focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100 transition-all duration-200 bg-gray-50/50 hover:bg-white">
                  {getEmailsArray().map((email, index) => (
                    <span
                      key={index}
                      onClick={() => handleEmailChipClick(index)}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm cursor-pointer hover:bg-purple-200 transition-colors"
                    >
                      {email}
                    </span>
                  ))}
                  <input
                    ref={toInputRef}
                    type="text"
                    onChange={handleToInputChange}
                    onKeyDown={handleToKeyDown}
                    onBlur={handleToBlurOrEnter}
                    className="flex-1 bg-transparent outline-none min-w-[200px]"
                    placeholder={getEmailsArray().length === 0 ? "Type an email and press Enter" : ""}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={() => setShowCcBcc(!showCcBcc)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                >
                  {showCcBcc ? 'Hide' : 'CC/BCC'}
                </button>
              </div>

              {showCcBcc && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-semibold min-w-16 text-sm">CC</label>
                    <input
                      type="email"
                      value={email.cc}
                      onChange={(e) => handleInputChange('cc', e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="cc@tnbmail.com"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-semibold min-w-16 text-sm">BCC</label>
                    <input
                      type="email"
                      value={email.bcc}
                      onChange={(e) => handleInputChange('bcc', e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="bcc@tnbmail.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-gray-700 font-semibold min-w-16 text-sm">Subject</label>
              <input
                type="text"
                value={email.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                placeholder="Enter subject line..."
                disabled={isLoading}
              />
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-t-xl border-2 border-b-0 border-gray-200">
              <button className="p-2 hover:bg-white rounded-lg transition-colors" disabled={isLoading}>
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors" disabled={isLoading}>
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors" disabled={isLoading}>
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors" disabled={isLoading}>
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors" disabled={isLoading}>
                <Smile className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Message Body */}
            <textarea
              value={email.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              className="w-full h-64 p-4 border-2 border-t-0 border-gray-200 rounded-b-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white resize-none"
              placeholder="Type your message here..."
              disabled={isLoading}
            />

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Attachments:</p>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Paperclip className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-100 rounded transition-colors"
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="text-sm">Attach</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  <Image className="w-4 h-4" />
                  <span className="text-sm">Image</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDraft}
                  className={`px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSend}
                  disabled={isLoading || !email.to || !email.subject}
                  className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLoading ? 'animate-pulse' : ''}`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isLoading ? 'Sending...' : 'Send'}</span>
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileAttach}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Compose;