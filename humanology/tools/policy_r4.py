"""Per-habit start rules (matching/policy.json) and the 56-row audit (AUDIT-START-RULES.md).
Fields: intended (short audience pill), precaution (shown once before starting), question (asked at Add only when
the answer changes whether to start; Yes blocks and says what to do), guidance (professional guidance required for
this protocol, with the reason), review (open clinical question). Who was studied stays in the catalog's
studied_population and appears only in the research disclosure. Run from humanology/: python3 tools/policy_r4.py"""
import json
cat = json.load(open('catalog/catalog.json', encoding='utf-8'))
base = {c['card_id'] for c in json.load(open('catalog/releases/2026-11-26.4.json', encoding='utf-8'))['cards']}
Q = lambda ask, keys, yes: {'ask': ask, 'keys': keys, 'yes': yes}
P = {
 'walk-after-meals': dict(precaution='If you take medicine that can cause low blood sugar, keep to your usual exercise precautions.', why='Ordinary. The diabetes schedule stays locked until the person says it applies.'),
 'brisk-walking': dict(precaution='Start at a pace you can manage. If you have unstable heart symptoms or have been told to limit brisk exercise, ask a clinician first.', why='Ordinary, with a plain precaution.'),
 'stairs': dict(question=Q('Have you been told to avoid vigorous exercise?', ['vigorous_exercise_restriction'], 'Then skip fast stair climbing for now. A brisk walk may suit you better; ask your clinician what level is right.'),
                precaution='Use a safe staircase with a rail. Stop if you feel dizzy or have chest pain.', why='Vigorous exercise: one question that changes whether to start.'),
 'almonds': dict(question=Q('Are you allergic to tree nuts?', ['tree_nut_allergy'], 'Then don’t add almonds. Choose another snack.'), why='Known exclusion kept as one allergy question; the studied group no longer blocks Add.'),
 'sunscreen': dict(why='Ordinary.'),
 'caffeine': dict(why='Ordinary.'),
 'resistance-sarcopenia': dict(intended='For age-related muscle loss', precaution='If you’re frail or unsteady, plan the exercises with a clinician or physiotherapist first.', why='Intended use shown as a pill; frailty advice kept as a precaution rather than a gate.'),
 'bath': dict(precaution='Keep the water comfortably warm, not hot, and take care getting out if you get dizzy.', why='Ordinary, with a plain precaution.'),
 'relax-muscles': dict(why='Ordinary.'),
 'cyclic-sighing': dict(precaution='Breathe gently. Stop if you feel light-headed.', why='Low-risk breathing practice; studied group moved to research.'),
 'cold-shower': dict(question=Q('Do you have heart disease, uncontrolled blood pressure, an irregular heartbeat, or a condition made worse by cold?', ['cold_sensitive_condition'], 'Then ask your clinician before trying cold water.'),
                     why='Cold exposure: a specific medical question replaces the generic check.'),
 'meal-order': dict(precaution='If you take diabetes medicine, keep to your prescribed plan.', why='Ordinary, with a plain precaution.'),
 'bedtime-list': dict(why='Ordinary. Studied in young adults in a sleep lab; that now sits in research.'),
 'kiwi': dict(intended='For constipation', question=Q('Are you allergic to kiwifruit?', ['kiwifruit_allergy'], 'Then don’t try this. Prunes are another option.'),
              precaution='See a doctor about new or lasting bowel changes.', why='Intended use as a pill; allergy kept as the one question.'),
 'beans': dict(why='Ordinary. Studied in adults with raised LDL; that now sits in research.'),
 'salt-swap': dict(question=Q('Do you have kidney disease, take a medicine that raises potassium (such as an ACE inhibitor, ARB or potassium-sparing diuretic), or have you been told to limit potassium?', ['kidney_disease', 'potassium_raising_medication', 'potassium_restriction'],
                     'Then don’t switch salts. Extra potassium can be dangerous for you; ask your clinician or pharmacist.'), why='Known contraindications kept as one specific question.'),
 'whole-grains': dict(precaution='Add fiber gradually if it upsets your stomach.', why='Ordinary.'),
 'walk-for-ideas': dict(why='Ordinary.'),
 'water-flosser': dict(intended='For bleeding gums', why='Intended use as a pill; no gate.'),
 'social-break': dict(why='Ordinary.'),
 'toothbrush': dict(why='Ordinary.'),
 'screen-cap': dict(precaution='Keep access to the calls and messages you need.', why='Ordinary.'),
 'standing-stockings': dict(intended='For standing shifts', question=Q('Do you have circulation problems in your legs, or a skin condition on your legs?', ['compression_contraindicated'], 'Then ask a clinician before using compression stockings.'),
                            precaution='Get stockings fitted to your size.', why='Intended use as a pill; compression contraindication kept as the one question.'),
 'optimism': dict(why='Ordinary.'),
 'bedtime-phone': dict(why='Ordinary.'),
 'blink': dict(intended='For dry eyes', precaution='See an eye-care professional for lasting symptoms, eye pain or changes in vision.', why='Intended use as a pill; no gate.'),
 'apples': dict(why='Ordinary. Studied in adults with mildly high cholesterol; that now sits in research.'),
 'work-breaks': dict(why='Ordinary.'),
 'hummus': dict(precaution='Check the ingredients if you have food allergies.', why='Ordinary.'),
 'volunteer': dict(why='Ordinary.'),
 'jumps': dict(question=Q('Are you pregnant, or do you have osteoporosis, a past fracture, joint or back problems, or been told to avoid impact exercise?', ['impact_exercise_restriction'], 'Then ask a clinician before doing jumps.'),
               why='Clearance replaced by the specific impact-exercise question.', review='Confirm that the question alone is sufficient for healthy adults outside the studied group of young women.'),
 'psyllium': dict(question=Q('Do you have trouble swallowing, a possible bowel blockage, or have you been told to limit fluids?', ['swallowing_difficulty', 'bowel_obstruction', 'fluid_restriction'], 'Then don’t start psyllium without your clinician’s advice.'),
                  precaution='Mix each dose into a full glass of water and never swallow the powder dry. Ask a pharmacist how to space it from your medicines.', why='Known contraindications kept as one question.'),
 'retrieval': dict(why='Ordinary.'),
 'flight-stockings': dict(intended='For long flights', question=Q('Do you have circulation problems in your legs, or a skin condition on your legs?', ['compression_contraindicated'], 'Then ask a clinician before using compression stockings.'),
                          precaution='Get stockings fitted before you travel.', why='Intended use as a pill; compression contraindication kept.'),
 'fall-hazards': dict(intended='For older adults at risk of falls', why='Intended use as a pill; arranging an assessment needs no gate.'),
 'handwash': dict(why='Ordinary.'),
 'water-premeal': dict(intended='With a weight-loss plan', question=Q('Has a clinician told you to limit how much you drink?', ['fluid_restriction'], 'Then don’t add this water; follow your fluid plan.'), why='Fluid restriction kept as one question.'),
 'drink-swap': dict(why='Ordinary.'),
 'eat-slowly': dict(precaution='Don’t force a chewing count if you have jaw, dental or swallowing problems.', why='Ordinary.'),
 'three-good-things': dict(why='Ordinary.'),
 'mindfulness': dict(precaution='Stop if you feel more distressed, and reach out for support.', why='Ordinary, with a plain precaution.'),
 'left-side': dict(intended='For nighttime reflux', why='Intended use as a pill; no gate.'),
 'music': dict(why='Ordinary.'),
 'smell-training': dict(intended='For smell loss after a virus', precaution='Get lasting or unexplained smell loss checked by a clinician first. Never put oils or anything else inside your nose.', why='Intended use as a pill; evaluation advice kept as a precaution.'),
 'prunes': dict(intended='For constipation', why='Intended use as a pill; no gate.'),
 'cystitis': dict(intended='For repeated bladder infections', question=Q('Do you have urinary symptoms right now, are you pregnant or breastfeeding, or have you been told to limit fluids?', ['current_urinary_symptoms', 'pregnancy', 'breastfeeding', 'fluid_restriction'],
                     'Then don’t start this. Get current symptoms checked, and follow your clinician’s fluid advice.'),
                  guidance='This plan is for repeated, confirmed bladder infections, so set it up with the clinician who manages them.', why='Clearance kept: the studied plan applies to diagnosed recurrent cystitis.', review='Whether clinician involvement is needed once a person confirms recurrent, diagnosed cystitis and none of the exclusions.'),
 'dash': dict(precaution='If you have kidney disease or a potassium or fluid restriction, get dietary advice first. Don’t change your medicines.', why='Ordinary, with a plain precaution.'),
 'walking-breaks': dict(why='Ordinary.'),
 'one-brisk-walk': dict(why='Ordinary.'),
 'nap': dict(precaution='Give yourself time to wake fully before driving.', why='Ordinary, with a plain precaution.'),
 'oats': dict(precaution='If you need gluten-free food, choose oats labeled gluten-free.', why='Ordinary.'),
 'pelvic-floor': dict(intended='For stress incontinence', guidance='The studied program is supervised: a clinician checks your technique and tailors the exercises.', why='Clearance kept: supervision is part of the tested program.'),
 'handgrip': dict(question=Q('Do you have uncontrolled blood pressure, a recent heart problem, or have you been told to limit exercise?', ['exercise_restriction'], 'Then don’t start handgrip training. Ask your clinician first.'),
                  guidance='The studied routine sets the grip at about 30% of your maximum with a force gauge, so a first session with an exercise professional sets it up.',
                  why='Clearance kept and the exclusions made explicit. The tested protocol is moderate (about 30% of maximum, 2-minute holds), not maximal straining.',
                  review='Whether a calibrated home device can replace the supervised first session, and the blood-pressure threshold for “uncontrolled”.'),
 'tai-chi': dict(intended='For fall prevention', why='Intended use as a pill; joining a class needs no gate.'),
 'neck-strength': dict(intended='For neck and shoulder pain', guidance='The studied program starts with a physiotherapist teaching the exercise and how to progress it.', precaution='Get new, severe or unexplained pain checked first.', why='Guidance kept: therapist instruction is part of the tested program.'),
 'sleep-extension': dict(intended='For habitual short sleepers', question=Q('Do you have insomnia or sleep apnea?', ['insomnia_or_apnea'], 'Then talk to a clinician first. More time in bed can make insomnia worse.'),
                         why='Clearance replaced by the specific exclusion question; the trial excluded insomnia and sleep apnea.', review='Confirm that counseling is optional once insomnia and sleep apnea are excluded.'),
 # new in 2026-11-27.1
 'slow-breathing': dict(intended='For high blood pressure', precaution='Breathe gently. Stop if you feel light-headed. Keep taking any blood pressure medicine.', why='New card.'),
 'humming': dict(why='New card: personal experiment, no health claim.'),
 'acupuncture-migraine': dict(intended='For episodic migraine', guidance='Acupuncture is given by a licensed practitioner; book a course of sessions with one.', precaution='Tell the practitioner if you take blood thinners or are pregnant.', why='New card: practitioner-led.'),
 'weighted-blanket': dict(intended='For insomnia', precaution='You should be able to lift the blanket off yourself easily.', why='New card.'),
 'stair-walk-energy': dict(precaution='Hold the rail and go at an easy pace. Stop if you feel dizzy or short of breath.', why='New card.'),
 'drawing-memory': dict(why='New card.'),
 'toilet-footstool': dict(precaution='See a doctor about new or lasting bowel changes.', why='New card.'),
 'abdominal-massage': dict(intended='For constipation', precaution='Skip it if you have belly pain that hasn’t been checked. See a doctor about new or lasting bowel changes.', why='New card.'),
}
ids = [c['card_id'] for c in cat['cards']]
assert set(P) == set(ids), set(ids) ^ set(P)
cards = {c['card_id']: c for c in cat['cards']}
for k, c in cards.items():
    q = P[k].get('question')
    if q: assert set(c['blocked_if']) <= set(q['keys']), (k, c['blocked_if'], q['keys'])   # every known exclusion survives
    elif c['blocked_if']: raise SystemExit(f'{k}: exclusion without a question')
