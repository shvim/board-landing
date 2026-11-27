// Pass results from recommend52, which applies audience, schedule and clearance rules.
export function refinedMatches(results, { refinements = {}, effort, ability }, map, activity = {}) {
  const output = [];
  for (const result of results) {
    const id = result.card.card_id;
    const mode = activity[id];
    if (ability === 'seated' && !mode?.seated) continue;
    if (effort === 'gentle' && mode?.strenuous) continue;
    const candidates = [...result.benefits, ...result.variants.flatMap(v => v.benefits)];
    const claims = [...new Map(candidates.map(b => [b.benefit_id, b])).values()];
    const matchingGoals = b => result.matchedGoals.filter(g => {
      const key = refinements[g];
      return b.goals.includes(g) && (!key || key === 'general' || map[g + '.' + key]?.includes(b.benefit_id));
    });
    const benefits = claims.filter(b => b.display_scope !== 'research_only' && matchingGoals(b).length);
    if (!benefits.length) continue;
    if (['more','some'].includes(effort) && !(mode?.[effort] > 0)) continue;
    const matchedGoals = [...new Set(benefits.flatMap(matchingGoals))];
    const benefitsByVariant = Object.fromEntries(result.variants.map(v => [v.variant_id, v.benefits.filter(b => benefits.includes(b))]).filter(([,bs]) => bs.length));
    output.push({ card: result.card, matchedGoals, benefits, benefitsByVariant, activityRank: mode?.[effort] ?? 0 });
  }
  return output.sort((a,b) => b.matchedGoals.length-a.matchedGoals.length || b.activityRank-a.activityRank || a.card.card_id.localeCompare(b.card.card_id));
}
