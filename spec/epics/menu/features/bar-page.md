---
id: FEAT-menu-3
title: From the Bar page
epic: menu
status: ready
depends_on: [FEAT-menu-1, FEAT-foundation-3]
model_hint: sonnet
---

## Summary
Present the bar program — wine (grouped by varietal with glass/bottle prices), beer (domestic/import), and specialty cocktails — in an elegant, scannable layout consistent with the menu page. Reuses the menu data lib and design primitives.

## User stories
- As a Reserver planning date night, I want to browse the wine list and cocktails with prices before I arrive.

## Acceptance criteria
- [ ] `/from-the-bar` renders all bar categories from `FEAT-menu-1` bar data with faithful names and glass/bottle prices.
- [ ] Wine is grouped by varietal; glass vs bottle prices are clearly distinguished; beer lists domestic/import with prices; cocktails show name + description + price.
- [ ] Layout is responsive (no horizontal scroll at 320px), uses design tokens, and is keyboard/screen-reader friendly (semantic headings per section).
- [ ] Optional lightweight filter/jump-to for wine varietals (reusing `filterItems`) — full list visible without JS.
- [ ] A clear "must be 21+" note is shown; links back to food menu and reservations.

## Constraints / non-goals
- No ordering; informational only.

## Affected areas
- `src/pages/from-the-bar.astro`, reuses `MenuSection`/`DishCard` (or a `BarSection` variant), `src/lib/menu.ts`.

## Dependencies
- FEAT-menu-1, FEAT-foundation-3.

## Open questions
- None.
