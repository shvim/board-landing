# Hero copy that converts: headlines, subheads, CTAs, "free" framing and AI messaging (for Loupe, Nov 2026)

Scope and method notes for the report writer:
- WebFetch could not reach most sites in this session (signalvnoise.com, mymind.com, milanote.com, figma.com and notion.com all failed DNS under the session's network policy). Findings therefore come from (a) web-search result extracts of primary pages and (b) **live homepage screenshots captured on 2026-11-08** that sit next to this file in `screens/` (another researcher took them; I read them directly). Where a claim rests only on a search summary of a secondary blog, it is marked as such.
- Evidence tiers used below: **[TEST]** = a published A/B or controlled experiment with a number; **[STUDY]** = peer-reviewed or a large survey; **[CORR]** = observational benchmark data; **[OBS]** = what live pages say today; **[OPINION]** = practitioner advice. Classic (pre-2022) sources are marked **(classic)**.
- Loupe's current hero (from `/home/user/board-landing/index.html`): eyebrow "The visual library for interior designers and studios"; H1 "Never lose the one you know you saw." (9 words); subhead "Save from any site or your iPhone in one tap. Loupe tags every image the way a designer sees it — color, material, era, mood — so you find it again just by describing it." (33 words); CTAs "Start free" + "See how it works"; microcopy "Free to use — not a trial. Chrome, iPhone and web." The word "AI" does not appear in the hero.

## Headlines: clarity vs cleverness, specificity, length, outcome vs feature, audience, pain, customer words, questions, message match

### Takeaway
The most consistent tested finding is that a clear headline, one that says what the thing is and what it does for the reader, beats a clever or vague one, sometimes by large margins. Those margins come from single vendor case studies, though, and most A/B ideas fail, so treat the numbers as direction, not forecasts. Specific, picture-able, front-loaded wording at a plain reading level is the best-supported pattern. Question headlines and voice-of-customer lines have some evidence behind them but no reliable landing-page numbers.

### Cited Findings
**Clarity vs cleverness**
- [TEST] (classic, about 2015–2016) In a MECLABS test, a clear headline, "Our Travel Medical Insurance has provided peace of mind for over 35 years", replaced the clever control "You can't be too careful" and produced **330% more conversions**. No sample size was published. This is a single vendor-run case study. — [MarketingExperiments: Clarity Trumps Persuasion](https://marketingexperiments.com/value-proposition/clarity-trumps-persuasion); also [MarketingSherpa: 5 quick case studies where brands got results by using clarity instead of hype](https://marketingsherpa.com/article/case-study/clear-marketing-messages-5-quick-case-studies)
- [TEST] (classic) In a MECLABS bank landing-page multivariate test that emphasized clarity of the value proposition, Treatment 1 gained **+200%** and Treatment 2 **+184%** over the control. — [MarketingExperiments: How clarity once again trumped persuasion to the tune of a 200% boost](https://marketingexperiments.com/copywriting/web-messaging-clarity-conversion)
- [TEST] (classic) MECLABS reports a **201% gain** from changing "the first seven seconds of user experience" (the above-the-fold message). — [MarketingExperiments: Clarity Trumps Persuasion, first seven seconds](https://marketingexperiments.com/conversion-marketing/clarity-trumps-persuasion-the-first-seven-seconds-of-user-experience)
- [TEST] (classic) In a 10-headline test, the winner combined with reduced friction gave **+10.4%**. MECLABS says the headline was the element that moved conversion most, and the top headlines put the value point first. — [MarketingExperiments: 10 headlines tested](https://marketingexperiments.com/copywriting/headline-optimization)
- [TEST] (classic, January 2009) On Basecamp/37signals' Highrise signup page, the headline "30-day Free Trial on All Accounts" with a subhead saying signup takes "less than 60 seconds" beat the control "Start a Highrise Account" by **about 30%**. The post gives no sample size or significance. One commenter called the control "kind of meaningless with no CLEAR action." — [Signal v Noise: Writing decisions: headline tests on the Highrise signup page](https://signalvnoise.com/posts/1525-writing-decisions-headline-tests-on-the-highrise-signup-page) (seen via search extract; the site was blocked for direct fetch); secondary: [Convert.com A/B testing examples](https://convert.com/blog/a-b-testing/ab-testing-examples)
- [OPINION] Peep Laja (Wynter) puts clarity at the base of his "messaging hierarchy", built from thousands of message tests, and advises leading with the market category in plain language. — [Wynter: Messaging Hierarchy](https://wynter.com/post/messaging-hierarchy)

**Reading level and length**
- [CORR] Unbounce's 2024 Conversion Benchmark Report found that, across industries, pages written at a 5th–7th grade reading level converted at a **median of 11.1%**. That was 56% better than 8th–9th grade pages (7.1%) and about twice professional-level pages (5.3%). Readability is a consensus of Flesch-Kincaid Grade and Flesch Reading Ease. The data is correlational. — [Unbounce Conversion Benchmark Report methodology](https://unbounce.com/conversion-benchmark-report/methodology/); [Unbounce 2024 report press release](https://www.newswire.ca/news-releases/unbounce-s-2024-conversion-benchmark-report-proves-that-attention-spans-are-declining-and-so-are-conversion-rates-831617439.html)
- [CORR] For SaaS, Unbounce gives a median landing-page conversion of **3.8%** (against 6.6% across all industries). Secondary reporting says 5th–7th grade SaaS pages converted at 12.9% against 2.1% for professional-level copy, and that 250–725 words performed best. Unbounce also says complex software may need more explanation, while "something affordable and easy to understand (like an app)" should be marketed simply. — [Unbounce: SaaS conversion rate](https://unbounce.com/conversion-benchmark-report/saas-conversion-rate/); [Unbounce industry page: SaaS](https://unbounce.com/industry/saas/). The 12.9%/2.1% split comes from search extracts and secondary blogs; I did not confirm it on the Unbounce page itself.

**Scanning and front-loading**
- [STUDY] (classic, NN/g eyetracking) Web users fixate on headlines, subheads and the start of lines. Nielsen's guidance is that the first two words carry the most weight, and he later estimated that scanners take in about the **first 11 characters**. People read roughly 20–28% of the words on a page (2008 analysis of about 50,000 page views). — [Wylie Communications summarizing Nielsen: Frontload your web page headlines](https://www.wyliecomm.com/web-page-headlines/); [Nielsen, Writing for the Web (useit archive)](https://webarchive.library.unt.edu/eot2008/20090117093915/http://www.useit.com/papers/webwriting/)

**Specificity**
- [OPINION] Harry Dry (Marketing Examples) tests every line with three questions: can I visualize it, can I falsify it, and could nobody else say it? In one rewrite he noted a startup "waste[d] their uniqueness with a vague title that could mean 50 different things", and in another "we replaced all their vague words with specific ones." — [Marketing Examples: Rewriting landing pages](https://marketingexamples.com/landing-page/rewrites); summary of the three rules: [Sproutworth](https://www.sproutworth.com/art-of-copywriting/)

**Customer words (voice of customer)**
- [TEST, lift unverified] Joanna Wiebe (Copyhackers) ran a four-way headline test for an addiction-treatment centre: control, statistic, curated testimonial, and a line copied verbatim from a book review. The verbatim customer line won. I could not find a primary write-up with the lift figure. Secondary posts claim "3x" or "~40%", but neither can be reliably tied to this test. — [Unbounce guest post: How you can write high converting copy without actually writing](https://unbounce.com/conversion-rate-optimization/write-high-converting-copy/); [CXL: Voice of customer](https://cxl.com/blog/voice-of-customer/?amp)
- [OPINION] VoC research tells you which words customers use. It does not tell you which angle will win, so testing is still needed. — [Brandy Wells: voice of customer research process](https://brandywellswriting.squarespace.com/blog/voice-of-customer-research-process)

**Questions vs statements**
- [STUDY] (classic, 2014) Lai & Farbrot, *Social Influence*. On a science-communication Twitter feed (6,350 followers), self-referencing question headlines drew **175%** more clicks than statements and plain questions **150%** more. On an auction site (iPhone, couch, TV, washing machine), plain questions drew **+137%** and self-referencing questions **+257%**. Washing-machine questions did *worse* than statements. The authors call the context limited and the Twitter sample was self-selected. These are click measures, not landing-page conversions. — [BPS Research Digest](https://www.bps.org.uk/research-digest/are-you-more-likely-click-headlines-are-phrased-question); [ScienceDaily](https://sciencedaily.com/releases/2014/01/140108112614.htm)
- [OBS] Canva's live H1 is a question: "What will you design today?" Its subhead then states what Canva is. — [canva.com live capture 2026-11-08](screens/canva-desktop.png)

**Message match**
- [OPINION] Oli Gardner (Unbounce) defines message match as the ad's copy matching the landing-page headline, one of three "conversion coupling" factors (with design match and conversation momentum). His deck also shows "attention ratio" data: a page with a 5:1 ratio of links to goals converted at 10.5%, and a 1:1 page at 13.5%. — [Gardner slides: How to create and optimize high-converting landing pages](https://www.slideshare.net/slideshow/how-to-create-and-optimize-high-converting-landing-pages/32109470); [Unbounce: How poor message match can kill your conversion rate](https://unbounce.com/?p=2275)
- Unverified: lift figures such as "212% from fixing message match (Moz/Conversion Rate Experts)" and "66% (Foundry CRO 2026)" circulate only on secondary blogs. — [Webtonic: Message match](https://www.webtonic.io/blog/message-match); [Foundry CRO](https://foundrycro.com/blog/landing-page-headline-benchmarks-2026/)

**How far A/B results generalize**
- [STUDY] Ronny Kohavi reports that most ideas fail when tested: about two-thirds at Microsoft, about 85% at Bing and about 92% at Airbnb. His 2024 "Imperfections of A/B testing" puts the median success rate across companies near 10%. Published "+X%" case studies are therefore the survivors of many failed tests. — [Lenny Distilled: Ronny Kohavi](https://lennydistilled.pages.dev/guests/ronny-kohavi); [Recap of Kohavi on Lenny's Podcast](https://recapio.com/digest/the-ultimate-guide-to-a-b-testing-ronny-kohavi-airbnb-microsoft-amazon-by-lenny-s-podcast)
- [OPINION] April Dunford warns that testing positioning through landing-page or homepage A/B tests gives noisy results that do not isolate the positioning itself. She also holds that homepage messaging can only be written after positioning is settled. — [Positioning with April Dunford podcast](https://podcasts.apple.com/podcast/positioning-with-april-dunford/id1690104435); [transcript summary of Dunford on Lenny's Podcast](https://transcripts-wiki-7ve.pages.dev/transcripts/april-dunford-on-product-positioning)

**Length of live headlines today**
- [OBS] Hero H1s captured 2026-11-08: mymind "Remember everything. Organize nothing." (4 words); Figma "The full-stack creative canvas" (4); Raycast "Your shortcut to everything." (4); Programa "Freedom, by design" (3); Canva "What will you design today?" (5); Notion "Where teams and agents Jam together." (6); Cosmos "Find your next lamp with character" (6); Granola "The AI notepad for back-to-back meetings" (7); Savee "The best place to save and share inspiration" (8). Loupe's is 9. — [screens/](screens/) (mymind-desktop.png, figma-desktop.png, raycast-desktop.png, programa-desktop.png, canva-desktop.png, notion-desktop.png, cosmos-desktop.png, granola-desktop.png, savee-desktop.png)

### Inferences
- Loupe's current H1 "Never lose the one you know you saw." names a real, specific pain in phrasing that sounds like the customer (the "I know I saw it somewhere" feeling). That is a strength on Harry Dry's "visualize" test and fits the VoC approach. It does **not** say what Loupe is or how it works, so clarity rests on a small eyebrow and a 33-word subhead. NN/g's scanning data and MECLABS's clarity results both suggest that risk is real. A pain headline is defensible only if the first words a scanner sees right after it say what the product does ("Find any image by describing it…").
- The strongest Loupe-specific claim is the mechanism plus outcome: find an image by *describing* it, in designer words. It can be pictured, it can be checked (the demo can prove it), and it is ownable. That matches Harry Dry's three tests better than a generic "never lose anything" claim, which mymind already owns ("Remember everything. Organize nothing.").
- Question headlines lift clicks in feeds, but on a homepage a question that doesn't say what the product is costs clarity. Canva gets away with one only because it is already a household name, so this is not a good model for an unknown startup.
- Given Kohavi's failure rates and Dunford's warning, Loupe should validate hero wording with target-audience clarity tests (5-second tests, Wynter-style panels of interior designers) before, or instead of, low-traffic A/B tests.

### Gaps
- No sample sizes, test durations or confidence intervals are published for the MECLABS, Highrise or Copyhackers tests.
- Unverified recollection: Highrise's later 2011 tests ("Behind the scenes: A/B testing at Highrise", Parts 1–3) reportedly tested long-form versus short-form pages and large customer photos with big lifts. signalvnoise.com could not be fetched to confirm the numbers, so I have not cited them.
- MarketingExperiments' "switching a headline with a sub-headline" test exists ([link](https://marketingexperiments.com/conversion-marketing/quick-lift-headines)), but I could not retrieve its numbers.
- No controlled study was found comparing "pain-led" with "outcome-led" SaaS headlines, or headlines that name the audience with ones that don't. Guidance here is practitioner opinion and live-page convention.
- I did not find CXL, VWO, Optimizely or GoodUI headline-specific test numbers from 2022–2026. GoodUI's pattern library exists, but the median effects for headline patterns could not be retrieved.

## Subheads: structure (what, for whom, how) and length

### Takeaway
On live 2026 heroes the subhead does the explaining the headline doesn't. It names the category and audience, says how the product works in one clause, and often adds one differentiator against an alternative. Today's leading subheads run about 7–18 words. Loupe's 33-word subhead is roughly twice as long as any comparable hero captured.

### Cited Findings
- [OBS] Savee: "References curated by designers, saved in one click and sorted into boards." (12 words: what + how + where). — [Savee live capture 2026-11-08](screens/savee-desktop.png)
- [OBS] Programa: "Project delivery software for interior design studios. Start your 7 day free trial." (category + audience, then offer) under a clever H1 "Freedom, by design". — [programa.design live capture](screens/programa-desktop.png)
- [OBS] Notion: "Capture context, find answers, and automate tasks with AI built for your team." (three verbs + audience; AI named as the mechanism). — [notion.com live capture](screens/notion-desktop.png)
- [OBS] Granola: "Notes, actions and memory. Without a meeting bot." (what + differentiator against the alternative, 8 words). — [granola.ai live capture](screens/granola-desktop.png)
- [OBS] mymind: "All your notes, bookmarks, inspiration, articles and images in one single, private place." (what goes in + privacy), with the content types shown as coloured tag chips. — [mymind.com live capture](screens/mymind-desktop.png)
- [OBS] Raycast: "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable." (category + qualities). — [raycast.com live capture](screens/raycast-desktop.png)
- [OBS] Canva: "Make AI-powered social posts, videos, presentations, and more with Canva." (verb + outputs). — [canva.com live capture](screens/canva-desktop.png)
- [OBS] Cosmos replaces the subhead with a working search box (placeholder "Search for lamps") under "Find your next lamp with character". The search itself is the demonstration. — [cosmos.so live capture](screens/cosmos-desktop.png)
- [TEST] (classic) The winning Highrise variant used the subhead for friction reduction ("sign up in less than 60 seconds"), not for features. — [Signal v Noise post 1525](https://signalvnoise.com/posts/1525-writing-decisions-headline-tests-on-the-highrise-signup-page)
- [OPINION] Wynter teardowns repeatedly mark down heroes where "above-the-fold benefit claims… are never explained" (Optimizely, clarity 3/5) and where visitors "never learn what gets automated and how" (Metadata, 3.5/5). Both are failures of the line under the headline. — [Wynter teardown: Optimizely](https://wynter.com/dyer-recordings/optimizely); [Wynter teardown: Metadata](https://wynter.com/dyer-recordings/metadata)

### Inferences
- A good subhead formula for Loupe: **[what you do / where you save] + [what Loupe does to each image, in designer words] + [the payoff: find it by describing it]**, in about 15–22 words. Example at 21 words: "Save from Chrome or iPhone. Loupe tags every image in designer language, so you can find it again by describing it."
- Granola's "Without a meeting bot" shows a one-clause contrast with the alternative a buyer already knows. Loupe has a ready one in its own section line, "Pinterest sees 'orange.' You see terracotta." A compressed version could go in the subhead or the line just below it.
- Cosmos's search-box hero suggests Loupe's hero demo could *be* a "describe it" search (for example a prefilled "terracotta sofa, sage wall"), which shows the claim instead of explaining it.

### Gaps
- I found no controlled test on optimal subhead length. The 7–18-word range is observed convention on about 10 live heroes, not tested data.

## CTA copy: wording, first person, benefit-led, one vs two, reassurance microcopy

### Takeaway
There is little evidence that one generic verb ("Start" vs "Get started" vs "Sign up") reliably beats another. The better-supported moves are making the button say what the visitor gets or does next, removing a fear right next to it (cost, card, time), and keeping one primary action. A first-person version ("Start my…") is a cheap, plausible test, but it rests on a single classic test.

### Cited Findings
- [TEST] (classic, about 2012–2013) Michael Aagaard (ContentVerve) changed "Start your free 30 day trial" to "Start my free 30 day trial" on an Unbounce landing page and got **+90% click-through**. He reportedly saw 30–90% lifts across similar tests. A separate "Create my account" → "Create your account" change reportedly lost about 25% (reported as both 24.91% and 24.95%). These are single tests, measured on clicks not paid conversion, and are widely re-quoted second-hand. — [Entrepreneur: The simplest way to improve your call to action](https://www.entrepreneur.com/article/269879); [ClickZ: Me vs. You: How pronouns affect click conversion rates](https://clickz.com/me-vs-you-how-pronouns-affect-click-conversion-rates/32596/)
- [CORR] A survey of 110 SaaS pricing pages found "Start Free Trial" on 29.1% of CTAs, "Get Started" on 28.2% and "Sign Up Free" on 7.3%, with **69.1%** of CTAs containing the word "free". "Get Started" was most common among freemium products and "Start Free Trial" among trial-gated ones. This measures how common each label is, not how well it converts. — [SaaS Research Lab: Which CTA converts best? 110 SaaS pricing pages](https://saasresearchlab.com/report/cta-analysis)
- [OPINION] Claims such as "'Start Free Trial' beats 'Sign Up' by 10–20%" and a "104% lift from 'Sign up for free' → 'Trial for free'" appear on vendor blogs without a primary source. — [1Capture: SaaS trial page teardowns](https://www.1capture.io/blog/trial-page-teardowns-what-top-saas-get-right)
- [TEST] (date unclear, VWO case study) Teamleader saw **+12.5% free-trial sign-ups** after adding "No Credit Card Required", within a test series showing 9–16% uplifts. No sample size was given in the extract. — [VWO / Teamleader case study](https://www.casestudies.com/company/vwo/case-study/teamleader-increased-free-trial-sign-ups-through-rigorous-ab-testing)
- [TEST, unverified] "Basecamp saw signups rise 60% after adding 'No credit card required'" appears only on a secondary blog with no primary source. — [ReleaseLens: copywriting for CRO](https://releaselens.pages.dev/blog/copywriting-for-cro)
- [TEST] Counterpoint on downstream quality: PhoneBurner found card-on-file trialists converted to paid at 73%, against 22% for no-card trialists. This concerns *requiring* a card, which Loupe doesn't, but it shows that signup lifts can hide lower intent. — [PhoneBurner: what removing credit cards from our SaaS signup did](https://develop.phoneburner.com/blog/what-removing-credit-cards-from-our-saas-signup-did-to-our-revenue)
- [CORR/method] GoodUI separates a "shallow median" (low-intent actions such as clicking the first step) from a "deep median" (highest-intent metrics). Its "Bulleted Reassurances" pattern (#15) collects reassurance-copy tests. A CTA lift in clicks may not carry through to activation. — [GoodUI Pattern #15: Bulleted Reassurances](http://www.goodui.org/patterns/15/tests/479/); [GoodUI Pattern #121](https://goodui.org/patterns/121/tests/332/)
- [OPINION/CORR] Gardner's "attention ratio": in his deck, fewer competing links per goal converted better (1:1 at 13.5% against 5:1 at 10.5%). — [Gardner slides](https://www.slideshare.net/slideshow/how-to-create-and-optimize-high-converting-landing-pages/32109470)
- [OBS] Live hero CTAs (2026-11-08):
  - Notion: "Get Notion free" plus "Request a demo"
  - Figma: "Get started" (hero) and "Get started for free" (nav), plus "Contact sales"
  - Canva: "Start designing" (nav: "Sign up")
  - Savee: "Join for free" plus "See plans"
  - Cosmos: "Join Cosmos for free"
  - Granola: "Download for free", with "Available for macOS, Windows, iOS, Android" underneath
  - mymind: three platform buttons ("iPhone app", "Browser Extension", "Android app"), with "Sign up" only in the nav
  - Are.na: "Sign up" plus "Download the app"
  - Programa: "Get started" plus "Watch a demo" (nav: "Start free"; subhead: "Start your 7 day free trial.")
  - Raycast: "Download for Mac", with "macOS Tahoe and Apple Silicon required" underneath
  - Superhuman: "Get Superhuman"
  - Linear: nav "Sign up" (the hero did not render in the capture)

  — [screens/](screens/) (notion-, figma-, canva-, savee-, cosmos-, granola-, mymind-, arena-, programa-, raycast-, superhuman-, linear-desktop.png)

### Inferences
- The live pattern is **one strong primary button, plus at most one quiet secondary** (a demo or plans link), with a platform or availability line underneath. Loupe's "Start free" + "See how it works" + "Free to use — not a trial. Chrome, iPhone and web." already follows it.
- For an install-led product, mymind and Granola make the *real next step* the button ("Browser Extension", "Download for free"). Loupe's activation probably depends on installing the Chrome extension or the iPhone app, so a test of "Add to Chrome — free" against "Start free" is worth considering, with platform buttons as the secondary row.
- Candidate CTA labels, from most to least conventional:
  - "Start free"
  - "Start your library — free"
  - "Start my library" (first-person test, after Aagaard)
  - "Save your first image"
  - "Add to Chrome — it's free"
  - "Start a studio library" (for the studio section, already in use)
- Reassurance under the CTA should remove the specific fears of a freemium visual tool: cost or card, the trial clock, and lock-in or ownership. Loupe's "not a trial" line is distinctive, because competitors such as Programa use "free" wording for what is actually a 7-day trial.

### Gaps
- I found no rigorous 2022–2026 test comparing "Get started", "Start free", "Try free" and "Sign up" head to head. A multi-site "Start beats Get" test (>3,000 visitors, about 11 years old) was mentioned in a search summary without a traceable primary URL, so it is not cited.
- No published test measures the effect of "Free forever" microcopy specifically.

## "Free" framing: free tool vs free trial vs freemium, and how leading tools word it

### Takeaway
Leading freemium creative tools put "free" *in the button* ("Get Notion free", "Join for free", "Download for free", "Get started for free") rather than in the headline, and almost none say "free forever" on the hero. A trial is worded as a trial ("Start your 7 day free trial"). Loupe's "Free to use — not a trial" fills a real gap: it answers the "is this one of those 7-day things?" question that interiors software like Programa raises.

### Cited Findings
- [OBS] Notion "Get Notion free"; Savee "Join for free"; Cosmos "Join Cosmos for free"; Granola "Download for free"; Figma "Get started for free" (nav). None of the captured heroes uses "free forever". — [screens/](screens/) (notion-, savee-, cosmos-, granola-, figma-desktop.png)
- [OBS] Programa (interior design project software) uses "Start free" in the nav and "Get started" in the hero, but the subhead says "Start your 7 day free trial." The words "free" and "trial" sit side by side. — [programa.design live capture](screens/programa-desktop.png)
- [OBS] Canva's hero does not say free at all ("Start designing"). mymind's hero shows platform buttons with "Sign up" in the nav. — [canva.com capture](screens/canva-desktop.png); [mymind.com capture](screens/mymind-desktop.png)
- [CORR] Third-party pricing guides describe Miro's Free plan as "free forever" with unlimited members but **three editable boards**. Older boards become view-only past that limit. This shows that "free forever" plans usually carry visible caps. — [CPO Club: Miro pricing](https://cpoclub.com/tools/miro-pricing/); [Usecarly: Miro pricing 2026](https://www.usecarly.com/blog/miro-pricing/)
- [CORR] 69.1% of SaaS pricing-page CTAs include "free". "Get Started" goes with freemium and "Start Free Trial" with time-limited trials. — [SaaS Research Lab](https://saasresearchlab.com/report/cta-analysis)
- [TEST] (classic) Highrise's winning headline made the free offer the headline itself ("30-day Free Trial on All Accounts", +30%). — [Signal v Noise post 1525](https://signalvnoise.com/posts/1525-writing-decisions-headline-tests-on-the-highrise-signup-page)
- [OBS] mymind is reported to restrict its AI features to paid plans (a "Bookmarker" plan at $4.99/month described as visual bookmarking without AI). Third-party claim. — [Marqly: mymind review](https://www.marqly.com/blog/mymind-review-2027)

### Inferences
- For Loupe, put "free" in the button and in one reassurance line, not the H1. The H1 should carry the value. Keep "not a trial" and add *what free includes* in plain words when the plans page is ready (for example "Free for your own library. Paid plans add more storage and studio boards"), because "free forever" without the limits reads as a hook to designers.
- Avoid "free forever" unless leadership commits to it as a lasting promise and the limits are shown next to it, as Miro's plan has to.
- If Loupe's AI tagging is included free, while mymind reportedly gates AI behind payment, "Every save is tagged, even on the free plan" is a specific, checkable differentiator (verify with the team first).

### Gaps
- I could not fetch Milanote's, Miro's or Linear's live heroes. Milanote's only retrieved headline is an old snapshot ("Get organized. Stay creative."), and Linear's hero did not render in the capture. Third-party reports give Linear as "The product development system for teams and agents" with "Get Started", which is unverified. — [Milanote (search extract)](https://milanote.com/); [Thrive Themes hero examples](https://thrivethemes.com/hero-section-examples/)
- No controlled data compares "free tool", "free plan" and "free forever" wording.

## AI messaging: consumer reaction to "AI" and how respected products describe AI without hype

### Takeaway
Peer-reviewed and survey evidence from 2024–2026 points the same way. Naming "AI" in a product description tends to lower emotional trust and purchase intent, and by 2026 a majority of US consumers report AI-marketing fatigue. The penalty is larger for high-risk purchases and for content described as *AI-generated* than for *AI-assisted* work. The respected pattern is to lead with what the user can do ("find it by describing it"), and to mention AI, if at all, as the mechanism in a lower line, with proof and limits. Creative-tool and visual-library heroes (mymind, Savee, Cosmos, Are.na, Figma) keep "AI" out of the hero entirely.

### Cited Findings
**Peer-reviewed**
- [STUDY] Cicek, Gursoy & Lu (2024), "Adverse impacts of revealing the presence of 'Artificial Intelligence (AI)' technology in product and service descriptions on purchase intentions", *Journal of Hospitality Marketing & Management*, DOI 10.1080/19368623.2024.2368040.
  - Design: experimental surveys of more than 1,000 US adults; secondary coverage says six experiments.
  - Main result: descriptions that mention AI lowered purchase intention, with **emotional trust** as the mediator.
  - Risk: the effect was stronger for high-risk products (cars, illness diagnosis, expensive electronics, financial services) than for low-risk ones such as vacuums, where it was milder but still present.
  - Author's advice: "focus on describing the features or benefits and avoid the AI buzzwords."

  — [WSU press release, 30 July 2024](https://news.wsu.edu/press-release/2024/07/30/using-the-term-artificial-intelligence-in-product-descriptions-reduces-purchase-intentions/); [EurekAlert](https://www.eurekalert.org/news-releases/1052886); [Fast Company](https://www.fastcompany.com/91165839/ai-artificial-intelligence-product-name-description-hurts-sales)
- [STUDY] Shi & Jiang (2026), *SAGE Open*: AI-disclosure labels *raise* ad attitude, product attitude and purchase intention through perceived novelty, and at the same time *lower* them through reduced perceived authenticity. The net effect depends on regulatory focus and product type. — [SAGE Open: Consumer responses to AI disclosure labels](https://journals.sagepub.com/doi/10.1177/21582440261417793)
- [STUDY] In a 2025 experiment in *Equilibrium*, ads labelled human-made earned more trust and purchase intent even when they were AI-generated. Labelled AI ads lowered trust, especially for high-involvement products. — [Economic Policy / Equilibrium: AI-generated versus human-created advertising](https://economic-policy.pl/index.php/eq/article/view/4038)
- [STUDY] (2026, *J. Theoretical and Applied E-Commerce Research*) Reviews labelled *fully AI-generated* got the lowest trust and authenticity ratings. Reviews labelled *AI-assisted* were rated more favourably. — [MDPI: AI labels, perceived authenticity, and consumer trust in user-generated reviews](https://www.mdpi.com/0718-1876/21/5/154)

**Surveys, 2025–2026**
- [STUDY/survey] WordPress VIP (June 2026; about 1,200 US adults within a 2,000-person poll): **60%** say "AI" in brand messaging is a turnoff, 86% don't fully trust AI, and 61% can't name a company using AI well in its communications. Vendor-sponsored. — [TechCrunch, 16 June 2026](https://techcrunch.com/2026/06/16/sixty-percent-of-u-s-consumers-say-ai-in-brand-messaging-is-a-turnoff-survey-finds/)
- [STUDY/survey] Harris Poll, 4As and Infillion (Cannes 2026): **78%** say AI makes ads "feel less authentic" and **65%** would "love if brands would never mention meaningless AI marketing again." Gartner: 49% of US consumers say GenAI has made content quality worse. — [Yahoo Finance: Consumers are sick and tired of hearing about AI](https://finance.yahoo.com/social-media/articles/consumers-sick-tired-hearing-ai-120023865.html); [CX Today: Gartner data](https://www.cxtoday.com/marketing-sales-technology/gartner-ai-generated-content-quality-marketing-fatigue/)
- [STUDY/survey] Klaviyo/Datalily (December 2025): only 7% say visible AI-generated marketing makes them trust a brand more, and 31% say less. — [eMarketer: Shoppers aren't impressed by AI-generated marketing](https://www.emarketer.com/content/shoppers-aren-t-impressed-by-ai-generated-marketing)
- [CONFLICT] Optimove's 2025 vendor report says **57%** trust brands *more* when AI is part of the *experience* (only 5% strongly distrust). This conflicts with the surveys above. The likely reason is that it measures AI in service delivery, not AI in the marketing message. — [MarTech: 57% of consumers trust brands more when they use AI](https://martech.org/57-of-consumers-trust-brands-more-when-they-use-ai-study-finds/)

**Designers specifically**
- [STUDY/survey] Figma's 2025 AI report (about 2,500 designers and developers, January 2025): 78% say AI speeds up their work, but only 58% say it improves quality, and 40% don't yet trust AI outputs enough to rely on them fully. A secondary write-up claims only 32% of *designers* trust AI output (against 82% of developers); that figure is unverified against the primary report. — [Figma: AI 2025 report](https://figma.com/reports/ai-2025/); [Figma design statistics](https://www.figma.com/resource-library/design-statistics/); [TechRadar](https://www.techradar.com/pro/figmas-latest-survey-shows-ai-is-not-yet-living-up-to-its-over-hyped-promise); [Jay Mistry, The 32% Problem](https://jaymistry.substack.com/p/state-of-ai-for-designers-2025)
- [OBS/secondary] Cosmos, a visual-inspiration app for creatives, reportedly offers a single toggle to filter AI-generated content from the feed. That is "anti-slop" positioning aimed at a creative audience. — [Medium/Design Bootcamp on Cosmos](https://medium.com/design-bootcamp/cosmos-is-the-creative-app-you-deserve-and-its-finally-here-3e5893a02b76); [Business of Home: Cosmos wants to be more than just a Pinterest for the cool kids](https://businessofhome.com/articles/cosmos-wants-to-be-more-than-just-pinterest-for-the-cool-kids)

**How products word AI today [OBS, captures 2026-11-08]**
- AI absent from the hero:
  - mymind: "Remember everything. Organize nothing."
  - Savee
  - Cosmos: search demo instead
  - Are.na
  - Figma
  - Raycast: AI only in the nav
- AI named as mechanism or category:
  - Notion: "…with AI built for your team"
  - Canva: "Make AI-powered social posts…" plus "Introducing a new frontier image generation model"
  - Superhuman: "Mail, Docs, and AI that works in every app and tab"
  - Granola: "The AI notepad for back-to-back meetings" plus "Without a meeting bot"

  — [screens/](screens/)

**Practitioner guidance**
- [OPINION] "'AI-powered' is not a positioning claim — it describes a technology, not a benefit." Lead with the outcome. The worked example: swap "smarter search" for "find any document by describing it, even if you forgot the file name." Back AI claims with proof (metrics, demos) and state limits and failure modes. — [Rival: How to explain AI products without sounding like hype](https://withrival.com/blog/how-to-explain-ai-products-without-sounding-like-hype); [Moburst: Market AI app features without overpromising](https://www.moburst.com/blog/how-to-market-ai-app-features-without-overpromising/); [Forbes Agency Council, Feb 2026](https://www.forbes.com/councils/forbesagencycouncil/2026/02/19/how-to-make-marketing-stand-out-amid-a-din-of-ai-focused-messaging/)

### Inferences
- Loupe's AI is *analytic*: it tags and searches the user's own images. It is not *generative*, and much of the aversion evidence concerns AI-generated content and high-risk purchases. A free image library is low risk, so the purchase-intent penalty is probably mild. But designers' specific distrust of AI (Figma report) and the 2026 fatigue surveys both argue for keeping "AI" out of the H1.
- The best-evidenced framing is the outcome: "find it by describing it", "tags every image the way a designer sees it". Name AI once, plainly, lower down (a "How it works" or FAQ line), with proof (the live tag demo) and control ("edit any tag"). Loupe's current hero already does this. The redesign should keep it.
- Optional trust lines for a creative audience, each **only if true**:
  - "Loupe doesn't make images. It helps you find yours."
  - "Your images stay yours. Never used to train models."
  - "You can see and edit every tag."

  These answer the specific creative-industry worries (slop, training on their work, black boxes).
- A category noun with AI in it ("AI moodboard", "AI image library") would put Loupe in the crowded "AI tool" bucket. "Visual library for interior designers" is a clearer, safer category frame.

### Gaps
- No 2025–2026 replication of Cicek et al. by the same authors was found. The study used general consumers, not designers or B2B buyers.
- No A/B test was found comparing a landing page with "AI" in the hero against one without, for a creative or design tool.
- The Figma 32% designer-trust figure, and secondary claims that consumers who'd distrust brands for heavy AI use "doubled from 20% to 39%", could not be verified against primary sources.

## Writing for designers and creative professionals: tone, jargon, credibility

### Takeaway
Tools for creatives speak in understated, concrete, material language. They name the work ("references", "inspiration", "boards", "a lamp with character") rather than abstractions, and earn credibility through craft: typography, real imagery, a working demo, and the vocabulary of the trade. Interiors-specific competitors show the materials-and-objects world visually and name the audience outright.

### Cited Findings
- [OBS] Savee uses designers' own nouns: "References curated by designers, saved in one click and sorted into boards." — [Savee capture](screens/savee-desktop.png)
- [OBS] Are.na lists its audience by identity ("students, designers, academics, collectors, researchers, and many other people who defy categorization") and uses a quiet, editorial tone ("A toolkit for assembling new worlds from the scraps of the old"), with longevity as proof ("For the last 15 years and 91 days"). — [are.na capture](screens/arena-desktop.png)
- [OBS] Cosmos's interiors-adjacent hero speaks in object-and-quality terms ("Find your next lamp with character"), with a search placeholder ("Search for lamps"). — [cosmos.so capture](screens/cosmos-desktop.png)
- [OBS] Programa names the trade outright ("for interior design studios") and fills the hero with fabric, timber and ceramic imagery. Its H1 ("Freedom, by design") is a clever pun that relies on the subhead for meaning. — [programa.design capture](screens/programa-desktop.png)
- [OBS] mymind, Granola and Programa set their H1s in an editorial serif. Notion, Figma, Savee and Cosmos use tight grotesques. — [screens/](screens/)
- [OBS] Notion places a logo strip (OpenAI, A24, Figma, FedEx, Ramp, Cursor, Substack, NVIDIA, Toyota) right under the hero as credibility. — [notion.com capture](screens/notion-desktop.png)
- [OBS, old snapshot] Milanote used "Used by creative professionals from the world's top companies" as social proof. — [Milanote (search extract)](https://milanote.com/)
- [STUDY/survey] Designers are split on AI: they see the speed but doubt the quality (78% faster against 58% better quality; 40% don't fully trust outputs). — [Figma design statistics](https://www.figma.com/resource-library/design-statistics/)
- [OPINION] Jargon over plain language is the most common copywriting mistake. Specific words beat abstract ones. — [Sproutworth on Harry Dry](https://www.sproutworth.com/art-of-copywriting/)

### Inferences
- The right "jargon" for Loupe is the *trade's* vocabulary, not tech vocabulary. Material and colour names (terracotta, bouclé, fluted oak, unlacquered brass, sage), eras, and studio words (references, boards, client presentations, projects) signal "made by people who know the work". "AI", "smart", "seamless" and "powerful" signal the opposite. The current page's "Pinterest sees 'orange.' You see terracotta." is a model line: specific, falsifiable, ownable.
- Credibility signals that suit this audience:
  - real interior imagery with real tags (already on the page)
  - named studios or designers using Loupe, if available
  - a working "describe it" search demo
  - restraint, meaning no exclamation marks, no "revolutionary", and no AI sparkle icons

  Logo strips matter less unless they are recognizable interior studios.
- Name the audience in the eyebrow or subhead ("for interior designers and studios"). Programa and Are.na show that creatives respond to being named, and it disqualifies the wrong visitors quickly.

### Gaps
- I found no published test or study on copy tone for interior designers specifically. These recommendations come from observation of category leaders and general specificity research.

## Common copy mistakes on startup landing pages (teardowns)

### Takeaway
The recurring failures are a vague or clever headline that doesn't say what the product is, benefit claims that are never explained, missing mechanism ("how does it actually work?"), jargon or a high reading level, generic "AI-powered" claims, and pages that are too long and repetitive.

### Cited Findings
- [OPINION/teardown] Metadata.io (Wynter, clarity 3.5/5): "People start out really excited, but then feel disappointed because they never learn what gets automated and how." The page also avoided naming its category while comparing itself to that category. — [Wynter: Metadata](https://wynter.com/dyer-recordings/metadata)
- [OPINION/teardown] Optimizely (Wynter, clarity 3/5): "The above-the-fold area makes benefit claims that are never explained." It was unclear which product was on offer. — [Wynter: Optimizely](https://wynter.com/dyer-recordings/optimizely)
- [OPINION/teardown] Qualified (Wynter, clarity 3.9/5): a narrative-led headline didn't help visitors understand the product. The verdict was "Too long pages mean unfocused messaging… needs a 50% cut." — [Wynter: Qualified](https://wynter.com/dyer-recordings/qualified)
- [OPINION/teardown] Harry Dry: a "vague title that could mean 50 different things", and generic words to be replaced with specific ones and real numbers. — [Marketing Examples: rewrites](https://marketingexamples.com/landing-page/rewrites)
- [TEST] (classic) Clever beat by clear: "You can't be too careful" lost to a plain value statement (−330% relative). — [MarketingExperiments](https://marketingexperiments.com/value-proposition/clarity-trumps-persuasion)
- [CORR] Professional-level reading level is associated with much lower conversion (5.3% against 11.1% all-industry). — [Unbounce methodology](https://unbounce.com/conversion-benchmark-report/methodology/)
- [OPINION] "AI-powered" is a technology label, not a benefit. — [Rival](https://withrival.com/blog/how-to-explain-ai-products-without-sounding-like-hype)
- [OPINION] Peep Laja: review messaging with target buyers (message testing), not internally. — [Compete Network: Don't review messaging internally, message test instead](https://thecompetenetwork.com/episode/dont-review-messaging-internally-message-test-instead-peep-laja)

### Inferences
- Measured against these patterns, Loupe's risks are a headline that is pain-led but not explanatory (mitigated if the subhead's first words state the mechanism) and a subhead that is too long. Loupe already avoids the "AI-powered" and jargon traps in the hero.

### Gaps
- Few teardowns from 2022–2026 come with outcome data. Most are expert critiques (Wynter scores are panel ratings, not conversion data).

## Implications and candidate directions for Loupe's headline, subhead, CTA and microcopy

### Takeaway
Keep what the evidence favours and the current page already does well: designer vocabulary, no "AI" in the hero, "free, not a trial" reassurance, and one primary CTA. The main fix is clarity: the headline, or the first words under it, must say plainly that you **save images and find them again by describing them, in designer language**. The subhead should be cut to about 15–22 words. Validate two or three directions with interior designers (clarity and 5-second tests) rather than trusting borrowed A/B lifts.

### Cited Findings (evidence each recommendation rests on)
- Clarity beats cleverness; front-load the value. — [MarketingExperiments](https://marketingexperiments.com/value-proposition/clarity-trumps-persuasion); [MarketingExperiments 10 headlines](https://marketingexperiments.com/copywriting/headline-optimization); [NN/g front-loading via Wylie](https://www.wyliecomm.com/web-page-headlines/)
- Plain reading level is associated with higher conversion. — [Unbounce methodology](https://unbounce.com/conversion-benchmark-report/methodology/)
- Outcome over "AI"; AI wording lowers emotional trust; 60% of US adults find "AI" in brand messaging a turnoff. — [WSU press release](https://news.wsu.edu/press-release/2024/07/30/using-the-term-artificial-intelligence-in-product-descriptions-reduces-purchase-intentions/); [TechCrunch 2026](https://techcrunch.com/2026/06/16/sixty-percent-of-u-s-consumers-say-ai-in-brand-messaging-is-a-turnoff-survey-finds/); [Rival "find any document by describing it"](https://withrival.com/blog/how-to-explain-ai-products-without-sounding-like-hype)
- First-person CTA as a test candidate. — [Entrepreneur on Aagaard](https://www.entrepreneur.com/article/269879)
- Reassurance microcopy (+12.5% in the one attributable test). — [VWO/Teamleader](https://www.casestudies.com/company/vwo/case-study/teamleader-increased-free-trial-sign-ups-through-rigorous-ab-testing)
- Live conventions: short H1 (3–8 words), 7–18-word subhead, "free" in the button, platform buttons for install-led products. — [screens/](screens/)
- Most A/B ideas fail; message-test instead of copying lifts. — [Kohavi via Lenny Distilled](https://lennydistilled.pages.dev/guests/ronny-kohavi); [Peep Laja](https://thecompetenetwork.com/episode/dont-review-messaging-internally-message-test-instead-peep-laja)

### Inferences
**Headline directions (with the reasoning for each):**
1. *Mechanism + outcome (clearest; recommended to test first)*
   - "Find any image by describing it."
   - "Save every reference. Find it by describing it."
   - "Describe it. Loupe finds it."

   These follow the Rival example, can be pictured and checked, and say what the product does within the first 11 characters ("Find any im…" / "Save every…").
2. *Pain / customer's words (keep the current spirit, add clarity)*
   - "Never lose the one you know you saw." (current), paired with a subhead whose first clause is the mechanism.
   - "You saw it once. Now you can find it."
   - "That image you know you saved? Describe it."

   A self-referencing question is acceptable only if the subhead states the category.
3. *Designer-language differentiation (most ownable; riskier on clarity alone)*
   - "Search the way designers see."
   - "It knows terracotta isn't orange."

   Better used as the second-screen line (as now) or as a subhead contrast than as the H1.
4. *Audience + category (safest clarity, least distinctive)*
   - "The visual library for interior designers."
   - "Your studio's image library, searchable in your own words."

   This is the Programa/Granola pattern. Pairs well with a mechanism subhead.

**Subhead (target 15–22 words; what + how + payoff, designer nouns, no "AI"):**
- "Save from Chrome or iPhone. Loupe tags every image in designer language, so you can find it again by describing it." (21 words)
- "Save images from anywhere. Loupe names the color, material, era and mood, so 'terracotta bouclé, 70s' finds it." (about 18 words)
- For studios: "One shared library your studio owns. Everyone saves, Loupe tags, anyone can find it." (about 15 words)

**Where AI goes:**
- Not in the H1, and preferably not in the subhead.
- In "How it works" or the FAQ, as the mechanism with proof and control. For example: "Loupe uses image recognition tuned on how designers describe rooms. You can see and edit every tag."
- Add a privacy or training line only if it is true.

**CTA:**
- Primary: "Start free" (the conventional baseline).
- Test candidates:
  - "Start my library", the first-person version
  - "Save your first image", which names the next step
  - "Add to Chrome — it's free", the real activation step for desktop visitors
- On mobile, consider "Get the iPhone app — free".
- Keep one quiet secondary ("See how it works") and platform badges below. Avoid adding "Sign in" as a large competing hero button, which Gardner's attention-ratio data argues against.

**Microcopy under the CTA:**
- Keep "Free to use — not a trial." It differentiates from trial-based interiors software (Programa: "7 day free trial").
- Candidates:
  - "Free to use. No card, no trial clock."
  - "Free for your own library. Upgrade for more, or for your studio."
  - "Chrome, iPhone and web."
- Avoid "Free forever" unless leadership commits to it and the limits sit beside it.

**How to choose:**
- Run 5-second and "what does this product do?" clarity tests, or Wynter-style panels, with 15–30 interior designers on two or three hero variants.
- Use A/B tests on signups only if traffic supports significance, and measure activation (first save, first search) as the deep metric, not just button clicks (GoodUI shallow vs deep).
- Keep ads and social posts in message match with whichever hero wins, for example "Find it by describing it".

### Gaps
- No Loupe-specific traffic or conversion data was available to size tests.
- Whether Loupe's tagging is fully available on the free plan, and whether user images are excluded from model training, needs confirming with the team before using either as copy.
- The live wording of Milanote, Miro and Linear heroes could not be verified this session, because those hosts were blocked or did not render.
