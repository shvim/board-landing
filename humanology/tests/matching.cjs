// Exact-outcome matching and card fixes, exercised through the real interface. Run: node tests/matching.cjs
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const URL = 'file://' + path.join(ROOT, 'Humanology-5.2-revised.html');
const SHOTS = path.join(ROOT, 'screenshots/matching'); fs.mkdirSync(SHOTS, { recursive: true });
const out = []; let failed = 0; const ok = (n, c, d = '') => { out.push(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`); if (!c) failed++; };

(async () => {
  const b = await chromium.launch(); const errs = [];
  const page = async (w = 390, text = 'default', scale = 1) => { const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: scale }); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(URL); await p.evaluate(t => { localStorage.clear(); const s = HM.scenario('new'); s.settings.text = t; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); }, text); await p.reload(); await p.waitForTimeout(250); return p; };
  const click = async (p, sel) => { await p.click(sel); await p.waitForTimeout(350); };
  /* walks onboarding by tapping, exactly as a person would */
  const onboard = async (p, goals, refines, time, effort) => {
    await click(p, '[data-act=start]');
    for (const g of goals) await click(p, `[data-act=g5-pick][data-g=${g}]`);
    await click(p, '[data-act=g5-next]');
    for (const g of goals) { const r = refines[g]; if (r) await click(p, `[data-act=int5-pick][data-v=${r}]`); else await click(p, '[data-act=int5-skip]'); }
    await click(p, `[data-act=time5-pick][data-v="${time}"]`);
    if (effort) await click(p, `[data-act=eff5-pick][data-v=${effort}]`); else await click(p, '[data-act=eff5-skip]');
    await p.waitForTimeout(300);
  };
  const setInfo = p => p.evaluate(() => ({ r: nav.cur.r, ids: (F.onb?.set || []).map(x => x.h.id), cards: (F.onb?.set || []).map(x => ({ id: x.h.id, goals: x.mg, vid: x.vid, mins: x.mins, over: x.over, bens: x.shown.map(b => b.benefit_id) })),
    title: $('#vp h2')?.textContent, card: $('.dcard.cur')?.innerText || '' }));

  /* 1. Heart → Blood pressure → More effort, in the interface */
  let p = await page(390, 'default', 2);
  await onboard(p, ['heart'], { heart: 'bp' }, '20+', 'more');
  let s = await setInfo(p);
  ok('Heart → Blood pressure → More effort: brisk walking first', s.ids[0] === 'brisk-walking', s.ids.join(', '));
  ok('only cards with a published blood-pressure result appear (no oats, no filler)', s.ids.length >= 1 && !s.ids.includes('oats') && s.cards.every(c => c.bens.every(id => ['brisk-walking-1', 'brisk-walking-2', 'salt-swap-1', 'dash-1', 'dash-2', 'walking-breaks-1', 'handgrip-1'].includes(id))), JSON.stringify(s.cards.map(c => [c.id, c.bens])));
  ok('card shows the blood-pressure outcome, time and one evidence label', /Blood pressure/.test(s.card) && /30\s*min/.test(s.card) && /Strong evidence/.test(s.card) && !/Fitness/.test(s.card), s.card.replace(/\s+/g, ' ').slice(0, 120));
  ok('the evidence label is bound to the outcome for assistive tech', await p.evaluate(() => /Strong evidence for blood pressure/.test($('.dcard.cur .mt52')?.getAttribute('aria-label') || '')));
  await p.screenshot({ path: `${SHOTS}/bp-result-390.png` });
  await p.setViewportSize({ width: 390, height: 1500 }); await p.screenshot({ path: `${SHOTS}/bp-result-390-full.png` }); await p.setViewportSize({ width: 390, height: 844 });
  if (s.ids.length > 1) { await click(p, '[data-act=deck][data-d="1"]'); const c2 = await p.evaluate(() => $('.dcard.cur').innerText); await p.screenshot({ path: `${SHOTS}/bp-result-390-card2.png` });
    ok('second card names its own schedule-specific time', /min|Time not stated/.test(c2), c2.replace(/\s+/g, ' ').slice(0, 100)); }
  /* add the first, start, and check the plan keeps the matched schedule and time */
  await p.evaluate(() => { F.onb.ri = 0; re(); }); await click(p, '.dcard.cur [data-act=rec5-add]');
  await p.evaluate(() => go('chosen')); await p.waitForTimeout(200); await click(p, '[data-act=ch5-start]');
  const prof = await p.evaluate(() => ({ prefs: st.profile.prefs, refines: st.profile.refines, plan: st.plan.filter(x => !x.removed).map(x => [x.hid, x.mins]) }));
  ok('onboarding saves goal, refinement and activity', prof.refines.heart === 'bp' && prof.prefs.effort === 'more' && !prof.prefs.ability, JSON.stringify(prof.prefs));
  ok('plan keeps the matched time', prof.plan.some(([h, m]) => h === 'brisk-walking' && m === 30), JSON.stringify(prof.plan));

  /* 2. the dashboard uses the same matcher, with the saved profile */
  const dash = await p.evaluate(() => ({ ui: [...document.querySelectorAll('.sgc52 .sgadd52')].map(b => b.dataset.id), m: match52(matchProfile52(null)).map(x => x.id) }));
  ok('dashboard suggestions come from the same exact-outcome matcher', dash.ui.length > 0 && dash.ui.every((id, i) => id === dash.m[i]) && !dash.ui.includes('brisk-walking'), `${dash.ui.join(', ')}`);
  const dm = await p.evaluate(() => { const o = newOnb5(); o.goals = ['heart']; o.refines = { heart: 'bp' }; o.prefs.effort = 'more'; o.prefs.time = '20+'; return recSet(o).map(x => x.h.id); });
  ok('onboarding and dashboard agree for the same answers', dash.ui.every(id => dm.includes(id)), dm.join(', '));
  /* Not for me never adds; it survives reload; Add adds once */
  const first = dash.ui[0];
  await p.evaluate(() => document.querySelector('.sug52')?.scrollIntoView({ block: 'center' })); await p.waitForTimeout(150);
  await click(p, `.sgno52[data-id="${first}"]`);
  const d1 = await p.evaluate(id => ({ inPlan: st.plan.some(x => !x.removed && x.hid === id), shown: !!document.querySelector(`.sgc52 [data-id="${id}"]`), dismissed: E52().dismissed.includes(id) }), first);
  ok('Not for me hides the card and never adds the habit', !d1.inPlan && !d1.shown && d1.dismissed, JSON.stringify(d1));
  await p.reload(); await p.waitForTimeout(300);
  ok('dismissed stays dismissed after reload', await p.evaluate(id => !document.querySelector(`.sgc52 [data-id="${id}"]`) && E52().dismissed.includes(id), first));
  const nxt = await p.evaluate(() => document.querySelector('.sgadd52')?.dataset.id);
  if (nxt) { await p.evaluate(() => document.querySelector('.sug52')?.scrollIntoView({ block: 'center' })); await p.click(`.sgadd52[data-id="${nxt}"]`); await p.waitForTimeout(350); await p.evaluate(() => closeSheet(true));
    const a = await p.evaluate(id => ({ n: st.plan.filter(x => !x.removed && x.hid === id).length, shown: !!document.querySelector(`.sgc52 [data-id="${id}"]`) }), nxt);
    ok('Add puts the habit in the plan once and removes it from suggestions', a.n === 1 && !a.shown, `${nxt} ${JSON.stringify(a)}`); }
  await p.close();

  /* 3. cholesterol, unknown time, short time */
  p = await page(); await onboard(p, ['heart'], { heart: 'chol' }, 'null', null); s = await setInfo(p);
  ok('Heart → Cholesterol includes oats', s.ids.includes('oats'), s.ids.join(', '));
  ok('unknown duration is shown as not stated, not as fitting', s.cards.filter(c => c.mins == null).length > 0 && await p.evaluate(() => document.querySelector('.dcard.cur').innerText.includes('Time not stated') || F.onb.set.every(x => x.mins != null)));
  await p.close();
  p = await page(); await onboard(p, ['heart'], { heart: 'bp' }, 'u5', 'more'); s = await setInfo(p);
  ok('short time budget: over-budget matches are kept but flagged', s.cards.length > 0 && s.cards.every(c => c.mins == null || c.mins <= 4 || c.over), JSON.stringify(s.cards.map(c => [c.id, c.mins, c.over])));
  ok('over-budget flag is visible on the card', await p.evaluate(() => !F.onb.set[0].over || /Over your/.test($('.dcard.cur').innerText)));
  await p.close();
  p = await page(); await onboard(p, ['metabolic'], { metabolic: 'sugar' }, 'u5', null); s = await setInfo(p);
  const wam = s.cards.find(c => c.id === 'walk-after-meals');
  ok('a short budget picks a schedule that fits when one exists', !wam || wam.vid === 'walk-after-meals-1' || wam.over, JSON.stringify(wam));
  await p.close();

  /* 4. unsupported refinement: honest empty result and a way out */
  p = await page(); await onboard(p, ['sleep'], { sleep: 'regularity' }, '20+', null); s = await setInfo(p);
  ok('Sleep → Regularity shows an honest empty result', s.ids.length === 0 && /No exact match/.test(s.title), s.title);
  await p.screenshot({ path: `${SHOTS}/unsupported-refinement-390.png` });
  await click(p, '[data-act=m52-broaden]'); s = await setInfo(p);
  ok('Broaden the goal shows general sleep matches', s.ids.length > 0, s.ids.join(', '));
  await p.close();

  /* 5. two goals with different refinements: one match is enough; name only the matched goal(s) */
  p = await page(); await p.evaluate(() => { E52().elig.kiwi = true; persist(); }); await onboard(p, ['heart', 'digestion'], { heart: 'bp', digestion: 'regularity' }, '20+', null); s = await setInfo(p);
  const goalsOk = s.cards.every(c => c.goals.every(g => ['heart', 'digestion'].includes(g)) && c.bens.every(id => (c.goals.includes('heart') && ['brisk-walking-1', 'brisk-walking-2', 'salt-swap-1', 'dash-1', 'dash-2', 'walking-breaks-1', 'handgrip-1'].includes(id)) || (c.goals.includes('digestion') && ['kiwi-1', 'psyllium-2', 'prunes-1'].includes(id))));
  ok('two goals: each card names only the goal it matches', goalsOk && s.cards.some(c => c.goals.includes('digestion')) && s.cards.some(c => c.goals.includes('heart')), JSON.stringify(s.cards.map(c => [c.id, c.goals])));
  ok('no duplicate cards', new Set(s.ids).size === s.ids.length);
  await p.close();

  /* 6. seated, then More effort: the explicit movement answer replaces seated */
  p = await page(); await onboard(p, ['heart'], { heart: 'bp' }, '20+', 'seated'); s = await setInfo(p);
  ok('seated: only seated-compatible matches', s.cards.every(c => ['handgrip', 'oats', 'almonds'].includes(c.id) || false) || s.ids.length === 0, s.ids.join(', ') || 'none');
  await p.evaluate(() => { A['ans-edit']({ dataset: { s: 'effort' } }); }); await p.waitForTimeout(300); await click(p, '[data-act=eff5-pick][data-v=more]'); s = await setInfo(p);
  ok('changing to More effort re-evaluates', s.ids[0] === 'brisk-walking', s.ids.join(', '));
  await p.evaluate(() => { F.onb.pick[F.onb.set[0].h.id] = 'add'; startPlan(F.onb); });
  ok('saved profile drops the stale seated answer', await p.evaluate(() => st.profile.prefs.ability === null && st.profile.prefs.effort === 'more'));
  await p.close();

  /* 7. exclusions and clearance flow through the same gate */
  p = await page(); const ex = await p.evaluate(() => { const prof = { goals: ['heart'], refines: { heart: 'bp' }, effort: null, ability: null, time: null };
    const a = match52(prof).map(x => x.id); E52().elig['salt-swap'] = true; const b2 = match52(prof).map(x => x.id); E52().blocked.push('kidney_disease'); const c = match52(prof).map(x => x.id);
    E52().elig.handgrip = true; const d = match52({ ...prof, effort: 'more' }).map(x => x.id); E52().clear.handgrip = true; const e = match52({ ...prof, effort: 'more' }).map(x => x.id); return { a, b2, c, d, e }; });
  ok('restricted card needs confirmation; an exclusion removes it', !ex.a.includes('salt-swap') && ex.b2.includes('salt-swap') && !ex.c.includes('salt-swap'), JSON.stringify(ex));
  ok('clinician-clearance card needs clearance before matching', !ex.d.includes('handgrip') && ex.e.includes('handgrip'));
  await p.close();

  /* 8. migrated 5.1 profile */
  p = await b.newPage({ viewport: { width: 390, height: 844 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(ROOT, 'baseline/Humanology-5.1.html')); await p.evaluate(() => { localStorage.clear(); const s = HM.scenario('established'); s.profile.goals = ['metabolic']; s.profile.goal = 'metabolic'; delete s.profile.refines; s.profile.refine = 'sugar'; localStorage.setItem('humanology-v5:state', JSON.stringify(s)); });
  await p.goto(URL); await p.waitForTimeout(400);
  const mg = await p.evaluate(() => ({ prof: matchProfile52(null), ids: [...document.querySelectorAll('.sgadd52')].map(x => x.dataset.id), m: match52(matchProfile52(null)).map(x => [x.id, x.matchedGoals]) }));
  ok('migrated 5.1 profile uses its saved goal and refinement', mg.prof.refines.metabolic === 'sugar' && mg.m.length > 0 && mg.m.every(([id, g]) => g.join() === 'metabolic' && ['walk-after-meals', 'meal-order'].includes(id)), JSON.stringify(mg.prof) + ' ' + JSON.stringify(mg.m));
  await p.close();

  /* 9. Explore: time · evidence row, and none where it doesn't apply */
  p = await page(390, 'default', 2); await p.evaluate(() => { st.profile.onboarded = true; tab('explore'); }); await p.waitForTimeout(200);
  const xr = await p.evaluate(() => { const card = q => [...document.querySelectorAll('.xcard')].find(c => c.querySelector('h3')?.textContent === q);
    const r = q => card(q)?.querySelector('.mt52')?.textContent.replace(/\s+/g, ' ').trim() || '';
    return { brisk: r('Take a brisk walk'), salt: r('Swap to potassium salt'), drink: r('Swap soda for water'), dash: r('Eat DASH-style meals'), effort: document.querySelectorAll('.x52r .eff').length, n: document.querySelectorAll('.x52r .mt52').length }; });
  ok('Explore row: "30 min · Strong evidence" for brisk walking', /30\s*min\s*·\s*Strong evidence/.test(xr.brisk), xr.brisk);
  ok('no evidence cue on an unconfirmed preview or the research-only drink swap', !/evidence/i.test(xr.salt) && !/evidence/i.test(xr.drink), JSON.stringify([xr.salt, xr.drink]));
  ok('effort stays off browse cards', xr.effort === 0);
  await p.evaluate(() => { const c = [...document.querySelectorAll('.xcard')].find(c => c.querySelector('h3')?.textContent === 'Take a brisk walk'); c.scrollIntoView({ block: 'start' }); $('#vp .scroll').scrollTop -= 8; }); await p.waitForTimeout(200);
  await p.screenshot({ path: `${SHOTS}/explore-row-390.png` });
  await p.close();

  /* 10. dashboard controls: 44 px targets, ≥12 px apart, at 320/375/390 and larger text */
  for (const [w, t] of [[320, 'default'], [375, 'default'], [390, 'default'], [375, 'larger']]) {
    p = await page(w, t, 2);
    await p.evaluate(() => { const s = HM.scenario('established'); s.settings.text = st.settings.text; s.profile.goals = ['heart', 'sleep']; s.profile.refines = { heart: 'bp' }; s.profile.prefs.effort = 'some'; st = s; E52(); tab('today'); });
    await p.waitForTimeout(250);
    const g = await p.evaluate(() => [...document.querySelectorAll('.sgc52')].map(c => { const a = c.querySelector('.sgadd52').getBoundingClientRect(), n = c.querySelector('.sgno52').getBoundingClientRect(), r = c.getBoundingClientRect();
      const gap = a.bottom <= n.top ? n.top - a.bottom : n.left - a.right; return { ah: a.height, nh: n.height, aw: a.width, gap, lead: a.left <= n.left, inside: a.left >= r.left && n.right <= r.right + .5, h: r.height, top: r.top, bottom: r.bottom }; }));
    const sep = g.every((x, i) => !i || x.top >= g[i - 1].bottom);
    ok(`dashboard controls at ${w}px${t === 'larger' ? ', larger text' : ''}: 44 px targets, ≥12 px apart, Add leading`, g.length > 0 && g.every(x => x.ah >= 43.5 && x.nh >= 43.5 && x.aw >= 43.5 && x.gap >= 12 && x.lead && x.inside) && sep, g.map(x => `${Math.round(x.ah)}h gap ${Math.round(x.gap)}`).join('; '));
    ok(`no horizontal overflow at ${w}px${t === 'larger' ? ', larger text' : ''}`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await p.evaluate(() => document.querySelector('.sug52')?.scrollIntoView({ block: 'start' })); await p.evaluate(() => { $('#vp .scroll').scrollTop -= 12; }); await p.waitForTimeout(200);
    await p.screenshot({ path: `${SHOTS}/dashboard-controls-${w}${t === 'larger' ? '-large' : ''}.png` });
    /* keyboard: Tab reaches the card body, then Add, then Not for me */
    if (w === 390) { await p.focus('.sgb52'); await p.keyboard.press('Tab'); const f1 = await p.evaluate(() => document.activeElement.className); await p.keyboard.press('Tab'); const f2 = await p.evaluate(() => document.activeElement.className);
      ok('keyboard order: card, Add, Not for me', f1.includes('sgadd52') && f2.includes('sgno52'), `${f1} → ${f2}`); }
    await p.close();
  }
  ok('no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  console.log(out.join('\n')); console.log(`\n${out.length - failed} passed, ${failed} failed`);
  fs.writeFileSync(path.join(ROOT, 'tests/matching-results.txt'), out.join('\n') + `\n\n${out.length - failed} passed, ${failed} failed\n`);
  await b.close(); process.exit(failed ? 1 : 0);
})();
