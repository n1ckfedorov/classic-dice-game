import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '*',
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
