# Discovery expansion · catalog release 2026-11-27.1

**10 candidates investigated. 8 became live cards. 2 are deferred.** The release is 2026-11-26.4 plus these 8 cards: 64 cards, 82 results and 155 publications. `catalog.json`, `counts.json` and `supabase-seed.sql` agree, and `catalog/verify.mjs` passes. The previous release is kept in `catalog/releases/`.

**How the sources were checked.** This session's network blocks PubMed, Europe PMC, Crossref and journal sites. Each decisive source was read through the web search tool's own page reads: the abstract figures and design, plus the Cochrane summaries. That is not a direct fetch of the full text. Any detail confirmed only by secondary write-ups is marked "not confirmed from the primary paper" in the card's source note. The saved `board-landing` environment has unrestricted network access, and a new session there can open the full texts.

## Live cards

| Card (ID) | Exact action | Intended for | Studied protocol and outcome | Evidence wording | Tracker | Precaution or guidance | Art | Sources |
|---|---|---|---|---|---|---|---|---|
| Practice slow breathing (`slow-breathing`) | Breathe at about 10 breaths a minute or fewer, 10 to 15 minutes a day | "For high blood pressure" | 17 trials of device-guided and unguided slow breathing in hypertensive or prehypertensive adults. Systolic −5.6 mmHg, diastolic −3.0 mmHg, with high heterogeneity | Early research | Blood pressure (both numbers) | Stop if light-headed. Keep taking medicines | hm-long-exhale (Ama, slow exhale) | [PMID 31331557](https://pubmed.ncbi.nlm.nih.gov/31331557/) |
| Hum on the out-breath (`humming`) | Breathe in, hum gently on the out-breath for a few minutes | Anyone | 10 healthy adults: nasal nitric oxide about 15-fold higher while humming. **No health outcome measured** | Personal experiment, with no health claim and no benefit tag | Personal observation: how calm you feel | Stop if light-headed | hm-humming (Walter) | [PMID 12119224](https://pubmed.ncbi.nlm.nih.gov/12119224/) |
| Try acupuncture for migraine (`acupuncture-migraine`) | Book a course of at least six sessions with a licensed acupuncturist. **No home needling** | "For episodic migraine" | Cochrane review, 22 trials, 4,985 people. Migraine days about 3.5 a month with acupuncture vs about 5 with usual care and 4 with sham. Responders 50% vs 41% vs sham | Research supported | Migraine days per month, plus completion as "log a session" | Professional guidance: practitioner-delivered. Tell them about blood thinners | Placeholder (request below) | [PMID 27351677](https://pubmed.ncbi.nlm.nih.gov/27351677/) |
| Sleep under a weighted blanket (`weighted-blanket`) | A heavy weighted blanket every night for 4 weeks. The trial used chain blankets of about 8 kg | "For insomnia" | RCT, 120 adults with insomnia and depression, bipolar disorder, anxiety or ADHD. Responders 59% vs 5% with a light blanket. No serious adverse events | One study | Sleep quality (morning tap) | You must be able to lift it off easily | hm-weighted-blanket (Nora) | [PMID 32536366](https://pubmed.ncbi.nlm.nih.gov/32536366/) |
| Walk the stairs for energy (`stair-walk-energy`) | Ten minutes of easy stair walking when you feel flat | Anyone | Crossover study, 18 sleep-deprived college women. More energetic than with 50 mg caffeine or placebo. The effect was brief, with no attention or memory gain | One small study | Energy before and after | Hold the rail, go easy, stop if dizzy | Placeholder (shares the stairs request) | [DOI 10.1016/j.physbeh.2017.03.013](https://doi.org/10.1016/j.physbeh.2017.03.013) |
| Draw it to remember (`drawing-memory`) | Sketch each item you need to remember instead of writing it out | Anyone | 7 lab free-recall experiments, mostly students. Drawn words recalled better than written ones | Early research | Completion only; recall is a lab measure | None | hm-sketch (Nora) | [PMID 26444654](https://pubmed.ncbi.nlm.nih.gov/26444654/) |
| Raise your feet on the toilet (`toilet-footstool`) | Rest your feet on a small stool so your knees are above your hips | Anyone | Healthy volunteers, 2 weeks without vs 2 weeks with a stool. Less straining, shorter time, more complete emptying (self-reported). Sample size not confirmed from the primary paper | One small study | Digestive comfort (personal observation) | New or lasting bowel changes need a doctor | hm-footstool (the stool itself) | [PMID 30346317](https://pubmed.ncbi.nlm.nih.gov/30346317/) |
| Belly massage for constipation (`abdominal-massage`) | Gentle clockwise belly massage for about 10 minutes | "For constipation" | Placebo-controlled RCT in functional chronic constipation, plus a 2025 meta-analysis of small RCTs. The session schedule (10 min, 3×/week, 4 weeks) is not confirmed from the primary paper | Early research | Digestive comfort (personal observation) | Skip with unexplained belly pain | hm-belly-massage (Ama) | [PMID 35554601](https://pubmed.ncbi.nlm.nih.gov/35554601/), [PMID 39531948](https://pubmed.ncbi.nlm.nih.gov/39531948/) |

Slow breathing and humming are separate interventions. Humming makes no blood-pressure claim: no source opened here tested humming against blood pressure as a standalone practice. New matcher mappings are in `matching/refinements.json` and `claim-map.csv`:

| Goal → refinement | New result mapped |
|---|---|
| Heart → Blood pressure | slow breathing |
| Sleep → Quality | weighted blanket |
| Energy → Alertness and Fatigue | stairs |
| Memory → Recall and Strategies | drawing |
| Digestion → Regularity | abdominal massage |

The footstool's outcome is straining, not regularity, so it matches Digestion only at the general level.

## Deferred, with the specific gap

| Candidate | What was found | Why it isn't live |
|---|---|---|
| Home P6 wrist acupressure or wristbands | Cochrane review [PMID 26522652](https://pubmed.ncbi.nlm.nih.gov/26522652/): PC6 stimulation cut postoperative nausea (RR 0.68) and vomiting (RR 0.60) vs sham across 40+ trials | The evidence is for surgery. Pregnancy and chemotherapy results are mixed, and a chemotherapy wristband trial found no primary benefit. There is no everyday home use with a matching outcome yet. **Gap:** a home-use trial for a common situation, such as motion sickness, and the exact technique |
| Self-acupressure for constipation | One RCT in psychiatric inpatients ([PMID 26535053](https://pubmed.ncbi.nlm.nih.gov/26535053/)) and a 10-study review of mixed symptoms ([PMID 25637155](https://pubmed.ncbi.nlm.nih.gov/25637155/)) | One inpatient trial; points and technique are not standardized. **Gap:** an outpatient trial naming the points, pressure and schedule |
| Humming for blood pressure (Bhramari) | Small trials in hypertensive groups. Breathing-exercise meta-analyses pool it with other techniques | Not separable from slow breathing. Published only as the personal experiment above |

Other ideas from the archive (I019 abdominal massage, I020 footstool, I032 weighted blanket, I005 stair walk, H066 sketching) were the source of five of the live cards. Gaps that remain: energy still has few options, and digestion has no reflux option beyond left-side sleeping.
