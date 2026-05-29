/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Section = 'beranda' | 'pendahuluan' | 'materi' | 'eksplorasi' | 'kuis' | 'tugas' | 'penutup';

export type Mood = 'sedih' | 'biasa' | 'senang' | null;

export type QuestionType = 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'benar_salah' | 'menjodohkan';

export type DifficultyLevel = 'mudah' | 'sedang' | 'sulit';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stimulus: string; // The contextual text / scenario block
  questionText: string; // The explicit question
  // For 'pilihan_ganda' or 'pilihan_ganda_kompleks'
  options?: string[];
  // For 'pilihan_ganda' or 'pilihan_ganda_kompleks': single index or array of indices
  correctAnswer?: number | number[]; 
  // For 'benar_salah' (exactly 3 statements)
  statements?: string[];
  correctStatements?: boolean[]; // true = Benar, false = Salah
  // For 'menjodohkan' (4 premises to match with right options)
  premises?: string[];
  matches?: string[]; // Possible destination options (e.g., [ "A", "B", "C", "D", "E" ])
  correctMatches?: Record<number, number>; // Maps premise index to match option index
}

export interface QuizResponse {
  name: string;
  className: string;
  score: number;
  totalCorrect: number;
  totalWrong: number;
  totalAnswered: number;
  totalFlagged: number; // Ragu-ragu
  totalUnanswered: number;
  dateTime: string;
}
