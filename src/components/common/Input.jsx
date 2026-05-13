import React from 'react'

function Input({ label, type = 'text', placeholder, value, onChange, error, required = false }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}
        >
          {label}
          {required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          backgroundColor: 'white'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#8b5cf6'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
        }}
      />

      {error && (
        <p
          style={{
            fontSize: '12px',
            color: '#ef4444',
            margin: '4px 0 0 0'
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Input