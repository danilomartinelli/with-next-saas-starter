import { Inter as FontSans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils/ui/client';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '../globals.css';
import { config } from '@/lib/config';
import { PHProvider } from '@/components/providers/ph-provider';
import dynamic from 'next/dynamic';

// PostHogPageView contains the useSearchParams hook
// which deopts the entire app into client-side rendering
// if it is not dynamically imported.
// Docs: https://nextjs.org/docs/messages/deopted-into-client-rendering
const PostHogPageView = dynamic(() => import('./_components/ph-page-view'), {
  ssr: false,
});

interface IRootLayoutProps {
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

async function RootLayout({ children, params: { locale } }: IRootLayoutProps) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

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

export default RootLayout;
