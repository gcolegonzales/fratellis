---
id: FEAT-content-2
title: About page
epic: content
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
Tell Fratelli's family-owned, made-to-order story (established 2017, Prairieville / Ascension Parish, fresh ingredients, true Italian dining) in a warm editorial layout with imagery. Builds trust and appetite; reinforces the brand.

## User stories
- As a Diner deciding where to eat, I want to understand who runs this place and why it's worth visiting.

## Acceptance criteria
- [ ] `/about` presents the story using the gathered, accurate facts (family-owned, est. 2017, prepared-to-order, fresh ingredients, authentic Italian, local to Ascension Parish) — rewritten in our own polished voice, not copied verbatim from the source site.
- [ ] Editorial layout with at least one image and pull-quote; responsive; tokens-based styling.
- [ ] Includes CTAs to View Menu and Reserve; accessible headings/landmarks; images have alt text.
- [ ] No invented facts (no fake awards, named chefs, etc. beyond what was gathered).

## Constraints / non-goals
- Do not fabricate history or credentials.

## Affected areas
- `src/pages/about.astro`, reuses `Section`, `Button`.

## Dependencies
- FEAT-foundation-3.

## Open questions
- None.
