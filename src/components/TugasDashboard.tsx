/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, Link2, CheckCircle2, FileText, LayoutTemplate, HelpCircle, ExternalLink, Image } from 'lucide-react';

export default function TugasDashboard() {
  const [canvaLink, setCanvaLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitTugas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canvaLink.trim()) {
      setErrorMsg("Silakan masukkan tautan/link hasil karya Canva Anda.");
      return;
    }
    if (!canvaLink.startsWith("http://") && !canvaLink.startsWith("https://")) {
      setErrorMsg("Format link tidak valid. Pastikan diawali dengan http:// atau https://");
      return;
    }

    setErrorMsg("");
    setIsSubmitted(true);
    alert("Sukses! Link Tugas Portofolio Poster Canva Anda berhasil didata oleh sistem pembelajaran Pak Suwarto.");
  };

  return (
    <div className="space-y-6" id="tugas-dashboard-main">
      <div className="bg-[#0b0c16]/95 rounded-2xl p-5 shadow-xl border border-cyan-500/20 grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
        
        {/* Task Instructions panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/15 px-2.5 py-1 rounded">
              Tugas Portofolio Kreatif
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-fuchsia-400 cyber-text-glow">
              Fase D / Kelas VII
            </span>
          </div>

          <h3 className="text-base md:text-xl font-bold text-slate-100">
            🎨 Proyek Infografis: "Aplikasi Relasi & Fungsi di Dunia Nyata"
          </h3>

          <p className="text-xs text-slate-350 leading-relaxed font-sans">
            Selamat datang di lembar tugas kreatif! Untuk bab <strong className="text-cyan-400">Relasi dan Fungsi</strong>, kalian akan merancang infografis/poster digital edukatif menggunakan bantuan <strong className="text-fuchsia-400">Canva AI (Magic Design)</strong>.
          </p>

          <div className="bg-black/40 p-4 rounded-xl border border-cyan-500/10 space-y-2 text-xs">
            <p className="font-bold text-[#00ffcc] font-mono tracking-wider uppercase text-[10px]">📋 Panduan Pengerjaan Tugas:</p>
            <ol className="list-decimal ml-4 space-y-1.5 text-slate-300 leading-relaxed font-sans text-xs">
              <li>Buka aplikasi Canva dan klik fitur <strong className="text-cyan-400">Magic Design / Canva AI</strong>.</li>
              <li>Tulis kata kunci (prompt) poster: <em className="text-fuchsia-300 font-medium">"Infographic of Relation and Function Mathematics applications in real life"</em>.</li>
              <li>Sesuaikan desain infografis kalian, pastikan memuat:
                <ul className="list-disc ml-5 mt-1 space-y-0.5 text-slate-400">
                  <li><strong>Definisi:</strong> Perbedaan mendasar Relasi dan Fungsi.</li>
                  <li><strong>Contoh Nyata:</strong> Tarif ojek online, silsilah keluarga, map gol darah, dll.</li>
                  <li><strong>Penyajian:</strong> Ada visualisasi diagram panah atau grafik koordinat Kartesius.</li>
                </ul>
              </li>
              <li>Bagikan desain Canva tersebut sebagai <strong className="text-cyan-450 border-b border-cyan-500/20">"Tautan Lihat Saja" (View-Only Link)</strong>.</li>
              <li>Salin tautan tersebut, lalu kumpulkan melalui kotak pengumpulan di sebelah kanan panel!</li>
            </ol>
          </div>

          {/* Canva Link Shortcut Button */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://www.canva.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 to-cyan-550 hover:from-cyan-500 hover:to-cyan-450 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-400/10 active:scale-95"
            >
              <LayoutTemplate className="w-4 h-4" /> Buka Canva Workspace ↗
            </a>
            
            <a
              href="https://canva.me/design"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 border border-cyan-500/10 bg-black/40 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Pelajari Canva AI <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Form Submission panel */}
        <div className="bg-[#05060f]/90 p-4 rounded-2xl border border-cyan-500/15 flex flex-col justify-between">
          <form onSubmit={handleSubmitTugas} className="space-y-4">
            <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono cyber-text-glow">
              📥 Kotak Kumpul Tugas
            </h4>

            {!isSubmitted ? (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400 leading-normal">
                  Kumpulkan link desain presentasi/poster Canva AI kalian di bawah ini:
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider block">Tautan Share Canva</label>
                  <div className="relative">
                    <Link2 className="absolute left-2.5 top-2.5 w-4 h-4 text-cyan-500/60" />
                    <input
                      type="text"
                      value={canvaLink}
                      onChange={(e) => setCanvaLink(e.target.value)}
                      placeholder="https://www.canva.com/design/DA..."
                      className="bg-black/60 border border-cyan-500/20 w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:border-cyan-400 text-slate-200 font-mono"
                    />
                  </div>
                  {errorMsg && <p className="text-[10px] text-rose-450 mt-1 font-medium">{errorMsg}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 via-indigo-650 to-purple-650 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm uppercase font-mono tracking-wider"
                >
                  Kirim Hasil Karya
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl text-center space-y-3"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-pulse filter drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-400 font-mono">TUGAS TERKUMPUL!</p>
                  <textarea 
                    readOnly 
                    value={canvaLink} 
                    className="w-full bg-black/50 p-1.5 border border-emerald-500/20 rounded text-[9px] font-mono text-[#00ffcc] resize-none h-12 outline-none select-all text-center leading-normal" 
                  />
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] text-cyan-400 font-semibold hover:underline cursor-pointer"
                >
                  Ubah/Kumpul Ulang Tautan
                </button>
              </motion.div>
            )}
          </form>

          <div className="mt-4 pt-3 border-t border-cyan-500/10 text-[10px] text-slate-400 leading-normal font-sans">
            ℹ️ Tugas ini akan dinilai secara holistik berdasarkan struktur materi, kreativitas desain, dan keselarasan studi kasus dunia nyata.
          </div>
        </div>

      </div>

      {/* Canva Poster Preview Mockup Showcase */}
      <div className="bg-[#0b0c16]/95 rounded-2xl p-5 shadow-xl border border-cyan-500/20">
        <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5 cyber-text-glow">
          <Image className="w-4 h-4 text-cyan-400 animate-pulse" /> Contoh Inspirasi Karya Infografis (Canva AI Template)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-cyan-500/10 p-2.5 rounded-xl bg-black/40 relative group overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-cyan-950/40 to-indigo-950/20 rounded-lg flex items-center justify-center p-3 text-center border border-cyan-500/10">
              <span className="text-xs font-bold text-cyan-300 font-sans">Poster Model Tarif Taksi Online</span>
            </div>
            <p className="text-xs font-bold text-slate-200 mt-2">Aplikasi Relasi Linear</p>
            <p className="text-[10px] text-slate-400 font-mono">f(x) = ax + b tarif kilometer</p>
          </div>

          <div className="border border-cyan-500/10 p-2.5 rounded-xl bg-black/40 relative group overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-indigo-950/40 to-purple-950/20 rounded-lg flex items-center justify-center p-3 text-center border border-cyan-500/10">
              <span className="text-xs font-bold text-fuchsia-300 font-sans">Infografis Hubungan Himpunan Goldar</span>
            </div>
            <p className="text-xs font-bold text-slate-200 mt-2">Diagram Panah Golongan Darah</p>
            <p className="text-[10px] text-slate-400 font-mono">Memetakan 1 orang ke 1 golongan darah</p>
          </div>

          <div className="border border-cyan-500/10 p-2.5 rounded-xl bg-black/40 relative group overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-purple-950/40 to-pink-950/20 rounded-lg flex items-center justify-center p-3 text-center border border-cyan-500/10">
              <span className="text-xs font-bold text-purple-300 font-sans">Peta Konsep Domain Kodomain Range</span>
            </div>
            <p className="text-xs font-bold text-slate-200 mt-2">Rumus & Penataan Himpunan</p>
            <p className="text-[10px] text-slate-400 font-mono">Visualisasi daerah asal dan hasil</p>
          </div>

          <div className="border border-cyan-500/10 p-2.5 rounded-xl bg-black/40 relative group overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-950/40 to-orange-950/20 rounded-lg flex items-center justify-center p-3 text-center border border-cyan-500/10">
              <span className="text-xs font-bold text-amber-300 font-sans">Grafik Koordinat Kartesius</span>
            </div>
            <p className="text-xs font-bold text-slate-200 mt-2">Sumbu X & Y Matematika</p>
            <p className="text-[10px] text-slate-400 font-mono">Visualisasi kemiringan linear f(x)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
