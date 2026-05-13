function PricingCard() {
  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        padding: '25px',
        borderRadius: '20px',
        border: '1px solid #334155'
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Harga Jasa</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <h3>Makalah</h3>
          <p style={{ color: '#94a3b8' }}>10 - 15 halaman : Rp50.000</p>
        </div>

        <div>
          <h3>Proposal</h3>
          <p style={{ color: '#94a3b8' }}>Mulai dari Rp75.000</p>
        </div>

        <div>
          <h3>Website</h3>
          <p style={{ color: '#94a3b8' }}>Mulai dari Rp150.000</p>
        </div>
      </div>
    </div>
  )
}

export default PricingCard
