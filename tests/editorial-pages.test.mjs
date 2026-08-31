import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('generated pages are crawlable and advertising-free', async () => {
  const html = await readFile('games/block-blast.html', 'utf8');
  assert.match(html, /<h1>Block Blast/);
  assert.match(html, /No timer/);
  assert.match(html, /<iframe[^>]+onlinegames\.io/);
  assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
});

test('all-picks directory exposes the complete editorial collection', async () => {
  const html = await readFile('games/index.html', 'utf8');
  assert.match(html, /32 Browser Games/);
  assert.match(html, /href="\/games\/wedding-beauty-salon\.html"/);
  assert.match(html, /href="\/games\/steal-brainrots\.html"/);
  assert.match(html, /href="\/games\/fall-brainrots\.html"/);
  assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
});
