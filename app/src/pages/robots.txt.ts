import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://menantu-resort.com/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
