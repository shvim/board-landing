// Phone-size comparison screenshots. Usage: node tests/redesign-shots.cjs <html file in humanology/> <out dir>
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const FILE = process.argv[2]; const OUT = path.resolve(ROOT, process.argv[3]); fs.mkdirSync(OUT, { recursive: true });
const URL = 'file://' + path.join(ROOT, FILE);
(async () => {
  const b = await chromium.launch();
  const shot = async (name, w, text, setup, opts = {}) => {
    const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
    await p.goto(URL); await p.evaluate(t => { localStorage.clear(); const s = HM.scenario('established'); s.settings.text = t; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); }, text);
    await p.reload(); await p.waitForTimeout(300); await p.evaluate(setup); await p.waitForTimeout(500);
    if (opts.full) { const h = await p.evaluate(() => (document.querySelector('#vp .scroll')?.scrollHeight || 800) + 140); await p.setViewportSize({ width: w, height: Math.min(h, 3600) }); await p.waitForTimeout(300); }
    if (opts.el) { const el = await p.$(opts.el); if (el) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(200); await el.screenshot({ path: `${OUT}/${name}.png` }); } }
    else await p.screenshot({ path: `${OUT}/${name}.png` });
    await p.close();
  };
  const sizes = [[320, 'default'], [375, 'default'], [390, 'default'], [375, 'larger']];
  const goals = () => { F.onb = null; nav.stack = [{ r: 'welcome', p: {} }]; go('goals'); };
  const rec = () => { st.plan.forEach(p => p.removed = true); F.onb = newOnb5(); F.onb.goals = ['heart', 'movement']; F.onb.prefs.time = '20+'; F.onb.prefs.effort = 'some'; nav.stack = [{ r: 'goals', p: {} }]; F.onb.set = recSet(F.onb); const i = F.onb.set.findIndex(x => (x.mg || []).length > 1); F.onb.ri = Math.max(0, i); go('recset'); };
  const explore = () => { tab('explore'); };
  const detail = () => go('habit', { id: 'walk-after-meals' });
  const detailOpen = () => { go('habit', { id: 'walk-after-meals' }); const d = document.querySelector('details.rs52r'); if (d) d.open = true; };
  const mood = () => { tab('today'); setTimeout(() => document.querySelector('.ms51')?.scrollIntoView({ block: 'center' }), 30); };
  const ci = () => { F.ci = null; go('checkin', {}); };
  for (const [w, t] of sizes) {
    const tag = `${w}${t === 'larger' ? '-large' : ''}`;
    await shot(`goals-${tag}`, w, t, goals);
    await shot(`recommendation-${tag}`, w, t, rec, { full: true });
    await shot(`explore-${tag}`, w, t, explore);
    await shot(`detail-${tag}`, w, t, detail, { full: true });
    await shot(`detail-research-open-${tag}`, w, t, detailOpen, { full: true });
    await shot(`today-checkin-${tag}`, w, t, mood);
    await shot(`checkin-page-${tag}`, w, t, ci);
    await shot(`today-top-${tag}`, w, t, () => tab('today'));
  }
  for (const [w, t] of [[375, 'default'], [375, 'larger']]) {
    const tag = `${w}${t === 'larger' ? '-large' : ''}`;
    await shot(`card-long-title-${tag}`, w, t, () => { tab('explore'); st.ui.explore.q = 'shoulder pain'; re(); }, { el: '.xcard' });
    await shot(`card-short-title-${tag}`, w, t, () => { tab('explore'); st.ui.explore.q = 'prunes'; re(); }, { el: '.xcard' });
  }
  await b.close(); console.log('done', OUT);
})();
