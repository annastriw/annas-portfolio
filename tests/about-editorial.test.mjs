import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("About profile maintains verified factual information, exact bilingual narrative, and portrait asset", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { profileData } = await import(moduleUrl.href);

  // Exact Identity & Roles
  assert.equal(profileData.name, "Annas Tri Widagdo");
  assert.equal(
    profileData.headline.en,
    "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  );
  assert.equal(
    profileData.headline.id,
    "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  );
  assert.equal(
    profileData.metadata.role.en,
    "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  );

  // Approved Lead Copy
  assert.equal(
    profileData.lead.en,
    "A Computer Engineering graduate with hands-on experience in software engineering, full-stack web development, and machine learning, focused on turning real problems into reliable and useful products.",
  );
  assert.equal(
    profileData.lead.id,
    "Lulusan Teknik Komputer dengan pengalaman langsung dalam software engineering, full-stack web development, dan machine learning, dengan fokus mengubah permasalahan nyata menjadi produk yang andal dan bermanfaat.",
  );

  // Approved 2-Paragraph Narrative
  assert.equal(profileData.paragraphs.en.length, 2);
  assert.equal(profileData.paragraphs.id.length, 2);
  assert.equal(
    profileData.paragraphs.en[0],
    "My background in Computer Engineering shaped the way I see software as a complete system rather than a collection of separate features. Through academic work, internships, and project experience, I developed practical experience across software engineering, full-stack web development, and machine learning.",
  );
  assert.equal(
    profileData.paragraphs.en[1],
    "I start by understanding the problem, then connect interfaces, backend systems, data flows, and machine learning models into a structured product. I care about the result as much as the implementation: software should work reliably, provide clear value, and remain easy to use.",
  );
  assert.equal(
    profileData.paragraphs.id[0],
    "Latar belakang Teknik Komputer membentuk cara saya melihat software sebagai satu sistem yang utuh, bukan sekadar kumpulan fitur yang berdiri sendiri. Melalui perkuliahan, pengalaman magang, dan berbagai project, saya membangun pengalaman praktis dalam software engineering, full-stack web development, dan machine learning.",
  );
  assert.equal(
    profileData.paragraphs.id[1],
    "Saya memulai dengan memahami masalah, kemudian menghubungkan antarmuka, backend, alur data, dan model machine learning menjadi produk yang terstruktur. Bagi saya, hasil sama pentingnya dengan proses implementasi: software harus bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan.",
  );

  // Portrait asset & caption
  assert.equal(profileData.portrait.assetPath, "/assets/profile/pas-foto.webp");
  assert.match(profileData.portrait.caption.en, /JAKARTA/);
  assert.match(profileData.portrait.caption.id, /JAKARTA/);

  const portraitPath = join(
    root,
    "public",
    profileData.portrait.assetPath.replace(/^\//, ""),
  );
  assert.ok(
    existsSync(portraitPath),
    `Portrait asset missing at ${portraitPath}`,
  );
});

test("About education section references verified degree, exact period, thesis, and Bachelor Certificate asset", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { educationData } = await import(moduleUrl.href);

  // Degree and Institution
  assert.equal(
    educationData.degree.en,
    "Bachelor of Engineering in Computer Engineering",
  );
  assert.equal(
    educationData.degree.id,
    "Sarjana Teknik (S.T.), Teknik Komputer",
  );
  assert.equal(educationData.institution.en, "Diponegoro University");
  assert.equal(educationData.institution.id, "Universitas Diponegoro");

  // Exact Period: August 2022–June 2026
  assert.equal(educationData.period.en, "August 2022–June 2026");
  assert.equal(educationData.period.id, "Agustus 2022–Juni 2026");

  // GPA and Status
  assert.equal(educationData.gpa, "3.79 / 4.00");
  assert.equal(educationData.status.en, "Fresh Graduate");
  assert.equal(educationData.status.id, "Lulusan Baru");

  // Education Summary
  assert.equal(
    educationData.summary.en,
    "Completed a Bachelor of Engineering in Computer Engineering with an academic focus on software engineering, full-stack web development, artificial intelligence, and machine learning.",
  );
  assert.equal(
    educationData.summary.id,
    "Menyelesaikan pendidikan Sarjana Teknik pada program studi Teknik Komputer dengan fokus akademik pada software engineering, full-stack web development, artificial intelligence, dan machine learning.",
  );

  // Undergraduate Thesis
  assert.equal(educationData.thesis.label.en, "UNDERGRADUATE THESIS");
  assert.equal(educationData.thesis.label.id, "SKRIPSI");
  assert.equal(
    educationData.thesis.title.en,
    "Comparative Analysis of Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG) for Frontend Performance on the Next.js-Based iHealth Edu Website",
  );
  assert.equal(
    educationData.thesis.title.id,
    "Analisis Perbandingan Metode Client-Side Rendering (CSR), Server-Side Rendering (SSR), dan Static Site Generation (SSG) terhadap Performa Frontend pada Website iHealth Edu Berbasis Next.js",
  );

  // Bachelor Certificate Record & File Resolution
  assert.equal(educationData.bachelorCertificate.title, "BACHELOR CERTIFICATE");
  assert.equal(
    educationData.bachelorCertificate.assetPath,
    "/assets/certificates/bachelor_certificate.webp",
  );
  assert.equal(educationData.bachelorCertificate.year, "2026");
  assert.equal(
    educationData.bachelorCertificate.badge.en,
    "ACADEMIC RECORD",
  );
  assert.equal(
    educationData.bachelorCertificate.badge.id,
    "DOKUMEN AKADEMIK",
  );

  const certPath = join(
    root,
    "public",
    "assets",
    "certificates",
    "bachelor_certificate.webp",
  );
  assert.ok(
    existsSync(certPath),
    `Bachelor certificate asset missing at ${certPath}`,
  );
});

test("About technical credentials contain exactly the 8 approved certificates in approved order with category counts 8, 5, 3", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { certificatesData, credentialFilters } = await import(
    moduleUrl.href
  );

  // Exactly 8 technical certificates
  assert.equal(certificatesData.length, 8);

  // Approved exact order
  const expectedOrder = [
    "CCNA: Enterprise Networking, Security, and Automation",
    "CCNAv7: Switching, Routing, and Wireless Essentials",
    "CCNAv7: Introduction to Networks",
    "HCIA-AI V3.5",
    "Database Design",
    "Database Foundations",
    "IT Essentials: PC Hardware and Software",
    "Introduction to IoT and Digital Transformation",
  ];

  for (let i = 0; i < expectedOrder.length; i++) {
    assert.equal(
      certificatesData[i].title.en,
      expectedOrder[i],
      `Credential at index ${i} should be ${expectedOrder[i]}`,
    );
    assert.equal(
      certificatesData[i].title.id,
      expectedOrder[i],
      `Credential title in ID should remain untranslated English: ${expectedOrder[i]}`,
    );
  }

  // Category counts
  const ciscoCount = certificatesData.filter(
    (c) => c.category === "cisco-systems",
  ).length;
  const aiDbCount = certificatesData.filter(
    (c) => c.category === "ai-databases",
  ).length;

  assert.equal(ciscoCount, 5);
  assert.equal(aiDbCount, 3);

  // Filter definitions
  assert.equal(credentialFilters.length, 3);
  const allFilter = credentialFilters.find((f) => f.key === "all");
  const ciscoFilter = credentialFilters.find((f) => f.key === "cisco-systems");
  const aiDbFilter = credentialFilters.find((f) => f.key === "ai-databases");

  assert.equal(allFilter?.count, 8);
  assert.equal(ciscoFilter?.count, 5);
  assert.equal(aiDbFilter?.count, 3);

  // Verify all asset files exist
  for (const cert of certificatesData) {
    assert.ok(cert.id, "Certificate ID must be defined");
    assert.ok(cert.title.en, `EN title missing for ${cert.id}`);
    assert.ok(cert.title.id, `ID title missing for ${cert.id}`);
    assert.ok(cert.issuer, `Issuer missing for ${cert.id}`);
    assert.ok(cert.badge, `Badge missing for ${cert.id}`);

    const assetFile = join(
      root,
      "public",
      cert.assetPath.replace(/^\//, ""),
    );
    assert.ok(
      existsSync(assetFile),
      `Certificate image missing at ${assetFile} for ${cert.id}`,
    );
  }
});

test("About data prevents legacy conflicting claims and unauthorized strings from returning", async () => {
  const aboutDataFile = readFileSync(
    join(root, "src", "content", "about", "about-data.ts"),
    "utf8",
  );

  // Forbidden legacy values
  assert.doesNotMatch(aboutDataFile, /August 2022\s*[-–]\s*July 2026/i);
  assert.doesNotMatch(aboutDataFile, /2021\s*[-–]\s*2025/);
  assert.doesNotMatch(aboutDataFile, /Semarang/i);
  assert.doesNotMatch(aboutDataFile, /Cum\s*Laude/i);
  assert.doesNotMatch(aboutDataFile, /Dicoding/i);
  assert.doesNotMatch(aboutDataFile, /PL\/SQL/i);
  assert.doesNotMatch(aboutDataFile, /CISCO VERIFIED/i);
  assert.doesNotMatch(aboutDataFile, /HUAWEI CERTIFIED/i);
  assert.doesNotMatch(aboutDataFile, /IJAZAH SARJANA TEKNIK/i);
  assert.doesNotMatch(aboutDataFile, /Surat Keterangan Lulus/i);
  assert.doesNotMatch(aboutDataFile, /Best Graduate/i);
});

test("About page metadata and structure render core sections with approved locale titles", () => {
  const pageFile = readFileSync(
    join(root, "src", "app", "[locale]", "about", "page.tsx"),
    "utf8",
  );

  // Metadata strings
  assert.match(pageFile, /About Annas Tri Widagdo \| Software Engineer/);
  assert.match(pageFile, /Tentang Annas Tri Widagdo \| Software Engineer/);
  assert.match(
    pageFile,
    /Learn about Annas Tri Widagdo, a Computer Engineering graduate/,
  );
  assert.match(
    pageFile,
    /Kenali Annas Tri Widagdo, lulusan Teknik Komputer/,
  );

  // Core sections
  assert.match(pageFile, /AboutProfile/);
  assert.match(pageFile, /AboutEducation/);
  assert.match(pageFile, /AboutCertificates/);

  // Confirm obsolete components are not present
  assert.doesNotMatch(pageFile, /AboutHero/);
  assert.doesNotMatch(pageFile, /AboutBiography/);
  assert.doesNotMatch(pageFile, /AboutPrinciples/);
  assert.doesNotMatch(pageFile, /AboutTechMatrix/);
  assert.doesNotMatch(pageFile, /AboutConnect/);
});

test("AboutProfile component renders approved editorial hierarchy and excludes legacy metadata table", () => {
  const profileFile = readFileSync(
    join(root, "src", "components", "about", "about-profile.tsx"),
    "utf8",
  );

  // Structural hierarchy checks
  assert.match(profileFile, /data\.portrait\.figureLabel/);
  assert.match(profileFile, /JAKARTA, INDONESIA/);
  assert.match(profileFile, /\[01 \/\/ ABOUT\]/);
  assert.match(profileFile, /\[01 \/\/ TENTANG\]/);
  assert.match(profileFile, /<h1/);

  // Exclusions: No metadata table, no CTA, no skills/proficiency
  assert.doesNotMatch(profileFile, /<dl/);
  assert.doesNotMatch(profileFile, /<dt/);
  assert.doesNotMatch(profileFile, /<dd/);
  assert.doesNotMatch(profileFile, /Download/i);
  assert.doesNotMatch(profileFile, /Resume/i);
  assert.doesNotMatch(profileFile, /CV/i);
});
