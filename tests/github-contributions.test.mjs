import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseContributions } from '../src/lib/github-contributions.ts';
test('GitHub tooltip counts are joined by cell ID, including zero, singular and comma-formatted values', () => {
  const html = `<td data-date="2026-10-17" id="c" data-level="4"></td><td data-date="2026-10-15" id="a" data-level="0"></td><td data-date="2026-10-16" id="b" data-level="1"></td>
    <tool-tip for="b">1 contribution on October 16th.</tool-tip><tool-tip for="c">1,234 contributions on October 17th.</tool-tip><tool-tip for="a">No contributions on October 15th.</tool-tip>`;
  assert.deepEqual(
    parseContributions(html).map((day) => day.count),
    [0, 1, 1234],
  );
});
test('missing tooltips remain unknown rather than inventing contributions from levels', () => {
  assert.deepEqual(parseContributions('<td data-date="2026-10-17" id="a" data-level="4"></td>'), [
    { date: '2026-10-17', level: 4, count: null },
  ]);
  assert.deepEqual(parseContributions('<td data-date="invalid" data-level="8"></td>'), []);
});
