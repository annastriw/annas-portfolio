import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Inspect the index: these are the files the next commit publishes, including staged additions.
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const files = execFileSync(
  'git',
  ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, 'ls-files', '--cached', '-z'],
  { cwd: root, encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);
const localRoots = new Set([
  '.project-local',
  '.vercel',
  '.next',
  '.playwright-cli',
  '.playwright',
  '.cache',
  'node_modules',
  'out',
  'coverage',
  'playwright-report',
  'test-results',
  'docs',
  'documentation',
  'content',
  'originals',
  'backups',
  'tmp',
  'temp',
]);
const forbidden = files.filter((file) => {
  const parts = file.toLowerCase().split('/');
  return (
    localRoots.has(parts[0]) ||
    parts.some((part) => part.startsWith('.env')) ||
    /\.(?:md|mdx|pem|key|p12|pfx|log|tsbuildinfo|bak|tmp)$/i.test(file)
  );
});
assert.deepEqual(
  forbidden,
  [],
  `Local/private/generated files in Git index: ${forbidden.join(', ')}`,
);
console.log(
  `Verified ${files.length} tracked files: source, configuration, tests and public assets only.`,
);
