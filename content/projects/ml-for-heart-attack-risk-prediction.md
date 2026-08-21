---
judul: "Machine Learning Model for Heart Attack Risk Prediction"
slug: "ml-for-heart-attack-risk-prediction"
jenis: "Project"
jenis_project: "Machine Learning / Binary Classification / Predictive Modeling"
peran: "Machine Learning Developer"
status: "Machine Learning Prototype dan Deployed Inference Service"
asset_path: "assets/projects/ml-for-heart-attack-risk-prediction/"
---

# Machine Learning Model for Heart Attack Risk Prediction

## Project Snapshot

- **Nama Project:** Machine Learning Model for Heart Attack Risk Prediction
- **Jenis Project:** Machine Learning / Binary Classification / Predictive Modeling
- **Peran:** Machine Learning Developer
- **Dataset:** 158.355 observasi dan 22 kolom
- **Prediction Features:** 21 fitur demografis, klinis, dan gaya hidup
- **Target:** `heart_attack`
- **Machine Learning Task:** Binary Classification
- **Model Inference:** Random Forest Classifier
- **ML Serving:** Flask REST API
- **Deployment:** Docker pada Linux Ubuntu
- **Model Artifact:** Random Forest `.pkl` dan preprocessing artifacts
- **Core Stack:** Python, Pandas, NumPy, Scikit-learn, SMOTE, Matplotlib, Seaborn, Joblib

## Ringkasan Project

Project ini merupakan machine learning prototype untuk memprediksi risiko serangan jantung menggunakan 21 fitur yang berkaitan dengan kondisi demografis, klinis, dan gaya hidup.

Dataset yang digunakan terdiri dari 158.355 observasi dan 22 kolom.

Project mencakup proses Exploratory Data Analysis, preprocessing, categorical encoding, feature scaling, penanganan class imbalance menggunakan SMOTE, hyperparameter tuning, perbandingan beberapa algoritma klasifikasi, evaluasi model, serialisasi model dan preprocessing artifacts, hingga deployment inference service menggunakan Flask REST API.

Empat algoritma yang dibandingkan adalah:

- Random Forest
- Linear SVM
- K-Nearest Neighbors
- Logistic Regression

Random Forest memperoleh Accuracy tertinggi sebesar 71,93% dan ROC-AUC tertinggi sebesar 0,8015 sehingga digunakan sebagai model pada prediction prototype dan inference service.

Model kemudian disimpan dalam format `.pkl` menggunakan Joblib dan di-deploy melalui Flask REST API yang dikontainerisasi menggunakan Docker pada Linux Ubuntu.

## Tujuan Project

Tujuan teknis project:

- Mengembangkan binary classification prototype untuk prediksi risiko serangan jantung.
- Mengolah data kesehatan sebagai input Machine Learning.
- Membandingkan beberapa algoritma klasifikasi.
- Melakukan hyperparameter tuning.
- Mengevaluasi performa model menggunakan beberapa classification metrics.
- Menentukan model yang digunakan pada prediction prototype.
- Menyimpan model agar dapat digunakan kembali tanpa training ulang.
- Mengembangkan inference workflow.
- Menyediakan model melalui Flask REST API.
- Melakukan containerization dan deployment inference service.

Project diposisikan sebagai **risk-prediction prototype** dan bukan sebagai sistem diagnosis klinis.

## Dataset

Dataset memiliki:

- 158.355 observasi.
- 22 kolom.
- 21 predictor features.
- 1 target binary classification.

Target yang digunakan:

`heart_attack`

Predictor mencakup fitur yang berkaitan dengan:

- Demografis.
- Kondisi klinis.
- Gaya hidup.

## Data Quality

Proses pemeriksaan kualitas data dilakukan terhadap dataset yang digunakan.

Hasil yang terdokumentasi:

- Total observasi: 158.355
- Missing values: tidak ditemukan pada dataset yang digunakan

## Exploratory Data Analysis

Exploratory Data Analysis dilakukan untuk memahami karakteristik data sebelum proses modeling.

Analisis yang dilakukan meliputi:

- Descriptive statistics.
- Distribution plot.
- Box plot.
- Correlation heatmap.
- Analisis hubungan fitur terhadap target.

EDA digunakan untuk memahami distribusi data, karakteristik predictor, serta hubungan fitur dengan target `heart_attack`.

## Data Preprocessing

Tahap preprocessing mencakup beberapa proses utama.

