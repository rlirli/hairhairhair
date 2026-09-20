/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: { ink: '#181715', ivory: '#f4f0e8', orange: '#e85d2a', butter: '#f3c969', sage: '#aab7a0' },
      fontFamily: { display: ['Georgia', 'serif'], sans: ['Arial', 'Helvetica', 'sans-serif'] },
    },
  },
  plugins: [],
};
