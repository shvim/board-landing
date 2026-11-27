// End-to-end checks of the integrated Humanology-5.2.html at phone size. Run: node tests/e2e.cjs
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const FILE52 = process.argv[2] || 'Humanology-5.2.html'; const REV = FILE52.includes('revised');
const URL52 = 'file://' + path.join(ROOT, FILE52);
const URL51 = 'file://' + path.join(ROOT, 'baseline/Humanology-5.1.html');
const results = []; let failed = 0;
const ok = (name, cond, detail = '') => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); if (!cond) failed++; };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = [], bad = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('requestfailed', r => bad.push(r.url())); p.on('response', r => { if (r.status() >= 400) bad.push(r.url()); });
  const ev = (f, a) => p.evaluate(f, a);
  const fresh = async (scen) => { await p.goto(URL52); await ev(s => { localStorage.clear(); if (s) localStorage.setItem('humanology-v52:state', JSON.stringify(HM.scenario(s))); }, scen); await p.reload(); await p.waitForTimeout(250); };
  const click = async sel => { await p.click(sel); await p.waitForTimeout(120); };

  /* ---------- catalog integrity inside the HTML ---------- */
  await fresh(null);
  const cat = await ev(() => {
    const r = C52.raw; const u = (a, k) => new Set(a.map(x => x[k])).size === a.length;
    const bad = [];
    for (const c of r.cards) { for (const b of c.benefit_ids) if (C52.ben[b]?.card_id !== c.card_id) bad.push(c.card_id + ':' + b); for (const s of c.research_source_ids) if (!C52.src[s]) bad.push('src ' + s); for (const n of c.source_notes) if (!C52.src[n.source_id]) bad.push('note ' + n.source_id); }
    for (const b of r.benefits) for (const s of b.source_ids) if (!C52.src[s]) bad.push('bsrc ' + s);
    for (const v of r.variants) { if (!C52.card[v.card_id]) bad.push('v ' + v.variant_id); for (const s of v.source_ids) if (!C52.src[s]) bad.push('vsrc ' + s); }
    return { cards: r.cards.length, titles: new Set(r.cards.map(c => c.title)).size, benefits: r.benefits.length, variants: r.variants.length, sources: r.research_sources.length,
      unique: u(r.cards, 'card_id') && u(r.benefits, 'benefit_id') && u(r.variants, 'variant_id') && u(r.research_sources, 'source_id'), bad, habits: HM.CAT.habits.length,
      https: r.research_sources.every(s => s.url.startsWith('https://')) };
  });
  ok('56 unique cards and titles', cat.cards === 56 && cat.titles === 56 && cat.habits === 56, `${cat.cards} cards, ${cat.titles} titles, ${cat.habits} in HM.CAT`);
  ok('75 benefits, 9 schedule variants, 146 publications, unique IDs', cat.benefits === 75 && cat.variants === 9 && cat.sources === 146 && cat.unique);
  ok('every benefit, variant, note and source reference resolves', cat.bad.length === 0, cat.bad.slice(0, 5).join(', '));
  ok('every publication link is https', cat.https);

  /* ---------- Explore: all 56 discoverable ---------- */
  await fresh('new'); await ev(() => { st.profile.onboarded = true; tab('explore'); });
  const ex = await ev(() => ({ n: document.querySelectorAll('.x52 h3, .x52r:not(.xpers52) h3').length, t: new Set([...document.querySelectorAll('.x52 h3, .x52r:not(.xpers52) h3')].map(x => x.textContent)).size,
    prev: document.querySelectorAll('.prev52').length, plusOnPrev: document.querySelectorAll('.prev52 .plus51').length }));
  ok('Explore All lists all 56 titles', ex.n === 56 && ex.t === 56, `${ex.t} distinct`);
  if (REV) {
    const rv = await ev(() => { const cards = [...document.querySelectorAll('.x52r:not(.xpers52)')]; return { tags: cards.map(c => c.querySelectorAll('.tg52 li').length), noStatement: cards.every(c => !c.querySelector('.xline, .xfor52, .evb')),
      moodFromWalk: cards.filter(c => /walk/i.test(c.querySelector('h3').textContent) && [...c.querySelectorAll('.tg52 li')].some(li => li.textContent === 'Mood')).map(c => c.querySelector('h3').textContent) }; });
    ok('Explore cards: short title, at most two topic tags, no evidence statement', rv.tags.every(n => n >= 1 && n <= 2) && rv.noStatement, `tags ${Math.min(...rv.tags)}–${Math.max(...rv.tags)}`);
    const mw = await ev(() => recommend52(C52.raw, recOpts52({ goals: ['mood'] })).filter(r => /walk/.test(r.card.card_id)).map(r => [SHORT52[r.card.card_id], r.benefits.concat(r.variants.flatMap(v => v.benefits)).filter(b => b.goals.includes('mood')).length]));
    ok('"Mood" appears on a walking card only with a published mood result for the shown schedule', rv.moodFromWalk.every(t => mw.some(([t2, n]) => n > 0 && t2 === t)), rv.moodFromWalk.join(', ') || 'none shown');
  }
  ok('restricted routines show neutral previews without an add button', ex.prev === 34 && ex.plusOnPrev === 0, `${ex.prev} previews`);
  await click('[data-act=xgoal][data-g=_general]');
  const gen = await ev(() => document.querySelectorAll('.x52, .x52r').length);
  ok('untargeted routines are discoverable under Everyday care', gen === 12, `${gen}`);
  const drink = await ev(() => { st.ui.explore.goals = []; st.ui.explore.q = 'sugary'; re(); const c = [...document.querySelectorAll('.x52, .x52r')].find(x => /sugary drink|soda for water/i.test(x.textContent)); return { trk: !!c?.querySelector('.trk52') || /Drink tracking/.test(c?.textContent || ''), chip: !!c?.querySelector('.evb') }; });
  ok('drink swap preview shows action and drink tracking, no benefit', drink.trk && !drink.chip);
  await ev(() => { st.ui.explore.q = ''; re(); });

  /* ---------- search / filter return position ---------- */
  await click('[data-act=xgoal][data-g=sleep]');
  await ev(() => { $('#vp .scroll').scrollTop = 600; $('#vp .scroll').dispatchEvent(new Event('scroll')); });
  await p.waitForTimeout(100);
  await ev(() => document.querySelectorAll('.xcard .xmain')[3].click()); await p.waitForTimeout(200);
  await ev(() => back()); await p.waitForTimeout(200);
  const ret = await ev(() => ({ g: st.ui.explore.goals[0], top: $('#vp .scroll').scrollTop, on: $('.chip.on')?.dataset.g }));
  ok('Explore keeps filter and scroll after opening a habit', ret.g === 'sleep' && ret.on === 'sleep' && Math.abs(ret.top - 600) < 30, JSON.stringify(ret));

  /* ---------- eligibility, exclusions, clearance ---------- */
  await ev(() => go('habit', { id: 'salt-swap' })); await p.waitForTimeout(150);
  ok('restricted card asks to check fit before adding', /Check (that this|it) fits you/.test(await ev(() => $('#vp .dock').textContent)));
  await ev(() => A['quick-add']({ dataset: { id: 'salt-swap' } })); await p.waitForTimeout(150);
  ok('add attempt opens the fit check, not the plan', await ev(() => !!$('.fit52') && !st.plan.some(x => x.hid === 'salt-swap')));
  await p.check('input[data-fit52=block][value=kidney_disease]'); await p.check('input[data-fit52=ok]'); await click('[data-act=fit52-save]');
  const blk = await ev(() => ({ can: canAdd52(C52.card['salt-swap']), rec: recommend52(C52.raw, recOpts52({ goals: ['heart'] })).some(r => r.card.card_id === 'salt-swap'), dock: $('#vp .dock').textContent }));
  ok('an exclusion keeps the card out of adding and recommendations', !blk.can && !blk.rec && blk.dock.includes('Not suggested'));
  await ev(() => { E52().blocked = []; E52().elig.handgrip = true; persist(); });
  const hg1 = await ev(() => canAdd52(C52.card.handgrip));
  await ev(() => { E52().clear.handgrip = true; });
  const hg2 = await ev(() => canAdd52(C52.card.handgrip) && recommend52(C52.raw, recOpts52({ goals: ['heart'] })).some(r => r.card.card_id === 'handgrip'));
  ok('clinician-clearance card needs both confirmation and clearance', !hg1 && hg2);

  if (REV) {
    const d = await ev(() => { go('habit', { id: 'salt-swap' }); const r = $('details.rs52r'); return { closed: r && !r.open, safetyBeforeResearch: $('.safe52').compareDocumentPosition(r) & 4, sources: r.querySelectorAll('a[href^="https"]').length, summary: r.querySelector('summary').textContent.trim() }; });
    ok('habit page opens with research folded and safety visible before it', d.closed && d.safetyBeforeResearch && d.sources > 0, d.summary);
    await ev(() => { $('details.rs52r').open = true; $('details.rs52r').dispatchEvent(new Event('toggle')); E52().aud.push('type_2_diabetes'); go('habit', { id: 'walk-after-meals' }); });
    await p.waitForTimeout(100); await ev(() => { $('details.rs52r').open = true; $('details.rs52r').dispatchEvent(new Event('toggle')); });
    await p.check('input[data-vs52][value="walk-after-meals-2"]'); await p.waitForTimeout(150);
    ok('research disclosure stays open after changing schedule', await ev(() => $('details.rs52r').open));
    await ev(() => { E52().aud = []; });
  }
  /* ---------- schedules update action, time, benefits and sources together ---------- */
  await ev(() => go('habit', { id: 'walk-after-meals' })); await p.waitForTimeout(150);
  const tsel = REV ? '.sc52 .vopt52.on b' : '.facts52 dd'; const hsel = REV ? '.do52 p' : '.do52 .how51';
  const s1 = await ev(([h, t]) => ({ how: $(h).textContent, time: $(t).textContent, bens: [...document.querySelectorAll('.ben52 .bs52')].map(x => x.textContent), dis: $('input[data-vs52][value="walk-after-meals-2"]').disabled }), [hsel, tsel]);
  ok('audience-only schedule is locked until the condition is confirmed', s1.dis);
  await ev(() => { E52().aud.push('type_2_diabetes'); re(); }); await p.check('input[data-vs52][value="walk-after-meals-2"]'); await p.waitForTimeout(150);
  const s2 = await ev(([h, t]) => ({ how: $(h).textContent, time: $(t).textContent, bens: [...document.querySelectorAll('.ben52 .bs52')].map(x => x.textContent), srcs: [...document.querySelectorAll('.ben52 a')].map(a => a.href) }), [hsel, tsel]);
  const expect = await ev(() => ({ action: C52.vari['walk-after-meals-2'].action, b: C52.vari['walk-after-meals-2'].benefit_ids.map(id => C52.ben[id].statement), srcs: C52.vari['walk-after-meals-2'].benefit_ids.flatMap(id => C52.ben[id].source_urls) }));
  ok('choosing a schedule updates action, time and benefits', s2.how === expect.action && s2.time !== s1.time && JSON.stringify(s2.bens) === JSON.stringify(expect.b), s2.bens.join(' | ').slice(0, 90));
  ok('benefit sources follow the selected schedule', s2.srcs.length === expect.srcs.length && s2.srcs.every(u => expect.srcs.includes(u)));

  /* ---------- research details, research-only, caveats ---------- */
  const sci = await ev(() => { go('science', { id: 'drink-swap' }); const t = $('#vp').textContent; const links = [...document.querySelectorAll('#vp a')].map(a => a.href);
    return { ro: t.includes('Research detail only'), weight: C52.raw.benefits.filter(b => b.card_id === 'drink-swap' && b.display_scope === 'research_only').every(b => t.includes(b.statement)), links: links.length, n: C52.card['drink-swap'].source_notes.length,
      summary: t.includes(C52.card['drink-swap'].research_summary) }; });
  ok('research_only result stays inside research details', sci.ro && sci.weight);
  const dsDetail = await ev(() => { go('habit', { id: 'drink-swap' }); return [...document.querySelectorAll('.ben52:not(.ro52) .bs52')].length; });
  ok('drink swap detail shows no benefit outside research details', dsDetail === 0);
  ok('research summary and one link per source note', sci.summary && sci.links >= sci.n, `${sci.links} links / ${sci.n} notes`);
  const ls = await ev(() => { go('habit', { id: 'left-side' }); return $('#vp').textContent.includes(C52.card['left-side'].qualification) && /device/i.test(C52.card['left-side'].qualification + C52.card['left-side'].time_commitment); });
  ok('left-side study/device caveat is shown', ls);
  const kinds = await ev(() => { go('science', { id: 'walk-after-meals' }); return [...document.querySelectorAll('.sg52')].map(x => x.textContent); });
  ok('sources are grouped as direct, broader context and mixed', kinds.length >= 2, kinds.join(', '));

  /* ---------- multi-goal onboarding → choose and add → Today → complete → undo → redo → reload → history ---------- */
  await fresh('new');
  await ev(() => { A.start(); }); await p.waitForTimeout(150);
  await click('[data-act=g5-pick][data-g=heart]'); await click('[data-act=g5-pick][data-g=sleep]'); await click('[data-act=g5-next]');
  await click('[data-act=int5-skip]'); await click('[data-act=int5-skip]');
  ok('time screen shows the four ranges in order', (await ev(() => [...document.querySelectorAll('.tcard b')].map(x => x.textContent).join('|'))) === 'Under 5 minutes|5–10 minutes|10–20 minutes|20+ minutes');
  await click('[data-act=time5-pick][data-v="10-20"]'); await p.waitForTimeout(400);
  ok('activity screen keeps the four approved choices', (await ev(() => [...document.querySelectorAll('.acard b')].map(x => x.textContent).join('|'))) === 'Keep it gentle|A little movement|More effort|Stay seated');
  await click('[data-act=eff5-pick][data-v=some]'); await p.waitForTimeout(400);
  const rs = await ev(() => ({ n: F.onb.set.length, ids: F.onb.set.map(x => x.h.id), both: F.onb.set.some(x => (x.mg || []).length > 1), pos: $('.dpos')?.textContent, peek: !!$('.dcard.peek'), h: $('.s-rec5 h2').textContent,
    goalsOk: F.onb.set.every(x => x.mg.every(g => ['heart', 'sleep'].includes(g))), auto: F.onb.set.every(x => !restricted52(x.h.c52)) }));
  ok('several distinct matches, one card at a time with position and peek', (REV ? rs.n >= 2 : rs.n >= 3) && new Set(rs.ids).size === rs.n && rs.pos === `1 of ${rs.n}` && rs.peek, `${rs.h}: ${rs.ids.join(', ')}`);
  ok('recommendations respect goals and eligibility', rs.goalsOk && rs.auto);
  await click('[data-act=rec5-add]');
  if (await p.$('.sheet [data-act=rec5-force]')) { ok('over-budget add asks first and offers Add it anyway', true); await click('.sheet [data-act=rec5-force]'); }
  await ev(() => { const o = F.onb; o.ri = o.set.length - 1; re(); });
  ok('final card has no next edge', await ev(() => !$('.dcard.peek') && $('[data-act=deck][data-d="1"]').disabled));
  await ev(() => { const o = F.onb; if (o.set[1]) o.pick[o.set[1].h.id] = 'later'; re(); });
  await ev(() => go('chosen')); await p.waitForTimeout(150);
  ok('editable selection summary', await ev(() => $('.ans52') !== null && $('.s-chosen5 h2').textContent.includes('chosen')));
  await click('[data-act=ch5-start]'); await p.waitForTimeout(300);
  const t0 = await ev(() => ({ r: nav.cur.r, plan: st.plan.map(x => x.hid), due: HM.todayDue(st).length, pts: pts51() }));
  ok('Let’s start lands on Today with the chosen habit', t0.r === 'today' && t0.plan.length === 1, t0.plan.join(','));
  const oid = await ev(() => HM.todayDue(st)[0]?.oid);
  await ev(o => { A.done({ dataset: { oid: o } }); }, oid); await p.waitForTimeout(100);
  await ev(o => { busy = false; A.done({ dataset: { oid: o } }); }, oid); await p.waitForTimeout(100);
  const t1 = await ev(() => pts51());
  ok('completion credit is given once, even on a repeated tap', t1 === t0.pts + 1, `${t0.pts} → ${t1}`);
  await ev(o => { busy = false; A.undo({ dataset: { oid: o } }); }, oid); await p.waitForTimeout(500);
  const t2 = await ev(() => pts51());
  await ev(o => { busy = false; A.done({ dataset: { oid: o } }); }, oid); await p.waitForTimeout(500);
  await p.reload(); await p.waitForTimeout(300);
  const t3 = await ev(o => ({ pts: pts51(), st: st.occ[o].status, done: !!$('.ds52 .thb') || nav.cur.r }), oid);
  ok('undo removes the point, redo restores it, reload keeps it', t2 === t0.pts && t3.pts === t0.pts + 1 && t3.st === 'done', `${t2} / ${t3.pts}`);
  const hist = await ev(o => { const pid = st.occ[o].pid; go('hprog', { pid }); return $('#vp').textContent.length > 50; }, oid);
  ok('history opens for the habit', hist);

  /* ---------- Today: due prompts reflect state; might also like is explained ---------- */
  await fresh('established');
  const dueA = await ev(() => $('.due52')?.textContent || '');
  await ev(() => { A['due52-x']({ dataset: { k: 'log' } }); }); await p.reload(); await p.waitForTimeout(200);
  const dueB = await ev(() => $('.due52')?.textContent || '');
  ok('logging reminder offered when due and stays dismissed on return', /Log today|to log today/.test(dueA) && !/Log today|to log today/.test(dueB));
  await ev(() => { A.mood51({ dataset: { v: '4' } }); }); await p.waitForTimeout(500);
  ok('check-in prompt shows its completed state', await ev(() => ($('.due52')?.textContent || '').includes('Checked in') || ($('.ms51')?.textContent || '').includes('feeling')));
  const sug = await ev(() => [...document.querySelectorAll('.sg52r small, .sgt52 > small')].map(x => x.textContent));
  ok('might also like gives a reason tied to a confirmed goal', sug.length > 0 && sug.every(s => /Matches your goals?:|For your .+ goals?/.test(s)), sug[0]?.slice(0, 80));
  ok('points visible on Today', await ev(() => !!$('.pc51')));

  /* ---------- week row: multi-habit day, empty day, missed day, widths, large text ---------- */
  for (const w of [320, 375, 390]) {
    for (const text of ['default', 'larger']) {
      await p.setViewportSize({ width: w, height: 844 }); await ev(t => { st.settings.text = t; re(); }, text); await p.waitForTimeout(100);
      const g = await ev(() => { const bs = [...document.querySelectorAll('.wk52 .wdb52')].map(x => x.getBoundingClientRect()); const card = $('.wk52').getBoundingClientRect();
        const overlap = bs.some((r, i) => i && r.left < bs[i - 1].right - 0.5); const inside = bs.every(r => r.left >= card.left - 0.5 && r.right <= card.right + 0.5);
        const d = getComputedStyle(document.querySelector('.wk52 .dot51, .wk52 .wd51 .th')).width; return { n: bs.length, overlap, inside, d, page: document.documentElement.scrollWidth <= innerWidth, minH: Math.min(...bs.map(r => r.height)) }; });
      ok(`week row at ${w}px, ${text} text: 7 days, no overlap, fits`, g.n === 7 && !g.overlap && g.inside && g.page && g.minH >= 44, `circle ${g.d}, target ${Math.round(g.minH)}px`);
    }
  }
  await p.setViewportSize({ width: 390, height: 844 }); await ev(() => { st.settings.text = 'default'; re(); });
  const days = await ev(() => { const ws = HM.weekStart(st.today); const out = {};
    for (const d of HM.range(HM.addDays(ws, -7), HM.addDays(ws, 6))) { const os = HM.occOn(st, d); const done = os.filter(o => o.status === 'done').length; const miss = d < st.today && os.some(o => o.status === 'due');
      if (done > 1 && !out.multi) out.multi = d; if (!os.length && !out.empty) out.empty = d; if (miss && !out.missed) out.missed = d; } return out; });
  for (const [k, d] of Object.entries(days)) {
    const t = await ev(d => { openDay52(d); const s = $('.sheet').textContent; closeSheet(true); return s; }, d);
    ok(`day sheet for a ${k} day`, k === 'multi' ? (t.match(/Completed/g) || []).length > 1 : k === 'empty' ? t.includes('Nothing was planned') : t.includes('Not done') && t.includes('Mark done'), d);
  }
  ok('multi-habit day shows a count badge', await ev(() => !!$('.wk52 .more51') || HM.range(HM.weekStart(st.today), st.today).every(d => HM.occOn(st, d).filter(o => o.status === 'done').length < 2)));

  /* ---------- returning 5.1 user with old habits ---------- */
  await p.goto(URL51); await p.waitForTimeout(300);
  await ev(() => { localStorage.clear(); const s = HM.scenario('established'); const t = s.today;
    HM.addPlan(s, 'H046', null, { days: [0, 1, 2, 3, 4, 5, 6], cue: 'After lunch', mins: 10, start: HM.addDays(t, -3) });
    HM.addPlan(s, 'H015', null, { days: [0, 1, 2, 3, 4, 5, 6], cue: 'After lunch', mins: 1, start: HM.addDays(t, -3) });
    HM.genOcc(s, HM.addDays(t, -3)); const o = Object.values(s.occ).find(o => o.hid === 'H046' && o.date === HM.addDays(t, -1)); if (o) HM.complete(s, o.oid);
    localStorage.setItem('humanology-v5:state', JSON.stringify(s)); });
  const before51 = await ev(() => localStorage.getItem('humanology-v5:state'));
  await p.goto(URL52); await p.waitForTimeout(400);
  const mig = await ev(() => ({ plan: st.plan.filter(x => !x.removed).map(x => [x.hid, x.from51 || '', x.status, x.mig52 || '']), log: st.mig52,
    green: H('H046')?.t, legacy: !!H('H046')?.legacy, recs: recommend52(C52.raw, recOpts52({ goals: ['heart', 'mood', 'metabolic', 'sleep', 'movement'] })).map(r => r.card.card_id),
    histDone: HM.occList(st).filter(o => o.hid === 'H046' && o.status === 'done').length }));
  const after51 = await ev(() => localStorage.getItem('humanology-v5:state'));
  ok('exact 5.1 matches migrate to card IDs', mig.plan.some(x => x[0] === 'walk-after-meals' && x[1] === 'H002') && mig.plan.some(x => x[0] === 'caffeine' && x[1] === 'H026'), JSON.stringify(mig.log.mapped));
  ok('unmatched 5.1 habits stay viewable under their original label', mig.legacy && mig.green === 'Choose a green route for a walk' && mig.histDone === 1 && mig.plan.some(x => x[0] === 'H032'), mig.log.kept.join(','));
  ok('unmatched habits never enter recommendations', !mig.recs.some(id => /^[HI]\d{3}$/.test(id)));
  ok('a restricted exact match is paused until eligibility is confirmed', mig.plan.some(x => x[0] === 'salt-swap' && x[2] === 'paused' && x[3] === 'confirm'));
  ok('5.1 saved data is left untouched for comparison', before51 === after51);
  const legacyPage = await ev(() => { go('habit', { id: 'H046' }); return $('#vp').textContent; });
  ok('legacy habit page shows its original label without research claims', legacyPage.includes('Earlier version') && !legacyPage.includes('evidence'));

  if (REV) {
    await fresh('established');
    const faces = await ev(() => [...document.querySelectorAll('.msr51 .mf51')].map(b => { const bust = b.querySelector('.bust'); const bg = getComputedStyle(bust).backgroundImage; const r = bust.getBoundingClientRect();
      return { label: b.textContent.trim(), bg: (bg.match(/mood\/(m\d)\.webp/) || [])[1], w: Math.round(r.width), role: b.getAttribute('role') }; }));
    const loaded = await ev(async () => { const urls = ['m1','m2','m3','m4','m5'].map(m => 'Humanology-5.2-assets/art/mood/' + m + '.webp');
      const r = await Promise.all(urls.map(u => new Promise(res => { const i = new Image(); i.onload = () => res(i.naturalWidth > 0); i.onerror = () => res(false); i.src = u; }))); return r.every(Boolean); });
    ok("Today shows Nora's five painted faces in order with labels", faces.length === 5 && faces.map(f => f.bg).join() === 'm1,m2,m3,m4,m5' && faces.map(f => f.label).join('|') === 'Low|A bit low|Okay|Good|Great' && faces.every(f => f.role === 'radio'), faces.map(f => f.w + 'px').join(' '));
    ok('all five face images load', loaded);
    ok('faces are at least 48 px', faces.every(f => f.w >= 48));
    await ev(() => A.mood51({ dataset: { v: '2' } })); await p.waitForTimeout(500); await p.reload(); await p.waitForTimeout(300);
    const m1 = await ev(() => ({ v: todayMood51()?.mood, sel: $('.mf51[aria-checked="true"] small')?.textContent }));
    await ev(() => { busy = false; A.mood51({ dataset: { v: '5' } }); }); await p.waitForTimeout(500); await p.reload(); await p.waitForTimeout(300);
    const m2 = await ev(() => ({ v: todayMood51()?.mood, n: st.checkins.filter(c => c.ts.startsWith(st.today) && c.mood && !c.sample).length, sel: $('.mf51[aria-checked="true"] small')?.textContent }));
    ok('mood saves in one tap, survives reload, and a same-day edit updates the one entry', m1.v === 2 && m1.sel === 'A bit low' && m2.v === 5 && m2.n === 1 && m2.sel === 'Great', JSON.stringify([m1, m2]));
    const ci = await ev(() => { F.ci = null; go('checkin', {}); return [...document.querySelectorAll('.s-ci3 .moods .bust')].map(b => (getComputedStyle(b).backgroundImage.match(/mood\/(m\d)/) || [])[1]).join(); });
    ok('mood check-in page uses the same five faces', ci === 'm1,m2,m3,m4,m5', ci);
    const rem = await ev(() => { tab('today'); return { n: document.querySelectorAll('.rm52r').length, btns: document.querySelectorAll('.rm52r .mini').length, dupMood: document.querySelectorAll('.du52').length }; });
    ok('Today has one reminder with one action and no duplicate mood prompt', rem.n === 1 && rem.btns === 1 && rem.dupMood === 0);
  }
  /* ---------- private challenge, rewards sample ---------- */
  await fresh('established');
  await ev(() => A.together({ dataset: { id: 'walk-after-meals' } })); await p.waitForTimeout(150);
  ok('private challenge invitation opens from a habit', await ev(() => $('.sheet').textContent.includes('private challenge')));
  await ev(() => { closeSheet(true); go('circles'); }); await p.waitForTimeout(150);
  ok('circles screen renders', await ev(() => $('#vp').textContent.length > 80));
  await ev(() => go('rewards')); await p.waitForTimeout(100);
  const rw = await ev(() => $('#vp').textContent);
  ok('reward demo distinguishes sample categories', rw.includes('Sample categories') && rw.includes('Preview only'));
  await ev(() => go('ledger52')); ok('points history marks example points', await ev(() => $('#vp').textContent.includes('Example points') && $('#vp').textContent.includes('not money')));
  await ev(() => { st.health.state = 'connected'; st.health.metrics = { sleep: true, steps: true, rhr: true }; st.health.readings = sampleHealth(); F.hv = 'month'; go('hmetric', { m: 'rhr' }); });
  const hm = await ev(() => $('.rng52')?.textContent || '');
  ok('health history names metric, unit, date range and comparison', /Resting heart rate/.test(hm) && /bpm/.test(hm) && /compared with/.test(hm) && /no reading/.test(hm), hm.slice(0, 120));

  /* ---------- every screen renders; no broken images ---------- */
  const scr = await ev(() => { const fails = []; const ps = [{}, { id: 'kiwi' }, { id: 'walk-after-meals', pid: st.plan[0]?.pid, m: 'sleep', oid: Object.keys(st.occ)[0] }];
    for (const r of Object.keys(SCREENS)) { let okR = false; for (const p of ps) { try { nav.cur = { r, p }; render(); okR = true; break; } catch (e) { } } if (!okR) fails.push(r); }
    tab('today'); return fails; });
  ok('every screen renders without an exception', scr.length === 0, scr.join(', '));
  for (const id of await ev(() => C52.raw.cards.map(c => c.card_id))) { await ev(id => { go('habit', { id }); go('science', { id }); }, id); }
  const imgs = await ev(() => { const urls = new Set(); for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) { const m = (r.cssText || '').match(/url\("?([^")]+\.webp)"?\)/g); if (m) m.forEach(x => urls.add(x.replace(/url\("?|"?\)/g, ''))); } } catch (e) { } } return [...urls]; });
  const missing = imgs.filter(u => !fs.existsSync(path.join(ROOT, decodeURIComponent(u.replace(/^file:\/\//, '').replace(/^.*?Humanology-5\.2-assets/, 'Humanology-5.2-assets')))));
  ok('every referenced painting file exists', imgs.length > 40 && missing.length === 0, `${imgs.length} files${missing.length ? ', missing ' + missing.slice(0, 3).join(' ') : ''}`);
  ok('no failed requests for local assets', bad.filter(u => u.startsWith('file:')).length === 0, bad.filter(u => u.startsWith('file:')).slice(0, 3).join(' '));
  ok('no console errors or exceptions', errs.length === 0, errs.slice(0, 3).join(' | '));

  console.log(results.join('\n')); console.log(`\n${results.length - failed} passed, ${failed} failed`);
  fs.writeFileSync(path.join(ROOT, 'tests/e2e-results.txt'), results.join('\n') + `\n\n${results.length - failed} passed, ${failed} failed\n`);
  await b.close(); process.exit(failed ? 1 : 0);
})();
