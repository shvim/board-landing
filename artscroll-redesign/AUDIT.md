# Audit and critique: ArtScroll redesign prototype

The skills from the brief are installed in `.claude/skills/`. Each was taken from its upstream repository on Nov 22, 2026:

| Skill | Source | Licence |
|---|---|---|
| `frontend-design` | anthropics/skills | Apache 2.0 (LICENSE.txt in folder) |
| `impeccable` v4.10.0 (launcher 0.1.27) | pbakaus/impeccable | Apache 2.0 (LICENSE, NOTICE.md in folder) |
| `web-design-guidelines` v1.1.0 | vercel-labs/agent-skills | MIT (per upstream README) |

## How each was run

- **Impeccable `detect`** ran on the source files and on static snapshots of 13 rendered states: Learn, Reader, Reader in English, Reader Notes, the Aa / א popover, Settings, Library, My Stuff, History, Store, Zmanim, Siddur and Misheberach.
  - A live-URL scan was not run, because starting a local server was blocked in this environment.
  - Rendered-page rules such as tiny text and contrast still ran, because they work on the snapshots.
- **Impeccable `critique`, Assessment A** was a design review by an isolated sub-agent. It read the rubric and captured 34 screenshots. It did not see the detector output.
- **Impeccable `critique`, Assessment B** was the detector run above. It ran in the main session rather than in a second sub-agent.
- **Impeccable `audit`** scored the prototype on 5 dimensions (each 0 to 4).
- **Vercel Web Interface Guidelines** were checked rule by rule against `index.html`, `styles.css` and `app.js`.

## Scores

| | Before | After |
|---|---|---|
| Impeccable detector (rendered states) | 38 findings, 1 advisory | **0 findings** (exit 0) |
| Nielsen heuristics (critique) | 26 / 40 | not re-scored by an independent reviewer |
| Impeccable audit health | 13 / 20 (Acceptable) | 18 / 20 (Excellent), self-assessed |
| WCAG contrast (`contrast-check.js`) | 33 / 33 pass | 33 / 33 pass |

Audit dimensions before → after:
- Accessibility: 2 → 4
- Performance: 3 → 3
- Theming: 3 → 4
- Responsive: 2 → 3
- Implementation integrity: 3 → 4

## What was fixed

### Detector findings
- **Side stripe:** the book-cover spine shading was an inset side stripe. Covers now have a full gold frame and a soft drop shadow.
- **Cramped padding:**
  - The reader toolbar's hairline is gone.
  - Settings groups have an inset, and rows are 56px with 8px padding.
- **Skipped headings:** Store and Zmanim jumped from h1 to h3. Their headings are now h2.
- **Em-dash saturation:** the English view no longer joins each Hebrew lead to its English with a dash. The Hebrew lead now sits on its own line.
- **Undersized text:** cover volume labels went from 10px to 11px.
- **Repeated text:** the theme previews in the display popover repeated their sample text three times. That text is removed.

### Bugs from the critique, each confirmed by script after the fix
- **Note drafts were lost** when moving to another passage. Notes now save as you type, with a quiet "Saved to My Stuff" line.
- **The loading skeleton rendered one column.** The cause was an HTML string cut in half.
- **Text size had no effect in side-by-side.** The side layout now multiplies the user's size instead of replacing it.
- **Portrait:** a tapped passage ended up under the study panel sheet. It now scrolls into the visible half.
- **Esc did not leave focus mode.**
- **The hidden sidebar stayed in the Tab order.** It is now `inert`.
- **The resume card contradicted itself**, saying "stopped at line 1" next to "earlier tonight 3b, 4a".
- **Mirror:** the status bar stayed vellum over the black camera screen.
- **"Rashi has nothing on this line"** overstated what matching by opening words can promise. The message is softer, and a new "Show all Rashi and Tosafos on this daf" view lists everything.

### Design issues from the critique
- **Rashi and Tosafos were too small.** They were 12.5px on the daf, against the 15px in the plan. They are now 15px and follow the text size.
- **The page was over-tinted:**
  - The current passage is now a wash plus a gold underline.
  - Linked commentary is a gold underline instead of a fill.
  - Hover has its own token.
  - The ochre highlight, which could not be told apart from the wash, is replaced by heather.
- **Undo for destructive actions:** removing a Misheberach name and moving or removing the ribbon now offer Undo.
- **Finishing a daf now does something.** The end of each daf has "Continue to 3b". On today's daf it also offers "Mark Daf Yomi done", with Undo and tomorrow's daf.
- **The core gestures were explained only in a 13px footer.** A first-run tip now covers tapping a passage, hiding the controls and pressing Esc.
- **Sidebar:**
  - Library and Tools start collapsed.
  - Pinned volumes moved up under Learn.
  - In portrait the sidebar slides over the content instead of squeezing it to about 370pt.
- **Naming:**
  - "Line" became "passage", because a Vilna learner reads "line" as a printed line.
  - "Inspector" became "study panel".
- **Contents** is a popover from the toolbar (the iPad idiom) instead of a modal.
- **Text size and theme are in Settings too**, so an older user can find them without opening a book.
- **Keyboard:**
  - Left and Right turn the daf in the book's direction.
  - 1, 2 and 3 switch the study panel tabs.
  - Each Gemara passage can be focused and selected with Enter.

### Vercel guideline items
- **Buttons and links:**
  - Clickable `div` rows are now real `<button>`s, 11 rows in total.
  - The Today row no longer nests a button inside another button.
  - Sidebar entries are `<a href>`, so a modifier-click works.
- **Dialogs:** they move focus in, trap Tab and return focus on close.
- **Live region:** `#main` no longer re-announces the whole screen on every render. Notifications use the toast's `role="status"`.
- **Forms:** inputs have `name` and `autocomplete="off"`, Hebrew name fields turn off spellcheck, and placeholders end with "…".
- **Motion:**
  - The sidebar and study panel no longer animate margin, height or other layout properties. Only `transform` and `opacity` animate.
  - Reduce Motion now drops movement but keeps colour and opacity feedback, instead of a global kill.
- **Browser surfaces:**
  - Themed text selection, text cursor and scrollbars.
  - `theme-color` and `color-scheme` metas.
  - `touch-action: manipulation` and `overscroll-behavior: contain` on scroll panes.
  - `text-wrap: balance` on titles.
- **Page:** a skip link, and the URL now reflects the screen, daf and layout through `?screen=…`.

## Deliberate deviations, not fixed

- **Title Case (Vercel):** kept as sentence case. Both the brief and `frontend-design` ask for it, so the guidelines conflict here and the brief wins.
- **Hard-coded dates:** the prototype runs on a fixed mock clock, the time of the recording (8:45 PM, Saturday Nov 21). Hebrew dates, the Luach and Zmanim are computed with `Intl`.
- **One ribbon per volume:** this matches a printed volume's single ribbon. Bookmarks cover additional places.
- **Not built in the prototype:**
  - Swipe to turn pages.
  - Links to Maharsha and other mefarshim.
  - Real verse search for names.
  - The Store's online state.
- **Still open from the critique:** whether the reader's unit should be the printed line (*shura*) of the Vilna page rather than an editorial passage. This needs user testing with Daf Yomi learners.
