/* ================= Humanology 5.2 revised 4 — start rules, a designed habit page, discovery =================
   Start rules come from matching/policy.json (embedded as #policy52): intended (audience pill), precaution (shown
   once), question (asked at Add when the answer changes whether to start), guidance (professional guidance with
   its reason). Who was studied stays in the catalog and appears only in the research disclosure. */
"use strict";
const POL52 = JSON.parse(document.getElementById("policy52").textContent);
const pol52 = id => POL52[id] || {};

/* ---------- editorial fields for the new cards ---------- */
Object.assign(SHORT52, { "slow-breathing": "Practice slow breathing", humming: "Hum on the out-breath", "acupuncture-migraine": "Try acupuncture for migraine",
  "weighted-blanket": "Sleep under a weighted blanket", "stair-walk-energy": "Walk the stairs for energy", "drawing-memory": "Draw it to remember",
  "toilet-footstool": "Raise your feet on the toilet", "abdominal-massage": "Belly massage for constipation" });
Object.assign(TOPIC52, { "slow-breathing-1": "Blood pressure", "acupuncture-migraine-1": "Migraine days", "weighted-blanket-1": "Insomnia",
  "stair-walk-energy-1": "Energy", "drawing-memory-1": "Memory", "toilet-footstool-1": "Easier bowel movements", "abdominal-massage-1": "Regularity" });
Object.assign(MINS52, { "slow-breathing": 15, "weighted-blanket": 0, "stair-walk-energy": 10, "toilet-footstool": 0, "abdominal-massage": 10 });
Object.assign(TRK52, {
  calm: { label: "How calm you feel", obs: ["Tense", "A bit tense", "Okay", "Calm", "Very calm"], ask: "How calm do you feel afterward?" },
  migraine: { label: "Migraine days", icon: "chart", num: true, units: [["days", 0, 31]], step: "1", ask: "Migraine days in the last 30 days" },
});
Object.assign(TRACK52, { "slow-breathing": "bp", humming: "calm", "acupuncture-migraine": "migraine", "weighted-blanket": "sleepq", "stair-walk-energy": "energy",
  "toilet-footstool": "regularity", "abdominal-massage": "regularity" });
/* everyday names people search for */
const ALIAS52 = { "cyclic-sighing": "breathing breathwork breath sigh sighing calm stress anxiety", "slow-breathing": "breathing breathwork breath slow resonance blood pressure calm",
  humming: "hum humming breathing breathwork vagal calm bhramari", "acupuncture-migraine": "acupuncture needles headache migraine", "walk-for-ideas": "creativity ideas brainstorm thinking",
  "bedtime-list": "to-do todo list worry bedtime planning", "drawing-memory": "draw sketch doodle memorize study learning", "stair-walk-energy": "stairs energy tired caffeine pick-me-up",
  "weighted-blanket": "weighted blanket insomnia anxiety", "toilet-footstool": "squat squatty stool poop toilet constipation", "abdominal-massage": "massage belly tummy constipation",
  "cold-shower": "cold plunge cold water shower", "optimism": "visualize visualization future", "smell-training": "smell nose anosmia covid", "music": "music bedtime sleep",
  "three-good-things": "gratitude journal", "mindfulness": "meditation app", "left-side": "reflux heartburn gerd sleep position", "nap": "nap siesta", "psyllium": "fiber fibre metamucil" };
