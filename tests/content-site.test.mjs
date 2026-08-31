import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import guides from '../data/editorial-guides.mjs';

const read = (path) => readFile(path, 'utf8');
const proseWords = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*>/g, ' ').match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)?.length ?? 0;
const guideSlugs = guides.map((guide) => guide.slug);

test('guides are substantial, distinct editorial pages with one future ad position', async () => {
  assert.equal(guideSlugs.length, 9);
  const guides = await Promise.all(guideSlugs.map(async (slug) => [slug, await read(`guides/${slug}.html`)]));
  const headings = guides.map(([, html]) => html.match(/<h1>([^<]+)<\/h1>/)?.[1]);
  assert.equal(new Set(headings).size, guideSlugs.length);
  for (const [, html] of guides) {
    assert.ok(proseWords(html) >= 650, 'guide needs at least 650 prose words');
    assert.match(html, /Editorially reviewed by omggame\.store/);
    assert.match(html, /<h2>How we selected these games<\/h2>/);
    assert.match(html, /<h2>Limits of this guide<\/h2>/);
    assert.equal((html.match(/class="ad-slot"/g) ?? []).length, 1);
    assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
  }
});

test('game and trust pages never load an ad script', async () => {
  const pages = await Promise.all(['games/block-blast.html', 'games/index.html', 'about.html', 'privacy.html', 'advertising-policy.html'].map(read));
  for (const html of pages) assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
  assert.doesNotMatch(pages[0], /class="ad-slot"/);
  assert.match(pages[2], /Editorial policy/);
  assert.match(pages[3], /Third-party game embeds/);
  assert.match(pages[4], /Where advertising may appear/);
});

test('no published HTML file loads a legacy Google ad script', async () => {
  const collectHtml = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => entry.isDirectory() ? (entry.name === '.worktrees' ? [] : collectHtml(`${directory}/${entry.name}`)) : entry.name.endsWith('.html') ? [`${directory}/${entry.name}`] : []));
    return files.flat();
  };
  const htmlFiles = await collectHtml('.');
  const source = await Promise.all(htmlFiles.map(async (file) => [file, await read(file)]));
  assert.deepEqual(source.filter(([, html]) => /adsbygoogle|pagead2\.googlesyndication/.test(html)).map(([file]) => file), []);
});
