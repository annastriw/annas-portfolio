import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      } catch {
        file = resolve(root, '404.html');
        res.statusCode = 404;
      }
      const bytes = await readFile(file);
      res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(bytes);
    } catch {
      res.writeHead(500).end('Unable to load page.');
    }
  })
  .listen(3200, '127.0.0.1', () => console.log('Production preview: http://localhost:3200'));
