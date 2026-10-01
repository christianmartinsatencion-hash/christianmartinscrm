import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Suporte tanto para ambiente Vite (import.meta.env) quanto Next.js/Vercel (process.env / NEXT_PUBLIC_)
const getEnvVar = (viteKey: string, nextKey: string, fallback: string): string => {
  let val: string | undefined = undefined;

  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      val = import.meta.env[viteKey] || import.meta.env[nextKey];
    }
  } catch {
    // ignore
  }

  if (!val) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        val = process.env[viteKey] || process.env[nextKey];
      }
    } catch {
      // ignore
    }
  }

  return val && val.trim().length > 0 ? val.trim() : fallback;
};

// URL e chave do Supabase fornecidas
const supabaseUrl = getEnvVar(
  'VITE_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'https://zcyendotbsaoizzglgkv.supabase.co'
);

const supabaseAnonKey = getEnvVar(
  'VITE_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'sb_publishable_t4X1RuUa66kHyDuP5WOV3w_yquAviBM'
);

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project')
  );
};

// Instância singleton do cliente Supabase tipado
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
