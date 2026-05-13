import { supabase } from '../../lib/supabase.js'

const toErrorMessage = (error, fallback) => {
  if (!error) {
    return fallback
  }

  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  if (typeof error === 'object') {
    return error.message || error.error_description || JSON.stringify(error)
  }

  return String(error)
}

// Helper untuk detect rate limit
const isRateLimitError = (error) => {
  if (!error) return false
  
  const msg = toErrorMessage(error, '').toLowerCase()
  const code = error?.status || error?.code
  
  return (
    msg.includes('rate limit') ||
    msg.includes('too many requests') ||
    msg.includes('too many') ||
    msg.includes('email rate limit') ||
    code === 429
  )
}

export const registerUser = async ({ email, password, username, phone }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      const errorMsg = toErrorMessage(error, 'Terjadi kesalahan saat registrasi')
      
      // Log error untuk debug
      console.error('❌ Auth signup error:', {
        message: errorMsg,
        status: error?.status,
        isRateLimit: isRateLimitError(error)
      })
      
      // Deteksi rate limit error
      if (isRateLimitError(error)) {
        console.warn('⚠️  Rate limit detected')
        return {
          data: null,
          error: 'Email ini terkena rate limit. Tunggu beberapa jam atau gunakan email yang berbeda untuk registrasi baru.',
        }
      }
      
      // Deteksi email sudah terdaftar
      if (
        errorMsg.toLowerCase().includes('already registered') ||
        errorMsg.toLowerCase().includes('user already exists') ||
        errorMsg.toLowerCase().includes('unique constraint') ||
        error?.status === 422
      ) {
        console.warn('⚠️  Email already registered')
        return {
          data: null,
          error: 'Email ini sudah terdaftar. Silakan login dengan akun Anda atau gunakan email yang berbeda.',
        }
      }
      
      // Error lainnya
      return { data: null, error: errorMsg }
    }

    if (!data.user) {
      return {
        data,
        error: 'Signup berhasil tetapi user data tidak diterima. Silakan coba login.',
      }
    }

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        username: username || email.split('@')[0],
        email,
        phone: phone || null,
        role: 'user',
        total_order: 0,
      },
    ])

    if (insertError) {
      console.error('Error saving user to database:', insertError)
      
      // Provide clear guidance based on error type
      const errorMsg = insertError.message || insertError.error_description || ''
      
      if (errorMsg.includes('policy') || errorMsg.includes('RLS') || errorMsg.includes('row level')) {
        return {
          data,
          error:
            'Profil user berhasil dibuat di Auth, tetapi tidak bisa disimpan ke tabel users karena RLS policy. ' +
            'Pastikan RLS sudah diaktifkan dan policy INSERT for authenticated user sudah ada di tabel public.users.',
        }
      }
      
      if (errorMsg.includes('violate') || errorMsg.includes('constraint')) {
        return {
          data,
          error:
            'Profil gagal disimpan: email atau kolom lain mungkin sudah ada. ' +
            'Cek constraint di tabel users atau pastikan struktur kolom cocok (id, email, username, role, created_at).',
        }
      }

      if (errorMsg.includes('column') || errorMsg.includes('not found')) {
        return {
          data,
          error:
            'Struktur tabel users tidak sesuai. ' +
            'Pastikan tabel users punya kolom: id (uuid), username (text), email (text), phone (text), role (text), total_order (integer).',
        }
      }

      return {
        data,
        error: toErrorMessage(
          insertError,
          'Registrasi berhasil di Auth, tetapi gagal menyimpan profil. Cek error detail di server logs.'
        ),
      }
    }

    return { data, error: null }
  } catch (err) {
    return { data: null, error: toErrorMessage(err, 'Terjadi kesalahan saat registrasi') }
  }
}

export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { data, error: toErrorMessage(error, null) }
  } catch (err) {
    return { data: null, error: toErrorMessage(err, 'Terjadi kesalahan saat login') }
  }
}
