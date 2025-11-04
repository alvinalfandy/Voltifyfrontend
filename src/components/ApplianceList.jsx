import React, { useState, useEffect } from 'react';
import { Trash2, Zap, Clock, CheckCircle } from 'lucide-react';
import { applianceAPI } from '../services/api';

const ApplianceList = ({ refresh, onSelectionChange }) => {
  const [appliances, setAppliances] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliances();
  }, [refresh]);

  const fetchAppliances = async () => {
    try {
      const response = await applianceAPI.getAll();
      if (response.data.success) {
        setAppliances(response.data.data);
        const allIds = response.data.data.map(a => a._id);
        setSelectedIds(allIds);
        onSelectionChange(allIds);
      }
    } catch (error) {
      console.error('Error fetching appliances:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus alat ini?')) return;

    try {
      await applianceAPI.delete(id);
      fetchAppliances();
    } catch (error) {
      alert('Gagal menghapus alat');
    }
  };

  const handleCheckboxChange = (id) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    
    setSelectedIds(newSelected);
    onSelectionChange(newSelected);
  };

  const calculateKwh = (wattage, hours) => {
    return ((wattage * hours) / 1000).toFixed(3);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Penerangan': { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' },
      'Pendingin': { bg: '#dbeafe', text: '#1e40af', border: '#60a5fa' },
      'Elektronik': { bg: '#e0e7ff', text: '#3730a3', border: '#818cf8' },
      'Dapur': { bg: '#fee2e2', text: '#991b1b', border: '#f87171' },
      'Lainnya': { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' }
    };
    return colors[category] || colors['Lainnya'];
  };

  if (loading) {
    return (
      <div className="card text-center" style={{ border: '1px solid #e2e8f0' }}>
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '10px', color: '#64748b' }}>Memuat data...</p>
      </div>
    );
  }

  if (appliances.length === 0) {
    return (
      <div className="card text-center" style={{ 
        border: '2px dashed #e2e8f0',
        padding: '60px 20px'
      }}>
        <Zap size={64} color="#cbd5e1" style={{ margin: '0 auto 20px' }} />
        <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          Belum ada alat elektronik
        </p>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Tambahkan alat pertama Anda untuk mulai menghitung!
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '1px solid #e2e8f0' }}>
      <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <h2 className="card-title" style={{ color: '#1e293b', fontSize: '20px' }}>
          Daftar Alat Elektronik ({appliances.length})
        </h2>
        <div style={{
          padding: '8px 16px',
          background: selectedIds.length === appliances.length 
            ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
            : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '700',
          color: selectedIds.length === appliances.length ? '#065f46' : '#1e40af',
          border: `2px solid ${selectedIds.length === appliances.length ? '#10b981' : '#3b82f6'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <CheckCircle size={16} />
          {selectedIds.length} dipilih
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ 
              borderBottom: '2px solid #e2e8f0',
              background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
            }}>
              <th style={{ 
                padding: '16px',
                textAlign: 'left',
                width: '50px'
              }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === appliances.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = appliances.map(a => a._id);
                      setSelectedIds(allIds);
                      onSelectionChange(allIds);
                    } else {
                      setSelectedIds([]);
                      onSelectionChange([]);
                    }
                  }}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#2563eb'
                  }}
                />
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Nama
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Kategori
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'center',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Daya
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'center',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Jam/Hari
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'center',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                kWh/Hari
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'center',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {appliances.map((appliance) => {
              const categoryColor = getCategoryColor(appliance.category);
              return (
                <tr 
                  key={appliance._id} 
                  style={{ 
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(appliance._id)}
                      onChange={() => handleCheckboxChange(appliance._id)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#2563eb'
                      }}
                    />
                  </td>
                  <td style={{ 
                    padding: '16px', 
                    fontWeight: '600',
                    color: '#1e293b',
                    fontSize: '15px'
                  }}>
                    {appliance.name}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '700',
                      background: categoryColor.bg,
                      color: categoryColor.text,
                      border: `2px solid ${categoryColor.border}`,
                      display: 'inline-block'
                    }}>
                      {appliance.category}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px',
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '2px solid #fbbf24'
                    }}>
                      <Zap size={16} color="#d97706" />
                      <span style={{ fontWeight: '700', color: '#92400e', fontSize: '14px' }}>
                        {appliance.wattage}W
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px',
                      background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '2px solid #818cf8'
                    }}>
                      <Clock size={16} color="#4f46e5" />
                      <span style={{ fontWeight: '700', color: '#3730a3', fontSize: '14px' }}>
                        {appliance.hoursPerDay}h
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      borderRadius: '8px',
                      border: '2px solid #3b82f6'
                    }}>
                      <span style={{ 
                        fontWeight: '800', 
                        color: '#1e40af',
                        fontSize: '15px'
                      }}>
                        {calculateKwh(appliance.wattage, appliance.hoursPerDay)}
                      </span>
                      <span style={{ 
                        fontWeight: '600', 
                        color: '#64748b',
                        fontSize: '13px',
                        marginLeft: '4px'
                      }}>
                        kWh
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(appliance._id)}
                      style={{
                        padding: '10px',
                        background: 'transparent',
                        border: '2px solid #fee2e2',
                        cursor: 'pointer',
                        color: '#ef4444',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                        e.target.style.borderColor = '#ef4444';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.borderColor = '#fee2e2';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
          }}>
            <Zap size={24} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '2px' }}>
              Total Alat
            </p>
            <p style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>
              {appliances.length}
            </p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '2px' }}>
            Total Daya
          </p>
          <p style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>
            {appliances.reduce((sum, a) => sum + a.wattage, 0)} W
          </p>
        </div>

        <div>
          <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '2px' }}>
            Estimasi kWh/Hari
          </p>
          <p style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6' }}>
            {appliances.reduce((sum, a) => sum + ((a.wattage * a.hoursPerDay) / 1000), 0).toFixed(2)} kWh
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplianceList;