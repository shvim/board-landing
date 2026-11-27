/* ================= Humanology 5.2 visual revision =================
   Paintings first, short browsing cards, science one tap deeper, Nora's five painted faces, mobile layout.
   Claims, scopes, variants, citations and research-only rules are untouched: everything below reads the same
   catalog functions as 5.2 (visibleBenefits52, selVariant52, heldBack52, benefitBlock52, canAdd52). */
"use strict";
const short52r = c => SHORT52[c.card_id] || c.title;
function topics52(c, bens) {
  const bs = bens || visibleBenefits52(c);
  const t = [...new Set(bs.map(b => TOPIC52[b.benefit_id]).filter(Boolean))].slice(0, 2);
  return t.length ? t : NOBEN52[c.card_id] ? [NOBEN52[c.card_id]] : [];
}
const tags52 = ts => ts.length ? `<ul class="tg52" aria-label="Topics">${ts.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
const timeCue52 = id => { const m = MINS52[id]; return m == null ? "" : m === 0 ? "No extra time" : `${m} min`; };
const timeRow52 = id => { const t = timeCue52(id); return t ? `<p class="tm52">${ico("clock")}<span>${esc(t)}</span></p>` : ""; };

/* ---------- Explore: a large painting, a short action title, one or two topics, a time cue when known ---------- */
xcard = h => {
  if (!h.c52) return `<article class="xcard x52r xpers52"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(h.t)}"></button>
    <div class="xp52 ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}</div>
    <div class="xb52"><h3>${esc(h.t)}</h3><ul class="tg52"><li class="pers">Personal habit</li></ul>${timeRow52(h.id) || (h.mins != null ? `<p class="tm52">${ico("clock")}<span>${esc(minsShort(h.mins).replace(" ", " "))}</span></p>` : "")}</div></article>`;
  const c = h.c52; const ok = canAdd52(c); const blocked = blockedFor52(c).length; const preview = restricted52(c) && !ok;
  const inPlan = st.plan.some(p => !p.removed && p.hid === h.id);
  const tags = blocked ? `<ul class="tg52"><li class="warn">Not suggested for you</li></ul>` : preview ? `<ul class="tg52"><li class="fit">Check it fits you first</li></ul>` : tags52(topics52(c));
  return `<article class="xcard x52r${preview ? " prev52" : ""}"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(short52r(c))}${inPlan ? ", in your habits" : ""}"></button>
    <div class="xp52 ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}${ok ? plusBtn51(h) : ""}</div>
    <div class="xb52"><h3>${esc(short52r(c))}</h3>${tags}${timeRow52(h.id)}</div></article>`;
};

/* ---------- onboarding recommendation card ---------- */
recCard = function (o, x, i, n) {
  const h = x.h; const c = h.c52; const pk = o.pick[h.id]; const r = x.rec;
  const bs = r.benefits.concat(r.variants.flatMap(v => v.benefits));
  const ordered = bs.slice().sort((a, b) => ((x.mg || []).some(g => b.goals.includes(g)) - (x.mg || []).some(g => a.goals.includes(g))) || evRank52(b) - evRank52(a));
  return `<div class="rcard rc52r"><div class="rpic ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}</div>
    <div class="rbody"><p class="rpos">${i + 1} of ${n}</p><h3 class="disp">${esc(short52r(c))}</h3>
    ${tags52(topics52(c, ordered))}${timeRow52(h.id)}
    ${x.over ? `<p class="fine warn">Longer than the time you have left.</p>` : ""}
    <div class="racts racts52">${pk === "add" ? `<button type="button" class="btn added" data-act="rec5-add" data-id="${h.id}" aria-pressed="true">${ico("check")}Added</button>` : `<button type="button" class="btn" data-act="rec5-add" data-id="${h.id}" aria-pressed="false">Add this habit</button>`}
    <button type="button" class="ghost${pk === "later" ? " on" : ""}" data-act="rec5-later" data-id="${h.id}" aria-pressed="${pk === "later"}">Maybe later</button></div>
    <button type="button" class="link" data-act="go" data-r="habit" data-id="${h.id}">See how it works</button></div></div>`;
};
budgetLine = function (o) {
  const set = o.set || []; const cap = HM.timeCap(o.prefs.time);
  const known = set.reduce((m, x) => m + (MINS52[x.h.id] ?? 0), 0); const unk = unknownMins52(set).length;
  const base = known ? `About ${known} min a day in total` : "No set time needed";
  const tail = unk ? `${unk === set.length ? "" : ". "}${unk === set.length ? "" : `${unk} without a set time`}` : "";
  const over = cap != null && known > cap ? `. That’s more than your ${tLabel(o.prefs.time).toLowerCase()}, so pick what matters most.` : ".";
  return base + tail + over;
};

/* ---------- habit page: painting, how to try it, schedule, one benefit sentence; the research one tap deeper ---------- */
SCREENS.habit = (habitR51 => p => {
  const h = H(p.id);
  if (!h || !h.c52) return habitR51(p);
  const c = h.c52; const inPlan = st.plan.find(x => !x.removed && x.hid === h.id);
  const v = selVariant52(c); const vs = allowedVariants52(c); const bens = visibleBenefits52(c, v); const held = heldBack52(c, v);
  const ok = canAdd52(c); const blocked = blockedFor52(c); const saved = st.saved.includes(h.id);
  const occ = inPlan ? HM.occOn(st, st.today).find(o => o.pid === inPlan.pid && o.status === "due") : null;
  const G = GUIDES[h.id]; const ks = habitMetrics(h); const ws = HM.weekStart(st.today);
  const lead = shownBenefit52(c, st.profile.goal);
  const head = `${backBtn()}${topRight("save", "star", saved ? "Unsave" : "Save", `data-id="${h.id}" aria-pressed="${saved}"`).replace('class="tr"', `class="tr${saved ? " on" : ""}"`)}`;
  const week = inPlan ? `<button type="button" class="hw51" data-act="go" data-r="hprog" data-pid="${inPlan.pid}"><span class="wh51"><b>Your week</b><small>${esc(daysText(inPlan.days))}</small></span><span class="wr51">${HM.range(ws, HM.addDays(ws, 6)).map((d, i) => {
      const o = HM.occOn(st, d).find(x => x.pid === inPlan.pid); const s = o ? occState(o) : "none";
      return `<span class="wd51${d === st.today ? " now" : ""}"><small>${"MTWTFSS"[i]}</small>${s === "done" ? th(HM.art(h), HM.field(h)) : `<span class="dot51${s === "none" || s === "rest" ? " off" : ""}"></span>`}</span>`; }).join("")}</span></button>` : "";
  const sched = vs.length > 1 ? `<fieldset class="vs52 vs52r"><legend class="sr52">Choose a schedule</legend>${vs.map(({ v: x, ok: aok }, i) => `<label class="vopt52${x.variant_id === v.variant_id ? " on" : ""}${aok ? "" : " off"}"><input type="radio" name="vs52" data-vs52="${esc(c.card_id)}" value="${esc(x.variant_id)}" ${x.variant_id === v.variant_id ? "checked" : ""} ${aok ? "" : "disabled"}>
      <span><b>${esc(x.time)}</b>${aok ? "" : `<small class="warn52">For people with ${esc(AUD_WORDS52[x.audience_filter] || x.audience_filter)}. <button type="button" class="inl" data-act="fit52" data-id="${esc(c.card_id)}">Does this apply to you?</button></small>`}</span></label>`).join("")}</fieldset>` : "";
  const rule = { read_studied_population: "", confirm_eligibility: "Only for some people. Check it fits you before adding it.", clinician_clearance: "Needs guidance from a health professional before you start." }[c.eligibility_rule];
  const fitState = blocked.length ? `<p class="fst52 no">${ico("x")}Not suggested for you: ${esc(blocked.map(blockWord52).join(", "))}.</p>`
    : restricted52(c) ? (ok ? `<p class="fst52 yes">${ico("check")}You confirmed it fits you${c.eligibility_rule === "clinician_clearance" ? " and that you have professional guidance" : ""}.</p>` : "") : "";
  const needFit = restricted52(c) || c.blocked_if.length || held.length || vs.some(x => !x.ok);
  const safety = `<section class="safe52" aria-labelledby="sf-${h.id}"><h3 id="sf-${h.id}">${ico("info")}Before you start</h3>
    ${rule ? `<p><b>${esc(rule)}</b></p>` : ""}<p>${esc(c.qualification)}</p>
    ${c.blocked_if.length ? `<p class="fine">Not suitable with: ${esc(c.blocked_if.map(blockWord52).join("; "))}.</p>` : ""}${fitState}
    ${needFit ? `<button type="button" class="btn ghost-btn sm52" data-act="fit52" data-id="${h.id}">${ok && restricted52(c) ? "Review" : "Check it fits you"}</button>` : ""}
    ${inPlan && inPlan.mig52 === "confirm" ? `<p class="note warn">Moved from version 5.1 and paused until you confirm it still fits you.</p>` : ""}</section>`;
  const resOnly = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope === "research_only");
  const research = `<details class="rs52r" id="rs-${h.id}"><summary><span>What does the research say?</span>${ico("down")}</summary>
    <div class="rsb52"><p class="rsum52">${esc(c.research_summary)}</p>
    <p class="fine">Studied in: ${esc(popOf52(c))}</p>
    ${bens.map(b => benefitBlock52(c, b)).join("")}
    ${held.length ? `<p class="fine">${plural(held.length, "more result")} ${held.length === 1 ? "applies" : "apply"} only to people with ${esc([...new Set(held.map(b => AUD_WORDS52[b.audience_filter] || b.audience_filter))].join(" or "))}. <button type="button" class="inl" data-act="fit52" data-id="${h.id}">Does this apply to you?</button></p>` : ""}
    ${resOnly.length ? resOnly.map(b => `<div class="ben52 ro52"><div class="bh52">${evChip52(b)}<span class="btag">Research detail only</span></div><p class="bs52">${esc(b.statement)}</p></div>`).join("") : ""}
    <button type="button" class="btn ghost-btn" data-act="go" data-r="science" data-id="${h.id}">All ${c.source_notes.length} sources</button></div></details>`;
  const html = `${head}<div class="hero51 hr52 ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}${ok ? plusBtn51(h, "big") : ""}</div>
    <div class="hb51 d52 d52r"><h2 class="disp">${esc(c.title)}</h2>
    ${lead ? `<p class="lead52">${esc(lead.statement)}.</p>` : ""}
    <section class="do52"><h3>How to try it</h3><p>${esc(actionOf52(c))}</p><p class="trk52r"><b>Log it:</b> ${esc(c.tracking_prompt)}</p></section>
    <section class="sc52"><h3>Schedule</h3>${sched || `<p>${esc(timeOf52(c))}</p>`}</section>
    ${safety}
    ${week}
    <div class="row51">${G && ok ? `<button type="button" class="pb51" data-act="guide-open" data-id="${h.id}" data-oid="${esc(occ?.oid || "")}">${ico("play")}Follow along</button>` : ""}<button type="button" class="pb51" data-act="together" data-id="${h.id}">${ico("person")}With someone</button></div>
    ${research}
    ${ks.length ? `<div class="sh51"><h3>What to track</h3><p>${inPlan ? "Lined up with the days you do this habit. Patterns, not proof." : "Add this habit and these line up with the days you do it."}</p></div><div class="mcl51">${ks.map(k => metCard51(k, inPlan, h)).join("")}</div>` : ""}
    ${h.id === SLEEP_HABIT ? `<div class="rel51">${relatedSleepCard()}</div>` : ""}</div>`;
  const dock = occ ? `<button type="button" class="btn" data-act="done" data-oid="${esc(occ.oid)}">Done for today</button>`
    : inPlan ? `<button type="button" class="btn ghost-btn" data-act="sched-edit" data-pid="${inPlan.pid}">Edit schedule</button>`
    : blocked.length ? `<button type="button" class="btn ghost-btn" data-act="fit52" data-id="${h.id}">Not suggested for you · Review</button>`
    : ok ? `<button type="button" class="btn" data-act="quick-add" data-id="${h.id}">${ico("plus")} Add to my habits</button>`
    : `<button type="button" class="btn" data-act="fit52" data-id="${h.id}">Check it fits you</button>`;
  if (!st.recent.includes(h.id)) { st.recent.unshift(h.id); st.recent = st.recent.slice(0, 12); }
  /* keep the research disclosure open across re-renders (a schedule change re-renders the page) */
  return { cls: "s-det3 s-hab51 s51 s-d52 s-d52r", html, dock, after: () => { const d = $(`#rs-${h.id}`); if (!d) return; if (F.rsOpen52 === h.id) d.open = true; d.addEventListener("toggle", () => { F.rsOpen52 = d.open ? h.id : null; }); } };
})(SCREENS.habit);

/* ---------- Today: one reminder with one action; the five-face check-in is the only mood prompt ---------- */
dueCard52 = function () {
  const os = HM.occOn(st, st.today); const due = os.filter(o => o.status === "due").length; const R = E52().rem;
  if (!os.length || R.log === st.today) return "";
  if (!due) return `<section class="due52 rm52r done" role="status">${ico("check")}<span>All logged for today</span></section>`;
  return `<section class="due52 rm52r" aria-label="Reminder">${ico("bell51")}<span><b>${due === 1 ? "1 habit" : `${due} habits`} to log today</b></span>
    <button type="button" class="mini" data-act="log52r">Log now</button><button type="button" class="dx52" data-act="due52-x" data-k="log" aria-label="Hide this reminder for today">${ico("x")}</button></section>`;
};
A5["log52r"] = () => { const d = $("#vp .deck"); if (d) { d.scrollIntoView({ behavior: st.settings.reduce ? "auto" : "smooth", block: "start" }); $("#vp .deck .dcard.cur .btn")?.focus({ preventScroll: true }); } };
/* the check-in row: Nora's five painted expressions, large enough to tell apart, one tap saves, tap another to change */
moodStrip51 = (ms51 => () => ms51().replace('<div class="msr51"', '<div class="msr51 msr52r"'))(moodStrip51);

/* ---------- labels everywhere use the short action title; the habit page keeps the full catalog title ---------- */
shortName = h => (h && h.c52 ? short52r(h.c52) : h ? h.t : "");
shortT = shortName;
const apply52base = apply52;
apply52 = function () { apply52base(); for (const h of HM.CAT.habits) h.t = short52r(h.c52); };

/* "You might also like": the short title, topic tags, and one plain reason tied to a confirmed goal */
suggestions52 = function () {
  const gs = st.profile.goals?.length ? st.profile.goals : st.profile.goal ? [st.profile.goal] : [];
  if (!gs.length) return "";
  const res = recommend52(C52.raw, recOpts52({ goals: gs })).slice(0, 3); if (!res.length) return "";
  return `<section class="sec51 sug52"><div class="sh51"><h3>You might also like</h3><p>Based on the goals you chose.</p></div>${res.map(r => {
    const c = r.card; const h = H(c.card_id); const bs = r.benefits.concat(r.variants.flatMap(v => v.benefits)).filter(b => b.goals.some(g => r.matchedGoals.includes(g)));
    const why = `For your ${r.matchedGoals.map(g => goalLabel(g).toLowerCase()).join(" and ")} goal${r.matchedGoals.length > 1 ? "s" : ""}`;
    return `<div class="sg52r"><button type="button" class="sgm52" data-act="go" data-r="habit" data-id="${h.id}">${th(HM.art(h), HM.field(h))}<span><b>${esc(short52r(c))}</b><small>${esc(why)}</small>${tags52(topics52(c, bs))}</span></button>
      <span class="sga52">${plusBtn51(h)}<button type="button" class="mini" data-act="sug52-no" data-id="${h.id}" aria-label="Not for me: ${esc(short52r(c))}">Not for me</button></span></div>`; }).join("")}</section>`;
};