const SHELF52 = ["cyclic-sighing", "walk-for-ideas", "bedtime-list", "drawing-memory", "humming", "stair-walk-energy", "weighted-blanket", "slow-breathing", "acupuncture-migraine", "toilet-footstool", "optimism", "cold-shower"];
/* practical how-to, written once with the dose and timing; cards with schedule variants use the variant's own action */
const HOWTO52 = {
  "cyclic-sighing": "For five minutes a day, breathe in through your nose, add a short second breath in, then breathe out slowly through your mouth.",
  almonds: "Eat a handful of almonds a day in place of another snack, for at least four weeks.",
  "resistance-sarcopenia": "Do resistance exercises twice a week, for example with bands or light weights. The studied programs ran 12 weeks.",
  "cold-shower": "Finish your usual shower with 30 seconds of cold water, every day for 30 days.",
  kiwi: "Eat two green kiwifruit a day for four weeks.", beans: "Add a cup of canned beans to your meals each day for four weeks.",
  "salt-swap": "Use a potassium-enriched salt substitute instead of regular salt, at the table and in cooking.",
  "screen-cap": "Set your phone to cap screen time at two hours a day, for three weeks.",
  "standing-stockings": "Wear fitted graduated compression stockings during your standing shifts.",
  "flight-stockings": "Wear fitted below-knee compression stockings on flights longer than about five hours.",
  "bedtime-phone": "Put your phone away for the last 30 minutes before bed, every night for four weeks.",
  apples: "Eat two whole apples a day for eight weeks.", volunteer: "Join a structured volunteering session, such as an activity with nursing-home residents.",
  jumps: "Do 10 maximal jumps, on three non-consecutive days a week. The studied program ran six months.",
  psyllium: "Take psyllium as the label directs, mixed into a full glass of water. Cholesterol trials used about 10 g a day.",
  "water-premeal": "Drink 500 mL of water before each main meal, alongside a reduced-calorie plan.",
  "left-side": "Sleep on your left side. In the trial a device nudged people off their right side; choosing it yourself is less tested.",
  "smell-training": "Gently smell four familiar scents, twice a day, for 12 weeks.", prunes: "Eat about 50 g of prunes twice a day for three weeks.",
  cystitis: "Drink an extra 1.5 L of water a day on top of what you usually drink, for a year.",
  "one-brisk-walk": "Take one ten-minute walk at a brisk pace of your choosing.", nap: "After lunch, allow 15 minutes to nap, then time to wake up fully.",
  "pelvic-floor": "Follow a supervised program: at least eight squeezes, three times a day, for at least three months.",
  handgrip: "Squeeze a handgrip at about 30% of your maximum: four 2-minute holds with 3-minute rests, three days a week for at least eight weeks.",
  "tai-chi": "Join an instructor-led tai chi class designed for fall prevention, two or three times a week.",
  "sleep-extension": "Plan enough time in bed for about 8.5 hours of sleep a night, for two weeks.",
  caffeine: "Have your last caffeinated drink earlier in the day. How early depends on the dose and your bedtime.",
  sunscreen: "Use broad-spectrum sunscreen every day, as the label directs, and reapply when it says to.",
  hummus: "Have a small hummus snack, such as hummus with pretzels, about three hours after lunch.",
  "relax-muscles": "Tense and then relax each muscle group in turn, from your feet up. Sessions in the studies lasted about 30 minutes.",
  "brisk-walking": "Build up to a 30-minute brisk walk on five days a week.",
  oats: "Eat oat foods that list beta-glucan on the label, adding up to about 3 g a day.",
  dash: "Build meals around vegetables, fruit, whole grains and low-fat dairy, with less saturated fat and salt.",
  retrieval: "After learning something, test yourself without looking, then check. Repeat a few days or weeks later.",
  "work-breaks": "Add four five-minute breaks across your shift, on top of your usual breaks.",
  "fall-hazards": "Ask a trained assessor to check your home for fall hazards, then make the changes they recommend.",
};

