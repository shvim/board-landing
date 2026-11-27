import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {recommend} from './recommend.mjs';
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url)));
const data = read('catalog.json'), counts = read('counts.json');
const unique = (rows, key) => assert.equal(new Set(rows.map(x => x[key])).size, rows.length);
unique(data.cards,'card_id'); unique(data.benefits,'benefit_id'); unique(data.variants,'variant_id');
const cards = new Map(data.cards.map(c => [c.card_id,c]));
const benefits = new Map(data.benefits.map(b => [b.benefit_id,b]));
const goals = new Set(['heart','sleep','mood','energy','movement','metabolic','digestion','memory']);
assert.equal(data.cards.length,counts.canonical_cards);assert.equal(data.benefits.length,counts.published_benefits);
for (const c of data.cards) {
  for (const k of ['title','action','tracking_prompt','qualification','studied_population','time_commitment']) assert.ok(c[k], c.card_id+' '+k);
  for (const k of c.benefit_ids) assert.equal(benefits.get(k)?.card_id,c.card_id);
  assert.deepEqual(new Set(c.goals),new Set(c.benefit_ids.flatMap(k=>benefits.get(k).goals)));
}
for (const b of data.benefits) {
  assert.ok(cards.get(b.card_id).benefit_ids.includes(b.benefit_id));
  assert.ok(b.source_urls.length && b.source_urls.every(s=>new URL(s).protocol==='https:'));
  assert.ok(b.goals.every(g=>goals.has(g)));assert.ok(!('grade' in b));
  if (b.display_scope==='variant') assert.ok(data.variants.some(v=>v.benefit_ids.includes(b.benefit_id)));
}
for (const v of data.variants) for (const k of v.benefit_ids) assert.equal(benefits.get(k)?.card_id,v.card_id);
const get=(opts,id)=>recommend(data,opts).find(r=>r.card.card_id===id);
assert.deepEqual(get({goals:['heart','movement']},'brisk-walking').matchedGoals.sort(),['heart','movement']);
assert.ok(!get({goals:['heart']},'salt-swap'));
assert.ok(!get({goals:['heart'],eligibleCards:['salt-swap'],blocked:['kidney_disease']},'salt-swap'));
assert.ok(!get({goals:['heart'],eligibleCards:['salt-swap']},'salt-swap').benefits.some(b=>b.benefit_id==='salt-swap-2'));
assert.ok(!get({goals:['mood'],activeCards:['social-break']},'social-break'));
assert.ok(!get({goals:['metabolic'],selectedVariants:{'walk-after-meals':'walk-after-meals-2'}},'walk-after-meals'));
const mod=get({goals:['mood'],selectedVariants:{'walking-breaks':'walking-breaks-3'}},'walking-breaks');
assert.deepEqual(mod.variants[0].benefits.map(x=>x.benefit_id),['walking-breaks-2','walking-breaks-3']);
assert.equal(mod.benefits.length,0);
assert.ok(!get({goals:['heart'],eligibleCards:['handgrip']},'handgrip'));
assert.ok(get({goals:['heart'],eligibleCards:['handgrip'],clearedCards:['handgrip']},'handgrip'));
console.log('Passed catalog integrity, count, goal matching, schedule, audience, exclusions and consent checks.');

const srcMap=new Map(data.research_sources.map(s=>[s.source_id,s]));
assert.equal(srcMap.size,counts.unique_source_links);
for (const row of [...data.benefits,...data.variants]) {
  assert.deepEqual(row.source_urls,row.source_ids.map(id=>srcMap.get(id).url));
}
for (const c of data.cards) {
  assert.ok(c.research_source_ids.length);
  assert.equal(new Set(c.research_source_ids).size,c.research_source_ids.length);
}
console.log('Passed all audited citation relationships.');

for (const c of data.cards) {
  assert.deepEqual(c.source_notes.map(n=>n.source_id), c.research_source_ids);
  for (const n of c.source_notes) assert.ok(srcMap.has(n.source_id) && n.role && n.summary);
}
assert.deepEqual(benefits.get('sunscreen-1').source_ids,['23732711']);
assert.deepEqual(benefits.get('pelvic-floor-1').source_ids,['30288727']);
assert.ok(cards.get('handwash').research_source_ids.includes('CDC-HANDWASH'));
const swap = get({goals:['metabolic'],eligibleCards:['drink-swap']},'drink-swap');
assert.ok(swap && !swap.benefits.length);
console.log('Passed updated claim, source-note and research-only display checks.');

for (const card of data.cards) assert.ok(card.research_summary.length > 40);
assert.deepEqual(benefits.get('standing-stockings-1').source_ids,['37458579','22451457']);
assert.deepEqual(benefits.get('water-premeal-1').source_ids,['19661958','26237305']);
assert.ok(!benefits.get('cold-shower-1').source_ids.includes('39879231'));
assert.ok(!benefits.get('apples-1').source_ids.includes('35449537'));
