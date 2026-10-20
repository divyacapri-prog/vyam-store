// Server-side Supabase admin client. Returns null when env vars are not set,
// so the site runs (demo mode, no order persistence) before Supabase is configured.
import { createClient } from "@supabase/supabase-js";

export function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key, { auth: { persistSession: false } });
  } catch {
    return null;
  }
}
