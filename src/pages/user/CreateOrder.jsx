import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { getPricing } from '../../services/supabase/pricing.service.js'

function CreateOrder() {
  const { user } = useAuth()
  const [pricingItems, setPricingItems] = useState([])
  const [pricingLoading, setPricingLoading] = useState(true)
  const [serviceType, setServiceType] = useState('')
  const [deadline, setDeadline] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setPricingLoading(true)
        const { data, error } = await getPricing()

        if (error) {
          throw error
        }

        const items = data || []
        setPricingItems(items)

        if (items.length > 0) {
          setServiceType(items[0].service_name || '')
        }
      } catch (err) {
        console.error('Gagal memuat pricing:', err)
        setError('Gagal memuat daftar layanan dari database')
      } finally {
        setPricingLoading(false)
      }
    }

    fetchPricing()
  }, [])

  const handleOrder = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const storedUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    )
    const activePhone = user?.phone || storedUser.phone

    if (!storedUser.phone && user?.phone) {
      storedUser.phone = user.phone
    }

    if (!activePhone) {
      setError('User belum login. Silakan masuk terlebih dahulu.')
      return
    }

    if (!serviceType || !deadline) {
      setError('Layanan dan deadline wajib diisi.')
      return
    }

    try {
      setLoading(true)

      const orderData = {
        user_phone: activePhone,
        service_type: serviceType,
        deadline,
        note: note || null,
        status: 'pending',
      }

      console.log('Order data akan dikirim:', orderData)

      const { error } = await supabase
        .from('orders')
        .insert([orderData])

      if (error) {
        console.error('Supabase insert error:', error)
        setError(`Gagal membuat order: ${error.message}`)
        return
      }

      setSuccess('Order berhasil dibuat')
      setServiceType('')
      setDeadline('')
      setNote('')
    } catch (err) {
      console.error('Error saat membuat order:', err)
      setError('Terjadi kesalahan saat membuat order')
    } finally {
      setLoading(false)
    }
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
          borderRadius: '20px',
          border: '1px solid #334155'
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            marginBottom: '30px'
          }}
        >
          Buat Order
        </h1>

        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: '#b91c1c',
              color: 'white'
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: '#16a34a',
              color: 'white'
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleOrder}> 
          <div style={{ marginBottom: '20px' }}>
            <label>Layanan</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
              disabled={pricingLoading || pricingItems.length === 0}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '10px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: 'white'
              }}
            >
              <option value="">{pricingLoading ? 'Memuat layanan...' : 'Pilih layanan'}</option>
              {pricingItems.map((item) => (
                <option key={item.id} value={item.service_name}>
                  {item.service_name}
                </option>
              ))}
            </select>
            {!pricingLoading && pricingItems.length === 0 && (
              <p style={{ marginTop: '8px', color: '#fca5a5' }}>
                Belum ada layanan di tabel pricing.
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '10px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: 'white'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label>Catatan Order</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Bang makalah AI 30 halaman deadline besok"
              rows="6"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '10px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: 'white',
                resize: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Buat Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateOrder

