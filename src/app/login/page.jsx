'use client';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, user, loading } = useContext(AuthContext);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/inbox');
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'username') {
      newValue = value.replace(/[@.]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const email = `${formData.username}@tnbmail.com`;
        await login(email, formData.password);
        router.push('/inbox');
      } catch (err) {
        setErrors({ submit: 'Login failed. Please check your credentials.' });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center">
          <img
            src="https://tastenbite.com/wp-content/uploads/2021/06/TB-PNG.png"
            alt="TNB Logo"
            className="mx-auto h-16 w-auto mb-4 transition-transform duration-300 hover:scale-105"
          />
          <div className="text-3xl font-bold text-gray-800 tracking-tight">
            <span className="text-blue-600">TNB</span> Mail
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-base text-gray-500">Sign in to continue to TNB Mail</p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 pr-28 shadow-sm hover:shadow-md`}
                placeholder="Enter username"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
                @tnbmail.com
              </span>
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 pr-12 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md`}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-xs text-red-600 animate-fade-in">{errors.submit}</p>
          )}

          <div className="flex items-center justify-between">
            <a
              href="/signup"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200"
            >
              Create an account
            </a>
            <button
              type="button"
              onClick={handleSubmit}
              className="group relative flex justify-center py-2.5 px-6 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;