# Build log — Fratelli's Italian Grille website

Branch: `spec-build/all-1` · Execution: in-tree sequential by wave order (reliability-first on Windows; avoids 16× worktree toolchain reinstalls). Verify gate run per task; full gate per wave integration; Phase 2 browser verification after Phase 1.

## Wave 1

### T-001 · FEAT-foundation-1 · Scaffold — DONE (sonnet, 2 attempts)
- Created Astro 4 + TS strict + Tailwind project; scripts for dev/build/typecheck/test/test:e2e/lint/format/preview; Vitest (astro-aware config) + Playwright (dev-server webServer); ESLint 9 flat config + Prettier; `.nvmrc` (20), `.gitignore`, `.gitattributes` (LF), `.env.example`; `src/env.d.ts`; placeholder `index.astro` (so build has a page — replaced by T-009).
- astro.config: `output: 'static'` with documented static→hybrid upgrade path; `site`/`base` from env (SITE_URL/BASE_PATH).
- Fixes during gate: removed premature `@astrojs/sitemap` activation (owned by T-015; was throwing at build); added `@astrojs/check` for typecheck; ESLint override to allow triple-slash in `*.d.ts`.
- Verify: build ✓ · typecheck 0 errors/0 warnings ✓ · test (vitest) 1 passed ✓ · lint ✓.
- Deferred: `npm audit` reports 6 vulns (1 critical, 2 high) — triage in Phase 3 hardening.
