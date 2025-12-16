// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Hospital Types
export interface Hospital {
  id: number;
  name: string;
  logo_url?: string;
  address: string;
  city: string;
  contact_email: string;
  contact_phone: string;
  category: string;
  specialties?: string[];
  facilities?: string[];
  services?: string[];
  timings?: Record<string, string>;
  images?: string[];
  description?: string;
  is_approved: boolean;
  owner_id?: number;
  rating?: number;
  distance?: number;
  price_range?: string;
}

// Service Types
export interface Service {
  id: number;
  hospital_id: number;
  service_name: string;
  price: number;
  description?: string;
  category?: string;
  duration_minutes?: number;
  is_active: boolean;
}

// Appointment Types
export interface Appointment {
  id: string;
  hospital_id: string;
  service_id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  payment_status: string;
  notes?: string;
  emergency_contact?: string;
  insurance_info?: string;
  previous_medical_history?: string;
  created_at: string;
  updated_at: string;
  hospital?: Hospital;
  service?: Service;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'hospital' | 'patient';
  is_active: boolean;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'patient' | 'hospital';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Booking Types
export interface BookingFormData {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  service_id: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

export interface AppointmentFormData {
  hospital_id: string;
  service_id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  payment_method: string;
  emergency_contact?: string;
  insurance_info?: string;
  previous_medical_history?: string;
}

// Payment Types
export interface PaymentData {
  appointment_id: number;
  amount: number;
  payment_method: 'razorpay' | 'stripe';
  partial_payment?: boolean;
}

export interface PaymentResponse {
  payment_id: string;
  order_id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
}

// Filter Types
export interface HospitalFilters {
  search?: string;
  category?: string;
  city?: string;
  specialty?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  facilities?: string[];
  approved_only?: boolean;
}

// Contact Types
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Component Props Types
export interface HospitalCardProps {
  hospital: Hospital;
  onViewDetails: (id: number) => void;
  onBookAppointment: (id: number) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: HospitalFilters) => void;
  placeholder?: string;
}

export interface FilterPanelProps {
  filters: HospitalFilters;
  onFilterChange: (filters: HospitalFilters) => void;
  onReset: () => void;
}

export interface BookingFormProps {
  hospitalId: number;
  services: Service[];
  onBookingSuccess: (appointment: Appointment) => void;
}

export interface PaymentFormProps {
  appointmentId: number;
  amount: number;
  onPaymentSuccess: (response: PaymentResponse) => void;
  onPaymentFailure: (error: string) => void;
}
