import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  WifiIcon,
  CarIcon,
  PhoneArrowUpRightIcon,
  HeartIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Hospital, Service } from '../types';
import useHospitals from '../hooks/useHospitals';
import { COLORS, TIME_SLOTS } from '../utils/constants';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';

const HospitalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const { getHospitalById, loading, error } = useHospitals();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BuildingOfficeIcon },
    { id: 'services', label: 'Services', icon: HeartIcon },
    { id: 'facilities', label: 'Facilities', icon: ShieldCheckIcon },
    { id: 'timings', label: 'Timings', icon: ClockIcon },
    { id: 'reviews', label: 'Reviews', icon: StarIcon },
  ];

  const sampleServices: Service[] = [
    { id: 1, hospital_id: 1, service_name: 'General Consultation', price: 150, description: 'Routine health check-up', category: 'Consultation', duration_minutes: 30, is_active: true },
    { id: 2, hospital_id: 1, service_name: 'Cardiology Consultation', price: 300, description: 'Heart specialist consultation', category: 'Specialty', duration_minutes: 45, is_active: true },
    { id: 3, hospital_id: 1, service_name: 'Blood Test', price: 50, description: 'Complete blood count', category: 'Diagnostic', duration_minutes: 15, is_active: true },
    { id: 4, hospital_id: 1, service_name: 'X-Ray', price: 200, description: 'Digital X-ray imaging', category: 'Diagnostic', duration_minutes: 30, is_active: true },
    { id: 5, hospital_id: 1, service_name: 'Vaccination', price: 80, description: 'Routine vaccination', category: 'Preventive', duration_minutes: 20, is_active: true },
  ];

  const sampleReviews = [
    { id: 1, name: 'John Doe', rating: 5, date: '2024-01-15', comment: 'Excellent service and very professional staff.' },
    { id: 2, name: 'Jane Smith', rating: 4, date: '2024-01-10', comment: 'Good experience, but waiting time was a bit long.' },
    { id: 3, name: 'Mike Johnson', rating: 5, date: '2024-01-05', comment: 'Very clean and well-equipped facility.' },
  ];

  const sampleImages = [
    '/images/hospital1.jpg',
    '/images/hospital2.jpg',
    '/images/hospital3.jpg',
    '/images/hospital4.jpg',
  ];

  useEffect(() => {
    if (id) {
      const fetchHospital = async () => {
        const hospitalData = await getHospitalById(Number(id));
        if (hospitalData) {
          setHospital(hospitalData);
          setServices(sampleServices);
        }
      };
      fetchHospital();
    }
  }, [id, getHospitalById]);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length);
  };

  const handleBookAppointment = (service: Service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospital not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The hospital you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/hospitals')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Hospitals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/hospitals')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Hospitals
          </button>
        </div>
      </div>

      {/* Hospital Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hospital.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>{hospital.address}, {hospital.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    <span>{hospital.contact_phone}</span>
                  </div>
                </div>
                <div className="text-right">
                  {hospital.is_approved && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center justify-end mb-2">
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Verified Hospital
                    </div>
                  )}
                  <div className="flex items-center justify-end mb-2">
                    {renderStars(hospital.rating || 4.5)}
                    <span className="ml-2 text-gray-600">({hospital.rating || 4.5})</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {hospital.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{hospital.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {hospital.specialties?.map((specialty: any, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Book Appointment
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <PhoneIcon className="w-5 h-5 mr-2 inline" />
                  Call Now
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={sampleImages[currentImageIndex]}
                  alt={`${hospital.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sampleImages.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {hospital.name}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  {hospital.description || 'This is a premier healthcare facility dedicated to providing exceptional medical care to our patients. Our team of experienced healthcare professionals is committed to delivering personalized treatment plans using the latest medical technology and evidence-based practices.'}
                </p>
                <p className="text-gray-700 mb-4">
                  We offer a comprehensive range of medical services, from preventive care and routine check-ups to specialized treatments and emergency services. Our state-of-the-art facility is equipped with advanced medical equipment and staffed by board-certified physicians who are experts in their respective fields.
                </p>
                <p className="text-gray-700">
                  Patient comfort and safety are our top priorities. We maintain the highest standards of cleanliness and infection control, and our staff is trained to provide compassionate care in a welcoming environment.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">24/7 Emergency Services</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Board Certified Physicians</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Advanced Medical Equipment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Digital Health Records</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Insurance Accepted</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Free Parking</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Emergency</p>
                      <p className="font-medium">{hospital.contact_phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Working Hours</p>
                      <p className="font-medium">24/7 Available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{hospital.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.service_name}</h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{service.category}</span>
                    <span className="text-sm text-gray-500">{service.duration_minutes} min</span>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(service)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospital.facilities?.map((facility: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{facility}</h3>
                    <p className="text-sm text-gray-600">Available for all patients</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Operating Hours</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {hospital.timings ? (
                  Object.entries(hospital.timings).map(([day, hours]: [string, any]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-900">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">24/7 Available</p>
                    <p className="text-sm text-gray-500">We are open round the clock for emergency services</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
            <div className="space-y-6">
              {sampleReviews.map((review: any) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      <p className="text-sm text-gray-600">{formatDate(review.date)}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_: any, index: number) => (
                        <StarIconSolid
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Service:</span> {selectedService.service_name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Price:</span> {formatCurrency(selectedService.price)}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Duration:</span> {selectedService.duration_minutes} minutes
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/book/${hospital.id}?service=${selectedService.id}`)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Booking
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetailPage;
