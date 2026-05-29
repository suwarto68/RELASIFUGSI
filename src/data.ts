/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseQuestion } from './types';

export const INTRO_MATERIAL = {
  tujuan: [
    "Siswa mampu memahami konsep relasi dan menyajikan relasi dengan diagram panah, diagram Kartesius, dan himpunan pasangan berurutan.",
    "Siswa mampu memahami konsep fungsi (pemetaan) dan membedakan antara relasi yang merupakan fungsi dan bukan fungsi.",
    "Siswa mampu menentukan daerah asal (Domain), daerah kawan (Kodomain), dan daerah hasil (Range) dari suatu fungsi.",
    "Siswa mampu menghitung nilai fungsi dan menyajikan grafik fungsi linear pada bidang koordinat Kartesius."
  ],
  apersepsi: "Pernahkah kalian memesan makanan di kantin sekolah? Setiap siswa tentu memiliki menu favorit masing-masing. Ada siswa yang menyukai bakso, ada yang menyukai soto, dan ada pula siswa yang menyukai mie goreng. Hubungan antara nama siswa dengan makanan favoritnya dinamakan 'Relasi'. Di sisi lain, setiap orang pastinya hanya memiliki tepat satu tanggal lahir atau satu golongan darah. Hubungan khusus yang memasangkan setiap orang dengan tepat satu golongan darah ini disebut 'Fungsi' atau 'Pemetaan'. Di bab ini, kita akan menjelajahi bagaimana matematika menghubungkan dua himpunan melalui konsep Relasi dan Fungsi, lengkap dengan aplikasinya dalam kehidupan sehari-hari."
};