### Categorical Encoding

Sebanyak 5 fitur kategorikal dilakukan proses encoding.

### Feature Scaling

Sebanyak 21 predictor variables dilakukan feature scaling menggunakan:

`MinMaxScaler`

### Train-Test Split

Dataset dibagi menggunakan stratified train-test split dengan rasio:

- Training: 80%
- Testing: 20%

Jumlah data:

- Training: 126.684 observasi
- Testing: 31.671 observasi

Proporsi target sekitar:

- Non-risk: 59,9%
- Risk: 40,1%

Stratified split digunakan untuk mempertahankan proporsi kelas pada data training dan testing.

## Class Imbalance Handling

Class imbalance pada training set ditangani menggunakan:

`SMOTE`

Sebelum SMOTE:

- Training observations: 126.684

Setelah SMOTE:

- Training observations: 151.766
- Distribusi kelas: 50:50

SMOTE hanya diterapkan pada training set.

## Algoritma yang Dibandingkan

Empat algoritma klasifikasi dikembangkan dan dibandingkan.

### 1. Random Forest

Random Forest digunakan sebagai salah satu ensemble classification model.

Model ini kemudian dipilih untuk digunakan pada prediction prototype karena memperoleh Accuracy dan ROC-AUC tertinggi pada eksperimen yang terdokumentasi.

### 2. Linear SVM

Linear Support Vector Machine digunakan sebagai salah satu model pembanding dalam proses eksperimen.

### 3. K-Nearest Neighbors

K-Nearest Neighbors digunakan sebagai salah satu algoritma pembanding.

Pada hasil evaluasi, KNN memperoleh Recall tertinggi sebesar 70,40%.

### 4. Logistic Regression

Logistic Regression digunakan sebagai salah satu baseline / classification model pembanding.

Pada hasil eksperimen, Logistic Regression memperoleh F1-Score tertinggi sebesar 0,6618.

## Hyperparameter Tuning

Hyperparameter tuning dilakukan menggunakan:

`RandomizedSearchCV`

Scoring metric yang digunakan pada proses tuning:

`F1-Score`

Hyperparameter tuning diterapkan untuk membandingkan konfigurasi model pada algoritma yang dikembangkan.

## Evaluasi Model

Evaluasi dilakukan menggunakan 31.671 test observations.

Evaluation metrics yang digunakan:

- Accuracy
- Precision
- Recall
- F1-Score
- ROC-AUC
- Confusion Matrix
- Classification Report
- ROC Curve

## Hasil Random Forest

Random Forest memperoleh:

- Accuracy: 71,93%
- Precision: 64,12%
- Recall: 68,15%
- F1-Score: 0,6607
- ROC-AUC: 0,8015

Random Forest memiliki:

- Accuracy tertinggi di antara model yang dibandingkan.
- ROC-AUC tertinggi di antara model yang dibandingkan.

Berdasarkan hasil tersebut, Random Forest digunakan sebagai model pada prediction prototype.

## Hasil Logistic Regression

Logistic Regression memperoleh:

- F1-Score tertinggi: 0,6618

F1-Score tersebut merupakan nilai tertinggi di antara algoritma yang dibandingkan pada eksperimen yang terdokumentasi.

## Hasil K-Nearest Neighbors

KNN memperoleh:

- Recall tertinggi: 70,40%

Recall tersebut merupakan nilai tertinggi di antara algoritma yang dibandingkan pada hasil yang terdokumentasi.

## Model Selection

Random Forest dipilih sebagai model untuk prediction prototype.

Alasan berdasarkan hasil eksperimen yang terdokumentasi:

- Memperoleh Accuracy tertinggi: 71,93%.
- Memperoleh ROC-AUC tertinggi: 0,8015.

Pemilihan ini tidak berarti Random Forest memiliki nilai terbaik pada seluruh evaluation metric.

Logistic Regression memiliki F1-Score tertinggi, sedangkan KNN memiliki Recall tertinggi.

## Model Artifact

Random Forest yang digunakan untuk inference disimpan sebagai serialized model artifact.

Format:

`.pkl`

Model serta preprocessing artifacts disimpan menggunakan:

`Joblib`

Tujuannya agar model dan preprocessing dapat dimuat kembali tanpa melakukan proses training ulang.

## Preprocessing Artifact

Inference membutuhkan preprocessing yang konsisten dengan proses training.

Komponen preprocessing yang digunakan meliputi:

