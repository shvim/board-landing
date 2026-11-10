# Pass 3 of 5: Chrome extension

**For Instinct.** Brief Codex with everything below the line, then run the tests yourself before telling M it's done.

---

Read `docs/design-system.md` and open `docs/design-reference.html`. Passes 1 and 2 are done.

**Goal:** the extension popup, quick save, crop and annotate overlays follow v1.2.

**Do**
1. Popup: `--lp-bg`, radius 16, 400–420px wide, 20px padding, × close top-right, nothing below 11px.
2. Save is the only Brand (peach) button. Every other button is Primary, Secondary or Ghost.
3. "Saving to" board picker: rows `--lp-raised`, selected row gets a white check. "Create new board" is Secondary, never peach.
4. Make these white: the quick-save hover badge on images, the capture-mode status dot, and the saved-toast dot.
5. Annotation toolbar: a pill in `--lp-raised` with a `--lp-line-2` border. Tools are `--lp-fg-3`; the active tool is `--lp-active-bg` with white. Undo and Clear dim when unavailable. Save is Brand. Strokes are `#EF8A66`, 3px.
6. Crop: white handles and border, `rgba(0,0,0,0.6)` dim, white size label 12px. Confirm is Primary, Cancel is Ghost.
7. Save states: idle, then "Saving…" (spinner), then "Saved to [board]" only after the write resolves, then back to idle after 1.4s. Error: "Try again", with a danger-colored error line, not a recolored button.

**Don't**
- Change capture logic or permissions.

**Test and report back**
- Run the checklist in `docs/design-system.md` against the extension source.
- Screenshots:
  - Popup idle
  - Popup with an image loaded
  - The board picker open
  - Saving
  - Saved
  - An error
  - Quick-save badge on a page
  - The annotate toolbar with a stroke drawn
  - Crop with a selection
