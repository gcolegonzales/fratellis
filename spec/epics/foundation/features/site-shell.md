---
id: FEAT-foundation-3
title: Site shell — layout, header/nav, footer, base-path & submit seams
epic: foundation
status: ready
depends_on: [FEAT-foundation-2]
model_hint: sonnet
---

## Summary
Build the shared `BaseLayout` (document head, skip-link, header, footer, slot), a responsive accessible `Header` with desktop nav + mobile hamburger menu, a `Footer` with hours/address/phone/social, the `withBase()` link helper, and the swappable `submit()` interface stub used by all forms. Every page renders inside this shell.

## User stories
- As a Diner on mobile, I want a clear nav (and a working hamburger menu) so I can reach the menu, contact, and reservations quickly.
- As a developer, I want one place to wrap internal links so the GitHub Pages base path always works.

## Acceptance criteria
- [ ] `BaseLayout.astro` accepts `title`, `description`, and slots content; includes `<header>`, `<main>`, `<footer>` landmarks and a "skip to content" link.
- [ ] `Header` nav links: Home, Menu, From the Bar, Catering, Gallery, About, Contact, plus a prominent "Reserve" CTA; current page is marked `aria-current`.
- [ ] Mobile (<768px): nav collapses to a hamburger that toggles an accessible menu (focus trap or proper focus management, `Esc` closes, `aria-expanded` set); keyboard operable.
- [ ] `Footer` shows address, click-to-call phone `tel:`, hours summary, and social placeholders; year is current.
- [ ] `src/lib/base.ts` exports `withBase(path)` and ALL internal links/asset refs in the shell use it (verified: built site with `BASE_PATH=/fratellis/` has correctly-prefixed links — unit test on `withBase`).
- [ ] `src/lib/submit.ts` exports `submit(formName, payload): Promise<SubmitResult>` with a Formspree implementation (when `PUBLIC_FORMSPREE_ID` set) and a `mailto:` fallback; pure-enough to unit test the payload-building and endpoint-selection logic. Components must call this, never inline a transport.
- [ ] No horizontal scroll at 320px; nav and footer pass keyboard + contrast checks.
- [ ] `BaseLayout` enables **Astro View Transitions** (`<ClientRouter />`) for smooth route transitions (ADR 0003), degrading gracefully where unsupported and honoring `prefers-reduced-motion`. Client islands (mobile nav, menu filter, forms, lightbox, badges) continue to work across client-side navigations.

## Constraints / non-goals
- Do not implement individual page bodies or forms' UI here — only the shell, helpers, and the `submit()` seam.

## Affected areas
- `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/lib/base.ts`, `src/lib/submit.ts`, related island scripts, `tests/base.test.ts`, `tests/submit.test.ts`.

## Dependencies
- FEAT-foundation-2 (tokens/primitives).

## Open questions
- None (social links are placeholders until provided).
