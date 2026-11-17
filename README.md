# Always, Anushka

An installable five-room personal app: Home, Letters, Shayari, Music and My Words. Built anew with React and Vite; the former preparation application is not part of this site.

- A midnight garden, six personal letters, and an additional inner-child letter readable a page at a time or in full.
- Three responsive messages for the kind of day she is having; nothing is recorded.
- Six original Hindi shayari, with Roman transliteration and English meanings, plus eight intimate love notes.
- Sixteen conversational reminders with browser-local favourites. The six poems have matching Hindi/Roman texts, clear rhymes and plain English meanings.
- An optional, stoppable 60-second breathing rhythm, with reduced-motion support.
- Gentle notes for the five exam dates supplied by the site owner. No countdown or performance tracking.
- A 95-second original instrumental with explicit play/pause and volume controls. Four known Hindi songs link to YouTube search; no commercial recordings or lyrics are reproduced.
- A letter-to-herself page with optional editable starters, browser-local autosave, text download and confirmed deletion. She supplies her own words; the site never pretends generated copy was written by her.
- Original SVG garden artwork, a generated smiley-A icon and self-hosted fonts. No analytics scripts.
- Home includes Spotify’s Yellow Hearts player (Ant Saunders); Spotify controls streaming, previews and account requirements. The original local instrumental also plays from Home and keeps playing across rooms.
- iPhone Safari → Share → Add to Home Screen, with Apple touch icon, standalone launch and a versioned service-worker offline shell. Commercial Spotify streaming requires internet; local letters, draft tools and instrumental remain available after successful offline installation.
- Optional email OTP account identity for anushka1dangwal@gmail.com. The production email sender/datastore are not configured by this code; see ACCESS_SETUP.md. The public gift page is not an account-gated vault.

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

The existing Vercel GitHub integration deploys pushes to `main`. `vercel.json` selects Vite, runs `npm ci` and `npm run build`, and serves only `dist/`. GitHub Actions independently builds and polls the domain for the exact compiled asset names. Its result is available under **Actions → Build and verify website**. No deployment token is committed or needed for the existing integration. The Node API at /api/auth is deployed alongside the Vite build; OTP provider keys must be added as private Vercel production values, never VITE_ variables.

The site asks search engines not to index it. This is a public gift page, not an authenticated service. Saved reminders and self-written letters remain in the current browser. The letter page explains shared-device visibility; it is not encrypted or synced. Storage errors preserve the current text and offer downloading it. No letter text is uploaded.

## Original music

`public/audio/a-little-place-to-land.mp3` is an original synthesized instrumental. Its melody, arrangement and timbre are authored in `scripts/compose-lullaby.py`; no commercial recordings are sampled. To reproduce it, run the script with Python/NumPy and encode the generated WAV with FFmpeg. These tools are not needed for normal builds. Playback never starts automatically.

## Home Screen app

`npm run build` creates the Vite output, then `scripts/build-pwa.mjs` writes a cache-versioned service worker based on that exact build. It precaches only the app shell, local fonts/icons and original music. It ignores API, third-party, and non-GET requests. The MP3 has offline byte-range support. No drafts or OTPs are stored in Cache Storage. Safari storage and offline availability remain under the browser’s control.

The install dialog gives the real iPhone Share → Add to Home Screen instructions; it does not pretend iOS supports a programmatic install prompt. Android uses beforeinstallprompt when provided by that browser.
