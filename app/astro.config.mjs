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
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        // Higher priority for important pages
        let priority = 0.7;
        if (item.url === 'https://menantu-resort.com/') priority = 1.0;
        else if (item.url.includes('/villa/') || item.url.includes('/artikel/')) priority = 0.8;
        else if (item.url.includes('/investasi') || item.url.includes('/lokasi') || item.url.includes('/resort')) priority = 0.9;
        return {
          ...item,
          priority,
          changefreq: 'weekly',
        };
      },
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
