import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    process: 0,
    done: 0
  })

  const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || 'null')
    : null

  useEffect(() => {
    getUser()
    fetchStats()
  }, [])

  const getUser = async () => {
    try {
      setError(null)
      
      // Ambil data user dari localStorage
      const userString = localStorage.getItem('user')
      console.log('User data dari localStorage:', userString)
      
      if (!userString) {
        setError('Data user tidak ditemukan di localStorage')
        console.error('Error: localStorage user kosong')
        return
      }

      const userData = JSON.parse(userString)
      const phone = userData?.phone

      console.log('Phone dari user data:', phone)
      
      if (!phone) {
        setError('Nomor telepon tidak ditemukan di user data')
        console.error('Error: phone tidak ada')
        return
      }

      const { data, error: supabaseError } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single()

      console.log('Response dari Supabase:', { data, error: supabaseError })

      if (supabaseError) {
        setError(`Error fetch data: ${supabaseError.message}`)
        console.error('Supabase error:', supabaseError)
        return
      }

      setUser(data)
      setName(data.name || '')
    } catch (err) {
      setError(`Error: ${err.message}`)
      console.error('Catch error:', err)
    }
  }

  const updateProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!name.trim()) {
        alert('Nama tidak boleh kosong')
        setLoading(false)
        return
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: name.trim()
        })
        .eq('phone', user.phone)

      console.log('Update result:', { error: updateError })

      if (updateError) {
        setError(`Gagal update: ${updateError.message}`)
        alert(`Gagal update profile: ${updateError.message}`)
        return
      }

      alert('✅ Profile berhasil diupdate')
      
      // Update localStorage dengan nama baru
      const updatedUserData = { ...user, name: name.trim() }
      localStorage.setItem('user', JSON.stringify(updatedUserData))
      
      await getUser()
      await fetchStats()
    } catch (err) {
      setError(`Error: ${err.message}`)
      console.error('Update error:', err)
      alert(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const userPhone = storedUser?.phone
      if (!userPhone) return

      const { data, error: statsError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_phone', userPhone)

      if (statsError) {
        console.log(statsError)
        return
      }

      const total = data.length
      const process = data.filter(
        (item) =>
          item.status === 'pending' ||
          item.status === 'quoted' ||
          item.status === 'process'
      ).length
      const done = data.filter((item) => item.status === 'done').length

      setStats({ total, process, done })
    } catch (err) {
      console.log('fetchStats error:', err)
    }
  }

  if (error) {
    return (
      <div
        style={{
          color: 'white',
          padding: '30px',
          backgroundColor: '#0f172a',
          minHeight: '100vh'
        }}
      >
        <div style={{
          backgroundColor: '#7f1d1d',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#fca5a5' }}>❌ Error</h2>
          <p>{error}</p>
          <button 
            onClick={getUser}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        style={{
          color: 'white',
          padding: '30px',
          backgroundColor: '#0f172a',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
          <p>Loading profile Anda...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        padding: '40px',
        color: 'white'
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '25px',
          border: '1px solid #334155'
        }}
      >

        {/* HEADER */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              margin: '0 auto 20px auto'
            }}
          >
            👤
          </div>

          <h1
            style={{
              fontSize: '36px',
              marginBottom: '10px'
            }}
          >
            Profile User
          </h1>

          <p
            style={{
              color: '#94a3b8'
            }}
          >
            Kelola informasi akun anda
          </p>
        </div>

        {/* INPUT NAMA */}
        <div
          style={{
            marginBottom: '25px'
          }}
        >
          <label
            style={{
              display: 'block',
              marginBottom: '10px',
              color: '#cbd5e1'
            }}
          >
            Nama
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        {/* NOMOR WA */}
        <div
          style={{
            marginBottom: '25px'
          }}
        >
          <label
            style={{
              display: 'block',
              marginBottom: '10px',
              color: '#cbd5e1'
            }}
          >
            Nomor WhatsApp
          </label>

          <input
            type="text"
            value={user.phone}
            disabled
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid #334155',
              backgroundColor: '#111827',
              color: '#94a3b8',
              outline: 'none',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* STATISTIK */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '35px'
          }}
        >

          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}
          >
            <h2
              style={{
                color: '#8b5cf6',
                marginBottom: '10px'
              }}
            >
              {stats.total}
            </h2>

            <p
              style={{
                color: '#cbd5e1'
              }}
            >
              Total Order
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}
          >
            <h2
              style={{
                color: '#f59e0b',
                marginBottom: '10px'
              }}
            >
              {stats.process}
            </h2>

            <p
              style={{
                color: '#cbd5e1'
              }}
            >
              Order Diproses
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}
          >
            <h2
              style={{
                color: '#22c55e',
                marginBottom: '10px'
              }}
            >
              {stats.done}
            </h2>

            <p
              style={{
                color: '#cbd5e1'
              }}
            >
              Order Selesai
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={updateProfile}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '14px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Loading...' : 'Simpan Perubahan'}
        </button>

        {/* HUBUNGI ADMIN */}
        <Link
          to="/contact"
          style={{
            display: 'block',
            marginTop: '20px',
            textAlign: 'center',
            padding: '15px',
            borderRadius: '14px',
            backgroundColor: '#22c55e',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Hubungi Admin
        </Link>

      </div>
    </div>
  )
}

export default Profile