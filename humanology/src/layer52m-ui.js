/* ================= Humanology 5.2 revised — exact-outcome matching and card fixes =================
   One matcher for onboarding and dashboard suggestions: recommend52 (catalog eligibility, audience, schedule,
   clearance, active and dismissed) → refinedMatches (the supplied exact-outcome module, embedded verbatim)
   → schedule and time resolution. Cards are built only from the matched benefits and the matched schedule. */
"use strict";
const MATCH_MAP52 = JSON.parse(document.getElementById("refine52").textContent);
const MATCH_ACT52 = JSON.parse(document.getElementById("activity52").textContent);
/*MATCH52-START*/
/*MATCH52-SOURCE*/
/*MATCH52-END*/

/* per-day minutes for each studied schedule, from the variant's own time text; null where it gives none */
const VMINS52 = { "stairs-1": 2, "stairs-2": 10, "walking-breaks-1": 80, "walking-breaks-2": 40, "walking-breaks-3": 30,
  "walk-after-meals-1": 12, "walk-after-meals-2": 30, "neck-strength-1": 2, "neck-strength-2": 12 };
const minsFor52 = (id, vid) => vid ? (VMINS52[vid] ?? null) : C52.variantsOf(id).length ? null : (MINS52[id] ?? null);
/* product metadata fixes noted in the handoff: handgrip is exercise; a home hazard assessment is not a workout */
MOVES52.add("handgrip"); MOVES52.delete("fall-hazards");

/* the profile a matcher call reads: onboarding answers while onboarding, the saved profile on the dashboard */
function matchProfile52(src) {
  if (src) return { goals: onbGoals(src).length ? onbGoals(src).slice() : HM.CAT.meta.goals.map(g => g.id), refines: { ...src.refines }, effort: src.prefs.effort || null, ability: src.prefs.ability || null, time: src.prefs.time };
  const p = st.profile; const goals = p.goals?.length ? p.goals.slice() : p.goal ? [p.goal] : [];
  const refines = { ...(p.refines || {}) }; if (p.goal && p.refine && !refines[p.goal] && goals.includes(p.goal)) refines[p.goal] = p.refine;   // a 5.1 profile kept one refine
  return { goals, refines, effort: p.prefs?.effort || null, ability: p.prefs?.ability === "seated" ? "seated" : null, time: p.prefs?.time };
}
/* the shared matcher. cap = minutes still available (null = no limit) */
function match52(prof, cap = HM.timeCap(prof.time)) {
  const refinements = {}; for (const g of prof.goals) if (prof.refines[g]) refinements[g] = prof.refines[g];
  const res = recommend52(C52.raw, recOpts52({ goals: prof.goals }));
  const ms = refinedMatches(res, { refinements, effort: prof.effort, ability: prof.ability }, MATCH_MAP52, MATCH_ACT52);
  return ms.map(m => {
    const id = m.card.card_id; const vids = Object.keys(m.benefitsByVariant);
    const saved = E52().sel[id];
    const vid = !vids.length ? null : vids.includes(saved) ? saved
      : (cap != null && vids.find(v => VMINS52[v] != null && VMINS52[v] <= cap)) || vids[0];
    const shown = vid ? m.benefits.filter(b => b.display_scope !== "variant").concat(m.benefitsByVariant[vid]) : m.benefits;
    return { ...m, id, vid, shown: [...new Map(shown.map(b => [b.benefit_id, b])).values()], mins: minsFor52(id, vid) };
  });
}
/* keep matcher order while time permits; move known over-budget items after the rest and flag them. Unknown stays unknown. */
function fitTime52(list, cap, limit, goals = []) {
  /* with several goals, the best match for each goal comes first, then the rest in matcher order (no filler) */
  const firsts = goals.map(g => list.find(x => x.matchedGoals.includes(g))).filter(Boolean);
  list = [...new Set(firsts.concat(list))];
  const out = [], over = []; let used = 0;
  for (const x of list) {
    if (cap != null && x.mins != null && used + x.mins > cap) { over.push({ ...x, over: true }); continue; }
    if (x.mins != null) used += x.mins; out.push({ ...x, over: false });
  }
  return out.concat(over).slice(0, limit);
}

