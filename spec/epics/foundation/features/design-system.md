---
id: FEAT-foundation-2
title: Design system implementation
epic: foundation
status: ready
depends_on: [FEAT-foundation-1]
model_hint: sonnet
---

## Summary
Implement the warm-modern-trattoria design system from ADR 0002 as reusable tokens and primitives: Tailwind theme (colors, fonts, spacing, radius, shadow), global CSS, web-font loading, and base components (`Button`, `Section`, headings). Everything downstream consumes these tokens — no ad-hoc colors.

## User stories
- As a developer building any page, I want ready tokens and primitives so the site looks consistent without re-deciding styling.

## Acceptance criteria
- [ ] Tailwind theme defines tokens: `terracotta`, `olive`, `cream`, `charcoal`, `gold`, warm neutrals — referenced by name, not raw hex, in components.
- [ ] Serif display font + sans body font load with `font-display: swap`, limited weights, and are applied via `font-display`/`font-body` utilities or CSS vars.
- [ ] `Button.astro` supports `primary | secondary | ghost` variants and renders as `<a>` or `<button>`; has visible `:focus-visible` styles.
- [ ] `Section.astro` provides consistent max-width, padding, and vertical rhythm.
- [ ] Body text vs background contrast ≥ 4.5:1 (documented token pairing); respects `prefers-reduced-motion`.
- [ ] **Motion utilities (ADR 0003):** a shared scroll-reveal mechanism (e.g. a `reveal` utility / `data-reveal` attribute + CSS + one small `IntersectionObserver` island) and consistent hover/transition tokens. Buttons and cards lift subtly on hover (transform + shadow) via shared `transition-*` utilities. Reveal defaults to visible (no content hidden without JS) and resolves instantly under `prefers-reduced-motion`.
- [ ] A `/styleguide` route (or Vitest/Playwright check) demonstrates tokens + primitives + a reveal/hover example rendering, used for visual verification (may be excluded from nav/sitemap).

## Constraints / non-goals
- Do not build page content or navigation here (that's FEAT-foundation-3 / content epic).
- No raw hex in any component except the Tailwind config/global CSS token definitions.

## Affected areas
- `tailwind.config.*`, `src/styles/global.css`, `src/components/Button.astro`, `src/components/Section.astro`, `src/components/Reveal.astro` (or reveal utility), `src/pages/styleguide.astro`.

## Dependencies
- FEAT-foundation-1 (scaffold).

## Open questions
- None.
