import type { APIRoute } from 'astro';

// Static sitemap endpoint. Lists all public pages (excludes /styleguide) with
// base-path-aware absolute URLs. Keep in sync when adding top-level pages.
const paths = [
  '',
  'menu',
  'from-the-bar',
  'catering',
  'gallery',
  'about',
  'contact',
  'reservations',
  'testimonials',
];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const loc = (p: string) => {
    const path = `${base}${p}`.replace(/\/{2,}/g, '/');
    return site ? new URL(path, site).href : path;
  };

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${loc(p)}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
