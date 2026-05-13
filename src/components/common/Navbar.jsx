import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#8b5cf6',
            textDecoration: 'none'
          }}
        >
          Joki Anak Baik
        </Link>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <Link
            to="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#8b5cf6')}
            onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
          >
            Beranda
          </Link>

          <Link
            to="/login"
            style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#7c3aed')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#8b5cf6')}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              backgroundColor: 'white',
              color: '#8b5cf6',
              padding: '8px 16px',
              border: '1px solid #8b5cf6',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8b5cf6'
              e.target.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#8b5cf6'
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar