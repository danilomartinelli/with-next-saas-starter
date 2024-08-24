import useSWR from 'swr';
import { getEntityFromQueryAction } from '../database/queries';
import useSupabase from '@/lib/providers/supabase/hooks/use-supabase';

/**
 * @name useSomeEntityQuery
 * @description Hook to do something with some entity.
 */
function useSomeEntityQuery() {
  const client = useSupabase();
  const key = 'use-some-entity-query-key';

  return useSWR(key, async () => {
    return getEntityFromQueryAction(client).then((result) => result.data);
  });
}

export default useSomeEntityQuery;
