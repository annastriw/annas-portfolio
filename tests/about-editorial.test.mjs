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
    "Software Engineer · Full-Stack Web Developer · AI & Machine Learning Enthusiast",
  );
  assert.equal(
    profileData.headline.id,
    "Software Engineer · Full-Stack Web Developer · AI & Machine Learning Enthusiast",
  );
  assert.equal(
    profileData.metadata.role.en,
    "Software Engineer · Full-Stack Web Developer · AI & Machine Learning Enthusiast",
  );

  // Approved Lead Copy
  assert.equal(
    profileData.lead.en,
    "I am a Software Engineer and a fresh graduate in Computer Engineering from Diponegoro University, with a focus on full-stack web development and an interest in AI, machine learning, and data science.",
  );
  assert.equal(
    profileData.lead.id,
    "Saya adalah Software Engineer dan fresh graduate Teknik Komputer Universitas Diponegoro yang berfokus pada full-stack web development, dengan minat pada AI, machine learning, dan data science.",
  );

  // Approved 2-Paragraph Narrative
  assert.equal(profileData.paragraphs.en.length, 2);
  assert.equal(profileData.paragraphs.id.length, 2);
  assert.equal(
    profileData.paragraphs.en[0],
    "Through academic work, internships, and projects, I have gained experience building interfaces, backend systems, and data flows, as well as integrating machine learning models into applications. These experiences have helped me understand how different parts of a product work together and how technical decisions affect the people using it.",
  );
  assert.equal(
    profileData.paragraphs.en[1],
    "I approach development by understanding the problem and user needs, then turning them into a practical solution. My goal is to build reliable, useful, and easy-to-use products. I continue to learn, develop my skills, and take on new challenges.",
  );
  assert.equal(
    profileData.paragraphs.id[0],
    "Melalui perkuliahan, magang, dan project, saya membangun pengalaman dalam mengembangkan antarmuka, backend, dan alur data, serta mengintegrasikan model machine learning ke dalam aplikasi. Pengalaman tersebut membantu saya memahami bagaimana berbagai bagian produk saling terhubung dan bagaimana keputusan teknis memengaruhi pengguna.",
  );
  assert.equal(
    profileData.paragraphs.id[1],
    "Saya memulai pengembangan dengan memahami permasalahan dan kebutuhan pengguna, lalu menerjemahkannya menjadi solusi yang dapat digunakan. Tujuan saya adalah menghasilkan produk yang andal, bermanfaat, dan mudah digunakan. Saya terus membuka ruang untuk belajar, berkembang, dan menghadapi tantangan baru.",
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
  const { educationData, certificatesData, credentialSectionCopy } = await import(moduleUrl.href);

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

  // Education Summary (academic focus on SE, web dev, AI, ML, and data science)
  assert.equal(
    educationData.summary.en,
    "Completed a Bachelor of Engineering in Computer Engineering, with an academic focus on software engineering, full-stack web development, artificial intelligence, machine learning, and data science.",
  );
  assert.equal(
    educationData.summary.id,
    "Menyelesaikan pendidikan sarjana Teknik Komputer dengan fokus akademik pada software engineering, full-stack web development, artificial intelligence, machine learning, dan data science.",
  );

  // Focus validations: contains SE, web dev, AI, ML, data science; does NOT use plural data sciences
  assert.match(educationData.summary.en, /artificial intelligence/i);
  assert.match(educationData.summary.id, /artificial intelligence/i);
  assert.match(educationData.summary.en, /data science/i);
  assert.match(educationData.summary.id, /data science/i);
  assert.doesNotMatch(educationData.summary.en, /data sciences/i);
  assert.doesNotMatch(educationData.summary.id, /data sciences/i);
  assert.match(educationData.summary.en, /software engineering/i);
  assert.match(educationData.summary.en, /full-stack web development/i);
  assert.match(educationData.summary.en, /machine learning/i);

  // Verify HCIA-AI V3.5 and AI in Credentials section summary remain intact
  const hcia = certificatesData.find((c) => c.id === "hcia-ai");
  assert.ok(hcia, "HCIA-AI certificate must remain present");
  assert.equal(hcia.title.en, "HCIA-AI V3.5");
  assert.match(credentialSectionCopy.summary.en, /artificial intelligence/i);
  assert.match(credentialSectionCopy.summary.id, /kecerdasan buatan/i);

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

  // Absence of previous About lead and narrative copy
  assert.doesNotMatch(
    aboutDataFile,
    /A Computer Engineering graduate with hands-on experience in software engineering/i,
  );
  assert.doesNotMatch(
    aboutDataFile,
    /Lulusan Teknik Komputer dengan pengalaman langsung dalam software engineering/i,
  );
  assert.doesNotMatch(
    aboutDataFile,
    /My background in Computer Engineering shaped the way I see software/i,
  );
  assert.doesNotMatch(
    aboutDataFile,
    /Latar belakang Teknik Komputer membentuk cara saya melihat software/i,
  );
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
  assert.doesNotMatch(profileFile, /data\.subtag\[locale\]/);

  // Exclusions: No metadata table, no CTA, no skills/proficiency
  assert.doesNotMatch(profileFile, /<dl/);
  assert.doesNotMatch(profileFile, /<dt/);
  assert.doesNotMatch(profileFile, /<dd/);
  assert.doesNotMatch(profileFile, /Download/i);
  assert.doesNotMatch(profileFile, /Resume/i);
  assert.doesNotMatch(profileFile, /CV/i);
});

