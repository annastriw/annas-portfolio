---
judul: "iHealth Edu"
slug: "ihealth-edu"
jenis: "Project"
jenis_project: "Fullstack Web Application / Digital Health / Health Education Platform"
peran: "Fullstack Developer"
stakeholder: "Puskesmas Padangsari, Semarang"
status: "Production Deployment"
asset_path: "assets/projects/ihealth-edu/"
---

# iHealth Edu

## Project Snapshot

- **Nama Project:** iHealth Edu
- **Jenis Project:** Fullstack Web Application / Digital Health / Health Education Platform
- **Peran:** Fullstack Developer
- **Stakeholder:** Puskesmas Padangsari, Semarang
- **UI/UX Design:** Figma
- **Frontend:** Next.js
- **Backend:** Laravel
- **Database:** MySQL
- **Machine Learning:** Random Forest Classifier
- **ML Serving:** Flask REST API
- **IoT Integration:** ESP32
- **IoT Server:** Laravel
- **Quality Assurance:** Katalon Studio
- **Testing:** Manual Testing dan Automation Testing
- **Deployment:** Docker pada Linux Ubuntu

## Ringkasan Project

iHealth Edu merupakan platform kesehatan digital terintegrasi yang dikembangkan untuk mendukung screening kesehatan, edukasi kesehatan, pengelolaan data pasien, riwayat pemeriksaan, dan prediksi risiko kesehatan dalam satu sistem.

Project dikembangkan secara end-to-end sebagai Fullstack Developer, mulai dari perancangan UI/UX menggunakan Figma, pengembangan frontend dengan Next.js, backend menggunakan Laravel, pengelolaan database MySQL, integrasi Machine Learning melalui Flask REST API, integrasi perangkat IoT berbasis ESP32, Quality Assurance menggunakan Katalon Studio, hingga containerization dan deployment menggunakan Docker pada Linux Ubuntu.

Sistem mendukung tiga kelompok pengguna utama, yaitu Pasien, Admin, dan Tenaga Kesehatan.

Pengembangan dilakukan dengan melibatkan Puskesmas Padangsari, Semarang sebagai stakeholder untuk memahami kebutuhan alur pemeriksaan, data pasien, edukasi kesehatan, serta penggunaan sistem pada layanan kesehatan primer.

## Peran

Fullstack Developer.

## Tanggung Jawab

- Menganalisis kebutuhan dan alur sistem kesehatan digital.
- Merancang UI/UX menggunakan Figma.
- Merancang alur untuk Pasien, Admin, dan Tenaga Kesehatan.
- Mengembangkan frontend menggunakan Next.js.
- Mengembangkan backend menggunakan Laravel.
- Mengintegrasikan frontend dengan backend API.
- Mengelola data menggunakan MySQL.
- Mengembangkan authentication dan authorization.
- Mengembangkan role-based access control.
- Mengembangkan fitur screening kesehatan.
- Mengembangkan modul edukasi kesehatan.
- Mengembangkan Pre-Test dan Post-Test.
- Mengembangkan fitur riwayat pemeriksaan.
- Mengembangkan reporting.
- Mengembangkan user management.
- Mengembangkan lokasi persebaran pasien.
- Mengintegrasikan Machine Learning Random Forest Classifier.
- Menyediakan model Machine Learning melalui Flask REST API.
- Mengintegrasikan perangkat ESP32.
- Mengembangkan alur data IoT menuju server Laravel.
- Mengintegrasikan data IoT dengan riwayat kesehatan pasien.
- Mengintegrasikan data kesehatan dengan workflow prediksi.
- Melakukan Manual Testing menggunakan Katalon Studio.
- Melakukan Automation Testing menggunakan Katalon Studio.
- Melakukan containerization menggunakan Docker.
- Melakukan deployment pada Linux Ubuntu.
- Berkolaborasi dengan stakeholder Puskesmas Padangsari.

## Role Pengguna

Sistem memiliki tiga primary user roles.

### 1. Pasien

Pasien memiliki akses terhadap fitur yang berkaitan dengan penggunaan layanan kesehatan secara personal.

Cakupan meliputi:

- Authentication.
- Dashboard.
- Screening.
- Modul edukasi.
- Pre-Test.
- Post-Test.
- Riwayat screening.
- Riwayat cek kesehatan.
- Data hasil pemeriksaan.
- Pengaturan akun.

