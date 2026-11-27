/* ================= Humanology 5.2 — screens and behavior on top of 5.1 =================
   Loaded after every 5.1 layer and before boot. Anything assigned here replaces the 5.1 version. */
"use strict";
const KEY52 = "humanology-v52:state", KEY51 = "humanology-v5:state";
const card52 = id => C52.card[id] || null;
const isCard52 = h => !!(h && h.c52);

/* ---------- per-person eligibility, kept on this device ---------- */
function E52() { if (!st.e52) st.e52 = { elig: {}, clear: {}, blocked: [], aud: [], dismissed: [], sel: {}, rem: {} }; return st.e52; }
const restricted52 = c => c.eligibility_rule !== "read_studied_population" || c.blocked_if.length > 0;
function blockedFor52(c) { const b = E52().blocked; return c.blocked_if.filter(k => b.includes(k)); }
function canAdd52(c) {
  if (!c) return true; if (blockedFor52(c).length) return false;
  if (!restricted52(c)) return true;
  const e = E52(); return !!e.elig[c.card_id] && (c.eligibility_rule !== "clinician_clearance" || !!e.clear[c.card_id]);
}
function recOpts52(extra = {}) {
  const e = E52();
  return { goals: [], audience: e.aud.slice(), blocked: e.blocked.slice(), eligibleCards: Object.keys(e.elig).filter(k => e.elig[k]),
    clearedCards: Object.keys(e.clear).filter(k => e.clear[k]), activeCards: st.plan.filter(p => !p.removed).map(p => p.hid),
    dismissed: e.dismissed.slice(), selectedVariants: { ...e.sel }, ...extra };
}

/* ---------- variants (schedules) ---------- */
function allowedVariants52(c) { const aud = E52().aud; return C52.variantsOf(c.card_id).map(v => ({ v, ok: !v.audience_filter || aud.includes(v.audience_filter) })); }
function selVariant52(c) {
  const vs = allowedVariants52(c); if (!vs.length) return null;
  const want = (F.vsel52 && F.vsel52[c.card_id]) || E52().sel[c.card_id];
  return (vs.find(x => x.v.variant_id === want && x.ok) || vs.find(x => x.ok) || vs[0]).v;
}
/* the benefits that may be shown for a card: research_only never; variant-scoped only for the selected schedule;
   audience-scoped only once the person has said the condition applies */
function visibleBenefits52(c, v = selVariant52(c)) {
  const aud = E52().aud;
  return c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope !== "research_only"
    && (b.display_scope !== "variant" || (v && v.benefit_ids.includes(b.benefit_id)))
    && (!b.audience_filter || aud.includes(b.audience_filter)));
}
function heldBack52(c, v = selVariant52(c)) {   // results that exist but apply only to a population the person hasn't confirmed
  const aud = E52().aud;
  return c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope !== "research_only" && b.audience_filter && !aud.includes(b.audience_filter)
    && (b.display_scope !== "variant" || (v && v.benefit_ids.includes(b.benefit_id))));
}
const evRank52 = b => 3 - EV_LABELS.indexOf(b.evidence_label);
function shownBenefit52(c, goal) {
  const bs = visibleBenefits52(c); if (!bs.length) return null;
  return bs.slice().sort((a, b) => ((goal && b.goals.includes(goal)) - (goal && a.goals.includes(goal))) || evRank52(b) - evRank52(a))[0];
}
const actionOf52 = c => { const v = selVariant52(c); return v ? v.action : c.action; };
const timeOf52 = c => { const v = selVariant52(c); return v ? v.time : c.time_commitment; };
const popOf52 = c => { const v = selVariant52(c); return v ? v.population : c.studied_population; };
const short52 = (s, n = 1) => firstSentences(s || "", n);

/* ---------- evidence label, the effort cue, benefit goals ---------- */
function evChip52(b, id) {
  if (!b) return "";
  return `<button type="button" class="evp evb ${EV_CLS[b.evidence_label] || ""}" data-act="ev52" data-b="${esc(b.benefit_id)}" aria-label="${esc(b.evidence_label)} for this result. What this means">${esc(b.evidence_label)}${ico("info")}</button>`;
}
const EV_TEXT52 = {
  "Strong evidence": "A directly supported benefit with convincing evidence for its direction in the studied population. The exact schedule, size of the effect and how easy it is are separate questions.",
  "Research supported": "Credible support from controlled research, with a material uncertainty, or one well-conducted direct trial.",
  "Early evidence": "A relevant signal that is small, short, inconsistent, imprecise or open to bias. Treat it as a hypothesis worth trying, not a settled result.",
};
function openEv52(bid) {
  const b = C52.ben[bid]; if (!b) return; const c = card52(b.card_id);
  sheet(b.evidence_label, `<p>${esc(EV_TEXT52[b.evidence_label] || "")}</p>
    <div class="card2 left"><div class="eyebrow">This label applies to</div><p><b>${esc(b.statement)}</b></p><p class="fine">Studied in: ${esc(b.population)} · Compared with: ${esc(b.comparator)} · ${esc(b.timeframe)}</p></div>
    <p class="fine">The label describes the reviewed evidence for this one result, not every possible benefit, and not how well it will work for you.</p>
    <button type="button" class="btn" data-act="go" data-r="science" data-id="${esc(c.card_id)}">Research and sources</button><button type="button" class="btn ghost-btn" data-act="sheet-close">Close</button>`);
}
evidBtn = h => {
  if (!h || h.personal) return h && h.legacy ? `<span class="evp e-pers">Earlier version · not in the reviewed library</span>` : `<span class="evp e-pers">Personal habit · Not evidence-rated</span>`;
  const c = h.c52; const b = shownBenefit52(c, (st.ui.explore.goals || [])[0] || st.profile.goal);
  return b ? evChip52(b) : `<span class="evp e-ref">Research detail only</span>`;
};
openEvid = h => { const b = h && h.c52 && shownBenefit52(h.c52, st.profile.goal); if (b) openEv52(b.benefit_id); };
benefitGoals = (h, among) => {
  if (!h || !h.c52) return [];
  const gs = new Set(visibleBenefits52(h.c52).flatMap(b => b.goals));
  return (among || HM.CAT.meta.goals.map(g => g.id)).filter(g => gs.has(g));
};
mainFinding = h => { if (!h || !h.c52) return null; const b = shownBenefit52(h.c52, st.profile.goal); return b ? HM.CAT.findings[b.benefit_id] : null; };
benefitOf = h => { const f = mainFinding(h); return f ? f.out : ""; };
HM.bestFinding = (h, goal) => { if (!h || !h.c52) return null; const b = shownBenefit52(h.c52, goal); return b && (!goal || b.goals.includes(goal)) ? HM.CAT.findings[b.benefit_id] : null; };
effortOf = h => (h && h.c52 && EFFORT52[h.id]) || null;
const effortBars51 = effortBars;
effortBars = (h, cls = "") => {
  if (!h || h.personal) return "";
  if (!effortOf(h)) return cls === "sm" ? "" : `<span class="eff eff-none ${cls}"><span class="eff-l">Effort</span><span class="eff-w">Not rated</span></span>`;
  return effortBars51(h, cls);
};

