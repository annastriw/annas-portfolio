---
judul: "Footy Standings"
slug: "footy-standings"
jenis: "Project"
jenis_project: "Mobile Application / REST API Integration"
peran: "Flutter Developer"
platform: "Mobile"
bahasa_utama: "Dart"
asset_path: "assets/projects/footy-standings/"
---

# Footy Standings

## Project Snapshot

- **Nama Project:** Footy Standings
- **Jenis Project:** Mobile Application / REST API Integration
- **Peran:** Flutter Developer
- **Platform:** Mobile
- **Bahasa Utama:** Dart
- **Framework:** Flutter
- **Data Source:** Football Data REST API
- **Core Stack:** Flutter, Dart, Football Data REST API, HTTP, JSON, Material Design, url_launcher
- **Fokus:** Mobile Development, REST API Integration, JSON Parsing, Asynchronous Data Fetching, dan Material Design

## Ringkasan Project

Footy Standings merupakan aplikasi mobile berbasis Flutter dan Dart yang dikembangkan untuk menampilkan informasi sepak bola menggunakan data dari Football Data REST API.

Aplikasi mengintegrasikan enam kompetisi sepak bola dan menyediakan empat fitur data utama, yaitu klasemen liga, jadwal pertandingan berikutnya, daftar top scorer, dan detail klub.

Project mencakup proses HTTP request, JSON parsing, asynchronous data fetching, structured data models, state handling, navigation antarhalaman, Material Design UI, serta integrasi website resmi klub menggunakan `url_launcher`.

## Peran

Flutter Developer.

## Tanggung Jawab

- Mengembangkan aplikasi mobile menggunakan Flutter dan Dart.
- Mengintegrasikan Football Data REST API.
- Mengembangkan HTTP request untuk mengambil data sepak bola.
- Melakukan JSON parsing.
- Mengembangkan halaman League Standings.
- Mengembangkan halaman Next Fixtures.
- Mengembangkan halaman Top Scorers.
- Mengembangkan Club Detail Screen.
- Mengembangkan asynchronous data fetching.
- Mengimplementasikan loading state.
- Mengimplementasikan error state.
- Mengimplementasikan empty data state.
- Mengimplementasikan success state.
- Membuat structured Dart data models.
- Mengembangkan BottomNavigationBar.
- Mengembangkan navigasi antarhalaman.
- Menggunakan komponen Flutter Material Design.
- Mengintegrasikan `url_launcher`.
- Menambahkan fallback icon ketika crest klub gagal dimuat.
- Menyusun struktur kode ke dalam Pages, Screens, dan Widgets.

## Kompetisi yang Didukung

Aplikasi dikonfigurasi untuk menampilkan data dari enam kompetisi sepak bola:

1. Premier League
2. La Liga
3. Bundesliga
4. Serie A
5. Ligue 1
6. Primeira Liga

Primeira Liga digunakan sebagai kompetisi keenam berdasarkan konfigurasi pada source code yang terdokumentasi.

## Fitur Utama

Terdapat empat fitur data utama berbasis API.

### 1. League Standings

Fitur League Standings digunakan untuk menampilkan klasemen kompetisi.

Informasi yang ditampilkan mencakup:

- Posisi.
- Logo tim.
- Jumlah pertandingan.
- Jumlah kemenangan.
- Jumlah seri.
- Jumlah kekalahan.
- Goals for.
- Goals against.
- Poin.

Data tim pada halaman standings juga dapat digunakan untuk membuka Club Detail Screen melalui `teamId`.

## Club Detail

Club Detail Screen menampilkan informasi lebih lengkap mengenai sebuah klub.

Data yang ditampilkan mencakup:

- Nama klub.
- Alamat.
- Tahun berdiri.
- Warna klub.
- Stadion.
- Crest / logo klub.
- Website resmi.

Club Detail Screen dihubungkan dengan data pada League Standings menggunakan `teamId`.

## Website Klub

Aplikasi menggunakan:

`url_launcher`

untuk membuka website resmi klub melalui external application.

Jika crest klub gagal dimuat, aplikasi menyediakan fallback icon.

### 2. Next Fixtures

Fitur Next Fixtures digunakan untuk menampilkan pertandingan mendatang.

