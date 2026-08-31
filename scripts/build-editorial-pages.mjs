import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const games = JSON.parse(await readFile(new URL('data/editorial-games.json', root), 'utf8'));
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const labelText = (label) => ({ 'no-timer': 'No timer', 'short-break': '5–10 min', 'low-stakes': 'Low stakes', 'mouse-friendly': 'Mouse-friendly', 'cozy-task': 'Cozy task' })[label];
const layout = (title, description, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | omggame.store</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="https://omggame.store/${title.includes('Games') ? 'guides/' : 'games/'}${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replace(/-$/, '')}.html"><link rel="stylesheet" href="/assets/css/relaxing.css"></head><body><header><a class="brand" href="/">omggame.store</a><a href="/guides/relaxing-browser-games-for-a-break.html">Short-break guides</a></header><main>${body}</main><footer>Editorial picks for gentle browser breaks. Game sources are disclosed on every page.</footer></body></html>`;
await mkdir(new URL('games/', root), { recursive: true });
await mkdir(new URL('guides/', root), { recursive: true });
for (const game of games) {
  const related = games.filter((item) => item.slug !== game.slug && item.labels.some((label) => game.labels.includes(label))).slice(0, 3);
  const body = `<p class="eyebrow">Editorial pick</p><h1>${escape(game.title)}</h1><p class="lead">${escape(game.shortReason)}</p><div class="labels">${game.labels.map((label) => `<span>${labelText(label)}</span>`).join('')}</div><section><h2>Why it fits a quiet break</h2><p>${escape(game.editorNote)}</p></section><section><h2>How to play</h2><p>${escape(game.controls)}</p></section><section><h2>Availability</h2><p>This game is not embedded here until its source permission is manually verified. Source: <a href="${escape(game.sourceUrl)}" rel="nofollow">game provider</a>.</p></section><section><h2>Try another gentle pick</h2><ul>${related.map((item) => `<li><a href="/games/${item.slug}.html">${escape(item.title)}</a> — ${escape(item.shortReason)}</li>`).join('')}</ul></section>`;
  await writeFile(new URL(`games/${game.slug}.html`, root), layout(game.title, game.shortReason, body));
}
const guides = [
  ['no-timer-puzzle-games', 'No-Timer Puzzle Games for a Slower Pace', ['block-blast','tile-match','mahjong-solitaire']],
  ['relaxing-browser-games-for-a-break', 'Relaxing Browser Games for a Short Break', ['block-blast','find-it','car-wash']],
  ['gentle-mouse-games', 'Gentle Mouse Games to Play at Your Pace', ['tile-match','find-it','draw-here']],
  ['quiet-card-games-online', 'Quiet Card Games Online', ['classic-solitaire','pyramid-solitaire']],
  ['satisfying-short-games', 'Satisfying Short Games for a Quick Reset', ['car-wash','find-it','block-blast']],
  ['low-pressure-puzzle-games', 'Low-Pressure Puzzle Games Online', ['mahjong-solitaire','tile-match','draw-here']]
];
for (const [slug, title, ids] of guides) {
  const picks = ids.map((id) => games.find((game) => game.slug === id));
  const body = `<p class="eyebrow">Scenario guide</p><h1>${title}</h1><p class="lead">Choose a game with a clear, low-pressure loop instead of a timer or a competitive ranking.</p><section><h2>What we looked for</h2><p>These picks prioritise simple controls, a readable goal, and a natural stopping point. They are entertainment suggestions, not a health treatment or a promise of stress relief.</p></section><section><h2>Our picks</h2><ul class="pick-list">${picks.map((game) => `<li><a href="/games/${game.slug}.html">${game.title}</a><p>${game.shortReason}</p></li>`).join('')}</ul></section>`;
  await writeFile(new URL(`guides/${slug}.html`, root), layout(title, `A careful selection of ${title.toLowerCase()}.`, body));
}
console.log(`${games.length + guides.length} editorial pages generated`);
