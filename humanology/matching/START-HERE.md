# Fix recommendations and the dashboard suggestion controls

Work against Humanology 5.2 revised.zip. Integrate the included matching module and claim mapping into the live HTML and its maintained source. The owner’s “effort” example corresponds to “More effort” in the activity picker. These activity settings describe physical activity. Keep the editorial effort-to-maintain scale separate.

## Findings from the actual build

• recommend52 gates broad goals and suitability. recSet then gives the selected subgoal just +3, gives any MOVES52 card +4 for More effort, and fills three positions even when the subgoal differs. The time fill accepts unknown minutes as fitting any budget. Oats has one published claim, oats-1, for LDL cholesterol. Its Heart category is correct. It cannot explain a blood-pressure match. Handgrip is missing from MOVES52 even though it is exercise; fall-hazard assessment is in MOVES52 even though it is not an exertion workout.
• The final suggestions52 passes only broad goals and takes the first three results. It ignores saved refines and activity and may prioritize alphabetical card IDs. Route both renderers through one matcher after the existing catalog eligibility checks.
• Existing Explore and onboarding cards omit both evidence and effort. timeCue52 currently uses a single per-card lookup; e.g. 10 min for post-meal walks regardless of the schedule.

## Implementation

Embed refinements.json and activity.json during the standalone build. Pass the current onboarding choices or saved profile, as appropriate. Use the matched benefit IDs and matched variant IDs to build titles, tags, timing, evidence and reasons; do not re-expand the matched card to all claims. Resolve the selected schedule before showing a specific dose, time or grade. Preserve options to inspect other schedules on the detail page. Re-evaluate when the user changes goals, eligibility, activity, variants or time. Fix the stale seated preference carry-forward in the onboarding save handler when an explicit movement answer replaces seated. Verify ordinary and migrated profiles.

claim-map.csv covers all 75 published benefit rows of the 56-card release, including research-only and Explore-only entries. Empty specific mappings intentionally give no specific recommendation. Regularity of sleep, energy concentration, etc. must show an honest empty result if unsupported. Offer an explicit control to broaden the goal or change activity. Use general parent goals for broad discovery. In the existing taxonomy some refinements, e.g. Heart → Endurance, lack benefits assigned to that parent despite fitness benefits in Movement. Flag for editorial reassignment rather than routing by keyword. Activity assignments are proposed product metadata; where posture or exertion is uncertain, confirm the studied variant before adding a positive match. Do not manufacture an outcome to fill a carousel.

Keep the best exact activity match first when time permits. For a short time budget, offer an exact-match schedule that fits, or explicitly flag an over-budget option. An unknown duration is unknown. For multiple selected goals allow a match on one and name only the matched goal(s). Deduplicate by card ID. A single completion still earns credit once. Keep normal Explore browsing broad; its search and filters have a different purpose than personalized suggestions.

## Presentation

On Explore and onboarding, keep the painting dominant. Put known schedule-specific time and a single quiet plain-language evidence label in a secondary row: e.g. “30 min · Strong evidence” when both values apply. Bind each label to the visible outcome in text or accessible naming. When two shown outcomes differ in evidence level, leave the grades on detail or show the badge only beside the named outcome it describes. Show the catalog wording consistently for early and research-supported claims too. For an educational preview, unknown outcome, research-only claim or personal habit, omit the evidence cue. Keep effort off the browse cards but use the activity choice for matching. Keep safety visible before starting.

The active dashboard CSS .sga52 stacks + and Not for me with a 6px gap. Give the recommendation body its own tappable area. Use a dedicated action row beneath it, “+ Add” at the leading edge and “Not for me” at the trailing edge, 44px minimum targets with at least 12px of clear separation. Grow the card or wrap the row for enlarged text. Test at 320/375/390px and enlarged text, longest titles, tap and keyboard, added/dismissed states, and neighboring rows. Dismissing must never add the habit.

## Verify

Run node verify.mjs /absolute/path/to/revised/index.html from this directory to exercise the proposed matcher against the supplied build’s actual catalog selector. Then test both integrated UI paths independently. Include Heart → Blood pressure → More effort, cholesterol, short and unknown times, an unsupported refinement, two goals with different refinements, seated then more effort, exclusions/clearance, reload and active/dismissed cards. Return screenshots of the BP result, Explore metadata row and revised dashboard controls.
