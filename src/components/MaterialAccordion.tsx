/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown, Check, ArrowRight, Grid, HelpCircle, Youtube } from 'lucide-react';

interface AccordionItem {
  id: number;
  title: string;
  badge: string;
  content: React.ReactNode;
}

export default function MaterialAccordion() {
  const [openId, setOpenId] = useState<number | null>(1);

  // Helper interactive state for Accordion 4: Nilai dan Grafik Fungsi
  const [coeffA, setCoeffA] = useState<number>(2);
  const [coeffB, setCoeffB] = useState<number>(-1);
  const [testInput, setTestInput] = useState<number>(3);

  const testOutputValue = coeffA * testInput + coeffB;

  // Let's draw SVG grid lines & coordinate lines for f(x) = ax + b
  // We want range of x from -5 to 5, range of y from -10 to 10
  // SVG box is 200x200. Center is (100, 100).
  // scaleX: x * 15 + 100
  // scaleY: 100 - y * 8
  const getSvgCoordinates = (x: number, y: number) => {
    const px = x * 16 + 100;
    const py = 100 - y * 8;
    return { px, py };
  };

  // Generate path for the line y = ax + b
  const getLinePath = () => {
    const x1 = -6;
    const y1 = coeffA * x1 + coeffB;
    const x2 = 6;
    const y2 = coeffA * x2 + coeffB;
    const pt1 = getSvgCoordinates(x1, y1);
    const pt2 = getSvgCoordinates(x2, y2);
    return `M ${pt1.px} ${pt1.py} L ${pt2.px} ${pt2.py}`;
  };

  const accordionItems: AccordionItem[] = [
    {
      id: 1,
      title: "1. Relasi dan Cara Penyajiannya",
      badge: "Dasar Relasi",
      content: (
        <div className="space-y-4 text-slate-300" id="materi-sec-1">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-cyan-400 font-bold">Relasi</strong> dari himpunan A ke himpunan B adalah suatu aturan yang menghubungkan anggota-anggota himpunan A dengan anggota-anggota himpunan B. Himpunan A disebut <em className="text-fuchsia-400 not-italic font-bold">daerah asal (domain)</em>, dan himpunan B disebut <em className="text-cyan-400 not-italic font-bold">daerah kawan (kodomain)</em>.
          </p>

          <div className="bg-[#101124]/70 p-4 rounded-xl border border-cyan-500/15">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-3">Tiga Cara Menyajikan Relasi</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#070811] p-3 rounded-lg border border-cyan-500/10 shadow-inner">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-400/20">Cara 1</span>
                <p className="text-xs font-bold text-slate-200 mt-2 mb-1">Diagram Panah</p>
                <p className="text-[11px] text-slate-400">Anggota himpunan dihubungkan dengan tanda panah dari daerah asal ke daerah kawan.</p>
              </div>
              <div className="bg-[#070811] p-3 rounded-lg border border-cyan-500/10 shadow-inner">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-450/20">Cara 2</span>
                <p className="text-xs font-bold text-slate-200 mt-2 mb-1">Diagram Kartesius</p>
                <p className="text-[11px] text-slate-400">Menyajikan relasi dalam bentuk titik koordinat pada sumbu horizontal (X) dan sumbu vertikal (Y).</p>
              </div>
              <div className="bg-[#070811] p-3 rounded-lg border border-cyan-500/10 shadow-inner">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-500/20">Cara 3</span>
                <p className="text-xs font-bold text-slate-200 mt-2 mb-1">Pasangan Berurutan</p>
                <p className="text-[11px] text-slate-400">Memasangkan anggota secara tertulis dalam kurung kurawal, contoh: <code className="bg-[#121323] px-1 rounded text-cyan-300 border border-cyan-500/10">{"{(x,y)}"}</code>.</p>
              </div>
            </div>
          </div>

          <div className="border border-cyan-500/15 rounded-xl p-4 bg-[#0a0b17] shadow-lg">
            <h4 className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider mb-2">Visualisasi Diagram Panah: Relasi "Mata Pelajaran Favorit"</h4>
            <p className="text-xs text-slate-400 mb-4">Domain Himpunan A = <span className="font-mono text-[11px] text-[#00e5ff]">{"{Rian, Sifa, Toni}"}</span> dan Kodomain Himpunan B = <span className="font-mono text-[11px] text-fuchsia-400">{"{Matematika, IPA, Seni}"}</span>.</p>
            
            {/* Visual Arrow Diagram SVG */}
            <div className="flex justify-center my-2">
              <svg width="280" height="150" className="bg-[#040409] rounded-xl border border-cyan-500/20 p-2">
                {/* Himpunan A Balloon */}
                <rect x="15" y="10" width="75" height="130" rx="37.5" fill="rgba(6,182,212,0.03)" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="52" y="28" textAnchor="middle" className="text-xs font-bold fill-cyan-400 font-mono">A (Domain)</text>
                
                {/* Himpunan B Balloon */}
                <rect x="190" y="10" width="75" height="130" rx="37.5" fill="rgba(244,63,94,0.03)" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="227" y="28" textAnchor="middle" className="text-xs font-bold fill-fuchsia-400 font-mono">B (Kodomain)</text>

                {/* Nodes A */}
                <circle cx="52" cy="55" r="4" fill="#00e5ff" className="cyber-glow-cyan" />
                <text x="44" y="59" textAnchor="end" className="text-[10px] fill-slate-300 font-sans font-medium">Rian</text>

                <circle cx="52" cy="85" r="4" fill="#00e5ff" />
                <text x="44" y="89" textAnchor="end" className="text-[10px] fill-slate-300 font-sans font-medium">Sifa</text>

                <circle cx="52" cy="115" r="4" fill="#00e5ff" />
                <text x="44" y="119" textAnchor="end" className="text-[10px] fill-slate-300 font-sans font-medium">Toni</text>

                {/* Nodes B */}
                <circle cx="227" cy="55" r="4" fill="#ff00ff" />
                <text x="235" y="59" textAnchor="start" className="text-[10px] fill-slate-300 font-sans font-medium">Matematika</text>

                <circle cx="227" cy="85" r="4" fill="#ff00ff" />
                <text x="235" y="89" textAnchor="start" className="text-[10px] fill-slate-300 font-sans font-medium">IPA</text>

                <circle cx="227" cy="115" r="4" fill="#ff00ff" />
                <text x="235" y="119" textAnchor="start" className="text-[10px] fill-slate-300 font-sans font-medium">Seni</text>

                {/* Arrow Paths */}
                {/* Rian -> Matematika */}
                <path d="M 56 55 L 221 55" stroke="#00e5ff" strokeWidth="1.5" fill="none" markerEnd="url(#cyber-arrow)" />
                {/* Rian -> Seni */}
                <path d="M 55 57 L 221 112" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3 3" fill="none" markerEnd="url(#cyber-arrow)" />
                {/* Sifa -> IPA */}
                <path d="M 56 85 L 221 85" stroke="#ff00ff" strokeWidth="1.5" fill="none" markerEnd="url(#cyber-arrow)" />
                {/* Toni -> Matematika */}
                <path d="M 55 113 L 221 58" stroke="#ff9f00" strokeWidth="1.5" fill="none" markerEnd="url(#cyber-arrow)" />

                {/* SVG Marker Definition */}
                <defs>
                  <marker id="cyber-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#00e5ff" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-xs text-slate-400 text-center italic mt-2">
              Himpunan Pasangan Berurutan: <span className="font-mono text-[#00e5ff]">{"{(Rian, Matematika), (Rian, Seni), (Sifa, IPA), (Toni, Matematika)}"}</span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "2. Konsep Fungsi dan Cara Penyajiannnya",
      badge: "Kaidah Unik",
      content: (
        <div className="space-y-4 text-slate-300" id="materi-sec-2">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-cyan-400 font-bold">Fungsi (Pemetaan)</strong> adalah relasi khusus yang memasangkan <em className="text-emerald-400 font-normal">setiap</em> anggota himpunan A dengan <em className="text-emerald-450 font-normal">tepat satu</em> anggota himpunan B. 
          </p>

          <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-250 flex gap-2.5">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]" />
            <div>
              <span className="font-bold text-amber-300">Syarat Penting Suatu Relasi Disebut Fungsi:</span>
              <ol className="list-decimal ml-4 mt-1.5 space-y-1 text-slate-300">
                <li>Semua anggota daerah asal (Himpunan A) harus memiliki pasangan (tidak boleh kosong / jomblo).</li>
                <li>Setiap anggota daerah asal (Himpunan A) hanya boleh dipasangkan dengan tepat satu anggota di B (tidak boleh selingkuh / bercabang banyak).</li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Valid Function representation */}
            <div className="border border-cyan-500/10 p-3 rounded-xl bg-[#090b17] shadow-lg">
              <p className="text-xs font-bold text-emerald-400 text-center mb-2 font-mono flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> MERUPAKAN FUNGSI (VALID)
              </p>
              <div className="flex justify-center">
                <svg width="200" height="120" className="bg-[#030408] rounded-lg p-1 border border-cyan-500/5">
                  <rect x="15" y="10" width="50" height="100" rx="25" fill="rgba(16,185,129,0.02)" stroke="#10b981" strokeWidth="1.2" />
                  <rect x="135" y="10" width="50" height="100" rx="25" fill="rgba(6,182,212,0.02)" stroke="#06b6d4" strokeWidth="1.2" />
                  
                  {/* Nodes A */}
                  <circle cx="40" cy="35" r="3" fill="#10b981" /> <text x="32" y="38" className="text-[10px] fill-slate-300" textAnchor="end">1</text>
                  <circle cx="40" cy="65" r="3" fill="#10b981" /> <text x="32" y="68" className="text-[10px] fill-slate-300" textAnchor="end">2</text>
                  <circle cx="40" cy="95" r="3" fill="#10b981" /> <text x="32" y="98" className="text-[10px] fill-slate-300" textAnchor="end">3</text>

                  {/* Nodes B */}
                  <circle cx="160" cy="35" r="3" fill="#06b6d4" /> <text x="168" y="38" className="text-[10px] fill-slate-300" textAnchor="start">A</text>
                  <circle cx="160" cy="65" r="3" fill="#06b6d4" /> <text x="168" y="68" className="text-[10px] fill-slate-300" textAnchor="start">B</text>
                  <circle cx="160" cy="95" r="3" fill="#06b6d4" /> <text x="168" y="98" className="text-[10px] fill-slate-300" textAnchor="start">C</text>

                  {/* Map arrows */}
                  <path d="M 43 35 L 157 35" stroke="#10b981" strokeWidth="1.2" markerEnd="url(#cyber-arrow-valid)" />
                  <path d="M 43 65 L 157 35" stroke="#10b981" strokeWidth="1.2" markerEnd="url(#cyber-arrow-valid)" />
                  <path d="M 43 95 L 157 95" stroke="#10b981" strokeWidth="1.2" markerEnd="url(#cyber-arrow-valid)" />
                  
                  <defs>
                    <marker id="cyber-arrow-valid" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 2 L 8 5 L 0 8 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-1.5 font-sans leading-tight">Seluruh domain (A) terpetakan tepat satu cabang.</p>
            </div>

            {/* Invalid Function representation */}
            <div className="border border-cyan-500/10 p-3 rounded-xl bg-[#090b17] shadow-lg">
              <p className="text-xs font-bold text-rose-400 text-center mb-2 font-mono">
                BUKAN FUNGSI (INVALID) ❌
              </p>
              <div className="flex justify-center">
                <svg width="200" height="120" className="bg-[#030408] rounded-lg p-1 border border-cyan-500/5">
                  <rect x="15" y="10" width="50" height="100" rx="25" fill="rgba(244,63,94,0.02)" stroke="#f43f5e" strokeWidth="1.2" />
                  <rect x="135" y="10" width="50" height="100" rx="25" fill="rgba(6,182,212,0.02)" stroke="#06b6d4" strokeWidth="1.2" />
                  
                  {/* Nodes A */}
                  <circle cx="40" cy="35" r="3" fill="#f43f5e" /> <text x="32" y="38" className="text-[10px] fill-slate-300" textAnchor="end">1</text>
                  <circle cx="40" cy="65" r="3" fill="#f43f5e" /> <text x="32" y="68" className="text-[10px] fill-slate-300" textAnchor="end">2</text>
                  <circle cx="40" cy="95" r="3" fill="#f43f5e" /> <text x="32" y="98" className="text-[10px] fill-slate-300" textAnchor="end">3</text>

                  {/* Nodes B */}
                  <circle cx="160" cy="35" r="3" fill="#06b6d4" /> <text x="168" y="38" className="text-[10px] fill-slate-300" textAnchor="start">A</text>
                  <circle cx="160" cy="65" r="3" fill="#06b6d4" /> <text x="168" y="68" className="text-[10px] fill-slate-300" textAnchor="start">B</text>
                  <circle cx="160" cy="95" r="3" fill="#06b6d4" /> <text x="168" y="98" className="text-[10px] fill-slate-300" textAnchor="start">C</text>

                  {/* Map arrows */}
                  {/* 1 mempunyai 2 cabang (A dan B) */}
                  <path d="M 43 35 L 157 35" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#cyber-arrow-invalid)" />
                  <path d="M 43 35 L 157 65" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#cyber-arrow-invalid)" />
                  {/* 3 tidak mempunyai cabang */}
                  <path d="M 43 65 L 157 95" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#cyber-arrow-invalid)" />
                  
                  <defs>
                    <marker id="cyber-arrow-invalid" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 2 L 8 5 L 0 8 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-1.5 font-sans leading-tight">Input '1' selingkuh (dua cabang) dan '3' tidak memilih sama sekali.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "3. Domain, Kodomain, Range",
      badge: "Tiga Daerah",
      content: (
        <div className="space-y-4 text-slate-300" id="materi-sec-3">
          <p className="text-slate-300 text-sm leading-relaxed">
            Pada sebuah fungsi, kita mengenal tiga daerah utama yang mendefinisikan batas-batas fungsional relasi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3 bg-cyan-950/20 rounded-xl border border-cyan-500/20 shadow-md">
              <span className="text-xs font-bold text-cyan-300 font-mono">1. Domain (Daerah Asal)</span>
              <p className="text-xs text-slate-400 mt-1">Himpunan semua nilai input pertama yang dipetakan. Diletakkan di sebelah kiri daerah operasi.</p>
            </div>
            <div className="p-3 bg-fuchsia-950/20 rounded-xl border border-fuchsia-500/20 shadow-md">
              <span className="text-xs font-bold text-fuchsia-300 font-mono">2. Kodomain (Daerah Kawan)</span>
              <p className="text-xs text-slate-400 mt-1">Seluruh himpunan cadangan sebagai wadah tujuan pendaratan relasi di kanan.</p>
            </div>
            <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/20 shadow-md">
              <span className="text-xs font-bold text-emerald-300 font-mono">3. Range (Daerah Hasil)</span>
              <p className="text-xs text-slate-400 mt-1">Himpunan bagian dari Kodomain yang secara nyata memiliki tautan diagram panah.</p>
            </div>
          </div>

          <div className="border border-cyan-500/15 rounded-xl p-4 bg-[#0a0b17] shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <div className="shrink-0">
              <svg width="200" height="130" className="bg-[#030408] rounded-lg p-1 border border-cyan-500/5">
                <rect x="15" y="10" width="50" height="110" rx="10" fill="rgba(6,182,212,0.03)" stroke="#06b6d4" strokeWidth="1.2" />
                <rect x="135" y="10" width="50" height="110" rx="10" fill="rgba(168,85,247,0.03)" stroke="#a855f7" strokeWidth="1.2" />
                
                {/* Nodes A */}
                <circle cx="40" cy="35" r="3" fill="#00e5ff" /> <text x="32" y="38" className="text-[10px] font-bold fill-slate-300" textAnchor="end">1</text>
                <circle cx="40" cy="65" r="3" fill="#00e5ff" /> <text x="32" y="68" className="text-[10px] font-bold fill-slate-300" textAnchor="end">2</text>
                <circle cx="40" cy="95" r="3" fill="#00e5ff" /> <text x="32" y="98" className="text-[10px] font-bold fill-slate-300" textAnchor="end">3</text>

                {/* Nodes B */}
                <circle cx="160" cy="35" r="3" fill="#a855f7" /> <text x="168" y="38" className="text-[10px] fill-slate-300" textAnchor="start">X</text>
                <circle cx="160" cy="65" r="3" fill="#a855f7" /> <text x="168" y="68" className="text-[10px] fill-slate-300" textAnchor="start">Y</text>
                <circle cx="160" cy="95" r="3" fill="#a855f7" /> <text x="168" y="98" className="text-[10px] fill-slate-300" textAnchor="start">Z</text>

                {/* Range highlighted outline inside Kodomain B */}
                <ellipse cx="160" cy="50" rx="18" ry="30" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Map arrows */}
                <path d="M 43 35 L 157 35" stroke="#a855f7" strokeWidth="1.2" markerEnd="url(#cyber-arrow-flow)" />
                <path d="M 43 65 L 157 65" stroke="#a855f7" strokeWidth="1.2" markerEnd="url(#cyber-arrow-flow)" />
                <path d="M 43 95 L 157 65" stroke="#a855f7" strokeWidth="1.2" markerEnd="url(#cyber-arrow-flow)" />

                <defs>
                  <marker id="cyber-arrow-flow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#a855f7" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            <div className="space-y-1.5 text-sm text-slate-300 font-sans">
              <p>Mengacu pada sensor grafis pemetaan di samping, kita peroleh:</p>
              <p>🟢 <strong className="text-cyan-400">Domain (Daerah Asal)</strong> = <span className="font-mono bg-cyan-950/40 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/10 text-xs">{"{1, 2, 3}"}</span></p>
              <p>🔵 <strong className="text-indigo-400">Kodomain (Daerah Kawan)</strong> = <span className="font-mono bg-purple-950/40 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/10 text-xs">{"{X, Y, Z}"}</span></p>
              <p>🌟 <strong className="text-emerald-400">Range (Daerah Hasil)</strong> = <span className="font-mono bg-emerald-950/40 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/10 text-xs">{"{X, Y}"}</span> <span className="text-xs text-slate-400 block sm:inline sm:ml-1 md:block lg:inline">(Anggota <strong className="text-fuchsia-400 font-mono">Z</strong> sisa kososng / terisolasi)</span></p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "4. Nilai dan Grafik Fungsi",
      badge: "Eksplorasi Live!",
      content: (
        <div className="space-y-4 text-slate-300" id="materi-sec-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Relasi fungsi linear kerap dirumuskan secara matematis <strong className="font-mono text-cyan-300 cyber-text-glow">f(x) = ax + b</strong>. Silakan sesuaikan koefisien di bawah untuk memodulasi model radar grafiknya seketika secara <em className="not-italic text-fuchsia-400 font-semibold uppercase font-mono">real-time</em>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#101124]/50 p-4 rounded-xl border border-cyan-500/10">
            {/* Control Panel */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">Penyetelan Parameter f(x) = ax + b</h5>
              
              <div className="bg-black/25 p-2 rounded-lg border border-cyan-500/5">
                <label className="text-xs font-bold text-slate-300 block mb-1 font-mono">Koefisien a (Kemiringan): <span className="text-cyan-400">{coeffA}</span></label>
                <input 
                  type="range" 
                  min="-3" 
                  max="4" 
                  step="1"
                  value={coeffA} 
                  onChange={(e) => setCoeffA(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="bg-black/25 p-2 rounded-lg border border-cyan-500/5">
                <label className="text-xs font-bold text-slate-300 block mb-1 font-mono">Konstanta b (Titik Potong Y): <span className="text-cyan-400">{coeffB}</span></label>
                <input 
                  type="range" 
                  min="-5" 
                  max="5" 
                  step="1"
                  value={coeffB} 
                  onChange={(e) => setCoeffB(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="bg-[#05060f] p-3 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Rumus Fungsi Linear Aktif:</p>
                <p className="text-md font-extrabold font-mono text-cyan-300 my-0.5 cyber-text-glow">
                  f(x) = {coeffA === 0 ? "" : coeffA === 1 ? "x" : coeffA === -1 ? "-x" : `${coeffA}x`} {coeffB === 0 ? "" : coeffB > 0 ? `+ ${coeffB}` : `- ${Math.abs(coeffB)}`}
                </p>
              </div>

              <div className="bg-[#05060f] p-3 rounded-lg border border-fuchsia-500/20">
                <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest block mb-1 font-mono">Uji Hitung Nilai Fungsi</span>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-xs text-slate-300 font-sans">Jika x =</span>
                  <input
                    type="number"
                    min="-10"
                    max="10"
                    value={testInput}
                    onChange={(e) => setTestInput(parseInt(e.target.value) || 0)}
                    className="w-12 text-center text-xs font-bold bg-[#141525] text-slate-200 border border-cyan-500/30 rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-400"
                  />
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-300">
                    f({testInput}) = {coeffA}({testInput}) {coeffB >= 0 ? `+ ${coeffB}` : `- ${Math.abs(coeffB)}`} = <span className="text-[#00ffcc] font-mono font-bold text-sm cyber-text-glow">{testOutputValue}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Graph Plotter */}
            <div className="flex flex-col items-center justify-center p-3 bg-[#0a0b17] rounded-xl border border-cyan-500/15 shadow-inner">
              <span className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-1 font-mono">
                <Grid className="w-4 h-4 text-cyan-400 animate-pulse" /> Sumbu Kartesius Digital
              </span>
              
              <div className="relative">
                <svg width="200" height="200" className="bg-black border border-cyan-500/25 rounded relative z-10 overflow-hidden">
                  {/* Grid Lines */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const coordHorizontal = i * 20;
                    return (
                      <g key={i}>
                        <line x1="0" y1={coordHorizontal} x2="200" y2={coordHorizontal} stroke="#16182c" strokeWidth="0.5" />
                        <line x1={coordHorizontal} y1="0" x2={coordHorizontal} y2="200" stroke="#16182c" strokeWidth="0.5" />
                      </g>
                    );
                  })}
                  
                  {/* Coordinate Axes */}
                  <line x1="0" y1="100" x2="200" y2="100" stroke="#344e7c" strokeWidth="1.5" /> {/* X axis */}
                  <line x1="100" y1="0" x2="100" y2="200" stroke="#344e7c" strokeWidth="1.5" /> {/* Y axis */}
                  
                  {/* Axis Arrows */}
                  <polygon points="100,0 96,10 104,10" fill="#344e7c" /> {/* Y Arrow */}
                  <polygon points="200,100 190,96 190,104" fill="#344e7c" /> {/* X Arrow */}

                  <text x="187" y="112" className="text-[8px] fill-cyan-400 font-bold font-mono">X</text>
                  <text x="106" y="9" className="text-[8px] fill-fuchsia-400 font-bold font-mono">Y</text>

                  {/* Calculated function line */}
                  <path d={getLinePath()} stroke="#00e5ff" strokeWidth="2.5" fill="none" strokeLinecap="round" className="filter drop-shadow-[0_0_4px_#00e5ff]" />

                  {/* Calculated Point of Interest: f(testInput) = testOutputValue */}
                  {testInput >= -5 && testInput <= 5 && testOutputValue >= -10 && testOutputValue <= 10 && (
                    <>
                      <circle 
                        cx={getSvgCoordinates(testInput, testOutputValue).px} 
                        cy={getSvgCoordinates(testInput, testOutputValue).py} 
                        r="5" 
                        fill="#ff00ff" 
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <text 
                        x={getSvgCoordinates(testInput, testOutputValue).px + 8} 
                        y={getSvgCoordinates(testInput, testOutputValue).py - 4} 
                        className="text-[9px] fill-[#00ffcc] font-black font-mono"
                      >
                        ({testInput}, {testOutputValue})
                      </text>
                    </>
                  )}
                </svg>
              </div>
              <p className="text-[9px] text-slate-400 text-center mt-2 leading-tight">
                Skala digital: Sumbu X (-5 s/d 5), Sumbu Y (-10 s/d 10)
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6" id="material-accordion-container">
      {/* Video Pembelajaran Pendamping */}
      <div className="border border-cyan-500/20 rounded-3xl overflow-hidden bg-[#0d0f1d]/95 p-5 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-red-950/40 text-red-500 border border-red-500/20 shrink-0">
              <Youtube className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-100 font-sans tracking-tight">
                🎥 Video Pembelajaran: Relasi & Fungsi
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Materi Matematika Kelas VII - Kurikulum Merdeka
              </p>
            </div>
          </div>
          <span className="self-start md:self-auto text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#ff00ff] bg-fuchsia-950/40 border border-fuchsia-500/20 px-2.5 py-1 rounded-full cyber-text-glow">
            Rekomendasi Guru
          </span>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-cyan-500/10 bg-black shadow-inner">
          <iframe 
            src="https://www.youtube.com/embed/5zD5ppiCjHE" 
            title="Video Hubungan Relasi dan Fungsi" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <p className="text-[11px] text-slate-400 italic mt-3 text-center leading-relaxed font-sans">
          "Simak pemaparan materi dari video di atas secara seksama untuk memudahkan pengerjaan simulasi kuis ANBK."
        </p>
      </div>

      <div className="space-y-3">
        {accordionItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border border-cyan-500/10 rounded-2xl overflow-hidden bg-[#0d0f1d]/90 shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left font-sans font-medium cursor-pointer hover:bg-[#15172b]/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/20">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-slate-100 leading-tight">
                    {item.title}
                  </h4>
                  <span className="inline-block mt-1 text-[10px] uppercase font-mono tracking-wider font-semibold text-[#ff00ff] cyber-text-glow">
                    {item.badge}
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400"
              >
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-cyan-500/10"
                >
                  <div className="p-4 md:p-6 bg-[#080913]/90 text-slate-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      </div>
    </div>
  );
}
