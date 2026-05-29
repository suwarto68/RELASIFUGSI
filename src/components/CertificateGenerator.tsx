/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { Award, Printer, Calendar, BookOpen, Share2 } from 'lucide-react';

interface CertificateProps {
  name: string;
  className: string;
  score: number;
  dateString?: string;
  onReset: () => void;
}

export default function CertificateGenerator({ name, className, score, dateString, onReset }: CertificateProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  const today = dateString || new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Open a clean print window style specifically targeting high-resolution layout
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Sertifikat_${name.replace(/\s+/g, '_')}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  body { -webkit-print-color-adjust: exact; }
                }
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
              </style>
            </head>
            <body class="bg-white p-4 font-sans">
              ${printContent}
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback simple native system
        window.print();
      }
    }
  };

  const isOutstanding = score >= 85;
  const isExcellent = score >= 70 && score < 85;

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="certificate-generator-root">
      {/* Action panel */}
      <div className="bg-[#0b0c16]/95 p-5 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-950 rounded-xl text-cyan-400 border border-cyan-500/10 animate-pulse">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-sans tracking-tight">🎉 Selamat! Kuis Berhasil Selesai!</h3>
            <p className="text-xs text-slate-400">Sertifikat kelulusan digitalmu telah terbit secara otomatis.</p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-555 hover:from-emerald-550 hover:to-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-md shadow-emerald-500/10 transition-all duration-250 active:scale-95 uppercase tracking-wide font-mono"
          >
            <Printer className="w-4 h-4" /> Cetak / PDF
          </button>
          
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-900 border border-cyan-500/10 hover:border-cyan-500/30 text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-colors font-mono"
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Styled Printable Certificate Frame */}
      <div className="border border-cyan-500/10 p-2 rounded-3xl bg-[#030409] shadow-2xl relative">
        <div 
          ref={printAreaRef}
          className="bg-white p-6 md:p-12 border-8 border-double border-amber-600 rounded-2xl relative overflow-hidden text-center aspect-[1.414/1] max-w-full flex flex-col justify-between"
          style={{ backgroundImage: 'radial-gradient(#fbfbfb 1px, transparent 0), radial-gradient(#fafafa 1px, transparent 0)', backgroundSize: '16px 16px', backgroundPosition: '0 0, 8px 8px' }}
        >
          {/* Top Left/Right/Bottom Ornate Corner Background Watermark Decoratives */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-500/20 m-4 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-amber-500/20 m-4 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-amber-500/20 m-4 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-500/20 m-4 rounded-br-xl pointer-events-none" />

          {/* Security Center Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <Award className="w-[320px] h-[320px] text-amber-900" />
          </div>

          <div className="space-y-4">
            {/* Header */}
            <div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-slate-400 block mb-1">
                KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
              </span>
              <h2 className="text-xl md:text-3xl font-serif font-extrabold tracking-wide text-amber-800 uppercase mt-1">
                Sertifikat Kelulusan
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-40 mx-auto mt-2" />
            </div>

            {/* Sub-text */}
            <div className="space-y-1">
              <p className="text-xs md:text-sm italic text-slate-500">Diberikan dengan hormat kepada:</p>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 bg-linear-to-r from-amber-700 to-slate-900 bg-clip-text text-transparent px-4 py-1 inline-block">
                {name}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-bold">
                Kelas: {className}
              </p>
            </div>
          </div>

          {/* Statement */}
          <div className="my-4 max-w-lg mx-auto">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
              Atas pencapaian luar biasa dalam menyelesaikan Asesmen Numerasi Interaktif 
              pada materi pelajaran <strong className="text-amber-800">Relasi dan Fungsi</strong> (Matematika Kelas 7 Fase D) 
              dengan perolehan skor ujian sebesar:
            </p>
            
            {/* Score Badge */}
            <div className="my-3 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold font-mono">
              <span className="text-xs uppercase tracking-wider font-sans font-semibold">Skor Akhir:</span>
              <span className="text-xl md:text-2xl font-black">{score}</span>
              <span className="text-xs font-semibold text-amber-600">/ 100</span>
            </div>

            <p className="text-[10px] md:text-xs text-slate-500">
              Evaluasi mencakup 25 soal model AKM Pilihan Ganda, Benar/Salah, dan Menjodohkan.
            </p>
          </div>

          {/* Footer Signatures */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-200 mt-4">
            <div className="text-center">
              <span className="text-[9px] md:text-[10px] text-slate-400 block uppercase tracking-wider font-mono">
                Tanggal Terbit
              </span>
              <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1 mt-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {today}
              </span>
            </div>

            <div className="text-center">
              <span className="text-[9px] md:text-[10px] text-slate-400 block uppercase tracking-wider font-mono">
                Guru Mata Pelajaran
              </span>
              <div className="relative inline-block mt-1">
                {/* Simulated handwritten-like decorative seal label */}
                <span className="font-serif italic text-sm text-amber-700 font-bold block relative z-10">
                  Suwarto, S.Pd
                </span>
                <span className="text-[9px] text-slate-500 block font-mono">
                  NIP. 19750810 200501 1 002
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
