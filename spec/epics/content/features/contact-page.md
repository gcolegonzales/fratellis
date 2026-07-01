---
id: FEAT-content-3
title: Contact page — hours, open-now, map, directions
epic: content
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
Make visiting frictionless: full hours table with a computed Open-now/Closed badge (America/Chicago), address, embedded map, get-directions link, and click-to-call. Hours/address come from site content data. Includes the open-now logic reused by Home and Header.

## User stories
- As a Diner, I want to know if they're open right now, where they are, and tap to call or navigate.

## Acceptance criteria
- [ ] `src/lib/hours.ts` exposes pure `isOpenNow(hours, now)` and `nextChange(hours, now)` computing in `America/Chicago`; covered by Vitest with cases across each day incl. Monday-closed and Fri/Sat late close. (Tests inject `now`, not the system clock.)
- [ ] `OpenNowBadge` renders "Open now" / "Closed — opens <day/time>" from that logic.
- [ ] `/contact` shows: full weekly `HoursTable` (Tue–Thu & Sun 11–9, Fri–Sat 11–10, Mon closed), the address, phone as `tel:` click-to-call, an embedded map (keyless Google Maps embed via address query in an `<iframe>` with a title), and a "Get Directions" link opening maps with the address.
- [ ] All contact facts come from `src/content/site` (single source), not hard-coded in the page.
- [ ] Map iframe is lazy-loaded and titled; page is responsive and keyboard accessible; no console errors.

## Constraints / non-goals
- No contact form here (reservations/catering forms are their own features) — but may link to them.

## Affected areas
- `src/pages/contact.astro`, `src/components/HoursTable.astro`, `src/components/OpenNowBadge.astro`, `src/components/MapEmbed.astro`, `src/lib/hours.ts`, `tests/hours.test.ts`.

## Dependencies
- FEAT-foundation-3; provides open-now logic consumed by FEAT-content-1 and the Header.

## Open questions
- None.
