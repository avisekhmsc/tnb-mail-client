'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/verify', {
          withCredentials: true
        });
        
        if (response.data.user) {
          setUser(response.data.user);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
      } catch (error) {
        console.log('No valid token found');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', 
        { email, password },
        { withCredentials: true }
      );
      
      setUser(res.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    await axios.post('/api/auth/register', 
      { name, email, password },
      { withCredentials: true }
    );
    await login(email, password);
  };

  const logout = async () => {
    try {
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};