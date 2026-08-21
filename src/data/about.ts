import type {
  CertificateItem,
  EducationItem,
  EngineeringPrinciple,
  TechnicalTaxonomyGroup,
} from "@/types/about";

export const educationData: EducationItem = {
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
  distinction: {
    en: "Best Graduate (Wisudawan Terbaik) — Department of Computer Engineering",
    id: "Wisudawan Terbaik — Departemen Teknik Komputer",
  },
  period: "2020 — 2024",
  location: "Semarang, Central Java, Indonesia",
  highlights: {
    en: [
      "Awarded Best Graduate (Wisudawan Terbaik) distinction for academic excellence, thesis research, and technical rigor.",
      "Specialized in Software Engineering, Applied Machine Learning, Distributed Web Systems, and Computer Networks.",
      "Conducted research and prototype implementations across predictive healthcare models and interactive fullstack systems.",
      "Active contributor in institutional developer initiatives at Faculty of Engineering.",
    ],
    id: [
      "Meraih predikat Wisudawan Terbaik atas prestasi akademik unggul, riset tugas akhir, dan dedikasi rekayasa teknis.",
      "Peminatan pada Rekayasa Perangkat Lunak, Terapan Machine Learning, Sistem Web Terdistribusi, dan Jaringan Komputer.",
      "Melakukan riset dan purwarupa sistem inferensi prediktif bidang kesehatan dan aplikasi fullstack interaktif.",
      "Berkontribusi aktif pada inisiatif pengembangan sistem Tim Developer IT Fakultas Teknik.",
    ],
  },
  certificateAsset: "/assets/certificate/wisudawan_terbaik_tekkom.webp",
};

export const certificatesData: CertificateItem[] = [
  {
    id: "wisudawan-terbaik",
    title: {
      en: "Best Graduate (Wisudawan Terbaik) Department of Computer Engineering",
      id: "Wisudawan Terbaik Departemen Teknik Komputer",
    },
    issuer: "Diponegoro University (Universitas Diponegoro)",
    category: "academic-experience",
    assetPath: "/assets/certificate/wisudawan_terbaik_tekkom.webp",
    badge: "ACADEMIC DISTINCTION",
    credentialNote: {
      en: "Conferred for top academic achievement and engineering excellence upon degree completion.",
      id: "Dianugerahkan atas prestasi akademik tertinggi dan keunggulan rekayasa teknik.",
    },
  },
  {
    id: "sertif-magang-undip",
    title: {
      en: "Developer IT Internship — Faculty of Engineering",
      id: "Sertifikat Magang Developer IT — Fakultas Teknik",
    },
    issuer: "Faculty of Engineering, Diponegoro University",
    category: "academic-experience",
    assetPath: "/assets/certificate/sertif_magang.webp",
    badge: "INTERNSHIP CREDENTIAL",
    credentialNote: {
      en: "Formal completion certificate for UI/UX design, interactive prototyping, and internal systems development.",
      id: "Sertifikat penyelesaian magang untuk perancangan UI/UX, purwarupa interaktif, dan sistem internal.",
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
    assetPath:
      "/assets/certificate/ccna_enterprise_networking_security_and_automation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Advanced routing, network security architectures, virtualization, and network automation APIs.",
      id: "Routing tingkat lanjut, arsitektur keamanan jaringan, virtualisasi, dan otomatisasi jaringan.",
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
    assetPath:
      "/assets/certificate/ccnav7_switching_routing_and_wireless_essentials.webp",
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
    assetPath: "/assets/certificate/ccnav7_introduction_to_networks.webp",
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
    assetPath: "/assets/certificate/hcia_ai_v3_5.webp",
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
    assetPath: "/assets/certificate/database_design.webp",
    badge: "ORACLE ACADEMY",
    credentialNote: {
      en: "Relational modeling, entity-relationship diagrams (ERD), normalization, and schema design.",
      id: "Pemodelan relasional, Entity-Relationship Diagram (ERD), normalisasi, dan perancangan skema.",
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
    assetPath: "/assets/certificate/database_foundations.webp",
    badge: "ORACLE ACADEMY",
    credentialNote: {
      en: "SQL queries, relational database management principles, and data manipulation.",
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
    assetPath:
      "/assets/certificate/it_essentials_pc_hardware_and_software.webp",
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
    assetPath:
      "/assets/certificate/introduction_to_iot_and_digital_transformation.webp",
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
      en: "Architecture decisions, benchmark claims, and engineering choices must be grounded in verified runtime measurements and authentic constraints rather than hype.",
      id: "Keputusan arsitektur, tolok ukur performa, dan pemilihan teknologi harus berlandaskan pengukuran runtime terverifikasi dan batasan nyata.",
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
      en: "Inclusive Semantics & Performance as Default",
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
      { name: "TypeScript", context: "Strict typing, Node.js & Next.js systems" },
      { name: "JavaScript (ESNext)", context: "Modern browser APIs, Async/Await" },
      { name: "PHP 8.x", context: "Modern MVC, Laravel, Enterprise services" },
      { name: "Python 3.x", context: "Machine Learning, Flask APIs, Data wrangling" },
      { name: "Kotlin / Java", context: "Native Android application development" },
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
      { name: "Laravel", context: "Enterprise REST APIs, Eloquent ORM, Auth & Queues" },
      { name: "Node.js", context: "Lightweight services, tooling, build automation" },
      { name: "Flask", context: "Lightweight Python REST inference microservices" },
      { name: "RESTful Architecture", context: "Stateless contracts, deterministic payloads" },
      { name: "Thermal Printer ESC/POS", context: "Hardware Android Bluetooth/USB printing" },
    ],
  },
  {
    category: {
      en: "Applied Machine Learning & Data",
      id: "Terapan Machine Learning & Data",
    },
    items: [
      { name: "Scikit-Learn", context: "Binary classification models, evaluation pipelines" },
      { name: "NumPy & Pandas", context: "Data cleaning, feature scaling, matrix operations" },
      { name: "Audio Feature Extraction", context: "Spectrogram analysis, Speech-to-Text pipelines" },
      { name: "Model Serialization", context: "Joblib / Pickle deployment into production APIs" },
    ],
  },
  {
    category: {
      en: "Databases, Networking & Infrastructure",
      id: "Basis Data, Jaringan & Infrastruktur",
    },
    items: [
      { name: "MySQL / MariaDB", context: "Relational schema design, transactions, indexing" },
      { name: "SQLite", context: "Embedded client & edge storage solutions" },
      { name: "Cisco Networking", context: "CCNA routing, VLANs, switching, network security" },
      { name: "Git & Version Control", context: "Feature workflows, deterministic history" },
      { name: "Vercel / Cloud Edge", context: "Static SSG deployment, edge performance" },
    ],
  },
];
