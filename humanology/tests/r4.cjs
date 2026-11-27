// Revision 4: start rules, the opened habit page, evidence wording, discovery, new cards. Run: node tests/r4.cjs
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const URL = 'file://' + path.join(ROOT, 'Humanology-5.2-revised.html');
const POL = JSON.parse(fs.readFileSync(path.join(ROOT, 'matching/policy.json'), 'utf8'));
const out = []; let failed = 0; const ok = (n, c, d = '') => { out.push(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`); if (!c) failed++; };
(async () => {
  const b = await chromium.launch(); const errs = [];
  const open = async ({ w = 390, text = 'default', scen = 'new' } = {}) => { const p = await b.newPage({ viewport: { width: w, height: 844 } });
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(URL); await p.evaluate(([t, sc]) => { localStorage.clear(); const s = HM.scenario(sc); s.profile.onboarded = true; s.settings.text = t; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); }, [text, scen]);
    await p.reload(); await p.waitForTimeout(250); return p; };
  const click = async (p, sel) => { await p.click(sel); await p.waitForTimeout(500); };

  /* 1. which habits interrupt a new user, exactly as the rules say */
  let p = await open();
  const gate = await p.evaluate(() => C52.raw.cards.filter(c => !canAdd52(c)).map(c => c.card_id).sort());
  const expect = Object.keys(POL).filter(k => POL[k].question || POL[k].guidance).sort();
  ok('a new user meets a question or guidance only where the rules require it', JSON.stringify(gate) === JSON.stringify(expect), `${gate.length}: ${gate.join(', ')}`);
  ok('ordinary habits named in the brief add without a check', ['apples', 'bedtime-list', 'bedtime-phone', 'social-break', 'cyclic-sighing'].every(id => !gate.includes(id)));
  /* ordinary Add through the interface */
  await p.evaluate(() => go('habit', { id: 'apples' })); await p.waitForTimeout(200);
  await click(p, '#vp .dock [data-act=quick-add]');
  ok('ordinary Add: apples goes straight into the plan with no question', await p.evaluate(() => st.plan.some(x => !x.removed && x.hid === 'apples') && !$('.st52')));
  await p.evaluate(() => closeSheet(true));
  /* newly ungated habits reach recommendations */
  const rec = await p.evaluate(() => { const o = newOnb5(); o.goals = ['sleep']; o.refines = { sleep: 'falling' }; o.prefs.time = '20+'; return recSet(o).map(x => x.h.id); });
  ok('newly ungated habits are recommended when they match (Sleep → Falling asleep)', rec.includes('bedtime-list') || rec.includes('bedtime-phone'), rec.join(', '));
  const dash = await p.evaluate(() => { st.profile.goals = ['mood']; st.profile.refines = {}; return match52(matchProfile52(null)).map(x => x.id); });
  ok('dashboard suggestions include formerly gated ordinary habits', dash.includes('cyclic-sighing') || dash.includes('social-break'), dash.join(', '));
  await p.close();

  /* 2. a known exclusion holds on every route to Add */
  p = await open();
  await p.evaluate(() => tab('explore')); await p.waitForTimeout(200);
  await p.evaluate(() => { const c = [...document.querySelectorAll('.xcard')].find(x => x.querySelector('h3')?.textContent === 'Climb stairs briskly'); c.scrollIntoView(); c.querySelector('.plus51').click(); }); await p.waitForTimeout(400);
  ok('Explore + on stairs asks the vigorous-exercise question', await p.evaluate(() => /avoid vigorous exercise/.test($('.st52')?.innerText || '') && !st.plan.some(x => x.hid === 'stairs')));
  await click(p, '.st52 [data-act=st52-ans][data-v=yes]');
  const ex = await p.evaluate(() => { closeSheet(true); const r = { can: canAdd52(C52.card.stairs), plan: st.plan.some(x => x.hid === 'stairs') };
    A5['quick-add']({ dataset: { id: 'stairs' } }); r.quick = st.plan.some(x => x.hid === 'stairs'); closeSheet(true);
    E52().sel.stairs = 'stairs-2'; go('habit', { id: 'stairs' }); r.variant = canAdd52(C52.card.stairs); r.dock = $('#vp .dock').textContent;
    const o = newOnb5(); o.goals = ['movement']; o.prefs.time = '20+'; o.prefs.effort = 'more'; r.onb = recSet(o).map(x => x.h.id);
    st.profile.goals = ['movement']; st.profile.refines = {}; r.dash = match52(matchProfile52(null)).map(x => x.id); return r; });
  ok('a Yes blocks stairs on quick-add, schedule change, onboarding and dashboard', !ex.can && !ex.plan && !ex.quick && !ex.variant && /Not suggested/.test(ex.dock) && !ex.onb.includes('stairs') && !ex.dash.includes('stairs'), JSON.stringify(ex));
  await click(p, '#vp .dock [data-act=fit52]'); await click(p, '.st52 [data-act=st52-ans][data-v=no]');
  ok('changing the answer to No makes stairs addable again', await p.evaluate(() => canAdd52(C52.card.stairs)));
  /* a professional-guidance habit explains why, for its own protocol */
  await p.evaluate(() => { go('habit', { id: 'handgrip' }); }); await p.waitForTimeout(200);
  const hg = await p.evaluate(() => ({ note: $('.nt52.g')?.innerText || '', dock: $('#vp .dock').textContent }));
  ok('handgrip states why guidance is needed (30% of maximum with a force gauge)', /30% of your maximum/.test(hg.note) && /force gauge/.test(hg.note) && /Add habit/.test(hg.dock), hg.note.slice(0, 90));
  await click(p, '#vp .dock [data-act=quick-add]');
  ok('handgrip Add asks its exclusion question before guidance', await p.evaluate(() => /uncontrolled blood pressure/.test($('.st52').innerText)));
  await click(p, '.st52 [data-act=st52-ans][data-v=no]');
  ok('then asks for professional guidance', await p.evaluate(() => /Needs professional guidance/.test($('.st52').innerText) && !st.plan.some(x => x.hid === 'handgrip')));
  await p.check('.st52 input[data-st52=clear]'); await click(p, '.st52 [data-act=st52-go]');
  ok('with both answered, handgrip is added', await p.evaluate(() => { closeSheet(true); return st.plan.some(x => !x.removed && x.hid === 'handgrip'); }));
  await p.close();

  /* 3. a restricted schedule variant */
  p = await open();
  const v = await p.evaluate(() => { go('habit', { id: 'walk-after-meals' }); const r = { locked: $('input[data-vs52][value="walk-after-meals-2"]').disabled };
    E52().sel['walk-after-meals'] = 'walk-after-meals-2'; r.sel = selVariant52(C52.card['walk-after-meals']).variant_id;
    A5['quick-add']({ dataset: { id: 'walk-after-meals' } }); closeSheet(true); r.plan = st.plan.find(x => x.hid === 'walk-after-meals')?.vid; return r; });
  ok('the diabetes-only schedule stays locked and is never used without the condition', v.locked && v.sel === 'walk-after-meals-1' && v.plan === 'walk-after-meals-1', JSON.stringify(v));
  await p.close();

  /* 4. Heart → Blood pressure → More effort, in the interface */
  p = await b.newPage({ viewport: { width: 390, height: 844 } }); await p.goto(URL); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(250);
  await click(p, '[data-act=start]'); await click(p, '[data-act=g5-pick][data-g=heart]'); await click(p, '[data-act=g5-next]'); await click(p, '[data-act=int5-pick][data-v=bp]');
  await click(p, '[data-act=time5-pick][data-v="20+"]'); await click(p, '[data-act=eff5-pick][data-v=more]');
  const bp = await p.evaluate(() => F.onb.set.map(x => x.h.id));
  ok('Heart → Blood pressure → More effort still leads with brisk walking', bp[0] === 'brisk-walking' && !bp.includes('oats'), bp.join(', '));
  await p.close();

  /* 5. returning users: plans paused by the retired generic check resume; real rules stay paused; logs intact */
  p = await open({ scen: 'established' });
  const ret = await p.evaluate(() => { const s = JSON.parse(JSON.stringify(st)); const t = s.today;
    for (const id of ['mindfulness', 'kiwi']) { const pid = 'pr' + id; s.plan.push({ pid, hid: id, vid: null, days: [0, 1, 2, 3, 4, 5, 6], cue: 'After lunch', time: '', mins: 5, reminder: false, remTime: '08:00', start: HM.addDays(t, -10), status: 'paused', pausedFrom: t, removed: false, order: 9, edits: [], mig52: 'confirm', from51: 'H030' });
      s.occ[`${pid}@${HM.addDays(t, -2)}`] = { oid: `${pid}@${HM.addDays(t, -2)}`, pid, hid: id, date: HM.addDays(t, -2), orig: HM.addDays(t, -2), status: 'done', mins: 5, cue: 'After lunch' }; }
    s.e52 = { elig: {}, clear: {}, blocked: [], aud: [], dismissed: [], sel: {}, rem: {} }; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); return true; });
  await p.reload(); await p.waitForTimeout(300);
  const rr = await p.evaluate(() => ({ m: st.plan.find(x => x.hid === 'mindfulness'), k: st.plan.find(x => x.hid === 'kiwi'), logs: HM.occList(st).filter(o => ['mindfulness', 'kiwi'].includes(o.hid) && o.status === 'done').length }));
  ok('returning user: a plan paused only by the old check resumes; one with a real question stays paused; history kept', rr.m.status === 'active' && !rr.m.mig52 && rr.k.status === 'paused' && rr.k.mig52 === 'confirm' && rr.logs === 2, JSON.stringify({ m: rr.m.status, k: rr.k.status, logs: rr.logs }));
  await p.close();

  /* 6. the opened page at 320 / 375 / 390 and larger text */
  for (const [w, t] of [[320, 'default'], [375, 'default'], [390, 'default'], [320, 'larger'], [390, 'larger']]) {
    p = await open({ w, text: t });
    for (const id of ['apples', 'cyclic-sighing', 'standing-stockings', 'handgrip', 'neck-strength']) {
      await p.evaluate(i => go('habit', { id: i }), id); await p.waitForTimeout(150);
      const g = await p.evaluate(() => { const hero = $('.hr52f').getBoundingClientRect(), h2 = $('.ttl52 h2').getBoundingClientRect(), sh = $('.ttl52 .shb52').getBoundingClientRect(), dock = $('#vp .dock .btn').getBoundingClientRect(), r = $('details.rs52r');
        const order = ['.hr52f', '.ttl52', '.do52', '.trk52p', 'details.rs52r'].map(s => $(s)).every((el, i, a) => !i || (a[i - 1].compareDocumentPosition(el) & 4));
        return { heroH: hero.height, w: innerWidth, shareBelow: sh.top >= h2.bottom, shareH: sh.height, dockVis: dock.bottom <= innerHeight && dock.height >= 43.5, closed: !r.open, ow: document.documentElement.scrollWidth <= innerWidth,
          generic: /fits you|check if it fits/i.test($('#vp').innerText), warnBox: !!$('.safe52'), order }; });
      ok(`${id} at ${w}px${t === 'larger' ? ' larger text' : ''}: painting leads, Share under title, research closed, action reachable`, g.heroH >= Math.min(360, g.w) * 0.95 && g.shareBelow && g.shareH >= 43.5 && g.dockVis && g.closed && g.ow && !g.generic && !g.warnBox && g.order, JSON.stringify(g));
    }
    await p.close();
  }
  /* research opens to a short summary first, then studies */
  p = await open();
  const rs = await p.evaluate(() => { go('habit', { id: 'apples' }); const d = $('details.rs52r'); d.open = true; const first = d.querySelector('.rsb52').firstElementChild; return { first: first.className, studied: /Studied in/.test(d.innerText), links: d.querySelectorAll('a[href^="https"]').length, related: /Related and conflicting studies/.test(d.innerText) }; });
  ok('research opens with the short summary, then who was studied, then linked studies', rs.first === 'rsum52' && rs.studied && rs.links >= 1, JSON.stringify(rs));
  ok('related or conflicting papers are labeled as context, not direct support', rs.related);

  /* 7. no generic check copy anywhere; every habit page renders */
  const copy = await p.evaluate(() => { const bad = []; for (const c of C52.raw.cards) { go('habit', { id: c.card_id }); if (/fits you|check if it fits|confirm it fits/i.test($('#vp').innerText)) bad.push(c.card_id); } tab('explore'); if (/fits you/i.test($('#vp').innerText)) bad.push('explore'); return bad; });
  ok('“Check if it fits” is gone from every habit page and Explore', copy.length === 0, copy.join(', '));

  /* 8. evidence wording, aliases, shelf, new cards */
  const evw = await p.evaluate(() => ({ cs: evDesc52(C52.ben['cyclic-sighing-1']), sw: evDesc52(C52.ben['stair-walk-energy-1']), sb: evDesc52(C52.ben['slow-breathing-1']), ac: evDesc52(C52.ben['acupuncture-migraine-1']),
    anec: C52.raw.benefits.some(b => /anecdot/i.test(evDesc52(b))) }));
  ok('evidence wording says what we know about that outcome', evw.cs === 'One study' && evw.sw === 'One small study' && evw.sb === 'Early research' && evw.ac === 'Research supported' && !evw.anec, JSON.stringify(evw));
  for (const q of ['breathing', 'breathwork']) { const r = await p.evaluate(q => { tab('explore'); st.ui.explore.q = q; re(); return [...document.querySelectorAll('.xcard h3')].map(h => h.textContent); }, q);
    ok(`searching “${q}” finds cyclic sighing`, r.includes('Try cyclic sighing'), r.join(', ')); }
  const shelf = await p.evaluate(() => { st.ui.explore.q = ''; st.ui.explore.goals = []; tab('explore'); return { n: document.querySelectorAll('.shc52').length, titles: [...document.querySelectorAll('.shc52 b')].map(x => x.textContent), early: [...document.querySelectorAll('.x52r .mte52')].filter(x => /Early|One/.test(x.textContent)).length }; });
  ok('Explore shows a “Something different to try” shelf', shelf.n >= 8 && shelf.titles.includes('Try cyclic sighing') && shelf.titles.includes('Walk to brainstorm') && shelf.titles.includes('Write tomorrow’s list'), shelf.titles.join(', '));
  ok('early-research habits stay browsable with an honest cue', shelf.early >= 10, `${shelf.early}`);
  const nw = await p.evaluate(() => ['slow-breathing', 'humming', 'acupuncture-migraine', 'weighted-blanket', 'stair-walk-energy', 'drawing-memory', 'toilet-footstool', 'abdominal-massage'].map(id => { go('habit', { id }); return { id, ok: !!$('.hr52f') && !!$('.trk52p'), links: $('details.rs52r').querySelectorAll('a[href^="https"]').length, tag: $('.ql52')?.textContent || '' }; }));
  ok('all eight new cards render with a tracker and linked sources', nw.every(x => x.ok && x.links >= 1), JSON.stringify(nw.map(x => [x.id, x.links])));
  ok('humming carries no health-benefit tag', /Personal experiment/.test(nw.find(x => x.id === 'humming').tag) && !/Blood pressure|Mood|evidence/i.test(nw.find(x => x.id === 'humming').tag));
  const ac = await p.evaluate(() => { go('habit', { id: 'acupuncture-migraine' }); return { note: $('.nt52.g')?.innerText || '', trk: $('.trk52p h3').innerText, how: $('.do52').innerText }; });
  ok('acupuncture is practitioner-led, with no home-needling instructions', /licensed practitioner/.test(ac.note) && /Migraine days/.test(ac.trk) && !/insert|needle yourself/i.test(ac.how), ac.note.slice(0, 80));
  await p.close();

  ok('no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  console.log(out.join('\n')); console.log(`\n${out.length - failed} passed, ${failed} failed`);
  fs.writeFileSync(path.join(ROOT, 'tests/r4-results.txt'), out.join('\n') + `\n\n${out.length - failed} passed, ${failed} failed\n`);
  await b.close(); process.exit(failed ? 1 : 0);
})();
