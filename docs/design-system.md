# Loupe Design System v1.2

Version 1.2 · 29 October 2026 · Source of truth for all Loupe UI.
Visual reference: `docs/design-reference.html` (open it in a browser; every element is drawn with these exact values).

## The rule

**Loupe is black, gray and white. Peach appears in exactly six places. Red appears only for delete and errors. Nothing else gets a color.**

This file assigns an exact color, size and weight to every element in the product: the web dashboard, mobile, the Chrome extension, the iOS share extension, and the Figma and Canva plugins.

- **Replaces:** every earlier design doc (v1.0, v1.1, all Board 2.0 docs). If code or an older doc disagrees with this file, this file wins.
- **Self-contained:** the full token file is below. Nothing here depends on an older file existing in the repo.
- **If an element isn't listed:** copy the closest listed element. If nothing fits, use white or gray, never peach. Note the decision in your report so it can be added here.

## The whole palette

The whole product UI uses 14 values: 3 surfaces, 5 text levels, 3 lines, 1 white state, 1 peach, 1 red. Hover and press are not separate grays: they are a white veil laid over whatever surface is underneath.

### Surfaces

| Token | Value | Used for |
| --- | --- | --- |
| `--lp-bg` | `#0e0e0e` | Page background, phone tab bar, extension popup body, behind contained images |
| `--lp-surface` | `#141414` | Sheets, modals, card backs, toasts, chips and inputs at rest |
| `--lp-raised` | `#1c1c1c` | Secondary buttons, action tiles, custom tag pills, menus and dropdowns |

### Text and icons (white at set opacities)

| Token | Value | Used for |
| --- | --- | --- |
| `--lp-fg-1` | `#ffffff` | Titles, headings, active chip and tab text, selected things |
| `--lp-fg-2` | `rgba(255,255,255,0.85)` | Body text, button labels, icons at rest, primary tags |
| `--lp-fg-3` | `rgba(255,255,255,0.60)` | Descriptions, detail tags, mood tags, source domain |
| `--lp-fg-4` | `rgba(255,255,255,0.40)` | Labels, dates, counts, placeholders, inactive tabs |
| `--lp-fg-5` | `rgba(255,255,255,0.25)` | Disabled text, tag separators |

### Lines

| Token | Value | Used for |
| --- | --- | --- |
| `--lp-line-1` | `rgba(255,255,255,0.06)` | Dividers, hairlines, nav bottom border |
| `--lp-line-2` | `rgba(255,255,255,0.12)` | Chip, input, toast and menu borders |
| `--lp-line-3` | `rgba(255,255,255,0.30)` | Active chip border, input focus border, color swatch rim |

### State, brand, danger

| Token | Value | Used for |
| --- | --- | --- |
| `--lp-active-bg` | `rgba(255,255,255,0.12)` | Active chip, active view segment. Hover veil is half of this (0.06). |
| `--lp-peach` | `#EF8A66` | The six brand places only (next section). Hover `#F29A79`, press `#D77C5C`. Text on it `#1A0F0A`. |
| `--lp-danger` | `#FF6B5E` | Delete, errors, the error rail on toasts. Fill behind a danger button: `rgba(255,107,94,0.12)` |

There is no green, blue or yellow in UI chrome. Success is white text and a check. Image palettes, color chip swatches and board covers are the user's content, not UI, so they show whatever color the image has.

## Peach: six places, nothing else

There is one peach, vivid peach `#EF8A66`, and it is always flat. No darker shade, no browner shade, no gradient, no opacity, no tinted backgrounds. If an element looks "peach-brown", it is using an old value (`#E38C6F`, `#D97A5A`, `#E67E4A`, `#b85a28`) or a gradient, and that is a bug.

| # | Element | Where | Spec |
| --- | --- | --- | --- |
| 1 | Logo: dots and app icon | Every surface; app icon and favicon everywhere the product is installed or bookmarked | Dots: flat `#EF8A66`, wordmark white. App icon and favicon: flat `#EF8A66` square with a `#0E0E0E` circle in the middle (next section). |
| 2 | Avatar | Dashboard top-right, phone top bar, hamburger footer | **Circle** (not a rounded square), 34px desktop / 30px phone. Flat `#EF8A66` fill. Initials `#1A0F0A`, DM Sans 600, 13px desktop / 12px phone. No border, no gradient, no shadow. |
| 3 | FAB (the + button) | Phone only | 56px circle, flat `#EF8A66`, Plus icon 26px in `#1A0F0A`. |
| 4 | Save button | Chrome extension only | Flat `#EF8A66`, label `#1A0F0A` 600. The same button is Save in crop and annotate modes. |
| 5 | Annotation strokes | Chrome extension drawing tools | 3px strokes in `#EF8A66`. The toolbar itself is white and gray. |
| 6 | Marketing CTAs | Landing, sign-in, pricing only | The only place a gradient is allowed: `#F4AE93 → #EF8A66 → #D3714F`. No glow. |

