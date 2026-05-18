import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://camees.org.ar',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [react(), keystatic()],
});
