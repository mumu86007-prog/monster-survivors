import { readFile } from 'node:fs/promises';

const allowedLabels = new Set(['no-timer', 'short-break', 'low-stakes', 'mouse-friendly', 'cozy-task']);
const games = JSON.parse(await readFile(new URL('../data/editorial-games.json', import.meta.url), 'utf8'));
const slugs = new Set();

for (const game of games) {
  if (slugs.has(game.slug)) throw new Error(`Duplicate editorial slug: ${game.slug}`);
  slugs.add(game.slug);
  if (!game.labels.every((label) => allowedLabels.has(label))) throw new Error(`Invalid label on ${game.slug}`);
  if (!game.sourceUrl.startsWith('https://')) throw new Error(`Invalid source URL on ${game.slug}`);
  if (!new URL(game.sourceUrl).hostname.endsWith('onlinegames.io')) throw new Error(`Unapproved source host on ${game.slug}`);
  if (!game.editorNote || game.editorNote.length < 120) throw new Error(`Editor note is too short on ${game.slug}`);
}

if (games.length !== 30) throw new Error(`Expected 30 editorial games, found ${games.length}`);

console.log(`${games.length} editorial records valid`);
