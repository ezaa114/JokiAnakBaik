import React from 'react'

function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) {
  const baseStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  }

  const variants = {
    primary: {
      ...baseStyles,
      backgroundColor: disabled ? '#d1d5db' : '#8b5cf6',
      color: 'white'
    },
    secondary: {
      ...baseStyles,
      backgroundColor: disabled ? '#f3f4f6' : 'white',
      color: disabled ? '#9ca3af' : '#374151',
      border: '1px solid #d1d5db'
    },
    danger: {
      ...baseStyles,
      backgroundColor: disabled ? '#fecaca' : '#ef4444',
      color: 'white'
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variants[variant]}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(-1px)'
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = 'none'
        }
      }}
    >
      {children}
    </button>
  )
}

export default Button