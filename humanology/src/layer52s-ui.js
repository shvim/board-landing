/* ================= Humanology 5.2 revised 2 — habit sharing and tracking =================
   Share habit (send it, or invite someone to do it together), a simpler habit page with the science folded,
   and a tracker on every habit mapped to its supported outcome. Readings never complete a habit or add points. */
"use strict";
P.share52 = '<path d="M12 14.5V3.8M8 7.6l4-3.8 4 3.8"/><path d="M6.5 11H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5"/>';
P.copy52 = '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>';

/* ---------- wording: early-evidence results display as "Early research" (the grade and claim are unchanged) ---------- */
const evWord52 = l => l === "Early evidence" ? "Early research" : l;
evChip52 = (b) => !b ? "" : `<button type="button" class="evp evb ${EV_CLS[b.evidence_label] || ""}" data-act="ev52" data-b="${esc(b.benefit_id)}" aria-label="${esc(evWord52(b.evidence_label))} for this result. What this means">${esc(evWord52(b.evidence_label))}${ico("info")}</button>`;
openEv52 = (o52 => bid => { o52(bid); const t = $("#sh-t"); if (t) t.textContent = evWord52(t.textContent); })(openEv52);
const evid52s = SCREENS.evidence; SCREENS.evidence = p => { const v = evid52s(p); v.html = v.html.replace(/>Early evidence</g, ">Early research<"); return v; };

/* ---------- who a habit is for, where the audience matters (short pale-sage pill) ---------- */
const AUD52 = { kiwi: "For constipation", prunes: "For constipation", "standing-stockings": "For standing shifts", "flight-stockings": "For long flights",
  "water-flosser": "For gum bleeding", blink: "For dry eyes", apples: "For mildly raised cholesterol", beans: "For raised LDL",
  "resistance-sarcopenia": "For age-related muscle loss", "fall-hazards": "For older adults at risk of falls", "tai-chi": "For adults 70 and over",
  volunteer: "For adults 59 to 79", "left-side": "For nighttime reflux", "smell-training": "For smell loss after a virus", cystitis: "For recurrent cystitis",
  "pelvic-floor": "For stress incontinence", "sleep-extension": "For habitual short sleepers", "neck-strength": "For neck and shoulder pain",
  "water-premeal": "With a weight-loss program", mindfulness: "For everyday stress", "bedtime-phone": "For bedtime phone users", nap: "After a short night" };
const SAFE_RX52 = /stop|precaution|clinician|doctor|pharmacist|avoid|medic|pain|dizz|pregnan|allerg|kidney|supervis|guidance|condition/i;

