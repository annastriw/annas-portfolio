---
judul: "UKG System"
slug: "ukg-system"
jenis_project: "Enterprise Resource Planning (ERP) Web Application"
client: "CV Universal Kharisma Globalindo"
role: "Fullstack Developer"
periode: "Januari 2026 - Maret 2026"
status: "Live Production"
live_domain: "https://ukgsystem.com"
asset_path: "assets/projects/ukg-system/"
---

# UKG System

## Project Snapshot

- **Nama Project:** UKG System
- **Jenis Project:** Enterprise Resource Planning (ERP) Web Application
- **Client:** CV Universal Kharisma Globalindo
- **Role:** Fullstack Developer
- **Periode:** Januari 2026 - Maret 2026
- **Status:** Live production system dan masih digunakan untuk operasional bisnis
- **Live Domain:** https://ukgsystem.com
- **Quality Assurance:** Katalon Studio
- **Testing:** Manual Testing dan Automation Testing
- **Core Stack:** Figma, Next.js, NestJS, REST API, Katalon Studio, VPS Linux Ubuntu

## Ringkasan Project

UKG System merupakan aplikasi Enterprise Resource Planning (ERP) berbasis web yang dikembangkan untuk mendukung operasional CV Universal Kharisma Globalindo dalam satu platform terintegrasi dan multi-cabang.

Project dikerjakan secara end-to-end sebagai Fullstack Developer, mulai dari analisis kebutuhan, perancangan UI/UX menggunakan Figma, frontend development menggunakan Next.js, backend development menggunakan NestJS, pengembangan REST API dan business logic, Quality Assurance menggunakan Katalon Studio, hingga deployment production pada VPS Linux Ubuntu.

Sistem memiliki dua role utama, yaitu Owner dan Karyawan, dengan hak akses serta cakupan data yang disesuaikan dengan kebutuhan operasional masing-masing.

Periode pengembangan utama berlangsung selama Januari hingga Maret 2026. Setelah go-live, sistem tetap digunakan untuk mendukung operasional bisnis.

## Tanggung Jawab

- Melakukan analisis kebutuhan sistem dan alur operasional bisnis.
- Merancang UI/UX aplikasi menggunakan Figma.
- Mengembangkan frontend menggunakan Next.js.
- Mengembangkan backend menggunakan NestJS.
- Mengembangkan REST API.
- Mengimplementasikan business logic.
- Mengintegrasikan fungsi dan workflow antar modul.
- Mengembangkan sistem multi-role untuk Owner dan Karyawan.
- Mengembangkan sistem operasional multi-cabang.
- Melakukan Manual Testing menggunakan Katalon Studio.
- Melakukan Automation Testing menggunakan Katalon Studio.
- Memvalidasi alur utama sistem dan hak akses pengguna.
- Menyiapkan environment production.
- Melakukan deployment pada VPS Linux Ubuntu.
- Mengonfigurasi domain production.
- Melakukan go-live sistem.

## Role Pengguna

### Owner

Owner memiliki cakupan akses yang lebih luas untuk mengelola dan memonitor aktivitas operasional bisnis lintas cabang.

### Karyawan

Karyawan memiliki akses yang disesuaikan dengan kebutuhan aktivitas operasional masing-masing.

## Modul Utama

UKG System memiliki delapan kelompok modul utama.

### 1. User & Role Management

Cakupan fitur:

- Login
- Role Owner
- Role Karyawan
- Account management
- Profile management
- Password management
- Role-based access control

### 2. Branch & Attendance

Cakupan fitur:

- Data cabang
- Presensi karyawan
- Monitoring presensi lintas cabang
- Pengelolaan data berdasarkan cabang
- Export data

### 3. Inventory & Stock

Cakupan fitur:

- Master barang
- Stok per cabang
- Barang masuk
- Barang keluar
- Approval barang masuk
- Laporan pergerakan stok

Data inventory dan stok dikelola berdasarkan masing-masing cabang.

### 4. Stock Order

Cakupan fitur:

- Pengajuan kebutuhan stok oleh Karyawan
- Approval pengajuan oleh Owner
- Workflow kebutuhan stok antar cabang

### 5. Store Operations

Cakupan fitur:

- Pencatatan aktivitas operasional
- Pencatatan biaya operasional
- Data operasional berdasarkan cabang
- Filter berdasarkan periode
- Laporan operasional
- Export data
- Kontrol akses penghapusan data

### 6. Cashier & Sales

Cakupan fitur:

- Transaksi kasir
- Detail transaksi
- Nota
- Cetak nota
- Daftar transaksi
- Integrasi transaksi dengan stok
- Pembatalan transaksi
- Pengembalian stok ketika transaksi dibatalkan

