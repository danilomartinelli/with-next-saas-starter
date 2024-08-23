'use client';

import { env } from '@/lib/utils/t3/env';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect, useRef } from 'react';

interface IPHProviderProps {
  children: React.ReactNode;
}

export function PHProvider({ children }: IPHProviderProps) {
  const isPostHogInitialized = useRef(false);

  useEffect(() => {
    const host = env.NEXT_PUBLIC_POSTHOG_HOST;
    const key = env.NEXT_PUBLIC_POSTHOG_KEY;

    if (
      !key ||
      !host ||
      typeof window === 'undefined' ||
      isPostHogInitialized.current
    ) {
      return;
    }

    posthog.init(key, {
      api_host: host,
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
    });

    isPostHogInitialized.current = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