/* ---------- trackers: one per habit, mapped to the supported outcome; one history per metric ---------- */
const TRK52 = {
  ldl: { label: "LDL cholesterol", icon: "heart", num: true, units: [["mg/dL", 20, 400], ["mmol/L", 0.5, 10.5]], step: "0.1" },
  glucose: { label: "Blood glucose", icon: "chart", num: true, units: [["mg/dL", 40, 500], ["mmol/L", 2.2, 28]], step: "0.1" },
  weight: { label: "Weight", icon: "chart", num: true, units: [["kg", 30, 300], ["lb", 66, 660]], step: "0.1" },
  drinks: { label: "Sugary drinks", icon: "chart", num: true, units: [["drinks", 0, 30]], step: "1", ask: "Sugary drinks today" },
  regularity: { label: "Digestive comfort", obs: ["Very uncomfortable", "Uncomfortable", "Okay", "Comfortable", "Very comfortable"], ask: "How comfortable was your digestion today?" },
  gums: { label: "Gum bleeding", obs: ["A lot", "Some", "A little", "Barely", "None"], ask: "Any bleeding when you cleaned today?" },
  swelling: { label: "Leg swelling", obs: ["A lot", "Some", "A little", "Barely", "None"], ask: "Leg swelling at the end of the shift?" },
  eyes: { label: "Eye comfort", obs: ["Very dry", "Dry", "Okay", "Comfortable", "Very comfortable"], ask: "How do your eyes feel today?" },
  eyestrain: { label: "Eyestrain", obs: ["A lot", "Some", "A little", "Barely", "None"], ask: "Eyestrain at the end of the shift?" },
  hunger: { label: "Afternoon hunger", obs: ["Very hungry", "Hungry", "Okay", "Satisfied", "Very satisfied"], ask: "How hungry were you by evening?" },
  connected: { label: "Feeling connected", obs: ["Very lonely", "Lonely", "Okay", "Connected", "Very connected"], ask: "How connected do you feel today?" },
  reflux: { label: "Night reflux", obs: ["Severe", "Bad", "Some", "Mild", "None"], ask: "Reflux last night?" },
  neckpain: { label: "Neck and shoulder pain", obs: ["Severe", "Bad", "Some", "Mild", "None"], ask: "Neck and shoulder pain this week?" },
};
const TRACK52 = {
  apples: "ldl", oats: "ldl", almonds: "ldl", beans: "ldl", "whole-grains": "ldl", psyllium: "ldl",
  "brisk-walking": "bp", "salt-swap": "bp", dash: "bp", "walking-breaks": "bp", handgrip: "bp",
  "walk-after-meals": "glucose", "meal-order": "glucose", "water-premeal": "weight", "drink-swap": "drinks",
  caffeine: "sleepq", bath: "sleepq", "relax-muscles": "sleepq", "bedtime-list": "sleepq", "bedtime-phone": "sleepq", music: "sleepq", "sleep-extension": "sleepq",
  "cyclic-sighing": "mood", "social-break": "mood", optimism: "mood", "three-good-things": "mood", "screen-cap": "mood",
  mindfulness: "stress", "one-brisk-walk": "energy", nap: "energy",
  kiwi: "regularity", prunes: "regularity", "water-flosser": "gums", "standing-stockings": "swelling", blink: "eyes", "work-breaks": "eyestrain",
  hummus: "hunger", volunteer: "connected", "left-side": "reflux", "neck-strength": "neckpain",
};
/* everything else (stairs, sunscreen, strength exercises, cold water, idea walks, toothbrush, jumps, recall practice,
   flight stockings, fall-hazard check, handwashing, eating slowly, smell training, extra water, pelvic floor, tai chi,
   ten-minute walk aside, ...) has an outcome that can't sensibly be entered at home, so it tracks completion only */
function trackerOf52(h) {
  if (!h || !h.c52) return "done";
  let k = TRACK52[h.id] || "done";
  if (h.id === "walking-breaks") { const v = selVariant52(h.c52); if (v && !v.benefit_ids.includes("walking-breaks-1")) k = "energy"; }
  return k;
}
function T52() { if (!st.track52) st.track52 = {}; return st.track52; }
const tEntries52 = k => (T52()[k] || []).slice().sort((a, b) => b.date.localeCompare(a.date) || (b.id > a.id ? 1 : -1));
const fmtVal52 = (k, e) => TRK52[k].obs ? TRK52[k].obs[e.value - 1] : `${e.value} ${e.unit}`;
/* latest real (never sample) entry for any tracked metric */
function latest52(k) {
  if (TRK52[k]) { const e = tEntries52(k)[0]; return e ? { text: fmtVal52(k, e), date: e.date } : null; }
  if (k === "bp" || k === "rhr") { const m = st.meas.filter(x => x.type === k && !x.sample).sort((a, b) => b.ts.localeCompare(a.ts))[0];
    return m ? { text: k === "bp" ? `${m.v.sys}/${m.v.dia} mmHg` : `${m.v.v} bpm`, date: m.ts.slice(0, 10) } : null; }
  if (["mood", "stress", "energy", "sleepq"].includes(k)) { const c = st.checkins.filter(x => x[k] && !x.sample).sort((a, b) => b.ts.localeCompare(a.ts))[0];
    return c ? { text: MET[k].words[c[k] - 1], date: k === "sleepq" ? HM.addDays(c.ts.slice(0, 10), -1) : c.ts.slice(0, 10) } : null; }
  return null;
}
const when52 = d => d === st.today ? "Today" : d === HM.addDays(st.today, -1) ? "Yesterday" : HM.fmtShort(d);
const TLABEL52 = { bp: "Blood pressure", rhr: "Resting heart rate", mood: "Mood", stress: "Stress", energy: "Energy", sleepq: "Sleep quality" };
const tLabel52 = k => TRK52[k]?.label || TLABEL52[k] || "";

