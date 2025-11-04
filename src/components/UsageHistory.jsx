import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, Zap, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { usageAPI } from '../services/api';

const UsageHistory = ({ refresh, onDataChanged }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  const fetchHistory = async () => {
    try {
      const response = await usageAPI.getAll({ limit: 30 });
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data penggunaan ini?')) return;

    setDeleting(id);
    try {
      await usageAPI.delete(id);
      fetchHistory();
      onDataChanged();
    } catch (error) {
      alert('Gagal menghapus data');
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      '⚠️ PERHATIAN!\n\nAnda akan menghapus SEMUA history penggunaan listrik.\nTindakan ini TIDAK DAPAT dibatalkan!\n\nLanjutkan?'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm('Apakah Anda BENAR-BENAR yakin?');
    if (!doubleConfirm) return;

    setLoading(true);
    try {
      const response = await usageAPI.deleteAll();
      if (response.data.success) {
        alert('✅ Semua history berhasil dihapus!');
        setHistory([]);
        onDataChanged();
      }
    } catch (error) {
      alert('❌ Gagal menghapus history');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category) => {
    const styles = {
      Hemat: { bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', color: '#065f46', border: '#10b981' },
      Normal: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', color: '#92400e', border: '#f59e0b' },
      Boros: { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', color: '#991b1b', border: '#ef4444' }
    };
    const style = styles[category] || styles.Normal;
    return (
      <span style={{
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '700',
        background: style.bg,
        color: style.color,
        border: `2px solid ${style.border}`,
        display: 'inline-block'
      }}>
        {category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="card text-center" style={{ border: '1px solid #e2e8f0' }}>
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '10px', color: '#64748b' }}>Memuat history...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '1px solid #e2e8f0' }}>
      <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <h2 className="card-title" style={{ color: '#1e293b', fontSize: '24px' }}>
          History Penggunaan
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleDeleteAll}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Trash2 size={16} />
            Hapus Semua History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#64748b',
          border: '2px dashed #e2e8f0',
          borderRadius: '12px',
          margin: '20px 0'
        }}>
          <Calendar size={64} color="#cbd5e1" style={{ margin: '0 auto 20px' }} />
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#475569' }}>
            Belum ada history penggunaan
          </p>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>
            History akan muncul setelah Anda menghitung penggunaan listrik
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid #e2e8f0',
                background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
              }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  color: '#1e293b',
                  fontWeight: '700',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Tanggal
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
                  Total kWh
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
                  Total Biaya
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
                  Score
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
              {history.map((item, index) => (
                <tr key={item._id} style={{
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background 0.2s ease'
                }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Calendar size={20} color="#3b82f6" />
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', marginBottom: '2px' }}>
                          {new Date(item.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long' })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      padding: '8px 14px',
                      borderRadius: '8px'
                    }}>
                      <Zap size={16} color="#2563eb" />
                      <strong style={{ color: '#1e40af', fontSize: '15px' }}>{item.totalKwh}</strong>
                      <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>kWh</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      padding: '8px 14px',
                      borderRadius: '8px'
                    }}>
                      <DollarSign size={16} color="#059669" />
                      <strong style={{ color: '#065f46', fontSize: '15px' }}>
                        {item.totalCost.toLocaleString('id-ID')}
                      </strong>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    {getCategoryBadge(item.fuzzyCategory)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      <span style={{
                        fontWeight: '800',
                        fontSize: '16px',
                        color: '#1e293b'
                      }}>
                        {item.fuzzyScore}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleting === item._id}
                      style={{
                        padding: '10px',
                        background: deleting === item._id ? '#f1f5f9' : 'transparent',
                        border: '1px solid #e2e8f0',
                        cursor: deleting === item._id ? 'not-allowed' : 'pointer',
                        color: '#ef4444',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (deleting !== item._id) {
                          e.target.style.background = '#fee2e2';
                          e.target.style.borderColor = '#fecaca';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (deleting !== item._id) {
                          e.target.style.background = 'transparent';
                          e.target.style.borderColor = '#e2e8f0';
                        }
                      }}
                    >
                      {deleting === item._id ? (
                        <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {history.length > 10 && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '600',
          border: '1px solid #e2e8f0'
        }}>
          <Clock size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          Menampilkan {history.length} data terakhir
        </div>
      )}
    </div>
  );
};

export default UsageHistory;