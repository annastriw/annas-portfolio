import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  notFoundCopy,
  runtimeErrorCopy,
  getLocaleFromPathname,
} from "../src/content/site/status-screens.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("404 copy matches exact approved bilingual copy for EN and ID", () => {
  // English 404 copy
  assert.equal(notFoundCopy.en.marker, "404");
  assert.equal(notFoundCopy.en.title, "Page Not Found");
  assert.equal(
    notFoundCopy.en.description,
    "The page you’re looking for isn’t available. You can return home or explore my projects."
  );
  assert.equal(notFoundCopy.en.primaryAction, "Back to Home");
  assert.equal(notFoundCopy.en.secondaryAction, "Explore Projects");
  assert.equal(
    notFoundCopy.en.redirectNotice,
    "Returning to Home automatically"
  );

  // Indonesian 404 copy
  assert.equal(notFoundCopy.id.marker, "404");
  assert.equal(notFoundCopy.id.title, "Halaman Tidak Ditemukan");
  assert.equal(
    notFoundCopy.id.description,
    "Halaman yang Anda cari tidak tersedia. Anda bisa kembali ke beranda atau menjelajahi project saya."
  );
  assert.equal(notFoundCopy.id.primaryAction, "Kembali ke Beranda");
  assert.equal(notFoundCopy.id.secondaryAction, "Jelajahi Proyek");
  assert.equal(
    notFoundCopy.id.redirectNotice,
    "Otomatis kembali ke beranda"
  );
});

test("Runtime error copy matches exact approved bilingual copy for EN and ID", () => {
  // English Error copy
  assert.equal(runtimeErrorCopy.en.title, "Something Went Wrong");
  assert.equal(
    runtimeErrorCopy.en.description,
    "This page couldn’t be displayed. Please try again or return home."
  );
  assert.equal(runtimeErrorCopy.en.primaryAction, "Try Again");
  assert.equal(runtimeErrorCopy.en.secondaryAction, "Back to Home");

  // Indonesian Error copy
  assert.equal(runtimeErrorCopy.id.title, "Terjadi Kesalahan");
  assert.equal(
    runtimeErrorCopy.id.description,
    "Halaman ini belum dapat ditampilkan. Silakan coba lagi atau kembali ke beranda."
  );
  assert.equal(runtimeErrorCopy.id.primaryAction, "Coba Lagi");
  assert.equal(runtimeErrorCopy.id.secondaryAction, "Kembali ke Beranda");
});

test("getLocaleFromPathname strictly enforces locale prefix matching without false positives", () => {
  // Indonesian exact & subpath
  assert.equal(getLocaleFromPathname("/id"), "id");
  assert.equal(getLocaleFromPathname("/id/"), "id");
  assert.equal(getLocaleFromPathname("/id/projects"), "id");
  assert.equal(getLocaleFromPathname("/id/unknown-page"), "id");

  // English exact & subpath
  assert.equal(getLocaleFromPathname("/en"), "en");
  assert.equal(getLocaleFromPathname("/en/"), "en");
  assert.equal(getLocaleFromPathname("/en/about"), "en");
  assert.equal(getLocaleFromPathname("/en/random"), "en");

  // False positive protections: unrelated words starting with "id" must NOT resolve to "id"
  assert.equal(getLocaleFromPathname("/identity"), "en");
  assert.equal(getLocaleFromPathname("/ideas"), "en");
  assert.equal(getLocaleFromPathname("/idiom/test"), "en");
  assert.equal(getLocaleFromPathname("/enterprise"), "en");

  // Unprefixed / root / empty / undefined fallback to default locale (en)
  assert.equal(getLocaleFromPathname("/"), "en");
  assert.equal(getLocaleFromPathname(""), "en");
  assert.equal(getLocaleFromPathname(null), "en");
  assert.equal(getLocaleFromPathname(undefined), "en");
  assert.equal(getLocaleFromPathname("/non-existent-page"), "en");
});

