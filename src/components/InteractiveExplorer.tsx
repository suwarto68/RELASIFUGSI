/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, AlertCircle, HelpCircle, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

interface MappingArrow {
  from: number; // 0, 1, 2, 3 representing index in Domain A
  to: number;   // 0, 1, 2, 3 representing index in Codomain B
}

const PRESETS = [
  {
    id: 'materi-1',
    title: "1. Relasi Mapel",
    subtitle: "Contoh Non-Fungsi",
    description: "Memvisualisasikan Bab 1. Rian menyukai Matematika & Seni Lukis (bercabang / mempunyai lebih dari satu pasangan), sehingga relasi ini sah sebagai Relasi tetapi BUKAN FUNGSI.",
    domainHeader: "Himpunan A (Siswa)",
    codomainHeader: "Himpunan B (Mata Pelajaran)",
    domain: [
      { id: 0, label: "Rian" },
      { id: 1, label: "Sifa" },
      { id: 2, label: "Toni" },
      { id: 3, label: "Yusuf" }
    ],
    codomain: [
      { id: 0, label: "Matematika" },
      { id: 1, label: "IPA" },
      { id: 2, label: "Seni Lukis" },
      { id: 3, label: "IPS" }
    ],
    initialArrows: [
      { from: 0, to: 0 },
      { from: 0, to: 2 },
      { from: 1, to: 1 },
      { from: 2, to: 0 },
      { from: 3, to: 3 }
    ]
  },
  {
    id: 'materi-2',
    title: "2. Fungsi Gol darah",
    subtitle: "Pemetaan Valid",
    description: "Memvisualisasikan Bab 2. Setiap orang memiliki tepat satu golongan darah. Seluruh nama di kiri terpetakan tepat satu kali ke kanan (SAH sebagai Fungsi/Pemetaan).",
    domainHeader: "Himpunan A (Siswa)",
    codomainHeader: "Himpunan B (Gol. Darah)",
    domain: [
      { id: 0, label: "Andi" },
      { id: 1, label: "Budi" },
      { id: 2, label: "Cici" },
      { id: 3, label: "Dedi" }
    ],
    codomain: [
      { id: 0, label: "Golongan A" },
      { id: 1, label: "Golongan B" },
      { id: 2, label: "Golongan AB" },
      { id: 3, label: "Golongan O" }
    ],
    initialArrows: [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
      { from: 2, to: 3 },
      { from: 3, to: 2 }
    ]
  },
  {
    id: 'materi-3',
    title: "3. Tiga Daerah",
    subtitle: "Domain, Kodomain, Range",
    description: "Memvisualisasikan Bab 3. Seluruh daerah asal terpetakan. Beberapa target kodomain (Z & W) menganggur. Range (daerah hasil) murni hanya himpunan {Target-X, Target-Y}.",
    domainHeader: "Domain (Daerah Asal)",
    codomainHeader: "Kodomain (Kawan)",
    domain: [
      { id: 0, label: "Input-1" },
      { id: 1, label: "Input-2" },
      { id: 2, label: "Input-3" },
      { id: 3, label: "Input-4" }
    ],
    codomain: [
      { id: 0, label: "Target-X" },
      { id: 1, label: "Target-Y" },
      { id: 2, label: "Target-Z" },
      { id: 3, label: "Target-W" }
    ],
    initialArrows: [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
      { from: 2, to: 0 },
      { from: 3, to: 1 }
    ]
  },
  {
    id: 'materi-4',
    title: "4. Fungsi Linier",
    subtitle: "Persamaan y = 2x - 1",
    description: "Memvisualisasikan Bab 4. Hubungan matematis f(x) = 2x - 1. Menguji kebenaran koordinat nilai: f(1)=1, f(2)=3, f(3)=5, f(4)=7. Berfungsi sempurna secara linier.",
    domainHeader: "Domain (Variabel x)",
    codomainHeader: "Kodomain (Variabel y)",
    domain: [
      { id: 0, label: "x = 1" },
      { id: 1, label: "x = 2" },
      { id: 2, label: "x = 3" },
      { id: 3, label: "x = 4" }
    ],
    codomain: [
      { id: 0, label: "y = 1" },
      { id: 1, label: "y = 3" },
      { id: 2, label: "y = 5" },
      { id: 3, label: "y = 7" }
    ],
    initialArrows: [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
      { from: 2, to: 2 },
      { from: 3, to: 3 }
    ]
  },
  {
    id: 'default',
    title: "Eksperimen Bebas",
    subtitle: "Siswa & Hobi Favorit",
    description: "Mode kustomisasi penuh tanpa asisten. Klik tombol nama di kiri dan hubungkan ke hobi di kanan sesuka hati Anda demi menguji pembaca kognitif kami.",
    domainHeader: "Himpunan A (Siswa)",
    codomainHeader: "Himpunan B (Hobi)",
    domain: [
      { id: 0, label: "Fino" },
      { id: 1, label: "Gaby" },
      { id: 2, label: "Hadi" },
      { id: 3, label: "Ira" }
    ],
    codomain: [
      { id: 0, label: "Futsal" },
      { id: 1, label: "Musik" },
      { id: 2, label: "Seni Lukis" },
      { id: 3, label: "Robotik" }
    ],
    initialArrows: []
  }
];

