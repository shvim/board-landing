"""Build Humanology-5.2.html from the 5.1 baseline, the 2026-11-26.4 catalog and the 5.2 layer.
Run from the humanology/ folder:  python3 tools/build52.py"""
import json, re, os, shutil
import sys
REVISED = len(sys.argv) > 1 and sys.argv[1] == 'revised'
B = 'baseline/Humanology-5.1.html'; OUT = 'Humanology-5.2-revised.html' if REVISED else 'Humanology-5.2.html'; ASSETS = 'Humanology-5.2-assets'
src = open(B, encoding='utf-8').read()
lines = src.split('\n')

# 1. the old combined library is replaced by the canonical catalog; a small table keeps 5.1 titles for history
lib_i = next(i for i, l in enumerate(lines) if l.startswith('<script type="application/json" id="lib">'))
old = json.loads(re.sub(r'^<script[^>]*>|</script>$', '', lines[lib_i]))
legacy = {h['id']: {'t': h['t'], 'a': (h['v'][0].get('beg') or h['v'][0].get('action') or '') if h.get('v') else '', 'mins': h.get('d', {}).get('mins')} for h in old['habits']}
catalog = json.load(open('catalog/catalog.json', encoding='utf-8'))
art = json.load(open('tools/artmap.json'))
def js_json(o): return json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
lines[lib_i] = ('<script type="application/json" id="catalog52">' + js_json(catalog) + '</script>\n'
  + '<script type="application/json" id="legacy51">' + js_json(legacy) + '</script>\n'
  + '<script type="application/json" id="art52">' + js_json(art) + '</script>'
  + ('\n<script type="application/json" id="refine52">' + js_json(json.load(open('matching/refinements.json'))) + '</script>'
     + '\n<script type="application/json" id="activity52">' + js_json(json.load(open('matching/activity.json'))) + '</script>'
     + '\n<script type="application/json" id="policy52">' + js_json(json.load(open('matching/policy.json'))) + '</script>' if REVISED else ''))
src = '\n'.join(lines)

# 2. sample data and ID-keyed tables in the 5.1 code move to the new card IDs (exact or sample-only renames)
IDS = {'H001': 'brisk-walking', 'H002': 'walk-after-meals', 'H004': 'stairs', 'H024': 'kiwi', 'H026': 'caffeine', 'H030': 'mindfulness',
       'H031': 'relax-muscles', 'H032': 'three-good-things', 'H052': 'handgrip', 'H060': 'music'}
head, sep, code = src.partition('<script>const ART_EXTRA')
for o, n in IDS.items():
    code = re.sub(r'(?<![\w"])' + o + r'(?=\s*:)', '"' + n + '"', code)
    code = code.replace('"' + o + '"', '"' + n + '"')
src = head + sep + code

# 3. boot: build the catalog from #catalog52 and apply the 5.2 art and titles
src = src.replace('HM.setCatalog(JSON.parse(document.getElementById("lib").textContent));', 'HM.setCatalog(buildCat52());')
src = src.replace('applyArt(); applyV4(); applyV5();', 'applyArt(); applyV4(); applyV5(); apply52();')
assert 'buildCat52()' in src and 'apply52();' in src

# 4. the 5.2 layer goes in just before boot
layer = '\n'.join(open(f'src/{f}', encoding='utf-8').read() for f in ['layer52-data.js', 'layer52-ui.js'] + (['layer52r-data.js', 'layer52r-ui.js', 'layer52m-ui.js', 'layer52s-ui.js', 'layer52f-ui.js'] if REVISED else []))
if REVISED:
    # the supplied exact-outcome matcher, embedded verbatim (export keyword dropped), and its two data files
    msrc = open('matching/match.mjs', encoding='utf-8').read().replace('export function refinedMatches', 'function refinedMatches', 1)
    layer = layer.replace('/*MATCH52-SOURCE*/', msrc.strip())
marker = '/* ---------- boot ---------- */'
assert src.count(marker) == 1
src = src.replace(marker, layer + '\n' + marker)

# 5. art CSS from the explicit map: hero paintings for large slots, separate thumbnail derivatives for circles
A = ASSETS + '/art'
used_heroes = set()
css = []
alias = {'walk': 'walk', 'rest': 'moment-rest-day', 'p-sleep': 'goal-sleep', 'p-calm': 'goal-mood', 'p-energy': 'goal-energy', 'p-strength': 'goal-movement',
         'cook': 'goal-metabolic', 'fruit': 'goal-digestion', 'milestone': 'milestone', 'reflect': 'reflect', 'welcome': 'welcome'}
