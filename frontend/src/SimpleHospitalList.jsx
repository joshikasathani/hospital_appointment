import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  BuildingOfficeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { isAdmin, isAuthenticated } from './utils/auth';
import { API_ENDPOINTS } from './config/api';

const SimpleHospitalList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // Check if user is admin
  const userIsAdmin = isAdmin();
  const userIsAuthenticated = isAuthenticated();
  
  // Sample hospital data
  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main St, New York, NY 10001',
      city: 'New York',
      contact_email: 'info@citygeneral.com',
      contact_phone: '+1 (555) 123-4567',
      category: 'Multi-Specialty',
      specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory'],
      services: ['General Medicine', 'Surgery', 'Emergency Care'],
      timings: {
        'Monday': '8:00 AM - 8:00 PM',
        'Tuesday': '8:00 AM - 8:00 PM',
        'Wednesday': '8:00 AM - 8:00 PM',
        'Thursday': '8:00 AM - 8:00 PM',
        'Friday': '8:00 AM - 8:00 PM',
        'Saturday': '9:00 AM - 6:00 PM',
        'Sunday': '9:00 AM - 4:00 PM'
      },
      images: ['https://images.unsplash.com/photo-1538108149393?w=800'],
      description: 'A leading multi-specialty hospital providing comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.',
      is_approved: true,
      rating: 4.5,
      price_range: '$100 - $500',
      emergency_services: true,
      established_year: 1995,
      bed_count: 500,
      doctor_count: 150
    },
    {
      id: 2,
      name: 'MediCare Center',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      city: 'Los Angeles',
      contact_email: 'info@medicare.com',
      contact_phone: '+1 (555) 987-6543',
      category: 'General',
      specialties: ['Internal Medicine', 'Pediatrics', 'Family Medicine'],
      facilities: ['Emergency Room', 'Laboratory', 'Pharmacy'],
      services: ['Primary Care', 'Pediatrics', 'Vaccinations'],
      timings: {
        'Monday': '9:00 AM - 6:00 PM',
        'Tuesday': '9:00 AM - 6:00 PM',
        'Wednesday': '9:00 AM - 6:00 PM',
        'Thursday': '9:00 AM - 6:00 PM',
        'Friday': '9:00 AM - 6:00 PM',
        'Saturday': '10:00 AM - 4:00 PM',
        'Sunday': 'Closed'
      },
      images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6cb79?w=800'],
      description: 'Providing quality healthcare services to the community with a focus on preventive care and patient-centered treatment.',
      is_approved: true,
      rating: 4.2,
      price_range: '$50 - $300',
      emergency_services: false,
      established_year: 2005,
      bed_count: 200,
      doctor_count: 75
    },
    {
      id: 3,
      name: 'Heart Institute',
      address: '789 Cardiac Blvd, Boston, MA 02101',
      city: 'Boston',
      contact_email: 'info@heartinstitute.com',
      contact_phone: '+1 (555) 456-7890',
      category: 'Specialty',
      specialties: ['Cardiology', 'Cardiac Surgery', 'Electrophysiology'],
      facilities: ['Cardiac ICU', 'Cath Lab', 'Cardiac Rehab'],
      services: ['Heart Surgery', 'Cardiac Catheterization', 'Pacemaker Implantation'],
      timings: {
        'Monday': '7:00 AM - 7:00 PM',
        'Tuesday': '7:00 AM - 7:00 PM',
        'Wednesday': '7:00 AM - 7:00 PM',
        'Thursday': '7:00 AM - 7:00 PM',
        'Friday': '7:00 AM - 7:00 PM',
        'Saturday': '8:00 AM - 5:00 PM',
        'Sunday': 'Emergency Only'
      },
      images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'],
      description: 'A specialized cardiac care center dedicated to heart disease prevention, diagnosis, and treatment using advanced medical technologies.',
      is_approved: true,
      rating: 4.8,
      price_range: '$200 - $1000',
      emergency_services: true,
      established_year: 2000,
      bed_count: 150,
      doctor_count: 60
    }
  ];

  const cities = ['New York', 'Los Angeles', 'Boston', 'Chicago', 'Houston'];
  const categories = ['All Categories', 'General', 'Multi-Specialty', 'Specialty', 'Cardiac', 'Pediatric'];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || hospital.category === selectedCategory;
    const matchesCity = !selectedCity || hospital.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const renderStars = (rating) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospitals</h1>
              <p className="text-gray-600">Find the best healthcare providers in your area</p>
            </div>
            
            <div className="flex items-center gap-4">
              {userIsAuthenticated && userIsAdmin && (
                <Link
                  to="/add-hospital"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Hospital
                </Link>
              )}
              {!userIsAuthenticated && (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Login to add hospitals
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals, services, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Hospital List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 rounded-t-lg relative overflow-hidden">
                <img 
                  src={hospital.images[0]} 
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
                {hospital.emergency_services && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    24/7 Emergency
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                  <div className="flex items-center">
                    {renderStars(hospital.rating)}
                    <span className="ml-1 text-sm text-gray-600">({hospital.rating})</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {hospital.address}
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    {hospital.contact_phone}
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    {hospital.category} • {hospital.bed_count} beds
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {hospital.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                  {hospital.specialties.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{hospital.specialties.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-green-600">{hospital.price_range}</span>
                  <Link 
                    to={`/hospital/${hospital.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleHospitalList;
