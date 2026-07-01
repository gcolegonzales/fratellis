# 0002. Warm modern trattoria design system

- Status: accepted
- Date: 2026-06-30

## Context
The redesign must look nothing like the original site and must "greatly improve" it: appetizing, warm, modern, trustworthy, mobile-first. We need a single locked design language so every feature is visually consistent and parallel build tasks don't drift.

## Decision
Adopt a **warm modern trattoria** system, defined once in Tailwind config + CSS variables:

- **Palette (tokens):**
  - `terracotta` (primary, ~#B5562F) — CTAs, accents
  - `olive` (~#5B6236) — secondary accents, tags
  - `cream` (~#FBF6EC) — page background
  - `charcoal` (~#2B2622) — body text
  - `gold` (~#C8972B) — subtle highlights/dividers
  - neutral warm grays for surfaces; ensure body text contrast ≥ 4.5:1.
- **Type:** elegant serif display (e.g. *Playfair Display* / *Fraunces*) for headings; clean humanist sans (e.g. *Inter* / *Source Sans*) for body. Self-host or use a privacy-friendly font CDN; weights limited for perf.
- **Shape & depth:** generous radius (8–16px), soft layered shadows, ample whitespace, full-bleed food imagery with subtle gradient overlays for text legibility.
- **Components:** consistent `Button` (primary/secondary/ghost), `Section` wrapper, card patterns for dishes and testimonials.
- **Motion:** subtle, respectful of `prefers-reduced-motion`.

## Consequences
- All colors/fonts referenced via tokens — no ad-hoc hex in components; redesigns/tweaks are central.
- Slight font-loading cost — mitigated with `font-display: swap`, preloading, and limited weights.
- Locks visual direction so parallel feature builds stay coherent.
