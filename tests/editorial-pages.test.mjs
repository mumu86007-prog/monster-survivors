import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('generated pages are crawlable and advertising-free', async () => {
  const html = await readFile('games/block-blast.html', 'utf8');
  assert.match(html, /<h1>Block Blast/);
  assert.match(html, /No timer/);
  assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
});
