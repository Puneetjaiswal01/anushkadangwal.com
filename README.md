# Always, Anushka

A full personal React/Vite app built around love, understanding, everyday care and growing together, inspired by the relationship posts the owner supplied. It uses details from this conversation only; it does not claim access to other ChatGPT chats or invent memories or things Anushka said.

## Inside

Five persistent rooms: **For you**, **Us, gently**, **Letters**, **A softer day**, and **Your space**. The app includes eight personal letters; six practical promises; gentle conversation notes; six original rhyming Hindi poems with Roman text and English meanings; twenty original reminders; mood responses; a saved-note collection; an optional 60-second breathing rhythm; the owner's five supplied exam dates; and a letter and wishes list Anushka writes herself.

Home has Spotify's Yellow Hearts player for Ant Saunders, plus a self-hosted original instrumental. Spotify controls its own playback/preview options. No audio starts automatically. The Doomsday release-night/candlelight dinner invitation offers three reply choices; responses can be edited and copied/shared through the device, with no automatic submission or booking. No exact film release date or showtime is asserted.

The fixed entry code is **0205**, as requested. It is a browser-level gift welcome lock, not server-side private account security or a one-time emailed code. It remembers the current tab through sessionStorage and preserves mounted drafts when closed. No OTP service or account backend is used.

## Local writing

The earlier `anushka-self-letter-v1` version-1 schema is preserved. Letter drafts, little wishes, promise replies and saved notes stay in this browser. Storage failures are reported; writing can be exported/copied. No personal writing is uploaded. Shared-device users can read local data. Promises on the page are the sender's intentions; Anushka has room to write her own thoughts.

## Development and checks

Use Node 24 (or a supported Node version for Vite 7):

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm test` runs `tests/app.cjs` against a production preview on port 4173; override `SITE_URL` when needed. The environment supplies Playwright and Chromium. The suite checks entry code, rooms, dialogs, shayari, bookmarks, drafts, reply choices, real local audio, breathing, mobile layouts and offline use.

## Deployment and installation

The existing Vercel GitHub integration deploys main, serving only dist/. GitHub Actions independently verifies the exact built entry page, assets, audio, icon manifest and offline worker. API/email sign-in stays removed. No provider tokens or server secrets are required for this browser-local app.

Safari → Share → Add to Home Screen installs the smiling-A app. There are no intrusive install banners or top-right sign-in-heart controls. The generated service worker caches this build's local shell, fonts, icons and original instrumental; it does not cache third-party Spotify content or API requests. Online third-party playback requires internet. No first-party analytics scripts are included.
