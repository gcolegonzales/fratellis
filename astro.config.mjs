// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// GitHub Pages project site is served from https://<owner>.github.io/<repo>/.
// `site` + `base` are read from env so CI can inject the repo name, while local
// dev defaults to the root. All internal links/assets must go through the
// withBase() helper (src/lib/base.ts) so they resolve under this base path.
const SITE = process.env.SITE_URL ?? 'https://gcolegonzales.github.io';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',

  // Forward-compatibility (see spec/decisions/0001): the site ships fully
  // static today, but Astro's `output` can move to 'hybrid'/'server' with an
  // official adapter later to add server routes (e.g. /api/reservations) and a
  // database WITHOUT restructuring the content/component model. Do not add
  // patterns that assume static-forever.
  output: 'static',

  // Sitemap + robots are added in the SEO task (FEAT-delivery-1) via
  // @astrojs/sitemap, filtering out /styleguide.
  integrations: [tailwind({ applyBaseStyles: false })],
});
