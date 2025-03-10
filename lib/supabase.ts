
import { createClient } from '@supabase/supabase-js';

// Define constants for Supabase URL and key
const supabaseUrl = 'https://xtnnkybxjewgzadcahzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bm5reWJ4amV3Z3phZGNhaHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTE0MzksImV4cCI6MjA1NjE4NzQzOX0.ZKZ6Rt9jsbiWNQn65z6YSgwiFm8nJH-s7kMnoUNL7LQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
