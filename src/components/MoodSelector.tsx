/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, MessageSquare, AlertCircle } from 'lucide-react';
import { Mood } from '../types';

const MOOD_CONTENTS = {
  sedih: {
    emoji: "😢",
    label: "Sedih",
    color: "from-blue-600 via-indigo-600 to-cyan-600",
    shadow: "shadow-blue-500/30",
    bgLight: "bg-blue-950/45",
    border: "border-blue-500/30",
    text: "text-blue-200",
    motivational: "Tidak apa-apa merasa sedih hari ini! Belajar matematika tidak harus langsung sempurna. Ambil napas dalam-dalam, mari kita belajar pelan-pelan bersama Pak Suwarto. Setiap langkah kecil sangat berharga!"
  },
  biasa: {
    emoji: "😐",
    label: "Biasa Saja",
    color: "from-amber-500 via-orange-600 to-yellow-500",
    shadow: "shadow-amber-500/30",
    bgLight: "bg-amber-950/45",
    border: "border-amber-500/30",
    text: "text-amber-200",
    motivational: "Hari yang tenang adalah hari yang hebat untuk fokus! Mari kita asah otak kita hari ini dengan relasi dan fungsi. Matematika itu seperti teka-teki, mari kita pecahkan bersama!"
  },
  senang: {
    emoji: "😊",
    label: "Senang",
    color: "from-emerald-500 via-teal-600 to-cyan-500",
    shadow: "shadow-emerald-500/30",
    bgLight: "bg-emerald-950/45",
    border: "border-emerald-500/30",
    text: "text-emerald-200",
    motivational: "Luar biasa! Energi positifmu sangat menular! Mari salurkan semangat ini untuk menguasai relasi dan fungsi dengan gembira. Kamu pasti bisa menyelesaikan kuis nanti dengan mudah!"
  }
};

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);

  return (
    <div className="bg-[#0b0c16]/90 rounded-2xl p-6 shadow-xl border border-cyan-500/20 max-w-xl mx-auto my-4" id="mood-selector-container">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
        <h3 className="text-xs font-semibold tracking-wide text-cyan-400 uppercase font-mono cyber-text-glow">
          Status Konsentrasi Belajar Peserta Didik
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 my-2">
        {(Object.keys(MOOD_CONTENTS) as Array<keyof typeof MOOD_CONTENTS>).map((key) => {
          const item = MOOD_CONTENTS[key];
          const isSelected = selectedMood === key;

          return (
            <motion.button
              key={key}
              id={`mood-btn-${key}`}
              onClick={() => setSelectedMood(key)}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? `border-transparent bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow}`
                  : 'border-cyan-500/10 hover:border-cyan-500/30 bg-black/40 text-slate-300'
              }`}
            >
              <span className="text-3xl md:text-4xl mb-2" role="img" aria-label={item.label}>
                {item.emoji}
              </span>
              <span className={`text-xs md:text-sm font-medium ${isSelected ? 'text-white font-bold' : 'text-slate-400'}`}>
                {item.label}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="activeMoodDot"
                  className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-slate-700 flex items-center justify-center shadow-md animate-ping"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-xl border ${MOOD_CONTENTS[selectedMood].border} ${MOOD_CONTENTS[selectedMood].bgLight} relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.05)]`}
          >
            <div className="absolute right-3 top-3 opacity-5 text-white">
              <Heart className="w-16 h-16" />
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#121323] rounded-lg border border-cyan-500/10 shadow-inner mt-0.5">
                <Smile className={`w-5 h-5 ${selectedMood === 'sedih' ? 'text-blue-400' : selectedMood === 'biasa' ? 'text-amber-400' : 'text-emerald-450'}`} />
              </div>
              <div>
                <p className={`text-sm leading-relaxed first-letter:capitalize ${MOOD_CONTENTS[selectedMood].text} font-medium`}>
                  {MOOD_CONTENTS[selectedMood].motivational}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
