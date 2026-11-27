# Humanology 5.2 prototype

A runnable, mobile-first HTML prototype built on the 5.1 baseline. It is wired to the 2026-11-26.4 scientific catalog: 56 routines, 75 scoped results, 9 schedules and 146 publications. 5.1 is kept unchanged in `baseline/` for direct comparison.

## How to open it

1. Keep `Humanology-5.2.html` and the folder `Humanology-5.2-assets/` side by side. The paintings load from that folder by relative path. The catalog is embedded in the HTML, so there's no fetch and no server.
2. **On a computer:** double-click `Humanology-5.2.html`. Chrome, Safari, Edge and Firefox all work.
3. **On an iPhone:** copy both items into one folder in the Files app (iCloud Drive or On My iPhone). Tap the HTML file, then Share → Open in Safari. Or serve the folder from any static host and open the page in Safari. Add to Home Screen for a full-screen feel.
4. The app opens on Welcome for a new person. If 5.1 was used in the same browser, 5.2 migrates that saved state once on first open. 5.2 saves under its own key (`humanology-v52:state`), so 5.1 keeps working unchanged.
5. **Review tools:**
   - Settings → **Circle trial (review)** shows the 44/48 px circle comparison.
   - Settings → Display → Text size switches to Large or Larger.
   - Sample scenarios can be loaded from the browser console, for example: `localStorage.setItem('humanology-v52:state', JSON.stringify(HM.scenario('established'))); location.reload()`.

### Rebuild

`python3 tools/build52.py` regenerates the HTML from the 5.1 baseline, `catalog/catalog.json` and the layer in `src/`.

To regenerate the art derivatives:

1. Put the 98 Drive PNGs in `art-src/`.
2. Run `python3 tools/make_heroes.py art-src work/hero-all`.
3. Run `python3 tools/make_thumbs.py art-src Humanology-5.2-assets/art/thumb`.

`art-src/` and `work/` aren't committed, to keep the repository small.

## What changed from 5.1

**One canonical catalog**
- `catalog/catalog.json` is embedded once (`#catalog52`). Every screen resolves cards, benefits, schedules and publications by ID.
- A small adapter (`buildCat52`) gives the 5.1 renderers the shape they expect, so Today, plans, progress, social and rewards keep working.
- No screen has its own hand-written copy of habit text. Even the short labels under tiles now use the catalog title.
- The supplied `recommend.mjs` selector is embedded verbatim. Parity is proven by test.

**Explore**
- All 56 titles are listed, with search and goal filters, plus an "Everyday care" filter for the 12 routines with no goal.
- Cards lead with title and action, then time, then the evidence label for the one result shown ("Strong evidence · for lower systolic blood pressure…").
- The five-bar Effort cue appears only where 5.1's editorial rubric rated an exact-match habit. Other routines say "Not rated".
- Restricted routines show a neutral preview ("For some people · check fit") with no add button until the person confirms they fit.
- The drink swap shows its action and drink tracking prompt instead of a benefit.
- Filter and scroll position are restored on return.

**Detail**
- Sections: what to do, time and frequency, tracking question, studied population, qualifications, and a "Before you start" safety box.
- The fit check covers exclusions ("Do any of these apply?"), confirmation of the studied population, professional clearance for the 6 clinician-clearance cards, and population-specific results such as type 2 diabetes. It's stored only on the device.
- Choosing a schedule updates the action, time, results and their sources together. A diabetes-only schedule stays locked until the person says it applies.
- Each result shows its plain-language label, population, comparator, timeframe and its own sources.
- The research view shows the card's `research_summary` and every source with its card-specific note, grouped as direct evidence, broader context, or mixed/null results.
- `research_only` statements appear only in research details.

**Onboarding**
- Multiple goals, per-goal refinements, the time screen (four ranges in the approved order and colors), the four activity choices, editable answers and back navigation are all kept.
- Recommendations come from the supplied selector, then are shaped by activity and time preferences. Several distinct matches are shown one large card at a time, with a peeking next card, swipe, arrow buttons and "1 of N". The final card has no next edge, and a single card has no pagination.
- Each card lists one supported reason per matched goal, so a card matching two goals shows both.
- The time budget is a combined estimate of the stated minutes only. Routines without a stated time are disclosed, never guessed. Conflicts open a swap / add anyway / keep my time choice.

