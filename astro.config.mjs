import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://waseemarain4u.github.io',
  base: '/my-portfolio',
  integrations: [tailwind()],
});
