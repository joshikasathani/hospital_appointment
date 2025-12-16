import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('access_token')
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken)
          setToken(storedToken)
          setUser({
            id: decoded.sub,
            role: decoded.role
          })
        } catch (err) {
          console.error('Failed to decode token:', err)
          localStorage.removeItem('access_token')
        }
      }
      // Always set loading to false, regardless of whether we have a token
      setLoading(false)
    }

    // Add a timeout to ensure loading is always set to false
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)

    initializeAuth()
    
    return () => clearTimeout(timeout)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      const jwtToken = data.access_token;
      
      localStorage.setItem('access_token', jwtToken);
      const decoded = jwtDecode(jwtToken);

      setToken(jwtToken);
      setUser({
        id: decoded.sub,
        role: decoded.role,
        email: email
      });
    } catch (error) {
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setToken(null)
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