**Today**
- The 5.1 order is kept, plus a short "due" panel: a logging reminder and a check-in prompt. Each can be dismissed for the day and shows its completed state on return.
- A "You might also like" section explains each pick ("Matches your goal: Sleep & recovery…") using the same eligibility rules, with a "Not for me" option that has undo.
- The focal card shows the full painting. Circles use separate thumbnail derivatives.
- The 48 px trial is adopted:
  - Done today uses 48 px circles with the check on the outer edge.
  - The seven-day row starts at 36 px and narrows on small screens.
  - Each day is a 48 px-high target that opens that day's habits, with "Mark done" for missed days and Undo for done ones.
  - Opening a completed habit shows the full scene and name, with history and undo.
- Points stay on Today. Credit is counted once per completion, including on repeated taps, undo/redo and reload.

**Progress and health**
- History is still measured against planned occurrences, and schedule edits keep the past.
- "Looks helpful" became "Change noticed" with neutral wording.
- Health history now states the metric, unit, date range and comparison period, and counts missing days.
- Resting heart rate is compared only when both periods have readings on most days.
- HealthKit stays simulated and the sample data is labeled.

**Social and rewards**
- The private invitation-to-challenge flow, circles, encouragement and personal-habit labels are kept. Invite previews show the result's own evidence label.
- Rewards marks the categories as samples. A new Points history labels demo points as "not money".

**Migration from 5.1**
- 32 exact matches (`MIG52`) map old IDs to card IDs. Unmatched habits stay viewable under their original 5.1 titles, with history kept and no research claims, and never enter recommendations.
- An exact match to a restricted card is paused until the person confirms it fits.

**Art**
- 98 paintings were audited. Each has a hero derivative (caption strip removed, margin trimmed) and a hand-chosen circle crop.
- Results: 33 cards pass, 1 is circle-only, 17 need new art, and 5 have access issues. Placeholders are quiet painted shapes.
- See `ARTWORK-NEEDED.md` and `CARD-ART-MAPPING.md`.

## Tests run

| Check | Result |
|---|---|
| `node catalog/verify.mjs` | All three verify blocks pass |
| `node tests/parity.mjs` | Embedded catalog identical to `catalog.json`; selector source verbatim; identical output for 3,000 random option sets |
| `node tests/e2e.cjs` (Playwright, 390 px unless noted) | **59 / 59 pass** ([full list](tests/e2e-results.txt)) |

The e2e run covers:
- **Catalog:** 56 unique cards and titles, 75 benefits, 9 schedules, 146 publications, every reference resolving, https links.
- **Explore:** all 56 listed, neutral previews, untargeted routines, drink-swap tracking, search/filter return position.
- **Eligibility:** exclusions, confirmation, clinician clearance.
- **Evidence:** schedule switching that updates action, time, benefits and sources; research-only scope; the left-side device caveat; source grouping.
- **Journey:** multi-goal onboarding → add → Today → complete → repeated tap → undo → redo → reload → history; due prompts; reasons tied to goals.
- **Layout:** the week row at 320, 375 and 390 px with default and larger text; multi-habit, empty and missed days.
- **Migration:** a returning 5.1 user with matched, unmatched and restricted habits, with 5.1 data left untouched.
- **Other features:** private challenge, rewards sample, health ranges, every screen rendering, no missing images, no failed requests, no console errors.

Screenshots are in `screenshots/`: onboarding, Today, Explore, detail, research, progress, health, the circle trial at 320/375/390, and circles in context.

## The 48 px circle trial: findings

Done today at 44 vs 48 px, with cooking, kiwi and the after-meal walk:

| Approach | Result |
|---|---|
| Whole painting fitted in the circle | Fails. The figure is a speck at 44 px. |
| Centered face crop (the 5.1 approach) | Fails. Three near-identical faces. |
| Action crop | Passes for cooking (pan, vegetables and working hand) and kiwi (cut fruit with its seeded center, and the spoon). The after-meal walk reads as a walking shoe, with the meal timing in live text. A plate cue is optional circle art (C1). |

