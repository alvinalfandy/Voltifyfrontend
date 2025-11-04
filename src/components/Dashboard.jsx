import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Zap, Calendar, Sparkles } from 'lucide-react';
import { usageAPI } from '../services/api';

const Dashboard = ({ refresh }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchSummary();
  }, [refresh, days]);

  const fetchSummary = async () => {
    try {
      const response = await usageAPI.getSummary(days);
      if (response.data.success) {
        setSummary(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '10px', color: '#64748b' }}>Memuat dashboard...</p>
      </div>
    );
  }

  if (!summary || summary.daysTracked === 0) {
    return (
      <div className="card text-center" style={{
        border: '2px dashed #e2e8f0',
        padding: 'var(--spacing-2xl) var(--spacing-lg)'
      }}>
        <Sparkles size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
        <p style={{
          color: '#64748b',
          fontSize: 'var(--font-size-lg)',
          marginBottom: '8px'
        }}>
          Belum ada data penggunaan
        </p>
        <p style={{
          color: '#94a3b8',
          fontSize: 'var(--font-size-sm)'
        }}>
          Hitung penggunaan harian Anda untuk melihat statistik!
        </p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Penggunaan',
      value: `${summary.totalKwh || 0}`,
      unit: 'kWh',
      subtitle: `${days} hari terakhir`,
      icon: Zap,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      bgGradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
    },
    {
      title: 'Total Biaya',
      value: `${(summary.totalCost || 0).toLocaleString('id-ID')}`,
      unit: 'Rp',
      subtitle: `${days} hari terakhir`,
      icon: DollarSign,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
    },
    {
      title: 'Rata-rata Harian',
      value: `${summary.averageDaily || 0}`,
      unit: 'kWh',
      subtitle: 'Per hari',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
    },
    {
      title: 'Estimasi Bulanan',
      value: `${summary.estimatedMonthly || 0}`,
      unit: 'kWh',
      subtitle: `Rp ${(summary.estimatedMonthlyCost || 0).toLocaleString('id-ID')}`,
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)'
    }
  ];

  return (
    <div>
      {/* Main Stats Card */}
      <div className="card mb-lg">
        <div className="card-header">
          <h2 className="card-title" style={{
            color: '#1e293b',
            fontSize: 'clamp(18px, 4vw, 24px)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Dashboard Statistik
          </h2>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="form-select"
            style={{
              width: '100%',
              maxWidth: '200px',
              fontWeight: '600',
              color: '#1e293b'
            }}
          >
            <option value={7}>7 Hari</option>
            <option value={14}>14 Hari</option>
            <option value={30}>30 Hari</option>
          </select>
        </div>

        {/* Responsive Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{
                background: stat.bgGradient,
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                background: stat.gradient,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
              }}>
                <stat.icon size={28} color="white" />
              </div>

              {/* Content */}
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '8px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {stat.title}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px',
                marginBottom: '8px'
              }}>
                {stat.unit === 'Rp' && (
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>
                    Rp
                  </span>
                )}
                <h3 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: '#1e293b',
                  lineHeight: '1'
                }}>
                  {stat.value}
                </h3>
                {stat.unit !== 'Rp' && (
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#64748b'
                  }}>
                    {stat.unit}
                  </span>
                )}
              </div>

              <p style={{
                fontSize: '13px',
                color: '#64748b',
                fontWeight: '500'
              }}>
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 className="card-title" style={{
          color: '#1e293b',
          fontSize: 'clamp(16px, 4vw, 20px)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Kategori Penggunaan ({summary.daysTracked} hari)
        </h3>

        {/* Responsive Category Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px'
        }}>
          <div className="category-item" style={{
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            padding: 'var(--spacing-md)'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '42px',
              fontWeight: '800',
              color: '#065f46',
              border: '4px solid white',
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
            }}>
              {summary.categoryBreakdown?.Hemat || 0}
            </div>
            <p style={{
              fontWeight: '700',
              color: '#065f46',
              fontSize: '18px',
              marginBottom: '4px'
            }}>
              Hemat
            </p>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              Hari
            </p>
          </div>

          <div className="category-item" style={{
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            padding: 'var(--spacing-md)'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '42px',
              fontWeight: '800',
              color: '#92400e',
              border: '4px solid white',
              boxShadow: '0 8px 16px rgba(245, 158, 11, 0.2)'
            }}>
              {summary.categoryBreakdown?.Normal || 0}
            </div>
            <p style={{
              fontWeight: '700',
              color: '#92400e',
              fontSize: '18px',
              marginBottom: '4px'
            }}>
              Normal
            </p>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              Hari
            </p>
          </div>

          <div className="category-item" style={{
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            padding: 'var(--spacing-md)'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '42px',
              fontWeight: '800',
              color: '#991b1b',
              border: '4px solid white',
              boxShadow: '0 8px 16px rgba(239, 68, 68, 0.2)'
            }}>
              {summary.categoryBreakdown?.Boros || 0}
            </div>
            <p style={{
              fontWeight: '700',
              color: '#991b1b',
              fontSize: '18px',
              marginBottom: '4px'
            }}>
              Boros
            </p>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              Hari
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;