import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('voltify_token');
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('voltify_user') || '{}');
        if (userData?.name) {
          setUser(userData);
        } else {
          localStorage.removeItem('voltify_token');
          localStorage.removeItem('voltify_user');
        }
      } catch (error) {
        localStorage.removeItem('voltify_token');
        localStorage.removeItem('voltify_user');
      }
    }
    setLoading(false);
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      if (response.data.success && response.data.data) {
        const { token, name, email, id } = response.data.data;
        localStorage.setItem('voltify_token', token);
        localStorage.setItem('voltify_user', JSON.stringify({ id, name, email }));
        setUser({ id, name, email });
        return { success: true };
      }
      return { success: false, message: response.data.message || 'Registrasi gagal' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registrasi gagal' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success && response.data.data) {
        const { token, name, email, id } = response.data.data;
        localStorage.setItem('voltify_token', token);
        localStorage.setItem('voltify_user', JSON.stringify({ id, name, email }));
        setUser({ id, name, email });
        return { success: true };
      }
      return { success: false, message: response.data.message || 'Login gagal' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login gagal' };
    }
  };

  const logout = () => {
    localStorage.removeItem('voltify_token');
    localStorage.removeItem('voltify_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ width: '50px', height: '50px', border: '5px solid rgba(255, 255, 255, 0.3)', borderTop: '5px solid white', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading Voltify...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};