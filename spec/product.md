# Fratelli's Italian Grille — Website

## Vision
A greatly-improved, warm and appetizing website for Fratelli's Italian Grille, a family-owned Italian restaurant in Prairieville, Louisiana (established 2017). The site replaces the existing dated brochure site with a modern, fast, mobile-first experience that makes the food look irresistible, surfaces the full menu in a browsable/filterable way, drives reservations and catering inquiries, and clearly communicates hours, location, and the family's story. It ships as a fully static site deployable to GitHub Pages with no server we operate.

## Goals
- Showcase the full food and bar menus in a visually rich, filterable, mobile-friendly format (replacing flat PDF/text menus).
- Make it effortless to take action: call, get directions, request a reservation, or request catering.
- Tell the family-owned, made-to-order story in a way that builds trust and appetite.
- Achieve excellent performance and accessibility: Lighthouse ≥ 95 performance/accessibility/SEO on the deployed build; fully responsive 320px → desktop.
- Be content-maintainable: menu, hours, and testimonials live in structured data files the owner can edit without touching layout code.
- Deploy automatically to GitHub Pages on push to the default branch.

## Non-goals (v1 scope only — NOT architectural ceilings)
These are excluded from the **first release**, but the architecture must remain able to add them later without a rewrite (see "Forward-compatibility" below):
- No real-time online ordering / payment processing **in v1** (menu is informational; ordering is phone/in-person). Architecture must keep this reachable.
- No login / user accounts **in v1**. Architecture must not preclude adding auth later.
- No CMS/admin UI **in v1** — content is edited via structured data files in the repo.
- No server we operate and no database **in v1**. Form submissions go to a third-party form service (Formspree) or fall back to a `mailto:`/`tel:` action — but behind a swappable interface so a future `/api/*` route + DB can replace it.

Permanent (not just v1):
- We do NOT copy the original site's styling, layout, or color scheme — this is a redesign.

## Forward-compatibility (must-hold architectural constraints)
> Standing rule: no project may be locked out of plausibly-important future features by its technology.
- **Upgradable rendering:** stay on a stack that goes static → SSR/hybrid without a rewrite. Astro's `output` can move from `static` to `hybrid`/`server` via an adapter; do not adopt patterns that assume static-forever.
- **Swappable side effects:** all data-changing actions (reservation submit, catering submit, future "add to cart") call a thin `submit(payload)` interface in `src/lib/`. v1 implementation = Formspree/mailto; a future implementation = `POST /api/...`. Callers/components must not hard-code the transport.
- **Data-model-ready content:** menu/bar items are typed records (id, name, variants[], price, tags) — already shaped so they could be rows in a future DB or items in a cart, not prose blobs.
- **No lock-in deps:** avoid libraries/hosting that can't coexist with a future server runtime or DB.

## Personas
- **Hungry local (Diner)** — lives in/around Ascension Parish, on a phone, wants to see the menu, prices, hours, and either call or get directions in under 30 seconds.
- **Date-night planner (Reserver)** — wants ambiance cues and an easy way to request a table for a specific date/time/party size.
- **Event organizer (Caterer)** — planning a party/office event, wants to know catering is offered and submit an inquiry with details.
- **Owner (Maintainer)** — non-developer; needs to update menu items, prices, hours, and testimonials by editing simple data files.

## Key flows
1. **Browse the menu:** Land on Home → tap "Menu" → see categories (Starters, Pizza, Pasta, Chicken, Veal, Seafood, etc.) → filter by category and/or dietary tag (vegetarian, seafood, etc.) and/or search → view dish name, description, price.
2. **See the bar list:** Menu → "From the Bar" → browse wine (by varietal), beer, and specialty cocktails with prices.
3. **Make contact / reserve:** From any page → tap phone (mobile click-to-call) OR open Reservations → fill date/time/party size/contact → submit → see confirmation; submission routed to the restaurant.
4. **Request catering:** Catering section → read what's offered → submit catering inquiry form (event date, headcount, contact, details) → confirmation.
5. **Find & visit:** Contact page → see hours (with "Open now / Closed" indicator), address, embedded map, get-directions link, click-to-call.
6. **Get a feel for the place:** Home/Gallery → photos of food/interior; Testimonials → real customer quotes.

