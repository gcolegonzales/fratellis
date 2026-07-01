---
id: FEAT-delivery-2
title: GitHub Pages CI deploy & base-path correctness
epic: delivery
status: ready
depends_on: [FEAT-foundation-1]
model_hint: sonnet
---

## Summary
Automate deployment to GitHub Pages via GitHub Actions, building with the correct `site`/`base` for a project page (`https://<owner>.github.io/<repo>/`) and verifying all links/assets resolve under that subpath. Includes a SPA-safe 404 and a `.nojekyll` so underscore-prefixed Astro assets serve correctly.

## User stories
- As the Maintainer, I want every push to the default branch to publish the latest site automatically.
- As a Diner, I want every page/asset to load (no 404s) on the published subpath.

## Acceptance criteria
- [ ] `.github/workflows/deploy.yml` builds on push to the default branch using `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, with `BASE_PATH` derived from the repo name and Pages `permissions`/`concurrency` set correctly.
- [ ] `astro.config.mjs` sets `site: https://<owner>.github.io` and `base: /<repo>/` from env at build time; a local `BASE_PATH=/fratellis/ npm run build` produces output whose internal links/asset URLs are all prefixed (verified by a check script or test over `dist/`).
- [ ] `.nojekyll` is emitted into the artifact; a custom `404.astro` builds to `404.html`.
- [ ] README documents: one-time "enable Pages → GitHub Actions" setting, the resulting URL, and how to set `PUBLIC_FORMSPREE_ID` (repo variable) for live forms.
- [ ] The workflow is valid YAML and uses pinned action versions; no secrets are required for a static build (Formspree id is a public `PUBLIC_` build var/repo variable).

## Constraints / non-goals
- v1 deploys the static build only. (Forward-compat: when SSR is later adopted, this workflow is replaced by an SSR host deploy — documented, not built now.)

## Affected areas
- `.github/workflows/deploy.yml`, `astro.config.mjs`, `src/pages/404.astro`, `public/.nojekyll`, `scripts/check-base-paths.mjs`, `README.md`.

## Dependencies
- FEAT-foundation-1 (build); consumes base-path helper from FEAT-foundation-3.

## Open questions
- [ ] Final repo name → base path. Assumption `fratellis`; confirm at deploy (README + workflow read repo name, so a rename is low-cost).
