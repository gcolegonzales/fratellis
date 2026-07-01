/** @type {import('tailwindcss').Config} */
// Warm modern trattoria design system (spec/decisions/0002).
// All component colors reference these token names — never raw hex.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF6EC',
          50: '#FFFDF8',
          100: '#FBF6EC',
          200: '#F3E9D4',
          300: '#EADCBC',
        },
        terracotta: {
          DEFAULT: '#B5562F',
          50: '#FBF0EB',
          100: '#F6DDD1',
          200: '#EBB9A3',
          300: '#DE9375',
          400: '#CB6E48',
          500: '#B5562F',
          600: '#9A4526',
          700: '#7C371F',
          800: '#5E2A18',
          900: '#3F1D11',
        },
        olive: {
          DEFAULT: '#5B6236',
          50: '#F3F4EC',
          100: '#E3E5D0',
          200: '#C7CBA2',
          300: '#A9B074',
          400: '#838A4E',
          500: '#5B6236',
          600: '#4A5030',
          700: '#3A3E26',
          800: '#2A2D1C',
          900: '#1B1D12',
        },
        gold: {
          DEFAULT: '#C8972B',
          300: '#E6CB86',
          400: '#DCB255',
          500: '#C8972B',
          600: '#A87C22',
        },
        charcoal: {
          DEFAULT: '#2B2622',
          light: '#4A423C',
          muted: '#6B6259',
          900: '#1A1613',
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        body: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '0.875rem',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(43, 38, 34, 0.12), 0 6px 20px -6px rgba(43, 38, 34, 0.12)',
        lift: '0 8px 30px -8px rgba(43, 38, 34, 0.25)',
      },
      maxWidth: {
        content: '72rem',
        prose: '42rem',
      },
    },
  },
  plugins: [],
};
