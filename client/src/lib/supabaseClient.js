import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hjgjpuyfdakplayknqbb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
