# Anushka’s CAT Universe

A personal, responsive CAT preparation website for Anushka. It runs as a static site without a build step, login, paid API, or backend.

## Run

From this repository:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

The application consists of `index.html`, `styles.css`, `themes.css`, `profiles.js`, `app.js`, `content.js`, `universe.js`, `paper-bank.js`, `learning.js`, `exam-plan.js`, and `personal.js`. `CNAME` preserves the existing custom-domain configuration. Serve all files together. Hash routes work on static hosts such as GitHub Pages. The site is published by pushing these files to the hosting branch configured in GitHub Pages.

## Included

- Personalized dashboard and configurable name/preferences.
- 40 original concept guides with examples, traps and lesson notes.
- 272 original practice questions: 110 QA, 80 VARC, 82 DILR. The 24 questions from Anushka’s earlier site are preserved, with clarified wording. Includes 28 numerical-entry questions, 10 original linked reading passages and 16 linked DILR sets.
- Question text/topic search with answer-type filtering, explanations, bookmarks, reflections, retries and error notebook.
- A 12-question diagnostic, 5 fixed full-length mocks, 8 fixed mixed sample papers, 12 fixed sectionals, and a 68-question/120-minute full-mock template with three locked sections. No question repeats within a paper; different papers share parts of the bank. Answer recovery uses session storage in the same tab. MCQ scoring is +3/−1; numerical-entry scoring is +3/0. No percentile prediction.
- Editable day-by-day planning: target date, study budget, starting time, lighter day, checkboxes, daily reflections, seven-day calendar export and complete text-plan export.
- Custom study/break countdowns, pause/resume, refresh recovery, and saved focus minutes. One timer tab is supported; there is no alarm or system notification.
- Arithmetic calculator with a restricted parser (no `eval`), percentage-change and average helpers.
- Revision cards, progress export/restore, exam guidance, and a combined 13-site reference shelf.

## Data and privacy

Notes and progress use localStorage in the current browser, under a separate key for Anushka, Hardik and Ojasvi. They are not uploaded or synced to another device. Export a JSON backup in My progress or My preferences; restore it in My preferences. Clearing browser data deletes local progress. Guest profiles do not provide authentication: anyone using the same browser can switch between spaces. Static learning content and profile names are public.

The exam date is 29 November 2026, supplied by the user. The final-month plan runs from 26 October to the exam; earlier planning targets are archived without clearing progress. Schedule times are local to the browser. Five-minute transitions are additional to the daily study budget. Mock-analysis work may need the following day when a full mock uses the entire daily budget.

## Content and references

All educational material is original. The questions are foundational/intermediate practice, not official previous-year papers or statistically calibrated mocks. The 68-question template is based on a recent format; current-year rules must be verified with the official CAT authority.

The reference destinations are Official CAT, IMS, T.I.M.E., Career Launcher, Cracku, 2IIM, Rodha, MBA Pathshala, iQuanta, CATKing, Unacademy, Handa Ka Funda and Hitbullseye. They are not presented as a ranking. The 26 October 2026 audit compared the public 2IIM and Cracku syllabus outlines with our topic coverage. Their course offerings have not been independently evaluated, and no coaching content was copied. The official CAT site denied automated access, so exam-slot and reporting details must still be checked on the admit card. The planning date was subsequently set to 29 November 2026 at the user’s instruction.

## Validation

JavaScript syntax checks:

```sh
node --check profiles.js
node --check app.js
node --check content.js
node --check personal.js
node --check universe.js
node --check paper-bank.js
node --check learning.js
node --check exam-plan.js
```

Browser validation covered lesson search/completion/notes, MCQ and numerical-entry feedback, persisted daily completion, calendar exports, study-budget allocation, calculator errors and helpers, timer pause/refresh/completion, diagnostic recovery, full-mock section locking and automatic transitions, bookmarks and notebook, and all 20 routes at desktop, tablet and phone widths.

## Combining the earlier website

`universe.js` preserves the earlier website’s paper-library structure, broad 28-area syllabus tracker and 24 original questions, while using the newer timer, calculator, configurable day-by-day plan, question engine and notes. The earlier generic planning deadline has been replaced with the user-confirmed CAT date, 29 November 2026.

When the earlier `anushka-cat-nov26` browser storage is present on the same origin, its syllabus checks, reflection notes and test history are imported once. The original storage key is retained. Undated routine checkboxes are preserved as history rather than applied to a new date. Existing test dates are displayed as originally recorded.

`vercel.json` explicitly selects static hosting, with no dependency installation or build. It does not assign or move a custom domain. Both GitHub Pages and Vercel deployments can be triggered by a push to the configured repository, but the domain must point to the correct deployment/project.

## Browser regression checks

With Playwright and Chromium available, start the server on port 8001 and run:

