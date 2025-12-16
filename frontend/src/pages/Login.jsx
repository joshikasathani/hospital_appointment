import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BuildingOfficeIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <BuildingOfficeIcon className="w-9 h-9" />
            </div>
            <span className="text-4xl font-bold">MediBook</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to Your Healthcare Portal
          </h1>
          
          <p className="text-xl mb-12 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
            Access your personalized healthcare dashboard, manage appointments, 
            and connect with trusted medical providers.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Patient Portal</h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Book appointments and manage your health</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Hospital Dashboard</h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Manage your hospital and appointments</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="flex lg:hidden items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                <BuildingOfficeIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold" style={{ color: '#0f172a' }}>MediBook</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#0f172a' }}>Sign In</h2>
            <p className="text-lg" style={{ color: '#475569' }}>Welcome back! Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg shadow-sm">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-lg font-bold text-white transition-all hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-5 h-5 mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm" style={{ color: '#475569' }}>
                Don't have an account?{' '}
                <Link to="/register" className="font-bold hover:underline" style={{ color: '#0066cc' }}>
                  Sign up
                </Link>
              </span>
            </div>
          </form>

          {/* Demo Accounts */}
          <div className="mt-10 p-6 rounded-2xl border-2 border-blue-100" style={{ background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 107, 0.05) 100%)' }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: '#0f172a' }}>Demo Accounts</h3>
            <div className="space-y-2 text-xs" style={{ color: '#475569' }}>
              <div><strong>Patient:</strong> patient@example.com / password123</div>
              <div><strong>Hospital:</strong> hospital@example.com / password123</div>
              <div><strong>Admin:</strong> admin@example.com / password123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
