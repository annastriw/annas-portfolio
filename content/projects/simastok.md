---
judul: "SIMASTOK SHR Jaya Motor"
slug: "simastok"
jenis: "Project"
jenis_project: "Fullstack Web Application / Inventory Management System"
peran: "Fullstack Developer"
status: "Production Deployment"
asset_path: "assets/projects/simastok/"
---

# SIMASTOK SHR Jaya Motor

## Project Snapshot

- **Nama Project:** SIMASTOK SHR Jaya Motor
- **Jenis Project:** Fullstack Web Application / Inventory Management System
- **Peran:** Fullstack Developer
- **UI/UX Design:** Figma
- **Frontend:** Laravel
- **Backend:** Laravel
- **Database:** MySQL
- **Quality Assurance:** Katalon Studio
- **Testing:** Manual Testing dan Automation Testing
- **Deployment:** Docker pada Linux Ubuntu
- **Role Utama:** Admin dan User
- **Fokus:** Inventory Management, Stock Management, Reporting, Role-Based Access, dan Fullstack Development

## Ringkasan Project

SIMASTOK SHR Jaya Motor merupakan sistem informasi manajemen stok berbasis web yang dikembangkan untuk mendukung pencatatan dan pengelolaan persediaan suku cadang secara terpusat.

Project dikembangkan secara end-to-end sebagai Fullstack Developer, mulai dari perancangan UI/UX menggunakan Figma, pengembangan frontend dan backend menggunakan Laravel, integrasi database MySQL, Quality Assurance menggunakan Katalon Studio, hingga containerization dan deployment menggunakan Docker pada Linux Ubuntu.

Sistem menyediakan fungsi pengelolaan barang, kategori, supplier, transaksi barang masuk dan barang keluar, automatic stock update, laporan pergerakan barang berdasarkan periode, export PDF, serta pengelolaan akun pengguna.

SIMASTOK memiliki dua role utama, yaitu Admin dan User, dengan pembatasan menu serta proteksi halaman berdasarkan hak akses masing-masing.

## Peran

Fullstack Developer.

## Tanggung Jawab

- Merancang UI/UX menggunakan Figma.
- Membuat wireframe.
- Menyusun user flow.
- Merancang halaman login.
- Merancang dashboard.
- Merancang halaman data barang.
- Merancang halaman barang masuk.
- Merancang halaman barang keluar.
- Merancang halaman kategori.
- Merancang halaman supplier.
- Merancang halaman laporan.
- Merancang halaman profil akun.
- Mengembangkan frontend menggunakan Laravel.
- Mengembangkan backend menggunakan Laravel.
- Mengintegrasikan Laravel dengan MySQL.
- Mengembangkan authentication.
- Mengembangkan authorization.
- Mengimplementasikan role-based access.
- Mengimplementasikan route protection.
- Mengembangkan master data barang.
- Mengembangkan master data kategori.
- Mengembangkan master data supplier.
- Mengembangkan transaksi barang masuk.
- Mengembangkan transaksi barang keluar.
- Mengimplementasikan automatic stock update.
- Mengimplementasikan insufficient-stock validation.
- Menyimpan riwayat transaksi pergerakan stok.
- Mengembangkan laporan berdasarkan rentang tanggal.
- Mengembangkan summary pergerakan stok.
- Mengembangkan export laporan ke PDF.
- Mengembangkan profile management.
- Mengimplementasikan password hashing.
- Mengimplementasikan input validation.
- Melakukan Manual Testing menggunakan Katalon Studio.
- Melakukan Automation Testing menggunakan Katalon Studio.
- Melakukan functional testing.
- Melakukan regression testing pada alur utama.
- Melakukan containerization menggunakan Docker.
- Melakukan deployment pada Linux Ubuntu.

## Tujuan Project

Project dikembangkan untuk menyediakan sistem terpusat dalam pengelolaan persediaan suku cadang SHR Jaya Motor.

Sistem menangani beberapa kebutuhan utama:

- Pengelolaan data barang.
- Pengelolaan kategori.
- Pengelolaan supplier.
- Pencatatan barang masuk.
- Pencatatan barang keluar.
- Pembaruan stok.
- Riwayat pergerakan stok.
- Reporting.
- Export laporan.
- Pengelolaan akun pengguna.
- Pembatasan akses berdasarkan role.

## Role Pengguna

Sistem memiliki dua role utama:

1. Admin
2. User

## Admin

Admin memiliki akses yang lebih luas terhadap fungsi pengelolaan sistem.

Cakupan akses Admin meliputi pengelolaan data dan fungsi administratif sesuai kewenangan yang diterapkan pada aplikasi.

