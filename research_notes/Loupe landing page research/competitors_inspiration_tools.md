# Competitor teardown: visual-inspiration, saving and reference tools (for Loupe)

Method and source notes (read first):
- I loaded every homepage live on 2026-11-08 with Playwright (Chromium, 1440x900 desktop with a Mac Chrome UA, 390x844 iPhone UA, deviceScaleFactor 1, 6s settle). I pulled the H1/H2, nav, every visible link/button in the first viewport and all visible text, so the headlines and CTA labels below are copied from the live DOM, not paraphrased. Screenshots are in `research_notes/Loupe landing page research/screens/` as `<name>-desktop.png` / `<name>-phone.png`: mymind, cosmos, savee, arena, milanote, eagle, pinterest, pinterest-business, raindrop, pureref, muzli, designspiration, fabric, mem, kive, kosmik, sublime, tagbox, refern.
- Caveat: another researcher is writing to the same folder with `-mobile` suffixes, and some `-desktop.png` names overlap (mymind, cosmos, savee, arena, milanote, eagle). Every file I checked is 1440x900 of the same homepage, so whichever capture is on disk shows the same hero.
- Product Hunt returned 403 to scripts, and WebFetch could not resolve producthunt.com. Reddit (old.reddit.com and `.json`) returned 403 "Blocked". Web search did not bring up the relevant Reddit threads. User sentiment therefore comes from (a) App Store reviews, pulled from Apple's public RSS feed (`itunes.apple.com/us/rss/customerreviews/...`, US store, most recent plus most helpful, 2 pages each); (b) Reddit posts quoted in press (404 Media); (c) press and blogs. Each App Store quote gives the review title and date. Apple has no per-review URLs, so the link goes to the app's App Store page.
- The App Store rating and count shown with each app come from the iTunes Search API on 2026-11-08.

---

## 1. Hero and first-screen teardown, product by product

### Takeaway
The category has settled on one hero shape: a very large centered type headline (often inline-animated), one line of subhead, a dark pill "Join/Sign up for free" plus a light secondary pill, a minimal 3–5 item nav, and, from 2025–26, a floating "Get the app" QR card. Social proof is almost never above the fold. Only Fabric shows a rating and only Are.na shows longevity. Heroes split into two camps. The "feeling/promise" camp (mymind, Savee, Sublime, Are.na, Cosmos) uses type, collage or art. The "tool" camp (Milanote, Eagle, Raindrop, PureRef, refern) shows the product UI. refern is the only hero that shows AI/manual tags on images.

### Cited Findings