## Constraints
- **Fully static** output deployable to GitHub Pages under a project subpath (e.g. `https://<user>.github.io/fratellis/`). All asset/links must respect the configured `base` path.
- Build tooling must run on Windows and in GitHub Actions (Ubuntu) identically.
- All real business facts must be accurate: address 17588 Airline Hwy, Prairieville, LA 70769; phone (225) 313-4704; hours Tue–Thu & Sun 11–9, Fri–Sat 11–10, Mon closed; established 2017.
- Design direction is fixed: **warm modern trattoria** — terracotta / olive / cream palette, elegant serif display headings + clean sans body, generous food imagery, soft shadows, rounded-but-refined. Do not reuse the original site's look.
- **Motion & feel:** the site should feel sleek and modern — tasteful entrance/scroll-reveal animations, smooth hover/state transitions, and smooth page/route transitions (see ADR 0003). Motion is refined, GPU-friendly, and always respects `prefers-reduced-motion`; it must never be required to understand or operate the UI.
- **Home page is presentational, not a catalog:** the landing page leads with brand, ambiance, and story; it must not front-load the menu as dish/price cards. The menu lives on `/menu` and is reached from the home page via an understated invitation.
- Imagery: use license-clear placeholder/stock food photography (or tasteful CSS/gradient placeholders) clearly swappable for the restaurant's real photos. No scraping of the original site's images.

## Non-functional requirements
- **Scale tier:** `local-tool` (static marketing site — no server, no data store, no auth we operate; form delivery is delegated to a third party). Basic supply-chain hygiene still applies.
- **Perf budget:** Largest Contentful Paint < 2.0s on a mid-tier mobile over the deployed build; total initial JS < 100KB gzipped (Astro ships zero JS by default; interactivity is progressive). Lighthouse ≥ 95 perf/a11y/best-practices/SEO.
- **Accessibility:** WCAG 2.1 AA — semantic landmarks, keyboard-navigable nav and menus, visible focus, alt text, color contrast ≥ 4.5:1 for body text.
- **Data classification:** No PII stored by us. Form inputs are transmitted to the configured third-party form endpoint over HTTPS; we do not persist them.

## Authorization model
Not applicable — there is no server we operate, no authenticated actor, and no data store. All content is public. Form submissions are handled by a third-party service with its own controls. (Scale tier `local-tool`.)

## Glossary
- **Dish** — a single menu item: name, optional description, one or more priced variants (e.g. pizza sizes), tags.
- **Variant** — a priced option of a dish (e.g. "12\"" / "14\"" / "16\"" or "6 pc" / "12 pc").
- **Category** — a menu grouping (Starters, Pizza, Pasta, Chicken, Veal, Seafood, Desserts, Lunch Specials, Children's, Drinks).
- **Tag** — a filterable attribute on a dish (e.g. `vegetarian`, `seafood`, `chicken`, `veal`, `spicy`, `house-favorite`).
- **Base path** — the GitHub Pages subpath the site is served from; all internal links/assets must be prefixed with it.
- **Open-now indicator** — computed UI badge showing whether the restaurant is currently open, from the hours data + current local time (America/Chicago).

## Open questions
- [ ] Final repository name (affects GitHub Pages base path). **Assumption:** repo `fratellis` → base `/fratellis/`. Confirm before/at deploy.
- [ ] Formspree (or equivalent) endpoint ID for live form delivery. **Assumption:** forms ship in `mailto:`-fallback mode until an endpoint is provided via build-time config; no blocker for v1 launch.
- [ ] Real food/interior photography. **Assumption:** ship with license-clear placeholders, clearly swappable.
