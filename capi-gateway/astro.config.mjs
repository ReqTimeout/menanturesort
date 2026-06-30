// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'compile',
  }),
  integrations: [tailwind()],
  server: { port: 4321, host: '0.0.0.0' },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