function trackerPanel52(h) {
  const k = trackerOf52(h);
  if (k === "done") return `<section class="trk52p done52" aria-labelledby="tk-${h.id}"><h3 id="tk-${h.id}">${ico("check")}Track it</h3><p>Check it off on Today when you&rsquo;ve done it. That&rsquo;s the record for this habit.</p></section>`;
  const L = latest52(k); const obs = !!TRK52[k]?.obs;
  const now = L ? `<p class="tkv52"><b>${esc(L.text)}</b><span>${esc(when52(L.date))}</span></p>` : `<p class="tkv52 none">Nothing saved yet</p>`;
  let act;
  if (k === "mood") act = `<div class="tkm52">${moodStrip51()}</div>`;
  else if (["sleepq", "energy", "stress"].includes(k)) act = `<button type="button" class="btn tkb52" data-act="qc-open" data-m="${k}">${ico("plus")}Add how it was</button>`;
  else if (k === "bp" || k === "rhr") act = `<button type="button" class="btn tkb52" data-act="go" data-r="measform" data-t="${k}">${ico("plus")}Add a reading</button>`;
  else act = `<button type="button" class="btn tkb52" data-act="tk52-add" data-k="${k}">${ico("plus")}${obs ? "Add how it was" : "Add a reading"}</button>`;
  const hist = TRK52[k] && tEntries52(k).length ? `<button type="button" class="link tkh52" data-act="tk52-hist" data-k="${k}">All ${esc(tLabel52(k).toLowerCase())} entries</button>` : "";
  return `<section class="trk52p" aria-labelledby="tk-${h.id}"><h3 id="tk-${h.id}">${ico(TRK52[k]?.icon || MET[k]?.icon || "chart")}${esc(tLabel52(k))}${obs ? `<span class="tko52">Personal observation</span>` : ""}</h3>
    ${k === "mood" ? "" : now}${act}${hist}<p class="fine">Optional. Saving a ${obs ? "note" : "reading"} doesn&rsquo;t check off the habit.</p></section>`;
}
/* the entry form for numeric metrics and observations, shared by every habit that uses the metric */
function openTk52(k, id) {
  const T = TRK52[k]; const e = id ? (T52()[k] || []).find(x => x.id === id) : null;
  const unit = e?.unit || (tEntries52(k)[0]?.unit) || (T.units ? T.units[0][0] : "");
  const body = T.obs
    ? `<p class="lede">${esc(T.ask)}</p><div class="tkr52" role="radiogroup" aria-label="${esc(T.label)}">${T.obs.map((w, i) => `<button type="button" role="radio" aria-checked="${e?.value === i + 1}" class="${e?.value === i + 1 ? "on" : ""}" data-act="tk52-pick" data-v="${i + 1}">${esc(w)}</button>`).join("")}</div>`
    : `<div class="tkf52"><label class="fl" for="tk-v">${esc(T.ask || "Result")}</label><div class="tkvu52"><input id="tk-v" class="in" type="number" inputmode="decimal" step="${T.step}" value="${e ? esc(e.value) : ""}" autocomplete="off">
      ${T.units.length > 1 ? `<div class="seg2" role="radiogroup" aria-label="Unit">${T.units.map(([u]) => `<button type="button" role="radio" aria-checked="${u === unit}" class="${u === unit ? "on" : ""}" data-act="tk52-unit" data-u="${esc(u)}">${esc(u)}</button>`).join("")}</div>` : `<span class="tku52">${esc(T.units[0][0])}</span>`}</div></div>`;
  F.tk52 = { k, id: e?.id || null, unit, v: e?.value ?? null };
  sheet(e ? `Edit ${T.label.toLowerCase()}` : T.label, `<div class="tks52">${body}
    <label class="fl" for="tk-d">Date</label><input id="tk-d" class="in" type="date" max="${st.today}" value="${esc(e?.date || st.today)}">
    <p class="tke52 warn" role="alert" hidden></p>
    <button type="button" class="btn" data-act="tk52-save">Save</button>${e ? `<button type="button" class="btn ghost-btn" data-act="tk52-del">Delete this entry</button>` : `<button type="button" class="btn ghost-btn" data-act="sheet-close">Cancel</button>`}
    <p class="fine">${ico("lock")} Private to you. Saved on this device.</p></div>`);
}
function openTkHist52(k) {
  const es = tEntries52(k);
  sheet(tLabel52(k), `<ul class="tkl52">${es.map(e => `<li><button type="button" data-act="tk52-edit" data-k="${k}" data-id="${e.id}"><span><b>${esc(fmtVal52(k, e))}</b><small>${esc(HM.fmtDate(e.date))}${e.edited ? " · edited" : ""}</small></span>${ico("edit")}</button></li>`).join("")}</ul>
    <button type="button" class="btn" data-act="tk52-add" data-k="${k}">${ico("plus")}Add ${TRK52[k].obs ? "another" : "a reading"}</button><button type="button" class="btn ghost-btn" data-act="sheet-close">Close</button>`);
}
Object.assign(A5, {
  "tk52-add": el => { closeSheet(true); openTk52(el.dataset.k); },
  "tk52-hist": el => openTkHist52(el.dataset.k),
  "tk52-edit": el => { closeSheet(true); openTk52(el.dataset.k, el.dataset.id); },
  "tk52-unit": el => { F.tk52.unit = el.dataset.u; $$('#vp [data-act="tk52-unit"]').forEach(b => { const on = b === el; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); }); },
  "tk52-pick": el => { F.tk52.v = Number(el.dataset.v); $$('#vp [data-act="tk52-pick"]').forEach(b => { const on = b === el; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); }); },
  "tk52-save": () => once(() => {
    const f = F.tk52; const T = TRK52[f.k]; const err = $("#vp .tke52"); const date = $("#tk-d")?.value || "";
    let v = T.obs ? f.v : ($("#tk-v")?.value ?? "").trim() === "" ? null : Number($("#tk-v").value);
    const range = T.units?.find(u => u[0] === f.unit);
    const msg = v == null || Number.isNaN(v) ? (T.obs ? "Choose one." : "Enter a number.")
      : range && (v < range[1] || v > range[2]) ? `Enter a value between ${range[1]} and ${range[2]} ${f.unit}.`
      : !date || date > st.today ? "Choose a date up to today." : "";
    if (msg) { err.textContent = msg; err.hidden = false; return; }
    const list = T52()[f.k] || (T52()[f.k] = []); const ex = f.id && list.find(x => x.id === f.id);
    if (ex) Object.assign(ex, { value: v, unit: f.unit, date, edited: st.today });
    else list.push({ id: HM.nid(st, "r"), value: v, unit: f.unit, date, ts: `${st.today}T${String(new Date().getHours()).padStart(2, "0")}:00` });
    F.tk52 = null; closeSheet(true); persist(); re(); toast(ex ? "Updated." : `Saved. It shows on Today under Your health.`);
  }),
  "tk52-del": () => { const f = F.tk52; T52()[f.k] = (T52()[f.k] || []).filter(x => x.id !== f.id); F.tk52 = null; closeSheet(true); persist(); re(); toast("Deleted."); },
  "qc-open": el => openQC(el.dataset.m),
});

/* ---------- Today → Your health: the latest real entry and its date, once something is saved ---------- */
healthList51 = (hl => ks => {
  const rows = Object.keys(TRK52).filter(k => tEntries52(k).length).map(k => { const L = latest52(k);
    return `<button type="button" class="hr51 hr52t" data-act="tk52-hist" data-k="${k}"><span class="hi51">${ico(TRK52[k].icon || "chart")}</span>
      <span class="hn51"><b>${esc(TRK52[k].label)}</b><small>${esc(when52(L.date))}</small></span><span class="hv51 hv52">${esc(L.text)}</span>${ico("chev", "chev")}</button>`; }).join("");
  const base = hl(ks);
  if (!rows) return base;
  if (base) return base.replace(/<div class="hl51">/, `<div class="hl51">${rows}`);
  return `<section class="sec51"><div class="sh51 row"><div><h3>Your health</h3><p>Shared by every habit that tracks it.</p></div><button type="button" class="log51" data-act="log51">${ico("plus")}Log</button></div><div class="hl51">${rows}</div></section>`;
})(healthList51);
/* the Log sheet offers every tracked metric */
A5["log51"] = () => sheet("Log a reading", `<div class="lgs51">${[["bp", "heart", "Blood pressure", "Both numbers"], ["rhr", "heart", "Resting heart rate", "bpm"], ["ldl", "heart", "LDL cholesterol", "A result you already have"], ["glucose", "chart", "Blood glucose", "mg/dL or mmol/L"], ["mood", "smile", "How you feel", "Mood, energy, stress, a note"], ["sleepq", "moon", "Last night's sleep", "One tap"]].map(([k, i, t, s]) =>
  `<button type="button" class="lgr51" data-act="log51-go" data-k="${k}"><span class="hi51">${ico(i)}</span><span class="hn51"><b>${t}</b><small>${s}</small></span>${ico("chev", "chev")}</button>`).join("")}</div>`);
