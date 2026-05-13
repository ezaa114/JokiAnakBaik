import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function OrderStatus() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()

    // Auto refresh setiap 30 detik
    const interval = setInterval(fetchOrders, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    const userPhone = localStorage.getItem('userPhone')

    console.log('LOCAL USER PHONE:', userPhone)

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_phone', userPhone)
      .in('status', ['pending', 'quoted', 'process'])
      .order('created_at', { ascending: false })

    console.log('DATA ORDER:', data)
    console.log('ERROR ORDER:', error)

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
        Status Order
      </h1>

      <p
        style={{
          color: '#94a3b8',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        Order yang sudah selesai akan otomatis pindah ke halaman Riwayat Order
      </p>

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
              <strong>Deadline:</strong> {order.deadline}
            </p>

            <p>
              <strong>Harga:</strong>{' '}
              {order.final_price
                ? `Rp ${order.final_price}`
                : 'Belum ditentukan'}
            </p>

            <p>
              <strong>Jumlah Halaman:</strong>{' '}
              {order.pages || 'Belum ditentukan'}
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

export default OrderStatus
