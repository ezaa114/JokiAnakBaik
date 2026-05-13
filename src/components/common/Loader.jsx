import React from 'react'

function Loader({ size = 'medium', color = '#8b5cf6' }) {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  }

  return (
    <div
      style={{
        display: 'inline-block',
        width: sizes[size],
        height: sizes[size],
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  )
}

export default Loader