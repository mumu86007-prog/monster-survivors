import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('published surface contains only completed pilot URLs', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  assert.match(sitemap, /games\/block-blast\.html/);
  assert.doesNotMatch(sitemap, /play\/\?game=|category\/\?cat=/);
});
