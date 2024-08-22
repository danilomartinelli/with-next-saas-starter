import { Inter as FontSans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils/ui/client';
import { env } from '@/lib/utils/t3/env';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '../globals.css';
import { config } from '@/lib/config';

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
            {children}
          </NextIntlClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}

export default RootLayout;
