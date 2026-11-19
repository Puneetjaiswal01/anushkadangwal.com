# anushkadangwal.com

A personal date invitation for Anushka: Avengers: Doomsday on release night, followed by a candlelight dinner. The cinema, showtime and dinner venue are left open. No specific release date is asserted because the current official listing could not be verified in this environment.

The page offers Yes, Another day, and No choices. Each opens an editable reply; drafts remain in memory when switching choices. Copy reply uses the clipboard with a manual-copy fallback, and supported phones expose the native Share menu. Nothing is submitted to a backend or sent automatically. There is no booking, account login or tracking.

`npm ci` and `npm run build` create the static page and retiring service worker under `dist/`. The previous app stays removed; cleanup retires its offline caches on the next online visit.

GitHub Actions verifies the deployed page byte-for-byte and checks that the former app paths remain unavailable.