A5["log51-go"] = el => { const k = el.dataset.k; closeSheet(true); if (k === "bp" || k === "rhr") go("measform", { t: k }); else if (k === "mood") { F.ci = null; go("checkin", {}); } else if (TRK52[k]) openTk52(k); else openQC(k); };

/* ---------- sharing ---------- */
const shareTitle52 = h => h.c52 ? short52r(h.c52) : h.t;
function sharePayload52(h, opts = {}) {
  const t = shareTitle52(h);
  if (h.c52) { const b = shownBenefit52(h.c52, null); const line = b ? `${b.statement}.` : firstSentences(h.c52.action);
    return { title: t, text: `${t}\n${line}\nA habit from Humanology.` }; }
  /* a personal habit: the title, plus the description only if the person chooses to include it */
  return { title: t, text: `${t}${opts.desc && h.action ? `\n${h.action}` : ""}\nA habit from Humanology.` };
}
function openShare52(id) {
  const h = H(id); if (!h) return; F.share52 = { id, desc: false };
  const pay = sharePayload52(h);
  sheet(shareTitle52(h), `<div class="sh52">${h.c52 ? "" : `<label class="tog"><input type="checkbox" data-sh52desc><span>Include the description I wrote</span></label>`}
    <div class="shp52" aria-label="What they’ll get"><span class="eyebrow">What they&rsquo;ll get</span><p id="sh52-text">${esc(pay.text).replace(/\n/g, "<br>")}</p></div>
    <button type="button" class="sho52" data-act="share52-send" data-id="${esc(id)}"><span class="shi52">${ico("share52")}</span><span><b>Share this habit</b><small>Send it to anyone. Nothing personal is included.</small></span></button>
    <button type="button" class="sho52" data-act="share52-invite" data-id="${esc(id)}"><span class="shi52">${ico("person")}</span><span><b>Invite someone to do it with me</b><small>A private challenge for this habit</small></span></button>
    <div class="shc52" hidden><label class="fl" for="sh52-copy">Copy this and paste it anywhere</label><textarea id="sh52-copy" class="in" rows="4" readonly></textarea></div>
    <button type="button" class="btn ghost-btn" data-act="sheet-close">Cancel</button>
    <p class="fine">No link is included yet: there&rsquo;s no public page for a habit in this prototype.</p></div>`);
}
document.addEventListener("change", e => { if (!e.target.matches?.("[data-sh52desc]") || !F.share52) return; F.share52.desc = e.target.checked;
  const p = $("#sh52-text"); if (p) p.innerHTML = esc(sharePayload52(H(F.share52.id), { desc: F.share52.desc }).text).replace(/\n/g, "<br>"); });
