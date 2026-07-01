// Prefix internal links/assets with the configured GitHub Pages base path so
// the site works both at the domain root (dev) and under a project subpath
// (e.g. https://user.github.io/fratellis/). ALWAYS route internal hrefs through
// this — never hard-code a leading "/".
//
// `base` defaults to the build-time base but is injectable for unit testing.

export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  // Leave absolute URLs and non-navigational schemes untouched.
  if (
    /^[a-z][a-z0-9+.-]*:\/\//i.test(path) ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('//')
  ) {
    return path;
  }

  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base; // "" or "/fratellis"
  const rel = path.startsWith('/') ? path : `/${path}`;
  const joined = `${trimmedBase}${rel}`;
  return joined === '' ? '/' : joined;
}

/** True when `href` points at `currentPath` (base-agnostic, trailing-slash tolerant). */
export function isActive(href: string, currentPath: string, base?: string): boolean {
  const target = withBase(href, base ?? import.meta.env.BASE_URL);
  const norm = (s: string) => (s.length > 1 && s.endsWith('/') ? s.slice(0, -1) : s);
  return norm(target) === norm(currentPath);
}
