import type { BlogPostItem } from "../types";

export const buildingDeterministicFrontendArticle: BlogPostItem = {
  slug: "building-deterministic-frontend-architectures",
  date: "2026-02-18",
  category: {
    en: "Frontend Architecture",
    id: "Arsitektur Frontend",
  },
  readingTime: {
    en: "6 min read",
    id: "6 menit baca",
  },
  featured: true,
  tags: ["Next.js", "TypeScript", "Architecture", "Design Systems"],
  title: {
    en: "Building Deterministic Frontend Architectures for Content-Heavy Portfolios",
    id: "Membangun Arsitektur Frontend Deterministik untuk Portofolio Berbasis Konten",
  },
  description: {
    en: "An engineering deep-dive into creating type-safe, static-first portfolio architectures with zero CMS dependencies and compile-time content validation.",
    id: "Bedah rekayasa arsitektur portofolio static-first yang type-safe tanpa ketergantungan CMS dan dengan validasi konten saat kompilasi.",
  },
  sections: [
    {
      heading: {
        en: "1. The Problem with Generic Portfolio Architectures",
        id: "1. Masalah pada Arsitektur Portofolio Generik",
      },
      paragraphs: {
        en: [
          "Most personal portfolios suffer from one of two architectural extremes: either they are built on fragile, heavyweight Headless CMS setups with bloated runtime dependencies, or they are single-page client apps cluttered with unvalidated JSON blobs and uncontrolled visual fluff.",
          "When presenting complex software engineering and machine learning work, a portfolio requires the exact same rigor as an enterprise documentation system:",
        ],
        id: [
          "Sebagian besar situs portofolio pribadi umumnya terjebak dalam salah satu dari dua ekstrem arsitektur: menggunakan integrasi Headless CMS yang rumit dengan ketergantungan runtime yang membengkak, atau menjadi aplikasi klien satu halaman yang penuh dengan data JSON mentah tanpa validasi dan dekorasi visual yang berlebihan.",
          "Ketika menampilkan rekayasa perangkat lunak dan sistem kecerdasan buatan, portofolio membutuhkan tingkat ketelitian yang setara dengan sistem dokumentasi teknis skala besar:",
        ],
      },
      list: {
        ordered: true,
        items: {
          en: [
            "Deterministic content boundaries: Content must be validated at compile time with fail-fast schemas.",
            "Decoupled presentation models: Raw factual data must remain independent of specific UI layouts.",
            "Zero unnecessary runtime dependencies: Fast Core Web Vitals, pure HTML/CSS rendering where possible, and small client JS bundles.",
          ],
          id: [
            "Batasan konten deterministik: Konten harus divalidasi pada saat kompilasi (compile-time) dengan skema yang tegas (fail-fast).",
            "Model presentasi terpisah: Data faktual mentah harus independen dari tata letak antarmuka tertentu.",
            "Nol dependensi runtime yang tidak perlu: Menjaga Core Web Vitals tetap optimal, mengutamakan rendering HTML/CSS murni, serta meminimalkan ukuran JavaScript klien.",
          ],
        },
      },
    },
    {
      heading: {
        en: "2. Server Components as the Default Boundary",
        id: "2. Server Components sebagai Batasan Utama",
      },
      paragraphs: {
        en: [
          "In modern Next.js architectures, the default mindset must shift from 'interactive by default' to 'static and deterministic by default.'",
          "React Server Components allow us to perform data resolution, typing validation, and layout compilation entirely at build time. No client-side JavaScript is shipped to parse raw data blobs or traverse complex state trees.",
        ],
        id: [
          "Dalam arsitektur Next.js modern, pola pikir utama harus bergeser dari 'interaktif secara default' menjadi 'statis dan deterministik secara default'.",
          "React Server Components memungkinkan resolusi data, validasi tipe, dan kompilasi layout dijalankan sepenuhnya pada saat build. Tidak ada JavaScript di sisi klien yang dikirimkan hanya untuk mem-parsing data mentah.",
        ],
      },
      codeBlock: {
        language: "typescript",
        caption: "Typed static content resolution at build time",
        code: `// All data resolution is executed strictly server-side
export function getProjectBySlug(slug: string): ProjectItem | null {
  return projectsList.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug }))
  );
}`,
      },
    },
    {
      heading: {
        en: "3. Client Boundaries as Leaves, Not Trees",
        id: "3. Batasan Klien Sebagai Daun (Leaves), Bukan Pohon (Trees)",
      },
      paragraphs: {
        en: [
          "Interactive elements—such as category filtering, live search queries, and fullscreen lightbox modals—are isolated into minimal leaf Client Components.",
          "The parent page remains a pure Server Component, streaming structured data down through predictable prop interfaces with zero layout shift.",
        ],
        id: [
          "Elemen interaktif—seperti penyaringan kategori, pencarian langsung (live search), dan modal pembesar gambar (lightbox)—diisolasi ke dalam Client Component kecil pada tingkat daun.",
          "Halaman induk tetap berupa Server Component murni yang mengalirkan data terstruktur melalui antarmuka props yang terprediksi tanpa pergeseran layout.",
        ],
      },
    },
    {
      heading: {
        en: "4. Typography-Driven Editorial Hierarchy",
        id: "4. Hierarki Editorial Berbasis Tipografi",
      },
      paragraphs: {
        en: [
          "A technical portfolio must communicate competence through hierarchy rather than decorative noise. By adopting the SIGNAL / ARCHIVE design direction:",
        ],
        id: [
          "Portofolio teknis harus mengomunikasikan kompetensi melalui hierarki informasi, bukan sekadar dekorasi visual. Melalui pendekatan visual SIGNAL / ARCHIVE:",
        ],
      },
      list: {
        ordered: false,
        items: {
          en: [
            "Monospace Metadata: Timestamps, categories, and technical tags use a crisp monospace font to convey precision.",
            "Editorial Headlines: High-contrast serif accents establish visual rhythm without hurting readability.",
            "Comfortable Line Length: Prose content is strictly constrained between 65–75 characters per line to ensure optimal eye tracking across all viewports.",
          ],
          id: [
            "Metadata Monospace: Penanda waktu, kategori, dan label teknis menggunakan font monospace untuk menunjukkan presisi.",
            "Judul Editorial: Judul utama memanfaatkan aksen serif kontras tinggi untuk menciptakan ritme visual tanpa mengorbankan keterbacaan.",
            "Panjang Baris Nyaman: Panjang baris teks bacaan dibatasi secara ketat antara 65–75 karakter per baris demi kenyamanan membaca di seluruh ukuran layar.",
          ],
        },
      },
    },
    {
      heading: {
        en: "5. Conclusion",
        id: "5. Kesimpulan",
      },
      paragraphs: {
        en: [
          "By treating a personal portfolio as a mission-critical technical artifact—with strict typing, build-time validation, and restrained editorial aesthetics—we produce a digital presence that is fast, resilient, accessible, and authentically representative of professional engineering capabilities.",
        ],
        id: [
          "Dengan memperlakukan portofolio pribadi sebagai artefak teknis penting—dilengkapi tipe data yang ketat, validasi saat build, dan estetika editorial yang terukur—kita menghasilkan kehadiran digital yang cepat, tangguh, aksesibel, dan benar-benar mencerminkan kapabilitas rekayasa profesional.",
        ],
      },
    },
  ],
};
