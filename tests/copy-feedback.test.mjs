import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createCopyFeedback } from '../src/lib/copy-feedback.ts';

function clock() {
  const tasks = new Map();
  let id = 0;
  return {
    tasks,
    set: (task) => {
      tasks.set(++id, task);
      return id;
    },
    clear: (key) => tasks.delete(key),
  };
}
test('copy can repeat; only the latest success timer resets its feedback', async () => {
  const time = clock(),
    states = [];
  const feedback = createCopyFeedback(
    async () => {},
    (...state) => states.push(state),
    time,
  );
  await feedback.copy();
  const stale = [...time.tasks.values()][0];
  await feedback.copy();
  assert.equal(time.tasks.size, 1);
  stale();
  assert.deepEqual(states, [
    ['copied', 1],
    ['copied', 2],
  ]);
  [...time.tasks.values()][0]();
  assert.deepEqual(states.at(-1), ['idle', 2]);
});
test('an older clipboard completion cannot overwrite a later attempt', async () => {
  const pending = [],
    states = [],
    time = clock();
  const feedback = createCopyFeedback(
    () => new Promise((resolve) => pending.push(resolve)),
    (...state) => states.push(state),
    time,
  );
  const first = feedback.copy(),
    second = feedback.copy();
  pending[1]();
  await second;
  pending[0]();
  await first;
  assert.deepEqual(states, [['copied', 2]]);
  assert.equal(time.tasks.size, 1);
});
test('clipboard failure stays available for manual copying and allows retry', async () => {
  let fail = true;
  const states = [],
    time = clock();
  const feedback = createCopyFeedback(
    async () => {
      if (fail) throw new Error('unavailable');
    },
    (...state) => states.push(state),
    time,
  );
  await feedback.copy();
  assert.deepEqual(states, [['error', 1]]);
  assert.equal(time.tasks.size, 0);
  fail = false;
  await feedback.copy();
  assert.deepEqual(states.at(-1), ['copied', 2]);
});
test('cleanup invalidates pending work and timers but a new setup can still copy', async () => {
  let resolve;
  const states = [],
    time = clock();
  const feedback = createCopyFeedback(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
    (...state) => states.push(state),
    time,
  );
  const pending = feedback.copy();
  feedback.cancel();
  resolve();
  await pending;
  assert.equal(states.length, 0);
  const next = feedback.copy();
  resolve();
  await next;
  assert.deepEqual(states.at(-1), ['copied', 3]);
  feedback.cancel();
  assert.equal(time.tasks.size, 0);
});