### 2. Admin

Admin memiliki akses untuk mengelola konten, data sistem, pengguna, serta informasi yang dibutuhkan untuk pengelolaan platform.

Cakupan meliputi:

- User management.
- Pengelolaan materi.
- Pengelolaan bank soal.
- Pengelolaan Pre-Test dan Post-Test.
- Pengelolaan FAQ.
- Reporting.
- Riwayat screening.
- Riwayat pemeriksaan pasien.
- Pengelolaan akun dan data pengguna.

### 3. Tenaga Kesehatan

Tenaga Kesehatan memperoleh akses terhadap data kesehatan dan riwayat pasien sesuai kewenangan role.

Cakupan meliputi:

- Data pasien.
- Riwayat screening.
- Riwayat cek kesehatan.
- Hasil pemeriksaan.
- Reporting.
- Informasi yang mendukung workflow pelayanan kesehatan.

## Authentication & Authorization

Sistem memiliki mekanisme authentication dan authorization.

Fungsi yang dikembangkan mencakup:

- Login.
- Register.
- Logout.
- Role-based access.
- Account settings.
- User management.
- Pengaturan hak akses berdasarkan role.

Hak akses dibedakan untuk Pasien, Admin, dan Tenaga Kesehatan.

## Health Screening

iHealth Edu menyediakan tiga modul screening yang terdokumentasi:

### DSMQ

Digunakan sebagai salah satu modul asesmen kesehatan pada sistem.

### HSMBQ

Digunakan sebagai salah satu modul screening yang menyimpan hasil asesmen pasien.

### DASS-21

Digunakan sebagai salah satu modul asesmen yang tersedia pada platform.

Sistem menyimpan hasil screening dan menyediakan riwayat pengerjaan secara terstruktur.

Akses terhadap data disesuaikan dengan role pengguna.

## Modul Edukasi Kesehatan

iHealth Edu memiliki tiga jalur edukasi utama:

- Hipertensi.
- Diabetes Melitus.
- Kesehatan Mental.

Setiap jalur edukasi menggunakan alur pembelajaran tiga tahap:

Pre-Test
→ Modul Edukasi
→ Post-Test

## Konten Edukasi

Konten edukasi yang didukung meliputi:

- Video.
- Artikel.
- Booklet PDF.
- FAQ.
- Materi edukasi.

Sistem juga menyediakan fitur pengelolaan konten agar admin dapat memperbarui materi melalui aplikasi.

## Pre-Test dan Post-Test

Pre-Test dan Post-Test digunakan sebagai bagian dari workflow pembelajaran.

Alurnya:

Pre-Test
→ Pengguna mempelajari Modul Edukasi
→ Post-Test

Fitur yang berkaitan meliputi:

- Bank Soal.
- Pre-Test.
- Modul Edukasi.
- Post-Test.
- Hasil pengerjaan.

## Content Management

Admin memiliki fungsi CRUD untuk beberapa jenis konten.

Cakupan:

- Materi.
- Bank Soal.
- Pre-Test.
- Post-Test.
- FAQ.

Fungsi ini memungkinkan konten edukasi dan asesmen dikelola melalui sistem.

## Riwayat Cek Kesehatan

Fitur Riwayat Cek Kesehatan menampilkan data pemeriksaan dan hasil prediksi pasien.

Akses terhadap data dibedakan berdasarkan role.

### Pasien

Pasien dapat mengakses data pemeriksaannya sendiri.

### Admin dan Tenaga Kesehatan

Admin dan Tenaga Kesehatan memiliki cakupan akses yang lebih luas sesuai kewenangan masing-masing.

## Health Data Management

Sistem mengelola berbagai data yang berkaitan dengan pasien dan pemeriksaan kesehatan.

Cakupan data meliputi:

- Informasi pasien.
- Informasi pribadi.
- Alamat pasien.
- Riwayat health-check.
- Riwayat screening.
- Assessment history.
- Hasil tes.
- Hasil prediksi.
- Reporting.

## Reporting

Sistem menyediakan fitur laporan keseluruhan untuk membantu Admin dan Tenaga Kesehatan melihat data secara terpusat.

Reporting mencakup:

- Riwayat screening.
- Aktivitas asesmen pasien.
- Data pemeriksaan.
- Informasi kesehatan yang tersedia di dalam sistem.

## User Management

