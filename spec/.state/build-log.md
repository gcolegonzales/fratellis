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

## Waves 3–7 (summary)
- **Wave 3 · T-004** site shell — BaseLayout/Header(responsive+a11y mobile nav)/Footer, withBase(), submit() seam, 404. 27 unit tests.
- **Wave 4 · T-005/006/008/010/011/014** contact+open-now(hours, DST-correct), filterable menu, reservations+form, gallery+lightbox, testimonials, about. 49 unit tests; 9 e2e. **Key fix:** `[hidden]{display:none!important}` so Tailwind `flex`/`grid` utilities don't defeat `element.hidden` (broke card/form hiding).
- **Wave 5 · T-007/009/012** From-the-Bar, home (hero/featured/hours/teasers), catering+form. 11 e2e all green.
- **Wave 6 · T-015** SEO/OG/Twitter, JSON-LD Restaurant schema (validated), canonical (base-aware). **Fix:** dropped `@astrojs/sitemap` (v3.7.3 targets Astro 5's build hook → `_routes` undefined on Astro 4.16) in favor of a custom `sitemap.xml.ts` endpoint; robots.txt points to it.
- **Wave 7 · T-016** full-site base-path verification (11 pages ✓), secret scan (clean — only placeholders), dependency audit triaged.

### Phase 3 — audit triage (Scale tier: local-tool)
- `npm audit`: 11 vulns (1 critical, 2 high, 8 moderate). **All are dev-dependency advisories** (Astro & Vite dev-servers, Vitest `@vitest/mocker`, `yaml` inside the type-checker). The deployed GitHub Pages artifact is static HTML/CSS/JS and ships NONE of these packages → no exposure to site visitors. `npm audit fix` (safe) clears none; remaining fixes need breaking majors (Astro 5 / Vitest 3), not forced pre-launch.
- **Decision:** accepted as documented dev-only risk. Follow-up: upgrade dev toolchain (Astro 5 / Vitest 3) to clear.
- Secret scan: clean (matches were `.env.example` doc + test placeholders only). No secrets committed.
- Final integrated verify: typecheck 0 err · build 11 pages · 49 unit tests · 11 e2e · lint clean · base-path check ✓.

## Change 1 — presentational home + motion system (via /change)
- **Spec-first:** reframed FEAT-content-1 (home = presentational, no dish/price catalog up front), added ADR 0003 (Motion & transitions), motion notes to product.md + FEAT-foundation-2/3. Spec diff committed.
- **Home redesign:** hero → ambiance/story ("Benvenuti") → understated "Explore the menu →" band (no DishCard grid) → plan-your-visit (hours/open-now) → quiet 2-up testimonials → catering. Removed featured-dish catalog + menu-data import from the home page.
- **Motion system (ADR 0003):** scroll-reveal (`[data-reveal]` + IntersectionObserver in BaseLayout, visible-by-default, reduced-motion safe), hover-lift on Button/DishCard/Testimonials, Astro **ViewTransitions** (Astro 4 name; not `ClientRouter`) for smooth route fades.
- **Island durability:** refactored every client island (Header nav, menu filter, reservation + catering forms, gallery lightbox, OpenNowBadge, HoursTable) to (re)initialize on `astro:page-load` so interactivity survives View-Transition navigations; document-level listeners bound once and query live DOM.
- **Verified in browser:** home is presentational; client-nav home→menu keeps eval context (SPA) and the menu filter re-inits (23 seafood); mobile nav re-binds after nav; reveal active; no console errors. Gate: typecheck 0 err · build 11 pages · 49 unit · 11 e2e · lint ✓.
