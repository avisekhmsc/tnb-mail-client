'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Compose from '../../components/Compose';
import { AuthContext } from '../../contexts/AuthContext';

const ComposePage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return <Compose />;
};

export default ComposePage;