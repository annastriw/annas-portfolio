---
judul: "Speech-to-Text System"
slug: "speech-to-text-system"
jenis: "Project"
jenis_project: "AI/ML Application / Automatic Speech Recognition / Audio-Video Processing"
peran: "Machine Learning / AI Developer"
platform: "Google Colab / Python Workflow"
model_utama: "facebook/wav2vec2-base-960h"
status: "Completed"
asset_path: "assets/projects/speech-to-text-system/"
---

# Speech-to-Text System

## Project Snapshot

- **Nama Project:** Speech-to-Text System
- **Jenis Project:** AI/ML Application / Automatic Speech Recognition / Audio-Video Processing
- **Peran:** Machine Learning / AI Developer
- **Platform:** Google Colab / Python Workflow
- **Model Utama:** facebook/wav2vec2-base-960h
- **Core Stack:** Python, Hugging Face Transformers, Wav2Vec2, Librosa, FFmpeg, Pandas, Matplotlib, Google Colab
- **Fokus:** Speech-to-Text, Automatic Speech Recognition, Audio Processing, Subtitle Generation, dan Video Processing

## Ringkasan Project

Speech-to-Text System merupakan workflow berbasis Artificial Intelligence dan Automatic Speech Recognition untuk mengubah input audio maupun video menjadi teks secara otomatis.

Project menggunakan pretrained model `facebook/wav2vec2-base-960h` sebagai model Automatic Speech Recognition.

Workflow dikembangkan secara end-to-end mulai dari upload file audio atau video, ekstraksi audio, preprocessing, konversi audio menjadi mono 16 kHz, pembagian audio berdurasi panjang menjadi beberapa chunk, proses transkripsi menggunakan Wav2Vec2, penyimpanan hasil transkripsi, pembuatan subtitle SRT, hingga menghasilkan video akhir dengan burned-in subtitle.

Hasil transkripsi dapat disimpan dalam tiga format data, yaitu TXT, CSV, dan JSON.

## Peran

Machine Learning / AI Developer.

## Tanggung Jawab

- Mengembangkan workflow Speech-to-Text menggunakan Python.
- Menggunakan pretrained Wav2Vec2 sebagai model Automatic Speech Recognition.
- Mengintegrasikan Hugging Face Transformers.
- Mengembangkan workflow untuk input audio dan video.
- Mengekstrak audio dari file video.
- Melakukan preprocessing audio.
- Mengonversi audio menjadi mono 16 kHz.
- Membagi audio panjang menjadi beberapa chunk.
- Menjalankan ASR inference.
- Menggabungkan hasil transkripsi.
- Menghasilkan output transkripsi TXT.
- Menghasilkan output transkripsi CSV.
- Menghasilkan output transkripsi JSON.
- Mengembangkan subtitle otomatis berformat SRT.
- Mengintegrasikan subtitle ke dalam video.
- Menghasilkan video dengan burned-in subtitle.
- Mendokumentasikan perbandingan video sebelum dan setelah subtitle.
- Menggunakan Google Colab sebagai environment pengembangan.

## Tujuan Project

Project dikembangkan untuk membangun workflow Automatic Speech Recognition yang dapat:

- Menerima input audio.
- Menerima input video.
- Mengekstrak audio dari video.
- Menyesuaikan format audio dengan kebutuhan model.
- Menangani audio berdurasi panjang melalui chunking.
- Mengubah suara menjadi teks.
- Menyimpan hasil transkripsi dalam beberapa format.
- Membuat subtitle otomatis.
- Menghasilkan video dengan subtitle yang tertanam.

## Model Automatic Speech Recognition

Model yang digunakan:

`facebook/wav2vec2-base-960h`

Model tersebut merupakan pretrained model Wav2Vec2 yang digunakan untuk melakukan inference Speech-to-Text.

Project menggunakan pretrained model dan tidak mendokumentasikan proses fine-tuning pada implementasi ini.

## Input

Sistem mendukung dua jenis input utama:

### Audio

File audio dapat diproses langsung melalui workflow Speech-to-Text.

### Video

Jika input berupa video, audio terlebih dahulu diekstrak dari file video sebelum diproses oleh model.

## Workflow Utama

Alur utama project:

Upload Audio / Video
→ Ekstraksi Audio
→ Audio Preprocessing
→ Konversi Mono 16 kHz
→ Audio Chunking
→ Wav2Vec2 ASR Inference
→ Hasil Transkripsi
→ TXT / CSV / JSON
→ SRT Subtitle
→ Burned-in Subtitle Video

## Ekstraksi Audio dari Video

