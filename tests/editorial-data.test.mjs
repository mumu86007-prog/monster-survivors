import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('editorial collection has 32 unique games and required evidence', async () => {
  const games = JSON.parse(await readFile('data/editorial-games.json', 'utf8'));
  assert.equal(games.length, 32);
  assert.equal(new Set(games.map((game) => game.slug)).size, games.length);
  for (const game of games) {
    assert.ok(game.labels.length >= 2);
    assert.ok(game.editorNote.length >= 120);
    assert.ok(game.sourceUrl.startsWith('https://'));
    assert.equal(new URL(game.sourceUrl).hostname.endsWith('onlinegames.io'), true);
    assert.equal(game.embedPermission, 'publisher-iframe-source');
  }
});
