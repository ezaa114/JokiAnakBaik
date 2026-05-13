import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function UserLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Function to get user data
    const getUserData = () => {
      const userData = localStorage.getItem('user')
      const parsedUser = userData ? JSON.parse(userData) : null
      setUser(parsedUser)
    }

    // Get initial user data
    getUserData()

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        getUserData()
      }
    }

    // Also check for changes every 1 second (fallback for same-tab updates)
    const interval = setInterval(getUserData, 1000)

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  console.log('UserLayout - current user:', user)

  const navItems = [
    { label: 'Dashboard', path: '/user/dashboard' },
    { label: 'Buat Order', path: '/user/create-order' },
    { label: 'Riwayat Order', path: '/user/orders' },
    { label: 'Status Order', path: '/user/order-status' },
    { label: 'Harga', path: '/user/pricing' },
    { label: 'Profil', path: '/user/profile' }
  ]

  return (
    <div
      style={{
        backgroundColor: '#111827',
        minHeight: '100vh',
        color: 'white',
        padding: '30px'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'flex-start'
        }}
      >
        <aside
          style={{
            width: '260px',
            minWidth: '220px',
            backgroundColor: '#0f172a',
            border: '1px solid #1f2937',
            borderRadius: '18px',
            padding: '24px',
            position: 'sticky',
            top: '30px',
            alignSelf: 'flex-start'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700 }}>
              Menu User
            </h2>
            {user && (
              <p style={{
                margin: '10px 0 0',
                color: '#cbd5e1',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {user.name}
              </p>
            )}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: isActive ? '#8b5cf6' : '#d1d5db',
                    textDecoration: 'none',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 500,
                    backgroundColor: isActive ? '#1e293b' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#8b5cf6'
                      e.target.style.backgroundColor = '#111827'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#d1d5db'
                      e.target.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            onClick={async () => {
              await signOut()
              navigate('/login', { replace: true })
            }}
            style={{
              marginTop: '24px',
              width: '100%',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid #b91c1c',
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Logout
          </button>
        </aside>

        <main style={{ flex: 1 }}>
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ marginBottom: '10px', fontSize: '28px' }}>
              Selamat Datang di Ars Joki Anak Baik
            </h1>
            {user && (
              <p style={{
                color: '#8b5cf6',
                fontSize: '18px',
                fontWeight: '500',
                margin: 0
              }}>
                {user.name}
              </p>
            )}
          </div>

          <div
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '20px',
              padding: '24px'
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserLayout
