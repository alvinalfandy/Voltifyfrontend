import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usageAPI } from '../services/api';
import { TrendingUp, BarChart3 } from 'lucide-react';

const UsageChart = ({ refresh }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('line');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsageData();
  }, [refresh]);

  const fetchUsageData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await usageAPI.getAll({ limit: 30 });

      console.log('📊 Chart Response:', response.data);

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        const formattedData = response.data.data
          .reverse()
          .map(item => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

            return {
              date: formattedDate,
              kWh: parseFloat(item.totalKwh) || 0,
              biaya: parseFloat((item.totalCost / 1000).toFixed(2)) || 0,
              kategori: item.fuzzyCategory || 'Normal'
            };
          });

        console.log('📊 Formatted Data:', formattedData);
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error('❌ Error fetching usage data:', error);
      setError(error.message);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card text-center" style={{ border: '1px solid #e2e8f0', padding: '40px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #2563eb',
          borderRadius: '50%',
          margin: '0 auto 16px',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ marginTop: '10px', color: '#64748b' }}>Memuat grafik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center" style={{
        border: '2px solid #fecaca',
        padding: '40px',
        background: '#fee2e2'
      }}>
        <p style={{ color: '#991b1b', fontSize: '16px', fontWeight: '600' }}>Error: {error}</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="card text-center" style={{
        border: '2px dashed #e2e8f0',
        padding: '60px 20px'
      }}>
        <BarChart3 size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
        <p style={{ color: '#64748b', fontSize: '16px' }}>Belum ada data untuk ditampilkan dalam grafik</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>
          Hitung penggunaan harian untuk melihat grafik!
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: 'var(--spacing-md)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          maxWidth: '250px',
          fontSize: 'var(--font-size-sm)'
        }}>
          <p style={{
            fontWeight: '700',
            marginBottom: 'var(--spacing-sm)',
            color: '#1e293b',
            fontSize: 'var(--font-size-base)'
          }}>
            {payload[0].payload.date}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                borderRadius: '2px',
                flexShrink: 0
              }}></div>
              <span style={{
                color: '#64748b',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                wordBreak: 'break-word'
              }}>
                Penggunaan: <strong style={{ color: '#3b82f6' }}>{payload[0].value} kWh</strong>
              </span>
            </div>
            {payload.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '2px',
                  flexShrink: 0
                }}></div>
                <span style={{
                  color: '#64748b',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '500',
                  wordBreak: 'break-word'
                }}>
                  Biaya: <strong style={{ color: '#10b981' }}>Rp {(payload[1].value * 1000).toLocaleString('id-ID')}</strong>
                </span>
              </div>
            )}
          </div>
          <div style={{
            marginTop: 'var(--spacing-sm)',
            paddingTop: 'var(--spacing-sm)',
            borderTop: '1px solid #f1f5f9'
          }}>
            <span style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: '700',
              color: payload[0].payload.kategori === 'Hemat' ? '#10b981' :
                payload[0].payload.kategori === 'Normal' ? '#f59e0b' : '#ef4444',
              padding: '4px 8px',
              background: payload[0].payload.kategori === 'Hemat' ? '#d1fae5' :
                payload[0].payload.kategori === 'Normal' ? '#fef3c7' : '#fee2e2',
              borderRadius: '4px'
            }}>
              {payload[0].payload.kategori}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card" style={{ border: '1px solid #e2e8f0' }}>
      <div className="card-header">
        <h2 className="card-title" style={{
          color: '#1e293b',
          fontSize: 'clamp(16px, 4vw, 20px)',
          marginBottom: 'var(--spacing-sm)'
        }}>
          Grafik Penggunaan Listrik
        </h2>
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          width: '100%',
          justifyContent: 'flex-start'
        }}>
          <button
            onClick={() => setChartType('line')}
            className="btn"
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              background: chartType === 'line' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'white',
              color: chartType === 'line' ? 'white' : '#64748b',
              border: chartType === 'line' ? 'none' : '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flex: '1',
              justifyContent: 'center',
              maxWidth: '120px'
            }}
          >
            <TrendingUp size={16} />
            <span className="desktop-only">Line Chart</span>
            <span className="mobile-only">Line</span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className="btn"
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              background: chartType === 'bar' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'white',
              color: chartType === 'bar' ? 'white' : '#64748b',
              border: chartType === 'bar' ? 'none' : '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flex: '1',
              justifyContent: 'center',
              maxWidth: '120px'
            }}
          >
            <BarChart3 size={16} />
            <span className="desktop-only">Bar Chart</span>
            <span className="mobile-only">Bar</span>
          </button>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        padding: 'var(--spacing-lg)',
        borderRadius: '12px',
        minHeight: 'clamp(300px, 50vh, 450px)'
      }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          {chartType === 'line' ? (
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: window.innerWidth < 768 ? 10 : 30,
                left: window.innerWidth < 768 ? 10 : 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', fontWeight: '600' }}
                stroke="#64748b"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                interval={window.innerWidth < 768 ? 'preserveStartEnd' : 0}
              />
              <YAxis
                yAxisId="left"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', fontWeight: '600' }}
                stroke="#64748b"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                width={window.innerWidth < 768 ? 40 : 60}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', fontWeight: '600' }}
                stroke="#64748b"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                width={window.innerWidth < 768 ? 40 : 60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                  fontWeight: '600'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="kWh"
                stroke="#3b82f6"
                strokeWidth={window.innerWidth < 768 ? 2 : 3}
                dot={{ fill: '#3b82f6', r: window.innerWidth < 768 ? 3 : 5 }}
                name="Penggunaan (kWh)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="biaya"
                stroke="#10b981"
                strokeWidth={window.innerWidth < 768 ? 2 : 3}
                dot={{ fill: '#10b981', r: window.innerWidth < 768 ? 3 : 5 }}
                name="Biaya (Ribu Rp)"
              />
            </LineChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: window.innerWidth < 768 ? 10 : 30,
                left: window.innerWidth < 768 ? 10 : 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', fontWeight: '600' }}
                stroke="#64748b"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                interval={window.innerWidth < 768 ? 'preserveStartEnd' : 0}
              />
              <YAxis
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', fontWeight: '600' }}
                stroke="#64748b"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                width={window.innerWidth < 768 ? 40 : 60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                  fontWeight: '600'
                }}
              />
              <Bar
                dataKey="kWh"
                fill="#3b82f6"
                name="Penggunaan (kWh)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;