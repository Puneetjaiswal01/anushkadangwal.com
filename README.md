# anushkadangwal.com

The current site displays one sentence: “I hope my presence brings you peace.”

`npm ci` and `npm run build` create the static page and retiring service worker under `dist/`. The previous app and invitation are removed. Cleanup retires the former app’s offline caches on the next online visit.

GitHub Actions verifies the deployed page byte-for-byte and checks that the former app paths remain unavailable.
