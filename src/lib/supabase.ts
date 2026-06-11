import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const missingSupabaseConfigMessage = "Supabase 연결 정보가 없어 데이터를 저장할 수 없습니다.";

const createMissingConfigError = (operationLabel: string) => ({
  code: "SUPABASE_NOT_CONFIGURED",
  message: `${missingSupabaseConfigMessage} (${operationLabel})`,
  details: "VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY가 비어 있습니다.",
});

// Mock client to prevent app crash when env vars are missing.
// Write operations return explicit errors so the UI never shows a false success.
const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: async () => ({ data: null, error: createMissingConfigError("로그인") }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({
          data: null,
          error: createMissingConfigError("데이터 조회"),
        }),
      }),
    }),
    insert: async () => ({ data: null, error: createMissingConfigError("데이터 저장") }),
    upsert: async () => ({ data: null, error: createMissingConfigError("데이터 저장") }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: createMissingConfigError("파일 업로드") }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
      list: async () => ({ data: null, error: createMissingConfigError("파일 조회") }),
    }),
  },
} as unknown as ReturnType<typeof createClient>;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : mockSupabase;
