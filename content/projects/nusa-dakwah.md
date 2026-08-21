---
judul: "Nusa Dakwah"
slug: "nusa-dakwah"
jenis: "Project"
jenis_project: "Fullstack Web Application / Digital Content Platform"
peran: "Fullstack Developer"
status: "Production Deployment"
asset_path: "assets/projects/nusa-dakwah/"
---

# Nusa Dakwah

## Project Snapshot

- **Nama Project:** Nusa Dakwah
- **Jenis Project:** Fullstack Web Application / Digital Content Platform
- **Peran:** Fullstack Developer
- **UI/UX Design:** Figma
- **Frontend:** Next.js
- **Backend:** Laravel RESTful API
- **Database:** MySQL
- **Quality Assurance:** Katalon Studio
- **Testing:** Manual Testing dan Automation Testing
- **Deployment:** Docker pada Linux Ubuntu
- **Role Utama:** Admin dan User
- **Fokus:** Digital Content Platform, Content Management, Authentication, Discussion Forum, dan Fullstack Development

## Ringkasan Project

Nusa Dakwah merupakan website dakwah digital fullstack yang dikembangkan untuk menyajikan dan mengelola materi kajian, artikel keislaman, video kajian, serta forum diskusi dalam satu platform terintegrasi.

Project dikembangkan secara end-to-end sebagai Fullstack Developer, mulai dari perancangan UI/UX menggunakan Figma, pengembangan frontend menggunakan Next.js, backend menggunakan Laravel RESTful API, pengelolaan database MySQL, Quality Assurance menggunakan Katalon Studio, hingga containerization dan deployment menggunakan Docker pada Linux Ubuntu.

Platform memiliki sistem pengelolaan materi bertingkat berupa Modul, Sub Modul, dan Konten Materi.

Nusa Dakwah juga menyediakan autentikasi, role-based access untuk Admin dan User, pencarian konten, forum diskusi dengan komentar dan nested reply, pengaturan akun, serta dashboard admin untuk mengelola konten, diskusi, dan pengguna.

## Peran

Fullstack Developer.

## Tanggung Jawab

- Merancang UI/UX menggunakan Figma.
- Membuat wireframe.
- Menyusun user flow.
- Merancang landing page.
- Merancang halaman autentikasi.
- Merancang dashboard pengguna.
- Merancang halaman materi.
- Merancang forum diskusi.
- Merancang pengaturan akun.
- Merancang dashboard admin.
- Mengembangkan frontend menggunakan Next.js.
- Mengembangkan backend menggunakan Laravel.
- Mengembangkan RESTful API.
- Mengintegrasikan frontend dengan backend API.
- Menggunakan MySQL sebagai database.
- Mengembangkan authentication.
- Mengembangkan authorization.
- Mengimplementasikan role-based access.
- Mengembangkan content management.
- Mengembangkan struktur Modul, Sub Modul, dan Konten Materi.
- Mengembangkan pencarian konten.
- Mengintegrasikan video kajian berbasis YouTube.
- Mengembangkan forum diskusi.
- Mengembangkan komentar dan nested reply.
- Mengembangkan dashboard admin.
- Mengembangkan user management.
- Melakukan validasi input.
- Melakukan sanitasi input forum.
- Melakukan Manual Testing menggunakan Katalon Studio.
- Melakukan Automation Testing menggunakan Katalon Studio.
- Melakukan containerization menggunakan Docker.
- Melakukan deployment pada Linux Ubuntu.

## Role Pengguna

Nusa Dakwah memiliki dua role utama:

1. Admin
2. User

## Admin

Admin memiliki akses untuk mengelola berbagai bagian sistem.

Cakupan pengelolaan meliputi:

- Modul.
- Sub Modul.
- Konten Materi.
- Artikel.
- Video.
- Diskusi.
- Pengguna.
- Akun pengguna.

Admin dapat melakukan operasi pengelolaan data seperti:

- Tambah.
- Lihat.
- Edit.
- Hapus.

## User

User memiliki akses terhadap fungsi penggunaan platform sesuai hak akses yang ditentukan.

Cakupan penggunaan meliputi:

- Registrasi.
- Login.
- Mengakses materi.
- Membaca artikel.
- Mengakses video kajian.
- Menggunakan pencarian konten.
- Berpartisipasi dalam forum diskusi.
- Mengelola profil.
- Mengubah password.

## UI/UX Design

Perancangan UI/UX dilakukan menggunakan Figma.

Cakupan desain meliputi:

- Landing page.
- Authentication.
- Dashboard pengguna.
- Halaman materi.
- Forum diskusi.
- Account settings.
- Dashboard admin.
- Wireframe.
- User flow.

## Frontend Development

Frontend dikembangkan menggunakan Next.js.

Cakupan frontend meliputi:

- Responsive interface.
- Navigasi halaman.
- Landing page.
- Authentication interface.
- Dashboard.
- Pencarian konten.
- Halaman materi.
- Forum diskusi.
- Account settings.
- Admin interface.
- Konsumsi data dari backend API.

## Backend Development

Backend dikembangkan menggunakan Laravel sebagai RESTful API.

