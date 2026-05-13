import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    process: 0,
    done: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    const total = data.length
    const process = data.filter(
      (item) =>
        item.status === 'pending' ||
        item.status === 'quoted' ||
        item.status === 'process'
    ).length
    const done = data.filter((item) => item.status === 'done').length

    setStats({ total, process, done })
  }

  return (
    <div
      style={{
        padding: '30px'
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: '30px'
        }}
      >
        <h1
          style={{
            fontSize: '38px',
            marginBottom: '10px'
          }}
        >
          Dashboard User
        </h1>

        <p
          style={{
            color: '#94a3b8'
          }}
        >
          Selamat datang di sistem Joki Anak Baik.
        </p>
      </div>

      {/* CARD SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}
      >
        {/* CARD 1 */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155'
          }}
        >
          <h2
            style={{
              marginBottom: '15px'
            }}
          >
            Total Order
          </h2>

          <h1
            style={{
              fontSize: '40px',
              color: '#8b5cf6'
            }}
          >
            {stats.total}
          </h1>
        </div>

        {/* CARD 2 */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155'
          }}
        >
          <h2
            style={{
              marginBottom: '15px'
            }}
          >
            Sedang Diproses
          </h2>

          <h1
            style={{
              fontSize: '40px',
              color: '#f59e0b'
            }}
          >
            {stats.process}
          </h1>
        </div>

        {/* CARD 3 */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155'
          }}
        >
          <h2
            style={{
              marginBottom: '15px'
            }}
          >
            Order Selesai
          </h2>

          <h1
            style={{
              fontSize: '40px',
              color: '#22c55e'
            }}
          >
            {stats.done}
          </h1>
        </div>
      </div>

      {/* ORDER SECTION */}
      <div
        style={{
          marginTop: '40px',
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '25px',
          border: '1px solid #334155'
        }}
      >
        <h2
          style={{
            marginBottom: '20px'
          }}
        >
          Riwayat Pesanan
        </h2>

        <div
          style={{
            overflowX: 'auto'
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}
          >
            <thead>
              <tr>
                <th style={tableHead}>Jenis</th>
                <th style={tableHead}>Status</th>
                <th style={tableHead}>Harga</th>
                <th style={tableHead}>Tanggal</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={tableData}>Makalah</td>
                <td style={tableData}>Diproses</td>
                <td style={tableData}>Rp50.000</td>
                <td style={tableData}>10 Mei 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const tableHead = {
  textAlign: 'left',
  padding: '15px',
  borderBottom: '1px solid #334155',
  color: '#94a3b8'
}

const tableData = {
  padding: '15px',
  borderBottom: '1px solid #334155'
}

export default Dashboard
