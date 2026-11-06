# Loupe landing page

Static site, no build step: `index.html`, `css/site.css`, `js/site.js`. Open `index.html` through any static server (for example `python3 -m http.server`) to preview it.

- Brand rules: `docs/design-system.md` (v1.2) and `docs/design-reference.html`. Brand marks are in `docs/assets/`.
- Critique of the previous page and why the redesign looks the way it does: `docs/landing-critique.md`.
- Animation: GSAP 3.14.2 (core, ScrollTrigger, Flip, SplitText), self-hosted in `vendor/gsap/` so the page doesn't depend on a CDN.
- Images: `images/img_XX.jpg` (600×750) for large use, `images/t/img_XX.jpg` (360×450) for grids.

## Settings

Edit `CONFIG` at the top of `js/site.js`:

| Key | What it does |
| --- | --- |
| `SIGNUP_URL` / `SIGNIN_URL` | Every "Start free" and "Sign in" button. Currently the live app. |
| `CHROME_URL` / `APPSTORE_URL` | "Add to Chrome" and "Get the iPhone app". Fall back to the sign-up app while empty. |
| `PRICING_URL` | When set, a "See plans" link appears in the pricing band. Leave empty until the pricing page exists. |
| `DEMO_VIDEO` / `DEMO_POSTER` | The faded square in the hero. Empty shows an animated save; set a path to play a real screen recording (muted, looping). Clicking it opens the video full size. |

## Adding the screen recordings

1. Put the file in `media/` (for example `media/loupe-demo.mp4`), ideally H.264, 10–20 seconds, square or 4:5, under 3 MB.
2. Set `DEMO_VIDEO: "media/loupe-demo.mp4"` (and optionally a poster frame).

Handy trim/crop/compress command:

```sh
ffmpeg -i recording.mov -ss 2 -t 16 -vf "crop=ih:ih,scale=720:720,fps=30" -an -c:v libx264 -crf 26 -preset slow -movflags +faststart media/loupe-demo.mp4
```

## Motion and accessibility

- `prefers-reduced-motion`: no movement; every demo shows a finished, readable frame.
- No JavaScript: all content is visible; the demos show static states.
- Every `:hover` style sits inside `@media (hover:hover) and (pointer:fine)`.
