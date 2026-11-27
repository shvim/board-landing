// Phone screenshots for art round 5. Usage: node tests/r5-shots.cjs <html> <outdir>
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const FILE = process.argv[2]; const OUT = path.resolve(ROOT, process.argv[3]); fs.mkdirSync(OUT, { recursive: true });
const waitArt = () => Promise.all([...document.querySelectorAll('.art,.rw52,.bust')].map(el => { const u = getComputedStyle(el).backgroundImage; const a = u.indexOf('url('); if (a < 0) return; const src = u.slice(a + 4, u.indexOf(')', a)).replace(/["']/g, ''); return new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = src; }); }));
(async () => {
  const b = await chromium.launch(); const errs = [];
  const shot = async (name, setup, full) => {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    p.on('console', m => { if (m.type() === 'error') errs.push(name + ': ' + m.text()); }); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto('file://' + path.join(ROOT, FILE));
    await p.evaluate(() => { localStorage.clear(); const s = HM.scenario('new'); s.profile.onboarded = true; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); });
    await p.reload(); await p.waitForTimeout(300); await p.evaluate(setup); await p.waitForTimeout(500); await p.evaluate(waitArt); await p.waitForTimeout(300);
    if (full) { const h = await p.evaluate(() => (document.querySelector('#vp .scroll')?.scrollHeight || 800) + 140); await p.setViewportSize({ width: 390, height: Math.min(h, 4200) }); await p.waitForTimeout(300); }
    await p.screenshot({ path: `${OUT}/${name}.png` }); await p.close();
  };
  await shot('onb-goals', () => go('goals'), true);
  await shot('onb-time', () => { if (!F.onb) F.onb = newOnb(); go('time'); });
  await shot('onb-activity', () => { if (!F.onb) F.onb = newOnb(); go('effort'); });
  await shot('rewards', () => go('rewards'));
  await shot('gift-categories', () => go('gift'));
  await shot('explore', () => go('explore'), true);
  for (const id of ['apples', 'stairs', 'acupuncture-migraine', 'water-premeal', 'volunteer']) await shot('habit-' + id, new Function(`go('habit', { id: '${id}' })`));
  await b.close(); console.log(errs.length ? 'ERRORS\n' + errs.join('\n') : 'no console errors');
})();
