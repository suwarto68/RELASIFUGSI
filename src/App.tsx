/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, BookOpen, Award, Sparkles, PenTool, Compass, HelpCircle, 
  Heart, Info, ChevronRight, GraduationCap, FileText, CheckSquare, MessageCircle
} from 'lucide-react';

import { Section } from './types';
import { INTRO_MATERIAL } from './data';

// Import Child Components
import MoodSelector from './components/MoodSelector';
import MaterialAccordion from './components/MaterialAccordion';
import InteractiveExplorer from './components/InteractiveExplorer';
import QuizANBK from './components/QuizANBK';
import TugasDashboard from './components/TugasDashboard';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [reflectionFormUrl, setReflectionFormUrl] = useState<string>("https://docs.google.com/forms/d/e/1FAIpQLSciADyRThG25G_S_M1293v7bC6n8e0Zlq7o6Y8xXbK_Y67Kww/viewform?embedded=true");
  const [showReflectionInput, setShowReflectionInput] = useState<boolean>(false);

  const navigationItems = [
    { id: 'beranda', label: 'Beranda', icon: Sparkles },
    { id: 'pendahuluan', label: 'Pendahuluan', icon: Info },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'eksplorasi', label: 'Eksplorasi', icon: Compass },
    { id: 'kuis', label: 'Kuis', icon: Award },
    { id: 'tugas', label: 'Tugas', icon: PenTool },
    { id: 'penutup', label: 'Penutup', icon: CheckSquare }
  ];

  const handleSectionChange = (sectionId: Section) => {
    setCurrentSection(sectionId);
    setMobileMenuOpen(false);
    // Scroll to section block cleanly
    const block = document.getElementById('main-content-layout');
    if (block) {
      block.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070c] flex flex-col font-sans text-slate-200 selection:bg-cyan-500 selection:text-black relative cyber-grid overflow-x-hidden cyber-mesh" id="main-application-shell">
      
      {/* Hologram subtle ambient points */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Upper Brand Info Sub-bar */}
      <div className="bg-black/60 backdrop-blur-md text-slate-400 py-2.5 px-4 border-b border-cyan-500/10 text-center text-[11px] md:flex md:justify-between md:items-center">
        <span className="font-mono tracking-wider text-[10px] uppercase block md:inline font-bold text-cyan-400/90 cyber-text-glow">
          ⚡ SMP NEGERI SEBAGAI MODEL BELAJAR DIGITAL HYBRID
        </span>
        <span className="mt-1 md:mt-0 font-semibold block md:inline flex items-center justify-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 inline text-fuchsia-400" /> Kurikulum Merdeka Matematika Fase D • Bab 4
        </span>
      </div>

      {/* Main Educational Masthead Header */}
      <header className="bg-[#090911]/90 backdrop-blur-md border-b border-cyan-500/20 py-5 px-4 md:px-8 relative sticky top-0 z-40 shadow-lg shadow-cyan-950/20" id="brand-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo / Chapter Info */}
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20 border border-cyan-300/30">
              f(x)
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white font-display cyber-text-glow">
                Bab 4: Relasi dan Fungsi
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-medium">
                <span className="text-cyan-400 font-bold px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-500/25 rounded">MATEMATIKA FASE D</span>
                <span className="text-slate-600">•</span>
                <span className="text-fuchsia-400 font-mono">Guru: Suwarto, S.Pd</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Menus */}
          <nav className="hidden lg:flex items-center gap-1.5" id="desktop-navbar">
            {navigationItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleSectionChange(item.id as Section)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/10 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'text-slate-400 border border-transparent hover:border-cyan-500/20 hover:text-cyan-300 hover:bg-cyan-950/20'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-450 animate-pulse' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation Toggle (Hamburger) */}
          <div className="lg:hidden flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-[#0e0e16] hover:bg-[#141422] text-cyan-400 rounded-xl cursor-pointer border border-cyan-500/35 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-md shadow-black"
              id="hamburger-toggle-button"
            >
              Menu
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu (Vertical) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#0d0d16] border-t border-cyan-500/20 absolute left-0 right-0 py-3 px-4 shadow-2xl z-50 flex flex-col gap-1.5"
              id="mobile-dropdown-menu"
            >
              {navigationItems.map((item) => {
                const IconComp = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id as Section)}
                    className={`flex items-center gap-3 text-xs font-bold w-full p-3 rounded-xl transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/10'
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Educational Application Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 relative z-10" id="main-content-layout">
        <AnimatePresence mode="wait">
          
          {/* SEC 1: BERANDA */}
          {currentSection === 'beranda' && (
            <motion.div
              key="beranda"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Hero Banner Grid with Cyber Obsidian / Cyan & Magenta design */}
              <div className="bg-gradient-to-tr from-[#0a0a14] via-[#111122] to-[#1a102a] text-white rounded-3xl p-6 md:p-10 relative overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/25">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
                
                {/* Circuit decor pattern line overlay */}
                <div className="absolute inset-0 opacity-15 cyber-grid pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
                  <div className="lg:col-span-2 space-y-5">
                    <span className="text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/60 px-3.5 py-1.5 rounded-full border border-cyan-500/30 inline-block shadow-sm">
                      ✨ MEDIA PEMBELAJARAN INTERAKTIF MODERN
                    </span>
                    
                    <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-display font-sans">
                      Kuasai Prinsip <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Relasi & Fungsi</span> Dengan Lebih Visual!
                    </h2>
                    
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
                      Selamat datang di papan belajar mandiri Kurikulum Merdeka. Temukan pengalaman seru mengeksplorasi representasi matematika dari diagram panah dinamis, himpunan pasangan berurutan, hingga koordinat Kartesius. Dilengkapi penilaian standar asesmen kognitif kuis model ANBK & evaluasi emosional.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => handleSectionChange('pendahuluan')}
                        className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black font-extrabold text-xs px-6 py-3.5 rounded-2xl cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95"
                      >
                        Mulai Eksplorasi Cyber <ChevronRight className="w-4 h-4 text-slate-950 stroke-[3]" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-1 flex justify-center items-center">
                    <div className="relative group p-2 bg-slate-900/40 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <img 
                        src="https://e7.pngegg.com/pngimages/339/859/png-clipart-quadratic-function-mathematics-finitary-relation-element-mathematics-angle-white.png" 
                        alt="Grafik Relasi & Fungsi Matematika" 
                        className="max-h-[220px] w-auto h-auto object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-black/60 rounded-2xl p-4 mix-blend-lighten"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mood Selector Interactive Component block */}
              <div className="text-center space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#00e5ff] font-mono cyber-text-glow">
                  📊 PEMETAAAN EMOSIONAL (Social Emotional Learning)
                </h3>
                <p className="text-xs text-slate-400 mb-6 max-w-xl mx-auto">
                  Sebelum memasuki simulasi digital rumit, laporkan kondisi konsentrasimu hari ini agar kami dapat memotivasimu secara personal.
                </p>
                
                <div className="p-1.5 bg-[#0b0c16]/80 rounded-3xl border border-cyan-500/10 shadow-lg max-w-4xl mx-auto">
                  <MoodSelector />
                </div>
              </div>

              {/* Dynamic stats tracker strip with Neon card edges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 text-center">
                <div className="bg-[#0b0c16] border border-cyan-500/15 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300 shadow-md">
                  <BookOpen className="w-6 h-6 text-cyan-400 mx-auto mb-2 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  <span className="text-xs text-cyan-400 block font-semibold font-mono uppercase tracking-wider">4 Materi Bab</span>
                  <p className="text-[11px] text-slate-400 mt-1">Lengkap dengan diagram visualisasi, pemodelan rumus & simulator.</p>
                </div>
                <div className="bg-[#0b0c16] border border-fuchsia-500/15 rounded-2xl p-5 hover:border-fuchsia-500/30 transition-all duration-300 shadow-md">
                  <Compass className="w-6 h-6 text-fuchsia-400 mx-auto mb-2 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                  <span className="text-xs text-fuchsia-400 block font-semibold font-mono uppercase tracking-wider">1 Simulator Utama</span>
                  <p className="text-[11px] text-slate-400 mt-1">Eksplorasi mandiri penentu status Relasi vs Fungsi secara drag/klik.</p>
                </div>
                <div className="bg-[#0b0c16] border border-purple-500/15 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 shadow-md">
                  <Award className="w-6 h-6 text-purple-400 mx-auto mb-2 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                  <span className="text-xs text-purple-400 block font-semibold font-mono uppercase tracking-wider">25 Soal ANBK</span>
                  <p className="text-[11px] text-slate-400 mt-1">Latihan evaluasi model AKM pilihan ganda kompleks untuk mengukur kognitif.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEC 2: PENDAHULUAN */}
          {currentSection === 'pendahuluan' && (
            <motion.div
              key="pendahuluan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-[#0b0c16]/90 rounded-3xl p-6 md:p-8 space-y-6 border border-cyan-500/20 shadow-xl">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded border border-cyan-500/20">
                    Sistem Pengenalan Topik
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-3 font-display cyber-text-glow">
                    Pendahuluan & Sasaran Belajar
                  </h2>
                </div>

                {/* Tujuan Pembelajaran Card Grid */}
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-cyan-500/10">
                  <h3 className="text-xs font-bold uppercase text-deep-cyan tracking-wider font-mono mb-4 flex items-center gap-2 text-cyan-400">
                    🎯 TARGET CAPAIAN PEMBELAJARAN (Numerasi Fase D)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INTRO_MATERIAL.tujuan.map((target, idx) => (
                      <div key={idx} className="bg-[#0d0f1a] p-4 rounded-xl border border-cyan-500/10 flex gap-3 shadow-sm hover:border-cyan-500/20 transition-all">
                        <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/20">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {target}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Let's write the Apersepsi block */}
                <div className="space-y-3 bg-[#0f0e21]/40 p-4 rounded-2xl border border-fuchsia-500/10">
                  <h3 className="text-xs font-bold uppercase text-fuchsia-400 tracking-wider font-mono">
                    💡 APERSEPSI & CONTOH KEHIDUPAN NYATA
                  </h3>
                  <div className="border-l-4 border-fuchsia-500 pl-4 py-1 italic text-xs md:text-sm text-slate-300 font-sans leading-relaxed">
                    {INTRO_MATERIAL.apersepsi}
                  </div>
                </div>

                {/* Ready indicator CTA */}
                <div className="pt-4 flex border-t border-cyan-500/10 justify-end">
                  <button
                    onClick={() => handleSectionChange('materi')}
                    className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-2xl cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-all active:scale-95"
                  >
                    Buka Buku Papan Materi <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEC 3: MATERI */}
          {currentSection === 'materi' && (
            <motion.div
              key="materi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-[#0b0c16]/90 rounded-3xl p-6 border border-cyan-500/20 shadow-xl max-w-4xl mx-auto space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-500/20">
                    Buku Modul Pembelajaran Cyber
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-2 font-display cyber-text-glow">
                    Silabus Inti Relasi & Fungsi
                  </h2>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Uraikan sub-materi di bawah ini untuk mengamati visualisasi interaktif dari pengertian dasar relasi, pemetaan (fungsi), ciri kodomain & range, rumus fungsi linear, hingga diagram panah.
                </p>
              </div>

              {/* Accordion Component List */}
              <div className="max-w-4xl mx-auto">
                <MaterialAccordion />
              </div>

              <div className="max-w-4xl mx-auto pt-6 flex justify-end">
                <button
                  onClick={() => handleSectionChange('eksplorasi')}
                  className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl cursor-pointer flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  Lanjut ke Simulator Utama <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SEC 4: EKSPLORASI */}
          {currentSection === 'eksplorasi' && (
            <motion.div
              key="eksplorasi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <InteractiveExplorer />

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleSectionChange('kuis')}
                  className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl cursor-pointer flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  Buka Kuis Evaluasi Asesmen <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SEC 5: KUIS */}
          {currentSection === 'kuis' && (
            <motion.div
              key="kuis"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <QuizANBK />
            </motion.div>
          )}

          {/* SEC 6: TUGAS */}
          {currentSection === 'tugas' && (
            <motion.div
              key="tugas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <TugasDashboard />

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleSectionChange('penutup')}
                  className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl cursor-pointer flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  Rangkuman & Lembar Refleksi <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SEC 7: PENUTUP */}
          {currentSection === 'penutup' && (
            <motion.div
              key="penutup"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Rangkuman Bab info card */}
              <div className="bg-[#0b0c16]/90 rounded-3xl p-6 md:p-8 space-y-4 border border-cyan-500/20 shadow-xl">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-500/20">
                    Rangkuman Pembelajaran Aljabar
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-3 font-display cyber-text-glow">
                    Kesimpulan Akhir Relasi & Fungsi
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
                  Sebagai penutup, kita dapat merangkum bahwa <strong>Relasi</strong> adalah hubungan atau pasangan anggota suatu himpunan dengan himpunan lainnya, sedangkan <strong>Fungsi (Pemetaan)</strong> adalah relasi khusus yang lebih disiplin, di mana tiap anggota daerah asal (Domain) wajib dipasangkan secara tepat dan memiliki tepat satu pasangan di daerah kawan (Kodomain). Fungsi linear digambarkan oleh rumus aljabar <code className="bg-cyan-950/60 border border-cyan-500/20 px-1.5 py-0.5 rounded font-mono text-cyan-400 font-bold">f(x) = ax + b</code> yang jika digambarkan pada diagram Kartesius membentuk garis lurus dengan kemiringan <code className="bg-cyan-900/40 px-1 py-0.5 rounded font-mono text-cyan-300">a</code> dan konstanta <code className="bg-cyan-900/40 px-1 py-0.5 rounded font-mono text-slate-300">b</code>. Penguasaan konsep ini merupakan landasan penting bagi topik matematika lanjutan.
                </p>
              </div>

              {/* Refleksi Pembelajaran / Google Form Embed */}
              <div className="bg-[#0b0c16]/95 rounded-3xl p-6 md:p-8 space-y-4 border border-cyan-500/20 shadow-xl" id="refleksi-pembelajaran-section">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-fuchsia-400 bg-fuchsia-950/50 px-2.5 py-1 rounded border border-fuchsia-500/20">
                      Jurnal Evaluasi Diri Siswa
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white mt-3 font-display cyber-text-glow">
                      📝 Jurnal Refleksi Pembelajaran (Google Form Embed)
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowReflectionInput(!showReflectionInput)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold hover:underline cursor-pointer"
                  >
                    {showReflectionInput ? "Sembunyikan Panel Setup" : "⚙️ Ganti Tautan Google Form (Guru)"}
                  </button>
                </div>

                {showReflectionInput && (
                  <div className="p-4 bg-slate-950/80 border border-cyan-500/20 rounded-xl space-y-3">
                    <p className="text-xs text-cyan-300 font-semibold">Ganti Iframe Google Form Pendataan Guru:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={reflectionFormUrl}
                        onChange={(e) => setReflectionFormUrl(e.target.value)}
                        placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                        className="bg-black/40 border border-cyan-500/30 rounded-lg p-2.5 text-xs flex-1 text-slate-200 font-mono focus:border-cyan-400 focus:outline-none"
                      />
                      <button 
                        onClick={() => setReflectionFormUrl("https://docs.google.com/forms/d/e/1FAIpQLSciADyRThG25G_S_M1293v7bC6n8e0Zlq7o6Y8xXbK_Y67Kww/viewform?embedded=true")} 
                        className="bg-cyan-950 border border-cyan-500/30 hover:bg-cyan-900 text-cyan-400 text-xs px-4 rounded-lg cursor-pointer font-bold"
                      >
                        Reset
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">Masukkan tautan formulir interaktif Anda sendiri untuk mengompilasi statistik tanggapan secara real-time.</p>
                  </div>
                )}

                {/* Responsive Iframe Container */}
                <div className="bg-[#050508] rounded-2xl border border-cyan-500/25 overflow-hidden relative shadow-inner">
                  <iframe 
                    src={reflectionFormUrl} 
                    width="100%" 
                    height="480px" 
                    className="border-0 w-full relative z-10 bg-white"
                    title="Google Form Jurnal Refleksi Siswa"
                  >
                    Memuat Jurnal Refleksi Siswa...
                  </iframe>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs font-mono">
                    Menyambungkan tautan Google Form Refleksi...
                  </div>
                </div>
              </div>

              {/* Thank you note */}
              <div className="text-center py-6 text-xs text-slate-500 space-y-2 leading-relaxed font-sans max-w-md mx-auto">
                <Heart className="w-5 h-5 text-fuchsia-500 mx-auto animate-pulse filter drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                <p className="text-slate-400 font-medium">Maju Terus Pendidikan Matematika Indonesia!</p>
                <p className="font-mono text-[10px] text-[#00e5ff] font-bold uppercase cyber-text-glow">
                  DIKEMBANGKAN OLEH SUWARTO, S.PD © 2569 CYBER EDITION
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Styled Footer */}
      <footer className="bg-[#06060c] border-t border-cyan-500/10 py-8 px-4 text-center text-slate-500 text-xs mt-auto">
        <div className="max-w-7xl mx-auto space-y-2 font-sans">
          <p className="font-bold text-slate-300">Modern Cyber Curriculum - Relasi, Fungsi & Aljabar</p>
          <p className="leading-relaxed text-slate-400 max-w-2xl mx-auto text-[11px]">
            Platform ini terintegrasi penuh untuk sekolah model digital. Mendukung pementasan diagram, bank soal kualifikasi ANBK AKM, dan integrasi spreadsheet nilai.
          </p>
          <div className="text-[10px] text-cyan-400/80 pt-2 font-semibold font-mono tracking-wider">
            SUMATERA / JAWA / BALI / SULAWESI / PAPUA • HIGH-TECH CLOUD INTERACTION PLATFORM
          </div>
        </div>
      </footer>

    </div>
  );
}
