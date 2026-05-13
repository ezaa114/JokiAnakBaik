import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/public/LandingPage.jsx'
import LoginPage from './pages/public/Login.jsx'
import RegisterPage from './pages/public/Register.jsx'
import ForgotAccountPage from './pages/public/ForgotAccount.jsx'
import ContactPage from './pages/public/Contact.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import ManageOrders from './pages/admin/ManageOrders.jsx'
import ManagePricing from './pages/admin/ManagePricing.jsx'
import ManageUsers from './pages/admin/ManageUsers.jsx'
import OrderDone from './pages/admin/OrderDone.jsx'
import CreateOrder from './pages/user/CreateOrder.jsx'
import UserDashboard from './pages/user/Dashboard.jsx'
import OrderHistory from './pages/user/OrderHistory.jsx'
import OrderStatus from './pages/user/OrderStatus.jsx'
import Pricing from './pages/user/Pricing.jsx'
import Profile from './pages/user/Profile.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-account" element={<ForgotAccountPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="create-order" element={<CreateOrder />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="order-status" element={<OrderStatus />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/create-order" element={<Navigate to="/user/create-order" replace />} />
          {/* Admin routes - tanpa protection untuk development */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="order-done" element={<OrderDone />} />
            <Route path="pricing" element={<ManagePricing />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App