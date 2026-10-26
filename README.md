# Anushka’s CAT Universe — private study spaces

This branch prepares the requested access rules. **It is not yet active on production.** See [ACCESS_SETUP.md](ACCESS_SETUP.md) for the required private hosting settings and migration procedure. The published `main` branch remains the earlier open guest-profile version until activation.

| Person | Can view | Can update |
| --- | --- | --- |
| Anushka | All three spaces | Her own space |
| Hardik | His own space | His own space |
| Ojasvi | His own space | His own space |

Permissions are enforced by authenticated API requests, not query strings or hidden controls. Anushka’s view of another person’s work is read-only. A guest’s links and picker expose only that guest’s own space. Public curriculum is shared; private progress is not.

## Learning features retained

- Personal dreamy lavender, navy/brass and forest/ivory interfaces, with desktop/mobile layouts.
- 40 guides and 272 original practice questions: 110 QA, 80 VARC, 82 DILR.
- Five fixed full mocks, eight sample papers and 12 sectionals; existing paper question IDs stay unchanged.
- Saved test reviews, error notebook, spaced revision, topic map and question search.
- Study timer, calculator, dated daily schedule and calendar/text exports.
- CAT date: 29 November 2026, with mock/analysis pairs, a lighter final week and an untimed exam-day checklist.
- Account-tagged JSON backups, optional copied study check-ins and personal study commitments.

## Private data and sign-in

Three separately configured passwords are verified using salted PBKDF2-SHA256 hashes. Sessions use signed HttpOnly SameSite=Strict cookies; production cookies are Secure and host-only. Logout revokes the server session. Login attempts are rate-limited. Private progress is stored in a private Redis-compatible REST datastore, with per-request identity checks, no-cache responses, payload validation and version conflicts that prevent silent overwrites.

No passwords, signing keys, database tokens or real progress records are committed. There are no default production credentials. Missing configuration keeps the app locked. Password configuration is generated privately using the helper described in ACCESS_SETUP.md.

Earlier shared browser records are migrated by Anushka into empty private records before their plaintext copies are removed. Existing private records cannot be overwritten by migration. Conflicts stop for manual review/export. Guest access on a browser with earlier shared records remains blocked until those records are resolved. No private user records were accessed during development; tests use isolated fixtures.

## Run and verify

Node.js 24 is required. There are no runtime npm dependencies.

```sh
npm run build
npm run test:access
npm run test:browser
```

Browser checks require Playwright and Chromium, supplied in the cloud environment. `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` can select their installed locations. Tests create temporary, local API servers with isolated fixture credentials and an in-memory test store; they do not contact production or prove real Redis readiness.

For a development server connected to real private settings, put values securely in an ignored `.env.local`, then run:

```sh
node --env-file=.env.local scripts/dev.cjs
```

Do not use a static Python server or GitHub Pages for this authenticated version. Vercel must serve the API functions. `npm run build` copies only frontend files into `public/`; server helpers and private files are not public assets. The development HTTP exception is limited to loopback and cannot disable Secure cookies on Vercel.

## Code layout

- `auth-client.js`: sign-in gate, authorized progress loading, protected migration and private saves.
- `api/`: session, progress and migration endpoints.
- `server/`: permission checks, password/session verification, Redis adapter and progress validation.
- `profiles.js`: server-authorized visible spaces and owner read-only UI.
- `app.js`, `personal.js`, `universe.js`, `learning.js`, `exam-plan.js`, `content.js`, `paper-bank.js`: learning tools and curriculum.
- `tests/`: permission/security checks, real API/browser flows and existing feature regressions.

## Content limitations

Material is original foundation/intermediate practice, not official CAT papers, a calibrated coaching bank or a percentile predictor. The 26 October 2026 audit compared topic coverage with public 2IIM and Cracku syllabus outlines; no coaching content was copied. The user supplied the exam date. The actual slot and reporting instructions come from the admit card.
