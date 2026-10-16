import assert from 'node:assert/strict';
import { test } from 'node:test';
import { swipeStep } from '../src/lib/gallery-gesture.ts';

test('horizontal drags advance in the gesture direction on small and large displays', () => {
  assert.equal(swipeStep(-90, 6, 320), 1);
  assert.equal(swipeStep(110, 10, 1440), -1);
});
test('scrolling, diagonal movements and taps do not change the gallery', () => {
  assert.equal(swipeStep(15, 130, 320), 0);
  assert.equal(swipeStep(100, 95, 768), 0);
  assert.equal(swipeStep(7, 2, 1440), 0);
  assert.equal(swipeStep(0, 0, 320), 0);
});