Cakupan backend meliputi:

- Authentication.
- Authorization.
- Business logic.
- Data management.
- Input validation.
- User management.
- Content management.
- Discussion management.
- Komunikasi dengan MySQL.
- API untuk frontend Next.js.

## RESTful API

Laravel digunakan sebagai RESTful API yang menghubungkan frontend Next.js dengan data aplikasi.

Alur umum:

Next.js Frontend
→ Laravel RESTful API
→ Business Logic
→ MySQL Database

API digunakan untuk mengelola:

- Data pengguna.
- Modul.
- Sub Modul.
- Konten materi.
- Artikel.
- Video.
- Diskusi.
- Data akun.

## Database

Database yang digunakan:

`MySQL`

Data yang dikelola meliputi:

- Data pengguna.
- Modul.
- Sub Modul.
- Konten materi.
- Artikel.
- Video.
- Diskusi.

## Authentication

Sistem menyediakan fitur authentication yang meliputi:

- Register.
- Login.
- Pengaturan profil.
- Ubah password.
- Validasi input.
- Proteksi halaman.

## Authorization

Authorization diterapkan untuk membedakan akses berdasarkan role.

Role yang tersedia:

- Admin.
- User.

Hak akses disesuaikan dengan fungsi masing-masing pengguna.

## Role-Based Access Control

Role-based access digunakan untuk mengatur akses antara Admin dan User.

Admin memiliki kewenangan pengelolaan data dan sistem yang lebih luas, sedangkan User memiliki akses terhadap fungsi penggunaan platform.

Proteksi halaman diterapkan berdasarkan role.

## Content Management

Nusa Dakwah memiliki sistem pengelolaan konten dakwah yang disusun secara bertingkat.

Struktur utama:

Modul
→ Sub Modul
→ Konten Materi

Struktur ini digunakan agar materi dakwah dapat disusun dan diakses secara lebih terorganisasi.

## Modul

Modul digunakan sebagai tingkat utama dalam struktur materi.

Admin dapat mengelola data Modul melalui dashboard admin.

## Sub Modul

Sub Modul berada di bawah Modul.

Sub Modul digunakan untuk membagi materi menjadi bagian yang lebih spesifik.

## Konten Materi

Konten Materi berada di dalam struktur Modul dan Sub Modul.

Konten dapat memuat berbagai jenis informasi yang berkaitan dengan materi dakwah.

## Halaman Detail Materi

Halaman detail materi mengintegrasikan beberapa jenis konten dalam satu halaman.

Konten yang tersedia mencakup:

- Artikel.
- Gambar pendukung.
- Video kajian berbasis YouTube.
- Forum diskusi.

Pendekatan ini memungkinkan materi utama dan interaksi pengguna tersedia dalam satu konteks halaman.

## Artikel

Platform mendukung penyajian artikel sebagai bagian dari materi dakwah digital.

Artikel dikelola melalui sistem content management.

## Video Kajian

Video kajian dapat disajikan melalui integrasi YouTube.

Video digunakan sebagai salah satu format penyampaian materi pada halaman konten.

## Pencarian Konten

Frontend menyediakan fitur pencarian untuk membantu pengguna menemukan materi yang tersedia pada platform.

Pencarian menjadi bagian dari fungsi navigasi konten Nusa Dakwah.

## Forum Diskusi

Nusa Dakwah memiliki forum diskusi yang terintegrasi dengan materi.

Forum digunakan untuk mendukung interaksi antara pengguna dan admin pada setiap materi.

Fitur forum mencakup:

- Komentar.
- Balasan.
- Nested reply.
- Moderation.
- Pengelolaan diskusi oleh admin.

## Nested Reply

Forum mendukung struktur balasan bertingkat.

Nested reply digunakan agar pengguna dapat memberikan respons terhadap komentar atau diskusi yang sudah tersedia.

## Moderation

Admin memiliki fungsi pengelolaan diskusi untuk membantu menjaga data forum tetap terstruktur.

## Validasi Input

Backend Laravel melakukan validasi terhadap input yang masuk ke sistem.

Validasi digunakan pada berbagai proses aplikasi, termasuk form dan forum diskusi.

## Sanitasi Input Forum

Input pada forum juga melalui proses sanitasi untuk menjaga data interaksi pengguna tetap terstruktur.

## User Management

Dashboard admin menyediakan fungsi pengelolaan pengguna.

Cakupan meliputi:

- Daftar pengguna.
- Detail akun.
- Reset password.
- Penghapusan akun.

## Account Settings

Pengguna memiliki fungsi pengaturan akun yang mencakup:

- Profile.
- Informasi akun.
- Ubah password.

## Dashboard Admin

Dashboard admin digunakan untuk mengelola berbagai bagian platform.

Cakupan pengelolaan:

- Modul.
- Sub Modul.
- Konten Materi.
- Diskusi.
- Pengguna.

Operasi yang tersedia sesuai fungsi masing-masing bagian meliputi:

- Tambah.
- Lihat.
- Edit.
- Hapus.

## Integrasi Frontend dan Backend

Frontend Next.js terhubung dengan Laravel RESTful API.

