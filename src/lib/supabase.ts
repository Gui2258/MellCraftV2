import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (browser-safe, read-only storage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-only admin client — bypasses RLS, only used in API routes
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? 'product-images'

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