Fitur manajemen pengguna mencakup:

- Pengelolaan akun.
- Informasi pribadi.
- Alamat pasien.
- Pengelolaan data pengguna.
- Reset password sesuai kewenangan role.

## Lokasi Persebaran Pasien

iHealth Edu menyediakan fitur lokasi persebaran pasien.

Fitur digunakan untuk menampilkan data geografis dan statistik pasien dalam bentuk peta pada lingkup layanan Puskesmas Padangsari.

## Machine Learning Integration

iHealth Edu mengintegrasikan model Machine Learning menggunakan Random Forest Classifier.

Model digunakan untuk menghasilkan prediksi risiko serangan jantung berdasarkan data kesehatan pasien yang tersedia.

Machine Learning diposisikan sebagai risk-prediction / decision-support prototype dan bukan sebagai alat diagnosis klinis.

## Flask REST API

Model Machine Learning disediakan sebagai service terpisah menggunakan Flask REST API.

Alur dasarnya:

Data Kesehatan Pasien
→ Flask REST API
→ Random Forest Classifier
→ Hasil Prediksi
→ Sistem iHealth Edu

Backend dapat mengirim data pasien menuju ML service dan menerima hasil prediksi secara terstruktur.

## IoT Integration

iHealth Edu mengintegrasikan perangkat IoT berbasis ESP32 untuk mengambil data pemeriksaan kesehatan pasien.

Data yang terdokumentasi meliputi:

- Tekanan darah.
- Kadar gula darah.
- Kolesterol.

Data pemeriksaan dikirim menuju server Laravel dan dihubungkan dengan data pasien.

## Alur Integrasi IoT

Alur integrasi yang diterapkan:

ESP32
→ Laravel IoT Server
→ MySQL
→ iHealth Edu

Data hasil pemeriksaan kemudian dapat digunakan pada:

- Riwayat kesehatan.
- Riwayat cek kesehatan.
- Data pasien.
- Workflow prediksi risiko.

Integrasi ini memungkinkan data pemeriksaan tidak sepenuhnya bergantung pada input manual.

## Arsitektur Integrasi

Komponen utama yang saling terhubung:

Next.js Frontend
→ Laravel Backend
→ MySQL Database

ESP32
→ Laravel IoT Server
→ MySQL Database

Laravel / Sistem
→ Flask REST API
→ Random Forest Classifier
→ Hasil Prediksi

Komponen tersebut membentuk satu arsitektur aplikasi kesehatan yang terintegrasi.

## Quality Assurance

Quality Assurance dilakukan menggunakan Katalon Studio.

Pendekatan testing:

- Manual Testing.
- Automation Testing.

Pengujian dilakukan untuk memverifikasi:

- Alur utama aplikasi.
- Integrasi antarmuka.
- Fungsi sistem.
- Workflow berdasarkan role.
- Integrasi antar bagian aplikasi sebelum deployment.

## Deployment

Aplikasi menggunakan containerization dan deployment berbasis Docker.

Environment deployment:

- Docker.
- Linux Ubuntu.

Deployment dilakukan untuk menjalankan komponen aplikasi pada environment production.

## Stakeholder Collaboration

Pengembangan dilakukan dengan melibatkan Puskesmas Padangsari, Semarang sebagai stakeholder.

Kolaborasi dilakukan untuk memahami kebutuhan yang berkaitan dengan:

- Alur pemeriksaan.
- Data pasien.
- Edukasi kesehatan.
- Penggunaan sistem oleh pasien.
- Penggunaan sistem oleh tenaga kesehatan.
- Workflow layanan kesehatan primer.

## Core Development Scope

### UI/UX & Product Flow

- Figma.
- Multi-role user flow.
- Dashboard.
- Screening.
- Education modules.
- Health-check workflow.
- Admin management.

### Authentication & Authorization

- Login.
- Register.
- Logout.
- Role-based access.
- Account settings.
- User management.

### Health Screening

- DSMQ.
- HSMBQ.
- DASS-21.
- Result history.
- Patient-specific access.

### Health Education

- Pre-Test.
- Educational modules.
- Post-Test.
- Videos.
- Articles.
- Booklet PDF.
- FAQ.
- Question Bank.

### Health Data Management

- Patient information.
- Address.
- Health-check records.
- Assessment history.
- Aggregate reporting.

### Machine Learning

