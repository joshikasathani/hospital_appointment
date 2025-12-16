// API Constants
export const API_BASE_URL = 'http://localhost:8000';
export const API_ENDPOINTS = {
  HOSPITALS: '/api/hospitals',
  APPOINTMENTS: '/api/appointments',
  PAYMENTS: '/api/payments',
  CONTACT: '/api/contact',
  AUTH: '/api/auth',
} as const;

// Hospital Categories
export const HOSPITAL_CATEGORIES = [
  'General Hospital',
  'Specialty Hospital',
  'Multi-Specialty',
  'Clinic',
  'Emergency Care',
  'Diagnostic Center',
  'Dental Clinic',
  'Eye Hospital',
  'Maternity Hospital',
  'Pediatric Hospital',
] as const;

// Medical Specialties
export const MEDICAL_SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Gynecology',
  'Dermatology',
  'Ophthalmology',
  'ENT',
  'Psychiatry',
  'Oncology',
  'Nephrology',
  'Gastroenterology',
  'Pulmonology',
  'Endocrinology',
  'Rheumatology',
  'Urology',
  'General Surgery',
  'Internal Medicine',
  'Radiology',
  'Pathology',
] as const;

// Hospital Facilities
export const HOSPITAL_FACILITIES = [
  'Emergency Room',
  'ICU',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Ambulance Service',
  'Blood Bank',
  'Cafeteria',
  'Parking',
  'WiFi',
  'ATM',
  'Prayer Room',
  'Waiting Area',
  'Recovery Room',
  'Operating Theater',
] as const;

// Time Slots
export const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
] as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  BOOKED: 'BOOKED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  STRIPE: 'stripe',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  HOSPITAL: 'hospital',
  PATIENT: 'patient',
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#3B82F6',
  PRIMARY_DARK: '#2563EB',
  PRIMARY_LIGHT: '#60A5FA',
  SECONDARY: '#10B981',
  SECONDARY_DARK: '#059669',
  SECONDARY_LIGHT: '#34D399',
  ACCENT: '#F59E0B',
  ACCENT_DARK: '#D97706',
  ACCENT_LIGHT: '#FCD34D',
  DANGER: '#EF4444',
  DANGER_DARK: '#DC2626',
  DANGER_LIGHT: '#F87171',
  WARNING: '#F59E0B',
  WARNING_DARK: '#D97706',
  WARNING_LIGHT: '#FCD34D',
  SUCCESS: '#10B981',
  SUCCESS_DARK: '#059669',
  SUCCESS_LIGHT: '#34D399',
  INFO: '#3B82F6',
  INFO_DARK: '#2563EB',
  INFO_LIGHT: '#60A5FA',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  MAX_PAGE_SIZE: 100,
} as const;

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[\d\s-()]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  MESSAGE_MIN_LENGTH: 10,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMMM d, yyyy',
  INPUT: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd',
  TIME: 'h:mm a',
  DATETIME: 'MMMM d, yyyy h:mm a',
} as const;

// Currency
export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
} as const;

// Toast Messages
export const TOAST_MESSAGES = {
  APPOINTMENT_BOOKED: 'Appointment booked successfully!',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully!',
  APPOINTMENT_RESCHEDULED: 'Appointment rescheduled successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  CONTACT_SENT: 'Message sent successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  REGISTER_SUCCESS: 'Registration successful!',
  ERROR_OCCURRED: 'An error occurred. Please try again.',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  APPOINTMENT_NOT_FOUND: 'Appointment not found.',
  HOSPITAL_NOT_FOUND: 'Hospital not found.',
  SERVICE_NOT_AVAILABLE: 'Service not available.',
  SLOT_NOT_AVAILABLE: 'Time slot not available.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;
