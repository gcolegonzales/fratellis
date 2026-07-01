# Fratelli's Italian Grille — Website

A fast, mobile-first website for [Fratelli's Italian Grille](https://www.google.com/maps?q=17588+Airline+Hwy,+Prairieville,+LA+70769) — a family-owned Italian restaurant in Prairieville, Louisiana (est. 2017). Built with [Astro](https://astro.build), TypeScript, and Tailwind CSS, and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script              | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Build the static site to `dist/`               |
| `npm run preview`   | Serve the built site                           |
| `npm run typecheck` | `astro check` (strict TypeScript)              |
| `npm run test`      | Unit tests (Vitest)                            |
| `npm run test:e2e`  | End-to-end tests (Playwright)                  |
| `npm run lint`      | ESLint                                         |
| `npm run format`    | Prettier                                       |

## Editing content

All copy that changes often lives in typed data files — no layout code required:

- **Menu:** `src/content/menu/food.json`
- **Bar / wine list:** `src/content/bar/drinks.json`
- **Hours, address, phone:** `src/content/site/info.json`
- **Testimonials:** `src/content/testimonials/reviews.json`
- **Photos:** drop images in `public/images/` and reference them in the gallery.

The build validates this data against a schema (`src/content/config.ts`), so a typo or missing price fails the build instead of shipping broken.

## Deploying to GitHub Pages

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

**One-time setup:**

1. Push this repository to GitHub (default branch `main`).
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The next push to `main` builds and publishes the site.

The site is served from a project subpath: **`https://<owner>.github.io/<repo>/`** (e.g. `https://gcolegonzales.github.io/fratellis/`). The workflow derives the base path from the repository name automatically, so renaming the repo just changes the URL — no code edits needed.

### Optional: live form delivery

Reservation and catering forms work out of the box in **`mailto:` fallback** mode (they open the visitor's email client, pre-filled). To deliver submissions to a [Formspree](https://formspree.io) inbox instead:

1. Create a Formspree form and copy its id (the `xxxxxxxx` in `https://formspree.io/f/xxxxxxxx`).
2. In the repo, add a **repository variable** (Settings → Secrets and variables → Actions → Variables) named `PUBLIC_FORMSPREE_ID` set to that id.
3. Re-deploy.

## Forward-compatibility

The site ships fully static today, but is deliberately built so it can grow: Astro's `output` can move from `static` to `hybrid`/`server` with an adapter to add server routes (e.g. `/api/reservations`) and a database — without restructuring the content or components. All form submissions already flow through a single swappable `submit()` interface (`src/lib/submit.ts`), and menu items are typed records ready to back a cart or a database. See `spec/decisions/0001-static-astro-stack.md`.
