import { readdir, copyFile } from 'node:fs/promises';
import { join, relative, sep, resolve } from 'node:path';

// Next.js 16.3 exports segment paths with native Windows separators, while
// its browser router requests dot-separated filenames on every platform.
const root = resolve('out');
let count = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.txt')) {
      const parts = relative(root, file).split(sep);
      const index = parts.findIndex((part) => part.startsWith('__next.'));
      if (index !== -1 && index < parts.length - 1) {
        await copyFile(file, join(root, ...parts.slice(0, index), parts.slice(index).join('.')));
        count++;
      }
    }
  }
}
await walk(root);
console.log(`Static router files normalized: ${count}.`);
