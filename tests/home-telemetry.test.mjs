import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Hero section maintains factual 3-sentence bilingual bio, noninteractive role ellipsis, desktop 2-column alignment, and key metadata", () => {
  const heroFile = readFileSync(
    join(root, "src", "components", "home", "hero-section.tsx"),
    "utf8",
  );
  const rolesFile = readFileSync(
    join(root, "src", "components", "home", "hero", "continuous-roles.tsx"),
    "utf8",
  );

  assert.match(heroFile, /Annas Tri Widagdo/);
  assert.match(rolesFile, /Software Engineer/);
  assert.match(rolesFile, /Full-Stack Web Developer/);
  assert.match(rolesFile, /AI & Machine Learning Enthusiast/);
  assert.match(rolesFile, /I'm an/);
  assert.match(rolesFile, /CYCLE_INTERVAL_MS = 4000/);
  assert.match(rolesFile, /visibilitychange/);
  assert.match(rolesFile, /prefers-reduced-motion/);
  assert.match(rolesFile, /hero-role-ellipsis/);
  assert.doesNotMatch(rolesFile, /aria-pressed/);
  assert.doesNotMatch(rolesFile, /<button/);
  assert.match(heroFile, /(Jakarta, Indonesia|siteIdentity\.location)/i);
  assert.match(heroFile, /SystemClock/);
  assert.match(heroFile, /ContinuousRoles/);
  assert.match(heroFile, /hero-left-col/);
  assert.match(heroFile, /hero-portrait-col/);
  assert.match(heroFile, /\/assets\/profile\/pas-foto\.webp/);
  assert.match(heroFile, /PORTRAIT \/\/ FIG\.01/);
  assert.match(heroFile, /Explore Project Archive/);
  assert.match(heroFile, /Start a Conversation/);
  assert.ok(existsSync(join(root, "public", "assets", "profile", "pas-foto.webp")));

  // Exact 3-sentence approved bio in EN and ID
  const expectedBioEn =
    "I am a Software Engineer and a fresh graduate in Computer Engineering from Diponegoro University, with a focus on full-stack web development and an interest in AI, machine learning, and data science. I turn problems into software products designed around what users actually need. I want every solution I develop to work reliably, provide clear value, and be easy to use.";
  const expectedBioId =
    "Saya adalah Software Engineer dan fresh graduate Teknik Komputer Universitas Diponegoro yang berfokus pada full-stack web development, dengan minat pada AI, machine learning, dan data science. Saya mengubah permasalahan menjadi produk software yang dirancang sesuai kebutuhan pengguna. Saya ingin setiap solusi yang saya kembangkan dapat bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan.";

  assert.match(heroFile, new RegExp(escapeRegex(expectedBioEn)));
  assert.match(heroFile, new RegExp(escapeRegex(expectedBioId)));

  // Sentence count checks (exactly 3 sentences in each locale)
  const enSentences = expectedBioEn.split(/(?<=[.!?])\s+/).filter(Boolean);
  const idSentences = expectedBioId.split(/(?<=[.!?])\s+/).filter(Boolean);
  assert.equal(enSentences.length, 3);
  assert.equal(idSentences.length, 3);

  // Exact terminology requirements
  assert.match(expectedBioEn, /fresh graduate/);
  assert.match(expectedBioId, /fresh graduate/);
  assert.match(expectedBioId, /produk software/);

  // Absence of previous bio copy and removed technical-layer list
  assert.doesNotMatch(heroFile, /connecting interfaces, backend systems, data/i);
  assert.doesNotMatch(heroFile, /Saya mengubah permasalahan nyata menjadi sistem dan produk/i);
});

