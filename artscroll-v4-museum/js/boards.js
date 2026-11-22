/* Home (Learn), landscape */
(function () {

const COVERS = window.COVERS;
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { toolsOpen: true, plan: null };
  }
  renderVals() {
    const s = this.state;
    const pick = (p) => () => this.setState({ plan: s.plan === p ? null : p });
    return {
      covers: COVERS,
      toolsOpen: s.toolsOpen,
      toolsHidden: !s.toolsOpen,
      toggleTools: () => this.setState({ toolsOpen: !s.toolsOpen }),
      planDaf: s.plan === 'daf',
      planMy: s.plan === 'my',
      planFin: s.plan === 'fin',
      pickDaf: pick('daf'),
      pickMy: pick('my'),
      pickFin: pick('fin')
    };
  }
}

mountDC(document.getElementById('ab-Main'), Component);
})();

/* Library, landscape */
(function () {

const COVERS = window.COVERS;
const SEDARIM = { zeraim: 'Zeraim', moed: 'Moed', nashim: 'Nashim', nezikin: 'Nezikin', kodashim: 'Kodashim', taharos: 'Taharos' };
const CORPORA = { bavli: 'Talmud Bavli', yerushalmi: 'Yerushalmi', mishnah: 'Mishnah', chumash: 'Chumash', kitzur: 'Kitzur Shulchan Aruch' };
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { toolsOpen: true, seder: 'kodashim', corpus: 'bavli', q: {} };
  }
  renderVals() {
    const s = this.state;
    const bavli = s.corpus === 'bavli';
    const show = (k) => bavli && (s.seder === 'all' || s.seder === k);
    const seder = (k) => () => this.setState({ seder: k, corpus: 'bavli' });
    const corpus = (k) => () => this.setState({ corpus: k });
    const dl = (k) => () => this.setState({ q: Object.assign({}, s.q, { [k]: true }) });
    const anyShown = bavli && ['all', 'zeraim', 'moed', 'nashim', 'kodashim'].indexOf(s.seder) !== -1;
    return {
      covers: COVERS,
      toolsOpen: s.toolsOpen,
      toolsHidden: !s.toolsOpen,
      toggleTools: () => this.setState({ toolsOpen: !s.toolsOpen }),
      cBavli: s.corpus === 'bavli', cYeru: s.corpus === 'yerushalmi', cMish: s.corpus === 'mishnah', cChum: s.corpus === 'chumash', cKitz: s.corpus === 'kitzur',
      toBavli: corpus('bavli'), toYeru: corpus('yerushalmi'), toMish: corpus('mishnah'), toChum: corpus('chumash'), toKitz: corpus('kitzur'),
      sAll: s.seder === 'all', sZer: s.seder === 'zeraim', sMoed: s.seder === 'moed', sNash: s.seder === 'nashim', sNez: s.seder === 'nezikin', sKod: s.seder === 'kodashim', sTah: s.seder === 'taharos',
      toAll: seder('all'), toZer: seder('zeraim'), toMoed: seder('moed'), toNash: seder('nashim'), toNez: seder('nezikin'), toKod: seder('kodashim'), toTah: seder('taharos'),
      hideZer: !show('zeraim'), hideMoed: !show('moed'), hideNash: !show('nashim'), hideKod: !show('kodashim'),
      emptyHidden: anyShown,
      emptyTitle: bavli ? 'No volumes from Seder ' + (SEDARIM[s.seder] || '') + ' yet' : 'No ' + CORPORA[s.corpus] + ' volumes yet',
      showAll: () => this.setState({ corpus: 'bavli', seder: 'all' }),
      qShabbos: !!s.q.shabbos, nqShabbos: !s.q.shabbos, dlShabbos: dl('shabbos'),
      qBechoros: !!s.q.bechoros, nqBechoros: !s.q.bechoros, dlBechoros: dl('bechoros'),
      qTemurah: !!s.q.temurah, nqTemurah: !s.q.temurah, dlTemurah: dl('temurah'),
      qKereisos: !!s.q.kereisos, nqKereisos: !s.q.kereisos, dlKereisos: dl('kereisos')
    };
  }
}

mountDC(document.getElementById('ab-Library'), Component);
})();

/* Contents with chapter opener, landscape */
(function () {

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { toolsOpen: true };
  }
  renderVals() {
    const s = this.state;
    return {
      toolsOpen: s.toolsOpen,
      toolsHidden: !s.toolsOpen,
      toggleTools: () => this.setState({ toolsOpen: !s.toolsOpen })
    };
  }
}

mountDC(document.getElementById('ab-Contents'), Component);
})();

