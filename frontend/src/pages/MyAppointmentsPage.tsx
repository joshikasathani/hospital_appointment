import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Appointment, Hospital, Service } from '../types';
import { formatDate, formatTime } from '../utils/helpers';

const MyAppointmentsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample appointments data - in real app, fetch from API
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      hospital_id: '1',
      service_id: '1',
      patient_name: 'John Doe',
      patient_email: 'john@example.com',
      patient_phone: '+1 (555) 123-4567',
      appointment_date: '2024-12-20',
      appointment_time: '10:00 AM',
      status: 'confirmed',
      payment_status: 'paid',
      notes: 'Regular checkup',
      emergency_contact: '+1 (555) 987-6543',
      insurance_info: 'Insurance #12345',
      previous_medical_history: 'No major health issues',
      created_at: '2024-12-15T10:00:00Z',
      updated_at: '2024-12-15T10:00:00Z',
      hospital: {
        id: '1',
        name: 'City General Hospital',
        address: '123 Main St, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800'
      } as Hospital,
      service: {
        id: 1,
        hospital_id: 1,
        service_name: 'General Consultation',
        description: 'Basic health checkup and consultation',
        price: 100,
        duration_minutes: 30,
        is_active: true
      } as Service
    },
    {
      id: '2',
      hospital_id: '2',
      service_id: '2',
      patient_name: 'John Doe',
      patient_email: 'john@example.com',
      patient_phone: '+1 (555) 123-4567',
      appointment_date: '2024-12-18',
      appointment_time: '2:30 PM',
      status: 'pending',
      payment_status: 'pending',
      notes: 'Follow-up consultation',
      emergency_contact: '+1 (555) 987-6543',
      insurance_info: 'Insurance #12345',
      previous_medical_history: 'Previous treatment for knee pain',
      created_at: '2024-12-10T14:30:00Z',
      updated_at: '2024-12-10T14:30:00Z',
      hospital: {
        id: '2',
        name: 'MediCare Center',
        address: '456 Oak Ave, Los Angeles, CA 90001',
        phone: '+1 (555) 987-6543',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6b797?w=800'
      } as Hospital,
      service: {
        id: 2,
        hospital_id: 2,
        service_name: 'Cardiac Checkup',
        description: 'Comprehensive heart health evaluation',
        price: 250,
        duration_minutes: 45,
        is_active: true
      } as Service
    },
    {
      id: '3',
      hospital_id: '1',
      service_id: '3',
      patient_name: 'John Doe',
      patient_email: 'john@example.com',
      patient_phone: '+1 (555) 123-4567',
      appointment_date: '2024-12-10',
      appointment_time: '11:00 AM',
      status: 'completed',
      payment_status: 'paid',
      notes: 'Initial consultation',
      emergency_contact: '+1 (555) 987-6543',
      insurance_info: 'Insurance #12345',
      previous_medical_history: 'Hypertension',
      created_at: '2024-12-05T11:00:00Z',
      updated_at: '2024-12-10T12:00:00Z',
      hospital: {
        id: '1',
        name: 'City General Hospital',
        address: '123 Main St, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800'
      } as Hospital,
      service: {
        id: 3,
        hospital_id: 1,
        service_name: 'Neurological Assessment',
        description: 'Complete neurological examination',
        price: 300,
        duration_minutes: 60,
        is_active: true
      } as Service
    },
    {
      id: '4',
      hospital_id: '3',
      service_id: '4',
      patient_name: 'John Doe',
      patient_email: 'john@example.com',
      patient_phone: '+1 (555) 123-4567',
      appointment_date: '2024-12-08',
      appointment_time: '3:00 PM',
      status: 'cancelled',
      payment_status: 'refunded',
      notes: 'Cancelled by patient',
      emergency_contact: '+1 (555) 987-6543',
      insurance_info: 'Insurance #12345',
      previous_medical_history: 'No major health issues',
      created_at: '2024-12-01T15:00:00Z',
      updated_at: '2024-12-07T10:00:00Z',
      hospital: {
        id: '3',
        name: 'Health First Medical',
        address: '789 Pine St, Chicago, IL 60007',
        phone: '+1 (555) 456-7890',
        image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'
      } as Hospital,
      service: {
        id: 4,
        hospital_id: 3,
        service_name: 'Orthopedic Consultation',
        description: 'Bone and joint health evaluation',
        price: 200,
        duration_minutes: 40,
        is_active: true
      } as Service
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Appointments', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'today', label: 'Today' },
    { value: 'this_week', label: 'This Week' },
    { value: 'past', label: 'Past' }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app, fetch from API
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment: any) => {
    // Status filter
    if (statusFilter !== 'all' && appointment.status !== statusFilter) {
      return false;
    }

    // Date filter
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateFilter === 'upcoming') {
      if (appointmentDate < today) return false;
    } else if (dateFilter === 'today') {
      if (appointmentDate.toDateString() !== today.toDateString()) return false;
    } else if (dateFilter === 'this_week') {
      const weekFromNow = new Date(today);
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      if (appointmentDate < today || appointmentDate > weekFromNow) return false;
    } else if (dateFilter === 'past') {
      if (appointmentDate >= today) return false;
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        appointment.hospital?.name.toLowerCase().includes(searchLower) ||
        appointment.service?.service_name.toLowerCase().includes(searchLower) ||
        appointment.status.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReschedule = (appointmentId: string) => {
    // Navigate to reschedule page
    navigate(`/appointments/${appointmentId}/reschedule`);
  };

  const handleCancel = async (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // In real app, call API to cancel
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: 'cancelled', updated_at: new Date().toISOString() }
              : apt
          )
        );
      } catch (err) {
        setError('Failed to cancel appointment');
      }
    }
  };

  const handleViewDetails = (appointmentId: string) => {
    navigate(`/appointments/${appointmentId}`);
  };

  const handleBookNew = () => {
    navigate('/hospitals');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-2">Manage and track your medical appointments</p>
            </div>
            <button
              onClick={handleBookNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book New Appointment
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by hospital, service, or status..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
              {showFilters ? (
                <XMarkIcon className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateFilter}
                  onChange={(e: any) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dateOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You haven\'t booked any appointments yet'}
            </p>
            <button
              onClick={handleBookNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment: any) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Hospital Info */}
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <img
                      src={appointment.hospital?.image_url}
                      alt={appointment.hospital?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {appointment.hospital?.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {appointment.hospital?.address}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        {appointment.hospital?.phone}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
                      </div>
                    </div>
                  </div>

                  {/* Service and Status */}
                  <div className="flex flex-col items-start lg:items-end space-y-2">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.service?.service_name}</p>
                      <p className="text-sm text-gray-600">{appointment.service?.duration} minutes</p>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(appointment.payment_status)}`}>
                        <span className="capitalize">{appointment.payment_status}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleViewDetails(appointment.id)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => handleReschedule(appointment.id)}
                          className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                        >
                          <ArrowPathIcon className="w-4 h-4 mr-1" />
                          Reschedule
                        </button>
                      )}
                      {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {appointment.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter((apt: any) => apt.status === 'confirmed' || apt.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter((apt: any) => apt.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter((apt: any) => apt.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