### App icon and favicon

The mark everywhere the product shows up as an icon: a flat peach square with a black circle dead center. Nothing else on it. No wordmark, no letter, no gradient, no shadow, no ring, no second dot.

| Part | Spec |
| --- | --- |
| Square | Flat `#EF8A66` |
| Circle | `#0E0E0E`, centered, diameter 40% of the square's width (r = 20 on a 100 grid). Always a true circle |
| Corners (favicon, extension toolbar, web manifest "any") | Square corner radius 22% of its width |
| Corners (iOS app icon, Android adaptive, anything the OS masks) | None. Supply a full-bleed square and let the OS round it. Never bake in corners or a border |
| Smallest size | 16px. The circle stays 40% at every size, never thicker at small sizes |
| Dark and light tabs | Same icon on both. No light-mode variant |

Master files are in `docs/assets/`: `loupe-app-icon.svg` (full-bleed, for the OS-masked cases) and `loupe-favicon.svg` (22% corners, for everything else). All PNG sizes are exported from those two, never redrawn.

```svg
<!-- loupe-favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#EF8A66"/>
  <circle cx="50" cy="50" r="20" fill="#0E0E0E"/>
</svg>
```

| Use | File |
| --- | --- |
| Web favicon (`<link rel="icon" type="image/svg+xml">`) | `loupe-favicon.svg`, with `favicon-32.png` and `favicon-16.png` as fallbacks |
| `apple-touch-icon` (iOS home screen from Safari) | `apple-touch-icon-180.png` (full-bleed) |
| iOS app and share extension app icon | `app-icon-1024.png` (full-bleed) |
| Web manifest icons | `favicon-512.png` (any), `app-icon-1024.png` scaled to 512 (maskable) |
| Chrome extension toolbar and store | `extension-icon-16 / 32 / 48 / 128.png` |
| Figma and Canva plugin icons | `favicon-512.png` |

The app icon and favicon use the same peach as everything else. They are the logo, so they count as place 1, not a seventh place.

### These were peach and are now white

- **"More info" on the flipped card back:** `--lp-fg-2`, 500 weight.
- **Extension capture-mode status dot and the armed quick-save badge:** white.
- **Saved-toast status dot in the extension:** white.
- **Board auto-color "clay":** removed so it's never mistaken for the brand. Empty boards rotate through blue, sage, walnut, mauve and slate.

### Never peach, under any circumstances

Active chips, active tabs, view toggle, links, tag text, checkboxes, switches, selection circles, progress bars, spinners, the tagging pill, toasts, focus rings, crop handles, active tools, hover states, menus, dialogs, primary buttons outside the extension, and anything on the iOS share extension except the logo.

## Buttons: five kinds

The product has exactly five button kinds. The main action is **white**, everything else is gray or text, and peach is reserved for the extension's Save. There is no outline button.

All buttons share one shape: 44px tall (32px small, 50px full-width in sheets), 6px radius, DM Sans 14px, 16px icons.

| Kind | Fill | Text / icon | Hover (desktop only) | Use for |
| --- | --- | --- | --- | --- |
| **Primary** | `#ffffff` | `#0e0e0e`, 600 | `#e6e6e6` | The one main action on a screen or sheet: Done, Create board, Save to board, Confirm, Add all to design |
| **Secondary** | `--lp-raised` `#1c1c1c` | `--lp-fg-2`, 500 | + white veil 0.06 | Everyday actions: Add to board, Download, Share, Get the extension, Retry |
| **Ghost** | none | `--lp-fg-3`, 500 | white veil 0.06, text → `--lp-fg-2` | Cancel, Not now, Clear all, tertiary actions |
| **Danger** | `rgba(255,107,94,0.12)` | `#FF6B5E`, 600 | fill 0.20 | Confirming a delete. In menus, Delete is just red text, no fill. |
| **Brand** | `#EF8A66` flat | `#1A0F0A`, 600 | `#F29A79` | Extension Save only. Never a second one on screen. |

### Icon buttons

