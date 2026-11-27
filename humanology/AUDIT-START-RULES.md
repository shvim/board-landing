# Start-rule audit · 56 original habits

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
| Habits that interrupted a new user before Add (confirmation or clearance) | 34 | 15 |
| Ordinary: plain Add habit, with no pill, question or guidance | – | 33 |
| Audience pills | – | 16 |
| Precautions (shown once, never a gate) | – | 22 |
| Action-changing questions (asked at Add) | – | 13 |
| Professional guidance required | 6 | 4 |
| Open clinical-review items | – | 4 |

The 15 habits that still interrupt Add do so with one specific question or a stated guidance reason, never a generic check. Every known exclusion from the catalog's `blocked_if` field survives inside a question, which the build verifies. A Yes answer is honored on every route to Add: Explore +, quick-add, onboarding, dashboard suggestions, the detail page and schedule variants.

## Per-habit audit

| # | Habit | Old rule | New behavior | Reason | Open clinical question |
|---|---|---|---|---|---|
| 1 | Take short walks after a meal (`walk-after-meals`) | Read population | Precaution shown once | Ordinary. The diabetes schedule stays locked until the person says it applies. |  |
| 2 | Make brisk walking a weekly habit (`brisk-walking`) | Read population | Precaution shown once | Ordinary, with a plain precaution. |  |
| 3 | Choose a stair-climbing routine (`stairs`) | Confirm it fits + exclusions (vigorous_exercise_restriction) | One question at Add · Precaution shown once<br>Q: Have you been told to avoid vigorous exercise? | Vigorous exercise: one question that changes whether to start. |  |
| 4 | Make almonds a daily snack (`almonds`) | Confirm it fits + exclusions (tree_nut_allergy) | One question at Add<br>Q: Are you allergic to tree nuts? | Known exclusion kept as one allergy question; the studied group no longer blocks Add. |  |
| 5 | Use sunscreen daily (`sunscreen`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 6 | Move caffeine earlier (`caffeine`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 7 | Practice resistance exercises for sarcopenia (`resistance-sarcopenia`) | Confirm it fits | Pill: “For age-related muscle loss” · Precaution shown once | Intended use shown as a pill; frailty advice kept as a precaution rather than a gate. |  |
| 8 | Take a warm bath or shower before bed (`bath`) | Read population | Precaution shown once | Ordinary, with a plain precaution. |  |
| 9 | Practice progressive muscle relaxation for sleep (`relax-muscles`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 10 | Try five minutes of cyclic sighing (`cyclic-sighing`) | Confirm it fits | Precaution shown once | Low-risk breathing practice; studied group moved to research. |  |
| 11 | Finish a shower with cold water (`cold-shower`) | Confirm it fits | One question at Add<br>Q: Do you have heart disease, uncontrolled blood pressure, an irregular heartbeat, or a condition made worse by cold? | Cold exposure: a specific medical question replaces the generic check. |  |
| 12 | Eat vegetables and protein before starch (`meal-order`) | Read population | Precaution shown once | Ordinary, with a plain precaution. |  |
| 13 | Write down tomorrow’s tasks (`bedtime-list`) | Confirm it fits | Ordinary: Add habit | Ordinary. Studied in young adults in a sleep lab; that now sits in research. |  |
| 14 | Try two green kiwifruit a day (`kiwi`) | Confirm it fits + exclusions (kiwifruit_allergy) | One question at Add · Pill: “For constipation” · Precaution shown once<br>Q: Are you allergic to kiwifruit? | Intended use as a pill; allergy kept as the one question. |  |
| 15 | Add canned beans to meals (`beans`) | Confirm it fits | Ordinary: Add habit | Ordinary. Studied in adults with raised LDL; that now sits in research. |  |
| 16 | Use a potassium-enriched salt substitute (`salt-swap`) | Confirm it fits + exclusions (kidney_disease, potassium_raising_medication, potassium_restriction) | One question at Add<br>Q: Do you have kidney disease, take a medicine that raises potassium (such as an ACE inhibitor, ARB or potassium-sparing diuretic), or have you been told to limit potassium? | Known contraindications kept as one specific question. |  |
| 17 | Choose whole-grain staples (`whole-grains`) | Read population | Precaution shown once | Ordinary. |  |
| 18 | Walk while brainstorming (`walk-for-ideas`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 19 | Clean between your teeth daily (`water-flosser`) | Confirm it fits | Pill: “For bleeding gums” | Intended use as a pill; no gate. |  |
| 20 | Take a week off social media (`social-break`) | Confirm it fits | Ordinary: Add habit | Ordinary. |  |
| 21 | Use a powered toothbrush (`toothbrush`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 22 | Set a daily phone screen-time cap (`screen-cap`) | Confirm it fits | Precaution shown once | Ordinary. |  |
| 23 | Use fitted stockings during standing shifts (`standing-stockings`) | Confirm it fits + exclusions (compression_contraindicated) | One question at Add · Pill: “For standing shifts” · Precaution shown once<br>Q: Do you have circulation problems in your legs, or a skin condition on your legs? | Intended use as a pill; compression contraindication kept as the one question. |  |
| 24 | Imagine your best possible future (`optimism`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 25 | Put your phone away before bed (`bedtime-phone`) | Confirm it fits | Ordinary: Add habit | Ordinary. |  |
| 26 | Practice complete blinks (`blink`) | Confirm it fits | Pill: “For dry eyes” · Precaution shown once | Intended use as a pill; no gate. |  |
| 27 | Try two whole apples daily (`apples`) | Confirm it fits | Ordinary: Add habit | Ordinary. Studied in adults with mildly high cholesterol; that now sits in research. |  |
| 28 | Add four breaks to a desk shift (`work-breaks`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 29 | Try an afternoon hummus snack (`hummus`) | Read population | Precaution shown once | Ordinary. |  |
| 30 | Try a structured volunteering session (`volunteer`) | Confirm it fits | Ordinary: Add habit | Ordinary. |  |
| 31 | Practice short sets of vertical jumps (`jumps`) | Professional clearance + exclusions (impact_exercise_restriction) | One question at Add<br>Q: Are you pregnant, or do you have osteoporosis, a past fracture, joint or back problems, or been told to avoid impact exercise? | Clearance replaced by the specific impact-exercise question. | Confirm that the question alone is sufficient for healthy adults outside the studied group of young women. |
| 32 | Use psyllium regularly (`psyllium`) | Confirm it fits + exclusions (swallowing_difficulty, bowel_obstruction, fluid_restriction) | One question at Add · Precaution shown once<br>Q: Do you have trouble swallowing, a possible bowel blockage, or have you been told to limit fluids? | Known contraindications kept as one question. |  |
| 33 | Practice recalling what you learn (`retrieval`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 34 | Wear fitted stockings on a long flight (`flight-stockings`) | Confirm it fits + exclusions (compression_contraindicated) | One question at Add · Pill: “For long flights” · Precaution shown once<br>Q: Do you have circulation problems in your legs, or a skin condition on your legs? | Intended use as a pill; compression contraindication kept. |  |
| 35 | Arrange a home fall-hazard assessment (`fall-hazards`) | Confirm it fits | Pill: “For older adults at risk of falls” | Intended use as a pill; arranging an assessment needs no gate. |  |
| 36 | Wash hands regularly (`handwash`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 37 | Drink water before meals in a structured weight program (`water-premeal`) | Confirm it fits + exclusions (fluid_restriction) | One question at Add · Pill: “With a weight-loss plan”<br>Q: Has a clinician told you to limit how much you drink? | Fluid restriction kept as one question. |  |
| 38 | Replace a sugary drink with water (`drink-swap`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 39 | Slow down at a meal (`eat-slowly`) | Read population | Precaution shown once | Ordinary. |  |
| 40 | Write down three good things (`three-good-things`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 41 | Try a brief guided mindfulness practice (`mindfulness`) | Confirm it fits | Precaution shown once | Ordinary, with a plain precaution. |  |
| 42 | Try positional therapy for nighttime reflux (`left-side`) | Confirm it fits | Pill: “For nighttime reflux” | Intended use as a pill; no gate. |  |
| 43 | Listen to music before bed (`music`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 44 | Practice smell training (`smell-training`) | Confirm it fits | Pill: “For smell loss after a virus” · Precaution shown once | Intended use as a pill; evaluation advice kept as a precaution. |  |
| 45 | Try prunes for constipation (`prunes`) | Confirm it fits | Pill: “For constipation” | Intended use as a pill; no gate. |  |
| 46 | Add water for recurrent cystitis prevention (`cystitis`) | Professional clearance + exclusions (current_urinary_symptoms, pregnancy, breastfeeding, fluid_restriction) | Professional guidance · One question at Add · Pill: “For repeated bladder infections”<br>Q: Do you have urinary symptoms right now, are you pregnant or breastfeeding, or have you been told to limit fluids?<br>Guidance: This plan is for repeated, confirmed bladder infections, so set it up with the clinician who manages them. | Clearance kept: the studied plan applies to diagnosed recurrent cystitis. | Whether clinician involvement is needed once a person confirms recurrent, diagnosed cystitis and none of the exclusions. |
| 47 | Build meals around the DASH pattern (`dash`) | Read population | Precaution shown once | Ordinary, with a plain precaution. |  |
| 48 | Break up a seated workday with walks (`walking-breaks`) | Read population | Ordinary: Add habit | Ordinary. |  |
| 49 | Try a ten-minute brisk walk (`one-brisk-walk`) | Confirm it fits | Ordinary: Add habit | Ordinary. |  |
| 50 | Try a brief post-lunch nap opportunity (`nap`) | Confirm it fits | Precaution shown once | Ordinary, with a plain precaution. |  |
| 51 | Choose oats with a stated beta-glucan amount (`oats`) | Read population | Precaution shown once | Ordinary. |  |
| 52 | Follow a supervised pelvic-floor training plan (`pelvic-floor`) | Professional clearance | Professional guidance · Pill: “For stress incontinence”<br>Guidance: The studied program is supervised: a clinician checks your technique and tailors the exercises. | Clearance kept: supervision is part of the tested program. |  |
| 53 | Practice isometric handgrip training (`handgrip`) | Professional clearance + exclusions (exercise_restriction) | Professional guidance · One question at Add<br>Q: Do you have uncontrolled blood pressure, a recent heart problem, or have you been told to limit exercise?<br>Guidance: The studied routine sets the grip at about 30% of your maximum with a force gauge, so a first session with an exercise professional sets it up. | Clearance kept and the exclusions made explicit. The tested protocol is moderate (about 30% of maximum, 2-minute holds), not maximal straining. | Whether a calibrated home device can replace the supervised first session, and the blood-pressure threshold for “uncontrolled”. |
| 54 | Join a fall-prevention tai chi program (`tai-chi`) | Confirm it fits | Pill: “For fall prevention” | Intended use as a pill; joining a class needs no gate. |  |
| 55 | Follow a taught resistance routine for neck and shoulder pain (`neck-strength`) | Professional clearance | Professional guidance · Pill: “For neck and shoulder pain” · Precaution shown once<br>Guidance: The studied program starts with a physiotherapist teaching the exercise and how to progress it. | Guidance kept: therapist instruction is part of the tested program. |  |
| 56 | Work with a counselor to extend short sleep (`sleep-extension`) | Professional clearance | One question at Add · Pill: “For habitual short sleepers”<br>Q: Do you have insomnia or sleep apnea? | Clearance replaced by the specific exclusion question; the trial excluded insomnia and sleep apnea. | Confirm that counseling is optional once insomnia and sleep apnea are excluded. |

## Flagged for clinical review

- **Practice short sets of vertical jumps**: Confirm that the question alone is sufficient for healthy adults outside the studied group of young women.
- **Add water for recurrent cystitis prevention**: Whether clinician involvement is needed once a person confirms recurrent, diagnosed cystitis and none of the exclusions.
- **Practice isometric handgrip training**: Whether a calibrated home device can replace the supervised first session, and the blood-pressure threshold for “uncontrolled”.
- **Work with a counselor to extend short sleep**: Confirm that counseling is optional once insomnia and sleep apnea are excluded.

Isometric handgrip: the tested protocol is four 2-minute holds at about 30% of maximum grip, measured with a dynamometer, three days a week. That is moderate sustained effort, not the maximal straining that raises blood pressure sharply. Clearance is kept because the protocol needs a measured 30% setting and the cited qualification lists uncontrolled blood pressure and recent cardiac events. Both the supervised setup and the exclusion threshold are listed for clinical review rather than changed.
