import assert from 'node:assert/strict';
import { test } from 'node:test';
import { needsOpening, openingBootstrap } from '../src/lib/opening.ts';
import { revealProgress } from '../src/lib/scroll-reveal.ts';
test('opening replays after404 while ordinary repeat visits and reduced motion bypass it', () => {
  assert.equal(needsOpening(true, true, true, false), true);
  assert.equal(needsOpening(true, false, false, false), true);
  assert.equal(needsOpening(true, true, false, false), false);
  assert.equal(needsOpening(false, false, true, false), false);
  assert.equal(needsOpening(true, true, true, true), false);
});
test('prepaint bootstrap arms only a home visit that needs a greeting', () => {
  const run = new Function(
    'document',
    'location',
    'matchMedia',
    'sessionStorage',
    'setTimeout',
    openingBootstrap,
  );
  const root = { dataset: {} };
  run(
    { documentElement: root },
    { pathname: '/id/' },
    () => ({ matches: false }),
    { getItem: (key) => (key === 'portfolio-replay-opening' ? 'true' : 'true') },
    () => {},
  );
  assert.equal(root.dataset.opening, 'pending');
  const other = { dataset: {} };
  run(
    { documentElement: other },
    { pathname: '/en/about/' },
    () => ({ matches: false }),
    { getItem: () => null },
    () => {},
  );
  assert.equal(other.dataset.opening, undefined);
});
test('image reveal advances with entry, reverses with scroll and completes in the viewport', () => {
  assert.equal(revealProgress(900, 400, 1000), 0);
  assert.equal(revealProgress(700, 400, 1000), 0.5);
  assert.equal(revealProgress(500, 400, 1000), 1);
  assert.equal(revealProgress(700, 400, 1000), 0.5);
  assert.equal(revealProgress(-100, 1600, 1000), 1);
});
