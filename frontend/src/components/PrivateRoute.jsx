import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="text-center mt-10 text-red-500">
        Access denied. {requiredRole} access required.
      </div>
    )
  }

  return children
}

export default PrivateRoute