/* ---------- the small row under a card: schedule-specific time and one evidence label, bound to the shown outcome ---------- */
function meta52(id, bens, mins, goal) {
  /* lead with the outcome for the active goal, then the stronger evidence; a second topic is shown only when it
     carries the same evidence label, so the one label in the row describes every topic on the card */
  const ordered = bens.filter(b => b.display_scope !== "research_only" && TOPIC52[b.benefit_id])
    .sort((a, b) => ((goal && b.goals.includes(goal)) - (goal && a.goals.includes(goal))) || evRank52(b) - evRank52(a));
  const lead = ordered[0]; const ev = lead ? lead.evidence_label : null;
  const topics = [...new Set(ordered.filter(b => b.evidence_label === ev).map(b => TOPIC52[b.benefit_id]))].slice(0, 2);
  const t = mins == null ? "" : mins === 0 ? "No extra time" : `${mins} min`;
  const tSay = mins == null ? "" : mins === 0 ? "No extra time" : `${mins} minutes a day`;
  if (!t && !ev) return { topics, row: "" };
  const say = [tSay, ev ? `${ev} for ${topics.join(" and ").toLowerCase()}` : ""].filter(Boolean).join(". ");
  return { topics, row: `<p class="mt52" aria-label="${esc(say)}">${t ? `<span class="mtt52">${ico("clock")}${esc(t)}</span>` : ""}${ev ? `<span class="mte52">${t ? `<span class="dot52" aria-hidden="true">·</span>` : ""}${esc(ev)}</span>` : ""}</p>` };
}

