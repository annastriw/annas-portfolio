import assert from 'node:assert/strict';
import { test } from 'node:test';
import { zoomHidesCaptions } from '../src/lib/media-zoom.ts';

test('zoom captions use hysteresis and return only near fitted size', () => {
  let hidden = false;
  for (const [zoom, expected] of [
    [1, false],
    [1.02, false],
    [1.06, true],
    [1.03, true],
    [1.02, true],
    [1.005, false],
    [1, false],
  ]) {
    hidden = zoomHidesCaptions(zoom, hidden);
    assert.equal(hidden, expected);
  }
});
test('invalid zoom input preserves the current caption state', () => {
  for (const zoom of [NaN, Infinity, -1, 0]) {
    assert.equal(zoomHidesCaptions(zoom, true), true);
    assert.equal(zoomHidesCaptions(zoom, false), false);
  }
});
