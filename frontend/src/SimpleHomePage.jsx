import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Background */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Hospital Registry
                <span className="block text-3xl md:text-4xl mt-4 font-light text-blue-100">
                  Your Health, Our Priority
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with top hospitals and healthcare providers. Book appointments online, 
                manage your health records, and receive quality care.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Search Hospitals</h3>
                <p className="text-blue-100 text-sm">Find hospitals near you with advanced filters</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Book Appointments</h3>
                <p className="text-blue-100 text-sm">Schedule your visit online instantly</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Manage Health</h3>
                <p className="text-blue-100 text-sm">Track your medical records securely</p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/hospitals" 
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl inline-flex items-center justify-center"
              >
                Browse Hospitals
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              <Link 
                to="/register" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              We make healthcare accessible, affordable, and convenient for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Hospitals</h3>
              <p className="text-gray-600">All hospitals are verified and approved by our medical team</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quick Appointments</h3>
              <p className="text-gray-600">Book appointments in minutes, no waiting in long queues</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure online payment processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hospitals */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Featured Hospitals
            </h2>
            <p className="text-xl text-gray-600">
              Top-rated healthcare providers in your area
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                  CG
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">City General Hospital</h3>
                  <p className="text-gray-600">Multi-Specialty • New York</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.5/5</span>
              </div>
              <p className="text-gray-700 mb-4">A leading multi-specialty hospital with comprehensive care and state-of-the-art facilities.</p>
              <Link to="/hospitals" className="text-blue-600 font-semibold hover:text-blue-700">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                  MC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">MediCare Center</h3>
                  <p className="text-gray-600">General • Los Angeles</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
                <span className="ml-2 text-gray-600">4.2/5</span>
              </div>
              <p className="text-gray-700 mb-4">Providing quality healthcare services to the community with a focus on preventive care.</p>
              <Link to="/hospitals" className="text-green-600 font-semibold hover:text-green-700">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHomePage;
