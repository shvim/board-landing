# ArtScroll Digital Library — iPad redesign (concept)

This is an unofficial redesign concept. It is not affiliated with or endorsed by ArtScroll / Mesorah Publications.

Inputs: the 28-state App State Report (iPad recording, Nov 21 2026) and the research brief
"Design Skills, Warm Palettes, iPad Patterns and a Recommended Direction". Process follows the
frontend-design skill (plan first, check against the AI clusters, build, critique), with
Impeccable and the Vercel guidelines used as the audit floor.

## Concept: the bound volume, opened

Every decision traces back to the printed volume: oxblood leather, a gold-stamped rule, a page
with real structure. The one bold element is a **gold ribbon**, used only to mark where you
are: on the resume card, on the daf itself, and in the table of contents. Everything else stays quiet.

## Tokens

| Token | Vellum (default) | Parchment | Lamplight | Role |
|---|---|---|---|---|
| page | #F7F2E8 | #EFE4CF | #1A1714 | reading surface, app ground |
| surface | #FBF8F1 | #F5ECDB | #24201C | sidebar, popovers, inspector |
| ink | #2A211C | #3B2A1E | #E6DCCB | body text, all Hebrew |
| ink-2 | #6B5E54 | #6E5A47 | #A89A88 | secondary text only, never Hebrew body |
| rule | #E2D8C8 | #DCCDB3 | #3A332C | hairlines, selected-row tint |
| oxblood | #7A2430 | #6E2A2A | #C98B7E | the accent: selection, links, primary button |
| gold | #A8822E | #9A7628 | #C9A55C | ribbon, progress. Never text on page |
| wash | #F1E1A6 | #E8D59A | #4A3F22 | the line being translated |

Ratios are checked by `contrast-check.js` (WCAG relative luminance); see the table it prints.

## Type

| Role | Face | Size / line |
|---|---|---|
| Screen title | Newsreader, regular | 34 / 40 |
| Section heading | Newsreader, medium | 22 / 28 |
| English elucidation | Literata | 19 / 30, measure ≤ 70ch |
| Gemara Hebrew | Frank Ruhl Libre | 23 / 38 (translation view) |
| Rashi / Tosafos | Noto Rashi Hebrew | 15 / 26 on the daf, 18 / 30 in the inspector |
| UI | system (SF Pro on iPad) | 17 body, 15 secondary, 13 caption |

Taamey Frank CLM is the production recommendation for vocalised text (licence check needed);
Frank Ruhl Libre stands in here because the prototype text is unvocalised Vilna.

## Layout

```
LANDSCAPE — browsing                        LANDSCAPE — learning
┌──────────┬───────────────────────────┐    ┌──────────────────────────┬────────────┐
│ Learn    │ Learn                     │    │ ‹ □ ≡   ‹3b  Arachin 3a  2b› Aa ⌕ ▯ │
│ Library ▸│ ┌ Arachin 3a ─────────▮┐  │    │                          │ Translation│
│ Siddur   │ └ Resume ── gold ribbon┘  │    │  daf: Tosafos│Gemara│Rashi │ Notes      │
│ My Stuff │ Today (list)   Plans      │    │  current line wash       │ Commentary │
│ Tools   ▸│ Recently downloaded shelf │    │                          │            │
│ History  │                           │    └──────────────────────────┴────────────┘
│ Settings │                           │
└──────────┴───────────────────────────┘
PORTRAIT — learning: daf full-bleed, inspector becomes a bottom sheet (half / full),
sidebar slides over. Tapping the page hides the toolbar; tapping again brings it back.
```

## Principles

1. **Chrome leaves while you learn.** Three toolbar groups, no icon strips, no banner on every page.
2. **Settings live where their effect is visible.** The Aa / א popover holds theme, size, layout,
   commentary and the line wash. The Settings screen keeps only account, storage, siddur,
   reminders and advanced items.
3. **Every state says what happened and what to do next.** No system alerts for offline,
   location or sign-in; each is an inline state on the screen it affects.
4. **Hebrew is never second-class.** Larger than English, ink colour only, aligned by its own
   direction inside an English UI.

## Checked against the AI clusters

- *Cream + serif + terracotta:* the ground is vellum (#F7F2E8, yellower than #F4F1EA), the accent is
  oxblood from the binding, and there is no clay or terracotta anywhere.
- *Broadsheet with hairlines and zero radius:* the only zero-radius element is the daf itself, which
  really is a page. Radii are 10 (sheets), 8 (cards), 6 (buttons), 0 (page).
- *Gradients, glass, glow, purple:* none. Flat surfaces, one shadow for floating sheets only.
- Banned tells removed: no ALL-CAPS eyebrows, no "A · B · C" meta strings, no arrows on buttons,
  no side-stripe borders, no identical card grids. Home is a resume card, a list and a shelf.
- "Would I have produced this for any warm reading app?" The ribbon, the Vilna-structured daf,
  the book-direction daf chevrons and the dual-calendar date line are specific to this product.

## The 28 recorded states, mapped

| # | Today | Redesign |
|---|---|---|
| 1 | Home: tiles, boxed lists, quick-nav buttons | **Learn**: one resume card with the ribbon, "Today" list with done ticks, plan templates, cover shelf |
| 2–3, 21, 25 | Hamburger menu, 40+ rows, red section bars | **Sidebar**, two levels: Learn, Library ▸, Siddur, My Stuff, Tools ▸, History, Settings; pinned volumes |
| 4 | History modal with Sync button | **History** screen; By date / By volume; sync is automatic and stated in a footer |
| 5 | "Which Siddur would you like to open?" alert | **Siddur** screen asks once inline, remembers, switch edition from the title menu |
| 6–10 | Settings, ~50 toggles | **Aa / א popover** in the reader + a short grouped **Settings** screen |
| 11 | Zmanim "LocationUnknown / Please Wait…" | **Zmanim** asks for location in context, with a city list fallback; times are computed |
| 12–14 | Vilna page under toolbar and per-page dedication | **Reader**: full-bleed daf, dedication only in the volume's contents |
| 13 | "Loading hebrew xml" | Quiet skeleton lines in the page shape, no developer wording |
| 15 | Right-edge icon strip | Removed. Actions are in the inspector and the toolbar's three groups |
| 16 | TOC panel | **Contents** popover: chapters, daf rows, ribbon and current-page marks |
| 17 | My Stuff modal | **My Stuff** screen: Notes, Highlights, Bookmarks, Ribbons; tags as filters |
| 18–20 | Split views with yellow line and Notes window | **Side by side** layout + trailing **inspector** (Translation, Notes, Commentary), synced line wash |
| 22–23 | Camera alert over black screen | **Tefillin Mirror** explains first, then asks; guide lines in theme colours |
| 24 | Blue Misheberach sign-in panel | Same sheet surface as everything else; works without an account, sign-in only adds sync |
| 26 | Compass over Kotel photo | Clean **Mizrach** dial |
| 27–28 | Blank Store, then "Error" alert | Inline offline state naming cause and fix; Library still opens |

## Content sources

Gemara (Vilna text via Wikisource, CC BY-SA), Rashi and Tosafos (Vilna edition, public domain),
retrieved through the Sefaria API. English translation and notes for Arachin 3a are original
to this prototype, written in the bold-literal / plain-elucidation convention. Names, dedications
and user data in the prototype are fictional.
