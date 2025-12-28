// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://josephsmithvaz777.github.io',
  base: '/responya-landing',
  vite: {
    plugins: [tailwindcss()]
  }
});