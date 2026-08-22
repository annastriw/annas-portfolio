---
title: "Merancang Layanan Telemetri Offline-First dan Pencetakan Termal"
slug: "offline-first-telemetry-thermal-printing"
date: "2026-01-24"
category: "Systems Engineering"
description: "Pertimbangan teknis dan protokol dalam membangun layanan mikro lokal yang andal untuk pencetakan termal fisik dalam kondisi jaringan tidak stabil."
tags:
  - "Systems"
  - "IoT"
  - "Offline-First"
  - "WebSockets"
reading_time: "5 menit baca"
featured: false
---

## 1. Konteks & Kendala Fisik

Pada sistem kasir (*point-of-sale*), logistik, dan telemetri lapangan yang terdistribusi, konektivitas jaringan sering kali mengalami ketidakstabilan. Kendati demikian, pencetakan struk fisik dan eksekusi perintah perangkat keras tidak boleh mengalami kegagalan senyap (*silent failure*) ataupun mencetak struk ganda.

Arsitektur pencetakan web standar yang mengandalkan dialog pencetakan peramban (*browser print dialog*) sering kali tidak cocok untuk lingkungan dengan beban transaksi tinggi karena memblokir antarmuka, memunculkan jendela *driver*, dan tidak menyediakan umpan balik status perangkat keras yang akurat.

Untuk mengatasi hal ini, kami merancang arsitektur *daemon* lokal khusus yang menjembatani aplikasi web dengan printer termal ESC/POS melalui soket jaringan lokal dan antarmuka serial USB.

---

## 2. Gambaran Arsitektur: Socket Daemon Lokal

Alih-alih membiarkan aplikasi peramban berkomunikasi langsung dengan printer, layanan latar belakang (*background service*) yang ringan dijalankan secara lokal pada perangkat *host*.

```text
┌─────────────────┐       WebSocket / IPC       ┌────────────────────────┐
│  Aplikasi Web   │ ───────────────────────────▶ │ Thermal Printer Daemon │
│  (UI / Kasir)   │ ◀─────────────────────────── │  (Antrean & Eksekusi)  │
└─────────────────┘      Konfirmasi & Status    └────────────────────────┘
                                                            │
                                                     Byte Biner ESC/POS
                                                            ▼
                                                ┌────────────────────────┐
                                                │  Printer Fisik (58mm)  │
                                                └────────────────────────┘
```

Komponen arsitektur utama:

1. **Jembatan WebSocket Persisten**: Klien web mengirimkan data pekerjaan terstruktur dalam format JSON melalui soket lokal yang aman (`ws://127.0.0.1:port`).
2. **Antrean FIFO Dalam Memori**: Perintah cetak diantrekan secara berurutan untuk mencegah tabrakan data (*write collision*) pada komunikasi serial printer.
3. **Pengawas Status Perangkat Keras (*Watchdog*)**: *Daemon* membaca register status printer (perintah `DLE EOT`) sebelum mengirim perintah cetak untuk mendeteksi kondisi kertas habis (*paper-out*) atau penutup terbuka.

---

## 3. Serialisasi Perintah ESC/POS

Printer termal berkomunikasi menggunakan urutan biner standar ESC/POS. Menyusun byte ini secara terprogram memastikan tata letak tipografi yang presisi, pembuatan barcode yang akurat, serta pemotongan kertas otomatis tanpa intervensi *driver* OS.

```typescript
// Contoh konstruksi perintah ESC/POS untuk struk 58mm
const ESC = 0x1b;
const GS = 0x1d;

const INISIALISASI = Buffer.from([ESC, 0x40]);
const RATA_TENGAH   = Buffer.from([ESC, 0x61, 0x01]);
const TEKS_TEBAL    = Buffer.from([ESC, 0x45, 0x01]);
const POTONG_KERTAS = Buffer.from([GS, 0x56, 0x41, 0x00]);
```

### Format Teks dan Batasan Lebar

- **Batasan Lebar**: Printer 58mm umumnya menampung 32 karakter standar per baris (Font A) atau 42 karakter (Font B).
- **Normalisasi Karakter**: Karakter khusus dan string UTF-8 harus dikonversi ke *code page* yang sesuai (seperti PC437 atau WPC1252) untuk mencegah teks tercetak rusak (*garbled*).

---

## 4. Ketahanan Offline & Rekonsiliasi Transaksi

Ketika koneksi ke peladen pusat terputus, *daemon* pencetakan lokal tetap dapat melayani transaksi yang sedang berjalan secara mandiri:

- **Penyimpanan Transaksi Lokal**: Data yang belum disinkronkan dicatat ke penyimpanan lokal (SQLite atau *append-only log*).
- **Token Pencegah Duplikasi (*Deduplication Nonce*)**: Setiap permintaan cetak memiliki UUID unik (`jobId`). Jika sambungan WebSocket terhubung kembali di tengah jalan, *daemon* akan menolak eksekusi ganda.
- **Umpan Balik Status Dua Arah**: *Daemon* melaporkan status eksekusi secara *real-time* (`QUEUED`, `PRINTING`, `COMPLETED`, `PAPER_OUT_ERROR`) kembali ke antarmuka pengguna.

---

## 5. Kesimpulan

Membangun aplikasi web yang berinteraksi langsung dengan perangkat keras menuntut pemisahan batasan kegagalan dari antarmuka pengguna. Melalui *daemon* lokal mandiri, serialisasi perintah ESC/POS yang presisi, dan manajemen antrean yang ketat, pencetakan fisik menjadi sangat tangguh terhadap fluktuasi jaringan.
