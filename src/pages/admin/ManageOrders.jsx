import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function ManageOrders() {
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
      .in('status', ['pending', 'quoted', 'process'])
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    if (!data || data.length === 0) {
      setOrders(data || [])
      return
    }

    const phones = [...new Set(data.map((order) => order.user_phone).filter(Boolean))]

    if (phones.length === 0) {
      setOrders(data)
      return
    }

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('phone, name')
      .in('phone', phones)

    if (usersError) {
      console.log(usersError)
      setOrders(data)
      return
    }

    const nameByPhone = Object.fromEntries(users.map((user) => [user.phone, user.name]))

    setOrders(
      data.map((order) => ({
        ...order,
        user_name: nameByPhone[order.user_phone] || null,
      }))
    )
  }

  const updateOrder = async (
    id,
    pages,
    final_price,
    status,
    file_url,
    user_phone,
    prevStatus
  ) => {
    const { data, error } = await supabase
      .from('orders')
      .update({
        pages,
        final_price,
        status,
        file_url: file_url || null
      })
      .eq('id', id)
      .select()

    console.log('UPDATE DATA:', data)
    console.log('UPDATE ERROR:', error)

    if (error) {
      console.log(error)
      alert('Gagal update order')
      return
    }

    if (status === 'done' && prevStatus !== 'done') {
      const { data: userData, error: userFetchError } = await supabase
        .from('users')
        .select('*')
        .eq('phone', user_phone)
        .single()

      if (userFetchError) {
        console.log('Gagal ambil user untuk update discount:', userFetchError)
      } else if (userData) {
        const newTotalOrder = (userData.total_order || 0) + 1
        const newProgress = (userData.discount_progress || 0) + 1
        let discountActive = false
        let discountPercent = 0
        let finalProgress = newProgress

        if (newProgress >= 3) {
          discountActive = true
          discountPercent = 10
          finalProgress = 0
        }

        const { error: userUpdateError } = await supabase
          .from('users')
          .update({
            total_order: newTotalOrder,
            discount_progress: finalProgress,
            discount_active: discountActive,
            discount_percent: discountPercent
          })
          .eq('phone', user_phone)

        if (userUpdateError) {
          console.log('Gagal update data user discount:', userUpdateError)
        }
      }
    }

    alert('Order berhasil diupdate')
    fetchOrders()
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
        Manage Orders
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdate={updateOrder}
          />
        ))}
      </div>
    </div>
  )
}

function OrderCard({ order, onUpdate }) {
  const [pages, setPages] = useState(order.pages || '')
  const [price, setPrice] = useState(order.final_price || '')
  const [status, setStatus] = useState(order.status)
  const [fileUrl, setFileUrl] = useState(order.file_url || '')

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        padding: '25px',
        borderRadius: '20px',
        border: '1px solid #334155'
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>
        {order.service_type}
      </h2>

      <p>
        <strong>User:</strong> {order.user_name || order.user_phone}
      </p>

      <p>
        <strong>Deadline:</strong> {order.deadline}
      </p>

      <p>
        <strong>Catatan:</strong> {order.note}
      </p>

      <div style={{ marginTop: '20px' }}>

        <input
          type="number"
          placeholder="Jumlah Halaman"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: 'white'
          }}
        />

        <input
          type="number"
          placeholder="Harga Final"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: 'white'
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: 'white'
          }}
        >
          <option value="pending">Pending</option>
          <option value="quoted">Quoted</option>
          <option value="process">Process</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>

        <input
          type="url"
          placeholder="File URL (opsional - PDF, link, dll)"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: 'white'
          }}
        />

        <button
          onClick={() =>
            onUpdate(
              order.id,
              pages,
              price,
              status,
              fileUrl,
              order.user_phone,
              order.status
            )
          }
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Simpan Update
        </button>

      </div>
    </div>
  )
}

export default ManageOrders
