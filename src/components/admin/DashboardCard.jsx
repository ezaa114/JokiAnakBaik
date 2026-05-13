import React from 'react'

function DashboardCard({ title, value, icon, color = '#8b5cf6' }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px'
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#6b7280',
            margin: '0 0 4px 0'
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#111827',
            margin: '0'
          }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export default DashboardCard