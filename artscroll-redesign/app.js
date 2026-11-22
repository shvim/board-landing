/* ArtScroll Digital Library: iPad redesign concept. Vanilla JS prototype. */
(() => {
  'use strict';

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ico = (n, cls = '') => `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const ribbonSvg = (cls = 'ribbon') => `<svg class="${cls}" viewBox="0 0 22 46" aria-hidden="true"><path d="M0 0h22v46l-11-8.5L0 46z"/></svg>`;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('as-proto') || '{}'); } catch (e) { return {}; } },
    set(v) { try { localStorage.setItem('as-proto', JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  // Hebrew numerals
  function gem(n, marks = true) {
    const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    const hund = ['', 'ק', 'ר', 'ש', 'ת'];
    let s = '', h = Math.floor(n / 100) % 10;
    while (h > 4) { s += 'ת'; h -= 4; }
    s += hund[h];
    const r = n % 100;
    if (r === 15) s += 'טו'; else if (r === 16) s += 'טז'; else s += tens[Math.floor(r / 10)] + ones[r % 10];
    if (!marks) return s;
    return s.length === 1 ? s + '׳' : s.slice(0, -1) + '״' + s.slice(-1);
  }
  const dafNum = d => parseInt(d, 10);
  const dafSide = d => d.slice(-1);
  const dafHeb = d => gem(dafNum(d), false) + (dafSide(d) === 'a' ? '.' : ':');

  const HEB_MONTH = { Tishri: 'תשרי', Heshvan: 'חשון', Kislev: 'כסלו', Tevet: 'טבת', Shevat: 'שבט', Adar: 'אדר', 'Adar I': 'אדר א׳', 'Adar II': 'אדר ב׳', Nisan: 'ניסן', Iyar: 'אייר', Sivan: 'סיון', Tamuz: 'תמוז', Av: 'אב', Elul: 'אלול' };
  function hebDate(date) {
    const p = {};
    new Intl.DateTimeFormat('en-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      .formatToParts(date).forEach(x => { p[x.type] = x.value; });
    const day = +p.day, year = +String(p.year || p.relatedYear).replace(/\D/g, '');
    return { day, month: p.month, year, heb: `${gem(day)} ${HEB_MONTH[p.month] || p.month} ${gem(year % 1000)}` };
  }

  // ---------- state ----------
  const ORDER = ['2a', '2b', '3a', '3b', '4a'];
  const SIZES = [0.88, 0.94, 1, 1.08, 1.17, 1.28];
  const saved = store.get();
  const S = Object.assign({
    screen: 'learn', libFilter: 'bavli', expanded: { library: false, tools: false }, tipSeen: false, commAll: false,
    theme: 'vellum', size: 2, layout: 'daf', showComm: true, wash: true, fn: true, keepLight: false,
    daf: '3a', seg: 0, insp: true, tab: 'translation', focus: false,
    place: { daf: '3a', seg: 0 },
    ribbons: ['3a'], bookmarks: [], userNotes: {}, hl: { '3a:1': 'sage', '3a:12': 'rose', '2a:0': 'heather' },
    edition: null, city: null, done: {}, plans: [], queued: [],
    misheberach: [{ name: 'יוסף', rel: 'בן', mother: 'שרה' }],
    stuffTab: 'notes', stuffTag: 'All', histMode: 'date',
    settings: { cellular: false, reminder: true, links: true, updates: true, beta: false, fnLoc: 'Below the line', keep: '30 days' }
  }, saved);
  Object.keys(S.hl).forEach(k => { if (S.hl[k] === 'ochre') S.hl[k] = 'heather'; });
  S.orient = 'landscape'; S.sbBrowse = true; S.sbReader = false; S.focus = false; S.loading = false;
  const persist = () => {
    const keep = ['tipSeen', 'expanded', 'theme', 'size', 'layout', 'showComm', 'wash', 'fn', 'keepLight', 'ribbons', 'bookmarks', 'userNotes', 'hl', 'edition', 'city', 'done', 'plans', 'misheberach', 'settings', 'place'];
    const o = {}; keep.forEach(k => { o[k] = S[k]; }); store.set(o);
  };

  // ---------- elements ----------
  const device = $('#device'), app = $('#app'), shell = $('#shell'), sidebar = $('#sidebar'),
    main = $('#main'), layer = $('#layer'), toastEl = $('#toast'), scrim = $('#scrim');
  let SCALE = 1;

  function fit() {
    const W = S.orient === 'portrait' ? 820 + 28 : 1180 + 28;
    const H = S.orient === 'portrait' ? 1180 + 28 : 820 + 28;
    const avW = Math.min(window.innerWidth - 32, 1400);
    const avH = Math.max(window.innerHeight - $('.stage-bar').offsetHeight - 40, 360);
    SCALE = Math.min(avW / W, avH / H, 1);
    if (window.innerWidth < 700) SCALE = Math.min(avW / W, 1);
    device.style.transform = `scale(${SCALE})`;
    $('#stage').style.height = (H * SCALE + 36) + 'px';
    device.style.marginRight = `${-(W * (1 - SCALE))}px`;
  }

  let toastT;
  function toast(msg, undo) {
    toastEl.innerHTML = '';
    const sp = document.createElement('span'); sp.textContent = msg; toastEl.appendChild(sp);
    if (undo) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Undo';
      b.addEventListener('click', ev => { ev.stopPropagation(); undo(); toastEl.classList.remove('show'); });
      toastEl.appendChild(b);
    }
    toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), undo ? 6000 : 2600);
  }

  // ---------- data ----------
  const DAF = window.DAF, TRANS = window.TRANS, NOTES = window.NOTES, SAMPLE = window.SAMPLE;
  const strip = s => s.replace(/<[^>]+>/g, '');
  const norm = s => s.replace(/[׳״"'().,:;\[\]\-–—]/g, ' ').replace(/\s+/g, ' ').trim();

  const anchorCache = {};
  function anchors(d) {
    if (anchorCache[d]) return anchorCache[d];
    const g = DAF[d].g.map(norm);
    const map = list => {
      let last = 0;
      return list.map(c => {
        const dh = norm(c.split(' - ')[0]).split(' ').slice(0, 2).join(' ');
        for (let i = last; i < g.length; i++) { if (dh && g[i].includes(dh)) { last = i; return i; } }
        for (let i = 0; i < last; i++) { if (dh && g[i].includes(dh)) return i; }
        return last;
      });
    };
    return (anchorCache[d] = { r: map(DAF[d].r), t: map(DAF[d].t) });
  }

  const BAVLI = [
    ['Zeraim', [['Berachos', 'ברכות']]],
    ['Moed', [['Shabbos', 'שבת'], ['Eruvin', 'עירובין'], ['Pesachim', 'פסחים'], ['Shekalim', 'שקלים'], ['Yoma', 'יומא'], ['Succah', 'סוכה'], ['Beitzah', 'ביצה'], ['Rosh Hashanah', 'ראש השנה'], ['Taanis', 'תענית'], ['Megillah', 'מגילה'], ['Moed Katan', 'מועד קטן'], ['Chagigah', 'חגיגה']]],
    ['Nashim', [['Yevamos', 'יבמות'], ['Kesubos', 'כתובות'], ['Nedarim', 'נדרים'], ['Nazir', 'נזיר'], ['Sotah', 'סוטה'], ['Gittin', 'גיטין'], ['Kiddushin', 'קידושין']]],
    ['Nezikin', [['Bava Kamma', 'בבא קמא'], ['Bava Metzia', 'בבא מציעא'], ['Bava Basra', 'בבא בתרא'], ['Sanhedrin', 'סנהדרין'], ['Makkos', 'מכות'], ['Shevuos', 'שבועות'], ['Avodah Zarah', 'עבודה זרה'], ['Horayos', 'הוריות']]],
    ['Kodashim', [['Zevachim', 'זבחים'], ['Menachos', 'מנחות'], ['Chullin', 'חולין'], ['Bechoros', 'בכורות'], ['Arachin', 'ערכין'], ['Temurah', 'תמורה'], ['Kereisos', 'כריתות'], ['Me’ilah', 'מעילה'], ['Kinnim, Tamid, Middos', 'קנים תמיד מדות']]],
    ['Taharos', [['Niddah', 'נדה']]]
  ];
  const LIB = {
    yerushalmi: [['Berachos', 'ברכות'], ['Peah', 'פאה'], ['Shabbos', 'שבת'], ['Kesubos', 'כתובות'], ['Nedarim', 'נדרים'], ['Sotah', 'סוטה']],
    mishnah: [['Seder Zeraim', 'סדר זרעים'], ['Seder Moed', 'סדר מועד'], ['Seder Nashim', 'סדר נשים'], ['Seder Nezikin', 'סדר נזיקין'], ['Seder Kodashim', 'סדר קדשים'], ['Seder Taharos', 'סדר טהרות']],
    chumash: [['Bereishis', 'בראשית'], ['Shemos', 'שמות'], ['Vayikra', 'ויקרא'], ['Bamidbar', 'במדבר'], ['Devarim', 'דברים']],
    kitzur: [['Kitzur Shulchan Aruch, Vol. 1', 'קיצור שולחן ערוך א'], ['Kitzur Shulchan Aruch, Vol. 2', 'קיצור שולחן ערוך ב'], ['Kitzur Shulchan Aruch, Vol. 3', 'קיצור שולחן ערוך ג']]
  };
  const DOWNLOADED = { Arachin: '412 MB', 'Kitzur Shulchan Aruch, Vol. 1': '96 MB' };
  const SHELF = [
    { t: 'Arachin', h: 'ערכין', v: 'Schottenstein Ed.', cls: '', go: () => openReader('3a') },
    { t: 'Kitzur Shulchan Aruch', h: 'קיצור שו״ע', v: 'Vol. 1', cls: 'dark', go: () => toast('Kitzur opens in the same reader. This prototype includes Arachin only.') },
    { t: 'Sefer Zera Shimshon', h: 'זרע שמשון', v: 'Vol. 1', cls: 'dark', go: () => toast('This prototype includes Arachin only.') },
    { t: 'Sefer Zera Shimshon', h: 'זרע שמשון', v: 'Vol. 2', cls: 'dark', go: () => toast('This prototype includes Arachin only.') },
    { t: 'Siddur', h: 'סידור', v: 'Wasserman Ed.', cls: '', go: () => go('siddur') }
  ];
  const TODAY = [
    { id: 'daf', k: 'Daf Yomi', t: 'Arachin 4', h: 'ערכין ד', open: () => openReader('4a') },
    { id: 'yer', k: 'Daf Yomi Yerushalmi', t: 'Kesubos 17', h: 'כתובות יז' },
    { id: 'mish', k: 'Mishnah Yomis', t: 'Negaim 2:2–3', h: 'נגעים ב:ב–ג' },
    { id: 'kitz', k: 'Kitzur Yomi', t: 'Siman 25:1 – 26:2', h: 'סימן כה:א – כו:ב' }
  ];
  const EDITIONS = [
    { id: 'ganz-a', t: 'Ganz Interlinear, Ashkenaz', s: 'Word-by-word English beneath the Hebrew' },
    { id: 'ganz-s', t: 'Ganz Interlinear, Sefard', s: 'Word-by-word English beneath the Hebrew' },
    { id: 'wass-a', t: 'Wasserman Edition, Ashkenaz', s: 'Hebrew with facing English' },
    { id: 'kest-s', t: 'Kest Edition, Sefard', s: 'Hebrew with facing English' }
  ];
  const CITIES = [
    { id: 'lkwd', n: 'Lakewood, NJ', lat: 40.0821, lon: -74.2097, tz: 'America/New_York' },
    { id: 'bkln', n: 'Brooklyn, NY', lat: 40.6501, lon: -73.9496, tz: 'America/New_York' },
    { id: 'jlm', n: 'Jerusalem', lat: 31.7683, lon: 35.2137, tz: 'Asia/Jerusalem' },
    { id: 'ldn', n: 'London', lat: 51.5072, lon: -0.1276, tz: 'Europe/London' },
    { id: 'tor', n: 'Toronto', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
    { id: 'la', n: 'Los Angeles', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' }
  ];

  // ---------- shell ----------
  const NAV = [
    { id: 'learn', label: 'Learn', icon: 'learn' },
    { id: 'library', label: 'Library', icon: 'library', kids: [['bavli', 'Talmud Bavli'], ['yerushalmi', 'Talmud Yerushalmi'], ['mishnah', 'Mishnah'], ['chumash', 'Chumash'], ['kitzur', 'Kitzur'], ['store', 'Store']] },
    { id: 'siddur', label: 'Siddur', icon: 'siddur' },
    { id: 'mystuff', label: 'My Stuff', icon: 'bookmark' },
    { id: 'tools', label: 'Tools', icon: 'tools', kids: [['zmanim', 'Zmanim'], ['luach', 'Luach'], ['mizrach', 'Mizrach'], ['misheberach', 'Misheberach'], ['verses', 'Verses for Names'], ['mirror', 'Tefillin Mirror']] }
  ];

  function isCurrent(id) {
    if (id === S.screen) return true;
    if (S.screen === 'library' && id === S.libFilter) return true;
    return false;
  }

  function renderSidebar() {
    let h = `<div class="sb-head"><div class="wordmark">ArtScroll<small>Digital Library</small></div>
      <button class="iconbtn" data-act="sb-toggle" aria-label="Hide sidebar" title="Hide sidebar">${ico('sidebar')}</button></div>
      <button class="sb-search" data-act="search">${ico('search', 'sm')}<span>Search, or go to a daf</span></button>
      <div class="sb-scroll">`;
    const kidOn = n => n.kids && n.kids.some(([id]) => isCurrent(id));
    NAV.forEach((n, ni) => {
      const exp = !!S.expanded[n.id];
      h += `<a class="sb-item" href="?screen=${n.id}" data-nav="${n.id}" ${n.kids ? `aria-expanded="${exp}"` : ''} ${(!n.kids && isCurrent(n.id)) || (n.kids && !exp && (kidOn(n) || isCurrent(n.id))) ? 'aria-current="page"' : ''}>
        ${ico(n.icon)}<span>${n.label}</span>${n.kids ? `<svg class="ico sm disclose" aria-hidden="true"><use href="#i-right"/></svg>` : ''}</a>`;
      if (n.kids && exp) {
        h += `<div class="sb-sub">` + n.kids.map(([id, l]) =>
          `<a class="sb-item" href="?screen=${id}" data-nav="${id}" ${isCurrent(id) ? 'aria-current="page"' : ''}>${l}</a>`).join('') + `</div>`;
      }
      if (ni === 0) {
        h += `<div class="sb-group-label">Pinned</div>
      <button class="sb-item sb-pin" data-act="open-daf" data-daf="${S.place.daf}" data-seg="${S.place.seg}" ${S.screen === 'reader' ? 'aria-current="page"' : ''}>${ico('ribbon')}<span>Arachin</span><span class="heb">ערכין</span></button>
      <button class="sb-item sb-pin" data-act="kitzur">${ico('ribbon')}<span>Kitzur, Vol. 1</span><span class="heb">קיצור</span></button>
      <div class="sb-group-label">Sections</div>`;
      }
    });
    h += `</div>
      <div class="sb-foot">
        <a class="sb-item" href="?screen=history" data-nav="history" ${isCurrent('history') ? 'aria-current="page"' : ''}>${ico('history')}<span>History</span></a>
        <a class="sb-item" href="?screen=settings" data-nav="settings" ${isCurrent('settings') ? 'aria-current="page"' : ''}>${ico('settings')}<span>Settings</span></a>
      </div>`;
    sidebar.innerHTML = h;
  }

  const overlayMode = () => S.screen === 'reader' || S.screen === 'mirror' || S.orient === 'portrait';
  function applyShell() {
    const ov = overlayMode();
    const hidden = ov ? !S.sbReader : !S.sbBrowse;
    shell.classList.toggle('sb-overlay', ov);
    shell.classList.toggle('sb-hidden', hidden);
    sidebar.inert = hidden;
  }

  function navbar(trailing = '', title = '') {
    const showToggle = overlayMode() || !S.sbBrowse;
    return `<div class="navbar">
      ${showToggle ? `<button class="iconbtn" data-act="sb-toggle" aria-label="Show sidebar" title="Show sidebar">${ico('sidebar')}</button>` : ''}
      ${title ? `<div class="nav-title">${title}</div>` : ''}
      <div class="grow"></div>${trailing}</div>`;
  }

  // ---------- routing ----------
  function go(id, opts = {}) {
    closeLayer();
    const libKids = ['bavli', 'yerushalmi', 'mishnah', 'chumash', 'kitzur'];
    if (libKids.includes(id)) { S.libFilter = id; id = 'library'; }
    S.screen = id;
    S.sbReader = false;
    Object.assign(S, opts);
    render();
    const sc = $('.scroll', main); if (sc) sc.scrollTop = 0;
  }

  function render() {
    app.dataset.theme = S.theme;
    app.dataset.screen = S.screen;
    app.dataset.wash = S.wash;
    app.dataset.fn = S.fn;
    app.dataset.keeplight = S.keepLight;
    app.style.setProperty('--tscale', SIZES[S.size]);
    renderSidebar();
    applyShell();
    const fn = SCREENS[S.screen] || SCREENS.learn;
    main.innerHTML = fn();
    after[S.screen] && after[S.screen]();
    persist();
    try {
      const q = new URLSearchParams();
      q.set('screen', S.screen === 'library' ? S.libFilter : S.screen);
      if (S.screen === 'reader') { q.set('daf', S.daf); q.set('layout', S.layout); }
      if (S.orient === 'portrait') q.set('orient', 'portrait');
      history.replaceState(null, '', '?' + q.toString());
    } catch (e) { /* file URLs in some browsers */ }
  }

  // ---------- screens ----------
  const SCREENS = {};
  const after = {};

  SCREENS.learn = () => {
    const now = new Date(Date.UTC(2026, 10, 22));
    const hd = hebDate(now);
    const p = S.place, t = TRANS[p.daf];
    const snippet = t ? strip(t[p.seg]).replace(/\s+\d$/, '') : '';
    const lead = DAF[p.daf].g[p.seg].split(' ').slice(0, 4).join(' ');
    const pct = ((dafNum(p.daf) - 2) * 2 + (dafSide(p.daf) === 'b' ? 1 : 0)) / 65;
    const doneCount = TODAY.filter(x => S.done[x.id]).length;
    return navbar() + `<div class="scroll"><div class="content">
      <h1 class="large-title">Learn</h1>
      <div class="dateline"><span>Motzaei Shabbos, November 21</span><span class="heb">${hd.heb}</span></div>

      <article class="resume" aria-label="Continue learning">
        ${ribbonSvg()}
        <div>
          <div class="resume-ref"><span>Arachin ${p.daf}</span><span class="heb">ערכין ${dafHeb(p.daf)}</span></div>
          <div class="resume-sub">Chapter One, Hakol Ma’arichin. You stopped at passage ${p.seg + 1} of ${DAF[p.daf].g.length}.</div>
        </div>
        <div></div>
        <p class="resume-quote"><span class="heb">${lead}</span> &nbsp;${esc(snippet.length > 170 ? snippet.slice(0, 168).replace(/\s\S*$/, '') + '…' : snippet)}</p>
        <div class="resume-foot">
          <button class="btn primary" data-act="resume">Resume Arachin ${p.daf}</button>
          <div class="progress"><span>Daf ${dafNum(p.daf)} of 34 in Arachin</span><div class="bar"><i style="width:${Math.max(4, pct * 100).toFixed(1)}%"></i></div></div>
          <div class="earlier">Also opened tonight <button class="link" data-act="open-daf" data-daf="3b">3b</button><button class="link" data-act="open-daf" data-daf="4a">4a</button></div>
        </div>
      </article>

      <div class="two-col">
        <section>
          <div class="section-row"><h2 class="section">Today</h2><span class="muted" style="font-size:15px">${doneCount} of ${TODAY.length} done</span></div>
          <div class="list">${TODAY.map(x => `
            <div class="row today-row ${S.done[x.id] ? 'done' : ''}">
              <button class="tick" role="checkbox" aria-checked="${!!S.done[x.id]}" aria-label="${x.k} done" data-act="tick" data-id="${x.id}">${ico('check')}</button>
              <button type="button" class="row-main" data-act="today" data-id="${x.id}"><span class="stack"><span class="t">${x.t}</span><span class="s">${x.k}</span></span>
              <span class="end"><span class="heb">${x.h}</span>${ico('right', 'sm chev')}</span></button>
            </div>`).join('')}</div>
        </section>
        <section>
          <h2 class="section">Learning plans</h2>
          ${S.plans.length ? `<div class="list">${S.plans.map(id => {
            const tpl = PLAN_TPL.find(x => x.id === id);
            return `<div class="row static"><span class="stack"><span class="t">${tpl.t}</span><span class="s">Today: ${tpl.today}</span></span><span class="end">Day 1</span></div>`;
          }).join('')}</div>` : `<p class="plan-intro">A plan sets a steady pace and puts each day’s portion here. Start from one of these, or build your own.</p>`}
          <div class="list" style="${S.plans.length ? 'border-top:0' : ''}">${PLAN_TPL.filter(x => !S.plans.includes(x.id)).map(x => `
            <div class="row static plan-row"><span class="stack"><span class="t">${x.t}</span><span class="s">${x.s}</span></span>
            <span class="end"><button class="btn secondary" data-act="plan" data-id="${x.id}">Start</button></span></div>`).join('')}</div>
          <button class="btn quiet" style="margin-top:6px" data-act="custom-plan">${ico('plus', 'sm')} Build your own plan</button>
        </section>
      </div>

      <div class="section-row"><h2 class="section">Recently downloaded</h2><button class="link" data-nav="bavli">Library</button></div>
      <div class="shelf">${SHELF.map((b, i) => `
        <button class="book" data-act="shelf" data-i="${i}">
          <span class="cover ${b.cls}"><span class="ct">${b.t}</span><span class="ch">${b.h}</span><span class="cv">${b.v}</span></span>
          <span class="bt">${b.t}</span><span class="bs">${b.v}</span>
        </button>`).join('')}</div>
    </div></div>`;
  };
  const PLAN_TPL = [
    { id: 'daf', t: 'Daf Yomi', s: 'One daf a day, with the worldwide cycle', today: 'Arachin 4' },
    { id: 'mish', t: 'Mishnah Yomis', s: 'Two mishnayos a day', today: 'Negaim 2:2–3' },
    { id: 'kitz', t: 'Kitzur Yomi', s: 'The daily Kitzur Shulchan Aruch portion', today: 'Siman 25:1 – 26:2' }
  ];

  // Library
  SCREENS.library = () => {
    const f = S.libFilter;
    const chips = [['bavli', 'Bavli'], ['yerushalmi', 'Yerushalmi'], ['mishnah', 'Mishnah'], ['chumash', 'Chumash'], ['kitzur', 'Kitzur']];
    const row = ([n, h], cls = '') => {
      const dl = DOWNLOADED[n];
      const q = S.queued.includes(n);
      return `<${dl ? 'button type="button"' : 'div'} class="row lib-row ${dl ? '' : 'static'}" ${dl ? `data-act="lib-open" data-name="${esc(n)}"` : ''}>
        <span class="cover ${cls}"></span>
        <span class="stack"><span class="t">${n}</span>${dl ? `<span class="s">On this iPad, ${dl}</span>` : q ? '<span class="s">Downloads when you reconnect</span>' : ''}</span>
        <span class="end"><span class="heb">${h}</span>
        ${dl ? ico('right', 'sm chev') : q ? `<button class="btn quiet dl-btn" data-act="unqueue" data-name="${esc(n)}">Cancel</button>` : `<button class="iconbtn" data-act="download" data-name="${esc(n)}" aria-label="Download ${esc(n)}" title="Download">${ico('download')}</button>`}</span></${dl ? 'button' : 'div'}>`;
    };
    let body = '';
    if (f === 'bavli') body = BAVLI.map(([seder, list]) => `<div class="date-head">Seder ${seder}</div><div class="list">${list.map(m => row(m)).join('')}</div>`).join('');
    else body = `<div class="list">${LIB[f].map(m => row(m, f === 'kitzur' ? 'dark' : '')).join('')}</div>`;
    const offlineNote = S.queued.length ? `<p class="footer-note">You’re offline. ${S.queued.length === 1 ? 'One volume is' : S.queued.length + ' volumes are'} queued and will download when you reconnect.</p>` : '';
    return navbar(`<button class="iconbtn" data-act="search" aria-label="Search">${ico('search')}</button>`) + `<div class="scroll"><div class="content">
      <h1 class="large-title">Library</h1>
      <div class="seg-wide" role="group" aria-label="Collection">${chips.map(([id, l]) => `<button data-nav="${id}" aria-pressed="${f === id}">${l}</button>`).join('')}</div>
      ${offlineNote}${body}
      <p class="footer-note">Every volume you own is listed. Tap the download arrow to keep one on this iPad; downloaded volumes open without a connection.</p>
    </div></div>`;
  };

  // Store (offline)
  SCREENS.store = () => navbar() + `<div class="scroll"><div class="content">
    <h1 class="large-title">Store</h1>
    <div style="height:18px"></div>
    <div class="offline-card">
      ${ico('offline', 'ico-lg')}
      <div>
        <h2 style="font-family:var(--display);font-weight:500;font-size:22px;margin:0 0 8px">You’re offline</h2>
        <p class="muted" style="margin:0 0 18px;line-height:1.5">Your downloaded volumes still open. The Store will load when this iPad reconnects to the internet.</p>
        <div class="empty actions" style="padding:0;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn primary" data-act="retry">Try again</button>
          <button class="btn secondary" data-nav="bavli">Open Library</button>
        </div>
        <p class="footer-note" id="retry-note"></p>
      </div>
    </div>
  </div></div>`;

  // Siddur
  SCREENS.siddur = () => {
    if (!S.edition) {
      S._pick = S._pick || 'wass-a';
      return navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
        <h1 class="large-title">Siddur</h1>
        <p class="muted" style="margin:4px 0 20px;font-size:16px;line-height:1.5">Which siddur do you daven from? We’ll open it every time. You can switch from the title inside the siddur.</p>
        <div class="list">${EDITIONS.map(e => `
          <div class="row radio-row" role="radio" tabindex="0" aria-checked="${S._pick === e.id}" data-act="pick-ed" data-id="${e.id}">
            <span class="radio"></span><span class="stack"><span class="t">${e.t}</span><span class="s">${e.s}</span></span></div>`).join('')}</div>
        <div style="margin-top:22px"><button class="btn primary" data-act="set-ed">Open siddur</button></div>
      </div></div>`;
    }
    const ed = EDITIONS.find(e => e.id === S.edition);
    const sec = (title, items) => `<div class="date-head">${title}</div><div class="list">${items.map(([t, h, now]) => `
      <button type="button" class="row" data-act="tefillah"><span class="stack"><span class="t">${t}</span>${now ? `<span class="now-tag">Now</span>` : ''}</span><span class="end"><span class="heb">${h}</span>${ico('right', 'sm chev')}</span></button>`).join('')}</div>`;
    return navbar(`<button class="edition-btn" data-act="edition-menu" aria-haspopup="true">${ed.t}${ico('down', 'sm')}</button>`) + `<div class="scroll"><div class="content" style="max-width:760px">
      <h1 class="large-title">Siddur</h1>
      <div class="dateline"><span>It’s after nightfall: Maariv for Sunday</span></div>
      ${sec('Weekday', [['Shacharis', 'שחרית'], ['Mincha', 'מנחה'], ['Maariv', 'מעריב', true]])}
      ${sec('Shabbos', [['Kabbalas Shabbos', 'קבלת שבת'], ['Shacharis', 'שחרית של שבת'], ['Mussaf', 'מוסף'], ['Havdalah', 'הבדלה']])}
      ${sec('Blessings and other prayers', [['Bircas Hamazon', 'ברכת המזון'], ['Al Hamichyah', 'ברכה מעין שלש'], ['Krias Shema at bedtime', 'קריאת שמע על המטה'], ['Tefillas Haderech', 'תפלת הדרך']])}
    </div></div>`;
  };

  // My Stuff
  SCREENS.mystuff = () => {
    const tabs = [['notes', 'Notes'], ['highlights', 'Highlights'], ['bookmarks', 'Bookmarks'], ['ribbons', 'Ribbons']];
    const q = (S.stuffQ || '').toLowerCase();
    let body = '';
    if (S.stuffTab === 'notes') {
      const mine = Object.entries(S.userNotes).map(([k, text]) => { const [daf, seg] = k.split(':'); return { daf, seg: +seg, text, tag: 'Mine', when: 'Just now' }; });
      const all = mine.concat(SAMPLE.myNotes);
      const tags = ['All', ...new Set(all.map(n => n.tag))];
      const list = all.filter(n => (S.stuffTag === 'All' || n.tag === S.stuffTag) && (!q || n.text.toLowerCase().includes(q)));
      body = `<div class="chips" role="group" aria-label="Filter by tag">${tags.map(t => `<button class="chip" data-act="stuff-tag" data-t="${t}" aria-pressed="${S.stuffTag === t}">${t}</button>`).join('')}</div>
        <div class="list">${list.map(n => `<button type="button" class="row" ${n.daf ? `data-act="open-daf" data-daf="${n.daf}" data-seg="${n.seg}"` : 'data-act="kitzur"'}>
          ${ico('note')}<span class="stack"><span class="t">${n.daf ? `Arachin ${n.daf}, passage ${n.seg + 1}` : n.ref}</span><span class="item-quote">${esc(n.text)}</span></span><span class="end">${n.when}</span></button>`).join('') || emptyInline('No notes match.')}</div>`;
    } else if (S.stuffTab === 'highlights') {
      const list = Object.entries(S.hl).map(([k, c]) => { const [daf, seg] = k.split(':'); return { daf, seg: +seg, c }; });
      body = list.length ? `<div class="list">${list.map(h => {
        const tr = TRANS[h.daf] ? strip(TRANS[h.daf][h.seg]).slice(0, 120) + '…' : DAF[h.daf].g[h.seg].split(' ').slice(0, 9).join(' ') + '…';
        return `<button type="button" class="row" data-act="open-daf" data-daf="${h.daf}" data-seg="${h.seg}"><span class="hl-dot" style="background:var(--hl-${h.c})"></span>
        <span class="stack"><span class="t">Arachin ${h.daf}, passage ${h.seg + 1}</span><span class="item-quote ${TRANS[h.daf] ? '' : 'heb'}" style="${TRANS[h.daf] ? '' : 'text-align:left'}">${esc(tr)}</span></span>${ico('right', 'sm chev')}</button>`;
      }).join('')}</div>` : emptyBlock('highlight', 'No highlights yet', 'Tap a passage in any daf, then choose a colour in the study panel’s Notes tab.');
    } else if (S.stuffTab === 'bookmarks') {
      body = S.bookmarks.length ? `<div class="list">${S.bookmarks.map(k => { const [daf, seg] = k.split(':'); return `<button type="button" class="row" data-act="open-daf" data-daf="${daf}" data-seg="${seg}">${ico('bookmark')}<span class="stack"><span class="t">Arachin ${daf}, passage ${+seg + 1}</span></span>${ico('right', 'sm chev')}</button>`; }).join('')}</div>`
        : emptyBlock('bookmark', 'No bookmarks yet', 'Bookmark a passage from the study panel’s Notes tab. Use the ribbon to keep your place in a whole volume.', `<button class="btn secondary" data-act="open-daf" data-daf="3a">Open Arachin 3a</button>`);
    } else {
      body = `<div class="list">${S.ribbons.map(d => `<button type="button" class="row" data-act="open-daf" data-daf="${d}">${ribbonSvg('ribbon')}<span class="stack"><span class="t">Arachin ${d}</span><span class="s">Chapter One</span></span><span class="end"><span class="heb">ערכין ${dafHeb(d)}</span>${ico('right', 'sm chev')}</span></button>`).join('')}
        <button type="button" class="row" data-act="kitzur">${ribbonSvg('ribbon')}<span class="stack"><span class="t">Kitzur Shulchan Aruch, Vol. 1</span><span class="s">Siman 2</span></span><span class="end"><span class="heb">סימן ב</span>${ico('right', 'sm chev')}</span></button></div>`;
    }
    return navbar() + `<div class="scroll"><div class="content" style="max-width:820px">
      <h1 class="large-title">My Stuff</h1>
      <div class="seg-wide" role="group" aria-label="Kind">${tabs.map(([id, l]) => `<button data-act="stuff-tab" data-t="${id}" aria-pressed="${S.stuffTab === id}">${l}</button>`).join('')}</div>
      ${S.stuffTab === 'notes' ? `<div class="searchbox">${ico('search', 'sm')}<input type="search" id="stuff-q" name="stuff-q" autocomplete="off" placeholder="Search your notes…" value="${esc(S.stuffQ || '')}" aria-label="Search your notes"></div>` : ''}
      ${body}
      <p class="footer-note">Saved on this iPad. Sign in from Settings to sync to your other devices.</p>
    </div></div>`;
  };
  const emptyInline = t => `<p class="muted" style="padding:18px 4px">${t}</p>`;
  const emptyBlock = (icon, h, p, act = '') => `<div class="empty">${ico(icon, 'ico-lg')}<h2>${h}</h2><p>${p}</p><div class="actions">${act}</div></div>`;

  // History
  SCREENS.history = () => {
    const q = (S.histQ || '').toLowerCase();
    const match = it => !q || (it.title + ' ' + (it.sub || '')).toLowerCase().includes(q);
    let body;
    if (S.histMode === 'date') {
      body = SAMPLE.history.map(g => {
        const items = g.items.filter(match);
        return items.length ? `<div class="date-head">${g.day}</div><div class="list">${items.map(histRow).join('')}</div>` : '';
      }).join('');
    } else {
      const all = SAMPLE.history.flatMap(g => g.items).filter(match);
      const byVol = {};
      all.forEach(it => { const v = it.daf ? 'Arachin' : 'Kitzur Shulchan Aruch, Vol. 1'; (byVol[v] = byVol[v] || []).push(it); });
      body = Object.entries(byVol).map(([v, items]) => `<div class="date-head">${v}</div><div class="list">${items.map(histRow).join('')}</div>`).join('');
    }
    return navbar() + `<div class="scroll"><div class="content" style="max-width:820px">
      <h1 class="large-title">History</h1>
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <div class="seg-wide" role="group" aria-label="Group by"><button data-act="hist-mode" data-m="date" aria-pressed="${S.histMode === 'date'}">By date</button><button data-act="hist-mode" data-m="vol" aria-pressed="${S.histMode === 'vol'}">By volume</button></div>
      </div>
      <div class="searchbox">${ico('search', 'sm')}<input type="search" id="hist-q" name="hist-q" autocomplete="off" placeholder="Search history…" value="${esc(S.histQ || '')}" aria-label="Search history"></div>
      ${body || emptyInline('Nothing in your history matches.')}
      <p class="footer-note">History syncs on its own when you’re online and signed in. Kept for ${S.settings.keep}; change that in Settings.</p>
    </div></div>`;
  };
  const histRow = it => `<button type="button" class="row" ${it.daf ? `data-act="open-daf" data-daf="${it.daf}"` : 'data-act="kitzur"'}>
    <span class="stack"><span class="t">${it.title}</span>${it.sub ? `<span class="s">${it.sub}</span>` : ''}</span>
    <span class="end"><span class="heb">${it.heb}</span><span style="min-width:64px;text-align:right">${it.t}</span>${ico('right', 'sm chev')}</span></button>`;

  // Settings
  SCREENS.settings = () => {
    const sw = (k, label, sub = '') => `<div class="g-row"><div class="toggle-row" style="flex:1"><span class="tl">${label}${sub ? `<small>${sub}</small>` : ''}</span><button class="switch" role="switch" aria-checked="${!!S.settings[k]}" aria-label="${label}" data-act="set-sw" data-k="${k}"></button></div></div>`;
    const ch = (label, val, act = '', k = '') => `<button class="g-row" data-act="${act}" data-k="${k}"><span>${label}</span><span class="val">${val}${ico('right', 'sm')}</span></button>`;
    const ed = S.edition ? EDITIONS.find(e => e.id === S.edition).t : 'Not chosen yet';
    return navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
      <h1 class="large-title">Settings</h1>
      <div class="g-head">Account</div>
      <div class="grouped">${ch('Sign in', 'Signed out', 'signin')}</div>
      <p class="g-foot">Signing in syncs notes, highlights, ribbons, plans and history between your devices. Everything works without it.</p>

      <div class="g-head">Reading</div>
      <div class="grouped">
        <div class="g-row"><span>Text size</span><span class="val sizer" style="gap:8px"><button data-act="size" data-d="-1" aria-label="Smaller text" style="font-size:15px">A</button><span style="min-width:48px;text-align:center;font-variant-numeric:tabular-nums">${Math.round(SIZES[S.size] * 100)}%</span><button data-act="size" data-d="1" aria-label="Larger text" style="font-size:22px">A</button></span></div>
        <div class="g-row"><span>Theme</span><span class="val seg-ctl" style="flex:none;min-width:300px">${[['vellum', 'Vellum'], ['parchment', 'Parchment'], ['lamplight', 'Lamplight']].map(([id, l]) => `<button data-act="theme" data-t="${id}" aria-pressed="${S.theme === id}">${l}</button>`).join('')}</span></div>
        ${ch('Layout and commentary', 'Aa / א in any book', 'open-display')}
        ${ch('Footnotes open', S.settings.fnLoc, 'cycle', 'fnLoc')}${sw('links', 'Links to other sefarim', 'Tap a reference to open it')}</div>
      <p class="g-foot">The same controls are in the Aa / א menu inside every book, where you can see the result as you change it.</p>

      <div class="g-head">Siddur</div>
      <div class="grouped">${ch('Edition', ed, 'nav-siddur')}</div>

      <div class="g-head">Learning plans</div>
      <div class="grouped">${sw('reminder', 'Daily reminder', 'At 8:30 PM, if today’s portion isn’t done')}</div>

      <div class="g-head">Downloads and storage</div>
      <div class="grouped">${ch('On this iPad', '2 volumes, 508 MB', 'nav-library')}${sw('cellular', 'Download over cellular')}</div>

      <div class="g-head">Advanced</div>
      <div class="grouped">${ch('Keep history for', S.settings.keep, 'cycle', 'keep')}${sw('updates', 'Check for updates automatically')}${sw('beta', 'Beta features', 'New features before they’re finished')}${ch('Language', 'Same as iPad', 'cycle-lang')}</div>

      <div class="g-head">About</div>
      <div class="grouped">${ch('Help and manual', '', 'about')}${ch('Contact support', '', 'about')}${ch('About the Digital Library', 'Version 10.0', 'about')}</div>
      <div style="height:30px"></div>
    </div></div>`;
  };

  // Zmanim
  function sunUT(date, lat, lon, zenith, rising) {
    const rad = Math.PI / 180;
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const N = Math.floor((date - start) / 864e5);
    const lngHour = lon / 15;
    const t = N + ((rising ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.020 * Math.sin(2 * M * rad) + 282.634;
    L = ((L % 360) + 360) % 360;
    let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
    RA = ((RA % 360) + 360) % 360;
    RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
    RA /= 15;
    const sinDec = 0.39782 * Math.sin(L * rad), cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null;
    let H = rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad;
    H /= 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = ((T - lngHour) % 24 + 24) % 24;
    const localSolar = UT + lngHour;
    if (localSolar < 0) UT += 24; else if (localSolar >= 24) UT -= 24;
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) + UT * 36e5);
  }
  function zmanim(city) {
    const d = new Date(Date.UTC(2026, 10, 22));
    const z = (zen, r) => sunUT(d, city.lat, city.lon, zen, r);
    const netz = z(90.833, true), shkia = z(90.833, false);
    const sz = (shkia - netz) / 12, add = (base, h) => new Date(+base + h * sz);
    const mgaStart = new Date(+netz - 72 * 6e4), mgaEnd = new Date(+shkia + 72 * 6e4), mgaSz = (mgaEnd - mgaStart) / 12;
    const fmt = x => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: city.tz }).format(x);
    return [
      ['Dawn', 'Alos HaShachar', z(106.1, true)],
      ['Earliest tallis and tefillin', 'Misheyakir', z(101.5, true)],
      ['Sunrise', 'Netz HaChamah', netz],
      ['Latest Shema', 'Magen Avraham', new Date(+mgaStart + 3 * mgaSz)],
      ['Latest Shema', 'Gra', add(netz, 3)],
      ['Latest Shacharis', 'Gra', add(netz, 4)],
      ['Midday', 'Chatzos', add(netz, 6)],
      ['Earliest Mincha', 'Mincha Gedolah', add(netz, 6.5)],
      ['Mincha Ketanah', '', add(netz, 9.5)],
      ['Plag HaMincha', '', add(netz, 10.75)],
      ['Sunset', 'Shkiah', shkia],
      ['Nightfall', 'Tzeis HaKochavim', z(98.5, false)]
    ].map(([a, b, t]) => [a, b, t ? fmt(t) : '—']);
  }
  SCREENS.zmanim = () => {
    if (!S.city) {
      return navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
        <h1 class="large-title">Zmanim</h1>
        <div class="empty" style="padding:18px 0 10px;max-width:560px">${ico('pin', 'ico-lg')}
          <h2>Zmanim depend on where you are</h2>
          <p>Allow location once, or choose a city below. Only Zmanim and Mizrach use your location, and it stays on this iPad.</p>
          <div class="actions"><button class="btn primary" data-act="use-loc">Use my location</button></div></div>
        <div class="date-head">Or choose a city</div>
        <div class="list">${CITIES.map(c => `<button type="button" class="row" data-act="city" data-id="${c.id}"><span class="stack"><span class="t">${c.n}</span></span>${ico('right', 'sm chev')}</button>`).join('')}</div>
      </div></div>`;
    }
    const city = CITIES.find(c => c.id === S.city);
    const rows = zmanim(city);
    return navbar(`<button class="btn quiet" data-act="change-city">Change location</button>`) + `<div class="scroll"><div class="content" style="max-width:720px">
      <h1 class="large-title">Zmanim</h1>
      <div class="dateline"><span>${city.n}${S.cityFromLoc ? ' (your location)' : ''}</span><span>Sunday, November 22</span><span class="heb">${hebDate(new Date(Date.UTC(2026, 10, 22))).heb}</span></div>
      <p class="muted" style="margin:-8px 0 16px;font-size:15px">It’s after nightfall, so these are tomorrow’s times.</p>
      <div class="list">${rows.map(([a, b, t]) => `<div class="row static z-row"><span class="stack"><span class="t">${a}</span>${b ? `<span class="s">${b}</span>` : ''}</span><span class="end">${t}</span></div>`).join('')}</div>
      <p class="footer-note">Dawn at 16.1° below the horizon, earliest tallis at 11.5°, nightfall at 8.5°. Magen Avraham counts the day from 72 minutes before sunrise to 72 minutes after sunset. Check with your rav for the customs of your community.</p>
    </div></div>`;
  };

  // Luach
  SCREENS.luach = () => {
    const days = [];
    for (let t = Date.UTC(2026, 10, 1); t <= Date.UTC(2026, 11, 31); t += 864e5) {
      const d = new Date(t), h = hebDate(d);
      if (h.month === 'Kislev') days.push({ d, h });
    }
    const first = days[0].d.getUTCDay();
    const len = days.length;
    const ev = h => {
      if (h.day === 1) return 'Rosh Chodesh';
      if (h.day === 30) return 'Rosh Chodesh, Chanukah';
      if (h.day === 24) return 'First candle tonight';
      if (h.day >= 25) return 'Chanukah';
      return '';
    };
    const gfmt = d => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(d);
    let cells = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Shabbos'].map(x => `<div class="dow">${x}</div>`).join('');
    for (let i = 0; i < first; i++) cells += `<div class="day out"></div>`;
    days.forEach(({ d, h }) => {
      const today = d.getUTCMonth() === 10 && d.getUTCDate() === 21;
      cells += `<div class="day ${today ? 'today' : ''}"><span class="hd">${gem(h.day, false)}</span><span class="gd">${gfmt(d)}</span><span class="ev">${ev(h)}</span></div>`;
    });
    const c24 = days.find(x => x.h.day === 24);
    const longF = d => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
    return navbar() + `<div class="scroll"><div class="content">
      <h1 class="large-title">Luach</h1>
      <div class="dateline"><span>Kislev 5787, ${len} days</span><span class="heb">כסלו ${gem(5787 % 1000)}</span></div>
      <div class="cal" role="grid" aria-label="Kislev 5787">${cells}</div>
      <div class="date-head">Coming up</div>
      <div class="list">
        <div class="row static"><span class="stack"><span class="t">Chanukah begins</span><span class="s">First candle on the night of ${longF(c24.d)}</span></span><span class="end"><span class="heb">כ״ה כסלו</span></span></div>
        <div class="row static"><span class="stack"><span class="t">Rosh Chodesh Teves</span><span class="s">During Chanukah</span></span><span class="end"><span class="heb">ראש חודש טבת</span></span></div>
      </div>
    </div></div>`;
  };

  // Mizrach
  SCREENS.mizrach = () => navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
    <h1 class="large-title">Mizrach</h1>
    <div class="dial-wrap">
      <div class="dial-word" id="mz-word">מזרח</div>
      <div class="dial">${dialSvg(S._heading || 210)}</div>
      <p class="muted" id="mz-msg" style="text-align:center;max-width:380px;line-height:1.5;margin:0">${S._motion ? 'Turn until the gold mark meets the arrow at the top.' : 'Mizrach uses the iPad’s compass. It needs motion access, which stays on this iPad.'}</p>
      ${S._motion ? '' : `<button class="btn primary" data-act="motion">Allow motion access</button>`}
    </div>
  </div></div>`;
  function dialSvg(heading) {
    // heading: direction the iPad faces, degrees. East target at 90 (approx. for the US East Coast toward Jerusalem it would be ~55; we use the prayer-direction bearing).
    const target = 55;
    const rot = -heading;
    let ticks = '';
    for (let a = 0; a < 360; a += 10) {
      const long = a % 30 === 0;
      ticks += `<line class="tickm" x1="160" y1="${long ? 34 : 40}" x2="160" y2="48" transform="rotate(${a} 160 160)"/>`;
    }
    const labels = `<g id="mz-labels">${compassLabels(heading)}</g>`;
    return `<svg viewBox="0 0 320 320" role="img" aria-label="Compass dial">
      <circle class="ring" cx="160" cy="160" r="128"/><circle class="ring" cx="160" cy="160" r="112"/>
      <g id="mz-rot" transform="rotate(${rot} 160 160)">${ticks}
        <path class="east" d="M160 14 l9 18 h-18z" transform="rotate(${target} 160 160)"/></g>
      ${labels}<path class="needle" d="M160 4 l11 22 h-22z"/>
      <circle cx="160" cy="160" r="3" fill="currentColor" style="color:var(--ink2)"/></svg>`;
  }

  function compassLabels(heading) {
    return [['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([l, a]) => {
      const r = (a - heading) * Math.PI / 180;
      return `<text x="${(160 + 92 * Math.sin(r)).toFixed(1)}" y="${(165 - 92 * Math.cos(r)).toFixed(1)}" text-anchor="middle">${l}</text>`;
    }).join('');
  }

  // Misheberach
  SCREENS.misheberach = () => navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
    <h1 class="large-title">Misheberach</h1>
    <p class="muted" style="margin:4px 0 20px;font-size:16px;line-height:1.5">Names you’re davening for. They appear in the Misheberach for the sick, in the siddur.</p>
    <div class="list">${S.misheberach.map((m, i) => `<div class="row static"><span class="stack"><span class="t heb" style="text-align:left;font-size:21px">${esc(m.name)} ${esc(m.rel)} ${esc(m.mother)}</span></span>
      <span class="end"><button class="iconbtn" data-act="mb-del" data-i="${i}" aria-label="Remove ${esc(m.name)}">${ico('trash')}</button></span></div>`).join('') || emptyInline('No names yet.')}</div>
    <div class="date-head">Add a name</div>
    <div style="display:grid;grid-template-columns:1fr 110px 1fr;gap:10px;direction:rtl">
      <input type="text" id="mb-name" name="mb-name" autocomplete="off" spellcheck="false" dir="rtl" placeholder="שם" aria-label="Name, in Hebrew" style="font-family:var(--heb);font-size:19px">
      <select id="mb-rel" aria-label="Son or daughter of" style="font:inherit;font-family:var(--heb);font-size:19px;border:1px solid var(--rule);border-radius:8px;background:var(--page);color:var(--ink);padding:0 8px;min-height:44px"><option>בן</option><option>בת</option></select>
      <input type="text" id="mb-mother" name="mb-mother" autocomplete="off" spellcheck="false" dir="rtl" placeholder="שם האם" aria-label="Mother's name, in Hebrew" style="font-family:var(--heb);font-size:19px">
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" data-act="mb-add">Add name</button></div>
    <div class="offline-card" style="margin-top:34px;padding:18px 20px">
      ${ico('person')}
      <div><h2 style="font-size:17px;font-weight:600;margin:0 0 4px">Keep this list on your other devices</h2>
      <p class="muted" style="margin:0 0 12px;line-height:1.45;font-size:15px">The list works on this iPad without an account. Sign in to sync it to your other devices or share it with family.</p>
      <button class="btn secondary" data-act="signin">Sign in</button></div>
    </div>
  </div></div>`;

  // Verses for names
  SCREENS.verses = () => navbar() + `<div class="scroll"><div class="content" style="max-width:720px">
    <h1 class="large-title">Verses for Names</h1>
    <p class="muted" style="margin:4px 0 18px;font-size:16px;line-height:1.5">Many say a verse at the end of Shemoneh Esrei that begins with the first letter of their name and ends with its last letter.</p>
    <input type="text" id="vn" name="vn" autocomplete="off" spellcheck="false" dir="rtl" placeholder="הקלד שם" aria-label="Name, in Hebrew" style="font-family:var(--heb);font-size:22px;max-width:360px">
    <div id="vn-out">${emptyBlock('quote', 'Type a name in Hebrew', 'Matching verses appear here, with the sefer and perek.')}</div>
  </div></div>`;

  // Tefillin mirror (functional camera view, full screen inside main)
  SCREENS.mirror = () => `<div class="mirror">
    <div class="m-bar"><button class="iconbtn" data-act="mirror-close" aria-label="Close Tefillin Mirror">${ico('close')}</button>
      <span style="font-weight:600">Tefillin Mirror</span>
      <button class="iconbtn" data-act="mirror-guides" aria-pressed="${S._guides !== false}" aria-label="Show guide lines">${ico('flip')}</button></div>
    <div class="m-view" id="m-view">
      ${S._cam ? '' : `<div class="m-explain">${ico('camera', 'ico-lg')}<h3>Center the shel rosh</h3>
        <p>The front camera works as a mirror, with a line down the middle so you can line up the tefillin with the center of your head. Nothing is recorded or saved.</p>
        <button class="btn primary" data-act="cam">Turn on camera</button></div>`}
    </div></div>`;
  after.mirror = () => {
    if (!S._cam) return;
    const v = $('#m-view');
    v.innerHTML = `<video id="cam" autoplay playsinline muted></video>${S._guides !== false ? '<span class="guide" style="left:42%"></span><span class="guide mid" style="left:50%"></span><span class="guide" style="left:58%"></span>' : ''}`;
    if (S._stream) { $('#cam').srcObject = S._stream; return; }
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }) : Promise.reject())
      .then(st => { S._stream = st; const c = $('#cam'); if (c) c.srcObject = st; })
      .catch(() => {
        const n = document.createElement('div'); n.className = 'm-explain';
        n.innerHTML = `<p>The camera isn’t available in this preview. On iPad, the live mirror fills this space with the guide lines over it.</p>`;
        v.appendChild(n);
      });
  };
  function stopCam() { if (S._stream) { S._stream.getTracks().forEach(t => t.stop()); S._stream = null; } S._cam = false; }

  // ---------- reader ----------
  function openReader(d, seg = 0, opts = {}) {
    if (!DAF[d]) { toast(`Arachin ${d} isn’t part of this prototype.`); return; }
    S.daf = d; S.seg = seg; S.focus = false;
    S.place = { daf: d, seg };
    if (S.orient === 'portrait' && !opts.keepInsp) S.insp = false;
    Object.assign(S, opts);
    S.loading = true;
    go('reader');
    clearTimeout(S._lt);
    S._lt = setTimeout(() => { S.loading = false; if (S.screen === 'reader') { renderReaderPanes(); } }, opts.holdLoading ? 2600 : 380);
  }

  SCREENS.reader = () => {
    const d = S.daf, i = ORDER.indexOf(d);
    const next = ORDER[i + 1], prev = ORDER[i - 1];
    return `<div class="reader ${S.focus ? 'focus' : ''} ${S.insp ? '' : 'no-insp'}" id="reader">
      <div class="reader-main">
        <div class="rtool" role="toolbar" aria-label="Reader">
          <div class="group">
            <button class="iconbtn" data-act="sb-toggle" aria-label="Show sidebar" title="Sidebar">${ico('sidebar')}</button>
            <button class="iconbtn" data-act="toc" aria-label="Contents" title="Contents">${ico('list')}</button>
          </div>
          <div class="center">
            <button class="iconbtn turn" data-act="turn" data-daf="${next || ''}" ${next ? '' : 'disabled'} aria-label="Next daf${next ? ', ' + next : ''}" title="Next daf (the book turns right to left)">${ico('left', 'sm')}<span>${next || ''}</span></button>
            <button class="daf-title" data-act="toc" aria-label="Arachin ${d}, open contents"><b>Arachin ${d}</b><span class="heb">ערכין ${dafHeb(d)}</span></button>
            <button class="iconbtn turn" data-act="turn" data-daf="${prev || ''}" ${prev ? '' : 'disabled'} aria-label="Previous daf${prev ? ', ' + prev : ''}" title="Previous daf"><span>${prev || ''}</span>${ico('right', 'sm')}</button>
          </div>
          <div class="group" style="margin-left:auto">
            <button class="iconbtn" data-act="display" aria-label="Display: theme, size, layout" title="Display"><span class="aa">Aa<i>א</i></span></button>
            <button class="iconbtn" data-act="search" aria-label="Search" title="Search">${ico('search')}</button>
            <button class="iconbtn" data-act="insp" aria-pressed="${S.insp}" aria-label="${S.insp ? 'Hide' : 'Show'} study panel" title="Translation, notes and commentary">${ico('inspector')}</button>
          </div>
        </div>
        <button class="restore" data-act="restore">Arachin ${d}. Tap to show controls</button>
        <div class="pane-wrap" id="panes"></div>
      </div>
      <aside class="inspector ${S.inspFull ? 'full' : ''}" id="insp" aria-label="Study panel">
        <button class="grabber" data-act="grab" aria-label="Resize sheet"></button>
        <div class="insp-tabs"><div class="seg-ctl" role="tablist">${[['translation', 'Translation'], ['notes', 'Notes'], ['commentary', 'Commentary']].map(([id, l]) =>
          `<button role="tab" aria-selected="${S.tab === id}" data-act="tab" data-t="${id}">${l}</button>`).join('')}</div>
          ${S.orient === 'portrait' ? `<button class="iconbtn" data-act="insp" aria-label="Close">${ico('close')}</button>` : ''}</div>
        <div class="insp-body" id="insp-body"></div>
      </aside>
    </div>`;
  };
  after.reader = () => { renderReaderPanes(); };

  function dafPage(d) {
    const g = DAF[d].g, r = DAF[d].r, t = DAF[d].t, an = anchors(d);
    const segs = g.map((s, i) => {
      const words = s.split(' ');
      const leadN = /^(הכל|מתני|גמ)/.test(s) ? 2 : 0;
      const txt = leadN ? `<span class="lead">${words.slice(0, leadN).join(' ')}</span> ${words.slice(leadN).join(' ')}` : s;
      const hl = S.hl[`${d}:${i}`];
      return `<span class="seg ${i === S.seg ? 'active' : ''} ${hl ? 'hl-' + hl : ''}" data-seg="${i}" tabindex="0" role="button" aria-label="Passage ${i + 1}">${txt}</span> `;
    }).join('');
    const comm = (list, key) => list.map((c, j) => {
      const [dh, ...rest] = c.split(' - ');
      return `<span class="c ${an[key][j] === S.seg ? 'linked' : ''}" data-k="${key}" data-j="${j}">${rest.length ? `<span class="dh">${dh}</span> ${rest.join(' - ')}` : dh}</span> `;
    }).join('');
    const rashiCol = `<div class="daf-col"><h4>רש״י</h4><div class="comm">${comm(r, 'r')}</div></div>`;
    const tosCol = `<div class="daf-col"><h4>תוספות</h4><div class="comm">${comm(t, 't')}</div></div>`;
    // Rashi sits on the inner margin: the right side on an amud aleph, the left on an amud beis (grid is RTL).
    const cols = !S.showComm ? `<div class="daf-col"><div class="gemara">${segs}</div></div>`
      : dafSide(d) === 'a' ? rashiCol + `<div class="daf-col"><h4>גמרא</h4><div class="gemara">${segs}</div></div>` + tosCol
        : tosCol + `<div class="daf-col"><h4>גמרא</h4><div class="gemara">${segs}</div></div>` + rashiCol;
    const rib = S.ribbons.includes(d);
    return `${tipHTML()}<div class="daf-outer"><div class="daf-page">
      <button class="daf-ribbon" data-act="ribbon" aria-pressed="${rib}" aria-label="${rib ? 'Remove ribbon from' : 'Place ribbon at'} Arachin ${d}" title="Ribbon">${ribbonSvg()}</button>
      <div class="daf-head"><span class="pg">${dafHeb(d)}</span><span class="hd">הכל מעריכין פרק ראשון ערכין</span><span class="vol"></span></div>
      <div class="daf-grid ${S.showComm ? '' : 'no-comm'}">${cols}</div>
      ${dafEnd(d)}
    </div></div>`;
  }
  function tipHTML() {
    if (S.tipSeen) return '';
    return `<div class="tip" role="note"><span><b>Tap any passage</b> to see its translation, notes and Rashi and Tosafos. Tap the margin to hide the controls; tap again or press Esc to bring them back.</span><button class="btn secondary" data-act="tip-ok">Got it</button></div>`;
  }
  function dafEnd(d) {
    const i = ORDER.indexOf(d), next = ORDER[i + 1];
    const today = dafNum(d) === 4;
    return `<div class="daf-end"><span><strong>End of Arachin ${d}</strong>${today ? (S.done.daf ? 'Today’s Daf Yomi is marked done.' : 'This is today’s Daf Yomi.') : ''}</span>
      <span style="display:flex;gap:10px;flex-wrap:wrap">${today && !S.done.daf ? `<button class="btn primary" data-act="finish-daf">Mark Daf Yomi done</button>` : ''}
      ${next ? `<button class="btn ${today && !S.done.daf ? 'secondary' : 'primary'}" data-act="turn" data-daf="${next}">Continue to ${next}</button>` : ''}</span></div>`;
  }
  function skeleton() {
    const lines = n => { let l = ''; for (let i = 0; i < n; i++) l += `<div class="line ${i % 6 === 5 ? 'short' : ''}"></div>`; return l; };
    return `<div class="daf-outer"><div class="daf-page skel" aria-busy="true"><div class="daf-grid"><div>${lines(14)}</div><div>${lines(22)}</div><div>${lines(14)}</div></div>
      <p class="skel-note">Opening Arachin ${S.daf}</p></div></div>`;
  }
  function flowEN(d) {
    const tr = TRANS[d];
    if (!tr) return `<div class="missing"><p style="font-family:var(--display);font-size:22px;color:var(--ink);margin:0 0 8px">Arachin ${d}</p>This prototype includes the English for Arachin 3a only. In the app, every daf in a downloaded volume has its translation here.</div>`;
    return `<div class="flow"><div class="flow-head"><span>Hakol Ma’arichin, Chapter One</span><span>Arachin ${d}</span></div>
      ${tr.map((s, i) => { const hl = S.hl[`${d}:${i}`]; return `<p class="tseg ${i === S.seg ? 'active' : ''}" data-seg="${i}" tabindex="0" style="${hl && i !== S.seg ? `background:var(--hl-${hl})` : ''}"><span class="heb lead" lang="he">${DAF[d].g[i].split(' ').slice(0, 4).join(' ')}</span>${s}</p>`; }).join('')}${dafEnd(d)}</div>`;
  }
  function flowHE(d) {
    return `<div class="hebflow" lang="he">${DAF[d].g.map((s, i) => `<p class="${i === S.seg ? 'active' : ''}" data-seg="${i}">${s}</p>`).join('')}</div>`;
  }

  function renderReaderPanes() {
    const p = $('#panes'); if (!p) return;
    const d = S.daf;
    if (S.loading) { p.innerHTML = `<div class="pane">${skeleton()}</div>`; renderInspector(); return; }
    if (S.layout === 'daf') p.innerHTML = `<div class="pane" id="pane-a">${dafPage(d)}</div>`;
    else if (S.layout === 'translation') p.innerHTML = `<div class="pane" id="pane-a">${flowEN(d)}</div>`;
    else if (S.layout === 'hebrew') p.innerHTML = `<div class="pane" id="pane-a">${flowHE(d)}</div>`;
    else p.innerHTML = `<div class="pane" id="pane-a" style="flex:1.1">${dafPage(d)}</div><div class="pane" id="pane-b">${flowEN(d)}</div>`;
    if (S.layout === 'side') $$('.daf-page', p).forEach(x => { x.style.setProperty('--t', 'calc(var(--tscale, 1) * .9)'); x.style.padding = '20px 16px'; });
    renderInspector();
    requestAnimationFrame(() => scrollToActive(false));
  }

  function renderInspector() {
    const b = $('#insp-body'); if (!b) return;
    const d = S.daf, i = S.seg, g = DAF[d].g;
    const ref = `<div class="insp-ref"><span>Arachin ${d}, passage ${i + 1} of ${g.length}</span>
      <span><button class="iconbtn" data-act="seg-step" data-dir="-1" aria-label="Previous passage" ${i === 0 ? 'disabled' : ''}>${ico('left', 'sm')}</button><button class="iconbtn" data-act="seg-step" data-dir="1" aria-label="Next passage" ${i === g.length - 1 ? 'disabled' : ''}>${ico('right', 'sm')}</button></span></div>`;
    if (S.loading) { b.innerHTML = `<div class="skel"><div class="line"></div><div class="line"></div><div class="line short"></div></div>`; return; }
    if (S.tab === 'translation') {
      const tr = TRANS[d];
      b.innerHTML = ref + `<p class="insp-heb" lang="he">${g[i]}</p>` +
        (tr ? `<p class="insp-en">${tr[i]}</p>${tr[i + 1] ? `<div class="insp-next"><div class="cm-label">Next passage</div><p class="tseg" data-seg="${i + 1}" style="margin:0">${tr[i + 1]}</p></div>` : ''}`
          : `<p class="muted" style="line-height:1.5">This prototype includes the English for Arachin 3a only. <button class="link" data-act="open-daf" data-daf="3a" style="min-height:0;padding:0">Open 3a</button></p>`);
    } else if (S.tab === 'notes') {
      const k = `${d}:${i}`, cur = S.hl[k] || '';
      const note = NOTES[d] && NOTES[d][i];
      const bm = S.bookmarks.includes(k);
      b.innerHTML = ref + `<div class="cm-label">Highlight this passage</div>
        <div class="swatches" role="group" aria-label="Highlight colour">
          <button class="swatch none" data-act="hl" data-c="" aria-pressed="${!cur}" aria-label="No highlight">${ico('close', 'sm')}</button>
          ${['heather', 'sage', 'rose', 'slate'].map(c => `<button class="swatch" style="background:var(--hl-${c})" data-act="hl" data-c="${c}" aria-pressed="${cur === c}" aria-label="${c[0].toUpperCase() + c.slice(1)} highlight" title="${c[0].toUpperCase() + c.slice(1)}"></button>`).join('')}
          <button class="btn quiet" style="margin-left:auto" data-act="bookmark" aria-pressed="${bm}">${ico('bookmark', 'sm')} ${bm ? 'Bookmarked' : 'Bookmark'}</button>
        </div>
        <div class="cm-label">Notes on this passage</div>
        ${note ? `<p class="fn"><span class="n">${Object.keys(NOTES[d]).indexOf(String(i)) + 1}</span>${note}</p>` : `<p class="muted" style="font-size:15px;line-height:1.5;margin:0 0 8px">No printed notes on this passage.${NOTES[d] ? ' Passages with notes have a small number in the English.' : ''}</p>`}
        <div class="mynote"><label for="mynote">Your note</label>
          <textarea id="mynote" name="note" placeholder="Write a note on this passage…">${esc(S.userNotes[k] || '')}</textarea>
          <div class="saved-state" id="saved-state" aria-live="polite">${S.userNotes[k] ? 'Saved to My Stuff' : 'Notes save as you type.'}</div></div>`;
    } else {
      const an = anchors(d);
      const rs = DAF[d].r.map((c, j) => [c, an.r[j]]).filter(x => x[1] === i);
      const ts = DAF[d].t.map((c, j) => [c, an.t[j]]).filter(x => x[1] === i);
      const cm = c => { const [dh, ...rest] = c.split(' - '); return `<p class="cm" lang="he">${rest.length ? `<span class="dh">${dh}</span> – ${rest.join(' - ')}` : dh}</p>`; };
      if (S.commAll) {
        const all = (list, key) => list.map((c, j) => `<div class="cm-label">Passage ${an[key][j] + 1}</div>${cm(c)}`).join('');
        b.innerHTML = `<div class="insp-ref"><span>All Rashi and Tosafos on Arachin ${d}</span><button class="btn quiet" data-act="comm-all">This passage</button></div>
          <h3 class="cm-label" style="font-size:15px;color:var(--ink)">Rashi</h3>${all(DAF[d].r, 'r')}<h3 class="cm-label" style="font-size:15px;color:var(--ink)">Tosafos</h3>${all(DAF[d].t, 't')}`;
        return;
      }
      const none = who => `<p class="muted" style="font-size:15px;line-height:1.5">No ${who} is matched to this passage. Matching is by the opening words, so check the full column.</p>`;
      b.innerHTML = ref + `<div class="cm-label">Rashi</div>${rs.length ? rs.map(x => cm(x[0])).join('') : none('Rashi')}
        <div class="cm-label">Tosafos</div>${ts.length ? ts.map(x => cm(x[0])).join('') : none('Tosafos')}
        <button class="btn secondary" style="margin-top:8px" data-act="comm-all">Show all Rashi and Tosafos on this daf</button>`;
    }
  }

  function setSeg(i, opts = {}) {
    const d = S.daf; const n = DAF[d].g.length;
    i = Math.max(0, Math.min(n - 1, i));
    S.seg = i; S.place = { daf: d, seg: i };
    const an = anchors(d);
    $$('#panes [data-seg]').forEach(el => el.classList.toggle('active', +el.dataset.seg === i));
    $$('#panes .c').forEach(el => el.classList.toggle('linked', an[el.dataset.k][+el.dataset.j] === i));
    if (opts.tab) S.tab = opts.tab;
    let opened = false;
    if (S.orient === 'portrait' && !S.insp) { opened = true; S.insp = true; $('#reader').classList.remove('no-insp'); $$('#reader [data-act="insp"]').forEach(x => x.setAttribute('aria-pressed', 'true')); }
    $$('#insp [data-act="tab"]').forEach(x => x.setAttribute('aria-selected', x.dataset.t === S.tab));
    renderInspector();
    scrollToActive(true, opened ? null : opts.from);
    persist();
  }
  function scrollToActive(smooth, fromPane) {
    $$('#panes .pane').forEach(p => {
      if (fromPane && p.contains(fromPane)) return;
      const el = $(`[data-seg="${S.seg}"].active, .tseg.active, .hebflow p.active`, p) || $(`[data-seg="${S.seg}"]`, p);
      if (!el) return;
      const pr = p.getBoundingClientRect(), er = el.getBoundingClientRect();
      const visBottom = S.orient === 'portrait' && S.insp ? pr.top + pr.height * 0.5 : pr.bottom;
      if (er.top < pr.top + 60 || er.bottom > visBottom - 40) {
        const top = p.scrollTop + (er.top - pr.top) / SCALE - p.clientHeight / 3;
        p.scrollTo({ top, behavior: smooth && !reduceMotion() ? 'smooth' : 'auto' });
      }
    });
  }

  // ---------- popovers ----------
  let lastFocus = null;
  function closeLayer() {
    if (!layer.innerHTML) return;
    layer.innerHTML = '';
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    lastFocus = null;
  }
  function focusDialog() {
    const d = $('[role="dialog"]', layer); if (!d) return;
    const f = $('[aria-current="true"], [aria-pressed="true"], input, button:not([data-act="close-layer"]), [tabindex="0"]', d) || d;
    f.focus({ preventScroll: false });
  }
  function anchorPos(el, w) {
    const ar = app.getBoundingClientRect(), r = el.getBoundingClientRect();
    let left = (r.right - ar.left) / SCALE - w;
    left = Math.max(12, Math.min(left, app.clientWidth - w - 12));
    if ((r.left - ar.left) / SCALE < app.clientWidth / 3) left = Math.max(12, (r.left - ar.left) / SCALE);
    return { left, top: (r.bottom - ar.top) / SCALE + 6 };
  }
  function popover(el, html, w = 360, cls = '') {
    const p = anchorPos(el, w);
    lastFocus = el;
    layer.innerHTML = `<div class="pop-scrim" data-act="close-layer"></div><div class="popover ${cls}" role="dialog" aria-modal="true" tabindex="-1" style="left:${p.left}px;top:${p.top}px;width:${w}px">${html}</div>`;
    focusDialog();
  }
  function sheet(title, html, w = 560) {
    lastFocus = document.activeElement;
    layer.innerHTML = `<div class="pop-scrim dim" data-act="close-layer"></div><div class="sheet" role="dialog" aria-modal="true" tabindex="-1" aria-label="${title}" style="width:${w}px">
      <div class="sheet-head"><h3>${title}</h3><button class="iconbtn" data-act="close-layer" aria-label="Close">${ico('close')}</button></div>
      <div class="sheet-body">${html}</div></div>`;
    focusDialog();
  }

  function refreshDisplay() {
    const pop = $('.popover', layer);
    if (pop) { pop.innerHTML = displayHTML(); focusDialog(); } else render();
  }
  function displayHTML() {
    const t = S.theme;
    return `<div class="pop-sec"><div class="pop-label">Theme</div><div class="themes">
      ${[['vellum', 'Vellum'], ['parchment', 'Parchment'], ['lamplight', 'Lamplight']].map(([id, l]) => `<button class="theme-chip ${id}" data-act="theme" data-t="${id}" aria-pressed="${t === id}">${l}</button>`).join('')}</div></div>
      <div class="pop-sec"><div class="pop-label"><span>Text size</span><span>${Math.round(SIZES[S.size] * 100)}%</span></div><div class="sizer">
        <button data-act="size" data-d="-1" aria-label="Smaller text" style="font-size:15px">A</button>
        <div class="dots">${SIZES.map((_, i) => `<i class="${i <= S.size ? 'on' : ''}"></i>`).join('')}</div>
        <button data-act="size" data-d="1" aria-label="Larger text" style="font-size:22px">A</button></div></div>
      <div class="pop-sec"><div class="pop-label">Layout</div><div class="seg-ctl" role="group" aria-label="Layout">
        ${[['daf', 'Daf'], ['translation', 'English'], ['side', 'Side by side'], ['hebrew', 'Hebrew']].map(([id, l]) => `<button data-act="layout" data-l="${id}" aria-pressed="${S.layout === id}">${l}</button>`).join('')}</div></div>
      <div class="pop-sec">
        ${tog('showComm', 'Rashi and Tosafos on the daf')}
        ${tog('wash', 'Shade the passage you’re on', 'Follows you across the daf, the English and the study panel')}
        ${tog('fn', 'Footnote numbers in the English')}
        ${S.theme === 'lamplight' ? tog('keepLight', 'Keep the daf light', 'For learning from the page at night') : ''}
      </div>
      <div class="pop-sec" style="padding:4px 8px"><button class="link" data-act="nav-settings" style="width:100%;text-align:left;padding:8px">More in Settings</button></div>`;
  }
  const tog = (k, l, sub = '') => `<div class="toggle-row"><span class="tl">${l}${sub ? `<small>${sub}</small>` : ''}</span><button class="switch" role="switch" aria-checked="${!!S[k]}" aria-label="${l}" data-act="pref" data-k="${k}"></button></div>`;

  function tocHTML() {
    const chs = [
      ['Chapter One', 'הכל מעריכין', 2, 7, '7b'],
      ['Chapter Two', 'אין נערכין', 7, 13, '13b'],
      ['Chapter Three', 'יש בערכין', 13, 15, null]
    ];
    const rows = (from, to, end, startB) => {
      const out = [];
      for (let n = from; n <= to; n++) ['a', 'b'].forEach(s => {
        const d = `${n}${s}`;
        if (n === from && s === 'a' && startB) return;
        if (end && d > end && n === to) return;
        out.push(d);
      });
      return out;
    };
    let h = `<p class="toc-dedic">Dedicated by the Levine family, in memory of their parents. The dedication appears here and on the volume’s first page only.</p>`;
    chs.forEach(([en, he, a, b, end], ci) => {
      const list = rows(a, b, end, ci > 0);
      h += `<div class="toc-ch"><span>${en}</span><span class="heb">${he}</span></div><div class="list">` + list.map(d => {
        const cur = d === S.daf, has = !!DAF[d], rib = S.ribbons.includes(d);
        return `<button type="button" class="row toc-row" ${cur ? 'aria-current="true"' : ''} data-act="toc-go" data-daf="${d}">
          <span class="stack"><span class="t">${d}</span></span>
          <span class="end">${rib ? ribbonSvg() : ''}${cur ? '<span class="curmark">Reading</span>' : ''}${has ? '' : '<span style="font-size:13px">not in prototype</span>'}<span class="heb">${dafHeb(d)}</span></span></button>`;
      }).join('') + `</div>`;
    });
    h += `<div class="toc-ch"><span>Chapters Four to Nine</span><span class="heb">השג יד – המוכר שדהו</span></div>`;
    return h;
  }

  function searchHTML(q = '') {
    return `<div class="searchbox" style="margin-top:0">${ico('search', 'sm')}<input type="search" id="sq" name="q" autocomplete="off" value="${esc(q)}" placeholder="Try “Arachin 4a”, “Megillah” or “נשים”…" aria-label="Search"></div><div id="sres">${searchResults(q)}</div>`;
  }
  function searchResults(q) {
    q = q.trim();
    if (!q) return `<p class="muted" style="font-size:15px;line-height:1.5">Type a tractate and daf to go straight there, or search the text of the volumes on this iPad.</p>`;
    const out = [];
    const m = q.match(/^(arachin|arakhin|erchin|ערכין)\s*(\d{1,2})\s*([ab.:])?/i);
    if (m) {
      const n = +m[2]; const s = m[3] && /[b:]/i.test(m[3]) ? 'b' : 'a';
      out.push(`<button type="button" class="row" data-act="search-go" data-daf="${n}${s}">${ico('learn')}<span class="stack"><span class="t">Go to Arachin ${n}${s}</span><span class="s">${DAF[`${n}${s}`] ? 'Opens in the reader' : 'Not in this prototype'}</span></span>${ico('right', 'sm chev')}</button>`);
    } else {
      const ms = q.match(/^([a-z' ]+?)\s+(\d{1,3})\s*([ab])?$/i);
      if (ms) out.push(`<div class="row static">${ico('download')}<span class="stack"><span class="t">${esc(ms[1].replace(/\b\w/g, c => c.toUpperCase()))} ${ms[2]}${ms[3] || ''}</span><span class="s">That volume isn’t on this iPad. Download it from the Library when you’re online.</span></span></div>`);
    }
    const ql = q.toLowerCase(), qn = norm(q);
    ORDER.forEach(d => {
      DAF[d].g.forEach((s, i) => {
        const en = TRANS[d] ? strip(TRANS[d][i]) : '';
        let hit = '';
        if (qn.length > 1 && norm(s).includes(qn)) hit = `<span class="heb" style="text-align:left;display:block;font-size:18px">${s.slice(0, 90)}…</span>`;
        else if (en && ql.length > 2 && en.toLowerCase().includes(ql)) {
          const at = en.toLowerCase().indexOf(ql); const a = Math.max(0, at - 50);
          hit = `${a ? '…' : ''}${esc(en.slice(a, at))}<mark style="background:var(--wash);color:inherit">${esc(en.slice(at, at + q.length))}</mark>${esc(en.slice(at + q.length, at + q.length + 70))}…`;
        }
        if (hit && out.length < 14) out.push(`<button type="button" class="row" data-act="search-go" data-daf="${d}" data-seg="${i}"><span class="stack"><span class="t">Arachin ${d}, passage ${i + 1}</span><span class="item-quote">${hit}</span></span>${ico('right', 'sm chev')}</button>`);
      });
    });
    return out.length ? `<div class="list">${out.join('')}</div>` : `<p class="muted" style="font-size:15px">No matches in the volumes on this iPad.</p>`;
  }

  // ---------- events ----------
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-act], [data-nav]');
    const readerEl = e.target.closest('#reader');

    // reader page taps
    if (readerEl && !t) {
      const seg = e.target.closest('#panes [data-seg]');
      const c = e.target.closest('#panes .c');
      if (seg) { setSeg(+seg.dataset.seg, { from: seg }); return; }
      if (c) { const an = anchors(S.daf); setSeg(an[c.dataset.k][+c.dataset.j], { tab: 'commentary', from: c }); return; }
      if (e.target.closest('#panes')) { S.focus = !S.focus; $('#reader').classList.toggle('focus', S.focus); return; }
      if (e.target.closest('.inspector')) {
        const ts = e.target.closest('.tseg[data-seg]'); if (ts) setSeg(+ts.dataset.seg);
      }
      return;
    }
    if (!t) return;

    if (t.dataset.nav) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      const id = t.dataset.nav;
      const n = NAV.find(x => x.id === id);
      if (n && n.kids) {
        const open = !S.expanded[id];
        S.expanded[id] = open;
        if (open) { if (S.screen === 'mirror') stopCam(); go(id === 'library' ? 'library' : 'zmanim'); } else renderSidebar();
        return;
      }
      if (S.screen === 'mirror') stopCam();
      go(id);
      return;
    }

    const a = t.dataset.act;
    switch (a) {
      case 'sb-toggle':
        if (S.screen === 'reader') S.sbReader = !S.sbReader; else S.sbBrowse = !S.sbBrowse;
        if (S.screen === 'reader') applyShell(); else render();
        break;
      case 'search': sheet('Search', searchHTML(), 600); setTimeout(() => { const i = $('#sq'); i && i.focus(); }, 30); break;
      case 'search-go': closeLayer(); openReader(t.dataset.daf, +(t.dataset.seg || 0), { tab: 'translation', insp: true }); break;
      case 'close-layer': closeLayer(); break;
      case 'resume': openReader(S.place.daf, S.place.seg, { insp: S.orient === 'landscape' }); break;
      case 'open-daf': openReader(t.dataset.daf, +(t.dataset.seg || 0)); break;
      case 'kitzur': toast('Kitzur opens in the same reader. This prototype includes Arachin only.'); break;
      case 'tick': e.stopPropagation(); S.done[t.dataset.id] = !S.done[t.dataset.id]; render(); break;
      case 'today': { const x = TODAY.find(y => y.id === t.dataset.id); if (x.open) x.open(); else toast(`${x.t.split(' ')[0]} isn’t downloaded. Get it from the Library when you’re online.`); break; }
      case 'plan': S.plans.push(t.dataset.id); render(); toast(`${PLAN_TPL.find(x => x.id === t.dataset.id).t} plan started. Today’s portion is ready.`); break;
      case 'custom-plan': toast('Choose a volume, a daily amount and an end date. (Not built in this prototype.)'); break;
      case 'shelf': SHELF[+t.dataset.i].go(); break;
      case 'lib-open': if (t.dataset.name === 'Arachin') openReader(S.place.daf, S.place.seg); else toast('This prototype includes Arachin only.'); break;
      case 'download': S.queued.push(t.dataset.name); render(); toast('You’re offline. It will download when you reconnect.'); break;
      case 'unqueue': S.queued = S.queued.filter(x => x !== t.dataset.name); render(); break;
      case 'retry': {
        t.disabled = true; t.textContent = 'Checking…';
        setTimeout(() => { if (S.screen !== 'store') return; t.disabled = false; t.textContent = 'Try again'; const n = $('#retry-note'); if (n) n.textContent = 'Still offline at 8:47 PM. Check Wi-Fi in the iPad’s Settings.'; }, 900);
        break;
      }
      case 'pick-ed': S._pick = t.dataset.id; render(); break;
      case 'set-ed': S.edition = S._pick; render(); toast('Saved. The siddur will open in this edition.'); break;
      case 'edition-menu':
        popover(t, `<div class="pop-sec"><div class="pop-label">Edition</div><div class="list" style="border-top:0">${EDITIONS.map(ed => `<div class="row radio-row" role="radio" tabindex="0" aria-checked="${S.edition === ed.id}" data-act="switch-ed" data-id="${ed.id}"><span class="radio"></span><span class="stack"><span class="t" style="font-size:16px">${ed.t}</span></span></div>`).join('')}</div></div>`, 340);
        break;
      case 'switch-ed': S.edition = t.dataset.id; closeLayer(); render(); break;
      case 'tefillah': toast('Tefillos open in the same reader, with the time-of-day insertions already chosen.'); break;
      case 'stuff-tab': S.stuffTab = t.dataset.t; render(); break;
      case 'stuff-tag': S.stuffTag = t.dataset.t; render(); break;
      case 'hist-mode': S.histMode = t.dataset.m; render(); break;
      case 'set-sw': S.settings[t.dataset.k] = !S.settings[t.dataset.k]; t.setAttribute('aria-checked', S.settings[t.dataset.k]); persist(); break;
      case 'cycle': {
        const opts = { fnLoc: ['Below the line', 'In the inspector'], keep: ['30 days', '90 days', '1 year', 'Forever'] }[t.dataset.k];
        S.settings[t.dataset.k] = opts[(opts.indexOf(S.settings[t.dataset.k]) + 1) % opts.length]; render(); break;
      }
      case 'cycle-lang': toast('Choose English or Hebrew for menus and buttons.'); break;
      case 'open-display': openReader(S.place.daf, S.place.seg); setTimeout(() => { const b = $('[data-act="display"]'); b && b.click(); }, 420); break;
      case 'nav-siddur': go('siddur'); break;
      case 'nav-library': go('library'); break;
      case 'nav-settings': go('settings'); break;
      case 'signin': sheet('Sign in', `<p class="muted" style="line-height:1.5;margin:0 0 16px">Sync notes, highlights, ribbons, plans, history and your Misheberach list across devices.</p>
        <div style="display:grid;gap:10px"><button class="btn primary" data-act="close-layer">Continue with Apple</button><button class="btn secondary" data-act="close-layer">Continue with email</button></div>
        <p class="footer-note">You’re offline right now. Sign-in will finish when you reconnect.</p>`, 440); break;
      case 'about': toast('Opens in place, without leaving the app.'); break;
      case 'use-loc': S.city = 'lkwd'; S.cityFromLoc = true; render(); break;
      case 'city': S.city = t.dataset.id; S.cityFromLoc = false; render(); break;
      case 'change-city': S.city = null; render(); break;
      case 'motion': S._motion = true; render(); spinCompass(); break;
      case 'mb-add': {
        const n = $('#mb-name').value.trim(), m = $('#mb-mother').value.trim();
        if (!n || !m) { toast('Add the name and the mother’s name, in Hebrew.'); return; }
        S.misheberach.push({ name: n, rel: $('#mb-rel').value, mother: m }); render(); break;
      }
      case 'mb-del': {
        const i = +t.dataset.i; const [gone] = S.misheberach.splice(i, 1); render();
        toast(`Removed ${gone.name} ${gone.rel} ${gone.mother}`, () => { S.misheberach.splice(i, 0, gone); render(); });
        break;
      }
      case 'cam': S._cam = true; render(); break;
      case 'mirror-guides': S._guides = S._guides === false; render(); break;
      case 'mirror-close': stopCam(); go('learn'); break;

      // reader
      case 'turn': if (t.dataset.daf) openReader(t.dataset.daf, 0, { keepInsp: true }); break;
      case 'toc': {
        const anchor = $('[data-act="toc"][aria-label="Contents"]') || t;
        popover(anchor, `<div class="pop-head"><h3>Arachin</h3><button class="iconbtn" data-act="close-layer" aria-label="Close contents">${ico('close')}</button></div><div class="pop-sec">${tocHTML()}</div>`, 400);
        const c = $('.popover [aria-current="true"]', layer); if (c) c.scrollIntoView({ block: 'center' });
        break;
      }
      case 'toc-go': closeLayer(); if (DAF[t.dataset.daf]) openReader(t.dataset.daf, 0, { keepInsp: true }); else toast(`Arachin ${t.dataset.daf} isn’t part of this prototype.`); break;
      case 'display': popover(t, displayHTML(), 360); break;
      case 'theme': S.theme = t.dataset.t; app.dataset.theme = S.theme; persist(); refreshDisplay(); break;
      case 'size': S.size = Math.max(0, Math.min(SIZES.length - 1, S.size + +t.dataset.d)); app.style.setProperty('--tscale', SIZES[S.size]); persist(); refreshDisplay(); break;
      case 'layout': S.layout = t.dataset.l; persist(); renderReaderPanes(); $$('#insp [data-act="tab"]').forEach(x => x.setAttribute('aria-selected', x.dataset.t === S.tab)); layer.querySelector('.popover').innerHTML = displayHTML(); break;
      case 'pref': S[t.dataset.k] = !S[t.dataset.k]; app.dataset.wash = S.wash; app.dataset.fn = S.fn; app.dataset.keeplight = S.keepLight; persist(); if (t.dataset.k === 'showComm') renderReaderPanes(); t.setAttribute('aria-checked', S[t.dataset.k]); break;
      case 'insp': S.insp = !S.insp; $('#reader').classList.toggle('no-insp', !S.insp); $$('#reader [data-act="insp"]').forEach(x => x.setAttribute('aria-pressed', S.insp)); break;
      case 'grab': S.inspFull = !S.inspFull; $('#insp').classList.toggle('full', S.inspFull); break;
      case 'tab': S.tab = t.dataset.t; $$('#insp [data-act="tab"]').forEach(x => x.setAttribute('aria-selected', x.dataset.t === S.tab)); renderInspector(); break;
      case 'seg-step': setSeg(S.seg + +t.dataset.dir); break;
      case 'restore': S.focus = false; $('#reader').classList.remove('focus'); break;
      case 'ribbon': {
        const d = S.daf, prev = S.ribbons.slice();
        const sync = () => { const rb = $('.daf-ribbon'); if (rb) rb.setAttribute('aria-pressed', S.ribbons.includes(S.daf)); persist(); };
        if (S.ribbons.includes(d)) { S.ribbons = S.ribbons.filter(x => x !== d); toast(`Ribbon removed from Arachin ${d}`, () => { S.ribbons = prev; sync(); }); }
        else { S.ribbons = [d]; toast(prev.length ? `Ribbon moved from ${prev[0]} to ${d}` : `Ribbon placed at Arachin ${d}`, () => { S.ribbons = prev; sync(); }); }
        sync(); break;
      }
      case 'hl': { const k = `${S.daf}:${S.seg}`; if (t.dataset.c) S.hl[k] = t.dataset.c; else delete S.hl[k]; persist(); renderReaderPanes(); break; }
      case 'bookmark': { const k = `${S.daf}:${S.seg}`; S.bookmarks = S.bookmarks.includes(k) ? S.bookmarks.filter(x => x !== k) : S.bookmarks.concat(k); persist(); renderInspector(); toast(S.bookmarks.includes(k) ? 'Bookmarked. Find it in My Stuff.' : 'Bookmark removed'); break; }
      case 'tip-ok': S.tipSeen = true; persist(); $$('.tip').forEach(x => x.remove()); break;
      case 'comm-all': S.commAll = !S.commAll; renderInspector(); break;
      case 'finish-daf': {
        S.done.daf = true; persist(); renderReaderPanes();
        toast('Daf Yomi marked done. Tomorrow: Arachin 5.', () => { S.done.daf = false; persist(); renderReaderPanes(); });
        break;
      }
      case 'save-note': { const k = `${S.daf}:${S.seg}`; const v = $('#mynote').value.trim(); if (v) S.userNotes[k] = v; else delete S.userNotes[k]; persist(); toast(v ? 'Note saved to My Stuff' : 'Note removed'); break; }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (layer.innerHTML) { closeLayer(); return; }
      if (S.sbReader) { S.sbReader = false; applyShell(); return; }
      if (S.screen === 'reader' && S.focus) { S.focus = false; $('#reader').classList.remove('focus'); }
    }
    if (e.key === 'Tab' && layer.innerHTML) {
      const d = $('[role="dialog"]', layer); const f = $$('button, input, select, textarea, [tabindex="0"]', d).filter(x => !x.disabled);
      if (f.length) {
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || !d.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !d.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"]:not(button),[role="radio"],.tseg')) { e.preventDefault(); e.target.click(); }
    if (S.screen === 'reader' && !layer.innerHTML && !e.target.matches('input,textarea')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSeg(S.seg + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSeg(S.seg - 1); }
      const i = ORDER.indexOf(S.daf);
      if (e.key === 'ArrowLeft' && ORDER[i + 1]) openReader(ORDER[i + 1], 0, { keepInsp: true });
      if (e.key === 'ArrowRight' && ORDER[i - 1]) openReader(ORDER[i - 1], 0, { keepInsp: true });
      const tabs = { 1: 'translation', 2: 'notes', 3: 'commentary' };
      if (tabs[e.key] && !e.metaKey && !e.ctrlKey) { S.tab = tabs[e.key]; S.insp = true; $('#reader').classList.remove('no-insp'); $$('#insp [data-act="tab"]').forEach(x => x.setAttribute('aria-selected', x.dataset.t === S.tab)); renderInspector(); }
    }
  });
  scrim.addEventListener('click', () => { S.sbReader = false; applyShell(); });
  sidebar.addEventListener('click', e => { if (S.screen === 'reader' && e.target.closest('[data-act="open-daf"]')) { S.sbReader = false; } });

  let noteT;
  document.addEventListener('input', e => {
    if (e.target.id === 'mynote') {
      const k = `${S.daf}:${S.seg}`, v = e.target.value.trim();
      const st = $('#saved-state'); if (st) st.textContent = 'Saving…';
      clearTimeout(noteT);
      noteT = setTimeout(() => { if (v) S.userNotes[k] = v; else delete S.userNotes[k]; persist(); const s2 = $('#saved-state'); if (s2) s2.textContent = v ? 'Saved to My Stuff' : 'Note removed'; }, 500);
    }
    if (e.target.id === 'sq') $('#sres').innerHTML = searchResults(e.target.value);
    if (e.target.id === 'stuff-q') { S.stuffQ = e.target.value; const pos = e.target.selectionStart; render(); const i = $('#stuff-q'); i.focus(); i.setSelectionRange(pos, pos); }
    if (e.target.id === 'hist-q') { S.histQ = e.target.value; const pos = e.target.selectionStart; render(); const i = $('#hist-q'); i.focus(); i.setSelectionRange(pos, pos); }
    if (e.target.id === 'vn') {
      const v = e.target.value.trim();
      $('#vn-out').innerHTML = v ? `<div class="list" style="margin-top:18px"><div class="row static"><span class="stack"><span class="t">Verses for <span class="heb" style="font-size:20px">${esc(v)}</span></span><span class="s">Begin with ${esc(v[0])} and end with ${esc(v[v.length - 1])}. The app searches the full Tanach here; this prototype shows the layout only.</span></span></div></div>` : emptyBlock('quote', 'Type a name in Hebrew', 'Matching verses appear here, with the sefer and perek.');
    }
  });

  function spinCompass() {
    let h = 210; const target = 55; const start = performance.now(); const from = h; const dur = reduceMotion() ? 1 : 2600;
    const step = now => {
      const k = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - k, 3);
      h = from + (target - from) * e;
      const g = $('#mz-rot'); if (!g) return;
      g.setAttribute('transform', `rotate(${-h} 160 160)`);
      $('#mz-labels').innerHTML = compassLabels(h);
      S._heading = h;
      const on = Math.abs(h - target) < 4;
      $('#mz-word').classList.toggle('on', on);
      $('#mz-msg').textContent = on ? 'You’re facing Mizrach.' : 'Turn until the gold mark meets the arrow at the top.';
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------- stage controls ----------
  function setOrient(o) {
    S.orient = o;
    device.classList.toggle('portrait', o === 'portrait');
    $$('[data-orient]').forEach(b => b.setAttribute('aria-pressed', b.dataset.orient === o));
    if (o === 'portrait' && S.screen === 'reader') S.insp = false;
    if (o === 'landscape' && S.screen === 'reader') S.insp = true;
    fit(); render();
  }
  $$('[data-orient]').forEach(b => b.addEventListener('click', () => setOrient(b.dataset.orient)));
  $('#jump').addEventListener('change', e => {
    const v = e.target.value; e.target.value = '';
    stopCam(); closeLayer();
    const R = (opts = {}) => openReader('3a', opts.seg || 0, Object.assign({ layout: 'daf', insp: S.orient === 'landscape', tab: 'translation' }, opts));
    switch (v) {
      case 'learn': go('learn'); break;
      case 'sidebar': R(); setTimeout(() => { S.sbReader = true; applyShell(); }, 400); break;
      case 'history': go('history'); break;
      case 'siddur': S.edition = null; go('siddur'); break;
      case 'display': R(); setTimeout(() => { const b = $('[data-act="display"]'); b && b.click(); }, 420); break;
      case 'settings': go('settings'); break;
      case 'zmanim': S.city = null; go('zmanim'); break;
      case 'reader': R(); break;
      case 'loading': R({ holdLoading: true }); break;
      case 'toc': R(); setTimeout(() => { const b = $('[data-act="toc"]'); b && b.click(); }, 420); break;
      case 'mystuff': go('mystuff'); break;
      case 'split': R({ layout: 'side', tab: 'notes', insp: false }); break;
      case 'notes': R({ tab: 'notes', insp: true, seg: 0, keepInsp: true }); break;
      case 'mirror': go('mirror'); break;
      case 'misheberach': go('misheberach'); break;
      case 'mizrach': S._motion = false; S._heading = 210; go('mizrach'); break;
      case 'store': go('store'); break;
    }
  });
  window.addEventListener('resize', fit);

  // ---------- boot ----------
  const qs = new URLSearchParams(location.search);
  if (qs.get('orient') === 'portrait') { S.orient = 'portrait'; device.classList.add('portrait'); $$('[data-orient]').forEach(b => b.setAttribute('aria-pressed', b.dataset.orient === 'portrait')); }
  if (qs.get('theme')) S.theme = qs.get('theme');
  fit();
  render();
  if (qs.get('screen')) {
    const sc = qs.get('screen');
    if (sc === 'reader') openReader(qs.get('daf') || '3a', +(qs.get('seg') || 0), { layout: qs.get('layout') || S.layout, tab: qs.get('tab') || 'translation', insp: qs.get('insp') !== '0' && S.orient === 'landscape', keepInsp: true });
    else go(sc);
  }
  window.__S = S;
})();
