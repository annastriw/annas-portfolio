---
judul: "Panoramic Virtual Tour"
slug: "panoramic-virtual-tour"
jenis: "Project"
jenis_project: "Interactive Multimedia / 360° Virtual Tour / 3D Visualization"
organisasi: "PT Duta Basis Dataprima"
divisi: "IT Division"
peran: "Junior Game Developer"
periode: "8 Juli 2024 - 8 Agustus 2024"
durasi: "1 bulan"
status: "Completed Prototype"
asset_path: "assets/projects/panoramic-virtual-tour/"
---

# Panoramic Virtual Tour

## Project Snapshot

- **Nama Project:** Panoramic Virtual Tour
- **Jenis Project:** Interactive Multimedia / 360° Virtual Tour / 3D Visualization
- **Organisasi:** PT Duta Basis Dataprima
- **Divisi:** IT Division
- **Peran:** Junior Game Developer
- **Periode:** 8 Juli 2024 - 8 Agustus 2024
- **Durasi:** 1 bulan
- **Status:** Completed Prototype
- **Core Stack:** Unity, C#, Lumion Pro, Visual Studio Code
- **Fokus:** 360° Panorama, 3D Visualization, Physics Raycast, Navigation Hotspots, dan Unity Scene Management

## Ringkasan Project

Panoramic Virtual Tour merupakan project visualisasi interaktif proyek bangunan melalui eksplorasi panorama 360°.

Project dikembangkan selama kegiatan kerja praktik sebagai Junior Game Developer pada Divisi IT PT Duta Basis Dataprima.

Proses pengembangan mencakup pengolahan visual 3D menggunakan Lumion Pro, rendering panorama 360°, integrasi hasil render ke Unity, pembangunan mekanisme 360 View, pengembangan kontrol kamera berbasis mouse dan touch, serta implementasi Navigation Hotspots untuk perpindahan antar lokasi virtual.

Prototype yang dihasilkan memiliki dua fungsi inti, yaitu 360 View dan Navigation Hotspots.

## Peran

Junior Game Developer pada Divisi IT PT Duta Basis Dataprima.

## Tanggung Jawab

- Berkontribusi dalam pengembangan Panoramic Virtual Tour.
- Mengolah visual 3D menggunakan Lumion Pro.
- Menyiapkan titik panorama pada model bangunan.
- Menerapkan material dan tekstur.
- Melakukan rendering panorama 360°.
- Mengatur konfigurasi visual seperti Sun, Shadow, dan Reflection.
- Mengimpor hasil render panorama ke Unity.
- Mengembangkan mekanisme 360 View.
- Mengembangkan kontrol pandangan menggunakan mouse dan touch.
- Mengembangkan sistem navigasi antar panorama.
- Mengimplementasikan Physics Raycast.
- Menggunakan Box Collider untuk interaksi hotspot.
- Mengembangkan scene management.
- Membuat reusable Hotspot Prefab / Template.
- Mengembangkan persistent PlayerRig.
- Mengintegrasikan seluruh scene ke Unity Build Settings.
- Menghasilkan prototype Panoramic Virtual Tour.
- Mempresentasikan hasil project kepada Direktur PT Duta Basis Dataprima.

## Workflow Pengembangan

Alur utama pengerjaan project:

Model / Visual 3D
→ Material dan Texture
→ Rendering Panorama 360°
→ Import ke Unity
→ 360 View
→ Camera Interaction
→ Navigation Hotspots
→ Scene Management
→ Build Prototype

## Pengolahan Visual 3D

Tahap awal project dilakukan menggunakan Lumion Pro.

Aktivitas yang dilakukan meliputi:

- Menyiapkan titik panorama pada model bangunan.
- Mengatur material.
- Mengatur tekstur.
- Menentukan posisi panorama.
- Mengatur konfigurasi visual.
- Melakukan rendering panorama 360°.

Konfigurasi visual yang digunakan mencakup:

- Sun
- Shadow
- Reflection

Sebanyak 78 titik panorama disiapkan dan dirender untuk digunakan dalam aplikasi.

## Panorama 360°

Project menggunakan 78 hasil render panorama 360°.

Seluruh panorama kemudian diimpor ke Unity untuk digunakan sebagai lingkungan visual pada masing-masing lokasi virtual.

## Implementasi 360 View

Mekanisme 360 View dikembangkan di Unity.

Implementasi menggunakan:

- 3D Sphere
- Albedo
- Color Emission
- Panorama 360°

Hasil render panorama digunakan sebagai visual pada 3D Sphere sehingga pengguna dapat melihat lingkungan secara 360°.

## Struktur Scene

Aplikasi memiliki struktur hingga 79 scene.

Struktur scene terdiri dari:

- init
- loby
- Scene1 sampai Scene77

Scene digunakan untuk merepresentasikan lokasi-lokasi berbeda di dalam Panoramic Virtual Tour.

Seluruh scene kemudian diintegrasikan melalui Unity Build Settings.

## Navigation Hotspots

Navigation Hotspots digunakan untuk memungkinkan pengguna berpindah dari satu lokasi panorama ke lokasi lainnya.

Implementasi menggunakan:

- Physics Raycast
- Box Collider
- Tag `GantiScene`
- SceneManager.LoadSceneAsync()

Saat pengguna berinteraksi dengan hotspot, sistem mendeteksi objek tujuan dan menjalankan perpindahan menuju scene yang telah ditentukan.

## Reusable Hotspot

Hotspot dikembangkan sebagai prefab / template yang dapat digunakan kembali.

