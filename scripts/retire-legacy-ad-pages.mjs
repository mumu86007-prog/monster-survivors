import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const excludedDirectories = new Set(['.git', '.worktrees', 'docs', 'node_modules', 'scripts', 'tests']);
const collectHtml = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return excludedDirectories.has(entry.name) ? [] : collectHtml(target);
    return entry.name.endsWith('.html') ? [target] : [];
  }));
  return children.flat();
};
const safePage = (title) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | omggame.store</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://omggame.store/guides/"><link rel="stylesheet" href="/assets/css/relaxing.css"></head><body><header><a class="brand" href="/">omggame.store</a><nav><a href="/guides/">Guides</a><a href="/games/">All 30 picks</a><a href="/about.html">Editorial policy</a></nav></header><main><p class="eyebrow">Archive notice</p><h1>This older page has been retired</h1><p class="lead">We are replacing generic game-directory pages with maintained editorial guides and a smaller, source-disclosed playable collection.</p><section><h2>Find the current content</h2><p>Read our <a href="/guides/">browser-game selection guides</a> for original advice about pace, controls, and stopping points, or browse <a href="/games/">30 editorially reviewed playable picks</a>.</p></section></main><footer>Editorial picks for gentle browser breaks · <a href="/privacy.html">Privacy</a> · <a href="/advertising-policy.html">Advertising policy</a></footer></body></html>`;

const files = await collectHtml(fileURLToPath(root));
let retired = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!/adsbygoogle|pagead2\.googlesyndication/.test(html)) continue;
  const title = html.match(/<title>([^<]+)/i)?.[1]?.replace(/\s*[-|].*$/, '') || 'Archived page';
  await writeFile(file, `${safePage(title)}\n`);
  retired += 1;
}
console.log(`${retired} legacy advertising pages retired`);
