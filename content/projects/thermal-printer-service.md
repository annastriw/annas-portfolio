---
judul: "Thermal Printer Service"
slug: "thermal-printer-service"
jenis: "Project"
jenis_project: "Android Native Application / Printing Utility / Hardware Integration"
peran: "Android Developer"
platform: "Android"
bahasa_utama: "Kotlin"
status: "Completed"
asset_path: "assets/projects/thermal-printer-service/"
---

# Thermal Printer Service

## Project Snapshot

- **Nama Project:** Thermal Printer Service
- **Jenis Project:** Android Native Application / Printing Utility / Hardware Integration
- **Peran:** Android Developer
- **Platform:** Android
- **Bahasa Utama:** Kotlin
- **Core Stack:** Android SDK, Android Print Framework, Bluetooth RFCOMM/SPP, ESC/POS, PdfRenderer, SharedPreferences, RecyclerView
- **Fokus:** Android Printing, Bluetooth Integration, ESC/POS, PDF Rasterization, Hardware Integration

## Ringkasan Project

Thermal Printer Service merupakan aplikasi Android native berbasis Kotlin yang dikembangkan untuk mengintegrasikan Android Print Framework dengan thermal printer Bluetooth berbasis ESC/POS.

Project membangun workflow printing end-to-end mulai dari dokumen yang dikirim melalui Android Print Framework, pembuatan temporary PDF, proses rasterization menjadi bitmap, konversi menjadi format monochrome ESC/POS, pengiriman melalui Bluetooth RFCOMM/SPP, hingga pencetakan pada thermal printer.

Sistem mendukung konfigurasi printer thermal berukuran 58 mm dan 80 mm pada 203 DPI serta menyediakan pengelolaan multiple printer profiles, retry koneksi Bluetooth, calibration, background processing, cancellation, dan error handling.

## Peran

Android Developer.

## Tanggung Jawab

- Mengembangkan aplikasi Android native menggunakan Kotlin.
- Mengintegrasikan Android Print Framework.
- Mengembangkan custom Android PrintService.
- Mengembangkan PrinterDiscoverySession.
- Mengembangkan pipeline dokumen Android menuju thermal printer.
- Mengembangkan PDF-to-raster processing.
- Mengembangkan bitmap processing.
- Mengembangkan ESC/POS raster encoding.
- Mengintegrasikan Bluetooth RFCOMM/SPP.
- Mengembangkan Bluetooth connection management.
- Mengimplementasikan permission handling untuk Android 12+.
- Mengembangkan retry dan backoff pada koneksi Bluetooth.
- Mengembangkan socket cleanup.
- Mengembangkan cancellable background print job.
- Memisahkan proses printing dari Android main thread.
- Mengembangkan multiple printer profile management.
- Mengembangkan halaman pengelolaan printer profile.
- Mengimplementasikan printer calibration.
- Mengimplementasikan error handling.
- Menyusun modular architecture untuk komponen utama aplikasi.

## Tujuan Project

Project dikembangkan untuk menyediakan mekanisme printing dari workflow Android standar menuju thermal printer Bluetooth ESC/POS.

Sistem memungkinkan dokumen yang berasal dari Android Print Framework diproses dan diteruskan menuju thermal printer melalui pipeline yang terstruktur.

## End-to-End Print Pipeline

Alur utama printing:

Android Document
→ Android Print Framework
→ Temporary PDF
→ PDF Rendering
→ Bitmap Rasterization
→ Image Processing
→ Monochrome Conversion
→ ESC/POS Raster Encoding
→ Bluetooth RFCOMM/SPP
→ Thermal Printer

Pipeline tersebut menangani proses dari dokumen Android hingga data siap dikirim menuju printer.

## Android Print Framework

Project mengintegrasikan thermal printer dengan Android Print Framework.

Komponen yang dikembangkan meliputi:

- Custom Android PrintService.
- PrinterDiscoverySession.

Integrasi ini memungkinkan thermal printer muncul sebagai bagian dari system printing workflow Android.

## Android PrintService

Custom PrintService digunakan untuk menerima print job dari Android Print Framework.

Print job kemudian diteruskan ke pipeline internal aplikasi untuk diproses menjadi format yang sesuai dengan thermal printer.

## Printer Discovery

PrinterDiscoverySession digunakan sebagai bagian dari integrasi printer dengan Android printing system.

Komponen ini memungkinkan printer yang dikelola aplikasi tersedia pada workflow printing Android.

