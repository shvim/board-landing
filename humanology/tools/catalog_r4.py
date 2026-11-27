"""Catalog release 2026-11-27.1: the 2026-11-26.4 release plus eight new published cards.
Writes catalog/catalog.json, catalog/counts.json, catalog/supabase-seed.sql, and updates the matching files.
The prior release is kept at catalog/releases/2026-11-26.4.json. Run from humanology/: python3 tools/catalog_r4.py"""
import json, os, csv, copy
BASE = 'catalog/releases/2026-11-26.4.json'
os.makedirs('catalog/releases', exist_ok=True)
if not os.path.exists(BASE):
    json.dump(json.load(open('catalog/catalog.json', encoding='utf-8')), open(BASE, 'w', encoding='utf-8'), ensure_ascii=False)
cat = copy.deepcopy(json.load(open(BASE, encoding='utf-8')))
VER = '2026-11-27.1'
cat['catalog_version'] = VER

def src(sid, title, url, year, role, shows, authors, doi, ptype, basis='Abstract and journal summaries read through search; full text not opened in this pass'):
    return dict(source_id=sid, title=title, url=url, year=year, role=role, what_it_shows=shows, authors=authors, doi=doi, review_basis=basis, publication_type=ptype)

SOURCES = [
  src('31331557', 'Device and non-device-guided slow breathing to reduce blood pressure: A systematic review and meta-analysis', 'https://pubmed.ncbi.nlm.nih.gov/31331557/', '2019',
      'Pooled research', '17 studies in people with hypertension or prehypertension. Slow breathing lowered systolic pressure by about 5.6 mmHg and diastolic by about 3.0 mmHg, with high heterogeneity between studies.',
      'Chaddha A, Modaff D, Hooper-Lane C, Feldstein DA.', '10.1016/j.ctim.2019.03.005', 'Systematic review and meta-analysis'),
  src('12119224', 'Humming greatly increases nasal nitric oxide', 'https://pubmed.ncbi.nlm.nih.gov/12119224/', '2002',
      'Mechanism study', 'In ten healthy volunteers, nasal nitric oxide was about 15 times higher while humming than during quiet exhalation. No health outcome was measured.',
      'Weitzberg E, Lundberg JO.', '10.1164/rccm.200203-232OC', 'Primary study'),
  src('27351677', 'Acupuncture for the prevention of episodic migraine', 'https://pubmed.ncbi.nlm.nih.gov/27351677/', '2016',
      'Pooled research', '22 trials, 4,985 people with episodic migraine. Acupuncture reduced headache frequency compared with no acupuncture; the advantage over sham acupuncture was small (50% vs 41% responders). Moderate-quality evidence.',
      'Linde K, Allais G, Brinkhaus B, Fei Y, Mehring M, Vertosick EA, Vickers A, White AR.', '10.1002/14651858.CD001218.pub3', 'Cochrane systematic review'),
  src('32536366', 'A randomized controlled study of weighted chain blankets for insomnia in psychiatric disorders', 'https://pubmed.ncbi.nlm.nih.gov/32536366/', '2020',
      'Controlled trial', '120 adults with insomnia and major depression, bipolar disorder, generalized anxiety or ADHD. After 4 weeks, a heavy chain blanket lowered insomnia severity more than a light one (large effect; 59% vs 5% responded). No serious adverse events.',
      'Ekholm B, Spulber S, Adler M.', '10.5664/jcsm.8636', 'Primary study'),
  src('PHYSBEH-2017-STAIRS', 'Stair walking is more energizing than low dose caffeine in sleep deprived young women', 'https://doi.org/10.1016/j.physbeh.2017.03.013', '2017',
      'Controlled trial', 'Crossover study in 18 chronically sleep-deprived college women. Ten minutes of low-to-moderate stair walking (about 30 floors) increased feelings of energy more than 50 mg caffeine or placebo. The effect was short-lived and attention and memory did not improve.',
      "Randolph DD, O'Connor PJ.", '10.1016/j.physbeh.2017.03.013', 'Primary study'),
  src('26444654', 'The drawing effect: Evidence for reliable and robust memory benefits in free recall', 'https://pubmed.ncbi.nlm.nih.gov/26444654/', '2016',
      'Experimental studies', 'Seven laboratory experiments, mostly with university students. Words that people drew were recalled better than words they wrote out.',
      'Wammes JD, Meade ME, Fernandes MA.', '10.1080/17470218.2015.1094494', 'Primary study'),
  src('30346317', 'Implementation of a Defecation Posture Modification Device: Impact on Bowel Movement Patterns in Healthy Subjects', 'https://pubmed.ncbi.nlm.nih.gov/30346317/', '2019',
      'Uncontrolled crossover study', 'Healthy volunteers logged bowel movements for two weeks without and two weeks with a toilet footstool. With the stool, they reported shorter time, less straining and more complete emptying. Healthy adults only; self-reported.',
      'Modi RM, Hinton A, Pinkhas D, et al.', '10.1097/MCG.0000000000001143', 'Primary study'),
  src('35554601', 'Abdominal Massage in Functional Chronic Constipation: A Randomized Placebo-Controlled Trial', 'https://pubmed.ncbi.nlm.nih.gov/35554601/', '2022',
      'Controlled trial', 'Adults with functional chronic constipation. Abdominal massage improved constipation severity and quality of life more than a placebo treatment over four weeks. The session schedule reported in reviews (10 minutes, three times weekly) was not checked against the full text.',
      'Doğan IG, Gürşen C, Akbayrak T, et al.', '10.1093/ptj/pzac058', 'Primary study'),
  src('39531948', 'Effectiveness of abdominal massage on chronic constipation in adults: A systematic review and meta-analysis', 'https://pubmed.ncbi.nlm.nih.gov/39531948/', '2025',
      'Pooled research', 'Pooled randomized trials in adults with chronic constipation. The authors concluded abdominal massage was effective; trials were small and varied in technique.',
      '', '', 'Systematic review and meta-analysis'),
]
def note(sid, role, summary): return dict(source_id=sid, role=role, summary=summary)
def card(cid, title, action, tracking, goals, bids, rule, pop, qual, time, sids, summary, notes, blocked=None):
    return dict(card_id=cid, title=title, action=action, tracking_prompt=tracking, goals=goals, benefit_ids=bids, eligibility_rule=rule, studied_population=pop,
                qualification=qual, time_commitment=time, display_evidence_in_details=True, blocked_if=blocked or [], research_source_ids=sids, research_summary=summary, source_notes=notes)
