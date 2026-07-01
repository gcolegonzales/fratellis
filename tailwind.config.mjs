/** @type {import('tailwindcss').Config} */
// Base scaffold config. The full warm-trattoria design tokens (colors, fonts,
// radii, shadows) are layered on top in the design-system task (FEAT-foundation-2).
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