Reusable Hotspot memungkinkan komponen navigasi diterapkan pada banyak scene dengan menyesuaikan:

- Target scene
- Posisi hotspot
- Arah kamera

Pendekatan ini memungkinkan mekanisme navigasi yang sama digunakan kembali pada berbagai lokasi panorama.

## Camera Interaction

Kontrol pandangan pengguna dikembangkan untuk mendukung interaksi menggunakan mouse maupun touch.

Implementasi berkaitan dengan:

- Touchpad.cs
- IPointerDownHandler
- IPointerUpHandler
- PlayerRig
- PlayerControl.Look

Kontrol tersebut digunakan agar pengguna dapat mengubah arah pandangan ketika mengeksplorasi panorama 360°.

## Persistent PlayerRig

`PlayerRig.cs` menggunakan `DontDestroyOnLoad()` agar kontrol pengguna tetap tersedia ketika aplikasi berpindah antar scene.

Pendekatan ini memungkinkan komponen PlayerRig tetap aktif selama proses navigasi antar lokasi virtual.

## Scene Management

Scene management digunakan untuk mengatur perpindahan antar panorama.

Implementasi mencakup:

- Unity Scene Management
- SceneManager.LoadSceneAsync()
- Unity Build Settings
- Navigation Hotspots
- Persistent PlayerRig

Perpindahan scene dilakukan secara asynchronous melalui `SceneManager.LoadSceneAsync()`.

## Script Unity

Empat script Unity utama yang terdokumentasi dalam project:

### Touchpad.cs

Digunakan sebagai bagian dari mekanisme interaksi dan kontrol pandangan pengguna.

### TapToTouchObject.cs

Digunakan sebagai bagian dari mekanisme interaksi terhadap objek pada aplikasi.

### PlayerRig.cs

Digunakan untuk mendukung kontrol pengguna dan persistent PlayerRig antar scene.

### Mulai.cs

Merupakan salah satu script utama yang digunakan dalam struktur aplikasi.

## Fungsi Inti

Prototype memiliki dua fungsi inti yang terdokumentasi:

### 1. 360 View

Memungkinkan pengguna melihat lingkungan proyek bangunan melalui panorama 360°.

### 2. Navigation Hotspots

Memungkinkan pengguna berpindah antar lokasi panorama melalui hotspot interaktif.

## Presentasi Project

Setelah proses pengembangan, hasil Panoramic Virtual Tour dipresentasikan kepada Direktur PT Duta Basis Dataprima sebagai bagian dari penyampaian hasil kerja praktik.

## Teknologi yang Digunakan

### Game Engine

- Unity

### Programming

- C#

### 3D Visualization

- Lumion Pro
- 360° Panorama
- 3D Visualization
- 3D Model
- Material
- Texture

### Development Tool

- Visual Studio Code

### Unity Features

- Unity Scene Management
- Physics Raycast
- Prefab
- Box Collider
- Event System
- IPointerDownHandler
- IPointerUpHandler
- SceneManager.LoadSceneAsync()
- DontDestroyOnLoad()
- 3D Sphere
- Albedo
- Color Emission

## Angka Teknis yang Aman Digunakan

- Periode pengembangan: 1 bulan
- Periode: 8 Juli 2024 - 8 Agustus 2024
- Panorama 360°: 78
- Titik panorama: 78
- Struktur aplikasi: hingga 79 scene
- Scene: init, loby, dan Scene1-Scene77
- Fungsi inti: 2
- Fungsi inti: 360 View dan Navigation Hotspots
- Script Unity utama yang terdokumentasi: 4
- Tools utama: 3
- Tools utama: Unity, Lumion Pro, dan Visual Studio Code

## Kompetensi yang Berkaitan

- Unity
- C#
- Lumion Pro
- Visual Studio Code
- 360° Panorama
- 3D Visualization
- Interactive Multimedia
- Game Development
- Unity Scene Management
- Physics Raycast
- Prefab
- Box Collider
- Event System
- IPointerDownHandler
- IPointerUpHandler
- SceneManager.LoadSceneAsync
- DontDestroyOnLoad
- 3D Model
- Camera Interaction
- Mouse Interaction
- Touch Interaction
- Scene Navigation

## Asset Project

Path asset:

assets/projects/panoramic-virtual-tour/

Asset yang tersedia:

- Pano-1.webp
- Pano-2.webp
- Pano-3.webp
- Pano-4.webp
- Pano-5.webp
- Pano-6.webp
- Pano-7.webp

Asset di atas merupakan data visual mentah project.

Pemilihan cover, urutan gambar, caption, alt text, layout gallery, animasi, serta penempatan masing-masing asset tidak ditentukan pada file data ini.

Keputusan desain dan presentasi visual dilakukan pada tahap implementasi website oleh coding agent.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan berdasarkan dokumentasi:

- 78 panorama 360°
- Struktur hingga 79 scene
- 360 View
- Navigation Hotspots
- Physics Raycast
- Unity Scene Management
- Reusable Hotspot Prefab
- Mouse dan touch camera interaction
- Presentasi hasil kepada perusahaan

Jangan membuat klaim mengenai:

- Persentase peningkatan pemahaman pengguna
- Persentase peningkatan engagement
- Persentase peningkatan efisiensi
- Persentase keberhasilan penggunaan
- Jumlah pengguna
- Dampak bisnis kuantitatif
- Metrik lain yang tidak terdokumentasi

AR, VR, dan WebGL tidak dicantumkan sebagai fitur yang telah selesai karena pada dokumentasi hanya merupakan arah pengembangan lanjutan.