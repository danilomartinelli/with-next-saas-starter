import { Database } from '@/lib/api/database.types';
import { createBrowserClient } from '@supabase/ssr';
import { env } from '../t3/env';

export const createClient = () =>
  createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
