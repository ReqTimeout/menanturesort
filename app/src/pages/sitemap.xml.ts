/**
 * /sitemap.xml — Main sitemap (all static + dynamic URLs)
 * Cache-busted, always fresh, max 50K URLs
 * Use: https://menantu-resort.com/sitemap.xml
 */
import type { APIRoute } from 'astro';
import articles from '../data/articles.json';

const SITE = 'https://menantu-resort.com';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const NOW_FULL = new Date().toISOString();

// Static pages
const STATIC_PAGES = [
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/villa/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/villa/bijak/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/villa/idaman/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/villa/mapan/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/investasi/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/investasi/passive-income/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/investasi/skema-bank/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/investasi/skema-developer/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/lokasi/', priority: 0.9, changefreq: 'monthly' },
  { loc: '/resort/', priority: 0.9, changefreq: 'monthly' },
  { loc: '/artikel/', priority: 0.8, changefreq: 'daily' },
  { loc: '/faq/', priority: 0.7, changefreq: 'monthly' },
  { loc: '/kontak/', priority: 0.7, changefreq: 'monthly' },
  { loc: '/kebijakan-privasi/', priority: 0.5, changefreq: 'yearly' },
  { loc: '/syarat-dan-ketentuan/', priority: 0.5, changefreq: 'yearly' },
];

// Generate pagination URLs
const PER_PAGE = 12;
const TOTAL_ARTICLES = articles.length;
const TOTAL_PAGES = Math.ceil(TOTAL_ARTICLES / PER_PAGE);
const PAGINATION_PAGES = [];
for (let p = 2; p <= TOTAL_PAGES; p++) {
  PAGINATION_PAGES.push({ loc: `/artikel/page/${p}/`, priority: 0.6, changefreq: 'weekly' });
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
  const urls = [];

  // Static pages
  for (const p of STATIC_PAGES) {
    urls.push(`  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
  }

  // Pagination pages
  for (const p of PAGINATION_PAGES) {
    urls.push(`  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
  }

  // Articles (sorted by date desc for crawl priority)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  for (const article of sortedArticles) {
    // Extract date from "17 Juni 2026" format
    const dateMap = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    let lastmod = TODAY; // fallback
    if (article.date) {
      const parts = article.date.split(' ');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = dateMap[parts[1]] || '06';
        const year = parts[2];
        lastmod = `${year}-${month}-${day}`;
      }
    }

    // Articles are most-frequently updated content
    urls.push(`  <url>
    <loc>${SITE}/artikel/${escapeXml(article.slug)}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate',
      'X-Robots-Tag': 'noindex',
    },
  });
};