/* ---------- evidence wording for the specific outcome ---------- */
const SMALL52 = /small|one trial|one study|crossover|pilot/i;
function evDesc52(b) {
  if (!b) return "";
  if (b.evidence_label !== "Early evidence") return b.evidence_label;
  const primary = b.source_ids.length === 1 && /primary/i.test(C52.src[b.source_ids[0]]?.publication_type || "");
  if (!primary) return "Early research";
  const c = C52.card[b.card_id];
  return SMALL52.test(`${b.statement} ${c.research_summary} ${c.qualification}`) ? "One small study" : "One study";
}
evChip52 = b => !b ? "" : `<button type="button" class="evp evb ${EV_CLS[b.evidence_label] || ""}" data-act="ev52" data-b="${esc(b.benefit_id)}" aria-label="${esc(evDesc52(b))} for ${esc((TOPIC52[b.benefit_id] || "this result").toLowerCase())}. What this means">${esc(evDesc52(b))}${ico("info")}</button>`;
openEv52 = (o => bid => { o(bid); const t = $("#sh-t"); const b = C52.ben[bid]; if (t && b) t.textContent = evDesc52(b); })(openEv52);

/* ---------- start rules on every route to Add ---------- */
const qKeys52 = c => [...new Set([...(pol52(c.card_id).question?.keys || []), ...c.blocked_if])];
restricted52 = c => !!(pol52(c.card_id).question || pol52(c.card_id).guidance);
blockedFor52 = c => { const e = E52(); if ((e.q52 || {})[c.card_id] === "yes") return qKeys52(c); return c.blocked_if.filter(k => e.blocked.includes(k)); };
canAdd52 = c => {
  if (!c) return true; const p = pol52(c.card_id); const e = E52();
  if (blockedFor52(c).length) return false;
  if (p.question && (e.q52 || {})[c.card_id] !== "no") return false;
  if (p.guidance && !e.clear[c.card_id]) return false;
  return true;
};
/* the catalog selector needs explicit eligibility for its restricted cards; give it exactly the cards the rules allow */
recOpts52 = function (extra = {}) {
  const e = E52(); const ok = C52.raw.cards.filter(c => canAdd52(c)).map(c => c.card_id);
  return { goals: [], audience: e.aud.slice(), blocked: e.blocked.slice(), eligibleCards: ok, clearedCards: ok,
    activeCards: st.plan.filter(p => !p.removed).map(p => p.hid), dismissed: e.dismissed.slice(), selectedVariants: { ...e.sel }, ...extra };
};
function audsOf52(id) { const c = C52.card[id]; return [...new Set(c.benefit_ids.map(b => C52.ben[b].audience_filter).concat(C52.variantsOf(id).map(v => v.audience_filter)).filter(Boolean))]; }
/* one sheet: the specific question, the guidance reason, and any result that applies only to a group */
function openStart52(id, { add = false, aud = false } = {}) {
  const c = C52.card[id]; const p = pol52(id); const e = E52(); e.q52 = e.q52 || {};
  const ans = e.q52[id]; const auds = aud || (!pol52(id).question && !pol52(id).guidance) ? audsOf52(id) : []; F.start52 = { id, add, aud };
  const q = p.question ? (ans === "yes"
    ? `<div class="sq52 no"><p><b>${esc(p.question.ask)}</b></p><p>You answered yes. ${esc(p.question.yes)}</p><button type="button" class="link" data-act="st52-ans" data-v="no">My answer is no</button></div>`
    : `<div class="sq52"><p class="sqa52"><b>${esc(p.question.ask)}</b></p><div class="sqb52"><button type="button" class="btn ghost-btn" data-act="st52-ans" data-v="yes">Yes</button><button type="button" class="btn" data-act="st52-ans" data-v="no">No</button></div></div>`) : "";
  const g = p.guidance ? `<div class="sg52"><p><b>Needs professional guidance.</b> ${esc(p.guidance)}</p><label class="tog"><input type="checkbox" data-st52="clear" ${e.clear[id] ? "checked" : ""}><span>I’ll do this with that guidance</span></label></div>` : "";
  const a = auds.length ? `<div class="sa52"><p>Some results apply only to people with ${esc(auds.map(x => AUD_WORDS52[x] || x).join(" or "))}.</p>${auds.map(x => `<label class="tog"><input type="checkbox" data-st52="aud" value="${esc(x)}" ${e.aud.includes(x) ? "checked" : ""}><span>I have ${esc(AUD_WORDS52[x] || x)}</span></label>`).join("")}</div>` : "";
  sheet(short52r(c), `<div class="st52">${q}${g}${a}
    ${p.guidance && !(p.question && ans !== "no") ? `<button type="button" class="btn" data-act="st52-go">${add ? "Add habit" : "Save"}</button>` : ""}
    ${!p.question && !p.guidance ? `<button type="button" class="btn" data-act="st52-go">Save</button>` : ""}
    <button type="button" class="btn ghost-btn" data-act="sheet-close">Cancel</button><p class="fine">${ico("lock")} Your answers stay on this device.</p></div>`);
}
document.addEventListener("change", e => { const t = e.target; const k = t.dataset?.st52; if (!k || !F.start52) return; const E = E52();
  if (k === "clear") E.clear[F.start52.id] = t.checked;
  if (k === "aud") { const i = E.aud.indexOf(t.value); if (t.checked && i < 0) E.aud.push(t.value); if (!t.checked && i >= 0) E.aud.splice(i, 1); }
  persist(); });