test("Hero continuous roles reel prevents mobile collapse, defines responsive short label for role 03, and preserves accessibility and rotation invariants", () => {
  const rolesFile = readFileSync(
    join(root, "src", "components", "home", "hero", "continuous-roles.tsx"),
    "utf8",
  );

  // 1. Mobile height collapse fix & 360px layout breakpoint: flex-1 is bounded by xs: (360px) and mobile (<360px) has w-full
  assert.match(rolesFile, /hero-role-reel[^"]*w-full\s+xs:w-auto\s+xs:flex-1/);
  assert.match(rolesFile, /hero-role-reel[^"]*min-h-6/);
  assert.match(rolesFile, /hero-role-reel[^"]*overflow-hidden/);
  assert.match(rolesFile, /hero-role-reel[^"]*min-w-0/);
  assert.match(rolesFile, /hero-role-reel[^"]*grid/);

  // Ensure fixed 24px (standalone h-6) and truncate are NOT used (prevent clipping when text wraps)
  assert.doesNotMatch(rolesFile, /hero-role-reel[^"]*(?<!min-)h-6/);
  assert.doesNotMatch(rolesFile, /<span className="truncate">/);

  // Ensure unconstrained flex-1 without xs: is NOT present on the reel
  assert.doesNotMatch(rolesFile, /hero-role-reel[^"]*min-w-0\s+flex-1/);

  // 2. Responsive short label for role 03 only (640px / sm: breakpoint)
  assert.match(rolesFile, /shortTitle:\s*"AI & ML Enthusiast"/);
  assert.match(rolesFile, /shortTitle:\s*"Software Engineer"/);
  assert.match(rolesFile, /shortTitle:\s*"Full-Stack Web Developer"/);

  // Responsive spans: sm:hidden for short label, hidden sm:inline for full label
  assert.match(rolesFile, /<span className="sm:hidden">\{role\.shortTitle\}<\/span>/);
  assert.match(rolesFile, /<span className="hidden sm:inline">\{role\.title\}<\/span>/);

  // 3. Responsive Indonesian prefix (640px / sm: breakpoint): "Saya" <640px, "Saya seorang" >=640px
  assert.match(rolesFile, /<span className="sm:hidden">Saya<\/span>/);
  assert.match(rolesFile, /<span className="hidden sm:inline">Saya seorang<\/span>/);

  // 4. Separated layout breakpoint (360px / xs:): 2-row ellipsis strictly <360px, 1-row elements >=360px
  assert.match(rolesFile, /xs:hidden[^"]*hero-role-ellipsis|hero-role-ellipsis\s+xs:hidden/);
  assert.match(rolesFile, /hidden\s+xs:flex[^"]*hero-role-ellipsis|hero-role-ellipsis\s+hidden\s+xs:flex/);
  assert.match(rolesFile, /hidden\s+xs:inline/);

  // 5. Stabilized prefix slot for EN
  assert.match(rolesFile, /hero-role-intro-slot|min-w-\[6\.5ch\]/);

  // First two roles are not shortened or truncated with ellipsis
  assert.doesNotMatch(rolesFile, /shortTitle:\s*"SE"/);
  assert.doesNotMatch(rolesFile, /shortTitle:\s*"Dev"/);

  // 6. Accessibility & screen reader: aria-hidden on reel, full text in sr-only
  assert.match(rolesFile, /aria-hidden="true"/);
  assert.match(rolesFile, /className="sr-only"/);
  assert.match(rolesFile, /activeRole\.title/);

  // 7. Invariants: 4000ms cycle interval, reduced motion static role 1, a/an prefix logic
  assert.match(rolesFile, /CYCLE_INTERVAL_MS = 4000/);
  assert.match(rolesFile, /prefers-reduced-motion/);
  assert.match(rolesFile, /isThirdActive\s*&&\s*isEnglishPrefix/);
  assert.match(rolesFile, /I'm an/);
});

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("Experience section renders connected timeline following exact approved hierarchy and monograms", async () => {
  const moduleUrl = new URL(
    "../src/content/experience/experience-data.ts",
    import.meta.url,
  );
  const { experiencesData } = await import(moduleUrl.href);

  assert.equal(experiencesData.length, 3);
  assert.equal(experiencesData[0].id, "cv-universal-kharisma-globalindo");
  assert.match(experiencesData[0].organization.en, /Universal Kharisma Globalindo/);
  assert.match(experiencesData[0].role.en, /Full-Stack Web Developer/);
  assert.equal(experiencesData[0].logoPlaceholder, "UKG");

  assert.equal(experiencesData[1].id, "intern-ft-undip");
  assert.match(experiencesData[1].organization.en, /Faculty of Engineering, Diponegoro University/);
  assert.match(experiencesData[1].role.en, /UI\/UX Designer Intern/);
  assert.equal(experiencesData[1].logoPlaceholder, "FT");

  assert.equal(experiencesData[2].id, "intern-duta-basis-dataprima");
  assert.match(experiencesData[2].organization.en, /PT Duta Basis Dataprima/);
  assert.match(experiencesData[2].role.en, /Junior Game Developer Intern/);
  assert.equal(experiencesData[2].logoPlaceholder, "DBD");

  const itemFile = readFileSync(
    join(root, "src", "components", "home", "experience", "experience-item.tsx"),
    "utf8",
  );
  assert.match(itemFile, /timeline-spine-col/);
  assert.match(itemFile, /experience-highlights/);
  assert.match(itemFile, /STACK \/\//);
});

test("Featured projects renders 4-row full-width editorial index with visible Explore Project cue, section-level archive CTA, and exact synchronized facts", async () => {
  const moduleUrl = new URL(
    "../src/content/projects/featured-config.ts",
    import.meta.url,
  );
  const { homeFeaturedConfig, homeSelectedProjects } = await import(moduleUrl.href);

  assert.equal(homeFeaturedConfig.slot1Slug, "ukg-system");
  assert.equal(homeFeaturedConfig.slot2Slug, "ihealth-edu");
  assert.equal(homeFeaturedConfig.slot3Slug, "ml-for-heart-attack-risk-prediction");
  assert.equal(homeFeaturedConfig.slot4Slug, "panoramic-virtual-tour");
  assert.equal(homeSelectedProjects.length, 4);

  // Exact 4 projects in order
  assert.equal(homeSelectedProjects[0].slug, "ukg-system");
  assert.equal(homeSelectedProjects[1].slug, "ihealth-edu");
  assert.equal(homeSelectedProjects[2].slug, "ml-for-heart-attack-risk-prediction");
  assert.equal(homeSelectedProjects[3].slug, "panoramic-virtual-tour");

  // 01 UKG System synchronization
  assert.equal(homeSelectedProjects[0].title.en, "UKG System");
  assert.equal(homeSelectedProjects[0].role.en, "Full-Stack Web Developer");
  assert.equal(homeSelectedProjects[0].status.en, "Live Production");
  assert.equal(
    homeSelectedProjects[0].summary.en,
    "A multi-branch ERP developed end to end to centralize inventory, sales, and daily operations for remote monitoring.",
  );
  assert.equal(
    homeSelectedProjects[0].summary.id,
    "ERP multi-cabang yang dikembangkan secara end-to-end untuk memusatkan data stok, penjualan, dan operasional agar dapat dipantau dari mana saja.",
  );
  assert.deepEqual(homeSelectedProjects[0].technologies, [
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Playwright",
    "Linux Ubuntu",
  ]);
  assert.equal(homeSelectedProjects[0].technologies.length, 6);

  // Confirm Dialisis Connect Edu is not on Home
  assert.ok(!homeSelectedProjects.some((p) => p.slug === "dialisis-connect-edu"));
  assert.ok(!Object.values(homeFeaturedConfig).includes("dialisis-connect-edu"));

  // 02 iHealth Edu synchronization (approved Frontend Web Developer, 6-item stack, approved bilingual summary)
  assert.equal(homeSelectedProjects[1].title.en, "iHealth Edu");
  assert.equal(homeSelectedProjects[1].role.en, "Frontend Web Developer");
  assert.equal(homeSelectedProjects[1].role.id, "Frontend Web Developer");
  assert.equal(homeSelectedProjects[1].status.en, "Live Production");
  assert.equal(homeSelectedProjects[1].status.id, "Live Production");
  assert.equal(
    homeSelectedProjects[1].summary.en,
    "A health education and screening platform developed with Puskesmas Padangsari, bringing patient records, IoT health data, and machine learning decision support into one system.",
  );
  assert.equal(
    homeSelectedProjects[1].summary.id,
    "Platform edukasi dan screening kesehatan yang dikembangkan bersama Puskesmas Padangsari, dengan data pasien, data kesehatan dari IoT, dan machine learning decision support dalam satu sistem.",
  );
  assert.deepEqual(homeSelectedProjects[1].technologies, [
    "Figma",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
  ]);
  assert.equal(homeSelectedProjects[1].technologies.length, 6);
  assert.ok(!homeSelectedProjects[1].technologies.includes("ESP32"));
  assert.ok(!homeSelectedProjects[1].technologies.includes("Laravel"));
  assert.match(homeSelectedProjects[1].summary.en, /IoT health data/);
  assert.match(homeSelectedProjects[1].summary.id, /data kesehatan dari IoT/);

  // 03 Heart Attack Risk Prediction synchronization (shorter home title, decision support, evaluated model metrics)
  assert.equal(homeSelectedProjects[2].title.en, "Heart Attack Risk Prediction");
  assert.equal(homeSelectedProjects[2].role.en, "Machine Learning Engineer");
  assert.equal(homeSelectedProjects[2].status.en, "Completed Prototype");
  assert.equal(
    homeSelectedProjects[2].summary.en,
    "A machine learning decision-support prototype integrated into iHealth Edu. The selected Random Forest model was evaluated on 158,355 records, achieved 71.93% accuracy and 0.8015 ROC-AUC, and was served through a Flask REST API.",
  );
  assert.equal(
    homeSelectedProjects[2].summary.id,
    "Prototype machine learning decision support yang terintegrasi dengan iHealth Edu. Model Random Forest terpilih dievaluasi menggunakan 158.355 data, menghasilkan accuracy 71,93% dan ROC-AUC 0,8015, lalu disajikan melalui Flask REST API.",
  );
  assert.deepEqual(homeSelectedProjects[2].technologies, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);
  assert.match(homeSelectedProjects[2].summary.en, /158,355 records/);
  assert.match(homeSelectedProjects[2].summary.en, /71\.93% accuracy/);
  assert.match(homeSelectedProjects[2].summary.en, /0\.8015 ROC-AUC/);
  assert.match(homeSelectedProjects[2].summary.id, /158\.355 data/);
  assert.match(homeSelectedProjects[2].summary.id, /accuracy 71,93%/);
  assert.match(homeSelectedProjects[2].summary.id, /ROC-AUC 0,8015/);
  assert.doesNotMatch(
    homeSelectedProjects[2].summary.en,
    /clinical diagnosis|diagnostic accuracy|clinical validation|treatment|replaces doctor|replaces healthcare/i,
  );
  assert.doesNotMatch(
    homeSelectedProjects[2].summary.id,
    /diagnosis klinis|akurasi diagnostik|validasi klinis|pengobatan|menggantikan dokter|menggantikan tenaga kesehatan/i,
  );

  // 04 Panoramic Virtual Tour synchronization
  assert.equal(homeSelectedProjects[3].title.en, "Panoramic Virtual Tour");
  assert.equal(
    homeSelectedProjects[3].role.en,
    "Junior Game Developer Intern",
  );
  assert.equal(homeSelectedProjects[3].status.en, "Completed Prototype");
  assert.equal(
    homeSelectedProjects[3].summary.en,
    "A Unity-based prototype that turns architectural panoramas into an interactive virtual tour with 360° viewing and hotspot navigation.",
  );
  assert.equal(
    homeSelectedProjects[3].summary.id,
    "Prototype berbasis Unity yang mengolah panorama arsitektur menjadi virtual tour interaktif dengan tampilan 360° dan navigasi hotspot.",
  );
  assert.deepEqual(homeSelectedProjects[3].technologies, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
  ]);

  const sectionFile = readFileSync(
    join(root, "src", "components", "home", "selected-projects.tsx"),
    "utf8",
  );
  const itemFile = readFileSync(
    join(root, "src", "components", "home", "projects", "featured-project-item.tsx"),
    "utf8",
  );

  // Section-level header and archive navigation preserved
  assert.match(sectionFile, /\[04 \/\/ SELECTED PROJECTS\]/);
  assert.match(sectionFile, /home-projects-index/);
  assert.match(sectionFile, /Explore Project Archive/);
  assert.match(sectionFile, /Jelajahi Arsip Proyek/);
  assert.doesNotMatch(sectionFile, /10 projects|all 10/i);

  // Per-entry layout: single accessible link, visible Explore Project CTA cue
  assert.match(itemFile, /project-index-row/);
  assert.match(itemFile, /project-row-link/);
  assert.match(itemFile, /project-row-thumbnail/);
  assert.match(itemFile, /STACK \/\//);
  assert.doesNotMatch(itemFile, /View Case Study/);
  assert.doesNotMatch(itemFile, /Lihat Studi Kasus/);
  assert.match(itemFile, /Explore Project/);
  assert.match(itemFile, /Jelajahi Proyek/);
  assert.doesNotMatch(itemFile, /line-clamp-2/);
});

test("GitHub telemetry module provides dynamic 2-year query, GraphQL contributionLevel, and server-only token handling", () => {
  const ghFile = readFileSync(
    join(root, "src", "lib", "github", "github-data.ts"),
    "utf8",
  );

  assert.match(ghFile, /currentYear - 1/);
  assert.match(ghFile, /https:\/\/api\.github\.com\/graphql/);
  assert.match(ghFile, /contributionLevel/);
  assert.match(ghFile, /https:\/\/api\.github\.com\/search\/commits\?q=author:\$\{username\}/);
  assert.match(ghFile, /process\.env\.GITHUB_TOKEN/);
  assert.doesNotMatch(ghFile, /NEXT_PUBLIC_GITHUB_TOKEN/);
});

test("GitHub Signal component renders minimal editorial signal, 2-year selector, and truthful fallback", () => {
  const componentFile = readFileSync(
    join(root, "src", "components", "home", "github-signal.tsx"),
    "utf8",
  );

  assert.match(componentFile, /\[03 \/\/ GITHUB\]/);
  assert.match(componentFile, /CONTRIBUTION SIGNAL/);
  assert.match(componentFile, /LATEST COMMITS/);
  assert.match(componentFile, /github\.com\/annastriw/);
  assert.match(componentFile, /selectedYearData\.totalContributions/);
  assert.match(componentFile, /ScrollReveal/);
  assert.match(componentFile, /overflow-x-auto/);
  assert.match(componentFile, /GitHub activity is temporarily unavailable/);
});

test("Technical Capabilities directory renders exact 9 categories, 56 capabilities, responsive layouts, consistent modal controls, and derived metadata", async () => {
  const moduleUrl = new URL(
    "../src/content/capabilities/capabilities-data.ts",
    import.meta.url,
  );
  const { capabilitiesCategories } = await import(moduleUrl.href);

  // Exact 9 categories in order
  assert.equal(capabilitiesCategories.length, 9);
  const expectedCategoryTitles = [
    "Frontend Engineering",
    "Backend & API Engineering",
    "Authentication & Application Security",
    "Database, Cache & Cloud Services",
    "Mobile Development",
    "Machine Learning & Data Science",
    "Quality Assurance & Testing",
    "Deployment & Infrastructure",
    "Design & Interactive Development",
  ];
  assert.deepEqual(
    capabilitiesCategories.map((c) => c.title),
    expectedCategoryTitles,
  );
  assert.deepEqual(
    capabilitiesCategories.map((c) => c.index),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
  );

  // Exact counts per category: 8 + 10 + 3 + 7 + 3 + 10 + 5 + 7 + 3 = 56
  const counts = capabilitiesCategories.map((c) => c.items.length);
  assert.deepEqual(counts, [8, 10, 3, 7, 3, 10, 5, 7, 3]);

  const totalItems = capabilitiesCategories.reduce((acc, c) => acc + c.items.length, 0);
  assert.equal(totalItems, 56);

  // Verify old categories are deleted
  const oldCategoryTitles = [
    "Machine Learning Fundamentals",
    "Software Engineering Fundamentals",
    "Quality & Development Tools",
    "Machine Learning & Data",
  ];
  for (const oldTitle of oldCategoryTitles) {
    assert.ok(
      !capabilitiesCategories.some((c) => c.title === oldTitle),
      `Old category "${oldTitle}" must not exist`,
    );
  }

  // Validate duplicate Laravel in 01 and 02 with distinct functional copy
  const cat01 = capabilitiesCategories[0];
  const cat02 = capabilitiesCategories[1];
  const laravel01 = cat01.items.find((i) => i.name === "Laravel");
  const laravel02 = cat02.items.find((i) => i.name === "Laravel");
  assert.ok(laravel01 && laravel02);
  assert.equal(laravel01.index, "01.03");
  assert.equal(laravel02.index, "02.02");
  assert.equal(
    laravel01.description?.en,
    "A PHP framework for developing web applications, including server-rendered interfaces, routing, data handling, and backend integration.",
  );
  assert.equal(
    laravel02.description?.en,
    "A PHP framework for building backend services, application logic, database operations, and web APIs.",
  );

  // PHP only appears in 02 Backend
  const allPhp = capabilitiesCategories.flatMap((c) => c.items).filter((i) => i.name === "PHP");
  assert.equal(allPhp.length, 1);
  assert.equal(allPhp[0].index, "02.03");
  assert.equal(
    allPhp[0].description?.en,
    "A server-side programming language for building dynamic web applications, backend logic, and API services.",
  );
  assert.equal(
    allPhp[0].description?.id,
    "Bahasa pemrograman server-side untuk membangun aplikasi web dinamis, logika backend, dan layanan API.",
  );

  // Swagger in 02.10 (not OpenAPI / Swagger)
  const swagger = cat02.items.find((i) => i.name === "Swagger");
  assert.ok(swagger);
  assert.equal(swagger.index, "02.10");

  // Database 04: Redis is in 04.05 after MongoDB (04.04)
  const cat04 = capabilitiesCategories[3];
  const mongo = cat04.items.find((i) => i.name === "MongoDB");
  const redis = cat04.items.find((i) => i.name === "Redis");
  assert.ok(mongo && redis);
  assert.equal(mongo.index, "04.04");
  assert.equal(redis.index, "04.05");
  assert.equal(
    redis.description?.en,
    "An in-memory data store used for caching, session management, and fast access to frequently requested data.",
  );
  assert.equal(
    redis.description?.id,
    "Penyimpanan data berbasis in-memory untuk caching, pengelolaan session, dan akses cepat ke data yang sering digunakan.",
  );

  // QA 07: Postman (07.03), JMeter (07.04), Lighthouse (07.05)
  const cat07 = capabilitiesCategories[6];
  const postman = cat07.items.find((i) => i.name === "Postman");
  const jmeter = cat07.items.find((i) => i.name === "JMeter");
  const lighthouse = cat07.items.find((i) => i.name === "Lighthouse");
  assert.ok(postman && jmeter && lighthouse);
  assert.equal(postman.index, "07.03");
  assert.equal(jmeter.index, "07.04");
  assert.equal(lighthouse.index, "07.05");
  assert.equal(
    jmeter.description?.en,
    "A performance testing tool for measuring how APIs and web applications behave under different levels of load.",
  );
  assert.equal(
    lighthouse.description?.en,
    "An automated auditing tool for evaluating web performance, accessibility, best practices, and SEO.",
  );

  // Deployment 08: Linux (Ubuntu) (08.02), Vercel (08.06), GitHub (08.07)
  const cat08 = capabilitiesCategories[7];
  const linux = cat08.items.find((i) => i.name === "Linux (Ubuntu)");
  const vercel = cat08.items.find((i) => i.name === "Vercel");
  const github = cat08.items.find((i) => i.name === "GitHub");
  assert.ok(linux && vercel && github);
  assert.equal(linux.index, "08.02");
  assert.equal(vercel.index, "08.06");
  assert.equal(github.index, "08.07");
  assert.equal(
    vercel.description?.en,
    "A cloud platform for deploying, previewing, and hosting web applications through an integrated development workflow.",
  );

  // Excluded items must not exist in home inventory
  const allNames = capabilitiesCategories.flatMap((c) => c.items.map((i) => i.name));
  assert.ok(!allNames.includes("SQL"));
  assert.ok(!allNames.includes("Docker Compose"));
  assert.ok(!allNames.includes("XGBoost"));
  assert.ok(!allNames.includes("SMOTE"));
  assert.ok(!allNames.includes("Hugging Face Transformers"));
  assert.ok(!allNames.includes("Wav2Vec2"));

  // Category 06 ML Concept entries have no fake vendor logos and have full descriptions
  const cat06 = capabilitiesCategories[5];
  const conceptNames = [
    "Data Preprocessing & Feature Engineering",
    "Supervised & Unsupervised Learning",
    "Statistical Analysis & Model Evaluation",
    "Natural Language & Speech Processing",
  ];
  for (const cName of conceptNames) {
    const item = cat06.items.find((i) => i.name === cName);
    assert.ok(item, `Concept item "${cName}" missing in category 06`);
    assert.equal(item.slug, undefined, `Concept item "${cName}" must not have a vendor logo slug`);
    assert.ok(item.monogram, `Concept item "${cName}" must have a monogram fallback`);
    assert.ok(item.description?.en, `Concept item "${cName}" missing EN description`);
    assert.ok(item.description?.id, `Concept item "${cName}" missing ID description`);
  }

  // All 52 tool items have valid SVG files in public/assets/technologies/
  const toolItems = capabilitiesCategories.flatMap((c) => c.items).filter((i) => i.slug);
  assert.equal(toolItems.length, 52);
  for (const item of toolItems) {
    assert.ok(item.monogram, `Item ${item.name} (${item.index}) missing monogram`);
    assert.ok(item.description?.en, `Item ${item.name} missing EN description`);
    assert.ok(item.description?.id, `Item ${item.name} missing ID description`);
    const svgPath = join(root, "public", "assets", "technologies", item.slug, "logo.svg");
    assert.ok(existsSync(svgPath), `SVG not found for ${item.slug}: ${svgPath}`);
  }

  // All 56 items have valid bilingual descriptions
  for (const cat of capabilitiesCategories) {
    for (const item of cat.items) {
      assert.ok(item.description?.en, `Item ${item.name} missing EN description`);
      assert.ok(item.description?.id, `Item ${item.name} missing ID description`);
    }
  }

  // Section Header & Derived metadata
  const sectionFile = readFileSync(
    join(root, "src", "components", "home", "tech-stack-section.tsx"),
    "utf8",
  );
  assert.match(sectionFile, /\[05 \/\/ CAPABILITIES\]/);
  assert.match(sectionFile, /capabilitiesCategories\.length/);
  assert.match(sectionFile, /Kapabilitas Teknis/);
  assert.match(sectionFile, /Technical Capabilities/);

  // Component structure & modal consistency checks
  const dirFile = readFileSync(
    join(root, "src", "components", "home", "tech-directory", "tech-directory.tsx"),
    "utf8",
  );
  const itemFile = readFileSync(
    join(root, "src", "components", "home", "tech-directory", "tech-item.tsx"),
    "utf8",
  );

  // Responsive layouts
  assert.match(dirFile, /annas-home-capability-category/); // LocalStorage key
  assert.match(dirFile, /lg:grid lg:grid-cols-/); // Desktop master-detail
  assert.match(dirFile, /xl:grid-cols-3/); // Desktop 3-column grid
  assert.match(dirFile, /hidden md:flex lg:hidden/); // Tablet horizontal navigator
  assert.match(dirFile, /flex md:hidden flex-col/); // Mobile accordion
  assert.match(dirFile, /createPortal/);
  assert.match(dirFile, /document\.body/);
  assert.match(dirFile, /tech-dialog-overlay fixed inset-0 z-60/);
  assert.match(dirFile, /tech-dialog-content/);
  assert.match(dirFile, /aria-modal="true"/);
  assert.match(dirFile, /document\.body\.style\.overflow = "hidden"/);
  assert.match(dirFile, /Escape/);

  // Modal controls consistency: x icon and ESC kbd hint, backdrop does not close, no Close Dialog text
  assert.match(dirFile, /<span aria-hidden="true">✕<\/span>/);
  assert.match(dirFile, /<kbd aria-hidden="true"[^>]*>ESC<\/kbd>/);
  assert.doesNotMatch(dirFile, /tech-dialog-overlay[^>]*onClick/); // Backdrop click does NOT close
  assert.doesNotMatch(dirFile, /Tutup Dialog/); // No visible Tutup Dialog
  assert.doesNotMatch(dirFile, /Close Record/); // No visible Close Record
  assert.doesNotMatch(dirFile, /Close Dialog/); // No visible Close Dialog

  // TechItem: no truncate, natural word wrapping, 44px+ touch target
  assert.match(itemFile, /tech-directory-row/);
  assert.match(itemFile, /aria-haspopup="dialog"/);
  assert.match(itemFile, /item\.index/);
  assert.match(itemFile, /leading-snug break-words/);
  assert.doesNotMatch(itemFile, /truncate/);
});

test("Header and Navigation maintain 5 numbered routes, locale switcher, and theme toggle", () => {
  const headerFile = readFileSync(
    join(root, "src", "components", "layout", "header.tsx"),
    "utf8",
  );
  const navFile = readFileSync(
    join(root, "src", "content", "site", "navigation.ts"),
    "utf8",
  );

  assert.match(headerFile, /annastriwidagdo\.me/);
  assert.match(headerFile, /NavLinks/);
  assert.match(headerFile, /LocaleSwitcher/);
  assert.match(headerFile, /ThemeToggle/);
  assert.match(headerFile, /MobileNav/);

  assert.match(navFile, /01/);
  assert.match(navFile, /02/);
  assert.match(navFile, /03/);
  assert.match(navFile, /04/);
  assert.match(navFile, /05/);
});

test("Home Unified Editorial Foundation enforces interaction contract, static elements, touch targets, and reduced motion", () => {
  const heroFile = readFileSync(
    join(root, "src", "components", "home", "hero-section.tsx"),
    "utf8",
  );
  const rolesFile = readFileSync(
    join(root, "src", "components", "home", "hero", "continuous-roles.tsx"),
    "utf8",
  );
  const selectedProjFile = readFileSync(
    join(root, "src", "components", "home", "selected-projects.tsx"),
    "utf8",
  );
  const featuredItemFile = readFileSync(
    join(root, "src", "components", "home", "projects", "featured-project-item.tsx"),
    "utf8",
  );
  const expItemFile = readFileSync(
    join(root, "src", "components", "home", "experience", "experience-item.tsx"),
    "utf8",
  );
  const ghFile = readFileSync(
    join(root, "src", "components", "home", "github-signal.tsx"),
    "utf8",
  );
  const globalsCss = readFileSync(
    join(root, "src", "app", "globals.css"),
    "utf8",
  );

  // 1. Hero interaction semantics and static portrait
  assert.match(heroFile, /btn-editorial-primary/);
  assert.match(heroFile, /btn-editorial-secondary/);
  assert.doesNotMatch(heroFile, /hover:border-\(--color-accent\)/);
  assert.doesNotMatch(heroFile, /hover:scale-\[1\.02\]/);

  // 2. Role ticker noninteractive ellipsis without role buttons
  assert.match(rolesFile, /hero-role-ellipsis/);
  assert.match(rolesFile, /aria-hidden="true"/);
  assert.match(rolesFile, /CYCLE_INTERVAL_MS = 4000/);
  assert.doesNotMatch(rolesFile, /<button/);
  assert.doesNotMatch(rolesFile, /aria-pressed/);

  // 3. Selected Projects: static row container, only explicit Link is clickable
  assert.match(featuredItemFile, /<article[^>]*class(?:Name)?="[^"]*project-index-row/);
  assert.match(featuredItemFile, /editorial-action-link/);
  assert.doesNotMatch(featuredItemFile, /hover:bg-\(--color-surface-subtle/);
  assert.doesNotMatch(featuredItemFile, /group-hover:scale-\[1\.03\]/);
  assert.doesNotMatch(selectedProjFile, /hover:border-\(--color-accent\)/);

  // 4. Experience timeline: static marker node and spine line without hover classes
  assert.doesNotMatch(expItemFile, /group-hover:border-\(--color-accent\)/);
  assert.doesNotMatch(expItemFile, /group-hover:bg-\(--color-accent\)/);

  // 5. GitHub Activity: static day cells have no hover ring
  assert.doesNotMatch(ghFile, /hover:ring-1/);

  // 6. Global CSS Editorial Tokens and Primitives
  assert.match(globalsCss, /\.btn-editorial-primary/);
  assert.match(globalsCss, /\.btn-editorial-secondary/);
  assert.match(globalsCss, /\.editorial-action-link/);
  assert.match(globalsCss, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
  assert.match(globalsCss, /transition-duration:\s*150ms/);
  assert.match(globalsCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});