/* ---------- "Check that this fits you": eligibility, exclusions, clearance, population-specific results ---------- */
function openFit52(id) {
  const c = card52(id); const e = E52(); const clin = c.eligibility_rule === "clinician_clearance";
  const auds = [...new Set(c.benefit_ids.map(b => C52.ben[b].audience_filter).concat(C52.variantsOf(id).map(v => v.audience_filter)).filter(Boolean))];
  F.fit52 = { id, ok: !!e.elig[id], clear: !!e.clear[id], blocks: c.blocked_if.filter(k => e.blocked.includes(k)), aud: auds.filter(a => e.aud.includes(a)) };
  sheet("Check that this fits you", `<div class="fit52"><p class="lede">${esc(c.title)}</p>
    <div class="card2 left"><div class="eyebrow">Studied in</div><p>${esc(c.studied_population)}</p><div class="eyebrow">Qualifications</div><p>${esc(c.qualification)}</p></div>
    ${c.blocked_if.length ? `<fieldset class="fs"><legend>Do any of these apply to you?</legend>${c.blocked_if.map(k => `<label class="tog"><input type="checkbox" data-fit52="block" value="${esc(k)}" ${F.fit52.blocks.includes(k) ? "checked" : ""}><span>${esc(blockWord52(k))}</span></label>`).join("")}
      <p class="fine">If one applies, this routine stays out of your suggestions. This list is a shortcut, not a full health screen.</p></fieldset>` : ""}
    ${auds.length ? `<fieldset class="fs"><legend>Some results apply only to particular people</legend>${auds.map(a => `<label class="tog"><input type="checkbox" data-fit52="aud" value="${esc(a)}" ${F.fit52.aud.includes(a) ? "checked" : ""}><span>I have ${esc(AUD_WORDS52[a] || a)}</span></label>`).join("")}</fieldset>` : ""}
    ${restricted52(c) ? `<label class="tog strong"><input type="checkbox" data-fit52="ok" ${F.fit52.ok ? "checked" : ""}><span>I&rsquo;ve read who this was studied in and it fits me</span></label>` : ""}
    ${clin ? `<label class="tog strong"><input type="checkbox" data-fit52="clear" ${F.fit52.clear ? "checked" : ""}><span>I&rsquo;ve had appropriate guidance from a health professional for this</span></label>` : ""}
    <p class="fine">${ico("lock")} Saved only on this device. Nothing is shared.</p>
    <button type="button" class="btn" data-act="fit52-save">Save</button><button type="button" class="btn ghost-btn" data-act="sheet-close">Cancel</button></div>`);
}
document.addEventListener("change", e => {
  const t = e.target; const k = t.dataset?.fit52; if (!k || !F.fit52) return;
  if (k === "ok") F.fit52.ok = t.checked; else if (k === "clear") F.fit52.clear = t.checked;
  else { const arr = k === "block" ? F.fit52.blocks : F.fit52.aud; const i = arr.indexOf(t.value); if (t.checked && i < 0) arr.push(t.value); if (!t.checked && i >= 0) arr.splice(i, 1); }
});
function saveFit52() {
  const f = F.fit52; if (!f) return; const c = card52(f.id); const e = E52();
  e.elig[f.id] = !!f.ok; if (c.eligibility_rule === "clinician_clearance") e.clear[f.id] = !!f.clear;
  for (const k of c.blocked_if) { const i = e.blocked.indexOf(k); if (f.blocks.includes(k) && i < 0) e.blocked.push(k); if (!f.blocks.includes(k) && i >= 0) e.blocked.splice(i, 1); }
  const auds = [...new Set(c.benefit_ids.map(b => C52.ben[b].audience_filter).concat(C52.variantsOf(f.id).map(v => v.audience_filter)).filter(Boolean))];
  for (const a of auds) { const i = e.aud.indexOf(a); if (f.aud.includes(a) && i < 0) e.aud.push(a); if (!f.aud.includes(a) && i >= 0) e.aud.splice(i, 1); }
  /* a 5.1 habit that was paused on migration resumes once it has been confirmed */
  const it = st.plan.find(p => !p.removed && p.hid === f.id && p.mig52 === "confirm");
  if (it && canAdd52(c)) { HM.resumePlan(st, it.pid); delete it.mig52; }
  F.fit52 = null; closeSheet(true); persist(); re();
  toast(canAdd52(c) ? "Saved. You can add it now." : blockedFor52(c).length ? "Saved. It stays out of your suggestions." : "Saved.");
}

/* ---------- sources ---------- */
function sourceRow52(sid, note) {
  const s = C52.src[sid]; if (!s) return "";
  const kind = roleKind52(note?.role || s.role);
  return `<li class="src52 k-${kind}"><span class="sk52">${ROLE_WORD52[kind]}${note?.role ? ` · ${esc(note.role)}` : ""}</span>
    <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(s.title)}</b></a><small>${esc(s.year)} · ${esc(s.publication_type || s.role)}</small>
    ${note ? `<p>${esc(note.summary)}</p>` : `<p>${esc(s.what_it_shows)}</p>`}</li>`;
}
function benefitBlock52(c, b) {
  const notes = Object.fromEntries(c.source_notes.map(n => [n.source_id, n]));
  return `<div class="ben52"><div class="bh52">${evChip52(b)}${b.goals.map(g => `<span class="btag">${esc(GOAL_SHORT[g])}</span>`).join("")}</div>
    <p class="bs52">${esc(b.statement)}</p>
    <dl class="bd52"><div><dt>Studied in</dt><dd>${esc(b.population)}</dd></div><div><dt>Compared with</dt><dd>${esc(b.comparator)}</dd></div><div><dt>Over</dt><dd>${esc(b.timeframe)}</dd></div>${b.effect_detail ? `<div><dt>Detail</dt><dd>${esc(b.effect_detail)}</dd></div>` : ""}</dl>
    <details class="bsrc52"><summary>Sources for this result (${b.source_ids.length})</summary><ul class="srcl52">${b.source_ids.map(id => sourceRow52(id, notes[id])).join("")}</ul></details></div>`;
}

