const cardStyle = {
  backgroundColor: '#1e293b',
  padding: '25px',
  borderRadius: '20px',
  border: '1px solid #334155'
}

const numberStyle = {
  marginTop: '15px',
  color: '#8b5cf6',
  fontSize: '38px'
}

function OrderStatus() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}
    >
      <div style={cardStyle}>
        <h3>Total Order</h3>

        <h1 style={numberStyle}>
          12
        </h1>
      </div>

      <div style={cardStyle}>
        <h3>Sedang Diproses</h3>

        <h1 style={numberStyle}>
          3
        </h1>
      </div>

      <div style={cardStyle}>
        <h3>Order Selesai</h3>

        <h1 style={numberStyle}>
          9
        </h1>
      </div>
    </div>
  )
}

export default OrderStatus
