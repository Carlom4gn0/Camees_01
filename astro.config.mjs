import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://camees.org.ar',
  output: 'hybrid',
  adapter: node({ mode: 'middleware' }),
  integrations: [keystatic()],
});
