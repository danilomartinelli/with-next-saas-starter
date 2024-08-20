import { SupabaseClient as SC } from "@supabase/supabase-js";
import { Database } from "../api/database.types";

export type SupabaseClient = SC<Database>;