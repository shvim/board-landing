# Pass 1 of 5: Tokens and hardcoded values

**For Instinct.** Brief Codex with everything below the line, then run the tests yourself before telling M it's done.

---

Read `docs/design-system.md` first. It is the source of truth for every color, size and weight.

**Goal:** get the v1.2 tokens into every surface and remove hardcoded values. This pass changes values, not layouts.

**Do**
1. Replace (or create) `src/styles/tokens.css` with the token block in `docs/design-system.md`, and import it first in the web app entry.
2. Find where the Chrome extension, iOS share extension, and Figma and Canva plugins get their styles. If they can import the same CSS, import it. If not (Swift, separate bundles), create a constants file in each with the same values and token names.
3. Replace every hardcoded color, radius, font size, font family and shadow in all of those sources with the matching token. Map each old value to the closest token by role (what the element does), not by how close the hex looks.
4. Every old brand value (`#E38C6F`, `#D97A5A`, `#E67E4A`, `#FF9866`, `#FFD8BE`, `#E8B59A`, `#F0C4A8`, `#b85a28`) becomes `var(--lp-peach)` only if the element is one of the six brand places. Otherwise it becomes white or gray per the element map.
5. Install the app icon and favicon from `docs/assets/` (spec: "App icon and favicon" in `docs/design-system.md`): web `<link rel="icon">` (SVG plus 32 and 16 PNG fallbacks), `apple-touch-icon`, web manifest icons, Chrome extension manifest icons (16/32/48/128), the iOS app and share extension app icon, and the Figma and Canva plugin icons. Replace whatever is there now. Don't redraw or recolor.
6. Wrap every `:hover` rule in `@media (hover:hover) and (pointer:fine)`.

**Don't**
- Change layouts, components or copy. That's passes 2–5.
- Delete the legacy aliases at the bottom of the token file yet.

**Test and report back**
- Run every item in the checklist at the end of `docs/design-system.md` and paste the grep output.
- List any value you couldn't map with confidence and what you chose.
- Screenshots: desktop dashboard at 1600px and phone dashboard at 390px, before and after. Nothing should move; only colors and type should shift.
