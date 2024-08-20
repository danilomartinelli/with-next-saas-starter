import useSupabase from '@/lib/hooks/use-supabase';
import {} from '@/lib/utils/supabase/client';
import useSWR from 'swr';
import { getEntityFromQueryAction } from '../database/queries';

/**
 * @name useSomeEntityQuery
 * @description Hook to update an organization's general information (name, logo and timezone)
 */
function useSomeEntityQuery() {
  const client = useSupabase();
  const key = 'use-some-entity-query-key';

  return useSWR(key, async () => {
    return getEntityFromQueryAction(client).then((result) => result.data);
  });
}

export default useSomeEntityQuery;