/* ---------- habit detail ---------- */
const habit51final = SCREENS.habit;
SCREENS.habit = p => {
  const h = H(p.id);
  if (h && h.legacy) return legacyHabit52(h, p);
  if (!h || !h.c52) return habit51final(p);
  const c = h.c52; const e = E52(); const inPlan = st.plan.find(x => !x.removed && x.hid === h.id);
  const v = selVariant52(c); const vs = allowedVariants52(c); const bens = visibleBenefits52(c, v); const held = heldBack52(c, v);
  const ok = canAdd52(c); const blocked = blockedFor52(c); const saved = st.saved.includes(h.id);
  const occ = inPlan ? HM.occOn(st, st.today).find(o => o.pid === inPlan.pid && o.status === "due") : null;
  const G = GUIDES[h.id]; const ks = habitMetrics(h); const ws = HM.weekStart(st.today);
  const head = `${backBtn()}${topRight("save", "star", saved ? "Unsave" : "Save", `data-id="${h.id}" aria-pressed="${saved}"`).replace('class="tr"', `class="tr${saved ? " on" : ""}"`)}`;
  const week = inPlan ? `<button type="button" class="hw51" data-act="go" data-r="hprog" data-pid="${inPlan.pid}"><span class="wh51"><b>Your week</b><small>${esc(daysText(inPlan.days))}</small></span><span class="wr51">${HM.range(ws, HM.addDays(ws, 6)).map((d, i) => {
      const o = HM.occOn(st, d).find(x => x.pid === inPlan.pid); const s = o ? occState(o) : "none";
      return `<span class="wd51${d === st.today ? " now" : ""}"><small>${"MTWTFSS"[i]}</small>${s === "done" ? th(HM.art(h), HM.field(h)) : `<span class="dot51${s === "none" || s === "rest" ? " off" : ""}"></span>`}</span>`; }).join("")}</span></button>` : "";
  const sched = vs.length ? `<fieldset class="vs52"><legend>Choose a schedule</legend><p class="fine">Each schedule was studied on its own. Choosing one updates what to do, the time, and the results and sources below.</p>
    ${vs.map(({ v: x, ok: aok }, i) => `<label class="vopt52${x.variant_id === v.variant_id ? " on" : ""}${aok ? "" : " off"}"><input type="radio" name="vs52" data-vs52="${esc(c.card_id)}" value="${esc(x.variant_id)}" ${x.variant_id === v.variant_id ? "checked" : ""} ${aok ? "" : "disabled"}>
      <span><b>Schedule ${i + 1}</b><small>${esc(short52(x.action))}</small>${aok ? "" : `<small class="warn52">Studied only in people with ${esc(AUD_WORDS52[x.audience_filter] || x.audience_filter)}. <button type="button" class="inl" data-act="fit52" data-id="${esc(c.card_id)}">Does this apply to you?</button></small>`}</span></label>`).join("")}</fieldset>` : "";
  const rule = { read_studied_population: "Read who this was studied in before you start.", confirm_eligibility: "Only for some people. Confirm it fits you before adding it.", clinician_clearance: "Needs appropriate guidance from a health professional before you start." }[c.eligibility_rule];
  const fitState = blocked.length ? `<p class="fst52 no">${ico("x")}Not suggested for you: ${esc(blocked.map(blockWord52).join(", "))}.</p>`
    : restricted52(c) ? (ok ? `<p class="fst52 yes">${ico("check")}You confirmed this fits you${c.eligibility_rule === "clinician_clearance" ? " and that you have professional guidance" : ""}.</p>` : `<p class="fst52">Not confirmed yet.</p>`) : "";
  const safety = `<section class="safe52" aria-labelledby="sf-${h.id}"><h3 id="sf-${h.id}">${ico("info")}Before you start</h3><p>${esc(rule)}</p>
    ${c.blocked_if.length ? `<p class="fine">Not suitable with: ${esc(c.blocked_if.map(blockWord52).join("; "))}.</p>` : ""}${fitState}
    ${restricted52(c) || c.blocked_if.length || held.length || vs.some(x => !x.ok) ? `<button type="button" class="btn ghost-btn sm52" data-act="fit52" data-id="${h.id}">${ok && restricted52(c) ? "Review" : "Check that this fits you"}</button>` : ""}
    ${inPlan && inPlan.mig52 === "confirm" ? `<p class="note warn">Moved from version 5.1 and paused until you confirm it still fits you.</p>` : ""}</section>`;
  const resOnly = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope === "research_only");
  const html = `${head}<div class="hero51 ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}${ok ? plusBtn51(h, "big") : ""}</div>
    <div class="hb51 d52"><h2 class="disp">${esc(c.title)}</h2>
    ${!c.goals.length ? `<p class="gen52">Everyday routine · not linked to a goal</p>` : ""}
    <section class="do52"><h3>What to do</h3><p class="how51">${esc(actionOf52(c))}</p></section>
    ${sched}
    <dl class="facts52"><div><dt>${ico("clock")}Time and frequency</dt><dd>${esc(timeOf52(c))}</dd></div>
      <div><dt>${ico("check")}Tracking question</dt><dd>${esc(c.tracking_prompt)}</dd></div>
      <div><dt>${ico("person")}Studied in</dt><dd>${esc(popOf52(c))}</dd></div>
      <div><dt>${ico("info")}Qualifications</dt><dd>${esc(c.qualification)}</dd></div></dl>
    ${safety}
    <div class="meta5 hmeta51">${effortBars(h)}<button type="button" class="link sm" data-act="effort-open">About effort</button></div>
    <div class="row51">${G && ok ? `<button type="button" class="pb51" data-act="guide-open" data-id="${h.id}" data-oid="${esc(occ?.oid || "")}">${ico("play")}Follow along</button>` : ""}<button type="button" class="pb51" data-act="together" data-id="${h.id}">${ico("person")}With someone</button></div>
    ${week}
    <section class="res52"><div class="sh51"><h3>What the research found</h3><p>${esc(c.research_summary)}</p></div>
    ${bens.length ? bens.map(b => benefitBlock52(c, b)).join("") : `<p class="fine">No benefit is shown for this routine on its own. ${resOnly.length ? "The research details below describe what was studied." : ""}</p>`}
    ${held.length ? `<p class="fine">${plural(held.length, "more result")} ${held.length === 1 ? "applies" : "apply"} only to people with ${esc([...new Set(held.map(b => AUD_WORDS52[b.audience_filter] || b.audience_filter))].join(" or "))}. <button type="button" class="inl" data-act="fit52" data-id="${h.id}">Does this apply to you?</button></p>` : ""}
    <button type="button" class="btn ghost-btn" data-act="go" data-r="science" data-id="${h.id}">All research details and sources</button></section>
    ${ks.length ? `<div class="sh51"><h3>What to track</h3><p>${inPlan ? "Lined up with the days you do this habit. Patterns, not proof." : "Add this habit and these line up with the days you do it."}</p></div><div class="mcl51">${ks.map(k => metCard51(k, inPlan, h)).join("")}</div>` : ""}
    ${h.id === SLEEP_HABIT ? `<div class="rel51">${relatedSleepCard()}</div>` : ""}</div>`;
  const dock = occ ? `<button type="button" class="btn" data-act="done" data-oid="${esc(occ.oid)}">Done for today</button>`
    : inPlan ? `<button type="button" class="btn ghost-btn" data-act="sched-edit" data-pid="${inPlan.pid}">Edit schedule</button>`
    : blocked.length ? `<button type="button" class="btn ghost-btn" data-act="fit52" data-id="${h.id}">Not suggested for you · Review</button>`
    : ok ? `<button type="button" class="btn" data-act="quick-add" data-id="${h.id}">${ico("plus")} Add to my habits</button>`
    : `<button type="button" class="btn" data-act="fit52" data-id="${h.id}">Check that this fits you</button>`;
  if (!st.recent.includes(h.id)) { st.recent.unshift(h.id); st.recent = st.recent.slice(0, 12); }
  return { cls: "s-det3 s-hab51 s51 s-d52", html, dock };
};
document.addEventListener("change", e => { const t = e.target; if (!t.dataset?.vs52) return; F.vsel52 = F.vsel52 || {}; F.vsel52[t.dataset.vs52] = t.value; E52().sel[t.dataset.vs52] = t.value; persist(); re(); });

/* ---------- research details: summary, every source with its card-specific note, research-only statements ---------- */
SCREENS.science = SCREENS.research = p => {
  const h = H(p.id); if (!h || !h.c52) return { cls: "s-list", html: `${backBtn()}<div class="top"><h2 class="disp">Research</h2></div><div class="pad"><p>${esc(h?.note || "This habit has no research record in the current library.")}</p></div>` };
  const c = h.c52; const v = selVariant52(c); const resOnly = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope === "research_only");
  const kinds = { direct: [], context: [], mixed: [] }; for (const n of c.source_notes) kinds[roleKind52(n.role)].push(n);
  const grp = (k, t) => kinds[k].length ? `<h4 class="sg52">${t}</h4><ul class="srcl52">${kinds[k].map(n => sourceRow52(n.source_id, n)).join("")}</ul>` : "";
  return { cls: "s-list s-sci52", html: `${backBtn()}<div class="top"><p class="eyebrow">Research details</p><h2 class="disp">${esc(c.title)}</h2></div>
    <div class="pad"><div class="card2 left"><div class="eyebrow">What the evidence says</div><p>${esc(c.research_summary)}</p></div>
    ${v ? `<div class="card2 left"><div class="eyebrow">Selected schedule</div><p>${esc(v.action)}</p><p class="fine">${esc(v.schedule_evidence)} Sources for this schedule: ${v.source_ids.map(id => `<a href="${esc(C52.src[id].url)}" target="_blank" rel="noopener noreferrer">${esc(C52.src[id].year)}</a>`).join(", ")}</p></div>` : ""}
    <div class="sec-h"><h3>Results shown in the app</h3></div>${visibleBenefits52(c, v).map(b => benefitBlock52(c, b)).join("") || `<p class="fine">None for this selection.</p>`}
    ${resOnly.length ? `<div class="sec-h"><h3>Research detail only</h3><p class="fine">Studied, but too uncertain to show as a benefit.</p></div>${resOnly.map(b => `<div class="ben52 ro52"><div class="bh52">${evChip52(b)}</div><p class="bs52">${esc(b.statement)}</p><p class="fine">${esc(b.population)} · ${esc(b.comparator)} · ${esc(b.timeframe)}</p></div>`).join("")}` : ""}
    <div class="sec-h"><h3>Every source for this card (${c.source_notes.length})</h3><p class="fine">Counts are publications, not independent samples. Reviews and the trials they include are not added together.</p></div>
    ${grp("direct", "Direct evidence")}${grp("context", "Broader context")}${grp("mixed", "Mixed or null results")}
    <p class="fine">Catalog release ${esc(C52.release)}. Nothing here is medical advice.</p></div>` };
};
SCREENS.evidence = () => ({ cls: "s-list", html: `${backBtn()}<div class="top"><h2 class="disp">About our evidence</h2></div><div class="pad">
  <p>Every result has its own plain-language label for one specific outcome, in the people who were studied. A routine can have strong evidence for one result and early evidence for another.</p>
  ${EV_LABELS.map(l => `<div class="gline"><span class="evp ${EV_CLS[l]}">${l}</span><p class="fine">${esc(EV_TEXT52[l])}</p></div>`).join("")}
  <div class="card2"><p><b>Sources are labeled by role.</b> Direct evidence tested the routine for that result. Broader context comes from related studies. Mixed or null results are shown too.</p></div>
  <div class="card2"><p><b>Effort is separate.</b> It describes how demanding a routine feels, not how well it works. Routines without an editorial rating say &ldquo;Not rated&rdquo;.</p></div>
  <p class="fine">Catalog release ${esc(C52.release)}: 56 routines, 75 scoped results, 146 publications. A targeted review of the supplied evidence, not medical advice.</p></div>` });

