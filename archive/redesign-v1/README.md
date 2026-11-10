# Redesign v1 (kept for reference)

The first redesign of the Loupe landing page, frozen as it was on 6 November 2026.

- Live preview (not to be overwritten): https://claude.ai/artifact/8xuGbUM3cBiHGhRib9cisM
- Source commit: `969c6f4` (git tag `redesign-v1`)
- Open locally: serve the repository root (`python3 -m http.server`) and go to `/archive/redesign-v1/`. It uses the shared `images/`, `logos/`, `vendor/` and `docs/assets/` folders at the repository root.

What it contains: hero with a self-typing search in a Loupe library window, the loupe lens section, a "how it works" scroll story, a studio board that fills itself, drag-to-canvas, a free/pricing band, FAQ and a final call to action.

What it does not contain: the original site's flying-image scroll sequences (wall images flying into the dashboard, and teammates' saves flying into the shared board). An unfinished attempt to restore them is saved in `git stash` as "WIP: restore flying-card scroll sequences (on hold per user)".
