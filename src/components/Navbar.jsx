import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    if (window.confirm('Yakin ingin logout?')) {
      logout();
      setShowDropdown(false);
      navigate('/login');
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Voltify</h1>
          </Link>

          {/* User Info / Auth Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: 0 }}>
              Smart Electricity Management System
            </p>

            {/* Authenticated User */}
            {isAuthenticated && (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '2px solid #bfdbfe',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    fontSize: '15px',
                    color: '#1e40af'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={18} color="white" />
                  </div>
                  <span>{user?.name || 'User'}</span>
                  <ChevronDown size={18} style={{
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    minWidth: '220px',
                    overflow: 'hidden',
                    zIndex: 1001,
                    animation: 'fadeInDown 0.3s ease'
                  }}>
                    {/* User Info */}
                    <div style={{
                      padding: '16px',
                      borderBottom: '1px solid #f1f5f9',
                      background: '#f8fafc'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {user?.name}
                      </p>
                      <p style={{
                        fontSize: '13px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {user?.email}
                      </p>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#ef4444',
                        transition: 'background 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Guest Mode */}
            {isGuest && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{
                  padding: '6px 12px',
                  background: '#fef3c7',
                  color: '#92400e',
                  fontSize: '13px',
                  fontWeight: '700',
                  borderRadius: '20px',
                  border: '2px solid #fbbf24'
                }}>
                  Mode Guest
                </span>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2563eb',
                    background: 'white',
                    border: '2px solid #2563eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#eff6ff';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '8px',
            paddingTop: '0',
            paddingBottom: '0',
            overflowX: 'auto'
          }}>
            <Link
              to="/dashboard"
              style={{
                padding: '16px 24px',
                border: 'none',
                background: isActive('/dashboard') ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: isActive('/dashboard') ? '#2563eb' : '#64748b',
                borderBottom: isActive('/dashboard') ? '3px solid #2563eb' : '3px solid transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                borderRadius: '0',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                if (!isActive('/dashboard')) {
                  e.target.style.background = '#f8fafc';
                  e.target.style.color = '#1e293b';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/dashboard')) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#64748b';
                }
              }}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/hitung-penggunaan"
              style={{
                padding: '16px 24px',
                border: 'none',
                background: isActive('/hitung-penggunaan') ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: isActive('/hitung-penggunaan') ? '#2563eb' : '#64748b',
                borderBottom: isActive('/hitung-penggunaan') ? '3px solid #2563eb' : '3px solid transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                borderRadius: '0',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                if (!isActive('/hitung-penggunaan')) {
                  e.target.style.background = '#f8fafc';
                  e.target.style.color = '#1e293b';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/hitung-penggunaan')) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#64748b';
                }
              }}
            >
              ⚡ Hitung Penggunaan
            </Link>
            <Link
              to="/history"
              style={{
                padding: '16px 24px',
                border: 'none',
                background: isActive('/history') ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: isActive('/history') ? '#2563eb' : '#64748b',
                borderBottom: isActive('/history') ? '3px solid #2563eb' : '3px solid transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                borderRadius: '0',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                if (!isActive('/history')) {
                  e.target.style.background = '#f8fafc';
                  e.target.style.color = '#1e293b';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/history')) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#64748b';
                }
              }}
            >
              📜 History
            </Link>
            <Link
              to="/pengaturan"
              style={{
                padding: '16px 24px',
                border: 'none',
                background: isActive('/pengaturan') ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                color: isActive('/pengaturan') ? '#2563eb' : '#64748b',
                borderBottom: isActive('/pengaturan') ? '3px solid #2563eb' : '3px solid transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                borderRadius: '0',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                if (!isActive('/pengaturan')) {
                  e.target.style.background = '#f8fafc';
                  e.target.style.color = '#1e293b';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/pengaturan')) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#64748b';
                }
              }}
            >
              ⚙️ Pengaturan
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;