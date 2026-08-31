# Relaxing Browser Games: content-led redesign

## Goal

Reposition omggame.store from a broad, iframe-first game directory to an English-language editorial site for short, low-pressure browser-game breaks. The first release must give visitors a useful way to choose a game and create original publisher content suitable for a future AdSense re-review.

## Audience and scope

The primary audience is English-speaking desktop and mobile users looking for a short break, a no-timer puzzle, or a gentle browser game without a download. This release does not claim to treat anxiety or any health condition, and it does not attempt to rework the whole 161-row catalogue.

The release covers a curated pilot of eight games, chosen only after manual play and embed-permission checks. Candidate groups are no-timer puzzles, quiet card games, satisfying tasks, light creative play, and gentle management games.

## Information architecture

The home page will lead with the visitor's moment rather than a catalogue count:

1. Hero: "Relaxing Browser Games for a Short Break" with a concise no-download, no-timer, no-pressure proposition.
2. Mood navigation: No timers, 5-minute break, gentle puzzles, cozy tasks, and mouse-friendly.
3. Curated game cards with editorial labels and a short recommendation reason.
4. A small set of scenario guides linking to the curated game pages.
5. Transparent editorial and source links in the footer.

Each selected game will get its own static URL and HTML content. A game page will place an original editorial introduction before the optional embed and include practical controls, why it fits the stated mood, a concise tested-play note, and related curated games. An unavailable or unapproved embed must not be published as a playable recommendation.

## Content model

Technical categories remain in the game data for maintenance. New editorial labels are separate from technical tags:

- `no-timer`
- `short-break`
- `low-stakes`
- `mouse-friendly`
- `cozy-task`

The site must not show invented rating counts, random recommendations, or unverified "trending" claims. Every editorial label is based on a documented manual test. Game-page copy must be human-edited, specific to the game, and avoid medical claims.

## Visual direction

Replace the current dark, neon arcade treatment with a calm, accessible palette: warm paper background, deep ink text, moss/teal functional accents, and restrained coral highlights. Use real, permitted gameplay captures where available; do not use mass-generated emoji-gradient covers. Cards prioritize play context and recommendation reason over a decorative score.

## Monetization and compliance

Remove the current AdSense script and placeholder ad placements for the redesign. No advertising is included in the pilot release. A later, separately reviewed change may introduce a small number of ad units after the site has original content, stable indexing, and verified game-source permissions.

## Data cleanup

The current source data contains 17 duplicate slugs. The pilot must deduplicate the catalogue before curated content is selected. Any game without a verified embedding right or with a source that cannot be played reliably is excluded from the pilot.

## Success criteria

- Homepage presents a calm, editorial experience with no catalogue-size or popularity claims that cannot be verified.
- Eight reviewed games have static, crawlable pages with unique editorial content and the five-label system.
- Six scenario-led guide pages link to and explain the curated selection.
- The build contains no AdSense script, no ad placeholders, no random rating count, and no random related-game selection.
- Sitemap and internal links include only the completed, publishable pilot pages.

## Verification

Verify static HTML content without JavaScript, validate internal links and sitemap entries, check desktop and mobile page rendering, and manually test each included embed. Record the source URL and permission outcome for every selected game before publication.
