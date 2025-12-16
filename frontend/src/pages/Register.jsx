import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl text-center p-10 border border-gray-100">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, rgba(0, 168, 107, 0.1) 0%, rgba(0, 168, 107, 0.2) 100%)' }}>
              <CheckCircleIcon className="w-12 h-12" style={{ color: '#00a86b' }} />
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Registration Successful!</h2>
            <p className="text-lg mb-8" style={{ color: '#475569' }}>
              Your account has been created successfully. Redirecting to login...
            </p>
            <div className="loading-spinner w-8 h-8 mx-auto" style={{ borderTopColor: '#0066cc' }}></div>
          </div>
        </div>
      </div>
    );
  }

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
            Join Our Healthcare Community
          </h1>
          
          <p className="text-xl mb-12 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
            Create your account and start your journey towards better healthcare management.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">For Patients</h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Book appointments and track your health</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">For Hospitals</h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Manage your hospital and reach more patients</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="flex lg:hidden items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                <BuildingOfficeIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold" style={{ color: '#0f172a' }}>MediBook</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#0f172a' }}>Create Account</h2>
            <p className="text-lg" style={{ color: '#475569' }}>Join our healthcare community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg shadow-sm">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
              <label htmlFor="role" className="form-label">
                Register As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-input pl-10 appearance-none"
                >
                  <option value="patient">Patient</option>
                  <option value="hospital">Hospital Administrator</option>
                </select>
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Create a password"
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

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm" style={{ color: '#475569' }}>
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="font-bold hover:underline" style={{ color: '#0066cc' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-bold hover:underline" style={{ color: '#0066cc' }}>
                Privacy Policy
              </Link>
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
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm" style={{ color: '#475569' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-bold hover:underline" style={{ color: '#0066cc' }}>
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
