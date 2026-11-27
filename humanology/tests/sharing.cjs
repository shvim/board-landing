// Habit sharing and tracking, through the real interface. Run: node tests/sharing.cjs
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const URL = 'file://' + path.join(ROOT, 'Humanology-5.2-revised.html');
const SHOTS = path.join(ROOT, 'screenshots/sharing'); fs.mkdirSync(SHOTS, { recursive: true });
const out = []; let failed = 0; const ok = (n, c, d = '') => { out.push(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`); if (!c) failed++; };
/* share-menu stubs: 'ok' resolves, 'cancel' rejects like a dismissed iOS sheet, 'none' removes it; clipboard 'ok' or 'deny' */
const stub = (share, clip) => `(() => { window.__calls = []; window.__clip = [];
  ${share === 'none' ? "try { delete Navigator.prototype.share; } catch (e) {} Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });"
    : `Object.defineProperty(navigator, 'share', { configurable: true, value: d => { window.__calls.push(d); return ${share === 'ok' ? 'Promise.resolve()' : "Promise.reject(Object.assign(new Error('x'), { name: 'AbortError' }))"}; } });`}
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: t => { window.__clip.push(t); return ${clip === 'ok' ? 'Promise.resolve()' : "Promise.reject(new Error('denied'))"}; } } });
})()`;

(async () => {
  const b = await chromium.launch(); const errs = [];
  const open = async ({ w = 390, text = 'default', share = 'ok', clip = 'ok', scale = 1, keep = false } = {}) => {
    const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: scale });
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.addInitScript(stub(share, clip));
    await p.goto(URL);
    if (!keep) await p.evaluate(t => { localStorage.clear(); const s = HM.scenario('established'); s.settings.text = t; localStorage.setItem('humanology-v52:state', JSON.stringify(s)); }, text);
    await p.reload(); await p.waitForTimeout(250); return p; };
  const click = async (p, sel) => { await p.click(sel); await p.waitForTimeout(500); };   // the app ignores repeat taps within 450 ms
  const sheetTitle = p => p.evaluate(() => $('#sh-t')?.textContent || '');

  /* ---------- 1. sharing from the opened habit: apples ---------- */
  let p = await open({ scale: 2 });
  await p.evaluate(() => go('habit', { id: 'apples' })); await p.waitForTimeout(250);
  const top = await p.evaluate(() => { const r = $('.ttl52 .shb52').getBoundingClientRect(); return { top: r.top, bottom: r.bottom, h: r.height, vh: innerHeight, peach: getComputedStyle($('.ttl52 .shb52')).backgroundColor }; });
  ok('opened habit: peach Share habit is visible on first phone view', top.bottom < top.vh - 90 && top.h >= 43.5, JSON.stringify(top));
  ok('no redundant sharing entry lower on the page', await p.evaluate(() => !$('[data-act="together"]') && !$('.together5')));
  ok('science is folded under "What does the research say?"', await p.evaluate(() => { const d = $('details.rs52r'); return d && !d.open && /What does the research say/.test(d.querySelector('summary').textContent); }));
  ok('no copy telling you to get tested', await p.evaluate(() => !/lipid panel|get tested|retest|lab test|overdue/i.test($('#vp').innerText)));
  ok('audience pill and eligibility gate before adding', await p.evaluate(() => $('.aud52')?.textContent === 'For mildly raised cholesterol' && /Check it fits you/.test($('#vp .dock').textContent)));
  await p.screenshot({ path: `${SHOTS}/apple-habit-390.png` });
  await p.setViewportSize({ width: 390, height: 2300 }); await p.screenshot({ path: `${SHOTS}/apple-habit-390-full.png` }); await p.setViewportSize({ width: 390, height: 844 });
  await click(p, '.ttl52 .shb52');
  ok('Share opens a sheet labeled with the habit', (await sheetTitle(p)) === 'Eat two apples', await sheetTitle(p));
  await p.screenshot({ path: `${SHOTS}/share-sheet-390.png` });
  await click(p, '[data-act=share52-send]');
  const c1 = await p.evaluate(() => ({ calls: window.__calls, sheet: !!$('.sheet') }));
  ok('Share this habit sends the apples title and description through the share menu', c1.calls.length === 1 && c1.calls[0].title === 'Eat two apples' && /Slightly lower LDL/.test(c1.calls[0].text) && !c1.sheet, JSON.stringify(c1.calls[0]));
  /* invite path from the same habit */
  await click(p, '.ttl52 .shb52'); await click(p, '[data-act=share52-invite]');
  const inv = await p.evaluate(() => $('.sheet')?.innerText || '');
  ok('Invite opens the private challenge flow for the same habit, labeled as simulated', /Eat two apples/.test(inv) && /simulated/i.test(inv), inv.replace(/\s+/g, ' ').slice(0, 120));
  await p.fill('#cname', 'Apple pals'); await click(p, '[data-act=together-new]');
  const ch = await p.evaluate(() => { const c = st.social.circles.find(x => x.name === 'Apple pals'); return { r: nav.cur.r, hid: c?.challenges[0]?.hid, page: $('#vp').innerText }; });
  ok('the challenge carries the same habit', ch.hid === 'apples' && ch.r === 'invitelink' && /Eat two apples/.test(ch.page), JSON.stringify({ r: ch.r, hid: ch.hid }));
  await p.close();

  /* ---------- 2. sharing from Today → All my habits: a different habit ---------- */
  p = await open({ scale: 2 });
  await p.evaluate(() => document.querySelector('.mh52')?.scrollIntoView({ block: 'center' })); await p.waitForTimeout(150);
  await p.screenshot({ path: `${SHOTS}/all-my-habits-390.png` });
  const tiles = await p.evaluate(() => [...document.querySelectorAll('.mhw52')].filter(w => w.querySelector('.shb52')).map(w => { const a = w.querySelector('.mhc51').getBoundingClientRect(), s = w.querySelector('.shb52').getBoundingClientRect();
    return { id: w.querySelector('.shb52').dataset.id, label: w.querySelector('.shb52').getAttribute('aria-label'), open: w.querySelector('.mhc51').dataset.act, apart: s.top >= a.bottom, h: s.height }; }));
  ok('every habit in All my habits has its own Share, separate from opening it', tiles.length >= 3 && tiles.every(t => t.open === 'go' && t.apart && t.h >= 44 && t.label.startsWith('Share ')), tiles.map(t => t.label).join(', '));
  await click(p, '.mhw52 .shb52[data-id="walk-after-meals"]');
  ok('sheet is labeled with the chosen habit', (await sheetTitle(p)) === 'Walk after a meal');
  const pre = await p.evaluate(() => $('#sh52-text').innerText);
  ok('preview shows what the recipient gets, with nothing personal', /Walk after a meal/.test(pre) && !/Sam|mmHg|points|note|circle|Apple pals/i.test(pre), pre.replace(/\s+/g, ' '));
  await click(p, '[data-act=share52-send]');
  ok('recipient gets Walk after a meal', await p.evaluate(() => window.__calls.length === 1 && window.__calls[0].title === 'Walk after a meal' && !('url' in window.__calls[0])));
  await click(p, '.mhw52 .shb52[data-id="walk-after-meals"]'); await click(p, '[data-act=share52-invite]');
  await click(p, '.sheet [data-act=together-pick]');
  ok('invite from the list carries the same habit into an existing circle', await p.evaluate(() => nav.cur.r === 'invitelink' && st.social.circles.find(c => c.id === nav.cur.p.c).challenges.some(x => x.hid === 'walk-after-meals')));
  await p.close();

  /* ---------- 3. cancel and the copy fallback ---------- */
  p = await open({ share: 'cancel' });
  await click(p, '.mhw52 .shb52[data-id="walk-after-meals"]'); await click(p, '[data-act=share52-send]'); await p.waitForTimeout(300);
  const cn = await p.evaluate(() => ({ sheet: !!$('.sheet'), r: nav.cur.r, focus: document.activeElement?.dataset?.id, act: document.activeElement?.dataset?.act, toast: $('.toast')?.textContent }));
  ok('a canceled share returns to the same card', !cn.sheet && cn.r === 'today' && cn.focus === 'walk-after-meals' && cn.act === 'share52' && /Not shared/.test(cn.toast), JSON.stringify(cn));
  await p.close();
  p = await open({ share: 'none', clip: 'ok' });
  await p.evaluate(() => go('habit', { id: 'oats' })); await p.waitForTimeout(200);
  await click(p, '.ttl52 .shb52'); await click(p, '[data-act=share52-send]'); await p.waitForTimeout(200);
  ok('no share menu: copies the habit and confirms', await p.evaluate(() => window.__clip.length === 1 && /Oats with beta-glucan/.test(window.__clip[0]) && !$('.sheet') && /Copied/.test($('.toast').textContent)));
  await p.close();
  p = await open({ share: 'none', clip: 'deny' });
  await p.evaluate(() => go('habit', { id: 'oats' })); await p.waitForTimeout(200);
  await click(p, '.ttl52 .shb52'); await click(p, '[data-act=share52-send]'); await p.waitForTimeout(250);
  ok('copy blocked: shows the text selected to copy by hand', await p.evaluate(() => { const ta = $('#sh52-copy'); return !!ta && !ta.closest('[hidden]') && /Oats with beta-glucan/.test(ta.value) && document.activeElement === ta; }));
  await p.screenshot({ path: `${SHOTS}/share-copy-fallback-390.png` });
  await p.close();

  /* ---------- 4. long title and layout at 320 / 390 and larger text ---------- */
  for (const [w, t] of [[320, 'default'], [390, 'default'], [320, 'larger'], [390, 'larger']]) {
    p = await open({ w, text: t, scale: 2 });
    await p.evaluate(() => { E52().elig['neck-strength'] = true; E52().clear['neck-strength'] = true; go('habit', { id: 'neck-strength' }); }); await p.waitForTimeout(200);
    const g = await p.evaluate(() => { const h = $('.ttl52 h2').getBoundingClientRect(), s = $('.ttl52 .shb52').getBoundingClientRect(); return { own: s.top >= h.bottom, vis: s.bottom < innerHeight, ow: document.documentElement.scrollWidth <= innerWidth, h: s.height }; });
    ok(`long title at ${w}px${t === 'larger' ? ', larger text' : ''}: Share on its own line and reachable`, g.own && g.h >= 43.5 && g.ow && (t === 'larger' || g.vis), JSON.stringify(g));
    await p.screenshot({ path: `${SHOTS}/long-title-${w}${t === 'larger' ? '-large' : ''}.png` });
    await p.evaluate(() => tab('today')); await p.waitForTimeout(150); await p.evaluate(() => document.querySelector('.mh52')?.scrollIntoView({ block: 'center' })); await p.waitForTimeout(100);
    ok(`All my habits at ${w}px${t === 'larger' ? ', larger text' : ''}: no overflow`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await p.screenshot({ path: `${SHOTS}/all-my-habits-${w}${t === 'larger' ? '-large' : ''}.png` });
    await p.close();
  }

  /* ---------- 5. trackers: apples completion, then an earlier LDL result; visible from oats; on Today once ---------- */
  p = await open({ scale: 2 });
  await p.evaluate(() => go('habit', { id: 'apples' })); await p.waitForTimeout(200);
  await click(p, '#vp .dock [data-act=fit52]'); await p.check('input[data-fit52=ok]'); await click(p, '[data-act=fit52-save]');
  await click(p, '#vp .dock [data-act=quick-add]'); await p.evaluate(() => closeSheet(true));
  const pts0 = await p.evaluate(() => pts51());
  const oid = await p.evaluate(() => HM.occOn(st, st.today).find(o => o.hid === 'apples' && o.status === 'due')?.oid);
  await p.evaluate(o => { A.done({ dataset: { oid: o } }); }, oid); await p.waitForTimeout(300);
  const c0 = await p.evaluate(() => ({ pts: pts51(), ldl: (st.track52?.ldl || []).length }));
  ok('apples: completion alone saves no reading', c0.pts === pts0 + 1 && c0.ldl === 0, JSON.stringify(c0));
  await p.evaluate(() => go('habit', { id: 'apples' })); await p.waitForTimeout(200);
  ok('apples has a sage LDL cholesterol panel with Add a reading', await p.evaluate(() => /LDL cholesterol/.test($('.trk52p h3').textContent) && /Add a reading/.test($('.trk52p').textContent) && /Nothing saved yet/.test($('.trk52p').textContent)));
  await click(p, '[data-act=tk52-add][data-k=ldl]');
  await p.fill('#tk-v', '900'); await click(p, '[data-act=tk52-save]');
  ok('an impossible value is refused with a clear message', await p.evaluate(() => /between 20 and 400 mg\/dL/.test($('.tke52').textContent) && !(st.track52?.ldl || []).length));
  const earlier = await p.evaluate(() => HM.addDays(st.today, -12));
  await p.fill('#tk-v', '131'); await p.fill('#tk-d', earlier);
  await p.screenshot({ path: `${SHOTS}/ldl-entry-390.png` });
  await click(p, '[data-act=tk52-save]');
  const s1 = await p.evaluate(() => ({ pts: pts51(), status: HM.occOn(st, st.today).find(o => o.hid === 'apples').status, panel: $('.trk52p').innerText }));
  ok('saving an LDL result adds no points and changes no habit', s1.pts === pts0 + 1 && s1.status === 'done', JSON.stringify({ pts: s1.pts, status: s1.status }));
  ok('apples panel shows the value and date', /131\s*mg\/dL/.test(s1.panel) && /Nov/.test(s1.panel), s1.panel.replace(/\s+/g, ' ').slice(0, 80));
  await p.evaluate(() => { E52().elig.oats = true; go('habit', { id: 'oats' }); }); await p.waitForTimeout(200);
  ok('the same reading is visible from oats', await p.evaluate(() => /131\s*mg\/dL/.test($('.trk52p').innerText)));
  await p.evaluate(() => tab('today')); await p.waitForTimeout(200);
  const today = await p.evaluate(() => [...document.querySelectorAll('.hl51 .hr51')].filter(r => /LDL cholesterol/.test(r.textContent)).map(r => r.innerText.replace(/\s+/g, ' ')));
  ok('Today → Your health shows the LDL value and date once', today.length === 1 && /131\s*mg\/dL/.test(today[0]) && /Nov/.test(today[0]), today.join(' | '));
  await p.evaluate(() => document.querySelector('.hr52t')?.scrollIntoView({ block: 'center' })); await p.waitForTimeout(150);
  await p.screenshot({ path: `${SHOTS}/today-your-health-ldl-390.png` });
  await p.reload(); await p.waitForTimeout(300);
  ok('reading survives reload', await p.evaluate(() => /131\s*mg\/dL/.test($('.hr52t')?.innerText || '')));
  /* edit it to mmol/L; unit is kept */
  await click(p, '.hr52t'); await click(p, '[data-act=tk52-edit]');
  await click(p, '[data-act=tk52-unit][data-u="mmol/L"]'); await p.fill('#tk-v', '3.4'); await click(p, '[data-act=tk52-save]');
  const ed = await p.evaluate(() => ({ n: st.track52.ldl.length, e: st.track52.ldl[0], row: $('.hr52t').innerText }));
  ok('editing keeps one entry and preserves the chosen unit', ed.n === 1 && ed.e.value === 3.4 && ed.e.unit === 'mmol/L' && /3\.4\s*mmol\/L/.test(ed.row), JSON.stringify(ed.e));
  /* blood pressure: both numbers */
  await p.evaluate(() => { go('habit', { id: 'brisk-walking' }); }); await p.waitForTimeout(200);
  ok('brisk walking has a blood pressure tracker', await p.evaluate(() => /Blood pressure/.test($('.trk52p h3').textContent)));
  await click(p, '.trk52p [data-act=go][data-r=measform]'); await p.fill('#mf-sys', '122'); await p.fill('#mf-dia', '79'); await click(p, '[data-act=meas-save]');
  ok('blood pressure saves both numbers and shows them', await p.evaluate(() => /122\/79\s*mmHg/.test($('.trk52p')?.innerText || '')));
  /* mood: Nora's faces on a mood habit */
  await p.evaluate(() => go('habit', { id: 'three-good-things' })); await p.waitForTimeout(200);
  const mf = await p.evaluate(() => [...document.querySelectorAll('.trk52p .bust')].map(b => (getComputedStyle(b).backgroundImage.match(/mood\/(m\d)/) || [])[1]).join());
  ok("mood habit offers Nora's five faces", mf === 'm1,m2,m3,m4,m5', mf);
  await click(p, '.trk52p [data-act=mood51][data-v="4"]');
  ok('mood saves in one tap, no points added', await p.evaluate(p0 => todayMood51()?.mood === 4 && pts51() === p0 + 1, pts0));
  await p.close();

  /* ---------- 6. every one of the 56 habits has a tracker and no testing prompt ---------- */
  p = await open();
  const audit = await p.evaluate(() => C52.raw.cards.map(c => { go('habit', { id: c.card_id }); const t = $('.trk52p'); const txt = $('#vp').innerText;
    return { id: c.card_id, k: trackerOf52(H(c.card_id)), has: !!t, bad: /lipid panel|get tested|retest|DXA|overdue/i.test(txt), share: !!$('.ttl52 .shb52'), folded: !!$('details.rs52r:not([open])') }; }));
  ok('all 56 habits have a tracker panel', audit.every(a => a.has), audit.filter(a => !a.has).map(a => a.id).join(','));
  ok('all 56 habits have Share near the title and folded research', audit.every(a => a.share && a.folded));
  ok('no habit page tells you to get tested', audit.every(a => !a.bad), audit.filter(a => a.bad).map(a => a.id).join(','));
  const kinds = {}; audit.forEach(a => (kinds[a.k] = kinds[a.k] || []).push(a.id));
  fs.writeFileSync(path.join(ROOT, 'tests/tracker-audit.txt'), Object.entries(kinds).map(([k, ids]) => `${k} (${ids.length}): ${ids.join(', ')}`).join('\n') + '\n');
  await p.close();

  ok('no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  console.log(out.join('\n')); console.log(`\n${out.length - failed} passed, ${failed} failed`);
  fs.writeFileSync(path.join(ROOT, 'tests/sharing-results.txt'), out.join('\n') + `\n\n${out.length - failed} passed, ${failed} failed\n`);
  await b.close(); process.exit(failed ? 1 : 0);
})();
