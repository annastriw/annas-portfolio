import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/content/github.json', import.meta.url);
const previous = JSON.parse(await readFile(file, 'utf8'));
async function get(url, json = false) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'annas-portfolio-build',
      Accept: json ? 'application/vnd.github+json' : 'text/html',
    },
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  return json ? response.json() : response.text();
}
const results = await Promise.allSettled([
  get('https://github.com/users/annastriw/contributions'),
  get('https://api.github.com/users/annastriw/events/public?per_page=12', true),
]);
let days = previous.days,
  events = previous.events.filter((e) => !e.repo.endsWith('/employee-attendance-system'));
if (results[0].status === 'fulfilled') {
  const tags = results[0].value.match(/<td\b[^>]*data-date=[^>]+>/g) ?? [];
  const parsed = tags
    .map((tag) => ({
      date: tag.match(/data-date="([^"]+)"/)?.[1],
      level: Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0),
    }))
    .filter((day) => day.date);
  if (parsed.length) days = parsed.sort((a, b) => a.date.localeCompare(b.date));
}
if (results[1].status === 'fulfilled') {
  const seen = new Set();
  events = results[1].value
    .filter((e) => {
      if (
        e.repo.name.endsWith('/employee-attendance-system') ||
        seen.has(e.repo.name) ||
        !['PushEvent', 'PullRequestEvent', 'CreateEvent', 'ReleaseEvent', 'IssuesEvent'].includes(
          e.type,
        )
      )
        return false;
      seen.add(e.repo.name);
      return true;
    })
    .slice(0, 3)
    .map((e) => ({
      type: e.type,
      repo: e.repo.name,
      date: e.created_at,
      url: `https://github.com/${e.repo.name}`,
    }));
}
const succeeded = results.some((r) => r.status === 'fulfilled');
const data = { updatedAt: succeeded ? new Date().toISOString() : previous.updatedAt, days, events };
await writeFile(file, JSON.stringify(data, null, 2) + '\n');
console.log(
  succeeded
    ? `GitHub public snapshot: ${days.length} days, ${events.length} events.`
    : 'GitHub unavailable; keeping the last public snapshot.',
);
