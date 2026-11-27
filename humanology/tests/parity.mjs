// Proves the selector embedded in Humanology-5.2.html is identical in behavior to catalog/recommend.mjs,
// and that the HTML embeds the same catalog release that verify.mjs checks.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { recommend } from '../catalog/recommend.mjs';
const html = readFileSync(new URL('../Humanology-5.2.html', import.meta.url), 'utf8');
const catalog = JSON.parse(readFileSync(new URL('../catalog/catalog.json', import.meta.url), 'utf8'));
const embedded = JSON.parse(html.match(/<script type="application\/json" id="catalog52">([\s\S]*?)<\/script>/)[1].replace(/<\\\//g, '</'));
assert.deepEqual(embedded, catalog, 'embedded catalog equals catalog/catalog.json');
const srcFn = html.slice(html.indexOf('/*RECOMMEND52-START*/') + 21, html.indexOf('/*RECOMMEND52-END*/'));
const recommend52 = new Function(srcFn + '; return recommend52;')();
const sameText = recommend.toString().replace(/^function recommend\(/, 'function recommend52(').replace(/\s+/g, ' ').trim();
assert.equal(recommend52.toString().replace(/\s+/g, ' ').trim(), sameText, 'selector source is verbatim');
let seed = 7; const R = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const pick = (arr, p) => arr.filter(() => R() < p);
const goals = ['heart', 'sleep', 'mood', 'energy', 'movement', 'metabolic', 'digestion', 'memory'];
const ids = catalog.cards.map(c => c.card_id), blocks = [...new Set(catalog.cards.flatMap(c => c.blocked_if))];
const auds = ['type_2_diabetes', 'hypertension', 'high_stroke_risk_trial_population', 'constipation'];
let n = 0;
for (let i = 0; i < 3000; i++) {
  const sv = {}; for (const v of catalog.variants) if (R() < 0.2) sv[v.card_id] = v.variant_id;
  const o = { goals: pick(goals, 0.35), eligibleCards: pick(ids, 0.4), clearedCards: pick(ids, 0.3), blocked: pick(blocks, 0.15), audience: pick(auds, 0.3),
    activeCards: pick(ids, 0.1), dismissed: pick(ids, 0.1), selectedVariants: sv };
  assert.deepEqual(recommend52(catalog, o), recommend(catalog, o)); n++;
}
console.log(`Parity: embedded catalog identical; selector verbatim; ${n} random option sets give identical results.`);
