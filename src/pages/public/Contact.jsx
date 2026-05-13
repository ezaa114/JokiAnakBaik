function Contact() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '60px 8%'
      }}
    >
      <h1
        style={{
          fontSize: '50px',
          marginBottom: '20px',
          color: '#8b5cf6'
        }}
      >
        Hubungi Kami
      </h1>

      <p
        style={{
          color: '#cbd5e1',
          marginBottom: '50px',
          fontSize: '18px'
        }}
      >
        Silahkan hubungi admin melalui WhatsApp atau Telegram.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}
      >

        {/* WHATSAPP */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid #334155'
          }}
        >
          <h2
            style={{
              marginBottom: '15px'
            }}
          >
            WhatsApp
          </h2>

          <p
            style={{
              color: '#cbd5e1',
              marginBottom: '20px'
            }}
          >
            Fast respon untuk order dan konsultasi.
          </p>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#22c55e',
              padding: '12px 20px',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Hubungi WhatsApp
          </a>
        </div>

        {/* TELEGRAM */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid #334155'
          }}
        >
          <h2
            style={{
              marginBottom: '15px'
            }}
          >
            Telegram
          </h2>

          <p
            style={{
              color: '#cbd5e1',
              marginBottom: '20px'
            }}
          >
            Bisa kirim file tugas dan diskusi project.
          </p>

          <a
            href="https://t.me/usernameTelegram"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#3b82f6',
              padding: '12px 20px',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Hubungi Telegram
          </a>
        </div>

      </div>
    </div>
  )
}

export default Contact
