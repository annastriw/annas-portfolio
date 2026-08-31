import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const moduleUrl = new URL(
  "../src/content/projects/project-case-studies.ts",
  import.meta.url,
);

const {
  projectCaseStudies,
  getAdjacentProjectCaseStudies,
  getProjectCaseStudy,
} = await import(moduleUrl.href);

const expectedSlugs = [
  "ukg-system",
  "ihealth-edu",
  "dialisis-connect-edu",
  "nusa-dakwah",
  "simastok",
  "ml-for-heart-attack-risk-prediction",
  "speech-to-text-system",
  "thermal-printer-service",
  "footy-standings",
  "panoramic-virtual-tour",
];

test("publishes exactly 10 ordered bilingual case studies", () => {
  assert.equal(projectCaseStudies.length, 10);
  assert.deepEqual(
    projectCaseStudies.map((project) => project.slug),
    expectedSlugs,
  );
  assert.deepEqual(
    projectCaseStudies.map((project) => project.index),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  );

  for (const project of projectCaseStudies) {
    for (const locale of ["en", "id"]) {
      assert.ok(project.title[locale]);
      assert.ok(project.categoryLabel[locale]);
      assert.ok(project.role[locale]);
      assert.ok(project.status[locale]);
      assert.ok(project.overview[locale].length >= 2);
      assert.ok(project.overview[locale].length <= 3);
      assert.ok(project.contributions[locale].length >= 3);
      assert.ok(project.contributions[locale].length <= 5);
      assert.ok(project.technicalNotes[locale].length >= 3);
      assert.ok(project.technicalNotes[locale].length <= 5);
    }
    assert.ok(project.techStack.length >= 2);
    assert.ok(project.techStack.length <= 8);
  }
});

test("references only real local visual evidence and verified public links", () => {
  for (const project of projectCaseStudies) {
    assert.ok(existsSync(join(root, "public", project.cover.src)));
    assert.ok(project.evidence.length >= 1);
    assert.ok(project.evidence.length <= 8);

    for (const figure of project.evidence) {
      assert.match(figure.id, /^FIG\.0[1-8]$/);
      assert.ok(existsSync(join(root, "public", figure.src)));
      assert.ok(["wide", "mobile"].includes(figure.format));
      assert.ok(figure.alt.en && figure.alt.id);
      assert.ok(figure.caption.en && figure.caption.id);
    }
  }

  const linked = projectCaseStudies.filter((project) => project.liveUrl);
  assert.deepEqual(
    linked.map((project) => [project.slug, project.liveUrl]),
    [["ukg-system", "https://ukgsystem.site/"]],
  );
  assert.equal(
    projectCaseStudies.some((project) => project.githubUrl),
    false,
  );
});