function copyFallback52(text) {
  const done = () => { closeSheet(); toast("Copied. Paste it anywhere."); window.__shared52 = { via: "copy", text }; };
  const manual = () => { const box = $("#vp .shc52"); if (!box) return; box.hidden = false; const ta = $("#sh52-copy"); ta.value = text; ta.focus(); ta.select(); toast("Select the text to copy it."); window.__shared52 = { via: "manual", text }; };
  try { if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, manual); else manual(); } catch (e) { manual(); }
}
Object.assign(A5, {
  "share52": el => openShare52(el.dataset.id),
  "share52-send": el => {
    const h = H(el.dataset.id); const pay = sharePayload52(h, { desc: F.share52?.desc });
    if (navigator.share) {
      navigator.share({ title: pay.title, text: pay.text }).then(() => { closeSheet(); toast("Shared."); window.__shared52 = { via: "share", text: pay.text }; },
        err => { if (err && err.name === "AbortError") { closeSheet(); toast("Not shared."); window.__shared52 = { via: "cancel" }; } else copyFallback52(pay.text); });
    } else copyFallback52(pay.text);
  },
  "share52-invite": el => { closeSheet(true); openTogether(el.dataset.id); },
});
/* the existing invitation flow, labeled as simulated here */
openTogether = (ot => hid => { ot(hid); const s = $("#vp .sheet"); if (s && !s.querySelector(".sim52")) s.insertAdjacentHTML("beforeend", `<p class="fine sim52">Prototype: invitations are simulated. Nothing is sent.</p>`); })(openTogether);

/* ---------- Today → All my habits: open and share are sibling controls ---------- */
allHabits51 = function () {
  const live = st.plan.filter(p => !p.removed).sort((a, b) => a.order - b.order); if (!live.length) return "";
  return `<section class="sec51"><div class="sh51"><h3>All my habits</h3><p>Tap one to open it, or share it.</p></div><div class="mh51 mh52">${live.map(p => { const h = H(p.hid); const n = shortName(h);
    return `<div class="mhw52"><button type="button" class="mhc51" data-act="go" data-r="habit" data-id="${h.id}" data-pid="${p.pid}">${ptile(h)}<b>${esc(n)}</b><small>${esc(daysText(p.days))}</small></button>
      <button type="button" class="shb52 sm" data-act="share52" data-id="${h.id}" aria-label="Share ${esc(n)}">${ico("share52")}<span>Share</span></button></div>`; }).join("")}
    <div class="mhw52"><button type="button" class="mhc51 addc51" data-act="find-habit"><span class="ptile f-cream">${ico("search")}</span><b>Find a habit</b><small>Explore</small></button></div>
    <div class="mhw52"><button type="button" class="mhc51 addc51" data-act="go" data-r="pnew"><span class="ptile f-cream">${ico("plus")}</span><b>Create your own</b><small>Your idea</small></button></div></div></section>`;
};