entries = {**art['slots'], **art['cards']}
for key, a in list(entries.items()) + [(k, entries[v]) for k, v in alias.items() if v in entries and k != v]:
    if a.get('hero'):
        used_heroes.add(a['hero']); css.append(f'.i-{key}{{background-image:url({A}/hero/{a["hero"]}.webp)}}')
    if a.get('thumb'):
        css.append(f'.th .bust.i-{key}{{background-image:url({A}/thumb/{a["thumb"]}.webp)}}')
    elif a.get('hero'):
        css.append(f'.th .bust.i-{key}{{background-image:url({A}/hero/{a["hero"]}.webp);background-size:contain;background-position:center bottom}}')
for k in ['fx-cooking', 'kiwi', 'walk-after-meals']:
    css.append(f'.th .bust.fit-{k}{{background-image:url({A}/thumb-fit/{k}.webp)}}')
    css.append(f'.th .bust.face-{k}{{background-image:url({A}/thumb/cmp-face-{k}.webp)}}')
# temporary treatments for inaccessible approved assets: painted stopwatches and mood faces are drawn as quiet SVG stand-ins
def svg(s): return 'url("data:image/svg+xml,' + s.replace('<', '%3C').replace('>', '%3E').replace('#', '%23').replace('"', "'") + '")'
for k, ang in {'u5': 12, '5-10': 60, '10-20': 114, '20': 150}.items():
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110"><rect x="43" y="4" width="14" height="10" rx="4" fill="#4F6378"/><rect x="74" y="16" width="10" height="8" rx="3" fill="#4F6378" transform="rotate(40 79 20)"/>'
         f'<circle cx="50" cy="62" r="40" fill="#5B7088"/><circle cx="50" cy="62" r="32" fill="#F6F0E2"/>'
         + ''.join(f'<rect x="49" y="32" width="2" height="5" fill="#9AA6B2" transform="rotate({a} 50 62)"/>' for a in range(0, 360, 30))
         + f'<g transform="rotate({ang} 50 62)"><rect x="48.5" y="36" width="3" height="28" rx="1.5" fill="#3D4652"/><rect x="48.5" y="34" width="3" height="9" rx="1.5" fill="#C0533F"/></g><circle cx="50" cy="62" r="4" fill="#3D4652"/></svg>')
    css.append(f'.i-sw-{k}{{background-image:{svg(s)}}}')
mouths = ['M36 70 Q50 60 64 70', 'M36 68 Q50 63 64 68', 'M37 66 L63 66', 'M36 64 Q50 71 64 64', 'M34 62 Q50 76 66 62']
for i, mth in enumerate([] if REVISED else mouths, 1):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F3D9B8"/><circle cx="38" cy="44" r="3.5" fill="#4A3B30"/><circle cx="62" cy="44" r="3.5" fill="#4A3B30"/><path d="{mth}" stroke="#4A3B30" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>'
    css.append(f'.th .bust.i-m{i},.i-m{i}{{background-image:{svg(s)};background-size:80%;background-position:center}}')
if REVISED:
    # Nora's five painted faces from the illustrated 5.1, with 5.1's own bust crop for the circles
    BW = {1: (1.1384, -0.0814), 2: (1.1382, -0.0829), 3: (1.1360, -0.0879), 4: (1.1382, -0.0787), 5: (1.1362, -0.0841)}
    for i, (bw, bx) in BW.items():
        css.append(f'.i-m{i}{{background-image:url({A}/mood/m{i}.webp)}}')
        css.append(f'.th .bust.i-m{i}{{background-image:url({A}/mood/m{i}.webp);background-size:calc(var(--d)*{bw}) calc(var(--d)*1.2121);background-position:calc(var(--d)*{bx}) calc(var(--d)*.13)}}')
layer_css = open('src/layer52.css', encoding='utf-8').read() + '\n' + '\n'.join(css) + ('\n' + open('src/layer52r.css', encoding='utf-8').read() + '\n' + open('src/layer52s.css', encoding='utf-8').read() if REVISED else '')
last_style = src.rfind('</style>')
src = src[:last_style] + layer_css + '\n' + src[last_style:]
src = src.replace('<title>Humanology', '<title>Humanology 5.2' + (' revised' if REVISED else ''), 1)
open(OUT, 'w', encoding='utf-8').write(src)

# 6. ship only the derivatives the page uses
keep = used_heroes
shutil.rmtree(A + '/hero', ignore_errors=True); os.makedirs(A + '/hero')
for k in keep: shutil.copy(f'work/hero-all/{k}.webp', f'{A}/hero/{k}.webp')
print('built', OUT, round(len(src) / 1024), 'KB;', len(keep), 'hero derivatives')
