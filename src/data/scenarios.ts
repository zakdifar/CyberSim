export interface Decision {
  id: string;
  text: string;
  impacts: {
    security: number;
    trust: number;
    ethics: number;
    stability: number;
  };
  feedback: string;
  isOptimal: boolean;
}

export interface Scenario {
  id: string;
  level: number;
  title: string;
  role: string;
  narrative: string;
  context: string;
  decisions: Decision[];
}

export interface SystemState {
  security: number;
  trust: number;
  ethics: number;
  stability: number;
}

export const initialState: SystemState = {
  security: 75,
  trust: 75,
  ethics: 75,
  stability: 75,
};

export const scenarios: Scenario[] = [
  // LEVEL 1 - Simple decisions
  {
    id: "l1-s1",
    level: 1,
    title: "Email Mencurigakan",
    role: "Mahasiswa Teknik Informatika",
    narrative: "Anda menerima email dari 'admin@kampus-anda.ac.id' yang meminta Anda mengklik tautan untuk 'memperbarui kata sandi'. Email tersebut memiliki beberapa typo dan tautan yang terlihat mencurigakan.",
    context: "Ini adalah hari pertama Anda di kampus. Anda baru saja membuat akun email kampus.",
    decisions: [
      {
        id: "l1-s1-d1",
        text: "Klik tautan dan masukkan kata sandi lama serta baru",
        impacts: { security: -25, trust: -10, ethics: 0, stability: -15 },
        feedback: "❌ Ini adalah serangan phishing klasik! Dengan mengklik tautan dan memasukkan kredensial, Anda memberikan akses langsung ke akun Anda kepada penyerang. Selalu verifikasi pengirim email dan jangan pernah klik tautan mencurigakan.",
        isOptimal: false,
      },
      {
        id: "l1-s1-d2",
        text: "Abaikan email dan laporkan ke tim IT kampus",
        impacts: { security: 10, trust: 10, ethics: 10, stability: 5 },
        feedback: "✅ Keputusan tepat! Melaporkan email phishing membantu melindungi tidak hanya Anda, tetapi juga pengguna lain di jaringan kampus. Tim IT dapat memblokir pengirim dan mengingatkan pengguna lain.",
        isOptimal: true,
      },
      {
        id: "l1-s1-d3",
        text: "Forward email ke teman-teman untuk memperingatkan mereka",
        impacts: { security: -5, trust: 5, ethics: 5, stability: -10 },
        feedback: "⚠️ Niat Anda baik, tetapi mem-forward email phishing dapat menyebabkan teman Anda tidak sengaja mengklik tautan tersebut. Lebih baik laporkan ke IT dan biarkan mereka yang mengirim peringatan resmi.",
        isOptimal: false,
      },
    ],
  },
  {
    id: "l1-s2",
    level: 1,
    title: "Password Lemah",
    role: "Mahasiswa Teknik Informatika",
    narrative: "Dosen Anda meminta kelas untuk membuat akun di platform pembelajaran online. Anda harus membuat password baru. Beberapa teman menggunakan password yang sama untuk semua akun mereka.",
    context: "Platform ini menyimpan tugas, nilai, dan informasi akademik penting Anda.",
    decisions: [
      {
        id: "l1-s2-d1",
        text: "Gunakan password yang sama dengan akun media sosial Anda: 'nama123'",
        impacts: { security: -20, trust: -5, ethics: -5, stability: -10 },
        feedback: "❌ Menggunakan password yang sama di banyak platform sangat berbahaya. Jika satu akun diretas, semua akun Anda terekspos. Password 'nama123' juga sangat mudah ditebak.",
        isOptimal: false,
      },
      {
        id: "l1-s2-d2",
        text: "Buat password unik yang kuat dan simpan di password manager",
        impacts: { security: 15, trust: 5, ethics: 5, stability: 10 },
        feedback: "✅ Menggunakan password unik yang kuat dan password manager adalah praktik keamanan terbaik. Password manager membantu Anda mengelola banyak password tanpa harus mengingat semuanya.",
        isOptimal: true,
      },
      {
        id: "l1-s2-d3",
        text: "Tulis password di sticky note dan tempel di laptop",
        impacts: { security: -15, trust: -5, ethics: 0, stability: -5 },
        feedback: "❌ Menulis password di tempat yang terlihat membuat siapa saja bisa melihatnya. Ini termasuk risiko keamanan fisik yang sering diabaikan.",
        isOptimal: false,
      },
    ],
  },
  // LEVEL 2 - Moderate complexity
  {
    id: "l2-s1",
    level: 2,
    title: "Data Pribadi Teman",
    role: "Staf IT Kampus",
    narrative: "Seorang dosen meminta Anda untuk memberikan data kontak pribadi (nomor HP dan alamat) mahasiswa tertentu untuk keperluan 'proyek penelitian'. Permintaan ini tidak melalui prosedur formal.",
    context: "Sebagai staf IT, Anda memiliki akses ke database mahasiswa. Dosen tersebut cukup senior dan berpengaruh di kampus.",
    decisions: [
      {
        id: "l2-s1-d1",
        text: "Berikan data karena permintaan dari dosen senior",
        impacts: { security: -15, trust: -20, ethics: -25, stability: -10 },
        feedback: "❌ Memberikan data pribadi tanpa prosedur formal melanggar privasi mahasiswa dan regulasi perlindungan data. Status senioritas tidak membenarkan pelanggaran prosedur.",
        isOptimal: false,
      },
      {
        id: "l2-s1-d2",
        text: "Tolak dengan sopan dan arahkan ke prosedur formal yang benar",
        impacts: { security: 10, trust: 15, ethics: 20, stability: 10 },
        feedback: "✅ Keputusan yang tepat. Melindungi data pribadi adalah tanggung jawab utama. Mengarahkan ke prosedur formal memastikan akuntabilitas dan perlindungan hukum bagi semua pihak.",
        isOptimal: true,
      },
      {
        id: "l2-s1-d3",
        text: "Berikan sebagian data (hanya email, tanpa nomor HP)",
        impacts: { security: -5, trust: -10, ethics: -10, stability: 0 },
        feedback: "⚠️ Meskipun niatnya kompromi, memberikan data apa pun tanpa prosedur tetap melanggar privasi. Setiap informasi pribadi harus dilindungi dengan standar yang sama.",
        isOptimal: false,
      },
    ],
  },
  {
    id: "l2-s2",
    level: 2,
    title: "Software Bajakan",
    role: "Mahasiswa Teknik Informatika",
    narrative: "Untuk tugas kuliah, Anda membutuhkan software desain profesional yang sangat mahal. Teman menawarkan versi bajakan yang sudah di-crack. Deadline tugas tinggal 2 hari.",
    context: "Software aslinya berharga jutaan rupiah. Ada alternatif open-source tetapi Anda belum familiar.",
    decisions: [
      {
        id: "l2-s2-d1",
        text: "Gunakan software bajakan agar bisa menyelesaikan tugas tepat waktu",
        impacts: { security: -15, trust: -10, ethics: -20, stability: -15 },
        feedback: "❌ Software bajakan sering mengandung malware tersembunyi. Selain risiko keamanan, penggunaan software bajakan melanggar hak cipta dan etika profesional yang harus dijunjung tinggi.",
        isOptimal: false,
      },
      {
        id: "l2-s2-d2",
        text: "Gunakan alternatif open-source dan minta perpanjangan waktu ke dosen",
        impacts: { security: 10, trust: 10, ethics: 15, stability: 5 },
        feedback: "✅ Memilih solusi legal dan jujur kepada dosen menunjukkan integritas. Software open-source seperti GIMP, Inkscape, atau Blender memiliki kemampuan profesional.",
        isOptimal: true,
      },
      {
        id: "l2-s2-d3",
        text: "Gunakan trial version software asli meskipun fiturnya terbatas",
        impacts: { security: 5, trust: 5, ethics: 10, stability: 0 },
        feedback: "⚠️ Menggunakan trial version adalah legal dan etis, meskipun keterbatasan fitur mungkin memengaruhi kualitas tugas. Ini tetap lebih baik dari solusi bajakan.",
        isOptimal: false,
      },
    ],
  },
  // LEVEL 3 - Complex with trade-offs
  {
    id: "l3-s1",
    level: 3,
    title: "Kebocoran Data Kampus",
    role: "Staf IT Kampus",
    narrative: "Anda menemukan bahwa database mahasiswa telah diakses oleh pihak yang tidak berwenang. Data 5.000 mahasiswa mungkin telah bocor termasuk nama, NIM, dan nilai. Rektor meminta Anda untuk 'menjaga ketenangan' dan tidak mengumumkan insiden ini.",
    context: "Regulasi perlindungan data mengharuskan notifikasi dalam 72 jam. Kampus sedang dalam proses akreditasi dan berita ini bisa berdampak buruk.",
    decisions: [
      {
        id: "l3-s1-d1",
        text: "Ikuti perintah rektor dan tutup informasi kebocoran",
        impacts: { security: -10, trust: -30, ethics: -30, stability: -20 },
        feedback: "❌ Menyembunyikan kebocoran data melanggar regulasi dan mengkhianati kepercayaan mahasiswa. Jika terungkap kemudian, dampaknya akan jauh lebih besar. Mahasiswa berhak tahu bahwa data mereka terekspos.",
        isOptimal: false,
      },
      {
        id: "l3-s1-d2",
        text: "Laporkan sesuai regulasi, notifikasi mahasiswa, dan perkuat keamanan",
        impacts: { security: 15, trust: 10, ethics: 20, stability: -5 },
        feedback: "✅ Transparansi adalah kunci. Meskipun ada dampak reputasi jangka pendek, kepatuhan regulasi dan kejujuran membangun kepercayaan jangka panjang. Mahasiswa dapat mengambil langkah perlindungan diri.",
        isOptimal: true,
      },
      {
        id: "l3-s1-d3",
        text: "Perbaiki kerentanan diam-diam dan laporkan hanya jika ada keluhan",
        impacts: { security: 5, trust: -15, ethics: -15, stability: -5 },
        feedback: "⚠️ Memperbaiki kerentanan itu baik, tetapi tidak memberitahu pihak terdampak tetap melanggar regulasi dan etika. Pendekatan 'tunggu dan lihat' membahayakan mahasiswa yang datanya mungkin sudah disalahgunakan.",
        isOptimal: false,
      },
    ],
  },
  {
    id: "l3-s2",
    level: 3,
    title: "AI dan Plagiarisme",
    role: "Mahasiswa Teknik Informatika",
    narrative: "Anda menemukan bahwa banyak teman sekelas menggunakan AI untuk mengerjakan seluruh tugas akhir mereka tanpa pemahaman. Dosen tampaknya tidak menyadari hal ini. Salah satu teman meminta Anda untuk tidak membicarakan hal ini.",
    context: "Kampus belum memiliki kebijakan jelas tentang penggunaan AI. Teman-teman tersebut termasuk sahabat dekat Anda.",
    decisions: [
      {
        id: "l3-s2-d1",
        text: "Diam saja karena bukan urusan Anda",
        impacts: { security: 0, trust: -10, ethics: -20, stability: -10 },
        feedback: "⚠️ Diam berarti membiarkan ketidakjujuran akademik berlanjut. Ini merendahkan nilai gelar Anda dan merugikan mahasiswa yang bekerja jujur.",
        isOptimal: false,
      },
      {
        id: "l3-s2-d2",
        text: "Diskusikan dengan dosen tentang perlunya kebijakan AI yang jelas",
        impacts: { security: 5, trust: 15, ethics: 15, stability: 10 },
        feedback: "✅ Mendorong kebijakan yang jelas adalah pendekatan konstruktif. Ini mengatasi masalah sistemik tanpa menunjuk individu tertentu, dan membantu seluruh komunitas akademik.",
        isOptimal: true,
      },
      {
        id: "l3-s2-d3",
        text: "Laporkan teman-teman secara anonim ke pihak akademik",
        impacts: { security: 0, trust: -5, ethics: 10, stability: -5 },
        feedback: "⚠️ Melaporkan adalah tindakan berani, tetapi tanpa kebijakan yang jelas, dampaknya bisa tidak konsisten. Lebih baik dorong perubahan sistemik terlebih dahulu.",
        isOptimal: false,
      },
    ],
  },
];

export const getLevelScenarios = (level: number): Scenario[] => {
  return scenarios.filter((s) => s.level === level);
};

export const getMaxLevel = (): number => {
  return Math.max(...scenarios.map((s) => s.level));
};