/* Reader, landscape */
(function () {

function standInLines(n, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const k = (i + seed) % 11;
    out.push({ c: i === 0 || k === 0 ? 'ln dh' : k === 10 ? 'ln end' : 'ln' });
  }
  return out;
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { toolsOpen: true, tab: 'tr', layout: 'side', pop: false, theme: 'light', fs: 18, fn: true, hl: true, keep: false };
  }
  renderVals() {
    const s = this.state;
    const set = (patch) => () => this.setState(patch);
    const flip = (k) => () => this.setState({ [k]: !s[k] });
    return {
      rootCls: 'ipad land t-' + s.theme + ' lay-' + s.layout + (s.hl ? '' : ' no-hl') + (s.fn ? '' : ' no-fn') + (s.keep ? ' keep-light' : ''),
      toolsOpen: s.toolsOpen, toolsHidden: !s.toolsOpen, toggleTools: flip('toolsOpen'),
      tabTr: s.tab === 'tr', tabNotes: s.tab === 'notes', tabComm: s.tab === 'comm',
      hideTr: s.tab !== 'tr', hideNotes: s.tab !== 'notes', hideComm: s.tab !== 'comm',
      showTr: set({ tab: 'tr' }), showNotes: set({ tab: 'notes' }), showComm: set({ tab: 'comm' }),
      pop: s.pop, popHidden: !s.pop, togglePop: flip('pop'), closePop: set({ pop: false }),
      thLight: s.theme === 'light', thSepia: s.theme === 'sepia', thNight: s.theme === 'night',
      toLight: set({ theme: 'light' }), toSepia: set({ theme: 'sepia' }), toNight: set({ theme: 'night' }),
      fs: s.fs, onFs: (e) => this.setState({ fs: Number(e.target.value) }),
      layDaf: s.layout === 'daf', layTr: s.layout === 'tr', laySide: s.layout === 'side',
      toDaf: set({ layout: 'daf' }), toTr: set({ layout: 'tr' }), toSide: set({ layout: 'side' }),
      panelOn: s.layout !== 'daf', togglePanel: set({ layout: s.layout === 'daf' ? 'side' : 'daf' }),
      fn: s.fn, hl: s.hl, keep: s.keep, flipFn: flip('fn'), flipHl: flip('hl'), flipKeep: flip('keep'),
      rashi: standInLines(84, 3), tos: standInLines(84, 7)
    };
  }
}

mountDC(document.getElementById('ab-Reader'), Component);
})();

/* Reader, portrait, display menu open */
(function () {

function standInLines(n, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const k = (i + seed) % 11;
    out.push({ c: i === 0 || k === 0 ? 'ln dh' : k === 10 ? 'ln end' : 'ln' });
  }
  return out;
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { tab: 'tr', layout: 'daf', sheet: true, pop: true, theme: 'sepia', fs: 18, fn: true, hl: true, keep: false };
  }
  renderVals() {
    const s = this.state;
    const set = (patch) => () => this.setState(patch);
    const flip = (k) => () => this.setState({ [k]: !s[k] });
    return {
      rootCls: 'ipad port t-' + s.theme + ' lay-' + s.layout + (s.sheet ? '' : ' no-sheet') + (s.hl ? '' : ' no-hl') + (s.fn ? '' : ' no-fn') + (s.keep ? ' keep-light' : ''),
      tabTr: s.tab === 'tr', tabNotes: s.tab === 'notes', tabComm: s.tab === 'comm',
      hideTr: s.tab !== 'tr', hideNotes: s.tab !== 'notes', hideComm: s.tab !== 'comm',
      showTr: set({ tab: 'tr' }), showNotes: set({ tab: 'notes' }), showComm: set({ tab: 'comm' }),
      pop: s.pop, popHidden: !s.pop, togglePop: flip('pop'), closePop: set({ pop: false }),
      thLight: s.theme === 'light', thSepia: s.theme === 'sepia', thNight: s.theme === 'night',
      toLight: set({ theme: 'light' }), toSepia: set({ theme: 'sepia' }), toNight: set({ theme: 'night' }),
      fs: s.fs, onFs: (e) => this.setState({ fs: Number(e.target.value) }),
      layDaf: s.layout === 'daf', layTr: s.layout === 'tr', laySide: s.layout === 'side',
      toDaf: set({ layout: 'daf', sheet: true }), toTr: set({ layout: 'tr' }), toSide: set({ layout: 'side' }),
      panelOn: s.layout !== 'daf' || s.sheet,
      togglePanel: s.layout !== 'daf' ? set({ layout: 'daf', sheet: false }) : set({ sheet: !s.sheet }),
      fn: s.fn, hl: s.hl, keep: s.keep, flipFn: flip('fn'), flipHl: flip('hl'), flipKeep: flip('keep'),
      rashi: standInLines(160, 3), tos: standInLines(160, 7)
    };
  }
}

mountDC(document.getElementById('ab-ReaderPortrait'), Component);
})();
