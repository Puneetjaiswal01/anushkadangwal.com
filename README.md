# anushkadangwal.com

The current site displays only the exact quote supplied by the owner. Previous app pages, login, audio, artwork, content and dependencies have been removed from this revision.

`npm ci` and `npm run build` create a two-file static deployment under `dist/`. The retiring `sw.js` and an invisible cleanup routine remove the former app’s offline caches and registration on the next online visit. Previously cached offline copies cannot receive this change until they reconnect. Personal browser drafts are not read or transmitted.

Pushes to `main` deploy through the existing Vercel integration. GitHub Actions verifies the exact published index and that old assets and API paths are gone.