/* ---------- onboarding: exact matches only, no filler ---------- */
recSet = function (o) {
  const prof = matchProfile52(o); const cap = HM.timeCap(prof.time);
  const target = onbGoals(o).length > 3 ? Math.min(5, onbGoals(o).length) : 3;
  return fitTime52(match52(prof, cap), cap, target, onbGoals(o)).map(x => ({ ...x, h: H(x.id), f: null, g: x.matchedGoals[0], mg: x.matchedGoals }));
};
recCard = function (o, x, i, n) {
  const h = x.h; const c = h.c52; const pk = o.pick[h.id]; const m = meta52(h.id, x.shown, x.mins, x.mg[0]);
  const goalsSaid = x.mg.map(g => goalLabel(g)).join(" · ");
  return `<div class="rcard rc52r"><div class="rpic ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}</div>
    <div class="rbody"><p class="rpos">${i + 1} of ${n}<span class="rg52"> · ${esc(goalsSaid)}</span></p><h3 class="disp">${esc(short52r(c))}</h3>
    ${tags52(m.topics)}${m.row}${x.mins == null ? `<p class="fine">Time not stated, so it isn&rsquo;t counted in your daily total.</p>` : ""}
    ${x.over ? `<p class="fine warn">Over your ${esc(tLabel(o.prefs.time).toLowerCase())} with the ones above.</p>` : ""}
    <div class="racts racts52">${pk === "add" ? `<button type="button" class="btn added" data-act="rec5-add" data-id="${h.id}" aria-pressed="true">${ico("check")}Added</button>` : `<button type="button" class="btn" data-act="rec5-add" data-id="${h.id}" aria-pressed="false">Add this habit</button>`}
    <button type="button" class="ghost${pk === "later" ? " on" : ""}" data-act="rec5-later" data-id="${h.id}" aria-pressed="${pk === "later"}">Maybe later</button></div>
    <button type="button" class="link" data-act="go" data-r="habit" data-id="${h.id}">See how it works</button></div></div>`;
};
const xMins52 = x => x.mins !== undefined ? x.mins : (MINS52[x.h.id] ?? null);
budgetLine = function (o) {
  const set = o.set || []; const cap = HM.timeCap(o.prefs.time);
  const known = set.filter(x => xMins52(x) != null).reduce((m, x) => m + xMins52(x), 0); const unk = set.filter(x => xMins52(x) == null).length;
  const parts = [known ? `About ${known} min a day for the ones with a set time` : unk === set.length ? "None of these has a set time" : "No extra time needed"];
  if (unk && unk < set.length) parts.push(`${unk} without a set time`);
  return parts.join(", ") + (cap != null && known > cap ? `. That’s more than your ${tLabel(o.prefs.time).toLowerCase()}, so pick what matters most.` : ".");
};
addPick = function (o, id, force) {
  const cap = HM.timeCap(o.prefs.time); const x = (o.set || []).find(y => y.h.id === id); const m = x ? xMins52(x) : null;
  const now = chosen(o).reduce((s, y) => s + (xMins52(y) ?? 0), 0); const after = now + (m ?? 0);
  if (!force && cap != null && m != null && after > cap) {
    return sheet("That goes past your time", `<p>With this one, the set times add up to about <b>${after} minutes</b> a day. You said ${esc(tLabel(o.prefs.time).toLowerCase())}.</p>
      ${chosen(o).map(y => `<button type="button" class="vrow wide" data-act="rec5-swap" data-id="${id}" data-out="${y.h.id}"><span>Swap for ${esc(short52r(y.h.c52))}<small>${esc(xMins52(y) == null ? "Time not stated" : `${xMins52(y)} min`)}</small></span>${ico("chev", "chev")}</button>`).join("")}
      <button type="button" class="btn" data-act="rec5-force" data-id="${id}">Add it anyway</button><button type="button" class="btn ghost-btn" data-act="sheet-close">Keep my time</button>`);
  }
  o.pick[id] = "add"; if (x?.vid) E52().sel[id] = x.vid; closeSheet(true);
  const i = o.set.findIndex(y => y.h.id === id); if (i === o.ri && o.ri < o.set.length - 1) setTimeout(() => { if (nav.cur.r === "recset") { o.ri = i + 1; re(); } }, 380);
  re();
};
/* the honest empty result, with controls to broaden the goal or change activity */
const recset52m = SCREENS.recset;
SCREENS.recset = p => {
  const o = F.onb; if (!o.set) { o.set = recSet(o); o.ri = 0; }
  if (o.set.length) return recset52m(p);
  const gs = onbGoals(o); const narrowed = gs.filter(g => o.refines[g] && o.refines[g] !== "general");
  const what = narrowed.map(g => `${HM.refineLabel(g, o.refines[g]).toLowerCase()}`).join(" or ");
  const act = o.prefs.ability === "seated" ? "staying seated" : { gentle: "keeping it gentle", some: "a little movement", more: "more effort" }[o.prefs.effort] || "";
  return { cls: "s-onb4 s-rec5 s-none52", html: `${backBtn()}<div class="top">${onbDots5("recset")}<h2 class="disp">No exact match yet</h2>
    <p class="lede">${narrowed.length ? `The reviewed library has no routine with a published result for ${esc(what)}` : "No reviewed routine matches all of your answers"}${act ? ` that suits ${esc(act)}` : ""}. We won&rsquo;t pick something that doesn&rsquo;t fit.</p></div>
    <div class="form">${narrowed.length ? `<button type="button" class="btn" data-act="m52-broaden">Show all ${esc(narrowed.map(g => goalLabel(g).toLowerCase()).join(" and "))} habits</button>` : ""}
    ${act ? `<button type="button" class="btn ghost-btn" data-act="ans-edit" data-s="effort">Change activity</button>` : ""}
    ${HM.timeCap(o.prefs.time) != null ? `<button type="button" class="btn ghost-btn" data-act="rec5-more-time">Allow more time</button>` : ""}
    <button type="button" class="ghost" data-act="explore-more51">Browse Explore</button></div>` };
};
A5["m52-broaden"] = () => { const o = F.onb; for (const g of onbGoals(o)) delete o.refines[g]; o.set = null; re(); };
/* saving onboarding: the chosen schedule and its minutes go into the plan; an explicit movement answer replaces "seated" */
const startPlan52m = startPlan;
startPlan = function (o) {
  const picks = chosen(o); for (const x of picks) if (x.vid) E52().sel[x.h.id] = x.vid;
  const ability = o.prefs.ability || null, effort = o.prefs.effort || null; const n0 = st.plan.length;
  startPlan52m(o);
  st.profile.prefs.ability = ability; st.profile.prefs.effort = effort;
  for (const it of st.plan.slice(n0)) { const x = picks.find(y => y.h.id === it.hid); if (!x) continue;
    if (x.vid) it.vid = x.vid; if (x.mins != null) { it.mins = x.mins; it.edits[0].mins = x.mins; for (const oc of Object.values(st.occ)) if (oc.pid === it.pid && oc.status === "due") oc.mins = x.mins; } }
  persist();
};

