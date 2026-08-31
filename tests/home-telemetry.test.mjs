import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Hero section maintains factual 3-sentence bilingual bio, 3 full role controls, and key metadata", () => {
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
  assert.match(rolesFile, /Machine Learning Engineer/);
  assert.match(rolesFile, /CYCLE_INTERVAL_MS = 4000/);
  assert.match(rolesFile, /onMouseEnter/);
  assert.match(rolesFile, /onFocus/);
  assert.match(rolesFile, /prefers-reduced-motion/);
  assert.match(heroFile, /(Jakarta, Indonesia|siteIdentity\.location)/i);
  assert.match(heroFile, /SystemClock/);
  assert.match(heroFile, /ContinuousRoles/);
  assert.match(heroFile, /\/assets\/profile\/pas-foto\.webp/);
  assert.match(heroFile, /PORTRAIT \/\/ FIG\.01/);
  assert.match(heroFile, /Explore Project Archive/);
  assert.match(heroFile, /Start a Conversation/);
  assert.ok(existsSync(join(root, "public", "assets", "profile", "pas-foto.webp")));

  // Exact 3-sentence approved bio in EN and ID
  const expectedBioEn =
    "I am a Software Engineer and a fresh graduate in Computer Engineering from Diponegoro University, focused on full-stack web development and machine learning. I turn problems into software products designed around what users actually need. I want every solution I develop to work reliably, provide clear value, and be easy to use.";
  const expectedBioId =
    "Saya adalah Software Engineer dan fresh graduate Teknik Komputer Universitas Diponegoro yang berfokus pada full-stack web development dan machine learning. Saya mengubah permasalahan menjadi software product yang dirancang berdasarkan kebutuhan pengguna. Saya ingin setiap solusi yang saya kembangkan bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan.";

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
  assert.match(expectedBioId, /software product/);

  // Absence of previous bio copy and removed technical-layer list
  assert.doesNotMatch(heroFile, /connecting interfaces, backend systems, data/i);
  assert.doesNotMatch(heroFile, /Saya mengubah permasalahan nyata menjadi sistem dan produk/i);
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

