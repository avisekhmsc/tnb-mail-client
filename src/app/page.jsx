'use client';
import { useRouter } from 'next/navigation';
import { useEffect,useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
export default function Home() {

  const router = useRouter();
  const { user, authToken,  loading } = useContext(AuthContext);

  useEffect(() => {
    if(authToken && user){
      router.push('/inbox'); // redirect if logged in
    }
    if (loading || !authToken || !user) {
      router.push('/login'); // redirect if not logged in
    }
  }, [router, user, authToken, loading]);

  router.push('/login'); // Render nothing while redirecting
}