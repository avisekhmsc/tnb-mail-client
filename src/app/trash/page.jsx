'use client';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmailList from '../../components/EmailList';
import { AuthContext } from '../../contexts/AuthContext';

const Trash = () => {
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
      const res = await axios.get('/api/emails/trash');
      setEmails(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Trash</h2>
      <EmailList emails={emails} type="trash" />
    </>
  );
};

export default Trash;