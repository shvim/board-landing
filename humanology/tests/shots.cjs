// Phone-size screenshots for review. Run: node tests/shots.cjs
const { chromium } = require('playwright'); const path = require('path');
const URL52 = 'file://' + path.resolve(__dirname, '../Humanology-5.2.html'); const OUT = path.resolve(__dirname, '../screenshots');
(async () => {
  const b = await chromium.launch();
  const shoot = async (w, name, setup, full = false) => {
    const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
    await p.goto(URL52); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('humanology-v52:state', JSON.stringify(HM.scenario('established'))); }); await p.reload(); await p.waitForTimeout(300);
    await p.evaluate(setup); await p.waitForTimeout(500);
    if (full) { const h = await p.evaluate(() => { const s = document.querySelector('#vp .scroll'); return s ? s.scrollHeight + 120 : 844; }); await p.setViewportSize({ width: w, height: Math.min(h, 4000) }); await p.waitForTimeout(300); }
    await p.screenshot({ path: `${OUT}/${name}.png` }); await p.close();
  };
  const onb = `F.onb = newOnb5(); F.onb.goals = ['heart','sleep']; F.onb.prefs.time = '10-20'; F.onb.prefs.effort = 'some';`;
  await shoot(390, '01-onboarding-goals', () => { F.onb = null; nav.stack = [{ r: 'welcome', p: {} }]; go('goals'); });
  await shoot(390, '02-onboarding-time', new Function(`${'F.onb = newOnb5(); F.onb.goals=["heart","sleep"]; nav.stack=[{r:"goals",p:{}}]; go("time");'}`));
  await shoot(390, '03-onboarding-activity', new Function('F.onb = newOnb5(); F.onb.goals=["heart","sleep"]; nav.stack=[{r:"goals",p:{}}]; go("effort");'));
  await shoot(390, '04-onboarding-recommendations', new Function(`st.plan.forEach(p=>p.removed=true); ${onb} nav.stack=[{r:"goals",p:{}}]; go("recset");`));
  await shoot(390, '05-onboarding-chosen', new Function(`st.plan.forEach(p=>p.removed=true); ${onb} F.onb.set = recSet(F.onb); F.onb.pick[F.onb.set[0].h.id]='add'; F.onb.pick[F.onb.set[2].h.id]='add'; nav.stack=[{r:"recset",p:{}}]; go("chosen");`));
  await shoot(390, '06-today', () => tab('today'), true);
  await shoot(390, '07-explore', () => tab('explore'));
  await shoot(390, '08-detail-walk-after-meals', () => go('habit', { id: 'walk-after-meals' }), true);
  await shoot(390, '09-detail-restricted-salt', () => go('habit', { id: 'salt-swap' }), true);
  await shoot(390, '10-research-details-drink-swap', () => go('science', { id: 'drink-swap' }), true);
  await shoot(390, '11-progress', () => go('progress'), true);
  await shoot(390, '12-health-rhr-month', () => { st.health.state = 'connected'; st.health.metrics = { sleep: true, steps: true, rhr: true }; st.health.readings = sampleHealth(); F.hv = 'month'; go('hmetric', { m: 'rhr' }); }, true);
  for (const w of [320, 375, 390]) {
    await shoot(w, `circles-trial-${w}`, () => go('circles52'), true);
    await shoot(w, `circles-in-context-${w}`, () => { E52().elig.kiwi = true; HM.addPlan(st, 'kiwi', null, { days: [0,1,2,3,4,5,6], cue: 'After lunch', mins: 0, start: st.today });
      for (const o of HM.todayDue(st)) HM.complete(st, o.oid); tab('today'); setTimeout(() => { const el = document.querySelector('.ds52'); el && el.scrollIntoView({ block: 'start' }); }, 50); });
  }
  await b.close(); console.log('shots done');
})();
