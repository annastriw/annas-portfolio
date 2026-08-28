import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  siteIdentity,
  professionalRoles,
} from "../src/content/site/identity.ts";
import { siteContact } from "../src/content/site/contact.ts";
import { siteConfig } from "../src/content/site/site-config.ts";
import { navigationConfig } from "../src/content/site/navigation.ts";
import { experiencesData } from "../src/content/experience/experience-data.ts";
import { generatePersonJsonLd } from "../src/lib/seo/schema-generators.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Authoritative shared location resolves to Jakarta, Indonesia with exact metadata", () => {
  // Authoritative identity
  assert.equal(siteIdentity.location, "Jakarta, Indonesia");
  assert.equal(siteIdentity.locationMetadata, "JAKARTA, INDONESIA · UTC+7");
  assert.equal(siteIdentity.timezone, "Asia/Jakarta (UTC+7)");

  // Shared consumers
  assert.equal(siteContact.location, "Jakarta, Indonesia");
  assert.equal(siteContact.timezone, "Asia/Jakarta (UTC+7)");
  assert.equal(siteConfig.location, "Jakarta, Indonesia");
  assert.equal(siteConfig.locationMetadata, "JAKARTA, INDONESIA · UTC+7");
  assert.equal(siteConfig.contact.location, "Jakarta, Indonesia");
  assert.equal(siteConfig.contact.timezone, "Asia/Jakarta (UTC+7)");

  // Person schema structured data
  const person = generatePersonJsonLd();
  assert.equal(person.address?.addressLocality, "Jakarta");
  assert.equal(person.address?.addressCountry, "Indonesia");

  // Mobile nav consumes location metadata
  const mobileNavFile = readFileSync(
    join(root, "src", "components", "navigation", "mobile-nav.tsx"),
    "utf8",
  );
  assert.match(mobileNavFile, /siteIdentity\.locationMetadata/);
  assert.doesNotMatch(mobileNavFile, /KLATEN, ID · UTC\+7/);
});

test("Historical Klaten experience data remains intact and unchanged", () => {
  const ukgExperience = experiencesData.find(
    (exp) => exp.id === "cv-universal-kharisma-globalindo",
  );
  assert.ok(ukgExperience, "UKG experience record must exist");
  assert.equal(
    ukgExperience.location.en,
    "Klaten, Central Java, Indonesia",
    "Historical UKG experience location in English must remain Klaten",
  );
  assert.equal(
    ukgExperience.location.id,
    "Klaten, Jawa Tengah, Indonesia",
    "Historical UKG experience location in Indonesian must remain Klaten",
  );
});

test("Authoritative professional roles use exact approved full titles", () => {
  const expectedRoles = [
    "Software Engineer",
    "Full-Stack Web Developer",
    "Machine Learning Engineer",
  ];

  assert.deepEqual(Array.from(professionalRoles), expectedRoles);
  assert.deepEqual(Array.from(siteIdentity.roles), expectedRoles);
  assert.deepEqual(Array.from(siteConfig.roles), expectedRoles);
  assert.equal(siteIdentity.primaryJobTitle, "Software Engineer");
  assert.equal(siteConfig.primaryJobTitle, "Software Engineer");

  // Roles in positioning text
  assert.equal(
    siteIdentity.positioning.en,
    "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  );
  assert.equal(
    siteIdentity.positioning.id,
    "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  );
});

test("Shared consumers do not reintroduce shortened role names", () => {
  // Footer
  const footerFile = readFileSync(
    join(root, "src", "components", "layout", "footer.tsx"),
    "utf8",
  );
  assert.match(footerFile, /siteIdentity\.roles\.map/);
  assert.doesNotMatch(footerFile, /<li>Full-Stack Developer<\/li>/);
  assert.doesNotMatch(footerFile, /<li>ML Engineer<\/li>/);

  // Splash
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );
  assert.match(splashFile, /siteIdentity\.roles\[0\]\.toUpperCase\(\)/);
  assert.match(splashFile, /siteIdentity\.roles\[1\]\.toUpperCase\(\)/);
  assert.match(splashFile, /siteIdentity\.roles\[2\]\.toUpperCase\(\)/);
  assert.doesNotMatch(splashFile, /<span>FULL-STACK DEVELOPER<\/span>/);
  assert.doesNotMatch(splashFile, /<span>ML ENGINEER<\/span>/);

  // Hero ContinuousRoles
  const rolesFile = readFileSync(
    join(root, "src", "components", "home", "hero", "continuous-roles.tsx"),
    "utf8",
  );
  assert.match(rolesFile, /siteIdentity\.roles\[0\]/);
  assert.match(rolesFile, /siteIdentity\.roles\[1\]/);
  assert.match(rolesFile, /siteIdentity\.roles\[2\]/);

  // Schema
  const person = generatePersonJsonLd();
  assert.equal(person.jobTitle, "Software Engineer");
});

test("Central bilingual shell-copy values match approved decisions", () => {
  // Navigation config labels
  assert.equal(navigationConfig.en.labels.mainNavigation, "Main Navigation");
  assert.equal(navigationConfig.id.labels.mainNavigation, "Navigasi Utama");

  // Header desktop nav label
  const headerFile = readFileSync(
    join(root, "src", "components", "layout", "header.tsx"),
    "utf8",
  );
  assert.match(headerFile, /locale === "id" \? "Navigasi Utama" : "Main Navigation"/);

  // Splash ID status & accessibility label
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );
  assert.match(splashFile, /MEMBUKA ARSIP TEKNIS/);
  assert.doesNotMatch(splashFile, /MEMBUKA ARSIP TEKNIKAL/);
  assert.match(splashFile, /Pembukaan arsip editorial/);
  assert.match(splashFile, /Editorial archive folio opening/);

  // Route transit bar label
  const transitFile = readFileSync(
    join(root, "src", "components", "ui", "route-transit-bar.tsx"),
    "utf8",
  );
  assert.match(transitFile, /Menuju \$\{currentRoute\.label\}/);
  assert.match(transitFile, /Navigating to \$\{currentRoute\.label\}/);
});

test("Dynamic year values remain dynamic across shell components", () => {
  const footerFile = readFileSync(
    join(root, "src", "components", "layout", "footer.tsx"),
    "utf8",
  );
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );

  assert.match(footerFile, /new Date\(\)\.getFullYear\(\)/);
  assert.match(splashFile, /new Date\(\)\.getFullYear\(\)/);
});
