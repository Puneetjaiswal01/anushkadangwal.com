# CAT Universe content and learning audit

Checked on 26 October 2026. The website is a static application with a question library and browser-local progress, rather than a server database. No private user notes or browser data were accessed during the audit; tests used isolated browser fixtures.

## Findings and changes

| Finding | Correction |
| --- | --- |
| Several algebra, number-system and geometry topics had only one or two questions. | Added 24 original QA questions, including 12 numerical-entry problems, across 12 topics. |
| Reading-habit guidance had no directly linked practice. | Added two original reading passages with eight linked questions, including reading-strategy applications. |
| Additional reasoning depth was useful. | Added four linked DILR sets (16 questions) covering constrained scheduling, three-set overlap, integer production optimisation and reconstructing a league from scores. |
| Verbal drills needed more variety. | Added eight original summary, ordering, completion and reasoning questions. |
| Growing the bank would otherwise change seeded named papers. | Froze all 25 existing paper selections in `paper-bank.js`; question IDs and ordering remain stable. |
| Completed tests saved totals but lost the answer review after leaving the result screen. | New submissions retain question snapshots, answers and explanations. They can be reopened, filtered and downloaded. Detailed reviews are retained for the latest 20 tests; every score summary remains. |
| Older imported questions lacked an explicit question-type field. | Normalised them as MCQs and normalised snapshots of resumed older tests, so they can be reviewed and exported safely. |
| Mistakes had no scheduled follow-up. | Added a revision queue with 1-day review for misses/uncertainty, and 3/7/14/30-day intervals for successive correct attempts. |
| Library breadth was difficult to inspect and questions could not be searched by text. | Added a content map with actual question counts and topic-level learning/practice links, plus question/passage search and an answer-type filter. Counts describe content, not mastery. |

The resulting bank has **272 questions: 110 QA, 80 VARC, 82 DILR**. It includes 28 numerical-entry questions, 10 original reading passages and 16 linked DILR sets. Every one of the 40 guides has at least one question linked to its topic. Questions remain foundation/intermediate practice, without statistical difficulty calibration or percentile predictions.

## External checks

The syllabus comparison used publicly accessible pages:

- [2IIM syllabus outline](https://online.2iim.com/cat-syllabus.shtml) — retrieved successfully; algebra, geometry, probability, verbal and reasoning coverage checked.
- [Cracku 2026 syllabus guide](https://cracku.in/cat-exam-syllabus-2026/) — retrieved successfully; overlapping topic categories checked.
- IMS, T.I.M.E., Career Launcher, Cracku and 2IIM home/preparation pages were reachable during this audit. This is not an evaluation or endorsement of their courses.
- The older IMS blog URL `/blog/cat/cat-syllabus/` returned HTTP 410. It is not linked as a source in the application; the valid IMS homepage remains in the reference shelf.
- The [official CAT site](https://iimcat.ac.in/) returned HTTP 403 to automated retrieval. Current-year official dates and rules were therefore not independently confirmed, and the site continues to use a personal planning deadline rather than an assumed exam date.

No coaching questions, paid lessons or copyrighted passages were copied. New questions, explanations and passages are original.

## Verification

- Question data: valid types, answer indices, unique MCQ options, finite numerical answers and worked explanations.
- New DILR answer keys: independently enumerated feasible schedules, production plans and tournament outcomes.
- Existing named papers: unchanged IDs/order, no repeated question within a paper, stable selections.
- Learning flows: saved reviews after reload, correct/incorrect/unanswered filters, analysis download, revision scheduling, uncertainty adjustments and persisted due dates.
- Storage: review-retention cap preserves all summaries; export/restore retains reviews and rejects malformed review data. Earlier-site migration remains covered.
- UI: all 19 routes checked at desktop, tablet and phone widths; existing timer, calculator, schedule, tests and notes remain in the regression suite.

Core content and tools need no account or external API. Progress remains local to the browser, with manual export/restore for backups and device changes.
