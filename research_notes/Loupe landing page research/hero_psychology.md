# Hero Psychology: First Impressions, Attention and Conversion in Landing-Page Hero Sections (for Loupe)

Research note, November 2026. Evidence tags used throughout: **[Strong]** = peer-reviewed and replicated, or meta-analytic; **[Moderate]** = peer-reviewed single study, or large observational dataset from a credible source; **[Weak]** = vendor or agency data, self-reported benchmarks, single case studies, untraced figures; **[Myth]** = popular claim that the evidence does not support.

Access caveat: in this research session nngroup.com and research.google could not be fetched directly (network policy). NN/g and Google Research findings below come from search-engine summaries of those pages and from secondary sources that quote them. The numbers are consistent across sources, but the report writer should treat exact NN/g wording as unverified against the original pages.

## 1. How fast do people judge a web page, how stable are those judgments, how long do they stay, and how do they scan?

### Takeaway
People form a reliable *visual-appeal* judgment of a page in 17 to 500 ms, driven mainly by visual complexity and then prototypicality (how "typical" the page looks for its category). That snap judgment correlates well with judgments made after longer viewing, but it measures appeal, not understanding or intent. Whether to stay is a separate decision, made mostly in the first ~10 seconds. Visitors spend most of their attention on the first screen (~57%) and first two screens (~74%), and they scan by headings rather than read.

