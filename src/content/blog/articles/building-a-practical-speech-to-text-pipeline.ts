import type { BlogArticle } from "../article-types";

export const speechToTextPipelineArticle: BlogArticle = {
  index: "04",
  slug: "building-a-practical-speech-to-text-pipeline",
  category: {
    en: "Audio and AI",
    id: "Audio dan AI",
  },
  title: {
    en: "Building a Practical Speech-to-Text Pipeline with Wav2Vec2 and FFmpeg",
    id: "Membangun Pipeline Speech-to-Text Praktis dengan Wav2Vec2 dan FFmpeg",
  },
  abstract: {
    en: "A Google Colab workflow that normalizes audio and video, processes long input in chunks, and turns pretrained Wav2Vec2 output into transcripts and burned-in subtitles.",
    id: "Workflow Google Colab yang menormalisasi audio dan video, memproses input panjang per chunk, lalu mengubah output Wav2Vec2 pralatih menjadi transkrip dan burned-in subtitle.",
  },
  tags: ["Python", "Wav2Vec2", "FFmpeg", "SRT", "Google Colab"],
  sourceProjectSlugs: ["speech-to-text-system"],
  sections: [
    {
      id: "input-handling",
      title: {
        en: "Ingesting Audio and Video Sources in Google Colab",
        id: "Penerimaan Sumber Audio dan Video di Google Colab",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Audio or Video Ingestion",
              "FFmpeg Audio Extraction",
              "16 kHz Mono Standardization",
              "Sequential Audio Chunking",
              "Wav2Vec2 Acoustic Inference",
              "Multi-Format Export TXT CSV JSON",
              "SRT Timestamp Generation",
              "Burned-in Subtitle Video",
            ],
            id: [
              "Penerimaan Audio atau Video",
              "Ekstraksi Audio FFmpeg",
              "Standarisasi Mono 16 kHz",
              "Chunking Audio Sekuensial",
              "Inferensi Akustik Wav2Vec2",
              "Ekspor Format TXT CSV JSON",
              "Pembuatan Timestamp SRT",
              "Video dengan Burned-in Subtitle",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The Speech-to-Text System was architected as an end-to-end Python pipeline inside Google Colab. The pipeline ingests arbitrary user media, accommodating both standalone audio tracks and video files. Because downstream acoustic models expect pure audio signals, video inputs pass through an initial FFmpeg separation phase to extract uncompressed audio streams.",
              "Treating media ingestion as a distinct pipeline stage allows the system to standardize diverse multimedia sources into a single consistent processing contract. Google Colab serves as the operational execution environment, hosting the Python dependencies, GPU inference execution, and file storage workflows.",
            ],
            id: [
              "Speech-to-Text System dirancang sebagai pipeline Python end-to-end di dalam Google Colab. Pipeline menerima berbagai media pengguna, baik rekaman audio murni maupun file video. Karena model akustik membutuhkan sinyal audio terpisah, input video diproses melalui tahap ekstraksi FFmpeg untuk memisahkan stream audio tanpa kompresi.",
              "Memperlakukan penerimaan media sebagai tahapan pipeline tersendiri memungkinkan sistem menstandarisasi beragam format multimedia ke dalam satu kontrak pemrosesan yang konsisten. Google Colab berfungsi sebagai lingkungan eksekusi operasional yang mengelola dependensi Python, inferensi GPU, dan workflow penyimpanan file.",
            ],
          },
        },
      ],
    },
    {
      id: "signal-preprocessing",
      title: {
        en: "Acoustic Standardization and Sequential Chunking",
        id: "Standarisasi Akustik dan Chunking Sekuensial",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Determine uploaded media container type (audio or video).",
              "Extract raw audio streams from video files using FFmpeg.",
              "Resample and downmix audio signals to mono channel at 16 kHz sampling rate using Librosa.",
              "Partition long-duration audio recordings into smaller sequential chunks for stable memory management.",
            ],
            id: [
              "Identifikasi jenis kontainer media yang diunggah (audio atau video).",
              "Ekstrak stream audio mentah dari file video menggunakan FFmpeg.",
              "Resample dan gabungkan sinyal audio menjadi channel mono pada sampling rate 16 kHz menggunakan Librosa.",
              "Bagi rekaman audio berdurasi panjang menjadi beberapa chunk sekuensial untuk manajemen memori yang stabil.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Acoustic neural networks require strict adherence to waveform sampling parameters. Using Librosa and FFmpeg, audio streams are downmixed to single-channel mono and resampled to a 16 kHz sampling rate, matching the exact spectral representation required by the Wav2Vec2 acoustic feature extractor.",
              "To handle long audio recordings without exhausting GPU memory, the preprocessed waveform is divided into sequential chunks. Each audio chunk is processed independently through the inference model, preserving temporal ordering so that timestamps can be accurately mapped back to the original recording timeline.",
            ],
            id: [
              "Jaringan saraf akustik memerlukan kepatuhan ketat terhadap parameter sampling sinyal suara. Menggunakan Librosa dan FFmpeg, stream audio diubah menjadi channel tunggal mono dan di-resample ke sampling rate 16 kHz, sesuai dengan representasi spektra yang dibutuhkan oleh ekstraktor fitur Wav2Vec2.",
              "Untuk memproses rekaman audio panjang tanpa membebani memori GPU, gelombang audio yang telah dipreprocessing dibagi menjadi beberapa chunk sekuensial. Setiap chunk audio diproses secara independen melalui model inferensi, mempertahankan urutan temporal sehingga timestamp dapat dipetakan kembali secara presisi ke garis waktu rekaman asli.",
            ],
          },
        },
      ],
    },
    {
      id: "wav2vec2-inference",
      title: {
        en: "Automatic Speech Recognition with Pretrained Wav2Vec2",
        id: "Automatic Speech Recognition dengan Wav2Vec2 Pralatih",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Speech recognition is performed using the pretrained facebook/wav2vec2-base-960h model loaded via Hugging Face Transformers. The model ingests normalized 16 kHz audio tensors, processes contextual acoustic embeddings across transformer layers, and outputs decoded text tokens for each sequential audio segment.",
              "The pipeline aggregates chunk outputs into three distinct data formats: plaintext TXT for direct reading, tabular CSV structured with Pandas for chunk-by-chunk logging, and structured JSON for programmatic consumption in downstream systems.",
            ],
            id: [
              "Pengenalan ucapan dijalankan menggunakan model pralatih facebook/wav2vec2-base-960h yang dimuat melalui Hugging Face Transformers. Model menerima tensor audio 16 kHz yang telah dinormalisasi, memproses embedding akustik kontekstual pada lapisan transformer, dan menghasilkan token teks terdekode untuk setiap segmen audio.",
              "Pipeline menggabungkan output setiap chunk ke dalam tiga format data: file teks biasa TXT untuk dibaca langsung, format tabular CSV yang disusun dengan Pandas untuk logging per segmen, dan format terstruktur JSON untuk integrasi program lanjutan.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Factual boundary",
            id: "Batas faktual",
          },
          text: {
            en: "The project record documents an ASR pipeline using the pretrained facebook/wav2vec2-base-960h model and does not include model fine-tuning. It does not include a benchmark, Word Error Rate, Character Error Rate, or unverified transcription accuracy claims.",
            id: "Catatan proyek mendokumentasikan pipeline ASR menggunakan model pralatih facebook/wav2vec2-base-960h dan tidak mencakup fine-tuning model. Catatan ini tidak mencakup benchmark, Word Error Rate, Character Error Rate, atau klaim akurasi transkripsi yang tidak diverifikasi.",
          },
        },
      ],
    },
    {
      id: "subtitles-and-ffmpeg",
      title: {
        en: "Automated SRT Subtitle Generation and Burned-In Video Output",
        id: "Pembuatan Subtitle SRT Otomatis dan Output Video Burned-In",
      },
      blocks: [
        {
          type: "figure",
          src: "/assets/projects/speech-to-text-system/documentation/01.webp",
          format: "wide",
          alt: {
            en: "Documented video output with subtitles generated by the speech-to-text workflow",
            id: "Output video terdokumentasi dengan subtitle yang dihasilkan workflow speech-to-text",
          },
          caption: {
            en: "Final media stage combining generated SRT subtitle timecodes with original video via FFmpeg.",
            id: "Tahap media akhir yang menggabungkan timecode subtitle SRT dengan video asli melalui FFmpeg.",
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Beyond generating plain text transcripts, the workflow structures temporal segment boundaries into standardized SubRip subtitle files (SRT), formatting sequence indices, start/end timestamps, and transcribed sentences. This enables seamless subtitle track distribution.",
              "In the final processing phase, FFmpeg composites the generated SRT subtitles directly into the video stream, producing a finished video with burned-in subtitles. This guarantees that captions display reliably across all playback devices and web browsers without requiring external subtitle track support.",
            ],
            id: [
              "Selain menghasilkan transkrip teks biasa, workflow ini menyusun batas segmen temporal ke dalam format subtitle standar SubRip (SRT), memformat indeks urutan, timestamp awal dan akhir, serta kalimat hasil transkripsi. Hal ini memungkinkan distribusi trek subtitle secara mandiri.",
              "Pada tahap pemrosesan akhir, FFmpeg menggabungkan subtitle SRT langsung ke dalam stream video, menghasilkan video final dengan burned-in subtitle. Pendekatan ini memastikan bahwa takarir muncul secara andal di seluruh perangkat pemutar dan peramban web tanpa memerlukan file subtitle eksternal.",
            ],
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Plaintext transcript document (TXT).",
              "Tabular chunk dataset with time offset metadata (CSV).",
              "Hierarchical structured JSON payload.",
              "Standard time-coded subtitle file (SRT).",
              "Composite MP4 video with burned-in subtitles.",
            ],
            id: [
              "Dokumen transkrip teks biasa (TXT).",
              "Dataset chunk tabular dengan metadata waktu (CSV).",
              "Payload data hierarkis terstruktur (JSON).",
              "File subtitle standar dengan timecode (SRT).",
              "Video komposit MP4 dengan burned-in subtitle.",
            ],
          },
        },
      ],
    },
  ],
};
