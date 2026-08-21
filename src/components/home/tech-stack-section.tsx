import type { Locale } from "@/lib/i18n/config";

interface TechStackSectionProps {
  locale: Locale;
}

interface CapabilityCategory {
  number: string;
  category: { en: string; id: string };
  description: { en: string; id: string };
  skills: { name: string; tag: string }[];
}

const capabilities: CapabilityCategory[] = [
  {
    number: "01",
    category: {
      en: "Frontend & Client Engineering",
      id: "Frontend & Rekayasa Antarmuka",
    },
    description: {
      en: "Architecting responsive, high-performance web and mobile interfaces with strict type safety and accessible semantic layouts.",
      id: "Membangun antarmuka web dan mobile berkinerja tinggi, responsif, dengan type safety ketat dan tata letak semantik yang aksesibel.",
    },
    skills: [
      { name: "Next.js (App Router)", tag: "Framework" },
      { name: "React 19", tag: "UI Library" },
      { name: "TypeScript", tag: "Language" },
      { name: "Tailwind CSS", tag: "Styling" },
      { name: "Flutter & Dart", tag: "Mobile" },
      { name: "Android SDK", tag: "Mobile" },
      { name: "Three.js / WebGL", tag: "3D & Interactive" },
    ],
  },
  {
    number: "02",
    category: {
      en: "Backend & API Architecture",
      id: "Backend & Arsitektur API",
    },
    description: {
      en: "Engineering robust web backends, secure authentication workflows, role-based authorization, and high-throughput REST APIs.",
      id: "Mengembangkan backend web yang andal, alur autentikasi aman, otorisasi berbasis peran, dan REST API berperforma tinggi.",
    },
    skills: [
      { name: "Laravel (PHP)", tag: "Backend Framework" },
      { name: "Python & Flask", tag: "Microservices / API" },
      { name: "RESTful API Design", tag: "Architecture" },
      { name: "Role-Based Access (RBAC)", tag: "Security" },
      { name: "Node.js / Express", tag: "Runtime" },
      { name: "Microservices Architecture", tag: "Architecture" },
    ],
  },
  {
    number: "03",
    category: {
      en: "Applied AI & Machine Learning",
      id: "AI & Machine Learning Terapan",
    },
    description: {
      en: "Developing predictive classification models, audio feature extraction pipelines, data balancing routines, and containerized inference services.",
      id: "Mengembangkan model klasifikasi prediktif, pemrosesan ekstraksi fitur audio, penanganan data imbalance, dan layanan inferensi terkontainerisasi.",
    },
    skills: [
      { name: "Scikit-learn", tag: "ML Toolkit" },
      { name: "Random Forest & SVM", tag: "Classification" },
      { name: "PyTorch & Audio AI", tag: "Deep Learning" },
      { name: "SMOTE Imbalance Handling", tag: "Data Engineering" },
      { name: "Pandas & NumPy", tag: "Data Analysis" },
      { name: "Flask Inference Serving", tag: "MLOps / Serving" },
    ],
  },
  {
    number: "04",
    category: {
      en: "Database, QA & DevOps",
      id: "Basis Data, QA & Infrastruktur",
    },
    description: {
      en: "Relational database modeling, container deployment on Linux environments, automated testing workflows, and version control hygiene.",
      id: "Pemodelan basis data relasional, deployment kontainer pada Linux Ubuntu, pengujian otomatis, dan manajemen repositori Git.",
    },
    skills: [
      { name: "MySQL", tag: "Relational DB" },
      { name: "PostgreSQL", tag: "Relational DB" },
      { name: "Docker Containerization", tag: "DevOps" },
      { name: "Linux (Ubuntu Server)", tag: "Infrastructure" },
      { name: "Katalon Studio", tag: "QA Automation" },
      { name: "Git & Version Control", tag: "Tooling" },
    ],
  },
];

export function TechStackSection({ locale }: TechStackSectionProps) {
  const isId = locale === "id";

  return (
    <section className="home-tech-section" aria-label="Technical Capabilities">
      <div className="home-tech-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[03 // CAPABILITY MATRIX]</span>
            <span className="section-meta-tag">
              {isId ? "ARSENAL TEKNOLOGI" : "TECHNICAL ARSENAL"}
            </span>
          </div>
          <h2 className="section-title">
            {isId ? "Kapabilitas & Teknologi Rekayasa" : "Technical Stack & Capabilities"}
          </h2>
          <p className="section-subtitle">
            {isId
              ? "Kumpulan bahasa pemrograman, kerangka kerja, platform data, dan metodologi pengujian yang telah tervalidasi pada proyek nyata."
              : "Taxonomy of programming languages, frameworks, data platforms, and testing workflows validated through authentic project implementations."}
          </p>
        </div>

        {/* 2-Column Capability Grid */}
        <div className="capability-grid">
          {capabilities.map((cat) => (
            <div key={cat.number} className="capability-card">
              <div className="capability-card-header">
                <span className="capability-number">[{cat.number}]</span>
                <h3 className="capability-category">{cat.category[locale]}</h3>
              </div>
              <p className="capability-desc">{cat.description[locale]}</p>

              <div className="capability-skills-list">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="capability-skill-chip">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-tag">{skill.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
