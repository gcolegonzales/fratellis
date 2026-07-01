---
id: FEAT-delivery-1
title: SEO, metadata, structured data, sitemap
epic: delivery
status: ready
depends_on: [FEAT-foundation-3, FEAT-content-3]
model_hint: sonnet
---

## Summary
Give every page proper titles/descriptions, Open Graph/Twitter cards, canonical URLs (base-path aware), a sitemap and robots, and JSON-LD `Restaurant` structured data (name, address, geo, hours, phone, menu URL, price range) for rich local-search results.

## User stories
- As a hungry local searching Google, I want Fratelli's to show accurate hours, location, and a tappable call/menu.

## Acceptance criteria
- [ ] `BaseLayout` takes per-page `title`/`description`; each page sets meaningful values; titles follow a consistent pattern (`Page — Fratelli's Italian Grille`).
- [ ] Open Graph + Twitter card tags (title, description, image, url) on all pages; a default social share image exists.
- [ ] Canonical URLs and all metadata URLs respect `site` + `base` (correct on the deployed subpath).
- [ ] JSON-LD `Restaurant` schema emitted with accurate name, address (17588 Airline Hwy, Prairieville, LA 70769), telephone (+1-225-313-4704), `openingHoursSpecification` matching the hours data, `servesCuisine: Italian`, `priceRange`, and `hasMenu` pointing at `/menu`. Validates as well-formed JSON-LD.
- [ ] `@astrojs/sitemap` (or equivalent) generates `sitemap.xml`; `robots.txt` references it; the `/styleguide` route is excluded from sitemap.
- [ ] Build has no broken internal links (link-check or build-time check passes).

## Constraints / non-goals
- Don't fabricate ratings/review-count structured data unless backed by gathered content.

## Affected areas
- `src/layouts/BaseLayout.astro`, `src/components/Seo.astro`, `src/components/RestaurantSchema.astro`, `astro.config.mjs` (sitemap), `public/robots.txt`, `public/og-default.*`.

## Dependencies
- FEAT-foundation-3 (layout), FEAT-content-3 (hours/address source of truth).

## Open questions
- None.
