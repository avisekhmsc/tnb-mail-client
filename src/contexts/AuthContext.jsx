'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = Cookies.get('authToken');
        const storedUser = Cookies.get('user');

        if (token) {
          setAuthToken(token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            console.warn('Invalid user cookie, clearing...');
            Cookies.remove('user');
          }
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

      // Save auth data
      setUser(res.data.user);
      setAuthToken(res.data.token);

      Cookies.set('authToken', res.data.token, { expires: 7 }); // persists for 7 days
      Cookies.set('user', JSON.stringify(res.data.user), { expires: 7 });

      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });

      // Same as login flow
      setUser(res.data.user);
      setAuthToken(res.data.token);

      Cookies.set('authToken', res.data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(res.data.user), { expires: 7 });

      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      return true;
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setAuthToken(null);

      Cookies.remove('authToken');
      Cookies.remove('user');

      delete axios.defaults.headers.common['Authorization'];

      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
