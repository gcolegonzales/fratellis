---
id: FEAT-content-1
title: Home page
epic: content
status: ready
depends_on: [FEAT-foundation-3, FEAT-menu-1]
model_hint: sonnet
---

## Summary
The landing experience: a warm, appetizing hero, quick highlights (signature dishes pulled from featured menu data), an hours/location strip with open-now state, social proof teaser (a testimonial), and clear CTAs (View Menu, Reserve, Get Directions, Call). Sets the tone and routes users to the key flows.

## User stories
- As a Diner, within seconds of landing I can see what the place is, that it's open, and how to view the menu or call.
- As a Reserver, I can get to reservations from the hero.

## Acceptance criteria
- [ ] `/` renders a hero with restaurant name, a short appetite-driving tagline, and primary CTAs ("View Menu", "Reserve a Table") using `withBase` links.
- [ ] A "signature dishes" section pulls `featured` items from menu data (no duplicated content) and links to `/menu`.
- [ ] An hours/location strip shows today's hours + an Open-now/Closed badge (reusing `FEAT-content-3` open-now logic) and a "Get Directions" link.
- [ ] At least one testimonial teaser links to `/testimonials`; a catering teaser links to `/catering`.
- [ ] Fully responsive (320px+), no layout shift from the hero image, all images have alt text, CTAs keyboard reachable with visible focus.
- [ ] Lighthouse (local production build) perf & a11y ≥ 95 for this page.

## Constraints / non-goals
- Reuse menu/testimonial/site data — no hard-coded duplicate content.

## Affected areas
- `src/pages/index.astro`, `src/components/Hero.astro`, reuses `OpenNowBadge`, `DishCard`, `Section`, `Button`.

## Dependencies
- FEAT-foundation-3, FEAT-menu-1; soft-reuses FEAT-content-3 open-now logic (coordinate the shared `OpenNowBadge`).

## Open questions
- None.
