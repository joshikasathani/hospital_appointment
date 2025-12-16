import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Hospital Booking
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">
                Welcome, {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