## PDF Processing

Dokumen dari Android Print Framework diproses menjadi temporary PDF sebelum memasuki tahap rasterization.

PDF kemudian dirender menggunakan:

`PdfRenderer`

Proses ini mengubah halaman PDF menjadi bitmap yang selanjutnya diproses untuk kebutuhan thermal printing.

## PDF-to-Raster Processing

Tahapan pemrosesan raster meliputi:

- PDF rendering.
- Bitmap generation.
- Whitespace cropping.
- Scaling.
- Centering.
- Horizontal offset compensation.
- Vertical padding.
- Monochrome conversion.
- ESC/POS raster preparation.

Proses tersebut digunakan untuk menyesuaikan dokumen dengan karakteristik area cetak thermal printer.

## Whitespace Cropping

Whitespace cropping digunakan untuk mengurangi area kosong yang tidak diperlukan pada hasil rendering dokumen.

Tahap ini dilakukan sebelum bitmap disesuaikan dengan printable width printer.

## Scaling

Bitmap dapat disesuaikan menggunakan scaling agar ukuran hasil cetak sesuai dengan konfigurasi printer.

Scale menjadi salah satu atribut yang dapat disimpan pada printer profile.

## Alignment dan Calibration

Project menyediakan beberapa mekanisme untuk membantu menyesuaikan posisi hasil cetak.

Konfigurasi meliputi:

- Centering.
- Horizontal offset compensation.
- Bottom padding.
- Scale.

Pengaturan tersebut disimpan pada masing-masing printer profile.

## Paper Configuration

Sistem mendukung dua konfigurasi ukuran thermal printer:

### 58 mm

- Paper size: 58 mm.
- Resolution configuration: 203 DPI.
- Printable width: 432 dots.

### 80 mm

- Paper size: 80 mm.
- Resolution configuration: 203 DPI.
- Printable width: 576 dots.

## ESC/POS

Thermal Printer Service menggunakan ESC/POS sebagai format command dan data untuk thermal printer.

Implementasi mencakup:

- Monochrome raster processing.
- 24-dot double-density raster printing.
- Command generation.
- Raster data transmission.

## Raster Processing

Bitmap hasil PDF rendering diproses menjadi format raster yang dapat diterima thermal printer.

Konfigurasi yang terdokumentasi:

- 24-dot double-density ESC/POS raster processing.

Data raster kemudian dikirim melalui Bluetooth secara bertahap.

## Chunked Bluetooth Transmission

Data raster dikirim menggunakan chunked transmission.

Ukuran maksimum setiap write:

`1.024 bytes`

Pendekatan ini diterapkan pada proses transfer data melalui koneksi Bluetooth.

## Bluetooth Integration

Komunikasi dengan thermal printer dilakukan melalui:

- Bluetooth RFCOMM.
- Serial Port Profile / SPP.

Bluetooth digunakan sebagai media komunikasi antara perangkat Android dan thermal printer.

## Bluetooth Connection Management

Connection management menangani beberapa aspek koneksi printer:

- Pemeriksaan dukungan Bluetooth.
- Pemeriksaan status Bluetooth.
- Runtime permission.
- Android 12+ permission handling.
- Bluetooth socket connection.
- Retry.
- Backoff.
- Socket cleanup.
- Connection failure handling.

## Bluetooth Retry

Sistem menerapkan empat kali connection attempt.

Backoff yang digunakan:

1. 0 ms
2. 200 ms
3. 500 ms
4. 1.000 ms

Retry diterapkan ketika koneksi dengan thermal printer belum berhasil.

## Socket Cleanup

Bluetooth socket dibersihkan ketika koneksi selesai atau ketika terjadi kondisi error.

Socket cleanup menjadi bagian dari connection lifecycle management.

## Android 12+ Permission Handling

Project menangani permission Bluetooth yang dibutuhkan pada Android 12 dan versi setelahnya.

Permission handling digunakan sebelum aplikasi mencoba berkomunikasi dengan perangkat Bluetooth.

## Background Processing

Proses printing dijalankan pada background thread agar pekerjaan berat tidak dilakukan pada Android main thread.

Project menggunakan:

- Single-thread executor.
- ExecutorService.

Terdapat satu dedicated single-thread executor untuk melakukan serialisasi print jobs.

## Cancellable Print Job

Print job dapat dibatalkan selama proses berlangsung.

Implementasi menggunakan:

- CancellationToken.
- Background task.
- Single-thread executor.

