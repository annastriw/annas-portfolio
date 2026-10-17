import { text, type Bilingual } from '../lib/i18n.ts';

export type Category = 'web' | 'ml' | 'mobile' | 'interactive';
export interface Project {
  slug: string;
  title: string;
  category: Category;
  role: string;
  period: Bilingual;
  status: string;
  context: Bilingual;
  tagline: Bilingual;
  intro: Bilingual;
  contribution: Bilingual;
  scope: Bilingual;
  note?: Bilingual;
  technologies: string[];
  cover: string;
  gallery: string[];
  links: { label: Bilingual; url: string }[];
}
const media = (slug: string, count: number) => ({
  cover: `/assets/projects/${slug}/cover.webp`,
  gallery: Array.from(
    { length: count },
    (_, i) => `/assets/projects/${slug}/documentation/${String(i + 1).padStart(2, '0')}.webp`,
  ),
});
const live = (url: string) => ({ label: text('Visit Website', 'Buka Website'), url });
const code = (url: string) => ({ label: text('View Code', 'Lihat Kode'), url });
const frontend = (url: string) => ({
  label: text('View Frontend Code', 'Lihat Kode Frontend'),
  url,
});

const backend = (url: string) => ({ label: text('View Backend Code', 'Lihat Kode Backend'), url });

