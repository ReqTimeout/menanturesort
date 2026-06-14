import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// Hybrid: sebagian halaman pre-rendered (SSG), sebagian SSR via Node adapter
// cPanel Node.js selector akan jalankan `node dist/server/entry.mjs`
export default defineConfig({
  site: 'https://menantu-resort.com',
  output: 'static',  // default static, individual pages bisa override ke 'server' kalau perlu
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
  image: {
    domains: ['cdn.jsdelivr.net'],
  },
  compressHTML: true,
});
