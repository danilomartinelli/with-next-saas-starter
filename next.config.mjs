import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./lib/utils/t3/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
