# Fix List vol 2: landing appendix verification

2026-09-08. Base: `0135dc08f596f5a0137b8c1da2f3cb9d415ea1ed`.

Only reproduced mobile overflow was changed. This branch does not deploy GitHub Pages.

## Corrections and evidence

Real Chrome, with measurements from the rendered DOM:

| Check | Before | After |
| --- | --- | --- |
| 390 CSS px viewport, 371 px page content width | Page scroll width 432 px; SketchUp integration children extended to x432.21 | Scroll width 371 px; all integration columns end at x349.26 |
| 320 CSS px viewport, 301 px page content width | Collaboration phones extended from x−1.69 to x302.70 | All three devices fit between x25.45 and x275.55 |
| 780 CSS px viewport, 761 px page content width | Not measured before | Page scroll width 761 px; collaboration devices fit x79.90–681.09 |
| Desktop, 1890 CSS px viewport | Existing two-column design | Page scroll width equals content width 1871 px; two equal 536 px columns remain; visual screenshot reviewed |

Integration grid tracks now allow their contents to shrink. Collaboration devices size against their padded containing row, rather than the wider viewport.

The browser's viewport override used a site zoom offset, so the sizes above are measured `innerWidth`, not assumed from the requested override. The override was reset after testing. Mobile screenshots after scrolling disagreed with the DOM and showed blank regions; no additional defects were inferred from those screenshots. Mobile geometry is verified; full mobile visual sign-off remains pending a reliable capture or physical-device pass.

## Other appendix dispositions

- Mobile navigation drawer: not reproduced; opened before and after scrolling, with bounds inside the page width.
- Hero dashboard frame clipping: not independently reproduced. Its intentionally fixed preview frame remains unchanged.
- Hero caption: already hidden on phones in existing source; no change.
- How-it-works opacity: source already has active-step animation and no-animation fallback. Synthetic anchor navigation returned dim steps; screenshot evidence was unreliable, so no speculative animation change.
- Pinterest icon: source already applies white image filtering; no change.
- Fixed nav backdrop: existing blur and scroll handler confirmed; desktop scrolled screenshot shows nav treatment.
- Pricing: existing anchor and early-access copy confirmed; no change.
- Heading/paragraph alignment: integration grid overflow corrected as measured above; no unrelated typography changes.
- Branding, collaboration promises, Google Play and mock content: founder decisions; unchanged.

No package.json, AGENTS.md, build script or test suite exists in this static landing repository. Inline CSS was parsed with PostCSS, inline JavaScript syntax checked with Node, and `git diff --check` passed in addition to the Chrome checks above.
