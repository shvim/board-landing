# Landing page and web design trends, 2025–2026: creative tools, SaaS, and motion (research notes for the Loupe redesign)

Research date: 8 November 2026. Researcher notes for the report writer.

**Method and access caveats (read first):**
- The WebFetch tool could not resolve any host in this session, so pages were fetched with plain `curl` through the session proxy and converted to text. Hero screenshots and DOM checks were taken with Playwright (Chromium, deviceScaleFactor 1, desktop 1440×900 and mobile 390×844, about 3.5 s after `load`).
- These sources could **not** be reached: awwwards.com (DNS/tunnel failure), land-book.com and lapa.ninja (HTTP 403), siteinspire.com (HTTP 429), tympanus.net/Codrops articles (Cloudflare challenge), lovable.dev and follow.art (Cloudflare challenge). Awwwards facts below come from search-engine snippets of Awwwards pages and from secondary write-ups, and are flagged.
- **godly.website now 301-redirects to `recent.design/?ref=godly`.** The Godly gallery appears to have been folded into or replaced by recent.design. Its listing was parsed directly.
- Screenshots are saved in `research_notes/Loupe landing page research/screens/`. All files from this researcher end in `_hero_desktop.png`, `_hero_mobile.png` or `_scroll_<px>_desktop.png`. Files without those suffixes in the same folder come from other researchers.
- "Observed" findings are first-hand captures from 2026-11-08, cited to the live URL and screenshot file. They come from a small convenience sample of about 24 sites, not a representative survey.

---

## Q1. Which visual trends dominate 2025–2026 landing pages for creative tools and SaaS? Which are rising, and which are now tired or "AI slop"?

### Takeaway
Three things are rising: expressive or serif display type, warm light grounds, product output (real images and real UI) placed in the hero instead of abstract art, domain-specific "material" visuals (collage, texture, technical drawing), and fewer but more purposeful animations. Three things now read as tired or "AI-generic": the near-black page with a purple/blue glow, Inter/Geist-only typography, the "Introducing" pill, gradient headline text, all-bento pages, glassmorphism everywhere, the sparkle icon and the chat-box hero. The tired items are worst when stacked together. The category Loupe competes in (saving and curating visual inspiration) skews light and image-led, while dark heroes cluster in developer and AI tooling.

