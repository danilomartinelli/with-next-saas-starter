import { Inter as FontSans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils/ui/client';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '../globals.css';
import { config } from '@/lib/config';
import { PHProvider } from '@/components/providers/ph-provider';
import dynamic from 'next/dynamic';
// You need to import the PostHogClient from the correct path for server-side rendering
// import PostHogClient from '@/lib/utils/posthog/server';

// PostHogPageView contains the useSearchParams hook
// which deopts the entire app into client-side rendering
// if it is not dynamically imported.
// Docs: https://nextjs.org/docs/messages/deopted-into-client-rendering
const PostHogPageView = dynamic(() => import('./_components/ph-page-view'), {
  ssr: false,
});

interface IHomeLayoutProps {
  readonly children: React.ReactNode;
  readonly params: { locale: string };
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(config.siteUrl),
  title: config.metadata.title,
  description: config.metadata.description,
};

async function HomeLayout({ children, params: { locale } }: IHomeLayoutProps) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Example of how to use PostHog with Server-Side Rendering
  // const posthog = PostHogClient(); // If PostHog is not configured, this will throw an error
  // const flags = await posthog.getAllFlags(
  //   'user_distinct_id', // replace with a user's distinct ID
  // );
  // await posthog.shutdown();

  return (
    <html lang={locale} suppressHydrationWarning>
      <PHProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={cn(
              'min-h-screen bg-background text-foreground font-sans antialiased',
              fontSans.variable,
            )}
          >
            <NextIntlClientProvider messages={messages}>
              <PostHogPageView />
              {children}
            </NextIntlClientProvider>
          </body>
        </ThemeProvider>
      </PHProvider>
    </html>
  );
}

export default HomeLayout;