Admin dapat mengakses halaman yang dibatasi khusus melalui mekanisme role-based access dan route protection.

## User

User memiliki akses terhadap fungsi yang tersedia sesuai hak akses yang ditentukan.

Menu dan halaman tertentu dibatasi agar hanya dapat diakses oleh Admin.

## Authentication

Sistem memiliki mekanisme authentication untuk mengelola akses pengguna.

Fungsi yang berkaitan meliputi:

- Login.
- Account authentication.
- Profile management.
- Password management.

## Authorization

Authorization digunakan untuk membedakan hak akses antara Admin dan User.

Sistem melakukan pembatasan terhadap:

- Menu.
- Halaman.
- Fungsi tertentu.

## Role-Based Access Control

Role-based access control diterapkan untuk dua role:

- Admin.
- User.

Akses langsung terhadap halaman yang hanya diperuntukkan bagi Admin juga dilindungi melalui route protection.

## Dashboard

Dashboard menampilkan ringkasan kondisi inventory.

Informasi yang tersedia mencakup:

- Total jenis barang.
- Total stok.
- Jumlah barang masuk pada bulan berjalan.
- Jumlah barang keluar pada bulan berjalan.
- Grafik pergerakan stok.

Dashboard digunakan untuk memberikan gambaran ringkas mengenai kondisi persediaan.

## Master Data

SIMASTOK memiliki tiga modul master data utama:

1. Barang
2. Kategori
3. Supplier

## Barang

Modul Barang digunakan untuk mengelola data suku cadang yang terdapat dalam inventory.

Fungsi yang tersedia meliputi:

- Tambah data.
- Lihat data.
- Edit data.
- Hapus data.
- Pencarian data.

## Kategori

Modul Kategori digunakan untuk mengelompokkan data barang.

Fungsi pengelolaan mencakup:

- Tambah.
- Lihat.
- Edit.
- Hapus.
- Pencarian.

Sistem juga menerapkan validasi terhadap duplikasi kategori.

## Supplier

Modul Supplier digunakan untuk mengelola informasi pemasok barang.

Fungsi yang tersedia meliputi:

- Tambah.
- Lihat.
- Edit.
- Hapus.
- Pencarian.

## Inventory Management

Inventory Management menjadi fungsi utama SIMASTOK.

Area yang dikelola meliputi:

- Barang.
- Kategori.
- Supplier.
- Stok.
- Barang masuk.
- Barang keluar.
- Riwayat transaksi.
- Laporan pergerakan stok.

## Barang Masuk

Fitur Barang Masuk digunakan untuk mencatat penambahan stok.

Ketika transaksi barang masuk disimpan, stok barang diperbarui secara otomatis.

Sistem juga menyimpan riwayat transaksi agar pergerakan barang dapat ditelusuri.

## Barang Keluar

Fitur Barang Keluar digunakan untuk mencatat pengurangan stok.

Ketika transaksi berhasil dilakukan, jumlah stok diperbarui secara otomatis.

Sistem menyimpan riwayat transaksi barang keluar sebagai bagian dari pencatatan pergerakan stok.

## Automatic Stock Update

Stok barang diperbarui secara otomatis berdasarkan transaksi.

Alur barang masuk:

Barang Masuk
→ Transaksi Disimpan
→ Stok Bertambah
→ Riwayat Transaksi Tersimpan

Alur barang keluar:

Barang Keluar
→ Validasi Stok
→ Transaksi Disimpan
→ Stok Berkurang
→ Riwayat Transaksi Tersimpan

## Insufficient Stock Validation

Sistem melakukan validasi ketika pengguna melakukan transaksi barang keluar.

Jumlah barang yang dikeluarkan tidak dapat melebihi jumlah stok yang tersedia.

Alur:

Input Barang Keluar
→ Periksa Stok Tersedia
→ Validasi Jumlah
→ Simpan Transaksi jika Valid

Validasi digunakan untuk mencegah transaksi yang menghasilkan stok tidak valid.

## Transaction History

Setiap transaksi pergerakan barang disimpan sebagai riwayat.

Riwayat mencakup transaksi:

- Barang masuk.
- Barang keluar.

Riwayat tersebut digunakan sebagai sumber data dalam pengelolaan dan reporting inventory.

## Reporting

SIMASTOK menyediakan modul laporan pergerakan barang.

Laporan dapat difilter berdasarkan rentang tanggal.

Informasi yang tersedia mencakup:

- Total barang masuk.
- Total barang keluar.
- Perubahan stok bersih.
- Riwayat transaksi dalam periode tertentu.

## Date-Range Filtering

