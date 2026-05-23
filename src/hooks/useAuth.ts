import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    }).catch(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signInWithMagicLink(email: string) {
    const redirectTo = import.meta.env.VITE_APP_URL ?? window.location.origin
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })
  }

  async function signOut() {
    return supabase.auth.signOut()
  }

  return { user, loading, signInWithMagicLink, signOut }
}
