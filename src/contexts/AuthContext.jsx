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
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      setUser(res.data.user);
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
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