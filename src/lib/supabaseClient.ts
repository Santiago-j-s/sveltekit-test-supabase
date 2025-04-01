import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://${env.PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;
const supabaseAnonKey = env.PUBLIC_SUPABASE_PUBLIC_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
