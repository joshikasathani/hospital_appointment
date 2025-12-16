import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  PhotoIcon,
  StarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const AddHospitalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    category: 'General',
    emergencyServices: false,
    rating: 0,
    priceRange: 'Moderate',
    facilities: [],
    specialties: [],
    operatingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    images: [],
    establishedYear: '',
    bedCount: '',
    doctorCount: '',
    accreditation: [],
    insuranceAccepted: []
  });

  const categories = [
    'General',
    'Multi-Specialty',
    'Cardiac',
    'Maternity',
    'Pediatric',
    'Orthopedic',
    'Neurology',
    'Cancer',
    'Eye',
    'Dental',
    'Mental Health',
    'Rehabilitation'
  ];

  const priceRanges = ['Budget', 'Moderate', 'Premium', 'Luxury'];
  
  const facilityOptions = [
    'Emergency Room',
    'ICU',
    'NICU',
    'Laboratory',
    'Radiology',
    'Pharmacy',
    'Blood Bank',
    'Ambulance Service',
    'Cafeteria',
    'Parking',
    'WiFi',
    'Prayer Room'
  ];

  const specialtyOptions = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Obstetrics & Gynecology',
    'General Surgery',
    'Internal Medicine',
    'Dermatology',
    'Ophthalmology',
    'ENT',
    'Psychiatry',
    'Oncology',
    'Nephrology',
    'Gastroenterology',
    'Pulmonology'
  ];

  const accreditationOptions = [
    'Joint Commission International (JCI)',
    'National Accreditation Board for Hospitals (NABH)',
    'ISO 9001',
    'Healthcare Quality Accreditation',
    'Local Health Department'
  ];

  const insuranceOptions = [
    'Medicare',
    'Medicaid',
    'Blue Cross Blue Shield',
    'Aetna',
    'UnitedHealth',
    'Cigna',
    'Humana',
    'Kaiser Permanente',
    'Private Insurance'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use HospitalService to register hospital with backend
      const hospitalData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        category: formData.category,
        emergencyServices: formData.emergencyServices,
        rating: formData.rating || 0,
        priceRange: formData.priceRange,
        facilities: formData.facilities,
        specialties: formData.specialties,
        operatingHours: formData.operatingHours,
        images: formData.images,
        establishedYear: formData.establishedYear ? parseInt(formData.establishedYear) : undefined,
        bedCount: formData.bedCount ? parseInt(formData.bedCount) : undefined,
        doctorCount: formData.doctorCount ? parseInt(formData.doctorCount) : undefined,
        accreditation: formData.accreditation,
        insuranceAccepted: formData.insuranceAccepted
      };

      const response = await fetch('http://localhost:8000/hospitals/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hospitalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add hospital');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/hospitals');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to add hospital. Please try again.');
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
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Hospital Added Successfully!</h2>
            <p className="text-lg mb-8" style={{ color: '#475569' }}>
              Your hospital has been submitted for review. Redirecting to hospitals list...
            </p>
            <div className="loading-spinner w-8 h-8 mx-auto" style={{ borderTopColor: '#0066cc' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/hospitals')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Hospitals</span>
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
              <BuildingOfficeIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#0f172a' }}>Add Hospital</h1>
            <p className="text-lg" style={{ color: '#475569' }}>
              Register your hospital with our healthcare platform
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg shadow-sm mb-6">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter hospital name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your hospital, services, and specialties"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ZIP Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Website URL"
                  />
                </div>
              </div>
            </div>

            {/* Hospital Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Hospital Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Established Year
                  </label>
                  <input
                    type="number"
                    name="establishedYear"
                    value={formData.establishedYear}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Year established"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Bed Count
                  </label>
                  <input
                    type="number"
                    name="bedCount"
                    value={formData.bedCount}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of beds"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Doctor Count
                  </label>
                  <input
                    type="number"
                    name="doctorCount"
                    value={formData.doctorCount}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of doctors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#0f172a' }}>
                    Price Range
                  </label>
                  <select
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priceRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 flex items-center">
                  <input
                    type="checkbox"
                    name="emergencyServices"
                    checked={formData.emergencyServices}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                  />
                  <label className="text-sm font-bold" style={{ color: '#0f172a' }}>
                    24/7 Emergency Services Available
                  </label>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {facilityOptions.map(facility => (
                  <label key={facility} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleMultiSelect('facilities', facility)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm" style={{ color: '#475569' }}>{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Specialties</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specialtyOptions.map(specialty => (
                  <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={() => handleMultiSelect('specialties', specialty)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm" style={{ color: '#475569' }}>{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accreditation */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Accreditation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accreditationOptions.map(accreditation => (
                  <label key={accreditation} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.accreditation.includes(accreditation)}
                      onChange={() => handleMultiSelect('accreditation', accreditation)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm" style={{ color: '#475569' }}>{accreditation}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Insurance Accepted */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f172a' }}>Insurance Accepted</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {insuranceOptions.map(insurance => (
                  <label key={insurance} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.insuranceAccepted.includes(insurance)}
                      onChange={() => handleMultiSelect('insuranceAccepted', insurance)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm" style={{ color: '#475569' }}>{insurance}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 rounded-lg font-bold text-white transition-all hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)' }}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="loading-spinner w-5 h-5 mr-2"></div>
                    Adding Hospital...
                  </div>
                ) : (
                  'Add Hospital'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHospitalPage;
