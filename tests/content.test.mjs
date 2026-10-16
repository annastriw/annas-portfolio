import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { projects } from '../src/content/projects.ts';
import { localizePath, isLocale } from '../src/lib/i18n.ts';

test('public scope contains exactly ten unique projects and excludes attendance', () => {
  assert.equal(projects.length, 10);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 10);
  assert.ok(projects.every((p) => !/attendance-system/.test(p.slug)));
});

test('every project has bilingual copy and existing cover/gallery assets', () => {
  for (const p of projects) {
    for (const locale of ['en', 'id']) {
      for (const field of ['tagline', 'intro', 'contribution', 'scope'])
        assert.ok(p[field][locale].trim(), `${p.slug}: ${field}.${locale}`);
    }
    for (const asset of [p.cover, ...p.gallery])
      assert.ok(existsSync(`public${asset}`), `Missing ${asset}`);
    for (const link of p.links) assert.match(link.url, /^https:\/\//);
  }
});

test('locale switch keeps detail route, removes query/fragment and rejects invalid locales', () => {
  assert.equal(localizePath('/en/projects/ukg-system/', 'id'), '/id/projects/ukg-system/');
  assert.equal(localizePath('/id/contact/?draft=1#email', 'en'), '/en/contact/');
  assert.equal(localizePath('/', 'id'), '/id/');
  assert.equal(isLocale('fr'), false);
  assert.equal(isLocale('id'), true);
});

test('ML limitations and private repository boundaries remain present', () => {
  assert.match(
    projects.find((p) => p.slug === 'ml-for-heart-attack-risk-prediction').note.en,
    /not a diagnostic tool/,
  );
  assert.match(
    projects.find((p) => p.slug === 'speech-to-text-system').note.en,
    /without fine-tuning/,
  );
  for (const slug of ['ukg-system', 'simastok'])
    assert.equal(projects.find((p) => p.slug === slug).links.length, 1);
});

test('every gallery view has a small thumbnail and bilingual accessible description', () => {
  const captions = JSON.parse(readFileSync('src/content/gallery.json', 'utf8'));
  for (const project of projects)
    for (const image of project.gallery) {
      assert.ok(existsSync(`public${image.replace('/documentation/', '/thumbnails/')}`), image);
      for (const locale of ['en', 'id']) {
        assert.ok(captions[image]?.alt[locale]?.trim(), `Missing alt: ${image}.${locale}`);
        assert.ok(captions[image]?.caption[locale]?.trim(), `Missing caption: ${image}.${locale}`);
      }
    }
});

test('GitHub public snapshot does not reintroduce the excluded project', () => {
  const data = JSON.parse(readFileSync('src/content/github.json', 'utf8'));
  assert.ok(data.events.every((event) => !event.repo.includes('employee-attendance-system')));
  assert.ok(
    data.days.every(
      (day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && day.level >= 0 && day.level <= 4,
    ),
  );
});
