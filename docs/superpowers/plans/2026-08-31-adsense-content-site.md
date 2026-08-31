# AdSense-Ready Content Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make omggame.store an original, content-led browser-game guide with a safe future advertising boundary.

**Architecture:** Store long-form guide copy in a dedicated content data file; the existing build script renders the guides, game directory, game pages and sitemap from that data. Trust pages are static editorial documents sharing the existing lightweight stylesheet. Tests inspect generated HTML, not implementation details.

**Tech Stack:** Static HTML, Node.js ESM build scripts, Node test runner.

---

### Task 1: Establish the advertising-content boundary

**Files:**
- Create: `tests/content-site.test.mjs`
- Modify: `about.html`, `privacy.html`
- Create: `advertising-policy.html`

- [ ] Write failing tests requiring no Google ad script on game/legal pages and required advertising/source disclosures.
- [ ] Run `node --test tests/content-site.test.mjs` and confirm the existing stale legal pages fail.
- [ ] Replace stale legal-page content and add the advertising policy without an ad script.
- [ ] Run `node --test tests/content-site.test.mjs` and confirm this boundary passes.

### Task 2: Build substantial original guides

**Files:**
- Create: `data/editorial-guides.json`
- Modify: `scripts/build-editorial-pages.mjs`
- Create: `guides/index.html` (generated)
- Modify: `tests/content-site.test.mjs`

- [ ] Write failing tests requiring six generated guides, unique H1s, editorial bylines, selection and limitations sections, a single empty ad placeholder, and at least 650 prose words each.
- [ ] Run the content-site tests and confirm the current short guides fail.
- [ ] Add six distinct guide records and render them through the build script and guide hub.
- [ ] Run the build and content-site tests until they pass.

### Task 3: Connect navigation and sitemap

**Files:**
- Modify: `index.html`, `scripts/build-editorial-pages.mjs`, `assets/css/relaxing.css`
- Modify: `tests/publish-surface.test.mjs`

- [ ] Write failing tests for the guide hub and advertising policy in sitemap and home navigation.
- [ ] Run the targeted test and confirm it fails before implementation.
- [ ] Add clear links from home and generated navigation, then add URLs to sitemap.
- [ ] Run the complete build and Node test suite.

### Task 4: Review and publish

**Files:** all files above

- [ ] Run `node scripts/validate-editorial-data.mjs`, `node scripts/build-editorial-pages.mjs`, and `node --test tests/*.test.mjs`.
- [ ] Check the generated sitemap, word counts, ad-script scan, and Git diff.
- [ ] Commit the verified changes and push `main`.