Pertandingan yang ditampilkan memiliki status:

`SCHEDULED`

Informasi pertandingan meliputi:

- Tanggal.
- Waktu.
- Home team.
- Away team.

### 3. Top Scorers

Fitur Top Scorers menampilkan data pencetak gol berdasarkan kompetisi.

Informasi yang ditampilkan mencakup:

- Nama pemain.
- Klub.
- Crest tim.
- Jumlah gol.

### 4. Club Details

Fitur Club Details digunakan untuk menampilkan informasi detail klub yang dipilih dari data kompetisi.

Informasi meliputi:

- Nama.
- Alamat.
- Tahun berdiri.
- Warna klub.
- Stadion.
- Crest.
- Website resmi.

## REST API Integration

Aplikasi menggunakan Football Data REST API sebagai sumber data.

Data yang diambil melalui API digunakan untuk fitur:

- League Standings.
- Upcoming Fixtures.
- Top Scorers.
- Club Details.

Komunikasi data menggunakan:

- HTTP Request.
- REST API.
- JSON Response.
- JSON Parsing.

## Asynchronous Data Fetching

Pengambilan data dilakukan secara asynchronous menggunakan:

- `Future`
- `FutureBuilder`
- `initState()`

Pendekatan ini digunakan untuk mengambil data dari API tanpa memblokir antarmuka aplikasi.

## Data States

Aplikasi menangani beberapa kondisi selama proses pengambilan data.

### Loading State

Ditampilkan ketika proses pengambilan data sedang berlangsung.

### Error State

Ditampilkan ketika terjadi error saat mengambil atau memproses data.

### Empty Data State

Digunakan ketika response tidak menghasilkan data yang dapat ditampilkan.

### Success State

Digunakan ketika data berhasil diperoleh dan dapat ditampilkan pada antarmuka.

## Structured Data Models

Project memiliki empat structured data models utama.

### 1. TeamStanding

Digunakan untuk memetakan data klasemen tim.

### 2. Match

Digunakan untuk memetakan data pertandingan.

### 3. TopScorer

Digunakan untuk memetakan data pencetak gol.

### 4. ClubDetail

Digunakan untuk memetakan data detail klub.

Data model membantu mengubah JSON response menjadi object Dart yang lebih terstruktur.

## JSON Parsing

Response dari Football Data REST API diproses melalui JSON parsing.

Data JSON kemudian dipetakan ke model Dart sesuai jenis datanya.

Alur umum:

Football Data REST API
→ HTTP Request
→ JSON Response
→ JSON Parsing
→ Dart Data Model
→ Flutter UI

## Navigation

Aplikasi menggunakan BottomNavigationBar dengan lima menu utama:

1. Standings
2. Next Fixtures
3. Top Scorer
4. Profile
5. About

Navigasi menuju halaman detail menggunakan:

- `Navigator.push()`
- `MaterialPageRoute`

## League Selector

Terdapat tiga league selector pages yang terdokumentasi.

League selector digunakan pada:

1. Standings
2. Next Fixtures
3. Top Scorers

Pengguna dapat memilih kompetisi sebelum melihat data berdasarkan kategori tersebut.

## Material Design

Antarmuka aplikasi dibangun menggunakan komponen Flutter Material Design.

Komponen yang digunakan antara lain:

- BottomNavigationBar
- GridView.builder
- ListView.builder
- Card
- ListTile
- AppBar

Komponen tersebut digunakan untuk menyusun navigasi dan tampilan data aplikasi.

## GridView

`GridView.builder` digunakan pada bagian aplikasi yang membutuhkan penyajian data dalam bentuk grid.

## ListView

`ListView.builder` digunakan untuk menampilkan data berbentuk daftar secara dinamis.

## Card dan ListTile

`Card` dan `ListTile` digunakan sebagai bagian dari penyajian informasi pada antarmuka berbasis Material Design.

## External URL Integration

`url_launcher` digunakan untuk membuka website resmi klub melalui aplikasi eksternal.

Integrasi tersebut terdapat pada Club Detail Screen.

## Image Error Handling

Aplikasi menyediakan fallback icon ketika crest atau logo klub gagal dimuat.

Hal ini digunakan untuk menangani kondisi ketika sumber gambar tidak tersedia atau gagal ditampilkan.

