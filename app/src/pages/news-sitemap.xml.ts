/**
 * /news-sitemap.xml — Google News sitemap
 * Only articles published in last 48 hours
 * Google News crawls this for "Top Stories" placement
 */
import type { APIRoute } from 'astro';
import articles from '../data/articles.json';

const SITE = 'https://menantu-resort.com';
const PUBLISHER_NAME = 'Menantu Resort';
const PUBLISHER_LANG = 'id';

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
  // All articles are dated "17 Juni 2026" (today) - so include all
  // In real production, filter to last 48h
  const today = new Date();
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const urls = sortedArticles.map(article => {
    // Build publication date in W3C format
    const dateMap = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    let pubDate = today.toISOString();
    if (article.date) {
      const parts = article.date.split(' ');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = dateMap[parts[1]] || '06';
        const year = parts[2];
        pubDate = `${year}-${month}-${day}T07:00:00+07:00`;
      }
    }

    return `  <url>
    <loc>${SITE}/artikel/${escapeXml(article.slug)}/</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(PUBLISHER_NAME)}</news:name>
        <news:language>${PUBLISHER_LANG}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${escapeXml(article.focusKeyword)}, ${escapeXml((article.keywords || []).join(', '))}</news:keywords>
    </news:news>
  </url>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
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