```sh
node tests/browser-smoke.cjs
node tests/combined.test.cjs
node tests/learning.test.cjs
node tests/exam-plan.test.cjs
node tests/profiles.test.cjs
```

`CATALYST_TEST_URL` overrides the base URL. `CHROMIUM_PATH` overrides `/usr/bin/chromium`, and `PLAYWRIGHT_MODULE` optionally specifies an installed Playwright module. No browser testing dependencies are shipped to site users. The combined suite verifies migration, deterministic paper selection, unique questions within all 25 papers, paper result identity, syllabus tracking, escaped imported notes, preserved historical dates and mobile navigation.

## Content and learning audit — 26 October 2026

See [AUDIT.md](AUDIT.md) for findings, sources and verification. `learning.js` adds 56 original questions for thin topics, a content map, saved answer reviews and a revision queue. `paper-bank.js` pins the original question IDs of all 25 named papers, so expanding practice does not change an existing paper.

New test submissions retain their full answers, passages and explanations across reloads. Detailed reviews are kept for the latest 20 tests to control local storage use; older score summaries remain. Reviews can be filtered and downloaded as text, and JSON backups include the retained reviews. Old tests that saved only totals are clearly labeled.

A checked or submitted incorrect answer is scheduled after 1 day. Successive correct attempts use 3, 7, 14 and 30 days, capped at 30. Uncertainty reflections and test review flags bring a question back after 1 day. This is a simple revision aid, not a mastery or percentile estimate. It does not send background notifications. Due items are surfaced in the dashboard, daily review task and revision page.

## CAT 2026 final-month plan

The user set Anushka’s exam date to **Sunday, 29 November 2026**. The dashboard and planner use a date-based countdown (34 days on 26 October). Study minutes, starting time and lighter day remain editable; the exam date is fixed. Importing an older backup also realigns its deadline while retaining the previous plan, notes and progress.

- 26 October–1 November: diagnose and repair gaps.
- 2–8 November: core revision.
- 9–15 November: timed selection practice.
- 16–22 November: accuracy and stability.
- 23–26 November: lighter revision, capped at 90 minutes.
- 27–28 November: readiness and rest, capped at 45 minutes.
- 29 November: an untimed exam-day checklist using the actual admit-card slot; no practice test or assumed reporting time.

Suggested full mocks are on 31 October and 7, 14, 18 and 21 November, with analysis on the following day. Short budgets/lighter days substitute a sectional or shorter practice block. Exam-day items are excluded from calendar study exports, and no study tasks are generated after the exam.

## Study partners: Anushka, Hardik and Ojasvi

`profiles.js` selects an identity before `app.js` reads any progress. Query links (`?profile=hardik` or `?profile=ojasvi`) take precedence; the last selection is remembered per tab. All three have the complete learning interface, with dreamy lavender, navy/brass and forest/ivory themes and personal greetings. A profile picker is available on desktop and mobile.

- Anushka retains the original `catalyst-v1` progress key and `catalyst-active-test` session key. Her earlier-site migration remains restricted to her space.
- Hardik uses `catalyst-v1:hardik` and `catalyst-active-test:hardik`; Ojasvi has equivalent `:ojasvi` keys. Attempts, tests/reviews, notes, daily tasks, plans, syllabus, revision, focus time and running timers are independent.
- Switching during a test explicitly saves its answers and warns that the deadline continues. Switching back in the same tab resumes the matching test. Different-profile tabs do not share selection or overwrite each other.
- JSON backups are tagged with `ownerProfileId`. Import rejects another person’s backup; unlabeled older backups belong to Anushka. Export filenames identify guest profiles.
- Study partners have personal links, separate study commitments and optional copied check-ins. Progress counts are included only when opted in; private notes and answers are never included. Nothing is messaged or uploaded automatically.

These are local guest spaces, not password-protected accounts or a cloud database. A personal link selects a profile but does not synchronise devices. Export/restore moves that person’s data manually. The partner page makes this boundary explicit and does not show invented remote activity or other people’s notes.

## Personal colour palettes

`themes.css` applies the same palette consistently to each person’s dashboard, profile cards, navigation, study timer, planner and calculator. Anushka has dreamy lavender with a starry midnight hero and pearl accents; Hardik has navy, slate and brass; Ojasvi has forest green, sage and ivory. Correct and incorrect answer colours remain green and red, independently of personal themes. This visual update does not activate the separate pending authenticated-access release.

Progress, notes, plans, results and unfinished tests are stored separately per profile in this browser. Test drafts survive closing the browser and retain their original deadline. Existing tab-only drafts migrate when reopened. Settings provides profile-specific backup export and restore. Clearing site data/private browsing can remove local records; cross-device recovery requires the pending private datastore release.
