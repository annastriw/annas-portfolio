import assert from 'node:assert/strict';
import { test } from 'node:test';
import { navigationCurrent, parseArchiveVisit } from '../src/lib/navigation.ts';

test('navigation identifies exact pages and ancestor sections in both languages', () => {
  for (const locale of ['id', 'en']) {
    const root = `/${locale}`;
    assert.equal(navigationCurrent(`${root}/`, `${root}/`), 'page');
    assert.equal(navigationCurrent(`${root}/about/`, `${root}/`), undefined);
    assert.equal(navigationCurrent(`${root}/projects`, `${root}/projects/`), 'page');
    assert.equal(
      navigationCurrent(`${root}/projects/ukg-system/?a=b`, `${root}/projects/`),
      'location',
    );
    assert.equal(navigationCurrent(`${root}/projects-other/`, `${root}/projects/`), undefined);
    assert.equal(navigationCurrent(`${root}/missing/`, `${root}/`), undefined);
    assert.equal(navigationCurrent(`${root}/contact/`, `${root}/about/`), undefined);
  }
  assert.equal(navigationCurrent('/id/projects/ukg-system/', '/en/projects/'), undefined);
});

test('visit memory accepts known categories and finite card offsets only', () => {
  const visit = { filter: 'ml', slug: 'heart-disease', offset: -80 };
  assert.deepEqual(parseArchiveVisit(visit), visit);
  for (const value of [
    null,
    '',
    {},
    { ...visit, filter: 'secret' },
    { ...visit, slug: '../private' },
    { ...visit, slug: 3 },
    { ...visit, offset: Infinity },
    { ...visit, offset: '100' },
    { ...visit, offset: 100001 },
  ]) {
    assert.equal(parseArchiveVisit(value), null);
  }
  assert.deepEqual(parseArchiveVisit({ ...visit, extra: 'ignored' }), visit);
});