function afterStart52() {
  const { id, add } = F.start52 || {}; const c = C52.card[id]; if (!c) return;
  /* a 5.1 habit paused on migration resumes once its rule is satisfied */
  const it = st.plan.find(p => !p.removed && p.hid === id && p.mig52 === "confirm"); if (it && canAdd52(c)) { HM.resumePlan(st, it.pid); delete it.mig52; }
  closeSheet(true); persist();
  if (add && canAdd52(c) && !st.plan.some(p => !p.removed && p.hid === id)) { busy = false; A5["quick-add"]({ dataset: { id } }); }
  else re();
}
Object.assign(A5, {
  "st52-ans": el => { const { id } = F.start52; const c = C52.card[id]; const E = E52(); E.q52 = E.q52 || {}; E.q52[id] = el.dataset.v;
    const keys = qKeys52(c);
    if (el.dataset.v === "yes") { for (const k of keys) if (!E.blocked.includes(k)) E.blocked.push(k); persist(); openStart52(id, F.start52); re(); setTimeout(() => openStart52(id, F.start52), 0); return; }
    E.blocked = E.blocked.filter(k => !keys.includes(k) || C52.raw.cards.some(o => o.card_id !== id && (E.q52[o.card_id] === "yes") && qKeys52(o).includes(k)));
    persist();
    if (pol52(id).guidance && !E.clear[id]) return openStart52(id, F.start52);
    afterStart52(); },
  "st52-go": () => afterStart52(),
  "fit52": el => openStart52(el.dataset.id, { add: false, aud: true }),
});
A5["quick-add"] = (qa => el => { const c = C52.card[el.dataset.id]; if (c && !canAdd52(c)) return openStart52(c.card_id, { add: true }); qa(el); })(A5["quick-add"]);
/* plans paused only by the retired generic check resume on load; plans with a real unanswered rule stay paused */
const loadState52f = loadState;
loadState = function () { const s = loadState52f(); if (!s) return s; const keep = st; st = s;
  for (const p of s.plan || []) if (p.mig52 === "confirm" && !p.removed && C52.card[p.hid] && canAdd52(C52.card[p.hid])) { HM.resumePlan(s, p.pid); delete p.mig52; }
  st = keep; return s; };

