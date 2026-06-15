/**
 * SEO meta tag generator.
 */

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Menantu Resort — Investasi Villa Premium Bandung | SHM, Managed by Sahid';
const DEFAULT_DESC = 'Miliki villa produktif di Bandung dengan passive income Rp 9-15 juta/bulan. SHM, dikelola Sahid, eco resort 3.5 Ha. Mulai Rp 1,2 Miliar.';
const SITE_URL = 'https://menantu-resort.com';

export function buildSEO({
  title,
  description = DEFAULT_DESC,
  image = '/og/og-image.png',
  canonical,
  type = 'website',
  publishedTime,
  author,
  noindex = false,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} — Menantu Resort` : DEFAULT_TITLE;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const fullCanonical = canonical || SITE_URL;

  return {
    title: fullTitle,
    description,
    canonical: fullCanonical,
    openGraph: {
      title: fullTitle,
      description,
      url: fullCanonical,
      siteName: 'Menantu Resort',
      images: [{ url: fullImage, width: 1200, height: 630, alt: fullTitle }],
      locale: 'id_ID',
      type,
      publishedTime,
      authors: author ? [author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
    },
    noindex,
  };
}
