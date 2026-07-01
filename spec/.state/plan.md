# Build plan — Fratelli's Italian Grille website (all epics)

**Summary:** 16 tasks · 7 waves · models: 0 haiku / 16 sonnet / 0 opus · max parallel width 6

Scale tier `local-tool` (static site, no server/auth/data we operate) → no security-review/code-review/perf-review gate tasks required; supply-chain hygiene (npm audit + secret scan) is attached to the scaffold and the final verification task.

## Risks & gaps
- ⚠ **Formspree endpoint** not yet provided → forms ship in `mailto:` fallback mode (built into the `submit()` seam). Non-blocking for v1; set `PUBLIC_FORMSPREE_ID` repo variable later to enable live delivery.
- ⚠ **Repo name → base path** assumed `fratellis` (`/fratellis/`). Workflow + README read the repo name, so a rename is low-cost. Confirm at deploy.
- ⚠ **Real photography** absent → gallery/home use clearly-named license-clear placeholders, documented swap process. Non-blocking.
- ℹ `astro.config.mjs` is touched by T-001 (create) and T-015 (sitemap) only — serialized across waves. `BaseLayout.astro` by T-004 (create) and T-015 (meta) only — serialized. `config.ts` by T-003 (create) and T-011 (append testimonials) only — serialized. No same-wave file collisions.
- ✅ Acceptance↔task traceability: every feature's criteria map to a task with an asserting unit/e2e test or a Phase-2 runtime check (menu filter/search, forms, lightbox e2e; hours/menu/form/base/submit unit tests; Lighthouse + responsive checks in Phase 2).

## Wave 1 — root
- **T-001** · sonnet · FEAT-foundation-1 — Scaffold Astro+TS+Tailwind + toolchain · verify: typecheck, build, test, lint, audit

## Wave 2 — parallel (deps: T-001)
- **T-002** · sonnet · FEAT-foundation-2 — Design system (tokens + Button/Section + styleguide) · verify: typecheck, build, lint
- **T-003** · sonnet · FEAT-menu-1 — Content collections + seeded real menu/bar/site data + query lib · verify: typecheck, build, test, lint
- **T-013** · sonnet · FEAT-delivery-2 — Pages CI workflow, .nojekyll, base-path check script, deploy README · verify: build, check-base-paths, lint

## Wave 3 (deps: T-002)
- **T-004** · sonnet · FEAT-foundation-3 — Site shell: BaseLayout, Header/nav, Footer, `withBase()`, `submit()` seam, 404 · verify: typecheck, build, test, lint

## Wave 4 — parallel (deps: T-004 [+T-003])
- **T-005** · sonnet · FEAT-content-3 — Contact page + open-now hours logic, HoursTable, OpenNowBadge, MapEmbed · verify: typecheck, build, test, lint
- **T-006** · sonnet · FEAT-menu-2 — Visual filterable food menu page · verify: typecheck, build, lint, e2e:menu
- **T-008** · sonnet · FEAT-engagement-1 — Reservation page + validated form via submit() · verify: typecheck, build, test, lint, e2e:reservation
- **T-010** · sonnet · FEAT-engagement-3 — Photo gallery + accessible lightbox · verify: typecheck, build, lint, e2e:gallery
- **T-011** · sonnet · FEAT-engagement-4 — Testimonials content + page + component · verify: typecheck, build, lint
- **T-014** · sonnet · FEAT-content-2 — About page · verify: typecheck, build, lint

## Wave 5 — parallel
- **T-007** · sonnet · FEAT-menu-3 — From the Bar page (deps: T-006, T-003) · verify: typecheck, build, lint
- **T-009** · sonnet · FEAT-content-1 — Home page (deps: T-004, T-003, T-005, T-011) · verify: typecheck, build, lint
- **T-012** · sonnet · FEAT-engagement-2 — Catering page + inquiry form (deps: T-008) · verify: typecheck, build, lint, e2e:catering

## Wave 6 (deps: T-004, T-005, T-009)
- **T-015** · sonnet · FEAT-delivery-1 — SEO/meta, OG, JSON-LD Restaurant schema, sitemap, robots · verify: typecheck, build, lint

## Wave 7 — final integration gate
- **T-016** · sonnet · FEAT-delivery-2 — Full-site base-path build verification + link/asset integrity + audit/secret-scan (deps: all pages, T-013, T-015) · verify: build, check-base-paths, audit

---
Work items are on `spec/.state/board.md` (sprint = wave). Say the word if you want them pushed to Jira / Linear / GitHub Issues.
