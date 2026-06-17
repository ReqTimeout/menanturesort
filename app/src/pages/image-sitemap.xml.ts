/**
 * /image-sitemap.xml — Google Image search sitemap
 * Includes featured images for all articles + key villa/location images
 */
import type { APIRoute } from 'astro';
import articles from '../data/articles.json';

const SITE = 'https://menantu-resort.com';
const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
  const images = [];

  // Article featured images
  for (const article of articles) {
    if (article.image) {
      images.push(`  <url>
    <loc>${SITE}/artikel/${escapeXml(article.slug)}/</loc>
    <image:image>
      <image:loc>${SITE}${escapeXml(article.image)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
      <image:caption>${escapeXml(article.excerpt || '')}</image:caption>
    </image:image>
  </url>`);
    }
  }

  // Villa + hero images
  const KEY_IMAGES = [
    { url: '/villa/bijak/', img: '/images/villa/bijak/hero-row.jpeg', title: 'Menantu Villa Bijak — Villa Investasi Cicalengka' },
    { url: '/villa/idaman/', img: '/images/villa/idaman/hero-row.jpeg', title: 'Menantu Villa Idaman — Villa Mid-Tier Bandung Timur' },
    { url: '/villa/mapan/', img: '/images/villa/mapan/hero-detail.jpeg', title: 'Menantu Villa Mapan — Villa Flagship Multi-Generational' },
    { url: '/villa/mapan/', img: '/images/villa/mapan/street-view.jpeg', title: 'Menantu Resort — Street View' },
    { url: '/lokasi/', img: '/images/hero/hero-aerial-1280.jpg', title: 'Menantu Resort — Aerial View Cicalengka Bandung Timur' },
    { url: '/resort/', img: '/images/hero/hero-panorama-1280.jpg', title: 'Menantu Resort — Panorama 360 Bandung' },
  ];

  for (const k of KEY_IMAGES) {
    images.push(`  <url>
    <loc>${SITE}${k.url}</loc>
    <image:image>
      <image:loc>${SITE}${k.img}</image:loc>
      <image:title>${escapeXml(k.title)}</image:title>
    </image:image>
  </url>`);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.join('\n')}
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