- Categorical mapping.
- Feature scaling.
- MinMaxScaler.
- Predictor feature structure.

Preprocessing artifacts disimpan agar dapat digunakan kembali pada inference service.

## Inference Workflow

Inference workflow menerima 21 input data pasien.

Alur utama:

21 Input Data
→ Categorical Mapping
→ Feature Scaling
→ Random Forest Model
→ Predicted Class
→ Risk Probability
→ Supporting Risk Factors

Output utama yang dihasilkan:

- Predicted class.
- Probability informasi risiko.
- Faktor risiko pendukung.

## Flask REST API

Machine Learning model disediakan sebagai service menggunakan Flask REST API.

Service memuat:

- Random Forest model `.pkl`.
- Preprocessing artifacts.
- Categorical mapping.
- Feature scaler.

Dengan pendekatan ini, proses inference dapat dilakukan tanpa menjalankan ulang proses training.

## API Flow

Terdapat dua API operations utama yang terdokumentasi.

### POST

Digunakan untuk:

- Menerima data kesehatan.
- Memproses 21 input.
- Melakukan categorical mapping.
- Melakukan scaling.
- Menjalankan model inference.

Alur:

POST Health Data
→ Preprocessing
→ Random Forest Inference
→ Prediction Result

### GET

Digunakan untuk menyediakan:

- Hasil prediksi.
- Informasi pendukung hasil prediksi.
- Faktor risiko pendukung.

Alur umum:

GET
→ Prediction Result
→ Supporting Risk Factors

## Prediction Output

Inference menghasilkan informasi berupa:

- Predicted class.
- Risk probability.
- Supporting risk factors.
- Top feature importance information.

Informasi tersebut merupakan output prediction prototype dan tidak boleh diposisikan sebagai diagnosis klinis.

## Risk Factors

Prototype menambahkan interpretability sederhana menggunakan:

- Rule-based risk factors.
- Top-5 global Random Forest feature importances.

Rule-based risk factors digunakan sebagai informasi pendukung terhadap hasil inference.

Informasi tersebut bukan penjelasan kausal untuk setiap pasien.

## Feature Importance

Random Forest menyediakan feature importance yang digunakan sebagai informasi tambahan.

Prototype menyediakan:

- Top-5 global Random Forest feature importances.

Feature importance tersebut merupakan global model feature importance dan bukan causal explanation per pasien.

## Deployment

Flask inference service dikontainerisasi menggunakan Docker.

Deployment stack:

Flask REST API
→ Docker
→ Linux Ubuntu

Tujuan deployment:

- Menjalankan inference sebagai service terpisah.
- Memungkinkan model dimuat tanpa training ulang.
- Memungkinkan service diintegrasikan dengan aplikasi lain.
- Menyediakan endpoint untuk mengirim data kesehatan.
- Menyediakan hasil prediction secara terstruktur.

## Containerization

Docker digunakan untuk melakukan containerization pada Flask REST API.

Container menjalankan Machine Learning inference service pada environment Linux Ubuntu.

## Alur Teknis Keseluruhan

Dataset
→ Exploratory Data Analysis
→ Data Preprocessing
→ Categorical Encoding
→ MinMax Scaling
→ Stratified Train-Test Split
→ SMOTE pada Training Set
→ Model Development
→ Hyperparameter Tuning
→ Model Evaluation
→ Random Forest Selection
→ Model Serialization
→ Flask REST API
→ Docker Containerization
→ Linux Ubuntu Deployment
→ API Inference

## Teknologi yang Digunakan

### Programming

- Python

### Data Processing

- Pandas
- NumPy

### Machine Learning

- Scikit-learn
- Random Forest
- Linear SVM
- K-Nearest Neighbors
- Logistic Regression
- RandomizedSearchCV
- MinMaxScaler
- SMOTE
- Imbalanced-learn

### Data Analysis

- Exploratory Data Analysis
- Descriptive Statistics
- Distribution Plot
- Box Plot
- Correlation Heatmap

### Model Evaluation

- Accuracy
- Precision
- Recall
- F1-Score
- ROC-AUC
- ROC Curve
- Confusion Matrix
- Classification Report

### Visualization

- Matplotlib
- Seaborn

### Model Persistence

- Joblib
- PKL Model

### Model Serving

- Flask
- Flask REST API
- API Inference

### Deployment

- Docker
- Linux
- Ubuntu
- Containerization