Pengguna dapat menentukan rentang tanggal untuk melihat laporan berdasarkan periode tertentu.

Alur:

Pilih Tanggal Awal
→ Pilih Tanggal Akhir
→ Filter Data
→ Tampilkan Laporan

## Stock Movement Summary

Laporan menyediakan ringkasan pergerakan stok.

Informasi utama:

- Total barang masuk.
- Total barang keluar.
- Perubahan stok bersih.

## PDF Export

Laporan dapat diekspor ke format PDF.

Export digunakan untuk kebutuhan:

- Dokumentasi.
- Administrasi persediaan.
- Penyimpanan laporan.

## Profile Management

Sistem menyediakan halaman profile untuk pengguna.

Fungsi yang tersedia:

- Mengubah nama.
- Mengubah email.
- Mengubah password.

## Password Management

Pengguna dapat melakukan perubahan password melalui halaman profile.

Password disimpan menggunakan mekanisme hashing.

## Password Hashing

Password pengguna tidak disimpan sebagai plain text.

Sistem menggunakan password hashing sebelum data password disimpan.

## Input Validation

SIMASTOK menerapkan validasi pada berbagai form utama.

Validasi mencakup:

- Required data.
- Format data.
- Duplikasi barang.
- Duplikasi kategori.
- Nilai transaksi tidak valid.
- Jumlah barang keluar melebihi stok.

## CRUD

Modul pengelolaan data mendukung operasi CRUD.

Operasi utama:

- Create.
- Read.
- Update.
- Delete.

CRUD digunakan pada beberapa area seperti:

- Barang.
- Kategori.
- Supplier.
- Data lain yang dikelola melalui sistem.

## Frontend Development

Frontend SIMASTOK dikembangkan menggunakan Laravel.

Antarmuka mencakup:

- Login.
- Dashboard.
- Barang.
- Kategori.
- Supplier.
- Barang Masuk.
- Barang Keluar.
- Laporan.
- Profile.

## Backend Development

Backend juga dikembangkan menggunakan Laravel.

Backend menangani:

- Authentication.
- Authorization.
- Business logic.
- Validation.
- Stock logic.
- CRUD.
- Reporting.
- Database communication.

## Database

Database yang digunakan:

`MySQL`

Database menyimpan data yang berkaitan dengan:

- Pengguna.
- Barang.
- Kategori.
- Supplier.
- Stok.
- Barang masuk.
- Barang keluar.
- Riwayat transaksi.

## Laravel Architecture

Aplikasi dikembangkan menggunakan Laravel sebagai framework utama untuk frontend dan backend.

Project menggunakan struktur aplikasi web Laravel dan pola MVC sebagai bagian dari pengorganisasian aplikasi.

## Quality Assurance

Quality Assurance dilakukan menggunakan Katalon Studio.

Pendekatan yang digunakan:

- Manual Testing.
- Automation Testing.

## Manual Testing

Manual Testing digunakan untuk memeriksa alur fungsional utama aplikasi.

Area yang diuji mencakup:

- Authentication.
- Hak akses.
- Input form.
- Inventory.
- Barang masuk.
- Barang keluar.
- Reporting.
- Transaksi.

## Automation Testing

Automation Testing dilakukan menggunakan Katalon Studio untuk membantu memverifikasi alur yang terdokumentasi dalam sistem.

## Functional Testing

Functional Testing digunakan untuk memastikan fungsi utama aplikasi berjalan sesuai workflow yang diterapkan.

## Regression Testing

Regression testing dilakukan terhadap flow utama sebagai bagian dari proses Quality Assurance.

## Area Pengujian

Pengujian mencakup:

- Alur fungsional utama.
- Validasi input.
- Role-based access.
- Route protection.
- Transaksi barang masuk.
- Transaksi barang keluar.
- Stock validation.
- Reporting.

## Containerization

Aplikasi menggunakan Docker untuk proses containerization.

Containerization digunakan sebelum aplikasi dijalankan pada environment Linux Ubuntu.

## Deployment

Deployment dilakukan menggunakan:

- Docker.
- Linux Ubuntu.

Aplikasi disiapkan agar dapat dijalankan pada environment production.

## Core Development Scope

### UI/UX Design

- Figma.
- Wireframe.
- User Flow.
- Dashboard.
- Inventory Pages.
- Reporting.
- Profile Management.

### Authentication & Authorization

- Login.
- Admin Role.
- User Role.
- Role-Based Access.
- Route Protection.
- Password Management.

### Inventory Management

- Barang.
- Kategori.
- Supplier.
- Stock.
- Barang Masuk.
- Barang Keluar.

