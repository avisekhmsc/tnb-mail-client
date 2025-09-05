'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import EmailView from '../../../components/EmailView';
import { AuthContext } from '../../../contexts/AuthContext';

const EmailPage = () => {
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (id) {
      fetchEmail();
    }
  }, [id, user, router]);

  const fetchEmail = async () => {
    try {
      const res = await axios.get(`/api/emails/${id}`);
      setEmail(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {}; // Placeholder; add if needed

  return (
    <Layout onSearch={handleSearch}>
      <EmailView email={email} />
    </Layout>
  );
};

export default EmailPage;