import React from 'react';
import { useNavigate } from 'react-router-dom';
import amcList from '../mutualfundData/mutualfundamc.json';

const getAmcName = (amc) => typeof amc === 'string' ? amc : amc.company;

const MutualFundDetailsScreen = () => {
  const navigate = useNavigate();

  const handleAmcClick = (amc) => {
    const amcName = getAmcName(amc);
    navigate(`/amc/${encodeURIComponent(amcName)}`);
  };

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
            onClick={() => navigate('/mutual-fund')} // ✅ Navigate to mutual fund page
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

        {/* Login Button */}
        <button style={{
          background: '#00b386',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Login/Sign up
        </button>
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
        {amcList.map((amc, idx) => {
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
    </div>
  );
};

export default MutualFundDetailsScreen;