| Kind | Size | Fill | Icon |
| --- | --- | --- | --- |
| Plain | 36px, icon 18px | none, hover veil 0.06 | `--lp-fg-2`, hover `#fff` |
| On an image | 28px circle, icon 15px | `rgba(14,14,14,0.62)` + 12px blur | `#fff` |
| Toggled on (star, favorite) | same as above | same | Filled white. Never peach, never yellow. |

### States for every button

- **Focus:** 2px ring `rgba(255,255,255,0.70)`, 2px offset, keyboard focus only (`:focus-visible`).
- **Disabled:** 38% opacity, no pointer events.
- **Loading:** white spinner replaces the icon, label in present tense ("Saving…"), width doesn't change.
- **Press:** scale 0.98 for 100ms.
- **Labels:** say what happens ("Save", "Add to board"). Never "Submit" or "OK", no arrows after labels.

## Element-by-element map

Every element gets exactly these values. "Active" means selected, checked, on or current. Hover rows apply on desktop only, inside `@media (hover:hover) and (pointer:fine)`.

### Navigation

| Element | At rest | Active | Notes |
| --- | --- | --- | --- |
| Desktop top nav | `--lp-bg`, bottom border `--lp-line-1` | — | Order: hamburger, logo, view toggle, search, avatar. Nothing else. Only the top nav is sticky. |
| View toggle (All / Boards / Canvas / Clusters) | Track `--lp-surface`, border `--lp-line-1`, text `--lp-fg-4` 500 14px | Segment `--lp-active-bg`, text `#fff` | Pill radius. Canvas and Clusters never on phone. |
| Search field | `--lp-surface`, border `--lp-line-2`, placeholder `--lp-fg-4`, icon `--lp-fg-3` | Focus: border `--lp-line-3` | ⌘K hint: `--lp-raised`, text `--lp-fg-4` 11px |
| Hamburger icon | `--lp-fg-2`, 22px | — | |
| Avatar | Flat `#EF8A66` circle, initials `#1A0F0A` | — | Brand place #2 |
| Phone top bar | `--lp-bg`, 50px | — | Hamburger, small logo, item count as a bare number ("256") in `--lp-fg-4`, avatar. No box behind the logo. No search icon. |
| Phone tab bar | `--lp-bg`, top border `--lp-line-1`, icon + label `--lp-fg-4` | Icon + label `#fff` | All, Boards, Search. Icons 24px, labels 12px 500. Safe-area padding below. |
| Phone FAB | Flat `#EF8A66`, icon `#1A0F0A` | — | Brand place #3. 16px from right, 16px above tab bar. Hidden in selection mode. |
| Back link ("‹ Boards") | `--lp-fg-2`, 15px 500, chevron 18px | — | |

### Filter strip

| Element | At rest | Active | Notes |
| --- | --- | --- | --- |
| Tag chip | `--lp-surface`, border `--lp-line-2`, text `--lp-fg-2` 500 14px | `--lp-active-bg`, border `--lp-line-3`, text `#fff` | Pill, 36px tall. Sentence case ("Warm neutrals"). |
| Color chip | Same as tag chip + 12px swatch dot | Same as tag chip | Swatch rim `--lp-line-3` so near-black and white swatches stay visible |
| Favorites chip | Same as tag chip, outline star 16px | Same, star filled white | Always second |
| Filter icon chip | Same as tag chip, 40px wide, radius 10 | Same | Always first |
| Clear all | Ghost button, small | — | Only when 2+ chips are on |

Strip order: filter icon, Favorites, top 5–6 tags, top 5–6 colors. No "All" chip, no refresh icon. Multi-select is AND. Near-duplicates are deduped before display: a tag that contains another top tag ("high contrast" vs "high contrast palette") shows once, and colors in the same family (charcoal, deep charcoal, near black) show once.

### Grid tiles and selection

| Element | Spec |
| --- | --- |
| Tile | Radius 10px. No border, no background box. Gap 8px phone / 10px desktop, 8px side gutter on phone. Aspect ratio from stored width/height, clamped 2:3 to 16:9. New tiles go into the shortest column. While loading, fill with the item's first palette color. |
| Tile hover bar (desktop) | Frosted `rgba(14,14,14,0.62)` + blur, icons `#fff` 15px (Star, FolderPlus, Pin, Ellipsis). No lift, no glow, no layout shift. |
| Tile caption (desktop hover) | Gradient to black 72%, title `#fff` 13px 500, date 11px at 65% white |
| Phone tiles | Image only. No overlays, no hover. Tap opens the detail sheet, long-press enters selection. |
| Favorite marker | 28px frosted circle, filled white star 14px. Display only. |
| Tagging pill | Frosted, text `#fff` 11px, pulsing dot `#fff` |
| Selection circle | 24px, 2px `#fff` border, bottom-right, 8px inset. Selected: `#fff` fill, `#0e0e0e` check. Unselected tiles fade to 50%. Only shown in selection mode. |
| Selection pill | `rgba(28,28,28,0.92)` + blur, border `--lp-line-2`. Count `#fff` 600. Icons `--lp-fg-2`, Delete `#FF6B5E`. Done = `--lp-active-bg`, `#fff`. Floats above the tab bar and replaces the FAB. |