### Stock Logic

- Automatic Stock Update.
- Transaction History.
- Insufficient Stock Validation.

### Reporting

- Date-Range Filtering.
- Stock Movement Summary.
- PDF Export.

### Frontend & Backend

- Laravel.
- PHP.
- MySQL.
- MVC.

### Quality Assurance

- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Functional Testing.
- Regression Testing.

### Deployment

- Docker.
- Linux Ubuntu.
- Containerization.
- Production Deployment.

## Alur Teknis Keseluruhan

Figma
→ UI/UX Design
→ Laravel Application
→ MySQL Database
→ Inventory & Stock Logic
→ Reporting
→ Katalon Studio Quality Assurance
→ Docker Containerization
→ Linux Ubuntu Deployment

## Teknologi yang Digunakan

### UI/UX

- Figma
- UI/UX Design
- Wireframe
- User Flow

### Web Development

- Laravel
- PHP
- MVC

### Database

- MySQL

### Authentication & Security

- Authentication
- Authorization
- Role-Based Access Control
- Route Protection
- Password Hashing
- Form Validation

### Inventory

- Inventory Management
- Stock Management
- CRUD
- Transaction History
- Automatic Stock Update
- Insufficient Stock Validation

### Reporting

- Date-Range Filtering
- Reporting
- PDF Export

### Quality Assurance

- Katalon Studio
- Manual Testing
- Automation Testing
- Functional Testing
- Regression Testing
- Software Testing

### Deployment

- Docker
- Linux Ubuntu
- Containerization
- Deployment

## Angka Teknis yang Aman Digunakan

### User Role

- User roles: 2
- Admin
- User

### Functional Areas

- Functional areas: 10+
- Login
- Dashboard
- Barang
- Kategori
- Supplier
- Barang Masuk
- Barang Keluar
- Laporan
- Export PDF
- Profile

### Master Data

- Master-data modules utama: 3
- Barang
- Kategori
- Supplier

### Stock Transaction

- Stock transaction flows: 2
- Barang Masuk
- Barang Keluar

### Reporting

- Reporting modules utama: 1
- Date-range filtering tersedia.
- PDF export tersedia.

### Quality Assurance

- Testing approaches: 2
- Manual Testing
- Automation Testing
- Tool utama: Katalon Studio

### Deployment

- Production deployment stack: 1
- Docker + Linux Ubuntu

## Kompetensi yang Berkaitan

- Figma
- UI/UX Design
- Laravel
- PHP
- MySQL
- Fullstack Development
- Frontend Development
- Backend Development
- MVC
- Authentication
- Authorization
- Role-Based Access Control
- Route Protection
- Inventory Management
- CRUD
- Form Validation
- Password Hashing
- Stock Management
- Automatic Stock Update
- Transaction History
- Reporting
- PDF Export
- Docker
- Linux Ubuntu
- Deployment
- Quality Assurance
- Software Testing
- Katalon Studio
- Manual Testing
- Automation Testing
- Functional Testing
- Regression Testing

## Asset Project

Path asset:

assets/projects/simastok/

Asset yang tersedia:

- simastok-1.webp
- simastok-2.webp
- simastok-3.webp
- simastok-4.webp
- simastok-5.webp
- simastok-6.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, urutan screenshot, caption, alt text, layout gallery, animasi, penempatan gambar, serta presentasi visual tidak ditentukan dalam file data ini.

Coding agent menentukan penggunaan asset berdasarkan desain dan kebutuhan implementasi website.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan berdasarkan dokumentasi:

- Fullstack Development.
- Figma UI/UX Design.
- Laravel frontend dan backend.
- MySQL.
- Admin dan User.
- Role-Based Access Control.
- Route Protection.
- Barang, Kategori, dan Supplier.
- Barang Masuk dan Barang Keluar.
- Automatic Stock Update.
- Transaction History.
- Insufficient Stock Validation.
- Reporting berdasarkan periode.
- PDF Export.
- Profile Management.
- Password Hashing.
- Input Validation.
- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Functional Testing.
- Regression Testing.
- Docker.
- Linux Ubuntu.
- Production Deployment.

Jangan membuat klaim mengenai:

- Persentase peningkatan efisiensi pengelolaan stok.
- Persentase pengurangan kesalahan stok.
- Persentase peningkatan produktivitas.
- Jumlah transaksi yang diproses.
- Jumlah pengguna aktif.
- Test coverage.
- Pass rate.
- Persentase penurunan error.
- Benchmark performa.
- Dampak bisnis kuantitatif lainnya.

kecuali tersedia data pengukuran terpisah yang mendukung klaim tersebut.