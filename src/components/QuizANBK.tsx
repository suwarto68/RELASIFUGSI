/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, User, GraduationCap, CheckCircle, Clock, Check, HelpCircle, 
  ChevronLeft, ChevronRight, FileSpreadsheet, Eye, Info, Database, Send, BookOpen
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';
import { BaseQuestion } from '../types';
import CertificateGenerator from './CertificateGenerator';

export default function QuizANBK() {
  // Login State
  const [studentName, setStudentName] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("8A");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Quiz running State
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [raguStatus, setRaguStatus] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(2700); // 45 minutes in seconds
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Submit and Google Sheets State
  const [scriptUrl, setScriptUrl] = useState<string>("https://script.google.com/macros/s/AKfycbxYspGNON-xBjRaleutt3M8uR8gvtiXs_dv1WcPe5aD_8C5-RgUBRIG0K5PadJDQMj2/exec"); // Where the deployed GAS URL goes
  const [spreadsheetUrl] = useState<string>("https://docs.google.com/spreadsheets/d/1LF8xodJiJ3UE4eZz8Agj2Lvr0bU_dDFwanKMILn-PRk/edit?gid=0#gid=0");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showGasInstruction, setShowGasInstruction] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correct: number;
    wrong: number;
    answered: number;
    unanswered: number;
    flagged: number;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isLoggedIn || quizCompleted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleForceSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn, quizCompleted]);

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  // Text size classes
  const getTextClass = () => {
    if (textSize === 'large') return 'text-base md:text-lg';
    if (textSize === 'xlarge') return 'text-lg md:text-xl';
    return 'text-xs md:text-sm';
  };

  const getHeadingClass = () => {
    if (textSize === 'large') return 'text-lg md:text-xl';
    if (textSize === 'xlarge') return 'text-xl md:text-2xl';
    return 'text-sm md:text-base';
  };

  // Convert seconds to mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim().length < 3) {
      alert("Silakan masukkan nama lengkap minimal 3 karakter.");
      return;
    }
    setIsLoggedIn(true);
  };

  // Dynamic handlers for different types of answers
  const handleSingleChoiceAnswer = (qId: number, optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleMultipleChoiceAnswer = (qId: number, optionIdx: number) => {
    const currentList = (answers[qId] as number[]) || [];
    if (currentList.includes(optionIdx)) {
      setAnswers(prev => ({
        ...prev,
        [qId]: currentList.filter(item => item !== optionIdx)
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [qId]: [...currentList, optionIdx].sort()
      }));
    }
  };

  const handleTrueFalseAnswer = (qId: number, statementIdx: number, value: boolean) => {
    const currentObj = (answers[qId] as Record<number, boolean>) || {};
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        ...currentObj,
        [statementIdx]: value
      }
    }));
  };

  const handleMatchAnswer = (qId: number, premiseIdx: number, matchIdx: number) => {
    const currentObj = (answers[qId] as Record<number, number>) || {};
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        ...currentObj,
        [premiseIdx]: matchIdx
      }
    }));
  };

  // Check if a question is answered
  const isQuestionAnswered = (q: BaseQuestion) => {
    const ans = answers[q.id];
    if (ans === undefined || ans === null) return false;

    if (q.type === 'pilihan_ganda') {
      return true;
    }
    if (q.type === 'pilihan_ganda_kompleks') {
      return (ans as number[]).length > 0;
    }
    if (q.type === 'benar_salah') {
      // Must answer all statements
      return Object.keys(ans).length === (q.statements?.length || 3);
    }
    if (q.type === 'menjodohkan') {
      // Must answer all premises
      return Object.keys(ans).length === (q.premises?.length || 4);
    }
    return false;
  };

  // Grade quiz
  const gradeQuiz = () => {
    let correctCount = 0;
    let wrongCount = 0;

    QUIZ_QUESTIONS.forEach(q => {
      const ans = answers[q.id];
      const isAns = isQuestionAnswered(q);

      if (!isAns) {
        wrongCount++;
        return;
      }

      if (q.type === 'pilihan_ganda') {
        if (ans === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } 
      else if (q.type === 'pilihan_ganda_kompleks') {
        const sortedCorrect = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
        const sortedAns = Array.isArray(ans) ? [...ans].sort() : [];
        if (JSON.stringify(sortedCorrect) === JSON.stringify(sortedAns)) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } 
      else if (q.type === 'benar_salah') {
        const correctAnswers = q.correctStatements || [];
        const studentAnswers = ans as Record<number, boolean>;
        let allTrue = true;
        const totalStatements = q.statements?.length || 3;
        for (let i = 0; i < totalStatements; i++) {
          if (studentAnswers[i] !== correctAnswers[i]) {
            allTrue = false;
          }
        }
        if (allTrue) correctCount++;
        else wrongCount++;
      } 
      else if (q.type === 'menjodohkan') {
        const correctMap = q.correctMatches || {};
        const studentAnswers = ans as Record<number, number>;
        let allTrue = true;
        const totalPremises = q.premises?.length || 4;
        for (let i = 0; i < totalPremises; i++) {
          if (studentAnswers[i] !== correctMap[i]) {
            allTrue = false;
          }
        }
        if (allTrue) correctCount++;
        else wrongCount++;
      }
    });

    // Score calculations
    const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    const totalAnswered = QUIZ_QUESTIONS.filter(q => isQuestionAnswered(q)).length;
    const totalUnanswered = QUIZ_QUESTIONS.length - totalAnswered;
    const totalFlagged = Object.values(raguStatus).filter(Boolean).length;

    return {
      score,
      correct: correctCount,
      wrong: wrongCount,
      answered: totalAnswered,
      unanswered: totalUnanswered,
      flagged: totalFlagged
    };
  };

  const handleForceSubmit = () => {
    const results = gradeQuiz();
    setScoreResult(results);
    setQuizCompleted(true);
  };

  const handleSubmitQuiz = async () => {
    const unansweredCount = QUIZ_QUESTIONS.filter(q => !isQuestionAnswered(q)).length;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(`Peringatan: Masih ada ${unansweredCount} soal yang belum Anda selesaikan. Apakah Anda yakin ingin mengirim ujian sekarang?`);
      if (!confirmSubmit) return;
    } else {
      const confirmSubmit = window.confirm("Apakah Anda yakin ingin mematangkan dan mengirim seluruh jawaban Anda ke lembar data guru?");
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    const results = gradeQuiz();

    // Pack statistics matching spreadsheet columns
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    const payload = {
      timestamp,
      nama: studentName,
      kelas: studentClass,
      benar: results.correct,
      salah: results.wrong,
      terjawab: results.answered,
      ragu_ragu: results.flagged,
      belum_terjawab: results.unanswered,
      nilai: results.score
    };

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        alert(`Sukses! Data kuis atas nama ${studentName} berhasil terkirim ke Google Spreadsheet guru.`);
      } else {
        console.log("Mock Spreadsheet Post Data:", payload);
        alert(`Hasil kuis berhasil terhitung secara lokal!\n\n(Catatan Guru: Hubungkan Google App Script Anda di kolom yang tersedia untuk pencatatan otomatis ke Spreadsheet)`);
      }
    } catch (err) {
      console.error(err);
      alert("Hasil kuis gagal terkirim ke Server. Namun, sertifikat kelulusan digitalmu tetap sukses digenerasi!");
    } finally {
      setIsSubmitting(false);
      setScoreResult(results);
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setRaguStatus({});
    setQuizCompleted(false);
    setIsLoggedIn(false);
    setScoreResult(null);
    setTimeLeft(2700);
    setCurrentIdx(0);
  };

  // App Script code content to present to teachers
  const appScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.openById("1LF8xodJiJ3UE4eZz8Agj2Lvr0bU_dDFwanKMILn-PRk").getSheets()[0];
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Urutan Kolom: tanggal dan waktu, nama, kelas, benar, salah, terjawab, ragu ragu, belum terjawab, nilai
    sheet.appendRow([
      data.timestamp,
      data.nama,
      data.kelas,
      data.benar,
      data.salah,
      data.terjawab,
      data.ragu_ragu,
      data.belum_terjawab,
      data.nilai
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}`;

  if (quizCompleted && scoreResult) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="bg-[#0b0c16]/95 p-6 rounded-3xl shadow-xl border border-cyan-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg md:text-xl font-bold text-slate-100 font-sans tracking-tight">
            📊 Laporan Hasil Ujian & Evaluasi ANBK Numerasi
          </h3>
          <p className="text-xs text-cyan-400 font-mono mt-1 cyber-text-glow">MATERI: RELASI DAN FUNGSI FASE D</p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 my-6 max-w-4xl mx-auto">
            <div className="p-3 bg-[#0f1124] border border-cyan-400/20 rounded-2xl">
              <span className="text-[9px] text-[#00f0ff] uppercase font-mono block">Nama Peserta</span>
              <strong className="text-xs text-slate-200 truncate block mt-1">{studentName}</strong>
            </div>
            <div className="p-3 bg-[#0f1124] border border-cyan-400/20 rounded-2xl">
              <span className="text-[9px] text-[#00f0ff] uppercase font-mono block">Kelas Sesi</span>
              <strong className="text-xs text-slate-200 block mt-1">{studentClass}</strong>
            </div>
            <div className="p-3 bg-[#0a1823] border border-emerald-500/30 rounded-2xl">
              <span className="text-[9px] text-emerald-400 uppercase font-mono block">Benar (AKM)</span>
              <strong className="text-xs text-emerald-300 block mt-1">{scoreResult.correct} / {QUIZ_QUESTIONS.length}</strong>
            </div>
            <div className="p-3 bg-[#1e0d16] border border-rose-500/30 rounded-2xl">
              <span className="text-[9px] text-rose-400 uppercase font-mono block">Salah</span>
              <strong className="text-xs text-rose-300 block mt-1">{scoreResult.wrong} / {QUIZ_QUESTIONS.length}</strong>
            </div>
            <div className="p-3 bg-[#24170d] border border-amber-500/30 rounded-2xl">
              <span className="text-[9px] text-amber-400 uppercase font-mono block">Ragu-ragu</span>
              <strong className="text-xs text-amber-300 block mt-1">{scoreResult.flagged}</strong>
            </div>
            <div className="p-3 bg-[#13141f] border border-slate-700 rounded-2xl animate-pulse">
              <span className="text-[9px] text-slate-400 uppercase font-mono block">Persentase</span>
              <strong className="text-xs text-[#00ffcc] font-mono block mt-1">{scoreResult.score}%</strong>
            </div>
          </div>
        </div>

        <CertificateGenerator 
          name={studentName}
          className={studentClass}
          score={scoreResult.score}
          onReset={handleResetQuiz}
        />
      </motion.div>
    );
  }

  return (
    <div className="space-y-4" id="quiz-anbk-container">
      
      {/* Login Page */}
      {!isLoggedIn ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-[#0b0c16]/95 rounded-3xl p-6 md:p-8 border border-cyan-500/20 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-12 h-12 bg-cyan-950 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="text-slate-100 font-bold text-lg mb-1 leading-tight">Registrasi Peserta ANBK Numerasi</h3>
          <p className="text-xs text-slate-400 mb-6 font-sans">Silakan lengkapi info identitas resmi ANBK untuk memulai evaluasi digital.</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-bold text-cyan-300 uppercase font-mono block mb-1">Nama Lengkap Siswa</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-cyan-500/55" />
                <input 
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ketik nama lengkap sesuai rapor..."
                  className="w-full bg-black/50 border border-cyan-500/20 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 focus:bg-black/80 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-cyan-300 uppercase font-mono block mb-1">Pilih Kelas / Fase</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-cyan-500/55" />
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-500/20 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-300 focus:outline-none focus:border-cyan-400 focus:bg-black/80 transition-all cursor-pointer"
                >
                  <option value="8A">Kelas VIII A</option>
                  <option value="8B">Kelas VIII B</option>
                </select>
              </div>
            </div>

            <div className="bg-black/40 p-3.5 rounded-xl border border-cyan-500/10 space-y-2 text-[11px] text-slate-400">
              <p className="text-cyan-400 font-bold font-mono text-[10px] uppercase">📌 ATURAN UJIAN INTEGRITAS:</p>
              <ul className="list-disc ml-4 space-y-1 text-[11.5px] leading-relaxed">
                <li>Terdiri dari <strong className="text-slate-250 font-bold">25 soal stimulus numerasi</strong> tingkat AKM Relasi & Fungsi.</li>
                <li>Waktu simulasi dibatasi maksimal <strong className="text-slate-250 font-bold">45 menit</strong>.</li>
                <li>Mendukung sistem penanda status "Ragu-ragu" warna kuning khas ANBK.</li>
                <li>Nilai ujian akan dipetakan langsung pada sertifikat kelulusan digital.</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 via-indigo-650 to-purple-650 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs py-3 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
            >
              Uji & Mulai Ujian <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      ) : (
        /* Real ANBK Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          
          {/* Left panel: Work Space (Stimulus, question text, response selection) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* ANBK Header band */}
            <div className="bg-[#0b0c16]/95 border border-cyan-500/20 text-white p-3.5 rounded-2xl flex flex-wrap gap-2 justify-between items-center shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-100 text-[10px] font-black font-mono px-3 py-1 rounded tracking-widest uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  SOAL NO {activeQuestion.id}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline text-cyan-300">
                  MATEMATIKA FASE D / RELASI & FUNGSI
                </span>
              </div>

              {/* Text Size Control */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-[9px] text-[#00f0ff] uppercase font-mono tracking-widest mr-1">Teks: </span>
                <button 
                  onClick={() => setTextSize('normal')}
                  className={`px-2 py-0.5 rounded font-bold text-[10px] cursor-pointer ${textSize === 'normal' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                >
                  NORM
                </button>
                <button 
                  onClick={() => setTextSize('large')}
                  className={`px-2 py-0.5 rounded font-bold text-xs cursor-pointer ${textSize === 'large' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                >
                  BESAR
                </button>
              </div>

              {/* Timer indicator */}
              <div className="flex items-center gap-1.5 bg-[#030409] px-3.5 py-1.5 rounded-full text-xs font-bold text-yellow-300 border border-yellow-500/20">
                <Clock className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span className="font-mono">SISA: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Split Screen Panel */}
            <div className="bg-[#0b0c16]/95 rounded-2xl border border-cyan-500/15 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 min-h-[440px]">
              
              {/* Left Column: Stimulus Visual Context */}
              <div className="bg-[#05060b]/90 border-r border-cyan-500/10 p-5 overflow-y-auto text-slate-300">
                <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">Pemberitahuan / Stimulus</h4>
                <div className="bg-cyan-950/20 border border-cyan-500/10 p-3.5 rounded-xl mb-4">
                  <h5 className="font-bold text-xs text-slate-200 uppercase tracking-tight leading-snug">STIMULUS SOAL #{activeQuestion.id}</h5>
                  <p className="text-[11.5px] text-slate-405 italic mt-1 font-sans">Konteks Literasi: {activeQuestion.difficulty === 'mudah' ? 'Personal' : 'Saintifik / Sosial-Budaya'}</p>
                </div>

                <div className="space-y-4 leading-relaxed font-sans text-xs md:text-sm">
                  {/* Styled Image stimulus representation if exists */}
                  {(() => {
                    const mockType = activeQuestion.id <= 3 ? "DIAGRAM_PANAH_PULSA" 
                      : (activeQuestion.id <= 8 ? "KARTESIUS_PARKIR" 
                      : (activeQuestion.id <= 13 ? "DIAGRAM_PANAH_KOTAK" 
                      : "TARIF_TAKSI"));
                    
                    return (
                      <div className="bg-black/60 border border-cyan-500/10 p-4 rounded-xl flex items-center justify-center my-3 relative shadow-inner overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                        <div className="text-center relative z-10 w-full">
                          <span className="text-[9px] uppercase font-mono text-cyan-400 tracking-wider bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded mb-2 inline-block">Sensor Schema Diagram</span>
                          <div className="my-1 text-slate-305 font-medium">
                            {mockType === "DIAGRAM_PANAH_PULSA" && (
                              <div className="flex flex-col items-center gap-1 font-mono text-[10px]">
                                <p className="font-semibold text-slate-200">PEMETAAN HIMPUNAN ANAK ➔ HOBI</p>
                                <div className="flex gap-4 items-center mt-2">
                                  <span className="bg-[#00f0ff]/10 text-[#00f0ff] p-1 rounded border border-cyan-500/20">A = {"{Andi, Budi, Cici}"}</span>
                                  <span className="text-slate-505">➔</span>
                                  <span className="bg-[#f000f0]/10 text-[#f000f0] p-1 rounded border border-fuchsia-500/20">B = {"{Sepakbola, Renang, ...}"}</span>
                                </div>
                              </div>
                            )}
                            {mockType === "KARTESIUS_PARKIR" && (
                              <div className="space-y-1 text-[10px] font-mono">
                                <p className="text-slate-200 font-bold">HUBUNGAN JAM PARKIR vs TOTAL BIAYA</p>
                                <p className="text-slate-400">f(x) = 2.000x + 3.000</p>
                              </div>
                            )}
                            {mockType === "DIAGRAM_PANAH_KOTAK" && (
                              <div className="text-[10px] font-mono text-slate-400">
                                <p className="text-slate-205 font-bold">PEMETAAN LOKASI KURIR</p>
                                <p>Himpunan Kurir ke Wilayah Pengantaran tunggal.</p>
                              </div>
                            )}
                            {mockType === "TARIF_TAKSI" && (
                              <div className="text-[10px] font-mono text-slate-400">
                                <p className="text-slate-200 font-bold">STRUKTUR TARIF TAKSI ONLINE</p>
                                <p className="text-cyan-400 font-bold">Biaya Awal = Rp 10.000, per Kilometer = Rp 4.000</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <p className="text-justify text-slate-350 leading-relaxed font-sans text-xs sm:text-sm whitespace-pre-wrap">
                    {activeQuestion.stimulus}
                  </p>
                </div>
              </div>

              {/* Right Column: Active Question & Input Controls */}
              <div className="p-5 md:p-6 overflow-y-auto flex flex-col justify-between bg-[#080915]/95 text-slate-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold font-mono text-fuchsia-400 uppercase tracking-widest cyber-text-glow">
                      Saku Kategori: {activeQuestion.type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">BOBOT: AKM LEVEL III</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className={`${getHeadingClass()} font-bold text-slate-100 font-sans tracking-tight leading-snug`}>
                      {activeQuestion.questionText}
                    </h4>

                    {/* Question Type Options Renderer */}
                    {/* 1. PILIHAN GANDA (Radio/Option style) */}
                    {activeQuestion.type === 'pilihan_ganda' && activeQuestion.options?.map((opt, oIdx) => {
                      const isSelected = answers[activeQuestion.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSingleChoiceAnswer(activeQuestion.id, oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-400 text-[#00f0ff] shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                              : 'bg-black/30 border-cyan-500/10 text-slate-300 hover:border-cyan-500/30'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-[11px] font-bold ${
                            isSelected ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className={`${getTextClass()} font-sans leading-normal`}>{opt}</span>
                        </button>
                      );
                    })}

                    {/* 2. PILIHAN GANDA KOMPLEKS (Checkbox style multiple answers) */}
                    {activeQuestion.type === 'pilihan_ganda_kompleks' && activeQuestion.options?.map((opt, oIdx) => {
                      const currentSelected = (answers[activeQuestion.id] as number[]) || [];
                      const isSelected = currentSelected.includes(oIdx);

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleMultipleChoiceAnswer(activeQuestion.id, oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-cyan-950/50 border-[#ff00ff] text-[#ff00ff] shadow-[0_0_12px_rgba(255,0,255,0.15)]'
                              : 'bg-black/30 border-cyan-500/10 text-slate-300 hover:border-cyan-500/30'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-[11px] font-bold ${
                            isSelected ? 'bg-[#ff00ff] text-slate-950 border-fuchsia-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </div>
                          <span className={`${getTextClass()} font-sans leading-normal`}>{opt}</span>
                        </button>
                      );
                    })}

                    {/* 3. BENAR SALAH (Table grid of statements) */}
                    {activeQuestion.type === 'benar_salah' && activeQuestion.statements?.map((statement, sIdx) => {
                      const currentAnswers = (answers[activeQuestion.id] as Record<number, boolean>) || {};
                      const selectedVal = currentAnswers[sIdx];

                      return (
                        <div key={sIdx} className="p-3 bg-black/40 border border-cyan-500/10 rounded-xl flex flex-col md:flex-row gap-2.5 items-start md:items-center justify-between">
                          <span className="text-[11.5px] text-slate-300 leading-relaxed font-sans">{sIdx + 1}. {statement}</span>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleTrueFalseAnswer(activeQuestion.id, sIdx, true)}
                              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
                                selectedVal === true
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30 font-black shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                                  : 'bg-slate-900 border-slate-700 text-slate-450 hover:bg-slate-800'
                              }`}
                            >
                              Benar
                            </button>
                            <button
                              onClick={() => handleTrueFalseAnswer(activeQuestion.id, sIdx, false)}
                              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
                                selectedVal === false
                                  ? 'bg-rose-950/60 text-rose-450 border-rose-500/30 font-black shadow-[0_0_8px_rgba(244,63,94,0.2)]'
                                  : 'bg-slate-900 border-slate-700 text-slate-450 hover:bg-slate-800'
                              }`}
                            >
                              Salah
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* 4. MENJODOHKAN (Dropdown selection for premises) */}
                    {activeQuestion.type === 'menjodohkan' && activeQuestion.premises?.map((premise, pIdx) => {
                      const currentAnswers = (answers[activeQuestion.id] as Record<number, number>) || {};
                      const selectedMatch = currentAnswers[pIdx];

                      return (
                        <div key={pIdx} className="p-3 bg-[#0a0c16] border border-cyan-500/10 rounded-xl flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                          <span className="text-xs text-slate-300 leading-normal max-w-xs">{pIdx + 1}. {premise}</span>
                          <select
                            value={selectedMatch !== undefined ? selectedMatch : ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (v === "") return;
                              handleMatchAnswer(activeQuestion.id, pIdx, parseInt(v));
                            }}
                            className="bg-black border border-cyan-500/20 rounded-lg py-1.5 px-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-cyan-400 w-full sm:w-auto cursor-pointer"
                          >
                            <option value="" className="text-slate-500 font-medium">-- Hubungkan --</option>
                            {activeQuestion.matches?.map((matchOpt, mIdx) => (
                              <option key={mIdx} value={mIdx}>{matchOpt}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* Question Info / Helper */}
                <div className="pt-4 border-t border-cyan-500/5 mt-6 flex justify-between text-[10px] text-slate-500">
                  <span>Simpan tanggapan sebelum menyerahkan.</span>
                  <span className="font-mono">TIPE: {activeQuestion.difficulty.toUpperCase()}</span>
                </div>
              </div>

            </div>

            {/* Bottom Nav Buttons bar */}
            <div className="flex bg-[#0b0c16]/95 p-3 rounded-2xl border border-cyan-500/15 justify-between items-center gap-2 relative z-10 shadow-lg">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className={`flex items-center gap-1 text-[11px] font-bold px-3 py-2 rounded-xl border transition-all duration-250 ${
                  currentIdx === 0 
                    ? 'text-slate-600 border-slate-900 bg-[#06070e] cursor-not-allowed' 
                    : 'text-slate-350 border-cyan-500/10 hover:border-cyan-500/30 hover:bg-[#16172e] cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> SOAL SEBELUM
              </button>

              {/* RAGU-RAGU ANBK TICKET */}
              <button
                onClick={() => setRaguStatus(prev => ({ ...prev, [activeQuestion.id]: !prev[activeQuestion.id] }))}
                className={`flex items-center justify-center gap-1.5 text-[11px] font-black px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  raguStatus[activeQuestion.id]
                    ? 'bg-amber-400 text-amber-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-amber-950/20 border border-amber-500/30 text-amber-400 hover:bg-amber-900/30'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={!!raguStatus[activeQuestion.id]} 
                  onChange={() => {}} // handled by button click
                  className="accent-amber-950"
                />
                RAGU-RAGU
              </button>

              {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="flex items-center gap-1 text-[11px] font-bold bg-[#14183a] hover:bg-[#1b2152] border border-cyan-500/20 text-slate-200 px-4 py-2 rounded-xl cursor-pointer transition-all"
                >
                  SOAL BERIKUT <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/10 transition-all duration-300 animate-pulse font-mono tracking-wider"
                >
                  <Send className="w-4 h-4" /> {isSubmitting ? "MENGIRIM..." : "KIRIM JAWABAN"}
                </button>
              )}
            </div>

          </div>

          {/* Right panel: Information Map grid of all questions */}
          <div className="space-y-4">
            
            {/* Pupil Information */}
            <div className="bg-[#0b0c16]/95 border border-cyan-500/20 p-4 rounded-2xl shadow-xl relative overflow-hidden">
              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#ff00ff] block mb-2 cyber-text-glow">Peserta Aktif</span>
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/20 flex items-center justify-center text-cyan-300 font-extrabold text-xs shrink-0 font-mono">
                  {studentName ? studentName.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="overflow-hidden">
                  <h5 className="text-xs font-bold text-slate-100 truncate leading-tight">{studentName}</h5>
                  <span className="text-[10px] text-slate-400">Kelas {studentClass}</span>
                </div>
              </div>
            </div>

            {/* Questions list map */}
            <div className="bg-[#0b0c16]/95 border border-cyan-500/20 p-4 rounded-2xl shadow-xl">
              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-cyan-400 block mb-3 cyber-text-glow">
                Peta Kisi Soal ANBK
              </span>

              <div className="grid grid-cols-5 gap-2" id="anbk-grid-mapping">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = isQuestionAnswered(q);
                  const isRagu = raguStatus[q.id];

                  // Class calculations matching standard ANBK
                  let cellBg = 'bg-black/40 border-cyan-500/10 text-slate-500 hover:bg-black/60';
                  if (isAnswered) cellBg = 'bg-emerald-950 text-emerald-400 border-emerald-500/30';
                  if (isRagu) cellBg = 'bg-amber-950 text-amber-400 border-amber-500/30 font-bold';
                  if (isCurrent) cellBg += ' ring-2 ring-cyan-400 ring-offset-2 ring-offset-black';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-lg border text-xs font-bold leading-none flex flex-col items-center justify-center cursor-pointer transition-all font-mono ${cellBg}`}
                    >
                      <span>{q.id}</span>
                      {isRagu && <span className="text-[8px] mt-0.5 leading-none">?</span>}
                      {isAnswered && !isRagu && <span className="text-[8px] mt-0.5 leading-none font-sans text-emerald-500">✔</span>}
                    </button>
                  );
                })}
              </div>

              {/* Grid Legend color */}
              <div className="mt-4 pt-3 border-t border-cyan-500/5 space-y-1.5 text-[10px] text-slate-400 font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-950 border border-emerald-500/30 rounded" />
                  <span>Jawaban Selesai / Terisi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-amber-950 border border-amber-500/30 rounded" />
                  <span>Ditandai Ragu-ragu (?)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-black/40 border border-cyan-500/10 rounded" />
                  <span>Belum Terisi / Kosong</span>
                </div>
              </div>
            </div>

            {/* Google Sheets Config panel for teachers */}
            <div className="bg-[#0b0c16]/95 p-4 rounded-2xl border border-cyan-500/20 shadow-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-cyan-400 flex items-center gap-1 cyber-text-glow">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Integrasi Spreadsheet
                </span>
                
                <button
                  onClick={() => setShowGasInstruction(!showGasInstruction)}
                  className="text-[9px] font-bold text-[#ff00ff] hover:underline cursor-pointer uppercase font-mono"
                >
                  {showGasInstruction ? "Tutup" : "Lihat Script"}
                </button>
              </div>

              {/* Show instructions with Copy / Input */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-450 block">Link Lembar Spreadsheet:</span>
                  <a 
                    href={spreadsheetUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] text-cyan-300 hover:underline flex items-center gap-1 truncate font-mono bg-black/40 p-2 rounded border border-cyan-500/10"
                  >
                    <BookOpen className="w-3 h-3 text-cyan-400 shrink-0" /> Open Spreadsheet ↗
                  </a>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-450 block uppercase">Endpoint Google Web App Script:</label>
                  <input 
                    type="password"
                    value={scriptUrl}
                    onChange={(e) => setScriptUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full bg-black/50 border border-cyan-500/20 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-[8px] text-slate-400 leading-tight block">
                    (Opsional Guru) Rekam otomatis nilai siswa ke database Sheets. Kosongkan untuk sekadar demo lokal.
                  </span>
                </div>
              </div>

              {showGasInstruction && (
                <div className="bg-[#04050e] p-2.5 rounded-lg border border-cyan-500/10 space-y-1.5 text-[9px] text-slate-400 leading-relaxed font-sans">
                  <p className="font-bold text-slate-300 flex items-center gap-1"><Info className="w-3 h-3 text-cyan-400" /> Tahap Pemasangan Apps Script:</p>
                  <ol className="list-decimal ml-3 space-y-1">
                    <li>Buka GSheets Anda, arahkan menu ke <strong className="text-slate-200">Ekstensi &gt; Apps Script</strong>.</li>
                    <li>Seka kode lama, tempelkan kode skrip di bawah ini.</li>
                    <li>Ubah kode ID Spreadsheet di dalam parameter jika memakai file baru.</li>
                    <li>Klik <strong className="text-slate-200">Deploy &gt; New Deployment &gt; Web App</strong>, pilih akses ke <strong className="text-slate-200">Siapa saja (Anyone)</strong>, salin URL & tempel di kolom atas.</li>
                  </ol>
                  <details className="mt-2 font-mono">
                    <summary className="text-cyan-400 cursor-pointer font-bold select-none">Tampilkan Script Code</summary>
                    <pre className="bg-black/80 p-2 border border-cyan-500/10 rounded max-h-[140px] overflow-y-auto mt-1 whitespace-pre text-[8px] select-all font-mono text-emerald-400">
                      {appScriptCode}
                    </pre>
                  </details>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
