import React , { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import amcList from '../mutualfundData/mutualfundamc.json';

// Mock AMC data for demo (replace with your actual import)
const mockAmcList = [
  { company: "Aditya Birla Sun Life AMC Limited" },
  { company: "DSP Asset Managers Private Limited" },
  { company: "HDFC Asset Management Company Limited" },
  { company: "ICICI Prudential Asset Management Company Limited" },
  { company: "SBI Funds Management Limited" },
  { company: "Kotak Mahindra Asset Management Company Limited" }
];

const getAmcName = (amc) => typeof amc === 'string' ? amc : amc.company;

// Authentication Modal Component
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${mode} attempted with:`, formData);
      alert(`${mode === 'login' ? 'Login' : 'Signup'} successful!`);
      setIsLoading(false);
      onClose();
      // Here you would typically handle the authentication logic
    }, 1500);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        margin: 16,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#666',
              padding: 4
            }}
          >
            ×
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ 
            fontSize: 24, 
            fontWeight: 600, 
            margin: 0, 
            marginBottom: 8,
            color: '#333'
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ 
            color: '#666', 
            margin: 0, 
            fontSize: 14 
          }}>
            {mode === 'login' 
              ? 'Sign in to your Groww account' 
              : 'Join Groww to start investing'
            }
          </p>
        </div>

        {/* Form */}
        <div>
          {mode === 'signup' && (
            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: errors.name ? '1px solid #ef4444' : '1px solid #ddd',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.name && (
                <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0 0' }}>
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: errors.email ? '1px solid #ef4444' : '1px solid #ddd',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0 0' }}>
                {errors.email}
              </p>
            )}
          </div>

          {mode === 'signup' && (
            <div style={{ marginBottom: 20 }}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: errors.phone ? '1px solid #ef4444' : '1px solid #ddd',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.phone && (
                <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0 0' }}>
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: errors.password ? '1px solid #ef4444' : '1px solid #ddd',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.password && (
              <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0 0' }}>
                {errors.password}
              </p>
            )}
          </div>

          {mode === 'signup' && (
            <div style={{ marginBottom: 20 }}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid #ddd',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0 0' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#ccc' : '#00b386',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: 16,
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: 20
            }}
          >
            {isLoading 
              ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
              : (mode === 'login' ? 'Sign In' : 'Create Account')
            }
          </button>

          {/* Switch Mode */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: 14, margin: 0 }}>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={switchMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00b386',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MutualFundDetailsScreen = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAmcClick = (amc) => {
    const amcName = getAmcName(amc);
    console.log(`Navigate to AMC: ${amcName}`);
    // Replace with your navigation logic
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Use mock data if amcList is not available
  const displayAmcList = typeof amcList !== 'undefined' ? amcList : mockAmcList;

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Top Groww-style Header */}
      <div style={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        {/* Left links */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: '#333', cursor: 'pointer' }}>SWITCH TO DIRECT</span>
          <span style={{ color: '#333', cursor: 'pointer' }}>HELP</span>
          <span
            style={{ color: '#00b386', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => console.log('Navigate to mutual fund page')}
          >
            MUTUAL FUND
          </span>
        </div>

        {/* Search Box */}
        <div style={{ flex: 1, maxWidth: 400, margin: '0 24px' }}>
          <input
            type="text"
            placeholder="Search Groww..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #ddd',
              fontSize: 14
            }}
          />
        </div>

        {/* Login/Signup Buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button 
            onClick={openLoginModal}
            style={{
              background: 'transparent',
              color: '#00b386',
              border: '1px solid #00b386',
              borderRadius: 6,
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Login
          </button>
          <button 
            onClick={openSignupModal}
            style={{
              background: '#00b386',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Section Header */}
      <div style={{
        background: '#fff',
        padding: '32px 24px 24px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
          Asset Management Company (AMC)
        </h2>
      </div>

      {/* AMC Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 24,
        padding: '32px 24px'
      }}>
        {displayAmcList.map((amc, idx) => {
          const amcName = getAmcName(amc);
          const logo = typeof amc === 'object' && amc.logo ? amc.logo : null;

          return (
            <div
              key={idx}
              onClick={() => handleAmcClick(amc)}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 20,
                border: '1px solid #eee',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={`${amcName} logo`}
                  style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 12 }}
                />
              ) : (
                <div style={{
                  width: 48,
                  height: 48,
                  background: '#f0f0f0',
                  borderRadius: 8,
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  ?
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 500 }}>{amcName}</div>
            </div>
          );
        })}
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authMode}
      />
    </div>
  );
};

export default MutualFundDetailsScreen;