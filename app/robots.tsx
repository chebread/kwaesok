import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://kwaesok.vercel.app/sitemap.xml',
    host: 'https://kwaesok.vercel.app',
  };
}
