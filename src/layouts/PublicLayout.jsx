import { Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <Outlet />
    </div>
  )
}

export default PublicLayout
