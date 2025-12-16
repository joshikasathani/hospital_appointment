import { format, parseISO, isValid } from 'date-fns';
import { COLORS, DATE_FORMATS, VALIDATION } from './constants';

// Date formatting utilities
export const formatDate = (date: string | Date, formatStr: string = DATE_FORMATS.DISPLAY): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatStr);
  } catch {
    return '';
  }
};

export const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return format(date, DATE_FORMATS.TIME);
  } catch {
    return time;
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, DATE_FORMATS.DATETIME);
};

export const isDateInPast = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj < new Date();
  } catch {
    return false;
  }
};

export const isDateToday = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    return dateObj.toDateString() === today.toDateString();
  } catch {
    return false;
  }
};

export const addDaysToDate = (date: string | Date, days: number): Date => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const newDate = new Date(dateObj);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  } catch {
    return new Date();
  }
};

// String utilities
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= VALIDATION.NAME_MIN_LENGTH;
};

// Number utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Array utilities
export const groupBy = <T, K extends keyof any>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const uniqueBy = <T, K extends keyof any>(array: T[], key: K): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Color utilities
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'booked':
    case 'pending':
      return COLORS.INFO;
    case 'completed':
    case 'success':
      return COLORS.SUCCESS;
    case 'cancelled':
    case 'failed':
      return COLORS.DANGER;
    case 'confirmed':
      return COLORS.PRIMARY;
    default:
      return COLORS.GRAY_500;
  }
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return COLORS.SUCCESS;
  if (rating >= 3.5) return COLORS.PRIMARY;
  if (rating >= 2.5) return COLORS.WARNING;
  return COLORS.DANGER;
};

// Local storage utilities
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Handle storage errors
    }
  },
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// URL utilities
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

// File utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = getFileExtension(filename).toLowerCase();
  return imageExtensions.includes(extension);
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.detail) return error.detail;
  return 'An unexpected error occurred';
};

export const isNetworkError = (error: any): boolean => {
  return !error.response && !!error.request;
};

export const isServerError = (error: any): boolean => {
  return error.response?.status >= 500;
};

export const isClientError = (error: any): boolean => {
  return error.response?.status >= 400 && error.response?.status < 500;
};