test("Featured projects renders 4-row full-width editorial index with single archive CTA, no per-entry CTA, and exact synchronized facts", async () => {
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
    "A multi-branch ERP developed end-to-end for CV Universal Kharisma Globalindo, covering operational workflows, automated testing, and production deployment.",
  );
  assert.equal(
    homeSelectedProjects[0].summary.id,
    "ERP multi-cabang yang dikembangkan secara end-to-end untuk CV Universal Kharisma Globalindo, mencakup workflow operasional, automated testing, dan deployment ke production.",
  );
  assert.deepEqual(homeSelectedProjects[0].technologies, [
    "Next.js",
    "NestJS",
    "TypeScript",
    "MySQL",
    "Katalon Studio",
    "Linux Ubuntu",
  ]);

  // 02 iHealth Edu synchronization (5-item displayed stack, ESP32 omitted, IoT summary preserved)
  assert.equal(homeSelectedProjects[1].title.en, "iHealth Edu");
  assert.equal(homeSelectedProjects[1].role.en, "Full-Stack Web Developer");
  assert.equal(homeSelectedProjects[1].status.en, "Live Production");
  assert.equal(
    homeSelectedProjects[1].summary.en,
    "A health education and screening platform developed with Puskesmas Padangsari, integrating patient data management, IoT telemetry, and machine learning decision support.",
  );
  assert.equal(
    homeSelectedProjects[1].summary.id,
    "Platform edukasi dan screening kesehatan yang dikembangkan bersama Puskesmas Padangsari, dengan pengelolaan data pasien, telemetri IoT, dan dukungan pengambilan keputusan berbasis machine learning.",
  );
  assert.deepEqual(homeSelectedProjects[1].technologies, [
    "Next.js",
    "Laravel",
    "MySQL",
    "Flask",
    "Docker",
  ]);
  assert.equal(homeSelectedProjects[1].technologies.length, 5);
  assert.ok(!homeSelectedProjects[1].technologies.includes("ESP32"));
  assert.match(homeSelectedProjects[1].summary.en, /IoT telemetry/);
  assert.match(homeSelectedProjects[1].summary.id, /telemetri IoT/);

  // 03 Heart Attack Risk Prediction synchronization (shorter home title, experimental prototype boundary)
  assert.equal(homeSelectedProjects[2].title.en, "Heart Attack Risk Prediction");
  assert.equal(homeSelectedProjects[2].role.en, "Machine Learning Engineer");
  assert.equal(homeSelectedProjects[2].status.en, "Completed Prototype");
  assert.equal(
    homeSelectedProjects[2].summary.en,
    "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
  );
  assert.equal(
    homeSelectedProjects[2].summary.id,
    "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inferensi model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
  );
  assert.deepEqual(homeSelectedProjects[2].technologies, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);
  assert.doesNotMatch(homeSelectedProjects[2].summary.en, /158,355|71\.93%/);

  // 04 Panoramic Virtual Tour synchronization
  assert.equal(homeSelectedProjects[3].title.en, "Panoramic Virtual Tour");
  assert.equal(homeSelectedProjects[3].role.en, "Junior Game Developer");
  assert.equal(homeSelectedProjects[3].status.en, "Completed Prototype");
  assert.equal(
    homeSelectedProjects[3].summary.en,
    "A Unity-based virtual tour developed during an internship at PT Duta Basis Dataprima, combining architectural panoramas with hotspot navigation.",
  );
  assert.equal(
    homeSelectedProjects[3].summary.id,
    "Virtual tour berbasis Unity yang dikembangkan saat magang di PT Duta Basis Dataprima, menggabungkan panorama arsitektur dengan navigasi hotspot.",
  );
  assert.deepEqual(homeSelectedProjects[3].technologies, [
    "Unity",
    "C#",
    "Lumion Pro",
    "360° Panorama",
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

  // Per-entry layout: single accessible link, no separate visible CTA text
  assert.match(itemFile, /project-index-row/);
  assert.match(itemFile, /project-row-link/);
  assert.match(itemFile, /project-row-thumbnail/);
  assert.match(itemFile, /STACK \/\//);
  assert.doesNotMatch(itemFile, /View Case Study/);
  assert.doesNotMatch(itemFile, /Lihat Studi Kasus/);
  assert.doesNotMatch(itemFile, /Explore Project/);
  assert.doesNotMatch(itemFile, /Jelajahi Proyek/);
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

test("Technical Capabilities directory renders 6 stacked categories with Postman replacing Nginx in 05.05", async () => {
  const moduleUrl = new URL(
    "../src/content/capabilities/capabilities-data.ts",
    import.meta.url,
  );
  const { capabilitiesCategories } = await import(moduleUrl.href);

  assert.equal(capabilitiesCategories.length, 6);
  assert.equal(capabilitiesCategories[0].title, "Frontend Engineering");
  assert.equal(capabilitiesCategories[1].title, "Backend & Data");
  assert.equal(capabilitiesCategories[2].title, "Mobile & Native Development");
  assert.equal(capabilitiesCategories[3].title, "Machine Learning & Data Science");
  assert.equal(capabilitiesCategories[4].title, "Testing & Deployment");
  assert.equal(capabilitiesCategories[5].title, "Design & Other");

  // Testing & Deployment category verification
  const testingCategory = capabilitiesCategories[4];
  assert.equal(testingCategory.items.length, 6);
  assert.equal(testingCategory.items[0].slug, "katalon-studio");
  assert.equal(testingCategory.items[1].slug, "playwright");
  assert.equal(testingCategory.items[2].slug, "docker");
  assert.equal(testingCategory.items[3].slug, "linux-ubuntu");
  assert.equal(testingCategory.items[4].slug, "postman");
  assert.equal(testingCategory.items[5].slug, "github");

  // Postman item details
  const postmanItem = testingCategory.items[4];
  assert.equal(postmanItem.name, "Postman");
  assert.equal(postmanItem.monogram, "PM");
  assert.equal(postmanItem.index, "05.05");
  assert.equal(
    postmanItem.description.en,
    "Used to send API requests, inspect responses, and test endpoints during development.",
  );
  assert.equal(
    postmanItem.description.id,
    "Digunakan untuk mengirim request API, memeriksa respons, dan menguji endpoint selama pengembangan.",
  );

  // Absence of Nginx in capability items
  const allSlugs = capabilitiesCategories.flatMap((c) => c.items.map((i) => i.slug));
  assert.ok(!allSlugs.includes("nginx"));

  // Nginx asset preservation (must not be deleted)
  assert.ok(existsSync(join(root, "public", "assets", "technologies", "nginx", "logo.svg")));

  const dirFile = readFileSync(
    join(root, "src", "components", "home", "tech-directory", "tech-directory.tsx"),
    "utf8",
  );
  const catFile = readFileSync(
    join(root, "src", "components", "home", "tech-directory", "tech-category.tsx"),
    "utf8",
  );
  const itemFile = readFileSync(
    join(root, "src", "components", "home", "tech-directory", "tech-item.tsx"),
    "utf8",
  );

  assert.match(dirFile, /tech-dialog-content/);
  assert.match(dirFile, /aria-modal="true"/);
  assert.match(dirFile, /document\.body\.style\.overflow = "hidden"/);
  assert.match(dirFile, /Escape/);
  assert.match(catFile, /tech-directory-category/);
  assert.match(itemFile, /tech-directory-row/);
  assert.match(itemFile, /aria-haspopup="dialog"/);
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
