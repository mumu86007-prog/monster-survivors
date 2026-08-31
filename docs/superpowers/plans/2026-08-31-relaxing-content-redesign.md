# Relaxing Browser Games Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn omggame.store into a small, crawlable editorial collection of calming browser-game breaks.

**Architecture:** Keep GitHub Pages and plain HTML. Store only the reviewed pilot metadata in `data/editorial-games.json`; a small Node script validates it and generates eight static game pages and six guide pages. The homepage consumes no client-side catalogue data, so its core content is present in HTML.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner.

---

### Task 1: Define and validate the pilot content data

**Files:**
- Create: `data/editorial-games.json`
- Create: `scripts/validate-editorial-data.mjs`
- Create: `tests/editorial-data.test.mjs`

- [ ] **Step 1: Write the failing data test**

```js
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/editorial-data.test.mjs`

Expected: FAIL because `data/editorial-games.json` does not exist.

- [ ] **Step 3: Add the eight pilot records and validator**

Use the reviewed candidates `block-blast`, `tile-match`, `mahjong-online`, `solitaire`, `pyramid-solitaire`, `find-it`, `car-wash`, and `draw-here`. Each record includes `slug`, `title`, `labels`, `shortReason`, `editorNote`, `controls`, `sourceUrl`, and `embedPermission`. Keep `embedPermission` at `pending-manual-verification` so no source is represented as licensed before it is checked.

`scripts/validate-editorial-data.mjs` must reject duplicate slugs, labels outside `no-timer`, `short-break`, `low-stakes`, `mouse-friendly`, `cozy-task`, or a non-HTTPS source URL.

- [ ] **Step 4: Run validator and test**

Run: `node scripts/validate-editorial-data.mjs && node --test tests/editorial-data.test.mjs`

Expected: validator reports `8 editorial records valid`; test reports `pass 1`.

- [ ] **Step 5: Commit**

Run: `git add data/editorial-games.json scripts/validate-editorial-data.mjs tests/editorial-data.test.mjs && git commit -m "feat: add reviewed relaxing game data"`

### Task 2: Generate static game and guide pages

**Files:**
- Create: `scripts/build-editorial-pages.mjs`
- Create: `games/*.html` (eight generated pages)
- Create: `guides/no-timer-puzzle-games.html`
- Create: `guides/relaxing-browser-games-for-a-break.html`
- Create: `guides/gentle-mouse-games.html`
- Create: `guides/quiet-card-games-online.html`
- Create: `guides/satisfying-short-games.html`
- Create: `guides/low-pressure-puzzle-games.html`
- Test: `tests/editorial-pages.test.mjs`

- [ ] **Step 1: Write the failing static-page test**

```js
test('generated pages are crawlable and advertising-free', async () => {
  const html = await readFile('games/block-blast.html', 'utf8');
  assert.match(html, /<h1>Block Blast/);
  assert.match(html, /No timer/);
  assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/editorial-pages.test.mjs`

Expected: FAIL because the generated game page is absent.

- [ ] **Step 3: Implement page generation**

The generator reads validated pilot data and writes static HTML. Each game page must include a unique title, canonical URL, description, visible labels, a 120+ character editor note, controls, source disclosure, a related-games list chosen by shared labels (not random), and an embed section shown only when `embedPermission === 'verified'`. Guide pages must contain original scenario-led copy and links to selected game pages.

- [ ] **Step 4: Run generation and tests**

Run: `node scripts/build-editorial-pages.mjs && node --test tests/editorial-pages.test.mjs`

Expected: `14 editorial pages generated`; all tests pass.

- [ ] **Step 5: Commit**

Run: `git add scripts/build-editorial-pages.mjs games guides tests/editorial-pages.test.mjs && git commit -m "feat: add static editorial game pages"`

### Task 3: Rebuild the homepage and visual system

**Files:**
- Create: `assets/css/relaxing.css`
- Modify: `index.html`
- Test: `tests/homepage.test.mjs`

- [ ] **Step 1: Write the failing homepage test**

```js
test('homepage is editorial and has no ad code or catalogue claim', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /Relaxing Browser Games for a Short Break/);
  assert.match(html, /No timers/);
  assert.doesNotMatch(html, /1000\+ Games|adsbygoogle|pagead2\.googlesyndication/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/homepage.test.mjs`

Expected: FAIL because the current homepage contains the old catalogue claim and ad code.

- [ ] **Step 3: Replace the homepage and add reusable styles**

Build a static homepage with a warm-paper background, ink text, moss/teal controls, coral accents, mood navigation, eight hand-curated cards, reason-first card copy, guide links, and an editorial/source disclosure. Do not load `data/games.json`, include an AdSense script, expose a rating, or use a popularity claim.

- [ ] **Step 4: Run test and visual checks**

Run: `node --test tests/homepage.test.mjs && rg -n "adsbygoogle|pagead2\\.googlesyndication|1000\\+ Games" index.html assets/css/relaxing.css`

Expected: test passes; `rg` has no matches.

- [ ] **Step 5: Commit**

Run: `git add index.html assets/css/relaxing.css tests/homepage.test.mjs && git commit -m "feat: redesign relaxing games homepage"`

### Task 4: Retire the old monetized directory paths and publish only completed URLs

**Files:**
- Modify: `play/index.html`
- Modify: `category/index.html`
- Modify: `sitemap.xml`
- Modify: `robots.txt`
- Create: `tests/publish-surface.test.mjs`

- [ ] **Step 1: Write the failing publish-surface test**

```js
test('published surface contains only completed pilot URLs', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  assert.match(sitemap, /games\/block-blast\.html/);
  assert.doesNotMatch(sitemap, /play\/\?game=|category\/\?cat=/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/publish-surface.test.mjs`

Expected: FAIL because the current sitemap contains parameterized template URLs.

- [ ] **Step 3: Remove misleading paths from the publish surface**

Replace the dynamic `play` and `category` templates with a short redirect or explanatory page that links to the new homepage. Remove ad code from both templates. Regenerate the sitemap using only homepage, static pilot game pages, guides, privacy, and about pages. Keep robots allowed and declare the updated sitemap.

- [ ] **Step 4: Run all checks**

Run: `node scripts/validate-editorial-data.mjs && node scripts/build-editorial-pages.mjs && node --test tests/*.test.mjs && rg -n "adsbygoogle|pagead2\\.googlesyndication|Math\\.random" index.html play/index.html category/index.html games guides`

Expected: validation and all tests pass; the final `rg` has no matches.

- [ ] **Step 5: Commit**

Run: `git add play/index.html category/index.html sitemap.xml robots.txt tests/publish-surface.test.mjs games guides && git commit -m "refactor: publish curated editorial surface"`

### Task 5: Render and release-readiness verification

**Files:**
- Modify: `README.md` (add local preview and content verification commands)
- Test: `tests/*.test.mjs`

- [ ] **Step 1: Document preview and validation commands**

Add `python -m http.server 8080` and the exact Node validation/build/test commands to `README.md`. State that embeds remain disabled until source permission is recorded as verified.

- [ ] **Step 2: Run final verification**

Run: `node scripts/validate-editorial-data.mjs && node scripts/build-editorial-pages.mjs && node --test tests/*.test.mjs && git status --short`

Expected: all checks pass and only intended README/generated-page changes appear before the final commit.

- [ ] **Step 3: Commit**

Run: `git add README.md && git commit -m "docs: explain editorial site verification"`
