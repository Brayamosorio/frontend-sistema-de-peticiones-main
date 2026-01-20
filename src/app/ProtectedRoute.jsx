import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../store/authStore'

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />
  return children
}
