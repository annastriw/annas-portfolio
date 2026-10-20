import assert from 'node:assert/strict';
import { test } from 'node:test';
import { needsOpening, openingBootstrap } from '../src/lib/opening.ts';
import {
  revealProgress,
  titleProgress,
  heroExitProgress,
  mountRevealFallback,
} from '../src/lib/scroll-reveal.ts';
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

test('work and tall timeline fallbacks reverse scroll, batch frames and clean up on navigation', () => {
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
  const experienceValues = new Map();
  const titleValues = new Map();
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
  const timeline = {
    getBoundingClientRect: () => ({ top, height: 1600 }),
    style: {
      setProperty: (key, value) => experienceValues.set(key, value),
      removeProperty: (key) => experienceValues.delete(key),
    },
  };
  const title = {
    getBoundingClientRect: () => ({ top, height: 40 }),
    style: {
      setProperty: (key, value) => titleValues.set(key, value),
      removeProperty: (key) => titleValues.delete(key),
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
      document: {
        ...events,
        hidden: false,
        querySelectorAll: (selector) =>
          selector === '.timeline-item'
            ? [timeline]
            : selector === '.scroll-title'
              ? [title]
              : selector === '[data-motion="work"]'
                ? [scene]
                : [],
      },
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
    assert.equal(experienceValues.get('--experience-progress'), '0');
    assert.equal(titleValues.get('--title-progress'), '0');
    top = 500;
    listeners.get('scroll')();
    listeners.get('scroll')();
    assert.equal(frames.size, 1);
    flush();
    assert.equal(values.get('--work-progress'), '1');
    assert.equal(experienceValues.get('--experience-progress'), '0.5');
    top = 700;
    listeners.get('scroll')();
    flush();
    assert.equal(values.get('--work-progress'), '0.5');
    assert.equal(experienceValues.get('--experience-progress'), '0.25');
    assert.ok(
      Number(titleValues.get('--title-progress')) > 0 &&
        Number(titleValues.get('--title-progress')) < 1,
    );
    listeners.get('resize')();
    release();
    assert.equal(frames.size, 0);
    assert.equal(listeners.size, 0);
    assert.equal(values.size, 0);
    assert.equal(experienceValues.size, 0);
    assert.equal(titleValues.size, 0);
    assert.equal(scene.style.clipPath, undefined);
    Object.defineProperty(globalThis, 'CSS', {
      value: { supports: () => true },
      configurable: true,
    });
    mountRevealFallback()();
    assert.equal(listeners.size, 0);
    assert.equal(frames.size, 0);
    Object.defineProperty(globalThis, 'CSS', {
      value: { supports: (feature) => !feature.startsWith('timeline-scope:') },
      configurable: true,
    });
    const releasePartial = mountRevealFallback();
    flush();
    assert.equal(values.get('--work-progress'), '0.5');
    assert.equal(experienceValues.size, 0);
    releasePartial();
    Object.defineProperty(globalThis, 'matchMedia', {
      value: () => ({ matches: true }),
      configurable: true,
    });
    mountRevealFallback()();
    assert.equal(listeners.size, 0);
    assert.equal(frames.size, 0);
  } finally {
    for (const name of names) {
      const descriptor = original.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
});

test('short headings reveal across a reading window rather than one line of scroll', () => {
  assert.equal(titleProgress(900, 40, 1000), 0);
  assert.equal(titleProgress(720, 40, 1000), 0.5);
  assert.equal(titleProgress(540, 40, 1000), 1);
  assert.equal(titleProgress(720, 40, 1000), 0.5);
  assert.equal(titleProgress(100, 1400, 1000), 1);
});
test('hero exit reverses with scrolling and stays bounded on restored or short pages', () => {
  assert.equal(heroExitProgress(0, 800), 0);
  assert.equal(heroExitProgress(-300, 800), 0.5);
  assert.equal(heroExitProgress(-600, 800), 1);
  assert.equal(heroExitProgress(-300, 800), 0.5);
  assert.equal(heroExitProgress(100, 800), 0);
  assert.equal(heroExitProgress(-900, 0), 1);
});