## Angka Teknis yang Aman Digunakan

### Dataset

- Observations: 158.355
- Columns: 22
- Predictor features: 21
- Categorical features yang di-encode: 5
- Missing values pada dataset yang digunakan: tidak ditemukan

### Train-Test Split

- Split: 80:20 stratified
- Training observations: 126.684
- Testing observations: 31.671
- Proporsi non-risk: sekitar 59,9%
- Proporsi risk: sekitar 40,1%

### SMOTE

- Sebelum SMOTE: 126.684 training observations
- Setelah SMOTE: 151.766 training observations
- Distribusi setelah SMOTE: 50:50

### Model

- Classification algorithms: 4
- Random Forest
- Linear SVM
- K-Nearest Neighbors
- Logistic Regression

### Random Forest

- Accuracy: 71,93%
- Precision: 64,12%
- Recall: 68,15%
- F1-Score: 0,6607
- ROC-AUC: 0,8015

### Logistic Regression

- F1-Score tertinggi: 0,6618

### K-Nearest Neighbors

- Recall tertinggi: 70,40%

### Deployment

- Serialized Random Forest model: 1
- Format model: `.pkl`
- API operations utama: 2
- API operations: POST dan GET
- ML serving stack: Flask REST API + Docker + Linux Ubuntu

### Interpretability

- Top-5 global Random Forest feature importances tersedia pada inference prototype.

## Kompetensi yang Berkaitan

- Python
- Pandas
- NumPy
- Scikit-learn
- Random Forest
- Linear SVM
- K-Nearest Neighbors
- Logistic Regression
- RandomizedSearchCV
- MinMaxScaler
- SMOTE
- Imbalanced-learn
- Exploratory Data Analysis
- Binary Classification
- Predictive Modeling
- Machine Learning
- Data Preprocessing
- Feature Scaling
- Categorical Encoding
- Class Imbalance Handling
- Model Evaluation
- Accuracy
- Precision
- Recall
- F1-Score
- ROC-AUC
- Confusion Matrix
- Classification Metrics
- Feature Importance
- Joblib
- Matplotlib
- Seaborn
- Model Deployment
- PKL Model
- Flask
- Flask REST API
- API Inference
- POST Endpoint
- GET Endpoint
- Docker
- Linux
- Ubuntu
- Containerization

## Asset Project

Path asset:

assets/projects/ml-for-heart-attack-risk-prediction/

Asset yang tersedia:

- input-data.webp
- output-data.webp

Asset tersebut merupakan data visual mentah project.

Pemilihan cover, urutan gambar, caption, alt text, layout, animasi, penempatan visual, serta presentasi hasil Machine Learning tidak ditentukan dalam file data ini.

Keputusan tersebut dilakukan pada tahap desain dan implementasi website oleh coding agent.

## Link Project

### Live Project

Belum dicantumkan pada data sumber.

### GitHub Repository

Belum dicantumkan pada data sumber.

## Batasan Klaim

Project harus diposisikan sebagai:

- Machine Learning prototype.
- Heart-attack risk prediction prototype.
- Machine Learning inference service.

Project tidak boleh diposisikan sebagai:

- Alat diagnosis klinis.
- Diagnostic system.
- Sistem yang menggantikan tenaga medis.
- Sistem dengan clinical accuracy yang telah tervalidasi.

Angka performa model harus mengikuti hasil eksperimen yang terdokumentasi.

Random Forest:

- Accuracy 71,93%
- Precision 64,12%
- Recall 68,15%
- F1-Score 0,6607
- ROC-AUC 0,8015

Logistic Regression:

- F1-Score tertinggi 0,6618

KNN:

- Recall tertinggi 70,40%

Rule-based risk factors harus diposisikan sebagai informasi pendukung hasil inference.

Top-5 Random Forest feature importances harus diposisikan sebagai global feature importance.

Jangan menyebut keduanya sebagai:

- Causal explanation.
- Diagnosis.
- Clinical interpretation yang tervalidasi.
- Penjelasan kausal per pasien.

Jangan membuat klaim mengenai:

- Clinical accuracy.
- Diagnostic accuracy.
- Clinical effectiveness.
- Peningkatan outcome kesehatan.
- Peningkatan kualitas diagnosis.
- Dampak medis kuantitatif.
- Dampak kesehatan kuantitatif.

kecuali tersedia validasi klinis atau data pengukuran terpisah yang mendukung klaim tersebut.