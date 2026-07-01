---
id: FEAT-menu-2
title: Visual filterable food menu page
epic: menu
status: ready
depends_on: [FEAT-menu-1, FEAT-foundation-3]
model_hint: sonnet
---

## Summary
The flagship page: present the full food menu grouped by category with a sticky category navigator, a tag filter, and a live text search. Each dish renders as a card with name, description, price(s), and tags. Must be beautiful, fast, and fully usable on mobile and with the keyboard.

## User stories
- As a Diner, I want to jump to a category, filter by type (e.g. seafood, vegetarian), and search by name so I can find dishes fast.
- As a Diner on a phone, I want the menu to be easily scannable with clear prices.

## Acceptance criteria
- [ ] `/menu` renders every category section from `FEAT-menu-1` data with all items and prices; multi-variant items (pizza sizes, wings) show each priced variant.
- [ ] A sticky category navigator (or in-page anchors) lets users jump to a category; active category is indicated.
- [ ] Tag filter chips narrow visible dishes; combining tags + search works; a "clear filters" control resets; result count is announced.
- [ ] Text search filters dishes by name/description case-insensitively, live (debounced), with a "no results" state.
- [ ] Filtering/search uses the pure `filterItems` from `src/lib/menu.ts`; the island is progressive-enhancement (full menu visible with JS disabled).
- [ ] Featured/signature dishes are visually highlighted.
- [ ] Keyboard accessible (chips are buttons, search is labelled); no horizontal scroll at 320px; images (if any) have alt text; Playwright e2e covers: filter narrows results, search finds a known dish, clear resets.

## Constraints / non-goals
- No add-to-cart/ordering UI in v1 (but DishCard structure should not preclude adding an action button later).
- Read-only presentation of FEAT-menu-1 data; no separate copy of menu content.

## Affected areas
- `src/pages/menu.astro`, `src/components/MenuSection.astro`, `src/components/DishCard.astro`, `src/components/MenuFilter.astro` + island script, `e2e/menu.spec.ts`.

## Dependencies
- FEAT-menu-1 (data/lib), FEAT-foundation-3 (shell).

## Open questions
- None.
