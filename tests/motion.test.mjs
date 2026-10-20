import assert from 'node:assert/strict';
import { test } from 'node:test';
import { needsOpening, openingBootstrap } from '../src/lib/opening.ts';
import { revealProgress, mountRevealFallback } from '../src/lib/scroll-reveal.ts';
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

test('work fallback tracks reverse scroll, batches frames and cleans up on navigation', () => {
  const names = [
    'CSS',
    'matchMedia',
    'document',
    'window',
    'innerHeight',
    'requestAnimationFrame',
    'cancelAnimationFrame',
  ];
  const original = new Map(
    names.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]),
  );
  let top = 900;
  const values = new Map();
  const listeners = new Map();
  const frames = new Map();
  let serial = 0;
  const events = {
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const scene = {
    querySelector: () => ({ getBoundingClientRect: () => ({ top, height: 400 }) }),
    style: {
      setProperty: (key, value) => values.set(key, value),
      removeProperty: (key) => values.delete(key),
    },
  };
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback());
  };
  try {
    const globals = {
      CSS: { supports: () => false },
      matchMedia: () => ({ matches: false }),
      document: { ...events, hidden: false, querySelectorAll: () => [scene] },
      window: events,
      innerHeight: 1000,
      requestAnimationFrame: (callback) => {
        frames.set(++serial, callback);
        return serial;
      },
      cancelAnimationFrame: (id) => frames.delete(id),
    };
    for (const [name, value] of Object.entries(globals))
      Object.defineProperty(globalThis, name, { value, configurable: true });
    const release = mountRevealFallback();
    flush();
    assert.equal(values.get('--work-progress'), '0');
    top = 500;
    listeners.get('scroll')();
    listeners.get('scroll')();
    assert.equal(frames.size, 1);
    flush();
    assert.equal(values.get('--work-progress'), '1');
    top = 700;
    listeners.get('scroll')();
    flush();
    assert.equal(values.get('--work-progress'), '0.5');
    listeners.get('resize')();
    release();
    assert.equal(frames.size, 0);
    assert.equal(listeners.size, 0);
    assert.equal(values.size, 0);
    assert.equal(scene.style.clipPath, undefined);
  } finally {
    for (const name of names) {
      const descriptor = original.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
});