test("AboutEducation component renders exact academic records, full thesis titles, and accessible Bachelor Certificate dialog", () => {
  const educationFile = readFileSync(
    join(root, "src", "components", "about", "about-education.tsx"),
    "utf8",
  );

  // Section tags & headings
  assert.match(educationFile, /\[02 \/\/ EDUCATION\]/);
  assert.match(educationFile, /\[02 \/\/ PENDIDIKAN\]/);
  assert.match(educationFile, /data\.degree\[locale\]/);
  assert.match(educationFile, /data\.institution\[locale\]/);

  // Metadata row with thin rules
  assert.match(educationFile, /data\.period\[locale\]/);
  assert.match(educationFile, /data\.gpa/);
  assert.match(educationFile, /data\.status\[locale\]/);
  assert.match(educationFile, /border-y border-\(--color-border\)/);

  // Approved Education Summary
  assert.match(educationFile, /data\.summary\[locale\]/);

  // Full Bilingual Thesis Record
  assert.match(educationFile, /data\.thesis\.label\[locale\]/);
  assert.match(educationFile, /data\.thesis\.title\[locale\]/);

  // Bachelor Certificate Evidence Card
  assert.match(educationFile, /data\.bachelorCertificate\.figureLabel/);
  assert.match(educationFile, /data\.bachelorCertificate\.year/);
  assert.match(educationFile, /data\.bachelorCertificate\.assetPath/);
  assert.match(educationFile, /data\.bachelorCertificate\.alt\[locale\]/);
  assert.match(educationFile, /data\.bachelorCertificate\.inspectLabel\[locale\]/);
  assert.doesNotMatch(educationFile, /data\.bachelorCertificate\.caption\[locale\]/);
  assert.doesNotMatch(educationFile, /data\.subtag\[locale\]/);

  // Accessible Dialog Modal & Semantics
  assert.match(educationFile, /role="dialog"/);
  assert.match(educationFile, /aria-modal="true"/);
  assert.match(educationFile, /aria-labelledby="bachelor-cert-dialog-heading"/);
  assert.match(educationFile, /Bachelor Certificate/);
  assert.match(educationFile, /data\.bachelorCertificate\.badge\[locale\]/);
  assert.match(educationFile, /data\.bachelorCertificate\.closeLabel\[locale\]/);

  // Scroll region accessibility and initial scrollTop reset
  assert.match(educationFile, /className="cert-modal-image-wrapper"/);
  assert.match(educationFile, /tabIndex=\{0\}/);
  assert.match(educationFile, /role="region"/);
  assert.match(educationFile, /imageWrapperRef\.current\.scrollTop\s*=\s*0/);

  // Keyboard accessibility and focus management
  assert.match(educationFile, /key === "Escape"/);
  assert.match(educationFile, /key === "Tab"/);
  assert.match(educationFile, /triggerRef\.current\?\.focus\(\)/);
  assert.match(educationFile, /closeBtnRef\.current\?\.focus\(\)/);
  assert.match(educationFile, /document\.body\.style\.overflow\s*=\s*"hidden"/);

  // Exclusions in component
  assert.doesNotMatch(educationFile, /Semarang/i);
  assert.doesNotMatch(educationFile, /Cum\s*Laude/i);
  assert.doesNotMatch(educationFile, /download/i);
  assert.doesNotMatch(educationFile, /ijazah/i);
  assert.doesNotMatch(educationFile, /diploma/i);
  assert.doesNotMatch(educationFile, /Surat Keterangan Lulus/i);
  assert.doesNotMatch(educationFile, /Best Graduate/i);
});

