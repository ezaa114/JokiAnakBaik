import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Dashboard() {
  const { user } = useAuth()

  const displayName = user?.username || user?.email || 'User'

  return (

    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.header}>

        <div>

          <h1 style={styles.title}>
            Dashboard User
          </h1>

          <p style={styles.subtitle}>
            Selamat datang,
            {' '}
            {displayName}
          </p>

        </div>

      </div>

      {/* CARD SECTION */}

      <div style={styles.cardGrid}>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Buat Order
          </h2>

          <p style={styles.cardText}>
            Kirim tugas, makalah,
            proposal, atau website.
          </p>

          <Link
            to="/user/create-order"
            style={styles.button}
          >
            Buat Sekarang
          </Link>

        </div>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Riwayat Order
          </h2>

          <p style={styles.cardText}>
            Lihat progress dan status
            semua pesanan Anda.
          </p>

          <Link
            to="/user/orders"
            style={styles.button}
          >
            Lihat Order
          </Link>

        </div>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Profile
          </h2>

          <p style={styles.cardText}>
            Kelola akun dan informasi
            profile Anda.
          </p>

          <Link
            to="/user/profile"
            style={styles.button}
          >
            Buka Profile
          </Link>

        </div>

      </div>

      {/* INFO */}

      <div style={styles.infoBox}>

        <h2 style={styles.infoTitle}>
          Informasi
        </h2>

        <p style={styles.infoText}>
          Selamat datang di sistem
          Joki Anak Baik.
          Anda dapat membuat order,
          melihat status pengerjaan,
          dan mengelola akun dengan mudah.
        </p>

      </div>

    </div>

  )
}

const styles = {

  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    padding: '40px',
    color: 'white'
  },

  header: {
    marginBottom: '40px'
  },

  title: {
    fontSize: '40px',
    marginBottom: '10px'
  },

  subtitle: {
    color: '#cbd5e1',
    fontSize: '18px'
  },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '50px'
  },

  card: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid #334155'
  },

  cardTitle: {
    marginBottom: '15px'
  },

  cardText: {
    color: '#cbd5e1',
    lineHeight: '1.7',
    marginBottom: '25px'
  },

  button: {
    display: 'inline-block',
    backgroundColor: '#8b5cf6',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 20px',
    borderRadius: '10px'
  },

  infoBox: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid #334155'
  },

  infoTitle: {
    marginBottom: '15px'
  },

  infoText: {
    color: '#cbd5e1',
    lineHeight: '1.8'
  }

}

export default Dashboard