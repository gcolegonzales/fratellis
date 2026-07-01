# 0001. Static Astro stack for a GitHub Pages restaurant site

- Status: accepted
- Date: 2026-06-30

## Context
The site must deploy to GitHub Pages (static hosting, no server we operate), be extremely fast on mobile, be content-maintainable by a non-developer, and present a lot of structured content (a large menu + bar list). It needs a little interactivity (menu filtering, mobile nav, form validation, open-now badge) but no heavy app framework.

## Decision
Use **Astro 4** with static output, TypeScript (strict), and Tailwind CSS. Store menu/bar/testimonials/site info in **Astro Content Collections** validated by Zod. Add interactivity with small vanilla-TS islands, not a SPA framework. Test logic with Vitest and key flows with Playwright. Deploy via a GitHub Actions workflow using `actions/deploy-pages`.

## Consequences
- Zero/near-zero client JS by default → strong Lighthouse scores, easy to hit perf budget.
- Content lives in typed data files → owner edits content without touching layout; schema catches mistakes at build.
- Must handle the Pages subpath (`base`) carefully for all links/assets — mitigated with a `withBase()` helper and a base-path build check.

## Forward-compatibility (deliberate, per the no-lockout rule)
Astro was chosen partly because it does **not** dead-end at static hosting:
- **Static → SSR upgrade path:** `output: 'static'` today; later `hybrid`/`server` via an official adapter (Node/Vercel/Cloudflare) enables per-route server rendering and `src/pages/api/*` endpoints **without changing the content/component model**.
- **Persistence-ready:** menu/bar items are typed records (not prose), so they can later back a cart or move into a DB. The site can adopt a database/ORM at the SSR stage with no rewrite of the presentation layer.
- **Swappable submit seam:** forms call a `submit()` interface (v1 → Formspree/`mailto:`); swapping to `POST /api/reservations` later touches one module, not the UI.
- GitHub Pages (static) is the v1 host; if/when server features land, deploy target moves to an SSR-capable host. This is a host swap, not an app rewrite.
