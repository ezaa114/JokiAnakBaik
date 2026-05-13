import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { registerUser, loginUser } from '../services/supabase/auth.service.js'

const AuthContext = createContext({})
const DEFAULT_ROLE = 'user'

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

const persistUser = (nextUser) => {
  if (nextUser) {
    localStorage.setItem('user', JSON.stringify(nextUser))
    return
  }

  localStorage.removeItem('user')
}

const buildUserProfile = (authUser, profile) => ({
  ...authUser,
  username:
    profile?.username ||
    authUser?.user_metadata?.username ||
    authUser?.email?.split('@')[0] ||
    'User',
  role:
    profile?.role ||
    authUser?.user_metadata?.role ||
    DEFAULT_ROLE,
})

const fetchUserProfile = async (userId) => {
  if (!userId) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, email, username, role')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    return null
  }

  return data
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session - support both custom auth and Supabase auth
    const getInitialSession = async () => {
      try {
        // 1. Cek localStorage dulu (custom phone-based auth)
        const storedUser = readStoredUser()
        console.log('AuthContext startup - storedUser dari localStorage:', storedUser)
        
        if (storedUser) {
          console.log('✅ User ditemukan dari localStorage, set user:', storedUser)
          setUser(storedUser)
          setLoading(false)
          return
        }

        // 2. Jika tidak ada di localStorage, cek Supabase Auth
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id)
          const nextUser = buildUserProfile(session.user, profile)
          setUser(nextUser)
          persistUser(nextUser)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error getting session:', error)
        // Fallback: cek localStorage
        const storedUser = readStoredUser()
        if (storedUser) {
          setUser(storedUser)
        }
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for Supabase auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const profile = await fetchUserProfile(session.user.id)
            const nextUser = buildUserProfile(session.user, profile)
            setUser(nextUser)
            persistUser(nextUser)
          } else {
            // Jangan clear localStorage saat logout dari Supabase Auth
            // User mungkin masih login via custom auth
            const storedUser = readStoredUser()
            setUser(storedUser)
          }
          setLoading(false)
        }
      )

      return () => subscription?.unsubscribe()
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      return () => {}
    }
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await loginUser(email, password)

    if (error) {
      return { data: null, error }
    }

    const authUser = data?.user ?? null
    if (!authUser) {
      return { data, error: null }
    }

    const profile = await fetchUserProfile(authUser.id)
    const nextUser = buildUserProfile(authUser, profile)

    setUser(nextUser)
    persistUser(nextUser)

    return {
      data: {
        ...data,
        user: nextUser,
      },
      error: null,
    }
  }

  const signUp = async (email, password, username, phone) => {
    const { data, error } = await registerUser({ email, password, username, phone })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    persistUser(null)
    return { error }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