export const projects: Project[] = [
  {
    slug: 'ukg-system',
    title: 'UKG System',
    category: 'web',
    role: 'Fullstack Developer',
    period: text('January–April 2026', 'Januari–April 2026'),
    status: 'Live Production',
    context: text('CV Universal Kharisma Globalindo', 'CV Universal Kharisma Globalindo'),
    tagline: text(
      'Multiple branches. One place to manage them.',
      'Operasional banyak cabang, dalam satu kendali.',
    ),
    intro: text(
      'From notebooks, WhatsApp, and Excel to an integrated ERP that helps the owner monitor business operations remotely.',
      'Dari pencatatan di buku, WhatsApp, dan Excel menjadi ERP terintegrasi yang membantu pemilik memantau bisnis dari jarak jauh.',
    ),
    contribution: text(
      'Gathered business requirements, designed the UI/UX, and built the frontend, backend, and database. Handled manual and automated testing with Playwright, deployment to an Ubuntu VPS, and system maintenance.',
      'Menggali kebutuhan bisnis, merancang UI/UX, serta membangun frontend, backend, dan database. Menangani pengujian manual dan otomatis dengan Playwright, deployment ke Ubuntu VPS, serta pemeliharaan sistem.',
    ),
    scope: text(
      'Point of sale · Inventory & stock · Ordering · Attendance · Sales · Operating expenses · Multi-branch reports & dashboards',
      'Kasir/POS · Inventory & stok · Pemesanan · Absensi · Penjualan · Biaya operasional · Laporan & dashboard multi-cabang',
    ),
    note: text('Private repository', 'Repository privat'),
    technologies: ['Next.js', 'NestJS', 'MySQL', 'Prisma', 'shadcn/ui', 'Playwright'],
    ...media('ukg-system', 9),
    links: [live('https://ukgsystem.site/')],
  },
  {
    slug: 'ihealth-edu',
    title: 'iHealth Edu',
    category: 'web',
    role: 'Frontend Developer',
    period: text('June–August 2025', 'Juni–Agustus 2025'),
    status: 'Live Production',
    context: text(
      'Puskesmas Padangsari · Group capstone project',
      'Puskesmas Padangsari · Capstone project kelompok',
    ),
    tagline: text(
      'Health information, connected in one experience.',
      'Informasi kesehatan, terhubung dalam satu pengalaman.',
    ),
    intro: text(
      'A platform connecting education, screening, and examination data to support healthcare services at Puskesmas Padangsari.',
      'Platform yang menghubungkan edukasi, screening, dan data pemeriksaan untuk mendukung layanan kesehatan di Puskesmas Padangsari.',
    ),
    contribution: text(
      'Gathered stakeholder requirements, designed the UI/UX, and built role-based frontend experiences. Integrated REST APIs, examination data from ESP32 devices, and ML outputs into the healthcare professionals’ interface.',
      'Menggali kebutuhan stakeholder, merancang UI/UX, dan membangun frontend berbasis role. Mengintegrasikan REST API, data pemeriksaan dari perangkat ESP32, serta hasil ML ke antarmuka tenaga kesehatan.',
    ),
    scope: text(
      'Health education · Screening · Patient & examination data · IoT integration · ML decision support',
      'Edukasi kesehatan · Screening · Data pasien & pemeriksaan · Integrasi IoT · ML decision support',
    ),
    note: text(
      'ML outputs support decision-making; they do not provide clinical diagnoses.',
      'Hasil ML merupakan pendukung keputusan, bukan diagnosis klinis.',
    ),
    technologies: ['Figma', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'REST API'],
    ...media('ihealth-edu', 8),
    links: [
      live('https://www.ihealthedu.site/'),
      frontend('https://github.com/annastriw/frontend-ihealth'),
      backend('https://github.com/annastriw/backend-ihealth'),
    ],
  },
  {
    slug: 'dialisis-connect-edu',
    title: 'Dialisis Connect Edu',
    category: 'web',
    role: 'Frontend Developer',
    period: text('February–May 2025', 'Februari–Mei 2025'),
    status: 'Live Production',
    context: text(
      'IPDI Central Java · Four-person team',
      'IPDI Jawa Tengah · Tim beranggotakan empat orang',
    ),
    tagline: text(
      'A place to learn and share about kidney health.',
      'Belajar dan berbagi tentang kesehatan ginjal.',
    ),
    intro: text(
      'An education and community platform developed with IPDI Central Java for patients, families, healthcare professionals, and the public.',
      'Platform edukasi dan komunitas yang dikembangkan bersama IPDI Jawa Tengah untuk pasien, keluarga, tenaga kesehatan, dan masyarakat.',
    ),
    contribution: text(
      'Gathered stakeholder requirements, designed user flows and UI/UX, and built the role-based frontend. Integrated REST APIs and authentication, performed manual and automated testing with Katalon Studio, and supported deployment.',
      'Menggali kebutuhan stakeholder, merancang alur dan UI/UX, serta membangun frontend berbasis role. Mengintegrasikan REST API dan autentikasi, melakukan pengujian manual serta otomatis dengan Katalon Studio, dan mendukung deployment.',
    ),
    scope: text(
      'Health articles · Educational videos · Digital booklets · Discussion forums · Role-based access',
      'Artikel kesehatan · Video edukasi · Booklet digital · Forum diskusi · Akses berbasis role',
    ),
    note: text(
      'The platform supports education and community; it does not replace medical consultations.',
      'Platform ini mendukung edukasi dan komunitas, bukan pengganti konsultasi medis.',
    ),
    technologies: ['Figma', 'Next.js', 'React', 'REST API', 'Katalon Studio', 'Docker'],
    ...media('dialisis-connect-edu', 7),
    links: [
      live('https://dialisisconnectedu.vercel.app/'),
      frontend('https://github.com/annastriw/fe-dialisis'),
      backend('https://github.com/annastriw/be-dialisis'),
    ],
  },
  {
    slug: 'nusa-dakwah',
    title: 'Nusa Dakwah',
    category: 'web',
    role: 'Fullstack Developer',
    period: text('January–February 2026', 'Januari–Februari 2026'),
    status: 'Live Production',
    context: text('Web application', 'Aplikasi web'),
    tagline: text(
      'A space for Islamic learning and conversation.',
      'Ruang belajar Islam yang membuka percakapan.',
    ),
    intro: text(
      'A platform bringing learning materials, articles, videos, and discussion forums together in one place.',
      'Platform yang menghubungkan materi pembelajaran, artikel, video, dan forum diskusi dalam satu tempat.',
    ),
    contribution: text(
      'Defined product requirements, designed user flows and UI/UX, and built the Next.js frontend and Laravel REST API with MySQL. Implemented JWT authentication and forum moderation, performed manual and automated testing with Katalon Studio, and prepared deployment using Docker.',
      'Merancang kebutuhan produk, alur pengguna, dan UI/UX, lalu membangun frontend Next.js serta REST API Laravel dengan MySQL. Mengimplementasikan autentikasi JWT dan moderasi forum, melakukan pengujian manual serta otomatis dengan Katalon Studio, dan menyiapkan deployment menggunakan Docker.',
    ),
    scope: text(
      'Learning modules · Articles · YouTube videos · Search · Threaded discussions · Content management & moderation',
      'Modul pembelajaran · Artikel · Video YouTube · Pencarian · Forum dengan balasan bertingkat · Pengelolaan konten & moderasi',
    ),
    technologies: [
      'Figma',
      'Next.js',
      'Tailwind CSS',
      'Laravel',
      'MySQL',
      'JWT',
      'Katalon Studio',
      'Docker',
    ],
    ...media('nusa-dakwah', 6),
    links: [
      live('https://nusadakwah.vercel.app/'),
      frontend('https://github.com/annastriw/frontend-nusa-dakwah'),
      {
        label: text('View Backend Code', 'Lihat Kode Backend'),
        url: 'https://github.com/annastriw/backend-nusa-dakwah',
      },
    ],
  },
  {
    slug: 'simastok',
    title: 'SIMASTOK SHR Jaya Motor',
    category: 'web',
    role: 'Fullstack Developer',
    period: text('December 2025–January 2026', 'Desember 2025–Januari 2026'),
    status: 'Live Production',
    context: text('SHR Jaya Motor', 'SHR Jaya Motor'),
    tagline: text(
      'Every stock movement, recorded in one system.',
      'Setiap pergerakan barang, tercatat dalam satu sistem.',
    ),
    intro: text(
      'A web-based inventory system replacing manual records to help the owner and employees manage stock.',
      'Sistem inventory berbasis web yang menggantikan pencatatan manual untuk membantu pemilik dan karyawan mengelola persediaan.',
    ),
    contribution: text(
      'Gathered stakeholder requirements, designed inventory workflows and UI/UX, and built the application with Laravel and MySQL. Implemented role-based access, stock movement and validation, and reporting. Handled manual and automated testing with Playwright and deployment using Docker.',
      'Menggali kebutuhan stakeholder, merancang alur inventory dan UI/UX, serta membangun aplikasi dengan Laravel dan MySQL. Mengimplementasikan akses berbasis role, pergerakan dan validasi stok, serta laporan. Menangani pengujian manual dan otomatis dengan Playwright serta deployment menggunakan Docker.',
    ),
    scope: text(
      'Products, categories & suppliers · Incoming & outgoing goods · Stock updates · Insufficient-stock validation · Transaction history · Period-based reports & PDF exports',
      'Data barang, kategori & pemasok · Barang masuk & keluar · Pembaruan stok · Validasi stok tidak mencukupi · Riwayat transaksi · Laporan per periode & PDF',
    ),
    note: text('Private repository', 'Repository privat'),
    technologies: ['Figma', 'Laravel', 'PHP', 'MySQL', 'Playwright', 'Docker'],
    ...media('simastok', 6),
    links: [live('https://simastok.site/')],
  },
  {
    slug: 'ml-for-heart-attack-risk-prediction',
    title: 'Heart Attack Risk Prediction',
    category: 'ml',
    role: 'Machine Learning Engineer',
    period: text('June–August 2025', 'Juni–Agustus 2025'),
    status: 'Completed Prototype',
    context: text('Integrated with iHealth Edu', 'Terintegrasi dengan iHealth Edu'),
    tagline: text(
      'Bringing a prediction model into an application.',
      'Membawa model prediksi ke dalam aplikasi.',
    ),
    intro: text(
      'A machine learning prototype for estimating heart attack risk, with a prediction service integrated into iHealth Edu.',
      'Prototipe machine learning untuk memperkirakan risiko serangan jantung, dengan layanan prediksi yang terintegrasi ke iHealth Edu.',
    ),
    contribution: text(
      'Processed data, compared four classification algorithms, and performed hyperparameter tuning. Developed a Flask REST API to serve predictions, deployed the service using Docker on Ubuntu, and integrated it into iHealth Edu.',
      'Mengolah data, membandingkan empat algoritma klasifikasi, dan melakukan hyperparameter tuning. Mengembangkan REST API menggunakan Flask untuk menyajikan prediksi, lalu men-deploy layanan menggunakan Docker di Ubuntu dan mengintegrasikannya ke iHealth Edu.',
    ),
    scope: text(
      'Preprocessing · Feature engineering · Model training & evaluation · Model serving · Application integration',
      'Preprocessing · Feature engineering · Pelatihan & evaluasi model · Model serving · Integrasi aplikasi',
    ),
    note: text(
      'Random Forest: accuracy 71.93%, ROC-AUC 0.8015 on a research dataset. A decision-support prototype, not a diagnostic tool or a clinically validated model.',
      'Random Forest: accuracy 71,93%, ROC-AUC 0,8015 pada dataset penelitian. Prototipe pendukung keputusan, bukan alat diagnosis atau model yang telah divalidasi secara klinis.',
    ),
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SMOTE', 'Flask', 'Docker'],
    ...media('ml-for-heart-attack-risk-prediction', 2),
    links: [code('https://github.com/annastriw/ml-for-heart-attack-risk-prediction')],
  },
  {
    slug: 'speech-to-text-system',
    title: 'Speech-to-Text System',
    category: 'ml',
    role: 'Machine Learning Engineer',
    period: text('March–April 2025', 'Maret–April 2025'),
    status: 'Completed Prototype',
    context: text('Google Colab', 'Google Colab'),
    tagline: text(
      'Turning speech into text you can use.',
      'Dari ucapan menjadi teks yang bisa digunakan.',
    ),
    intro: text(
      'A prototype that converts English audio and video into transcripts, subtitles, and videos with burned-in captions.',
      'Prototipe yang mengubah audio dan video berbahasa Inggris menjadi transkripsi, subtitle, dan video dengan caption tertanam.',
    ),
    contribution: text(
      'Built an audio and video processing workflow covering audio extraction, conversion to mono at 16 kHz, and chunk-based processing. Integrated pretrained Wav2Vec2 through Hugging Face Transformers, structured transcription outputs, and generated and embedded subtitles using FFmpeg.',
      'Membangun alur pemrosesan audio dan video, dari ekstraksi audio, konversi mono 16 kHz, hingga pemrosesan per potongan. Mengintegrasikan pretrained Wav2Vec2 melalui Hugging Face Transformers, menyusun hasil transkripsi, serta menghasilkan dan menanamkan subtitle menggunakan FFmpeg.',
    ),
    scope: text(
      'WAV/MP3 audio & MP4 video → TXT, CSV & JSON transcripts → SRT subtitles → Captioned video',
      'Audio WAV/MP3 & video MP4 → Transkripsi TXT, CSV & JSON → Subtitle SRT → Video dengan caption',
    ),
    note: text(
      'Uses a pretrained model for English transcription, without fine-tuning.',
      'Menggunakan model pretrained untuk transkripsi bahasa Inggris, tanpa fine-tuning model.',
    ),
    technologies: [
      'Python',
      'Hugging Face Transformers',
      'Wav2Vec2',
      'Librosa',
      'FFmpeg',
      'Pandas',
      'Google Colab',
    ],
    ...media('speech-to-text-system', 1),
    links: [code('https://github.com/annastriw/speech-to-text-system')],
  },
  {
    slug: 'thermal-printer-service',
    title: 'Thermal Printer Service',
    category: 'mobile',
    role: 'Android Developer',
    period: text('January–February 2026', 'Januari–Februari 2026'),
    status: 'Completed Application',
    context: text('UKG System operational companion', 'Pendukung operasional UKG System'),
    tagline: text(
      'From digital documents to printed receipts.',
      'Dari dokumen digital ke struk di tangan.',
    ),
    intro: text(
      'An Android companion application for UKG System that receives print jobs through the Android Print Framework and sends them to a configured Bluetooth thermal printer.',
      'Aplikasi Android pendamping UKG System yang menerima tugas cetak melalui Android Print Framework dan mengirimkannya ke printer thermal Bluetooth yang dikonfigurasi.',
    ),
    contribution: text(
      'Developed a custom Android PrintService with a PDF-to-bitmap pipeline and monochrome ESC/POS conversion. Handled chunked Bluetooth transfers, retries, cancellation, and error states, alongside saved printer profiles and calibration controls.',
      'Mengembangkan custom Android PrintService dengan alur PDF-to-bitmap dan konversi monochrome ESC/POS. Menangani pengiriman Bluetooth bertahap, retry, pembatalan, dan kondisi error, serta menyediakan profil printer tersimpan dan pengaturan kalibrasi.',
    ),
    scope: text(
      'Document → Bitmap → ESC/POS → Bluetooth printer',
      'Dokumen → Bitmap → ESC/POS → Printer Bluetooth',
    ),
    note: text(
      'Supports 58 mm and 80 mm configurations at 203 DPI. Compatibility depends on the printer and configuration used.',
      'Mendukung konfigurasi 58 mm dan 80 mm pada 203 DPI. Kompatibilitas bergantung pada printer dan konfigurasi yang digunakan.',
    ),
    technologies: [
      'Kotlin',
      'Android SDK',
      'Android Print Framework',
      'PdfRenderer',
      'Bluetooth RFCOMM/SPP',
      'ESC/POS',
    ],
    ...media('thermal-printer-service', 6),
    links: [code('https://github.com/annastriw/ThermalPrinterService')],
  },
  {
    slug: 'footy-standings',
    title: 'Footy Standings',
    category: 'mobile',
    role: 'Android Developer',
    period: text('October–November 2024', 'Oktober–November 2024'),
    status: 'Completed Application',
    context: text('Flutter', 'Flutter'),
    tagline: text('Follow the competition. Know the clubs.', 'Ikuti kompetisinya. Kenali klubnya.'),
    intro: text(
      'An Android application for exploring football standings, fixtures, top scorers, and club information through the Football Data API.',
      'Aplikasi Android untuk menjelajahi klasemen, jadwal pertandingan, pencetak gol terbanyak, dan informasi klub sepak bola melalui Football Data API.',
    ),
    contribution: text(
      'Built the interface and navigation using Flutter and Dart, integrated the REST API, and created data models for each feature. Handled loading, error, empty, and success states to keep the user experience clear.',
      'Membangun antarmuka dan navigasi menggunakan Flutter dan Dart, mengintegrasikan REST API, serta menyusun model data untuk setiap fitur. Menangani tampilan loading, error, data kosong, dan hasil agar alur penggunaan tetap jelas.',
    ),
    scope: text(
      'Six competitions · Standings · Fixtures · Top scorers · Club details',
      'Enam kompetisi · Klasemen · Jadwal pertandingan · Pencetak gol terbanyak · Detail klub',
    ),
    technologies: [
      'Flutter',
      'Dart',
      'REST API',
      'HTTP',
      'JSON',
      'FutureBuilder',
      'Material Design',
    ],
    ...media('footy-standings', 4),
    links: [code('https://github.com/annastriw/FootyStandings')],
  },
  {
    slug: 'panoramic-virtual-tour',
    title: 'Panoramic Virtual Tour',
    category: 'interactive',
    role: 'Junior Game Developer Intern',
    period: text('July–August 2024', 'Juli–Agustus 2024'),
    status: 'Completed Prototype',
    context: text('PT Duta Basis Dataprima', 'PT Duta Basis Dataprima'),
    tagline: text(
      'See spaces from every angle. Explore them through interaction.',
      'Melihat ruang dari berbagai sudut. Menjelajahinya lewat interaksi.',
    ),
    intro: text(
      'A Unity-based virtual tour prototype featuring 360° panoramas and hotspot navigation for exploring architectural environments.',
      'Prototipe virtual tour berbasis Unity yang menghadirkan panorama 360° dan navigasi hotspot untuk menjelajahi lingkungan arsitektur.',
    ),
    contribution: text(
      'Prepared viewpoints, materials, and lighting in Lumion using 3D models provided by the team. Processed 78 panoramas and integrated them across 79 Unity scenes, implementing mouse and touch controls, hotspot navigation, and scene transitions in C#.',
      'Menyiapkan viewpoint, material, dan pencahayaan di Lumion menggunakan model 3D dari tim. Mengolah 78 panorama dan mengintegrasikannya ke dalam 79 scene Unity, serta membangun kontrol mouse, sentuhan, navigasi hotspot, dan perpindahan scene menggunakan C#.',
    ),
    scope: text(
      '360° panoramas · Hotspot navigation · Mouse & touch controls · Scene transitions',
      'Panorama 360° · Navigasi hotspot · Kontrol mouse & sentuhan · Transisi antar-scene',
    ),
    technologies: ['Unity', 'Lumion', 'C#'],
    ...media('panoramic-virtual-tour', 7),
    links: [
      {
        label: text('View Project Files', 'Lihat Berkas Proyek'),
        url: 'https://drive.google.com/drive/folders/1hi1Njtmg8O8_soigVc-wROw2rlwtnjpp?usp=sharing',
      },
    ],
  },
];

export const featuredProjects = [projects[0], projects[1], projects[5]];
