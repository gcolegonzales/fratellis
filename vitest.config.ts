import { getViteConfig } from 'astro/config';

// Astro-aware Vitest config so `import.meta.env` (incl. BASE_URL) resolves the
// same way it does in the app. Unit tests cover the pure logic in src/lib.
export default getViteConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    globals: false,
  },
});
