import type { BlogArticle } from "../article-types";

export const integratingMachineLearningArticle: BlogArticle = {
  index: "02",
  slug: "integrating-machine-learning-into-a-web-application",
  category: {
    en: "Applied Machine Learning",
    id: "Machine Learning Terapan",
  },
  title: {
    en: "Integrating Machine Learning into a Web Application",
    id: "Mengintegrasikan Machine Learning ke dalam Aplikasi Web",
  },
  abstract: {
    en: "A practical look at connecting iHealth Edu, patient health data, and a separately served Random Forest risk-prediction prototype without blurring the clinical boundary.",
    id: "Tinjauan praktis tentang menghubungkan iHealth Edu, data kesehatan pasien, dan purwarupa prediksi risiko Random Forest yang disajikan terpisah tanpa mengaburkan batas klinis.",
  },
  tags: ["Random Forest", "Flask", "Laravel", "Next.js", "Docker"],
  sourceProjectSlugs: [
    "ihealth-edu",
    "ml-for-heart-attack-risk-prediction",
  ],
  sections: [
    {
      id: "ml-pipeline",
      title: {
        en: "Preparing the Dataset for Machine Learning",
        id: "Mempersiapkan Dataset untuk Machine Learning",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Building a practical health risk prediction tool starts with clean data. The project used a public dataset of 158,355 health records across 22 columns, covering 21 demographic, clinical, and lifestyle indicators with a binary heart_attack target. Categorical features were encoded, and numerical values were normalized with MinMaxScaler so that all features carried balanced weight during training.",
              "To prevent data leakage, the dataset was split 80:20 (126,684 training rows and 31,671 test rows) using stratified sampling. SMOTE was applied only to the training set to handle class imbalance, balancing it to 151,766 samples while keeping the test set completely untainted. Hyperparameter tuning with RandomizedSearchCV evaluated F1-Scores across four algorithms: Random Forest, Linear SVM, K-Nearest Neighbors, and Logistic Regression.",
            ],
            id: [
              "Membangun sarana prediksi risiko kesehatan yang praktis dimulai dari pengolahan data yang bersih. Proyek ini menggunakan dataset publik berisi 158.355 catatan kesehatan dengan 22 kolom, mencakup 21 indikator demografis, klinis, dan gaya hidup dengan target biner heart_attack. Fitur kategorikal di-encode, dan nilai numerik dinormalisasi menggunakan MinMaxScaler agar setiap fitur memiliki bobot yang seimbang selama pelatihan model.",
              "Untuk mencegah kebocoran data (data leakage), dataset dibagi 80:20 (126.684 baris training dan 31.671 baris testing) menggunakan stratified sampling. SMOTE hanya diterapkan pada data training untuk menangani ketidakseimbangan kelas sehingga seimbang menjadi 151.766 sampel, sementara data testing tetap murni. Hyperparameter tuning dengan RandomizedSearchCV mengevaluasi F1-Score pada empat algoritma: Random Forest, Linear SVM, K-Nearest Neighbors, dan Logistic Regression.",
            ],
          },
        },
        {
          type: "metrics",
          items: [
            {
              label: { en: "Dataset", id: "Dataset" },
              value: "158,355 rows / 22 columns",
            },
            {
              label: { en: "Stratified split", id: "Pembagian stratified" },
              value: "80:20",
            },
            {
              label: { en: "Random Forest accuracy", id: "Accuracy Random Forest" },
              value: "71.93%",
            },
            {
              label: { en: "Random Forest ROC-AUC", id: "ROC-AUC Random Forest" },
              value: "0.8015",
            },
          ],
        },
        {
          type: "figure",
          src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
          format: "wide",
          alt: {
            en: "Documented output from the heart-attack risk-prediction prototype",
            id: "Output terdokumentasi dari purwarupa prediksi risiko serangan jantung",
          },
          caption: {
            en: "Evaluation visual showing documented risk-prediction inference output and feature metrics.",
            id: "Visual evaluasi yang menunjukkan output inferensi prediksi risiko dan metrik fitur terdokumentasi.",
          },
        },
      ],
    },
    {
      id: "service-integration",
      title: {
        en: "Serving Predictions via a Standalone Flask API",
        id: "Menyajikan Prediksi Melalui Flask API Mandiri",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Patient Health Data in iHealth Edu",
              "Laravel Application Backend",
              "Flask REST API Microservice",
              "Serialized Preprocessing Artifacts",
              "Random Forest Inference",
              "Structured Risk Payload",
            ],
            id: [
              "Data Kesehatan Pasien di iHealth Edu",
              "Backend Aplikasi Laravel",
              "Microservice Flask REST API",
              "Artefak Preprocessing Terserialisasi",
              "Inferensi Random Forest",
              "Payload Risiko Terstruktur",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "In iHealth Edu, developed in collaboration with Puskesmas Padangsari in Semarang, patient screening, educational modules, health records, and ESP32 IoT biometrics live inside a Next.js and Laravel web application. Instead of running Python models directly inside the web server, the machine learning workflow was separated into its own lightweight Flask REST API.",
              "Using Joblib, the trained Random Forest model artifact (.pkl), MinMaxScaler, and feature mapping dictionaries were saved together. This ensures that live incoming patient data undergoes the exact same mathematical transformations computed during offline training. The Flask service was containerized with Docker and deployed on a Linux Ubuntu server.",
            ],
            id: [
              "Pada iHealth Edu yang dikembangkan bersama Puskesmas Padangsari di Semarang, fitur screening pasien, modul edukasi, rekam medis, dan perangkat IoT ESP32 berada di dalam aplikasi web Next.js dan Laravel. Alih-alih menjalankan model Python langsung di server web utama, alur machine learning dipisahkan ke dalam microservice Flask REST API mandiri.",
              "Menggunakan Joblib, artefak model Random Forest (.pkl), MinMaxScaler, dan kamus pemetaan fitur disimpan bersama. Langkah ini memastikan data pasien yang masuk secara real-time mengalami transformasi matematis yang persis sama dengan saat pelatihan offline. Layanan Flask dikemas menggunakan Docker dan di-deploy pada server Linux Ubuntu.",
            ],
          },
        },
      ],
    },
    {
      id: "decision-support-boundary",
      title: {
        en: "Translating Probabilities into Useful Decision Support",
        id: "Menerjemahkan Probabilitas Menjadi Pendukung Keputusan",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Random Forest was chosen for the prototype because it achieved the highest documented accuracy of 71.93% and the highest ROC-AUC of 0.8015 among compared algorithms, even though Logistic Regression scored highest in F1 (0.6618) and KNN in recall (70.40%).",
              "When an authorized health worker inputs patient vitals, the Flask API returns a structured JSON response containing the predicted risk category, calculated numerical probability, contextual rule-based risk factors, and global top-5 feature importances. The frontend displays these indicators as helpful visual context within the broader patient history record.",
            ],
            id: [
              "Random Forest dipilih untuk purwarupa ini karena meraih akurasi terdokumentasi tertinggi sebesar 71,93% dan ROC-AUC tertinggi sebesar 0,8015 di antara algoritma yang dibandingkan, meskipun Logistic Regression memiliki F1 tertinggi (0,6618) dan KNN memiliki recall tertinggi (70,40%).",
              "Saat tenaga kesehatan yang berwenang memasukkan data pemeriksaan pasien, API Flask mengembalikan respons JSON terstruktur yang memuat kategori risiko prediksi, probabilitas numerik, faktor risiko pendukung berbasis aturan, dan lima feature importance global teratas. Frontend menampilkan indikator ini sebagai konteks visual yang informatif di dalam riwayat kesehatan pasien.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/ihealth-edu/documentation/01.webp",
          format: "wide",
          alt: {
            en: "Documented patient-facing interface from iHealth Edu",
            id: "Antarmuka iHealth Edu untuk pasien yang terdokumentasi",
          },
          caption: {
            en: "The prediction workflow sits inside a broader patient, screening, education, and health-record system.",
            id: "Workflow prediksi berada di dalam sistem pasien, screening, edukasi, dan catatan kesehatan yang lebih luas.",
          },
        },
      ],
    },
    {
      id: "clinical-limitations",
      title: {
        en: "Clear Medical Boundaries and Practical Impact",
        id: "Batasan Medis yang Jelas dan Dampak Praktis",
      },
      blocks: [
        {
          type: "note",
          label: {
            en: "Health limitation",
            id: "Batasan kesehatan",
          },
          text: {
            en: "This implementation is a risk-prediction and decision-support prototype. It is not a clinical diagnosis, does not replace a health professional, and has no documented clinical validation.",
            id: "Implementasi ini adalah purwarupa prediksi risiko dan pendukung keputusan. Implementasi ini bukan diagnosis klinis, tidak menggantikan tenaga kesehatan, dan tidak memiliki validasi klinis yang terdokumentasi.",
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Present predictions and probability scores as statistical indicators rather than medical diagnoses.",
              "Display rule-based risk factors as helpful reference points rather than definite causes.",
              "Treat top feature importances as global model insights, not individualized medical advice.",
              "Protect patient records through strict role-based access control.",
            ],
            id: [
              "Sajikan hasil prediksi dan skor probabilitas sebagai indikator statistik, bukan diagnosis medis.",
              "Tampilkan faktor risiko berbasis aturan sebagai referensi pendukung, bukan penyebab mutlak.",
              "Posisikan feature importance teratas sebagai wawasan perilaku model global, bukan saran medis individual.",
              "Lindungi data rekam medis pasien melalui kontrol akses berbasis peran yang ketat.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Machine learning in healthcare is most useful when its limits are clearly communicated. By pairing solid model training with transparent decision support, the platform provides helpful early risk insights while keeping clinical judgment firmly in the hands of healthcare professionals.",
            ],
            id: [
              "Penerapan machine learning di bidang kesehatan paling bermanfaat saat batasannya disampaikan secara transparan. Dengan memadukan pelatihan model yang terstruktur dan penyajian pendukung keputusan yang jelas, platform ini memberikan indikator risiko awal yang bermanfaat sambil tetap menempatkan keputusan klinis pada tenaga medis profesional.",
            ],
          },
        },
      ],
    },
  ],
};
