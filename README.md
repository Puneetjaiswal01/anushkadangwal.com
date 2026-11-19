# anushkadangwal.com

A personal date invitation for Anushka: Avengers: Doomsday on release night, followed by a candlelight dinner. The cinema, showtime and dinner venue are left open. No specific release date is asserted because the current official listing could not be verified in this environment.

There is no booking, reply submission, account login or tracking. No message is sent automatically.

`npm ci` and `npm run build` create the static page and retiring service worker under `dist/`. The previous app stays removed; cleanup retires its offline caches on the next online visit.

GitHub Actions verifies the deployed page byte-for-byte and checks that the former app paths remain unavailable.
