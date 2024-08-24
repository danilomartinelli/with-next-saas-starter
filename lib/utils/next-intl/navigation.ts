// We created a shared navigation module that can be used in any Next.js project.
// We need this module to create a shared navigation system between the Next.js app and Internationalization library.
// As we changed the `tsconfig.json` to include the `baseUrl` and `paths` properties to resolve all Next.js Navigation modules
// to the `lib/utils/next-intl/navigation.ts` file, we can now import the Navigations APIs from this file.

// As the comment above says, if we import the `LinkProps` and `useSearchParams` from the `next` package, we will have a cyclic dependency.
// To avoid this, we import the `LinkProps` from the full path of the `next` package.
import { LinkProps as NextLinkProps } from '../../../node_modules/next/dist/client/link';
import {
  useSearchParams as useNextSearchParams,
  notFound as nextNotFound,
} from '../../../node_modules/next/dist/client/components/navigation';

import { config } from '@/lib/config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const sharedPathnamesNavigation = createSharedPathnamesNavigation({
  locales: config.localization.locales,
});

// We will export all necessary types and functions from the shared navigation module.
// If you need to use another Next.js Navigation API, you can add it here (e.g. `LinkProps`).
// Exports:

// We renamed the `LinkProps` type imported from the `next` package to allow us changing the implementated interface in the future.
// export type LinkProps = NextLinkProps & { customProp: string };
export type LinkProps = NextLinkProps;

// The same said above for the `LinkProps` is valid for the following functions:
export const useSearchParams = useNextSearchParams;

export const notFound = nextNotFound;

// We export the `Link`, `redirect`, `usePathname`, and `useRouter` functions from the shared navigation module.
// These functions are used to navigate between pages in the Next.js app.
// We can use these functions in the Internationalization library to navigate between pages.
export const { Link, redirect, usePathname, useRouter } =
  sharedPathnamesNavigation;