Cancellation digunakan agar proses printing dapat dihentikan ketika print job dibatalkan.

## Printer Profile Management

Aplikasi mendukung multiple printer profiles.

Printer profile disimpan menggunakan:

- SharedPreferences.
- JSON.

Profile digunakan untuk menyimpan konfigurasi printer yang berbeda.

## Printer Profile Attributes

Terdapat delapan atribut utama pada printer profile:

1. `id`
2. `name`
3. `btAddress`
4. `paperMm`
5. `scale`
6. `autoCut`
7. `horizontalOffsetMm`
8. `bottomPaddingMm`

Setiap profile dapat memiliki konfigurasi printing dan perangkat Bluetooth yang berbeda.

## Printer Profile UI

Halaman pengelolaan printer profile dikembangkan menggunakan RecyclerView.

Fungsi yang tersedia meliputi:

- Menambahkan printer profile.
- Mengedit printer profile.
- Menghapus printer profile.
- Memilih active profile.
- Menampilkan konfigurasi printer.

## Active Printer Profile

Sistem menggunakan active profile untuk menentukan konfigurasi printer yang digunakan ketika menjalankan print job.

Profile dapat menyimpan:

- Bluetooth address.
- Paper size.
- Scale.
- Auto-cut.
- Horizontal offset.
- Bottom padding.

## Persistence

Konfigurasi printer disimpan secara lokal menggunakan:

- SharedPreferences.
- JSON.

Persistence memungkinkan konfigurasi printer tetap tersedia setelah aplikasi ditutup dan dibuka kembali.

## RecyclerView

RecyclerView digunakan untuk menampilkan dan mengelola daftar printer profile.

Fungsi yang berkaitan:

- Menampilkan daftar profile.
- Menampilkan konfigurasi.
- Pemilihan active profile.
- Edit.
- Delete.
- Add profile.

## Error Handling

Project memiliki error handling untuk beberapa kondisi yang terdokumentasi.

### Bluetooth Tidak Didukung

Sistem menangani kondisi ketika perangkat Android tidak mendukung Bluetooth.

### Bluetooth Tidak Aktif

Sistem menangani kondisi ketika Bluetooth dalam keadaan mati.

### Permission Belum Diberikan

Sistem menangani kondisi ketika permission Bluetooth belum tersedia.

### Active Profile Tidak Tersedia

Sistem menangani kondisi ketika belum terdapat active printer profile.

### Connection Failure

Sistem menangani kegagalan koneksi dengan thermal printer.

### Dokumen Tidak Tersedia

Sistem menangani kondisi ketika dokumen yang akan dicetak tidak tersedia.

### Print Job Dibatalkan

Sistem menangani pembatalan print job.

## Modular Architecture

Project menggunakan pemisahan tanggung jawab antar komponen.

Area utama yang dipisahkan meliputi:

- Bluetooth connection.
- ESC/POS commands.
- Rasterization.
- PDF rendering.
- Print-job pipeline.
- Printer discovery.
- Persistence.
- Printer profile UI.

Pemisahan tersebut digunakan untuk mengorganisasi tanggung jawab teknis di dalam aplikasi.

## Core Development Scope

### Android Printing

- Android Print Framework.
- Custom PrintService.
- PrinterDiscoverySession.

### Document Processing

- Temporary PDF.
- PdfRenderer.
- Bitmap Processing.
- Whitespace Cropping.
- Scaling.
- Centering.
- Horizontal Offset.
- Vertical Padding.
- Monochrome Conversion.

### Thermal Printing

- ESC/POS.
- 24-dot double-density raster.
- 58 mm.
- 80 mm.
- 203 DPI.

### Bluetooth

- RFCOMM.
- SPP.
- Runtime Permission.
- Android 12+ Permission Handling.
- Retry.
- Backoff.
- Socket Cleanup.
- Chunked Transmission.

### Background Processing

- ExecutorService.
- Single-thread Executor.
- CancellationToken.
- Cancellable Print Job.

### Printer Management

- Multiple Printer Profiles.
- SharedPreferences.
- JSON.
- RecyclerView.
- Active Profile.
- Calibration.

### Error Handling

- Bluetooth unavailable.
- Bluetooth disabled.
- Missing permission.
- Missing active profile.
- Connection failure.
- Missing document.
- Cancelled print job.

## Alur Teknis Keseluruhan

