import { formatCurrency } from '../../utils/formatCurrency.js'

export default function OrderCard() {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '20px', border: '1px solid #334155' }}>
      <h3 style={{ marginBottom: '10px', color: 'white' }}>Makalah PKN</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Deadline: 12 Mei 2026</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ backgroundColor: '#f59e0b', padding: '8px 14px', borderRadius: '10px', fontSize: '14px', color: 'white' }}>Diproses</span>
        <h3 style={{ color: '#8b5cf6' }}>{formatCurrency(50000)}</h3>
      </div>
    </div>
  )
}