/* ---------- Explore: every routine, search, goal filters, generous vertical cards ---------- */
const XGOALS52 = [["", "All"], ["heart", "Heart health"], ["sleep", "Sleep"], ["mood", "Mood"], ["energy", "Energy"], ["movement", "Strength"], ["metabolic", "Nutrition"], ["digestion", "Digestion"], ["memory", "Memory"], ["_general", "Everyday care"]];
function exploreList52() {
  const E = st.ui.explore; const g = E.q ? "" : (E.goals || [])[0] || ""; const q = (E.q || "").trim().toLowerCase();
  let r = HM.CAT.habits.filter(h => {
    const c = h.c52;
    if (g === "_general") { if (c.goals.length) return false; } else if (g && !c.goals.includes(g)) return false;
    if (q) { const hay = [c.title, c.action, c.tracking_prompt, c.studied_population, ...c.goals.map(goalLabel), ...c.benefit_ids.map(id => C52.ben[id].statement), ...C52.variantsOf(c.card_id).map(v => v.action)].join(" ").toLowerCase();
      if (!q.split(/\s+/).every(w => hay.includes(w))) return false; }
    return true;
  });
  const fit = h => (canAdd52(h.c52) ? 2 : 0) + (!restricted52(h.c52) ? 1 : 0) + ((st.profile.goals || [st.profile.goal]).some(x => x && h.c52.goals.includes(x)) ? 2 : 0) + (shownBenefit52(h.c52, g) ? evRank52(shownBenefit52(h.c52, g)) : 0);
  r.sort((a, b) => fit(b) - fit(a) || a.t.localeCompare(b.t));
  const pers = HM.PERSONAL.filter(p => !g && (!q || p.t.toLowerCase().includes(q)));
  return r.concat(pers);
}
xcard = h => {
  if (!h.c52) return `<article class="xcard xp52"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(h.t)}"></button>
    <div class="xpic ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}</div><div class="xinfo"><h3>${esc(h.t)}</h3><p class="xline">${esc(short52(h.action))}</p>
    <div class="xfacts"><span class="xrow rtime">${ico("clock")}${esc(minsShort(h.mins))}</span><span class="xrow xbadges"><span class="evp e-pers">Personal habit</span></span></div></div></article>`;
  const c = h.c52; const g = st.ui.explore.q ? null : (st.ui.explore.goals || [])[0]; const ok = canAdd52(c);
  const preview = restricted52(c) && !ok; const b = preview ? null : shownBenefit52(c, g && g !== "_general" ? g : null);
  const ev = preview ? `<span class="evp e-targ">For some people · check fit</span>`
    : b ? `${evChip52(b)}<span class="xfor52">for ${esc(midCase(b.statement))}</span>`
    : `<span class="xfor52 trk52">Track: ${esc(c.tracking_prompt)}</span>`;
  const line = preview ? `Studied in: ${short52(c.studied_population)}` : short52(actionOf52(c));
  return `<article class="xcard x52${preview ? " prev52" : ""}"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(h.t)}"></button>
    <div class="xpic ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}${ok ? plusBtn51(h) : ""}</div>
    <div class="xinfo"><h3>${esc(c.title)}</h3><p class="xline">${esc(line)}</p>
    <div class="xfacts"><span class="xrow rtime">${ico("clock")}<span>${esc(short52(timeOf52(c)))}</span></span>
    <span class="xrow xev52">${ev}</span>${EFFORT52[h.id] ? `<span class="xrow">${effortBars(h, "sm")}</span>` : ""}</div></div></article>`;
};
SCREENS.explore = () => {
  const E = st.ui.explore; const g = (E.goals || [])[0] || "";
  const res = exploreList52(); const nCards = res.filter(h => h.c52).length;
  return { cls: "s-exp5 s-exp52", tab: "explore", html: `<div class="top"><h2 class="disp">Explore</h2>
    <div class="search">${ico("search")}<input id="q" type="search" placeholder="Search habits: sleep, walking, stress&hellip;" value="${esc(E.q)}" aria-label="Search habits" autocomplete="off">${E.q ? `<button type="button" data-act="q-clear" aria-label="Clear search">${ico("x")}</button>` : ""}</div></div>
    <div class="xchips" role="radiogroup" aria-label="Filter by goal">${XGOALS52.map(([k, l]) => `<button type="button" class="chip${g === k ? " on" : ""}" role="radio" aria-checked="${g === k}" data-act="xgoal" data-g="${k}">${esc(l)}</button>`).join("")}</div>
    <div class="pad"><p class="xcount" aria-live="polite">${plural(nCards, "routine")}${E.q ? ` matching &ldquo;${esc(E.q)}&rdquo;, across all goals` : g === "_general" ? " not linked to a goal" : g ? ` for ${esc(goalLabel(g).toLowerCase())}` : " in the library"}</p>
    <div class="xlist">${res.length ? res.map(xcard).join("") : `<div class="nothing">${art("reflect", "small")}<p><b>Nothing matches.</b></p><p class="fine">Try another word, or choose All.</p></div>`}</div>
    <div class="xfoot"><button type="button" class="link" data-act="effort-open">How effort is rated</button><button type="button" class="link" data-act="go" data-r="evidence">How we judge the science</button><button type="button" class="link" data-act="go" data-r="pnew">Create a personal habit</button></div></div>`,
    after: () => { const q = $("#q"); if (q && F.focusSearch) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); F.focusSearch = false; } } };
};
exploreResults = exploreList52;

