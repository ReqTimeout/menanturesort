import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// Hybrid: sebagian halaman pre-rendered (SSG), sebagian SSR via Node adapter
// cPanel Node.js selector akan jalankan `node dist/server/entry.mjs`
// NOTE: Sitemap digenerate oleh custom endpoint /src/pages/sitemap.xml.ts
// (lebih lengkap & SEO-friendly dari @astrojs/sitemap plugin)
export default defineConfig({
  site: 'https://menantu-resort.com',
  output: 'static',  // default static, individual pages bisa override ke 'server' kalau perlu
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    // sitemap plugin REMOVED — replaced by custom /sitemap.xml.ts endpoint
  ],
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        '@': '/Users/maabook/Desktop/menantu-resort.com/app/src',
        '@lib': '/Users/maabook/Desktop/menantu-resort.com/app/src/lib',
        '@components': '/Users/maabook/Desktop/menantu-resort.com/app/src/components',
        '@data': '/Users/maabook/Desktop/menantu-resort.com/app/src/data',
      },
    },
  },
  image: {
    domains: ['cdn.jsdelivr.net'],
  },
  compressHTML: true,
});
