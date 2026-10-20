import assert from 'node:assert/strict';
import { test } from 'node:test';
import { needsOpening, openingBootstrap, OPENING_DURATION } from '../src/lib/opening.ts';
import { motionMilliseconds } from '../src/lib/motion-timing.ts';
import {
  revealProgress,
  titleProgress,
  readingProgress,
  heroExitProgress,
  mountRevealFallback,
} from '../src/lib/scroll-reveal.ts';
test('CSS timing tokens preserve duration in milliseconds and serialized seconds', () => {
  assert.equal(motionMilliseconds('320ms', 700), 320);
  assert.equal(motionMilliseconds(' .32s ', 700), 320);
  assert.equal(motionMilliseconds('2s', 700), 2000);
  assert.equal(motionMilliseconds('0ms', 700), 0);
  assert.equal(motionMilliseconds('', 700), 700);
  assert.equal(motionMilliseconds('fast', 700), 700);
});
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
test('media follows accepted viewport anchors on desktop and mobile regardless of media height', () => {
  assert.equal(revealProgress(940, 400, 1000), 0);
  assert.equal(revealProgress(735, 400, 1000), 0.5);
  assert.equal(revealProgress(530, 400, 1000), 1);
  assert.equal(revealProgress(735, 1600, 1000), 0.5);
  assert.equal(revealProgress(750, 400, 1000, true), 0.5);
  assert.equal(revealProgress(560, 400, 1000, true), 1);
  assert.equal(revealProgress(-100, 1600, 1000), 1);
});
test('shared reading windows complete at the same position for short and tall sections', () => {
  assert.equal(readingProgress(900, 1000), 0);
  assert.equal(readingProgress(630, 1000), 0.5);
  assert.equal(readingProgress(360, 1000), 1);
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
  let top = 940;
  const order = [];
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
    querySelector: () => ({
      getBoundingClientRect: () => {
        order.push('read');
        return { top, height: 400 };
      },
    }),
    style: {
      setProperty: (key, value) => {
        order.push('write');
        values.set(key, value);
      },
      removeProperty: (key) => values.delete(key),
    },
  };
  const timeline = {
    getBoundingClientRect: () => {
      order.push('read');
      return { top, height: 1600 };
    },
    style: {
      setProperty: (key, value) => experienceValues.set(key, value),
      removeProperty: (key) => experienceValues.delete(key),
    },
  };
  const title = {
    getBoundingClientRect: () => {
      order.push('read');
      return { top, height: 40 };
    },
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
    assert.ok(order.lastIndexOf('read') < order.indexOf('write'));
    top = 530;
    listeners.get('scroll')();
    listeners.get('scroll')();
    assert.equal(frames.size, 1);
    flush();
    assert.equal(values.get('--work-progress'), '1');
    assert.equal(Number(experienceValues.get('--experience-progress')), 370 / 540);
    top = 700;
    listeners.get('scroll')();
    flush();
    assert.equal(Number(values.get('--work-progress')), 240 / 410);
    assert.equal(Number(experienceValues.get('--experience-progress')), 200 / 540);
    assert.ok(
      Number(titleValues.get('--title-progress')) > 0 &&
        Number(titleValues.get('--title-progress')) < 1,
    );
    listeners.get('resize')();
    assert.equal(frames.size, 1);
    document.hidden = true;
    listeners.get('visibilitychange')();
    assert.equal(frames.size, 0);
    listeners.get('scroll')();
    assert.equal(frames.size, 0);
    document.hidden = false;
    listeners.get('visibilitychange')();
    assert.equal(frames.size, 1);
    const lateResize = listeners.get('resize');
    release();
    lateResize();
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
    assert.equal(Number(values.get('--work-progress')), 240 / 410);
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
  assert.equal(titleProgress(750, 40, 1000), 0.5);
  assert.equal(titleProgress(600, 40, 1000), 1);
  assert.equal(titleProgress(750, 40, 1000), 0.5);
  assert.equal(titleProgress(100, 1400, 1000), 1);
  assert.equal(titleProgress(785, 40, 1000, true), 0.5);
  assert.equal(titleProgress(640, 40, 1000, true), 1);
});
test('hero exit reverses with scrolling and stays bounded on restored or short pages', () => {
  assert.equal(heroExitProgress(0, 800), 0);
  assert.equal(heroExitProgress(-320, 800), 0.5);
  assert.equal(heroExitProgress(-640, 800), 1);
  assert.equal(heroExitProgress(-320, 800), 0.5);
  assert.equal(heroExitProgress(100, 800), 0);
  assert.equal(heroExitProgress(-900, 0), 1);
});

test('hero exit agrees with a native exit range when the hero is taller than the viewport', () => {
  assert.equal(heroExitProgress(0, 1400, 1000), 0);
  assert.equal(heroExitProgress(-400, 1400, 1000), 0);
  assert.equal(heroExitProgress(-800, 1400, 1000), 0.5);
  assert.equal(heroExitProgress(-1200, 1400, 1000), 1);
});
test('opening has a two-second clock and a pre-hydration escape hatch', () => {
  assert.equal(OPENING_DURATION, 2000);
  const root = { dataset: {} };
  let finish;
  const run = new Function(
    'document',
    'location',
    'matchMedia',
    'sessionStorage',
    'setTimeout',
    openingBootstrap,
  );
  run(
    { documentElement: root },
    { pathname: '/id/' },
    () => ({ matches: false }),
    {
      getItem: () => {
        throw new Error('storage blocked');
      },
    },
    (callback, delay) => {
      assert.equal(delay, 4000);
      finish = callback;
    },
  );
  assert.equal(root.dataset.opening, 'pending');
  finish();
  assert.equal(root.dataset.opening, undefined);
  root.dataset.opening = 'playing';
  finish();
  assert.equal(root.dataset.opening, 'playing');
});