### Boards

| Element | Spec |
| --- | --- |
| Boards list covers | Desktop: squares, 3 across. Phone: full-width 16:10. Radius 16px, name 20px 600 `#fff` and count 13px at 70% white over a bottom gradient. ⋯ frosted icon (desktop hover only). |
| New board row | Slim row at the top. Transparent, border `--lp-line-2`, text `--lp-fg-2`, Plus 18px. Never peach, never a big card. |
| Board page header | Back link, board name 22px 600 `#fff`, "3 items" 13px `--lp-fg-4`, ⋯ icon button top-right (Edit, Rename, Delete board). |
| Board page actions | One **Share** Secondary button under the title. It opens a sheet holding the public-link switch and Copy link. No boxed panel. No switch inside a button. No "Add items" button: the FAB adds to the current board. |

### Detail view (phone sheet, tablet sheet, desktop modal)

| Element | Spec |
| --- | --- |
| Container | `--lp-surface`. Phone sheet radius 16 top only. Desktop modal radius 10. Scrim black 60% + blur 12 (phone/tablet), 85% + blur 20 (desktop). |
| Grab handle | 36×5, `rgba(255,255,255,0.6)` |
| Source line | Domain `--lp-fg-3` 13px + external-link icon 14px. Not peach. |
| Title / description | 22px 600 `#fff` (26px desktop) / 14px 400 `--lp-fg-3` |
| Action tiles (Star, Add to board, Share, More) | `--lp-raised`, radius 10, 62px tall, icon `--lp-fg-2` 20px, label 11px `--lp-fg-3`. Star on = filled white. |
| Section labels ("Palette", "Tags") | 12px 400 `--lp-fg-4`, sentence case |
| Primary tags | 15px 500 `--lp-fg-2`, "·" separators `--lp-fg-5` |
| Detail tags / mood tags | 14px 400 `--lp-fg-3` / 14px 400 italic `--lp-fg-3` |
| Custom tag pills | `--lp-raised`, radius 6, 30px, text `--lp-fg-2` 13px. Add tag: transparent, solid border `--lp-line-2`, text `--lp-fg-3`. |
| Palette strip | Image colors, joined, radius 10 at the ends. Selected underline 2px `#fff`. Name 14px 500 `--lp-fg-2`. Hex never shown. |
| Metadata | Label 12px `--lp-fg-4`, value 14px `--lp-fg-2`. Only fields that exist; never "Unknown". |
| Delete | Red text `#FF6B5E` in menus. Danger button in the confirm dialog. |

### Overlays and feedback

| Element | Spec |
| --- | --- |
| Menu / dropdown | `--lp-raised`, border `--lp-line-2`, radius 10, rows 46px, text 15px `--lp-fg-2`, icon right 18px. Hover row: veil 0.06. Delete group in red after a 6px gap. |
| Dialog | `--lp-surface`, border `--lp-line-1`, radius 10. Heading 17px 600 `#fff`, body 14px `--lp-fg-3`. Buttons: Ghost + Primary, or Ghost + Danger. |
| Toast | `--lp-surface`, border `--lp-line-2`, radius 10. Title 13px 600 `--lp-fg-2`, detail 12px `--lp-fg-3`, action text button `#fff`. Rail: white 55%, error `#FF6B5E`. Bottom-right on desktop, full width above the tab bar on phone. No peach. |
| Switch | Off: track `--lp-active-bg`, knob 60% white. On: track `#fff`, knob `#0e0e0e`. 38×22. |
| Checkbox | Off: 1.5px border 40% white, radius 6. On: `#fff` fill, `#0e0e0e` check. |
| Spinner / progress | `#fff` |
| Empty state | Heading 15px 500 `--lp-fg-3`, body 14px `--lp-fg-4`, one Secondary button |

### Chrome extension, iOS share extension, plugins