/* ---------- dashboard suggestions: the same matcher with the saved profile ---------- */
suggestions52 = function () {
  const prof = matchProfile52(null); if (!prof.goals.length) return "";
  const res = fitTime52(match52(prof), HM.timeCap(prof.time), 3, prof.goals);
  if (!res.length) return `<section class="sec51 sug52"><div class="sh51"><h3>You might also like</h3><p>No more exact matches for your goals right now.</p></div><button type="button" class="link51" data-act="find-habit">Browse Explore</button></section>`;
  return `<section class="sec51 sug52"><div class="sh51"><h3>You might also like</h3><p>Matched to the goals you chose.</p></div><ul class="sgl52">${res.map(x => {
    const c = card52(x.id); const h = H(x.id); const m = meta52(x.id, x.shown, x.mins, x.matchedGoals[0]); const why = `For your ${x.matchedGoals.map(g => goalLabel(g).toLowerCase()).join(" and ")} goal${x.matchedGoals.length > 1 ? "s" : ""}`;
    return `<li class="sgc52"><button type="button" class="sgb52" data-act="go" data-r="habit" data-id="${h.id}">${th(HM.art(h), HM.field(h))}<span class="sgt52"><b>${esc(short52r(c))}</b><small>${esc(why)}</small>${tags52(m.topics)}${m.row}</span></button>
      <div class="sgr52"><button type="button" class="sgadd52" data-act="quick-add" data-id="${h.id}" aria-label="Add ${esc(short52r(c))} to my habits">${ico("plus")}Add</button>
      <button type="button" class="sgno52" data-act="sug52-no" data-id="${h.id}" aria-label="Not for me: ${esc(short52r(c))}">Not for me</button></div></li>`; }).join("")}</ul></section>`;
};
/* quick-add from a suggestion keeps the matched schedule and its minutes */
const quickAdd52m = A5["quick-add"];
A5["quick-add"] = el => { const id = el.dataset.id; const prof = matchProfile52(null);
  const x = prof.goals.length ? match52(prof).find(y => y.id === id) : null; if (x?.vid && !E52().sel[id]) E52().sel[id] = x.vid;
  const n0 = st.plan.length; quickAdd52m(el); const it = st.plan[n0];
  if (it && it.hid === id) { const mins = minsFor52(id, E52().sel[id] || null); if (mins != null) { it.mins = mins; for (const oc of Object.values(st.occ)) if (oc.pid === it.pid && oc.status === "due") oc.mins = mins; } persist(); } };

/* ---------- Explore: broad browsing, plus the quiet time · evidence row ---------- */
xcard = (xc => h => {
  if (!h.c52) return xc(h);
  const c = h.c52; const ok = canAdd52(c); const blocked = blockedFor52(c).length; const preview = restricted52(c) && !ok;
  const v = selVariant52(c); const bens = visibleBenefits52(c, v);
  const inPlan = st.plan.some(p => !p.removed && p.hid === h.id);
  const gf = (st.ui.explore.goals || [])[0]; const m = meta52(h.id, preview || blocked ? [] : bens, minsFor52(h.id, v ? v.variant_id : null), gf && gf !== '_general' ? gf : null);
  const tags = blocked ? `<ul class="tg52"><li class="warn">Not suggested for you</li></ul>` : preview ? `<ul class="tg52"><li class="fit">Check it fits you first</li></ul>` : tags52(m.topics.length ? m.topics : topics52(c));
  return `<article class="xcard x52r${preview ? " prev52" : ""}"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(short52r(c))}${inPlan ? ", in your habits" : ""}"></button>
    <div class="xp52 ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}${ok ? plusBtn51(h) : ""}</div>
    <div class="xb52"><h3>${esc(short52r(c))}</h3>${tags}${m.row}</div></article>`;
})(xcard);

/* when the time · evidence row wraps, drop the separator instead of leaving it at a line start */
function dots52() { for (const r of document.querySelectorAll("#vp .mt52")) { const a = r.querySelector(".mtt52"), e = r.querySelector(".mte52"); if (a && e) r.classList.toggle("wrap52", e.offsetTop > a.offsetTop + 2); } }
render = (r0 => function (k) { r0(k); requestAnimationFrame(dots52); })(render);
addEventListener("resize", () => requestAnimationFrame(dots52));
