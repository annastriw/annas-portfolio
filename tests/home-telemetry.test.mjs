import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Hero section maintains factual 1-2 sentence bilingual branding and key metadata", () => {
  const heroFile = readFileSync(
    join(root, "src", "components", "home", "hero-section.tsx"),
    "utf8",
  );

  assert.match(heroFile, /Annas Tri Widagdo/);
  assert.match(heroFile, /Software Engineer/);
  assert.match(heroFile, /Full-Stack Developer/);
  assert.match(heroFile, /ML Engineer/);
  assert.match(heroFile, /KLATEN, CENTRAL JAVA/);
  assert.match(heroFile, /SystemClock/);
  assert.match(heroFile, /ContinuousRoles/);
  assert.match(heroFile, /\/assets\/profile\/pas-foto\.webp/);
  assert.ok(existsSync(join(root, "public", "assets", "profile", "pas-foto.webp")));
});

test("Experience section renders exactly the 3 approved professional entries", async () => {
  const moduleUrl = new URL(
    "../src/content/experience/experience-data.ts",
    import.meta.url,
  );
  const { experiencesData } = await import(moduleUrl.href);

  assert.equal(experiencesData.length, 3);
  assert.equal(experiencesData[0].id, "cv-universal-kharisma-globalindo");
  assert.match(experiencesData[0].organization.en, /Universal Kharisma Globalindo/);
  assert.match(experiencesData[0].role.en, /Full-Stack Developer/);

  assert.equal(experiencesData[1].id, "intern-ft-undip");
  assert.match(experiencesData[1].organization.en, /Faculty of Engineering, Diponegoro University/);
  assert.match(experiencesData[1].role.en, /UI\/UX Designer Intern/);

  assert.equal(experiencesData[2].id, "intern-duta-basis-dataprima");
  assert.match(experiencesData[2].organization.en, /PT Duta Basis Dataprima/);
  assert.match(experiencesData[2].role.en, /Junior Game Developer Intern/);
});

test("Featured projects configuration references exactly the 4 required case studies", async () => {
  const moduleUrl = new URL(
    "../src/content/projects/featured-config.ts",
    import.meta.url,
  );
  const { homeFeaturedConfig } = await import(moduleUrl.href);

  assert.equal(homeFeaturedConfig.slot1Slug, "ukg-system");
  assert.equal(homeFeaturedConfig.slot2Slug, "ihealth-edu");
  assert.equal(homeFeaturedConfig.slot3Slug, "ml-for-heart-attack-risk-prediction");
  assert.equal(homeFeaturedConfig.slot4Slug, "panoramic-virtual-tour");
});

test("GitHub telemetry module provides dynamic 4-year query and server-only token handling", () => {
  const ghFile = readFileSync(
    join(root, "src", "lib", "github", "github-data.ts"),
    "utf8",
  );

  assert.match(ghFile, /currentYear - 1/);
  assert.match(ghFile, /currentYear - 2/);
  assert.match(ghFile, /currentYear - 3/);
  assert.match(ghFile, /https:\/\/api\.github\.com\/graphql/);
  assert.match(ghFile, /https:\/\/api\.github\.com\/search\/commits/);
  assert.match(ghFile, /process\.env\.GITHUB_TOKEN/);
  assert.doesNotMatch(ghFile, /NEXT_PUBLIC_GITHUB_TOKEN/);
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