**mymind** (mymind.com). Screens: `mymind-desktop.png`, `mymind-phone.png`
- H1: "Remember everything. Organize nothing." Subhead: "All your [notes] [bookmarks] [inspiration] [articles] and [images] in one single, private place." Each bracketed word is a colored outline pill. — [mymind.com](https://mymind.com/)
- Nav: "What · Why · How" (each with a colored dot), "Log in", "Sign up" (orange pill). The hero CTAs are three grey pills, "iPhone app", "Browser Extension", "Android app", plus a "Watch the intro" link. On phone the single CTA is an orange "Download on the App Store" pill. — [mymind.com](https://mymind.com/)
- Visual and motion: a huge serif headline. Three autoplaying, looping, muted MP4s sit in the first viewport: a 2160×2160 frame, a 2200×1560 frame and a 456×972 phone frame. A phone mock slides in from the right. There is no social proof above the fold; "Trusted by thinkers & doers everywhere." appears further down. The footer reads "© mymind, inc. 2025", so the page may not have been fully refreshed in 2026. — [mymind.com](https://mymind.com/)
- Pricing framing: the homepage never states a price. Its lower CTA is "SIGN UP FOR FREE". The pricing page asks "What kind of mind are you?": Student of Life $79/year, Mastermind $129/year, a $299/year "Newton" tier "not yet available", and "The Bookmarker $4.99/mo" ("No fancy AI features"). It adds "Why should I pay for mymind? We don't run ads. We don't sell your data." — [mymind.com/pricing](https://mymind.com/pricing)
- App Store: 4.0★ from 417 ratings. — [App Store](https://apps.apple.com/us/app/id1520332347)

**Cosmos** (cosmos.so). Screens: `cosmos-desktop.png`, `cosmos-phone.png`
- H1 rotates. I sampled it every 1.5s for 30s and got "Find your next lamp with character" → "go-to outfit" → "art obsession" → "forever chair" → "signature bag" → "shoot reference" → "dream font" → "room-defining piece". A small image tile sits next to the phrase and the search box placeholder updates to match ("Search for lamps"). 3 of the 8 phrases are interiors objects (lamp, chair, room-defining piece). — [cosmos.so](https://www.cosmos.so/)
- There is no subhead. The hero is a live search bar with a color-search button (a ring of colored dots), then the CTA "Join Cosmos for free". A bottom-right card says "Get the app" with a QR code. A chevron points down. Nav: "Explore", "Sequence", "Shop", centered "COSMOS" wordmark, "Log in", "Sign up". On phone the header has a "Download" pill, the CTA becomes "Download app", and the visible-link scrape found no "Join Cosmos for free". — [cosmos.so](https://www.cosmos.so/)
- Social proof is below the fold: "Used by the world's leading creative teams, studios, and students." and a follow list of tastemakers including Athena Calderone (@athenacalderone). There is also a "Shop from brands like ENTIRE STUDIOS, Jeanerica, Colbo…" strip. — [cosmos.so](https://www.cosmos.so/)
- Pricing: "Free: Full access to core features — saving, organizing, searching, discovering, and collaborating. Premium: $8/month". — [cosmos.so/llms.txt](https://www.cosmos.so/llms.txt)
- App Store: 4.7★ from 5,685 ratings. — [App Store](https://apps.apple.com/us/app/id1577975475)

**Savee** (savee.com; savee.it 301-redirects to savee.com). Screens: `savee-desktop.png`, `savee-phone.png`
- H1: "The best place to save and share inspiration". Small rounded image tiles are set inline between the words, each with a "Show another save" button that swaps the image. Subhead: "References curated by designers, saved in one click and sorted into boards." CTAs: "Join for free" (black pill) and "See plans" (grey pill). — [savee.com](https://savee.com/)
- Nav: "Features", "Teams", "Pricing", Instagram and X icons, "Log in", "Join for free". A masonry grid of saves starts under the CTAs. A floating "Get the app / Scan with your phone." card has a phone mock. On iPhone, Google One Tap ("Sign in to Savee with Google") covers the bottom of the hero. — [savee.com](https://savee.com/)
- Just below the fold: "Trusted by designers at" logos, and a quote: "Savee is my playground for visual expression…" (Michael Lashford, Design Principal at Microsoft). — [savee.com](https://savee.com/)
- Pricing is on the homepage: Pro "$9 / mo Billed yearly"; Portfolio "$15 / mo"; Team "For studios & agencies $12 / seat/mo … Starts with 2 seats". — [savee.com](https://savee.com/)
- App Store: 4.6★ from 155 ratings. — [App Store](https://apps.apple.com/us/app/id1375238218)

**Are.na**. Screens: `arena-desktop.png`, `arena-phone.png`
- The H1 is just "Are.na is", followed by a lettered list: "a. Online software for saving and organizing the content that is important to you / b. A toolkit for assembling new worlds from the scraps of the old / c. [+]". The "+" is a button labelled "Add a description of Are.na". — [are.na](https://www.are.na/)
- Subhead with a live counter: "For the last 15 years and 91 days, Are.na has been a place for students, designers, academics, collectors, researchers, and many other people who defy categorization to share and connect ideas." CTAs: "Sign up" (navy) and "Download the app". The only desktop nav item is "Log in". — [are.na](https://www.are.na/)
- Visual: plain document-like typography on white. "How it works" tabs (Capture / Arrange / Search / Connect / Network) beside a real product screenshot just below the fold. Further down: "No ads, no personalized recommendations" and "20,516 people support Are.na through their Premium subscriptions." — [are.na](https://www.are.na/)
- Pricing on the homepage: "Free / forever"; Premium "$70 / year" or "$7 / month"; Supporter "$120 / year". — [are.na](https://www.are.na/)
- App Store: 4.9★ from 361 ratings. — [App Store](https://apps.apple.com/us/app/id1299153149)

**Milanote**. Screens: `milanote-desktop.png`, `milanote-phone.png`
- H1: "Get organized. Stay creative." Subhead: "Milanote is an easy-to-use tool for organizing creative projects." CTA: "Sign up for free" (orange; also in the nav). Nav: "How people use Milanote" (dropdown), "Log in", "Sign up for free". On phone the CTA is an App Store badge. — [milanote.com](https://milanote.com/)
- Visual: a dark slate background with a large real product screenshot of a "Project Ideas" board (notes, images, color swatch, comment) and a canvas element. A cookie banner covers the lower hero. Social proof below: "Used by creative professionals at:". The use-case list includes "Interior design: Plan projects, build moodboards, & organize materials". The signup block says "Free with no time limit". — [milanote.com](https://milanote.com/)
- Pricing (milanote.com/pricing returned 404 to my crawler): the free plan is "100 notes, images, and links plus 10 file uploads". Pro is about $9.99/user/month billed annually and Team about $49/month; sources disagree on the team size. — [Capterra](https://www.capterra.com/p/165790/Milanote/); [Toolradar](https://toolradar.com/tools/milanote/pricing)
- App Store: 4.7★ from 4,091 ratings. — [App Store](https://apps.apple.com/us/app/id1433852790)

**Eagle** (eagle.cool → en.eagle.cool). Screens: `eagle-desktop.png`, `eagle-phone.png`
- A pill reads "Eagle 4 Highlights ›". H1: "Organizing design files has never been easier" (gradient text on black). Subhead: "A better way to collect, search and organize your design files in a logical way, all in one place." CTA: "Download for Mac" (OS-detected, with a dropdown), then "v4.0.0 Build23 (2026-04-01) Supports macOS 10.15+". — [en.eagle.cool](https://en.eagle.cool/)
- Nav: "Home", "Extension", "Blog", "Resources", "Support", "Buy Now" (blue). Visual: a real app screenshot (dark UI, "AI Prompts" folder, image grid, color palette) under category tabs: "Prompts ideas, Illustration Design, Photography, Packaging Design, Interior Design, Concept Art, Motion Design, UI Design…". — [en.eagle.cool](https://en.eagle.cool/)
- Social proof is below the fold: "Trusted by Creatives Everywhere. Real feedback from 400,000+ satisfied users." — [en.eagle.cool](https://en.eagle.cool/)
- Pricing: "One-time purchase · free lifetime updates · No subscriptions or hidden fees." US$34.95; "Each license key can be used for 2 devices"; extra seats can be added. — [en.eagle.cool/store](https://en.eagle.cool/store)

**Pinterest**. Screens: `pinterest-desktop.png`, `pinterest-phone.png`, `pinterest-business-desktop.png`
- Logged-out H1 (the DOM uses no `<h1>`): "Create the life you love on Pinterest". CTAs: "Join Pinterest for free" (red) and "I already have an account" (grey). Nav: "Explore", "Shop", a search field ("Search for easy dinners, fashion, etc."), "About", "Businesses", "Create", "News", "Log in", "Sign up". Visual: a static collage of rounded photo cards. — [pinterest.com](https://www.pinterest.com/)
- Second fold: "Bring your favorite ideas to life. With Pinterest, you can unlock tools that spark your creativity and help you find more inspiration." The feature tiles are "Search by skin tone", "Collaborate with group boards", "Search visually with images". The signup form asks for a birthday "to provide more personalized recommendations and relevant ads". — [pinterest.com](https://www.pinterest.com/)
- Phone: "Continue with email", "Continue with Google", "I already have an account", plus a Google One Tap sheet. — [pinterest.com](https://www.pinterest.com/)
- Business site H1: "Grow your business on Pinterest". "Pinterest is where people discover new ideas, plan and shop." CTAs: "Sign up" and "Request meeting". — [business.pinterest.com](https://business.pinterest.com/)
- How Pinterest describes itself in 2025–26: CEO Bill Ready: "We've become a leader in visual search and have effectively turned our platform into an AI-powered shopping assistant for 600 million customers." — [eWeek](https://www.eweek.com/news/pinterest-layoffs-ai-2026/). YPulse summarizes this as "the CEO has rebranded from 'window shopping' to an 'AI-powered visual-first shopping assistant.'" — [YPulse, Nov 26 2025](https://www.ypulse.com/newsfeed/2025/11/26/speaking-of-ai-slop-pinterest-users-feel-their-feed-is-drowning-in-it/)
- Changes in 2025–26:
  - AI-powered boards (Oct 27 2025): auto-sorting tabs on boards, "Make it Yours" product recommendations for fashion and some home decor boards, and "Styled for You" AI collages. — [eWeek](https://www.eweek.com/news/pinterest-ai-personal-shopping-assistant/); [PPC Land](https://ppc.land/pinterest-adds-ai-features-to-boards-for-shopping-and-personalization/)
  - Pinterest Assistant (Nov 4 2025), a conversational shopping assistant that draws on your saved boards and Pins. — [Digital Commerce 360](https://www.digitalcommerce360.com/2025/11/04/pinterest-introduces-ai-powered-assistant-for-online-shopping-discovery/)
  - A GenAI "tuner" to see less AI content in categories "highly prone to AI modification or generation like beauty, art, fashion and home decor". — [MediaPost](https://www.mediapost.com/publications/article/409961/pinterest-updated-tool-features-help-users-reduce.html); [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2025/pinterest-launches-ai-shopping-assistant-and-gen-ai-controls/)
  - January 2026: layoffs of under 15% of staff, with "We're doubling down on an AI-forward approach". — [WTOP/AP](https://wtop.com/business-finance/2026/01/pinterest-will-lay-off-15-of-its-workforce-as-the-platform-pivots-resources-to-ai/); [404 Media, Feb 19 2026](https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/)
  - Public pins are used to train "Pinterest Canvas, the company's proprietary text-to-image AI". — [404 Media](https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/)

**Raindrop.io**. Screens: `raindrop-desktop.png`, `raindrop-phone.png`
- A pill reads "New: AI Assistant ↗". H1: "All-in-one bookmark manager". Subhead: "Intuitive. Powerful. Runs everywhere". CTAs: "Sign up" (blue) and "Download app" (text link). Nav: "Download", "Pricing", "Docs", "Integrations", "Blog", "Login". Visual: an autoplaying, looping product UI video (collections sidebar and bookmark list). — [raindrop.io](https://raindrop.io/)
- H2 under the fold: "Designed for ✐ creatives, built for {coders}". Further down: "No limits. Starting from $0 … Free to use indefinitely." — [raindrop.io](https://raindrop.io/). Pro is $28/year and adds "AI Assistant, AI Suggestions, MCP, Full-text search…". — [raindrop.io/pro/buy](https://raindrop.io/pro/buy)

**PureRef**. Screens: `pureref-desktop.png`, `pureref-phone.png`
- H1: "All your reference images in one place." H2: "Organize your inspiration and speed up your creative process with PureRef." CTAs: "Get PureRef ›" and "Learn more". Nav: "Download", "Forum", "Support". Visual: a dark illustrated canvas mock with grouped images labelled "Sunset" and "Mountains". — [pureref.com](https://www.pureref.com/)
- Pricing is a pay-what-you-want style checkout ("Select amount: $15 / $7 / Custom Amount"), plus "Small business: Commercial use, Max. 3 users per studio" and "Business: Per seat". — [pureref.com/download.php](https://www.pureref.com/download.php)

**Muzli** (curated-feed adjacent). Screens: `muzli-desktop.png`, `muzli-phone.png`
- H1: "Designers' Secret Source". H2: "The best design inspiration - expertly curated for you." Body: "Muzli is a new-tab browser extension that instantly delivers relevant design stories and inspiration to keep you in the loop." CTA: "Get Muzli for Chrome" ("Get Muzli for Safari" on iPhone). Visual: a grid of colorful shots. Nav includes "Advertise on Muzli" and "Muzli PRO". — [muz.li](https://muz.li/)

**Designspiration**. Screens: `designspiration-desktop.png`, `designspiration-phone.png`
- H1: "Save & explore ideas that inspire your creativity." Subhead: "Save creative inspiration, colors, links, notes, screenshots with our new Browser Extension." CTA: "Sign Up", then "Scroll to See More". Visual: a pink gradient, an extension popup mock ("What inspires you?", "Save to collection", "Search my collections", collections "Apartment", "Architecture") and a row of color-palette swatches. Nav: "Explore", "Get Pro", "Log in", "Sign up". — [designspiration.com](https://www.designspiration.com/)

**Newer or adjacent entrants**
- **Sublime** (`sublime-desktop.png`): H1 "inspiration is everywhere. and nowhere."; "sublime gives your ideas one place to grow." Nav "login", "try now" (green). There is a "mute" toggle, so the hero has sound, and a large 3D moss-covered rock sculpture with a butterfly. Pricing framing: "it's free until you can't live without it." Premium $75/yr, premium+ $100/yr, lifetime $400. — [sublime.app](https://sublime.app/); [sublime.app/pricing](https://sublime.app/pricing)
- **Fabric** (`fabric-desktop.png`): the only hero with social proof above the headline, "4.6 ★★★★★ 3.5K+ app ratings". H1 "Your second brain". Subhead "A home for your files, photos, videos, notes and meetings, with an AI that knows all of it." CTA "Try for $0". Nav "Teams, Students, Individuals, Features, Download, Pricing". — [fabric.so](https://fabric.so/)
- **refern** (`refern-desktop.png`): H1 "Every reference you work from, in one place." Subhead "refern is a library and reference board for your images, videos, working files, and saved web pages. Save from anywhere, find anything again, and lay it out beside your work." CTA "Download free for macOS" plus "Other platforms"; "30-day free trial · No card needed". Visual: a real app screenshot in which every image card shows tag chips (#night sky, #sunset, #building, #clouds). — [refern.app](https://www.refern.app/)
- **Tagbox.io** (team DAM, `tagbox-desktop.png`): H1 "A SMART, SEARCHABLE MEDIA LIBRARY" ("SEARCHABLE" is circled). Subhead "Powered by AI that understands your photos and videos. Backed by humans who understand you." CTAs "Let's Talk" and "Start Free Trial". Visual: tiles of sneaker photos alternating with dashed icon tiles (search, upload, star). — [tagbox.io](https://www.tagbox.io/)
- **Pivots and shutdowns, a notable 2026 signal:**
  - **Kosmik** (an AI-auto-tagging moodboard canvas) now has the H1 "Kosmik is winding down…" and says "Kosmik will sunset on May 31st 2026". Its 2025 Kosmik 3 had added "auto-tagging, AI search and more". — [kosmik.app](https://www.kosmik.app/)
  - **Kive** (formerly an AI-tagged inspiration library) now leads with "On-brand visuals made by AI … Create stunning product shots" for consumer brands. — [kive.ai](https://kive.ai/)
  - **Mem** now leads with "Your AI chief of staff." — [get.mem.ai](https://get.mem.ai/)
- "Sciter" turned up no matching product. "Tagbox" maps to Tagbox.io, a general team DAM that is not designer-specific.

### Inferences
- The two-pill hero ("Join for free" + "See plans" / "I already have an account") and the floating QR "Get the app" card (Cosmos, Savee) are now table stakes. A Loupe hero needs no more than that. It should spend its novelty on the visual, as the others do with type and motion.
- Cosmos is already courting interiors in its hero: "lamp with character / forever chair / room-defining piece", Athena Calderone in its tastemaker list, a Shop tab, and a founder story about "starting a furniture gallery, designing my own space". It is the closest consumer-side threat for Loupe's audience. Its pitch is discovery and taste, not a studio's working library.
- The AI-tagging entrants that pitched mainly on AI organizing have pivoted or shut down (Kosmik, Kive, Mem). The survivors pitch taste, calm or curation (Cosmos, Savee, Are.na, Sublime) or workflow and speed (Eagle, refern). "AI organizes your stuff" alone does not hold a homepage in 2026.
- No hero shows the product's AI output in a domain vocabulary. refern shows generic tags (#sunset). Savee's demo search is "burnt orange". Cosmos's rotating noun phrases come closest.

### Gaps
- I could not verify mymind's current free tier. An older 2023 review says "freemium plan, which permits me to save 100 items for free" ([Eshwar Nag, May 2023](https://www.eshwarnag.com/how-mymind-fulfilled-and-fell-short-of-its-promise/)), but the 2026 pricing page lists only paid tiers.
- Milanote's official 2026 pricing page 404'd for my crawler. Prices are from Capterra/Toolradar.
- Screenshots are single frames. Motion was inferred from DOM state (autoplay/loop video attributes, rotating H1 samples), not recorded as video.

---

## 2. How they explain AI tagging and "search by describing"

### Takeaway
The phrasing that works avoids the word "AI" in the headline and promises the outcome as relief from filing ("Organize nothing", "no need to remember filenames or tags", "however you remember it"). It then makes it concrete with search examples: color names, objects, "by meaning", "by feeling". Specific nouns read as less generic: Cosmos's "lamp with character", Savee's "burnt orange", Tagbox's "logo on the van". The most distinctive 2026 language is about taste and your own vocabulary: Tagbox's "Teach it… your words", Sublime and Savee's "your taste comes with you" / "Give your AI agents taste".

### Cited Findings
- mymind: "No need to file it, label or even tag it. It's all magically organized and visualized for you." / "Just save it. Artificial Intelligence takes care of the rest." / "mymind understands what it is and remembers the important details, so you don't have to." / "Folders are dead. This is your personal search engine. Search by color, keyword, brand, date – whatever you think of first. Associative search & visual cues work with your brain to find it instantly." — [mymind.com](https://mymind.com/)
- mymind pricing copy: "AI Image Tagging: mymind automatically tags every image you save, making it easy to find again later with a simple search." / "Advanced Image Search: Search any object, color, detail, theme, style or text appearing within an image" / "Same Vibe: A mood board magically made for you. mymind analyzes an image and collects others you've saved with a similar look & feel." / "Image Text Recognition: Your mind can read screenshots, memes & other images with text." — [mymind.com/pricing](https://mymind.com/pricing)
- Savee: "Finding the right reference took hours. Now it's one search. Every designer has a folder of screenshots nobody can find anything in. Savee turns it into a library you can search by word, by color, by image or by tag." The demo search field types "burnt orange". Also: "Discover more like it. Save something you love and Savee shows you what sits next to it." — [savee.com](https://savee.com/); [savee.com/features](https://savee.com/features/)
- Savee and AI agents: "Give your AI agents taste. Savee MCP connects Claude, Cursor and any MCP-compatible tool to your library and to 6M+ curated references, so what your agent makes starts from taste, not guesses." — [savee.com](https://savee.com/)
- Cosmos: "Search by color: Find inspiration in the exact shade you have in mind." / "Find similar elements: Start with an image you love and find more like it." / "Show, blur, or hide images flagged as AI-generated." — [cosmos.so](https://www.cosmos.so/). Its AI captions research "every image on Cosmos across the web and synthesizes the findings into a caption: who created it, what it depicts, where it was published, when it came out, and its cultural lineage." — [Cosmos blog, Jan 20 2026](https://www.cosmos.so/blog/the-future-of-cosmos)
- Eagle: "AI Search: Understand images the way you do. Search by image, by meaning, or across platforms — no need to remember filenames or tags." / "AI Action: Let AI organize assets your way. Set naming rules, tagging logic, and workflow steps once — then let AI run the process for you" / "What once took 1 hour now takes just 5 minutes." — [en.eagle.cool](https://en.eagle.cool/)
- Fabric's designer line, the closest to Loupe's own pitch: "Designers -> A visual library that finds anything by description, colour, or mood." Its agent vignette: "Ada (AI) built a moodboard from everything Priya saved this month." — [fabric.so](https://fabric.so/)
- Sublime: "find the thing, however you remember it — finally, search that works the way you think — by context, feeling, or half-remembered details." / "when everyone has the same tools, your references become your advantage." — [sublime.app](https://sublime.app/)
- Tagbox.io: "You don't have to remember where you put your photos and videos. You only have to remember something about them." / "DESCRIBE IT: Search in plain language and find what you actually meant." / "IF YOU CAN DESCRIBE IT, YOU CAN FIND IT" / "Tags & Metadata: What the AI can't know - add it yourself" / "Custom AI Tagging: Teach it your products and your words … learns the things generic AI has never heard of - your product names, your logo, the details only your team would know to look for." — [tagbox.io](https://www.tagbox.io/)
- Raindrop explains search without the word AI: "Full-text search: The entire content of every web-page, PDF, and even YouTube video you've saved is fully searchable — down to every spoken word. Look deeper beyond titles and tags." — [raindrop.io](https://raindrop.io/)
- Are.na and Milanote do not pitch AI. Are.na: "On Are.na, there's nothing algorithmic steering you into any particular direction." — [are.na](https://www.are.na/)
- Independent view of mymind tagging (2023, older): it "worked exceptionally well in extracting colours from images" but was weaker elsewhere, and "when manual tags are added … MyMind does not display the tags that were automatically generated". — [Eshwar Nag, 2023, via search summary](https://www.eshwarnag.com/how-mymind-fulfilled-and-fell-short-of-its-promise/)

### Inferences
- Recurring phrase families Loupe should either borrow or deliberately avoid as clichés:
  - "remember everything / whatever you think of first / however you remember it"
  - "search by color, by image, by tag / by description, colour, or mood"
  - "no need to file/label/tag"
  - "find more like it / same vibe"
- No competitor shows designer-trade vocabulary in its AI copy: material names (travertine, bouclé, burl, fluted oak), era or provenance (1970s Italian, Art Deco), or professional color names. Savee's "burnt orange" is the only named color. Loupe can stand apart by showing real tags it wrote on a real interior image.
- Tagbox's "What the AI can't know - add it yourself" is the clearest framing in the set for AI tags plus manual tags (Loupe has both). No designer-facing tool says it this well.
- The 2026 trend is "your taste goes into your AI tools" through MCP (Savee, Sublime, Raindrop, Eagle, Fabric). Loupe's equivalent, which none of them name, is that your library goes into Canva or any canvas.

### Gaps
- I could not measure which phrasing converts. No public A/B or conversion data was found.

---

## 3. Positioning against Pinterest, folders, screenshots and bookmarks

### Takeaway
Pinterest is the shared enemy, but almost no homepage names it. The anti-Pinterest case is made by implication: "no ads", "no algorithm", "no likes", "curated by designers". The open naming happens in founder posts, imports and app reviews. Folders and screenshots are named directly (mymind: "Folders are dead."; Savee: "a folder of screenshots nobody can find anything in"). Pinterest's 2025–26 turn to AI shopping, AI-generated content and AI moderation has made "human, calm, credited" the dominant counter-position.

### Cited Findings
- mymind's manifesto lists what "We promise" to leave out: "social features / vanity metrics / social pressure / collaboration / ads". — [mymind.com](https://mymind.com/). The Why page: "Why do bookmarking tools have social features? Why do we use folders? Dropdowns? Are these outdated UI patterns still useful or are they just clutter?" — [mymind.com/why](https://mymind.com/why)
- Savee's meta description: "Discover references chosen by designers, collect what matters, and build a sharper eye without ads or clutter." — [savee.com](https://savee.com/)
- Cosmos founder story: "My visual references were all over the place: saved posts on Instagram, screenshots in folders, images buried in my camera roll… the reaction was: 'Great. Now I can finally stop using my burner Pinterest account.'" and "Slop in, slop out. Quality in, quality out." — [Cosmos blog, Jan 20 2026](https://www.cosmos.so/blog/the-future-of-cosmos). Cosmos imports "existing Pinterest boards, Are.na channels, and Tumblr blogs" and describes itself as "a Pinterest alternative built for designers, photographers, architects, artists, and creative teams". — [cosmos.so/llms.txt](https://www.cosmos.so/llms.txt)
- Cosmos changed saving in Jan 2026 because filing into "clusters" "made saving feel like a decision instead of an instinct — asking you to explain why you liked something before you could simply keep it. Now, saving is instant." — [Cosmos blog](https://www.cosmos.so/blog/the-future-of-cosmos)
- Are.na: "No ads, no personalized recommendations… The content you are exposed to is only based on a network you've intentionally cultivated." — [are.na](https://www.are.na/)
- Eagle takes the opposite approach and treats Pinterest as a source. Its "Pinterest Visual Search" plugin lets "Any image … be the starting point for inspiration". — [en.eagle.cool](https://en.eagle.cool/); [Eagle 4 post, 2024-07-30](https://en.eagle.cool/blog/post/eagle4)
- refern's homepage testimonials: "It replaced PureRef, folder searching and pinterest for me!" It imports "your Eagle or Allusion library, PureRef boards, and public Pinterest boards and sections." — [refern.app](https://www.refern.app/)
- Raindrop frames itself against bookmark mess, not Pinterest: "Raindrop.io is not just a pretty interface, it can help you untangle your bookmarks mess." / "We're not trying to reinvent the wheel." — [raindrop.io](https://raindrop.io/)
- Fabric positions against shared drives: "Stop sending Google Drive links. Share with anyone, beautifully." — [fabric.so](https://fabric.so/)
- Pinterest context:
  - "Many users who came for human-created inspiration are leaving for platforms like Cosmos and Tumblr." — [YPulse summarizing CNN, Nov 2025](https://www.ypulse.com/newsfeed/2025/11/26/speaking-of-ai-slop-pinterest-users-feel-their-feed-is-drowning-in-it/)
  - Counterpoint on scale: Pinterest still describes itself as serving "600 million customers". — [eWeek quoting CEO Bill Ready](https://www.eweek.com/news/pinterest-layoffs-ai-2026/). I found no hard data on how many designers have actually left.
- Interiors-specific Pinterest pain: designers say clients now arrive with AI-generated room images "that look complete but often cannot be built". — [TBBW](https://tbbwmag.com/?p=91077); [Designdash](https://designdash.com/design/ai-images-instagram-and-an-interior-designers-duty-to-disclose/) (trade blogs, anecdotal)

### Inferences
- For interior designers, "Pinterest is full of AI rooms that can't be built" is a sharper, more professional pain than the consumer "too many ads" complaint. A library of what you actually saved, with its source, is a credible counter-position. So is "your sources, not the feed's suggestions".
- "Screenshots in your camera roll" and "a folder nobody can find anything in" are the problem statements competitors use most. Loupe's iOS share sheet plus AI tags answers them directly.
- Nobody positions against the studio's shared drive or Dropbox of inspiration ("whose library is it when a designer leaves?"). Fabric touches drives in general, not for design studios.

### Gaps
- I could not get Reddit threads directly (403). Pinterest sentiment from designers comes from press quoting Reddit, not first-hand thread reads.

---

## 4. What users love and hate (verbatim)

### Takeaway
Across the category, users love calm (no ads, no algorithm), beauty, saving without filing and one-tap capture. They hate subscription pressure and limits, AI-generated content leaking into feeds, forced app downloads and logins, UI changes that hide things, and AI features that are unreliable or metered. There is a strong anti-AI-content sentiment, and it also lands on tools that merely use AI: users praise Are.na and Milanote for having none.

### Cited Findings
mymind ([App Store](https://apps.apple.com/us/app/id1520332347))
- Love: "I am in love with this app's stunning design, as well as the powerful way it organizes your notes without distracting you with folders, tags, and so on." ("Great App", 5★, 2025-11-01)
- Love: "Love that it is algorithm-free and easy on the brain." ("This is mymind", 5★, 2026-03-21)
- Love: "The system of tags and descriptions make it easy to find things with sometimes only one keyword." ("Beautiful and Purposeful", 5★, 2025-11-11)
- Mixed: "While the smart tagging is a great start, I still found myself wishing for a stronger sense of conte[xt]…" ("A beautiful tool that continues to evolve.", 5★, 2025-05-28)
- Hate: "You'll quickly hit limits that push you into a monthly subscription just to keep using what you've already saved. Feels like a trap." ("Overhyped & Underwhelming", 1★, 2025-05-12)
- Hate: "Not worth having a monthly subscription… I'll just use my free notes app" ("Meh", 2★, 2026-05-26)
- Hate: "I got the app thinking it would help organize my mood boards across platforms, but sadly I found it no more helpful than IOS screenshots and iCloud photo album features." ("A bit useless.", 2★, 2025-06-12)
- Wish: "I wish I could move the cards around and organize them" ("i like this app", 4★, 2025-11-08); "The only thing that is keeping me from subscribing is there is no family sharing!" (4★, 2025-10-23)

Cosmos ([App Store](https://apps.apple.com/us/app/id1577975475))
- Love: "Used for 10 minutes, already so so much better than Pinterest … there are no ads- so I feel like I can actually think and explore freely" (5★, 2026-11-04)
- Love: "Pinterest has become AI slop and 5 ads per 1 post. This app is great!" ("I love the no ADs and AI!!!", 5★, 2026-09-17)
- Plea: "PLEASE DO NOT do ANYTHING with AI I BEG." ("DEVS PLEASE READ", 5★, 2026-09-25)
- Hate: "I came to this trying to escape the capitalist hellscape that Pinterest has become, but I was met with AI content in every corner of this app. Even after toggling AI content to be hidden…" ("AI everywhere unfortunately", 2★, 2026-08-17)
- Hate: "I was met with a popup directing me to download Cosmos, with no visible option to dismiss it" ("Forced app download…", 2★, 2026-10-25)
- Wish: "The one thing I wish there was is the ability to annotate or write notes on yo[ur saves]" (5★, 2026-11-04)
- Older press (Nov 2024): Creative Bloq said Cosmos "hit number one in the graphics and design category in the Apple App Store in 22 countries and has grown by 100,000 users" in two weeks. — [Creative Bloq](https://www.creativebloq.com/design/social-media/what-is-cosmos-the-pinterest-alternative-for-creatives). Cosmos's own 2026 figure: "people save over 10 million images a month". — [Cosmos blog](https://www.cosmos.so/blog/the-future-of-cosmos)

Savee ([App Store](https://apps.apple.com/us/app/id1375238218))
- Love: "Whether it's personal work flows or integrated for the creative teams I run, this platform serves all who care about taste." ("Worth the investment", 5★, 2026-10-21)
- Hate: "there is only about 20 photos there, and limited amount of pictures when I search something up" ("Good…kinda…", 2★, 2026-04-16)

Are.na ([App Store](https://apps.apple.com/us/app/id1299153149))
- Love: "one of the few app subscriptions i have and stand by— without utilizing algorithmic feeds or ai search elements, your experience is organic" ("the app of all time", 5★, 2026-01-04)
- Love: "Amazing - what Pinterest wishes it was" (title, 5★, 2025-12-18); "The subscription is 1,000% worth the ad-less experience." (5★, 2026-03-11)
- Hate: "After the most recent update I can't figure out how to sort…" (4★, 2025-12-23)

Milanote ([App Store](https://apps.apple.com/us/app/id1433852790))
- Love: "unlike Canva, it doesn't have any AI assistants. In fact, Milanote has completely rejected AI completely." (5★, 2026-07-29; this is a user's claim, not verified against Milanote policy)
- Limit: "My only real problem is that you only get 100 assets" (5★, 2026-08-05)
- Love: "I used to use Pinterest but this works 10 times better!" (5★, 2026-09-01)

Raindrop ([App Store](https://apps.apple.com/us/app/id1021913807))
- Love: "Stella AI is worth the cost of admission. Given permissions, it can organize hundreds of bookmarks with one prompt." (5★, 2026-05-12)
- Hate: "suddenly i cannot share a collection with a link … it results in 404 error" (1★, 2026-10-10)

Fabric ([App Store](https://apps.apple.com/us/app/id6449003046))
- Hate: "Tagging doesn't work properly. I can't create new tags after saving an item, and I can't remove AI created tags without getting an error. Since tagging is critical…" ("Good idea, poor execution", 2★, 2026-02-23)
- Hate: "AI Token Vending Machine … On highest paid tier, Ran out of AI usage my very first 1.5 weeks" (1★, 2026-04-13)

Pinterest (Reddit and artists quoted in [404 Media, Feb 19 2026](https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/))
- "I can't even scroll through 100 pins without 95 out of them being some AI slop or theft… I don't want to triple check my sources every single time I look at a pin" (r/Pinterest post)
- "Pinterest keeps automatically adding the 'AI modified' tag to my Pins…every time I appeal, Pinterest reviews it and removes the AI label. But then… the same thing happens again" (r/Pinterest post)
- An artist who keeps reference material on Pinterest: "Female figures in particular, even if completely clothed, get taken down and I have to keep appealing those decisions." (Tiana Oreglia)

Eagle (vendor-curated testimonials, so not independent)
- "definitely a 'Second Brain' for designers" / "I also made a stock library with my team through Dropbox, and we contribute it easily." — [en.eagle.cool](https://en.eagle.cool/)

### Inferences
- The AI-content backlash means Loupe should say plainly that its AI describes your saves and never generates or injects images. Cosmos's "Show, blur, or hide images flagged as AI-generated" shows that users read AI hygiene as a feature.
- The Fabric review exposes a trust gap. Users want AI tags they can edit or remove and manual tags that sit alongside the AI ones. Loupe supports both, which suits the claim "AI tags you can correct".
- mymind's sharpest complaints are about lock-in ("push you into a monthly subscription just to keep using what you've already saved"). Loupe's "download boards as zip" and "free to use" answer that and belong near the pricing line.

### Gaps
- I could not read Product Hunt reviews (blocked) or X/Twitter (not reachable without auth). The App Store sample is US-only and capped at about 100–180 recent and helpful reviews per app. Savee had only 17 retrievable reviews.

---

## 5. Who targets teams and studios, and how they talk about shared libraries and ownership

### Takeaway
Savee is the only inspiration tool with a dedicated "Teams" nav item, seat pricing and ownership language ("a space that stays the team's own"). Even there, ownership means team identity (name and logo), not that the studio keeps the library when people leave. Cosmos claims "creative teams, studios" as social proof and makes collaboration free. Milanote sells client and team collaboration. mymind is explicitly anti-collaboration. Fabric and Tagbox have the strongest team and DAM language, but they are not designer inspiration tools. No one offers "the studio owns the library" as a promise.

### Cited Findings
- Savee: "One library for the whole team. Shared boards everyone saves to, comments where the reference is, and a space that stays the team's own." / "Shared boards: Everyone saves into the team's boards, from the site, the extension or the app, and it's there for the whole team the moment it lands." / "A team feed: A feed curated by your own people" / "Seats and roles: Start with two seats and add one at a time. Admins invite members and manage roles; the team's name and logo are its own." Team plan: "For studios & agencies $12 / seat/mo … Starts with 2 seats". — [savee.com](https://savee.com/); [savee.com/team](https://savee.com/team/create/)
- Cosmos: "Used by the world's leading creative teams, studios, and students." / "Collaborate together: Invite others to build collections with you." — [cosmos.so](https://www.cosmos.so/). "Collaboration: Share clusters with team members for collaborative mood boarding and brainstorming. Collaboration is free for all users." Target audience includes "interior designers … and creative teams at agencies and studios". — [cosmos.so/llms.txt](https://www.cosmos.so/llms.txt). "Nearly every creative team we talk to either uses Cosmos, or knows someone who does." — [Cosmos blog](https://www.cosmos.so/blog/the-future-of-cosmos)
- Milanote: "Collaborate with clients & your team. Milanote makes teamwork easy (and fun). Invite others to edit, comment or just view your boards and collaborate like you're in the same room." — [milanote.com](https://milanote.com/)
- mymind lists "collaboration" among the things it promises not to have, and its pricing says "100% private: Nobody can see what you save to your mind." — [mymind.com](https://mymind.com/); [mymind.com/pricing](https://mymind.com/pricing)
- Raindrop: "Designed to be personal. Great for teamwork. Enable access to your collection by coworkers, family or the entire web." Collaboration is free. — [raindrop.io](https://raindrop.io/); [raindrop.io/pro/buy](https://raindrop.io/pro/buy)
- Eagle has no native team library on its homepage. Testimonials describe teams sharing through Dropbox or Google Drive sync, and licenses can "add extra seats". — [en.eagle.cool](https://en.eagle.cool/); [en.eagle.cool/store](https://en.eagle.cool/store)
- PureRef's studio licensing: "Small business: Commercial use, Max. 3 users per studio". — [pureref.com/download.php](https://www.pureref.com/download.php)
- Fabric Teams: "One place for your team's files, knowledge and AI … One source of truth." / "Every new hire starts from scratch." / client portals: "Publish any space as a polished portal for clients… No login required. Just a link." / "Password protect any shared space" / "See who viewed your shared links." — [fabric.so/teams](https://fabric.so/teams); [fabric.so](https://fabric.so/)
- Tagbox.io: "IF YOUR TEAM SHOT IT, YOUR TEAM CAN FIND IT" / "WHAT YOUR TEAM CALLED IT" / "Most teams arrive from folders and shared drives without knowing what a DAM even is" / "A branded gallery instead of a folder link." — [tagbox.io](https://www.tagbox.io/)
- Pinterest offers "Collaborate with group boards", but boards belong to individual accounts. — [pinterest.com](https://www.pinterest.com/)
- Kosmik, which sold to "team presentations", shuts down May 31 2026 and points users to "Learn how to export your data". — [kosmik.app](https://www.kosmik.app/)

### Inferences
- "The studio owns the library" (it survives staff turnover and isn't scattered across personal Pinterest accounts or one designer's mymind) is unclaimed. Savee's "stays the team's own" is the nearest phrase, and Loupe can go further with something like "When a designer leaves, the library stays."
- Fabric's "Every new hire starts from scratch" names an onboarding pain that maps directly onto studios. No inspiration tool uses it.
- Client-facing sharing (Fabric portals, Milanote client collaboration) is a natural extension for interior studios. Loupe's Canva app is the bridge from library to client board, and no inspiration competitor names Canva.

### Gaps
- I could not confirm whether Are.na's group or channel collaboration is pitched to studios. It is not on the homepage.
- No competitor publishes how many team accounts it has.

---

## 6. Patterns: what is conventional, and what is missing that Loupe could own

### Takeaway
Convention: a big-type promise, two pill CTAs, "for free", minimal nav, QR app card, calm/no-ads/no-algorithm positioning, "search by color/image/tag", and MCP or AI-agent hooks from 2026. Missing: a hero aimed at interior designers, real AI tags in trade vocabulary shown on a real image, studio-owned libraries, getting images out into the canvas designers already use (Canva), and an explicit "AI that describes, never generates" stance.

### Cited Findings
- Headline lengths and styles: mymind "Remember everything. Organize nothing."; Savee "The best place to save and share inspiration"; Cosmos "Find your next [rotating noun]"; Milanote "Get organized. Stay creative."; Eagle "Organizing design files has never been easier"; PureRef "All your reference images in one place."; refern "Every reference you work from, in one place."; Sublime "inspiration is everywhere. and nowhere."; Fabric "Your second brain"; Pinterest "Create the life you love on Pinterest". — homepages cited in section 1
- "In one place" recurs: PureRef, refern, mymind ("in one single, private place"), Eagle ("all in one place"), Sublime ("one place to grow"), Fabric ("One place for your team's files"). — homepages cited in section 1
- Free framing: "Join for free" (Savee), "Join Cosmos for free", "Sign up for free" / "Free with no time limit" (Milanote), "Join Pinterest for free", "Try for $0" (Fabric), "Starting from $0 … Free to use indefinitely" (Raindrop), "Free / forever" (Are.na), "it's free until you can't live without it." (Sublime), "Download for free" / "30-day free trial · No card needed" (refern). Eagle is the exception with "Buy Now" and "One-time purchase". — homepages cited in section 1
- QR "Get the app" cards: Cosmos ("Get the app" + QR), Savee ("Get the app / Scan with your phone."). — [cosmos.so](https://www.cosmos.so/); [savee.com](https://savee.com/)
- MCP/agent mentions in 2026: Savee ("Give your AI agents taste"), Sublime ("Take your taste anywhere you create — Claude or any LLM (via MCP), CSV, or ZIP"), Raindrop Pro ("MCP"), Eagle ("Eagle MCP / Skill"), Fabric ("MCP"), Are.na ("SDK, MCP, and other resources"). — [savee.com](https://savee.com/); [sublime.app/pricing](https://sublime.app/pricing); [raindrop.io/pro/buy](https://raindrop.io/pro/buy); [en.eagle.cool](https://en.eagle.cool/); [fabric.so/teams](https://fabric.so/teams); [are.na](https://www.are.na/)
- Export/zip appears only deep in pages: Sublime ("CSV, or ZIP"), Raindrop ("Import and export"), Kosmik ("Learn how to export your data"). — [sublime.app/pricing](https://sublime.app/pricing); [raindrop.io/pro/buy](https://raindrop.io/pro/buy); [kosmik.app](https://www.kosmik.app/)
- Getting work out to tools: Sublime ("bring your ideas into the tools you already use — from Google Docs to ChatGPT and Claude"); refern ("lay it out beside your work"); Savee's footer lists a "Figma Plugin"; Eagle offers drag-and-drop. I found no Canva integration mentioned on any competitor homepage. — [sublime.app](https://sublime.app/); [refern.app](https://www.refern.app/); [savee.com](https://savee.com/); [en.eagle.cool](https://en.eagle.cool/)
- Interior design shows up as one use case among many (Milanote's "Interior design" tile, Eagle's "Interior Design" tab and blog post, Cosmos's rotating interiors nouns and llms.txt audience list). None is interiors-first. — [milanote.com](https://milanote.com/); [en.eagle.cool](https://en.eagle.cool/); [Eagle blog](https://eagle.cool/blog/post/how-to-organize-interior-design-inspirations-and-files); [cosmos.so](https://www.cosmos.so/)

### Inferences
Loupe white space, ranked by how clearly it is uncontested:
1. **Interiors-first hero.** Name interior designers and studios in the H1 or subhead. Every competitor is horizontal ("creatives", "designers", "visual minds").
2. **Show the AI tags, in trade language, on a real interior image**, ideally a typed search like "travertine side table, 1970s, warm" resolving to saved images. refern shows tags but generic ones (#sunset). Savee and Cosmos show search but not tags. This is the strongest proof that the tagging isn't generic.
3. **"Your studio owns the library."** Studio-owned shared boards that outlive staff changes. Savee's "stays the team's own" is the only nearby claim, and it is about branding.
4. **From library to canvas.** "Drag into Canva or any canvas" via the Canva app and Chrome sidebar. No competitor names Canva, though interior designers build client boards there (another researcher's notes cover Canva).
5. **AI that describes, never generates.** Given the Pinterest and Cosmos backlash, say plainly: no AI images in your feed, no feed at all. Your saves, tagged. Cosmos's AI show/blur/hide toggle shows this matters to users.
6. **No lock-in.** "Download any board as a zip" next to "Free to use", as a direct answer to the mymind-style "feels like a trap" complaint.
7. **Capture everywhere in one line**: Chrome extension, iOS share sheet, iOS app. mymind does this with three app pills; Loupe can match it and add the Canva app.

Conventions to keep, because they read as category-native: a big confident type headline, a dark "…for free" pill plus a secondary text pill, at most 4–5 nav items, a QR "Get the app" card on desktop, and a calm off-white background with real imagery.

### Gaps
- I have no quantitative data on which hero patterns convert in this category.
- I did not capture Are.na Groups, Savee's admin and ownership terms of service, or whether any competitor's team plan keeps content when a member leaves. These would need logged-in testing or a read of each product's ToS.