test("AboutCertificates component renders approved editorial archive grid, responsive layout, dynamic filters, and accessible dialog modal", () => {
  const certFile = readFileSync(
    join(root, "src", "components", "about", "about-certificates.tsx"),
    "utf8",
  );

  // Section tags & headings
  assert.match(certFile, /\[03 \/\/ CREDENTIALS\]/);
  assert.match(certFile, /\[03 \/\/ SERTIFIKASI\]/);
  assert.doesNotMatch(certFile, /copy\.subtag\[locale\]/);
  assert.match(certFile, /copy\.title\[locale\]/);
  assert.match(certFile, /copy\.summary\[locale\]/);

  // Filter Group & Accessible Controls: Projects Hub Text Tab Parity
  assert.match(certFile, /role="tablist"/);
  assert.match(certFile, /role="tab"/);
  assert.match(certFile, /copy\.accessibility\.filterLabel\[locale\]/);
  assert.match(certFile, /aria-selected=\{isSelected\}/);
  assert.match(certFile, /min-h-\[44px\]/);
  assert.match(certFile, /focus-visible:outline-2/);
  assert.match(certFile, /bg-\(--color-accent\)/);

  // Technical Editorial Archive Grid & Responsive Breakpoints
  assert.match(certFile, /grid-cols-1 md:grid-cols-2 xl:grid-cols-3/);
  assert.match(certFile, /aspect-\[16\/11\]/);
  assert.match(certFile, /object-contain/);
  assert.match(certFile, /group-hover:scale-\[1\.02\]/);

  // Figure numbers, Neutral Issuers, and Official Titles
  assert.match(certFile, /FIG\.\{figureNum\}/);
  assert.match(certFile, /cert\.issuer/);
  assert.match(certFile, /cert\.title\[locale\]/);

  // Accessible Inspection Button on Cards
  assert.match(certFile, /aria-label=/);
  assert.match(certFile, /Lihat sertifikat/);
  assert.match(certFile, /Inspect certificate:/);

  // Accessible Document Preview Modal & Semantics
  assert.match(certFile, /role="dialog"/);
  assert.match(certFile, /aria-modal="true"/);
  assert.match(certFile, /aria-labelledby=\{`cert-dialog-heading-\$\{activeCertificate\.id\}`\}/);
  assert.match(certFile, /activeCertificate\.issuer/);
  assert.match(certFile, /activeCertificate\.title\[locale\]/);
  assert.match(certFile, /copy\.accessibility\.closeLabel\[locale\]/);

  // Scroll region accessibility and initial scrollTop reset
  assert.match(certFile, /className="cert-modal-image-wrapper"/);
  assert.match(certFile, /tabIndex=\{0\}/);
  assert.match(certFile, /role="region"/);
  assert.match(certFile, /imageWrapperRef\.current\.scrollTop\s*=\s*0/);

  // Keyboard accessibility and focus management
  assert.match(certFile, /key === "Escape"/);
  assert.match(certFile, /key === "Tab"/);
  assert.match(certFile, /activeTriggerRef\.current\?\.focus\(\)/);
  assert.match(certFile, /closeBtnRef\.current\?\.focus\(\)/);
  assert.match(certFile, /document\.body\.style\.overflow\s*=\s*"hidden"/);

  // Prohibited claims & elements absent from component
  assert.doesNotMatch(certFile, /CISCO VERIFIED/i);
  assert.doesNotMatch(certFile, /HUAWEI CERTIFIED/i);
  assert.doesNotMatch(certFile, /Dicoding/i);
  assert.doesNotMatch(certFile, /PL\/SQL/i);
  assert.doesNotMatch(certFile, /backdrop-blur/); // No glassmorphic badges on thumbnails
});

test("About sections reuse established Home ScrollReveal mechanism and respect reduced motion", () => {
  const profileFile = readFileSync(
    join(root, "src", "components", "about", "about-profile.tsx"),
    "utf8",
  );
  const educationFile = readFileSync(
    join(root, "src", "components", "about", "about-education.tsx"),
    "utf8",
  );
  const certFile = readFileSync(
    join(root, "src", "components", "about", "about-certificates.tsx"),
    "utf8",
  );
  const scrollRevealFile = readFileSync(
    join(root, "src", "components", "ui", "scroll-reveal.tsx"),
    "utf8",
  );
  const globalsCss = readFileSync(
    join(root, "src", "app", "globals.css"),
    "utf8",
  );

  // All 3 sections import and use the shared ScrollReveal component
  assert.match(profileFile, /from ["']@\/components\/ui\/scroll-reveal["']/);
  assert.match(educationFile, /from ["']@\/components\/ui\/scroll-reveal["']/);
  assert.match(certFile, /from ["']@\/components\/ui\/scroll-reveal["']/);

  // Profile major blocks
  assert.match(profileFile, /<ScrollReveal className="flex flex-col gap-5 sm:gap-6">/);
  assert.match(profileFile, /<ScrollReveal delayMs=\{50\}>/);
  assert.match(profileFile, /<ScrollReveal\s+delayMs=\{100\}/);

  // Education major blocks
  assert.match(educationFile, /<ScrollReveal className="flex flex-col gap-2 max-w-3xl">/);
  assert.match(educationFile, /<ScrollReveal\s+delayMs=\{100\}/);
  assert.match(educationFile, /<ScrollReveal\s+delayMs=\{150\}/);

  // Certificates major blocks
  assert.match(certFile, /<ScrollReveal className="flex flex-col gap-2 max-w-3xl">/);
  assert.match(certFile, /<ScrollReveal delayMs=\{100\}>/);
  assert.match(certFile, /<ScrollReveal delayMs=\{150\}>/);

  // ScrollReveal component maintains SSR safe visible default to avoid blink/hydration flash
  assert.match(scrollRevealFile, /data-reveal-state="visible"/);
  assert.match(scrollRevealFile, /prefers-reduced-motion/);

  // CSS Scroll Reveal System tokens and reduced-motion override
  assert.match(globalsCss, /\.scroll-reveal-container/);
  assert.match(globalsCss, /data-reveal-state="hidden"/);
  assert.match(globalsCss, /data-reveal-state="visible"/);
  assert.match(globalsCss, /transition:\s*none\s*!important/);
});


