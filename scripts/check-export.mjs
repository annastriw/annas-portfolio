import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
import { projects } from '../src/content/projects.ts';

const root = resolve('out');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(join(directory, e.name)) : join(directory, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root),
  html = files.filter((f) => f.endsWith('.html'));
for (const file of files.filter((f) => f.endsWith('.txt'))) {
  const parts = relative(root, file).split(sep),
    index = parts.findIndex((p) => p.startsWith('__next.'));
  if (index !== -1 && index < parts.length - 1)
    await access(join(root, ...parts.slice(0, index), parts.slice(index).join('.')));
}
const failures = [];
const checked = new Set();
for (const file of html) {
  const contents = await readFile(file, 'utf8');
  assert.ok(!contents.includes('\uFFFD'), `Invalid replacement character in ${file}`);
  for (const [, url] of contents.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const path = decodeURIComponent(url.split(/[?#]/)[0].replaceAll('&amp;', '&'));
    if (checked.has(path)) continue;
    checked.add(path);
    const target = resolve(root, `.${path.endsWith('/') ? `${path}index.html` : path}`);
    assert.ok(target.startsWith(root), 'Export URL escaped output directory');
    try {
      await access(target);
    } catch {
      failures.push(`${file}: missing ${path}`);
    }
  }
}
for (const locale of ['en', 'id'])
  for (const route of [
    '',
    'about/',
    'contact/',
    'projects/',
    ...projects.map((p) => `projects/${p.slug}/`),
  ]) {
    const page = await readFile(join(root, locale, route, 'index.html'), 'utf8');
    assert.ok(page.includes(`<html lang="${locale}"`), `Incorrect language: ${locale}/${route}`);
    assert.ok(page.includes('rel="canonical"'), `Missing canonical: ${locale}/${route}`);
    assert.ok(
      page.includes('hrefLang="en"') && page.includes('hrefLang="id"'),
      `Missing language alternatives: ${locale}/${route}`,
    );
    assert.equal(
      (page.match(/<h1\b/g) ?? []).length,
      1,
      `Expected one main heading: ${locale}/${route}`,
    );
  }
const missingPage = await readFile(join(root, '404.html'), 'utf8');
assert.ok(missingPage.includes('A little off the path.'), 'Missing branded 404 page');
assert.ok(missingPage.includes('Back to Home'), '404 must offer a way home');
assert.ok(!missingPage.includes('http-equiv="refresh"'), '404 must not silently redirect');
const forbidden = files.filter(
  (f) =>
    /\.(?:md|mdx|env|webm)$/i.test(f) ||
    f.includes('.project-local') ||
    (/\.jpe?g$/i.test(f) &&
      ![
        'assets/photos/hero.jpg',
        'assets/photos/hero-mobile.jpg',
        'assets/photos/about.jpg',
        'assets/photos/hero-1280.jpg',
        'assets/photos/hero-1920.jpg',
        'assets/photos/hero-mobile-640.jpg',
        'assets/photos/hero-mobile-960.jpg',
        'assets/photos/about-640.jpg',
        'assets/photos/about-960.jpg',
      ].includes(relative(root, f).split(sep).join('/'))),
);
assert.equal(
  forbidden.length,
  0,
  `Unexpected private/source file in export: ${forbidden.join(', ')}`,
);
assert.deepEqual(failures, []);
console.log(
  `Verified ${html.length} HTML files, 28 localized routes, ${checked.size} local references, and export file boundaries.`,
);
