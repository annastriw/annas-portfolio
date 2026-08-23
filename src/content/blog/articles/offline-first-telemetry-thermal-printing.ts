import type { BlogPostItem } from "../types";

export const offlineFirstTelemetryArticle: BlogPostItem = {
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
};
