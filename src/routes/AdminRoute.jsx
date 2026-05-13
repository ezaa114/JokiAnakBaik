import PrivateRoute from './PrivateRoute'

function AdminRoute() {
	return <PrivateRoute allowedRoles={['admin']} />
}

export default AdminRoute
