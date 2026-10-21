import assert from 'node:assert/strict';
import { test } from 'node:test';
import { needsOpening, openingBootstrap, OPENING_DURATION } from '../src/lib/opening.ts';
import { motionMilliseconds } from '../src/lib/motion-timing.ts';
import { sceneProgress, heroExitProgress, mountMotionScenes } from '../src/lib/scroll-reveal.ts';

test('scene reading windows reverse and settle before the reading area, including short screens', () => {
  assert.equal(sceneProgress(880, 1000), 0);
  assert.equal(sceneProgress(740, 1000), 0.5);
  assert.equal(sceneProgress(600, 1000), 1);
  assert.equal(sceneProgress(740, 1000), 0.5);
  assert.equal(sceneProgress(770, 1000, true), 0.5);
  assert.equal(sceneProgress(660, 1000, true), 1);
  assert.equal(sceneProgress(100, 0), 0);
  assert.equal(sceneProgress(-1000, 800), 1);
});

test('fallback batches stable sensors, refreshes filtered scenes and releases all work', () => {
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
  const listeners = new Map();
  const frames = new Map();
  const order = [];
  const root = { dataset: {} };
  let top = 880,
    serial = 0,
    small = false;
  const sensor = (kind) => {
    const values = new Map();
    return {
      dataset: { scene: kind },
      isConnected: true,
      values,
      getBoundingClientRect: () => {
        order.push('read');
        return { top, height: 700 };
      },
      style: {
        setProperty: (key, value) => {
          order.push('write');
          values.set(key, value);
        },
        removeProperty: (key) => values.delete(key),
      },
    };
  };
  const work = sensor('work'),
    portrait = sensor('portrait'),
    hero = sensor('hero');
  let scenes = [work, portrait, hero];
  const events = {
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback());
  };
  try {
    const globals = {
      CSS: { supports: () => false },
      matchMedia: (query) => ({ matches: query.includes('max-width') && small }),
      document: { ...events, documentElement: root, hidden: false, querySelectorAll: () => scenes },
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
    const release = mountMotionScenes();
    assert.equal(root.dataset.motion, 'fallback');
    flush();
    assert.equal(work.values.get('--scene-progress'), '0');
    assert.equal(portrait.values.get('--scene-progress'), '0');
    assert.ok(order.lastIndexOf('read') < order.indexOf('write'));
    top = 600;
    listeners.get('scroll')();
    listeners.get('scroll')();
    assert.equal(frames.size, 1);
    flush();
    assert.equal(work.values.get('--scene-progress'), '1');
    top = 740;
    listeners.get('scroll')();
    flush();
    assert.equal(work.values.get('--scene-progress'), '0.5');
    order.length = 0;
    listeners.get('scroll')();
    flush();
    assert.equal(order.includes('write'), false);
    small = true;
    listeners.get('resize')();
    flush();
    assert.ok(Number(work.values.get('--scene-progress')) > 0.5);
    const card = sensor('card');
    work.isConnected = false;
    scenes = [portrait, hero, card];
    listeners.get('portfolio-scenes-changed')();
    flush();
    assert.equal(work.values.size, 0);
    assert.equal(card.values.get('--scene-progress'), portrait.values.get('--scene-progress'));
    listeners.get('toggle')();
    assert.equal(frames.size, 1);
    document.hidden = true;
    listeners.get('visibilitychange')();
    assert.equal(frames.size, 0);
    listeners.get('scroll')();
    assert.equal(frames.size, 0);
    document.hidden = false;
    listeners.get('visibilitychange')();
    assert.equal(frames.size, 1);
    const stale = listeners.get('resize');
    release();
    stale();
    assert.equal(frames.size, 0);
    assert.equal(listeners.size, 0);
    assert.equal(portrait.values.size, 0);
    assert.equal(hero.values.size, 0);
    assert.equal(card.values.size, 0);
    assert.equal(root.dataset.motion, undefined);
    Object.defineProperty(globalThis, 'CSS', {
      value: { supports: () => true, registerProperty: () => {} },
      configurable: true,
    });
    const releaseNative = mountMotionScenes();
    assert.equal(root.dataset.motion, 'native');
    assert.equal(listeners.size, 0);
    releaseNative();
    assert.equal(root.dataset.motion, undefined);
    // Timeline support alone is insufficient: interpolation of registered progress is required.
    Object.defineProperty(globalThis, 'CSS', {
      value: { supports: () => true },
      configurable: true,
    });
    const releasePartial = mountMotionScenes();
    assert.equal(root.dataset.motion, 'fallback');
    releasePartial();
    Object.defineProperty(globalThis, 'matchMedia', {
      value: () => ({ matches: true }),
      configurable: true,
    });
    mountMotionScenes()();
    assert.equal(listeners.size, 0);
    assert.equal(frames.size, 0);
    assert.equal(root.dataset.motion, undefined);
  } finally {
    for (const name of names) {
      const descriptor = original.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
});
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

test('declarative404 return replays before hydration and consumes only its intro query', () => {
  const root = { dataset: {} };
  const replacements = [];
  const run = new Function(
    'document',
    'location',
    'matchMedia',
    'sessionStorage',
    'setTimeout',
    'history',
    openingBootstrap,
  );
  run(
    { documentElement: root },
    { pathname: '/id/', search: '?intro=1', hash: '' },
    () => ({ matches: false }),
    { getItem: () => 'true', setItem: () => {}, removeItem: () => {} },
    () => {},
    { state: null, replaceState: (...args) => replacements.push(args) },
  );
  assert.equal(root.dataset.opening, 'pending');
  assert.equal(replacements[0][2], '/id/');
  const reduced = { dataset: {} };
  run(
    { documentElement: reduced },
    { pathname: '/id/', search: '?intro=1', hash: '' },
    () => ({ matches: true }),
    {},
    () => assert.fail('reduced motion must not start a timer'),
    { state: null, replaceState: (...args) => replacements.push(args) },
  );
  assert.equal(reduced.dataset.opening, undefined);
  assert.equal(replacements.length, 2);
  const normal = { dataset: {} };
  run(
    { documentElement: normal },
    { pathname: '/en/', search: '?campaign=work', hash: '' },
    () => ({ matches: false }),
    { getItem: (key) => (key === 'portfolio-opened' ? 'true' : null) },
    () => {},
    { replaceState: () => assert.fail('ordinary query must be preserved') },
  );
  assert.equal(normal.dataset.opening, undefined);
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
      assert.equal(delay, 2000);
      finish = callback;
    },
  );
  assert.equal(root.dataset.opening, 'pending');
  finish();
  assert.equal(root.dataset.opening, undefined);
  root.dataset.opening = 'playing';
  finish();
  assert.equal(root.dataset.opening, undefined);
  assert.equal(root.dataset.openingBooted, 'true');
});