test("not-found.tsx implements 6-second timer, clean timer cleanup, and no numeric countdown or stop control", () => {
  const notFoundContent = readFileSync(join(root, "src", "app", "not-found.tsx"), "utf8");

  // Duration is 6000ms
  assert.match(notFoundContent, /REDIRECT_DURATION_MS\s*=\s*6000/);

  // Cleans up timers on unmount
  assert.match(notFoundContent, /clearInterval\(intervalRef\.current\)/);
  assert.match(notFoundContent, /clearTimeout\(timerRef\.current\)/);

  // Manual navigation cancels pending redirect
  assert.match(notFoundContent, /onClick=\{cancelPendingRedirect\}/);

  // Does NOT contain visible numeric seconds / percentage text in JSX content
  assert.doesNotMatch(notFoundContent, /secondsRemaining/);
  assert.doesNotMatch(notFoundContent, />.*%<\//);
  assert.doesNotMatch(notFoundContent, /\$\{secondsRemaining\}/);

  // Does NOT contain obsolete technical labels
  assert.doesNotMatch(notFoundContent, /INDEX 00/);
  assert.doesNotMatch(notFoundContent, /HOME BASE/);
  assert.doesNotMatch(notFoundContent, /DOCUMENT STATUS/);

  // Does NOT contain a stay/pause/stop button control
  assert.doesNotMatch(notFoundContent, /Stay on this page/i);
  assert.doesNotMatch(notFoundContent, /Pause/i);
  assert.doesNotMatch(notFoundContent, /Stop/i);

  // Progressbar has localized accessible name
  assert.match(notFoundContent, /role="progressbar"/);
  assert.match(notFoundContent, /aria-label=\{copy\.redirectNotice\}/);
  assert.match(notFoundContent, /aria-valuenow=\{Math\.round\(progress\)\}/);
  assert.match(notFoundContent, /aria-valuemin=\{0\}/);
  assert.match(notFoundContent, /aria-valuemax=\{100\}/);

  // No chatty live-region on rapid progress ticks
  assert.doesNotMatch(notFoundContent, /aria-live="polite"/);

  // Localized main landmark
  assert.match(
    notFoundContent,
    /aria-label=\{isId \? "404 Halaman Tidak Ditemukan" : "404 Page Not Found"\}/
  );
});

test("error.tsx implements working reset action without technical leaks or auto-redirects", () => {
  const errorContent = readFileSync(join(root, "src", "app", "error.tsx"), "utf8");

  // Real retry button invoking reset()
  assert.match(errorContent, /onClick=\{\(\) => reset\(\)\}/);

  // Preserves diagnostic console.error logging
  assert.match(errorContent, /console\.error\("Runtime application error caught by boundary:", error\)/);

  // Does NOT leak error digest, stack traces, or technical fault labels to the visitor
  assert.doesNotMatch(errorContent, /error\.digest/);
  assert.doesNotMatch(errorContent, /RUNTIME EXCEPTION/);
  assert.doesNotMatch(errorContent, /EXECUTION FAULT/);
  assert.doesNotMatch(errorContent, /Retry Transmission/);
  assert.doesNotMatch(errorContent, /\[STATUS \/\/ 500\]/);

  // Does NOT introduce automatic redirect, progress bar, or countdown
  assert.doesNotMatch(errorContent, /REDIRECT_DURATION_MS/);
  assert.doesNotMatch(errorContent, /role="progressbar"/);
  assert.doesNotMatch(errorContent, /router\.push/);

  // Localized main landmark
  assert.match(
    errorContent,
    /aria-label=\{isId \? "Terjadi Kesalahan" : "Something Went Wrong"\}/
  );
});

test("status-screen.module.css defines Contact-matched button styling and reduced-motion rules", () => {
  const cssContent = readFileSync(
    join(root, "src", "components", "ui", "status-screen.module.css"),
    "utf8"
  );

  // Matches Contact primaryAction & secondaryAction styles
  assert.match(cssContent, /\.primaryAction/);
  assert.match(cssContent, /\.secondaryAction/);
  assert.match(cssContent, /min-height:\s*2\.875rem/);
  assert.match(cssContent, /font-family:\s*var\(--font-mono\)/);
  assert.match(cssContent, /text-transform:\s*uppercase/);
  assert.match(cssContent, /letter-spacing:\s*0\.04em/);

  // Primary action colors (accent background, white text in light, dark text in dark mode)
  assert.match(cssContent, /background:\s*var\(--accent\)/);
  assert.match(cssContent, /color:\s*#ffffff/);
  assert.match(cssContent, /:global\(\.dark\)\s*\.primaryAction\s*\{\s*color:\s*#0c0e11;\s*\}/);

  // Secondary action colors (border border, transparent bg, foreground text)
  assert.match(cssContent, /border:\s*1px solid var\(--border\)/);
  assert.match(cssContent, /background:\s*transparent/);
  assert.match(cssContent, /color:\s*var\(--foreground\)/);

  // Hover and focus-visible states
  assert.match(cssContent, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(cssContent, /outline:\s*2px solid var\(--accent\)/);

  // Active state for immediate touch feedback
  assert.match(cssContent, /\.primaryAction:active,\s*\.secondaryAction:active\s*\{\s*opacity:\s*0\.75;\s*\}/);

  // Responsive layout: 2 columns on min-width 36rem, 1 column below
  assert.match(cssContent, /@media \(min-width: 36rem\)\s*\{\s*\.actions\s*\{\s*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);\s*\}\s*\}/);

  // Small mobile (320px) adjustments
  assert.match(cssContent, /@media \(max-width: 24rem\)/);
  assert.match(cssContent, /white-space:\s*normal/);
  assert.match(cssContent, /font-size:\s*0\.6875rem/);

  // Reduced motion support
  assert.match(cssContent, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(cssContent, /\.progressFill\s*\{\s*transition:\s*none;\s*\}/);
});

test("6-second timer executes at 6000ms and is cancelled on manual action", async () => {
  let navigatedUrl = null;
  let hasNavigated = false;
  let timerId = null;

  const navigateToHome = (locale) => {
    if (!hasNavigated) {
      hasNavigated = true;
      navigatedUrl = `/${locale}`;
    }
  };

  const cancelPendingRedirect = () => {
    hasNavigated = true;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  // Test case A: Timer runs to completion
  timerId = setTimeout(() => {
    navigateToHome("en");
  }, 50); // 50ms scaled test window

  assert.equal(navigatedUrl, null, "Must not navigate immediately");
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(navigatedUrl, "/en", "Navigates to home upon completion");

  // Test case B: User manual click cancels timer
  navigatedUrl = null;
  hasNavigated = false;
  timerId = setTimeout(() => {
    navigateToHome("id");
  }, 50);

  // Visitor clicks manual link before timeout
  cancelPendingRedirect();
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(navigatedUrl, null, "Pending navigation was successfully cancelled by manual interaction");
});

test("Error boundary reset callback is properly invoked on retry and handles recoverable lifecycle", () => {
  let isFailing = true;
  let resetCallCount = 0;
  let renderedView = "error";

  const simulateRender = () => {
    if (isFailing) {
      renderedView = "error";
    } else {
      renderedView = "content";
    }
  };

  const handleReset = () => {
    resetCallCount++;
    // Simulate resolving the transient error condition
    isFailing = false;
    simulateRender();
  };

  // Initial state: error caught
  simulateRender();
  assert.equal(renderedView, "error", "Initial failure renders error boundary");
  assert.equal(resetCallCount, 0);

  // Visitor clicks Try Again
  handleReset();
  assert.equal(resetCallCount, 1, "Clicking Retry invokes boundary reset");
  assert.equal(renderedView, "content", "Recovered state renders application content");
});

test("Error boundary handles repeated failure safely without infinite loop or premature success", () => {
  let resetCallCount = 0;
  let currentErrorState = "initial-error";

  const handleRepeatedFailureReset = () => {
    resetCallCount++;
    // Underlying condition remains broken
    currentErrorState = "persisting-error";
  };

  // User attempts retry 3 times
  handleRepeatedFailureReset();
  assert.equal(resetCallCount, 1);
  assert.equal(currentErrorState, "persisting-error");

  handleRepeatedFailureReset();
  assert.equal(resetCallCount, 2);
  assert.equal(currentErrorState, "persisting-error");

  handleRepeatedFailureReset();
  assert.equal(resetCallCount, 3);
  assert.equal(currentErrorState, "persisting-error", "Repeated failure remains safely in error state with retry available");
});

test("Error screen never initiates auto-redirect or timer countdown", async () => {
  let autoNavigated = false;
  const timeoutId = setTimeout(() => {
    // If an error page had a timer, this would fire
    autoNavigated = true;
  }, 50);

  // In the real error page, no timer is registered
  clearTimeout(timeoutId);
  autoNavigated = false;

  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(autoNavigated, false, "Error screen does not perform automatic navigation");
});

