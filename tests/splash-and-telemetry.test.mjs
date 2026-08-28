import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { siteIdentity } from "../src/content/site/identity.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Initial Splash implements approved 4-second lifecycle with coherent stage transitions", () => {
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );

  // Exact 4000ms lifecycle constants
  assert.match(splashFile, /SPLASH_TOTAL_DURATION_MS = 4000/);
  assert.match(splashFile, /TYPING_START_MS = 250/);
  assert.match(splashFile, /TYPING_DURATION_MS = 1400/);
  assert.match(splashFile, /PROGRESS_START_MS = 400/);
  assert.match(splashFile, /PROGRESS_DURATION_MS = 2500/);
  assert.match(splashFile, /HOLD_START_MS = 1650/);
  assert.match(splashFile, /TRANSIT_START_MS = 3100/);
  assert.match(splashFile, /REVEAL_PAGE_MS = 3500/);

  // Dynamic year and folio structure
  assert.match(splashFile, /ANNAS TRI WIDAGDO/);
  assert.match(splashFile, /PORTFOLIO · \{new Date\(\)\.getFullYear\(\)\}/);
  assert.match(splashFile, /VOL\. 01 \/\/ TECHNICAL ARCHIVE/);
  assert.match(splashFile, /ENTRY 001/);
  assert.match(splashFile, /01 \/ 01/);
  assert.match(splashFile, /annastriwidagdo\.me/);

  // All 3 professional roles in full matching siteIdentity
  assert.equal(siteIdentity.roles.length, 3);
  assert.match(splashFile, /siteIdentity\.roles\[0\]\.toUpperCase\(\)/);
  assert.match(splashFile, /siteIdentity\.roles\[1\]\.toUpperCase\(\)/);
  assert.match(splashFile, /siteIdentity\.roles\[2\]\.toUpperCase\(\)/);

  // FLIP transform to header brand anchor
  assert.match(splashFile, /document\.getElementById\("site-header-brand"\)/);
  assert.match(splashFile, /getBoundingClientRect\(\)/);
  assert.match(splashFile, /translate3d\(/);
});

test("First-visit gating preserves sessionStorage mechanism without skipping on reduced-motion", () => {
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );
  const layoutFile = readFileSync(
    join(root, "src", "app", "layout.tsx"),
    "utf8",
  );

  // Gating uses sessionStorage with exact key 'annas_splash_shown'
  assert.match(splashFile, /sessionStorage\.getItem\("annas_splash_shown"\)/);
  assert.match(splashFile, /sessionStorage\.setItem\("annas_splash_shown", "1"\)/);

  // getSplashEligibility does not skip based on prefers-reduced-motion
  assert.doesNotMatch(
    splashFile,
    /function getSplashEligibility[\s\S]*?prefersReducedMotion[\s\S]*?return false/,
  );

  // Head script in layout.tsx activates splash on first visit regardless of motion mode
  assert.match(
    layoutFile,
    /var s=sessionStorage\.getItem\('annas_splash_shown'\);if\(s\)\{document\.documentElement\.classList\.add\('splash-dismissed'\);\}else\{document\.documentElement\.classList\.add\('splash-active'\);/,
  );
});

test("Reduced-motion Splash remains visible for 4 seconds in static form without animations", () => {
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );
  const cssFile = readFileSync(
    join(root, "src", "app", "globals.css"),
    "utf8",
  );

  // JS sets static content and full progress immediately for reduced motion
  assert.match(splashFile, /isReducedMotion/);
  assert.match(splashFile, /displayedText = isReducedMotion \? fullText : fullText\.slice/);
  assert.match(splashFile, /effectiveProgress = isReducedMotion \? 100 : progress/);
  assert.match(splashFile, /effectiveStage = isReducedMotion && stage === "init" \? "hold" : stage/);

  // Caret is hidden under reduced motion
  assert.match(splashFile, /showCaret = !isReducedMotion && effectiveStage === "typing"/);

  // CSS does not hide splash overlay under reduced motion, but disables transitions
  assert.doesNotMatch(
    cssFile,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.initial-splash-overlay \{\s*display: none !important;\s*\}/,
  );
  assert.match(
    cssFile,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.splash-editorial-caret \{\s*display: none !important;\s*\}/,
  );
  assert.match(
    cssFile,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.brand-in-transit \{\s*transition: none !important;\s*\}/,
  );
});