test("maintains approved UKG System locked facts, bilingual copy, and content structures", () => {
  const ukg = getProjectCaseStudy("ukg-system");
  assert.ok(ukg);

  // Locked facts & metadata
  assert.equal(ukg.client?.en, "CV Universal Kharisma Globalindo");
  assert.equal(ukg.client?.id, "CV Universal Kharisma Globalindo");
  assert.equal(ukg.role.en, "Full-Stack Web Developer");
  assert.equal(ukg.role.id, "Full-Stack Web Developer");
  assert.equal(ukg.period?.en, "January–April 2026");
  assert.equal(ukg.period?.id, "Januari–April 2026");
  assert.equal(ukg.status.en, "Live Production");
  assert.equal(ukg.status.id, "Live Production");
  assert.equal(ukg.liveUrl, "https://ukgsystem.site/");
  assert.equal(ukg.githubUrl, undefined);
  assert.equal(ukg.repositoryNotice?.en, "Private Repository");
  assert.equal(ukg.repositoryNotice?.id, "Private Repository");

  // Category & Lead
  assert.equal(ukg.categoryLabel.en, "01 / WEB APPLICATION");
  assert.equal(ukg.categoryLabel.id, "01 / WEB APPLICATION");
  assert.equal(
    ukg.lead?.en,
    "A multi-branch ERP that brings inventory, sales, and daily operations into one system.",
  );
  assert.equal(
    ukg.lead?.id,
    "ERP multi-cabang yang menyatukan pengelolaan stok, penjualan, dan operasional harian dalam satu sistem.",
  );

  // Overview (exact 2 paragraphs)
  assert.equal(ukg.overview.en.length, 2);
  assert.equal(ukg.overview.id.length, 2);
  assert.equal(
    ukg.overview.en[0],
    "Before UKG System, inventory, sales, and branch operations were recorded in notebooks, with data shared through WhatsApp and Excel. This made it difficult for the owner to monitor activities across branches.",
  );
  assert.equal(
    ukg.overview.en[1],
    "UKG System brings these records together, allowing the owner to monitor inventory, sales, and operations remotely.",
  );
  assert.equal(
    ukg.overview.id[0],
    "Sebelum UKG System, pencatatan stok, penjualan, dan operasional cabang dilakukan melalui buku, sementara data dibagikan melalui WhatsApp dan Excel. Kondisi ini menyulitkan owner untuk memantau aktivitas lintas cabang.",
  );
  assert.equal(
    ukg.overview.id[1],
    "UKG System menyatukan data tersebut dalam satu sistem, sehingga owner dapat memantau stok, penjualan, dan operasional tanpa harus berada di lokasi.",
  );

  // Contributions (exact 3 items + learning sentence)
  assert.equal(ukg.contributions.en.length, 3);
  assert.equal(ukg.contributions.id.length, 3);
  assert.equal(
    ukg.contributions.en[0],
    "Gathered requirements through interviews with the owner and designed the UI/UX.",
  );
  assert.equal(
    ukg.contributions.en[1],
    "Independently developed the frontend, backend, and workflows connecting the system’s modules.",
  );
  assert.equal(
    ukg.contributions.en[2],
    "Tested and deployed the system for use in daily operations.",
  );
  assert.equal(
    ukg.contributionLearning?.en,
    "This project strengthened my experience in taking a system from business requirements to everyday operational use.",
  );
  assert.equal(
    ukg.contributionLearning?.id,
    "Project ini memperkuat pengalaman saya dalam mengembangkan sistem dari kebutuhan bisnis hingga digunakan dalam operasional sehari-hari.",
  );

  // System scope: 8 ordered modules
  assert.deepEqual(ukg.modules, [
    "User & Role Management",
    "Branch & Attendance",
    "Inventory & Stock",
    "Stock Order",
    "Store Operations",
    "Cashier & Sales",
    "Reports & Finance",
    "Dashboard & Analytics",
  ]);

  // System scope: workflow diagram text
  assert.deepEqual(ukg.workflow?.en, [
    "Sale recorded → Stock decreases.",
    "Sale cancelled → Stock restored.",
  ]);
  assert.deepEqual(ukg.workflow?.id, [
    "Transaksi penjualan → Stok berkurang.",
    "Transaksi dibatalkan → Stok dikembalikan.",
  ]);

  // System scope: 5 technology groups
  assert.equal(ukg.technologyGroups?.length, 5);
  assert.deepEqual(
    ukg.technologyGroups?.map((g) => g.category),
    ["Design", "Frontend", "Backend & Data", "Testing", "Deployment"],
  );

  // Gallery: 9 slides with searchable placeholders
  assert.equal(ukg.gallery?.length, 9);
  for (let i = 1; i <= 9; i++) {
    const num = String(i).padStart(2, "0");
    const slide = ukg.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.match(slide.caption.en, new RegExp(`\\[UKG_CAPTION_${num}_EN\\]`));
    assert.match(slide.caption.id, new RegExp(`\\[UKG_CAPTION_${num}_ID\\]`));
  }

  // Claim boundaries and prohibited strings
  const stringified = JSON.stringify(ukg);
  assert.doesNotMatch(stringified, /March 2026|Maret 2026/);
  assert.doesNotMatch(stringified, /three months|tiga bulan/i);
  assert.doesNotMatch(stringified, /ukgsystem\.com/);
  assert.doesNotMatch(stringified, /discount feature|fitur diskon/i);
  assert.doesNotMatch(stringified, /migration|migrasi/i);
  assert.doesNotMatch(stringified, /\b\d{2,3}%\b/);
});

test("keeps the project-specific factual boundaries explicit", () => {
  const stringify = (slug) => JSON.stringify(getProjectCaseStudy(slug));

  assert.match(stringify("ihealth-edu"), /not a clinical diagnosis|bukan diagnosis klinis/i);
  assert.match(
    stringify("ml-for-heart-attack-risk-prediction"),
    /71\.93%|71,93%/,
  );
  assert.match(
    stringify("ml-for-heart-attack-risk-prediction"),
    /0\.8015|0,8015/,
  );
  assert.match(stringify("speech-to-text-system"), /pretrained|pralatih/i);
  assert.doesNotMatch(stringify("speech-to-text-system"), /fine[- ]tun|\bWER\b|accuracy|akurasi/i);
  assert.doesNotMatch(stringify("footy-standings"), /real[- ]?time|live data|data live/i);
  assert.doesNotMatch(stringify("panoramic-virtual-tour"), /\bAR\b|\bVR\b|WebGL/i);
  assert.doesNotMatch(stringify("thermal-printer-service"), /universal|semua printer/i);
});

test("resolves every slug and deterministic adjacent navigation", () => {
  for (const slug of expectedSlugs) {
    assert.equal(getProjectCaseStudy(slug)?.slug, slug);
  }
  assert.equal(getProjectCaseStudy("missing"), null);

  const first = getAdjacentProjectCaseStudies(expectedSlugs[0]);
  assert.equal(first.previous, null);
  assert.equal(first.next?.slug, expectedSlugs[1]);

  const last = getAdjacentProjectCaseStudies(expectedSlugs.at(-1));
  assert.equal(last.previous?.slug, expectedSlugs.at(-2));
  assert.equal(last.next, null);
});

test("project public rendering has no project Markdown runtime import", () => {
  const route = readFileSync(
    join(root, "src", "app", "[locale]", "projects", "[slug]", "page.tsx"),
    "utf8",
  );

  assert.doesNotMatch(route, /gray-matter|react-markdown|@\/lib\/projects/);
});