| Surface | Spec |
| --- | --- |
| Extension popup | `--lp-bg`, radius 16, 400–420px wide, 20px padding, text never below 11px. Save = Brand. Every other button follows the five kinds. Board picker rows `--lp-raised`, selected row check `#fff`. |
| Annotation toolbar | Pill `--lp-raised` + border `--lp-line-2`. Tools `--lp-fg-3`, active tool `--lp-active-bg` + `#fff`. Save = Brand. Strokes `#EF8A66` 3px. |
| Crop | Handles and border `#fff`, dim `rgba(0,0,0,0.6)`, size label `#fff` 12px |
| iOS share extension | Peach only in the logo. Change button Secondary, Done Primary. App icon is the peach square with the black circle. |
| App icon, favicon, extension icon | Peach square, black circle, nothing else. See "App icon and favicon". |
| Figma, Canva, MCP picker | Same chips, tiles, tags and buttons as the dashboard. Insert / Add all = Primary (white). No peach except the logo. |

## Typography

One font, DM Sans, in nine sizes and three weights. Untitled Sans Bold is used only in the logo wordmark. Hierarchy comes from size, weight and white opacity, never from color.

| Style | Size / line height | Weight | Color | Used for |
| --- | --- | --- | --- | --- |
| Display | 26 / 1.2, tracking −0.01em | 600 | `#fff` | Desktop detail title |
| Title | 22 / 1.2, tracking −0.01em | 600 | `#fff` | Phone detail title, page titles, board page name |
| Board | 20 / 1.2, tracking −0.01em | 600 | `#fff` | Board names on covers |
| Heading | 17 / 1.3 | 600 | `#fff` | Sheet and dialog headings, "Your library" |
| Lead | 15 / 1.55 | 500 | `--lp-fg-2` | Primary tags, menu rows, list rows, back link |
| Body | 14 / 1.5 | 400 | `--lp-fg-2` or `--lp-fg-3` | Descriptions, body text, detail tags |
| Control | 14 / 1 | 500 (600 on Primary, Danger, Brand) | per button kind | Buttons, chips, segmented toggle |
| Small | 13 / 1.35 | 500 | `--lp-fg-2` | Toast titles (600), pills, tile captions, counts |
| Caption | 12 / 1.4 | 400 | `--lp-fg-4` | Section labels, dates, metadata labels, tab labels (500) |
| Micro | 11 / 1.3 | 500 | `--lp-fg-3` | Action tile labels, ⌘K hint, tagging pill. Nothing smaller than 11px. |

### Case and wording

- **Sentence case everywhere:** "Your library", "Add to board", "Warm neutrals". No all-caps headings or labels.
- **Chips display tags in sentence case.** Capitalize only the first letter; stored tags stay lowercase.
- **Titles from tagging** are 3–4 words, title case, one line on a phone.
- **Counts are bare:** "52" next to "Your library", "3 items" on a board. Never "52 ITEMS".
- **Weights allowed:** 400, 500, 600, and 400 italic for mood tags only. No 300 or 700 in the product.
- **Success copy is past tense** ("Link copied", "Saved to Warm Neutrals"). Errors say what happened and what to do. No "Successfully", no "Oops", no exclamation marks.

## Sizes, radius, spacing, motion

| Radius | Value | Used for |
| --- | --- | --- |
| Small | 6px | Buttons, icon buttons, custom tag pills, checkboxes, ⌘K hint |
| Medium | 10px | Image tiles, inputs, action tiles, menus, dialogs, toasts, desktop modal |
| Large | 16px | Board covers, phone sheets (top corners only), extension popup |
| Pill | 999px | Filter chips, view toggle, selection pill, FAB, avatar, tagging pill |

Nothing is square-cornered, image tiles included.

| Control height | Value | Used for |
| --- | --- | --- |
| Small | 32px | Small buttons, toggle segments |
| Medium | 36px | Filter chips, icon buttons |
| Default | 44px | Buttons, inputs. Also the minimum tap area for anything touchable. |
| Large | 50px | Full-width buttons in sheets |

**Spacing scale:** 4, 6, 8, 10, 12, 16, 20, 24, 32, 48px. No other values. Core rhythm is 6 / 10 / 16. Phone side gutter 8px for the grid and 16px for text. Sheet padding 20px on phone, 32px on desktop.

**Icons:** Lucide only (`lucide-react`), stroke 1.75, sizes 14 / 16 / 18 / 20 / 24px, color follows the text color of the element they sit in.

**Breakpoints:** phone < 768px, tablet 768–1099px, desktop ≥ 1100px. Grid columns: 2 (< 800), 3 (≥ 800), 4 (≥ 1100), 5 (≥ 1400). Test at 360, 390, 430, 820, 1180 and 1600.

