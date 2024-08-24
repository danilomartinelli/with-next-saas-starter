// The `/auth/callback` route is required for the server-side auth flow implemented
// by the SSR package. It exchanges an auth code for the user's session.
// https://supabase.com/docs/guides/auth/server-side/nextjs

import { createClient } from '@/lib/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  // Get the locale from the request
  const locale = await getLocale();

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(
    `${origin}/${locale}/change-for-your-protect-route`,
  );
}