Jika input berupa video, FFmpeg digunakan untuk mengekstrak audio.

Audio hasil ekstraksi kemudian diproses agar sesuai dengan kebutuhan input model Automatic Speech Recognition.

## Audio Preprocessing

Audio dikonversi menjadi format:

- Mono.
- Sampling rate 16 kHz.

Konfigurasi tersebut digunakan untuk menyesuaikan audio dengan kebutuhan input model Wav2Vec2 yang digunakan.

## 16 kHz Audio

Sampling rate yang digunakan:

`16 kHz`

Audio diproses dalam format mono sebelum masuk ke tahap inference.

## Audio Chunking

Audio berdurasi panjang dibagi menjadi beberapa chunk.

Chunking digunakan agar proses transkripsi dapat dilakukan secara lebih terstruktur pada potongan audio yang lebih kecil.

Setiap chunk kemudian diproses melalui model ASR.

## Automatic Speech Recognition

Setelah preprocessing selesai, audio diproses menggunakan Wav2Vec2.

Alur inference:

Audio Chunk
→ Wav2Vec2 Processor
→ Wav2Vec2 Model
→ ASR Inference
→ Text Output

Hasil dari setiap chunk digunakan untuk membentuk transkripsi akhir.

## Hasil Transkripsi

Sistem menghasilkan transkripsi dalam tiga format data utama:

### TXT

Format teks sederhana untuk membaca atau menyimpan hasil transkripsi secara langsung.

### CSV

Format tabular yang dapat digunakan untuk dokumentasi atau analisis lanjutan.

### JSON

Format data terstruktur yang dapat digunakan untuk kebutuhan pemrosesan lebih lanjut.

## Format Output Transkripsi

Tiga format output yang terdokumentasi:

1. TXT
2. CSV
3. JSON

## Subtitle Generation

Selain menghasilkan transkripsi, workflow juga membuat subtitle secara otomatis.

Format subtitle:

`SRT`

Subtitle dibentuk berdasarkan hasil transkripsi pada potongan waktu audio.

## SRT Subtitle

File SRT digunakan untuk menyimpan:

- Urutan subtitle.
- Informasi waktu.
- Teks hasil transkripsi.

SRT kemudian dapat digunakan pada tahap pemrosesan video.

## Burned-in Subtitle

Project menghasilkan video akhir dengan subtitle yang tertanam langsung pada video.

Proses ini dilakukan menggunakan FFmpeg.

Alur:

Video Original
→ SRT Subtitle
→ FFmpeg
→ Video dengan Burned-in Subtitle

Subtitle menjadi bagian dari visual video dan tidak bergantung pada subtitle eksternal ketika video akhir diputar.

## Before dan After

Project menyediakan perbandingan hasil video:

- Before Subtitle.
- After Subtitle.

Perbandingan tersebut digunakan sebagai bukti visual dari hasil workflow pemrosesan video.

## Audio dan Video Processing

FFmpeg digunakan dalam beberapa tahap workflow.

Cakupan penggunaan meliputi:

- Ekstraksi audio dari video.
- Konversi audio.
- Pengaturan sampling rate.
- Pengaturan mono audio.
- Pemrosesan subtitle.
- Burned-in subtitle.

## Google Colab

Google Colab digunakan sebagai environment utama untuk menjalankan workflow project.

Environment tersebut digunakan untuk:

- Menjalankan Python.
- Memuat pretrained model.
- Memproses audio.
- Menjalankan inference.
- Menyimpan hasil transkripsi.
- Membuat subtitle.
- Memproses video.

## Hugging Face Transformers

Hugging Face Transformers digunakan untuk memuat dan menjalankan pretrained Wav2Vec2.

Komponen ini menjadi bagian utama dalam proses Automatic Speech Recognition.

## Wav2Vec2

Wav2Vec2 digunakan sebagai arsitektur/model utama untuk melakukan Speech-to-Text.

Model yang digunakan:

`facebook/wav2vec2-base-960h`

## Librosa

Librosa digunakan sebagai salah satu tool dalam workflow pemrosesan audio.

## Pandas

Pandas digunakan dalam pengelolaan data hasil transkripsi, termasuk output yang berkaitan dengan format tabular.

## Matplotlib

Matplotlib digunakan sebagai bagian dari workflow analisis atau visualisasi data yang berkaitan dengan project.

## FFmpeg

FFmpeg menjadi komponen utama untuk pemrosesan audio dan video.

Penggunaannya mencakup:

- Audio extraction.
- Audio conversion.
- 16 kHz preprocessing.
- Mono conversion.
- Video processing.
- Subtitle processing.
- Burned-in subtitle.

