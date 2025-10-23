'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Compose from '../../components/Compose';
import { AuthContext } from '../../contexts/AuthContext';
import Cookies from 'js-cookie';

const ComposePage = () => {
  const router = useRouter();
  const {user , authToken } = useContext(AuthContext);

  if (!user && !authToken) {
    router.push('/login');
    return null;
  }
  return <Compose />;
};

export default ComposePage;