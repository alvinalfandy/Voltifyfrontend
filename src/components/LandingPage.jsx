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
          
          @media (max-width: 768px) {
            .hover-lift:hover {
              transform: translateY(-6px) scale(1.01);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
            }
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
        padding: 'clamp(16px, 4vw, 20px) 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 2vw, 12px)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="gradient-animated" style={{
              width: 'clamp(32px, 8vw, 40px)',
              height: 'clamp(32px, 8vw, 40px)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={window.innerWidth < 768 ? 20 : 24} color="white" />
            </div>
            <h1 style={{
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>
              Voltify
            </h1>
          </div>

          <div style={{
            display: 'flex',
            gap: 'clamp(8px, 2vw, 12px)',
            alignItems: 'center'
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 24px)',
                fontSize: 'clamp(13px, 3vw, 15px)',
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
                padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 24px)',
                fontSize: 'clamp(13px, 3vw, 15px)',
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
        padding: 'clamp(60px, 15vw, 100px) clamp(16px, 4vw, 20px) clamp(80px, 20vw, 120px)',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        transform: window.innerWidth > 768 ? `translateY(${scrollY * 0.15}px)` : 'none'
      }}>
        <div className="animate-float" style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        <div className="animate-float" style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 'clamp(150px, 25vw, 300px)',
          height: 'clamp(150px, 25vw, 300px)',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(6px, 2vw, 8px)',
            padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
            background: '#eff6ff',
            borderRadius: '100px',
            marginBottom: 'clamp(20px, 5vw, 30px)',
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
            <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: '600', color: '#2563eb' }}>
              Powered by Fuzzy Logic System
            </span>
          </div>

          <h1 className="animate-fadeInUp" style={{
            fontSize: 'clamp(36px, 10vw, 72px)',
            fontWeight: '800',
            color: '#1e293b',
            lineHeight: '1.1',
            marginBottom: 'clamp(16px, 4vw, 24px)',
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
            fontSize: 'clamp(16px, 4vw, 22px)',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto clamp(30px, 8vw, 50px)',
            animationDelay: '0.4s',
            opacity: 0
          }}>
            Platform manajemen listrik pintar dengan Fuzzy Logic untuk mengklasifikasikan pola penggunaan dan memberikan rekomendasi hemat energi hingga 30%
          </p>

          <div className="animate-fadeInUp" style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animationDelay: '0.5s',
            opacity: 0,
            marginBottom: 'clamp(40px, 10vw, 80px)'
          }}>
            <button
              onClick={() => navigate('/register')}
              className="gradient-animated"
              style={{
                padding: 'clamp(14px, 4vw, 18px) clamp(24px, 6vw, 40px)',
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2vw, 10px)',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                minWidth: 'clamp(140px, 35vw, 200px)'
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
              className="desktop-only"
              style={{
                padding: 'clamp(14px, 4vw, 18px) clamp(24px, 6vw, 40px)',
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: '600',
                color: '#2563eb',
                background: 'white',
                border: '3px solid #2563eb',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2vw, 10px)',
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
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 8vw, 40px)',
            marginTop: 'clamp(40px, 10vw, 60px)',
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
                gap: 'clamp(6px, 2vw, 8px)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#64748b', fontWeight: '500' }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div style={{
        background: 'white',
        padding: 'clamp(60px, 15vw, 80px) clamp(16px, 4vw, 20px)',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: 'clamp(40px, 10vw, 60px)',
            alignItems: 'start'
          }}>
            {/* Visi */}
            <div className="hover-lift" style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: 'clamp(30px, 8vw, 40px)',
              borderRadius: '20px',
              border: '2px solid #bfdbfe',
              textAlign: 'center'
            }}>
              <div style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto clamp(20px, 5vw, 24px)',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
              }}>
                <Sparkles size={window.innerWidth < 768 ? 32 : 40} color="white" />
              </div>
              <h2 style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: 'clamp(16px, 4vw, 20px)'
              }}>
                Visi
              </h2>
              <p style={{
                fontSize: 'clamp(14px, 3.5vw, 18px)',
                color: '#64748b',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Menjadi platform terdepan dalam manajemen energi listrik yang memanfaatkan teknologi Fuzzy Logic untuk menciptakan kehidupan yang lebih hemat, efisien, dan ramah lingkungan.
              </p>
            </div>

            {/* Misi */}
            <div className="hover-lift" style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              padding: 'clamp(30px, 8vw, 40px)',
              borderRadius: '20px',
              border: '2px solid #a7f3d0',
              textAlign: 'center'
            }}>
              <div style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto clamp(20px, 5vw, 24px)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <Zap size={window.innerWidth < 768 ? 32 : 40} color="white" />
              </div>
              <h2 style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: 'clamp(16px, 4vw, 20px)'
              }}>
                Misi
              </h2>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(8px, 2vw, 12px)',
                  marginBottom: 'clamp(12px, 3vw, 16px)'
                }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Menyediakan sistem klasifikasi penggunaan listrik berbasis Fuzzy Logic yang akurat dan mudah dipahami
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(8px, 2vw, 12px)'
                }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Membantu pengguna menghemat biaya listrik hingga 30% melalui rekomendasi yang personal dan actionable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} id="stats" style={{
        background: '#f8fafc',
        padding: 'clamp(60px, 15vw, 80px) clamp(16px, 4vw, 20px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(30px, 8vw, 40px)',
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
                  fontSize: 'clamp(40px, 12vw, 56px)',
                  fontWeight: '800',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                  transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  cursor: 'pointer'
                }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                >
                  {stat.value}
                </div>
                <p style={{ fontSize: 'clamp(14px, 4vw, 18px)', color: '#64748b', fontWeight: '500' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} id="features" style={{
        background: 'white',
        padding: 'clamp(80px, 20vw, 100px) clamp(16px, 4vw, 20px)',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 15vw, 80px)' }}>
            <h2 className={visibleSections.has('features') ? 'animate-fadeInUp' : ''} style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              opacity: visibleSections.has('features') ? 1 : 0
            }}>
              Fitur Unggulan
            </h2>
            <p className={visibleSections.has('features') ? 'animate-fadeInUp' : ''} style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
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
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 6vw, 30px)'
          }}>
            {features.map((feature, index) => (
              <div key={index} className={visibleSections.has('features') ? 'feature-card hover-lift' : ''} style={{
                background: 'white',
                padding: 'clamp(30px, 8vw, 40px)',
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
                <div className="icon-wrapper" style={{
                  width: 'clamp(48px, 12vw, 56px)',
                  height: 'clamp(48px, 12vw, 56px)',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'clamp(20px, 5vw, 24px)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <feature.icon size={window.innerWidth < 768 ? 24 : 28} color="#2563eb" />
                </div>
                <h3 style={{
                  fontSize: 'clamp(18px, 5vw, 22px)',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: 'clamp(8px, 2vw, 12px)'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div ref={howItWorksRef} id="howitworks" style={{
        background: '#f8fafc',
        padding: 'clamp(80px, 20vw, 100px) clamp(16px, 4vw, 20px)',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 15vw, 80px)' }}>
            <h2 className={visibleSections.has('howitworks') ? 'animate-fadeInUp' : ''} style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              opacity: visibleSections.has('howitworks') ? 1 : 0
            }}>
              Cara Kerja
            </h2>
            <p className={visibleSections.has('howitworks') ? 'animate-fadeInUp' : ''} style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              animationDelay: '0.1s',
              opacity: visibleSections.has('howitworks') ? 1 : 0
            }}>
              Mulai hemat listrik dalam 4 langkah mudah
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 6vw, 30px)'
          }}>
            {steps.map((step, index) => (
              <div key={index} className={visibleSections.has('howitworks') ? 'step-card hover-lift' : ''} style={{
                background: 'white',
                padding: 'clamp(30px, 8vw, 40px)',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div className="step-number" style={{
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto clamp(20px, 5vw, 24px)',
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  fontWeight: '800',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontSize: 'clamp(18px, 5vw, 22px)',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: 'clamp(8px, 2vw, 12px)'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        background: 'white',
        padding: 'clamp(80px, 20vw, 100px) clamp(16px, 4vw, 20px)'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 15vw, 80px)' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em'
            }}>
              Pertanyaan Umum
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: '#64748b'
            }}>
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 4vw, 20px)' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: 'clamp(20px, 5vw, 24px)',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'clamp(12px, 3vw, 16px)'
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(16px, 4vw, 18px)',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    color="#64748b"
                    style={{
                      transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}
                  />
                </button>
                {openFaqIndex === index && (
                  <div style={{
                    padding: '0 clamp(20px, 5vw, 24px) clamp(20px, 5vw, 24px)',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <p style={{
                      fontSize: 'clamp(14px, 3.5vw, 16px)',
                      color: '#64748b',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
        padding: 'clamp(80px, 20vw, 100px) clamp(16px, 4vw, 20px)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: '800',
            marginBottom: 'clamp(16px, 4vw, 20px)',
            letterSpacing: '-0.02em'
          }}>
            Mulai Hemat Listrik Hari Ini
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 18px)',
            marginBottom: 'clamp(30px, 8vw, 40px)',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Bergabung dengan ribuan pengguna yang sudah menghemat hingga 30% biaya listrik dengan Voltify
          </p>

          <button
            onClick={() => navigate('/register')}
            style={{
              padding: 'clamp(16px, 4vw, 20px) clamp(32px, 8vw, 48px)',
              fontSize: 'clamp(16px, 4vw, 18px)',
              fontWeight: '600',
              color: '#2563eb',
              background: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(8px, 2vw, 12px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s ease',
              marginBottom: 'clamp(24px, 6vw, 32px)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.05)';
              e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }}
          >
            Daftar Gratis Sekarang
            <ArrowRight size={20} />
          </button>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 8vw, 40px)',
            flexWrap: 'wrap',
            opacity: 0.8
          }}>
            {[
              { text: '✓ Tanpa Biaya Tersembunyi' },
              { text: '✓ Setup 5 Menit' },
              { text: '✓ Support 24/7' }
            ].map((item, i) => (
              <span key={i} style={{
                fontSize: 'clamp(13px, 3vw, 15px)',
                fontWeight: '500'
              }}>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1e293b',
        padding: 'clamp(40px, 10vw, 60px) clamp(16px, 4vw, 20px)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(8px, 2vw, 12px)',
            marginBottom: 'clamp(20px, 5vw, 24px)'
          }}>
            <div className="gradient-animated" style={{
              width: 'clamp(28px, 7vw, 32px)',
              height: 'clamp(28px, 7vw, 32px)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={20} color="white" />
            </div>
            <h3 style={{
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>
              Voltify
            </h3>
          </div>

          <p style={{
            fontSize: 'clamp(13px, 3vw, 15px)',
            color: '#94a3b8',
            marginBottom: 'clamp(20px, 5vw, 24px)'
          }}>
            Platform manajemen listrik pintar dengan teknologi Fuzzy Logic
          </p>

          <div style={{
            paddingTop: 'clamp(20px, 5vw, 24px)',
            borderTop: '1px solid #334155'
          }}>
            <p style={{
              fontSize: 'clamp(12px, 3vw, 14px)',
              color: '#64748b',
              margin: 0
            }}>
              © 2024 Voltify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;