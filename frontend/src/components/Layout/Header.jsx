import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  CalendarIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileMenuOpen(false);
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const items = [
      { name: 'Home', href: '/', icon: HomeIcon, current: location.pathname === '/' },
    ];

    if (user.role === 'patient') {
      items.push(
        { name: 'Hospitals', href: '/hospitals', icon: BuildingOfficeIcon, current: location.pathname === '/hospitals' },
        { name: 'My Appointments', href: '/patient-dashboard', icon: CalendarIcon, current: location.pathname === '/patient-dashboard' }
      );
    }

    if (user.role === 'hospital') {
      items.push(
        { name: 'Dashboard', href: '/hospital-dashboard', icon: CalendarIcon, current: location.pathname === '/hospital-dashboard' },
        { name: 'Services', href: '/services', icon: BuildingOfficeIcon, current: location.pathname === '/services' }
      );
    }

    if (user.role === 'admin') {
      items.push(
        { name: 'Dashboard', href: '/admin-dashboard', icon: CalendarIcon, current: location.pathname === '/admin-dashboard' },
        { name: 'Hospitals', href: '/admin/hospitals', icon: BuildingOfficeIcon, current: location.pathname === '/admin/hospitals' }
      );
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ color: '#0f172a' }}>MediBook</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  item.current
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                style={{ color: item.current ? '#0066cc' : '#475569' }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <BellIcon className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </div>

                {/* Profile Menu */}
                <div className="relative profile-menu">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                      <span className="text-white text-base font-bold">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{user.name || 'User'}</p>
                      <p className="text-xs capitalize" style={{ color: '#475569' }}>{user.role}</p>
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <CogIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#475569' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.current
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {user && (
              <>
                <hr className="my-2 border-gray-200" />
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
