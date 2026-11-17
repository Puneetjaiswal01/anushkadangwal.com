# Always, Anushka

A little world of letters, gentle reminders and quiet moments. Built anew with React and Vite; the former preparation application is not part of this site.

- A midnight garden, six personal letters, and an additional inner-child letter readable a page at a time or in full.
- Three responsive messages for the kind of day she is having; nothing is recorded.
- Six original Hindi shayari, with Roman transliteration and English meanings, plus eight intimate love notes.
- Sixteen original reminders with browser-local favourites.
- An optional, stoppable 60-second breathing rhythm, with reduced-motion support.
- Gentle notes for the five exam dates supplied by the site owner. No countdown or performance tracking.
- A 95-second original instrumental with explicit play/pause and volume controls. Four known Hindi songs link to YouTube search; no commercial recordings or lyrics are reproduced.
- A letter-to-herself page with optional editable starters, browser-local autosave, text download and confirmed deletion. She supplies her own words; the site never pretends generated copy was written by her.
- Original SVG garden artwork and self-hosted fonts. No analytics, external media, accounts or secret credentials.

The words draw only on details the owner supplied in this conversation. No personal memories, exam outcomes or parental quotations were invented. Quotes in the reminder jar are original, unattributed copy. Browser favourites use the new `anushka-kindness-v1` key; the site does not load former study records.

## Development

Node 22.12+ or Node 24 is supported.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm test` runs the browser checks against a running production preview at port 4173 (or `SITE_URL`). It uses the environment's Playwright module and Chromium; install these separately if unavailable. Checks cover letters and keyboard focus, saved reminders, a full breathing cycle, failure of browser storage, all five dates, mobile navigation, reduced motion and five screen widths. The heart experience suite additionally checks letter chapters, feeling responses, bilingual poetry and meanings, real MP3 playback/pause/volume, and self-letter save/restore/download/delete.

## Deployment

The existing Vercel GitHub integration deploys pushes to `main`. `vercel.json` selects Vite, runs `npm ci` and `npm run build`, and serves only `dist/`. GitHub Actions independently builds and polls the domain for the exact compiled asset names. Its result is available under **Actions → Build and verify website**. No deployment token is committed or needed for the existing integration.

The site asks search engines not to index it. This is a public gift page, not an authenticated service. Saved reminders and self-written letters remain in the current browser. The letter page explains shared-device visibility; it is not encrypted or synced. Storage errors preserve the current text and offer downloading it. No letter text is uploaded.

## Original music

`public/audio/a-little-place-to-land.mp3` is an original synthesized instrumental. Its melody, arrangement and timbre are authored in `scripts/compose-lullaby.py`; no commercial recordings are sampled. To reproduce it, run the script with Python/NumPy and encode the generated WAV with FFmpeg. These tools are not needed for normal builds. Playback never starts automatically.
