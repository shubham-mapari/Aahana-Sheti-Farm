import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ""
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ""

// Only initialize if we have a valid-looking URL to prevent app crash
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
