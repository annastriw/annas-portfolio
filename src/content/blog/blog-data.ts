import type { BlogPostItem } from "./blog-types";

export const blogPostsData: BlogPostItem[] = [
  // --------------------------------------------------------------------------
  // 01. Building Deterministic Frontend Architectures
  // --------------------------------------------------------------------------
  {
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
  return projectsData.find((p) => p.slug === slug) || null;
}

export async function generateStaticParams() {
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
  },

  // --------------------------------------------------------------------------
  // 02. Offline-First Telemetry and Thermal Printing
  // --------------------------------------------------------------------------
  {
    slug: "offline-first-telemetry-thermal-printing",
    date: "2026-01-24",
    category: {
      en: "Systems Engineering",
      id: "Rekayasa Sistem",
    },
    readingTime: {
      en: "5 min read",
      id: "5 menit baca",
    },
    featured: false,
    tags: ["Systems", "IoT", "Offline-First", "WebSockets"],
    title: {
      en: "Architecting Offline-First Telemetry and Thermal Printing Services",
      id: "Merancang Layanan Telemetri Offline-First dan Pencetakan Termal",
    },
    description: {
      en: "Technical considerations and protocols for building reliable local microservices that interface with physical thermal printers under unstable network conditions.",
      id: "Pertimbangan teknis dan protokol dalam membangun layanan mikro lokal yang andal untuk pencetakan termal fisik dalam kondisi jaringan tidak stabil.",
    },
    sections: [
      {
        heading: {
          en: "1. Context & Physical Constraints",
          id: "1. Konteks & Kendala Fisik",
        },
        paragraphs: {
          en: [
            "In distributed point-of-sale, logistics, and field telemetry systems, network connectivity is frequently unstable. Yet, physical receipt printing and hardware command execution cannot afford to silently fail or produce duplicate tickets.",
            "Standard web-to-print architectures that rely on direct browser dialogs fail in unattended or high-throughput environments due to blocking UI threads, driver popups, and a lack of hardware status acknowledgments.",
            "To solve this, we engineered a dedicated local daemon architecture capable of bridging web applications with low-level ESC/POS thermal printers over local network sockets and USB serial buses.",
          ],
          id: [
            "Pada sistem kasir (point-of-sale), logistik, dan telemetri lapangan yang terdistribusi, konektivitas jaringan sering kali mengalami ketidakstabilan. Kendati demikian, pencetakan struk fisik dan eksekusi perintah perangkat keras tidak boleh mengalami kegagalan senyap (silent failure) ataupun mencetak struk ganda.",
            "Arsitektur pencetakan web standar yang mengandalkan dialog pencetakan peramban sering kali tidak cocok untuk lingkungan dengan beban transaksi tinggi karena memblokir antarmuka, memunculkan jendela driver, dan tidak menyediakan umpan balik status perangkat keras yang akurat.",
            "Untuk mengatasi hal ini, kami merancang arsitektur daemon lokal khusus yang menjembatani aplikasi web dengan printer termal ESC/POS melalui soket jaringan lokal dan antarmuka serial USB.",
          ],
        },
      },
      {
        heading: {
          en: "2. Architecture Overview: Local Socket Daemon",
          id: "2. Gambaran Arsitektur: Socket Daemon Lokal",
        },
        paragraphs: {
          en: [
            "Instead of having web clients talk directly to printers, a lightweight background service runs locally on the host machine or gateway appliance.",
          ],
          id: [
            "Alih-alih membiarkan aplikasi peramban berkomunikasi langsung dengan printer, layanan latar belakang (background service) yang ringan dijalankan secara lokal pada perangkat host.",
          ],
        },
        codeBlock: {
          language: "text",
          caption: "Local Socket Daemon & FIFO Hardware Pipeline",
          code: `┌─────────────────┐       WebSocket / IPC       ┌────────────────────────┐
│  Web Application│ ───────────────────────────▶ │ Thermal Printer Daemon │
│   (UI / POS)    │ ◀─────────────────────────── │  (Local Queue Engine)  │
└─────────────────┘       Ack & Status Events   └────────────────────────┘
                                                            │
                                                     Raw ESC/POS Bytes
                                                            ▼
                                                ┌────────────────────────┐
                                                │ Physical Printer (58mm)│
                                                └────────────────────────┘`,
        },
        list: {
          ordered: true,
          items: {
            en: [
              "Persistent WebSocket Bridge: The web client transmits structured JSON job payloads over a local secure socket (ws://127.0.0.1:port).",
              "In-Memory FIFO Job Queue: Print commands are buffered sequentially to prevent concurrent write collisions on the printer's serial interface.",
              "Hardware Health Watchdog: The daemon queries printer status registers (DLE EOT commands) before dispatching print jobs to detect paper-out or cover-open conditions.",
            ],
            id: [
              "Jembatan WebSocket Persisten: Klien web mengirimkan data pekerjaan terstruktur dalam format JSON melalui soket lokal yang aman (ws://127.0.0.1:port).",
              "Antrean FIFO Dalam Memori: Perintah cetak diantrekan secara berurutan untuk mencegah tabrakan data pada komunikasi serial printer.",
              "Pengawas Status Perangkat Keras (Watchdog): Daemon membaca register status printer (perintah DLE EOT) sebelum mengirim perintah cetak untuk mendeteksi kondisi kertas habis atau penutup terbuka.",
            ],
          },
        },
      },
      {
        heading: {
          en: "3. ESC/POS Command Serialization",
          id: "3. Serialisasi Perintah ESC/POS",
        },
        paragraphs: {
          en: [
            "Thermal receipt printers communicate via raw binary ESC/POS byte sequences. Constructing these sequences manually ensures pixel-perfect typographic layout, barcode generation, and automatic paper cutting without browser driver interference.",
          ],
          id: [
            "Printer termal berkomunikasi menggunakan urutan biner standar ESC/POS. Menyusun byte ini secara terprogram memastikan tata letak tipografi yang presisi, pembuatan barcode yang akurat, serta pemotongan kertas otomatis tanpa intervensi driver OS.",
          ],
        },
        codeBlock: {
          language: "typescript",
          caption: "ESC/POS binary command buffer generation",
          code: `// Sample ESC/POS command construction for 58mm receipts
const ESC = 0x1b;
const GS = 0x1d;

const INIT_PRINTER = Buffer.from([ESC, 0x40]);
const ALIGN_CENTER = Buffer.from([ESC, 0x61, 0x01]);
const BOLD_ON      = Buffer.from([ESC, 0x45, 0x01]);
const CUT_PAPER    = Buffer.from([GS, 0x56, 0x41, 0x00]);`,
        },
      },
      {
        heading: {
          en: "4. Handling Offline Resilience & Job Reconciliation",
          id: "4. Ketahanan Offline & Rekonsiliasi Transaksi",
        },
        paragraphs: {
          en: [
            "When the host loses connection to the central cloud server, the local print daemon continues servicing queued transactions locally:",
          ],
          id: [
            "Ketika koneksi ke peladen pusat terputus, daemon pencetakan lokal tetap dapat melayani transaksi yang sedang berjalan secara mandiri:",
          ],
        },
        list: {
          ordered: false,
          items: {
            en: [
              "Local Persistence Buffer: Unacknowledged transactions are written to local SQLite storage or an append-only transaction journal.",
              "Deduplication Tokens: Every job payload carries a unique UUID nonce (jobId). Even if a WebSocket reconnects midway, the daemon rejects duplicate submissions.",
              "Two-Way Status Telemetry: The daemon reports granular execution states (QUEUED, PRINTING, COMPLETED, PAPER_OUT_ERROR) back to the frontend UI in real time.",
            ],
            id: [
              "Penyimpanan Transaksi Lokal: Data yang belum disinkronkan dicatat ke penyimpanan lokal (SQLite atau append-only log).",
              "Token Pencegah Duplikasi: Setiap permintaan cetak memiliki UUID unik (jobId). Jika sambungan WebSocket terhubung kembali di tengah jalan, daemon akan menolak eksekusi ganda.",
              "Umpan Balik Status Dua Arah: Daemon melaporkan status eksekusi secara real-time (QUEUED, PRINTING, COMPLETED, PAPER_OUT_ERROR) kembali ke antarmuka pengguna.",
            ],
          },
        },
      },
      {
        heading: {
          en: "5. Summary",
          id: "5. Kesimpulan",
        },
        paragraphs: {
          en: [
            "Building hardware-interfacing web applications requires shifting failure boundaries away from the user interface. By introducing an autonomous local daemon, deterministic ESC/POS serialization, and strict queue deduplication, we achieve rock-solid physical printing that remains impervious to network latency and intermittent outages.",
          ],
          id: [
            "Membangun aplikasi web yang berinteraksi langsung dengan perangkat keras menuntut pemisahan batasan kegagalan dari antarmuka pengguna. Melalui daemon lokal mandiri, serialisasi perintah ESC/POS yang presisi, dan manajemen antrean yang ketat, pencetakan fisik menjadi sangat tangguh terhadap fluktuasi jaringan.",
          ],
        },
      },
    ],
  },
];

/**
 * Helper to fetch all blog posts deterministically.
 */
export function getAllBlogPostsData(): BlogPostItem[] {
  return [...blogPostsData].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Helper to fetch a single blog post by slug.
 */
export function getBlogPostDataBySlug(slug: string): BlogPostItem | null {
  return blogPostsData.find((p) => p.slug === slug) || null;
}

/**
 * Helper to fetch adjacent blog posts (prev & next).
 */
export function getAdjacentBlogPostsData(slug: string): {
  prev: BlogPostItem | null;
  next: BlogPostItem | null;
} {
  const sorted = getAllBlogPostsData();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/**
 * Helper to get unique blog categories.
 */
export function getAllBlogCategoriesData(locale: "en" | "id"): string[] {
  const categories = new Set<string>();
  for (const post of blogPostsData) {
    categories.add(post.category[locale]);
  }
  return Array.from(categories).sort();
}