/* ---------- onboarding: the supplied selector, then time and activity preferences ---------- */
function refineHit52(goal, refine, b) { const r = refine && HM.REFINE[goal]?.find(x => x[0] === refine); return r && r[0] !== "general" && r[2].test(b.statement) ? 1 : 0; }
recSet = function (o) {
  const gs = onbGoals(o).length ? onbGoals(o) : HM.CAT.meta.goals.map(g => g.id); const p = o.prefs; const cap = HM.timeCap(p.time);
  const res = recommend52(C52.raw, recOpts52({ goals: gs }));
  const fits = r => { const id = r.card.card_id, ef = EFFORT52[id] || null;
    if (p.ability === "seated" && MOVES52.has(id)) return false;
    if (p.effort === "gentle" && ef && ef >= 4) return false;
    return true; };
  const score = r => { const id = r.card.card_id; const bs = r.benefits.concat(r.variants.flatMap(v => v.benefits)); let s = r.matchedGoals.length * 10 + Math.max(0, ...bs.map(evRank52)) * 2;
    for (const g of r.matchedGoals) s += 3 * Math.max(0, ...bs.filter(b => b.goals.includes(g)).map(b => refineHit52(g, o.refines[g], b)));
    if (p.effort === "more" && MOVES52.has(id)) s += 4; if (p.effort === "some" && EFFORT52[id] === 2) s += 2; if (p.effort === "gentle" && EFFORT52[id] === 1) s += 2;
    if (cap != null && MINS52[id] != null && MINS52[id] <= cap) s += 1; return s; };
  const pool = res.filter(fits).map(r => ({ r, s: score(r) })).sort((a, b) => b.s - a.s || a.r.card.card_id.localeCompare(b.r.card.card_id));
  const target = onbGoals(o).length > 3 ? Math.min(5, onbGoals(o).length) : 3;
  const out = []; let used = 0;
  const take = x => { const id = x.r.card.card_id; const m = MINS52[id]; const over = cap != null && m != null && used + m > cap; if (m != null) used += m;
    out.push({ h: H(id), f: null, g: x.r.matchedGoals[0], over, rec: x.r, mg: x.r.matchedGoals }); };
  /* prefer routines that fit the time left (or have no stated time); if nothing fits, show the best one and say so */
  const free = x => !out.some(y => y.h.id === x.r.card.card_id);
  const fitsLeft = x => cap == null || MINS52[x.r.card.card_id] == null || used + MINS52[x.r.card.card_id] <= cap;
  for (const g of onbGoals(o)) { if (out.length >= target) break; const cand = pool.filter(x => free(x) && x.r.matchedGoals.includes(g)); const x = cand.find(fitsLeft) || cand[0]; if (x) take(x); }
  while (out.length < target) { const cand = pool.filter(free); const x = cand.find(fitsLeft) || cand[0]; if (!x) break; take(x); }
  return out;
};
const unknownMins52 = list => list.filter(x => MINS52[x.h.id] == null);
budgetLine = function (o) {
  const set = o.set || []; const cap = HM.timeCap(o.prefs.time);
  const known = set.reduce((m, x) => m + (MINS52[x.h.id] ?? 0), 0); const unk = unknownMins52(set).length;
  const tail = unk ? ` ${plural(unk, "routine")} ${unk === 1 ? "has" : "have"} no stated daily time.` : "";
  if (cap == null) return `Together about ${known} minutes a day where a time is stated.${tail}`;
  return (known <= cap ? `Known times add up to about ${known} minutes, within your ${tLabel(o.prefs.time).toLowerCase()}.` : `Known times add up to about ${known} minutes, more than your ${tLabel(o.prefs.time).toLowerCase()}. Pick the ones that matter most.`) + tail;
};
recCard = function (o, x, i, n) {
  const h = x.h; const c = h.c52; const pk = o.pick[h.id]; const r = x.rec;
  const bs = r.benefits.concat(r.variants.flatMap(v => v.benefits));
  const why = (x.mg || []).map(g => { const b = bs.filter(b => b.goals.includes(g)).sort((a, b2) => evRank52(b2) - evRank52(a))[0];
    return b ? `<li><b>${esc(GOAL_SHORT[g])}</b> ${esc(b.statement)} ${evChip52(b)}</li>` : ""; }).join("");
  return `<div class="rcard rc52"><div class="rpic ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}</div>
    <div class="rbody"><p class="rpos">${i + 1} of ${n}</p>${(x.mg || []).length ? `<p class="btag">${x.mg.map(g => esc(GOAL_SHORT[g])).join(" · ")}</p>` : ""}
    <h3 class="disp">${esc(c.title)}</h3><p class="rline">${esc(short52(r.variants[0]?.action || c.action))}</p>
    ${why ? `<ul class="why52" aria-label="Why it was picked">${why}</ul>` : ""}
    <div class="rmeta"><span class="rtime">${ico("clock")}${esc(short52(r.variants[0]?.time || c.time_commitment))}</span></div>${effortBars(h)}
    ${MINS52[h.id] == null ? `<p class="fine">No stated daily time, so it isn&rsquo;t counted in your budget.</p>` : ""}
    ${x.over ? `<p class="fine warn">Longer than the time you have left with the others.</p>` : ""}
    <div class="racts">${pk === "add" ? `<button type="button" class="btn added" data-act="rec5-add" data-id="${h.id}" aria-pressed="true">${ico("check")}Added</button>` : `<button type="button" class="btn" data-act="rec5-add" data-id="${h.id}" aria-pressed="false">Add this habit</button>`}
    <button type="button" class="ghost${pk === "later" ? " on" : ""}" data-act="rec5-later" data-id="${h.id}" aria-pressed="${pk === "later"}">Maybe later</button></div>
    <button type="button" class="link" data-act="go" data-r="habit" data-id="${h.id}">Details and sources</button></div></div>`;
};
const chosen51 = SCREENS.chosen;
SCREENS.chosen = p => {
  const v = chosen51(p); const o = F.onb; const picks = chosen(o);
  const known = picks.reduce((m, x) => m + (MINS52[x.h.id] ?? 0), 0); const unk = unknownMins52(picks).length;
  v.html = v.html.replace(/<p class="lede">[\s\S]*?<\/p>/, `<p class="lede">${picks.length ? `${plural(picks.length, "habit")}. Stated times add up to about ${known} minutes on a day when they&rsquo;re all scheduled.${unk ? ` ${plural(unk, "routine")} ${unk === 1 ? "has" : "have"} no stated time.` : ""}` : "Nothing yet. Add at least one to start."}</p>`)
    .replace(/(\d+|null) min</g, (m, n) => n === "null" ? "Time varies<" : m);
  const back = `<div class="ans52"><p class="eyebrow">Your answers · tap to change</p><div class="answered">${o.overall ? `<button type="button" class="pill" data-act="ans-edit" data-s="goals">Overall health</button>` : onbGoals(o).map(g => `<button type="button" class="pill" data-act="ans-edit" data-s="goals">${esc(goalLabel(g))}</button>`).join("")}<button type="button" class="pill" data-act="ans-edit" data-s="time">${esc(o.prefs.time ? TIME_SHORT[o.prefs.time] : "Any time")}</button><button type="button" class="pill" data-act="ans-edit" data-s="effort">${esc(o.prefs.ability === "seated" ? "Seated" : { gentle: "Gentle", some: "A little movement", more: "More effort" }[o.prefs.effort] || "Any activity")}</button></div></div>`;
  v.html = v.html.replace('<div class="pad">', `<div class="pad">${back}`);
  return v;
};
addPick = function (o, id, force) {
  const cap = HM.timeCap(o.prefs.time); const m = MINS52[id];
  const now = chosen(o).reduce((s, x) => s + (MINS52[x.h.id] ?? 0), 0); const after = now + (m ?? 0);
  if (!force && cap != null && m != null && after > cap) {
    const others = chosen(o);
    return sheet("That goes past your time", `<p>With this one, the stated times add up to about <b>${after} minutes</b> on a day when they&rsquo;re all scheduled. You said ${esc(tLabel(o.prefs.time).toLowerCase())}.</p>
      ${others.length ? `<p class="fine">You could swap it for one you&rsquo;ve added:</p>${others.map(x => `<button type="button" class="vrow wide" data-act="rec5-swap" data-id="${id}" data-out="${x.h.id}"><span>Swap for ${esc(x.h.t)}<small>${esc(MINS52[x.h.id] == null ? "Time varies" : minsShort(MINS52[x.h.id]))}</small></span>${ico("chev", "chev")}</button>`).join("")}` : ""}
      <button type="button" class="btn" data-act="rec5-force" data-id="${id}">Add it anyway</button><button type="button" class="btn ghost-btn" data-act="sheet-close">Keep my time</button>`);
  }
  o.pick[id] = "add"; closeSheet(true);
  const i = o.set.findIndex(x => x.h.id === id); if (i === o.ri && o.ri < o.set.length - 1) setTimeout(() => { if (nav.cur.r === "recset") { o.ri = i + 1; re(); } }, 380);
  re();
};

/* ---------- adding: eligibility first, the chosen schedule, credit once ---------- */
const quickAdd51 = A5["quick-add"];
Object.assign(A5, {
  "fit52": el => openFit52(el.dataset.id),
  "fit52-save": () => saveFit52(),
  "ev52": el => openEv52(el.dataset.b),
  "quick-add": el => once(() => {
    const h = H(el.dataset.id); if (!h || st.plan.some(x => !x.removed && x.hid === h.id)) return;
    if (h.c52 && !canAdd52(h.c52)) return openFit52(h.id);
    const s = HM.suggestSchedule(h, st.profile.prefs); const v = h.c52 ? selVariant52(h.c52) : null;
    const item = HM.addPlan(st, h.id, v ? h.v.find(x => x.id === v.variant_id)?.id : null, { ...s, mins: MINS52[h.id] ?? s.mins, start: st.today });
    persist(); re(); addSheet51(item.pid);
  }),
  "sug52-no": el => { const e = E52(); if (!e.dismissed.includes(el.dataset.id)) e.dismissed.push(el.dataset.id); persist(); re(); toast("Okay. We won't suggest it again.", { act: "sug52-undo", label: "Undo", attrs: `data-id="${esc(el.dataset.id)}"` }); },
  "sug52-undo": el => { const e = E52(); e.dismissed = e.dismissed.filter(x => x !== el.dataset.id); persist(); re(); },
  "due52-x": el => { E52().rem[el.dataset.k] = st.today; persist(); re(); },
  "pday52": el => openDay52(el.dataset.d),
  "day52-done": el => once(() => { const o = HM.complete(st, el.dataset.oid); closeSheet(true); persist(); re(); if (o) toast(`Marked done for ${HM.fmtShort(o.date)}.`, { act: "undo", label: "Undo", attrs: `data-oid="${esc(o.oid)}"` }); }),
});

