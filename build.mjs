// Assembles src/pages/*.html into docs/*.html, inlining shared partials.
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');
const partial = (name) => read(`src/partials/${name}.html`);

mkdirSync(join(root, 'docs'), { recursive: true });

for (const file of readdirSync(join(root, 'src/pages')).filter((f) => f.endsWith('.html'))) {
  const key = file.replace('.html', '');
  let html = read(`src/pages/${file}`);
  html = html.replace(/<!--#include (\w+)-->/g, (_, name) => partial(name));
  // Mark the current page in the nav
  html = html.replace(`data-nav="${key}"`, `data-nav="${key}" aria-current="page"`);
  writeFileSync(join(root, 'docs', file), html);
  console.log('built docs/' + file);
}
