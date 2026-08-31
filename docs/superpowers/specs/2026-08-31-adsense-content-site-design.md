# AdSense-Ready Content Site Design

## Goal

Turn omggame.store from an embedded-game directory into an English editorial guide for choosing low-pressure browser games. The site must give users useful information before a game starts and make advertising possible only on pages with substantial publisher content.

## Evidence and constraints

- Google requires unique, valuable publisher content and an easy-to-use site structure; embedded media without substantial added value is not eligible ad inventory.
- Every current game is served by a disclosed OnlineGames.io iframe. The game provider is an interaction source, not omggame.store's original content.
- No Google display ad is placed on a game player page, the game directory, navigation, legal pages, or a page whose primary purpose is to launch an iframe.
- No live AdSense client or slot code is added in this work. Site approval, consent obligations, account configuration, and real slot IDs remain the owner's responsibility after content review.

## Information architecture

### 1. Editorial home

The home page explains the editorial promise and sends readers first to scenario guides, then to the playable collection. It must not promise medical relief, invented popularity, or universal suitability.

### 2. Content hub and cornerstone guides

Create a `/guides/` hub plus six substantially distinct guide pages. Each guide answers a different decision question, contains a short author/update byline, an explicit selection method, practical steps, limitations, and a small number of relevant game recommendations. The six guide intents are:

1. Choosing a five-minute browser-game break.
2. Choosing no-timer puzzle games.
3. Choosing familiar card and tile games.
4. Choosing mouse-friendly games and simple controls.
5. Choosing satisfying tidy-task and creative games.
6. Setting an intentional stopping point for casual games.

Each guide will be at least 650 words of non-duplicated editorial prose excluding navigation, labels, game cards, and footer. One unobtrusive `ad-slot` placeholder may appear only after the second substantive section. It contains no advertising script and is explicitly labelled “Advertisement” only when a real slot is configured later.

### 3. Playable game pages

Keep the 30 game pages playable, source-disclosed, and advertising-free. Add a concise consistent byline/source/update block and link readers back to the relevant guide. Game pages remain discovery and interaction pages; they are not the main advertising inventory.

### 4. Trust and policy pages

Replace the stale generic About and Privacy pages with matching editorial design and accurate statements:

- About / editorial policy: purpose, selection method, source disclosure, update policy, contact.
- Privacy: no current Google ad script, third-party iframe data practices, and a future-facing statement that the policy will be updated before advertising is enabled.
- Advertising policy: a separate page defining where ads may appear, no ads beside controls or within player pages, and how paid content is labelled.

## Navigation and search quality

- Use the same lightweight navigation across home, guides, game directory, game pages, and trust pages.
- Add a guide hub to the sitemap and index it.
- Remove obsolete ad scripts and generic gaming-directory language from redesigned editorial and trust surfaces.
- Verify every internal link targets an existing page and that every generated game page contains an OnlineGames.io iframe but no Google ad code.

## Validation

Automated tests must establish:

- Six guides exist, have unique titles and each exceeds 650 prose words.
- Every guide includes a byline, selection-method section, limitation statement, and at most one empty ad placeholder.
- No `adsbygoogle`, `pagead2.googlesyndication`, or ad placeholder exists on game pages or legal pages.
- About, privacy, and advertising-policy pages include source/advertising disclosures and have no ad script.
- Sitemap includes guides hub, six guides, game directory, and the 30 finished game pages.

## Out of scope

- Connecting a real AdSense account, creating consent banners, or adding a real ad slot.
- Claiming that approval is guaranteed.
- Replacing the game supplier, self-hosting games, or adding user accounts/comments.