/* ---------- Today: due prompts, the week in faces, done strip, might also like ---------- */
function dueCard52() {
  const os = HM.occOn(st, st.today); const due = os.filter(o => o.status === "due").length; const done = os.filter(o => o.status === "done").length;
  const mood = todayMood51(); const R = E52().rem;
  const rows = [];
  if (os.length) rows.push(due ? (R.log === st.today ? null : `<li class="du52">${ico("bell51")}<span><b>Log today&rsquo;s habits</b><small>${plural(due, "habit")} still to log${done ? ` · ${done} done` : ""}</small></span><button type="button" class="dx52" data-act="due52-x" data-k="log" aria-label="Dismiss the logging reminder for today">${ico("x")}</button></li>`)
    : `<li class="du52 ok52">${ico("check")}<span><b>All logged for today</b><small>${plural(done, "habit")} done</small></span></li>`);
  rows.push(mood ? `<li class="du52 ok52">${ico("check")}<span><b>Checked in</b><small>Feeling ${esc(HM.MOODS[mood.mood - 1].toLowerCase())}</small></span></li>`
    : R.mood === st.today ? null : `<li class="du52">${ico("smile")}<span><b>How are you today?</b><small>One tap. Private to you.</small></span><button type="button" class="mini" data-act="ci-open51">Check in</button><button type="button" class="dx52" data-act="due52-x" data-k="mood" aria-label="Dismiss the check-in prompt for today">${ico("x")}</button></li>`);
  const list = rows.filter(Boolean); if (!list.length) return "";
  return `<section class="due52" aria-label="Due today"><ul>${list.join("")}</ul></section>`;
}
function suggestions52() {
  const gs = st.profile.goals?.length ? st.profile.goals : st.profile.goal ? [st.profile.goal] : [];
  if (!gs.length) return "";
  const res = recommend52(C52.raw, recOpts52({ goals: gs })).slice(0, 3); if (!res.length) return "";
  const pref = st.ui.v5onb?.added || [];
  return `<section class="sec51 sug52"><div class="sh51"><h3>You might also like</h3><p>Picked from the goals you chose. Same eligibility and evidence rules as onboarding.</p></div>${res.map(r => {
    const c = r.card; const h = H(c.card_id); const b = r.benefits.concat(r.variants.flatMap(v => v.benefits)).filter(b => b.goals.some(g => r.matchedGoals.includes(g))).sort((a, b2) => evRank52(b2) - evRank52(a))[0];
    const why = r.matchedGoals.length > 1 ? `Matches your goals: ${r.matchedGoals.map(goalLabel).join(" and ")}` : `Matches your goal: ${goalLabel(r.matchedGoals[0])}`;
    return `<div class="sg52r"><button type="button" class="sgm52" data-act="go" data-r="habit" data-id="${h.id}">${th(HM.art(h), HM.field(h))}<span><b>${esc(c.title)}</b><small>${esc(why)}${b ? `. ${esc(b.statement)} (${esc(b.evidence_label.toLowerCase())})` : ""}</small></span></button>
      <span class="sga52">${plusBtn51(h)}<button type="button" class="mini" data-act="sug52-no" data-id="${h.id}" aria-label="Not for me: ${esc(c.title)}">Not for me</button></span></div>`; }).join("")}</section>`;
}
weekFaces51 = function () {
  const ws = HM.weekStart(st.today);
  const days = HM.range(ws, HM.addDays(ws, 6)).map((d, i) => {
    const os = HM.occOn(st, d).filter(o => o.status !== "removed"); const done = os.filter(o => o.status === "done");
    const rest = os.length && os.every(o => o.status === "rest" || o.status === "paused");
    const missed = d < st.today && os.some(o => o.status === "due");
    const face = done.length ? th(HM.art(H(done[0].hid)), HM.field(H(done[0].hid))) + (done.length > 1 ? `<span class="more51">${done.length}</span>` : "")
      : `<span class="dot51${rest ? " rest" : d > st.today ? " later" : ""}${missed ? " miss52" : ""}"></span>`;
    const lab = `${HM.fmtDate(d)}: ${done.length ? `${plural(done.length, "habit")} done` : ""}${done.length && os.length > done.length ? ", " : ""}${os.length > done.length ? `${os.length - done.length} ${missed ? "not done" : rest ? "rest" : "planned"}` : ""}${!os.length ? "nothing planned" : ""}`;
    return `<button type="button" class="wd51 wdb52${d === st.today ? " now" : ""}" data-act="pday52" data-d="${d}" aria-label="${esc(lab)}"><small aria-hidden="true">${"MTWTFSS"[i]}</small>${face}</button>`;
  }).join("");
  const n = HM.occList(st).filter(o => o.date >= ws && o.date <= HM.addDays(ws, 6) && o.status === "done").length;
  return `<div class="week51 wk52"><button type="button" class="wh51 whb52" data-act="go" data-r="progress"><b>This week</b><small>${n ? `${plural(n, "habit")} done so far` : "A fresh week"}${ico("chev")}</small></button><span class="wr51">${days}</span></div>`;
};
function openDay52(d) {
  const os = HM.occOn(st, d).filter(o => o.status !== "removed");
  sheet(HM.fmtDate(d), os.length ? `<ul class="dl52">${os.map(o => { const h = H(o.hid); const s = occState(o);
    return `<li>${th(HM.art(h), HM.field(h))}<span class="dn52"><b>${esc(h.t)}</b><small>${sym(s)} ${PST[s][0]}</small></span>
      ${s === "done" ? `<button type="button" class="mini" data-act="undo" data-oid="${esc(o.oid)}">Undo</button>` : (s === "missed" || (s === "upcoming" && o.date === st.today)) ? `<button type="button" class="mini" data-act="day52-done" data-oid="${esc(o.oid)}">Mark done</button>` : ""}
      <button type="button" class="mini icon" data-act="go" data-r="habit" data-id="${h.id}" aria-label="Open ${esc(h.t)}">${ico("chev")}</button></li>`; }).join("")}</ul>` : `<p class="fine">Nothing was planned this day.</p>`) ;
}
doneStrip = function (done) {
  if (!done.length) return "";
  return `<div class="donestrip ds52"><span class="soft">Done today</span>${done.map(o => `<button type="button" class="thb" data-act="done-peek" data-oid="${esc(o.oid)}" aria-label="Done today: ${esc(H(o.hid).t)}. Options">${th(HM.art(H(o.hid)), HM.field(H(o.hid)))}<span class="ok" aria-hidden="true">${ico("check")}</span></button>`).join("")}</div>`;
};
openDonePeek = function (oid) {
  const o = st.occ[oid]; if (!o) return; const h = H(o.hid);
  sheet(h.t, `<div class="peek52 ${HM.field(h)}">${art(HM.art(h), "", h.t)}</div><p class="fine">Done ${o.date === st.today ? "today" : HM.fmtShort(o.date)}${o.doneAt ? ` at ${esc(o.doneAt.slice(11, 16))}` : ""}. One point, counted once.</p>${o.reflection ? `<div class="refl"><span class="rl">Reflection · private</span><p>${esc(o.reflection)}</p></div>` : ""}
    <button type="button" class="btn ghost-btn" data-act="undo" data-oid="${esc(oid)}">Undo, it wasn&rsquo;t done</button><button type="button" class="btn ghost-btn" data-act="go" data-r="hprog" data-pid="${o.pid}">See its history</button><button type="button" class="btn ghost-btn" data-act="go" data-r="habit" data-id="${h.id}">Open the habit</button><button type="button" class="btn" data-act="sheet-close">Close</button>`);
};
const today51final = todayView;
todayView = function () {
  const v = today51final(); if (!st.plan.some(p => !p.removed)) return v;
  v.html = v.html.replace(/(<h2 class="(?:tsum|disp rt51)">[\s\S]*?<\/h2>)/, m => m + dueCard52());
  v.html = v.html.replace(/(<section class="sec51"><div class="sh51 row"><div><h3>Your health)/, m => suggestions52() + m);
  if (!v.html.includes("sug52")) v.html = v.html.replace(/(<div class="sec51"><section class="ms51")/, m => suggestions52() + m);
  return v;
};