**Motion:** press 100ms scale 0.98; hover and color 150ms; toast enter 200ms / exit 140ms; menu 140ms; sheet enter 280ms, settle 220ms, dismiss when dragged over 120px; desktop modal 200ms (scale 0.98 → 1); card flip 600ms (desktop only); toast auto-dismiss 4.5s, 6.5s with an action, errors never auto-dismiss. Respect `prefers-reduced-motion`: keep fades, drop movement.

**Saved means durable:** show "Saved" only after the write resolves. Tagging continues in the background behind the "Tagging…" pill.

## Never re-add

Each of these was removed on purpose. If one shows up in a build, it's a regression.

- Peach on active chips, active tabs, checks, toasts, tags or links
- Old brand values: `#E38C6F`, `#D97A5A`, `#E67E4A`, `#FF9866`, `#FFD8BE`, `#E8B59A`, `#F0C4A8`, `#b85a28`, `#C9503C`, `#f5f1ea`
- Gradient or glowing buttons inside the product
- Square-edged image tiles; boxes, bands or letterbox bars around images
- Lift, glow or shadow on tile hover; any hover state on touch
- Action pills, titles, dates or board chips drawn on phone tiles; a persistent ⋯ on every tile
- Uppercase labels (PRIMARY, YOUR LIBRARY, 52 ITEMS)
- Tags rendered as pills (except custom tags); hex values shown in the UI
- Dashed borders of any kind
- "Unknown" metadata, a "Status" field, a "Find similar" button that doesn't work
- The "All" discovery chip; a refresh icon in the chip strip
- "Ask BOARD" anywhere; Clusters and Canvas on phone; a top-right search icon on phone
- Boxed button panels, switches inside buttons, buttons that duplicate the FAB
- Fonts other than DM Sans; icons outside Lucide
- "Saved" shown before the write is durable

## What's off in the current build

The dashboard and board-page screenshots from 29 Oct break this file in 15 places. Fix these in the matching pass.

### Desktop dashboard

- [ ] Avatar is a rounded square in an off-brand peach-brown. Make it a 34px circle, flat `#EF8A66`, initials `#1A0F0A`.
- [ ] "Ask BOARD a question about what you saved" bar and its Ask button are back. Remove both.
- [ ] "YOUR LIBRARY · 52 ITEMS" is all caps. Change to "Your library" (Heading 17px 600) with "52" in Caption `--lp-fg-4`.
- [ ] Chip labels are Title Case ("High Contrast Palette"). Change to sentence case.
- [ ] Near-duplicate chips ("High contrast palette" and "High contrast"; "Deep charcoal", "Charcoal", "Near black"). Dedupe in `userStats`.
- [ ] Refresh icon at the end of the chip strip. Remove it.
- [ ] Dark color swatches disappear on the dark chip. Add the `--lp-line-3` rim.

### Phone board page

- [ ] "Add items" is a peach button. Remove it; the FAB already adds to the current board.
- [ ] Four buttons in three styles (gray fill, outline with a switch inside, peach). Replace with one Secondary **Share** button that opens a share sheet.
- [ ] Buttons sit inside a bordered box. Remove the box.
- [ ] Edit is a full button. Move it into a ⋯ icon in the header.
- [ ] Image tiles have square corners. Use 10px.
- [ ] Left tile touches the screen edge. Add the 8px gutter.
- [ ] Third image went into the taller column, leaving a hole. Place each new tile in the shortest column.
- [ ] The same Neohaus image appears twice. Check for a duplicate save or duplicate board membership.

## Tokens

This is the complete `src/styles/tokens.css`. Replace the existing file (or create it) and import it first in the app entry. The legacy aliases at the bottom keep older class names working; move components to the new names as you touch them, then delete the aliases.