export default function InteractiveExplorer() {
  // Preset state management
  const [currentPresetId, setCurrentPresetId] = useState<string>('materi-1');

  const activePreset = PRESETS.find(p => p.id === currentPresetId) || PRESETS[0];
  const domainA = activePreset.domain;
  const codomainB = activePreset.codomain;

  // Mapping arrows drawn by student (initially filled from first preset)
  const [arrows, setArrows] = useState<MappingArrow[]>(PRESETS[0].initialArrows);
  const [selectedDomainNode, setSelectedDomainNode] = useState<number | null>(null);

  // Optional external embed link that teachers can supply
  const [embedUrl, setEmbedUrl] = useState<string>("https://embed.desmos.com/calculator");
  const [showEmbedInput, setShowEmbedInput] = useState<boolean>(false);

  // Apply a new preset dynamically
  const applyPreset = (presetId: string) => {
    setCurrentPresetId(presetId);
    const p = PRESETS.find(p => p.id === presetId) || PRESETS[PRESETS.length - 1];
    setArrows([...p.initialArrows]);
    setSelectedDomainNode(null);
  };

  // Function to add/remove a mapping arrow
  const handleNodeClick = (type: 'A' | 'B', id: number) => {
    if (type === 'A') {
      setSelectedDomainNode(id);
    } else {
      if (selectedDomainNode !== null) {
        // Create or toggle arrow
        const existsIndex = arrows.findIndex(arr => arr.from === selectedDomainNode && arr.to === id);
        if (existsIndex >= 0) {
          // Remove arrow if already exists
          setArrows(arrows.filter((_, idx) => idx !== existsIndex));
        } else {
          // Add new arrow
          setArrows([...arrows, { from: selectedDomainNode, to: id }]);
        }
        setSelectedDomainNode(null); // Reset
      }
    }
  };

  const clearArrows = () => {
    setArrows([]);
    setSelectedDomainNode(null);
  };

  // Analysis of current mapping
  const analyzeMapping = () => {
    const hasPairs = arrows.length > 0;
    if (!hasPairs) {
      return {
        isRelation: false,
        isFunction: false,
        reason: "Silakan pilih anggota di Himpunan A lalu pasangkan dengan mengeklik anggota di Himpunan B."
      };
    }

    // Build map of counts
    const outDegree: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    arrows.forEach(arr => {
      outDegree[arr.from] = (outDegree[arr.from] || 0) + 1;
    });

    // Check if domain rules are followed for being a function
    const activeDomain = domainA.map(node => node.id);
    const unmapped = activeDomain.filter(id => outDegree[id] === 0);
    const multiMapped = activeDomain.filter(id => outDegree[id] > 1);

    if (unmapped.length > 0 && multiMapped.length > 0) {
      const namesUnmapped = unmapped.map(id => domainA[id].label).join(', ');
      const namesMulti = multiMapped.map(id => domainA[id].label).join(', ');
      return {
        isRelation: true,
        isFunction: false,
        reason: `Bukan Fungsi karena: [${namesUnmapped}] belum memiliki pasangan (Jomblo/Kosong), DAN [${namesMulti}] memiliki lebih dari satu pasangan (Mendua).`
      };
    }

    if (unmapped.length > 0) {
      const names = unmapped.map(id => domainA[id].label).join(', ');
      return {
        isRelation: true,
        isFunction: false,
        reason: `Bukan Fungsi karena [${names}] belum dipasangkan. Setiap anggota Himpunan A WAJIB memiliki tepat 1 pasangan.`
      };
    }

    if (multiMapped.length > 0) {
      const names = multiMapped.map(id => domainA[id].label).join(', ');
      return {
        isRelation: true,
        isFunction: false,
        reason: `Bukan Fungsi karena [${names}] dipasangkan lebih dari sekali. Dalam aturan fungsi, anggota Himpunan A dilarang mendua!`
      };
    }

    return {
      isRelation: true,
      isFunction: true,
      reason: "YA! Ini adalah Fungsi (Pemetaan) yang sah. Seluruh anggota Himpunan A memiliki tepat satu pasangan di Himpunan B."
    };
  };

  const { isRelation, isFunction, reason } = analyzeMapping();

  // Find range (indices of matched B members)
  const matchedBMembers: number[] = ([...new Set(arrows.map(arr => arr.to))] as number[]).sort((a: number, b: number) => a - b);
  const rangeSetString = matchedBMembers.length > 0 
    ? `{ ${matchedBMembers.map((idx: number) => codomainB[idx].label).join(', ')} }`
    : "{ } (Kosong)";

  return (
    <div className="space-y-6" id="interactive-explorer-main">
      <div className="bg-[#0b0c16]/95 rounded-2xl p-5 shadow-xl border border-cyan-500/20 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 relative z-10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded">
              Simulator Visualisasi Mandiri
            </span>
            <h3 className="text-base md:text-lg font-bold text-slate-100 mt-2.5">
              🛠️ Pembuat Diagram Panah & Diagnostik Fungsi
            </h3>
          </div>
          
          <button 
            onClick={clearArrows}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 border border-cyan-500/20 bg-[#16172b]/60 hover:bg-[#1f213d] px-3.5 py-2 rounded-lg cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Atur Ulang Simulator
          </button>
        </div>
        
        <p className="text-xs text-slate-400 mb-5 relative z-10 leading-relaxed max-w-3xl">
          <strong className="text-cyan-400">Instruksi:</strong> 
          <span className="bg-[#00f0ff]/10 text-[#00f0ff] border border-cyan-500/20 px-1.5 py-0.5 rounded font-mono text-[10px] mx-1">1</span> Klik satu item di himpunan kiri. 
          <span className="bg-[#ff00ff]/10 text-[#ff00ff] border border-fuchsia-500/20 px-1.5 py-0.5 rounded font-mono text-[10px] mx-1">2</span> Klik salah satu item di himpunan kanan untuk membuat garis relasi.
        </p>

        {/* Preset Selector Section */}
        <div className="mb-6 relative z-10 bg-[#070811]/95 border border-cyan-500/10 rounded-2xl p-4 shadow-inner">
          <span className="text-[9px] font-bold text-cyan-400 font-mono tracking-widest block mb-2.5 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> OTOMATISASI DAN PRESET BERDASARKAN TOPIK MATERI:
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {PRESETS.map((p) => {
              const isSelected = currentPresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-950/80 to-indigo-950/80 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)] scale-[1.02]'
                      : 'bg-[#121424]/40 border-cyan-500/10 text-slate-400 hover:bg-[#191c32]/60 hover:border-cyan-500/25'
                  }`}
                >
                  <span className="text-[11px] font-extrabold line-clamp-1 block">
                    {p.title}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-1 line-clamp-1 font-mono leading-none">
                    {p.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Preset Active Description Banner */}
          <div className="mt-3 bg-cyan-950/10 border-l-2 border-cyan-400 p-2.5 rounded-r-lg text-[11.5px] text-slate-300 leading-relaxed font-sans">
            <span className="font-extrabold text-cyan-300">Hubungan Teori: </span>
            {activePreset.description}
          </div>
        </div>

        {/* Visual Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          
          {/* List Domain A */}
          <div className="space-y-3 flex flex-col items-center">
            <h4 className="text-[11px] font-bold text-[#00e5ff] uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full font-mono text-center">
              {activePreset.domainHeader}
            </h4>
            
            <div className="space-y-2.5 w-full max-w-[180px]">
              {domainA.map((node) => {
                const isSelected = selectedDomainNode === node.id;
                // Check outgoing count
                const connectionCount = arrows.filter(arr => arr.from === node.id).length;

                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick('A', node.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-650 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : connectionCount > 0
                        ? 'bg-[#101328] border-cyan-500/25 text-slate-200 hover:border-cyan-400/50'
                        : 'bg-black/40 border-cyan-500/10 text-slate-400 hover:border-cyan-500/30'
                    }`}
                  >
                    <span className="text-xs font-bold">{node.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isSelected ? 'bg-cyan-900 text-cyan-200' : connectionCount > 0 ? 'bg-cyan-950 text-cyan-400' : 'bg-slate-900 text-slate-500'
                    }`}>
                      Cabang: {connectionCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center visualizer logs */}
          <div className="bg-[#04050b]/90 rounded-2xl p-4 border border-cyan-500/10 flex flex-col items-center justify-center min-h-[220px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-widest mb-3">Tautan Berlangsung</p>
            
            {arrows.length === 0 ? (
              <div className="text-center py-6">
                <HelpCircle className="w-8 h-8 text-cyan-500/40 mb-2 animate-bounce flex justify-center mx-auto" />
                <p className="text-[11px] text-slate-400">Belum ada hubungan.</p>
                <p className="text-[10px] text-slate-500 italic">Pilih nama siswa di kiri</p>
              </div>
            ) : (
              <div className="w-full space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {arrows.map((arr, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-black/60 px-2.5 py-1.5 rounded-lg border border-cyan-500/10 text-[11px] font-medium"
                  >
                    <span className="text-cyan-400 font-bold">{domainA[arr.from].label}</span>
                    <ArrowRight className="w-3 text-slate-500 mx-1" />
                    <span className="text-fuchsia-400 font-bold">{codomainB[arr.to].label}</span>
                    <button 
                      onClick={() => setArrows(arrows.filter((_, idx) => idx !== index))}
                      className="text-rose-400 hover:text-rose-350 text-[10px] hover:bg-rose-950/50 px-1 rounded font-bold cursor-pointer ml-1"
                    >
                      Batal
                    </button>
                  </div>
                ))}
              </div>
            )}

            {arrows.length > 0 && (
              <div className="text-[10px] text-center text-cyan-300 font-mono mt-4 leading-tight bg-[#0c0d1b] border border-cyan-500/10 p-2 rounded-lg">
                Himpunan Pasangan:<br/>
                {"{"} {arrows.map(arr => `(${domainA[arr.from].label}, ${codomainB[arr.to].label})`).join(', ')} {"}"}
              </div>
            )}
          </div>

          {/* List Codomain B */}
          <div className="space-y-3 flex flex-col items-center">
            <h4 className="text-[11px] font-bold text-[#f500f5] uppercase tracking-widest bg-purple-950/40 border border-purple-500/20 px-4 py-1.5 rounded-full font-mono text-center">
              {activePreset.codomainHeader}
            </h4>
            
            <div className="space-y-2.5 w-full max-w-[180px]">
              {codomainB.map((node) => {
                // Check if anyone linked here
                const inConnections = arrows.filter(arr => arr.to === node.id);
                const isTargetOfSelected = selectedDomainNode !== null;

                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick('B', node.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left border cursor-pointer transition-all ${
                      isTargetOfSelected 
                        ? 'border-dashed border-amber-400 bg-amber-950/20 hover:bg-amber-900/40 animate-pulse text-amber-200'
                        : inConnections.length > 0
                        ? 'bg-[#150a25] border-fuchsia-500/25 text-slate-200 hover:border-fuchsia-500/50'
                        : 'bg-black/40 border-cyan-500/10 text-slate-400 hover:border-cyan-500/30'
                    }`}
                  >
                    <span className="text-xs font-bold">{node.label}</span>
                    {inConnections.length > 0 && (
                      <span className="text-[9px] bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/20 px-2 py-0.5 rounded-full font-bold">
                        {inConnections.length} Siswa
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Diagnostik Panel */}
        <div className="mt-8 pt-6 border-t border-cyan-500/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#050610] p-4 rounded-xl border border-cyan-500/10">
            <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-3">Diagnostik Struktur Matematika</h4>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Kategori Relasi:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block mt-1 ${
                  isRelation ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/20' : 'bg-slate-900 text-slate-500'
                }`}>
                  {isRelation ? "Relasi Terpenuhi" : "Belum Ada Relasi"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Apakah Merupakan FUNGSI (Pemetaan)?</span>
                <div className="flex items-center gap-2 mt-1">
                  {isFunction ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> YA - Ini Fungsi Sah
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-500/20 px-3 py-1 rounded-full">
                      <ShieldAlert className="w-4 h-4 text-rose-400" /> BUKAN FUNGSI (INVALID)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Range (Daerah Hasil):</span>
                <span className="font-mono text-xs font-bold text-[#ff00ff] bg-purple-950/30 border border-purple-500/15 px-2 py-1 rounded inline-block mt-1">
                  {rangeSetString}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#050610] p-4 rounded-xl border border-cyan-500/10 flex flex-col justify-between">
            <div>
              <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">Ulasan Deskriptif Diagnostis</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#0a0b17] p-3.5 rounded-lg border border-cyan-500/5 min-h-[90px]">
                {reason}
              </p>
            </div>
            
            <div className="text-[10px] text-slate-400 mt-2.5 italic leading-tight">
              Kiat: Agar bersatus fungsi, seluruh nama di kiri harus punya tepat satu cabang keluar. Himpunan daerah kawan di kanan bebas tersambung beberapa kali atau kosong.
            </div>
          </div>
        </div>
      </div>

      {/* Embed Section with input */}
      <div className="bg-[#0b0c16]/95 rounded-2xl p-5 shadow-xl border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/20 px-2.5 py-1 rounded">
              Eksplorasi Pendukung (Desmos)
            </span>
            <h3 className="text-base md:text-lg font-bold text-slate-100 mt-2">
              📈 Papan Grafik & Desmos Math Embed
            </h3>
          </div>
          
          <button 
            onClick={() => setShowEmbedInput(!showEmbedInput)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold hover:underline cursor-pointer flex items-center gap-1 text-left"
          >
            {showEmbedInput ? "Sembunyikan Konfigurasi" : "⚙️ Ganti Link Embed (Guru)"}
          </button>
        </div>

        {showEmbedInput && (
          <div className="p-4 bg-slate-950/80 border border-cyan-500/20 rounded-xl mb-4 space-y-3">
            <p className="text-xs text-cyan-300 font-semibold">Tautan Embed Iframe Pembelajar (Geogebra / Desmos):</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://embed.desmos.com/calculator"
                className="bg-black/40 border border-cyan-500/30 rounded-lg p-2.5 text-xs flex-1 text-slate-200 font-mono focus:border-cyan-400 focus:outline-none"
              />
              <button 
                onClick={() => setEmbedUrl("https://embed.desmos.com/calculator")} 
                className="bg-cyan-950 border border-cyan-500/30 hover:bg-cyan-900 text-cyan-400 text-xs px-4 rounded-lg cursor-pointer font-bold"
              >
                Reset Default
              </button>
            </div>
            <p className="text-[10px] text-slate-400">Masukkan link canvas matematika Anda sendiri, media embed akan merender isi tautan secara real-time.</p>
          </div>
        )}

        <div className="bg-black rounded-2xl border border-cyan-500/10 overflow-hidden relative shadow-inner">
          <iframe 
            src={embedUrl}
            title="Interactive Mathematics Embed App"
            width="100%" 
            height="360px" 
            className="border-0 w-full bg-white relative z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs font-mono">
            <span>Memasang Frame Eksternal Matematika...</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 justify-end mt-3 text-[11px] text-slate-400">
          <span>Menampilkan papan koordinat eksternal terintegrasi</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>
    </div>
  );
}
