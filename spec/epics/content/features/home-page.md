---
id: FEAT-content-1
title: Home page
epic: content
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
A **presentational, atmospheric** landing experience — the digital equivalent of walking up to the restaurant. It leads with brand, mood, and story, not a catalog: a striking full-bleed hero, an ambiance/story section, and an invitation to visit (hours, location, open-now). The menu is **not** thrown at the visitor as dish cards up front; instead a single elegant, understated invitation ("Explore the menu →") sits lower in the page. Sets tone first, then routes to the key flows. Prioritize mood over information density.

## User stories
- As a Diner, landing on the page I first get a feeling for the place — warm, authentic, inviting — before I'm asked to do anything.
- As a Diner, I can still find my way to the menu, reservations, and directions without them dominating the first screen.
- As a Reserver, I can get to reservations from the hero.

## Acceptance criteria
- [ ] `/` opens with an immersive, image-led hero: restaurant name, a short evocative tagline, and primary CTAs ("View Menu", "Reserve a Table") using `withBase` links. The hero is the focus of the first screen — no dish/price cards above the fold.
- [ ] A presentational **ambiance/story** section (brief welcome copy drawn from the About story, with imagery) follows the hero — mood, not menu.
- [ ] The menu is surfaced only as a **single understated invitation** (e.g. an "Explore the menu →" band or link to `/menu`), NOT a grid of signature-dish cards. Do not render `DishCard`/price catalog content on the home page.
- [ ] An hours/location "plan your visit" section shows today's hours + an Open-now/Closed badge (reusing `FEAT-content-3` open-now logic), address, and a "Get Directions" link.
- [ ] A restrained social-proof moment (one or two testimonials, quietly presented) links to `/testimonials`; a catering invitation links to `/catering`.
- [ ] Sections animate in tastefully on scroll and transitions feel smooth (per ADR 0003), degrading gracefully with `prefers-reduced-motion`.
- [ ] Fully responsive (320px+), no layout shift from the hero image, all images have alt text, CTAs keyboard reachable with visible focus.
- [ ] Lighthouse (local production build) perf & a11y ≥ 95 for this page.

## Constraints / non-goals
- Reuse testimonial/site data — no hard-coded duplicate content.
- **Do not** present the menu as a dish/price catalog on the home page — that lives on `/menu`. The home page is presentational.

## Affected areas
- `src/pages/index.astro`, `src/components/Hero.astro`, reuses `OpenNowBadge`, `Testimonials`, `Section`, `Button` (no longer `DishCard`).

## Dependencies
- FEAT-foundation-3; soft-reuses FEAT-content-3 open-now logic (shared `OpenNowBadge`), FEAT-engagement-4 (`Testimonials`), and the motion system (ADR 0003 / FEAT-foundation-2).

## Open questions
- None.
