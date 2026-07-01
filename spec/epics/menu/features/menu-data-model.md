---
id: FEAT-menu-1
title: Menu content model & seeded data
epic: menu
status: ready
depends_on: [FEAT-foundation-1]
model_hint: sonnet
---

## Summary
Define typed Astro content collections (Zod schemas) for food menu, bar menu, and the site info, then seed them with the restaurant's real, gathered content. This is the single source of truth for all menu presentation. Records are shaped as future cart-items/DB-rows (stable `id`, `name`, `variants[]`, `price`, `tags`).

## User stories
- As the Maintainer, I want to edit a data file to change a dish, price, or tag without touching layout code.
- As a developer, I want a typed API to query menu data so pages can group/filter reliably.

## Acceptance criteria
- [ ] `src/content/config.ts` defines schemas: `menuItem { id, name, description?, category, variants: [{label?, price}], tags: string[], featured?: bool }` and `barItem { id, name, description?, category, variants: [{label?, price}] }`, plus `site` info (hours, address, phone, etc.). Build fails on schema violation.
- [ ] Food data seeded faithfully from gathered content across categories: Starters, Soups & Salads, Pizza, Calzone & Stromboli, Pasta, Hot Subs, Baked Pasta, Chicken, Veal, Seafood, Ribeye, Sides, Desserts, Lunch Specials, Children's, Drinks — with correct names, descriptions, and prices (including multi-size pizza variants and wing 6/12-pc variants).
- [ ] Bar data seeded: wine (by varietal groups w/ glass+bottle prices), domestic & import beer, specialty cocktails — names + prices faithful to gathered content.
- [ ] Sensible `tags` applied for filtering (e.g. `vegetarian`, `seafood`, `chicken`, `veal`, `pizza`, `pasta`, `house-favorite`); `featured` set on a few signature dishes.
- [ ] `src/lib/menu.ts` exports pure functions: `getCategories()`, `groupByCategory(items)`, `filterItems(items, {category?, tags?, query?})`, `formatPrice(cents|number)` — all unit-tested.
- [ ] Prices stored in a single consistent representation (document it; e.g. number of dollars) and `formatPrice` renders `$X.XX`.

## Constraints / non-goals
- No presentation/markup here — data + schemas + query lib only.
- Do not invent menu items not present in the gathered content; if a price was market-price, represent it explicitly (e.g. `marketPrice: true` with the listed reference).

## Affected areas
- `src/content/config.ts`, `src/content/menu/*`, `src/content/bar/*`, `src/content/site/*`, `src/lib/menu.ts`, `tests/menu.test.ts`.

## Dependencies
- FEAT-foundation-1.

## Open questions
- None.