/* ---------- 48 px circle trial (review page, reachable from Settings) ---------- */
SCREENS.circles52 = () => {
  const K = ["fx-cooking", "kiwi", "walk-after-meals"]; const nm = { "fx-cooking": "Cooking (fixture)", kiwi: "Kiwi", "walk-after-meals": "After-meal walk" };
  const row = (cls, keys, d, label) => `<div class="ct52"><p class="eyebrow">${label}</p><div class="ctr52 ${cls}" style="--d:${d}px">${keys.map(k => `<span class="ctc52"><span class="th" style="--d:${d}px"><span class="bust ${cls === "face" ? "" : "i-" + k} ${cls}-${k}"></span></span><span class="ok52b">${ico("check")}</span><small>${esc(nm[k] || k)}</small></span>`).join("")}</div></div>`;
  return { cls: "s-list s-ct52", html: `${backBtn()}<div class="top"><h2 class="disp">Circle trial</h2><p class="lede">Done today at 44 px (5.1) and 48 px (trial), then the seven-day row at 36 px.</p></div><div class="pad">
    ${row("fit", K, 44, "Whole painting fitted in the circle · 44 px")}${row("face", K, 44, "Centered face crop (the 5.1 approach) · 44 px")}
    ${row("crop", K, 44, "Action crop · 44 px")}${row("crop", K, 48, "Action crop · 48 px (trial)")}
    <div class="ct52"><p class="eyebrow">Several walking and food habits side by side · 48 px</p><div class="ctr52" style="--d:48px">${["walk-after-meals", "brisk-walking", "one-brisk-walk", "walk-for-ideas", "walking-breaks", "beans", "oats", "prunes", "dash", "meal-order"].map(k => `<span class="ctc52"><span class="th" style="--d:48px"><span class="bust i-${k}"></span></span><small>${esc(card52(k).title)}</small></span>`).join("")}</div></div>
    <p class="fine">The live Done today strip uses the 48 px action crop with the check on the outer edge. The weekly row starts at 36 px and narrows on small screens so all seven days fit.</p></div>` };
};
const settings51 = SCREENS.settings;
SCREENS.settings = p => { const v = settings51(p); v.html = v.html.replace(/(<\/div>\s*)$/, `<button type="button" class="link center-block" data-act="go" data-r="circles52">Circle trial (review)</button><p class="fine center">Humanology 5.2 · catalog ${esc(C52.release)}</p>$1`); return v; };

/* ---------- You: observations stay neutral ---------- */
const notice51 = noticeCard51;
noticeCard51 = p => notice51(p).replace("Looks helpful", "Change noticed").replace(/(\w[\w ]*?) looks better on days you do it\./, "$1 was higher on days you did it. An observation, not proof.")
  .replace(/hasn&rsquo;t improved on days you do it\./, "was about the same or lower on days you did it.");

/* ---------- health history: metric, unit, date range, comparison period, gaps; resting heart rate compared only when comparable ---------- */
const hmetric51 = SCREENS.hmetric;
SCREENS.hmetric = p => {
  const v = hmetric51(p); const m = p.m; const n = (F.hv || "week") === "week" ? 7 : 30; const M = HMETRIC[m]; const by = readings(m);
  const cur = HM.range(HM.addDays(st.today, -n), HM.addDays(st.today, -1)); const prev = HM.range(HM.addDays(st.today, -2 * n), HM.addDays(st.today, -n - 1));
  const vals = ds => ds.map(d => by[d]).filter(Boolean).map(r => r.value); const a = vals(cur), b = vals(prev);
  const avg = xs => xs.length ? Math.round(xs.reduce((s, x) => s + x, 0) / xs.length) : null;
  const minN = m === "rhr" ? Math.ceil(n * 0.6) : Math.ceil(n * 0.5);
  let cmp;
  if (a.length < minN || b.length < minN) cmp = `Not compared: ${m === "rhr" ? "resting heart rate is only compared when both periods have readings on most days" : "too few readings in one of the periods"} (${a.length} and ${b.length} of ${n}).`;
  else { const d = avg(a) - avg(b); cmp = `Average ${M.fmt(avg(a))}, compared with ${M.fmt(avg(b))} in the previous ${n} days (${d === 0 ? "the same" : `${d > 0 ? "+" : "−"}${m === "sleep" ? HMETRIC.sleep.fmt(Math.abs(d)) : Math.abs(d) + " " + M.unit}`}). An observation, not a cause.`; }
  const info = `<div class="card2 left rng52"><p><b>${esc(M.label)}</b> · ${esc(M.unit === "h" ? "hours and minutes" : M.unit)}</p><p class="fine">${esc(HM.fmtShort(cur[0]))} – ${esc(HM.fmtShort(cur[cur.length - 1]))}, compared with ${esc(HM.fmtShort(prev[0]))} – ${esc(HM.fmtShort(prev[prev.length - 1]))}.</p><p class="fine">${esc(cmp)}</p><p class="fine">${n - a.length} of ${n} days have no reading and show as gaps.</p></div>`;
  v.html = v.html.replace('<div class="card2"><svg', info + '<div class="card2"><svg');
  return v;
};

/* ---------- rewards: sample categories and a points history that never double-counts ---------- */
const rewards51 = SCREENS.rewards;
SCREENS.rewards = p => { const v = rewards51(p);
  v.html = v.html.replace('<div class="sh51"><h3>Pick a reward</h3>', `<button type="button" class="link center-block" data-act="go" data-r="ledger52">Points history</button><div class="sh51"><h3>Pick a reward</h3>`)
    .replace(/<p>(Choose one\.|Unlocks at [^<]*)<\/p>/, '<p>$1 Sample categories: examples, not confirmed partners.</p>'); return v; };
SCREENS.ledger52 = () => {
  const done = HM.occList(st).filter(o => o.status === "done").sort((a, b) => (b.doneAt || b.date).localeCompare(a.doneAt || a.date)).slice(0, 40);
  return { cls: "s-list", tab: "you", html: `${backBtn()}<div class="top"><h2 class="disp">Points history</h2><span class="sample">Example points</span></div><div class="pad">
    <p class="fine">One point for each finished habit, counted once. Undoing a habit removes its point. These are demo points, not money or real transactions.</p>
    ${done.map(o => `<div class="vrow"><span>${esc(H(o.hid).t)}<small>${esc(HM.fmtDate(o.date))}${o.late ? " · logged later" : ""}</small></span><b>+1</b></div>`).join("") || `<p class="fine">No points yet.</p>`}
    <p class="fine">No gift card has been ordered. Redemption in this prototype is a preview.</p></div>` };
};

