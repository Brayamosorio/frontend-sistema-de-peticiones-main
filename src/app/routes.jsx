import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import NewRequest from '../pages/requests/NewRequest'
import Inbox from '../pages/requests/Inbox'
import Sent from '../pages/requests/Sent'
import History from '../pages/requests/History'
import Charts from '../pages/analytics/Charts'
import Users from '../pages/admin/Users'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/new"
        element={
          <ProtectedRoute>
            <NewRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/inbox"
        element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/sent"
        element={
          <ProtectedRoute>
            <Sent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/charts"
        element={
          <ProtectedRoute>
            <Charts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />

      <Route path="*" element={<div className="p-6">404</div>} />
    </Routes>
  )
}
