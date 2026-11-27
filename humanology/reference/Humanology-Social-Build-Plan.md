# Humanology — Social build-plan addendum
Date: November 25, 2026

## Confirmed direction
Include social participation and user-created personal habits in the initial build plan. Humanology's reviewed, science-backed library remains the foundation. This addendum records the conversation's decisions; it does not replace the existing onboarding brief.

## Launch scope
- Private, invitation-only circles for friends, couples, and families.
- “Do this with someone” from a habit; invitation link opens the relevant shared challenge after signup.
- Shared challenges using either a reviewed library habit or a user-created personal habit. Members can also support one another while pursuing different habits.
- Create a personal habit with a title, action, schedule, optional duration, and completion rule. Example: take a 20-minute break after lunch. Optional private reflection: how calm did I feel afterward?
- Label custom habits “Personal habit · Not evidence-rated.” Preserve this label in invitations, challenge details, and progress views. User observations do not become scientific claims or inherit the library's evidence rating.
- Show shared completions and simple encouragement reactions. Celebrate accumulated group milestones without resetting everyone’s progress when someone misses a day.
- Sharing is opt-in per habit. Sleep, weight, heart rate, personal reflections, and other health records remain private by default.
- Members can leave circles and revoke sharing; include invite revocation, blocking/reporting, and notification controls.

## Proposed acquisition and subscription rules — not final pricing commitments
- Explore a one-month guest pass for a new user invited into a shared challenge.
- Explore awarding the inviter a free month after the invited user becomes a paying subscriber, rather than on signup alone.
- Suggested initial limits: one guest pass per subscriber and one introductory guest benefit per newcomer; final limits remain open.
- Determine whether guest access covers the shared challenge only or all premium features.
- Implement real billing benefits for monthly and annual subscribers; granting access alone must not be described as a free month if billing continues unchanged.
- Verify store-supported billing mechanisms before promising referral benefits. Guest access must not silently start billing.
- Permanent one-habit-free access is not decided. The latest alternative discussed was a full-access trial followed by subscription; trial duration and stacking with guest passes remain open.

## Implementation requirements
Use the proposed React Native/Expo app and Supabase backend. Model circles, memberships, expiring invitations, challenge definitions, participants, check-ins, reactions, sharing permissions, guest access grants, and referral qualification records.

Keep reviewed habits and personal habits distinguishable in data as well as UI. Enforce membership, sharing, access expiry, and reward qualification on the server. Keep health measurements separate from social activity. Make offline check-in synchronization idempotent so retries cannot duplicate progress or rewards.

## Acceptance checks
1. A new user follows an invitation, signs up, and lands in the correct challenge.
2. A personal habit retains its evidence label everywhere it is shared.
3. A circle member can see only deliberately shared activity, never private measurements or reflections.
4. Leaving or revoking sharing removes future access to the relevant activity.
5. Offline retries do not duplicate check-ins or milestone awards.
6. Guest expiry preserves history and clearly explains access options.
7. Referral credit is issued at most once per qualifying conversion; monthly and annual billing behavior is tested before release.

## Scope boundary
Start with private circles and reactions. Public discovery of user-created health advice and open messaging require a separate product and moderation decision. Financial reward eligibility for custom habits and shared challenges remains undecided.
