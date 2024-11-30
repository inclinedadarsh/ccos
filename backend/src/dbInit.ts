import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getSupabaseClient() {
    const supabaseUrl = "https://eaxeogjskrvflnrlwnbz.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY as string;
    if (supabase === null) {
        supabase = createClient(supabaseUrl, supabaseKey);
        return supabase;
    }
    return supabase;
}

export default getSupabaseClient;
