---
id: FEAT-engagement-4
title: Testimonials
epic: engagement
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
Surface real customer praise as social proof — a `/testimonials` page and a reusable component used on the home page. Testimonials live in typed content data.

## User stories
- As a Diner on the fence, I want to read what other locals say.

## Acceptance criteria
- [ ] Testimonials stored in a typed content collection (`{ quote, author?, source? }`) seeded with the gathered reviews (attribution shown as "Verified guest" / source where the original had no name — do not invent specific names).
- [ ] `/testimonials` renders all reviews in a warm, readable layout (cards or quotes) with tokens styling; responsive + accessible (`<blockquote>`/`<cite>` semantics).
- [ ] A `Testimonials` component renders a subset (e.g. 1–3) for reuse on the home page from the same data (no duplication).
- [ ] No invented reviewer identities or fake reviews.

## Constraints / non-goals
- Do not fabricate quotes or attributions beyond the gathered content.

## Affected areas
- `src/pages/testimonials.astro`, `src/components/Testimonials.astro`, `src/content/testimonials/*`, `src/content/config.ts` (schema).

## Dependencies
- FEAT-foundation-3.

## Open questions
- None.
