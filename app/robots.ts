import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://alpha-system-eight.vercel.app';

  return {
    rules: {
      userAgent: '*',
      // 👇 اضافه شدن partners به لیست مجاز
      allow: ['/', '/blog', '/login', '/partners'],
      disallow: ['/settings', '/api', '/_next'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}