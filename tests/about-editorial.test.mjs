import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("About profile maintains verified factual information, natural narrative, and portrait asset", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { profileData } = await import(moduleUrl.href);

  // Verified Profile Facts
  assert.equal(profileData.name, "Annas Tri Widagdo");
  assert.equal(
    profileData.headline.en,
    "Software Engineer · Full-Stack Developer · ML Engineer",
  );
  assert.equal(
    profileData.metadata.role.en,
    "Software Engineer · Full-Stack Developer · ML Engineer",
  );
  assert.equal(
    profileData.metadata.education.en,
    "Computer Engineering · Diponegoro University",
  );
  assert.equal(
    profileData.metadata.education.id,
    "Teknik Komputer · Universitas Diponegoro",
  );
  assert.equal(profileData.metadata.gpa, "3.79 / 4.00");
  assert.equal(profileData.metadata.status.en, "Fresh Graduate");
  assert.equal(profileData.metadata.status.id, "Lulusan Baru");
  assert.match(profileData.metadata.location.en, /Klaten/);

  // Paragraphs
  assert.equal(profileData.paragraphs.en.length, 2);
  assert.equal(profileData.paragraphs.id.length, 2);
  assert.match(profileData.paragraphs.en[0], /Diponegoro University/);
  assert.match(profileData.paragraphs.en[0], /3\.79 \/ 4\.00/);
  assert.match(profileData.paragraphs.id[0], /Universitas Diponegoro/);
  assert.match(profileData.paragraphs.id[0], /3\.79 \/ 4\.00/);

  // Portrait asset
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

test("About education section references verified degree and local bachelor certificate asset", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { educationData } = await import(moduleUrl.href);

  assert.equal(educationData.degree.en, "Bachelor of Engineering (S.T.)");
  assert.equal(educationData.degree.id, "Sarjana Teknik (S.T.)");
  assert.equal(educationData.fieldOfStudy.en, "Computer Engineering");
  assert.equal(educationData.fieldOfStudy.id, "Teknik Komputer");
  assert.equal(educationData.institution.en, "Diponegoro University");
  assert.equal(educationData.institution.id, "Universitas Diponegoro");
  assert.equal(educationData.gpa, "3.79 / 4.00");

  const certPath = join(
    root,
    "public",
    educationData.certificateAsset.replace(/^\//, ""),
  );
  assert.ok(
    existsSync(certPath),
    `Bachelor certificate asset missing at ${certPath}`,
  );
});

test("About technical credentials contain exactly the 8 verified certificates with existing local assets", async () => {
  const moduleUrl = new URL(
    "../src/content/about/about-data.ts",
    import.meta.url,
  );
  const { certificatesData } = await import(moduleUrl.href);

  // Exactly 8 technical certificates
  assert.equal(certificatesData.length, 8);

  const ciscoCount = certificatesData.filter(
    (c) => c.category === "cisco-systems",
  ).length;
  const aiDbCount = certificatesData.filter(
    (c) => c.category === "ai-databases",
  ).length;

  assert.equal(ciscoCount, 5);
  assert.equal(aiDbCount, 3);

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

test("About page structure renders 3 core sections without obsolete legacy modules", () => {
  const pageFile = readFileSync(
    join(root, "src", "app", "[locale]", "about", "page.tsx"),
    "utf8",
  );

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
