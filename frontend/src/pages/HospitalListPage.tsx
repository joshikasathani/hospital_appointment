import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Hospital, HospitalFilters } from '../types';
import useHospitals from '../hooks/useHospitals';
import { useAuth } from '../context/AuthContext';
import { HOSPITAL_CATEGORIES, MEDICAL_SPECIALTIES, HOSPITAL_FACILITIES } from '../utils/constants';
import { formatCurrency, truncateText } from '../utils/helpers';

const HospitalListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    specialty: searchParams.get('specialty') || '',
    min_price: Number(searchParams.get('min_price')) || undefined,
    max_price: Number(searchParams.get('max_price')) || undefined,
    rating: Number(searchParams.get('rating')) || undefined,
    facilities: searchParams.get('facilities')?.split(',') || [],
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { hospitals, loading, error, fetchHospitals, updateFilters, resetFilters } = useHospitals();

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas'];
  const priceRanges = [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: 'Over $1000', min: 1000, max: undefined },
  ];

  useEffect(() => {
    fetchHospitals(filters);
  }, [fetchHospitals]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) newParams.set(key, value.join(','));
        } else {
          newParams.set(key, String(value));
        }
      }
    });
    setSearchParams(newParams);
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFilters((prev: any) => ({
      ...prev,
      facilities: prev.facilities?.includes(facility)
        ? prev.facilities.filter((f: string) => f !== facility)
        : [...(prev.facilities || []), facility]
    }));
  };

  const handlePriceRangeChange = (min?: number, max?: number) => {
    setFilters((prev: any) => ({ ...prev, min_price: min, max_price: max }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      specialty: '',
      min_price: undefined,
      max_price: undefined,
      rating: undefined,
      facilities: [],
    });
    resetFilters();
  };

  const handleSearch = useCallback(async (e: any) => {
    e.preventDefault();
    await fetchHospitals(filters);
  }, [fetchHospitals, filters]);

  // Debounced search for real-time search
  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      const newFilters = { ...filters, search: searchTerm };
      setFilters(newFilters);
      await fetchHospitals(newFilters);
    }, 500),
    [fetchHospitals, filters]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    handleFilterChange('search', searchTerm);
    debouncedSearch(searchTerm);
  };

  // Simple debounce function
  function debounce(func: Function, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }

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

  const sortedHospitals = [...hospitals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price_low':
        return (a.price_range?.match(/\d+/)?.[0] || '0') - (b.price_range?.match(/\d+/)?.[0] || '0');
      case 'price_high':
        return (b.price_range?.match(/\d+/)?.[0] || '0') - (a.price_range?.match(/\d+/)?.[0] || '0');
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-lg flex items-center justify-center">
          <BuildingOfficeIcon className="w-16 h-16 text-white" />
        </div>
        {hospital.is_approved && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <CheckCircleIcon className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
          <div className="flex items-center">
            {renderStars(hospital.rating || 4.5)}
            <span className="ml-2 text-sm text-gray-600">
              ({hospital.rating || 4.5})
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span className="text-sm">{hospital.address}, {hospital.city}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <PhoneIcon className="w-4 h-4 mr-1" />
          <span className="text-sm">{hospital.contact_phone}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {hospital.category}
          </span>
          {hospital.specialties?.slice(0, 2).map((specialty: any, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {specialty}
            </span>
          ))}
        </div>
        
        {hospital.description && (
          <p className="text-gray-600 text-sm mb-4">
            {truncateText(hospital.description, 100)}
          </p>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/hospital/${hospital.id}`)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => navigate(`/book/${hospital.id}`)}
            className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  const HospitalListItem = ({ hospital }: { hospital: Hospital }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <BuildingOfficeIcon className="w-12 h-12 text-white" />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{hospital.address}, {hospital.city}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <PhoneIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{hospital.contact_phone}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-2">
                {renderStars(hospital.rating || 4.5)}
                <span className="ml-2 text-sm text-gray-600">
                  ({hospital.rating || 4.5})
                </span>
              </div>
              {hospital.is_approved && (
                <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center justify-end">
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  Verified
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {hospital.category}
            </span>
            {hospital.specialties?.slice(0, 3).map((specialty: any, index: number) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {specialty}
              </span>
            ))}
          </div>
          
          {hospital.description && (
            <p className="text-gray-600 text-sm mb-4">
              {truncateText(hospital.description, 150)}
            </p>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/hospital/${hospital.id}`)}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/book/${hospital.id}`)}
              className="border border-blue-600 text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              {isAuthenticated && user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/add-hospital')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Hospital
                </button>
              )}
              <div className="flex items-center bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name">Sort by Name</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
                {(filters.category || filters.city || filters.specialty || filters.facilities?.length) && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                    {Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals, services, or specialties..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={handleReset}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Reset All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e: any) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {HOSPITAL_CATEGORIES.map((category: any) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e: any) => handleFilterChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map((city: string) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select
                  value={filters.specialty}
                  onChange={(e: any) => handleFilterChange('specialty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specialties</option>
                  {MEDICAL_SPECIALTIES.map((specialty: any) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.rating || ''}
                  onChange={(e: any) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range: any) => (
                  <button
                    key={range.label}
                    onClick={() => handlePriceRangeChange(range.min, range.max)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.min_price === range.min && filters.max_price === range.max
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {HOSPITAL_FACILITIES.slice(0, 8).map((facility: any) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.facilities?.includes(facility) || false}
                      onChange={() => handleFacilityToggle(facility)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{facility}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => fetchHospitals(filters)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : sortedHospitals.length === 0 ? (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
            <button
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Found {sortedHospitals.length} hospitals
              </p>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedHospitals.map((hospital: any) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedHospitals.map((hospital: any) => (
                  <HospitalListItem key={hospital.id} hospital={hospital} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalListPage;
