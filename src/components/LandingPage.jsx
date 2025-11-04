import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingDown, BarChart3, Lightbulb, ArrowRight, CheckCircle, Sparkles, Shield, Clock, ChevronDown } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    [statsRef, featuresRef, howItWorksRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Dashboard Statistik',
      desc: 'Visualisasi data penggunaan listrik harian, mingguan, dan bulanan dengan grafik yang mudah dipahami'
    },
    {
      icon: Zap,
      title: 'Klasifikasi Fuzzy Logic',
      desc: 'Sistem mengklasifikasikan penggunaan listrik: Hemat, Normal, atau Boros menggunakan metode Logika Fuzzy Tsukamoto'
    },
    {
      icon: Lightbulb,
      title: 'Rekomendasi Cerdas',
      desc: 'Dapatkan saran personalisasi untuk menghemat listrik berdasarkan hasil klasifikasi fuzzy logic'
    },
    {
      icon: TrendingDown,
      title: 'Tracking Penghematan',
      desc: 'Pantau progres penghematan listrik Anda dan lihat berapa banyak yang sudah dihemat'
    },
    {
      icon: Clock,
      title: 'History Lengkap',
      desc: 'Akses riwayat penggunaan listrik dengan filter tanggal untuk analisis jangka panjang'
    },
    {
      icon: Shield,
      title: 'Data Aman',
      desc: 'Data penggunaan listrik Anda disimpan dengan aman dan hanya dapat diakses oleh Anda'
    }
  ];

  const steps = [
    { num: '01', title: 'Daftar Akun', desc: 'Buat akun gratis untuk mulai mengelola penggunaan listrik Anda' },
    { num: '02', title: 'Tambah Alat Elektronik', desc: 'Input daftar peralatan rumah tangga beserta daya dan durasi pemakaian harian' },
    { num: '03', title: 'Lihat Klasifikasi Fuzzy', desc: 'Sistem mengklasifikasikan penggunaan: Hemat, Normal, atau Boros dengan Logika Fuzzy' },
    { num: '04', title: 'Dapatkan Rekomendasi', desc: 'Terima saran berdasarkan hasil klasifikasi untuk optimasi penggunaan listrik' }
  ];

  const faqs = [
    {
      question: 'Apa itu Fuzzy Logic dan bagaimana cara kerjanya?',
      answer: 'Fuzzy Logic adalah metode komputasi yang bekerja dengan nilai "kabur" atau tidak pasti, bukan hanya hitam-putih. Sistem ini mengklasifikasikan penggunaan listrik Anda ke dalam kategori Hemat, Normal, atau Boros berdasarkan pola konsumsi yang dianalisis menggunakan metode Fuzzy Logic Tsukamoto.'
    },
    {
      question: 'Apakah Voltify benar-benar gratis?',
      answer: 'Ya! Voltify 100% gratis selamanya. Anda tidak perlu membayar apapun dan tidak ada biaya tersembunyi. Semua fitur dapat digunakan secara penuh tanpa batasan setelah registrasi.'
    },
    {
      question: 'Bagaimana cara sistem mengklasifikasikan penggunaan listrik saya?',
      answer: 'Sistem menggunakan algoritma Fuzzy Logic yang menganalisis total konsumsi listrik harian Anda (kWh). Berdasarkan input daya alat elektronik dan durasi penggunaan, sistem akan menghitung total konsumsi dan mengklasifikasikannya menggunakan membership function untuk menentukan apakah penggunaan Anda termasuk Hemat, Normal, atau Boros.'
    },
    {
      question: 'Apakah data penggunaan listrik saya aman?',
      answer: 'Sangat aman! Data Anda disimpan dengan enkripsi di server kami yang aman. Kami menerapkan standar keamanan tinggi untuk melindungi privasi dan data pribadi Anda.'
    },
    {
      question: 'Berapa banyak penghematan yang bisa saya dapatkan?',
      answer: 'Berdasarkan analisis sistem, pengguna dapat menghemat hingga 30% biaya listrik dengan mengikuti rekomendasi yang diberikan. Penghematan aktual tergantung pada seberapa konsisten Anda menerapkan saran dari sistem.'
    },
    {
      question: 'Apakah saya perlu registrasi?',
      answer: 'Ya, Anda perlu membuat akun gratis untuk menggunakan Voltify. Registrasi hanya membutuhkan email dan password, sangat mudah dan cepat. Dengan akun, data Anda akan tersimpan dengan aman dan bisa diakses kapan saja.'
    },
    {
      question: 'Apakah sistem ini akurat untuk semua jenis rumah?',
      answer: 'Ya, sistem Fuzzy Logic kami dirancang fleksibel dan dapat beradaptasi dengan berbagai pola penggunaan listrik. Baik Anda tinggal di apartemen kecil atau rumah besar, sistem akan menganalisis dan memberikan klasifikasi yang sesuai dengan kondisi Anda.'
    },
    {
      question: 'Bagaimana cara memulai menggunakan Voltify?',
      answer: 'Sangat mudah! Klik tombol "Daftar Gratis", buat akun dengan email Anda, lalu login dan mulai tambahkan daftar alat elektronik Anda beserta daya (Watt) dan durasi pemakaian harian. Sistem akan otomatis menghitung dan mengklasifikasikan penggunaan listrik Anda dengan Fuzzy Logic.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
          
          .gradient-animated {
            background: linear-gradient(270deg, #2563eb, #0ea5e9, #06b6d4);
            background-size: 600% 600%;
            animation: gradientShift 8s ease infinite;
          }
          
          .hover-lift {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .hover-lift:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15) !important;
          }
          
          .feature-card {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .feature-card:nth-child(1) { animation-delay: 0.1s; }
          .feature-card:nth-child(2) { animation-delay: 0.2s; }
          .feature-card:nth-child(3) { animation-delay: 0.3s; }
          .feature-card:nth-child(4) { animation-delay: 0.4s; }
          .feature-card:nth-child(5) { animation-delay: 0.5s; }
          .feature-card:nth-child(6) { animation-delay: 0.6s; }
          
          .step-card {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .step-card:nth-child(1) { animation-delay: 0.2s; }
          .step-card:nth-child(2) { animation-delay: 0.4s; }
          .step-card:nth-child(3) { animation-delay: 0.6s; }
          .step-card:nth-child(4) { animation-delay: 0.8s; }
          
          .icon-wrapper {
            transition: all 0.4s ease;
          }
          
          .feature-card:hover .icon-wrapper {
            transform: scale(1.1) rotate(5deg);
          }
          
          .step-number {
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .step-card:hover .step-number {
            transform: scale(1.2) rotate(360deg);
          }
        `}
      </style>

      {/* Navbar */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="gradient-animated" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Voltify</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '10px 24px',
                fontSize: '15px',
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
            
            <button
              onClick={() => navigate('/register')}
              className="gradient-animated"
              style={{
                padding: '10px 24px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        padding: '100px 20px 120px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        transform: `translateY(${scrollY * 0.15}px)`
      }}>
        <div className="animate-float" style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        <div className="animate-float" style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }} />
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: '#eff6ff',
            borderRadius: '100px',
            marginBottom: '30px',
            border: '1px solid #bfdbfe',
            animationDelay: '0.2s',
            opacity: 0,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <Sparkles size={16} color="#2563eb" className="animate-pulse" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
              Powered by Fuzzy Logic System
            </span>
          </div>

          <h1 className="animate-fadeInUp" style={{ 
            fontSize: '72px', 
            fontWeight: '800', 
            color: '#1e293b',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            animationDelay: '0.3s',
            opacity: 0
          }}>
            Kelola Listrik<br />
            Lebih <span className="gradient-animated" style={{ 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Cerdas</span>
          </h1>

          <p className="animate-fadeInUp" style={{ 
            fontSize: '22px', 
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 50px',
            animationDelay: '0.4s',
            opacity: 0
          }}>
            Platform manajemen listrik pintar dengan Fuzzy Logic untuk mengklasifikasikan pola penggunaan dan memberikan rekomendasi hemat energi hingga 30%
          </p>

          <div className="animate-fadeInUp" style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            animationDelay: '0.5s',
            opacity: 0
          }}>
            <button
              onClick={() => navigate('/register')}
              className="gradient-animated"
              style={{
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.boxShadow = '0 20px 50px rgba(37, 99, 235, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
              }}
            >
              Daftar Gratis
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#2563eb',
                background: 'white',
                border: '3px solid #2563eb',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.background = '#eff6ff';
                e.target.style.boxShadow = '0 20px 50px rgba(37, 99, 235, 0.25)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.15)';
              }}
            >
              Sudah Punya Akun? Login
            </button>
          </div>

          <div className="animate-fadeInUp" style={{ 
            marginTop: '80px',
            position: 'relative',
            animationDelay: '0.6s',
            opacity: 0
          }}>
            <div className="hover-lift" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              maxWidth: '900px',
              margin: '0 auto',
              transform: `translateY(${scrollY * -0.08}px)`,
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80"
                alt="Smart Home Energy Dashboard"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '60px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '20px 30px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                gap: '30px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>Fuzzy</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Logic System</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb' }}>Smart</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Classification</div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fadeInUp" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '60px',
            flexWrap: 'wrap',
            animationDelay: '0.8s',
            opacity: 0
          }}>
            {[
              { text: 'Gratis Selamanya' },
              { text: 'Data Aman' },
              { text: 'Mudah Digunakan' }
            ].map((badge, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '500' }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} id="stats" style={{
        background: 'white',
        padding: '80px 20px',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.06
        }}>
          <img 
            src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=300&q=80"
            alt="Smart Meter"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '8%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.06
        }}>
          <img 
            src="https://images.unsplash.com/photo-1558002038-1055907df827?w=300&q=80"
            alt="Energy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            {[
              { value: '30%', label: 'Potensi Penghematan Listrik', delay: '0.2s' },
              { value: 'Real-time', label: 'Monitoring Penggunaan', delay: '0.4s' },
              { value: 'Fuzzy', label: 'Logic Classification', delay: '0.6s' }
            ].map((stat, i) => (
              <div key={i} className={visibleSections.has('stats') ? 'animate-fadeInUp' : ''} style={{
                animationDelay: stat.delay,
                opacity: visibleSections.has('stats') ? 1 : 0
              }}>
                <div className="gradient-animated" style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '12px',
                  transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                >
                  {stat.value}
                </div>
                <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '500' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} id="features" style={{
        background: '#f8fafc',
        padding: '100px 20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '20px',
          overflow: 'hidden',
          opacity: 0.1,
          transform: 'rotate(12deg)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1558002038-bb4237b54101?w=400&q=80"
            alt="Solar Panel"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className={visibleSections.has('features') ? 'animate-fadeInUp' : ''} style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              opacity: visibleSections.has('features') ? 1 : 0
            }}>
              Fitur Unggulan
            </h2>
            <p className={visibleSections.has('features') ? 'animate-fadeInUp' : ''} style={{ 
              fontSize: '20px', 
              color: '#64748b', 
              maxWidth: '600px', 
              margin: '0 auto',
              animationDelay: '0.1s',
              opacity: visibleSections.has('features') ? 1 : 0
            }}>
              Kelola penggunaan listrik dengan fitur-fitur canggih yang mudah digunakan
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, index) => (
              <div key={index} className={visibleSections.has('features') ? 'feature-card hover-lift' : ''} style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                {index === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    opacity: 0.05
                  }}>
                    <img 
                      src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&q=80"
                      alt="Tech"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="icon-wrapper" style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <feature.icon size={28} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div ref={howItWorksRef} id="howitworks" style={{
        background: 'white',
        padding: '100px 20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.08,
          border: '3px solid #2563eb'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&q=80"
            alt="Light Bulb"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className={visibleSections.has('howitworks') ? 'animate-fadeInUp' : ''} style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              opacity: visibleSections.has('howitworks') ? 1 : 0
            }}>
              Cara Kerja
            </h2>
            <p className={visibleSections.has('howitworks') ? 'animate-fadeInUp' : ''} style={{ 
              fontSize: '20px', 
              color: '#64748b', 
              maxWidth: '600px', 
              margin: '0 auto',
              animationDelay: '0.1s',
              opacity: visibleSections.has('howitworks') ? 1 : 0
            }}>
              Kelola listrik rumah Anda dalam 4 langkah mudah
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {steps.map((step, index) => (
              <div key={index} className={visibleSections.has('howitworks') ? 'step-card' : ''} style={{ 
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className="step-number gradient-animated" style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '24px',
                  fontWeight: '800',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visi & Misi Section */}
      <div style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        padding: '100px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="animate-float" style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Visi & Misi
            </h2>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Komitmen kami untuk masa depan energi yang lebih cerdas
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '40px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div className="hover-lift" style={{
              background: 'white',
              padding: '50px',
              borderRadius: '20px',
              border: '2px solid #e2e8f0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '50%',
                opacity: 0.5
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                }}>
                  <Sparkles size={32} color="white" />
                </div>
                
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '20px'
                }}>
                  Visi
                </h3>
                
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  lineHeight: '1.8',
                  fontWeight: '500'
                }}>
                  Menjadi platform terdepan dalam manajemen energi listrik yang memanfaatkan teknologi Fuzzy Logic untuk menciptakan kehidupan yang lebih hemat, efisien, dan ramah lingkungan.
                </p>
              </div>
            </div>

            <div className="hover-lift" style={{
              background: 'white',
              padding: '50px',
              borderRadius: '20px',
              border: '2px solid #e2e8f0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '50%',
                opacity: 0.5
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                }}>
                  <Zap size={32} color="white" />
                </div>
                
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '20px'
                }}>
                  Misi
                </h3>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {[
                    'Menyediakan sistem klasifikasi penggunaan listrik berbasis Fuzzy Logic yang akurat',
                    'Membantu pengguna menghemat biaya listrik hingga 30%',
                    'Memberikan rekomendasi personalisasi untuk efisiensi energi',
                    'Meningkatkan kesadaran masyarakat tentang pengelolaan listrik yang bijak'
                  ].map((item, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '16px',
                      color: '#64748b',
                      lineHeight: '1.6',
                      fontWeight: '500'
                    }}>
                      <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        background: 'white',
        padding: '100px 20px',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Semua yang perlu Anda ketahui tentang Voltify dan Fuzzy Logic
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div
                  onClick={() => toggleFaq(index)}
                  style={{
                    padding: '24px 28px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    background: openFaqIndex === index ? '#f8fafc' : 'white',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: 0,
                    flex: 1
                  }}>
                    {faq.question}
                  </h3>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: openFaqIndex === index ? '#2563eb' : '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={20} color={openFaqIndex === index ? 'white' : '#64748b'} />
                  </div>
                </div>

                <div style={{
                  maxHeight: openFaqIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <div style={{
                    padding: '0 28px 24px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#64748b',
                      lineHeight: '1.8',
                      margin: '20px 0 0',
                      fontWeight: '500'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '40px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '12px'
            }}>
              Masih Ada Pertanyaan?
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '24px'
            }}>
              Daftar sekarang dan mulai kelola listrik Anda dengan cerdas
            </p>
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#2563eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Daftar Sekarang
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-animated" style={{
        padding: '100px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="animate-float" style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }} />
        <div className="animate-float" style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animationDelay: '1.5s'
        }} />
        
        <div className="animate-float" style={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.15,
          animationDelay: '0.5s'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&q=80"
            alt="Bulb"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="animate-float" style={{
          position: 'absolute',
          bottom: '20%',
          left: '18%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.12,
          animationDelay: '2s'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1558002038-bb4237b54101?w=200&q=80"
            alt="Solar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '24px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Siap Menghemat Listrik Anda?
          </h2>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '50px',
            lineHeight: '1.6'
          }}>
            Mulai kelola penggunaan listrik dengan cerdas hari ini. Gratis dan mudah!
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '20px 50px',
              fontSize: '20px',
              fontWeight: '700',
              background: 'white',
              color: '#2563eb',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-6px) scale(1.05)';
              e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }}
          >
            Mulai Sekarang - Gratis
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0f172a',
        color: 'white',
        padding: '60px 20px 40px',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div className="gradient-animated" style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700' }}>Voltify</h3>
            </div>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              {['Tentang', 'Fitur', 'Kontak'].map((link, i) => (
                <a key={i} href="#" style={{ 
                  color: '#94a3b8', 
                  textDecoration: 'none', 
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#94a3b8';
                  e.target.style.transform = 'translateY(0)';
                }}
                >{link}</a>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px' }}>
              © 2025 Voltify - Smart Electricity Management System
            </p>
            <p style={{ fontSize: '14px', color: '#475569' }}>
              Powered by Fuzzy Logic System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;