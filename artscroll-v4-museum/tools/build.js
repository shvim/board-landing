// Builds the local folder copy (index.html + js/boards.js + js/covers.js)
// from the canvas artboards in canvas/project/*.dc.html.
const fs = require('fs');
const path = require('path');
const ROOT = '/workspace/board-landing/artscroll-v4-museum';
const canvas = JSON.parse(fs.readFileSync(path.join(ROOT, 'canvas/project/canvas.json'), 'utf8'));

function transformMarkup(html) {
  html = html.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  html = html.replace(/href="([A-Za-z0-9_-]+)\.dc\.html"/g, 'href="#$1"');
  html = html.replace(/<([a-zA-Z][\w-]*)(\s[^<>]*?)?>/g, (tag, name, attrs) => {
    if (!attrs || attrs.indexOf('{{') === -1 || name === 'sc-for') return tag;
    const ons = [];
    attrs = attrs.replace(/\s([a-zA-Z][\w:-]*)="([^"]*)"/g, (all, an, av) => {
      if (av.indexOf('{{') === -1) return all;
      const m = /^on([A-Z]\w*)$/.exec(an);
      if (m) { ons.push(m[1] + ':' + av.replace(/[{}\s]/g, '')); return ''; }
      return ` data-dc-${an.toLowerCase()}="${av}"`;
    });
    if (ons.length) attrs += ` data-on="${ons.join(' ')}"`;
    return `<${name}${attrs}>`;
  });
  return html;
}

const boards = canvas.order.filter((f) => fs.existsSync(path.join(ROOT, 'canvas/project', f))).map((file) => {
  const src = fs.readFileSync(path.join(ROOT, 'canvas/project', file), 'utf8');
  const name = file.replace(/\.dc\.html$/, '');
  const markup = /<x-dc>([\s\S]*?)<\/x-dc>/.exec(src)[1];
  let code = /<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/.exec(src)[1];
  code = code.replace(/^const COVERS = .*;$/m, 'const COVERS = window.COVERS;');
  const b = canvas.boards[file];
  return { name, file, title: b.title || name, w: b.w, h: b.h, markup: transformMarkup(markup), code };
});

const js = boards.map((b) => `/* ${b.title} */\n(function () {\n${b.code}\nmountDC(document.getElementById('ab-${b.name}'), Component);\n})();\n`).join('\n');
fs.writeFileSync(path.join(ROOT, 'js/boards.js'), js);

const order = ['berachos-1', 'shabbos-1', 'kesubos-1', 'chullin-1', 'bechoros-1', 'arachin', 'temurah', 'kereisos', 'menachos-1', 'zevachim-1'];
const coversJs = `/* The one map of cover images. To use the real covers, overwrite the
   JPG files in assets/covers/ (560×800, 7:10) and keep the same names. */
window.COVERS = {
${order.map((f) => `  ${f.replace(/-1$/, '')}: 'assets/covers/${f}.jpg'`).join(',\n')}
};
`;
fs.writeFileSync(path.join(ROOT, 'js/covers.js'), coversJs);

const frames = boards.map((b) => `
<section class="frame" id="${b.name}" aria-labelledby="lbl-${b.name}">
  <p class="frame-label" id="lbl-${b.name}">${b.title} <span>${b.w} × ${b.h}</span></p>
  <div class="scaler" data-w="${b.w}" data-h="${b.h}">
    <div class="ab" id="ab-${b.name}" style="width:${b.w}px;height:${b.h}px">${b.markup}</div>
  </div>
</section>`).join('\n');

const index = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>ArtScroll v4 — Museum Edition</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap">
<link rel="stylesheet" href="css/museum.css">
<style>
  :root { --page: #ECEBE8; --page-ink: #161412; --page-ink-2: #5F5A55; color-scheme: light; }
  html, body { margin: 0; background: var(--page); color: var(--page-ink); }
  body { font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", system-ui, sans-serif; padding-block: 40px 80px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  .intro { max-width: 1194px; margin: 0 auto 36px; }
  .intro h1 { font: 400 40px/1.1 "Libre Caslon Display", Georgia, serif; margin: 0 0 10px; letter-spacing: -0.01em; }
  .intro p { margin: 0; color: var(--page-ink-2); max-width: 68ch; }
  .intro p + p { margin-top: 6px; font-size: 13px; }
  .frame { max-width: 1194px; margin: 0 auto 56px; }
  .frame-label { font: 600 14px/1.3 -apple-system, BlinkMacSystemFont, "Helvetica Neue", system-ui, sans-serif; margin: 0 0 12px; }
  .frame-label span { font-weight: 400; color: var(--page-ink-2); margin-left: 8px; font-variant-numeric: tabular-nums; }
  .scaler { position: relative; overflow: hidden; }
  .ab { transform-origin: 0 0; position: absolute; top: 0; left: 0; }
  a:focus-visible { outline: 2px solid var(--page-ink); outline-offset: 2px; }
</style>
</head>
<body>
<header class="intro">
  <h1>ArtScroll v4 — Museum Edition</h1>
  <p>Design prototype. Five iPad screens with working controls: try the sidebar’s Tools, the Library filters, the reader’s panel tabs, and the “Aa א” display menu (theme, text size, layout and switches).</p>
  <p>Gemara text of Arachin 2a: Vilna edition, via Wikisource and Sefaria, CC BY-SA. English elucidation written for this prototype. The dedication is fictional. Covers are labelled placeholders.</p>
</header>
${frames}
<script src="js/covers.js"></script>
<script src="js/dc-shim.js"></script>
<script src="js/boards.js"></script>
<script>
(function () {
  function fit() {
    document.querySelectorAll('.scaler').forEach(function (s) {
      var w = +s.dataset.w, h = +s.dataset.h;
      var avail = s.parentNode.clientWidth;
      var k = Math.min(1, avail / w);
      s.style.width = (w * k) + 'px';
      s.style.height = (h * k) + 'px';
      s.firstElementChild.style.transform = 'scale(' + k + ')';
    });
  }
  window.addEventListener('resize', fit);
  fit();
})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), index);
console.log('built', boards.map((b) => b.name).join(', '));
