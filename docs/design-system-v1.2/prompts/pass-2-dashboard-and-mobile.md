# Pass 2 of 5: Web dashboard and mobile

**For Instinct.** Brief Codex with everything below the line, then run the tests yourself before telling M it's done.

---

Read `docs/design-system.md` and open `docs/design-reference.html` in a browser. Pass 1 (tokens) is done.

**Goal:** every dashboard and mobile screen matches the element map and the reference page.

**Do**
1. Apply the element map component by component: top nav, view toggle, search, avatar, filter strip, grid tiles, selection mode, detail sheet and modal, boards list, board page, menus, dialogs, toasts, switches, checkboxes, empty states.
2. Fix every item under "What's off in the current build". The key ones:
   - Avatar becomes a flat peach circle with dark initials.
   - Remove the "Ask BOARD" bar and its Ask button.
   - "Your library" in sentence case, with a bare count beside it.
   - Chips in sentence case, deduped, with no refresh icon.
   - On the board page, replace the boxed four-button panel with a ⋯ menu in the header (Edit, Rename, Delete board) and one Secondary Share button that opens a share sheet (public-link switch, Copy link). Remove "Add items".
   - Tiles get 10px corners and the 8px phone gutter, and new tiles go into the shortest column.
3. Make sure every screen has exactly one Primary (white) button at most, and no peach outside the avatar, FAB and logo.

**Don't**
- Add new features or views.
- Touch the extension, iOS share extension or plugins.

**Test and report back**
- Run the checklist in `docs/design-system.md`.
- Screenshots at 390, 820, 1180 and 1600px of:
  - All
  - Boards
  - Inside a board
  - The detail sheet or modal
  - Selection mode
  - The hamburger menu
  - The Search tab (phone)
  - A delete dialog
  - A toast
- Put each screenshot next to the matching part of `docs/design-reference.html` and list anything that differs.
