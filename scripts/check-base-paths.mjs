// Verifies that every internal link/asset in the built site is prefixed with
// the configured GitHub Pages base path. Run after `npm run build`.
//
//   BASE_PATH=/fratellis/ node scripts/check-base-paths.mjs
//
// When BASE_PATH is '/' (local/root), there is nothing to enforce. Otherwise a
// bare root-absolute href/src (e.g. "/menu") that is NOT prefixed with the base
// would 404 on the subpath — that is a failure.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';
const base = process.env.BASE_PATH ?? '/';

/** @param {string} dir */
async function htmlFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Root-absolute href/src values that are internal but should carry the base.
const ATTR_RE = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;

function isExternalOrSafe(url) {
  return (
    url.startsWith('//') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#') ||
    url.startsWith('data:')
  );
}

async function main() {
  if (base === '/' || base === '') {
    console.log('BASE_PATH is root ("/") — no subpath prefixing to verify. OK.');
    return;
  }

  const files = await htmlFiles(DIST);
  const violations = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    let m;
    while ((m = ATTR_RE.exec(html)) !== null) {
      const url = m[1];
      if (isExternalOrSafe(url)) continue;
      if (!url.startsWith('/')) continue; // relative link — fine
      if (url.startsWith(base)) continue; // correctly prefixed — fine
      violations.push({ file: relative(DIST, file), url });
    }
  }

  if (violations.length > 0) {
    console.error(`\n✖ Found ${violations.length} internal link(s) not prefixed with base "${base}":`);
    for (const v of violations.slice(0, 50)) {
      console.error(`  ${v.file}: ${v.url}`);
    }
    if (violations.length > 50) console.error(`  …and ${violations.length - 50} more`);
    console.error('\nRoute internal links/assets through withBase() (src/lib/base.ts).');
    process.exit(1);
  }

  console.log(`✓ ${files.length} page(s) checked — all internal links prefixed with "${base}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
