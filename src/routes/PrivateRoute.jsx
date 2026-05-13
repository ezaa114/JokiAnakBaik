import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/common/Loader.jsx'

function PrivateRoute({ allowedRoles = [] }) {
	const { user, loading } = useAuth()

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					backgroundColor: '#0f172a'
				}}
			>
				<Loader size="large" />
			</div>
		)
	}

	if (!user) {
		return <Outlet />
	}

	// Development bypass: tidak memblokir akses berdasarkan role.
	// Jika Anda ingin menambahkan kembali pembatasan role, kembalikan logika allowedRoles di sini.
	return <Outlet />
}

export default PrivateRoute
