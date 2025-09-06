'use client';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmailList from '../../components/EmailList';
import { AuthContext } from '../../contexts/AuthContext';

const Sent = () => {
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
      const res = await axios.get('/api/emails/sent');
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
    <>
      <h2 className="text-xl font-bold mb-4">Sent</h2>
      <EmailList emails={emails} type="sent" />
    </>
  );
};

export default Sent;