Android Print Framework
→ Custom PrintService
→ Temporary PDF
→ PdfRenderer
→ Bitmap
→ Whitespace Cropping
→ Scaling
→ Alignment / Calibration
→ Monochrome Conversion
→ ESC/POS Raster
→ Chunked Transmission
→ Bluetooth RFCOMM/SPP
→ Thermal Printer

## Teknologi yang Digunakan

### Programming

- Kotlin

### Platform

- Android
- Android SDK

### Android Printing

- Android Print Framework
- PrintService
- PrinterDiscoverySession

### Document & Image Processing

- PdfRenderer
- Bitmap Processing
- File I/O
- Rasterization
- Monochrome Conversion

### Printer Protocol

- ESC/POS
- 24-dot Double-Density Raster

### Bluetooth

- Bluetooth RFCOMM
- Bluetooth SPP
- Bluetooth Socket
- Runtime Permissions

### Local Storage

- SharedPreferences
- JSON

### User Interface

- RecyclerView

### Background Processing

- Multithreading
- ExecutorService
- Single-thread Executor
- CancellationToken

### Software Engineering

- Hardware Integration
- Error Handling
- Modular Architecture

## Angka Teknis yang Aman Digunakan

### Paper Configuration

- Paper configurations: 2
- Ukuran: 58 mm dan 80 mm
- Resolution configuration: 203 DPI
- Printable width 58 mm: 432 dots
- Printable width 80 mm: 576 dots

### ESC/POS

- Raster processing: 24-dot double-density
- Maximum raster write chunk: 1.024 bytes

### Bluetooth

- Connection attempts: 4
- Backoff: 0 ms
- Backoff: 200 ms
- Backoff: 500 ms
- Backoff: 1.000 ms

### Printer Profile

- Atribut utama profile: 8
- id
- name
- btAddress
- paperMm
- scale
- autoCut
- horizontalOffsetMm
- bottomPaddingMm

### Background Processing

- Dedicated single-thread executor: 1

## Kompetensi yang Berkaitan

- Kotlin
- Android
- Android SDK
- Android Print Framework
- PrintService
- PrinterDiscoverySession
- Bluetooth RFCOMM
- Bluetooth SPP
- ESC/POS
- PdfRenderer
- Bitmap Processing
- Rasterization
- SharedPreferences
- JSON
- RecyclerView
- Multithreading
- ExecutorService
- Runtime Permissions
- File I/O
- Hardware Integration
- Error Handling
- Modular Architecture
- Bluetooth Integration
- Printer Integration
- Background Processing

## Asset Project

Path asset:

assets/projects/thermal-printer-service/

Asset yang tersedia:

- TPS-1.webp
- TPS-2.webp
- TPS-3.webp
- TPS-4.webp
- TPS-5.webp
- TPS-6.webp
- TPS-logo.webp
- TPS-video.webm

Asset di atas merupakan data visual dan media mentah project.

`TPS-video.webm` merupakan asset video yang tersedia untuk project ini.

`TPS-logo.webp` merupakan asset logo yang tersedia untuk project ini.

Pemilihan cover, penggunaan logo, urutan screenshot, penggunaan video, caption, alt text, layout, autoplay behavior, animasi, dan presentasi visual tidak ditentukan dalam file data ini.

Coding agent menentukan penggunaan asset berdasarkan desain dan kebutuhan implementasi website.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan berdasarkan implementasi:

- Android native application.
- Kotlin.
- Android PrintService.
- Android Print Framework.
- Bluetooth RFCOMM/SPP.
- ESC/POS.
- PDF-to-raster processing.
- Dukungan konfigurasi 58 mm dan 80 mm.
- Konfigurasi 203 DPI.
- 432 dots untuk 58 mm.
- 576 dots untuk 80 mm.
- 24-dot double-density raster processing.
- 1.024-byte chunked transmission.
- 4-step Bluetooth retry/backoff.
- Android 12+ permission handling.
- Socket cleanup.
- Cancellable background print jobs.
- Multiple printer profiles.
- SharedPreferences dan JSON.
- Calibration.
- Error handling.

Jangan membuat klaim mengenai:

- Peningkatan kecepatan printing dalam persentase tertentu.
- 99% print success rate.
- Persentase peningkatan stabilitas.
- Persentase penurunan kegagalan printing.
- Kompatibilitas dengan seluruh thermal printer.
- Dukungan universal semua vendor printer.
- Benchmark performa yang belum dilakukan.
- Compatibility rate yang belum diuji.

kecuali tersedia benchmark atau compatibility testing terpisah yang mendukung klaim tersebut.