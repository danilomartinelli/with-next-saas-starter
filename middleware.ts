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

export const config = {
  matcher: [
    '/',
    // Match routes that have a locale prefix - Currently only 'en' is supported.
    // `config.matcher` can't contain a dynamic expression like `/:locale(functionHere())/:path*`
    // If you add a new locale in `config.localization.locales`, you need to add it here. Example:
    // '/:locale(en|es|pt)/:path*',
    '/:locale(en)/:path*',
  ],
};
