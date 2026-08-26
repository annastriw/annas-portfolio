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
        en: "Data Preprocessing and Model Exploration Pipeline",
        id: "Pipeline Preprocessing Data dan Eksplorasi Model",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Developing a healthcare predictive model begins with rigorous data preprocessing. The experimental dataset comprised 158,355 observations and 22 columns, encompassing 21 demographic, clinical, and lifestyle predictor features alongside a binary heart_attack target. Five categorical variables were encoded, and all 21 predictors were scaled with MinMaxScaler to ensure uniform numerical weighting.",
              "To maintain realistic validation conditions, an 80:20 stratified split partitioned the dataset into 126,684 training rows and 31,671 testing rows. SMOTE was applied exclusively to the training partition, balancing it to 151,766 observations without leaking synthetic distributions into the evaluation set. Hyperparameter tuning via RandomizedSearchCV targeted F1-Score across four classification algorithms: Random Forest, Linear SVM, K-Nearest Neighbors, and Logistic Regression.",
            ],
            id: [
              "Pengembangan model prediktif kesehatan dimulai dari tahap preprocessing data yang ketat. Dataset eksperimen terdiri dari 158.355 observasi dan 22 kolom, mencakup 21 fitur prediktor demografis, klinis, dan gaya hidup bersama satu target biner heart_attack. Sebanyak 5 variabel kategorikal di-encode, dan seluruh 21 prediktor diskalakan menggunakan MinMaxScaler untuk memastikan bobot numerik yang seragam.",
              "Untuk menjaga kondisi validasi yang realistis, stratified split 80:20 membagi dataset menjadi 126.684 baris data training dan 31.671 baris data testing. SMOTE diterapkan secara eksklusif pada partisi training sehingga seimbang menjadi 151.766 observasi tanpa membocorkan distribusi sintetis ke dalam set evaluasi. Hyperparameter tuning menggunakan RandomizedSearchCV berfokus pada F1-Score di antara empat algoritma klasifikasi: Random Forest, Linear SVM, K-Nearest Neighbors, dan Logistic Regression.",
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
        en: "Decoupled Model Serving via Flask REST API",
        id: "Penyajian Model Terpisah Melalui Flask REST API",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Patient Health Data in iHealth Edu",
              "Laravel Application Backend",
              "Flask REST API Endpoint",
              "Serialized Preprocessing Artifacts",
              "Random Forest Inference",
              "Structured Risk Output",
            ],
            id: [
              "Data Kesehatan Pasien di iHealth Edu",
              "Backend Aplikasi Laravel",
              "Endpoint Flask REST API",
              "Artefak Preprocessing Terserialisasi",
              "Inferensi Random Forest",
              "Output Risiko Terstruktur",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "iHealth Edu was developed in collaboration with Puskesmas Padangsari, Semarang as an integrated digital health platform encompassing screening, education modules, patient records, and ESP32 IoT biometric telemetry. Embedding machine learning into this environment required an isolated service boundary to keep Python training dependencies detached from the Laravel backend and MySQL database.",
              "The model inference layer was exposed through a standalone Flask REST API. Using Joblib, the trained Random Forest model artifact (.pkl) was packaged alongside its corresponding MinMaxScaler, categorical mapping dictionaries, and predictor column order. This guarantees that real-time inference applies the exact transformations calculated during training. The Flask service was containerized with Docker and deployed on an Ubuntu Linux server.",
            ],
            id: [
              "iHealth Edu dikembangkan bekerja sama dengan Puskesmas Padangsari, Semarang sebagai platform kesehatan digital terintegrasi yang mencakup screening, modul edukasi, rekam medis pasien, dan telemetri biometrik IoT ESP32. Mengintegrasikan machine learning ke dalam lingkungan ini memerlukan batas layanan yang terisolasi agar dependensi Python tetap terpisah dari backend Laravel dan database MySQL.",
              "Lapisan inferensi model disediakan melalui Flask REST API mandiri. Menggunakan Joblib, artefak model Random Forest (.pkl) dikemas bersama MinMaxScaler, kamus pemetaan kategorikal, dan urutan kolom prediktor yang sesuai. Hal ini menjamin bahwa inferensi real-time menerapkan transformasi yang persis sama dengan saat pelatihan. Layanan Flask dikontainerisasi dengan Docker dan di-deploy pada server Linux Ubuntu.",
            ],
          },
        },
      ],
    },
    {
      id: "decision-support-boundary",
      title: {
        en: "Translating Predictions into Actionable Decision Support",
        id: "Menerjemahkan Prediksi Menjadi Pendukung Keputusan",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Random Forest was chosen for the prototype because it achieved the highest documented accuracy of 71.93% and the highest ROC-AUC of 0.8015 among compared algorithms, even though Logistic Regression scored highest in F1 (0.6618) and KNN in recall (70.40%). Integrating this model into patient care required thoughtful UX representation rather than a binary verdict.",
              "When an authorized healthcare worker submits patient vitals, the Flask API returns a structured JSON payload containing the predicted class, numerical risk probability, rule-based supporting risk factors, and the top-5 global Random Forest feature importances. The frontend visualizes these findings as informative indicators within the broader patient history record.",
            ],
            id: [
              "Random Forest dipilih untuk purwarupa ini karena meraih accuracy terdokumentasi tertinggi sebesar 71,93% dan ROC-AUC tertinggi sebesar 0,8015 di antara algoritma yang dibandingkan, meskipun Logistic Regression memiliki F1 tertinggi (0,6618) dan KNN memiliki recall tertinggi (70,40%). Mengintegrasikan model ini ke dalam alur perawatan pasien membutuhkan penyajian antarmuka yang bijak, bukan sekadar vonis biner.",
              "Saat tenaga kesehatan yang berwenang mengirimkan data pemeriksaan pasien, API Flask mengembalikan payload JSON terstruktur yang memuat kelas prediksi, probabilitas risiko numerik, faktor risiko pendukung berbasis aturan, dan lima feature importance Random Forest global teratas. Frontend memvisualisasikan hasil ini sebagai indikator informatif di dalam riwayat kesehatan pasien yang lebih luas.",
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
        en: "Explicit Clinical Limitations and Ethical Boundaries",
        id: "Batasan Klinis Eksplisit dan Batas Etis",
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
              "Present predicted class and probability values as statistical indicators, not definitive medical diagnoses.",
              "Explain rule-based risk factors as contextual reference points rather than verified clinical causes.",
              "Position top-five feature importances as global model behavior rather than individual causal explanations.",
              "Enforce role-based access control so that detailed medical histories remain private between patients and clinicians.",
            ],
            id: [
              "Sajikan kelas prediksi dan nilai probabilitas sebagai indikator statistik, bukan diagnosis medis definitif.",
              "Jelaskan faktor risiko berbasis aturan sebagai titik referensi kontekstual, bukan penyebab klinis yang diverifikasi.",
              "Posisikan lima feature importance teratas sebagai perilaku model global, bukan penjelasan kausal per pasien.",
              "Terapkan role-based access control agar riwayat medis sensitif tetap terlindungi antara pasien dan tenaga medis.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "A machine learning model is only as credible as its operational boundaries. By pairing a validated technical pipeline with clear decision-support framing, the system provides transparent risk indicators while strictly preserving professional medical authority.",
            ],
            id: [
              "Sebuah model machine learning hanya dapat dipercaya jika batasan operasionalnya jelas. Dengan memadukan pipeline teknis yang tervalidasi dengan penyajian pendukung keputusan yang transparan, sistem memberikan indikator risiko yang bermanfaat sambil tetap menghormati wewenang tenaga medis profesional.",
            ],
          },
        },
      ],
    },
  ],
};