```css
/* LOUPE DESIGN TOKENS v1.2 (29 Oct 2026). Source: docs/design-system.md */
:root {
  /* Surfaces: three, no others */
  --lp-bg:        #0e0e0e;
  --lp-surface:   #141414;
  --lp-raised:    #1c1c1c;

  /* Text and icons: white ladder */
  --lp-fg-1: #ffffff;
  --lp-fg-2: rgba(255,255,255,0.85);
  --lp-fg-3: rgba(255,255,255,0.60);
  --lp-fg-4: rgba(255,255,255,0.40);
  --lp-fg-5: rgba(255,255,255,0.25);

  /* Lines */
  --lp-line-1: rgba(255,255,255,0.06);
  --lp-line-2: rgba(255,255,255,0.12);
  --lp-line-3: rgba(255,255,255,0.30);

  /* State: always white */
  --lp-active-bg: rgba(255,255,255,0.12);
  --lp-veil:      rgba(255,255,255,0.06);  /* hover, laid over any surface */
  --lp-focus:     rgba(255,255,255,0.70);
  --lp-primary:       #ffffff;  /* Primary button fill */
  --lp-primary-hover: #e6e6e6;
  --lp-on-primary:    #0e0e0e;

  /* Brand: the six places only */
  --lp-peach:       #EF8A66;
  --lp-peach-hover: #F29A79;
  --lp-peach-press: #D77C5C;
  --lp-on-peach:    #1A0F0A;
  --lp-peach-grad:  linear-gradient(135deg,#F4AE93 0%,#EF8A66 55%,#D3714F 100%); /* marketing only */

  /* Danger */
  --lp-danger:    #FF6B5E;
  --lp-danger-bg: rgba(255,107,94,0.12);

  /* Overlays */
  --lp-frost:        rgba(14,14,14,0.62);  /* + blur 12px, controls on images */
  --lp-scrim-sheet:  rgba(0,0,0,0.60);     /* + blur 12px */
  --lp-scrim-modal:  rgba(0,0,0,0.85);     /* + blur 20px */
  --lp-caption-grad: linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0) 55%);

  /* Radius */
  --lp-r-sm: 6px;  --lp-r-md: 10px;  --lp-r-lg: 16px;  --lp-r-pill: 999px;

  /* Control sizes */
  --lp-h-sm: 32px;  --lp-h-md: 36px;  --lp-h-lg: 44px;  --lp-h-xl: 50px;  --lp-h-tile: 62px;
  --lp-touch: 44px;

  /* Spacing */
  --lp-space-1: 4px;  --lp-space-2: 6px;  --lp-space-3: 8px;  --lp-space-4: 10px;  --lp-space-5: 12px;
  --lp-space-6: 16px; --lp-space-7: 20px; --lp-space-8: 24px; --lp-space-9: 32px;  --lp-space-10: 48px;

  /* Type */
  --lp-font:      'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --lp-font-logo: 'Untitled Sans', 'DM Sans', sans-serif;  /* wordmark only */
  --lp-text-display: 600 26px/1.2 var(--lp-font);
  --lp-text-title:   600 22px/1.2 var(--lp-font);
  --lp-text-board:   600 20px/1.2 var(--lp-font);
  --lp-text-heading: 600 17px/1.3 var(--lp-font);
  --lp-text-lead:    500 15px/1.55 var(--lp-font);
  --lp-text-body:    400 14px/1.5 var(--lp-font);
  --lp-text-control: 500 14px/1 var(--lp-font);
  --lp-text-small:   500 13px/1.35 var(--lp-font);
  --lp-text-caption: 400 12px/1.4 var(--lp-font);
  --lp-text-micro:   500 11px/1.3 var(--lp-font);
  --lp-tracking-tight: -0.01em;

  /* Icons (lucide-react only) */
  --lp-icon-stroke: 1.75;
  --lp-icon-xs: 14px; --lp-icon-sm: 16px; --lp-icon-md: 18px; --lp-icon-lg: 20px; --lp-icon-xl: 24px;

  /* Elevation: no glows, no colored shadows */
  --lp-shadow-pop:   0 12px 40px rgba(0,0,0,0.60);
  --lp-shadow-toast: 0 12px 30px rgba(0,0,0,0.55);
  --lp-shadow-modal: 0 30px 80px rgba(0,0,0,0.60);
  --lp-shadow-fab:   0 6px 20px rgba(0,0,0,0.45);

  /* Motion */
  --lp-ease-out:   cubic-bezier(.22,1,.36,1);
  --lp-ease-sheet: cubic-bezier(.2,.8,.2,1);
  --lp-ease-in:    cubic-bezier(.4,0,1,1);
  --lp-ease-flip:  cubic-bezier(.45,.05,.25,1);
  --lp-dur-press:  100ms;
  --lp-dur-fast:   150ms;
  --lp-dur-exit:   140ms;
  --lp-dur-base:   200ms;
  --lp-dur-settle: 220ms;
  --lp-dur-sheet:  280ms;
  --lp-dur-flip:   600ms;
  --lp-toast-ms:        4500ms;
  --lp-toast-action-ms: 6500ms;

  /* Layers */
  --lp-z-nav: 100;  --lp-z-fab: 200;  --lp-z-select: 300;  --lp-z-overlay: 1000;
  --lp-z-menu: 1100;  --lp-z-toast: 1200;  --lp-z-ext: 2147483000;

  /* Board auto-colors: content, not brand. No peach-family color. */
  --lp-board-1: linear-gradient(135deg,#9BC4FF,#5A8FE0); /* blue */
  --lp-board-2: linear-gradient(135deg,#B8D4B0,#7BA876); /* sage */
  --lp-board-3: linear-gradient(135deg,#C5B098,#8A7355); /* walnut */
  --lp-board-4: linear-gradient(135deg,#D4A5C7,#A07090); /* mauve */
  --lp-board-5: linear-gradient(135deg,#B0B8C5,#707880); /* slate */

  /* Legacy aliases (older names). Migrate, then delete. */
  --lp-input: var(--lp-surface);
  --lp-menu: var(--lp-raised);
  --lp-media: var(--lp-bg);
  --lp-hover: #2a2a2a;
  --lp-press: #2a2a2a;
  --lp-fg-strong: var(--lp-fg-1);
  --lp-fg: var(--lp-fg-2);
  --lp-fg-control: var(--lp-fg-2);
  --lp-fg-muted: var(--lp-fg-3);
  --lp-fg-mood: var(--lp-fg-3);
  --lp-fg-subtle: var(--lp-fg-4);
  --lp-fg-faint: var(--lp-fg-5);
  --lp-active-line: var(--lp-line-3);
  --lp-active-fg: var(--lp-fg-1);
  --lp-hover-veil: var(--lp-veil);
  --lp-terracotta: var(--lp-peach);
  --lp-terracotta-hover: var(--lp-peach-hover);
  --lp-terracotta-press: var(--lp-peach-press);
  --lp-on-terracotta: var(--lp-on-peach);
  --lp-terracotta-grad: var(--lp-peach-grad);
  --lp-r-menu: var(--lp-r-md);
  --bc-r-md: var(--lp-r-md);
  --lp-board-6: var(--lp-board-5);
}

/* Every hover style goes inside this query, so touch screens never get stuck hover states:
   @media (hover:hover) and (pointer:fine) { .thing:hover { ... } } */

@media (prefers-reduced-motion: reduce) {
  :root { --lp-dur-fast:0ms; --lp-dur-base:0ms; --lp-dur-sheet:0ms; --lp-dur-flip:0ms; --lp-dur-settle:0ms; --lp-dur-exit:0ms; }
}
```

