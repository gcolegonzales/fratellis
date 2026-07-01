---
id: FEAT-engagement-3
title: Photo gallery
epic: engagement
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
A `/gallery` page showcasing food and interior atmosphere in a responsive, performant grid with an accessible lightbox. Uses clearly-named, license-clear placeholder images that the owner can swap for real photos.

## User stories
- As a Diner, I want to see the food and the room before deciding to visit.

## Acceptance criteria
- [ ] `/gallery` renders a responsive masonry/grid of images, each with descriptive `alt`; images are lazy-loaded and appropriately sized (no CLS, perf-budget friendly).
- [ ] Clicking/activating an image opens an accessible lightbox (keyboard: open via Enter/Space, `Esc` closes, focus trapped, arrow keys navigate) with `prefers-reduced-motion` respected. Gallery is fully usable (grid view) without JS.
- [ ] Images live in `public/` (or `src/assets`) with a clear `placeholder-*`/manifest convention and a documented swap process; no images scraped from the original site.
- [ ] Responsive 320px+, no horizontal scroll; Playwright e2e: lightbox opens and closes.

## Constraints / non-goals
- Use only license-clear placeholders/stock or tasteful generated placeholders in v1.

## Affected areas
- `src/pages/gallery.astro`, `src/components/Gallery.astro` + lightbox island, `public/images/`.

## Dependencies
- FEAT-foundation-3.

## Open questions
- [ ] Real photography to replace placeholders (non-blocking; tracked in product.md).