### 7. Reports & Finance

Cakupan fitur:

- Laporan penjualan
- Rekap keuangan bulanan
- Laporan berdasarkan cabang
- Filter berdasarkan periode

### 8. Dashboard & Analytics

Informasi yang tersedia meliputi:

- Best seller
- Low stock
- Slow-moving products
- Omzet
- Operasional
- Statistik penjualan

## Integrasi Sistem

Backend UKG System dikembangkan menggunakan NestJS dengan pendekatan REST API.

Business logic digunakan untuk menghubungkan berbagai modul seperti:

- Penjualan
- Inventory
- Stock approval
- Stock order
- Operasional
- Reporting

Salah satu integrasi utama terdapat pada hubungan antara transaksi penjualan dan inventory.

Ketika transaksi dilakukan, perubahan transaksi ikut memengaruhi data stok.

Ketika transaksi dibatalkan, sistem menjalankan proses pengembalian stok sesuai workflow yang telah diterapkan.

## Quality Assurance

Quality Assurance dilakukan menggunakan Katalon Studio.

Pendekatan testing yang digunakan:

- Manual Testing
- Automation Testing

Pengujian digunakan untuk memvalidasi:

- Alur utama sistem
- Hak akses pengguna
- Workflow berdasarkan role
- Integrasi fungsi antar modul
- Proses bisnis utama sebelum deployment production

## Deployment

UKG System di-deploy pada VPS berbasis Linux Ubuntu.

Proses deployment mencakup:

- Penyiapan environment production
- Konfigurasi aplikasi pada server
- Konfigurasi domain
- Go-live production

Domain production:

https://ukgsystem.com

Setelah periode pengembangan utama selesai, sistem tetap digunakan untuk mendukung operasional bisnis.

## Teknologi yang Digunakan

### UI/UX

- Figma
- UI/UX Design

### Frontend

- Next.js
- React

### Backend

- NestJS
- REST API
- Business Logic
- System Integration

### Quality Assurance

- Katalon Studio
- Manual Testing
- Automation Testing

### Infrastructure

- Linux
- Ubuntu
- VPS
- Production Deployment

## Angka Teknis yang Aman Digunakan

- Periode pengembangan utama: 3 bulan
- Periode: Januari - Maret 2026
- Role utama: 2
- Role: Owner dan Karyawan
- Kelompok modul utama: 8
- Sistem: Multi-cabang
- Production web system: 1
- Quality Assurance tool utama: Katalon Studio
- Pendekatan testing: 2
- Testing: Manual Testing dan Automation Testing

## Alur Delivery

UI/UX Design
→ Frontend Development
→ Backend / REST API Development
→ Quality Assurance
→ Production Deployment

## Kompetensi yang Berkaitan

- Figma
- UI/UX Design
- Next.js
- React
- NestJS
- REST API
- Fullstack Development
- Frontend Development
- Backend Development
- Enterprise Resource Planning
- Role-Based Access Control
- Multi-Branch System
- Inventory Management
- Stock Management
- Approval Workflow
- Point of Sale
- Reporting
- Dashboard Analytics
- Quality Assurance
- Katalon Studio
- Manual Testing
- Automation Testing
- Software Testing
- Test Automation
- Linux
- Ubuntu
- VPS
- Production Deployment
- System Integration
- Business Logic
- Web Application

## Asset Project

Path asset:

assets/projects/ukg-system/

Asset yang tersedia:

- UKG-1.webp
- UKG-2.webp
- UKG-3.webp
- UKG-4.webp
- UKG-5.webp
- UKG-6.webp
- UKG-7.webp
- UKG-8.webp
- UKG-9.webp

Asset di atas merupakan data visual mentah project.

Pemilihan cover, urutan gambar, caption, alt text, layout gallery, penempatan gambar, animasi, dan presentasi visual tidak ditentukan pada file data ini.

Keputusan tersebut dilakukan pada tahap desain dan implementasi website.

## Link Project

### Production

https://ukgsystem.com

### GitHub Repository

Belum tersedia pada data sumber.

## Batasan Klaim

Klaim Quality Assurance yang aman digunakan:

- Katalon Studio
- Manual Testing
- Automation Testing

Jangan membuat klaim mengenai hal berikut apabila belum tersedia data pengukuran:

- Test coverage
- Pass rate
- Persentase peningkatan efisiensi
- Persentase pengurangan error
- Persentase peningkatan performa
- Persentase dampak bisnis
- Angka atau metrik lain yang tidak terdokumentasi

Periode project yang digunakan adalah Januari hingga Maret 2026.