def ben(bid, cid, stmt, goals, pop, comp, tf, sids, label, effect=None):
    return dict(benefit_id=bid, card_id=cid, statement=stmt, goals=goals, population=pop, comparator=comp, timeframe=tf, source_urls=[], evidence_label=label,
                effect_detail=effect, audience_filter=None, display_scope='card', source_ids=sids)
R = 'read_studied_population'
CARDS = [
  card('slow-breathing', 'Practice slow breathing', 'Sit comfortably and breathe slowly, about 10 breaths a minute or fewer, for 10 to 15 minutes a day.',
       'Log sessions. Add home blood pressure readings if you already take them.', ['heart'], ['slow-breathing-1'], R,
       'Adults with high or high-normal blood pressure, in 17 trials of device-guided and unguided slow breathing.',
       'Breathe gently. Stop if you feel light-headed.', '10 to 15 minutes a day', ['31331557'],
       'Pooled trials found a small average drop in blood pressure with regular slow breathing. Results varied a lot between studies, and some device trials had manufacturer involvement.',
       [note('31331557', 'Direct pooled result', 'In 17 studies of people with high or high-normal blood pressure, slow breathing lowered systolic pressure by about 5.6 mmHg and diastolic by about 3 mmHg. Heterogeneity was high.')]),
  card('humming', 'Hum on the out-breath', 'Breathe in through your nose, then hum gently as you breathe out. Repeat for a few minutes and notice how you feel.',
       'Note how calm you feel afterward. This is a personal experiment.', [], [], R,
       'Ten healthy adults in a laboratory measurement of nasal nitric oxide.',
       'Stop if you feel light-headed.', 'A few minutes', ['12119224'],
       'Humming raises nitric oxide in the nose many times over in a lab measurement. No study here tested a health benefit, so treat this as a personal experiment.',
       [note('12119224', 'Mechanism only', 'Nasal nitric oxide rose about 15-fold during humming in ten healthy adults. The study measured no symptom or health outcome, so it does not support a health claim.')]),
  card('acupuncture-migraine', 'Try acupuncture for migraine', 'Book a course of at least six sessions with a licensed acupuncturist, and keep a record of your migraine days.',
       'Log each session and count migraine days per month.', [], ['acupuncture-migraine-1'], R,
       'Adults with episodic migraine in 22 trials (4,985 people).',
       'Use a licensed practitioner. Tell them if you take blood thinners.', 'At least six sessions, usually weekly', ['27351677'],
       'Across 22 trials, people having acupuncture had fewer migraine days than people with usual care. Compared with sham acupuncture the extra benefit was small.',
       [note('27351677', 'Direct pooled result', 'Migraine days fell from about six a month to about three and a half with acupuncture, versus four with sham or preventive drugs and five with usual care. 50% of people responded to acupuncture and 41% to sham. Moderate-quality evidence.')]),
  card('weighted-blanket', 'Sleep under a weighted blanket', 'Sleep under a heavy weighted blanket every night for four weeks. The trial used a chain blanket of about 8 kg.',
       'Note how you slept each morning.', ['sleep'], ['weighted-blanket-1'], R,
       'Adults with insomnia and depression, bipolar disorder, generalized anxiety or ADHD (120 people).',
       'You should be able to lift it off yourself easily.', 'Every night', ['32536366'],
       'One randomized trial found a heavy blanket reduced insomnia severity more than a light one over four weeks, in adults with insomnia and a mental health condition. It has not been repeated yet.',
       [note('32536366', 'Direct result, single trial', '120 adults with insomnia and a psychiatric condition. After 4 weeks, 59% responded with a heavy chain blanket versus 5% with a light blanket. No serious adverse events.')]),
  card('stair-walk-energy', 'Walk the stairs for energy', 'When you feel flat, walk up and down stairs at an easy pace for ten minutes.',
       'Rate your energy before and after.', ['energy'], ['stair-walk-energy-1'], R,
       '18 chronically sleep-deprived college women in a crossover study.',
       'Hold the rail and go at an easy pace. Stop if you feel dizzy or short of breath.', '10 minutes', ['PHYSBEH-2017-STAIRS'],
       'In one small study, ten minutes of easy stair walking made sleep-deprived young women feel more energetic than a small dose of caffeine. The boost was brief.',
       [note('PHYSBEH-2017-STAIRS', 'Direct result, small crossover', '18 sleep-deprived college women. Ten minutes of low-to-moderate stair walking raised feelings of energy more than 50 mg caffeine or placebo. Attention and memory did not improve.')]),
  card('drawing-memory', 'Draw it to remember it', 'When you need to remember a list or new words, draw a quick sketch of each item instead of writing it out.',
       'Try recalling the items later and count how many you remember.', ['memory'], ['drawing-memory-1'], R,
       'University students in seven laboratory free-recall experiments.',
       'Quick sketches are enough. Drawing skill did not matter in the studies.', 'A few seconds per item', ['26444654'],
       'Across seven lab experiments, people remembered words better when they drew them than when they wrote them out. The tests were short and mostly in students.',
       [note('26444654', 'Direct result, lab experiments', 'In seven free-recall experiments, drawn words were recalled better than written ones. The benefit held across several comparison tasks.')]),
  card('toilet-footstool', 'Raise your feet on the toilet', 'Put a small footstool in front of the toilet and rest your feet on it so your knees are above your hips.',
       'Note how easy each bowel movement felt.', ['digestion'], ['toilet-footstool-1'], R,
       'Healthy adult volunteers who logged bowel movements for four weeks.',
       'See a doctor about new or lasting bowel changes.', 'No extra time', ['30346317'],
       'In one small study of healthy adults, using a footstool shortened time on the toilet and reduced straining. People with constipation were not studied.',
       [note('30346317', 'Direct result, uncontrolled crossover', 'Healthy volunteers recorded bowel movements for two weeks without and two weeks with a footstool. With the stool they reported less straining, shorter duration and more complete emptying.')]),
  card('abdominal-massage', 'Massage your belly for constipation', 'Lying down, gently massage your belly in slow clockwise circles for about ten minutes.',
       'Note bowel movements and how comfortable you feel.', ['digestion'], ['abdominal-massage-1'], R,
       'Adults with functional chronic constipation.',
       'Skip it if you have belly pain that hasn’t been checked. See a doctor about new or lasting bowel changes.', 'About 10 minutes, several times a week', ['35554601', '39531948'],
       'A placebo-controlled trial and a review of small trials found abdominal massage eased constipation symptoms. Techniques and schedules varied.',
       [note('35554601', 'Direct result', 'Adults with functional chronic constipation improved more with abdominal massage than with a placebo treatment over four weeks.'),
        note('39531948', 'Pooled research', 'Pooled small randomized trials in adults with chronic constipation favored abdominal massage. Methods varied.')]),
]
BENS = [
  ben('slow-breathing-1', 'slow-breathing', 'Small average drop in blood pressure with regular slow breathing', ['heart'], 'Adults with high or high-normal blood pressure', 'Usual care or control conditions', 'Weeks of regular practice', ['31331557'], 'Early evidence', 'About 5.6 mmHg systolic and 3 mmHg diastolic on average; results varied widely.'),
  ben('acupuncture-migraine-1', 'acupuncture-migraine', 'Fewer migraine days with a course of acupuncture', [], 'Adults with episodic migraine', 'Usual care, sham acupuncture or preventive drugs', 'At least 8 weeks', ['27351677'], 'Research supported', 'About 3.5 migraine days a month versus 5 with usual care and 4 with sham; small advantage over sham.'),
  ben('weighted-blanket-1', 'weighted-blanket', 'Less severe insomnia in adults with insomnia and a mental health condition', ['sleep'], 'Adults with insomnia and depression, bipolar disorder, anxiety or ADHD', 'A light blanket', '4 weeks', ['32536366'], 'Early evidence', '59% responded versus 5% with a light blanket.'),
  ben('stair-walk-energy-1', 'stair-walk-energy', 'Felt more energetic right after ten minutes of stair walking', ['energy'], 'Sleep-deprived young women', '50 mg caffeine or placebo', 'Immediately afterward', ['PHYSBEH-2017-STAIRS'], 'Early evidence', None),
  ben('drawing-memory-1', 'drawing-memory', 'Better recall of drawn words than written words', ['memory'], 'University students in laboratory tests', 'Writing the same words', 'Minutes after learning', ['26444654'], 'Early evidence', None),
  ben('toilet-footstool-1', 'toilet-footstool', 'Less straining and less time on the toilet with a footstool', ['digestion'], 'Healthy adults', 'The same people without the stool', 'Two weeks each', ['30346317'], 'Early evidence', None),
  ben('abdominal-massage-1', 'abdominal-massage', 'Eased constipation symptoms in adults with functional constipation', ['digestion'], 'Adults with functional chronic constipation', 'Placebo treatment or usual care', 'About four weeks', ['35554601', '39531948'], 'Early evidence', None),
]
url = {s['source_id']: s['url'] for s in SOURCES}
for b in BENS: b['source_urls'] = [url[s] for s in b['source_ids']]
assert not {c['card_id'] for c in CARDS} & {c['card_id'] for c in cat['cards']}
cat['cards'] += CARDS; cat['benefits'] += BENS; cat['research_sources'] += SOURCES
json.dump(cat, open('catalog/catalog.json', 'w', encoding='utf-8'), ensure_ascii=False)
counts = json.load(open('catalog/counts.json'))
counts.update(canonical_cards=len(cat['cards']), published_benefits=len(cat['benefits']), unique_source_links=len(cat['research_sources']),
              release=VER, release_note='2026-11-26.4 plus 8 cards from the 2026-11-27 discovery review')
