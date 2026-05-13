import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#8b5cf6', fontSize: '48px', marginBottom: '20px' }}>
        Joki Anak Baik
      </h1>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <div>
          <a href="#fitur" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Fitur</a>
          <a href="#layanan" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Layanan</a>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Kontak</Link>
        </div>

        <div>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px', padding: '10px 18px', border: '1px solid #8b5cf6', borderRadius: '10px' }}>
            Login
          </Link>
          <Link to="/register" style={{ backgroundColor: '#8b5cf6', color: 'white', textDecoration: 'none', padding: '10px 18px', borderRadius: '10px' }}>
            Register
          </Link>
        </div>
      </nav>

      <section style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h1 style={{ fontSize: '60px', marginBottom: '20px' }}>
          Solusi Tugas Cepat & Profesional
        </h1>
        <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '30px' }}>
          Membantu pengerjaan makalah, proposal, laporan hingga pembuatan website modern.
        </p>

        <div>
          <Link to="/register" style={{ backgroundColor: '#8b5cf6', color: 'white', textDecoration: 'none', padding: '12px 22px', borderRadius: '10px', marginRight: '15px' }}>
            Mulai Sekarang
          </Link>
          <a href="#fitur" style={{ border: '1px solid #8b5cf6', color: 'white', textDecoration: 'none', padding: '12px 22px', borderRadius: '10px' }}>
            Pelajari
          </a>
        </div>
      </section>

      <section
        id="fitur"
        style={{
          padding: '100px 8%',
          backgroundColor: '#111827'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            style={{
              fontSize: '42px',
              color: 'white',
              marginBottom: '15px'
            }}
          >
            Layanan Unggulan
          </h2>

          <p
            style={{
              color: '#9ca3af',
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            Kami membantu berbagai kebutuhan tugas akademik dan digital
            dengan pengerjaan cepat, profesional, dan terpercaya.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}
        >

          {/* CARD 1 */}
          <div
            style={{
              backgroundColor: '#1f2937',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid #374151',
              transition: '0.3s'
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>
              📄
            </div>

            <h3
              style={{
                color: 'white',
                marginBottom: '15px',
                fontSize: '24px'
              }}
            >
              Makalah
            </h3>

            <p
              style={{
                color: '#9ca3af',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}
            >
              Pengerjaan makalah rapi dan sesuai format kampus.
              Bisa revisi dan konsultasi.
            </p>

            <ul
              style={{
                color: '#d1d5db',
                paddingLeft: '18px',
                lineHeight: '1.8'
              }}
            >
              <li>Format otomatis</li>
              <li>Daftar pustaka</li>
              <li>Revisi gratis</li>
            </ul>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              backgroundColor: '#1f2937',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid #374151'
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>
              💻
            </div>

            <h3
              style={{
                color: 'white',
                marginBottom: '15px',
                fontSize: '24px'
              }}
            >
              Website
            </h3>

            <p
              style={{
                color: '#9ca3af',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}
            >
              Pembuatan website modern menggunakan React, Vue,
              maupun fullstack.
            </p>

            <ul
              style={{
                color: '#d1d5db',
                paddingLeft: '18px',
                lineHeight: '1.8'
              }}
            >
              <li>Responsive</li>
              <li>Modern UI</li>
              <li>Database Supabase</li>
            </ul>
          </div>

          {/* CARD 3 */}
          <div
            style={{
              backgroundColor: '#1f2937',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid #374151'
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>
              📊
            </div>

            <h3
              style={{
                color: 'white',
                marginBottom: '15px',
                fontSize: '24px'
              }}
            >
              Proposal & PPT
            </h3>

            <p
              style={{
                color: '#9ca3af',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}
            >
              Proposal akademik maupun bisnis dengan desain
              presentasi profesional.
            </p>

            <ul
              style={{
                color: '#d1d5db',
                paddingLeft: '18px',
                lineHeight: '1.8'
              }}
            >
              <li>Desain menarik</li>
              <li>Isi profesional</li>
              <li>Siap presentasi</li>
            </ul>
          </div>

        </div>

        {/* KEUNGGULAN */}
        <div
          style={{
            marginTop: '80px',
            backgroundColor: '#1e293b',
            padding: '40px',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >

          <div>
            <h2 style={{ color: '#8b5cf6', fontSize: '40px' }}>
              100+
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              Order Selesai
            </p>
          </div>

          <div>
            <h2 style={{ color: '#8b5cf6', fontSize: '40px' }}>
              24 Jam
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              Fast Response
            </p>
          </div>

          <div>
            <h2 style={{ color: '#8b5cf6', fontSize: '40px' }}>
              90%
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              Client Kembali Order
            </p>
          </div>

          <div>
            <h2 style={{ color: '#8b5cf6', fontSize: '40px' }}>
              Trusted
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              Aman & Profesional
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default LandingPage