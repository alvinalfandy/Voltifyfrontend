import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import FuzzyAnalysis from './components/FuzzyAnalysis';
import Dashboard from './components/Dashboard';
import UsageChart from './components/UsageChart';
import UsageHistory from './components/UsageHistory';
import Settings from './components/Settings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /><style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /><style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style></div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const [refreshAppliances, setRefreshAppliances] = useState(0);
  const [refreshDashboard, setRefreshDashboard] = useState(0);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', background: isAuthPage ? 'transparent' : '#f9fafb' }}>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}><Dashboard refresh={refreshDashboard} /><UsageChart refresh={refreshDashboard} /></div></ProtectedRoute>} />
        <Route path="/hitung-penggunaan" element={<ProtectedRoute><div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}><ApplianceForm onApplianceAdded={() => setRefreshAppliances(p => p + 1)} /><ApplianceList refresh={refreshAppliances} onSelectionChange={setSelectedAppliances} /><FuzzyAnalysis selectedAppliances={selectedAppliances} onCalculated={() => setRefreshDashboard(p => p + 1)} /></div></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}><UsageHistory refresh={refreshDashboard} onDataChanged={() => setRefreshDashboard(p => p + 1)} /></div></ProtectedRoute>} />
        <Route path="/pengaturan" element={<ProtectedRoute><div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}><Settings /></div></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;