### Cited Findings
**Trend reports and agency views (2026)**
- Figma's 2026 trend page lists immersive 3D/WebGL, experimental navigation, bold saturated color ("dopamine design"), expressive typography ("custom fonts, oversized headlines, motion, and layered styles… kinetic lettering… variable fonts"), dark mode as "standard", motion/scrollytelling, gamification, neumorphism, retrofuturism, maximalism, collage ("sticker graphics, torn textures, cutout photos") and neo-brutalism/"anti-design". It also says sustainability and accessibility are "must-haves". This is vendor marketing for Figma Sites, so it is broad and not ranked. — [Figma: Top Web Design Trends for 2026](https://www.figma.com/resource-library/web-design-trends/)
- Digidop, a Webflow agency (article updated 6 Oct 2026, explicitly "our view… No measurement backs it"), names five 2026 trends:
  - motion as standard
  - immersive 3D that serves a story
  - "light, materials and shaders" replacing 2025's background glow
  - design and code converging with AI agents
  - clear, accessible B2B sites

  It lists as fading: all-bento pages ("a page built entirely in bento looks like every other one"), "animating every block", "large background gradients" (giving way to "a halo, a texture, a shader on a single element"), and "decorative AI visuals unrelated to the site's message (the generated clouds of 2025)… aging badly". Its advice is to use one light or material effect per page. — [Digidop: Web Design Trends 2026](https://www.digidop.com/blog/5-web-design-trends-2025)
- SaaSFrame, a SaaS screenshot library and vendor blog, lists ten 2026 trends: story-driven heroes that "visually show the product value before you scroll" (Notion, Linear and Framer cited), personalized CTAs, purposeful micro-animation, interactive product previews in the hero, AI-generated assets, split-screen layouts, "real customer contexts over abstract illustrations… a shift away from abstract 3D shapes", conversion-focused navigation, modular layouts, and "bold serif headlines… expressive color palettes are back". **Weak evidence:** it is a listicle with no data. — [SaaSFrame: 10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- SEO roundups for 2026 claim figures such as "67% of the top 100 SaaS products on ProductHunt use bento grid layouts" and ">60% of leading SaaS/AI landing pages are dark". **These are unverified vendor stats; treat as weak.** — [search summary of SaaS trend listicles incl. saashero.net, aydesign.ai, orbix.studio](https://www.saashero.net/content/top-landing-page-design-trends/)

**What reads as "AI slop" (2026)**
- Setproduct (13 Sep 2026) gives a field guide to the "AI startup uniform":
  - background near #0A0A0A
  - a single purple-to-blue radial glow, top center
  - the four-point sparkle icon
  - a chat input as the hero
  - an "Introducing [Product]" pill above the H1
  - Inter or Geist as the only typeface
  - a bento feature grid
  - 1px gradient-border cards
  - a grey "trusted by" logo marquee
  - "Meet your AI copilot" H1s
  - glassmorphism panels over the glow
  - a "Backed by YC" line
  - an animated typing effect

  It traces the lineage to Linear, then Vercel/Geist, then OpenAI (chat box) and Gemini (sparkle), spread by shadcn/ui, Tailwind UI, Framer templates and effect kits. It argues that AI page generators (v0, Lovable, Bolt, Cursor) now reproduce it. Its claim: "None of these is a crime on its own. Stacked together they become a fingerprint." — [Setproduct: Why every AI startup looks the same](https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same)
- Several 2026 developer and agency blogs describe the same cluster: purple-to-blue gradients, Inter, centered heroes with three feature cards, untouched shadcn, "glass everywhere", gradient headline text. The purple gradient is called "the single loudest tell". **Weak or commercial sources.** — [dev.to: 3 UI Slop Patterns](https://dev.to/kenimo49/3-ui-slop-patterns-in-ai-ui-generators-purple-gradients-inter-fonts-uniform-cards-11l6); [925studios: AI Slop Web Design guide](https://www.925studios.co/blog/ai-slop-web-design-guide); [SmoothUI: AI Design Slop](https://smoothui.dev/blog/ai-design-slop)
- **The "tasteful" alternatives are now being flagged too.** An open-source audit tool for AI-generated frontends describes itself as catching "purple-gradient slop and the 'tasteful' defaults (cream + terracotta, mono chrome)". In other words, the warm-cream-plus-terracotta look popularised by Anthropic is itself becoming a recognised AI default. This is the repo description only; I did not inspect the code. — [GitHub: funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design)

**Fonts and colour in curated SaaS galleries**
- saaslandingpage.com's live "Popular fonts" list on 8 Nov 2026 reads: Inter, Geist Sans, Graphik, Suisse Int'l, Geist Mono, Roobert. Its "Popular tags" include "Dark", and its popular stacks include GSAP. — [SaaS Landing Page](https://saaslandingpage.com/) (observed 2026-11-08)

**First-hand sample of 24 heroes, captured 2026-11-08**
- **Background:** dark heroes appeared on Eagle, Kive, Framer, Linear, Raycast, Midjourney and Affinity (7). Light or warm heroes appeared on Cosmos, mymind, Savee, Are.na, Figma, Granola, Paper, Dia, Anthropic, ElevenLabs, Interfere, Programa, Jitter, Attio and Osmo (15). Runway uses a full-bleed cinematic photo and Milanote a slate blue. Among direct "save and organize visual inspiration" tools, Cosmos, Savee, mymind and Are.na are light. Eagle and Kive are dark. — [cosmos.so](https://www.cosmos.so/), [savee.com](https://savee.com/), [mymind.com](https://mymind.com/), [are.na](https://www.are.na/), [eagle.cool](https://eagle.cool/), [kive.ai](https://kive.ai/) (screens: `cosmos_hero_desktop.png`, `savee_hero_desktop.png`, `mymind_hero_desktop.png`, `arena_hero_desktop.png`, `eagle_hero_desktop.png`, `kive_hero_desktop.png`)
- **Headline type:**
  - Serif or expressive display H1s: mymind (huge serif, ~140px), Granola (Quadrant serif, 86px), Dia (Exposure VAR serif), Anthropic (custom serif), Milanote (Tiempos), Programa (Rhymes Display light, 80px), Affinity ("Affinity Serif Variable", 148px, italic swash on "freely").
  - Inter-family H1s: Linear, Raycast, Eagle, Interfere and Attio, all of them dev, ops or CRM tools.
  - Most others use a licensed or custom grotesk: Cosmos "cosmosOracle", Savee "saveeFont", Figma "figmaSans", Framer GT Walsheim, Runway ABC Normal, Jitter TWK Lausanne, ElevenLabs Waldenburg, Osmo Haffer XH.

  — computed styles read via Playwright on [granola.ai](https://www.granola.ai/), [diabrowser.com](https://www.diabrowser.com/), [programa.design](https://programa.design/), [affinity.studio](https://www.affinity.studio/), [linear.app](https://linear.app/), [raycast.com](https://www.raycast.com/) (observed 2026-11-08)
- **Eagle is a live example of the "uniform" inside Loupe's own category.** It has a pure-black page, an "Eagle 4 Highlights" pill badge, Inter with lavender gradient text ("Organizing design files has never been easier"), a centered download CTA and a product screenshot. — [eagle.cool](https://eagle.cool/) (screen: `eagle_hero_desktop.png`)
- **Kive's live site is now titled "AI Product Photography for Consumer Brands".** Its dark hero (#161616) is built around a prompt input, the chat-box hero pattern: "On-brand visuals made by AI" plus an input prefilled "glossier." — [kive.ai](https://kive.ai/) (screen: `kive_hero_desktop.png`)
- **Tactile, domain-native collage.** Programa (interior-design project software) builds its hero from physical-feeling material swatches (marble, textiles, a lamp, ceramic vases, paper), a desk with a monitor showing the product's schedule UI, and handwritten sticky notes ("All new Schedules :)", "A letter from Programa"), all on graph-paper grid. On scroll the camera moves into the desk scene. — [programa.design](https://programa.design/) (screens: `programa_hero_desktop.png`, `programa_scroll_1100_desktop.png`, `programa_hero_mobile.png`)

### Inferences
- Loupe's current brand (#0e0e0e near-black, white sans type) sits close to the "uniform" on two of Setproduct's checklist items: background within a few shades of #0A0A0A, and a single geometric sans. A peach accent instead of purple and DM Sans instead of Inter help, but the page will only escape the look if the **imagery and art direction** carry the identity: designer-grade interiors photography, material and colour vocabulary, and real tagged boards. Effects will not do it.
- The direct category (Cosmos, Savee, mymind, Are.na) skews light, image-led and typographic. A dark Loupe would therefore stand apart from its closest competitors, which may help it be noticed. But dark also aligns it with the AI/dev-tool look that buyers increasingly read as generic. A dark page works best when it behaves like a gallery wall or darkroom, where images glow, not like a glowing terminal. Affinity is the best current proof: black ground, giant serif, colourful work floating around the headline, one bright accent CTA.
- Warm cream plus terracotta is no longer automatically "distinctive". Loupe's peach (#EF8A66) is close to that family, so it should be used sparingly and functionally (tags, active states, one CTA). Setproduct makes the same recommendation for colour in general: commit to one colour "everywhere, including your favicon and your error states".
- For interior designers, the fresh direction is domain-native material language: swatches, paint chips, finish samples, spec sheets, plan drawings, annotations. Programa's collage and Heron's technical-drawing language (Q5) show this pattern scoring well with juries and buyers in adjacent architecture and interiors niches.

### Gaps
- No independent, methodologically sound measurement of trend prevalence (bento share, dark share) was found. The cited percentages are vendor claims.
- Webflow's own "State of the web" or 2026 trend report was not retrieved. Only Digidop's secondary summary of Webflow announcements was read.
- Light versus dark for a dark-branded *visual library* has no conversion data that I could find.

---

## Q2. What do award galleries and curated sites currently feature for product landing pages? 10+ recent examples relevant to visual and creative tools, with their hero approach

### Takeaway
Award juries in 2025–2026 still reward immersive WebGL/GSAP builds for brands (Site of the Year 2025: Lando Norris). Product-site recognition goes to sites that use the visual grammar of their domain (Heron AI, a technical-drawing look for architects) or that put the work itself front and centre (Affinity, Osmo). Across curated SaaS galleries the pattern is a sharp headline plus real product UI or output, with motion used as a signature, not a spectacle.

### Cited Findings
**Award results (2025–2026)**
- **Awwwards 2025 annual awards:**
  - Site of the Year: **Lando Norris** by OFF+BRAND, listed stack Webflow, GSAP, WebGL, 3D.
  - Developer Site of the Year: **Messenger** by abeto, "a tiny 3D planet built with WebGL and Three.js".
  - E-commerce of the Year: **Scout Motors**.

  awwwards.com was unreachable from this session, so these come from Digidop's summary and Awwwards page snippets in search results. — [Digidop](https://www.digidop.com/blog/5-web-design-trends-2025); [Awwwards Annual Awards winners (via search snippet)](https://www.awwwards.com/annual-awards/winners)
- **Heron AI (by Bearplus):**
  - A search snippet of the Awwwards listing shows "Heron AI… Bearplus… Developer Award, SOTD, Site Of The Day, Oct 12, 2026". A second search could not confirm the award, so treat it as likely but unverified.
  - Codrops published "Inside Heron: Designing an AI Agent Without Designing 'AI'" the same day (12 Oct 2026). It describes a visual language "from floor plans, annotations, and violation highlights", with "red almost exclusively on violations and alerts". The team dropped the word "AI" from the brief after deciding the first direction was "too safe".
  - **Caveat:** per search summaries of the site's terms, Heron is a Bearplus showcase and not a real product.

  — [Awwwards: Heron AI](https://www.awwwards.com/sites/heron-ai); [Codrops: Inside Heron](https://tympanus.net/codrops/2026/10/12/heron-ai/); [heronaiapp.com](https://heronaiapp.com/)
- **Osmo**, a Webflow/HTML animation resource toolkit: Site of the Day 8 Feb 2025, per a snippet of Awwwards' product category page. **Telescope**: Site of the Day 15 Jul 2025, same source, no details retrieved. — [Awwwards: Innovative Product Pages (via search snippet)](https://www.awwwards.com/websites/winner_category_product/)
  - *Observed Osmo hero:* light grey (#F4F4F4) background; huge grotesk "Dev Toolkit ✳ Built to Flex" with a purple asterisk glyph as the brand signifier; a subhead with inline chip-styled keywords ("Webflow", "HTML", "icons", "easings"); an arc of tilted 3D cards, each a looping video of a component (36 `<video>` elements); a ticker strip under the nav. Detected stack: GSAP and ScrollTrigger, Lenis, Webflow, Lottie. — [osmo.supply](https://www.osmo.supply/) (screen: `osmo_hero_desktop.png`)
- **Cosmos** (the visual curation app) holds an Awwwards Site of the Day by Unseen Studio, but the snippet suggests it dates from roughly 2023. **Older; flag.** — [Awwwards: Cosmos](https://www.awwwards.com/sites/cosmos)
- **Webby Awards 2026, Best Visual Design – Function (Websites):** Webby winner **FOLLOW.ART**; **People's Voice winner: Affinity Studio website (Canva)**. This comes from a search snippet of the Webby winners page; the page itself renders client-side and could not be parsed. — [Webby: Best Visual Design – Function](https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-visual-design-function)
  - *Observed Affinity hero:* black ground; giant bold serif "Create freely" with a swash italic on "freely" (Affinity Serif Variable, 148px); real creative work (illustrations, a fashion photo, a macro product shot) floating at the edges; two lime-green pill CTAs ("Get for individuals" / "Get for enterprise"); "by Canva" lockup; 11 videos and 2 canvases. — [affinity.studio](https://www.affinity.studio/) (screens: `affinity_hero_desktop.png`, `affinity_hero_mobile.png`)
- **Webby 2026, AI – Visual Design:** Lazarev.agency's press release says it won with "Elva – AI art director". This is an agency press release, so treat it as secondary. — [Lazarev press release (syndicated)](https://apnewstodays.pages.dev/press-release/ez-newswire/lazarev-agency-wins-best-visual-design-for-ai-at-the-30th-annual-webby-awards-marking-third-consecutive-year-of-webby-recognition-for-ai-products-62f1c7313cb0734d74e4a5bb44dddeea)

**Curated galleries, current listings**
- **recent.design** (the target of godly.website's redirect) Websites feed on 8 Nov 2026 includes: Interfere (SaaS), X Advertising (SaaS), Orior AI (AI), Shopify Editions Winter '26 and Spring '26, Shopify Design, Augen, Avara, plus agencies and portfolios. The Augen URL carries `?ref=godly`. — [recent.design/websites](https://recent.design/websites) (parsed 2026-11-08)
  - *Observed Interfere hero:* white page; left-aligned Inter headline "Ship software that never breaks"; a large live-looking product UI (issue detail "Broken password reset link") on a faint pink wash. A product-led hero with no illustration. — [interfere.com](https://interfere.com/) (screen: `interfere_hero_desktop.png`)
- **saaslandingpage.com** front page on 8 Nov 2026 features Raycast Keyboard, Patensify, Nucleo, AccessGrid, Parloa, Buzzabout, Mobbin (sponsored), Operate, Epidemic Sound, Polar and CleanShot. — [SaaS Landing Page](https://saaslandingpage.com/)
- **Framer's gallery** "Trending" on 8 Nov 2026 is dominated by studio and portfolio sites (Vibe, Mikatalo, Studio Gioia, Avant Mater, etc.), not SaaS. — [Framer Gallery](https://www.framer.com/gallery/)

**Hero approaches of named creative-tool and SaaS sites (observed 2026-11-08)**
1. **Cosmos** — [cosmos.so](https://www.cosmos.so/): warm off-white page. Dozens of tilted image tiles drift in 3D depth around a bold custom-grotesk H1 whose noun rotates ("Find your next go-to outfit"; the mobile capture showed "…lamp with character"), with a small inline image stack after the text. Under the H1 sit a search bar ("Search for outfits") and "Join Cosmos for free", plus a floating QR "Get the app" card. The product's core act (search and discover images) *is* the hero. (`cosmos_hero_desktop.png`, `cosmos_hero_mobile.png`)
2. **Savee** — [savee.com](https://savee.com/): near-white page. A huge grotesk H1, "The best place [image] to save [image] and share inspiration [image]", with saved images inlined as app-icon squircles between words; subhead "References curated by designers, saved in one click and sorted into boards." A masonry wall of saved images starts at the fold, and there is a "Get the app — scan" QR card. 16 videos on the page. (`savee_hero_desktop.png`)
3. **mymind** — [mymind.com](https://mymind.com/): a giant serif H1, "Remember everything. Organize nothing.", with coloured outline "tag" chips inline in the subhead (notes, bookmarks, inspiration, articles, images). Three platform buttons sit side by side: iPhone app, Browser Extension, Android app (mirrors Loupe's extension and iOS capture story). A phone mockup slides in. The page is a long GSAP/ScrollTrigger story (document height ~18,350px) with a manifesto block "NO social features / NO vanity metrics / NO social pressure / NO collaboration / NO ads" on a peach gradient, and an AI section headed "Just save it. Artificial Intelligence (AI) takes…". (`mymind_hero_desktop.png`, `mymind_scroll_1800_desktop.png`, `mymind_scroll_4200_desktop.png`)
4. **Are.na** — [are.na](https://www.are.na/): an anti-hero. Small 19px text, "Are.na is a. Online software for saving and organizing… b. A toolkit for assembling new worlds from the scraps of the old", then "For the last 15 years and 91 days…", then two small buttons. No imagery above the fold; brand voice carries it. (`arena_hero_desktop.png`)
5. **Programa** (interior design) — [programa.design](https://programa.design/): tactile material collage around a product monitor, serif "Freedom, by design", audience eyebrow "FOR INTERIOR DESIGNERS & ARCHITECTS" on mobile, and a scroll zoom into the scene. The page source contains `animation-timeline` (CSS scroll-driven animation). (`programa_hero_*`, `programa_scroll_1100_desktop.png`)
6. **Affinity by Canva** — described above. A dark gallery-wall hero with oversized serif type and the work floating at the edges.
7. **Granola** — [granola.ai](https://www.granola.ai/): white page; Quadrant serif "The AI notepad for back-to-back meetings"; "New: Voice typing" pill; a product window ("Q3 GTM sync") over a painterly abstract artwork panel; subhead "Notes, actions and memory. Without a meeting bot." (`granola_hero_desktop.png`)
8. **Dia** (The Browser Company) — [diabrowser.com](https://www.diabrowser.com/): warm yellow, sunlit page with dappled-light shadows; a small serif line "More than a browser. A better workday." over a giant swashed serif "DIA" wordmark behind a product window. Lenis smooth scroll and Lottie detected. (`dia_hero_desktop.png`)
9. **Paper** — [paper.design](https://paper.design/): warm off-white; light-weight lowercase "design incredible / the connected canvas for teams shipping with agents"; a real product canvas plus a terminal log of MCP calls (27 canvases on the page). (`paper_hero_desktop.png`)
10. **Figma** — [figma.com](https://www.figma.com/): white; "The full-stack creative canvas" set left; a stacked fan of app and screen cards in the centre; a big black "Get started" on the right. (`figma_hero_desktop.png`)
11. **Framer** — [framer.com](https://www.framer.com/): black; "Framer is the pro website builder with a world-class design agent"; a product canvas with an agent panel and a blue glow edge. It is close to the dark uniform but carried by real product UI. (`framer_hero_desktop.png`)
12. **Linear** — [linear.app](https://linear.app/): #08090A; Inter "The product development system for teams and agents"; a full dark product UI screenshot. This is the archetype many others copy. (`linear_hero_desktop.png`)
13. **Raycast** — [raycast.com](https://www.raycast.com/): #07080A; "Your shortcut to everything."; a red diagonal light-streak 3D render on canvas. (`raycast_hero_desktop.png`)
14. **Midjourney** — [midjourney.com](https://www.midjourney.com/home): a full-screen animated ASCII/mono text field with the wordmark rendered in it; three small buttons (Sign up, Log in, Explore); JetBrains Mono. (`midjourney_hero_desktop.png`)
15. **ElevenLabs** — [elevenlabs.io](https://elevenlabs.io/): off-white; light-weight "Bringing technology to life"; a carousel of coloured "voice" orbs with a play button (product output, playable). (`elevenlabs_hero_desktop.png`)
16. **Runway** — [runwayml.com](https://runwayml.com/): a full-bleed cinematic image with the headline overlaid ("Intelligent tools for scaling content and teams."). (`runway_hero_desktop.png`)
17. **Milanote** (moodboards) — [milanote.com](https://milanote.com/): slate background; serif "Get organized. Stay creative."; one orange CTA; a large product board screenshot of moodboard content. A conventional, somewhat dated product-screenshot hero. (`milanote_hero_desktop.png`)

### Inferences
- The award-recognised patterns most transferable to Loupe:
  - **Affinity:** a dark gallery wall, oversized expressive type and real work as the hero.
  - **Heron:** borrowing the client domain's visual grammar.
  - **Osmo:** tilted cards that each loop a real micro-demo, plus a single brand glyph.
  - **Cosmos and Savee:** the product's core action shown as the hero (search, save), with real images dominating.
- WebGL-heavy SOTY-style builds (Lando Norris, Messenger) are brand experiences. Juries reward them, but they are not the template for a SaaS sign-up page (see Q3 and Q4 on mobile cost).
- Several category peers (mymind, Savee, Cosmos) put the *capture surfaces* (extension, iOS, Android, QR) in or right under the hero. That matches Loupe's multi-surface capture story and appears to be a category convention.

### Gaps
- Awwwards (SOTD/SOTY lists), Land-book, Lapa Ninja, SiteInspire and Codrops could not be browsed directly, so I could not compile a verified list of the last six months of SaaS Site-of-the-Day winners. Heron's SOTD is supported by one snippet but contradicted by a second search, so it is unconfirmed.
- Mobbin covers in-app screens, not landing pages, and was not used.
- The Webby page could not be parsed; Affinity's and FOLLOW.ART's awards rely on a search snippet.

---

## Q3. Motion and scroll: what is current, and when do scroll-jacking and pinned sections help or hurt, especially on mobile?

### Takeaway
2025–2026 is the year motion became cheap and standard:
- GSAP, including SplitText, ScrollTrigger and all former Club plugins, went 100% free in April 2025.
- CSS scroll-driven animations reached Baseline in October 2026.
- Same-document View Transitions reached Baseline in October 2025.

The practitioner consensus is "fewer, better-placed animations". The best usability evidence (NN/g) says scroll-jacking and pinned sequences disorient most users, especially task-focused users and mobile users. They are tolerable only when short, below the fold, carrying little text, and not altering scroll direction. NN/g's recommendation is to drop them on mobile.

### Cited Findings
**Tooling: what is now free or native**
- On 30 Apr 2025 Webflow made GSAP "100% free for all users — Webflow customer or not… including the previously paid Club plugins". It also expanded the standard license "to cover commercial use". SplitText was "completely rewritten": 50% smaller file size, "baked-in accessibility for screen readers", "easy masking for advanced 'reveal' effects", 14 new features. Webflow acquired GSAP in fall 2024. — [Webflow blog: GSAP becomes free](https://webflow.com/blog/gsap-becomes-free)
- According to Digidop:
  - Webflow Interactions was rebuilt on GSAP on 10 Jul 2025 (timeline, text splitting by letter or word).
  - Figma introduced **Figma Motion** at Config in June 2026 (keyframe timeline in the design file, exporting to CSS, React, JSON or animated SVG) and shader fills and effects.
  - Webflow's MCP could build GSAP interactions from a plain-language request (Webflow Conf, Sep 2026).

  These are agency summaries of announcements. — [Digidop](https://www.digidop.com/blog/5-web-design-trends-2025)
- **CSS scroll-driven animations** (`animation-timeline`, `scroll()`, `view()`) became **Baseline Newly available in October 2026** when Firefox 159 enabled them by default. Support: Chrome 115, Edge 115, Safari 26, Firefox 159. — [web.dev: New to the web platform in October 2026](https://web.dev/blog/web-platform-10-2026)
- Chrome's case studies report the following. Tokopedia replaced JS scroll listeners with scroll-driven animations, cutting "up to 80% of our lines of code", and saw "average CPU usage reduced from 50% to 2% while scrolling". redBus and Policybazaar used them for image reveals and for shrinking low-priority UI on scroll. **Page last updated May 2024 (older, but the mechanism holds).** — [Chrome for Developers: Scroll-driven animations case studies](https://developer.chrome.com/blog/css-ui-ecommerce-sda)
- Chrome's performance case study explains that JS scroll handlers run on the main thread while scrolling runs on a separate thread, so JS-driven scroll effects are "prone to jank". The CSS API keeps animating smoothly under main-thread load. — [Chrome: A case study on scroll-driven animations performance](https://developer.chrome.com/blog/scroll-animation-performance-case-study?hl=en)
- **View Transitions:**
  - Same-document transitions became Baseline Newly available with Firefox 144 (stable 14 Oct 2025). Chrome added `view-transition-name: match-element`, nested groups (Chrome 140) and DevTools support. React moved `<ViewTransition>` to canary. — [Chrome: What's new in view transitions (2025)](https://developer.chrome.com/blog/view-transitions-in-2025)
  - Cross-document (multi-page) transitions ship in Chrome/Edge 126+ and Safari 18.2+. caniuse lists Firefox as "partial" (144–161), so cross-document transitions are **not confirmed Baseline**. — [caniuse: cross-document view transitions](https://caniuse.com/cross-document-view-transitions)
- **Codrops' 2026 output** (seen via search listings; site not directly reachable) centres on WebGL image galleries with scroll-triggered shader reveals, scroll-driven 3D galleries (Three.js plus GSAP), smooth scrolling and Barba.js page transitions. A personal blog claims "Lenis dominates smooth scroll". **Weak and indirect.** — [Codrops (archive listing via search)](https://tympanus.net/codrops/demos/?tag=scroll); [svilenkovic.com: scrollytelling trends 2026](https://svilenkovic.com/3d/scrollytelling-trends-2026)
- **Observed library use (2026-11-08, heuristic detection via globals and script URLs):**
  - GSAP and ScrollTrigger: mymind and Osmo.
  - Lenis smooth scroll: Dia and Osmo.
  - Lottie: Dia, Anthropic, Jitter and Osmo.
  - CSS `animation-timeline` in page source: Programa.
  - Most other sites are Next.js builds with no detectable GSAP global, which does not rule out Motion/Framer Motion or bundled GSAP.

  — Playwright DOM checks on [mymind.com](https://mymind.com/), [osmo.supply](https://www.osmo.supply/), [diabrowser.com](https://www.diabrowser.com/), [programa.design](https://programa.design/)

**Scroll-jacking and pinning: usability evidence**
- NN/g "Scrolljacking 101" (Sara Paul, 6 Aug 2023; **older, but still the main usability study on the topic**):
  - "The majority of our study participants were at least mildly disoriented by scrolljacking". Lengthy scrolljacks were sometimes read "as a bug". Crypto.com's fully scrolljacked page disoriented all participants.
  - Scrolljacks worked best "when used to progressively disclose relevant information" (e.g., BBC before/after).
  - Fewer scroll actions per visible change meant less disorientation, but overly fast rates demanded precision.
  - "Task-oriented users were highly annoyed".
  - Altered rate or direction combined with changing text gave the "worst usability".
  - **"Scrolljacking Is Worse on Mobile… When sites did not carry scrolljacking over from desktop to mobile, users had a much better experience."** Sticky navigation served as the "escape hatch", and collapsed mobile menus made recovery harder.
  - Guidelines: progressively disclose valuable information only; test scroll rate; include non-scrolljacked sections; avoid changing scroll direction (horizontal scrolljacks led users to swipe the wrong way); limit text; **avoid scrolljacking on mobile**; **use it only below the fold**, citing "80% of their time looking at information above the page fold".

  — [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- Baymard reports that scroll hijacking and inline scroll areas are more disruptive on touch devices, where a scroll region can trap the user. — [Baymard: inline scroll areas](https://baymard.com/blog/inline-scroll-areas)
- **Lenis and smooth scroll:**
  - Thoughtworks Technology Radar (Oct 2024; **older**) cautions that Lenis "can have issues with accessibility, particularly with vertical and horizontal scrolling interactions, which could confuse users with disabilities".
  - Locomotive's docs counter that Lenis "makes the browser's native scroll smooth instead of hijacking it".
  - Lenis GitHub issue #107 documents that Lenis-driven scroll animations cannot be interrupted by scrollbar or spacebar.
  - Lenis advertises respecting `prefers-reduced-motion`.

  — [Thoughtworks Radar: Lenis](https://www.thoughtworks.com/radar/languages-and-frameworks/lenis); [Locomotive workshop docs](https://one-page-to-life.workshops.locomotive.ca/docs/chapter-1/locomotive-scroll); [Lenis issue #107](https://www.github.com/darkroomengineering/lenis/issues/107)
- **GSAP mobile and accessibility mechanics:**
  - `ScrollTrigger.normalizeScroll()` "forces scrolling to be done on the JavaScript thread… the address bar doesn't show/hide on [most] mobile devices". This is a useful fix for pinned jank but is itself a form of scroll takeover. — [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
  - `gsap.matchMedia()` scopes animations to media queries (`isDesktop`, `isMobile`, `reduceMotion: "(prefers-reduced-motion: reduce)"`) and auto-reverts them when the query stops matching. — [GSAP docs: gsap.matchMedia()](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)
- The GSAP community forum documents mobile-only bugs where scrolling back up after pinned sections jumps to the pin start. **Anecdotal.** — [GSAP community profile/thread (via search)](https://gsap.com/community/profile/122305-sikander/)

### Inferences
- For Loupe:
  - Unpinned scroll-*linked* reveals are low risk and cheap: CSS `view()` timelines with a GSAP fallback, images settling into a board, tags fading in as an image enters view.
  - A short pinned "watch an image get tagged" sequence is defensible on desktop under NN/g's rules: one sequence, below the hero, little text, no horizontal hijack.
  - On mobile, the same story should become a normal-scroll stack or a tap-through, not a pin.
- Smooth-scroll libraries add a familiar "premium" feel but have documented accessibility edge cases. If used, they should be disabled under reduced motion and probably on touch devices.
- Because GSAP is free and AI builders now generate GSAP interactions, *the presence* of motion no longer differentiates. A single recognisable motion signature does, as Setproduct and Digidop both argue.

### Gaps
- I found no 2025–2026 controlled usability study updating NN/g's 2023 scrolljacking findings, and no study isolating "pinned plus scrubbed" sections (as opposed to scroll-speed hijacking).
- I found no public conversion data comparing pinned scroll stories with plain scroll for SaaS sign-up.

---

## Q4. Is there evidence on heavy motion or animated heroes versus static heroes for engagement or conversion? What are the performance and Core Web Vitals costs on mobile?

### Takeaway
Public evidence is thin and mostly vendor- or agency-reported, with no sample sizes. It points one way: **motion that demonstrates the product or the offer can lift hero engagement and conversion; decorative motion or video tends to hurt.** Performance is the clearer risk. Fade-ins on the hero headline or image, heavy video and unsized image mosaics directly damage LCP and CLS on mid-range phones, and "first glance" judgments form in well under a second.

### Cited Findings
**Conversion and engagement tests**
- **Cro Metrics, "The Cro Show #001"** (telecom client): adding an animation to the hero (a toggle switching over and text animating in, with the same offer) produced "a 7% increase in actual order completions". Interaction with hero CTAs "skyrocketed", and scroll depth "plummets" in both variants because users act in the hero. No sample size or date given. — [Cro Metrics: Static vs. Animated Hero Banners](https://crometrics.com/blog/animated-vs-static-hero-banners-cro-show/)
- **WitsCode** (agency; hero A/B tests "across more than forty" Shopify builds, 2026; **no sample sizes; e-commerce, not SaaS**):
  - Decorative video heroes: "seven percent conversion drop versus a static hero".
  - Purposeful video: "around four percent engagement lift".
  - Text-led heroes: mobile LCP "between 0.4 and 0.7 seconds", and time on page up 11–19% for brands with strong copy.
  - Video LCP depends on the `poster`. Without one, the first frame decode "blocks LCP to between 3.2 and 4.8 seconds on mid-range Android". Video decode adds "forty to ninety milliseconds to Interaction to Next Paint on low-end Android".
  - Mosaic heroes without explicit dimensions produced CLS of 0.15–0.28.
  - "If your designer gives you a hero image over 300 kilobytes, send it back."

  — [WitsCode: Homepage hero A/B tests across 40+ Shopify builds](https://witscode.com/blogs/shopify-homepage-hero)
- Other reported results: Wrike reported an animated character beating a static page. Conversion Sciences reported a rotating header beating static by 61% but says static "almost always" wins. GoStellar reported a subtle animated gradient improving LCP by 1.1 s with similar conversion. **All vendor, and mostly older or undated.** — [Wrike Design (Medium)](https://medium.com/wrike-design/a-b-testings-or-experiments-with-webpages-bf7f7bb9d6c5); [Conversion Sciences](https://conversionsciences.com/rotating-headers-dont-have-to-kill-your-conversion-rate/); [GoStellar](https://www.gostellar.app/blog/high-impact-hero-sections-that-dont-hurt-page-speed)
- **Interactive demos:** Navattic's 2025 report (vendor; data from its own 20k+ demos) cites "80% growth in interactive demos on top B2B websites since 2022". Its 2026 report says 18% of 5k B2B SaaS sites have an interactive-demo CTA, versus 61% "Book a Demo" and 22% "Try for Free". No hero-specific conversion figure was found. — [Navattic: State of the Interactive Product Demo 2025](https://navattic.com/report/state-of-the-interactive-product-demo-2025); [Navattic 2026](https://navattic.com/report/state-of-the-interactive-product-demo-2026)

**First-impression science (older, flagged)**
- Google Research (2012) found that visual complexity and prototypicality affect aesthetic ratings within 17–50 ms. Low-complexity, *highly prototypical* sites were rated most attractive, and atypical sites were penalised "even if it's simple". Complexity is processed earlier than prototypicality. **2012; screenshot ratings, not conversion.** — [Google Research blog: Users love simple and familiar designs](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)
- Setproduct cites Lindgaard et al.: visual-appeal judgments form in about 50 ms and stay stable on repeat exposure. **The original study is 2006.** — [Setproduct](https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same)

**Core Web Vitals mechanics relevant to animated or image-heavy heroes**
- A good LCP is ≤ 2.5 s at the 75th percentile, segmented by mobile and desktop. LCP candidates include `<img>`, `<video>` ("the poster image load time or first frame presentation time… whichever is earlier"), CSS `url()` backgrounds and text blocks. **Excluded:** "Elements with an opacity of 0", full-viewport background-like elements, and low-entropy placeholders. Text using web fonts is not "rendered" during the font block period. — [web.dev: Largest Contentful Paint](https://web.dev/articles/lcp)
- DebugBear: since August 2020 Chrome ignores opacity-0 paints for LCP, so fade-in animations on the hero can delay LCP. An element that fades in may not count until it is repainted. Fixes are to start the fade above zero, use CSS keyframes instead of JS-triggered transitions, or remove the fade from the LCP element. Shopify's theme guidance says "don't hide LCP image behind animations". — [DebugBear: How CSS opacity animations can delay LCP](https://www.debugbear.com/blog/opacity-animation-poor-lcp); [Shopify dev docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations)
- **Observed (headless Chromium, 2026-11-08; may not reflect a real user session):**
  - Jitter's hero H1 was still at `opacity: 0.00001` four seconds after `load`, and the hero rendered blank in two captures. The near-zero, not zero, start value is the documented trick that keeps an element LCP-eligible while the user still sees nothing.
  - Linear's mobile hero was also blank at +3.5 s, and its desktop hero rendered only after a longer wait.

  — [jitter.video](https://jitter.video/), [linear.app](https://linear.app/) (screens: `jitter_hero_desktop.png`, `linear_hero_mobile.png`)
- Scroll-driven CSS animations run off the main thread (see Q3). JS scroll handlers compete with input handling, which matters for INP. — [Chrome case study](https://developer.chrome.com/blog/scroll-animation-performance-case-study?hl=en)
- Digidop: immersive 3D "hurts… loading time on mobile, and SEO when the content only lives inside the 3D scene". It recommends one light or material effect per page. — [Digidop](https://www.digidop.com/blog/5-web-design-trends-2025)
- **Observed page weights by count:** Osmo (36 `<video>`), Savee (16), Eagle (16), Kive (11) and Affinity (11) all ship many videos on the homepage, presumably lazy-loaded. I did not verify the loading strategy. — Playwright DOM counts on the listed URLs (observed 2026-11-08)

### Inferences
- For Loupe's "dies at first glance" fear: the evidence favours a hero that is *instantly legible and fully painted* (H1 plus real imagery visible in the first frame) and then animates *on top of* already-visible content. The pattern to avoid is a hero that waits for a reveal. The motion should show the product working (an image being saved and tagged, a board assembling), not decorate.
- Practical performance guardrails:
  - No opacity-0 start on the H1 or hero image.
  - AVIF/WebP hero images with explicit dimensions.
  - Any video gets a small `poster` and lazy loading.
  - Preload the DM Sans woff2.
  - Keep the hero image budget near 150–300 KB.
  - Keep WebGL out of the critical path, if used at all.
- Google's prototypicality finding cautions against an *unrecognisable* layout. Being distinctive in art direction and imagery while staying conventional in structure (clear H1, sub, CTA, visual) is the safer reading of the evidence.

### Gaps
- No peer-reviewed or large-sample public A/B test on animated versus static heroes for SaaS or creative tools in 2025–2026 was found. All quantified results are vendor or agency claims without methodology.
- No field (CrUX) data for the sampled sites was pulled. The PageSpeed/CrUX API was not used.

---

## Q5. How are AI-product sites differentiating visually in 2025–2026, away from the purple-gradient glow look?

### Takeaway
The winners "look like their category of outcome rather than their category of technology". They use warm light palettes with serif voices (Anthropic, Granola, Dia), editorial or newsroom layouts (Perplexity), monochrome restraint (ElevenLabs), output-first pages (Midjourney, Runway), and domain visual grammars (Heron's architectural drawings). Leading tactics:
- an owned colour
- a typeface with a point of view
- real output in the hero
- a proprietary glyph in place of the sparkle
- one motion signature
- a specific, non-category H1

### Cited Findings
- **Setproduct's five exemplars (Sep 2026):**
  - Anthropic "went warm where the market went black": off-white ground, serif voice, terracotta accent, hand-drawn illustration.
  - Perplexity: teal, serif headlines, editorial hierarchy, "looking like a newsroom".
  - ElevenLabs: "nearly monochrome, with a waveform used as the single recurring motif. No gradient. No glass."
  - Midjourney: "close to anti-design… lets the generated images carry the whole page… Most AI products show a UI; Midjourney shows output."
  - Runway: film and studio language and cinematic imagery.

  — [Setproduct](https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same)
- **Setproduct's eight tactics, in order of impact:**
  1. A colour audit of 20 competitors, then a colour outside the band, used everywhere.
  2. A typeface with a point of view (serif for editorial credibility, mono for technical honesty).
  3. "Show the output, not the orb": "Put an actual generated result in your hero".
  4. Kill the sparkle and design your own signifier, repeated (citing Ehrenberg-Bass distinctive-assets research).
  5. "Choose one recognizable transition and use it everywhere… one easing curve and one duration token".
  6. Borrow from a world outside software (print layout, lab equipment, film titles, cartography, archival records).
  7. Make the H1 a specific outcome for a specific person.
  8. Consider warm light mode when the category is dark.

  Its checklist: six or more "yes" answers means "you are wearing the uniform". — [Setproduct](https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same)
- **Heron AI (Bearplus, Oct 2026):** an AI agent site for architects designed "around the visual language of technical drawings instead of the usual look of AI products". Red is reserved for violations; the brief removed the word "AI". It is a fictional showcase product. — [Codrops: Inside Heron](https://tympanus.net/codrops/2026/10/12/heron-ai/); [Awwwards listing](https://www.awwwards.com/sites/heron-ai)
- Digidop: the 2025 "glow look" (e.g., Huly) is evolving into localized shaders and material effects. Figma's Config 2026 shader fills put this in designers' hands, so expect this to become the *next* commodity effect. — [Digidop](https://www.digidop.com/blog/5-web-design-trends-2025)
- **Observed (2026-11-08):**
  - Anthropic: #FAF9F5 warm off-white, custom serif statement H1, editorial photo of textiles and a ruler.
  - Granola: white, Quadrant serif, painterly artwork panel.
  - Dia: warm yellow, sunlight shadows, giant swash serif wordmark.
  - ElevenLabs: off-white, light-weight sans, colourful playable voice orbs.
  - Midjourney: animated ASCII field, mono font.
  - Attio: white, product UI with chat input.

  — [anthropic.com](https://www.anthropic.com/), [granola.ai](https://www.granola.ai/), [diabrowser.com](https://www.diabrowser.com/), [elevenlabs.io](https://elevenlabs.io/), [midjourney.com](https://www.midjourney.com/home), [attio.com](https://attio.com/) (screens: `anthropic_hero_desktop.png`, `granola_hero_desktop.png`, `dia_hero_desktop.png`, `elevenlabs_hero_desktop.png`, `midjourney_hero_desktop.png`, `attio_hero_desktop.png`)
- **Agency commentary** says messaging is the larger gap: "unlock productivity" and "AI-powered workflows" make brands indistinguishable even when polished. It recommends vertical focus and measurable outcomes. **Commercial blogs.** — [DesignRush: AI startup homepage design](https://www.designrush.com/agency/website-design-development/trends/ai-startup-homepage-design); [Human Creative](https://human-creative.co/insights/why-ai-startups-all-look-the-same/)

### Inferences
- Loupe's AI feature (tagging in designer language: colour names, materials, era, mood) is itself a distinctive visual asset. The tags *are* the output. Showing a real interior image with its real Loupe tags ("Travertine", "Burnt sienna", "1970s Italian", "Warm minimal") is the Loupe equivalent of "show the output, not the orb". It also avoids sparkle and "AI-powered" language.
- Loupe's "world outside software" is interior design itself: finish schedules, sample boards, paint fans, material tags and swing labels, spec-sheet typography. Heron and Programa prove this works in adjacent architecture and interiors niches.
- A custom signifier, for example a loupe or lens glyph used as the tag or "found" marker and the loading state, could replace generic AI iconography, following Setproduct's tactic 4.

### Gaps
- Perplexity's current site was not captured. Its description relies on Setproduct.
- No quantitative evidence (recall tests, conversion) that de-uniformed AI sites outperform was found. The argument rests on brand theory (Ehrenberg-Bass, Lindgaard) and practitioner opinion.

---

## Q6. Accessibility expectations for motion (prefers-reduced-motion, WCAG 2.2) and mobile-first hero patterns

### Takeaway
- **WCAG 2.2 Level A (2.2.2 Pause, Stop, Hide)** requires a pause, stop or hide control for any auto-moving content that lasts more than 5 seconds alongside other content. This covers marquees, auto-cycling hero images, looping hero video and rotating H1 words.
- **Level AAA (2.3.3 Animation from Interactions)** covers scroll- and interaction-triggered motion such as parallax. AAA is not a legal baseline, but honouring `prefers-reduced-motion` is now standard practice. GSAP and Lenis support it directly.
- The European Accessibility Act has pushed accessibility into briefs since June 2025.
- On mobile, the evidence says: don't port pinned or scroll-jacked sequences, keep the H1, CTA and real imagery inside the first screen, and watch for consent banners eating the hero.

### Cited Findings
- **WCAG 2.2 SC 2.2.2 Pause, Stop, Hide (Level A):** "For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless… essential". — [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- **WCAG 2.2 SC 2.3.3 Animation from Interactions (Level AAA):** "Motion animation triggered by interaction can be disabled, unless the animation is essential". The Understanding doc names **parallax scrolling** as often non-essential. It notes vestibular reactions ("dizziness, nausea and headaches… potentially needing bed rest") and lists honouring the OS reduce-motion setting as a sufficient approach. — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- The European Accessibility Act applies from 28 June 2025 to certain products and services sold in the EU (e-commerce, banking, transport, e-communications, e-books). Digidop notes it is "making its way into briefs… contrast, text size, keyboard focus, animations that can be turned off". — [Digidop](https://www.digidop.com/blog/5-web-design-trends-2025)
- GSAP's documented pattern is `gsap.matchMedia()` with `reduceMotion: "(prefers-reduced-motion: reduce)"` → `duration: reduceMotion ? 0 : 2`, with automatic revert. The SplitText rewrite added built-in screen-reader accessibility, so split headlines stay readable as whole words. — [GSAP matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/); [Webflow: GSAP becomes free](https://webflow.com/blog/gsap-becomes-free)
- NN/g on mobile: scrolljacking issues are "exacerbated on mobile". Sites that did not port it to mobile tested much better. Collapsed hamburger navs make escape harder. — [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- NN/g on dark mode (Raluca Budiu, 2 Feb 2020; **older; literature review, not NN/g testing**): "in users with normal vision, light mode leads to better performance most of the time". NN/g does not recommend dark by default for general audiences but recommends offering it. — [NN/g: Dark Mode vs. Light Mode](https://www.nngroup.com/articles/dark-mode/)
- **Mobile-first hero patterns observed (390×844, 2026-11-08):**
  - Cosmos: H1 with rotating noun, search field and a single "Download app" CTA, all inside the first screen; the floating tiles thin out.
  - Savee: H1 with inline image chips, two full-width-ish CTAs, and the saved-image masonry visible within the first screen.
  - mymind: serif H1, tag chips and one "Get the app" CTA, replacing the three desktop platform buttons.
  - Programa: audience eyebrow ("FOR INTERIOR DESIGNERS & ARCHITECTS") above the serif H1, two small CTAs, collage below.
  - Figma: H1 at top, product card fan in the middle, a large "Get started" in the thumb zone.
  - Eagle: pill, gradient H1 and "Download for Windows"; the screenshot shrinks below.
  - Granola: the **cookie banner covered roughly the lower half of the mobile hero**.
  - Linear: blank hero at +3.5 s.

  — (screens: `cosmos_hero_mobile.png`, `savee_hero_mobile.png`, `mymind_hero_mobile.png`, `programa_hero_mobile.png`, `figma_hero_mobile.png`, `eagle_hero_mobile.png`, `granola_hero_mobile.png`, `linear_hero_mobile.png`) — [cosmos.so](https://www.cosmos.so/), [savee.com](https://savee.com/), [mymind.com](https://mymind.com/), [programa.design](https://programa.design/), [figma.com](https://www.figma.com/), [eagle.cool](https://eagle.cool/), [granola.ai](https://www.granola.ai/), [linear.app](https://linear.app/)
- SaaS listicles put mobile at roughly 65% to 83% of landing-page traffic. **The figures conflict and are vendor-sourced; weak.** — [search summary of SaaS trend listicles](https://www.vezadigital.com/post/best-saas-landing-page-examples)

### Inferences
- **Hero checklist for Loupe:**
  - Honour `prefers-reduced-motion`: final states shown, no parallax, no smooth-scroll library.
  - Give any looping marquee, auto-cycling imagery or rotating H1 word that runs more than 5 s a visible pause control, or stop it after 5 s.
  - Never gate the H1 or hero imagery behind an animation.
  - Keep any pinned sequence desktop-only.
  - Make sure the consent banner doesn't cover the mobile hero CTA.
- Category peers convert desktop's multi-platform buttons (extension, iOS, Android) into one context-aware CTA on mobile, e.g. mymind's "Get the app". For Loupe, a mobile visitor should see the iOS app and share-sheet path first, and desktop visitors the Chrome extension.
- Given NN/g's light-mode readability finding, if Loupe stays dark, body copy needs a generous size and line height, and long text blocks should be minimal. Dark suits image-viewing but is weaker for reading.

### Gaps
- No 2025–2026 study quantifies how many users enable reduce-motion. No public data on reduced-motion share for design-professional audiences was found.
- I did not test the sampled sites' behaviour under `prefers-reduced-motion: reduce`. That would be a useful follow-up (Playwright supports `reducedMotion: 'reduce'`).
