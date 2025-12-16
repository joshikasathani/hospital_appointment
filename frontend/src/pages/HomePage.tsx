import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  HeartIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Sample data for now
  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main St, New York, NY 10001',
      city: 'New York',
      contact_email: 'info@citygeneral.com',
      contact_phone: '+1 (555) 123-4567',
      category: 'Multi-Specialty',
      specialties: ['Cardiology', 'Neurology'],
      facilities: ['Emergency Room', 'ICU'],
      services: ['General Medicine', 'Surgery'],
      timings: { 'monday': '8:00 AM - 8:00 PM' },
      images: ['https://images.unsplash.com/photo-1538108149393?w=800'],
      description: 'A leading multi-specialty hospital with comprehensive care',
      is_approved: true,
      rating: 4.5,
      price_range: '$100 - $500'
    },
    {
      id: 2,
      name: 'MediCare Center',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      city: 'Los Angeles',
      contact_email: 'info@medicare.com',
      contact_phone: '+1 (555) 987-6543',
      category: 'General',
      specialties: ['Internal Medicine', 'Pediatrics'],
      facilities: ['Emergency Room', 'Laboratory'],
      services: ['Primary Care', 'Pediatrics'],
      timings: { 'monday': '9:00 AM - 6:00 PM' },
      images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6cb79?w=800'],
      description: 'Providing quality healthcare services to the community',
      is_approved: true,
      rating: 4.2,
      price_range: '$50 - $300'
    }
  ];

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search clicked:', { searchTerm, selectedCategory, selectedCity });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarIconSolid key="half" className="w-4 h-4 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={i} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  const features = [
    {
      icon: BuildingOfficeIcon,
      title: 'Verified Hospitals',
      description: 'All hospitals are verified and approved by our medical team'
    },
    {
      icon: ClockIcon,
      title: 'Quick Appointments',
      description: 'Book appointments in minutes, no waiting in long queues'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payments',
      description: 'Safe and secure online payment processing'
    },
    {
      icon: HeartIcon,
      title: 'Quality Healthcare',
      description: 'Connect with top-rated healthcare providers'
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Doctors',
      description: 'Access to experienced and certified medical professionals'
    },
    {
      icon: PhoneIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'The booking process was so smooth and I found a great hospital near me. Highly recommended!',
      rating: 5,
      avatar: '/images/testimonial1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Excellent service! The platform made it easy to compare hospitals and book appointments.',
      rating: 5,
      avatar: '/images/testimonial2.jpg'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Patient',
      content: 'I love the convenience of booking appointments online. No more waiting on phone calls!',
      rating: 5,
      avatar: '/images/testimonial3.jpg'
    }
  ];

  const statistics = [
    { number: '500+', label: 'Verified Hospitals' },
    { number: '10,000+', label: 'Happy Patients' },
    { number: '50,000+', label: 'Appointments Booked' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find and Book Healthcare Services
              <span className="block text-3xl md:text-4xl mt-3 font-normal" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Your Health, Our Priority
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              Connect with top hospitals and healthcare providers. Book appointments online, 
              manage your health records, and receive quality care.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hospitals, services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="General">General</option>
                  <option value="Multi-Specialty">Multi-Specialty</option>
                  <option value="Specialty">Specialty</option>
                  <option value="Cardiac">Cardiac</option>
                  <option value="Pediatric">Pediatric</option>
                </select>
                
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                
                  <button
                  type="submit"
                  className="text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' }}
                >
                  <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/hospitals" className="bg-white hover:shadow-xl px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center transform hover:-translate-y-1" style={{ color: '#0066cc' }}>
                Browse Hospitals
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/register" className="border-2 border-white text-white hover:bg-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center transform hover:-translate-y-1" style={{ '--hover-color': '#0066cc' } as any}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0f172a' }}>
              Why Choose MediBook?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              We make healthcare accessible, affordable, and convenient for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 168, 107, 0.1) 100%)' }}>
                  {React.createElement(feature.icon, { className: "w-10 h-10", style: { color: '#0066cc' } })}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{feature.title}</h3>
                <p style={{ color: '#475569' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0f172a' }}>
                Featured Hospitals
              </h2>
              <p className="text-xl" style={{ color: '#475569' }}>
                Top-rated hospitals in your area
              </p>
            </div>
            <Link to="/hospitals" className="mt-4 md:mt-0 font-semibold inline-flex items-center hover:underline transition-all" style={{ color: '#0066cc' }}>
              View All Hospitals
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hospitals.slice(0, 6).map((hospital) => (
                <div key={hospital.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="h-48 rounded-t-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                    <BuildingOfficeIcon className="w-20 h-20 text-white opacity-90" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hospital.city}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {renderStars(hospital.rating || 4.5)}
                        <span className="ml-2 text-sm text-gray-600">
                          ({hospital.rating || 4.5})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {hospital.category}
                      </span>
                      {hospital.specialties?.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/hospitals/${hospital.id}`}
                        className="flex-1 text-white py-2.5 px-4 rounded-lg transition-all text-center font-medium hover:shadow-lg transform hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' }}
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/book/${hospital.id}`}
                        className="flex-1 py-2.5 px-4 rounded-lg transition-all text-center font-medium hover:shadow-md"
                        style={{ border: '2px solid #0066cc', color: '#0066cc' }}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Join the growing community of satisfied patients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all">
                <div className="text-5xl md:text-6xl font-bold mb-3">{stat.number}</div>
                <div className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0f172a' }}>
              What Our Patients Say
            </h2>
            <p className="text-xl" style={{ color: '#475569' }}>
              Real experiences from real patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg" style={{ color: '#0f172a' }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: '#475569' }}>{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-5">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <StarIconSolid key={index} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="italic leading-relaxed" style={{ color: '#475569' }}>"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Take Control of Your Healthcare?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
            Join thousands of patients who have already discovered the convenience of online healthcare booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white px-10 py-4 rounded-lg font-bold transition-all inline-flex items-center justify-center hover:shadow-2xl transform hover:-translate-y-1 text-lg" style={{ color: '#0066cc' }}>
              Get Started Now
              <ArrowRightIcon className="w-6 h-6 ml-2" />
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white px-10 py-4 rounded-lg font-bold transition-all inline-flex items-center justify-center transform hover:-translate-y-1 text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
