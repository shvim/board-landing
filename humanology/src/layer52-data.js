/* ================= Humanology 5.2 — canonical catalog, adapter, selector =================
   One structured catalog (release 2026-11-26.4, embedded at build time as #catalog52) feeds every screen.
   The 5.1 renderers read an HM.CAT shape, so buildCat52() derives that shape from the catalog by ID. Nothing
   here is a second hand-written copy: titles, actions, benefits, sources and schedules are all looked up by ID. */
"use strict";
const C52 = (() => {
  const raw = JSON.parse(document.getElementById("catalog52").textContent);
  const card = {}, ben = {}, vari = {}, src = {};
  raw.cards.forEach(c => card[c.card_id] = c);
  raw.benefits.forEach(b => ben[b.benefit_id] = b);
  raw.variants.forEach(v => vari[v.variant_id] = v);
  raw.research_sources.forEach(s => src[s.source_id] = s);
  const variantsOf = id => raw.variants.filter(v => v.card_id === id);
  return { raw, card, ben, vari, src, variantsOf, release: "2026-11-26.4" };
})();
const ART52 = JSON.parse(document.getElementById("art52").textContent);
const LEGACY51 = JSON.parse(document.getElementById("legacy51").textContent);

/* ---------- the supplied selector, verbatim from catalog/recommend.mjs (parity is tested in tests/parity.mjs) ---------- */
/*RECOMMEND52-START*/
function recommend52(catalog, options = {}) {
  const goals = new Set(options.goals ?? []);
  const audience = new Set(options.audience ?? []);
  const blocked = new Set(options.blocked ?? []);
  const eligible = new Set(options.eligibleCards ?? []);
  const cleared = new Set(options.clearedCards ?? []);
  const omit = new Set([...(options.dismissed ?? []), ...(options.activeCards ?? [])]);
  const byId = new Map(catalog.benefits.map(benefit => [benefit.benefit_id, benefit]));
  const results = [];
  for (const card of catalog.cards) {
    const id = card.card_id;
    if (omit.has(id) || card.blocked_if.some(key => blocked.has(key))) continue;
    if ((card.blocked_if.length || card.eligibility_rule !== 'read_studied_population')
        && !eligible.has(id)) continue;
    if (card.eligibility_rule === 'clinician_clearance' && !cleared.has(id)) continue;
    const variants = catalog.variants.filter(v => v.card_id === id);
    const selected = options.selectedVariants?.[id];
    const allowed = variants.filter(v => (!selected || selected === v.variant_id)
      && (!v.audience_filter || audience.has(v.audience_filter)));
    if (variants.length && !allowed.length) continue;
    const variantBenefits = new Set(allowed.flatMap(v => v.benefit_ids));
    const possible = card.benefit_ids.map(key => byId.get(key))
      .filter(b => (!b.audience_filter || audience.has(b.audience_filter))
        && (!variants.length || variantBenefits.has(b.benefit_id)));
    const matched = possible.filter(b => b.goals.some(g => goals.has(g)));
    if (!matched.length) continue;
    const matchedGoals = [...new Set(matched.flatMap(b => b.goals.filter(g => goals.has(g))))];
    // Summaries for a variant-specific intervention are attached to that variant only.
    const visibleVariants = allowed.map(v => ({
      ...v, benefits: possible.filter(b => v.benefit_ids.includes(b.benefit_id))
    }));
    results.push({
      card, matchedGoals,
      benefits: possible.filter(b => b.display_scope !== 'variant' && b.display_scope !== 'research_only'),
      variants: visibleVariants,
      reason: matchedGoals.length > 1 ? 'Matches more than one of your goals' : 'Matches a selected goal'
    });
  }
  return results.sort((a,b) => b.matchedGoals.length - a.matchedGoals.length
    || a.card.card_id.localeCompare(b.card.card_id));
}
/*RECOMMEND52-END*/

/* ---------- editorial fields that the catalog does not carry ----------
   Minutes: only where time_commitment states a per-session number, or states no extra time. Everything else is
   null and shown as "Time varies" / an unknown duration, never guessed. */
const MINS52 = { "walk-after-meals": 10, "brisk-walking": 30, stairs: 2, sunscreen: 2, caffeine: 0, bath: 10, "relax-muscles": 30,
  "cyclic-sighing": 5, "cold-shower": 1, "meal-order": 0, "bedtime-list": 5, optimism: 5, "work-breaks": 20, jumps: 2, handwash: 1,
  "drink-swap": 0, mindfulness: 10, music: 30, "walking-breaks": 5, "one-brisk-walk": 10, nap: 15 };
/* Effort: carried over only from 5.1's editorial rubric (EFFORT_SET) where a 5.1 habit is an exact match for the card.
   Cards without an editorial score show "Effort not rated". */
const EFFORT52 = { "brisk-walking": 3, "walk-after-meals": 2, "walking-breaks": 2, dash: 3, "salt-swap": 3, kiwi: 1, caffeine: 2,
  mindfulness: 2, "relax-muscles": 2, stairs: 4, jumps: 4, "cold-shower": 4, handgrip: 4, "neck-strength": 3, "tai-chi": 3, music: 1,
  "meal-order": 1, "eat-slowly": 2, bath: 2, oats: 1 };
/* standing or moving routines, for the "Stay seated" activity answer */
const MOVES52 = new Set(["walk-after-meals", "brisk-walking", "stairs", "walk-for-ideas", "walking-breaks", "one-brisk-walk", "jumps", "tai-chi",
  "resistance-sarcopenia", "neck-strength", "work-breaks", "fall-hazards", "volunteer"]);
/* 5.1 → 5.2: exact matches only (same action; wording may differ). Everything else stays under its original label. */
const MIG52 = { H001: "brisk-walking", H002: "walk-after-meals", H003: "walking-breaks", H008: "oats", H013: "dash", H015: "salt-swap",
  H024: "kiwi", H026: "caffeine", H028: "nap", H030: "mindfulness", H031: "relax-muscles", H035: "retrieval", H037: "stairs", H038: "jumps",
  H039: "meal-order", H041: "left-side", H044: "bath", H050: "cold-shower", H052: "handgrip", H054: "neck-strength", H058: "tai-chi",
  H060: "music", H061: "bedtime-list", H069: "optimism", H076: "cyclic-sighing", H082: "psyllium", H084: "prunes", H086: "eat-slowly",
  H089: "cystitis", I010: "meal-order", I022: "cold-shower", I027: "jumps" };
const BLOCK_WORDS52 = { vigorous_exercise_restriction: "You've been told to avoid vigorous exercise", tree_nut_allergy: "Tree nut allergy",
  kiwifruit_allergy: "Kiwifruit allergy", kidney_disease: "Kidney disease", potassium_raising_medication: "A medicine that raises potassium",
  compression_contraindicated: "You've been told not to wear compression", impact_exercise_restriction: "You've been told to avoid impact exercise",
  swallowing_difficulty: "Difficulty swallowing", bowel_obstruction: "Bowel obstruction or narrowing", fluid_restriction: "You've been told to limit fluids",
  current_urinary_symptoms: "Current urinary symptoms", pregnancy: "Pregnancy", breastfeeding: "Breastfeeding", exercise_restriction: "You've been told to limit exercise" };
const blockWord52 = k => BLOCK_WORDS52[k] || k.replace(/_/g, " ").replace(/^./, c => c.toUpperCase());
const AUD_WORDS52 = { type_2_diabetes: "type 2 diabetes", hypertension: "high blood pressure", high_stroke_risk_trial_population: "the high stroke-risk group studied", constipation: "constipation" };
const EV_LABELS = ["Strong evidence", "Research supported", "Early evidence"];
const EV_CLS = { "Strong evidence": "e-core", "Research supported": "e-prom", "Early evidence": "e-early" };
const GR52 = { "Strong evidence": "A", "Research supported": "B", "Early evidence": "C" };   // workbook "Read me": A/B/C ↔ these exact labels

