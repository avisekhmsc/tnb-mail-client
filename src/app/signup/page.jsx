'use client';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    // Prevent @ or . in username
    if (name === 'username') {
      newValue = value.replace(/[@.]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(newValue);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 12.5;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 12.5;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Choose a username';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Use 8 or more characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const name = `${formData.firstName} ${formData.lastName}`.trim();
        const email = `${formData.username}@tnbmail.com`;
        await register(name, email, formData.password);
        router.push('/login');
      } catch (err) {
        setErrors({ submit: 'Signup failed. Please try again.' });
      }
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-yellow-500';
    if (passwordStrength < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        {/* Logo */}
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

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-base text-gray-500">Join TNB Mail today</p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          {/* Name Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Username with @tnbmail.com suffix */}
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

          {/* Password */}
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
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Password strength:</span>
                  <span className="text-xs text-gray-600">{getStrengthText()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 pr-12 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="focus:ring-blue-600 h-4 w-4 text-blue-600 border-gray-300 rounded transition-all duration-200"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-600 animate-fade-in">{errors.agreeToTerms}</p>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-xs text-red-600 animate-fade-in">{errors.submit}</p>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200"
            >
              Sign in instead
            </a>
            <button
              type="button"
              onClick={handleSubmit}
              className="group relative flex justify-center py-2.5 px-6 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;