import { SupabaseClient } from '@/lib/types/supabase-client';
import { ENTITY_TABLE } from '../../database.tables';

/**
 * @name getEntityFromQueryAction
 * @description Get all the entities from the database
 * @param client
 */
export function getEntityFromQueryAction(client: SupabaseClient) {
  return client.from(ENTITY_TABLE).select('*').throwOnError();
}
