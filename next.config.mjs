import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
import createNextIntlPlugin from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./lib/utils/t3/env.ts');

const withNextIntl = createNextIntlPlugin('./lib/utils/next-intl/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
