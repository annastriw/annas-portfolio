import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Hero section maintains factual 1-2 sentence bilingual branding, 3 full role controls, and key metadata", () => {
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
  assert.match(heroFile, /Jakarta, Indonesia/i);
  assert.match(heroFile, /SystemClock/);
  assert.match(heroFile, /ContinuousRoles/);
  assert.match(heroFile, /\/assets\/profile\/pas-foto\.webp/);
  assert.match(heroFile, /PORTRAIT \/\/ FIG\.01/);
  assert.match(heroFile, /Explore Project Archive/);
  assert.match(heroFile, /Start a Conversation/);
  assert.ok(existsSync(join(root, "public", "assets", "profile", "pas-foto.webp")));
});

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

test("Featured projects renders 4-row full-width editorial index with single archive CTA and no project count", async () => {
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

  const sectionFile = readFileSync(
    join(root, "src", "components", "home", "selected-projects.tsx"),
    "utf8",
  );
  const itemFile = readFileSync(
    join(root, "src", "components", "home", "projects", "featured-project-item.tsx"),
    "utf8",
  );

  assert.match(sectionFile, /\[04 \/\/ SELECTED PROJECTS\]/);
  assert.match(sectionFile, /home-projects-index/);
  assert.match(sectionFile, /Explore Project Archive/);
  assert.doesNotMatch(sectionFile, /10 projects|all 10/i);

  assert.match(itemFile, /project-index-row/);
  assert.match(itemFile, /project-row-thumbnail/);
  assert.match(itemFile, /STACK \/\//);
  assert.match(itemFile, /View Case Study/);
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

test("Technical Capabilities directory renders 6 stacked categories with accessible modal dialog", async () => {
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