json.dump(counts, open('catalog/counts.json', 'w'), indent=2)

# seed: same transactional template, new version, payload = this release
seed = open('catalog/releases/supabase-seed-2026-11-26.4.sql', encoding='utf-8').read().split('\n')
pay = json.dumps(cat, ensure_ascii=False, separators=(',', ':')); assert '$catalog$' not in pay
old = seed[19][2:seed[19].index("'", 2)]
seed[19] = f"('{VER}', $catalog${pay}$catalog$::jsonb)"
seed[22] = seed[22].replace(old, VER); seed[23] = f"    is distinct from $catalog${pay}$catalog$::jsonb then"
open('catalog/supabase-seed.sql', 'w', encoding='utf-8').write('\n'.join(seed))

# matching: exact-outcome refinements, activity metadata, claim map
ref = json.load(open('matching/refinements.json'))
for k, ids in {'heart.bp': ['slow-breathing-1'], 'sleep.quality': ['weighted-blanket-1'], 'energy.alert': ['stair-walk-energy-1'], 'energy.fatigue': ['stair-walk-energy-1'],
               'memory.recall': ['drawing-memory-1'], 'memory.strategies': ['drawing-memory-1'], 'digestion.regularity': ['abdominal-massage-1']}.items():
    for i in ids:
        if i not in ref[k]: ref[k].append(i)
