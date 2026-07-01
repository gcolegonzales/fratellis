---
id: FEAT-foundation-1
title: Project scaffold & tooling
epic: foundation
status: ready
depends_on: []
model_hint: sonnet
---

## Summary
Stand up the Astro + TypeScript + Tailwind project with the full quality toolchain (Vitest, Playwright, ESLint, Prettier) and the exact commands listed in `project.md`. This is the base every other task builds on. Configure `astro.config.mjs` for static output today but structured so `output` can move to `hybrid`/`server` with an adapter later (no static-only assumptions baked in).

## User stories
- As the Maintainer, I want one command each to install, build, test, and lint so the project is reproducible on Windows and CI.
- As a future developer, I want the config ready to add SSR/an adapter without restructuring.

## Acceptance criteria
- [ ] `npm install` then `npm run build` succeeds and emits a static `dist/`.
- [ ] `npm run typecheck` (`astro check`) passes with `strict` TypeScript.
- [ ] `npm run test` runs Vitest (at least one passing sample test) and `npm run test:e2e` is wired (Playwright config present; a trivial smoke spec).
- [ ] `npm run lint` (ESLint) and `npm run format` (Prettier) run clean on the scaffold.
- [ ] `astro.config.mjs` reads `site` and `base` from env (`BASE_PATH`, default `/`) and Tailwind is wired via `@astrojs/tailwind`.
- [ ] `output: 'static'` is set with a code comment documenting the static→hybrid upgrade path; no dependency or pattern precludes adding an adapter later.
- [ ] Node version pinned (`.nvmrc` or `engines`), `.gitignore` excludes `node_modules`, `dist`, `.astro`, test artifacts.

## Constraints / non-goals
- Do not add a UI framework (React/Vue/Svelte). Vanilla TS islands only.
- Do not implement pages/content here — scaffold + config + green toolchain only.

## Affected areas
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.*`, `.eslintrc.*`, `.prettierrc`, `playwright.config.ts`, `vitest.config.ts`, `.nvmrc`, `.gitignore`, `tests/`.

## Dependencies
- None (root task).

## Open questions
- None.
