# Anushka’s CAT Universe

A personal, responsive CAT preparation website for Anushka. It runs as a static site without a build step, login, paid API, or backend.

## Run

From this repository:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

The application consists of `index.html`, `styles.css`, `app.js`, `content.js`, `universe.js`, and `personal.js`. `CNAME` preserves the existing custom-domain configuration. Serve all files together. Hash routes work on static hosts such as GitHub Pages. The site is published by pushing these files to the hosting branch configured in GitHub Pages.

## Included

- Personalized dashboard and configurable name/preferences.
- 40 original concept guides with examples, traps and lesson notes.
- 216 original practice questions: 86 QA, 64 VARC, 66 DILR. The 24 questions from Anushka’s earlier site are preserved, with clarified wording. Includes 16 numerical-entry questions, 8 original linked reading passages and 12 additional linked DILR sets.
- Question explanations, bookmarks, reflections, retries and error notebook.
- A 12-question diagnostic, 5 fixed full-length mocks, 8 fixed mixed sample papers, 12 fixed sectionals, and a 68-question/120-minute full-mock template with three locked sections. No question repeats within a paper; different papers share parts of the bank. Answer recovery uses session storage in the same tab. MCQ scoring is +3/−1; numerical-entry scoring is +3/0. No percentile prediction.
- Editable day-by-day planning: target date, study budget, starting time, lighter day, checkboxes, daily reflections, seven-day calendar export and complete text-plan export.
- Custom study/break countdowns, pause/resume, refresh recovery, and saved focus minutes. One timer tab is supported; there is no alarm or system notification.
- Arithmetic calculator with a restricted parser (no `eval`), percentage-change and average helpers.
- Revision cards, progress export/restore, exam guidance, and a combined 13-site reference shelf.

## Data and privacy

Notes and progress use localStorage in the current browser. They are not uploaded or synced to another device. Export a JSON backup in My progress or My preferences; restore it in My preferences. Clearing browser data deletes local progress. Personalization does not provide authentication: the site's static content and Anushka’s name are public to anyone with access to the website.

The initial 180-day plan is an editable planning template. It does not assume a CAT year or official exam date. Schedule times are local to the browser. Five-minute transitions are additional to the daily study budget. Mock-analysis work may need the following day when a full mock uses the entire daily budget.

## Content and references

All educational material is original. The questions are foundational/intermediate practice, not official previous-year papers or statistically calibrated mocks. The 68-question template is based on a recent format; current-year rules must be verified with the official CAT authority.

The reference destinations are Official CAT, IMS, T.I.M.E., Career Launcher, Cracku, 2IIM, Rodha, MBA Pathshala, iQuanta, CATKing, Unacademy, Handa Ka Funda and Hitbullseye. They are not presented as a ranking. Live research was attempted but blocked by the cloud network policy. Their current offerings have not been verified, and no coaching content was copied. Required domain additions were saved in the cloud environment draft; saving does not apply or publish those changes.

## Validation

JavaScript syntax checks:

```sh
node --check app.js
node --check content.js
node --check personal.js
node --check universe.js
```

Browser validation covered lesson search/completion/notes, MCQ and numerical-entry feedback, persisted daily completion, calendar exports, study-budget allocation, calculator errors and helpers, timer pause/refresh/completion, diagnostic recovery, full-mock section locking and automatic transitions, bookmarks and notebook, and all 17 routes at desktop, tablet and phone widths.

## Combining the earlier website

`universe.js` preserves the earlier website’s paper-library structure, broad 28-area syllabus tracker and 24 original questions, while using the newer timer, calculator, configurable day-by-day plan, question engine and notes. The fixed exam-date countdown is replaced with the user's own planning deadline. The default deadline is clearly labeled as an editable template.

When the earlier `anushka-cat-nov26` browser storage is present on the same origin, its syllabus checks, reflection notes and test history are imported once. The original storage key is retained. Undated routine checkboxes are preserved as history rather than applied to a new date. Existing test dates are displayed as originally recorded.

`vercel.json` explicitly selects static hosting, with no dependency installation or build. It does not assign or move a custom domain. Both GitHub Pages and Vercel deployments can be triggered by a push to the configured repository, but the domain must point to the correct deployment/project.

## Browser regression checks

With Playwright and Chromium available, start the server on port 8001 and run:

```sh
node tests/browser-smoke.cjs
node tests/combined.test.cjs
```

`CATALYST_TEST_URL` overrides the base URL. `CHROMIUM_PATH` overrides `/usr/bin/chromium`, and `PLAYWRIGHT_MODULE` optionally specifies an installed Playwright module. No browser testing dependencies are shipped to site users. The combined suite verifies migration, deterministic paper selection, unique questions within all 25 papers, paper result identity, syllabus tracking, escaped imported notes, preserved historical dates and mobile navigation.
