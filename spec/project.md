# Project profile

## Stack
- **Astro 4** (static output, `output: 'static'`) — content-driven, ships zero JS by default, ideal for GitHub Pages.
- **TypeScript** (strict) for any logic and Astro component scripts.
- **Tailwind CSS** (via `@astrojs/tailwind`) for the design system; design tokens defined in Tailwind theme config + CSS variables.
- **Astro Content Collections** for menu/bar/testimonials data (typed via Zod schemas).
- Vanilla TS islands (no UI framework) for the small amount of interactivity (menu filtering, mobile nav, form validation, open-now badge).
- **Vitest** for unit tests (data integrity + filtering/hours logic). **Playwright** for end-to-end smoke of key flows.

## Package manager
- **npm** (lockfile committed). Node 20+. Must run identically on Windows (dev) and Ubuntu (CI).

## Scale tier
- `local-tool` — a fully static marketing site: no server, no database, no auth, no PII persisted by us. Form delivery is delegated to a third-party (Formspree) or a `mailto:` fallback. The stack meets the tier.

## Commands  (the build gate runs these — keep exact)
| Purpose    | Command                  |
|------------|--------------------------|
| install    | `npm ci` (or `npm install` first time) |
| dev        | `npm run dev`            |
| build      | `npm run build`          |
| typecheck  | `npm run typecheck` (`astro check`) |
| test       | `npm run test` (`vitest run`) |
| e2e        | `npm run test:e2e` (`playwright test`) |
| lint       | `npm run lint` (`eslint .`) |
| format     | `npm run format` (`prettier --write .`) |
| run/start  | `npm run preview` (serves the built static site) |

## Run & smoke-verify  (how /spec-build Phase 2 launches and checks the running app)
- **Run command:** `npm run dev` (dev) or `npm run build && npm run preview` (production-like).
- **Surface:** web app at `http://localhost:4321` (Astro dev) / the printed preview URL. Exercise: Home, Menu (filter + search), From the Bar, About, Contact (open-now badge, map, click-to-call), Reservations form (validation + submit path), Catering form, Gallery, Testimonials, mobile nav at 375px.
- **Required env/secrets:** none required to run. Optional `PUBLIC_FORMSPREE_ID` enables live form POST; absent → forms use `mailto:` fallback. Optional `BASE_PATH` for Pages subpath (defaults to `/` in dev).
- **"Working" looks like:** dev server boots with no console/network errors; every key flow in `product.md` works; menu filter narrows results; form validation blocks empty/invalid input and shows a confirmation on valid submit; open-now badge reflects current time; no broken images/links; responsive with no horizontal scroll at 320–375px.

## Security & scale gates  (commands for the tier's NFR gates — `/spec-build` runs these)
| Purpose            | Command                         |
|--------------------|---------------------------------|
| dependency audit   | `npm audit --audit-level=high`  |
| secret scan        | `git grep -nE "(formspree\.io/f/|AKIA|-----BEGIN|api[_-]?key\s*=)" -- . ':!*.md'` (no real secrets committed; CI uses repo secrets/`PUBLIC_` build vars only) |

## Definition of Done
A task is done only when build/typecheck, the relevant unit tests, and lint all pass. The **build as a whole** is done only when, on top of that: (1) `npm run build` produces a static site that runs via `npm run preview` and every `product.md` key flow works in `/spec-build` Phase 2, (2) Playwright e2e smoke passes, (3) the dependency audit + secret scan gates pass, and (4) a production build with the Pages `base` path set produces correctly-prefixed links/assets.

## Conventions
- TypeScript strict; no `any`. Prefer pure, unit-testable functions for logic (hours/open-now, menu filtering) in `src/lib/`, separate from presentation.
- Content (menu, bar, testimonials, site info) lives in `src/content/` (Astro collections) — **no hard-coded menu data inside components**. The Maintainer edits these files.
- All internal links/asset URLs go through an `withBase()` helper (or Astro's `import.meta.env.BASE_URL`) so the Pages subpath always works. Never hard-code a leading `/` for internal links.
- Design tokens (colors, fonts, spacing, radius, shadow) defined once in Tailwind config; components consume tokens, no ad-hoc hex values.
- Accessibility is a gate, not a nicety: semantic HTML, labelled controls, keyboard support, focus-visible styles.
- Images: use `<Image>`/responsive sources where possible; every image has meaningful `alt`. Placeholders are clearly named (`placeholder-*`) for easy swap.
- **Supply-chain hygiene:** no secrets in code/logs; third-party form endpoint id provided via `PUBLIC_` build var, not committed.

## Directory map
- `src/pages/` — route pages (`index`, `menu`, `from-the-bar`, `about`, `contact`, `catering`, `gallery`, `reservations`, `testimonials`).
- `src/layouts/` — `BaseLayout.astro` (head/SEO, header, footer).
- `src/components/` — `Header`, `Footer`, `MenuSection`, `DishCard`, `MenuFilter`, `Hero`, `HoursTable`, `OpenNowBadge`, `MapEmbed`, `ReservationForm`, `CateringForm`, `Gallery`, `Testimonials`, `Section`, `Button`.
- `src/content/` — `menu/` (food items), `bar/` (drinks), `testimonials/`, `site/` (info: hours, contact, address) with `config.ts` Zod schemas.
- `src/lib/` — `hours.ts` (open-now logic), `menu.ts` (filtering/grouping), `base.ts` (withBase), `form.ts` (validation).
- `src/styles/` — `global.css` (tokens, base).
- `tests/` — Vitest unit tests; `e2e/` — Playwright specs.
- `.github/workflows/deploy.yml` — GitHub Pages build & deploy.
- `public/` — static assets, favicon, placeholder images.

## Notes for agents
- Astro static output: pages are `.astro`; interactivity uses `<script>` islands or `client:*` directives — keep JS minimal.
- For GitHub Pages project sites, set `site` and `base` in `astro.config.mjs` from env (`BASE_PATH`). Locally `base` is `/`. Test the built output with the base set before declaring deploy-ready.
- Hours/open-now must compute in `America/Chicago` regardless of the visitor's timezone.
- Keep the real menu/bar data faithful to the gathered content (names, descriptions, prices). Prices are the restaurant's actual listed prices.
- **Forward-compatibility (standing rule):** do not lock the project out of future online ordering / DB persistence. All data-changing actions go through a single `submit(payload)` interface in `src/lib/submit.ts` (v1: Formspree/`mailto:`); never hard-code form transport in components. Keep `astro.config` ready to switch `output` static→hybrid and add an adapter later. Menu/bar items stay as typed records suitable to later become cart items / DB rows.
