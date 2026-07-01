# 0003. Motion & transitions system

- Status: accepted
- Date: 2026-06-30

## Context
The site should feel sleek and modern, not static. We want a consistent, tasteful motion language across every page and a smooth feel between routes — without hurting performance or accessibility. Motion decisions made ad hoc per component drift and get heavy; one system keeps them coherent (and is a standing preference for future UI).

## Decision
Adopt a small, shared motion system:

- **Route transitions:** enable **Astro View Transitions** (`<ClientRouter />` in `BaseLayout`) for smooth cross-page navigation, with a graceful fallback where unsupported.
- **Scroll reveals:** a single reusable mechanism (an `IntersectionObserver`-based `reveal` utility / `data-reveal` attribute + CSS) fades/rises sections and cards into view as they enter the viewport. One implementation, applied via a class/attribute — not per-component bespoke code.
- **Micro-interactions:** consistent hover/focus transitions on interactive elements — buttons and cards lift subtly (transform + shadow), links/chips ease their colors. Driven by Tailwind `transition-*` utilities using shared duration/easing.
- **Tokens:** standard durations (~150–400ms) and easing curves; animate only GPU-friendly properties (`transform`, `opacity`).
- **Accessibility:** all motion respects `prefers-reduced-motion: reduce` — reveals resolve to their final state instantly, route transitions and hover motion are disabled/minimized. Motion is never required to understand or operate the UI.

## Consequences
- Coherent, modern feel with one place to tune timing/easing.
- View Transitions require client-side navigation JS (small) — acceptable; SSR-static output still works, and reduced-motion users opt out.
- Scroll-reveal must not cause layout shift or hide content when JS is unavailable — reveal utilities default to visible and only animate as an enhancement.
