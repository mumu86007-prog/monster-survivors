import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('pilot editorial games have unique slugs and required evidence', async () => {
  const games = JSON.parse(await readFile('data/editorial-games.json', 'utf8'));
  assert.equal(games.length, 8);
  assert.equal(new Set(games.map((game) => game.slug)).size, games.length);
  for (const game of games) {
    assert.ok(game.labels.length >= 2);
    assert.ok(game.editorNote.length >= 120);
    assert.ok(game.sourceUrl.startsWith('https://'));
    assert.equal(game.embedPermission, 'pending-manual-verification');
  }
});
