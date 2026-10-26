# Anushka’s CATalyst

A personal, responsive CAT preparation website for Anushka. It runs as a static site without a build step, login, paid API, or backend.

## Run

From this repository:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

The application consists of `index.html`, `styles.css`, `app.js`, `content.js`, and `personal.js`. `CNAME` preserves the existing custom-domain configuration. Serve all files together. Hash routes work on static hosts such as GitHub Pages. The site is published by pushing these files to the hosting branch configured in GitHub Pages.

## Included

- Personalized dashboard and configurable name/preferences.
- 40 original concept guides with examples, traps and lesson notes.
- 192 original practice questions: 76 QA, 58 VARC, 58 DILR. Includes 16 numerical-entry questions, 8 original linked reading passages and 12 additional linked DILR sets.
- Question explanations, bookmarks, reflections, retries and error notebook.
- A 12-question diagnostic, 40-minute sectionals, and a 68-question/120-minute practice template with three locked sections. Answer recovery uses session storage in the same tab. MCQ scoring is +3/−1; numerical-entry scoring is +3/0. No percentile prediction.
- Editable day-by-day planning: target date, study budget, starting time, lighter day, checkboxes, daily reflections, seven-day calendar export and complete text-plan export.
- Custom study/break countdowns, pause/resume, refresh recovery, and saved focus minutes. One timer tab is supported; there is no alarm or system notification.
- Arithmetic calculator with a restricted parser (no `eval`), percentage-change and average helpers.
- Revision cards, progress export/restore, exam guidance, and a ten-site reference shelf.

## Data and privacy

Notes and progress use localStorage in the current browser. They are not uploaded or synced to another device. Export a JSON backup in My progress or My preferences; restore it in My preferences. Clearing browser data deletes local progress. Personalization does not provide authentication: the site's static content and Anushka’s name are public to anyone with access to the website.

The initial 180-day plan is an editable planning template. It does not assume a CAT year or official exam date. Schedule times are local to the browser. Five-minute transitions are additional to the daily study budget. Mock-analysis work may need the following day when a full mock uses the entire daily budget.

## Content and references

All educational material is original. The questions are foundational/intermediate practice, not official previous-year papers or statistically calibrated mocks. The 68-question template is based on a recent format; current-year rules must be verified with the official CAT authority.

The ten reference destinations are Official CAT, IMS, T.I.M.E., Career Launcher, Cracku, 2IIM, Rodha, MBA Pathshala, iQuanta and CATKing. They are not presented as a ranked top ten. Live research was attempted but blocked by the cloud network policy. Their current offerings have not been verified, and no coaching content was copied. Required domain additions were saved in the cloud environment draft; saving does not apply or publish those changes.

## Validation

JavaScript syntax checks:

```sh
node --check app.js
node --check content.js
node --check personal.js
```

Browser validation covered lesson search/completion/notes, MCQ and numerical-entry feedback, persisted daily completion, calendar exports, study-budget allocation, calculator errors and helpers, timer pause/refresh/completion, diagnostic recovery, full-mock section locking and automatic transitions, bookmarks and notebook, and all 14 routes at desktop, tablet and phone widths.
