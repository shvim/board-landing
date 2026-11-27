// The matcher embedded in Humanology-5.2-revised.html is the supplied matching/match.mjs, verbatim and behaviorally identical.
import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
import { refinedMatches } from '../matching/match.mjs';
const html = readFileSync(new URL('../Humanology-5.2-revised.html', import.meta.url), 'utf8');
const src = html.slice(html.indexOf('/*MATCH52-START*/') + 17, html.indexOf('/*MATCH52-END*/'));
assert.equal(src.replace(/\s+/g, ' ').trim(), readFileSync(new URL('../matching/match.mjs', import.meta.url), 'utf8').replace('export function', 'function').replace(/\s+/g, ' ').trim());
const fn = new Function(src + '; return refinedMatches;')();
const j = id => JSON.parse(html.match(new RegExp(`id="${id}">([\\s\\S]*?)</script>`))[1]);
const cat = j('catalog52'), map = j('refine52'), act = j('activity52');
assert.deepEqual(map, JSON.parse(readFileSync(new URL('../matching/refinements.json', import.meta.url))));
assert.deepEqual(act, JSON.parse(readFileSync(new URL('../matching/activity.json', import.meta.url))));
const sel = new Function(html.slice(html.indexOf('function recommend52('), html.indexOf('/*RECOMMEND52-END*/')) + ';return recommend52;')();
let seed = 11; const R = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const keys = Object.keys(map); const ids = cat.cards.map(c => c.card_id); let n = 0;
for (let i = 0; i < 2000; i++) {
  const refinements = {}; for (const k of keys) if (R() < 0.15) { const [g, r] = k.split('.'); refinements[g] = r; }
  const goals = Object.keys(refinements).concat(['heart', 'sleep', 'mood'].filter(() => R() < 0.3));
  const res = sel(cat, { goals, eligibleCards: ids.filter(() => R() < 0.5), clearedCards: ids.filter(() => R() < 0.4), audience: ['type_2_diabetes', 'hypertension'].filter(() => R() < 0.3) });
  const o = { refinements, effort: [null, 'gentle', 'some', 'more'][Math.floor(R() * 4)], ability: R() < 0.2 ? 'seated' : null };
  assert.deepEqual(fn(res, o, map, act), refinedMatches(res, o, map, act)); n++;
}
console.log(`Matcher parity: embedded source verbatim, data files identical, ${n} random inputs identical.`);
