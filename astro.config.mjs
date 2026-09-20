import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hairhairhair.hair',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