Surfaces that can't import the CSS file (iOS share extension in Swift, Figma and Canva plugin UIs if they're built separately) copy the same values into their own constants file, named to match these tokens.

## Hard rules for every task

- Peach `#EF8A66` only in the six places above. Always flat in the product.
- The app icon and favicon are a peach square with a black circle in the middle. Never add to it, recolor it or redraw it.
- Primary buttons are white with `#0e0e0e` text. Five button kinds only.
- Active, selected, checked and focused states are white.
- Three surfaces only. Hover is a 6% white veil.
- DM Sans only. Sizes 26/22/20/17/15/14/13/12/11. Weights 400/500/600.
- Sentence case, no uppercase labels, nothing under 11px.
- Corners 6 / 10 / 16 / pill. No square corners anywhere.
- Every `:hover` inside `@media (hover:hover) and (pointer:fine)`.
- Inspect existing source before changing anything, don't guess, decide at ambiguous points and note the decision, run the build, and pass the checklist before reporting complete.

## Checklist (run after every pass)

- [ ] `grep -rniE "e38c6f|d97a5a|e67e4a|ff9866|ffd8be|e8b59a|f0c4a8|b85a28|c9503c|f5f1ea" <source dirs>` returns nothing
- [ ] `grep -rni "ef8a66" <source dirs>` hits only the token files
- [ ] Every `var(--lp-peach)` use is one of the six brand places
- [ ] No gradient on any in-product element
- [ ] Favicon, `apple-touch-icon`, manifest icons, extension icons and the iOS app icon are the files from `docs/assets/`, with nothing redrawn
- [ ] No hex literals outside the token files and image or palette data
- [ ] No `text-transform: uppercase` in UI styles
- [ ] No `font-size` below 11px, no font family other than the tokens
- [ ] No `border-radius: 0` on tiles, cards or buttons
- [ ] Every main action on every screen is a white button
- [ ] Tapping tiles at 390px leaves nothing hovered or lifted
- [ ] Screens compared against `docs/design-reference.html` at 390, 820, 1180 and 1600px