## Alur Teknis Keseluruhan

Input Audio / Video
→ Upload File
→ Identifikasi Input
→ Ekstraksi Audio jika Input Video
→ FFmpeg Audio Processing
→ Mono 16 kHz
→ Audio Chunking
→ Wav2Vec2 Pretrained Model
→ ASR Inference
→ Text Transcription
→ TXT / CSV / JSON
→ SRT Generation
→ FFmpeg Subtitle Processing
→ Burned-in Subtitle Video

## Core Development Scope

### Automatic Speech Recognition

- Wav2Vec2.
- Hugging Face Transformers.
- Pretrained ASR Model.
- Speech-to-Text.
- ASR Inference.

### Audio Processing

- Audio Extraction.
- Mono Audio.
- 16 kHz Sampling Rate.
- Audio Chunking.
- Librosa.
- FFmpeg.

### Data Output

- TXT.
- CSV.
- JSON.

### Subtitle

- SRT.
- Subtitle Generation.
- Timestamp-based Subtitle.

### Video Processing

- FFmpeg.
- Burned-in Subtitle.
- Before / After Video Processing.

### Development Environment

- Python.
- Google Colab.

## Teknologi yang Digunakan

### Programming

- Python

### Artificial Intelligence

- Automatic Speech Recognition
- Speech-to-Text
- Wav2Vec2
- Pretrained Model

### Machine Learning Library

- Hugging Face Transformers

### Audio Processing

- Librosa
- FFmpeg
- Audio Chunking
- 16 kHz Audio
- Mono Audio

### Video Processing

- FFmpeg
- Subtitle Processing
- Burned-in Subtitle

### Data Processing

- Pandas

### Visualization

- Matplotlib

### Subtitle

- SRT

### Output Data

- TXT
- CSV
- JSON

### Environment

- Google Colab

## Angka Teknis yang Aman Digunakan

### Model

- Pretrained ASR model: 1
- Model: facebook/wav2vec2-base-960h

### Audio

- Sampling rate: 16 kHz
- Audio channel configuration: mono

### Transcript Output

- Format output transkripsi: 3
- TXT
- CSV
- JSON

### Subtitle

- Format subtitle otomatis: 1
- Format: SRT

### Video

- Output video dengan burned-in subtitle: 1 jenis output

### Teknologi Utama

- Tools / teknologi utama yang terdokumentasi: 8
- Python
- Google Colab
- Hugging Face Transformers
- Wav2Vec2
- Librosa
- FFmpeg
- Pandas
- Matplotlib

## Kompetensi yang Berkaitan

- Python
- Artificial Intelligence
- Machine Learning
- Automatic Speech Recognition
- ASR
- Wav2Vec2
- Hugging Face Transformers
- Speech-to-Text
- Audio Processing
- Video Processing
- FFmpeg
- Librosa
- Pandas
- Matplotlib
- Google Colab
- Subtitle Generation
- SRT
- JSON
- CSV
- Audio Chunking
- Pretrained Model
- ASR Inference

## Asset Project

Path asset:

assets/projects/speech-to-text-system/

Asset yang tersedia:

- speech-to-text-system.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, caption, alt text, layout, ukuran gambar, animasi, dan presentasi visual tidak ditentukan dalam file data ini.

Coding agent menentukan penggunaan asset berdasarkan desain dan kebutuhan implementasi website.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Klaim yang aman digunakan berdasarkan implementasi:

- Menggunakan pretrained Wav2Vec2.
- Model `facebook/wav2vec2-base-960h`.
- Speech-to-Text untuk audio dan video.
- Ekstraksi audio dari video.
- Mono 16 kHz preprocessing.
- Audio chunking.
- ASR inference.
- Output TXT.
- Output CSV.
- Output JSON.
- Subtitle SRT.
- Burned-in subtitle.
- FFmpeg audio/video processing.

Jangan membuat klaim mengenai:

- Word Error Rate (WER).
- Character Error Rate (CER).
- Accuracy transkripsi.
- Persentase peningkatan akurasi.
- Persentase peningkatan performa.
- Perbandingan performa terhadap model lain.
- Fine-tuning model.
- Model yang telah di-fine-tune.
- Production-grade transcription accuracy.

kecuali tersedia hasil evaluasi atau implementasi terpisah yang mendukung klaim tersebut.

Project harus diposisikan sebagai implementasi end-to-end Automatic Speech Recognition menggunakan pretrained Wav2Vec2, bukan sebagai model ASR hasil fine-tuning sendiri.