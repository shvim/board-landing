# Loupe landing page: critique

Reviewed: the live page at `loupe-design-comparison.yas123.chatgpt.site` ("Loupe — Never lose the one you know you saw"), and the sign-up app it should hand off to (`board-2-shvim.web.app`). Captured in Chromium at 1440×900 desktop and 390×664 (iPhone 13), scrolled top to bottom. Measured against the Loupe Design System v1.2 (`docs/design-system.md`).

Audience: interior designers (the user) and studio owners (the buyer). Goal: a free sign-up, not a waitlist.

---

## Overall impression

The bones are good. The headline is excellent, "Pinterest sees 'orange.' You see terracotta." is the best line on the page, and the dark, photo-led look suits designers. But the page sells a waitlist for a product that is already live and free, it loses every email it collects, and it hides its two strongest selling points: the studio library, and dragging images straight into any canvas. Visually it uses the old orange throughout, with glow, shimmer and all-caps labels. That reads as a SaaS template rather than a tool with a designer's taste.

---

## What works (keep these)

- **"Never lose the one you know you saw."** It names a feeling every designer knows (the image you can picture but can't find) and plays on loss aversion. The sign-up app already uses it too. Keep it word for word.
- **"Pinterest sees 'orange.' You see terracotta."** Six words that set Loupe apart and flatter the reader's expertise. It deserves a bigger stage.
- **The generic vs Loupe tag comparison.** It's interactive proof, not a claim. People believe what they can poke.
- **The self-typing search in the hero.** Right instinct: show the magic (describe it, find it) in the first five seconds.
- **The three people, three sources, one board sequence.** Exactly the right studio story. It's just under-sold and buried.
- **The photography-first dark canvas.** The images bring the color, so the UI doesn't have to.
- **Reduced-motion fallbacks exist** and the hero search is correctly `aria-hidden`.

---

## Conversion and funnel

| Finding | Severity | Recommendation |
|---|---|---|
| **Every email is thrown away.** All three forms write to `localStorage` in the visitor's own browser (`saveEmail()` → `board_waitlist`), then show "You're in ✓". Nobody on the team ever receives the address. | 🔴 Critical | Stop collecting email on the landing page. Send every CTA to the live sign-up app. |
| **Waitlist framing for a live product.** "Get early access" appears 8 times, but the product is live with a "Get started" flow. A waitlist adds delay and doubt ("when? will I get in?") exactly where momentum matters. | 🔴 Critical | One CTA label everywhere, **"Start free"**, linking to sign-up, plus a quiet **"Sign in"** for returning users (there is none today). |
| **"Free during early access" implies it will cost money later**, which is the opposite of the real offer (free to use, upgrade for more). | 🔴 Critical | Say it plainly: "Free to use — not a trial." Repeat it next to every CTA as a one-line reassurance. |
| **Email-first forms ask for commitment before showing value.** Typing an email on a phone is the most expensive action on the page. | 🟡 Moderate | A single button. Account creation belongs in the app, which already does it well. |
| **No "where do I get it?"** The product lives in Chrome, an iPhone share extension and an iOS app, but the page never says so clearly or shows where to install. | 🟡 Moderate | A "Save from anywhere" chapter that names all three surfaces, with install links once the store URLs exist. |
| **No price answer at all.** Visitors who wonder "what's the catch?" leave instead of asking. | 🟡 Moderate | A short "Free to use" band with a link to a separate pricing page. Agreed: **no pricing table on the landing page.** See "Pricing" below. |
| **No objection handling.** Who owns studio images? Can I get my files out? Does it work with Figma? Is it really free? | 🟡 Moderate | A six-question FAQ near the end. Each answer removes a reason to leave. |
| **No social proof.** No studios, quotes or numbers. | 🟢 Minor for now | Add real quotes or studio logos when you have them. Don't fake them; let product proof carry the page until then. |

### Pricing: your instinct is right

Keep pricing off the landing page. The core offer is "use it free", and a pricing table turns a free tool into a buying decision too early (people start comparing tiers instead of starting). The landing page should do two things:

1. Say **"Free to use. Not a free trial."** clearly, twice (near the top and before the final CTA).
2. Show that a **Studio** option exists for teams, and link to a separate pricing page ("See plans"). Studio owners who care will click; everyone else isn't slowed down.

The new page has a `PRICING_URL` setting: leave it empty and the "See plans" link hides itself, set it and the link appears.

---

## Psychology: how the page draws people in (or doesn't)

| Principle | Current page | Fix |
|---|---|---|
| **Show the "aha" in five seconds** | The hero search types, but it lights up tiles in a wall behind the copy. The payoff (the exact image appearing) is hard to see. | Put the product in the hero: a real Loupe window where a typed description filters the library down to the matches. |
| **Identity: "they get me"** | Good in one line ("terracotta"), then generic ("Find it by feel"). | Speak like a designer throughout: limewash, bouclé, fluted oak, unlacquered brass, japandi. Let visitors *use* the designer eye (the loupe lens). |
| **Two audiences, two motives** | Talks only to the individual designer until 70% of the way down. The studio owner's motive (ownership, nothing walks out the door) never comes up. | A dedicated Studios chapter: "Everything your team finds, in one library the studio keeps." Use your kitchen-project example. |
| **Zero-risk start** | Waitlist plus "free *during early access*" signals both delay and future cost. | "Start free" plus "Free to use — not a trial." |
| **Hick's law (fewer choices)** | Nav sends people to "Canva" (another company) and "Early access" (a form). | Nav by job: How it works · Studios · Integrations · FAQ, then Sign in and Start free. |
| **Peak-end rule** | The final section is a large, mostly empty dark area with a form. | End on a confident echo of the hero, one button and the free reassurance. |
| **Endowment (let them try it)** | Comparison tabs exist, but there's only one interactive moment. | Interactive lens, a live search demo, and a manual-tag demo. Each "touch" makes Loupe feel like theirs. |
| **Repetition without redundancy** | "You save hundreds of images. Then you never find them again." restates the hero right after it. | Cut it. Every section should add a new reason. |

---

## Messaging

- **Missing features that sell.** Not mentioned anywhere: manual tags, **download a board as a zip**, the **Chrome sidebar that drags into any canvas** (Figma, Canva, anything in the browser), and the iOS app. The canvas drag works everywhere, so it shouldn't sit hidden behind a Canva-only story.
- **The studio story is buried and generic.** It's called "Teams" in the nav and "Built for studios" in an all-caps label, and the ownership angle is missing entirely. Designers say "studio", not "team".
- **"Canva" as a nav item** promotes another brand at the top of yours. Make it "Integrations".
- **"Flip any card for its palette, hex codes…"** contradicts the design system: hex codes are never shown in the product.
- **Content curation hurts the positioning.** The collaboration demo's Pinterest screenshot is nails, cakes and sneakers, and the Instagram save is a cosmetics swatch. For "the visual library for interior designers", every visible image should be an interior.
- **Hero subhead** ("Save any image on the web…") is narrower than the product: phones, Instagram, screenshots and studios aren't in it.

---

## Visual hierarchy

- **What draws the eye first:** the glowing orange CTA in the nav and the orange second half of the headline. The product itself should be the first thing you look at.
- **Reading flow:** every section uses the same template (all-caps orange label → centered heading with an orange second half → centered gray paragraph). With nothing breaking the pattern, the scroll goes flat after the second section and nothing feels important.
- **Hero:** a busy 3D photo wall with orange frames and 8–10px labels ("MATERIAL BANK", "MID-CENTURY LOUNGE") sits behind the headline, search, sub-copy and form. The scrim isn't strong enough, so the sub-copy and email field fight the photos, especially on phone.
- **Whitespace:** large empty bands (after the Canva carousel, the final section), while the collaboration devices are small and hard to read at 1440px.
- **Integration carousel:** the peeking next slide shows cut-off text ("Search your library") at the right edge, which looks like a bug.

---

## Consistency with Loupe Design System v1.2

| Element | Issue | Fix |
|---|---|---|
| Brand color | Uses `#E67E4A`, `#FF9866`, `#b85a28`, all banned old values. The brand peach is `#EF8A66`. | Tokens from v1.2 only. |
| Peach everywhere | Labels, headline accents, tag pills, borders, timeline numbers, tabs, glows. When everything is peach, nothing is. | Peach only in the logo dots, marketing CTAs (allowed gradient) and the in-product spots shown in mockups (avatar, FAB, extension Save, annotation stroke). |
| CTA style | Glow (`box-shadow 0 0 34px`) plus an infinite shimmer sweep. The system says "No glow." | Flat-edged peach gradient, `#1A0F0A` text, no glow, press scale 0.98. |
| Uppercase | 83 uppercase text elements ("THE DIFFERENCE", "WITHOUT LOUPE", "YOUR LIBRARY · 94 ITEMS"). | Sentence case everywhere. |
| Tiny text | 88 text elements under 11px on desktop and 103 on phone, down to 8px. Minimum is 11px. | Nothing under 11px. |
| Weights | 700 used outside the wordmark. | 400 / 500 / 600 only (700 only in the wordmark). |
| Product mock | Title Case chips ("High Contrast Palette"), "Needs Review" and "Document Reference" chips, banned color swatches, dashed empty-state borders, Canvas/Clusters tabs. | Mock the product exactly as v1.2 specifies: sentence-case chips, peach avatar circle, 10px tiles, no dashes. |
| Favicon | Four orange dots on black. | The v1.2 mark: peach square, black circle, 22% corners. |
| Landing → sign-up hand-off | Landing CTA is a glowing orange button; the sign-up app's main button is white. Visitors cross a visual seam at the moment of commitment. | Match the app's restraint: dark, white type, peach used sparingly. |
| Custom cursor | Peach dot plus ring with `mix-blend-mode: difference`. | Remove. It slows precise pointing, and designers notice it as a gimmick. |
| Strikethrough "Without Loupe" list | Hard to read, and a cliché. | Cut. The studio chapter makes the point with a better visual. |

---

## Mobile (390px)

- **The sticky "Get early access →" bar** takes 56px of a 664px viewport (8.4%) on every screen and covers headings as you scroll (for example "find them again." is cut off). There's also an arrow after the label, which v1.2 rules out.
- **Hero stacking:** headline, search pill, sub-copy, email field, button and a scroll hint all sit over the photo wall. "talk." ends up alone on a line; the CTA starts below 450px.
- **Scroll-jacked dashboard sequence:** long pinned scrolling of a mock is tiring with a thumb.
- **Integration tabs** wrap to two rows, and the collaboration devices are too small to read.
- **Tap targets:** the hamburger is 38×32 (minimum 44×44).
- **Fix:** keep a compact "Start free" button in the top bar instead of a sticky bar over the content. Stack the hero as text, then the product window. No scroll-jacking on phones.

---

## Accessibility

- **CTA contrast fails WCAG AA:** white text on `#E67E4A` is **2.82:1** and on `#CF5F24` is 3.95:1 (it needs 4.5:1 at 15px). The v1.2 spec of `#1A0F0A` on peach gives **7.6:1**.
- **Text over photos** has no reliable contrast in the hero.
- **8–10px labels** are unreadable for many people, and the system floor is 11px.
- **Focus states:** not defined for most custom controls. v1.2 specifies a 2px white focus ring at 70% opacity with a 2px offset.
- **Custom cursor** hides the system cursor, which some users rely on (high-contrast cursors).

## Performance

- **42 images (≈3.5 MB) load on first paint**, because the hero wall loads everything eagerly.
- A `position: fixed` 3D-perspective wall with filters runs behind the first screens, which causes jank on mid-range phones.
- GSAP is loaded from a CDN with no fallback.
- **Fix:** small thumbnails for grids, lazy loading below the fold, self-hosted GSAP, and no fixed 3D layers.

---

## Priority recommendations

1. **Make the CTA real.** "Start free" → sign-up app, everywhere, with "Free to use — not a trial." Remove the email forms that discard addresses.
2. **Put the product in the hero.** A real Loupe window where a typed description filters the library to the exact matches. That's the "aha" in five seconds. Add the screen recording as a small, faded picture-in-picture.
3. **Give studios their own chapter.** A shared project board ("Hartley kitchen"), saves arriving from teammates, credited, owned by the studio, downloadable as a zip.
4. **Show "drag into any canvas".** The Chrome sidebar works next to Figma, Canva or anything in the browser, so show it in motion. Canva app live, Figma and SketchUp coming.
5. **Apply v1.2.** Remove the glow, shimmer, uppercase labels, tiny type, old orange and custom cursor. Let photography carry the color.
6. **Answer objections.** A free band (no table) plus a six-question FAQ.

---

## What the redesign does (index.html)

| Section | Job | What's in it |
|---|---|---|
| Hero | The "aha" in five seconds | Headline kept. A real Loupe library window types a description ("cognac leather sofa", "emerald green, brass"…) and the grid reflows to the matches. A faded square plays the save flow (a real screen recording once `DEMO_VIDEO` is set). One button, "Start free", plus "Free to use — not a trial." |
| Save from strip | Breadth | Instagram, Pinterest, Dezeen, AD, Houzz, showroom sites, camera roll. |
| The difference | Identity: "they get me" | An actual loupe: move it over a room and it magnifies and names what it sees ("Tapered oak legs", "Limewash plaster, warm grey"). Generic tags vs Loupe tags, palette by name, and a working "Add tag" field for manual tags. Four rooms. |
| How it works | Where to get it | A scroll story for the Chrome extension (save, circle the detail, choose a board), the iPhone share sheet, and the iOS app (upload, "Tagging…", detail sheet). |
| Studios | The buyer's reason to pay | A live shared board, "Hartley kitchen", filling up as teammates save from different sites, each save credited, with an activity feed. Three points: a board per project, the library stays with the studio, hand it off as a zip. |
| Integrations | Drag into any canvas | The Chrome sidebar dragging images onto a moodboard artboard. Chrome sidebar and Canva app are live; Figma plugin and SketchUp extension are marked "Coming soon". |
| Pricing | "What's the catch?" | "Free to use. Not a free trial." Personal (Free) vs Studio (For teams), with no prices; "See plans" appears when `PRICING_URL` is set. |
| FAQ | Remove reasons to leave | Six questions: free, where to save from, what's tagged, studio sharing, getting images out, Figma/SketchUp. |
| Final | Peak-end | "Next time, you'll find it." over a slow wall of saves. |

Design decisions worth knowing:

- **Peach is rationed.** It appears in the logo dots, the marketing CTA gradient (v1.2 place 6), and inside product mockups only where the product itself uses it (avatar, FAB, extension Save, annotation stroke, app icon). Headline emphasis uses white vs 40% white, not color.
- **No glow, no shimmer, no custom cursor, no all-caps, nothing under 11px.**
- **Colors of mocked third-party pages** (the article page, the canvas app, the phone bezel) are named `--mk-*` tokens, kept apart from Loupe's UI tokens.
- **Not done on purpose:** no testimonials or studio logos (we don't have real ones yet, so none were invented), and no pricing table.
