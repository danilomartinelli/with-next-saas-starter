import { config } from '@/lib/config';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // We need to get only the `/` route because all other routes are private.
  return [getEntry('/')];
}

function getEntry(pathname: string) {
  return {
    url: getUrl(pathname, config.localization.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        config.localization.locales.map((locale) => [
          locale,
          getUrl(pathname, locale),
        ]),
      ),
    },
  };
}

function getUrl(pathname: string, locale: string) {
  return `${config.siteUrl}/${locale}${pathname === '/' ? '' : pathname}`;
}
