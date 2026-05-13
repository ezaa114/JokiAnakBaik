import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function Login() {
  const [formData, setFormData] = useState({
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setMessage('')
    setMessageType('error')

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', formData.phone)
        .maybeSingle()

      if (error) {
        throw error
      }

      if (!data) {
        setMessage('Nomor tidak ditemukan')
        setMessageType('error')
        return
      }

      const role = data?.role || 'user'
      console.log('Raw login query result:', data)
      // Generate user_id dari phone jika tidak ada id
      const userData = {
        ...data,
        id: data?.id || data?.phone,
        user_id: data?.id || data?.phone,
        role,
      }

      console.log('Data akan disimpan ke localStorage:', userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userPhone', userData.phone)
      console.log('localStorage setelah simpan:', localStorage.getItem('user'))

      setMessage('Login berhasil')
      setMessageType('success')

      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin/dashboard', { replace: true })
        } else {
          navigate('/user/dashboard', { replace: true })
        }
      }, 1000)
    } catch (err) {
      setMessage(err?.message || 'Terjadi error')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid #334155'
        }}
      >
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          Login
        </h1>

        <p
          style={{
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '35px'
          }}
        >
          Masuk ke akun Joki Anak Baik
        </p>

        {message && (
          <div style={{
            backgroundColor: messageType === 'success' ? '#16a34a' : '#dc2626',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* PHONE */}
          <div style={{ marginBottom: '30px' }}>
            <label
              style={{
                color: 'white',
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px'
              }}
            >
              Nomor HP/WA
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#334155',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="Masukkan nomor HP/WA Anda"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#475569' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Sedang Masuk...' : 'Masuk'}
          </button>
        </form>

        {/* LINKS */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>
            Belum punya akun?{' '}
            <Link
              to="/register"
              style={{
                color: '#8b5cf6',
                textDecoration: 'none'
              }}
            >
              Daftar
            </Link>
          </span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link
            to="/"
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login