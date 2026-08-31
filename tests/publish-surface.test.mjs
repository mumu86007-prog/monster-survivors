import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('published surface exposes the editorial hub and completed game pages', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  const home = await readFile('index.html', 'utf8');
  assert.match(sitemap, /games\/block-blast\.html/);
  assert.match(sitemap, /games\/<\/loc>/);
  assert.match(sitemap, /guides\/<\/loc>/);
  assert.match(sitemap, /advertising-policy\.html/);
  assert.match(home, /href="\/guides\/"/);
  assert.doesNotMatch(sitemap, /play\/\?game=|category\/\?cat=/);
});
