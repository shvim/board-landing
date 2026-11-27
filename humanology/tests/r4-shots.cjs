// Phone screenshots for revision 4. Usage: node tests/r4-shots.cjs <html> <outdir>
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const FILE = process.argv[2]; const OUT = path.resolve(ROOT, process.argv[3]); fs.mkdirSync(OUT, { recursive: true });
const waitArt = () => Promise.all([...document.querySelectorAll('.art')].map(el => { const u = getComputedStyle(el).backgroundImage; const a = u.indexOf('url('); if (a < 0) return; const src = u.slice(a + 4, u.indexOf(')', a)).replace(/["']/g, ''); return new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = src; }); }));
(async () => {
  const b = await chromium.launch();
  const shot = async (name, w, text, setup, full) => {
    const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.join(ROOT, FILE));
    await p.evaluate(t => { localStorage.clear(); const s = HM.scenario('new'); s.profile.onboarded = true; s.settings.text = t; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); }, text);
    await p.reload(); await p.waitForTimeout(300); await p.evaluate(setup); await p.waitForTimeout(500); await p.evaluate(waitArt); await p.waitForTimeout(300);
    if (full) { const h = await p.evaluate(() => (document.querySelector('#vp .scroll')?.scrollHeight || 800) + 140); await p.setViewportSize({ width: w, height: Math.min(h, 4200) }); await p.waitForTimeout(300); }
    await p.screenshot({ path: `${OUT}/${name}.png` }); await p.close();
  };
  const sizes = [[390, 'default'], [375, 'default'], [320, 'default'], [375, 'larger']];
  for (const id of ['apples', 'cyclic-sighing', 'standing-stockings', 'handgrip']) {
    for (const [w, t] of sizes) {
      const tag = `${w}${t === 'larger' ? '-large' : ''}`;
      await shot(`${id}-${tag}`, w, t, new Function(`go('habit', { id: '${id}' })`));
      if (w === 390) { await shot(`${id}-${tag}-full`, w, t, new Function(`go('habit', { id: '${id}' })`), true);
        await shot(`${id}-${tag}-research-open`, w, t, new Function(`go('habit', { id: '${id}' }); const d = document.querySelector('details.rs52r'); if (d) d.open = true;`), true); }
    }
  }
  if (FILE.includes('revised')) {
    for (const [w, t] of sizes) { const tag = `${w}${t === 'larger' ? '-large' : ''}`;
      await shot(`explore-shelf-${tag}`, w, t, () => tab('explore'));
      await shot(`safety-question-${tag}`, w, t, () => { go('habit', { id: 'salt-swap' }); setTimeout(() => A5['quick-add']({ dataset: { id: 'salt-swap' } }), 50); });
      await shot(`safety-answer-yes-${tag}`, w, t, () => { E52().q52 = { 'salt-swap': 'yes' }; E52().blocked.push('kidney_disease', 'potassium_raising_medication', 'potassium_restriction'); go('habit', { id: 'salt-swap' }); });
    }
    await shot('search-breathwork-390', 390, 'default', () => { tab('explore'); st.ui.explore.q = 'breathwork'; re(); });
    await shot('new-acupuncture-390-full', 390, 'default', () => go('habit', { id: 'acupuncture-migraine' }), true);
    await shot('new-humming-390-full', 390, 'default', () => go('habit', { id: 'humming' }), true);
  }
  await b.close(); console.log('done');
})();