/* ---------- Explore: discovery shelf, aliases, image-led cards with one quiet evidence cue ---------- */
exploreList52 = function () {
  const E = st.ui.explore; const g = E.q ? "" : (E.goals || [])[0] || ""; const q = (E.q || "").trim().toLowerCase();
  let r = HM.CAT.habits.filter(h => { const c = h.c52;
    if (g === "_general") { if (c.goals.length) return false; } else if (g && !c.goals.includes(g)) return false;
    if (q) { const hay = [c.title, SHORT52[c.card_id] || "", ALIAS52[c.card_id] || "", c.action, ...c.goals.map(goalLabel), ...c.benefit_ids.map(id => C52.ben[id].statement + " " + (TOPIC52[id] || "")), ...C52.variantsOf(c.card_id).map(v => v.action)].join(" ").toLowerCase();
      if (!q.split(/\s+/).every(w => hay.includes(w))) return false; }
    return true; });
  const fit = h => (canAdd52(h.c52) ? 2 : 0) + ((st.profile.goals || [st.profile.goal]).some(x => x && h.c52.goals.includes(x)) ? 2 : 0) + (shownBenefit52(h.c52, g) ? evRank52(shownBenefit52(h.c52, g)) : 0);
  r.sort((a, b) => fit(b) - fit(a) || a.t.localeCompare(b.t));
  return r.concat(HM.PERSONAL.filter(p => !g && (!q || p.t.toLowerCase().includes(q))));
};
exploreResults = exploreList52;
xcard = (xc => h => {
  if (!h.c52) return xc(h);
  const c = h.c52; const blocked = blockedFor52(c).length; const v = selVariant52(c); const bens = visibleBenefits52(c, v);
  const inPlan = st.plan.some(p => !p.removed && p.hid === h.id); const gf = (st.ui.explore.goals || [])[0];
  const m = meta52(h.id, blocked ? [] : bens, minsFor52(h.id, v ? v.variant_id : null), gf && gf !== "_general" ? gf : null);
  const tags = blocked ? `<ul class="tg52"><li class="warn">Not suggested for you</li></ul>` : m.topics.length ? tags52(m.topics) : h.id === "humming" ? `<ul class="tg52"><li class="pers">Personal experiment</li></ul>` : tags52(topics52(c));
  return `<article class="xcard x52r"><button type="button" class="xmain" data-act="go" data-r="habit" data-id="${h.id}" aria-label="${esc(short52r(c))}${inPlan ? ", in your habits" : ""}"></button>
    <div class="xp52 ${HM.field(h)}"><div class="sun"></div>${art(HM.art(h), "hero-art")}${blocked ? "" : plusBtn51(h)}</div>
    <div class="xb52"><h3>${esc(short52r(c))}</h3>${tags}${m.row}</div></article>`;
})(xcard);
function shelf52() {
  const items = SHELF52.map(H).filter(Boolean);
  return `<section class="shf52" aria-labelledby="shf52h"><div class="shh52"><h3 id="shf52h">Something different to try</h3><p>Unusual, practical, honestly labeled.</p></div>
    <div class="shr52">${items.map(h => { const c = h.c52; const b = shownBenefit52(c, null);
      return `<button type="button" class="shc52" data-act="go" data-r="habit" data-id="${h.id}"><span class="shp52i ${HM.field(h)}"><span class="sun"></span>${art(HM.art(h), "hero-art")}</span>
        <span class="shb52t"><b>${esc(short52r(c))}</b><small>${b ? esc(`${TOPIC52[b.benefit_id] || ""} · ${evDesc52(b)}`) : "Personal experiment"}</small></span></button>`; }).join("")}</div></section>`;
}
SCREENS.explore = (ex => p => { const v = ex(p); const E = st.ui.explore;
  if (!E.q && !(E.goals || [])[0]) v.html = v.html.replace('<div class="pad"><p class="xcount"', `<div class="pad">${shelf52()}<p class="xcount"`);
  return v; })(SCREENS.explore);