json.dump(ref, open('matching/refinements.json', 'w'), indent=2)
act = json.load(open('matching/activity.json'))
act.update({'slow-breathing': {'seated': True}, 'humming': {'seated': True}, 'weighted-blanket': {'seated': True}, 'drawing-memory': {'seated': True},
            'toilet-footstool': {'seated': True}, 'abdominal-massage': {'seated': True}, 'acupuncture-migraine': {'seated': True}, 'stair-walk-energy': {'some': 2, 'more': 1}})
json.dump(act, open('matching/activity.json', 'w'), indent=1)
rows = list(csv.DictReader(open('matching/claim-map.csv', encoding='utf-8')))
have = {r['benefit_id'] for r in rows}
spec = {b: [k for k, ids in ref.items() if b in ids] for b in [x['benefit_id'] for x in BENS]}
for b in BENS:
    if b['benefit_id'] in have: continue
    rows.append({'benefit_id': b['benefit_id'], 'card_id': b['card_id'], 'catalog_goals': ' '.join(b['goals']), 'outcome': b['statement'], 'scope': b['display_scope'], 'specific_onboarding_matches': ' '.join(spec[b['benefit_id']])})
with open('matching/claim-map.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
print(VER, len(cat['cards']), 'cards', len(cat['benefits']), 'benefits', len(cat['research_sources']), 'sources')
