import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { applianceAPI } from '../services/api';

const ApplianceForm = ({ onApplianceAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    wattage: '',
    hoursPerDay: '',
    category: 'Lainnya'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Penerangan', 'Pendingin', 'Elektronik', 'Dapur', 'Lainnya'];

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

    try {
      const response = await applianceAPI.create({
        name: formData.name,
        wattage: parseFloat(formData.wattage),
        hoursPerDay: parseFloat(formData.hoursPerDay),
        category: formData.category
      });

      if (response.data.success) {
        setFormData({
          name: '',
          wattage: '',
          hoursPerDay: '',
          category: 'Lainnya'
        });
        onApplianceAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan alat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ border: '1px solid #e2e8f0' }}>
      <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <h2 className="card-title" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#1e293b',
          fontSize: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
          }}>
            <Zap size={20} color="white" />
          </div>
          Tambah Alat Elektronik
        </h2>
      </div>

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
          gap: '8px'
        }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2" style={{
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          <div className="form-group">
            <label className="form-label" style={{
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              Nama Alat
            </label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g., Kulkas, TV, Lampu"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              Kategori
            </label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              Daya (Watt)
            </label>
            <input
              type="number"
              name="wattage"
              className="form-input"
              placeholder="e.g., 100"
              value={formData.wattage}
              onChange={handleChange}
              min="1"
              required
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{
              fontWeight: '700',
              color: '#1e293b',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              Jam Pemakaian per Hari
            </label>
            <input
              type="number"
              name="hoursPerDay"
              className="form-input"
              placeholder="e.g., 8"
              value={formData.hoursPerDay}
              onChange={handleChange}
              min="0"
              max="24"
              step="0.5"
              required
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: '700',
            background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: loading ? 'none' : '0 6px 12px rgba(37, 99, 235, 0.3)'
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.3)';
            }
          }}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Plus size={20} />
              Tambah Alat
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplianceForm;