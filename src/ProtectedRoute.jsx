'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './contexts/AuthContext';
import Loader from './components/Loader';

export const ProtectedRoute = ({ children }) => {
  const { user, authToken ,loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authToken && !user) {
      router.push('/login'); // redirect if not logged in
    }
    if (authToken && user && ['/login', '/signup'].includes(window.location.pathname)) {
      router.push('/inbox'); // redirect if logged in and visiting login/signup
    }
  }, [user, authToken, router]);

  if (loading || (!user && window.location.pathname !== '/login' && window.location.pathname !== '/signup')) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <Loader />
      </div>);
  }

  return <>{children}</>;
};
