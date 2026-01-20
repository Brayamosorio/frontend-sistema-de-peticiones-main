import { Navigate } from 'react-router-dom'
import { getRole, isLoggedIn } from '../store/authStore'

export default function AdminRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />
  if (getRole() !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}
