import { env } from './utils/t3/env';

// You can remove the `vercelUrl` variable if you don't use Vercel
const vercelUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined;

export const config = {
  siteUrl: vercelUrl || env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  metadata: {
    title: 'Next.js and Supabase Starter Kit',
    description: 'The fastest way to build apps with Next.js and Supabase',
  },
  localization: {
    // The locales that your app supports
    // This is required for the middleware to work
    // Remember to add new locales here if you add them to the `matcher` in the middleware file
    // And also remember to create a translation file for each locale in the `messages` folder
    // Do the same when you remove a locale but in reverse
    locales: ['en_US', 'pt_BR'],
    // If you remove `en_US` from here, you need to change the `global.d.ts` file to match with the new default locale
    defaultLocale: 'en_US',
  },
  providers: {
    resend: {
      from: 'Example <example@email.com>',
    },
  },
};