/* ---------- the opened habit: painting, short title, Share, one benefit, how and when, safety, tracker; science folded ---------- */
SCREENS.habit = (habit52r => p => {
  const h = H(p.id);
  if (h && h.personal && !h.legacy) { const v = habit52r(p); v.html = v.html.replace(/(<h2 class="disp">[\s\S]*?<\/h2>)/, `$1<button type="button" class="shb52" data-act="share52" data-id="${h.id}">${ico("share52")}Share habit</button>`)
    .replace(/<section class="together5"[\s\S]*?<\/section>/, "").replace(/<button type="button" class="pb51" data-act="together"[^>]*>[\s\S]*?<\/button>/, ""); return v; }
  if (!h || !h.c52) return habit52r(p);
  const c = h.c52; const inPlan = st.plan.find(x => !x.removed && x.hid === h.id);
  const v = selVariant52(c); const vs = allowedVariants52(c); const bens = visibleBenefits52(c, v); const held = heldBack52(c, v);
  const ok = canAdd52(c); const blocked = blockedFor52(c); const saved = st.saved.includes(h.id);
  const occ = inPlan ? HM.occOn(st, st.today).find(o => o.pid === inPlan.pid && o.status === "due") : null;
  const G = GUIDES[h.id]; const ws = HM.weekStart(st.today); const lead = shownBenefit52(c, st.profile.goal);
  const head = `${backBtn()}${topRight("save", "star", saved ? "Unsave" : "Save", `data-id="${h.id}" aria-pressed="${saved}"`).replace('class="tr"', `class="tr${saved ? " on" : ""}"`)}`;
  const week = inPlan ? `<button type="button" class="hw51" data-act="go" data-r="hprog" data-pid="${inPlan.pid}"><span class="wh51"><b>Your week</b><small>${esc(daysText(inPlan.days))}</small></span><span class="wr51">${HM.range(ws, HM.addDays(ws, 6)).map((d, i) => {
      const o = HM.occOn(st, d).find(x => x.pid === inPlan.pid); const s = o ? occState(o) : "none";
      return `<span class="wd51${d === st.today ? " now" : ""}"><small>${"MTWTFSS"[i]}</small>${s === "done" ? th(HM.art(h), HM.field(h)) : `<span class="dot51${s === "none" || s === "rest" ? " off" : ""}"></span>`}</span>`; }).join("")}</span></button>` : "";
  const when = vs.length > 1 ? `<fieldset class="vs52 vs52r"><legend class="sr52">Choose a schedule</legend>${vs.map(({ v: x, ok: aok }) => `<label class="vopt52${x.variant_id === v.variant_id ? " on" : ""}${aok ? "" : " off"}"><input type="radio" name="vs52" data-vs52="${esc(c.card_id)}" value="${esc(x.variant_id)}" ${x.variant_id === v.variant_id ? "checked" : ""} ${aok ? "" : "disabled"}>
      <span><b>${esc(x.time)}</b>${aok ? "" : `<small class="warn52">For people with ${esc(AUD_WORDS52[x.audience_filter] || x.audience_filter)}. <button type="button" class="inl" data-act="fit52" data-id="${esc(c.card_id)}">Does this apply to you?</button></small>`}</span></label>`).join("")}</fieldset>`
    : `<p class="when52">${ico("clock")}<span>${esc(timeOf52(c))}</span></p>`;
  const rule = { confirm_eligibility: "Only for some people. Check it fits you before adding it.", clinician_clearance: "Needs guidance from a health professional before you start." }[c.eligibility_rule] || "";
  const safetyText = rule || c.blocked_if.length || SAFE_RX52.test(c.qualification);
  const fitState = blocked.length ? `<p class="fst52 no">${ico("x")}Not suggested for you: ${esc(blocked.map(blockWord52).join(", "))}.</p>`
    : restricted52(c) && ok ? `<p class="fst52 yes">${ico("check")}You confirmed it fits you${c.eligibility_rule === "clinician_clearance" ? " and that you have professional guidance" : ""}.</p>` : "";
  const needFit = restricted52(c) || c.blocked_if.length || held.length || vs.some(x => !x.ok);
  const safety = safetyText || needFit ? `<section class="safe52" aria-labelledby="sf-${h.id}"><h3 id="sf-${h.id}">${ico("info")}Before you start</h3>
    ${rule ? `<p><b>${esc(rule)}</b></p>` : ""}${SAFE_RX52.test(c.qualification) || rule ? `<p>${esc(c.qualification)}</p>` : ""}
    ${c.blocked_if.length ? `<p class="fine">Not suitable with: ${esc(c.blocked_if.map(blockWord52).join("; "))}.</p>` : ""}${fitState}
    ${needFit ? `<button type="button" class="btn ghost-btn sm52" data-act="fit52" data-id="${h.id}">${ok && restricted52(c) ? "Review" : "Check it fits you"}</button>` : ""}
    ${inPlan && inPlan.mig52 === "confirm" ? `<p class="note warn">Moved from version 5.1 and paused until you confirm it still fits you.</p>` : ""}</section>` : "";
  const resOnly = c.benefit_ids.map(id => C52.ben[id]).filter(b => b.display_scope === "research_only");
  const research = `<details class="rs52r rs52l" id="rs-${h.id}"><summary><span>What does the research say?</span>${ico("down")}</summary>
    <div class="rsb52"><p class="rsum52">${esc(c.research_summary)}</p>
    <p class="fine"><b>Studied in:</b> ${esc(popOf52(c))}</p>${SAFE_RX52.test(c.qualification) || rule ? "" : `<p class="fine">${esc(c.qualification)}</p>`}
    ${bens.map(b => benefitBlock52(c, b)).join("")}
    ${held.length ? `<p class="fine">${plural(held.length, "more result")} ${held.length === 1 ? "applies" : "apply"} only to people with ${esc([...new Set(held.map(b => AUD_WORDS52[b.audience_filter] || b.audience_filter))].join(" or "))}. <button type="button" class="inl" data-act="fit52" data-id="${h.id}">Does this apply to you?</button></p>` : ""}
    ${resOnly.map(b => `<div class="ben52 ro52"><div class="bh52">${evChip52(b)}<span class="btag">Research detail only</span></div><p class="bs52">${esc(b.statement)}</p></div>`).join("")}
    <button type="button" class="btn ghost-btn" data-act="go" data-r="science" data-id="${h.id}">All ${c.source_notes.length} sources</button></div></details>`;
  const html = `${head}<div class="hero51 hr52 ${h.d.field}"><div class="sun"></div>${art(h.d.art, "hero-art", h.t)}${ok ? plusBtn51(h, "big") : ""}</div>
    <div class="hb51 d52 d52r d52s"><div class="ttl52"><h2 class="disp">${esc(short52r(c))}</h2>${AUD52[h.id] ? `<span class="aud52">${esc(AUD52[h.id])}</span>` : ""}
    <button type="button" class="shb52" data-act="share52" data-id="${h.id}">${ico("share52")}Share habit</button></div>
    ${lead ? `<p class="lead52">${esc(lead.statement)}.<span class="lev52">${esc(evWord52(lead.evidence_label))}</span></p>` : ""}
    <section class="do52"><h3>How to try it</h3><p>${esc(actionOf52(c))}</p>${when}</section>
    ${safety}${trackerPanel52(h)}${week}
    ${G && ok ? `<div class="row51"><button type="button" class="pb51" data-act="guide-open" data-id="${h.id}" data-oid="${esc(occ?.oid || "")}">${ico("play")}Follow along</button></div>` : ""}
    ${research}</div>`;
  const dock = occ ? `<button type="button" class="btn" data-act="done" data-oid="${esc(occ.oid)}">Done for today</button>`
    : inPlan ? `<button type="button" class="btn ghost-btn" data-act="sched-edit" data-pid="${inPlan.pid}">Edit schedule</button>`
    : blocked.length ? `<button type="button" class="btn ghost-btn" data-act="fit52" data-id="${h.id}">Not suggested for you · Review</button>`
    : ok ? `<button type="button" class="btn" data-act="quick-add" data-id="${h.id}">${ico("plus")} Add to my habits</button>`
    : `<button type="button" class="btn" data-act="fit52" data-id="${h.id}">Check it fits you</button>`;
  if (!st.recent.includes(h.id)) { st.recent.unshift(h.id); st.recent = st.recent.slice(0, 12); }
  return { cls: "s-det3 s-hab51 s51 s-d52 s-d52r s-d52s", html, dock, after: () => { const d = $(`#rs-${h.id}`); if (!d) return; if (F.rsOpen52 === h.id) d.open = true; d.addEventListener("toggle", () => { F.rsOpen52 = d.open ? h.id : null; }); } };
})(SCREENS.habit);
/* a corrected value clears the earlier message */
document.addEventListener("input", e => { if (e.target.id === "tk-v" || e.target.id === "tk-d") { const m = $("#vp .tke52"); if (m) m.hidden = true; } });
