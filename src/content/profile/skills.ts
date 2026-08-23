import type { Locale } from "@/lib/i18n/config";

export interface OperatingPrinciple {
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

export const coreEngineeringPrinciples: OperatingPrinciple[] = [
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

export const coreTechnicalTaxonomy: TechnicalTaxonomyGroup[] = [
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
