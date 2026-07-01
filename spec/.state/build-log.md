# Build log — Fratelli's Italian Grille website

Branch: `spec-build/all-1` · Execution: in-tree sequential by wave order (reliability-first on Windows; avoids 16× worktree toolchain reinstalls). Verify gate run per task; full gate per wave integration; Phase 2 browser verification after Phase 1.

## Wave 1

### T-001 · FEAT-foundation-1 · Scaffold — DONE (sonnet, 2 attempts)
- Created Astro 4 + TS strict + Tailwind project; scripts for dev/build/typecheck/test/test:e2e/lint/format/preview; Vitest (astro-aware config) + Playwright (dev-server webServer); ESLint 9 flat config + Prettier; `.nvmrc` (20), `.gitignore`, `.gitattributes` (LF), `.env.example`; `src/env.d.ts`; placeholder `index.astro` (so build has a page — replaced by T-009).
- astro.config: `output: 'static'` with documented static→hybrid upgrade path; `site`/`base` from env (SITE_URL/BASE_PATH).
- Fixes during gate: removed premature `@astrojs/sitemap` activation (owned by T-015; was throwing at build); added `@astrojs/check` for typecheck; ESLint override to allow triple-slash in `*.d.ts`.
- Verify: build ✓ · typecheck 0 errors/0 warnings ✓ · test (vitest) 1 passed ✓ · lint ✓.
- Deferred: `npm audit` reports 6 vulns (1 critical, 2 high) — triage in Phase 3 hardening.

## Wave 2

### T-002 · FEAT-foundation-2 · Design system — DONE (sonnet, 2 attempts)
- Tailwind tokens (terracotta/olive/cream/gold/charcoal scales + warm neutrals), Fraunces+Inter variable fonts, `global.css` (base, focus-visible, reduced-motion), `Button` (primary/secondary/ghost, a/button, focus ring), `Section` (widths/tones), `/styleguide`.
- Fix: `keyof` casts on Section's tone/width lookups (ts7053). Verify: build ✓ · typecheck 0 err ✓ · lint ✓.

### T-003 · FEAT-menu-1 · Content model + data + lib — DONE (sonnet, 1 attempt)
- Zod schemas (menuItem/barItem/site) with build-time validation; seeded the FULL real menu (~100 food items across 16 categories incl. multi-size pizzas, wing 6/12, market-price lobster) + full bar list (wine by varietal glass/bottle, beer, cocktails) + site info (hours/address/phone). Pure `src/lib/menu.ts` (formatPrice/formatVariants/startingPrice/getCategories/groupByCategory/filterItems/getAllTags) with 14 asserting unit tests.
- Verify: typecheck ✓ · build (schema validation) ✓ · test 15 passed ✓ · lint ✓.

### T-013 · FEAT-delivery-2 · Pages CI + base-path infra — DONE (sonnet, 2 attempts)
- `deploy.yml` (build→configure-pages→upload-pages-artifact→deploy-pages, least-priv perms, concurrency, BASE_PATH from repo name, PUBLIC_FORMSPREE_ID repo var), `public/.nojekyll`, `scripts/check-base-paths.mjs` (asserts built internal links carry the base), deploy README.
- Note: local Git Bash mangles `BASE_PATH=/x/` via MSYS path conversion — must set `MSYS_NO_PATHCONV=1` to test locally; unaffected on CI (Linux). Checker verified both ways (passes on valid, flags violations).
- Verify: BASE_PATH build ✓ · check-base-paths ✓ · lint ✓.

### Wave 2 integration — GREEN
- Full suite on integrated branch: build ✓ · typecheck 0 err ✓ · test 15 passed ✓ · lint ✓.