/* source roles: direct evidence, broader context, or mixed results (from the card-specific note's role) */
function roleKind52(role) {
  const r = (role || "").toLowerCase();
  if (/mixed|inconclusive|null|conflict|limitation|uncertain/.test(r)) return "mixed";
  if (/^direct|tested schedule|direct /.test(r) || r.startsWith("direct")) return "direct";
  return "context";
}
const ROLE_WORD52 = { direct: "Direct evidence", context: "Broader context", mixed: "Mixed or null result" };

/* ---------- the HM.CAT shape the 5.1 renderers expect, derived from the catalog ---------- */
function buildCat52() {
  const cats = { heart: "Heart", mood: "Mind", metabolic: "Metabolic", sleep: "Sleep", memory: "Brain", movement: "Movement", digestion: "Digestion", energy: "Energy" };
  const habits = [], findings = {}, sources = {};
  for (const s of C52.raw.research_sources) sources[s.source_id] = { id: s.source_id, t: s.title, u: s.url, a: s.review_basis, ve: null, year: s.year };
  for (const c of C52.raw.cards) {
    const vs = C52.variantsOf(c.card_id);
    const visible = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope !== "research_only");
    for (const b of c.benefit_ids.map(id => C52.ben[id]))
      findings[b.benefit_id] = { id: b.benefit_id, h: c.card_id, out: b.statement, gr: GR52[b.evidence_label] || "C", sum: b.statement, pop: b.population,
        win: b.timeframe, comp: b.comparator, src: b.source_ids, cat: b.goals.map(g => cats[g]), scope: b.display_scope };
    const mk = (id, action, time, fs, pop) => ({ id, o: "c52", coll: "card", name: c.title, action, beg: action, proto: null, rel: null, freq: null,
      time: { s: MINS52[c.card_id] ?? null, st: null, txt: time }, eq: null, safe: c.qualification, guide: null, f: fs, g: c.goals.slice(), cats: c.goals.map(g => cats[g]), pop });
    const v = vs.length ? vs.map(x => mk(x.variant_id, x.action, x.time, x.benefit_ids.filter(id => C52.ben[id].display_scope !== "research_only"), x.population))
      : [mk(c.card_id + ":card", c.action, c.time_commitment, visible.map(b => b.benefit_id), c.studied_population)];
    const art = ART52.cards[c.card_id] || {};
    const restricted = c.eligibility_rule !== "read_studied_population" || c.blocked_if.length > 0;
    habits.push({ id: c.card_id, t: c.title, n: c.title, full: c.title, g: c.goals.slice(), rel: [], pl: "core_candidate", flags: [], notes: [], status: "release " + C52.release,
      sc: [], dis: true, pv: v[0].id, v, c52: c,
      el: { auto: !restricted, add: true, policy: c.eligibility_rule, screen: restricted, review: false, guided: false },
      d: { art: art.hero ? c.card_id : "!" + c.card_id, thumb: art.thumb ? c.card_id : null, field: GOAL_FIELD52[c.goals[0]] || "f-cream", goal: c.goals[0] || null,
        mins: MINS52[c.card_id] ?? null, noEq: true, effort: { 1: "gentle", 2: "gentle", 3: "moderate", 4: "vigorous", 5: "vigorous" }[EFFORT52[c.card_id]] || null,
        seated: !MOVES52.has(c.card_id), freq: "daily" } });
  }
  const goals = [{ id: "heart", label: "Heart health" }, { id: "sleep", label: "Sleep & recovery" }, { id: "mood", label: "Mood & stress" }, { id: "energy", label: "Energy & focus" },
    { id: "movement", label: "Strength & mobility" }, { id: "metabolic", label: "Nutrition & blood sugar" }, { id: "digestion", label: "Digestive comfort" }, { id: "memory", label: "Memory & learning" }];
  return { meta: { schema: "humanology.catalog.release", release: C52.release, goals, counts: { prototype_placements: {} } }, habits, findings, sources };
}
const GOAL_FIELD52 = { heart: "f-peach", sleep: "f-plum", mood: "f-slate", energy: "f-butter", movement: "f-sage", metabolic: "f-butter-s", digestion: "f-sage-s", memory: "f-peach" };