### Cited Findings
**Speed of aesthetic judgment**
- [Strong] Lindgaard, Fernandes, Dudek & Brown (2006), *Behaviour & Information Technology* 25:115–126. Three studies had participants rate home pages for visual appeal. In the third, exposure was 50 ms or 500 ms, and 50 ms ratings tracked the longer-exposure ratings. The authors concluded that "visual appeal can be assessed within 50 msec," so designers have "about 50msec to make a good first impression." — [Nature news coverage, Jan 2006](https://www.nature.com/news/2006/060109/full/news060109-13.html); [WebsiteOptimization summary](https://websiteoptimization.com/speed/tweak/blink/)
- [Strong] Tractinsky, Cokhavi, Kirschenbaum & Sharfi (2006, *IJHCS*) set out to replicate and extend Lindgaard. 40 participants rated 50 web pages. Attractiveness ratings after 500 ms correlated highly with average ratings after 10 s of exposure. Extreme evaluations, positive or negative, came faster than moderate ones. The authors also found "considerable individual differences in evaluations and in the consistency of those evaluations." — [Typeset/SciSpace record](https://typeset.io/papers/evaluating-the-consistency-of-immediate-aesthetic-kw752b0u25); [BGU publication page](https://www.bgu.ac.il/researcher/noam-tractinsky/publications/349269701/)
- [Strong] Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila (2012, Google/Univ. of Basel), *International Journal of Human-Computer Studies* 70(11):794–811. Experiment 1 used 119 screenshots of real websites shown for 50, 500 or 1000 ms. Experiment 2 shortened exposure to 17, 33 and 50 ms. Visual complexity and prototypicality affected perceived aesthetics even at 17 ms. The prototypicality effect was weaker at first and grew to match the complexity effect as exposure lengthened. Sites with **low visual complexity and high prototypicality** were rated most appealing. — [Google Research publication page](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [Google Research blog, Aug 2012](https://ai.googleblog.com/2012/08/users-love-simple-and-familiar-designs.html); [Univ. Basel edoc](https://edoc.unibas.ch/21676)
- [Strong] Reinecke et al. (2013), CHI '13 pp. 2049–2058. 548 volunteers rated 450 websites for colorfulness, visual complexity and visual appeal after 500 ms. Computational models of complexity and colorfulness, combined with demographics, explained about half the variance in appeal ratings. Complexity mattered more than colorfulness, and the effects varied by age, gender and education (they are "not universal"). — [Harvard EECS abstract](https://www.eecs.harvard.edu/~kgajos/papers/2013/reinecke13predicting.shtml); [CHI 2013 PDF](https://wildlab.cs.washington.edu/Publications_files/Reinecke_CHI2013.pdf); [Harvard DASH](https://dash.harvard.edu/entities/publication/73120378-cc85-6bd4-e053-0100007fdf3b)
- [Moderate] Lindgaard, Dudek, Sen, Sumegi & Noonan (2011), *ACM TOCHI* 18(1). Participants saw homepages for 50 ms and judged appeal, trustworthiness or usability. All three judgments were "largely driven by visual appeal," though the more cognitively demanding judgments drew on somewhat different visual attributes. — [CiNii record](https://cir.nii.ac.jp/crid/1361418521447505920); [Human Factors International summary](https://www.humanfactors.com/newsletters/an_exploration_of_relations_between_visual_appeal.html)
- [Moderate] A paper citing Lindgaard and Tractinsky warns that the cognitive representation of an immediate aesthetic response may not be accurate, or that automatic and conscious processes may disagree. This means a 50 ms appeal rating is not the same as a considered evaluation. — [Typeset/SciSpace record (citing context)](https://typeset.io/papers/evaluating-the-consistency-of-immediate-aesthetic-kw752b0u25)

**How long people stay before deciding**
- [Strong] Liu, White & Dumais (SIGIR 2010, Microsoft Research) modeled page dwell time as "time to failure" with a Weibull distribution, which fit real browsing logs better than alternatives. Web browsing showed strong "negative aging": the probability of leaving is highest early and falls the longer someone stays, so a page must pass an initial screen before it gets read in detail. — [Microsoft Research publication](https://www.microsoft.com/en-us/research/publication/understanding-web-browsing-behaviors-through-weibull-analysis-of-dwell-time/)
- [Moderate] NN/g's reading of that paper: 99% of pages showed negative aging. The first 10 seconds are "critical for users' decision to stay or leave." The leave-probability curve flattens after about 30 seconds. "To gain several minutes of user attention, you must clearly communicate your value proposition within 10 seconds." Typical visits last a little under a minute, with wide variance. — [NN/g: How Long Do Users Stay on Web Pages?](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)

**Where attention goes: the fold and scrolling**
- [Moderate] In NN/g's 2018 eyetracking study, about 57% of page-viewing time went above the fold, down from 80% in their 2010 study. About 74% went to the first two screenfuls (up to ~2160px). The sharp drop in attention just below the fold persisted. NN/g's conclusion: people scroll more than before, but still look mostly above the fold. — [NN/g: Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/); [Wylie Communications summary](https://www.wyliecomm.com/2023/05/above-the-fold-statistics)
- [Moderate, conflicting measure] Chartbeat's aggregate data on article pages found 66% of attention below the fold. That measures total engaged time on long articles, not the share of first-screen viewing time, so it does not directly contradict NN/g. — [Wylie Communications summary citing Chartbeat](https://www.wyliecomm.com/2023/05/above-the-fold-statistics)
- [Weak] Secondary sources disagree on whether NN/g's 57% figure was measured on desktop or mobile. A CT.gov style guide attributes it to mobile, but the underlying study is most often described as desktop. Device is unverified. — [CT.gov content style guide](https://portal.ct.gov/ctcontentstyleguide/Fix-My-SEO/Writing-for-Mobile-Devices)

**Scanning patterns**
- [Moderate] NN/g's F-pattern (2006 eyetracking, reaffirmed in 2017) is described as the *default* pattern when a page has no strong cues guiding the eye to meaningful information. It mirrors in right-to-left languages. The 2017 follow-up documented other common patterns. **Layer-cake:** fixations mostly on headings and subheadings. **Spotted:** skipping big text blocks to hunt for a specific link, number or word shape. **Commitment:** reading nearly everything, typical of highly motivated users. — [NN/g: F-Shaped Pattern](https://nngroup.com/articles/f-shaped-pattern-reading-web-content/); [Codecademy summary](https://www.codecademy.com/article/how-users-scan); [Smashing Magazine 2024](https://smashingmagazine.com/2024/04/f-shape-pattern-how-users-read)

### Inferences
- Two different clocks are running. The **~50 ms clock** decides "does this look good, trustworthy, professional?" The **~10 s clock** decides "is this for me, and is it worth my time?" A hero has to win both. Visual craft wins the first, a clear and relevant value proposition wins the second.
- For Loupe, Tuch et al. creates a real tension. Loupe is an image library, so the natural hero is a dense mood-board collage, which is high visual complexity, the factor that hurts appeal fastest. A curated, sparse arrangement (few images, generous whitespace, one focal element) should test better than a wall of thumbnails.
- Prototypicality means the hero should look like a recognizable "product landing page": headline left or top, product visual, one primary button. Distinctiveness should come from the images and type, not from an unconventional layout. Interior designers are trained visual critics, so the 50 ms aesthetic pass may be harsher for this audience than for typical web users. This is inference; I found no study of designer populations specifically.
- Since 57–74% of attention lands on the first one or two screens, the second screen is valuable real estate, not dead space. A layer-cake scan means headline and subheads must carry the full argument on their own.

### Gaps
- Sample sizes for Lindgaard 2006 and Tuch 2012 were not retrievable (full texts not reachable).
- The size of the Liu/White/Dumais dataset was not confirmed.
- No direct large-sample replication of the specific 50 ms paradigm was found beyond Tractinsky 2006, Tuch 2012 and Reinecke 2013 (conceptual replications at 17–500 ms).
- No study found on first impressions among professional designers versus lay users.
- NN/g's 2018 device and sample details are unverified.

## 2. What drives "stay vs leave" in the first ~10 seconds?

### Takeaway
The best-supported drivers are: a value proposition the visitor understands immediately and sees as relevant; fluent, low-effort processing (simple language, legible type, low clutter); and perceived credibility, which lay users judge largely by visual design. The popular "aesthetic-usability effect" is real as a correlation, but its causal direction is contested.

### Cited Findings
**Value proposition clarity and relevance**
- [Moderate] NN/g's dwell-time analysis frames the first 10 s as the window to communicate the value proposition (see Q1). — [NN/g](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)
- [Weak, heuristic] MECLABS' Conversion Sequence Heuristic, C = 4m + 3v + 2(i−f) − 2a, ranks visitor motivation (m) first and value-proposition clarity (v) second, with incentive (i), friction (f) and anxiety (a) after. MECLABS describes it as "a thought tool," not a formula to solve. The coefficients come from practitioner experience, not published experiments, and I could not verify them in primary documentation. Value proposition is defined as the "appealing, exclusive, credible and clear" answer to "why should I buy from you rather than any of your competitors?" — [AMA Marketing News](https://www.ama.org/publications/MarketingNews/Pages/how-to-consistently-increase-conversion.aspx); [MarketingSherpa](https://marketingsherpa.com/article/how-to/value)
- [Moderate, correlational] Unbounce's 2024 Conversion Benchmark Report (41,000+ landing pages, 57M+ conversions) found a median conversion rate of 6.6% across industries. Pages with copy at a 5th–7th grade reading level had an 11.1% median conversion rate, against 5.3% for college-level copy. This is a correlation and does not show that simpler copy causes the lift. — [MarketingProfs summary of Unbounce 2024](https://marketingprofs.com/charts/2024/52374/landing-page-conversion-benchmarks)

**Cognitive (processing) fluency**
- [Strong] Reber, Schwarz & Winkielman (2004), *Personality and Social Psychology Review*: "The more fluently the perceiver can process an object, the more positive is his or her aesthetic response." Fluency is experienced as positive in itself. Figure-ground contrast, symmetry and prototypicality all work through fluency. — [Reber et al. 2004 PDF (UCSD)](https://pages.ucsd.edu/~pwinkielman/reber-schwarz-winkielman-beauty-PSPR-2004.pdf)
- [Moderate] Song & Schwarz (2008), *Psychological Science* 19(10):986–988. Exercise instructions printed in a hard-to-read font were judged to take nearly twice as long (15.1 vs 8.2 minutes), and readers were less willing to commit to the routine. Disfluent presentation makes the *task* look harder. — [U-Michigan press release](https://news.umich.edu/if-its-hard-to-read-is-it-hard-to-do); [PubMed 19000208](https://pubmed.ncbi.nlm.nih.gov/19000208/)

**Perceived credibility**
- [Moderate] Stanford Web Credibility Project (Fogg et al., data collected 2002, reported in 2002/2003). 2,684 participants assessed the credibility of 100 live sites across 10 categories. "Design look" was the most frequently mentioned factor, appearing in 46.1% of comments. It ranged from 38.1% (opinion/review sites) to 54.6% (finance sites). In the health category, 41.8% of consumers mentioned design, against 7.6% of health experts. Fogg: "To look good is to be good." Caveat: the method counts what people *mention*, not what causally moves their behavior. — [Consumer Reports WebWatch report](https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility); [Stanford Web Credibility Project (Wikipedia)](https://Www.Wikipedia.org/wiki/Stanford_Web_Credibility_Project); [InternetNews coverage](https://internetnews.com/marketing/study-for-site-cred-looks-matter)
- [Moderate] Lindgaard et al. (2011): trust judgments made at 50 ms were largely driven by visual appeal (see Q1). — [HFI summary](https://www.humanfactors.com/newsletters/an_exploration_of_relations_between_visual_appeal.html)

**Aesthetic-usability effect**
- [Moderate, correlational] Kurosu & Kashimura (1995, Hitachi): 252 people rated 26 ATM layouts. Apparent usability correlated with beauty (r = .589). Tractinsky (1997) replicated the correlation in Israel. Tractinsky, Katz & Ikar (2000), "What is beautiful is usable," *Interacting with Computers*. — [Wikipedia: Aesthetic–usability effect](https://en.wikipedia.org/wiki/Aesthetic%E2%80%93usability_effect); [BGU Tractinsky aesthetics research page](https://www.ise.bgu.ac.il/faculty/noam/research/aesthetics.html); [JUS (UXPA) boundary-conditions paper](https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Grishin_Feb2019.pdf)
- [Moderate, critique] Tuch, Roth, Hornbæk, Opwis & Bargas-Avila (2012), *Computers in Human Behavior* 28(5):1596–1607. 80 participants used one of four versions of an online shop (2×2: high/low aesthetics × high/low usability). Aesthetics did *not* affect perceived usability after use. Poor usability *lowered* aesthetic ratings, with frustration proposed as the mediator. "What is beautiful is usable" can be reversed. — [Google Research publication page](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/); [InfoQ coverage](https://www.infoq.com/news/2012/05/Aesthetics-Usability)

### Inferences
- For the first-glance window, aesthetics and credibility are tightly linked. Lay users read design quality as trustworthiness. Loupe's audience are design professionals, the "experts" for whom design *is* domain content. A sloppy hero will likely read as "this tool doesn't understand my craft," not merely "unpolished." This is an inference from the Fogg expert/consumer split, applied in reverse.
- The aesthetics halo helps at first glance but will not rescue a confusing experience. Tuch 2012 suggests that once people interact, friction drags down beauty ratings. Any interactive hero element (for example, a live search demo) must work flawlessly.
- Fluency argues for short, concrete, plain-language headlines in designer vocabulary ("Find that image you saved. Describe it."), legible type at strong contrast, and a hero with one obvious focal point. The Song & Schwarz result suggests a visually busy or hard-to-read hero makes *using the product* look effortful, which is the opposite of Loupe's promise.
- Relevance is the ingredient the visual-appeal literature does not measure. The 50 ms studies cover appeal only. Stay/leave at 10 s depends on whether the visitor recognizes their own problem. The founder's pain-point instinct targets that second clock.

### Gaps
- No controlled experiment found that isolates "value proposition clarity" in a hero and measures bounce. The evidence is heuristic (MECLABS), observational (Unbounce) or inferred from dwell-time curves.
- Stanford's 2002 data is old. No modern replication of the credibility-comment study was found.
- Possible replication problems with some fluency and disfluency findings (for example, the later "disfluency improves performance" debate) were not researched in this pass.

## 3. Pain-point framing vs benefit framing: what does the research say, and when does naming a pain backfire?

### Takeaway
Classic gain-vs-loss framing has a **tiny or zero average effect** on persuasion in large meta-analyses. Loss aversion is real in risky monetary choice (λ ≈ 2), but contested as a general principle. Negative information does attract attention and weigh more (negativity bias). Fear and pain appeals work on average (d ≈ 0.29), especially when paired with a clear, doable solution (efficacy). Pain framing backfires when it feels manipulative, when no clear remedy follows, or when the "curiosity gap" withholds the point. "Problem-agitation-solution" has no direct peer-reviewed evidence base.

### Cited Findings
**Message framing meta-analyses**
- [Strong] O'Keefe & Jensen (2007), *Journal of Health Communication*: 93 studies (N = 21,656) on disease-prevention messages. Gain-framed appeals were statistically more persuasive, but the difference was trivial (r = .03) and driven mainly by dental-hygiene studies. — [HealthySkepticism library entry](https://healthyskepticism.org/global/library/item/12801)
- [Strong] O'Keefe & Jensen (2009), *Journal of Communication*: 53 studies (N = 9,145) on disease-detection messages. Loss-framed appeals were not generally more persuasive. The only exception was a small advantage for breast-cancer detection. — [Typeset PDF](https://typeset.io/pdf/the-relative-persuasiveness-of-gain-framed-and-loss-framed-1989t99637.pdf); [DeepDyve](https://deepdyve.com/lp/doc/KeAVrghokh)
- [Strong] O'Keefe & Wu (dated 2011 in the search summary; the PMC record is the journal version): 33 randomized comparisons (N = 4,168) on skin-cancer prevention found no significant difference between gain and loss frames. — [PMC3397368](https://pmc.ncbi.nlm.nih.gov/articles/PMC3397368)
- [Strong] O'Keefe & Hoeken (2021, *Frontiers in Psychology*) review meta-analytic evidence on message-design choices, including framing. Effects are generally small and variable. — [Frontiers](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.664160/pdf)

**Loss aversion and prospect theory**
- [Strong] Brown, Imai, Vieider & Camerer (2024), *Journal of Economic Literature* 62(2):485–516. Meta-analysis of 607 loss-aversion estimates from 150 articles (1992–2017). Mean λ = 1.955, 95% interval [1.820, 2.102]: losses weigh about twice as much as equivalent gains in the choice paradigms studied. — [RePEc record](https://econpapers.repec.org/RePEc:aea:jeclit:v:62:y:2024:i:2:p:485-516); [LMU working paper PDF](https://epub.ub.uni-muenchen.de/75121/1/275.pdf)
- [Moderate, critique] Gal & Rucker (2018), *Journal of Consumer Psychology* 28(3):497–516, argue that current evidence does not support the claim that losses are, on balance, more impactful than gains. They suggest some "loss aversion" findings, such as status quo bias, reflect inertia instead. Simonson & Kivetz's reply in the same issue agrees that loss aversion is "less robust and universal than has been assumed" but argues it is contingent rather than absent. — [SSRN abstract](https://papers.ssrn.com/abstract=3049660); [Jason Collins summary](https://www.jasoncollins.blog/posts/the-case-against-loss-aversion)

**Negativity bias**
- [Strong] Baumeister, Bratslavsky, Finkenauer & Vohs (2001), "Bad Is Stronger Than Good," *Review of General Psychology* 5(4):323–370. Across many domains, bad events, feedback and emotions have larger and longer-lasting effects than good ones. — [Baumeister 2001 PDF](https://fbaum.unc.edu/teaching/articles/Baumeister_2001.pdf)
- [Strong] Rozin & Royzman (2001), *Personality and Social Psychology Review* 5(4):296–320. "Negativity dominance" is the most robust form. The authors note the bias is "far from universal." — [Rozin & Royzman PDF](https://pdodds.w3.uvm.edu/files/papers/others/2001/rozin2001a.pdf)

**Fear and pain appeals, and when they work**
- [Strong] Tannenbaum et al. (2015), *Psychological Bulletin* 141(6):1178–1204. Meta-analysis found fear appeals had a positive effect on attitudes, intentions and behaviors (random-effects d = 0.29). Effectiveness rose when messages included **efficacy statements** (what to do, and that it works). The meta-analysis found no circumstances in which fear appeals backfired relative to a control. — [APA press release](https://www.apa.org/news/press/releases/2015/10/fear-based-appeals); [Dissertation version (Penn)](https://www.asc.upenn.edu/sites/default/files/2021-07/e3eff4_f9429b1d5e644365afa9ba68ba35298c.pdf)

**When "hooking" backfires (curiosity-gap and clickbait evidence)**
- [Moderate] Scacco & Muddiman (2020), *New Media & Society* 22(3). In the lab, summary headlines produced higher perceived information adequacy and anticipated engagement than some curiosity-style headlines. In a field test of 5,288 political headlines, curiosity headlines drew fewer page views than summary headlines (5,324 vs 6,701). — [Mapping Ignorance summary](https://mappingignorance.org/?p=6526); [Abstract record](https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi...........363ff0fbad172caa9367defa7f0c8880)
- [Moderate] A study of sharing behavior found clickbait articles got far fewer shares than non-clickbait, partly because readers inferred manipulative intent. — [PMC8799425](https://pmc.ncbi.nlm.nih.gov/articles/PMC8799425)

### Inferences
- Whether to frame as "pain" or "benefit" matters far less than whether the message is **specific and instantly recognizable**. Meta-analyses show valence alone barely moves persuasion. Negativity bias suggests a concrete pain may *capture attention* faster in the 10 s window, which is the founder's correct instinct. The persuasive work is then done by relevance plus a credible remedy.
- The fear-appeal literature gives a clear recipe: name the pain, then **show the remedy right away** (efficacy). For Loupe, "You saved it. Now you can't find it." should sit beside a visible demonstration of describing an image and getting it back, within the same screen.
- Backfire risks for Loupe:
  1. **Agitation without remedy.** A paragraph of pain before any product reads as manipulation, and clickbait research shows readers penalize that.
  2. **Curiosity-gap headlines.** Withholding what Loupe is lowers engagement compared with plain summary headlines.
  3. **Blaming the user.** Inference only, not directly tested. "Your chaotic folders" may land worse with professionals than a shared-enemy framing such as "Screenshots, Pinterest, Downloads, WhatsApp…".
  4. **Pain that doesn't match.** If a visitor doesn't have the named problem, a pain-only hero gives them nothing. A pain line plus a benefit subhead covers both groups.
- Loss aversion (λ ≈ 2) comes from monetary gamble paradigms. Carrying it over to copywriting ("don't lose your inspiration") is an extrapolation that the framing meta-analyses do not support as a reliable lift.

### Gaps
- **No peer-reviewed study of problem-agitation-solution (PAS)** as a landing-page structure was found. PAS is copywriting folklore with practitioner support only.
- No controlled A/B evidence found comparing pain-led vs benefit-led SaaS hero headlines with published sample sizes.
- Witte's Extended Parallel Process Model (fear plus low efficacy leads to defensive avoidance) is referenced in Tannenbaum's table but was not independently researched here.

## 4. Hero visuals: product vs abstract imagery, screenshots vs illustrations, people photos, video/autoplay, interactive demos, carousels

### Takeaway
Evidence favors **informative, real imagery** (the actual product or the actual objects) over decorative or stock imagery, which eyetracking shows people ignore. Rotating carousels are well documented as poor performers. For hero video, screenshots vs illustrations, and interactive demos, no rigorous public A/B evidence exists. What exists is vendor-reported and directional only.

### Cited Findings
**Informative vs decorative imagery, people photos**
- [Moderate] NN/g eyetracking (*Eyetracking Web Usability*, Nielsen & Pernice, 2009/2010). Users pay close attention to photos that carry relevant information but ignore stock and filler photos. People who look like models drew less attention than ordinary-looking people. On Pottery Barn, users looked at decorative bookcase photos for a long time *because they showed the actual products for sale*. — [CXL: 10 findings about how people view websites](https://cxl.com/blog/10-useful-findings-about-how-people-view-websites/?amp); [PhotographyBay coverage, 2010](https://photographybay.com/2010/11/03/photos-as-web-content-eyetracking-study/); [NN/g book page](https://nngroup.com/books/eyetracking-web-usability)
- [Moderate] Sajjacholapunt & Ball (2014, *Frontiers in Psychology*), eyetracking on banner ads. Faces with averted gaze increased attention to the banner, but attention stayed on the face rather than the text or product, which weakened memory for brand and message. Mutual (direct) gaze was especially bad for attention to products in vertical banners. — [PMC3941030](https://pmc.ncbi.nlm.nih.gov/articles/PMC3941030); [UCLan PDF](https://clok.uclan.ac.uk/id/eprint/13559/1/Frontiers%20-%20Ball%202014.pdf)
- [Moderate] Palcu, Sudkamp & Florack (2017, *Frontiers in Psychology*). On a mock shopping page, faces looking *toward* a product increased purchase intent for that product. — [PMC5454066](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5454066/)

**Screenshots vs illustrations**
- [Weak] No rigorous head-to-head test of product screenshots vs illustrations in a SaaS hero was found. Available "evidence" is observational or bundled. A Reddit review of 100 Product Hunt launches found 82 used a raw screenshot as the hero, which shows prevalence, not effectiveness. Evil Martians' AppSignal redesign reported +14% activated users, but changed many elements at once. — [Evil Martians case study](https://evilmartians.com/chronicles/plus-14-percent-activated-users-for-appsignal-designing-a-new-homepage-in-code.md); [Reddit snapshot](https://reddit.sentinel-team.org/posts/1pt82bd/snapshots/2025-12-22T21%3A50%3A41.778122Z)

**Hero video and autoplay**
- [Weak] Reports conflict and none are rigorous. One roundup claims muted autoplay video on high-intent pages cut conversion 14%. An SEO blog reports an unnamed SaaS company's mobile hero video produced 15% fewer CTA clicks, and 12% lower mobile sign-ups. Vidalytics, an autoplay vendor, reports a 49% lift on a video sales letter. None publishes sample sizes or methodology. — [OverTheTopSEO roundup](https://www.overthetopseo.com/?p=53463); [ErgoSEO](https://ergoseo.com/blog/video-on-mobile-homepage-killing-engagement); [Vidalytics case study](https://www.vidalytics.com/case-studies/autoplay-increases-conversions-split-test)
- [Weak] Wyzowl 2025 survey: 89% of businesses use video (2026 edition reportedly 91%), and 73% of video marketers have made explainer videos. The survey had only **205 respondents** and reports marketer self-perceptions, not measured conversion. No Wyzowl landing-page conversion statistic was found. — [Wyzowl Video Marketing Statistics](https://wyzowl.com/video-marketing-statistics/); [Wix roundup](https://wix.com/blog/video-marketing-statistics)

**Interactive demos (all vendor-reported)**
- [Weak] Navattic *State of the Interactive Product Demo 2025*, based on 28,000+ demos on its platform: about 54% average completion, about 2.1 min average time. The 2026 edition reports multi-flow demos had 48% higher completion than single-flow demos, with similar click-through. — [Navattic 2025 report](https://navattic.com/report/state-of-the-interactive-product-demo-2025); [Navattic 2026 report](https://navattic.com/report/state-of-the-interactive-product-demo-2026)
- [Weak] Arcade benchmarks (2025 data): median 8% CTA click-through, 38% play rate, 58% completion. Adding an intro chapter raised play rate by about 72% (2024 benchmarks). Single-company claims: Amplitude reported +45% demo-form submissions after a homepage demo; Zapier reported +70% contact-sales submissions; Quantum Metric reported 2× conversion vs its "Get a Demo" page. — [Arcade 2024 benchmarks](https://www.arcade.software/post/arcade-benchmarks-2024); [Arcade: interactive demo data](https://www.arcade.software/post/how-to-get-interactive-demo-data); [Arcade Zapier case](https://arcade.software/post/zapier)

**Carousels**
- [Moderate, single-site data] Erik Runyon, University of Notre Dame homepage (2013). About 1% of visitors clicked the auto-forwarding carousel, and 84% of those clicks were on slide 1, with about 4% on each of the others. A January–June 2013 update found 1.08% clicked, with 89.1% of clicks on the first slide. On non-rotating features, the first item drew about 40% of clicks. — [Runyon: Carousel stats](https://erikrunyon.com/2013/01/carousel-stats/); [Runyon: Carousel interaction stats](https://erikrunyon.com/2013/07/carousel-interaction-stats/); [Smashing Magazine 2015](https://www.smashingmagazine.com/2015/02/carousel-usage-exploration-on-mobile-e-commerce-websites/)

### Inferences
- For Loupe, the product *is* imagery. That is unusually good news: real interiors photography is both "informative imagery" (the Pottery Barn effect) and a product demo. The hero should show **real designer-grade interior images inside the Loupe UI**, with visible AI tags in designer vocabulary ("fluted glass," "travertine," "bouclé"). That visual proves the value proposition in one look. Generic stock "designer at a laptop" photos are what eyetracking says people skip.
- If people appear in the hero at all, the gaze literature suggests faces will pull attention to themselves. A face, if used, should look toward the product or the search box, not at the viewer.
- Avoid rotating carousels in the hero. If several use cases must be shown (save from Chrome, save from iPhone, find by describing, share boards), static tiles or a scroll-driven sequence fit the evidence better than auto-rotation.
- Hero video and autoplay is a gamble with no reliable evidence either way, and it carries real page-weight and mobile costs (see Q8). A lightweight, looping UI micro-animation (typing a description, then results appearing) is a cheaper way to show the core interaction.
- An interactive "describe an image" demo is the most on-strategy option for Loupe because the interaction *is* the value proposition. The supporting data, though, is vendor self-reporting. Treat it as a hypothesis to A/B test, not a proven lift.

### Gaps
- No peer-reviewed or independently audited test of screenshots vs illustrations, hero video vs static image, or interactive demo vs static hero was found.
- The often-cited "37signals/Highrise person photo +102%" test and the "video increases conversion 80–86%" claims could not be traced to primary data in this pass.
- NN/g carousel guidance could not be fetched directly.

## 5. CTAs: number of CTAs and choice overload, button copy, placement, contrast, friction, "free," and "no credit card" reassurance

### Takeaway
"Choice overload" is much weaker and more conditional than the famous jam study suggests: the average effect is near zero, and it appears only under specific moderators. A single clear primary action is still sensible on fluency and focus grounds, but the evidence is benchmark-level, not experimental. The **zero-price effect is strong**: "free" changes behavior far more than an equivalent price cut. Credit-card-required trials convert better trial-to-paid but cut sign-ups, which is mostly a selection effect. Button color is a myth; contrast is what matters.

### Cited Findings
**Choice overload**
- [Moderate, replication concerns] Iyengar & Lepper (2000), Menlo Park grocery tasting booth: 60% of 242 passers-by stopped at the 24-jam display vs 40% of 260 at the 6-jam display. About 3% of stoppers at 24 jams vs about 30% at 6 jams later redeemed a purchase coupon. — [Iyengar & Lepper PDF (Scribd)](https://www.scribd.com/document/452274609/Iyengar-Lepper-2000-pdf); [Christian Science Monitor, 2012](https://csmonitor.com/layout/set/amphtml/Business/Donald-Marron/2012/0719/The-Paradox-of-Choice-A-theory-loses-favor)
- [Strong] Scheibehenne, Greifeneder & Todd (2010), *Journal of Consumer Research* 37(3):409–425. Meta-analysis of 63 conditions from 50 published and unpublished experiments (N = 5,036). The mean effect of choice overload was "virtually zero," with high variance. Expertise and prior preferences reduced it. Published studies showed larger effects than unpublished ones. The authors' own jam-style replications failed to find the effect. — [Indiana PDF](https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf); [RePEc](https://econpapers.repec.org/RePEc:oup:jconrs:v:37:y:2010:i:3:p:409-425); [CS Monitor](https://csmonitor.com/layout/set/amphtml/Business/Donald-Marron/2012/0719/The-Paradox-of-Choice-A-theory-loses-favor)
- [Strong] Chernev, Böckenholt & Goodman (2015), *Journal of Consumer Psychology*. Choice overload is reliable when four moderators are present: high decision-task difficulty, high choice-set complexity, high preference uncertainty, and a strong effort-minimizing goal. — [Bohrium abstract](https://www.bohrium.com/paper-details/choice-overload-a-conceptual-review-and-meta-analysis/814702993403281408-7309); [Frontiers 2024 review](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1290359/full)

**Number of CTAs, copy, color and contrast**
- [Weak, unverified] Figures attributed to Unbounce (18,639 landing pages): 1 CTA averaged 13.5% conversion, 2 CTAs 11.9%, 3+ CTAs 10.5%. Could not be verified against Unbounce's own report, and the data is correlational. — [Flint summary](https://www.flint.com/blog/landing-page-cta-button-performance-statistics)
- [Weak] Button color: practitioner consensus is that contrast with the surroundings drives results, not hue. The famous "red beats green" tests reflect contrast with the page palette. — [Atticus Li: button color tests](https://atticusli.com/blog/posts/cta-button-ab-tests-why-button-color-tests-are-worthless/)
- [Weak] A PartnerStack test (cited via HubSpot) reported a 111.55% lift from changing "Book a Demo" to "Get Started." This is a single, unverified case that illustrates commitment level in CTA copy. — [Flint summary](https://www.flint.com/blog/landing-page-cta-button-performance-statistics)

**"Free" and the zero-price effect**
- [Strong] Shampanier, Mazar & Ariely (2007), *Marketing Science* 26(6):742–757. With a Lindt truffle at 15¢ and a Hershey's Kiss at 1¢, about 73% chose the truffle. When both prices dropped by 1¢ (truffle 14¢, Kiss free), about 69% chose the Kiss. A drop from 2¢ to 1¢ did not shift shares, but a drop to zero did: free is a qualitative shift, not just a lower price. The effect held when transaction costs were held constant (cafeteria variant). — [Duke PDF: Zero as a Special Price](https://people.duke.edu/~dandan/webfiles/PapersPI/Zero%20as%20a%20Special%20Price.pdf); [MarketingProfs summary](https://marketingprofs.com/short-articles/468/the-power-of-free)

**Credit-card requirement and trial framing**
- [Moderate/Weak] ChartMogul SaaS Conversion Report: about 20% of free-trial products require a card upfront. Trial-to-paid conversion with a card is "good" at 25–35% and "great" at 50–60%. Secondary sources cite about 4–6% (good) for no-card trials. Card-required trials attract fewer but more committed sign-ups, so the gap is largely selection. — [ChartMogul report](https://chartmogul.com/reports/saas-conversion-report/); [Ada Chen Rekhi benchmarks](https://medium.com/ada-chen-rekhi/freemium-and-free-trial-conversion-benchmarks-9fab38d096da)

### Inferences
- A landing-page CTA is not an assortment decision. The jam and choice-overload literature is about choosing among many similar products, so applying it to "two buttons vs one" is an extrapolation. Still, Chernev's moderators, especially an effort-minimizing goal and preference uncertainty, describe a first-time visitor well. One visually dominant primary CTA, with at most a low-emphasis secondary ("See how it works"), fits both fluency and the moderator evidence.
- "Free" is Loupe's strongest single lever with strong evidence behind it. The zero-price effect says "Free" should be prominent in or next to the primary CTA ("Start free" / "Get Loupe free"), not buried in a pricing section.
- Since Loupe is free to use, not a trial, the trial-conversion benchmarks don't apply directly. The relevant friction is *anxiety*, the "a" term in MECLABS: "Is there a catch? Will I need a card? Will my images be private?" Short microcopy under the button ("Free. No credit card. Works in Chrome and on iPhone.") addresses this. This is heuristic reasoning; no rigorous public test of "no credit card required" microcopy was found.
- CTA copy should name the first concrete action and match commitment level. "Add to Chrome — free" or "Start your library" is lower commitment than "Sign up." This is directional, based on single-case evidence.

### Gaps
- No peer-reviewed study of CTA count on landing pages was found. Unbounce CTA-count figures are unverified.
- No rigorous public A/B test of "no credit card required" microcopy was found.
- No study comparing "free" vs "free trial" vs "freemium" framing at the landing-page sign-up step was found.
- The claimed 2024 field replication of choice overload (Lockheed et al.) could not be verified.

## 6. Social proof for an early-stage product with little proof

### Takeaway
Social proof works, but people weigh **quantity heavily**, even irrationally, so small numbers can read as weak. The first handful of genuine reviews delivers most of the benefit, and slightly imperfect ratings are more credible than perfect ones. For products whose adoption is still small, **dynamic (trend) norms** ("more studios are switching each week") can persuade even when the current majority does something else. Anything that looks manipulative is penalized.

### Cited Findings
- [Moderate] Powell, Yu, DeWolf & Holyoak (2017), *Psychological Science* 28(10):1432–1442. Participants (about 130 adults) chose between phone cases with similar ratings, one with 125 more reviews. They generally picked the more-reviewed product, even when statistics implied it was worse and even when both were rated low. An analysis of 15M Amazon reviews of 350k+ products found no relationship between review count and rating. — [Stanford News](https://news.stanford.edu/stories/2017/09/online-consumers-choose-inferior-products); [APS release](https://www.psychologicalscience.org/news/releases/people-favor-highly-reviewed-products-even-when-they-shouldnt.html)
- [Moderate, industry-academic] Spiegel Research Center (Northwestern, 2017, with PowerReviews data). Products with 5 reviews had about 270% higher purchase likelihood than products with none, with the effect larger for pricier items. Most of the gain came in the first 5–10 reviews. Purchase likelihood peaked at 4.0–4.7 stars and fell as ratings approached 5.0. — [Spiegel e-book PDF](https://www.xait.com/hubfs/Spiegel_Online-Review_eBook_Jun2017_FINAL.pdf); [Spiegel "4.5 stars better than 5"](https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel-research-reveals-4.5-stars-are-better-than-5-The-Medill-IMC-Spiegel-Research-Center.pdf)
- [Strong-Moderate] Sparkman & Walton (2017), *Psychological Science* 28(11):1663–1674. "Dynamic norms" (others are *increasingly* doing X) promoted behavior even when it ran against the current norm. In a café, 34% of diners who read a dynamic statement ordered meatless, against 17% with a static statement. Laundry loads fell about 30% with dynamic signs vs about 10% with static signs. — [Stanford News](https://news.stanford.edu/stories/2017/10/change-behaviors-changing-perception-normal); [Stanford dissertation record](https://purl.stanford.edu/hh041mz2871)
- [Moderate] Readers who infer manipulative intent share and trust content less (clickbait study). — [PMC8799425](https://pmc.ncbi.nlm.nih.gov/articles/PMC8799425)

### Inferences
- Avoid showing small absolute numbers ("Join 37 designers"). Powell et al. suggest people treat count as popularity, so a small count may signal unpopularity. Better options for an early product:
  1. **Specific, named testimonials** from recognizable studios or designers, with photo, studio name and city. Quality and specificity stand in for volume.
  2. **Dynamic framing** ("Studios are moving their image libraries to Loupe," "X images tagged this week" if the number is large and growing).
  3. **Proof of work, not proof of crowd:** show the AI tags on a real image, which demonstrates competence directly.
  4. **Credible imperfection:** a few genuine, specific quotes beat a perfect-looking wall of five-star praise. This is inferred from the Spiegel 4.0–4.7 finding.
- Never fabricate logos, counts or testimonials. Beyond ethics and legal risk, perceived manipulation measurably reduces trust and sharing. Interior design is a small, networked profession where fakes would be spotted.
- Logos of studios using Loupe, *if real and permitted*, are a compact credibility signal for a design audience, but I found no controlled study comparing logos vs testimonials vs numbers.

### Gaps
- No controlled study found comparing logos vs testimonials vs user counts on SaaS landing pages.
- Cialdini's Petrified Forest "negative descriptive norm" experiment (Cialdini 2003, *Current Directions in Psychological Science* 12(4):105–109) could not be verified in detail in this pass.
- No research found specifically on minimum credible numbers, the threshold where a count stops hurting.
- The FTC's rules on fake reviews and testimonials were not researched here.

## 7. Curiosity, interactivity and the IKEA/endowment effect as engagement drivers

### Takeaway
Curiosity (Loewenstein's information gap) is a real motivator, but withholding information in headlines underperforms clear summaries in field data. The IKEA effect is robust in the lab (a 63% willingness-to-pay premium), but **only when the effort ends in a successful, completed result**. No peer-reviewed evidence directly tests IKEA or endowment effects on landing pages. Interactive-demo data is vendor-reported.

### Cited Findings
- [Strong, theory] Loewenstein's (1994) information-gap theory: curiosity arises when a question becomes active and a gap in knowledge feels important and salient. — [arXiv review applying Loewenstein](https://arxiv.org/pdf/1806.04212); [Scott 2021, Kingston](https://eprints.kingston.ac.uk/47719)
- [Moderate] In field data, curiosity headlines got fewer page views than summary headlines (5,324 vs 6,701 across 5,288 headlines). Summary headlines raised perceived information adequacy in the lab. — [Mapping Ignorance](https://mappingignorance.org/?p=6526)
- [Strong] Norton, Mochon & Ariely (2012), "The IKEA Effect: When Labor Leads to Love," *Journal of Consumer Psychology* 22(3):453–460. People who assembled their own IKEA boxes would pay a 63% premium over an identical pre-assembled box. The effect held for novices as well as DIY enthusiasts. It **disappeared when participants built and then destroyed their creation, or failed to complete it**. — [Harvard DASH PDF](https://dash.harvard.edu/bitstream/handle/1/12136084/norton%20mochon%20ariely%20third%20round[1].pdf); [Wikipedia: IKEA effect](https://www.wikipedia.com/wiki/IKEA_effect)
- [Moderate, critique] Gal & Rucker (2018) argue that endowment and status-quo effects may partly reflect inertia rather than loss aversion. — [SSRN](https://papers.ssrn.com/abstract=3049660)
- [Weak] Vendor data on interactive demos: about 54% completion (Navattic) and 58% median completion (Arcade). An intro chapter raised play rate about 72% (Arcade). Several single-company lifts are reported (see Q4). — [Navattic 2025](https://navattic.com/report/state-of-the-interactive-product-demo-2025); [Arcade 2024](https://www.arcade.software/post/arcade-benchmarks-2024)

### Inferences
- Use curiosity *after* clarity, not instead of it. The headline should say plainly what Loupe does. Curiosity can then be triggered by an invitation to *try* ("Describe an image you're looking for…") rather than by withholding information.
- A hero "try it" moment, where the visitor types a description like "warm limewash bedroom with linen" and sees matching images with designer tags, could combine curiosity, interactivity and a small IKEA-style investment. The IKEA evidence carries a sharp warning: **the investment only creates value if it succeeds**. A failed or empty search result would likely be worse than no demo. Pre-curated sample queries (clickable chips) cut the failure risk and the typing effort on mobile.
- Endowment-style tactics ("your board is ready, sign up to save it") are plausible, but their landing-page evidence is folklore-level. Treat them as experiments.

### Gaps
- No peer-reviewed study testing the IKEA effect, endowment effect or interactive hero demos on landing-page conversion was found.
- Vendor demo benchmarks measure engagement and CTA clicks within the demo, not incremental sign-up lift against a control.

## 8. Mobile specifics: first-screen behavior, thumb zone, page speed and bounce, motion and perceived speed

### Takeaway
On mobile, speed is a well-evidenced, first-order driver of abandonment. The Google data are older (2016–2017) and partly modeled, but consistent: bounce probability rises steeply between 1 s and 3–5 s. Deloitte/Google found even 0.1 s improvements correlated with meaningful conversion gains. About half of phone users operate one-handed, mostly with the right thumb. Perceived wait can be shaped by how progress is shown. Hero video on mobile has only anecdotal evidence of harm, but clear speed costs.

### Cited Findings
**Speed and abandonment**
- [Moderate] Google/DoubleClick "The Need for Mobile Speed" (September 2016), based on 10,000+ mobile domains: 53% of mobile site visits are likely to be abandoned if pages take longer than 3 seconds to load. Average load time was 19 s on 3G and 14 s on 4G. Sites loading in 5 s earned up to 2× the mobile ad revenue of 19 s sites. — [Google blog, Sept 2016](https://blog.google/products/ads-commerce/the-need-for-mobile-speed/); [AMP blog](https://blog.amp.dev/2016/09/08/new-study-speedmatters-for-mobile-user-engagement-and-revenue/); [ARF summary](https://thearf.org/?p=341315)
- [Moderate, modeled] Google/SOASTA (2017): bounce probability rises 32% as page load goes from 1 s to 3 s. A neural-net model (about 90% prediction accuracy) estimated +113% from 1 s to 7 s. The widely repeated +90% (1→5 s), +106% (1→6 s) and +123% (1→10 s) figures appear in secondary sources and were not confirmed on a primary Google page here. — [Think with Google page-load statistics](https://thinkwithgoogle.com/data/page-load-time-statistics); [AMP blog 2017 benchmarks](https://blog.amp.dev/2017/02/28/new-industry-benchmarks-for-mobile-page-speed/)
- [Moderate, observational, Google-commissioned] Deloitte/55 "Milliseconds Make Millions" (2020): 37 European and US brand sites, 30M+ sessions over about 4 weeks in late 2019, no UX redesigns during the study. A 0.1 s improvement across four speed metrics was associated with +8.4% conversion on retail sites and +10.1% on travel sites, with retail spend up 9.2%. The improvement had to hold on every page in the journey. — [web.dev case study](https://web.dev/case-studies/milliseconds-make-millions); [MediaPost](https://www.mediapost.com/publications/article/352986/speed-turns-into-a-performance-metric-per-google.html)

**How phones are held**
- [Moderate] Hoober (2013, UXmatters): observed 1,333 people in public, of whom 780 were touching the screen. 49% used one hand, 36% cradled the phone (one hand holds, the other taps), and 15% used two hands. Of one-handed users, 67% used the right thumb. Hoober notes that one-handed users shift grip often. — [UXmatters, Feb 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php?); [Garcia Media summary](https://garciamedia.com/?p=7518)

**Motion and perceived speed**
- [Moderate] Harrison, Amento, Kuznetsov & Bell (UIST 2007), "Rethinking the Progress Bar." Progress-bar behavior changed perceived duration without changing actual duration. Users tolerated slow progress or pauses early far better than near the end, and slow-to-fast progress felt fastest. A 2010 CHI follow-up showed visual augmentations made bars feel faster. — [Chris Harrison research page](https://www.chrisharrison.net/index.php/Research/ProgressBars); [FIGLAB 2010](https://www.figlab.com/research/2010/faster-progress-bars)

**Hero video on mobile**
- [Weak] Unverified anecdotes report mobile hero video lowering CTA clicks (−15%) and sign-ups (−12%). One test reported that a muted animated gradient kept conversion steady while improving LCP by 1.1 s. — [ErgoSEO](https://ergoseo.com/blog/video-on-mobile-homepage-killing-engagement); [Gostellar](https://gostellar.app/blog/high-impact-hero-sections-that-dont-hurt-page-speed)

### Inferences
- For Loupe's mobile hero: lead with a light, fast-rendering headline and CTA. Lazy-load imagery below the first viewport. Use optimized, responsive images (AVIF/WebP) for hero visuals. Avoid video as the LCP element. On an image-heavy product page, image weight is the main speed risk.
- Many designers will arrive from iPhone (Loupe saves from iPhone), so the mobile first screen should show headline, a one-line value proposition, the primary CTA, and a glimpse of real product imagery without scrolling. The primary CTA should sit in the lower-middle area reachable by a right thumb, and a sticky bottom CTA is a reasonable pattern to test. Thumb-zone heat maps are oversimplified (grips shift), so make targets large rather than relying on zones.
- Motion should *show the product working* (a description typed, then results appearing) and must never delay content. The progress-bar research supports making waits feel shorter, but no animation offsets real load-time cost. Respect `prefers-reduced-motion`.

### Gaps
- The Google 2016–2017 figures are old, partly modeled, and from a party with an interest in web speed. No independent replication was found.
- No peer-reviewed evidence on skeleton screens or perceived load time was found in this pass.
- Contentsquare 2025/2026 mobile benchmarks (bounce, scroll rate, time on page) could not be retrieved. Secondary mobile bounce figures conflict (for example, Fullstory-attributed 31% → 48%) and are unverified.
- No research found on first-screen mobile behavior for landing pages specifically, as distinct from content pages.

## 9. Which popular claims are myths or weakly supported?

### Takeaway
Several staples of landing-page advice are myths, or real findings stretched beyond what they show. The "8-second attention span" is a myth. "Users don't scroll" is outdated. The "50 ms" finding is real but only about visual appeal. The jam study, loss-aversion copy and button-color claims are overstated. Most headline video and hero-element "lift" statistics trace to vendors or cannot be traced at all.

### Cited Findings
- **[Myth] "Humans have an 8-second attention span, shorter than a goldfish."** It traces to a 2015 Microsoft Canada marketing report that cited Statistic Brain, not original research. The BBC (Simon Maybin, 2017) followed the citations and found no supporting research. Psychologists note that "average attention span" is meaningless because attention is task-dependent. There is also no evidence for the goldfish comparison. A 2022 King's College London survey found half of UK adults still believed it. — [WARC: The goldfish myth](https://www.warc.com/newsandopinion/opinion/the_goldfish_myth/2806); [MediaCat UK](https://mediacat.uk/?p=6301); [UW Psych "Goldfish MythBusting" PDF](https://internet.psych.wisc.edu/wp-content/uploads/532-Master/532-UnitPages/Unit-09/Goldfish_MythBusting.pdf)
- **[Myth/Outdated] "Users don't scroll" / "everything must be above the fold."** NN/g 2018: only 57% of viewing time is above the fold, and 74% falls across the first two screens. People do scroll, though attention decays. — [NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)
- **[Real but overstated] "You have 50 ms to make an impression."** The finding replicates for *visual appeal* (Lindgaard 2006; Tractinsky 2006; Tuch 2012 down to 17 ms; Reinecke 2013). It says nothing about comprehension, value-proposition uptake or conversion. Individual differences are considerable. The stay/leave decision plays out over about 10 s (NN/g / Liu et al.). — [Tractinsky 2006](https://typeset.io/papers/evaluating-the-consistency-of-immediate-aesthetic-kw752b0u25); [NN/g dwell time](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)
- **[Overstated] "More options always kill conversion" (jam study).** Meta-analytic mean effect is near zero (Scheibehenne 2010, N = 5,036). Overload appears only under specific moderators (Chernev 2015). — [Scheibehenne PDF](https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf)
- **[Overstated] "Loss framing is twice as persuasive because losses loom 2× larger."** λ ≈ 1.96 comes from risky-choice paradigms (Brown et al. 2024). Message-framing meta-analyses find gain/loss differences of about r = .03 or none (O'Keefe & Jensen 2007, 2009). Loss aversion's generality is contested (Gal & Rucker 2018). — [O'Keefe & Jensen](https://healthyskepticism.org/global/library/item/12801); [Gal & Rucker](https://papers.ssrn.com/abstract=3049660)
- **[Overstated] "Beautiful things are perceived as easier to use."** Its origins are correlational (r = .589, Kurosu & Kashimura 1995). An experimental test found that usability affects perceived beauty more than the reverse (Tuch et al. 2012). — [Wikipedia: Aesthetic–usability effect](https://en.wikipedia.org/wiki/Aesthetic%E2%80%93usability_effect); [Tuch et al. 2012](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/)
- **[Myth] "Red/orange buttons convert best."** Color tests reflect contrast with the page, not hue. — [Atticus Li](https://atticusli.com/blog/posts/cta-button-ab-tests-why-button-color-tests-are-worthless/)
- **[Context-dependent] "People always read in an F-pattern."** The F-pattern is the default when there are no strong visual cues. Layer-cake, spotted and commitment patterns are also common. — [NN/g F-pattern](https://nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- **[Weak] "Video on a landing page increases conversion by 80%+."** No primary source was traced. Wyzowl surveys are marketer self-reports with small samples (205 respondents in 2025). — [Wyzowl](https://wyzowl.com/video-marketing-statistics/); [OverTheTopSEO](https://www.overthetopseo.com/?p=53463)
- **[Weak] Carousels "let you show more messages."** Runyon's data (about 1% clicked, 84–89% on slide 1) argues against this. — [Runyon](https://erikrunyon.com/2013/01/carousel-stats/)
- **[Correlational] "Simple copy doubles conversion."** Unbounce's reading-level finding (11.1% vs 5.3%) is observational. — [MarketingProfs](https://marketingprofs.com/charts/2024/52374/landing-page-conversion-benchmarks)

### Inferences
- The defensible core for Loupe's hero:
  1. Visually simple and prototypical, to win the 50 ms appeal and credibility pass.
  2. A specific, recognizable pain paired with an immediate visible remedy, to win the 10 s relevance pass.
  3. Real product imagery with designer-language tags, not stock or abstract art.
  4. One dominant CTA with "Free" prominent and anxiety-reducing microcopy.
  5. Honest, specific social proof framed dynamically, not small absolute counts.
  6. A fast mobile first screen.
- Everything else (video, interactive demo, curiosity hooks, pain-vs-benefit wording) should be A/B tested on Loupe's own traffic, since published evidence for those elements is vendor-grade.

### Gaps
- The original BBC article (March 2017) was not retrieved directly; details come from secondary quotes.
- No systematic audit of A/B test archives (GoodUI, VWO, Optimizely) was completed in this pass. GoodUI patterns and leak data were not retrieved, so the strength of individual hero patterns in those archives is unassessed.
