# Direction B: tallis and tekhelet

An unofficial concept, not affiliated with ArtScroll or Mesorah Publications. It has the same screens, behaviour and content as direction A (`../artscroll-redesign`), with a softer, more modern visual system. `soft.css` loads on top of the shared `styles.css`.

## Idea

Direction A came from the leather binding. Direction B comes from the tallis: wool-white ground, blue-black stripes, and one thread of tekhelet. It is calmer and cooler, with rounded floating panels in the iPadOS style. The memorable element is still the place marker, now drawn as a tekhelet thread instead of a gold ribbon.

## Tokens

| Token | Linen (default) | Mist | Night | Role |
|---|---|---|---|---|
| page | #F3F4F1 | #E9EDF2 | #12151B | wool ground |
| surface | #FCFCFB | #F6F8FA | #1A1F27 | panels, page, study panel |
| ink | #1F2430 | #1E2633 | #E4E8EF | body text, all Hebrew |
| ink-2 | #5A6170 | #556073 | #9AA4B4 | secondary text |
| accent | #34507F | #304B79 | #9DB5DE | tekhelet: selection, links, primary button |
| thread | #6886B9 | #6585BA | #7F9CCB | place marker, progress, current-passage underline |
| wash | #DEE7F4 | #D5E0F0 | #24324A | the passage you're on, the resume panel |

`contrast-check.js` passes every pair: ink at least 7:1, ink-2 and accent at least 4.5:1, thread at least 3:1.

## Type

- **Albert Sans** for UI and titles: 600–650 weight titles with slightly tight tracking. On a real iPad, SF Pro would carry the controls.
- **Source Serif 4** for the English.
- **Frank Ruhl Libre** for the Gemara.
- **Noto Rashi Hebrew** for Rashi and Tosafos.

## Shape

- **Radii by role:**
  - 999 for controls and the floating reader toolbar
  - 22–24 for panels and sheets
  - 18 for lists
  - 12 for rows
- **Elevation:** surfaces sit flat on the wool ground. Only true overlays (popovers, sheets, the overlay sidebar) carry a shadow.

## Checks

Impeccable `detect` reports 0 findings on 13 rendered states. One rule is waived: `cramped-padding` on the reader toolbar. Measured in the live render, each control sits 10px from the pill's edge, so the finding is a false positive from the static snapshot. The behaviour checks from direction A's audit all pass here too.
