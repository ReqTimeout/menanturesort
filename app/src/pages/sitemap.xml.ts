/**
 * /sitemap.xml — Main sitemap (all static + dynamic URLs)
 * Optimized for fast Google crawl:
 * - No X-Robots-Tag (would block Google)
 * - Short cache (5 min) for freshness
 * - High priority for fresh articles
 */
import type { APIRoute } from 'astro';
import articles from '../data/articles.json';

const SITE = 'https://menantu-resort.com';
const TODAY = new Date().toISOString().split('T')[0];
const NOW_ISO = new Date().toISOString();

const dateMap = {
  'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
  'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
  'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
};

const parseArticleDate = (dateStr) => {
  if (!dateStr) return TODAY;
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = dateMap[parts[1]] || '06';
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return TODAY;
};

// Static pages — high priority + daily/weekly
const STATIC_PAGES = [
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/promo/', priority: 1.0, changefreq: 'daily' },
  { loc: '/villa/', priority: 0.9, changefreq: 'daily' },
  { loc: '/villa/bijak/', priority: 0.9, changefreq: 'daily' },
  { loc: '/villa/idaman/', priority: 0.9, changefreq: 'daily' },
  { loc: '/villa/mapan/', priority: 0.9, changefreq: 'daily' },
  { loc: '/investasi/', priority: 0.9, changefreq: 'daily' },
  { loc: '/investasi/passive-income/', priority: 0.9, changefreq: 'daily' },
  { loc: '/investasi/skema-bank/', priority: 0.9, changefreq: 'daily' },
  { loc: '/investasi/skema-developer/', priority: 0.9, changefreq: 'daily' },
  { loc: '/lokasi/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/progress/', priority: 0.9, changefreq: 'daily' },
  { loc: '/resort/', priority: 0.9, changefreq: 'weekly' },
  { loc: '/artikel/', priority: 0.9, changefreq: 'daily' },
  { loc: '/faq/', priority: 0.7, changefreq: 'weekly' },
  { loc: '/kontak/', priority: 0.7, changefreq: 'weekly' },
  { loc: '/kebijakan-privasi/', priority: 0.4, changefreq: 'yearly' },
  { loc: '/syarat-dan-ketentuan/', priority: 0.4, changefreq: 'yearly' },
];

const PER_PAGE = 12;
const TOTAL_ARTICLES = articles.length;
const TOTAL_PAGES = Math.ceil(TOTAL_ARTICLES / PER_PAGE);
const PAGINATION_PAGES = [];
for (let p = 2; p <= TOTAL_PAGES; p++) {
  PAGINATION_PAGES.push({ loc: `/artikel/page/${p}/`, priority: 0.7, changefreq: 'daily' });
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
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`);
  }

  // Pagination pages
  for (const p of PAGINATION_PAGES) {
    urls.push(`  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`);
  }

  // Articles — DAILY changefreq + high priority (0.9) for fast indexing
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  for (const article of sortedArticles) {
    const lastmod = parseArticleDate(article.date);
    // Featured article (highest intent) → 1.0
    // Other articles → 0.9
    const isFeatured = article.slug === 'menantu-resort-harga-simulasi-bijak-idaman-mapan-2026';
    const priority = isFeatured ? '1.0' : '0.9';

    urls.push(`  <url>
    <loc>${SITE}/artikel/${escapeXml(article.slug)}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>
<!-- Generated: ${NOW_ISO} | Total URLs: ${urls.length} | menantu-resort.com -->`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300, must-revalidate',
    },
  });
};
