import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';
import { config as c } from '@/lib/config';

const i18nMiddleware = createMiddleware({
  locales: c.localization.locales,
  defaultLocale: c.localization.defaultLocale,
});

export async function middleware(request: NextRequest) {
  // The `i18nMiddleware` is applied to all routes except the `/auth/callback` route.
  // This is because the `/auth/callback` route doesn't have a locale prefix.
  const response =
    request.nextUrl.pathname !== '/auth/callback'
      ? i18nMiddleware(request)
      : NextResponse.next();

  // A `response` can now be passed here
  return await updateSession(request, response);
}

export const config = {
  matcher: [
    '/',
    // We need to apply the middleware to the `/auth/callback` route to handle the auth flow.
    '/auth/callback',
    // Match routes that have a locale prefix - Currently only 'en_US' and 'pt_BR' is supported.
    // `config.matcher` can't contain a dynamic expression like `/:locale(functionHere())/:path*`
    // If you add a new locale in `config.localization.locales`, you need to add it here. Example:
    // '/:locale(en_US|pt_BR|locale_with_underscore)/:path*',
    '/:locale(en_US|pt_BR)/:path*',
  ],
};
