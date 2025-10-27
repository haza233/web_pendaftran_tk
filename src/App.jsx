import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X, Phone, Mail, MapPin, Users, BookOpen, Award, ChevronRight, Send, Calendar, Clock, Star, CheckCircle, AlertCircle, Loader2, ChevronLeft, Heart, Globe, Shield, Sparkles, Target, Trophy, GraduationCap, PlayCircle, FileText, Camera } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    tanggalLahir: '',
    jenisKelamin: '',
    namaOrtu: '',
    noTelepon: '',
    email: '',
    alamat: '',
    program: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const kindergartenImages = [
    {
      url: "/assets/img/tk1.jpg",
      title: "Fasilitas Multimedia Interaktif",
      description: "Lingkungan belajar yang kondusif dengan fasilitas multimedia untuk pembelajaran interaktif"
    },
    {
      url: "/assets/img/tk2.jpg",
      title: "Pembelajaran Aktif & Menyenangkan",
      description: "Metode pembelajaran berbasis aktivitas yang mengembangkan kreativitas dan kecerdasan anak"
    },
    {
      url: "/assets/img/tk3.jpg",
      title: "Bermain Sambil Belajar",
      description: "Kombinasi sempurna antara fun learning dan pencapaian target pembelajaran efektif"
    },
    {
      url: "/assets/img/tk4.jpg",
      title: "Playground & Fasilitas Olahraga",
      description: "Area bermain yang aman dan lengkap untuk mengembangkan motorik kasar anak"
    },
    {
      url: "/assets/img/tk5.jpg",
      title: "Seni, Kreativitas & Kerajinan",
      description: "Studio seni lengkap untuk mengasah bakat dan kreativitas melalui berbagai kegiatan artistik"
    },
    {
      url: "/assets/img/tk6.jpg",
      title: "Kegiatan Islami & Character Building",
      description: "Program tahfidz, sholat berjamaah, dan pembentukan akhlak mulia dalam kehidupan sehari-hari"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % kindergartenImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % kindergartenImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + kindergartenImages.length) % kindergartenImages.length);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://b.arrahman.site/api/users/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setSubmitStatus('success');
        setTimeout(() => window.location.reload(), 2000);
      } else if (response.status === 400) {
        setSubmitStatus('email_exists');
      } else if (response.status === 401) {
        setSubmitStatus('null');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.message === 'Email sudah terdaftar, gunakan email lain.') {
        setSubmitStatus('email_exists');
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const programs = [
    {
      title: "Program Reguler",
      duration: "07.30 - 11.30 WIB",
      price: "Rp 350.000/bulan",
      description: "Program pembelajaran standar dengan kurikulum terintegrasi yang menggabungkan pendidikan umum dan nilai-nilai islami",
      features: [
        "Tahfidz Al-Quran & Hadits",
        "Bahasa Arab & Inggris dasar", 
        "Matematika & Sains sederhana",
        "Seni, kreativitas & kerajinan",
        "Olahraga & kesehatan",
        "Character building islami"
      ],
      color: "emerald",
      popular: false
    },
    {
      title: "Program Full Day",
      duration: "07.30 - 15.30 WIB", 
      price: "Rp 450.000/bulan",
      description: "Program pembelajaran extended dengan aktivitas pengembangan diri yang lebih komprehensif",
      features: [
        "Semua fitur program reguler",
        "Makan siang bergizi seimbang",
        "Ekstrakurikuler pilihan",
        "Bimbingan tugas & PR",
        "English club & Arabic club",
        "Life skills & kemandirian"
      ],
      color: "blue",
      popular: true
    }
  ];

  const facilities = [
    { icon: BookOpen, name: "Perpustakaan Digital", desc: "Koleksi buku islami, ensiklopedia anak, dan akses e-book pembelajaran", color: "emerald" },
    { icon: Users, name: "Ruang Kelas Smart", desc: "AC, proyektor interaktif, sound system, kapasitas maksimal 18 siswa per kelas", color: "blue" },
    { icon: GraduationCap, name: "Lab Komputer", desc: "20 unit komputer dengan software edukasi dan akses internet terkontrol", color: "purple" },
    { icon: Star, name: "Masjid Mini", desc: "Tempat ibadah dengan sound system, sajadah anak, dan perpustakaan islami", color: "amber" },
    { icon: PlayCircle, name: "Indoor Playground", desc: "Area bermain dalam ruangan dengan mainan edukatif dan safety standard", color: "pink" },
    { icon: Shield, name: "Klinik Kesehatan", desc: "Ruang UKS dengan perawat jaga dan koordinasi dengan dokter anak", color: "green" }
  ];

  const testimonials = [
    {
      name: "Bu Sari Amelia",
      role: "Wali Murid - Aisyah (5 tahun)",
      text: "Alhamdulillah, sejak bersekolah di TKIT Ar-Rahman, Aisyah jadi lebih mandiri, sopan, dan senang mengaji. Guru-gurunya sangat sabar dan perhatian.",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Pak Ahmad Rizki",
      role: "Wali Murid - Muhammad Farid (4 tahun)", 
      text: "Sistem pembelajaran yang islami dan modern sangat membantu perkembangan anak. Farid sekarang sudah hafal 5 surat pendek dan bisa baca hijaiyah.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Bu Dewi Sartika",
      role: "Wali Murid - Zahra (5 tahun)",
      text: "Fasilitas sekolah lengkap dan bersih. Zahra sangat antusias belajar, terutama saat kegiatan seni dan berkebun. Terima kasih TKIT Ar-Rahman!",
      rating: 5,
      image: "👩‍🏫"
    },
    {
      name: "Pak Budi Santoso", 
      role: "Wali Murid - Adrian (4 tahun)",
      text: "Komunikasi dengan orangtua sangat baik melalui grup WhatsApp dan laporan harian. Kami bisa memantau perkembangan Adrian dengan detail.",
      rating: 5,
      image: "👨‍⚕️"
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Juara 1 Lomba Tahfidz", desc: "Tingkat Kabupaten Siak 2024", color: "yellow" },
    { icon: Award, title: "Sekolah Adiwiyata", desc: "Peduli Lingkungan 2023-2024", color: "green" },
    { icon: Star, title: "Akreditasi B", desc: "Dari Dinas Pendidikan Kab.BOGOR", color: "blue" },
    { icon: Target, title: "ISO 9001:2015", desc: "Standar Manajemen Mutu", color: "purple" }
  ];

  const navigationItems = [
    { id: 'home', label: 'Beranda', icon: '🏠' },
    { id: 'about', label: 'Tentang', icon: '📋' },
    { id: 'programs', label: 'Program', icon: '🎓' },
    { id: 'gallery', label: 'Galeri', icon: '📷' },
    { id: 'registration', label: 'Daftar', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl' 
          : 'bg-white/90 backdrop-blur-xl shadow-xl'
      } border-b border-emerald-100`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative group">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 via-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                  scrollY > 50 ? 'rotate-0 scale-95' : 'rotate-12'
                } group-hover:rotate-0 group-hover:scale-110`}>
                  <BookOpen className="text-white w-6 h-6 md:w-7 md:h-7 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  TKIT Ar-Rahman
                </h1>
                <p className="text-[10px] md:text-sm text-gray-600 flex items-center">
                  <MapPin className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                  <span className="hidden md:inline">Perum Graha Prima, Jonggol</span>
                  <span className="md:hidden">Jonggol, Bogor</span>
                </p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-2">
              {navigationItems.slice(0, -1).map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`px-3 xl:px-4 py-2 rounded-xl transition-all duration-500 flex items-center gap-2 transform hover:scale-105 ${
                    currentSection === item.id 
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg scale-105' 
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm xl:text-base">{item.label}</span>
                </button>
              ))}
              <button 
                onClick={() => setCurrentSection('registration')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 xl:px-6 py-2 rounded-xl font-semibold hover:shadow-xl transition-all duration-500 transform hover:scale-110 flex items-center gap-2 animate-pulse hover:animate-none"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm xl:text-base">Daftar Sekarang</span>
              </button>
            </div>

            <button 
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white transition-transform duration-300 hover:scale-110 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu className="w-6 h-6" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                  <X className="w-6 h-6" />
                </span>
              </div>
            </button>
          </div>

          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl mt-2 p-4 shadow-2xl">
              {navigationItems.map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded-xl transition-all duration-500 flex items-center gap-3 transform ${
                    currentSection === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white scale-105'
                      : 'text-gray-700 hover:bg-emerald-50 hover:scale-102'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? `slideInRight 0.5s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {currentSection === item.id && <ChevronRight className="ml-auto w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {currentSection === 'home' && (
        <div className="space-y-12 md:space-y-20">
          <section className="container mx-auto px-4 py-10 md:py-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-6 md:space-y-10 animate-fadeInLeft">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold text-xs md:text-sm animate-bounce">
                    <Sparkles className="w-4 h-4" />
                    Pendaftaran 2025 Dibuka!
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight">
                    <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                      TKIT
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient" style={{animationDelay: '0.2s'}}>
                      Ar-Rahman
                    </span>
                  </h1>
                  
                  <p className="text-base md:text-xl xl:text-2xl text-gray-700 leading-relaxed">
                    🌟 Taman Kanak-Kanak Islam Terpadu yang mengembangkan potensi anak dengan 
                    <span className="font-bold text-emerald-600"> pendidikan berkualitas</span> dan 
                    <span className="font-bold text-blue-600"> nilai-nilai islami</span> yang kuat
                  </p>

                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold animate-fadeIn">
                      <Award className="w-4 h-4 md:w-5 md:h-5" />
                      Akreditasi B
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold animate-fadeIn" style={{animationDelay: '0.1s'}}>
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                      15+ Tahun Berpengalaman
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 font-semibold animate-fadeIn" style={{animationDelay: '0.2s'}}>
                      <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                      Juara Tahfidz
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button 
                    onClick={() => setCurrentSection('registration')}
                    className="group bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-500" />
                    Daftar Sekarang
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </button>
                  <button 
                    onClick={() => setCurrentSection('about')}
                    className="border-2 border-emerald-500 text-emerald-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-bold hover:bg-emerald-50 transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 md:w-5 md:h-5" />
                    Pelajari Lebih Lanjut
                  </button>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 md:gap-8 pt-4">
                  <div className="text-center animate-fadeInUp">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-600">200+</div>
                    <div className="text-xs md:text-sm text-gray-600">Alumni Sukses</div>
                  </div>
                  <div className="text-center animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-xs md:text-sm text-gray-600">Kepuasan</div>
                  </div>
                  <div className="text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                    <div className="text-2xl md:text-3xl font-bold text-purple-600">15</div>
                    <div className="text-xs md:text-sm text-gray-600">Guru Ahli</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fadeInRight">
                <div className="relative h-64 sm:h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <div className="relative w-full h-full">
                    {kindergartenImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                          index === currentSlide 
                            ? 'opacity-100 scale-100 z-10' 
                            : 'opacity-0 scale-110 z-0'
                        }`}
                      >
                        <img 
                          src={image.url} 
                          alt={image.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white transition-all duration-700 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6">
                            <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">{image.title}</h3>
                            <p className="text-sm md:text-base text-emerald-100 leading-relaxed">{image.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-500 group active:scale-90 z-20"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-125 transition-transform duration-500" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-500 group active:scale-90 z-20"
                  >
                    <ChevronRight className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-125 transition-transform duration-500" />
                  </button>

                  <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {kindergartenImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                          index === currentSlide 
                            ? 'bg-white w-6 md:w-8 scale-125' 
                            : 'bg-white/50 w-2 md:w-3 hover:bg-white/75 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>

                  <div className={`absolute top-4 md:top-6 right-4 md:right-6 bg-gradient-to-r from-emerald-500/90 to-blue-500/90 backdrop-blur-md text-white px-3 md:px-6 py-2 md:py-3 rounded-2xl font-bold shadow-xl text-xs md:text-base transition-all duration-700 ${
                    currentSlide % 2 === 0 ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                  }`}>
                    🎓 Pendidikan Berkualitas
                  </div>

                  <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold animate-pulse">
                    ⭐ Akreditasi B
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Trophy, value: "15+", label: "Tahun Berpengalaman", color: "from-emerald-500 to-green-500", delay: "0s" },
                { icon: GraduationCap, value: "200+", label: "Alumni Sukses", color: "from-blue-500 to-cyan-500", delay: "0.1s" },
                { icon: Users, value: "15", label: "Guru Profesional", color: "from-purple-500 to-violet-500", delay: "0.2s" },
                { icon: Heart, value: "98%", label: "Kepuasan Orangtua", color: "from-pink-500 to-rose-500", delay: "0.3s" }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group text-center p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fadeInUp border border-white/50"
                    style={{animationDelay: stat.delay}}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
              <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                Prestasi Kami
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">
                Penghargaan & <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Sertifikasi</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                Komitmen kami terhadap kualitas pendidikan telah diakui melalui berbagai penghargaan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                const colorClasses = {
                  yellow: "from-yellow-500 to-orange-500",
                  green: "from-green-500 to-emerald-500",
                  blue: "from-blue-500 to-cyan-500",
                  purple: "from-purple-500 to-pink-500"
                };
                return (
                  <div 
                    key={index}
                    className="group bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fadeInUp border border-white/50"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${colorClasses[achievement.color]} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{achievement.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl my-12">
            <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
              <div className="inline-block px-4 md:px-6 py-2 bg-white/80 backdrop-blur-md rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base shadow-lg">
                <Star className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                Testimoni Orangtua
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">
                Apa Kata <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Mereka?</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                Kepercayaan dan kepuasan orangtua adalah prioritas utama kami
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${
                      index === activeTestimonial 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-6xl md:text-7xl mb-4 animate-float">{testimonial.image}</div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-base md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                      <h4 className="text-lg md:text-xl font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm md:text-base text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-3 rounded-full transition-all duration-500 ${
                        index === activeTestimonial 
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 w-8 scale-125' 
                          : 'bg-gray-300 w-3 hover:bg-gray-400 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* About Section */}
      {currentSection === 'about' && (
        <div className="container mx-auto px-4 py-10 md:py-20 space-y-12 md:space-y-20">
          <section className="animate-fadeInUp">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6">
                Mengenal <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">TKIT Ar-Rahman</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 animate-fadeInLeft">
                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <Target className="w-8 h-8 text-emerald-600" />
                    Visi Kami
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Menjadi lembaga pendidikan anak usia dini yang unggul dalam mencetak generasi Qur'ani, 
                    berakhlak mulia, cerdas, mandiri, dan berprestasi, yang siap menghadapi tantangan masa depan 
                    dengan pondasi nilai-nilai islami yang kuat.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                    Misi Kami
                  </h3>
                  <ul className="space-y-3 text-base md:text-lg text-gray-700">
                    {[
                      "Menyelenggarakan pendidikan berkualitas dengan kurikulum terintegrasi",
                      "Mengembangkan potensi spiritual, intelektual, dan emosional anak",
                      "Membangun karakter islami melalui pembiasaan akhlak mulia",
                      "Menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan",
                      "Menjalin kemitraan yang harmonis dengan orangtua dan masyarakat"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6 animate-fadeInRight">
                <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <Globe className="w-12 h-12 md:w-16 md:h-16 mb-4 animate-float" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Keunggulan Kami</h3>
                  <div className="space-y-4 text-sm md:text-base">
                    {[
                      { icon: Shield, text: "Kurikulum terintegrasi nasional & islami" },
                      { icon: Users, text: "Guru bersertifikat & berpengalaman" },
                      { icon: Heart, text: "Rasio guru-murid ideal (1:9)" },
                      { icon: Star, text: "Metode pembelajaran interaktif & fun" },
                      { icon: BookOpen, text: "Program tahfidz Al-Quran terstruktur" },
                      { icon: Trophy, text: "Fasilitas lengkap & modern" }
                    ].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                          <span>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-all duration-500 border border-white/50">
                    <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">2010</div>
                    <div className="text-sm md:text-base text-gray-600">Tahun Berdiri</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-all duration-500 border border-white/50">
                    <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2">B</div>
                    <div className="text-sm md:text-base text-gray-600">Akreditasi</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">
                Fasilitas <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Terbaik</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                Kami menyediakan fasilitas modern dan lengkap untuk mendukung proses pembelajaran
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {facilities.map((facility, index) => {
                const IconComponent = facility.icon;
                const colorClasses = {
                  emerald: "from-emerald-500 to-green-500",
                  blue: "from-blue-500 to-cyan-500",
                  purple: "from-purple-500 to-violet-500",
                  amber: "from-amber-500 to-orange-500",
                  pink: "from-pink-500 to-rose-500",
                  green: "from-green-500 to-teal-500"
                };
                return (
                  <div 
                    key={index}
                    className="group bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-scaleIn border border-white/50"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${colorClasses[facility.color]} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{facility.name}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{facility.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* Programs Section */}
      {currentSection === 'programs' && (
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
            <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
              Program Pendidikan
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6">
              Pilihan <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Program</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan program yang disesuaikan dengan kebutuhan perkembangan anak Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {programs.map((program, index) => {
              const colorClasses = {
                emerald: "from-emerald-500 to-green-500",
                blue: "from-blue-500 to-cyan-500"
              };
              return (
                <div 
                  key={index}
                  className={`relative bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fadeInUp border-2 ${
                    program.popular ? 'border-blue-500' : 'border-white/50'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {program.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 md:px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-bold shadow-lg animate-bounce">
                      🌟 PALING POPULER
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">{program.title}</h3>
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm md:text-base font-medium">{program.duration}</span>
                    </div>
                    <div className={`inline-block px-6 md:px-8 py-3 bg-gradient-to-r ${colorClasses[program.color]} text-white rounded-2xl text-xl md:text-2xl font-black shadow-lg`}>
                      {program.price}
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-700 text-center mb-6 leading-relaxed">{program.description}</p>

                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentSection('registration')}
                    className={`w-full mt-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                      program.popular
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    Daftar Program Ini
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 md:p-10 animate-fadeInUp">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-black text-gray-800 mb-4">
                Kurikulum <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Terintegrasi</span>
              </h3>
              <p className="text-base md:text-lg text-gray-700">
                Pembelajaran holistik yang mengembangkan seluruh aspek perkembangan anak
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: BookOpen, title: "Pendidikan Agama", desc: "Tahfidz, akhlak, ibadah, dan akidah" },
                { icon: Globe, title: "Bahasa", desc: "Bahasa Indonesia, Arab & Inggris" },
                { icon: Target, title: "Kognitif", desc: "Matematika, sains, dan logika" },
                { icon: Heart, title: "Sosial Emosional", desc: "Kerjasama, empati, dan kemandirian" },
                { icon: PlayCircle, title: "Motorik", desc: "Olahraga dan aktivitas fisik" },
                { icon: Sparkles, title: "Seni & Kreativitas", desc: "Musik, menggambar, dan prakarya" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 animate-scaleIn"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mb-3" />
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {currentSection === 'gallery' && (
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
            <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base">
              <Camera className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
              Galeri Aktivitas
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6">
              Dokumentasi <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Kegiatan</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Lihat berbagai kegiatan seru dan pembelajaran bermakna di TKIT Ar-Rahman
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {kindergartenImages.map((image, index) => (
              <div 
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-scaleIn"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm md:text-base text-emerald-100">{image.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center animate-fadeInUp">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <PlayCircle className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 animate-float" />
              <h3 className="text-2xl md:text-4xl font-black mb-4">Ingin Melihat Lebih Banyak?</h3>
              <p className="text-base md:text-xl mb-6 opacity-90">
                Kunjungi sekolah kami untuk melihat langsung fasilitas dan kegiatan pembelajaran
              </p>
              <button 
                onClick={() => setCurrentSection('registration')}
                className="bg-white text-emerald-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 inline-flex items-center gap-3"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Jadwalkan Kunjungan
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Section */}
      {currentSection === 'registration' && (
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
            <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full text-emerald-700 font-semibold mb-4 text-sm md:text-base">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
              Pendaftaran Siswa Baru
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6">
              Daftar <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Sekarang!</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabunglah dengan keluarga besar TKIT Ar-Rahman dan wujudkan masa depan gemilang untuk buah hati Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 animate-fadeInLeft">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  Persyaratan Pendaftaran
                </h3>
                <div className="space-y-4 text-sm md:text-base">
                  {[
                    "Usia minimal 4 tahun pada tahun ajaran baru",
                    "Fotocopy Akta Kelahiran (2 lembar)",
                    "Fotocopy Kartu Keluarga (2 lembar)",
                    "Fotocopy KTP Orangtua (2 lembar)",
                    "Pas foto anak ukuran 3x4 (4 lembar)",
                    "Formulir pendaftaran yang telah diisi"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl border border-white/50">
                <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                  Jadwal Pendaftaran
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl group hover:bg-emerald-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg">Senin - Jumat</div>
                      <div className="text-gray-600">08:00 - 16:00 WIB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl group hover:bg-blue-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg">Sabtu</div>
                      <div className="text-gray-600">08:00 - 12:00 WIB</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl border border-white/50">
                <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                  <Phone className="w-8 h-8 text-blue-600" />
                  Hubungi Kami
                </h3>
                <div className="space-y-4 text-sm md:text-base">
                  <a href="tel:+6285810111004" className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">Telepon</div>
                      <div className="font-bold text-gray-800">+62 858-1011-1004</div>
                    </div>
                  </a>
                  <a href="mailto:dahliaelli@gmail.com" className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">Email</div>
                      <div className="font-bold text-gray-800">dahliaelli@gmail.com</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs mb-1">Alamat</div>
                      <div className="font-bold text-gray-800">
                        Perum Graha Prima Blok C No. 15<br />
                        Jonggol, Bogor, Jawa Barat 16830
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50">
                <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-6 text-center">
                  Formulir Pendaftaran
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl flex items-center gap-3 animate-scaleIn">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-800">Pendaftaran Berhasil!</div>
                      <div className="text-sm text-emerald-600">Tim kami akan segera menghubungi Anda</div>
                    </div>
                  </div>
                )}

                {submitStatus === 'email_exists' && (
                  <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-500 rounded-2xl flex items-center gap-3 animate-scaleIn">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-amber-800">Email Sudah Terdaftar</div>
                      <div className="text-sm text-amber-600">Gunakan email lain atau hubungi kami</div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl flex items-center gap-3 animate-scaleIn">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-red-800">Terjadi Kesalahan</div>
                      <div className="text-sm text-red-600">Silakan coba lagi atau hubungi admin</div>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Lengkap Anak <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="namaLengkap"
                      required
                      value={formData.namaLengkap}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                      placeholder="Masukkan nama lengkap anak"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="tanggalLahir"
                        required
                        value={formData.tanggalLahir}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jenisKelamin"
                        required
                        value={formData.jenisKelamin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                      >
                        <option value="">Pilih</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Orang Tua <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="namaOrtu"
                      required
                      value={formData.namaOrtu}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                      placeholder="Nama ayah/ibu"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        No. Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="noTelepon"
                        required
                        value={formData.noTelepon}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="alamat"
                      required
                      value={formData.alamat}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none resize-none text-gray-800"
                      placeholder="Masukkan alamat lengkap"
                    ></textarea>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Program yang Dipilih <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="program"
                      required
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800"
                    >
                      <option value="">Pilih Program</option>
                      <option value="Program Reguler">Program Reguler (Rp 350.000/bulan)</option>
                      <option value="Program Full Day">Program Full Day (Rp 450.000/bulan)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Kirim Pendaftaran
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs md:text-sm text-gray-600 text-center">
                    Dengan mendaftar, Anda menyetujui{' '}
                    <span className="text-emerald-600 font-semibold">Syarat & Ketentuan</span> yang berlaku
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
            <div className="space-y-4 animate-fadeInUp">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">TKIT Ar-Rahman</h3>
                  <p className="text-xs text-emerald-400">Pendidikan Islami Berkualitas</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Membentuk generasi Qur'ani yang cerdas, mandiri, dan berakhlak mulia untuk masa depan gemilang.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Globe, color: "from-blue-500 to-cyan-500" },
                  { icon: Mail, color: "from-purple-500 to-pink-500" },
                  { icon: Phone, color: "from-emerald-500 to-green-500" }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <button 
                      key={index}
                      className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Kontak Kami
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                  <span>Perum Graha Prima Blok C No. 15, Jonggol, Bogor, Jawa Barat 16830</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href="tel:+6285810111004" className="hover:text-emerald-400 transition-colors">+62 858-1011-1004</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <a href="mailto:dahliaelli@gmail.com" className="hover:text-emerald-400 transition-colors">dahliaelli@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Jam Operasional
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                  <span>Senin - Jumat</span>
                  <span className="font-semibold text-emerald-400">07:30 - 16:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                  <span>Sabtu</span>
                  <span className="font-semibold text-blue-400">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                  <span>Minggu</span>
                  <span className="font-semibold text-red-400">Libur</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Link Cepat
              </h4>
              <div className="space-y-2 text-sm">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="block text-gray-300 hover:text-emerald-400 transition-colors hover:translate-x-2 transform duration-300"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p className="text-center md:text-left">
                © 2024 TKIT Ar-Rahman. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> in Jonggol
              </p>
              <div className="flex gap-6">
                <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
                <button className="hover:text-emerald-400 transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 z-40 ${
          scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-6 h-6 transform -rotate-90" />
      </button>
    </div>
  );
}