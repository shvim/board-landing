# Avoiding the "AI slop" look — checklist for Loupe

Compiled 9 November 2026 from:
- Anthropic, `frontend-design` skill (official plugin): https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design
- Adrian Krebs' audit of 1,590 Show HN landing pages against 16 patterns (22% heavy slop, 32% mild, 46% clean), via Developers Digest: https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- Setproduct, "Why every AI startup looks the same" (13 Sep 2026): https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same
- 925Studios, "AI Slop Fonts and Gradients" (14 Jun 2026): https://www.925studios.co/blog/ai-slop-design-tells

## Why it happens
A model with no strong brief returns the statistical average of what it has seen. Changing the palette doesn't fix it: the fingerprint lives in the template chrome (labels, separators, card kits, typing effects, entrance animations) that gets added whatever the subject.

## Where v1, v2 and v3 failed (honest audit)

| Tell (source) | v1 | v2 | v3 |
|---|---|---|---|
| Small label above every heading ("eyebrow") (Anthropic; Krebs) | yes | yes | yes |
| One word or phrase of the headline accented in a different color or italic (Anthropic; Krebs) | yes | yes | yes |
| Strings joined with middle dots "A · B · C" (Anthropic) | yes | yes | yes |
| Cream background + high-contrast serif + terracotta/clay accent (Anthropic cluster 1) | no | **yes** | no |
| Near-black background (#0e0e0e-ish) as permanent dark mode (Anthropic; Krebs; Setproduct) | yes | no | yes |
| Serif display from the usual set (Instrument/DM Serif style) (Krebs) | no | yes | yes |
| Animated typing effect in the hero (Setproduct) | yes | yes | yes |
| Fade or slide-up entrance on every section (Anthropic) | yes | no | partly |
| Rows of identical cards (3 capture cards, 3 value columns, 4 integration cards) (Anthropic; Krebs) | yes | yes | yes |
| Frosted-glass pills and panels (Krebs; Setproduct) | yes | no | yes |
| Centered hero (Krebs) | no | no | yes |
| Logo/text marquee (Setproduct) | yes | no | no |

All three versions share the same fingerprint, so they read as the same designer in three outfits.

## Hard bans for the next version
1. No label above headings unless it carries information the heading doesn't.
2. No accenting part of a headline (no grey second clause, no italic word, no colored word).
3. No "A · B · C" strings in marketing copy. Tags inside product UI may follow the product's own design system.
4. No typing effect. Show the result, or let the visitor do the typing.
5. No entrance animations on sections. One orchestrated moment on the whole page, chosen on purpose.
6. No rows of identical cards. If three things matter equally, write them as prose or a real list.
7. No frosted glass, glows, gradients on text, or sparkle icons.
8. No cream + serif + clay; no near-black + serif + one accent as the default.
9. No serif from the usual AI set (Instrument Serif, DM Serif Display, Playfair). No Inter, Geist or Space Grotesk.
10. No arrows after button text, no "01 / 02 / 03" unless it is a real sequence.

## Process that works (from the sources)
1. **Real taste input first.** Pick 2–3 real, non-AI websites the founder loves (ideally outside software: interiors magazines, galleries, furniture makers, architects) and write down what exactly is liked about each.
2. **Write a DESIGN.md before code:** 4–6 named colors, typefaces and roles, layout concept with wireframes, and the one memorable element. Check it against this file; revise anything that is a default.
3. **Spend boldness in one place.** One memorable element, everything else quiet.
4. **Review gate:** founder approves the DESIGN.md and one hero mockup before the full page is built.
5. **Score the build** against Krebs' 16 patterns automatically (Playwright DOM and CSS checks); target zero or one.
6. **Chanel rule:** before shipping, remove one accessory.
