import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  objective: string;
  structure: string;
  features: string;
  constraints: string;
  testing: string;
  success_criteria: string;
  created_at: string;
  updated_at: string;
}