import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';
import { config as c } from '@/lib/config';

const i18nMiddleware = createMiddleware({
  locales: c.localization.locales,
  defaultLocale: c.localization.defaultLocale,
});

export async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);

  // A `response` can now be passed here
  return await updateSession(request, response);
}

const localesPattern = c.localization.locales
  .map((locale) => `/${locale}/:path*`)
  .join('|');

export const config = {
  matcher: [`/`, localesPattern],
};
