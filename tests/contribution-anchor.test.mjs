import assert from 'node:assert/strict';
import { test } from 'node:test';
import { contributionAnchor } from '../src/lib/contribution-anchor.ts';

test('tooltip fits narrow and wide calendars, with a caret toward edge cells', () => {
  for (const width of [160, 280, 390, 1120]) {
    const half = Math.min(110, (width - 16) / 2);
    for (const center of [6.5, width / 2, width - 6.5]) {
      const { x, arrow } = contributionAnchor(width, center);
      assert.ok(x - half >= 8);
      assert.ok(x + half <= width - 8);
      assert.ok(Math.abs(arrow) <= half - 12);
      if (center < width / 2) assert.ok(arrow < 0);
      if (center > width / 2) assert.ok(arrow > 0);
    }
  }
});

test('a centered day stays centered without moving its caret', () => {
  assert.deepEqual(contributionAnchor(600, 300), { x: 300, arrow: 0 });
});
