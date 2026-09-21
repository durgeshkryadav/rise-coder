import type { User } from '@supabase/supabase-js';

/** Set VITE_AUTH_ENABLED=true in .env to require Supabase login. */
export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === 'true';

export const GUEST_USER: User = {
  id: 'guest',
  email: 'Guest',
  aud: 'authenticated',
  role: 'authenticated',
  app_metadata: {},
  user_metadata: {},
  created_at: new Date(0).toISOString(),
};