/* ---------- the opened habit page ---------- */
SCREENS.habit = (prev => p => {
  const h = H(p.id); if (!h || !h.c52) return prev(p);
  const c = h.c52; const P = pol52(h.id); const inPlan = st.plan.find(x => !x.removed && x.hid === h.id);
  const v = selVariant52(c); const vs = allowedVariants52(c); const bens = visibleBenefits52(c, v); const held = heldBack52(c, v);
  const ok = canAdd52(c); const blocked = blockedFor52(c); const saved = st.saved.includes(h.id);
  const occ = inPlan ? HM.occOn(st, st.today).find(o => o.pid === inPlan.pid && o.status === "due") : null;
  const G = GUIDES[h.id]; const lead = shownBenefit52(c, st.profile.goal);
  const mins = minsFor52(h.id, v ? v.variant_id : null);
  const quiet = [lead ? TOPIC52[lead.benefit_id] : h.id === "humming" ? "Personal experiment" : "", mins == null ? "" : mins === 0 ? "No extra time" : `${mins} min a day`, lead ? evDesc52(lead) : ""].filter(Boolean);
  const how = vs.length > 1 ? v.action : HOWTO52[h.id] || (v ? v.action : c.action);
  const timeLine = vs.length > 1 || !/\d/.test(timeOf52(c)) || /\d|minute|hour|daily|week|night/i.test(how) ? "" : `<p class="when52">${ico("clock")}<span>${esc(timeOf52(c))}</span></p>`;
  const sched = vs.length > 1 ? `<fieldset class="vs52 vs52r"><legend class="vsl52">Choose a schedule</legend>${vs.map(({ v: x, ok: aok }) => `<label class="vopt52${x.variant_id === v.variant_id ? " on" : ""}${aok ? "" : " off"}"><input type="radio" name="vs52" data-vs52="${esc(c.card_id)}" value="${esc(x.variant_id)}" ${x.variant_id === v.variant_id ? "checked" : ""} ${aok ? "" : "disabled"}>
      <span><b>${esc(x.time)}</b>${aok ? "" : `<small class="warn52">Studied only in people with ${esc(AUD_WORDS52[x.audience_filter] || x.audience_filter)}. <button type="button" class="inl" data-act="fit52" data-id="${esc(c.card_id)}">Does this apply to you?</button></small>`}</span></label>`).join("")}</fieldset>` : "";
  const ws = HM.weekStart(st.today);
  const week = inPlan ? `<button type="button" class="hw51 hw52f" data-act="go" data-r="hprog" data-pid="${inPlan.pid}"><span class="wh51"><b>Your history</b><small>${esc(daysText(inPlan.days))}${ico("chev")}</small></span><span class="wr51">${HM.range(ws, HM.addDays(ws, 6)).map((d, i) => {
      const o = HM.occOn(st, d).find(x => x.pid === inPlan.pid); const s = o ? occState(o) : "none";
      return `<span class="wd51${d === st.today ? " now" : ""}"><small>${"MTWTFSS"[i]}</small>${s === "done" ? th(HM.art(h), HM.field(h)) : `<span class="dot51${s === "none" || s === "rest" ? " off" : ""}"></span>`}</span>`; }).join("")}</span></button>` : "";
  const stateNote = blocked.length ? `<p class="nt52 no">${ico("x")}<span>${esc(P.question?.yes || "Not suggested for you.")}</span></p>`
    : P.guidance && !ok ? `<p class="nt52 g">${ico("person")}<span><b>Needs professional guidance.</b> ${esc(P.guidance)}</span></p>` : "";
  const resOnly = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope === "research_only");
  const shownSrc = new Set(bens.flatMap(b => b.source_ids));
  const others = c.source_notes.filter(n => !shownSrc.has(n.source_id));
  const research = `<details class="rs52r rs52l" id="rs-${h.id}"><summary><span>What does the research say?</span>${ico("down")}</summary>
    <div class="rsb52"><p class="rsum52">${esc(c.research_summary)}</p>
    <p class="rsp52"><b>Studied in</b> ${esc(popOf52(c))}</p>
    ${bens.map(b => benefitBlock52(c, b)).join("")}
    ${held.length ? `<p class="fine">${plural(held.length, "more result")} ${held.length === 1 ? "applies" : "apply"} only to people with ${esc([...new Set(held.map(b => AUD_WORDS52[b.audience_filter] || b.audience_filter))].join(" or "))}. <button type="button" class="inl" data-act="fit52" data-id="${h.id}">Does this apply to you?</button></p>` : ""}
    ${resOnly.map(b => `<div class="ben52 ro52"><div class="bh52">${evChip52(b)}<span class="btag">Studied, not shown as a benefit</span></div><p class="bs52">${esc(b.statement)}</p></div>`).join("")}
    ${others.length ? `<h4 class="sg52">Related and conflicting studies</h4><p class="fine">These add context. They are not direct support for the results above.</p><ul class="srcl52">${others.map(n => sourceRow52(n.source_id, n)).join("")}</ul>` : ""}
    ${!bens.length && !resOnly.length ? `<p class="fine">No study here measured a health outcome for this habit. Treat it as a personal experiment.</p>` : ""}
    <p class="fine">${esc(c.qualification)}</p></div></details>`;
  const html = `${backBtn()}${topRight("save", "star", saved ? "Unsave" : "Save", `data-id="${h.id}" aria-pressed="${saved}"`).replace('class="tr"', `class="tr${saved ? " on" : ""}"`)}
    <div class="hero51 hr52 hr52f ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}</div>
    <div class="hb51 d52 d52r d52f"><header class="ttl52"><h2 class="disp">${esc(short52r(c))}</h2>
    <button type="button" class="shb52" data-act="share52" data-id="${h.id}">${ico("share52")}Share habit</button>
    ${quiet.length ? `<p class="ql52">${quiet.map(esc).join('<span aria-hidden="true"> · </span>')}</p>` : ""}${P.intended ? `<span class="aud52">${esc(P.intended)}</span>` : ""}</header>
    <section class="do52"><h3>How to try it</h3><p>${esc(how)}</p>${timeLine}${sched}</section>
    ${P.precaution && !blocked.length ? `<p class="nt52">${ico("info")}<span>${esc(P.precaution)}</span></p>` : ""}${stateNote}
    ${trackerPanel52(h)}
    ${week}${G && ok ? `<button type="button" class="link fa52" data-act="guide-open" data-id="${h.id}" data-oid="${esc(occ?.oid || "")}">${ico("play")}Follow along</button>` : ""}
    ${research}</div>`;
  const dock = occ ? `<button type="button" class="btn" data-act="done" data-oid="${esc(occ.oid)}">Done for today</button>`
    : inPlan ? `<button type="button" class="btn ghost-btn" data-act="sched-edit" data-pid="${inPlan.pid}">Edit schedule</button>`
    : blocked.length ? `<button type="button" class="btn ghost-btn" data-act="fit52" data-id="${h.id}">Not suggested for you · Change answer</button>`
    : `<button type="button" class="btn" data-act="quick-add" data-id="${h.id}">Add habit</button>`;
  if (!st.recent.includes(h.id)) { st.recent.unshift(h.id); st.recent = st.recent.slice(0, 12); }
  return { cls: "s-det3 s-hab51 s51 s-d52 s-d52r s-d52s s-d52f", html, dock, after: () => { const d = $(`#rs-${h.id}`); if (!d) return; if (F.rsOpen52 === h.id) d.open = true; d.addEventListener("toggle", () => { F.rsOpen52 = d.open ? h.id : null; }); } };
})(SCREENS.habit);
/* the tracker panel: no fine print, one obvious action */
trackerPanel52 = (tp => h => tp(h).replace(/<p class="fine">Optional\.[\s\S]*?<\/p>/, ""))(trackerPanel52);

/* ---------- art round 5: painted reward-category still lifes replace the coded SVG icons ---------- */
if (typeof REWARD_ART === "object") {
  Object.assign(REWARD_ART, {
    Coffee: `<span class="rw52 i-reward-coffee" role="img" aria-label="Cup of coffee"></span>`,
    Books: `<span class="rw52 i-reward-books" role="img" aria-label="Two books"></span>`,
    Groceries: `<span class="rw52 i-reward-groceries" role="img" aria-label="Bag of groceries"></span>`,
  });
}