- **48 vs 44:** 48 px reads noticeably better and still fits five circles with no overlap at 320 px, wrapping to a second row. Adopted.
- **Seven-day row:** 36 px at 375 and 390 px. It narrows to about 28.5 px at 320 px so all seven days, labels and count badges fit, with 48 px-high tap targets.
- **Walking and food habits side by side:**
  - The two brisk-walk crops (arms pumping vs striding legs), the desk-to-walk break and the brainstorming walk are distinct.
  - Beans, oats, prunes, DASH and meal order are distinct bowls and plates.
  - Oats and prunes are the closest pair, and still readable.
- **Better crop needed:** none of the shipped crops. Bath and work-breaks were re-cropped during the trial.
- **New art needed:** the 22 hero prompts and 1 circle in `ARTWORK-NEEDED.md`.

## Limitations

- The original 5.1 project paintings weren't available: the supplied baseline has them removed, and these files aren't in Drive. That covers the stopwatches, activity cutouts, goal tiles, mood faces, rewards painting, the Current-cast sheets, and the `01`/`02`/`03`/`05`/`06` earlier references. They're listed as access issues, with stand-ins in place.
- Minutes per routine come only from what `time_commitment` states (`MINS52`). Effort is carried over only from 5.1's editorial ratings for exact matches. Everything else is shown as unknown.
- The fit check is a self-report shortcut, not a health screen, as the catalog README says.
- Tested in desktop Chromium at phone sizes, not on a physical iPhone. Safari on iOS 14+ supports the WebP paintings.
- No backend, billing, deployment, native integration or React conversion, per the brief.

## Visual revision (READ-FIRST-5.2-Redesign.md)

`Humanology-5.2-revised.html` applies the visual revision. It's built with `python3 tools/build52.py revised` from the same 5.2 layer plus `src/layer52r-*`. `Humanology-5.2.html` is kept unchanged as the "before".

- **Paintings first:**
  - Goal and activity tiles: figures fill more of the panel.
  - Recommendation card: painting 250–320 px tall (was 184–220).
  - Today focal card: 300–380 px.
  - Explore: painting on top, 220–290 px, instead of a narrow side strip.
  - Habit page: 340–440 px.
  - Buttons scroll; the carousel peek is kept.
- **Short browsing cards:**
  - Explore, recommendation and suggestion cards show a short action title (`SHORT52`), one or two topic tags (`TOPIC52`) and a time cue only when a time is stated.
  - Topics come only from the results visible for the selected schedule and audience, so "Mood" never appears on a walking card without a published mood result.
  - Restricted cards show "Check it fits you first".
  - Today has one logging reminder with one action ("Log now"). The separate mood prompt was removed; the five-face row is the only mood prompt.
- **Science one tap deeper:**
  - The habit page shows the painting, the full title, one plain benefit sentence, how to try it (and how to log it), a schedule picker and "Before you start".
  - Summary, grades, population, comparison and sources are in a closed "What does the research say?" disclosure. It stays open across schedule changes.
  - Claims, scopes, variants, citations and the research-only rule are unchanged: parity and catalog tests pass.
- **Nora's five painted faces:**
  - `m1`–`m5` from `Nora-5.1-check-in.zip`, using 5.1's original bust crop, on Today and on the check-in page.
  - The SVG stand-ins are removed in the revised build.
  - Faces are 48–64 px.
- **Mobile layout:**
  - One 16 px inset, and left-aligned titles, tags and actions.
  - Tags wrap as whole chips, and times keep their units.
  - Add this habit / Maybe later stack when they would squeeze (always at larger text).
  - Card heights grow with text.
- **Tests:** `node tests/e2e.cjs Humanology-5.2-revised.html` gives 69/69 ([results](tests/e2e-results-revised.txt)): the 59 original checks plus short cards, scoped tags, research closed by default, Nora faces loaded in order, mood save, reload and same-day edit, and the single reminder.
- **Screenshots:** comparisons at 375 px (and larger text) are in `screenshots/redesign/compare/`. Raw before and after shots at 320, 375 and 390 px, with default and larger text, are in `screenshots/redesign/before|after/`.
- **Limitation:** the brief's visual reference is the illustrated 5.1. The only illustrated copy found in Drive (`Humanology-V4-labeled.zip`, 15 MB) is over the connector's 10 MB download limit, so painting sizes were judged against the brief and the 5.2 screens rather than a pixel comparison with illustrated 5.1.
