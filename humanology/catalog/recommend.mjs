// Pure selector for a public catalog. User health information stays with the caller.
export function recommend(catalog, options = {}) {
  const goals = new Set(options.goals ?? []);
  const audience = new Set(options.audience ?? []);
  const blocked = new Set(options.blocked ?? []);
  const eligible = new Set(options.eligibleCards ?? []);
  const cleared = new Set(options.clearedCards ?? []);
  const omit = new Set([...(options.dismissed ?? []), ...(options.activeCards ?? [])]);
  const byId = new Map(catalog.benefits.map(benefit => [benefit.benefit_id, benefit]));
  const results = [];
  for (const card of catalog.cards) {
    const id = card.card_id;
    if (omit.has(id) || card.blocked_if.some(key => blocked.has(key))) continue;
    if ((card.blocked_if.length || card.eligibility_rule !== 'read_studied_population')
        && !eligible.has(id)) continue;
    if (card.eligibility_rule === 'clinician_clearance' && !cleared.has(id)) continue;
    const variants = catalog.variants.filter(v => v.card_id === id);
    const selected = options.selectedVariants?.[id];
    const allowed = variants.filter(v => (!selected || selected === v.variant_id)
      && (!v.audience_filter || audience.has(v.audience_filter)));
    if (variants.length && !allowed.length) continue;
    const variantBenefits = new Set(allowed.flatMap(v => v.benefit_ids));
    const possible = card.benefit_ids.map(key => byId.get(key))
      .filter(b => (!b.audience_filter || audience.has(b.audience_filter))
        && (!variants.length || variantBenefits.has(b.benefit_id)));
    const matched = possible.filter(b => b.goals.some(g => goals.has(g)));
    if (!matched.length) continue;
    const matchedGoals = [...new Set(matched.flatMap(b => b.goals.filter(g => goals.has(g))))];
    // Summaries for a variant-specific intervention are attached to that variant only.
    const visibleVariants = allowed.map(v => ({
      ...v, benefits: possible.filter(b => v.benefit_ids.includes(b.benefit_id))
    }));
    results.push({
      card, matchedGoals,
      benefits: possible.filter(b => b.display_scope !== 'variant' && b.display_scope !== 'research_only'),
      variants: visibleVariants,
      reason: matchedGoals.length > 1 ? 'Matches more than one of your goals' : 'Matches a selected goal'
    });
  }
  return results.sort((a,b) => b.matchedGoals.length - a.matchedGoals.length
    || a.card.card_id.localeCompare(b.card.card_id));
}
