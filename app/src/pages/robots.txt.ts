/**
 * /robots.txt — Bot directives + all sitemap declarations
 * Optimized for daily Google crawl + Bing + Yandex
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `# ====================================
# Menantu Resort - Robots.txt
# Optimized for daily crawl
# ====================================

# === Default rules for all bots ===
User-agent: *
Allow: /
Disallow: /api/
Disallow: /404
Disallow: /*.json$

# === Googlebot (main crawler) ===
# No crawl-delay = Google determines optimal rate
User-agent: Googlebot
Allow: /
Disallow: /api/
Crawl-delay: 0

# === Googlebot-Image (for image search) ===
User-agent: Googlebot-Image
Allow: /
Disallow: /api/

# === Googlebot-News (for Google News) ===
User-agent: Googlebot-News
Allow: /artikel/
Disallow: /api/

# === Googlebot-Video (for video search) ===
User-agent: Googlebot-Video
Allow: /

# === Bingbot ===
User-agent: Bingbot
Allow: /
Crawl-delay: 0

# === Slurp (Yahoo) ===
User-agent: Slurp
Allow: /
Crawl-delay: 0

# === Yandex (Russian search) ===
User-agent: YandexBot
Allow: /
Crawl-delay: 0

# === Baiduspider (Chinese search) ===
User-agent: Baiduspider
Allow: /

# === DuckDuckBot ===
User-agent: DuckDuckBot
Allow: /

# === AI/LLM crawlers - ALLOW for SEO knowledge ===
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# === Block bad bots (SEO spam, scrapers) ===
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

# === Sitemap declarations (submit all to GSC) ===
Sitemap: https://menantu-resort.com/sitemap.xml
Sitemap: https://menantu-resort.com/news-sitemap.xml
Sitemap: https://menantu-resort.com/image-sitemap.xml

# === Host directive (Yandex specific) ===
Host: https://menantu-resort.com
`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
