import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils/ui/client';

import './globals.css';

interface IRootLayoutProps {
  readonly children: React.ReactNode;
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          fontSans.variable,
        )}
      >
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
