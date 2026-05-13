import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {

  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })

  }

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <h1 style={styles.logo}>
          Admin Panel
        </h1>

        <nav style={styles.nav}>

          <Link
            to="/admin/dashboard"
            style={styles.link}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            style={styles.link}
          >
            Manage Orders
          </Link>

          <Link
            to="/admin/order-done"
            style={styles.link}
          >
            Order Done
          </Link>

          <Link
            to="/admin/pricing"
            style={styles.link}
          >
            Manage Pricing
          </Link>

          <Link
            to="/admin/users"
            style={styles.link}
          >
            Manage Users
          </Link>

        </nav>

        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>

      </aside>

      {/* CONTENT */}

      <main style={styles.content}>

        <div style={styles.topbar}>

          <h2>
            Welcome Admin {user?.name || user?.username || user?.phone || 'Admin'}
          </h2>

        </div>

        <div style={styles.pageContent}>
          <Outlet />
        </div>

      </main>

    </div>
  )
}

const styles = {

  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0f172a'
  },

  sidebar: {
    width: '260px',
    backgroundColor: '#1e293b',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #334155',
    position: 'fixed',
    height: '100vh',
    top: 0,
    left: 0,
    overflowY: 'auto'
  },

  logo: {
    color: '#8b5cf6',
    marginBottom: '40px'
  },

  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },

  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#334155'
  },

  logoutButton: {
    marginTop: '40px',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#ef4444',
    color: 'white',
    cursor: 'pointer'
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '260px'
  },

  topbar: {
    padding: '25px',
    borderBottom: '1px solid #334155',
    color: 'white'
  },

  pageContent: {
    padding: '30px',
    color: 'white'
  }

}

export default AdminLayout