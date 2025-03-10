
import { createClient } from '@supabase/supabase-js';

// Define constants for Supabase URL and key
const supabaseUrl = 'https://xnfpsjvlrfvfjdsidxrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZnBzanZscmZ2Zmpkc2lkeHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzg3OTQsImV4cCI6MjA1Njk1NDc5NH0.rmeZw5GPF1NpNsgzXw_MnMBj_asF2Xv2eKXV5kLbmbE';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
