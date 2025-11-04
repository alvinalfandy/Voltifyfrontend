import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Info, Zap, DollarSign } from 'lucide-react';
import { settingsAPI } from '../services/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    pricePerKwh: 1445,
    monthlyTarget: 300
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: parseFloat(e.target.value)
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await settingsAPI.update(settings);
      if (response.data.success) {
        setMessage('success');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card text-center" style={{ border: '1px solid #e2e8f0' }}>
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '10px', color: '#64748b' }}>Memuat pengaturan...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '1px solid #e2e8f0' }}>
      <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <h2 className="card-title" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          color: '#1e293b',
          fontSize: '24px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)'
          }}>
            <SettingsIcon size={24} color="white" />
          </div>
          Pengaturan Sistem
        </h2>
      </div>

      {message && (
        <div style={{
          padding: '16px',
          background: message === 'success' ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          color: message === 'success' ? '#065f46' : '#991b1b',
          borderRadius: '12px',
          marginBottom: '24px',
          border: `2px solid ${message === 'success' ? '#10b981' : '#ef4444'}`,
          fontWeight: '600',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {message === 'success' ? '✅' : '❌'}
          {message === 'success' ? 'Pengaturan berhasil disimpan!' : 'Gagal menyimpan pengaturan'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '30px'
        }}>
          {/* Harga per kWh */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #bfdbfe'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
              }}>
                <DollarSign size={22} color="white" />
              </div>
              <label style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e40af'
              }}>
                Harga per kWh
              </label>
            </div>
            
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontWeight: '700',
                color: '#64748b',
                fontSize: '16px'
              }}>
                Rp
              </span>
              <input
                type="number"
                name="pricePerKwh"
                value={settings.pricePerKwh}
                onChange={handleChange}
                min="1"
                step="1"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  border: '2px solid #93c5fd',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  background: 'white',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#93c5fd';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <p style={{ 
              fontSize: '13px', 
              color: '#3b82f6', 
              marginTop: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Info size={14} />
              Tarif listrik PLN per kWh
            </p>
          </div>

          {/* Target Bulanan */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #fcd34d'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
              }}>
                <Zap size={22} color="white" />
              </div>
              <label style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#92400e'
              }}>
                Target Bulanan
              </label>
            </div>
            
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                name="monthlyTarget"
                value={settings.monthlyTarget}
                onChange={handleChange}
                min="1"
                step="1"
                required
                style={{
                  width: '100%',
                  padding: '14px 50px 14px 16px',
                  border: '2px solid #fbbf24',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  background: 'white',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fbbf24';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <span style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontWeight: '700',
                color: '#64748b',
                fontSize: '16px'
              }}>
                kWh
              </span>
            </div>
            
            <p style={{ 
              fontSize: '13px', 
              color: '#f59e0b', 
              marginTop: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Info size={14} />
              Target penggunaan per bulan
            </p>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '700',
            background: saving ? '#cbd5e1' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: saving ? 'none' : '0 8px 16px rgba(37, 99, 235, 0.3)'
          }}
          onMouseOver={(e) => {
            if (!saving) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            if (!saving) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
            }
          }}
        >
          {saving ? (
            <>
              <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={20} />
              Simpan Pengaturan
            </>
          )}
        </button>
      </form>

      {/* Info Tarif Listrik */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '16px',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '16px' 
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Info size={20} color="white" />
          </div>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '700',
            color: '#1e293b'
          }}>
            📌 Referensi Tarif Listrik PLN 2024
          </h4>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          fontSize: '14px', 
          color: '#475569', 
          lineHeight: '1.8',
          fontWeight: '600'
        }}>
          <div style={{ 
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#64748b' }}>• 450 VA:</span> <strong style={{ color: '#1e293b' }}>Rp 415/kWh</strong>
          </div>
          <div style={{ 
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#64748b' }}>• 900 VA:</span> <strong style={{ color: '#1e293b' }}>Rp 1.352/kWh</strong>
          </div>
          <div style={{ 
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#64748b' }}>• 1.300 VA:</span> <strong style={{ color: '#1e293b' }}>Rp 1.445/kWh</strong>
          </div>
          <div style={{ 
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#64748b' }}>• 2.200 VA:</span> <strong style={{ color: '#1e293b' }}>Rp 1.445/kWh</strong>
          </div>
          <div style={{ 
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#64748b' }}>• 3.500-5.500 VA:</span> <strong style={{ color: '#1e293b' }}>Rp 1.699/kWh</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;