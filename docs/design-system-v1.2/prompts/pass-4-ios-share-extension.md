# Pass 4 of 5: iOS share extension

**For Instinct.** Brief Codex with everything below the line, then run the tests yourself before telling M it's done.

---

Read `docs/design-system.md`. Passes 1–3 are done. Use the iOS Simulator on M's Mac to test and decide for yourself (`xcrun simctl`); don't wait for a physical device.

**Goal:** the share extension's save card follows v1.2.

**Do**
1. Use the Swift constants file from pass 1 for every color, size and radius. No literals in views.
2. Peach appears only in the logo dots. Every button is white or gray: Done is Primary (white, dark text), Change is Secondary (`#1c1c1c`, 85% white text).
3. Card surface `#141414`, 16px corners, DM Sans (bundle the font if it isn't already), text sizes from the type scale, nothing below 11pt.
4. Board picker rows: `#1c1c1c`, selected row with a white check. "New board" is Secondary.
5. Saved state shows only after the App Group write and the queue enqueue both succeed.

**Don't**
- Change the save queue, auth or the App Group setup beyond what's needed for the step above.

**Test and report back**
- Simulator screenshots of:
  - The card on open
  - Saving
  - Saved
  - The board picker expanded
  - The error state
  - The signed-out state
- Flag anything the Simulator can't verify (haptics, real share-sheet presentation) as `[device]` for M to check on his phone.
