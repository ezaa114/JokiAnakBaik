import { useState } from 'react'
import { supabase } from '../../services/supabase/client'

function ForgotAccount() {
  const [phone, setPhone] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('phone', phone)
      .single()

    setLoading(false)

    if (error || !data) {
      setResult({
        success: false,
        message: 'Nomor tidak ditemukan'
      })
      return
    }

    setResult({
      success: true,
      username: data.username
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Lupa Username</h1>
        <p style={styles.text}>Masukkan nomor HP / WA yang terdaftar</p>

        <form onSubmit={handleSearch} style={styles.form}>
          <input
            type='text'
            placeholder='Masukkan Nomor HP'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />

          <button type='submit' style={styles.button}>
            {loading ? 'Mencari...' : 'Cari Username'}
          </button>
        </form>

        {result && (
          <div style={styles.resultBox}>
            {result.success ? (
              <p style={styles.success}>
                Username Anda: <strong>{result.username}</strong>
              </p>
            ) : (
              <p style={styles.error}>{result.message}</p>
            )}
          </div>
        )}

        <div style={styles.contactBox}>
          <p style={styles.contactText}>Nomor tidak terdaftar?</p>
          <a href='https://t.me/USERNAME_TELEGRAM' target='_blank' rel='noreferrer' style={styles.contactButton}>
            Hubungi Telegram
          </a>
          <a href='https://wa.me/628123456789' target='_blank' rel='noreferrer' style={styles.contactButton}>
            Hubungi WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid #334155'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px'
  },
  text: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  input: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #475569',
    backgroundColor: '#0f172a',
    color: 'white',
    outline: 'none'
  },
  button: {
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#8b5cf6',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  resultBox: {
    marginTop: '25px',
    textAlign: 'center'
  },
  success: {
    color: '#4ade80'
  },
  error: {
    color: '#f87171'
  },
  contactBox: {
    marginTop: '35px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  contactText: {
    color: '#cbd5e1',
    textAlign: 'center'
  },
  contactButton: {
    backgroundColor: '#334155',
    color: 'white',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '10px',
    textAlign: 'center'
  }
}

export default ForgotAccount
