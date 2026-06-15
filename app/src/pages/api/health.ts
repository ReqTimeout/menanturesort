import type { APIRoute } from 'astro';
import siteData from '../../data/site.json';

export const prerender = false;

export const GET: APIRoute = async () => {
  const start = Date.now();
  const uptime = process.uptime();
  const memory = process.memoryUsage();

  // Check critical data
  const checks = {
    siteData: !!siteData?.contact?.whatsapp,
    villaData: true, // will be loaded by Vite at build time
    bankAccounts: siteData?.bankAccounts?.length >= 3,
  };

  const healthy = Object.values(checks).every(Boolean);
  const status = healthy ? 200 : 503;

  const body = {
    status: healthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    version: '5.2',
    environment: import.meta.env.PROD ? 'production' : 'development',
    responseTime: `${Date.now() - start}ms`,
    memory: {
      rss: `${Math.round(memory.rss / 1024 / 1024)}MB`,
      heap: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
    },
    checks,
    endpoints: {
      sitemap: '/sitemap-index.xml',
      robots: '/robots.txt',
      og: '/og/og-image.png',
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
};
