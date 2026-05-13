import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function OrderDone() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()

    // Auto refresh setiap 30 detik
    const interval = setInterval(fetchOrders, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'done')
      .order('created_at', { ascending: false })

    console.log('DATA ORDER DONE (ADMIN):', data)
    console.log('ERROR ORDER DONE (ADMIN):', error)

    if (error) {
      console.log(error)
      return
    }

    setOrders(data)
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
          fontSize: '36px',
          marginBottom: '30px'
        }}
      >
        Order Selesai
      </h1>

      <p
        style={{
          color: '#94a3b8',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        Riwayat order yang telah selesai dikerjakan
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '40px',
              borderRadius: '20px',
              border: '1px solid #334155',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h3 style={{ marginBottom: '10px' }}>Belum ada order selesai</h3>
            <p style={{ color: '#94a3b8' }}>
              Order yang telah selesai akan muncul di sini
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: '#1e293b',
                padding: '25px',
                borderRadius: '20px',
                border: '1px solid #334155'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}
              >
                <h2 style={{ margin: '0' }}>{order.service_type}</h2>
                <span
                  style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ SELESAI
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                  marginBottom: '15px'
                }}
              >
                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                <p>
                  <strong>Harga Final:</strong>{' '}
                  Rp {order.final_price ? order.final_price.toLocaleString() : '0'}
                </p>

                <p>
                  <strong>Jumlah Halaman:</strong>{' '}
                  {order.pages || '-'}
                </p>

                <p>
                  <strong>Deadline:</strong> {order.deadline}
                </p>
              </div>

              <p>
                <strong>Catatan:</strong> {order.note || 'Tidak ada catatan'}
              </p>

              <div
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#0f172a',
                  borderRadius: '10px',
                  border: '1px solid #334155'
                }}
              >
                <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>
                  <strong>Dikerjakan pada:</strong> {new Date(order.updated_at || order.created_at).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderDone