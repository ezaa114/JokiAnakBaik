import { useEffect, useState } from 'react'
import { getPricing } from '../../services/supabase/pricing.service.js'

function Pricing() {

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPricing()
  }, [])

  const fetchPricing = async () => {
    setLoading(true)

    const { data, error } = await getPricing()

    if (error) {
      console.log(error)
      setLoading(false)
      return
    }

    setServices(data || [])
    setLoading(false)
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

      <h1
        style={{
          fontSize: '38px',
          marginBottom: '10px'
        }}
      >
        Daftar Layanan
      </h1>

      <p
        style={{
          color: '#cbd5e1',
          marginBottom: '40px'
        }}
      >
        Berikut layanan yang tersedia dari admin.
      </p>

      {loading ? (
        <p>Memuat layanan...</p>
      ) : (

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}
        >

          {services.map((service) => (

            <div
              key={service.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '20px',
                padding: '25px',
                border: '1px solid #334155'
              }}
            >

              <h2
                style={{
                  marginBottom: '15px',
                  fontSize: '26px'
                }}
              >
                {service.service_name}
              </h2>

              <h3
                style={{
                  color: '#8b5cf6',
                  marginBottom: '15px'
                }}
              >
                Mulai dari Rp
                {service.price?.toLocaleString('id-ID')}
              </h3>

              <p
                style={{
                  color: '#cbd5e1',
                  lineHeight: '1.7'
                }}
              >
                {service.detail_description || service.description ||
                  'Belum ada deskripsi layanan.'}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Pricing