import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Zap, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-md)',
      position: 'relative'
    }}>
      {/* Back Button - Desktop */}
      {window.innerWidth >= 768 && (
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateX(-5px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          <ArrowLeft size={20} />
          Kembali
        </button>
      )}

      {/* Back Button - Mobile */}
      {window.innerWidth < 768 && (
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 10
          }}
          onTouchStart={(e) => {
            e.target.style.transform = 'scale(0.95)';
            e.target.style.background = 'rgba(255, 255, 255, 0.35)';
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'rgba(255, 255, 255, 0.25)';
          }}
        >
          <ArrowLeft size={22} />
        </button>
      )}

      <div style={{
        width: '100%',
        maxWidth: '450px',
        background: 'white',
        borderRadius: 'clamp(16px, 4vw, 24px)',
        padding: 'clamp(24px, 6vw, 48px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        margin: 'var(--spacing-lg) 0'
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div style={{
            width: 'clamp(60px, 15vw, 80px)',
            height: 'clamp(60px, 15vw, 80px)',
            background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
            borderRadius: 'clamp(15px, 4vw, 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--spacing-lg)',
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
          }}>
            <Zap size={window.innerWidth < 768 ? 32 : 40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 32px)',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Selamat Datang
          </h1>
          <p style={{
            fontSize: 'var(--font-size-base)',
            color: '#64748b'
          }}>
            Login ke akun Voltify kamu
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#991b1b',
            borderRadius: '12px',
            marginBottom: '24px',
            fontWeight: '600',
            fontSize: '14px',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#64748b" style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#64748b" style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: window.innerWidth < 768 ? '20px' : '16px',
              fontSize: window.innerWidth < 768 ? '18px' : '16px',
              fontWeight: '700',
              background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 8px 16px rgba(37, 99, 235, 0.3)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: window.innerWidth < 768 ? '56px' : '48px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
              }
            }}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '8px'
          }}>
            Belum punya akun?
          </p>
          <Link
            to="/register"
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#2563eb',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.color = '#2563eb'}
          >
            Daftar Sekarang →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;