Alur:

Next.js
→ RESTful API
→ Laravel
→ MySQL

Data yang terintegrasi mencakup:

- Konten.
- Pengguna.
- Diskusi.
- Authentication.
- Informasi sistem lainnya.

## Quality Assurance

Quality Assurance dilakukan menggunakan Katalon Studio.

Pendekatan testing:

- Manual Testing.
- Automation Testing.

Pengujian dilakukan untuk memvalidasi:

- Fungsi utama website.
- Alur pengguna.
- Authentication.
- Authorization.
- Role-based access.
- Content management.
- Discussion forum.
- Integrasi fungsi utama sebelum deployment production.

## Deployment

Aplikasi menggunakan Docker untuk proses containerization.

Environment deployment:

- Docker.
- Linux Ubuntu.

Aplikasi kemudian dijalankan pada environment production.

## Containerization

Docker digunakan untuk melakukan containerization terhadap komponen aplikasi sebelum deployment.

## Core Development Scope

### UI/UX Design

- Figma.
- Wireframe.
- User Flow.
- Interface Design.
- Landing Page.
- User Pages.
- Admin Dashboard.

### Authentication & Authorization

- Register.
- Login.
- Account Settings.
- Admin Role.
- User Role.
- Role-Based Access Control.
- Protected Page.

### Content Management

- Modul.
- Sub Modul.
- Konten Materi.
- Artikel.
- Video.
- Search.

### Discussion Forum

- Comment.
- Nested Reply.
- Moderation.
- Admin Discussion Management.

### User Management

- User List.
- Account Detail.
- Reset Password.
- Delete Account.

### Frontend Development

- Next.js.
- React.
- Responsive Interface.
- API Integration.

### Backend Development

- Laravel.
- PHP.
- RESTful API.
- Validation.
- Business Logic.

### Database

- MySQL.

### Quality Assurance

- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Software Testing.

### Deployment

- Docker.
- Linux Ubuntu.
- Containerization.
- Production Deployment.

## Alur Teknis Keseluruhan

Figma
→ UI/UX Design
→ Next.js Frontend
→ Laravel RESTful API
→ MySQL Database
→ Katalon Studio Quality Assurance
→ Docker Containerization
→ Linux Ubuntu Deployment

## Teknologi yang Digunakan

### UI/UX

- Figma
- UI/UX Design
- Wireframe
- User Flow
- Responsive Web Design

### Frontend

- Next.js
- React

### Backend

- Laravel
- PHP
- RESTful API
- Business Logic
- Form Validation

### Database

- MySQL

### Authentication & Authorization

- Authentication
- Authorization
- Role-Based Access Control

### Content Management

- Content Management System
- CRUD
- Search
- YouTube Integration

### Discussion

- Discussion Forum
- Comment
- Nested Reply
- Moderation

### Quality Assurance

- Katalon Studio
- Manual Testing
- Automation Testing
- Software Testing

### Deployment

- Docker
- Linux Ubuntu
- Containerization
- Deployment

## Kompetensi yang Berkaitan

- Figma
- UI/UX Design
- Next.js
- React
- Laravel
- PHP
- RESTful API
- MySQL
- Katalon Studio
- Quality Assurance
- Manual Testing
- Automation Testing
- Software Testing
- Docker
- Linux Ubuntu
- Fullstack Development
- Frontend Development
- Backend Development
- API Integration
- Authentication
- Authorization
- Role-Based Access Control
- Content Management System
- CRUD
- Form Validation
- Discussion Forum
- Nested Reply
- Responsive Web Design
- Deployment

## Asset Project

Path asset:

assets/projects/nusa-dakwah/

Asset yang tersedia:

- nusa-6.webp
- nusa-1.webp
- nusa-2.webp
- nusa-3.webp
- nusa-4.webp
- nusa-5.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, urutan screenshot, caption, alt text, layout gallery, animasi, penempatan gambar, dan presentasi visual tidak ditentukan dalam file data ini.

Coding agent menentukan penggunaan asset berdasarkan desain dan kebutuhan implementasi website.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan berdasarkan dokumentasi:

- Fullstack development.
- Figma UI/UX Design.
- Next.js frontend.
- Laravel RESTful API.
- MySQL.
- Admin dan User role.
- Role-based access.
- Modul, Sub Modul, dan Konten Materi.
- Artikel.
- Video kajian.
- Pencarian konten.
- Forum diskusi.
- Nested reply.
- User management.
- Validasi input.
- Sanitasi input forum.
- Katalon Studio.
- Manual Testing.
- Automation Testing.
- Docker.
- Linux Ubuntu.
- Production deployment.

Jangan membuat klaim mengenai:

- Jumlah pengguna aktif.
- Persentase peningkatan engagement.
- Persentase peningkatan pemahaman pengguna.
- Persentase peningkatan efektivitas dakwah.
- Conversion rate.
- Test coverage.
- Pass rate.
- Persentase pengurangan error.
- Persentase peningkatan performa.
- Dampak kuantitatif lainnya.

kecuali tersedia data pengukuran terpisah yang mendukung klaim tersebut.