export const QUIZ_QUESTIONS: BaseQuestion[] = [
  // --- PILIHAN GANDA (10 Soal) ---
  {
    id: 1,
    type: 'pilihan_ganda',
    difficulty: 'mudah',
    stimulus: "Silsilah Keluarga Pak Yusuf:\nPak Yusuf memiliki tiga orang anak yaitu Andi, Budi, dan Cici. Andi menyukai olahraga sepakbola, Budi menyukai basket, sedangkan Cici menyukai renang dan basket.",
    questionText: "Manakah himpunan pasangan berurutan yang menyatakan relasi 'menyukai olahraga' dari himpunan anak Pak Yusuf ke himpunan cabang olahraga?",
    options: [
      "{(Andi, sepakbola), (Budi, basket), (Cici, renang), (Cici, basket)}",
      "{(Andi, sepakbola), (Budi, basket), (Cici, renang)}",
      "{(sepakbola, Andi), (basket, Budi), (renang, Cici), (basket, Cici)}",
      "{(Andi, sepakbola), (Budi, basket), (Cici, basket)}"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    type: 'pilihan_ganda',
    difficulty: 'mudah',
    stimulus: "Diberikan dua himpunan bilangan: Himpunan P = {2, 3, 4} dan Himpunan Q = {4, 6, 8, 10}. Kita ingin menghubungkan anggota-anggota P ke Q dengan suatu aturan tertentu.",
    questionText: "Jika relasi dari P ke Q adalah 'setengah dari', tentukan seluruh pasangan berurutan yang terbentuk!",
    options: [
      "{(2, 4), (3, 6), (4, 8)}",
      "{(2, 6), (3, 8), (4, 10)}",
      "{(4, 2), (6, 3), (8, 4)}",
      "{(2, 4), (3, 6), (4, 8), (4, 10)}"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    type: 'pilihan_ganda',
    difficulty: 'mudah',
    stimulus: "Pemetaan f dinyatakan dengan diagram panah dari himpunan A = {a, b} ke himpunan B = {1, 2, 3}, di mana 'a' dipetakan ke '1', dan 'b' dipetakan ke '3'.",
    questionText: "Berdasarkan pemetaan tersebut, manakah yang merupakan Range (daerah hasil) dari f?",
    options: [
      "{1, 3}",
      "{1, 2, 3}",
      "{a, b}",
      "{2}"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    type: 'pilihan_ganda',
    difficulty: 'sedang',
    stimulus: "Tarif Taksi 'Cepat' ditentukan dengan aturan: tarif awal (buka pintu) sebesar Rp10.000,00 dan tarif per kilometer perjalanan sebesar Rp4.000,00. Jika jarak perjalanan dalam km disimbolkan x dan total biaya disimbolkan f(x).",
    questionText: "Rumus fungsi f(x) yang menyatakan tarif taksi tersebut dalam rupiah dan biaya jika seorang penumpang menempuh jarak 12 km adalah...",
    options: [
      "f(x) = 4.000x + 10.000 ; Rp58.000,00",
      "f(x) = 10.000x + 4.000 ; Rp124.000,00",
      "f(x) = 4.000x - 10.000 ; Rp38.000,00",
      "f(x) = 14.000x ; Rp168.000,00"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    type: 'pilihan_ganda',
    difficulty: 'sedang',
    stimulus: "Biaya parkir mobil di sebuah mal ditentukan sebagai berikut: Jam pertama dikenakan tarif Rp5.000,00, dan setiap jam berikutnya atau bagiannya dikenakan tarif Rp3.000,00. Aturan ini dapat dimodelkan dengan fungsi Matematika f(x) untuk x jam parkir (dengan x merupakan bilangan bulat positif melambangkan total jam).",
    questionText: "Jika seorang pengunjung memarkir mobilnya selama 6 jam, berapakah tarif parkir total yang harus ia bayar?",
    options: [
      "Rp20.000,00",
      "Rp23.000,00",
      "Rp18.000,00",
      "Rp15.000,00"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    type: 'pilihan_ganda',
    difficulty: 'sedang',
    stimulus: "Pak Danu berlangganan internet dengan biaya tetap bulanan sebesar Rp150.000,00 ditambah biaya pemakaian data sebesar Rp500,00 per Gigabyte (GB) kuota ekstra yang digunakan melebihi kuota gratis bulanan (30 GB).",
    questionText: "Jika bulan ini Pak Danu menggunakan kuota internet sebesar 45 GB, berapa total biaya berlangganan yang harus Pak Danu bayar?",
    options: [
      "Rp157.500,00",
      "Rp172.500,00",
      "Rp225.000,00",
      "Rp150.500,00"
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    type: 'pilihan_ganda',
    difficulty: 'sedang',
    stimulus: "Susunan pola segitiga dibuat dari batang korek api. Pola ke-1 membutuhkan 3 batang, pola ke-2 membutuhkan 5 batang, pola ke-3 membutuhkan 7 batang, dan seterusnya mengikuti fungsi linear f(n) = 2n + 1, dengan n menyatakan nomor pola.",
    questionText: "Berapa banyak batang korek api yang dibutuhkan untuk membuat susunan pola ke-20?",
    options: [
      "41 batang",
      "39 batang",
      "43 batang",
      "40 batang"
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'pilihan_ganda',
    difficulty: 'sulit',
    stimulus: "Sebuah perusahaan logistik menetapkan biaya pengiriman paket berdasarkan rumus fungsi biaya f(x) = 15.000x + 8.000 (tiap kali pengiriman), di mana x menyatakan berat paket (dalam Kilogram) setelah pembulatan ke atas. Namun, jika jarak pengiriman di luar kota, diberikan biaya tambahan tetap sebesar Rp25.000,00.",
    questionText: "Roni mengirim paket seberat 4,3 kg ke luar kota. Berapakah total biaya pengiriman logistik yang harus dibayar Roni?",
    options: [
      "Rp108.000,00",
      "Rp93.000,00",
      "Rp83.000,00",
      "Rp98.000,00"
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    type: 'pilihan_ganda',
    difficulty: 'sulit',
    stimulus: "Suatu fungsi linear f(x) = ax + b digambarkan pada bidang koordinat Kartesius. Diketahui grafik fungsi tersebut melalui titik koordinat (2, 7) dan titik koordinat (-1, -2).",
    questionText: "Berdasarkan informasi di atas, berapakah nilai dari parameter a, b, dan nilai output fungsi f(5)?",
    options: [
      "a = 3, b = 1 ; f(5) = 16",
      "a = 2, b = 3 ; f(5) = 13",
      "a = 3, b = -1 ; f(5) = 14",
      "a = 1, b = 5 ; f(5) = 10"
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    type: 'pilihan_ganda',
    difficulty: 'sulit',
    stimulus: "Konversi satuan suhu dari derajat Celsius (C) ke derajat Fahrenheit (F) didefinisikan sebagai fungsi f(C) = 1,8C + 32. Suhu udara di puncak gunung pada malam hari tercatat sebesar -5° C.",
    questionText: "Berapakah suhu udara di puncak gunung tersebut jika dikonversikan ke dalam satuan derajat Fahrenheit?",
    options: [
      "23°F",
      "41°F",
      "14°F",
      "9°F"
    ],
    correctAnswer: 0
  },

  // --- PILIHAN GANDA KOMPLEKS (5 Soal, bisa pilih beberapa opsi) ---
  {
    id: 11,
    type: 'pilihan_ganda_kompleks',
    difficulty: 'mudah',
    stimulus: "Data Hobi 4 Orang Siswa:\n- Eka menyukai Sepak Bola dan Voli\n- Dwi menyukai Voli dan Basket\n- Tri menyukai Sepak Bola saja\n- Catur menyukai Basket saja\nHimpunan nama siswa x = {Eka, Dwi, Tri, Catur}, Himpunan Hobi y = {Sepak Bola, Voli, Basket}.",
    questionText: "Manakah pernyataan di bawah ini yang BENAR mengenai karakteristik relasi 'hobi' tersebut? (Pilih semua yang benar!)",
    options: [
      "Relasi di atas BUKAN merupakan suatu fungsi karena ada anggota himpunan x yang memiliki lebih dari satu pasangan.",
      "Relasi di atas merupakan fungsi karena seluruh siswa memiliki terdaftar kesukaannya.",
      "Voli dipasangkan dengan Eka dan Dwi pada himpunan pasangan berurutan.",
      "Himpunan pasangan berurutannya beranggotakan 6 pasangan."
    ],
    correctAnswer: [0, 2, 3]
  },
  {
    id: 12,
    type: 'pilihan_ganda_kompleks',
    difficulty: 'sedang',
    stimulus: "Diberikan sebuah fungsi linear f(x) = -2x + 7 dengan Daerah Asal (Domain) Df = {x | -1 ≤ x ≤ 3, x ∈ Bilangan Bulat}.",
    questionText: "Manakah pernyataan-pernyataan di bawah ini yang BENAR berkaitan dengan fungsi tersebut? (Pilih semua yang sesuai!)",
    options: [
      "Anggota Domain f adalah {-1, 0, 1, 2, 3}.",
      "Daerah Hasil (Range) dari f adalah {1, 3, 5, 7, 9}.",
      "Nilai dari f(3) adalah 1.",
      "Nilai dari f(-2) adalah 3."
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: 13,
    type: 'pilihan_ganda_kompleks',
    difficulty: 'sedang',
    stimulus: "Korespondensi satu-satu (Bijektif) adalah relasi khusus yang memasangkan setiap anggota himpunan A dengan tepat satu anggota himpunan B, dan sebaliknya setiap anggota B dipasangkan dengan tepat satu anggota A.",
    questionText: "Perhatikan beberapa himpunan pasangan berurutan berikut:\nI. {(1, a), (2, b), (3, c)}\nII. {(1, a), (2, a), (3, b)}\nIII. {(a, x), (b, y), (c, z)}\nIV. {(p, x), (q, y), (p, z)}\nManakah di antaranya yang merupakan korespondensi satu-satu?",
    options: [
      "Himpunan I merupakan korespondensi satu-satu.",
      "Himpunan II merupakan korespondensi satu-satu.",
      "Himpunan III merupakan korespondensi satu-satu.",
      "Himpunan IV merupakan korespondensi satu-satu."
    ],
    correctAnswer: [0, 2]
  },
  {
    id: 14,
    type: 'pilihan_ganda_kompleks',
    difficulty: 'sedang',
    stimulus: "Diberikan himpunan A = {2, 3, 5} dan B = {10, 15, 20}. Relasi yang didefinisikan dari himpunan A ke himpunan B adalah 'faktor dari'.",
    questionText: "Manakah analisis pasangan relasi yang BENAR di bawah ini? (Pilih semua yang benar!)",
    options: [
      "Bilangan 2 dipasangkan dengan 10 dan 20.",
      "Bilangan 3 dipasangkan dengan 15 saja.",
      "Bilangan 5 dipasangkan dengan 10, 15, dan 20.",
      "Relasi ini merupakan salah satu bentuk fungsi dari A ke B."
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: 15,
    type: 'pilihan_ganda_kompleks',
    difficulty: 'sulit',
    stimulus: "Dua buah fungsi didefinisikan dalam domain bilangan real: f(x) = 3x - 1. Kita menelaah sifat-sifat matematis nilai input x terhadap bayangan output f(x).",
    questionText: "Manakah hubungan relasional matematis berikut yang BENAR? (Pilih semua yang benar!)",
    options: [
      "Jika nilai input x bertambah sebesar 2, maka nilai f(x) bertambah sebesar 6.",
      "Fungsi f(x) memotong sumbu-y di titik koordinat (0, -1).",
      "Titik koordinat (3, 8) terletak pada grafik fungsi f(x).",
      "Nilai dari f(-3) adalah -10."
    ],
    correctAnswer: [0, 1, 3]
  },

  // --- BENAR / SALAH (5 Soal, masing-masing memiliki 3 pernyataan) ---
  {
    id: 16,
    type: 'benar_salah',
    difficulty: 'mudah',
    stimulus: "Keanggotaan Golongan Darah:\nLima orang siswa di kelas 7 yaitu Rio, Susi, Tio, Uli, dan Vian melakukan tes golongan darah. Rio dan Susi bergolongan darah A, Tio bergolongan darah B, Uli bergolongan darah AB, dan Vian bergolongan darah O.",
    questionText: "Analisis kebenaran pernyataan relasi golongan darah dari kelima siswa di atas!",
    statements: [
      "Relasi golongan darah tersebut merupakan suatu Fungsi (Pemetaan) karena setiap siswa hanya memiliki tepat satu golongan darah.",
      "Himpunan kodomain (golongan darah yang ada) adalah {A, B, AB, O}.",
      "Uli dipasangkan dengan A dan B sekaligus karena golongannya AB."
    ],
    correctStatements: [true, true, false]
  },
  {
    id: 17,
    type: 'benar_salah',
    difficulty: 'mudah',
    stimulus: "Diberikan relasi 'kelipatan dari' dari himpunan X = {4, 6} ke himpunan Y = {2, 3}.",
    questionText: "Ujilah kebenaran pernyataan mengenai relasi bilangan X ke Y berikut ini!",
    statements: [
      "Bilangan 4 pada himpunan X dipasangkan dengan bilangan 2 pada himpunan Y.",
      "Bilangan 6 dipasangkan dengan bilangan 2 dan juga bilangan 3.",
      "Relasi 'kelipatan dari' di atas merupakan fungsi dari X ke Y."
    ],
    correctStatements: [true, true, false]
  },
  {
    id: 18,
    type: 'benar_salah',
    difficulty: 'sedang',
    stimulus: "Tarif Sewa Alat Kemah:\nSebuah agen persewaan tenda menetapkan biaya sewa pokok tenda sebesar Rp50.000,00 ditambah biaya pemakaian sewa harian sebesar Rp15.000,00 per hari.",
    questionText: "Silakan analisis kebenaran hitungan biaya sewa tenda berikut!",
    statements: [
      "Fungsi biaya sewa tenda selama d hari adalah f(d) = 15.000d + 50.000.",
      "Jika menyewa tenda selama 3 hari, total biaya sewa yang harus dibayar adalah Rp95.000,00.",
      "Dengan uang sebesar Rp170.000,00, penyewa dapat menyewa tenda maksimal selama 10 hari."
    ],
    correctStatements: [true, true, false]
  },
  {
    id: 19,
    type: 'benar_salah',
    difficulty: 'sedang',
    stimulus: "Kebocoran Ember Air:\nSebuah ember bocor mula-mula berisi air sebanyak 1.000 mL. Air keluar secara konstan sebesar 20 mL setiap menitnya. Volume air sisa didalam ember setelah t menit dinyatakan sebagai fungsi v(t).",
    questionText: "Analisislah kebenaran pernyataan terkait fungsi penyusutan volume air berikut!",
    statements: [
      "Rumus fungsi volume air terhadap waktu adalah v(t) = 1.000 - 20t.",
      "Sisa air di dalam ember setelah bocor selama 15 menit adalah 700 mL.",
      "Ember tersebut akan kosong tanpa air sama sekali setelah bocor selama tepat 50 menit."
    ],
    correctStatements: [true, true, true]
  },
  {
    id: 20,
    type: 'benar_salah',
    difficulty: 'sedang',
    stimulus: "Ukuran Sepatu Siswa:\nBambang memiliki ukuran sepatu 39, Farhan memiliki ukuran sepatu 41, serta Galih memiliki ukuran sepatu 39. Relasi menghubungkan nama siswa ke ukuran sepatu mereka.",
    questionText: "Analisislah kebenaran pernyataan struktural relasi tersebut!",
    statements: [
      "Relasi ini merupakan fungsi (pemetaan) dari nama siswa ke ukuran sepatu.",
      "Daerah hasil (Range) dari relasi di atas adalah {39, 41}.",
      "Jika relasi dibalik (dari ukuran sepatu ke nama siswa), maka relasi kebalikan tersebut juga merupakan sebuah fungsi."
    ],
    correctStatements: [true, true, false]
  },

  // --- MENJODOHKAN (5 Soal, masing-masing memiliki 4 premis) ---
  {
    id: 21,
    type: 'menjodohkan',
    difficulty: 'mudah',
    stimulus: "Hubungan Geografi Negara dan Ibu Kota Asia Tenggara:\nMari jodohkan negara dengan Ibu Kota yang tepat dalam konsep korespondensi satu-satu.",
    questionText: "Jodohkanlah negara di bawah ini dengan Ibu Kota negaranya!",
    premises: [
      "Indonesia",
      "Malaysia",
      "Filipina",
      "Thailand"
    ],
    matches: [
      "Kuala Lumpur",
      "Manila",
      "Jakarta",
      "Bangkok",
      "Singapura"
    ],
    correctMatches: {
      0: 2, // Indonesia -> Jakarta
      1: 0, // Malaysia -> Kuala Lumpur
      2: 1, // Filipina -> Manila
      3: 3  // Thailand -> Bangkok
    }
  },
  {
    id: 22,
    type: 'menjodohkan',
    difficulty: 'mudah',
    stimulus: "Menguji korelasi angka pada Himpunan P = {1, 3, 5} dan Q = {2, 4, 6} dengan relasi 'kurang dari'.",
    questionText: "Pasangkan bilangan di P ke pasangannya yang sesuai di Q berdasarkan batas relasi 'kurang dari'!",
    premises: [
      "Anggota '1' di P berpasangan dengan?",
      "Anggota '3' di P berpasangan dengan?",
      "Anggota '5' di P berpasangan dengan?",
      "Nilai terkecil di himpunan Q adalah?"
    ],
    matches: [
      "2, 4, dan 6",
      "Hanya 2",
      "4 dan 6",
      "Hanya 6",
      "Bilangan 2"
    ],
    correctMatches: {
      0: 0, // '1' -> 2, 4, dan 6
      1: 2, // '3' -> 4 dan 6
      2: 3, // '5' -> Hanya 6
      3: 4  // terkecil Q -> Bilangan 2
    }
  },
  {
    id: 23,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: "Diberikan fungsi matematika f(x) = 4x - 3. Kita ingin mencari bayangan (output) nilai input x tertentu.",
    questionText: "Pasangkanlah nilai x berikut dengan bayangannya f(x) yang sesuai!",
    premises: [
      "Bayangan dari x = 3",
      "Bayangan dari x = 0",
      "Bayangan dari x = -1",
      "Bayangan dari x = 5"
    ],
    matches: [
      "-3",
      "9",
      "-7",
      "17",
      "5"
    ],
    correctMatches: {
      0: 1, // 3 -> 9
      1: 0, // 0 -> -3
      2: 2, // -1 -> -7
      3: 3  // 5 -> 17
    }
  },
  {
    id: 24,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: "Diberikan diagram pemetaan f: X -> Y. Di mana X = {1, 2, 3} dan Y = {2, 4, 6, 8}. Aturan fungsi adalah f(x) = 2x.",
    questionText: "Identifikasilah bagian-bagian pemetaan tersebut dengan menjodohkannya!",
    premises: [
      "Daerah asal (Domain)",
      "Daerah kawan (Kodomain)",
      "Daerah hasil (Range)",
      "Nilai dari f(3)"
    ],
    matches: [
      "{2, 4, 6, 8}",
      "{1, 2, 3}",
      "{2, 4, 6}",
      "Bilangan 6",
      "Bilangan 8"
    ],
    correctMatches: {
      0: 1, // Domain -> {1, 2, 3}
      1: 0, // Kodomain -> {2, 4, 6, 8}
      2: 2, // Range -> {2, 4, 6}
      3: 3  // f(3) -> Bilangan 6
    }
  },
  {
    id: 25,
    type: 'menjodohkan',
    difficulty: 'sulit',
    stimulus: "Sebuah fungsi linear f(x) = ax + b belum diketahui rumusnya secara utuh. Namun diketahui hasil bayangan f(1) = 5 dan f(3) = 11.",
    questionText: "Silakan cari nilai komponen fungsi f(x) dengan menjodohkan premis di bawah ini!",
    premises: [
      "Nilai kemiringan (a)",
      "Nilai konstanta (b)",
      "Nilai bayangan f(2)",
      "Nilai bayangan f(0)"
    ],
    matches: [
      "3",
      "2",
      "8",
      "5",
      "4"
    ],
    correctMatches: {
      0: 0, // a -> 3
      1: 1, // b -> 2
      2: 2, // f(2) -> 8
      3: 1  // f(0) -> 2
    }
  }
];