pol = {k: {f: v for f, v in P[k].items() if f in ('intended', 'precaution', 'question', 'guidance', 'review')} for k in ids}
json.dump(pol, open('matching/policy.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

def old_rule(c):
    r = {'read_studied_population': 'Read population', 'confirm_eligibility': 'Confirm it fits', 'clinician_clearance': 'Professional clearance'}[c['eligibility_rule']]
    return r + (f" + exclusions ({', '.join(c['blocked_if'])})" if c['blocked_if'] else '')
def new_rule(p):
    parts = []
    if p.get('guidance'): parts.append('Professional guidance')
    if p.get('question'): parts.append('One question at Add')
    if p.get('intended'): parts.append(f"Pill: “{p['intended']}”")
    if p.get('precaution'): parts.append('Precaution shown once')
    return ' · '.join(parts) or 'Ordinary: Add habit'
gate_old = sum(1 for k in base if cards[k]['eligibility_rule'] != 'read_studied_population' or cards[k]['blocked_if'])
gate_new = sum(1 for k in base if P[k].get('question') or P[k].get('guidance'))
tot = lambda f: sum(1 for k in base if P[k].get(f))
rows = ['| # | Habit | Old rule | New behavior | Reason | Open clinical question |', '|---|---|---|---|---|---|']
for i, k in enumerate([x for x in ids if x in base], 1):
    c = cards[k]; p = P[k]
    rows.append(f"| {i} | {c['title']} (`{k}`) | {old_rule(c)} | {new_rule(p)}{'<br>Q: ' + p['question']['ask'] if p.get('question') else ''}{'<br>Guidance: ' + p['guidance'] if p.get('guidance') else ''} | {p['why']} | {p.get('review', '')} |")
md = f"""# Start-rule audit · 56 original habits

Each habit now has explicit fields in `matching/policy.json`:
- **intended**: a short audience pill.
- **precaution**: shown once, before Add.
- **question**: asked at Add only when the answer changes whether to start. A Yes keeps the habit out of Add and suggestions, and says what to do.
- **guidance**: professional guidance this protocol needs, with the reason.
- **review**: an open clinical question.

Who was studied stays in the catalog's `studied_population` and appears only under "What does the research say?". The generic "Check if it fits" step and the keyword rule that turned whole qualification paragraphs into warnings are gone.

## Totals (56 original habits)

| | Before | After |
|---|---|---|
| Habits that interrupted a new user before Add (confirmation or clearance) | {gate_old} | {gate_new} |
| Ordinary: plain Add habit, with no pill, question or guidance | – | {sum(1 for k in base if not any(P[k].get(f) for f in ('intended','question','guidance')))} |
| Audience pills | – | {tot('intended')} |
| Precautions (shown once, never a gate) | – | {tot('precaution')} |
| Action-changing questions (asked at Add) | – | {tot('question')} |
| Professional guidance required | 6 | {tot('guidance')} |
| Open clinical-review items | – | {tot('review')} |

The {gate_new} habits that still interrupt Add do so with one specific question or a stated guidance reason, never a generic check. Every known exclusion from the catalog's `blocked_if` field survives inside a question, which the build verifies. A Yes answer is honored on every route to Add: Explore +, quick-add, onboarding, dashboard suggestions, the detail page and schedule variants.

## Per-habit audit

""" + '\n'.join(rows) + """

## Flagged for clinical review

""" + '\n'.join(f"- **{cards[k]['title']}**: {P[k]['review']}" for k in ids if P[k].get('review')) + """

Isometric handgrip: the tested protocol is four 2-minute holds at about 30% of maximum grip, measured with a dynamometer, three days a week. That is moderate sustained effort, not the maximal straining that raises blood pressure sharply. Clearance is kept because the protocol needs a measured 30% setting and the cited qualification lists uncontrolled blood pressure and recent cardiac events. Both the supervised setup and the exclusion threshold are listed for clinical review rather than changed.
"""
open('AUDIT-START-RULES.md', 'w', encoding='utf-8').write(md)
print('policy', len(pol), 'gates before', gate_old, 'after', gate_new, 'pills', tot('intended'), 'precautions', tot('precaution'), 'questions', tot('question'), 'guidance', tot('guidance'))