## Struktur Kode

Source code disusun ke dalam beberapa direktori utama.

### Pages

Digunakan untuk bagian yang berkaitan dengan navigasi utama aplikasi.

### Screens

Digunakan untuk halaman-halaman yang menampilkan data dan fungsi tertentu.

### Widgets

Digunakan untuk reusable UI components.

Pemisahan tersebut digunakan untuk mengorganisasi kode berdasarkan tanggung jawab masing-masing bagian.

## Alur Data

Alur data utama:

Football Data REST API
→ HTTP Request
→ JSON Response
→ JSON Parsing
→ Structured Dart Model
→ Future / FutureBuilder
→ State Handling
→ Flutter UI

## Alur Navigasi

Alur navigasi utama:

BottomNavigationBar
→ Pilih Menu
→ Pilih Kompetisi
→ Ambil Data API
→ Tampilkan Data

Untuk detail klub:

League Standings
→ Pilih Tim
→ `teamId`
→ Club Detail Screen
→ Informasi Klub
→ Website Resmi

## Teknologi yang Digunakan

### Framework

- Flutter

### Programming

- Dart

### Mobile Development

- StatefulWidget
- StatelessWidget

### REST API

- Football Data REST API
- HTTP Request
- API Integration

### Data Processing

- JSON
- JSON Parsing
- Structured Data Models

### Asynchronous Programming

- Future
- FutureBuilder
- initState()

### User Interface

- Material Design
- BottomNavigationBar
- GridView
- ListView
- Card
- ListTile
- AppBar

### Navigation

- Navigator
- Navigator.push()
- MaterialPageRoute

### External Integration

- url_launcher

### Error Handling

- Loading State
- Error State
- Empty State
- Success State
- Image Fallback

## Angka Teknis yang Aman Digunakan

### Kompetisi

- Kompetisi yang dikonfigurasi: 6
- Premier League
- La Liga
- Bundesliga
- Serie A
- Ligue 1
- Primeira Liga

### Fitur Data

- Fitur utama berbasis API: 4
- League Standings
- Upcoming Fixtures
- Top Scorers
- Club Details

### Navigation

- Menu utama BottomNavigationBar: 5
- Standings
- Next Fixtures
- Top Scorer
- Profile
- About

### Data Models

- Structured data models: 4
- TeamStanding
- Match
- TopScorer
- ClubDetail

### League Selector

- League selector pages: 3
- Standings
- Next Fixtures
- Top Scorers

## Kompetensi yang Berkaitan

- Flutter
- Dart
- Mobile Development
- REST API
- HTTP Request
- JSON
- JSON Parsing
- Future
- FutureBuilder
- StatefulWidget
- StatelessWidget
- Material Design
- BottomNavigationBar
- GridView
- ListView
- Navigator
- MaterialPageRoute
- url_launcher
- API Integration
- Error Handling
- Asynchronous Programming
- Structured Data Models
- Mobile UI Development

## Asset Project

Path asset:

assets/projects/footy-standings/

Asset yang tersedia:

- footy-standings-4.webp
- footy-standings-1.webp
- footy-standings-2.webp
- footy-standings-3.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, urutan screenshot, caption, alt text, layout, penggunaan mockup, animasi, dan presentasi visual tidak ditentukan dalam file data ini.

Coding agent menentukan penggunaan asset berdasarkan desain dan kebutuhan implementasi website.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan:

- Flutter dan Dart.
- Integrasi Football Data REST API.
- Enam kompetisi.
- Empat fitur data utama.
- HTTP request.
- JSON parsing.
- Asynchronous data fetching.
- Future dan FutureBuilder.
- Structured data models.
- Loading, error, empty, dan success states.
- Material Design UI.
- BottomNavigationBar.
- url_launcher.
- Club Detail Screen.
- Fallback icon untuk crest yang gagal dimuat.

Jangan menyebut data sebagai:

- Real-time data.
- Live update.
- Real-time score.
- Real-time fixture update.

apabila refresh cadence atau karakteristik real-time dari API belum diverifikasi.

Untuk dokumentasi publik, gunakan Primeira Liga sebagai kompetisi keenam karena kompetisi tersebut yang dikonfigurasi pada source code.