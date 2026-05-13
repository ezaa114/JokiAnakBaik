import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()

    // Auto refresh setiap 30 detik
    const interval = setInterval(fetchOrders, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    const userPhone = localStorage.getItem('userPhone')

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_phone', userPhone)
      .in('status', ['done', 'canceled'])
      .order('created_at', { ascending: false })

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
        Riwayat Order
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '20px',
              border: '1px solid #334155'
            }}
          >
            <h2>{order.service_type}</h2>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Harga Final:</strong>{' '}
              Rp {order.final_price || 0}
            </p>

            <p>
              <strong>Jumlah Halaman:</strong>{' '}
              {order.pages || '-'}
            </p>

            <p>
              <strong>Deadline:</strong> {order.deadline}
            </p>

            <p>
              <strong>Catatan:</strong> {order.note}
            </p>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory
