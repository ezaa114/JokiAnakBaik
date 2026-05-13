import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function ManageUsers() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      const message = (error?.message || '').toLowerCase()

      if (message.includes('row-level security') || message.includes('permission denied')) {
        setErrorMessage('Gagal mengambil data users karena RLS/policy. Pastikan admin punya policy SELECT semua users atau login memakai session Supabase yang valid.')
      } else {
        setErrorMessage(error?.message || 'Terjadi kesalahan saat mengambil data users.')
      }

      setLoading(false)
      return
    }

    setUsers(data || [])
    setLoading(false)
  }

  const filteredUsers = users.filter(user => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) {
      return filterRole === '' || user.role === filterRole
    }

    const userName = (user.name || '').toLowerCase()
    const userPhone = (user.phone || '').toLowerCase()
    const userEmail = (user.email || '').toLowerCase()

    const matchesSearch =
      userName.includes(normalizedSearch) ||
      userPhone.includes(normalizedSearch) ||
      userEmail.includes(normalizedSearch)

    const matchesRole = filterRole === '' || user.role === filterRole

    return matchesSearch && matchesRole
  })

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
        Manage Users
      </h1>

      {/* Search and Filter */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}
      >
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau nomor telepon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: 'white',
            flex: 1,
            minWidth: '200px'
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: 'white'
          }}
        >
          <option value="">Semua Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}
      >
        {loading && (
          <p style={{ color: '#cbd5e1' }}>
            Memuat data users...
          </p>
        )}

        {!loading && errorMessage && (
          <p style={{ color: '#fca5a5' }}>
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && filteredUsers.length === 0 && (
          <p style={{ color: '#cbd5e1' }}>
            Tidak ada data users yang cocok.
          </p>
        )}

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '20px',
              border: '1px solid #334155'
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}
            >
              {(user.name || '?').charAt(0).toUpperCase()}
            </div>

            <h2
              style={{
                marginBottom: '10px'
              }}
            >
              {user.name || 'Tanpa Nama'}
            </h2>

            <p
              style={{
                color: '#cbd5e1',
                marginBottom: '10px'
              }}
            >
              📞 {user.phone}
            </p>

            <p
              style={{
                color: '#cbd5e1',
                marginBottom: '10px'
              }}
            >
              👤 Role: {user.role}
            </p>

            <p
              style={{
                color: '#cbd5e1',
                marginBottom: '10px'
              }}
            >
              📦 Total Order: {user.total_order || 0}
            </p>

            <p
              style={{
                color: '#cbd5e1'
              }}
            >
              🎁 Discount: {user.discount_active ? 'Aktif' : 'Tidak Aktif'}
            </p>

          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageUsers
