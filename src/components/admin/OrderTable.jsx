import React from 'react'

function OrderTable() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '20px'
        }}
      >
        Daftar Order
      </h3>

      <div
        style={{
          overflowX: 'auto'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                ID Order
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                Customer
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                Service
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data - in real app this would come from props or API */}
            <tr
              style={{
                borderBottom: '1px solid #f3f4f6'
              }}
            >
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#111827'
                }}
              >
                #001
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#111827'
                }}
              >
                John Doe
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#111827'
                }}
              >
                Joki Makalah
              </td>
              <td
                style={{
                  padding: '12px 16px'
                }}
              >
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: '#fef3c7',
                    color: '#d97706'
                  }}
                >
                  Pending
                </span>
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}
              >
                2024-01-15
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable