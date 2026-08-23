import type { Locale } from "@/lib/i18n/config";

export interface EducationData {
  institution: Record<Locale, string>;
  degree: Record<Locale, string>;
  fieldOfStudy: Record<Locale, string>;
  period: string;
  location: string;
  highlights: Record<Locale, string[]>;
}

export interface CertificateData {
  id: string;
  title: Record<Locale, string>;
  issuer: string;
  category: "academic-experience" | "networking" | "ai-data";
  assetPath: string;
  badge: string;
  credentialNote: Record<Locale, string>;
}

export interface EngineeringPrinciple {
  index: string;
  code: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface TechnicalTaxonomyItem {
  name: string;
  context: string;
}

export interface TechnicalTaxonomyGroup {
  category: Record<Locale, string>;
  items: TechnicalTaxonomyItem[];
}

export const biographyData = {
  headline: {
    en: "Software Engineer specializing in end-to-end web architecture, full-stack systems, and applied machine learning integration.",
    id: "Software Engineer dengan spesialisasi arsitektur web end-to-end, sistem fullstack, dan integrasi terapan machine learning.",
  },
  paragraphs: {
    en: [
      "I am a Software Engineer and Machine Learning Developer with a Bachelor of Engineering in Computer Engineering from Diponegoro University. My core focus lies in architecting deterministic digital products—bridging intuitive frontend interfaces, resilient backend REST APIs, and production-ready machine learning inference services.",
      "Over the course of commercial and community projects, I have developed enterprise ERP platforms (UKG System), digital healthcare platforms (iHealth Edu, Dialisis Connect Edu), machine learning classification prototypes, automatic speech recognition pipelines, and native hardware utilities such as Android ESC/POS thermal printing drivers.",
      "I advocate for simplicity, type-safety, and empirical verification over speculative complexity. Every system I deliver prioritizes clean architectural boundaries, rigorous manual and automated QA, responsive typography, and measurable operational reliability.",
    ],
    id: [
      "Saya adalah Software Engineer dan Machine Learning Developer lulusan Sarjana Teknik Komputer Universitas Diponegoro. Fokus utama saya terletak pada perancangan produk digital deterministik—menghubungkan antarmuka frontend intuitif, REST API backend yang andal, serta layanan inferensi machine learning siap produksi.",
      "Sepanjang pengerjaan proyek komersial dan kemitraan komunitas, saya telah mengembangkan platform ERP multi-cabang (UKG System), platform kesehatan digital (iHealth Edu, Dialisis Connect Edu), purwarupa klasifikasi risiko machine learning, pipeline Automatic Speech Recognition, serta utilitas native integrasi perangkat keras seperti driver pencetakan termal ESC/POS pada Android.",
      "Saya memegang prinsip kesederhanaan, keamanan tipe (type-safety), dan verifikasi empiris dibandingkan kompleksitas spekulatif. Setiap sistem yang saya bangun mengutamakan batasan arsitektur yang bersih, pengujian QA terstruktur, tipografi responsif, dan keandalan operasional nyata.",
    ],
  },
  specifications: {
    location: "Klaten, Central Java, Indonesia",
    timezone: "Asia/Jakarta (UTC+7)",
    status: "OPEN TO COLLABORATION",
    degrees: "Bachelor of Engineering (S.T.) in Computer Engineering",
    almaMater: "Diponegoro University (Universitas Diponegoro)",
    languages: "Indonesian (Native), English (Professional Working)",
  },
};

export const educationData: EducationData = {
  institution: {
    en: "Diponegoro University (Universitas Diponegoro)",
    id: "Universitas Diponegoro",
  },
  degree: {
    en: "Bachelor of Engineering (S.T.)",
    id: "Sarjana Teknik (S.T.)",
  },
  fieldOfStudy: {
    en: "Computer Engineering (Teknik Komputer)",
    id: "Teknik Komputer",
  },
  period: "2020 — 2024",
  location: "Semarang, Central Java, Indonesia",
  highlights: {
    en: [
      "Specialized in Software Engineering, Applied Machine Learning, Distributed Web Systems, and Computer Networks.",
      "Conducted research and prototype implementations across predictive healthcare models and interactive fullstack systems.",
      "Served as Developer IT Intern at Faculty of Engineering, designing institutional UI/UX systems and authoring standard user guides.",
    ],
    id: [
      "Peminatan pada Rekayasa Perangkat Lunak, Terapan Machine Learning, Sistem Web Terdistribusi, dan Jaringan Komputer.",
      "Melakukan riset dan purwarupa sistem inferensi prediktif kesehatan serta platform aplikasi fullstack interaktif.",
      "Berkontribusi sebagai Developer IT Intern Fakultas Teknik dalam perancangan sistem UI/UX institusi dan penyusunan buku panduan operasional.",
    ],
  },
};

export const certificatesData: CertificateData[] = [
  {
    id: "sertif-magang-undip",
    title: {
      en: "Developer IT Internship — Faculty of Engineering",
      id: "Sertifikat Magang Developer IT — Fakultas Teknik",
    },
    issuer: "Faculty of Engineering, Diponegoro University",
    category: "academic-experience",
    assetPath: "/assets/certificates/sertif_magang.webp",
    badge: "INTERNSHIP CREDENTIAL",
    credentialNote: {
      en: "Formal completion certificate for UI/UX design, interactive prototyping, and internal systems documentation.",
      id: "Sertifikat penyelesaian magang untuk perancangan UI/UX, purwarupa interaktif, dan dokumentasi sistem internal.",
    },
  },
  {
    id: "ccna-enterprise",
    title: {
      en: "CCNA: Enterprise Networking, Security, and Automation",
      id: "CCNA: Enterprise Networking, Security, and Automation",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
    assetPath: "/assets/certificates/ccna_enterprise_networking_security_and_automation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Advanced routing architectures, network security, virtualization, and network automation APIs.",
      id: "Arsitektur routing tingkat lanjut, keamanan jaringan, virtualisasi, dan otomatisasi jaringan.",
    },
  },
  {
    id: "ccnav7-switching-routing",
    title: {
      en: "CCNAv7: Switching, Routing, and Wireless Essentials",
      id: "CCNAv7: Switching, Routing, and Wireless Essentials",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
    assetPath: "/assets/certificates/ccnav7_switching_routing_and_wireless_essentials.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "VLANs, inter-VLAN routing, STP, EtherChannel, DHCPv4/v6, and WLAN configuration.",
      id: "Konfigurasi VLAN, inter-VLAN routing, STP, EtherChannel, DHCPv4/v6, dan jaringan nirkabel.",
    },
  },
  {
    id: "ccnav7-intro-networks",
    title: {
      en: "CCNAv7: Introduction to Networks",
      id: "CCNAv7: Introduction to Networks",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
    assetPath: "/assets/certificates/ccnav7_introduction_to_networks.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Network architecture, IP addressing schemes, subnetting, Ethernet protocols, and OSI model fundamentals.",
      id: "Arsitektur jaringan, skema pengalamatan IP, subnetting, protokol Ethernet, dan dasar model OSI.",
    },
  },
  {
    id: "hcia-ai",
    title: {
      en: "HCIA-AI V3.5 (Huawei Certified ICT Associate - Artificial Intelligence)",
      id: "HCIA-AI V3.5 (Huawei Certified ICT Associate - Artificial Intelligence)",
    },
    issuer: "Huawei Technologies Co., Ltd.",
    category: "ai-data",
    assetPath: "/assets/certificates/hcia_ai_v3_5.webp",
    badge: "HUAWEI CERTIFIED",
    credentialNote: {
      en: "Deep learning fundamentals, computer vision, natural language processing, and AI development workflows.",
      id: "Fondasi deep learning, computer vision, natural language processing, dan workflow pengembangan AI.",
    },
  },
  {
    id: "database-design",
    title: {
      en: "Database Design",
      id: "Database Design",
    },
    issuer: "Oracle Academy",
    category: "ai-data",
    assetPath: "/assets/certificates/database_design.webp",
    badge: "ORACLE ACADEMY",
    credentialNote: {
      en: "Relational modeling, entity-relationship diagrams (ERD), normalization, and schema design.",
      id: "Pemodelan relasional, Entity-Relationship Diagram (ERD), normalisasi, dan perancangan skema basis data.",
    },
  },
  {
    id: "database-foundations",
    title: {
      en: "Database Foundations",
      id: "Database Foundations",
    },
    issuer: "Oracle Academy",
    category: "ai-data",
    assetPath: "/assets/certificates/database_foundations.webp",
    badge: "ORACLE ACADEMY",
    credentialNote: {
      en: "SQL queries, relational database management principles, and structured data manipulation.",
      id: "Kueri SQL, prinsip manajemen basis data relasional, dan manipulasi data terstruktur.",
    },
  },
  {
    id: "it-essentials",
    title: {
      en: "IT Essentials: PC Hardware and Software",
      id: "IT Essentials: PC Hardware and Software",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
    assetPath: "/assets/certificates/it_essentials_pc_hardware_and_software.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Computer hardware architectures, operating system fundamentals, and operational security.",
      id: "Arsitektur perangkat keras, dasar sistem operasi, dan keamanan operasional sistem.",
    },
  },
  {
    id: "iot-digital-transformation",
    title: {
      en: "Introduction to IoT and Digital Transformation",
      id: "Introduction to IoT and Digital Transformation",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
    assetPath: "/assets/certificates/introduction_to_iot_and_digital_transformation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Internet of Things ecosystem, sensor networks, cloud connectivity, and digital transformation.",
      id: "Ekosistem Internet of Things, jaringan sensor, konektivitas cloud, dan transformasi digital.",
    },
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    index: "01",
    code: "PRINCIPLE // EVIDENCE",
    title: {
      en: "Evidence Over Speculation",
      id: "Bukti Nyata Mengungguli Spekulasi",
    },
    description: {
      en: "Architecture decisions, benchmark claims, and engineering choices must be grounded in verified runtime measurements and authentic constraints rather than marketing hype.",
      id: "Keputusan arsitektur, tolok ukur performa, dan pemilihan teknologi harus berlandaskan pengukuran runtime terverifikasi dan batasan nyata daripada klaim berlebihan.",
    },
  },
  {
    index: "02",
    code: "PRINCIPLE // TYPE-SAFETY",
    title: {
      en: "Strict Determinism & Type Safety",
      id: "Determinisme & Keamanan Tipe Ketat",
    },
    description: {
      en: "Static verification, compile-time contracts, and fail-fast validation eliminate runtime bugs before they manifest in user-facing systems.",
      id: "Verifikasi statis, kontrak compile-time, dan validasi fail-fast mengeliminasi potensi galat sebelum berdampak pada pengguna akhir.",
    },
  },
  {
    index: "03",
    code: "PRINCIPLE // SIMPLICITY",
    title: {
      en: "Pragmatic Simplicity & Low Surface Area",
      id: "Kesederhanaan Pragmatis & Minim Dependensi",
    },
    description: {
      en: "Prefer native web platform primitives and Server Components. Avoid unnecessary microservices, excessive client JavaScript, and fragile abstraction layers.",
      id: "Prioritaskan kapabilitas native web dan Server Components. Hindari kompleksitas mikroservis berlebih, client JavaScript membengkak, dan abstraksi rapuh.",
    },
  },
  {
    index: "04",
    code: "PRINCIPLE // ACCESSIBILITY",
    title: {
      en: "Inclusive Semantics & Performance as Baseline",
      id: "Semantik Inklusif & Performa Sebagai Standar",
    },
    description: {
      en: "Fast load times, zero layout shift, logical keyboard navigation, and WCAG AA contrast are baseline engineering requirements, not afterthoughts.",
      id: "Waktu muat cepat, nihil pergeseran tata letak (CLS), navigasi keyboard logis, dan kontras WCAG AA adalah syarat mutlak sistem yang andal.",
    },
  },
];

export const technicalTaxonomyData: TechnicalTaxonomyGroup[] = [
  {
    category: {
      en: "Core Languages & Runtimes",
      id: "Bahasa Pemrograman & Lingkungan Eksekusi",
    },
    items: [
      { name: "TypeScript", context: "Strict typing, Node.js, NestJS & Next.js systems" },
      { name: "JavaScript (ESNext)", context: "Modern browser APIs, Async/Await, Web standards" },
      { name: "PHP 8.x", context: "Modern MVC, Laravel, Enterprise services" },
      { name: "Python 3.x", context: "Machine Learning, Flask APIs, Data wrangling" },
      { name: "Kotlin / Java", context: "Native Android hardware & print framework" },
      { name: "Dart", context: "Flutter mobile applications & asynchronous data streams" },
      { name: "SQL", context: "Relational queries, indexing, schema optimization" },
    ],
  },
  {
    category: {
      en: "Frontend & Interface Engineering",
      id: "Rekayasa Frontend & Antarmuka",
    },
    items: [
      { name: "Next.js (App Router)", context: "React Server Components, SSG, Metadata API" },
      { name: "React 19", context: "Concurrent rendering, Server Actions, Hooks" },
      { name: "Tailwind CSS v4", context: "Modern design tokens, responsive grid layouts" },
      { name: "HTML5 & Semantic Web", context: "WCAG 2.2 AA accessibility, screen readers" },
      { name: "Three.js / Panolens.js", context: "360° interactive panoramic rendering" },
      { name: "Figma", context: "UI/UX wireframing, interactive prototyping, user flows" },
    ],
  },
  {
    category: {
      en: "Backend, API & Systems",
      id: "Backend, API & Sistem",
    },
    items: [
      { name: "NestJS", context: "Modular TypeScript REST APIs, Dependency Injection" },
      { name: "Laravel", context: "Enterprise REST APIs, Eloquent ORM, Auth & Queues" },
      { name: "Flask", context: "Lightweight Python REST inference microservices" },
      { name: "Node.js", context: "Tooling, scripts, and server-side automation" },
      { name: "RESTful Architecture", context: "Stateless contracts, deterministic payloads" },
      { name: "ESC/POS Protocol", context: "Hardware Android Bluetooth/USB thermal printing" },
    ],
  },
  {
    category: {
      en: "Applied Machine Learning & Data",
      id: "Terapan Machine Learning & Data",
    },
    items: [
      { name: "Scikit-Learn", context: "Binary classification models, evaluation pipelines" },
      { name: "Hugging Face Transformers", context: "Wav2Vec2 pretrained speech recognition" },
      { name: "NumPy & Pandas", context: "Data cleaning, feature scaling, matrix operations" },
      { name: "Audio & Video Extraction", context: "FFmpeg pipelines, 16 kHz mono preprocessing" },
      { name: "Model Serialization", context: "Joblib / Pickle deployment into Flask REST APIs" },
    ],
  },
  {
    category: {
      en: "Databases, Infrastructure & QA",
      id: "Basis Data, Infrastruktur & QA",
    },
    items: [
      { name: "MySQL / MariaDB", context: "Relational schema design, transactions, indexing" },
      { name: "Docker & Containers", context: "Multi-container app packaging & isolation" },
      { name: "Linux Ubuntu & VPS", context: "Production hosting, server configuration" },
      { name: "Katalon Studio", context: "Manual and automated regression software testing" },
      { name: "Cisco Networking", context: "CCNA routing, VLANs, switching, network security" },
      { name: "Git & GitHub", context: "Deterministic feature workflows & version control" },
    ],
  },
];