/* ---------- earlier-version habits: viewable with their original label, never recommended ---------- */
function ensureLegacy52(id) {
  if (!id || HM.CAT.byId[id] || !LEGACY51[id]) return;
  const L = LEGACY51[id];
  HM.CAT.byId[id] = { id, t: L.t, personal: true, legacy: true, g: [], art: "!legacy", field: "f-cream", mins: L.mins ?? null,
    action: L.a || "Your routine from an earlier version.", note: "This habit came from an earlier version of Humanology. It isn't in the current reviewed library, so it shows no research claims. Your history is kept." };
}
function legacyHabit52(h, p) {
  const inPlan = st.plan.find(x => !x.removed && x.hid === h.id); const occ = inPlan ? HM.occOn(st, st.today).find(o => o.pid === inPlan.pid && o.status === "due") : null;
  return { cls: "s-det3 s-hab51 s51", html: `${backBtn()}<div class="hero51 f-cream"><div class="sun"></div>${art("!legacy", "hero-art", h.t)}</div><div class="hb51 d52"><p class="gen52">Earlier version · not in the reviewed library</p><h2 class="disp">${esc(h.t)}</h2>
    <p class="how51">${esc(h.note)}</p>${inPlan ? `<button type="button" class="btn ghost-btn" data-act="go" data-r="hprog" data-pid="${inPlan.pid}">See its history</button>` : ""}
    <button type="button" class="btn ghost-btn" data-act="tab" data-t="explore">Find a reviewed routine</button></div>`,
    dock: occ ? `<button type="button" class="btn" data-act="done" data-oid="${esc(occ.oid)}">Done for today</button>` : inPlan ? `<button type="button" class="btn ghost-btn" data-act="remove" data-pid="${inPlan.pid}">Remove from my plan</button>` : "" };
}
const tc52b = todayCard51;
todayCard51 = o => { const h = H(o.hid); const s = tc52b(o); return h && h.legacy ? s.replace(PERS_LABEL, "Earlier version · not in the reviewed library") : s; };
const plan52b = SCREENS.plan;
SCREENS.plan = p => { const v = plan52b(p); for (const it of st.plan.filter(x => !x.removed)) { const h = H(it.hid); if (h?.legacy) v.html = v.html.replace(`<b>${esc(h.t)}</b>`, `<b>${esc(h.t)}</b><small class="leg52">Earlier version</small>`); if (it.mig52 === "confirm") v.html = v.html.replace(`<b>${esc(h.t)}</b>`, `<b>${esc(h.t)}</b><small class="leg52">Paused · confirm it fits you</small>`); } return v; };

/* ---------- storage: 5.2 keeps its own key so 5.1 stays usable for comparison; a 5.1 state is migrated once ---------- */
function migrate52(s) {
  const map = id => MIG52[id] || id; const e = s.e52 || (s.e52 = { elig: {}, clear: {}, blocked: [], aud: [], dismissed: [], sel: {}, rem: {} });
  const log = s.mig52 = { at: s.today, from: "5.1", mapped: {}, kept: [] };
  for (const p of s.plan || []) { const n = map(p.hid); if (n !== p.hid) { log.mapped[p.hid] = n; p.from51 = p.hid; p.hid = n; } else if (!C52.card[p.hid] && !/^P|^U|^c-/.test(p.hid)) log.kept.push(p.hid); }
  for (const o of Object.values(s.occ || {})) { const n = map(o.hid); if (n !== o.hid) { o.from51 = o.hid; o.hid = n; } }
  for (const k of ["saved", "recent"]) if (Array.isArray(s[k])) s[k] = [...new Set(s[k].map(map))];
  if (s.ui?.v5onb) for (const k of ["added", "later"]) if (Array.isArray(s.ui.v5onb[k])) s.ui.v5onb[k] = s.ui.v5onb[k].map(map);
  for (const ev of s.events || []) if (ev.hid) ev.hid = map(ev.hid);
  log.kept = [...new Set(log.kept)];
  return s;
}
function afterLoad52(s) {
  for (const p of s.plan || []) {
    ensureLegacy52(p.hid);
    const c = C52.card[p.hid];
    if (c && p.from51 && !p.removed && restricted52(c) && !(s.e52.elig[c.card_id] && (c.eligibility_rule !== "clinician_clearance" || s.e52.clear[c.card_id])) && p.status !== "paused" && !p.mig52) {
      p.mig52 = "confirm"; const keep = st; st = s; HM.pausePlan(s, p.pid); st = keep;
    }
  }
  for (const o of Object.values(s.occ || {})) ensureLegacy52(o.hid);
  return s;
}
loadState = function () {
  try {
    const raw = localStorage.getItem(KEY52); if (raw) { const s = JSON.parse(raw); if (s && s.app === "humanology-v5" && s.schema === 1) { s.e52 = s.e52 || { elig: {}, clear: {}, blocked: [], aud: [], dismissed: [], sel: {}, rem: {} }; return afterLoad52(s); } }
    const old = localStorage.getItem(KEY51); if (old) { const s = JSON.parse(old); if (s && s.app === "humanology-v5" && s.schema === 1) { const m = afterLoad52(migrate52(s)); F.migrated52 = m.mig52; return m; } }
    const v4 = localStorage.getItem("humanology-v4:state"); if (v4) { const s = migrateV4(JSON.parse(v4)); if (s) return afterLoad52(migrate52(s)); }
  } catch (e) { storageOK = false; }
  return null;
};
persist = function () {
  if (REV.storageOff) { storageOK = false; return; }
  try { localStorage.setItem(KEY52, JSON.stringify(st)); storageOK = true; } catch (e) { storageOK = false; }
};
const scen51 = HM.scenario;
HM.scenario = n => { const s = scen51(n); s.e52 = { elig: {}, clear: {}, blocked: [], aud: [], dismissed: [], sel: {}, rem: {} };
  for (const p of s.plan) { const c = C52.card[p.hid]; if (c && restricted52(c)) s.e52.elig[c.card_id] = true; } return s; };

/* ---------- boot hook: art keys, titles, goal tiles, activity cards, guides ---------- */
function apply52() {
  for (const h of HM.CAT.habits) { h.t = h.c52.title; h.full = h.c52.title; const a = ART52.cards[h.id] || {}; h.d.art = h.id; h.d.field = GOAL_FIELD52[h.c52.goals[0]] || "f-cream"; ART_HAVE.add(h.id); ART_NEED_LABEL[h.id] = h.c52.title; }
  Object.keys(ART52.slots).forEach(k => ART_HAVE.add(k));
  Object.assign(GOAL_TILE, { heart: ["goal-heart", "f-peach"], sleep: ["goal-sleep", "f-plum"], mood: ["goal-mood", "f-slate"], energy: ["goal-energy", "f-butter"],
    movement: ["goal-movement", "f-sage"], metabolic: ["goal-metabolic", "f-butter-s"], digestion: ["goal-digestion", "f-sage-s"], memory: ["goal-memory", "f-peach"] });
  ACT5[0][3] = "act-gentle"; ACT5[1][3] = "act-some"; ACT5[2][3] = "act-more"; ACT5[3][3] = "act-seated";
  for (const k of Object.keys(GUIDES)) if (!C52.card[k]) delete GUIDES[k];
  /* any older screen that still reads a grade or placement word now gets catalog wording */
  Object.assign(GRADE_WORD, { A: "Strong evidence", B: "Research supported", C: "Early evidence" });
  Object.assign(HM.GRADE.A, { label: "Strong evidence", meaning: EV_TEXT52["Strong evidence"] }); Object.assign(HM.GRADE.B, { label: "Research supported", meaning: EV_TEXT52["Research supported"] }); Object.assign(HM.GRADE.C, { label: "Early evidence", meaning: EV_TEXT52["Early evidence"] });
  EVID.core_candidate = { w: "Reviewed routine", c: "e-core" };
  if (GUIDES["walk-after-meals"]) GUIDES["walk-after-meals"].steps = ["Finish your meal.", "Walk at a comfortable pace soon after.", "Your chosen schedule on the habit page says how long and how often."];
}

/* short labels under small tiles: the catalog title, never a separate hand-written name */
shortName = h => (h && h.c52 ? h.c52.title : h ? h.t : "");
shortT = shortName;

/* invitation previews name the shown result and its own evidence label */
const label52 = h => { const b = h && h.c52 && shownBenefit52(h.c52, null); return b ? `${b.evidence_label} · ${b.statement}` : "Reviewed routine"; };
for (const r of ["invite", "invitelink"]) { const f = SCREENS[r]; SCREENS[r] = p => { const v = f(p); const iv = r === "invite" ? st.pendingInvite : null;
  const h = iv ? H(iv.hid) : null; if (h && h.c52) v.html = v.html.replace(/Reviewed routine · [^<]*/, esc(label52(h))); return v; }; }
const chLabel51 = chLabel; chLabel = ch => { const h = H(ch.hid); return h && h.c52 ? `<span class="evp ${EV_CLS[shownBenefit52(h.c52)?.evidence_label] || "e-core"}">${esc(shownBenefit52(h.c52)?.evidence_label || "Reviewed routine")}</span>` : chLabel51(ch); };
/* the V3 single-goal refine screen is superseded by the per-goal interest screens; keep the route safe */
SCREENS.refine = () => { if (!F.onb) F.onb = newOnb5(); return SCREENS.goals(); };
