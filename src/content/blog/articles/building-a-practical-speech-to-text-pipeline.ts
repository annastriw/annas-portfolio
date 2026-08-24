import type { BlogArticle } from "../article-types.ts";

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
      id: "complete-path",
      title: {
        en: "Define the complete media path",
        id: "Tentukan jalur media secara lengkap",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Upload audio or video",
              "Extract audio when needed",
              "Convert to mono 16 kHz",
              "Split long input into chunks",
              "Run Wav2Vec2 inference",
              "Assemble transcript outputs",
              "Generate SRT and burned-in video",
            ],
            id: [
              "Upload audio atau video",
              "Ekstrak audio jika diperlukan",
              "Konversi ke mono 16 kHz",
              "Bagi input panjang menjadi beberapa chunk",
              "Jalankan inferensi Wav2Vec2",
              "Susun output transkrip",
              "Buat SRT dan video burned-in",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The Speech-to-Text System was built as a Python workflow in Google Colab. It accepts either audio or video, then produces reusable text files, subtitle data, and a final video with subtitles embedded into the image. Thinking about the whole path matters because model inference is only one transformation in the workflow.",
              "The project uses the pretrained facebook/wav2vec2-base-960h model through Hugging Face Transformers. The implementation record does not include model fine-tuning. Its engineering work is in preparing media for that model, processing longer inputs, shaping the outputs, and connecting those outputs to another FFmpeg stage.",
            ],
            id: [
              "Speech-to-Text System dibangun sebagai workflow Python di Google Colab. Workflow menerima audio atau video, lalu menghasilkan file teks reusable, data subtitle, dan video akhir dengan subtitle yang tertanam pada gambar. Memikirkan jalur secara utuh penting karena inferensi model hanya salah satu transformasi di dalam workflow.",
              "Proyek menggunakan model pralatih facebook/wav2vec2-base-960h melalui Hugging Face Transformers. Catatan implementasi tidak mencakup fine-tuning model. Pekerjaan rekayasanya berada pada persiapan media untuk model tersebut, pemrosesan input panjang, penyusunan output, dan penghubungan output dengan tahap FFmpeg berikutnya.",
            ],
          },
        },
      ],
    },
    {
      id: "normalize-input",
      title: {
        en: "Normalize before inference",
        id: "Normalisasi sebelum inferensi",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Identify whether the uploaded source is audio or video.",
              "Use FFmpeg to extract audio from a video source.",
              "Convert the signal to one mono channel at a 16 kHz sampling rate.",
              "Divide longer audio into smaller chunks that can be processed sequentially.",
            ],
            id: [
              "Identifikasi apakah sumber yang di-upload berupa audio atau video.",
              "Gunakan FFmpeg untuk mengekstrak audio dari sumber video.",
              "Konversi sinyal menjadi satu channel mono pada sampling rate 16 kHz.",
              "Bagi audio panjang menjadi chunk yang lebih kecil agar dapat diproses secara berurutan.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "A consistent input format gives the inference stage one predictable contract. Video does not reach the model directly. FFmpeg first separates its audio. Librosa and the media-processing steps then help prepare the signal in the mono 16 kHz form used by the documented model workflow.",
              "Chunking addresses the practical shape of long media. Each chunk passes through the Wav2Vec2 processor and model, and the resulting text is combined into the final transcription. The available record describes sequential chunk processing, but it does not provide an evaluation of how chunk boundaries affect recognition quality.",
            ],
            id: [
              "Format input yang konsisten memberi tahap inferensi satu kontrak yang dapat diprediksi. Video tidak masuk ke model secara langsung. FFmpeg terlebih dahulu memisahkan audionya. Librosa dan tahap pemrosesan media kemudian membantu menyiapkan sinyal dalam bentuk mono 16 kHz yang digunakan oleh workflow model terdokumentasi.",
              "Chunking menangani bentuk praktis media berdurasi panjang. Setiap chunk melewati processor dan model Wav2Vec2, lalu teks yang dihasilkan digabungkan menjadi transkripsi akhir. Catatan yang tersedia menjelaskan pemrosesan chunk secara berurutan, tetapi tidak menyediakan evaluasi pengaruh batas chunk terhadap kualitas pengenalan.",
            ],
          },
        },
      ],
    },
    {
      id: "outputs",
      title: {
        en: "Make one transcript useful in several contexts",
        id: "Buat satu transkrip berguna dalam beberapa konteks",
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
            en: "The final media stage combines the generated SRT subtitle with the original video through FFmpeg.",
            id: "Tahap media akhir menggabungkan subtitle SRT yang dihasilkan dengan video asli melalui FFmpeg.",
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The combined transcription is exported in three documented data formats. TXT provides a direct reading format. CSV supports tabular handling through Pandas. JSON keeps the result structured for further processing. The same transcription also feeds an SRT file with subtitle order, timing, and text.",
              "FFmpeg then uses the SRT file to create a video with burned-in subtitles. Because the subtitle is rendered into the visual frames, the final video does not depend on a separate subtitle track during playback. The project includes a before-and-after media comparison as evidence of that final transformation.",
            ],
            id: [
              "Transkripsi gabungan diekspor dalam tiga format data terdokumentasi. TXT menyediakan format baca langsung. CSV mendukung pengelolaan tabular melalui Pandas. JSON menjaga hasil tetap terstruktur untuk pemrosesan lanjutan. Transkripsi yang sama juga menjadi sumber file SRT dengan urutan subtitle, waktu, dan teks.",
              "FFmpeg kemudian menggunakan file SRT untuk membuat video dengan burned-in subtitle. Karena subtitle dirender ke dalam frame visual, video akhir tidak bergantung pada track subtitle terpisah saat diputar. Proyek menyertakan perbandingan media sebelum dan sesudah sebagai bukti transformasi akhir tersebut.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Evaluation boundary",
            id: "Batas evaluasi",
          },
          text: {
            en: "The project record does not include a benchmark, Word Error Rate, Character Error Rate, transcription-accuracy percentage, model comparison, or production-grade accuracy claim.",
            id: "Catatan proyek tidak mencakup benchmark, Word Error Rate, Character Error Rate, persentase akurasi transkripsi, perbandingan model, atau klaim akurasi tingkat production.",
          },
        },
      ],
    },
    {
      id: "practical-result",
      title: {
        en: "The practical result is the pipeline",
        id: "Hasil praktisnya adalah pipeline",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "This implementation is best understood as an end-to-end Automatic Speech Recognition workflow built around a pretrained model. Python coordinates the stages, Wav2Vec2 performs inference, Librosa supports audio processing, Pandas structures tabular output, and FFmpeg connects the audio and video boundaries.",
              "The value is not a new ASR model. It is a repeatable path from mixed media input to several concrete artifacts: TXT, CSV, JSON, SRT, and a video with embedded subtitles. Keeping that distinction explicit makes the project easier to evaluate on what was actually implemented.",
            ],
            id: [
              "Implementasi ini paling tepat dipahami sebagai workflow Automatic Speech Recognition end-to-end yang dibangun di sekitar model pralatih. Python mengoordinasikan tahapan, Wav2Vec2 menjalankan inferensi, Librosa mendukung pemrosesan audio, Pandas menyusun output tabular, dan FFmpeg menghubungkan batas audio serta video.",
              "Nilainya bukan model ASR baru. Nilainya adalah jalur berulang dari input media campuran menuju beberapa artefak konkret: TXT, CSV, JSON, SRT, dan video dengan subtitle tertanam. Menjaga perbedaan tersebut tetap eksplisit membuat proyek lebih mudah dinilai berdasarkan apa yang benar-benar diimplementasikan.",
            ],
          },
        },
      ],
    },
  ],
};
