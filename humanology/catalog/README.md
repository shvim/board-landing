# Humanology · scientific catalog and development handoff

**Release 2026-11-26.4** contains 56 routines with 75 scoped benefits. The workbook is the editorial reference. The JSON is the runtime contract. No user information is included.

## Contents

- **Humanology-Catalog.xlsx** includes final cards, claim grades, sources, schedule variants, source dispositions and the complete raw-claim ledger. Cells on the archive sheets are evidence history. The Benefits sheet contains the corrected publication links.
- **catalog.json** contains the curated card, benefit and variant arrays. IDs are stable within a release. Count each card once. Evidence labels are plain language.
- **recommend.mjs** performs deterministic matching using selected goals, confirmed applicability, exclusions and the selected schedule.
- **supabase-seed.sql** installs a versioned, read-only public content table. The seed is transactional and checks that a repeated version has identical content. Requires the standard Supabase roles. Apply it in staging before promotion. To roll back the client, switch the requested version.
- **verify.mjs** runs offline with Node 18+ using `node verify.mjs`. **counts.json** records source and destination counts.

## React Native / Expo

Read the bundled JSON or fetch the pinned release with the Supabase client. Use a single request and cache by version.

```js
const {data, error} = await supabase.from('humanology_catalog_releases')
  .select('payload').eq('version', '2026-11-26.4').single();
if (error) throw error;
const matches = recommend(data.payload, preferences);
```

On the dashboard, show the action, applicable goals, time commitment and a button to start or log it. Surface audience and safety qualifications before starting. Show the evidence label, population, comparator, timeframe, available effect size and paper links in details. If a card offers schedules, give each schedule its own action and linked benefits. Render the selector's scoped results. For Explore, list card titles from the catalog, including cards with empty goals, then apply the same eligibility and safety checks before showing actionable content. Neutral educational previews can ask someone to confirm that a card fits.

The selector accepts arrays named goals, eligibleCards, clearedCards, audience, blocked, activeCards and dismissed. selectedVariants maps card IDs to variant IDs. Only set eligibleCards after the user reads the audience and safety text and confirms applicability. For a clinician-clearance card, clearedCards records the user's confirmation of appropriate professional guidance. Contraindication tags are exclusion shortcuts, not an exhaustive health screen. Unknown eligibility keeps restricted cards out of recommendations. Persist sensitive preferences locally by default. No health information belongs in the catalog table.

When two goals match, show one card with both reasons. For related recommendations, reuse confirmed goal matches, exclude active or dismissed cards, and retain the exact source-supported benefit. Do not add a mood benefit to a heart-health walk based on its walking label. An outcome assigned to a particular population or variant is available only when that condition is met.

Track reminders and points by routine completion, not by how many goals the routine supports. A completed action earns credit once. User logs, dashboard reminders, HealthKit authorization, points transactions and trend computations are separate app features. They are outside this static catalog seed. Display personal changes as observations. A change in heart rate does not demonstrate that a particular activity caused it.

## Scope and acceptance

The export covers all three source catalogs at record level. The publication decision is narrower than an exhaustive independent full-text review of every historical claim. Grade differences, detailed source estimates and the source-to-published-claim links are in the workbook. The seven withdrawn source-ready entries have individual reasons. Several credible benefits remain archived because their exact programs or audiences could not be carried into a responsible app card.

The JSON relationships, workbook reload and offline selector were tested. The migration also passed a local PostgreSQL-compatible PGlite test for installation, idempotency, read-only access and collision rollback. The live Supabase project was not modified. Clinical and high-risk routines require the scoped qualifications shown on each card.

## Citation display

Use research_sources to resolve each source_id. Show title, year, role, what_it_shows, and a link. Show mixed findings alongside supportive ones. Display each card’s research_source_ids once, and filter by benefit source_ids and selected variant when displaying a specific claim. Counts are publications, not independent samples. Never sum review trial counts with their component trials. The audit used indexed abstracts for most publications and targeted full text for details. Archive sheets retain historical source notes.

## Applying the card evidence audit

Use each card's source_notes for the card-specific role and summary of every paper. Resolve its source_id in research_sources. Each benefit lists its own outcome references. Guidelines and related studies can appear in card details without being listed as direct evidence for a benefit. Use variant source_ids for protocols. A research_only statement belongs in research details. The dashboard and Explore preview for the drink swap should show the action and drink-count tracking prompt. The selector excludes its uncertain weight result from visible benefits. The internal grade ledger includes that research-detail statement.

## Second research pass

Display research_summary in the evidence panel as the plain-language evidence description. The 56 card-specific summaries distinguish direct evidence, findings from broader studies, and repeat citations of the same trials. Link each published claim via its own source_ids. Context and conflicting studies are described in source_notes. The workbook’s Second pass sheet records the search topic, newly retained references and decision for each card. This was a targeted search, not an exhaustive systematic review. Existing evidence grades were carried forward without automatic promotions.