- Random Forest Classifier.
- Flask.
- Flask REST API.
- Heart-attack risk prediction.

### IoT

- ESP32.
- Health measurement acquisition.
- Laravel IoT server.
- Patient health records.

### Quality Assurance

- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Functional verification.

### Deployment

- Docker.
- Linux Ubuntu.
- Production deployment.

## Teknologi yang Digunakan

### Product & UI/UX

- Figma
- UI/UX Design
- User Flow
- Product Flow

### Frontend

- Next.js
- React

### Backend

- Laravel
- PHP
- REST API
- Authentication
- Authorization
- Role-Based Access Control

### Database

- MySQL

### Machine Learning

- Random Forest Classifier
- Flask
- Flask REST API
- Machine Learning Integration

### Internet of Things

- ESP32
- IoT Integration
- Embedded Systems
- Laravel IoT Server

### Quality Assurance

- Katalon Studio
- Manual Testing
- Automation Testing
- Functional Testing

### Deployment & Infrastructure

- Docker
- Linux Ubuntu
- Deployment

## Angka Teknis yang Aman Digunakan

- Primary user roles: 3
- Role: Pasien, Admin, dan Tenaga Kesehatan
- Standardized screening modules: 3
- Screening: DSMQ, HSMBQ, dan DASS-21
- Education tracks: 3
- Topik edukasi: Hipertensi, Diabetes Melitus, dan Kesehatan Mental
- Learning flow: 3 tahap
- Learning flow: Pre-Test → Modul Edukasi → Post-Test
- Functional features yang terdokumentasi dalam spesifikasi sistem: 27
- Machine Learning integration: 1
- Machine Learning model: Random Forest Classifier
- ML inference service: 1 Flask REST API
- IoT integration layer: 1
- Perangkat IoT utama: ESP32
- Quality Assurance tool utama: 1
- Quality Assurance tool: Katalon Studio
- Testing approaches: 2
- Testing: Manual Testing dan Automation Testing
- Production deployment stack: Docker pada Linux Ubuntu

## Kompetensi yang Berkaitan

- Figma
- UI/UX Design
- Next.js
- React
- Laravel
- PHP
- MySQL
- Fullstack Development
- Frontend Development
- Backend Development
- REST API
- Authentication
- Authorization
- Role-Based Access Control
- Digital Health
- Health Information System
- Patient Data Management
- Screening System
- Pre-Test
- Post-Test
- Content Management
- Random Forest Classifier
- Machine Learning Integration
- Flask
- Flask REST API
- ESP32
- IoT Integration
- Embedded Systems
- Quality Assurance
- Katalon Studio
- Manual Testing
- Automation Testing
- Functional Testing
- Docker
- Linux Ubuntu
- Deployment
- Data Visualization
- Reporting
- Stakeholder Collaboration

## Asset Project

Path asset:

assets/projects/ihealth-edu/

Asset yang tersedia:

- ihealth-1.webp
- ihealth-2.webp
- ihealth-3.webp
- ihealth-4.webp
- ihealth-5.webp
- ihealth-6.webp
- ihealth-7.webp
- ihealth-8.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, urutan gambar, caption, alt text, layout gallery, penggunaan gambar pada section tertentu, animasi, dan presentasi visual tidak ditentukan dalam file data ini.

Keputusan tersebut dilakukan pada tahap desain dan implementasi website oleh coding agent.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Machine Learning harus diposisikan sebagai:

- Risk-prediction prototype.
- Decision-support prototype.

Jangan memposisikan sistem sebagai alat diagnosis klinis.

Klaim yang aman digunakan:

- Integrasi Random Forest Classifier.
- Flask REST API untuk ML inference.
- ESP32 IoT integration.
- Laravel IoT server.
- Docker deployment.
- Linux Ubuntu.
- Role-based healthcare workflow.
- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Kolaborasi dengan Puskesmas Padangsari.

Jangan membuat klaim mengenai:

- Peningkatan outcome klinis.
- Akurasi medis.
- Efektivitas diagnosis.
- Efektivitas intervensi kesehatan.
- Test coverage.
- Pass rate.
- Persentase peningkatan performa.
- Persentase peningkatan efisiensi.
- Dampak klinis kuantitatif.
- Dampak kesehatan kuantitatif.

kecuali tersedia data pengukuran atau validasi terpisah yang mendukung klaim tersebut.