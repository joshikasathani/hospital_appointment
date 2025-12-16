import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Hospital, Service, AppointmentFormData } from '../types';
import { TIME_SLOTS, PAYMENT_METHODS } from '../utils/constants';
import { formatDate, formatTime } from '../utils/helpers';

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Sample hospital data - in real app, fetch from API
  const hospital: Hospital = {
    id: hospitalId || '1',
    name: 'City General Hospital',
    category: 'Multi-Specialty',
    description: 'A leading multi-specialty hospital providing comprehensive healthcare services',
    address: '123 Main St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@citygeneral.com',
    website: 'www.citygeneral.com',
    rating: 4.5,
    total_reviews: 1250,
    image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
    facilities: ['Emergency', 'ICU', 'Laboratory', 'Radiology', 'Pharmacy'],
    timings: {
      'Monday': '8:00 AM - 8:00 PM',
      'Tuesday': '8:00 AM - 8:00 PM',
      'Wednesday': '8:00 AM - 8:00 PM',
      'Thursday': '8:00 AM - 8:00 PM',
      'Friday': '8:00 AM - 8:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '9:00 AM - 4:00 PM'
    },
    emergency_services: true,
    appointment_required: true,
    insurance_accepted: true,
    parking_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-12-01T00:00:00Z'
  };

  // Sample services data
  const services: Service[] = [
    { id: '1', service_name: 'General Consultation', description: 'Basic health checkup and consultation', category: 'General', price: 100, duration: 30 },
    { id: '2', service_name: 'Cardiac Checkup', description: 'Comprehensive heart health evaluation', category: 'Cardiology', price: 250, duration: 45 },
    { id: '3', service_name: 'Neurological Assessment', description: 'Complete neurological examination', category: 'Neurology', price: 300, duration: 60 },
    { id: '4', service_name: 'Orthopedic Consultation', description: 'Bone and joint health evaluation', category: 'Orthopedics', price: 200, duration: 40 },
    { id: '5', service_name: 'Pediatric Checkup', description: 'Child health examination and vaccination', category: 'Pediatrics', price: 150, duration: 30 }
  ];

  const [formData, setFormData] = useState<AppointmentFormData>({
    hospital_id: hospitalId || '',
    service_id: '',
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
    payment_method: 'cash',
    emergency_contact: '',
    insurance_info: '',
    previous_medical_history: ''
  });

  const steps = [
    { id: 1, title: 'Select Service', icon: CheckCircleIcon },
    { id: 2, title: 'Patient Information', icon: UserIcon },
    { id: 3, title: 'Date & Time', icon: CalendarIcon },
    { id: 4, title: 'Payment', icon: CreditCardIcon },
    { id: 5, title: 'Confirmation', icon: CheckCircleIcon }
  ];

  const selectedService = services.find(s => s.id === formData.service_id);

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.service_id) {
          setError('Please select a service');
          return false;
        }
        return true;
      case 2:
        if (!formData.patient_name || !formData.patient_email || !formData.patient_phone) {
          setError('Please fill in all required patient information');
          return false;
        }
        if (!formData.patient_email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;
      case 3:
        if (!formData.appointment_date || !formData.appointment_time) {
          setError('Please select appointment date and time');
          return false;
        }
        return true;
      case 4:
        if (!formData.payment_method) {
          setError('Please select a payment method');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      // In real app, submit to API
      console.log('Submitting appointment:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to payment page or success page
      navigate('/payment', { 
        state: { 
          appointmentData: formData,
          service: selectedService,
          hospital: hospital
        } 
      });
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  onClick={() => handleInputChange('service_id', service.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.service_id === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{service.service_name}</h3>
                    <span className="text-lg font-bold text-blue-600">${service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {service.duration} minutes
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.patient_name}
                  onChange={(e: any) => handleInputChange('patient_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.patient_email}
                  onChange={(e: any) => handleInputChange('patient_email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.patient_phone}
                  onChange={(e: any) => handleInputChange('patient_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  value={formData.emergency_contact}
                  onChange={(e: any) => handleInputChange('emergency_contact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical History (Optional)
              </label>
              <textarea
                value={formData.previous_medical_history}
                onChange={(e: any) => handleInputChange('previous_medical_history', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any relevant medical conditions, allergies, or previous treatments..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  value={formData.appointment_date}
                  onChange={(e: any) => handleInputChange('appointment_date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  value={formData.appointment_time}
                  onChange={(e: any) => handleInputChange('appointment_time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((slot: any) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e: any) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or concerns..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
            <div className="space-y-4">
              {PAYMENT_METHODS.map((method: any) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.payment_method === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={formData.payment_method === method.id}
                    onChange={(e: any) => handleInputChange('payment_method', e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
            {formData.payment_method === 'insurance' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Information
                </label>
                <input
                  type="text"
                  value={formData.insurance_info}
                  onChange={(e: any) => handleInputChange('insurance_info', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Insurance provider and policy number"
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Appointment Summary</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hospital</h3>
                  <p className="text-gray-600">{hospital.name}</p>
                  <p className="text-sm text-gray-500">{hospital.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service</h3>
                  <p className="text-gray-600">{selectedService?.service_name}</p>
                  <p className="text-sm text-gray-500">{selectedService?.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Patient</h3>
                  <p className="text-gray-600">{formData.patient_name}</p>
                  <p className="text-sm text-gray-500">{formData.patient_email}</p>
                  <p className="text-sm text-gray-500">{formData.patient_phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Appointment</h3>
                  <p className="text-gray-600">
                    {formData.appointment_date && formatDate(formData.appointment_date)}
                  </p>
                  <p className="text-sm text-gray-500">{formData.appointment_time}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Cost:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${selectedService?.price || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Hospital
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-2">{hospital.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm & Book'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              Next
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