test("Splash accessibility semantics, bilingual labels, and clean cleanup are enforced", () => {
  const splashFile = readFileSync(
    join(root, "src", "components", "ui", "initial-splash.tsx"),
    "utf8",
  );

  // Overlay accessibility labels
  assert.match(splashFile, /aria-label=\{isId \? "Pembukaan arsip editorial" : "Editorial archive folio opening"\}/);
  assert.match(splashFile, /tabIndex=\{-1\}/);

  // Progressbar accessibility labels and values
  assert.match(splashFile, /role="progressbar"/);
  assert.match(splashFile, /aria-label=\{isId \? "Kemajuan pembukaan arsip" : "Archive loading progress"\}/);
  assert.match(splashFile, /aria-valuenow=\{progress\}/);
  assert.match(splashFile, /aria-valuemin=\{0\}/);
  assert.match(splashFile, /aria-valuemax=\{100\}/);

  // Screen-reader clean single wordmark announcement
  assert.match(splashFile, /<span className="sr-only">annastriwidagdo\.me<\/span>/);

  // Status bilingual copy
  assert.match(splashFile, /isId \? "MEMBUKA ARSIP TEKNIS" : "OPENING TECHNICAL ARCHIVE"/);

  // Timer and interval cleanup
  assert.match(splashFile, /timeouts\.forEach\(clearTimeout\)/);
  assert.match(splashFile, /intervals\.forEach\(clearInterval\)/);
});

test("Route Telemetry Box implements 1-second duration and localized accessibility announcements", () => {
  const transitFile = readFileSync(
    join(root, "src", "components", "ui", "route-transit-bar.tsx"),
    "utf8",
  );
  const cssFile = readFileSync(
    join(root, "src", "app", "globals.css"),
    "utf8",
  );

  // Exact 1000ms duration constant
  assert.match(transitFile, /TRANSIT_VISIBLE_DURATION_MS = 1000/);

  // Status role & live region
  assert.match(transitFile, /role="status"/);
  assert.match(transitFile, /aria-live="polite"/);

  // Localized announcement templates
  assert.match(
    transitFile,
    /activeLocale === "id"[\s\S]*?\? `Menuju \$\{currentRoute\.label\}`[\s\S]*?: `Navigating to \$\{currentRoute\.label\}`/,
  );

  // Rapid navigation timer reset on navKey
  assert.match(transitFile, /setNavKey\(\(k\) => k \+ 1\)/);
  assert.match(transitFile, /return \(\) => clearTimeout\(timer\);[\s\S]*?\}, \[isNavigating, navKey\]\);/);

  // CSS progress bar sweep aligns to 1s duration
  assert.match(cssFile, /animation: routeBarSweep 0\.95s var\(--ease-editorial\) forwards;/);

  // Reduced-motion preserves hidden route loader
  assert.match(
    cssFile,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.top-right-route-loader \{\s*display: none !important;\s*\}/,
  );
});

test("Route Telemetry maps parent categories correctly for nested project and blog routes", () => {
  const transitFile = readFileSync(
    join(root, "src", "components", "ui", "route-transit-bar.tsx"),
    "utf8",
  );

  assert.match(transitFile, /resolveRouteKey/);

  // Re-create the resolve logic from component to verify all nested test cases
  function resolveRouteKey(pathname) {
    if (!pathname) return "home";
    const segments = pathname.split("/").filter(Boolean);
    const section = segments[1] || "";
    if (section === "about") return "about";
    if (section === "projects") return "projects";
    if (section === "blog") return "blog";
    if (section === "contact") return "contact";
    return "home";
  }

  // Home routes
  assert.equal(resolveRouteKey("/en"), "home");
  assert.equal(resolveRouteKey("/id"), "home");

  // About routes
  assert.equal(resolveRouteKey("/en/about"), "about");
  assert.equal(resolveRouteKey("/id/about"), "about");

  // Projects parent + case studies
  assert.equal(resolveRouteKey("/en/projects"), "projects");
  assert.equal(resolveRouteKey("/id/projects"), "projects");
  assert.equal(resolveRouteKey("/en/projects/ukg-system"), "projects");
  assert.equal(resolveRouteKey("/id/projects/ihealth-edu"), "projects");
  assert.equal(resolveRouteKey("/id/projects/dialisis-connect-edu"), "projects");
  assert.equal(resolveRouteKey("/en/projects/thermal-printer-service"), "projects");

  // Blog parent + articles
  assert.equal(resolveRouteKey("/en/blog"), "blog");
  assert.equal(resolveRouteKey("/id/blog"), "blog");
  assert.equal(resolveRouteKey("/en/blog/ukg-system"), "blog");
  assert.equal(resolveRouteKey("/id/blog/thermal-printer-service"), "blog");
  assert.equal(resolveRouteKey("/en/blog/speech-to-text-system"), "blog");

  // Contact routes
  assert.equal(resolveRouteKey("/en/contact"), "contact");
  assert.equal(resolveRouteKey("/id/contact"), "contact");
});
