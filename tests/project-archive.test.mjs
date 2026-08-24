import assert from "node:assert/strict";
import test from "node:test";

import {
  filterProjectArchive,
  projectArchive,
  projectArchiveCategories,
} from "../src/content/projects/project-archive.ts";

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

const expectedTitles = [
  "UKG System",
  "iHealth Edu",
  "Dialisis Connect Edu",
  "Nusa Dakwah",
  "SIMASTOK SHR Jaya Motor",
  "Machine Learning Model for Heart Attack Risk Prediction",
  "Speech-to-Text System",
  "Thermal Printer Service",
  "Footy Standings",
  "Panoramic Virtual Tour",
];

test("publishes exactly the ten approved projects in their required order", () => {
  assert.equal(projectArchive.length, 10);
  assert.deepEqual(
    projectArchive.map((project) => project.slug),
    expectedSlugs,
  );
  assert.deepEqual(
    projectArchive.map((project) => project.index),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  );
  assert.deepEqual(
    projectArchive.map((project) => project.title.en),
    expectedTitles,
  );
  assert.deepEqual(
    projectArchive.map((project) => project.title.id),
    expectedTitles,
  );
});

test("keeps the approved category counts and filter order", () => {
  assert.deepEqual(
    projectArchiveCategories.map((category) => category.key),
    ["all", "web-app", "ml", "mobile", "other"],
  );
  assert.equal(filterProjectArchive(projectArchive, "all").length, 10);
  assert.equal(filterProjectArchive(projectArchive, "web-app").length, 5);
  assert.equal(filterProjectArchive(projectArchive, "ml").length, 2);
  assert.equal(filterProjectArchive(projectArchive, "mobile").length, 2);
  assert.equal(filterProjectArchive(projectArchive, "other").length, 1);
});

test("preserves original project indexes when a category is filtered", () => {
  assert.deepEqual(
    filterProjectArchive(projectArchive, "mobile").map(
      (project) => project.index,
    ),
    ["08", "09"],
  );
});

test("provides equivalent bilingual preview fields for every project", () => {
  for (const project of projectArchive) {
    for (const field of [
      project.title,
      project.role,
      project.summary,
      project.status,
      project.coverAlt,
    ]) {
      assert.ok(field.en.trim());
      assert.ok(field.id.trim());
    }
    assert.ok(project.primaryTechnologies.length >= 3);
    assert.ok(project.coverImage.startsWith("/assets/projects/"));
  }
});

test("exposes only the verified UKG production link", () => {
  const linkedProjects = projectArchive.filter((project) => project.liveUrl);
  assert.deepEqual(
    linkedProjects.map(({ slug, liveUrl }) => ({ slug, liveUrl })),
    [{ slug: "ukg-system", liveUrl: "https://ukgsystem.com" }],
  );
});
