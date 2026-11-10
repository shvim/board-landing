# Pass 5 of 5: Figma and Canva plugins (and the MCP picker)

**For Instinct.** Brief Codex with everything below the line, then run the tests yourself before telling M it's done.

---

Read `docs/design-system.md` and open `docs/design-reference.html`. Passes 1–4 are done.

**Goal:** the Figma plugin, Canva app and MCP picker look like the same product as the dashboard.

**Do**
1. Use the same chips, tiles, tags, menus and buttons as the dashboard, with the same tokens. Reuse the components if they're shared; otherwise match the values exactly.
2. Insert, "Add all to design" and other main actions are Primary (white). No peach anywhere except the logo.
3. Search field, filter chips (sentence case, white when active), and a two-column masonry with 10px corners and an 8px gap.
4. Selection uses the same white circles and fade as the dashboard.
5. Progress for multi-image inserts uses the standard toast with a white rail. Errors use the red rail.

**Don't**
- Change the Canva panel's light/dark behavior in this pass. Keep it as it is now and note in your report if Canva's review guidelines look like they'll require following the editor's theme.
- Change plugin manifests, network access or auth.

**Test and report back**
- Run the checklist in `docs/design-system.md` against each plugin's source.
- Screenshots of each plugin:
  - Library view
  - A filter chip active
  - Inside a board
  - Selection mode
  - An insert in progress
  - An error
